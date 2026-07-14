import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Verify Email',
  path: '/verify-email',
  noIndex: true,
})

export default function VerifyEmailPage() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-primary/10 bg-white/80 p-8 text-center shadow-sm">
      <h1 className="font-heading text-3xl font-bold text-foreground">Verify Email</h1>
      <p className="mt-4 text-foreground/70">
        Check your inbox and click the verification link to activate your account.
      </p>
    </div>
  )
}
