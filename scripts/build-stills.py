"""
Cut the site's still imagery from the client's own footage.

Source frames are 720x1280 portrait reel stills. Most slots want another
shape, so each entry names a frame, a target aspect, a vertical focus point,
and an output width.

Two things the reels force on us, handled here rather than left to chance:

  trim   The reels carry a channel badge in the top ~9% and a watermark in the
         bottom ~8%, and several frames are split-screen compositions or carry
         burned-in Tamil captions over part of the height. `trim` removes those
         bands BEFORE the aspect crop, so nothing downstream has to know.

  focus  Where the crop sits inside what is left, as a fraction of the trimmed
         height. Keeps the subject in frame.

Upscaling is honest about its limits: lanczos then a restrained unsharp pass.
A 720px-wide source does not become a 1920px photograph, but under the scrims
these sit beneath it reads as depth rather than softness.

    python3 -I build_stills.py <frames-dir> <out-dir> [--review]
"""

import subprocess
import sys
from collections import Counter
from pathlib import Path

FRAMES = Path(sys.argv[1])
OUT = Path(sys.argv[2])
REVIEW = "--review" in sys.argv

W16x9, W3x2, W4x3, SQ, P3x4, P4x5 = 16 / 9, 3 / 2, 4 / 3, 1.0, 3 / 4, 4 / 5
HERO_W, SECTION_W, TILE_W = 2000, 1500, 1100

# Per-video safe bands, found by taking each reel's temporal median: static
# overlay furniture stays sharp through a median while the photography behind
# it turns to mush, which makes the badge and watermark easy to locate instead
# of guess at. v2's watermark in particular sits around 88% rather than at the
# frame edge, which a flat 8% trim leaves in frame.
VIDEO_TRIM = {
    "v1": (0.34, 0.27),   # "BURMA TEAK PLANT" title band, then contact details
    "v2": (0.13, 0.23),
    "v3": (0.15, 0.23),
    "v4": (0.13, 0.30),
    "v5": (0.13, 0.37),
    "v6": (0.23, 0.56),   # heavy caption block across the lower half
    "v7": (0.13, 0.25),
}
DEFAULT_TRIM = (0.09, 0.085)

# Frames needing more than the default, because they are split-screen
# compositions or carry burned-in captions.
TRIM = {
    # Both aerials are three-panel composites with a watermark across the
    # middle panel. Keep one clean panel from each, and different ones, so the
    # two frames do not read as the same picture twice.
    "v5_045": (0.735, 0.012),  # lowest panel: striped rows
    "v5_046": (0.400, 0.400),  # middle panel: beds, stopping above the watermark
    "v4_059": (0.14, 0.41),   # Tamil bullet captions across the lower third
    "v2_050": (0.14, 0.33),   # "4 மாதத்தில்" caption at the foot
    "v5_003": (0.14, 0.25),
    # Letterboxed shots carry the watermark where the photo ends, not at the
    # frame edge, so these need a deeper bottom trim than the default.
    "v2_007": (0.14, 0.26),   # timber yard; watermark sits at ~78%
    "v4_015": (0.14, 0.36),   # teak gate, vertical plank grain above the caption
    "v4_016": (0.14, 0.40),   # second gate, above its caption
    "v2_017": (0.14, 0.55),   # split frame: keep the sawmill, drop the presenter
    "v2_018": (0.14, 0.55),
}

# slot -> (frame, aspect, focus, width)
MAP = {
    # --- Page heroes (full-bleed landscape) ---------------------------------
    "teak/teak-hero.jpg":                     ("v2_005", W16x9, 0.46, HERO_W),
    "plantation/plantation-hero.jpg":         ("v4_047", W16x9, 0.52, HERO_W),
    "sustainability/sustainability-hero.jpg": ("v4_042", W16x9, 0.50, HERO_W),
    "company/about-hero.jpg":                 ("v5_028", W16x9, 0.50, HERO_W),
    "company/contact-hero.jpg":               ("v2_043", W16x9, 0.50, HERO_W),
    "company/legal-hero.jpg":                 ("v2_024", W16x9, 0.46, HERO_W),
    "products/products-hero.jpg":             ("v5_031", W16x9, 0.46, HERO_W),
    "plantation/plantation-cta.jpg":          ("v2_006", W16x9, 0.44, HERO_W),

    # --- About ---------------------------------------------------------------
    "about/about-main.jpg":                   ("v4_041", W16x9, 0.48, HERO_W),
    "about/about-philosophy.jpg":             ("v2_045", P4x5, 0.50, SECTION_W),

    # --- Teak story (portrait 4:5 on desktop) --------------------------------
    "teak/teak-grain.jpg":                    ("v4_015", P4x5, 0.42, SECTION_W),
    "teak/teak-timber.jpg":                   ("v2_007", P4x5, 0.46, SECTION_W),
    "teak/teak-leaf.jpg":                     ("v5_031", P4x5, 0.40, SECTION_W),
    "teak/teak-bark.jpg":                     ("v2_046", P4x5, 0.52, SECTION_W),
    "teak/teak-canopy.jpg":                   ("v4_040", P4x5, 0.38, SECTION_W),

    # --- Growth stages -------------------------------------------------------
    "teak/growth-01-seedling.jpg":            ("v2_014", P3x4, 0.54, SECTION_W),
    "teak/growth-02-young.jpg":               ("v5_032", P3x4, 0.46, SECTION_W),
    "teak/growth-03-growing.jpg":             ("v2_051", P3x4, 0.46, SECTION_W),
    "teak/growth-04-mature.jpg":              ("v2_044", P3x4, 0.48, SECTION_W),

    # --- Plantation lifecycle (portrait 4:5) ---------------------------------
    "plantation/plantation-01-land.jpg":      ("v5_045", P4x5, 0.48, SECTION_W),
    "plantation/plantation-02-planting.jpg":  ("v4_046", P4x5, 0.54, SECTION_W),
    "plantation/plantation-03-growth.jpg":    ("v4_048", P4x5, 0.52, SECTION_W),
    "plantation/plantation-04-care.jpg":      ("v4_045", P4x5, 0.52, SECTION_W),
    "plantation/plantation-05-maturity.jpg":  ("v4_038", P4x5, 0.46, SECTION_W),
    "plantation/plantation-06-harvest.jpg":   ("v2_007", P4x5, 0.58, SECTION_W),

    # --- Sustainability ------------------------------------------------------
    # The band crossfades from young planting into closed canopy as you scroll.
    "sustainability/sustainability-young.jpg":  ("v4_046", W16x9, 0.50, HERO_W),
    "sustainability/sustainability-mature.jpg": ("v2_042", W16x9, 0.50, HERO_W),
    "sustainability/sustainability.jpg":        ("v4_044", W16x9, 0.52, HERO_W),

    # --- Why choose us (portrait 3:4) ----------------------------------------
    "company/why-01-quality.jpg":             ("v2_050", P3x4, 0.46, SECTION_W),
    "company/why-02-heritage.jpg":            ("v2_001", P3x4, 0.46, SECTION_W),
    "company/why-03-care.jpg":                ("v4_043", P3x4, 0.52, SECTION_W),
    "company/why-04-sustainability.jpg":      ("v2_023", P3x4, 0.48, SECTION_W),
    "company/why-05-vision.jpg":              ("v4_039", P3x4, 0.46, SECTION_W),

    # --- Journey timeline (landscape 3:2) ------------------------------------
    "company/journey-01-foundation.jpg":      ("v5_029", W3x2, 0.50, SECTION_W),
    "company/journey-02-development.jpg":     ("v4_044", W3x2, 0.52, SECTION_W),
    "company/journey-03-growth.jpg":          ("v2_052", W3x2, 0.50, SECTION_W),
    "company/journey-04-expansion.jpg":       ("v5_046", W3x2, 0.50, SECTION_W),
    "company/journey-05-future.jpg":          ("v2_051", W3x2, 0.42, SECTION_W),
    "company/team.jpg":                       ("v2_057", W3x2, 0.46, HERO_W),

    # --- Offerings -----------------------------------------------------------
    "products/product-01-saplings.jpg":       ("v2_014", W4x3, 0.48, SECTION_W),
    "products/product-02-timber.jpg":         ("v2_007", W4x3, 0.50, SECTION_W),
    "products/product-03-development.jpg":    ("v4_047", W4x3, 0.52, SECTION_W),
    "products/product-04-consultation.jpg":   ("v2_001", W4x3, 0.44, SECTION_W),
    "products/product-05-support.jpg":        ("v4_045", W4x3, 0.52, SECTION_W),

    # --- Gallery: plantation -------------------------------------------------
    "gallery/plantation/plantation-01.jpg":   ("v4_048", W16x9, 0.52, TILE_W),
    "gallery/plantation/plantation-02.jpg":   ("v2_006", P3x4, 0.44, TILE_W),
    "gallery/plantation/plantation-03.jpg":   ("v2_025", SQ,   0.46, TILE_W),
    "gallery/plantation/plantation-04.jpg":   ("v4_041", W4x3, 0.48, TILE_W),

    # --- Gallery: teak plants ------------------------------------------------
    "gallery/teak-plants/teak-plant-01.jpg":  ("v5_031", P3x4, 0.42, TILE_W),
    "gallery/teak-plants/teak-plant-02.jpg":  ("v5_028", W4x3, 0.50, TILE_W),
    "gallery/teak-plants/teak-plant-03.jpg":  ("v5_029", SQ,   0.48, TILE_W),
    "gallery/teak-plants/teak-plant-04.jpg":  ("v2_050", P3x4, 0.46, TILE_W),

    # --- Gallery: trees ------------------------------------------------------
    "gallery/trees/tree-01.jpg":              ("v2_044", P3x4, 0.50, TILE_W),
    "gallery/trees/tree-02.jpg":              ("v4_040", SQ,   0.40, TILE_W),
    "gallery/trees/tree-03.jpg":              ("v2_046", P3x4, 0.52, TILE_W),
    "gallery/trees/tree-04.jpg":              ("v4_038", W16x9, 0.46, TILE_W),

    # --- Gallery: nursery ----------------------------------------------------
    "gallery/nursery/nursery-01.jpg":         ("v2_014", W4x3, 0.52, TILE_W),
    "gallery/nursery/nursery-02.jpg":         ("v5_032", SQ,   0.46, TILE_W),
    "gallery/nursery/nursery-03.jpg":         ("v4_059", P3x4, 0.46, TILE_W),
    "gallery/nursery/nursery-04.jpg":         ("v2_057", W16x9, 0.50, TILE_W),

    # --- Gallery: farming ----------------------------------------------------
    "gallery/farming/farming-01.jpg":         ("v4_044", W16x9, 0.54, TILE_W),
    "gallery/farming/farming-02.jpg":         ("v4_045", P3x4, 0.52, TILE_W),
    "gallery/farming/farming-03.jpg":         ("v4_043", SQ,   0.52, TILE_W),
    "gallery/farming/farming-04.jpg":         ("v4_047", W4x3, 0.52, TILE_W),

    # --- Gallery: land -------------------------------------------------------
    "gallery/land/land-01.jpg":               ("v5_045", W16x9, 0.46, TILE_W),
    "gallery/land/land-02.jpg":               ("v5_046", W4x3, 0.52, TILE_W),
    "gallery/land/land-03.jpg":               ("v2_052", SQ,   0.52, TILE_W),
    "gallery/land/land-04.jpg":               ("v4_046", W16x9, 0.56, TILE_W),

    # --- Gallery: products ---------------------------------------------------
    "gallery/products/product-01.jpg":        ("v5_028", SQ,   0.52, TILE_W),
    "gallery/products/product-02.jpg":        ("v2_007", W4x3, 0.50, TILE_W),
    "gallery/products/product-03.jpg":        ("v4_016", P3x4, 0.42, TILE_W),
    "gallery/products/product-04.jpg":        ("v2_017", W16x9, 0.50, TILE_W),

    # --- Gallery: team -------------------------------------------------------
    "gallery/team/team-01.jpg":               ("v2_057", W4x3, 0.52, TILE_W),
    "gallery/team/team-02.jpg":               ("v2_001", SQ,   0.44, TILE_W),
    "gallery/team/team-03.jpg":               ("v4_043", P3x4, 0.50, TILE_W),

    # --- Gallery: events -----------------------------------------------------
    "gallery/events/event-01.jpg":            ("v4_045", W16x9, 0.52, TILE_W),
    "gallery/events/event-02.jpg":            ("v5_003", W4x3, 0.50, TILE_W),
    "gallery/events/event-03.jpg":            ("v4_046", SQ,   0.52, TILE_W),

    # --- Gallery: company ----------------------------------------------------
    "gallery/company/company-01.jpg":         ("v2_014", W4x3, 0.46, TILE_W),
    "gallery/company/company-02.jpg":         ("v5_046", W16x9, 0.52, TILE_W),
    "gallery/company/company-03.jpg":         ("v5_045", SQ,   0.50, TILE_W),
}

SRC_W, SRC_H = 720, 1280


def trim_for(frame: str) -> tuple[float, float]:
    """A verified per-frame override wins; otherwise fall back to the reel's band."""
    if frame in TRIM:
        return TRIM[frame]
    return VIDEO_TRIM.get(frame.split("_")[0], DEFAULT_TRIM)


def build(frame: str, aspect: float, focus: float, width: int, dest: Path) -> None:
    top, bottom = trim_for(frame)
    y0 = int(round(SRC_H * top))
    y1 = int(round(SRC_H * (1.0 - bottom)))
    avail_h = y1 - y0

    if aspect >= SRC_W / avail_h:
        cw, ch = SRC_W, int(round(SRC_W / aspect))
    else:
        ch = min(avail_h, int(round(SRC_W / aspect)))
        cw = int(round(ch * aspect))

    ch = min(ch, avail_h)
    cw = min(cw, SRC_W)

    x = (SRC_W - cw) // 2
    y = y0 + int(round(focus * avail_h - ch / 2))
    y = max(y0, min(y1 - ch, y))

    height = int(round(width / aspect))
    dest.parent.mkdir(parents=True, exist_ok=True)

    subprocess.run(
        [
            "convert", str(FRAMES / f"{frame}.jpg"),
            "-crop", f"{cw}x{ch}+{x}+{y}", "+repage",
            "-colorspace", "RGB",
            "-filter", "Lanczos", "-resize", f"{width}x{height}!",
            "-colorspace", "sRGB",
            "-unsharp", "0x0.75+0.55+0.02",
            "-quality", "82", "-strip", "-interlace", "Plane",
            str(dest),
        ],
        check=True,
    )


def main() -> None:
    missing = [f for f, *_ in MAP.values() if not (FRAMES / f"{f}.jpg").exists()]
    if missing:
        print("MISSING SOURCE FRAMES:", sorted(set(missing)))
        sys.exit(1)

    # No frame may appear twice inside one section or gallery category — that
    # is where a repeat is actually visible to a viewer.
    groups: dict[str, list[str]] = {}
    for slot, (frame, *_rest) in MAP.items():
        groups.setdefault("/".join(slot.split("/")[:-1]), []).append(frame)
    clashes = {g: [f for f, n in Counter(fs).items() if n > 1] for g, fs in groups.items()}
    clashes = {g: f for g, f in clashes.items() if f}
    if clashes:
        print("REPEATED FRAME WITHIN A SECTION:")
        for g, fs in clashes.items():
            print(f"  {g}: {fs}")
        sys.exit(1)

    OUT.mkdir(parents=True, exist_ok=True)
    built = []
    for slot, (frame, aspect, focus, width) in MAP.items():
        dest = OUT / slot
        build(frame, aspect, focus, width, dest)
        built.append((slot, frame, dest))

    uses = Counter(f for f, *_ in MAP.values())
    print(f"built {len(built)} stills from {len(uses)} distinct frames")
    heavy = [(f, n) for f, n in uses.most_common() if n > 3]
    if heavy:
        print("  frames used more than 3x:", heavy)

    if REVIEW:
        sheets = OUT.parent / "stillsheets"
        sheets.mkdir(parents=True, exist_ok=True)
        thumbs = sheets / "t"
        thumbs.mkdir(exist_ok=True)
        per = 15
        for i in range(0, len(built), per):
            group = built[i : i + per]
            files = []
            for slot, frame, dest in group:
                label = slot.replace(".jpg", "").split("/")[-1][:22] + f" [{frame}]"
                t = thumbs / slot.replace("/", "_")
                subprocess.run(
                    ["convert", str(dest), "-resize", "230x230",
                     "-background", "#111", "-fill", "#ffd", "-pointsize", "12",
                     "-gravity", "North", "-splice", "0x15",
                     "-annotate", "+0+1", label, str(t)],
                    check=True,
                )
                files.append(str(t))
            out = sheets / f"stills{i//per+1}.jpg"
            subprocess.run(
                ["montage"] + files + ["-tile", "5x3", "-geometry", "+4+4",
                                       "-background", "#111", str(out)],
                check=True,
            )
            print("  review sheet:", out)


if __name__ == "__main__":
    main()
