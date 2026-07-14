import { BookCard } from '@/components/books/book-card'
import { marketplaceFilters } from '@/lib/site'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Browse Marketplace',
  path: '/browse',
})

const books = [
  {
    slug: 'brave-little-explorer',
    title: 'The Brave Little Explorer',
    ageRange: '3-7',
    lesson: 'Bravery',
    price: 24.99,
    rating: 5,
    coverColor: 'from-primary/20 to-secondary/20',
  },
  {
    slug: 'kindness-garden',
    title: 'The Kindness Garden',
    ageRange: '4-8',
    lesson: 'Kindness',
    price: 22.99,
    rating: 5,
    coverColor: 'from-secondary/20 to-accent/20',
  },
]

export default function BrowsePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-foreground">Marketplace</h1>
        <p className="mt-2 text-foreground/70">
          Discover story templates ready to personalize for your child.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-3xl border border-primary/10 bg-white/70 p-5">
          <h2 className="font-heading text-lg font-semibold">Filters</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            {marketplaceFilters.map((filter) => (
              <li key={filter}>{filter}</li>
            ))}
          </ul>
        </aside>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.slug} {...book} />
          ))}
        </div>
      </div>
    </section>
  )
}
