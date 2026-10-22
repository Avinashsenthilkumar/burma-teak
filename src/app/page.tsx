import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { TeakStory } from '@/components/sections/TeakStory';
import { absoluteUrl, siteConfig } from '@/config/site';

/**
 * Everything below the first two screens is code-split.
 *
 * The hero, the introduction and the teak story are what the visitor sees in
 * the first ten seconds; the eight sections after them carry the bulk of the
 * JavaScript and none of it is needed for the initial paint.
 *
 * `ssr: true` is left on throughout — these sections are the page's content
 * and must be in the HTML for crawlers and for anyone without JS.
 */
const ForestVideo = dynamic(() =>
  import('@/components/sections/ForestVideo').then((m) => m.ForestVideo),
);
const PlantationJourney = dynamic(() =>
  import('@/components/sections/PlantationJourney').then((m) => m.PlantationJourney),
);
const GrowthStory = dynamic(() =>
  import('@/components/sections/GrowthStory').then((m) => m.GrowthStory),
);
const Stats = dynamic(() => import('@/components/sections/Stats').then((m) => m.Stats));
const Sustainability = dynamic(() =>
  import('@/components/sections/Sustainability').then((m) => m.Sustainability),
);
const WhyChooseUs = dynamic(() =>
  import('@/components/sections/WhyChooseUs').then((m) => m.WhyChooseUs),
);
const GalleryPreview = dynamic(() =>
  import('@/components/sections/GalleryPreview').then((m) => m.GalleryPreview),
);
const VideoPreview = dynamic(() =>
  import('@/components/sections/VideoPreview').then((m) => m.VideoPreview),
);
const FounderBand = dynamic(() =>
  import('@/components/sections/FounderBand').then((m) => m.FounderBand),
);
const Journey = dynamic(() => import('@/components/sections/Journey').then((m) => m.Journey));
const CtaBanner = dynamic(() =>
  import('@/components/sections/CtaBanner').then((m) => m.CtaBanner),
);

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <TeakStory />
      <ForestVideo />
      <PlantationJourney />
      <GrowthStory />
      <Stats />
      <Sustainability />
      <WhyChooseUs />
      <GalleryPreview />
      <VideoPreview />
      <FounderBand />
      <Journey />
      <CtaBanner />
    </>
  );
}
