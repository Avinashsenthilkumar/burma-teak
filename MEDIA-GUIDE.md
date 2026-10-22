# Media Guide

Every image and video path the site references, generated directly from the codebase.

**Nothing here is stock or placeholder art.** Every still is a real frame cut from the client's own plantation and nursery footage by `scripts/build-stills.py`, and every film is one of their reels encoded by `scripts/encode-videos.sh`.

**Replacing a file.** Drop a real photograph over any path, keep the filename, and it appears — no component changes. Update its `alt` and `caption` in the same edit: alt text describing a picture that is no longer there is worse than none.

**Film falls back to poster.** Every video carries a poster shown first and kept until playback actually begins, so a missing or unplayable `.mp4` never renders a broken player.

**Total slots:** 104


---


## Film

Seven client films, 9:16 portrait, narrated in Tamil, with burned-in on-screen graphics. They are shown in portrait frames at their true aspect ratio and played on demand with sound. **Do not crop them to landscape** — the captions sit in the middle and lower part of the frame.


| File | Length | Weight | Poster |
| --- | --- | --- | --- |
| `media/videos/burma-teak-plant.mp4` | 2:13 | 21MB | `media/posters/burma-teak-plant.jpg` |
| `media/videos/teak-plantation.mp4` | 2:00 | 16MB | `media/posters/teak-plantation.jpg` |
| `media/videos/nursery-tour.mp4` | 1:58 | 16MB | `media/posters/nursery-tour.jpg` |
| `media/videos/timber-and-time.mp4` | 2:24 | 19MB | `media/posters/timber-and-time.jpg` |
| `media/videos/teak-saplings.mp4` | 0:46 | 5MB | `media/posters/teak-saplings.jpg` |
| `media/videos/teak-in-use.mp4` | 1:26 | 11MB | `media/posters/teak-in-use.jpg` |
| `media/videos/from-the-nursery.mp4` | 1:41 | 13MB | `media/posters/from-the-nursery.jpg` |

### Background loops

Short, **silent**, cut from clean scenic stretches with no presenter and no burned-in text, so they survive being cropped to landscape. Each has a landscape encode for desktop and a portrait one for phones, plus a poster for each shape.


| Desktop (16:9) | Mobile (9:16) | Used by |
| --- | --- | --- |
| `media/videos/hero-wide.mp4` | `media/videos/hero-mobile.mp4` | homepage hero |
| `media/videos/plantation-story-wide.mp4` | `media/videos/plantation-story-mobile.mp4` | pinned mid-page band |

Replacing a loop: footage with no on-screen text, cut to 6–10 seconds, audio stripped. With only one encode, name it `-wide` and drop `mobileSrc` from the entry in `src/data/videos.ts`.


---


## Stills

Cut to the aspect ratio each slot needs. Widths: heroes 2000px, section images 1500px, gallery tiles 1100px.


### `public/media/about/`


| File | Used for |
| --- | --- |
| `about-main.jpg` | components/sections/Intro, data/about |
| `about-philosophy.jpg` | data/about |

### `public/media/brand/`


| File | Used for |
| --- | --- |
| `ganesh-nursery-logo.png` | components/layout/Footer |

### `public/media/company/`


| File | Used for |
| --- | --- |
| `about-hero.jpg` | app/about/page |
| `contact-hero.jpg` | app/contact/page |
| `journey-01-foundation.jpg` | data/journey |
| `journey-02-development.jpg` | data/journey |
| `journey-03-growth.jpg` | data/journey |
| `journey-04-expansion.jpg` | data/journey |
| `journey-05-future.jpg` | data/journey |
| `legal-hero.jpg` | components/sections/LegalPage |
| `team.jpg` | app/about/page |
| `why-01-quality.jpg` | data/sustainability |
| `why-02-heritage.jpg` | data/sustainability |
| `why-03-care.jpg` | data/sustainability |
| `why-04-sustainability.jpg` | data/sustainability |
| `why-05-vision.jpg` | data/sustainability |

### `public/media/gallery/company/`


| File | Used for |
| --- | --- |
| `company-01.jpg` | data/gallery |
| `company-02.jpg` | data/gallery |
| `company-03.jpg` | data/gallery |

### `public/media/gallery/events/`


| File | Used for |
| --- | --- |
| `event-01.jpg` | data/gallery |
| `event-02.jpg` | data/gallery |
| `event-03.jpg` | data/gallery |

### `public/media/gallery/farming/`


| File | Used for |
| --- | --- |
| `farming-01.jpg` | data/gallery |
| `farming-02.jpg` | data/gallery |
| `farming-03.jpg` | data/gallery |
| `farming-04.jpg` | data/gallery |

### `public/media/gallery/land/`


| File | Used for |
| --- | --- |
| `land-01.jpg` | data/gallery |
| `land-02.jpg` | data/gallery |
| `land-03.jpg` | data/gallery |
| `land-04.jpg` | data/gallery |

### `public/media/gallery/nursery/`


| File | Used for |
| --- | --- |
| `nursery-01.jpg` | data/gallery |
| `nursery-02.jpg` | data/gallery |
| `nursery-03.jpg` | data/gallery |
| `nursery-04.jpg` | data/gallery |

### `public/media/gallery/plantation/`


| File | Used for |
| --- | --- |
| `plantation-01.jpg` | data/gallery |
| `plantation-02.jpg` | app/gallery/page, data/gallery |
| `plantation-03.jpg` | data/gallery |
| `plantation-04.jpg` | data/gallery |

### `public/media/gallery/products/`


| File | Used for |
| --- | --- |
| `product-01.jpg` | data/gallery |
| `product-02.jpg` | data/gallery |
| `product-03.jpg` | data/gallery |
| `product-04.jpg` | data/gallery |

### `public/media/gallery/teak-plants/`


| File | Used for |
| --- | --- |
| `teak-plant-01.jpg` | data/gallery |
| `teak-plant-02.jpg` | data/gallery |
| `teak-plant-03.jpg` | data/gallery |
| `teak-plant-04.jpg` | data/gallery |

### `public/media/gallery/team/`


| File | Used for |
| --- | --- |
| `team-01.jpg` | data/gallery |
| `team-02.jpg` | data/gallery |
| `team-03.jpg` | data/gallery |

### `public/media/gallery/trees/`


| File | Used for |
| --- | --- |
| `tree-01.jpg` | data/gallery |
| `tree-02.jpg` | data/gallery |
| `tree-03.jpg` | data/gallery |
| `tree-04.jpg` | data/gallery |

### `public/media/plantation/`


| File | Used for |
| --- | --- |
| `plantation-01-land.jpg` | data/plantation |
| `plantation-02-planting.jpg` | data/plantation |
| `plantation-03-growth.jpg` | data/plantation |
| `plantation-04-care.jpg` | data/plantation |
| `plantation-05-maturity.jpg` | data/plantation |
| `plantation-06-harvest.jpg` | data/plantation |
| `plantation-cta.jpg` | components/sections/CtaBanner |
| `plantation-hero.jpg` | app/plantation/page |

### `public/media/posters/`


| File | Used for |
| --- | --- |
| `burma-teak-plant.jpg` | data/videos |
| `from-the-nursery.jpg` | data/videos |
| `hero-wide.jpg` | data/videos |
| `hero.jpg` | data/videos |
| `nursery-tour.jpg` | data/videos |
| `plantation-story-wide.jpg` | data/videos |
| `plantation-story.jpg` | data/videos |
| `teak-in-use.jpg` | data/videos |
| `teak-plantation.jpg` | app/videos/page, data/videos |
| `teak-saplings.jpg` | data/videos |
| `timber-and-time.jpg` | data/videos |

### `public/media/products/`


| File | Used for |
| --- | --- |
| `product-01-saplings.jpg` | data/offerings |
| `product-02-timber.jpg` | data/offerings |
| `product-03-development.jpg` | data/offerings |
| `product-04-consultation.jpg` | data/offerings |
| `product-05-support.jpg` | data/offerings |
| `products-hero.jpg` | app/offerings/page |

### `public/media/sustainability/`


| File | Used for |
| --- | --- |
| `sustainability-hero.jpg` | app/sustainability/page |
| `sustainability-mature.jpg` | components/sections/Sustainability |
| `sustainability-young.jpg` | components/sections/Sustainability |
| `sustainability.jpg` | app/sustainability/page |

### `public/media/teak/`


| File | Used for |
| --- | --- |
| `growth-01-seedling.jpg` | data/plantation |
| `growth-02-young.jpg` | data/plantation |
| `growth-03-growing.jpg` | data/plantation |
| `growth-04-mature.jpg` | data/plantation |
| `teak-bark.jpg` | data/teak |
| `teak-canopy.jpg` | data/teak |
| `teak-grain.jpg` | data/teak |
| `teak-hero.jpg` | app/teak/page |
| `teak-leaf.jpg` | data/teak |
| `teak-timber.jpg` | app/teak/page, data/teak |

---


## Regenerating


```bash
# stills, cut from video frames (holds the slot -> frame mapping)
python3 -I scripts/build-stills.py <frames-dir> public/media

# films, posters and background loops
./scripts/encode-videos.sh <folder-of-source-reels> public

# abstract placeholders, only for a NEW path with no footage behind it
npm i -D sharp && node scripts/generate-placeholders.mjs
```


Extract source frames first with:

```bash
ffmpeg -i reel.mp4 -vf "fps=1/2" -q:v 2 frames/v1_%03d.jpg
```


The placeholder script never overwrites a real photograph. The other two do overwrite their own outputs, so keep source reels and frames outside `public/`.
