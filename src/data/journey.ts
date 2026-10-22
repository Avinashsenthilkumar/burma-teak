/**
 * "Our Journey" — company timeline.
 *
 * Only the 1980 Ganesh Nursery milestone is confirmed. Every other year is a
 * placeholder: the Timeline component renders a muted marker instead of a date
 * wherever `year` is bracketed, so no date is published as fact.
 */

export type JourneyMilestone = {
  year: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: '1980',
    title: 'Foundation',
    body:
      'Ganesh Nursery is established at Gandarvakottai, near Thanjavur, supplying timber saplings, fruit trees and native plants to growers across Tamil Nadu.',
    image: '/media/company/journey-01-foundation.jpg',
    imageAlt: 'Broad teak leaves in the nursery beds',
  },
  {
    year: '[YEAR_PLANTATION_DEVELOPMENT]',
    title: 'Plantation Development',
    body:
      'Focus widens from supplying saplings to developing full teak plantations — site assessment, spacing, planting and early-growth care.',
    image: '/media/company/journey-02-development.jpg',
    imageAlt: 'Spraying a young teak stand',
  },
  {
    year: '[YEAR_GROWTH]',
    title: 'Growth',
    body: '[MILESTONE_GROWTH_DESCRIPTION]',
    image: '/media/company/journey-03-growth.jpg',
    imageAlt: 'Young teak standing against open sky',
  },
  {
    year: '[YEAR_EXPANSION]',
    title: 'Expansion',
    body: '[MILESTONE_EXPANSION_DESCRIPTION]',
    image: '/media/company/journey-04-expansion.jpg',
    imageAlt: 'The nursery grounds seen from above',
  },
  {
    year: 'Ahead',
    title: 'Future Vision',
    body:
      'Burma Teak Plant continues to grow teak the long way — stands established with care today, handed on as timber and as land in better condition than we found it.',
    image: '/media/company/journey-05-future.jpg',
    imageAlt: 'Young teak reaching toward the sky',
  },
];
