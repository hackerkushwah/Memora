import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://memora.app';

  // Base routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/resources',
    '/help',
    '/features',
    '/how-it-works',
    '/why-memora',
    '/faq'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const articleSlugs = [
    "digital-decluttering-guide",
    "ai-memory-organization",
    "productivity-vs-permanence",
    "building-a-second-brain",
    "psychology-of-digital-hoarding",
    "legacy-planning-digital-assets",
    "semantic-search-explained",
    "journaling-for-mental-clarity",
    "future-of-cloud-storage",
    "cognitive-offloading",
    "preserving-family-history",
    "minimalist-digital-workflow",
    "metadata-matters",
    "overcoming-photo-fatigue",
    "the-ethics-of-ai-memories"
  ];

  // Article routes
  const articleRoutes = articleSlugs.map((slug) => ({
    url: `${baseUrl}/resources/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...articleRoutes];
}
