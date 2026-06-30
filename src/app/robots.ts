import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/'],
      },
      {
        userAgent: ['Googlebot', 'Mediapartners-Google'],
        allow: '/',
      }
    ],
    sitemap: 'https://memora.app/sitemap.xml',
  };
}
