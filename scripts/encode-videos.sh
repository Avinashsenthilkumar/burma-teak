#!/usr/bin/env bash
#
# Encode the source reels for the web.
#
#   ./scripts/encode-videos.sh <source-dir> <public-dir>
#
# Source material is Instagram reels: 720x1280 (9:16), H.264, 2.5-3.5 Mbps,
# with Tamil narration. Served as shot they are ~270MB for seven films, which
# no visitor should ever be asked to download. This produces what the site uses:
#
#   <public>/media/videos/<name>.mp4   the film, CRF 26, faststart
#   <public>/media/posters/<name>.jpg  a real poster frame from the footage
#   <public>/media/videos/hero-loop*   short silent background loop
#
# Audio is kept on the films — they are narrated pieces, not b-roll. The hero
# loop has its audio stripped entirely (`-an`), because a background video that
# can make noise is a background video that will eventually make noise.
#
# Re-running is safe: ffmpeg overwrites its own outputs and nothing else.
#
set -euo pipefail

SRC="${1:?usage: encode-videos.sh <source-dir> <public-dir>}"
PUB="${2:?usage: encode-videos.sh <source-dir> <public-dir>}"

VID="$PUB/media/videos"
POS="$PUB/media/posters"
mkdir -p "$VID" "$POS"

# Quality/speed trade-off. `faster` is the sweet spot on a small box; drop to
# `slow` if you re-encode on a workstation and want a few percent off the size.
PRESET="${PRESET:-faster}"
CRF="${CRF:-30}"
# Display height. Source is 720x1280; 960 keeps a 540x960 frame, which is
# ample for a 9:16 player and roughly a third of the bitrate.
HEIGHT="${HEIGHT:-960}"

# name | source match | poster timestamp
MAP=(
  "teak-plantation|SaveClip|55"
  "burma-teak-plant|AQMHZolJ|12"
  "nursery-tour|AQPOGacQ|30"
  "timber-and-time|AQPiI2UN|79"
  "from-the-nursery|AQMAwgH6|71"
  "teak-saplings|52b1c8cb|32"
  "teak-in-use|a0ea6080|60"
)

for entry in "${MAP[@]}"; do
  IFS='|' read -r name match poster_at <<< "$entry"
  src=$(find "$SRC" -name "*${match}*.mp4" -print -quit)
  if [ -z "$src" ]; then
    echo "skip $name — no source matching '$match'"
    continue
  fi

  ffmpeg -v error -y -i "$src" \
    -vf "scale=-2:${HEIGHT}:flags=lanczos" \
    -c:v libx264 -profile:v high -level 4.0 -preset "$PRESET" -crf "$CRF" \
    -pix_fmt yuv420p -g 60 \
    -c:a aac -b:a 96k -ac 2 \
    -movflags +faststart \
    "$VID/$name.mp4"

  ffmpeg -v error -y -ss "$poster_at" -i "$src" -frames:v 1 -q:v 4 \
    "$POS/$name.jpg"

  printf '  %-20s %s\n' "$name" "$(du -h "$VID/$name.mp4" | cut -f1)"
done

# --- Hero loop -------------------------------------------------------------
# A clean stretch of misty canopy with no burned-in graphics, so it survives
# being cropped to landscape on a desktop viewport. Silent, short, looping.
HERO_SRC=$(find "$SRC" -name "*SaveClip*.mp4" -print -quit)
if [ -n "$HERO_SRC" ]; then
  ffmpeg -v error -y -ss 53 -t 11 -i "$HERO_SRC" \
    -an -c:v libx264 -profile:v high -preset "$PRESET" -crf 27 \
    -pix_fmt yuv420p -g 30 -movflags +faststart \
    "$VID/hero.mp4"

  ffmpeg -v error -y -ss 53 -t 11 -i "$HERO_SRC" \
    -an -vf "scale=-2:960:flags=lanczos" \
    -c:v libx264 -profile:v high -preset "$PRESET" -crf 28 \
    -pix_fmt yuv420p -g 30 -movflags +faststart \
    "$VID/hero-mobile.mp4"

  ffmpeg -v error -y -ss 55 -i "$HERO_SRC" -frames:v 1 -q:v 3 "$POS/hero.jpg"

  # Second clean stretch — mature trunks — for the pinned mid-page band.
  ffmpeg -v error -y -ss 85 -t 10 -i "$HERO_SRC" \
    -an -c:v libx264 -profile:v high -preset "$PRESET" -crf 27 \
    -pix_fmt yuv420p -g 30 -movflags +faststart \
    "$VID/plantation-story.mp4"

  ffmpeg -v error -y -ss 85 -t 10 -i "$HERO_SRC" \
    -an -vf "scale=-2:960:flags=lanczos" \
    -c:v libx264 -profile:v high -preset "$PRESET" -crf 28 \
    -pix_fmt yuv420p -g 30 -movflags +faststart \
    "$VID/plantation-story-mobile.mp4"

  ffmpeg -v error -y -ss 87 -i "$HERO_SRC" -frames:v 1 -q:v 3 "$POS/plantation-story.jpg"
  echo "  hero + pinned loops done"
fi

echo "Encoding complete. Total: $(du -sh "$VID" | cut -f1)"
