import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/layout/admin-sidebar'
import { getAdminUser } from '@/services/admin'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, profile } = await getAdminUser()

  if (!user || !profile || profile.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="flex min-h-dvh">
      <AdminSidebar />
      <main className="flex-1 overflow-auto px-6 py-8 sm:px-8 lg:px-10">
        {children}
      </main>
    </div>
  )
}