/** "From Soil to Canopy" — the plantation lifecycle. */

export type PlantationStage = {
  index: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
};

export const plantationStages: PlantationStage[] = [
  {
    index: '01',
    title: 'Land Preparation',
    summary: 'Reading the ground before a single sapling is planted.',
    detail:
      'Soil depth, drainage and slope decide how a teak plantation will behave twenty years from now. The land is assessed, cleared, contoured and prepared so that young roots meet loose, well-drained earth rather than compaction.',
    image: '/media/plantation/plantation-01-land.jpg',
    imageAlt: 'Planting beds laid out in rows, seen from above',
  },
  {
    index: '02',
    title: 'Planting',
    summary: 'Spacing is a decision you live with for decades.',
    detail:
      'Saplings are set out at considered spacing and depth, timed to the season so that the first rains do the work. Correct spacing now determines canopy, girth and timber quality later — it cannot be corrected afterwards.',
    image: '/media/plantation/plantation-02-planting.jpg',
    imageAlt: 'Young teak being watered beside established palms',
  },
  {
    index: '03',
    title: 'Early Growth',
    summary: 'The years that decide the shape of the tree.',
    detail:
      'The first seasons are the vulnerable ones. Weeding, watering and protection from grazing keep young teak climbing straight and fast while it establishes the root system it will rely on for the rest of its life.',
    image: '/media/plantation/plantation-03-growth.jpg',
    imageAlt: 'Young teak in early growth, full of leaf',
  },
  {
    index: '04',
    title: 'Care & Management',
    summary: 'Pruning, thinning, watching.',
    detail:
      'A plantation is tended, not simply left. Pruning builds a clean bole, thinning gives the best stems the light and room they need, and regular inspection catches pest or nutrient problems while they are still small.',
    image: '/media/plantation/plantation-04-care.jpg',
    imageAlt: 'A worker irrigating young teak by hand',
  },
  {
    index: '05',
    title: 'Maturity',
    summary: 'Canopy closes. Heartwood forms.',
    detail:
      'As the canopy closes the stand regulates itself. Girth thickens, heartwood develops its colour and oils, and the plantation begins to look and behave like forest rather than like a crop.',
    image: '/media/plantation/plantation-05-maturity.jpg',
    imageAlt: 'Mature teak standing in a closed stand',
  },
  {
    index: '06',
    title: 'Future Harvest',
    summary: 'A decision for the next generation.',
    detail:
      'Harvest is planned, selective and documented, with replanting built into the plan from the start. What leaves the plantation is premium timber; what stays behind is ground ready to grow the next stand.',
    image: '/media/plantation/plantation-06-harvest.jpg',
    imageAlt: 'Teak logs stacked at the timber yard',
  },
];

/** Tree growth scrubber — seedling through to mature teak. */
export type GrowthPhase = {
  label: string;
  caption: string;
  /** Rough age band. Descriptive, not a yield promise. */
  age: string;
  image: string;
  imageAlt: string;
};

export const growthPhases: GrowthPhase[] = [
  {
    label: 'Seedling',
    caption: 'A pair of leaves, a root finding its way down.',
    age: 'Year 0–1',
    image: '/media/teak/growth-01-seedling.jpg',
    imageAlt: 'Teak saplings growing on in the nursery beds',
  },
  {
    label: 'Young Plant',
    caption: 'Leaves broaden. The stem commits to a direction.',
    age: 'Year 1–3',
    image: '/media/teak/growth-02-young.jpg',
    imageAlt: 'A young teak plant in its nursery bag',
  },
  {
    label: 'Growing Tree',
    caption: 'Height first, then girth. The bole begins to clean.',
    age: 'Year 3–10',
    image: '/media/teak/growth-03-growing.jpg',
    imageAlt: 'Young teak reaching up against open sky',
  },
  {
    label: 'Mature Teak',
    caption: 'Heartwood, colour, oils — the timber the world asks for.',
    age: 'Year 10+',
    image: '/media/teak/growth-04-mature.jpg',
    imageAlt: 'A mature teak trunk rising from the undergrowth',
  },
];
