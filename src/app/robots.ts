import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/checkout', '/creator/build', '/verify-email'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
