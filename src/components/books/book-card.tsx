import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/ui/rating'

type BookCardProps = {
  slug: string
  title: string
  ageRange: string
  lesson: string
  price: number
  rating: number
  author?: string
  coverColor?: string
}

export function BookCard({
  slug,
  title,
  ageRange,
  lesson,
  price,
  rating,
  author = 'EverAfter Studio',
  coverColor = 'from-primary/20 to-secondary/20',
}: BookCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-primary/10 bg-white/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/book/${slug}`}>
        <div className={`flex h-52 items-center justify-center bg-gradient-to-br ${coverColor}`}>
          <span className="font-heading text-lg font-semibold text-primary/80">Cover</span>
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <div>
          <Link href={`/book/${slug}`}>
            <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
          </Link>
          <p className="mt-1 text-sm text-foreground/60">
            Ages {ageRange} · {lesson}
          </p>
        </div>
        <Rating value={rating} />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">${price.toFixed(2)}</p>
            <p className="text-xs text-foreground/60">{author}</p>
          </div>
          <Button href={`/book/${slug}`} size="sm">
            Customize
          </Button>
        </div>
      </div>
    </article>
  )
}
