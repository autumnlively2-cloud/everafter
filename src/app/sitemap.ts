import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

const routes = [
  '',
  '/about',
  '/browse',
  '/pricing',
  '/contact',
  '/creator',
  '/login',
  '/register',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/browse' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
