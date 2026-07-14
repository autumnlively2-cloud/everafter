import { Button } from '@/components/ui/button'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Forgot Password',
  path: '/forgot-password',
  noIndex: true,
})

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-primary/10 bg-white/80 p-8 shadow-sm">
      <h1 className="font-heading text-3xl font-bold text-foreground">Forgot Password</h1>
      <p className="mt-2 text-sm text-foreground/70">
        Enter your email and we&apos;ll send a reset link.
      </p>
      <form className="mt-8 space-y-4">
        <input
          className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 outline-none focus:border-primary/40"
          placeholder="Email"
          type="email"
        />
        <Button className="w-full">Send Reset Link</Button>
      </form>
    </div>
  )
}
