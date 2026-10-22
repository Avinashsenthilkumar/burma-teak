/**
 * videoData — the films on the site.
 *
 * ---------------------------------------------------------------------------
 * THESE ARE 9:16 VERTICAL FILMS.
 *
 * The client's footage is shot for Instagram — 720x1280 portrait, with Tamil
 * narration and burned-in on-screen graphics. That is not a limitation to work
 * around; it decides how the films are presented. They are shown in portrait
 * frames at their true aspect ratio and played with sound, because they are
 * narrated pieces rather than silent b-roll.
 *
 * Two kinds of entry live here:
 *
 *   `films`   — the narrated reels. Portrait, with audio, click to play.
 *   loops     — `heroVideo` and `storyVideo`. Short, SILENT, muted background
 *               clips cut from clean scenic footage with no burned-in text,
 *               so they survive being cropped to landscape on a desktop.
 *
 * Never promote a narrated film to a background loop: it will be cropped to a
 * band through the middle and its captions will be cut in half.
 * ---------------------------------------------------------------------------
 *
 * Replacing footage: drop a new file at the same path. Every entry falls back
 * to its poster, so a missing .mp4 never renders a broken player.
 */

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  src: string;
  /** Lighter encode served to narrow screens. */
  mobileSrc?: string;
  /** Required. Always exists, always shown first. */
  poster: string;
  /** Poster matching `mobileSrc` when the two encodes differ in shape. */
  mobilePoster?: string;
  /** Display duration, e.g. '2:13'. */
  duration?: string;
  /** Portrait 9:16 by default; loops are flagged landscape-safe. */
  orientation?: 'portrait' | 'landscape';
  /** True for silent background loops. */
  silent?: boolean;
  /** Spoken language, surfaced in the UI so visitors know what to expect. */
  language?: string;
};

// --- Background loops -------------------------------------------------------
// Cut from clean scenic stretches: no presenter, no burned-in graphics, no
// audio track at all. Safe to crop to any aspect ratio.

/**
 * `src` is a landscape 16:9 encode, cropped from the vertical source and
 * upscaled once with lanczos at encode time. A desktop hero is a landscape
 * box, so serving the tall frame would make every browser decode 1280 rows
 * to display about 400 of them, every frame, for no visible gain.
 *
 * `mobileSrc` stays portrait, because a phone viewport already is 9:16 and
 * the footage fills it natively.
 */
export const heroVideo: VideoItem = {
  id: 'hero',
  title: 'Teak canopy',
  description: 'Mist through a mature teak canopy.',
  src: '/media/videos/hero-wide.mp4',
  mobileSrc: '/media/videos/hero-mobile.mp4',
  poster: '/media/posters/hero-wide.jpg',
  mobilePoster: '/media/posters/hero.jpg',
  orientation: 'landscape',
  silent: true,
};

export const storyVideo: VideoItem = {
  id: 'plantation-story',
  title: 'Every Tree Has A Story',
  description: 'Standing timber in a mature plantation.',
  src: '/media/videos/plantation-story-wide.mp4',
  mobileSrc: '/media/videos/plantation-story-mobile.mp4',
  poster: '/media/posters/plantation-story-wide.jpg',
  mobilePoster: '/media/posters/plantation-story.jpg',
  orientation: 'landscape',
  silent: true,
};

// --- The films --------------------------------------------------------------

export const films: VideoItem[] = [
  {
    id: 'burma-teak-plant',
    title: 'What Burma Teak Is',
    description:
      'An introduction to Burma teak at the nursery — what the plant is, and why growers ask for it by name.',
    src: '/media/videos/burma-teak-plant.mp4',
    poster: '/media/posters/burma-teak-plant.jpg',
    duration: '2:13',
    language: 'Tamil',
  },
  {
    id: 'teak-plantation',
    title: 'Inside A Teak Plantation',
    description:
      'Standing teak, canopy and undergrowth — what a plantation looks like once it has had time to become forest.',
    src: '/media/videos/teak-plantation.mp4',
    poster: '/media/posters/teak-plantation.jpg',
    duration: '2:00',
    language: 'Tamil',
  },
  {
    id: 'nursery-tour',
    title: 'Around The Nursery',
    description:
      'Through the beds at Gandarvakottai — how teak saplings are raised, graded and made ready to travel.',
    src: '/media/videos/nursery-tour.mp4',
    poster: '/media/posters/nursery-tour.jpg',
    duration: '1:58',
    language: 'Tamil',
  },
  {
    id: 'timber-and-time',
    title: 'Timber And Time',
    description:
      'Teak as finished timber, and the long horizon that produces it.',
    src: '/media/videos/timber-and-time.mp4',
    poster: '/media/posters/timber-and-time.jpg',
    duration: '2:24',
    language: 'Tamil',
  },
  {
    id: 'teak-saplings',
    title: 'The Saplings',
    description:
      'A close look at the planting stock itself — leaf, stem and root collar on a sapling ready for the field.',
    src: '/media/videos/teak-saplings.mp4',
    poster: '/media/posters/teak-saplings.jpg',
    duration: '0:46',
    language: 'Tamil',
  },
  {
    id: 'teak-in-use',
    title: 'Teak In Use',
    description:
      'From plantation to joinery — teak worked into the doors, gates and furniture it is grown for.',
    src: '/media/videos/teak-in-use.mp4',
    poster: '/media/posters/teak-in-use.jpg',
    duration: '1:26',
    language: 'Tamil',
  },
  {
    id: 'from-the-nursery',
    title: 'From The Nursery',
    description:
      'The nursery at work — plants, people and the day-to-day of growing timber stock.',
    src: '/media/videos/from-the-nursery.mp4',
    poster: '/media/posters/from-the-nursery.jpg',
    duration: '1:41',
    language: 'Tamil',
  },
];

/** Back-compat alias — older imports used `videos`. */
export const videos = films;

export const allVideos: VideoItem[] = [heroVideo, storyVideo, ...films];

/**
 * Which film belongs on which page.
 *
 * Seven films stacked on one page is a dead end: a visitor reading about
 * saplings has no reason to detour to a film index, and the films that would
 * answer their question sit three scrolls away on another route. So each film
 * is placed on the page whose subject it actually covers, and /videos keeps
 * the full set as the index.
 *
 * `byId` throws rather than returning undefined — a missing id here is a build
 * error worth failing on, not a silently empty section.
 */
function byId(id: string): VideoItem {
  const film = films.find((f) => f.id === id);
  if (!film) throw new Error(`No film with id "${id}" — check src/data/videos.ts`);
  return film;
}

export const filmsByPage = {
  /** Homepage strip — a broad sample, not the whole set. */
  home: ['burma-teak-plant', 'teak-plantation', 'nursery-tour'].map(byId),
  /** The feature at the top of the homepage film section. */
  homeFeature: byId('burma-teak-plant'),

  teak: byId('timber-and-time'),
  plantation: byId('teak-plantation'),
  offerings: byId('teak-saplings'),
  about: byId('from-the-nursery'),
  sustainability: byId('nursery-tour'),
  gallery: byId('teak-in-use'),
} as const;

/** Kept for the homepage strip. */
export const featuredFilms: VideoItem[] = filmsByPage.home;
