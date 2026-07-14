import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Terms of Service',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold text-foreground">Terms of Service</h1>
      <p className="mt-6 text-foreground/70">Terms of service content coming soon.</p>
    </section>
  )
}
