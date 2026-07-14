import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'FAQ',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold text-foreground">FAQ</h1>
      <p className="mt-6 text-foreground/70">Frequently asked questions coming soon.</p>
    </section>
  )
}
