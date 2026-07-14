type SearchBarProps = {
  className?: string
}

export function SearchBar({ className = '' }: SearchBarProps) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">Search books</span>
      <input
        type="search"
        placeholder="Search books..."
        className="h-10 w-56 rounded-full border border-primary/15 bg-white px-4 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
      />
    </label>
  )
}
