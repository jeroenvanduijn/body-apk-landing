import type { MetadataRoute } from 'next';

// Zonder robots.txt + sitemap heeft Google geen route naar dit subdomein:
// de landing draaide maandenlang onvindbaar naast de Meta-ads.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://bodyapk.crossfitleiden.com/sitemap.xml',
  };
}
