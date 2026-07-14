type RatingProps = {
  value: number
  max?: number
}

export function Rating({ value, max = 5 }: RatingProps) {
  return (
    <div className="flex items-center gap-0.5 text-accent" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, index) => (
        <span key={index} className={index < value ? 'opacity-100' : 'opacity-25'}>
          ★
        </span>
      ))}
    </div>
  )
}
