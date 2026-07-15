'use client'

import { useOptimistic, useTransition } from 'react'
import { Avatar } from '@/components/ui/avatar'
import type { UserProfile } from '@/types/admin'
import { updateUserRole } from '@/services/admin'

const roles: UserProfile['role'][] = ['reader', 'creator', 'admin']

type Props = {
  users: UserProfile[]
}

export function AdminUsersTable({ users: initialUsers }: Props) {
  const [isPending, startTransition] = useTransition()
  const [optimisticUsers, setOptimisticUsers] = useOptimistic(initialUsers)

  async function handleRoleChange(userId: string, newRole: UserProfile['role']) {
    startTransition(async () => {
      setOptimisticUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      )
      const result = await updateUserRole(userId, newRole)
      if (!result.success) {
        // Revert on failure by re-fetching — for simplicity, just alert
        alert(result.error ?? 'Failed to update role')
      }
    })
  }

  return (
    <>
      {optimisticUsers.map((user) => (
        <tr
          key={user.id}
          className="border-b border-primary/5 transition-colors hover:bg-primary/[0.02]"
        >
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar name={user.full_name ?? user.email} size="sm" />
              <span className="font-medium text-foreground">
                {user.full_name || '—'}
              </span>
            </div>
          </td>
          <td className="px-4 py-3 text-foreground/70">{user.email}</td>
          <td className="px-4 py-3">
            <select
              defaultValue={user.role}
              onChange={(e) =>
                handleRoleChange(user.id, e.target.value as UserProfile['role'])
              }
              disabled={isPending}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium ${
                user.role === 'admin'
                  ? 'border-purple-200 bg-purple-50 text-purple-700'
                  : user.role === 'creator'
                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700'
              }`}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </td>
          <td className="px-4 py-3 text-foreground/60">
            {new Date(user.created_at).toLocaleDateString()}
          </td>
          <td className="px-4 py-3">
            <button
              onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'reader' : 'admin')}
              disabled={isPending}
              className="rounded-lg border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5 disabled:opacity-50"
            >
              {isPending ? '...' : 'Toggle Admin'}
            </button>
          </td>
        </tr>
      ))}
    </>
  )
}