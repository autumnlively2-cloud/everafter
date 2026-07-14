import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { createMetadata } from '@/lib/seo/metadata'
import { websiteStructuredData } from '@/lib/seo/structured-data'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = createMetadata({
  title: {
    default: 'EverAfter',
    template: '%s | EverAfter',
  },
  description:
    'Create beautiful personalized books where your child becomes the main character in unforgettable adventures.',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData()),
          }}
        />
        {children}
      </body>
    </html>
  )
}
