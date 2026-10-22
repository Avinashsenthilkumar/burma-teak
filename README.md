# Burma Teak Plant — burmateakplant.com

Premium teak plantation website. Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis · Lucide.

Burma Teak Plant is positioned as the teak venture of **Ganesh Nursery**, Thanjavur (est. 1980). The palette descends from the parent brand — their own site's theme colour `#12261A` is the base forest tone, and the logo's teal is kept as a restrained accent.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint
```

Node 18.17+ required (Node 20+ recommended).

> **Heads up on first build.** This project was authored in a sandbox with no npm registry access, so `npm install` and `npm run build` have **not** been run against it yet. Every file was syntax-checked, but expect to fix the odd import or type nit on your first `npm run build`. Nothing in here is exotic — the stack is stock Next 15.

---

## What's where

```
src/
  app/                    routes (App Router)
    api/enquiry/route.ts  enquiry endpoint
    api/og/route.tsx      generated Open Graph image
    sitemap.ts robots.ts  SEO
  components/
    layout/      Header, Footer, Preloader, CustomCursor, SmoothScroll,
                 PageTransition, ScrollProgress, LeafParticles, Wordmark
    sections/    one file per homepage section + PageHero + LegalPage
    gallery/     ImageGallery, Lightbox
    video/       VideoGallery
    forms/       ContactForm
    ui/          Reveal, AnimatedText, ParallaxImage, MediaImage,
                 ResponsiveVideo, MagneticButton, ButtonLink,
                 SectionHeading, AnimatedCounter, ScrollIndicator
  config/        site.ts · company.ts · navigation.ts · stats.ts
  data/          teak · plantation · sustainability · journey ·
                 offerings · about · gallery · videos
scripts/
  build-stills.py          cut stills from video frames
  encode-videos.sh         encode the films, posters and background loops
  generate-placeholders.mjs
  lib/           motion.ts (variants) · hooks.ts · validation.ts · icons.ts · cn.ts
scripts/
  generate-placeholders.mjs
preview/
  index.html     standalone static preview of the homepage
```

Pages: `/` `/about` `/teak` `/plantation` `/sustainability` `/offerings` `/gallery` `/videos` `/contact` `/privacy-policy` `/terms` + 404.

---

## Editing content

**Everything the client might change lives in `src/config/` and `src/data/`.** No company detail is hardcoded in a component.

Placeholders are written in brackets — `[EMAIL]`, `[FOUNDED_YEAR]`, `[ACREAGE]`. The `isPlaceholder()` helper in `src/config/company.ts` means an unfilled value is **hidden rather than printed**: no `[EMAIL]` ever reaches the page, and unconfirmed values are left out of the JSON-LD too.

### Confirmed vs. placeholder

| Confirmed (from Ganesh Nursery) | Still a placeholder |
| --- | --- |
| Phone / WhatsApp `+91 99431 19955` | Email address |
| Thanjavur, Tamil Nadu | Street address, postal code, coordinates |
| Parent established 1980 | Teak venture founding year |
| Supplies teak + timber saplings | Acreage, trees cultivated, plantation count |

### The statistics band

`src/config/stats.ts`. A stat with `value: null` renders as a muted em-dash, not an invented number. Set `value` to a real figure and it becomes an animated counter. Only "Years of Nursery Heritage" is currently live, because 1980 is confirmed.

### Offerings

`src/data/offerings.ts`. Items with `confirmed: false` are **not rendered in production**. Plantation development, consultation and cultivation support are drafted there — confirm the scope with the client, flip the flag, and they appear site-wide.

### Legal pages

`/privacy-policy` and `/terms` describe how this site actually behaves rather than being generic boilerplate, but they carry a visible "draft pending review" notice and `[LAST_UPDATED_DATE]` / `[JURISDICTION]` placeholders. Have them reviewed before launch.

---

## Media

See **[MEDIA-GUIDE.md](./MEDIA-GUIDE.md)** for every filename and recommended size.

**Stills.** All 81 images on the site are real frames cut from the client's own plantation and nursery footage — no stock, no abstract placeholders. Drop a real photograph over any of them, keep the filename, and it appears; no code change.

```bash
# re-cut the stills from video frames
python3 -I scripts/build-stills.py <frames-dir> public/media

# abstract placeholders, only for any NEW path with no footage behind it yet
npm i -D sharp && node scripts/generate-placeholders.mjs
```

`build-stills.py` holds the slot-to-frame mapping. Each entry names a source frame, a target aspect ratio, and a vertical focus point, and the script crops, scales and lightly sharpens to fit.

Two things it handles that are easy to get wrong by hand:

- **Overlay furniture.** The reels carry a channel badge near the top and a watermark wherever the photo content ends — which is often mid-frame on a letterboxed shot, not at the edge. The safe band for each reel was found by taking its temporal median: static overlays stay sharp through a median while the moving photography behind them turns to mush. Those bands are in `VIDEO_TRIM`, with per-frame overrides in `TRIM` for split-screen frames and burned-in captions.
- **Visible repeats.** 81 slots come from 39 distinct frames, so the script refuses to build if one frame is used twice inside the same section or gallery category — which is the only place a viewer would notice.

**Alt text describes the actual photograph.** If you swap an image, swap its `alt` and `caption` in the same edit. Alt text that describes a picture which is no longer there is worse than none.

**Film.** Seven client films ship in `public/media/videos/`, encoded from the original Instagram reels. Re-encode from new source material with:

```bash
./scripts/encode-videos.sh <folder-of-source-reels> public
```

That produces the web encodes, pulls a real poster frame from each film, and cuts the two silent background loops. Source names are mapped in the `MAP` array at the top of the script.

### The header lockup

The header carries the **Ganesh Nursery logo beside the Burma Teak Plant wordmark**. Burma Teak Plant is an endorsed sub-brand, so the parent's mark carries the recognition and the wordmark says whose site you are on — the logo alone would leave a visitor on burmateakplant.com looking at a different company's name.

Two logo files, because the logo's own wordmark is dark navy:

| File | Used on |
| --- | --- |
| `ganesh-nursery-logo.png` | the solid, light header |
| `ganesh-nursery-logo-light.png` | the transparent header, the footer, the preloader |

The light variant lifts only the darkest pixels to bone and leaves the teal and green untouched, so "Ganesh Nursery" stays readable on dark. Both are trimmed to their content box, so sizing is by the mark itself rather than by transparent padding. `Wordmark`'s `variant` prop picks one; the header passes whichever matches its current state.

The transparent header also carries a **gradient scrim** (`before:` on the header element). A hero can be bright — the misty canopy especially — and bone text on mist is unreadable; the scrim fixes that without the header reading as a solid bar.

### Where the films live

The seven films are **not** all stacked on `/videos`. A visitor reading about saplings has no reason to detour to a film index, so each film sits on the page whose subject it covers, with `/videos` keeping the full set as the index.

The routing is one object — `filmsByPage` in `src/data/videos.ts`. To move a film, change its id there; nothing else needs touching. `byId` throws on an unknown id rather than returning `undefined`, so a typo fails the build instead of rendering an empty section.

| Page | Film |
| --- | --- |
| Home | three in the strip, plus a large feature |
| `/teak` | Timber And Time |
| `/plantation` | Inside A Teak Plantation |
| `/sustainability` | Around The Nursery |
| `/offerings` | The Saplings |
| `/about` | From The Nursery |
| `/videos` | all seven |

**Sizing.** A 9:16 tile grows tall fast: at two columns on a 1440px viewport each would be ~700px wide and so ~1240px tall, past the bottom of the screen. So above `lg` the frames are **height-led** (`h-[Nvh] w-auto`) and the aspect ratio sets the width; below `lg` they stay width-led and fill the column. `max-h` would not work here — it clamps the box without preserving the ratio.

### The proprietor across the site

The client asked to be visible throughout. `src/data/founder.ts` holds his photographs and copy, and each appearance has a job rather than repeating one headshot:

- **Homepage + `/about`** — `FounderBand`, a portrait with a statement in his voice.
- **`/teak`** — `BurmaConnection`, the photograph taken at Karaweik Palace in Yangon, beside copy about where the name "Burma teak" comes from. This one is more than presence: the location is genuinely the subject.
- **`/offerings` and `/about`** — holding a sapling with a grower.
- **`/contact`** — a small portrait, so the enquiry has a face attached.

`name` and `role` are placeholders. Every component checks `isPlaceholder()` first, so until a real name is supplied the photographs and words carry the section and no bracketed token is ever rendered.

The copy around the Yangon photograph deliberately stops at what is true of the species and the timber trade. It does not claim a sourcing relationship or an import route — none of that is confirmed, and a photograph is not evidence of it.

### Why the films are presented vertically

The footage is 720×1280 portrait, shot for Instagram, with Tamil narration and burned-in on-screen graphics (titles, phone numbers). That is not something to work around — it decides the design:

- **The films are shown in 9:16 frames at their true aspect ratio.** Cropping them to a landscape slot would cut the burned-in captions in half and throw away two thirds of every frame.
- **They play with sound, on demand.** They are narrated pieces, not b-roll. Nothing autoplays with audio, and no film is fetched until a visitor opens it — seven films at 5–22MB each would otherwise be a catastrophic page weight.
- **The background loops are a separate thing entirely.** `hero` and `plantation-story` are short, silent cuts from clean scenic stretches with no presenter and no burned-in text, so they survive being cropped to landscape. They have no audio track at all.

Never promote a narrated film to a background loop. `src/data/videos.ts` says the same thing at the top, because it is the mistake this structure exists to prevent.

### Desktop and mobile encodes differ in shape

The hero's `src` is a **landscape 16:9 crop**, upscaled once with lanczos at encode time. A desktop hero is a landscape box, so serving the tall frame would make every browser decode 1280 rows to show about 400 of them, every frame, for nothing. `mobileSrc` stays portrait, because a phone viewport already is 9:16 and the footage fills it natively. `ResponsiveVideo` picks the encode *and* the matching poster from the same branch.

---

## The enquiry form

`src/app/api/enquiry/route.ts` is **inert until configured**, by design. With no transport set it returns `503 not_configured`, and the form tells the visitor plainly that the message was *not* sent and shows the phone and WhatsApp number instead. It never shows a thank-you over a message that went nowhere.

Two transports are implemented with no extra dependencies:

```bash
# Option A — Resend (simplest)
RESEND_API_KEY=...
ENQUIRY_FROM_EMAIL=enquiries@burmateakplant.com
ENQUIRY_TO_EMAIL=...

# Option B — forward to a CRM / webhook
ENQUIRY_WEBHOOK_URL=...
ENQUIRY_WEBHOOK_SECRET=...
```

SMTP is sketched in `.env.example`; it needs `nodemailer` and one extra branch in the route.

Also included: honeypot field, per-IP rate limit (4/min), HTML escaping on the outgoing email, and shared client/server validation in `src/lib/validation.ts` so the rules can't drift apart.

---

## Notes on the build

**No GSAP.** The brief said to use ScrollTrigger "only where it provides significant value". Framer Motion's `useScroll` plus CSS `position: sticky` covers every pinned and horizontal section here, so adding a second scroll system — and ~60KB — earned nothing. Lenis handles smooth scrolling and is never constructed at all under `prefers-reduced-motion`.

**No scroll-jacking.** Pinning is CSS sticky throughout. The visitor's scroll is eased, never taken away.

**No inline CSS for presentation.** All styling is Tailwind classes or the component layer in `globals.css`. The only runtime-set properties are Framer Motion values and a handful of measured layout values (the horizontal track's travel distance is measured with a `ResizeObserver` rather than guessed as a percentage).

**Reduced motion is a real path, not a flag.** The preloader is skipped, the custom cursor renders *nothing* (no listeners, no DOM), Lenis never starts, the growth scrubber becomes a plain image grid, and the horizontal plantation track becomes the vertical stack.

**Performance.** The homepage ships the hero, intro and teak story; the other ten sections are `next/dynamic` with SSR left on. Videos never load on a reduced-motion visitor, phones get `mobileSrc` where one exists, and posters carry every video until it plays. The films gallery fetches no video at all until a visitor opens one, and the player drops its `src` on close so a closed film stops buffering.

**Accessibility.** Semantic landmarks, skip link, visible focus rings, a real focus trap and focus restore in the lightbox, `aria-pressed` filters, labelled form fields with `aria-describedby` error wiring, and decorative imagery marked `aria-hidden`.

---

## Preview

`preview/index.html` is a standalone static version of the homepage — no build step, no dependencies. Open it directly in a browser to show the client the design without running Node. It was checked at 360 / 390 / 768 / 1440px with no horizontal overflow.

It is a *design preview*, not the app: it mirrors the real build's sections, copy and motion, but the Next.js project is the deliverable. Its films are 18-second excerpts at a lower bitrate so the page stays light enough to host; the build ships the full seven.
