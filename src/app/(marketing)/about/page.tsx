import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'About',
  path: '/about',
})

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold text-foreground">About EverAfter</h1>
      <p className="mt-6 text-lg text-foreground/70">
        EverAfter helps families create personalized storybooks where children become
        the heroes of their own adventures.
      </p>
    </section>
  )
}
