'use client'

import { useOptimistic, useTransition } from 'react'
import type { AdminReview } from '@/types/admin'
import { deleteReview } from '@/services/admin'
import { Rating } from '@/components/ui/rating'

type Props = {
  reviews: AdminReview[]
}

export function AdminReviewsTable({ reviews: initialReviews }: Props) {
  const [isPending, startTransition] = useTransition()
  const [optimisticReviews, setOptimisticReviews] = useOptimistic(initialReviews)

  async function handleDelete(reviewId: string) {
    if (!confirm('Are you sure you want to delete this review?')) return

    startTransition(async () => {
      setOptimisticReviews((prev) => prev.filter((r) => r.id !== reviewId))
      const result = await deleteReview(reviewId)
      if (!result.success) {
        alert(result.error ?? 'Failed to delete review')
      }
    })
  }

  if (optimisticReviews.length === 0) {
    return (
      <tr>
        <td colSpan={6} className="px-4 py-16 text-center text-foreground/60">
          No reviews yet.
        </td>
      </tr>
    )
  }

  return (
    <>
      {optimisticReviews.map((review) => (
        <tr
          key={review.id}
          className="border-b border-primary/5 transition-colors hover:bg-primary/[0.02]"
        >
          <td className="px-4 py-3 text-foreground/70">{review.user_name || '—'}</td>
          <td className="px-4 py-3 text-foreground/70">{review.book_title || '—'}</td>
          <td className="px-4 py-3">
            <Rating value={review.rating} />
          </td>
          <td className="max-w-xs truncate px-4 py-3 text-foreground/70">
            {review.review || '—'}
          </td>
          <td className="px-4 py-3">
            <button
              onClick={() => handleDelete(review.id)}
              disabled={isPending}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              {isPending ? '...' : 'Delete'}
            </button>
          </td>
        </tr>
      ))}
    </>
  )
}