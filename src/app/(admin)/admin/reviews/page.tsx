import { getReviews } from '@/services/admin'
import { AdminReviewsTable } from './reviews-table'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Admin Reviews',
  path: '/admin/reviews',
  noIndex: true,
})

export default async function AdminReviewsPage() {
  const reviews = await getReviews()

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '—'

  return (
    <section>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Reviews</h1>
        <p className="mt-1 text-foreground/70">
          {reviews.length} total — Average rating: {avgRating}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white/70 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-primary/10 bg-primary/5">
              <th className="px-4 py-3 font-semibold text-foreground/80">User</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Book</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Rating</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Review</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AdminReviewsTable reviews={reviews} />
          </tbody>
        </table>
      </div>
    </section>
  )
}