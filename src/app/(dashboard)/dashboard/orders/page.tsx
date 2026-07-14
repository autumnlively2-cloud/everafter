import { EmptyState } from '@/components/ui/empty-state'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Orders',
  path: '/dashboard/orders',
  noIndex: true,
})

export default function OrdersPage() {
  return (
    <EmptyState
      title="No orders yet"
      description="Your book purchases and print orders will appear here."
      actionLabel="Browse Books"
      actionHref="/browse"
    />
  )
}
