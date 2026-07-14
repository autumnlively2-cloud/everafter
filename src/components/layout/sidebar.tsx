import Link from 'next/link'
import { dashboardNav } from '@/lib/site'

export function Sidebar() {
  return (
    <aside className="w-full shrink-0 border-r border-primary/10 bg-white/60 lg:w-64">
      <div className="px-4 py-6">
        <p className="font-heading text-lg font-semibold text-primary">Dashboard</p>
        <nav className="mt-6 space-y-1">
          {dashboardNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
