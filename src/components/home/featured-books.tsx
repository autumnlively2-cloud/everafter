import { BookCard } from '@/components/books/book-card'

const featuredBooks = [
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
  {
    slug: 'starlight-dreamer',
    title: 'The Starlight Dreamer',
    ageRange: '5-9',
    lesson: 'Imagination',
    price: 26.99,
    rating: 5,
    coverColor: 'from-accent/20 to-primary/20',
  },
]

export function FeaturedBooks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground">Featured Books</h2>
          <p className="mt-2 text-foreground/70">
            Beloved adventures ready to personalize for your child.
          </p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredBooks.map((book) => (
          <BookCard key={book.slug} {...book} />
        ))}
      </div>
    </section>
  )
}
