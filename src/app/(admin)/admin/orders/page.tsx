import { getOrders } from '@/services/admin'
import { AdminOrdersTable } from './orders-table'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Admin Orders',
  path: '/admin/orders',
  noIndex: true,
})

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const paidCount = orders.filter((o) => o.status === 'paid').length
  const revenue = orders
    .filter((o) => o.status === 'paid')
    .reduce((sum, o) => sum + Number(o.total), 0)

  return (
    <section>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Orders</h1>
        <p className="mt-1 text-foreground/70">
          {orders.length} total — {paidCount} paid (${revenue.toFixed(2)}),{' '}
          {pendingCount} pending
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white/70 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-primary/10 bg-primary/5">
              <th className="px-4 py-3 font-semibold text-foreground/80">Order ID</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">User</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Book</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Total</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Status</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Date</th>
            </tr>
          </thead>
          <tbody>
            <AdminOrdersTable orders={orders} />
          </tbody>
        </table>
      </div>
    </section>
  )
}