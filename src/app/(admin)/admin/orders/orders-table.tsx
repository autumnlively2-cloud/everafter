'use client'

import { useOptimistic, useTransition } from 'react'
import type { AdminOrder } from '@/types/admin'
import { updateOrderStatus } from '@/services/admin'

const statuses: AdminOrder['status'][] = ['pending', 'paid', 'failed', 'cancelled']

type Props = {
  orders: AdminOrder[]
}

export function AdminOrdersTable({ orders: initialOrders }: Props) {
  const [isPending, startTransition] = useTransition()
  const [optimisticOrders, setOptimisticOrders] = useOptimistic(initialOrders)

  async function handleStatusChange(orderId: string, newStatus: AdminOrder['status']) {
    startTransition(async () => {
      setOptimisticOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      )
      const result = await updateOrderStatus(orderId, newStatus)
      if (!result.success) {
        alert(result.error ?? 'Failed to update order')
      }
    })
  }

  const statusStyles: Record<AdminOrder['status'], string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    failed: 'bg-red-50 text-red-700 border-red-200',
    cancelled: 'bg-gray-50 text-gray-500 border-gray-200',
  }

  return (
    <>
      {optimisticOrders.map((order) => (
        <tr
          key={order.id}
          className="border-b border-primary/5 transition-colors hover:bg-primary/[0.02]"
        >
          <td className="max-w-[200px] truncate px-4 py-3 font-mono text-xs text-foreground/60">
            {order.id}
          </td>
          <td className="px-4 py-3 text-foreground/70">{order.user_name || '—'}</td>
          <td className="px-4 py-3 text-foreground/70">{order.book_title || '—'}</td>
          <td className="px-4 py-3 text-foreground/70">
            ${Number(order.total).toFixed(2)}
          </td>
          <td className="px-4 py-3">
            <select
              defaultValue={order.status}
              onChange={(e) =>
                handleStatusChange(order.id, e.target.value as AdminOrder['status'])
              }
              disabled={isPending}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium ${statusStyles[order.status] ?? ''}`}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </td>
          <td className="px-4 py-3 text-foreground/60">
            {new Date(order.created_at).toLocaleDateString()}
          </td>
        </tr>
      ))}
    </>
  )
}