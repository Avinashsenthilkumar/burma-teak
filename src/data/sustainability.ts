/** "Growing With Nature" — sustainability pillars. */

export type SustainabilityPillar = {
  /** Must match a lucide-react icon name exported from src/lib/icons.ts */
  icon: 'Sprout' | 'Droplets' | 'Layers' | 'Bird' | 'TreePine' | 'Recycle' | 'Sun';
  title: string;
  body: string;
};

export const sustainabilityPillars: SustainabilityPillar[] = [
  {
    icon: 'Layers',
    title: 'Soil Health',
    body:
      'Ground cover, organic matter and minimal disturbance keep topsoil where it belongs. Healthy soil is the only input a plantation cannot buy back later.',
  },
  {
    icon: 'Droplets',
    title: 'Water Management',
    body:
      'Contouring, mulching and season-aware irrigation make rainfall count, so young stands are carried through dry months without drawing down groundwater.',
  },
  {
    icon: 'Bird',
    title: 'Biodiversity',
    body:
      'Native margins, undisturbed corners and mixed planting give birds, pollinators and soil life somewhere to stay. A plantation with life in it is a plantation that defends itself.',
  },
  {
    icon: 'TreePine',
    title: 'Sustainable Forestry',
    body:
      'Selective harvesting with replanting designed in from the outset — the stand is renewed rather than cleared.',
  },
  {
    icon: 'Sprout',
    title: 'Long-Term Cultivation',
    body:
      'Teak rewards patience. Decisions are measured against a horizon of decades, not against this season, which quietly rules out most shortcuts.',
  },
  {
    icon: 'Recycle',
    title: 'Environmental Responsibility',
    body:
      'Minimal chemical dependence, reduced waste and careful handling of plantation residue, because what a plantation returns to the land matters as much as what it takes.',
  },
];

/** "Why Choose Us" — large numbered editorial features. */
export type Advantage = {
  index: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

export const advantages: Advantage[] = [
  {
    index: '01',
    title: 'Quality',
    body:
      'Planting stock is selected, not simply supplied. The quality of a plantation is decided in its first season, and it begins with the sapling.',
    image: '/media/company/why-01-quality.jpg',
    imageAlt: 'A tall young teak plant carrying full-sized leaves',
  },
  {
    index: '02',
    title: 'Nursery Heritage',
    body:
      'Burma Teak Plant grows out of Ganesh Nursery, which has supplied timber saplings, fruit trees and native plants from Gandarvakottai, near Thanjavur, since 1980. Four decades of nursery practice sit behind every plant.',
    image: '/media/company/why-02-heritage.jpg',
    imageAlt: 'Holding a teak sapling among the nursery beds',
  },
  {
    index: '03',
    title: 'Plantation Care',
    body:
      'Support does not stop at delivery. Guidance through spacing, early growth, pruning and thinning is where a plantation is actually made.',
    image: '/media/company/why-03-care.jpg',
    imageAlt: 'Tending a young teak plantation',
  },
  {
    index: '04',
    title: 'Sustainability',
    body:
      'Soil, water and biodiversity are treated as plantation infrastructure rather than as a postscript — because over a teak horizon, they are.',
    image: '/media/company/why-04-sustainability.jpg',
    imageAlt: 'A dense teak stand in full leaf',
  },
  {
    index: '05',
    title: 'Long-Term Vision',
    body:
      'We are in the business of trees that outlive the people who plant them. Every recommendation we make is weighed on that timescale.',
    image: '/media/company/why-05-vision.jpg',
    imageAlt: 'Teak logs and loader at the timber yard',
  },
];
