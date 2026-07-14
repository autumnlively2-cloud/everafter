import type { Book } from '@/types/book'

export function bookStructuredData(book: Pick<Book, 'id' | 'title' | 'description' | 'cover_url' | 'price'>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    description: book.description ?? undefined,
    image: book.cover_url ?? undefined,
    offers: {
      '@type': 'Offer',
      price: book.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function websiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EverAfter',
    url: 'https://everafter.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://everafter.com/browse?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}
