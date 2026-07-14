import { Rating } from '@/components/ui/rating'

const testimonials = [
  'My daughter cried when she saw herself in the book.',
  'Best birthday present ever.',
  "We've already ordered four.",
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-center font-heading text-3xl font-bold text-foreground">
        Testimonials
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((quote) => (
          <blockquote
            key={quote}
            className="rounded-3xl border border-primary/10 bg-white/70 p-6 shadow-sm"
          >
            <Rating value={5} />
            <p className="mt-4 text-foreground/80">&ldquo;{quote}&rdquo;</p>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
