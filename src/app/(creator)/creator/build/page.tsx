import { sampleStoryTemplate } from '@/lib/story-engine/resolve'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Book Builder',
  path: '/creator/build',
  noIndex: true,
})

export default function CreatorBuildPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-foreground">Story Engine Preview</h1>
      <p className="mt-2 text-foreground/70">
        Milestone 4 will power AI generation. For now, here is the structured template format.
      </p>
      <pre className="mt-8 overflow-x-auto rounded-3xl border border-primary/10 bg-white/80 p-6 text-sm text-foreground/80">
        {JSON.stringify(sampleStoryTemplate, null, 2)}
      </pre>
    </section>
  )
}
