import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';

/** Priorities reflect how the business actually wants traffic distributed. */
const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/teak', changeFrequency: 'yearly', priority: 0.9 },
  { path: '/plantation', changeFrequency: 'yearly', priority: 0.9 },
  { path: '/offerings', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/sustainability', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/gallery', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/videos', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
