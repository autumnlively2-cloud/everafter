import { getUsers } from '@/services/admin'
import { AdminUsersTable } from './users-table'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Admin Users',
  path: '/admin/users',
  noIndex: true,
})

export default async function AdminUsersPage() {
  const users = await getUsers()

  return (
    <section>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Users</h1>
        <p className="mt-1 text-foreground/70">
          {users.length} user{users.length !== 1 ? 's' : ''} registered
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white/70 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-primary/10 bg-primary/5">
              <th className="px-4 py-3 font-semibold text-foreground/80">Name</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Email</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Role</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Joined</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AdminUsersTable users={users} />
          </tbody>
        </table>
      </div>
    </section>
  )
}