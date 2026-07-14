import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-0 px-4 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1 py-8">{children}</main>
      </div>
    </>
  )
}
