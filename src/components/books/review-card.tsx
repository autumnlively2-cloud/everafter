import { Rating } from '@/components/ui/rating'

type ReviewCardProps = {
  author: string
  rating: number
  review: string
}

export function ReviewCard({ author, rating, review }: ReviewCardProps) {
  return (
    <article className="rounded-2xl border border-primary/10 bg-white/70 p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium text-foreground">{author}</p>
        <Rating value={rating} />
      </div>
      <p className="mt-3 text-sm text-foreground/75">{review}</p>
    </article>
  )
}
