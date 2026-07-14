import { Button } from '@/components/ui/button'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Pricing',
  path: '/pricing',
})

const plans = [
  { name: 'Digital Book', price: '$14.99', detail: 'Instant personalized ebook' },
  { name: 'Hardcover', price: '$29.99', detail: 'Premium printed keepsake' },
  { name: 'Gift Bundle', price: '$39.99', detail: 'Digital + hardcover combo' },
]

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-center font-heading text-4xl font-bold text-foreground">Pricing</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/70">
        Simple pricing for magical personalized books.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="rounded-3xl border border-primary/10 bg-white/70 p-8 text-center shadow-sm"
          >
            <h2 className="font-heading text-xl font-semibold">{plan.name}</h2>
            <p className="mt-4 text-3xl font-bold text-primary">{plan.price}</p>
            <p className="mt-2 text-sm text-foreground/70">{plan.detail}</p>
            <Button href="/creator" className="mt-6">
              Get Started
            </Button>
          </article>
        ))}
      </div>
    </section>
  )
}
