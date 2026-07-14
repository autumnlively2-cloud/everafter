import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Contact',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold text-foreground">Contact</h1>
      <form className="mt-8 space-y-4">
        <input
          className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 outline-none focus:border-primary/40"
          placeholder="Name"
        />
        <input
          className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 outline-none focus:border-primary/40"
          placeholder="Email"
          type="email"
        />
        <textarea
          className="min-h-32 w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 outline-none focus:border-primary/40"
          placeholder="How can we help?"
        />
        <button className="rounded-full bg-primary px-6 py-3 font-medium text-white">
          Send Message
        </button>
      </form>
    </section>
  )
}
