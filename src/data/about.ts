/**
 * About-page editorial copy.
 *
 * Written to stand on confirmed ground only: Ganesh Nursery's 1980
 * establishment at Gandarvakottai, its published range, and general facts about
 * teak as a species. Nothing here claims scale, acreage or tenure that has
 * not been supplied — those live as placeholders in companyConfig.
 */

export const aboutIntro = {
  eyebrow: 'Who We Are',
  headline: ['A nursery that learned', 'to think in decades.'],
  lede:
    'Burma Teak Plant is the teak venture of Ganesh Nursery at Gandarvakottai, near Thanjavur — a nursery that has been putting saplings into Tamil Nadu soil since 1980.',
  body: [
    'Most of what a nursery supplies is answered within a season or two. A fruit tree fruits. A hedge fills in. You find out quickly whether you got it right.',
    'Teak is not like that. A teak plantation answers you in decades, and by then every decision you made at the start — the stock you chose, the spacing you set, the ground you prepared — has either compounded in your favour or quietly cost you. That long feedback loop is the whole discipline.',
    'So we approached teak the way the nursery has always approached planting: get the stock right, get the ground right, and stay involved long after the sale would normally have ended.',
  ],
  image: '/media/about/about-main.jpg',
  imageAlt: 'Mature teak trunks standing close together',
};

export type ValueCard = {
  title: string;
  body: string;
};

export const mission = {
  title: 'Mission',
  body:
    'To make well-grown Burma teak genuinely accessible to Indian growers — through sound planting stock, honest guidance and support that lasts as long as the trees take to grow.',
};

export const vision = {
  title: 'Vision',
  body:
    'Plantations that are worth more to the land, and to the family that owns them, in forty years than they were on the day they were planted.',
};

export const values: ValueCard[] = [
  {
    title: 'Patience',
    body:
      'We will say that a site is not ready, or that a season is wrong, even when it costs us the order. Teak punishes haste for decades.',
  },
  {
    title: 'Honesty',
    body:
      'No yield promises we cannot stand behind. Teak returns depend on soil, rainfall, management and markets we do not control, and we will tell you so.',
  },
  {
    title: 'Stewardship',
    body:
      'Soil, water and the life in a plantation are not externalities. On a teak timescale they are the asset.',
  },
  {
    title: 'Continuity',
    body:
      'Four decades of nursery practice behind the plant, and a relationship that is expected to outlast the planting season.',
  },
];

export const philosophy = {
  eyebrow: 'Plantation Philosophy',
  headline: ['Plant for the', 'person who inherits it.'],
  body:
    'A teak plantation is one of the few things a grower builds that is explicitly not for themselves. That reframes everything — you stop optimising for this year and start asking what will still be standing, and still be worth something, when someone else is making the decisions.',
  image: '/media/about/about-philosophy.jpg',
  imageAlt: 'A large mature teak trunk rising from the undergrowth',
};
