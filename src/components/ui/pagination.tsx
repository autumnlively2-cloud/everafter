import Link from 'next/link'

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-2 py-8" aria-label="Pagination">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1
        const isActive = page === currentPage

        return (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white text-foreground/70 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {page}
          </Link>
        )
      })}
    </nav>
  )
}
