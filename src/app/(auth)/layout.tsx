import Link from 'next/link'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <Link href="/" className="mb-8 font-heading text-2xl font-bold text-primary">
        EverAfter
      </Link>
      {children}
    </div>
  )
}
