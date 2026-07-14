import { Button } from '@/components/ui/button'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Checkout',
  path: '/checkout',
  noIndex: true,
})

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="font-heading text-3xl font-bold text-foreground">Checkout</h1>
      <div className="mt-8 rounded-3xl border border-primary/10 bg-white/70 p-6">
        <p className="text-foreground/70">Your cart is empty.</p>
        <Button href="/browse" className="mt-6">
          Browse Books
        </Button>
      </div>
    </section>
  )
}
