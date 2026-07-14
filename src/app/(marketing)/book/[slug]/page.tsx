import { Button } from '@/components/ui/button'
import { ReviewCard } from '@/components/books/review-card'
import { bookStructuredData } from '@/lib/seo/structured-data'
import { createMetadata } from '@/lib/seo/metadata'

type BookPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BookPageProps) {
  const { slug } = await params
  const title = slug.replace(/-/g, ' ')

  return createMetadata({
    title: title.replace(/\b\w/g, (char) => char.toUpperCase()),
    path: `/book/${slug}`,
  })
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const book = {
    id: slug,
    title,
    description:
      'A personalized adventure where your child becomes the hero of an unforgettable story.',
    cover_url: null,
    price: 24.99,
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookStructuredData(book)),
        }}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex min-h-96 items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary/15 to-secondary/15">
          <span className="font-heading text-xl font-semibold text-primary">Cover</span>
        </div>

        <div>
          <h1 className="font-heading text-4xl font-bold text-foreground">{title}</h1>
          <p className="mt-4 text-foreground/70">{book.description}</p>
          <p className="mt-6 text-2xl font-semibold text-foreground">
            ${book.price.toFixed(2)}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/creator">Choose Child</Button>
            <Button href="/creator" variant="outline">
              Customize
            </Button>
            <Button href="/checkout" variant="secondary">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-semibold">Preview Pages</h2>
          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((page) => (
              <div
                key={page}
                className="rounded-2xl border border-primary/10 bg-white/70 p-6"
              >
                Page {page} preview placeholder
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-semibold">Reviews</h2>
          <div className="mt-4 space-y-4">
            <ReviewCard
              author="Sarah M."
              rating={5}
              review="My daughter lit up when she saw her name in the story."
            />
            <ReviewCard
              author="James T."
              rating={5}
              review="Beautiful quality and such a meaningful gift."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
