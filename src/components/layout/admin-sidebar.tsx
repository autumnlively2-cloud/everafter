'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const adminNav = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Users', href: '/admin/users', icon: '👥' },
  { label: 'Books', href: '/admin/books', icon: '📚' },
  { label: 'Orders', href: '/admin/orders', icon: '📦' },
  { label: 'Reviews', href: '/admin/reviews', icon: '⭐' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-full shrink-0 flex-col border-r border-primary/10 bg-white/60 lg:w-64">
      <div className="px-4 py-6">
        <Link href="/admin" className="font-heading text-lg font-semibold text-primary">
          Admin Panel
        </Link>
        <nav className="mt-6 space-y-1">
          {adminNav.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/80 hover:bg-primary/5 hover:text-primary'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto border-t border-primary/10 px-4 py-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-primary/5 hover:text-primary"
        >
          ← Back to app
        </Link>
      </div>
    </aside>
  )
}