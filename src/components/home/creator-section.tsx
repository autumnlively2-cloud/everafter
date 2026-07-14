import { Button } from '@/components/ui/button'

export function CreatorSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-r from-primary to-secondary px-8 py-14 text-white shadow-sm">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          Earn Money Writing Children&apos;s Books
        </h2>
        <p className="mt-3 max-w-2xl text-white/85">
          Build story templates once and sell personalized versions in the marketplace.
        </p>
        <Button href="/creator" variant="accent" className="mt-8">
          Become a Creator
        </Button>
      </div>
    </section>
  )
}
