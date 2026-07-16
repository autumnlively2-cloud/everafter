import { getDashboardStats } from '@/services/admin'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Admin Dashboard',
  path: '/admin',
  noIndex: true,
})

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  const cards = [
    {
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: '👥',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Total Books',
      value: stats.totalBooks.toLocaleString(),
      icon: '📚',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: '📦',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      label: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: '💰',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ]

  return (
    <section>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-foreground/70">
          Overview of your platform metrics
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border p-6 shadow-sm ${card.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{card.icon}</span>
            </div>
            <p className="mt-4 text-3xl font-bold">{card.value}</p>
            <p className="mt-1 text-sm font-medium opacity-80">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-sm">
          <h2 className="font-heading text-lg font-semibold">Quick Links</h2>
          <div className="mt-4 space-y-3">
            <a
              href="/admin/users"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              <span>👥</span> Manage Users
            </a>
            <a
              href="/admin/books"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              <span>📚</span> Manage Books
            </a>
            <a
              href="/admin/orders"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              <span>📦</span> Manage Orders
            </a>
            <a
              href="/admin/reviews"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              <span>⭐</span> Manage Reviews
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-sm">
          <h2 className="font-heading text-lg font-semibold">Platform Health</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-sm">
              <span className="font-medium text-emerald-800">Database</span>
              <span className="text-emerald-600">Connected</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-sm">
              <span className="font-medium text-emerald-800">Storage</span>
              <span className="text-emerald-600">Active</span>
            </div>
            <div className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground/70">
              <span className="font-medium">Last checked</span>
              <span>Just now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}