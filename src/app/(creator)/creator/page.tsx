import { Button } from '@/components/ui/button'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Become a Creator',
  path: '/creator',
})

const builderSteps = [
  'Choose Story',
  'Choose Lesson',
  'Enter Child',
  'Customize Character',
  'Generate Story',
  'Generate Artwork',
  'Preview',
  'Checkout',
]

export default function CreatorPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-foreground">
          Become a Creator
        </h1>
        <p className="mt-4 text-lg text-foreground/70">
          Build reusable story templates powered by the EverAfter Story Engine.
          One template can become thousands of personalized books.
        </p>
        <Button href="/creator/build" className="mt-8">
          Start Building
        </Button>
      </div>

      <div className="mt-16 rounded-[2rem] border border-primary/10 bg-white/70 p-8">
        <h2 className="font-heading text-2xl font-semibold">AI Book Builder Flow</h2>
        <div className="mt-6 flex flex-col gap-3 md:gap-2">
          {builderSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <span className="font-medium text-foreground">{step}</span>
              {index < builderSteps.length - 1 ? (
                <span className="hidden text-primary/40 md:inline">↓</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
