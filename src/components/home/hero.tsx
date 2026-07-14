import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-primary">
            Personalized storybooks
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Every Child Deserves to Be the Hero of Their Own Story
          </h1>
          <p className="mt-5 max-w-xl text-lg text-foreground/70">
            Create beautiful personalized books where your child becomes the main
            character in unforgettable adventures.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/creator" size="lg">
              Create My Book
            </Button>
            <Button href="/browse" variant="outline" size="lg">
              Browse Marketplace
            </Button>
          </div>
        </div>

        <div className="relative flex min-h-80 items-center justify-center rounded-[2rem] border border-primary/10 bg-white/70 p-8 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-4xl">
              ✨
            </div>
            <p className="font-heading text-xl font-semibold text-primary">
              Large illustration placeholder
            </p>
            <p className="mt-2 text-sm text-foreground/60">
              Hero artwork will live here
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
