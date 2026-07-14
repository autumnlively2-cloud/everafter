import Link from 'next/link'
import { mainNav } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/layout/search-bar'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-xl font-bold text-primary">
          EverAfter
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <SearchBar className="hidden md:block" />
          <Button href="/login" variant="ghost" size="sm">
            Login
          </Button>
          <Button href="/register" size="sm">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}
