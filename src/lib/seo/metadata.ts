import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

type PageMetadata = {
  title: Metadata['title']
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = '',
  image = '/og-default.png',
  noIndex = false,
}: PageMetadata): Metadata {
  const url = `${siteConfig.url}${path}`
  const resolvedTitle =
    typeof title === 'string' ? title : title?.default?.toString() ?? siteConfig.name
  const resolvedDescription = description

  return {
    title,
    description: resolvedDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteConfig.name,
      images: [{ url: image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
