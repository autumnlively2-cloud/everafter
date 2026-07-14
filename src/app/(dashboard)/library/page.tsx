import { EmptyState } from '@/components/ui/empty-state'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'My Library',
  path: '/library',
  noIndex: true,
})

export default function LibraryPage() {
  return (
    <EmptyState
      title="Your library is empty"
      description="Personalized books you purchase or create will show up here."
      actionLabel="Browse Marketplace"
      actionHref="/browse"
    />
  )
}
