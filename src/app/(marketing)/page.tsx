import { FeaturedBooks } from '@/components/home/featured-books'
import { CreatorSection } from '@/components/home/creator-section'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { Testimonials } from '@/components/home/testimonials'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'EverAfter | Personalized Storybooks',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedBooks />
      <HowItWorks />
      <Testimonials />
      <CreatorSection />
    </>
  )
}
