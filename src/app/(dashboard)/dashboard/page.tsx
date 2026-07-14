import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Dashboard',
  path: '/dashboard',
  noIndex: true,
})

export default function DashboardPage() {
  return (
    <section>
      <h1 className="font-heading text-3xl font-bold text-foreground">Welcome Autumn</h1>
      <p className="mt-2 text-foreground/70">Continue reading your latest adventures.</p>
      <div className="mt-8 rounded-3xl border border-primary/10 bg-white/70 p-6">
        <h2 className="font-heading text-xl font-semibold">Continue Reading</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Your personalized books will appear here.
        </p>
      </div>
    </section>
  )
}
