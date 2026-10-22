/**
 * galleryData — every image in the gallery, in one place.
 *
 * ---------------------------------------------------------------------------
 * TO ADD IMAGES: drop files into the matching /public/media/gallery/<folder>
 * and add an entry here. No component needs to change.
 *
 * `ratio` drives the masonry layout — give it the real aspect ratio so the
 * grid reserves correct space and the page does not shift while images load.
 *
 * ALT TEXT DESCRIBES THE ACTUAL PHOTOGRAPH. These images are frames pulled
 * from the client's own plantation and nursery footage, so the descriptions
 * say what is in them rather than what a stock library might have supplied.
 * If you replace an image, replace its `alt` and `caption` in the same edit —
 * alt text that describes a picture that is no longer there is worse than
 * none at all.
 * ---------------------------------------------------------------------------
 */

export type GalleryCategory =
  | 'plantation'
  | 'teak-plants'
  | 'trees'
  | 'nursery'
  | 'farming'
  | 'land'
  | 'products'
  | 'team'
  | 'events'
  | 'company';

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: GalleryCategory;
  /** width / height — used to reserve layout space. */
  ratio: number;
};

export const galleryCategories: { id: GalleryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'plantation', label: 'Plantation' },
  { id: 'teak-plants', label: 'Teak Plants' },
  { id: 'trees', label: 'Trees' },
  { id: 'nursery', label: 'Nursery' },
  { id: 'farming', label: 'Farming' },
  { id: 'land', label: 'Land' },
  { id: 'products', label: 'Products' },
  { id: 'team', label: 'Team' },
  { id: 'events', label: 'Events' },
  { id: 'company', label: 'Company' },
];

const PORTRAIT = 3 / 4;
const SQUARE = 1;
const LANDSCAPE = 4 / 3;
const WIDE = 16 / 9;

export const galleryImages: GalleryImage[] = [
  // --- Plantation ---------------------------------------------------------
  { id: 'pl-01', src: '/media/gallery/plantation/plantation-01.jpg', alt: 'Rows of young teak in an established plantation', caption: 'Young stand, mid season', category: 'plantation', ratio: WIDE },
  { id: 'pl-02', src: '/media/gallery/plantation/plantation-02.jpg', alt: 'Sunlight breaking through the crowns of mature teak', caption: 'Light through the crowns', category: 'plantation', ratio: PORTRAIT },
  { id: 'pl-03', src: '/media/gallery/plantation/plantation-03.jpg', alt: 'Teak trunks rising from dense undergrowth', caption: 'Undergrowth at the stand floor', category: 'plantation', ratio: SQUARE },
  { id: 'pl-04', src: '/media/gallery/plantation/plantation-04.jpg', alt: 'Mature teak trunks standing close together', caption: 'Standing timber', category: 'plantation', ratio: LANDSCAPE },

  // --- Teak plants --------------------------------------------------------
  { id: 'tp-01', src: '/media/gallery/teak-plants/teak-plant-01.jpg', alt: 'A single teak sapling with broad young leaves', caption: 'Nursery-raised sapling', category: 'teak-plants', ratio: PORTRAIT },
  { id: 'tp-02', src: '/media/gallery/teak-plants/teak-plant-02.jpg', alt: 'Teak saplings massed together in the nursery beds', caption: 'Planting stock in the beds', category: 'teak-plants', ratio: LANDSCAPE },
  { id: 'tp-03', src: '/media/gallery/teak-plants/teak-plant-03.jpg', alt: 'Broad teak leaves filling the frame', caption: 'Leaf and vein', category: 'teak-plants', ratio: SQUARE },
  { id: 'tp-04', src: '/media/gallery/teak-plants/teak-plant-04.jpg', alt: 'A tall young teak plant carrying full-sized leaves', caption: 'Four months on', category: 'teak-plants', ratio: PORTRAIT },

  // --- Trees --------------------------------------------------------------
  { id: 'tr-01', src: '/media/gallery/trees/tree-01.jpg', alt: 'A mature teak trunk rising from forest undergrowth', caption: 'A clean bole', category: 'trees', ratio: PORTRAIT },
  { id: 'tr-02', src: '/media/gallery/trees/tree-02.jpg', alt: 'Teak crowns against an open sky', caption: 'Canopy and sky', category: 'trees', ratio: SQUARE },
  { id: 'tr-03', src: '/media/gallery/trees/tree-03.jpg', alt: 'A mature teak tree standing full height in the plantation', caption: 'Full height', category: 'trees', ratio: PORTRAIT },
  { id: 'tr-04', src: '/media/gallery/trees/tree-04.jpg', alt: 'A stand of mature teak receding into the distance', caption: 'Into the stand', category: 'trees', ratio: WIDE },

  // --- Nursery ------------------------------------------------------------
  { id: 'nu-01', src: '/media/gallery/nursery/nursery-01.jpg', alt: 'Teak saplings in their nursery bags, packed close together', caption: 'In the beds', category: 'nursery', ratio: LANDSCAPE },
  { id: 'nu-02', src: '/media/gallery/nursery/nursery-02.jpg', alt: 'A young teak plant growing in its nursery bag', caption: 'Ready to travel', category: 'nursery', ratio: SQUARE },
  { id: 'nu-03', src: '/media/gallery/nursery/nursery-03.jpg', alt: 'A nursery-raised teak sapling against the sky', caption: 'Hardened off', category: 'nursery', ratio: PORTRAIT },
  { id: 'nu-04', src: '/media/gallery/nursery/nursery-04.jpg', alt: 'Teak saplings being lifted into crates for dispatch', caption: 'Packing for dispatch', category: 'nursery', ratio: WIDE },

  // --- Farming ------------------------------------------------------------
  { id: 'fa-01', src: '/media/gallery/farming/farming-01.jpg', alt: 'Spraying a young teak stand, mist hanging in the rows', caption: 'Through the rows', category: 'farming', ratio: WIDE },
  { id: 'fa-02', src: '/media/gallery/farming/farming-02.jpg', alt: 'A worker irrigating young teak by hand', caption: 'Watering by hand', category: 'farming', ratio: PORTRAIT },
  { id: 'fa-03', src: '/media/gallery/farming/farming-03.jpg', alt: 'Tending a young teak plantation in full leaf', caption: 'Tending the stand', category: 'farming', ratio: SQUARE },
  { id: 'fa-04', src: '/media/gallery/farming/farming-04.jpg', alt: 'Young teak rows standing under irrigation', caption: 'Carrying water', category: 'farming', ratio: LANDSCAPE },

  // --- Land ---------------------------------------------------------------
  { id: 'la-01', src: '/media/gallery/land/land-01.jpg', alt: 'Planting beds laid out in long striped rows, seen from above', caption: 'The beds from above', category: 'land', ratio: WIDE },
  { id: 'la-02', src: '/media/gallery/land/land-02.jpg', alt: 'Nursery ground divided into planting blocks, seen from above', caption: 'Blocked out', category: 'land', ratio: LANDSCAPE },
  { id: 'la-03', src: '/media/gallery/land/land-03.jpg', alt: 'Young teak standing against open sky', caption: 'Open ground, young stand', category: 'land', ratio: SQUARE },
  { id: 'la-04', src: '/media/gallery/land/land-04.jpg', alt: 'Young teak growing alongside established palms', caption: 'Where the planting meets the palms', category: 'land', ratio: WIDE },

  // --- Products -----------------------------------------------------------
  { id: 'pr-01', src: '/media/gallery/products/product-01.jpg', alt: 'Teak planting stock growing on in the nursery', caption: 'Planting stock', category: 'products', ratio: SQUARE },
  { id: 'pr-02', src: '/media/gallery/products/product-02.jpg', alt: 'Teak logs stacked and loaded at a timber yard', caption: 'Logs at the yard', category: 'products', ratio: LANDSCAPE },
  { id: 'pr-03', src: '/media/gallery/products/product-03.jpg', alt: 'Teak planks worked into a heavy gate, grain running vertically', caption: 'Worked into a gate', category: 'products', ratio: PORTRAIT },
  { id: 'pr-04', src: '/media/gallery/products/product-04.jpg', alt: 'Teak being cut and worked in a sawmill', caption: 'In the sawmill', category: 'products', ratio: WIDE },

  // --- Team ---------------------------------------------------------------
  { id: 'te-01', src: '/media/gallery/team/team-01.jpg', alt: 'Nursery workers lifting teak saplings into crates', caption: 'Packing day', category: 'team', ratio: LANDSCAPE },
  { id: 'te-02', src: '/media/gallery/team/team-02.jpg', alt: 'Holding up a teak sapling among the nursery beds', caption: 'A sapling in hand', category: 'team', ratio: SQUARE },
  { id: 'te-03', src: '/media/gallery/team/team-03.jpg', alt: 'Working through the rows of a young teak plantation', caption: 'Out in the rows', category: 'team', ratio: PORTRAIT },

  // --- Events -------------------------------------------------------------
  { id: 'ev-01', src: '/media/gallery/events/event-01.jpg', alt: 'Irrigating a young teak plantation', caption: 'On the plantation', category: 'events', ratio: WIDE },
  { id: 'ev-02', src: '/media/gallery/events/event-02.jpg', alt: 'A bullock cart built from worked timber', caption: 'Teak in traditional use', category: 'events', ratio: LANDSCAPE },
  { id: 'ev-03', src: '/media/gallery/events/event-03.jpg', alt: 'Watering young teak beside established palms', caption: 'Watering round', category: 'events', ratio: SQUARE },

  // --- Company ------------------------------------------------------------
  { id: 'co-01', src: '/media/gallery/company/company-01.jpg', alt: 'Teak saplings growing on in the nursery beds', caption: 'The nursery', category: 'company', ratio: LANDSCAPE },
  { id: 'co-02', src: '/media/gallery/company/company-02.jpg', alt: 'The nursery grounds seen from above', caption: 'The grounds', category: 'company', ratio: WIDE },
  { id: 'co-03', src: '/media/gallery/company/company-03.jpg', alt: 'Planting beds laid out in rows across the ground', caption: 'Laid out in rows', category: 'company', ratio: SQUARE },
];

export function imagesByCategory(category: GalleryCategory | 'all'): GalleryImage[] {
  return category === 'all' ? galleryImages : galleryImages.filter((i) => i.category === category);
}

/** A short, varied selection for the homepage gallery teaser. */
export const galleryHighlights: GalleryImage[] = [
  'pl-01',
  'tp-01',
  'tr-02',
  'nu-01',
  'la-02',
  'pr-03',
]
  .map((id) => galleryImages.find((i) => i.id === id))
  .filter((i): i is GalleryImage => Boolean(i));
