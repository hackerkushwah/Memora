import { MetadataRoute } from 'next';
import { articles } from '@/data/articles';

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
    '/faq',
    '/security',
    '/pricing',
    '/roadmap',
    '/changelog',
    '/accessibility',
    '/cookies'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Article routes dynamically generated from articles.ts
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/resources/${article.slug}`,
    lastModified: new Date(article.date || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...articleRoutes];
}
