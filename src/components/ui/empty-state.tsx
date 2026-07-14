import { Button } from '@/components/ui/button'

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-primary/15 bg-white/60 px-8 py-16 text-center">
      <h3 className="font-heading text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-foreground/70">{description}</p>
      {actionLabel && actionHref ? (
        <Button href={actionHref} className="mt-6">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
