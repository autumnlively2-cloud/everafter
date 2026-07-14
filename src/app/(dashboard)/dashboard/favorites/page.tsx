import { EmptyState } from '@/components/ui/empty-state'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Favorites',
  path: '/dashboard/favorites',
  noIndex: true,
})

export default function FavoritesPage() {
  return (
    <EmptyState
      title="No favorites yet"
      description="Save books you love and come back to personalize them later."
      actionLabel="Browse Marketplace"
      actionHref="/browse"
    />
  )
}
