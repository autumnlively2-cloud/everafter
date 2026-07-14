type AvatarProps = {
  name: string
  src?: string | null
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${sizeClasses[size]}`}
      />
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary/10 font-medium text-primary ${sizeClasses[size]}`}
    >
      {initials}
    </div>
  )
}
