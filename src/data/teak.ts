/**
 * Editorial content for the "Why Burma Teak" story.
 *
 * These describe the timber species (Tectona grandis) in general terms —
 * they are characteristics of teak itself, not claims about this company.
 */

export type TeakTrait = {
  index: string;
  title: string;
  lede: string;
  body: string;
  image: string;
  imageAlt: string;
};

export const teakTraits: TeakTrait[] = [
  {
    index: '01',
    title: 'Durability',
    lede: 'A timber that refuses to age quickly.',
    body:
      'Teak carries natural oils and silica within its heartwood. That internal chemistry is why teak has been chosen for shipbuilding, temple joinery and outdoor furniture for centuries — it endures weather, humidity and time with very little intervention.',
    image: '/media/teak/teak-grain.jpg',
    imageAlt: 'Teak planks worked into a gate, the grain running vertically',
  },
  {
    index: '02',
    title: 'Strength',
    lede: 'Dimensionally stable, season after season.',
    body:
      'Well-grown teak moves very little once seasoned. It holds its shape through monsoon and dry season alike, resisting the warping, splitting and shrinkage that trouble lesser hardwoods — which is why joiners trust it for work meant to last.',
    image: '/media/teak/teak-timber.jpg',
    imageAlt: 'Teak logs stacked and loaded at a timber yard',
  },
  {
    index: '03',
    title: 'Natural Beauty',
    lede: 'Golden brown, deepening with every year.',
    body:
      'Freshly worked teak is a warm honey gold. Left to breathe, it settles into a deeper amber brown with a quiet lustre that needs no varnish. The grain is straight and even, with a figure that rewards a close look.',
    image: '/media/teak/teak-leaf.jpg',
    imageAlt: 'A teak sapling carrying broad young leaves',
  },
  {
    index: '04',
    title: 'Natural Resistance',
    lede: 'Protected from within.',
    body:
      'The same oils that give teak its scent also deter termites, borers and fungal decay. Mature heartwood defends itself, which means less chemical treatment across the life of the timber and a cleaner story from plantation to product.',
    image: '/media/teak/teak-bark.jpg',
    imageAlt: 'A mature teak tree standing full height',
  },
  {
    index: '05',
    title: 'Longevity',
    lede: 'Planted for a horizon you will not rush.',
    body:
      'Teak is not a quick crop. It is a long-horizon tree, and that is precisely the point — a plantation established with care becomes an appreciating asset that is handed on rather than consumed.',
    image: '/media/teak/teak-canopy.jpg',
    imageAlt: 'Teak crowns seen from the forest floor',
  },
];
