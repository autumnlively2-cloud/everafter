import { Button } from '@/components/ui/button'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Login',
  path: '/login',
  noIndex: true,
})

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-primary/10 bg-white/80 p-8 shadow-sm">
      <h1 className="font-heading text-3xl font-bold text-foreground">Login</h1>
      <form className="mt-8 space-y-4">
        <input
          className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 outline-none focus:border-primary/40"
          placeholder="Email"
          type="email"
        />
        <input
          className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 outline-none focus:border-primary/40"
          placeholder="Password"
          type="password"
        />
        <Button className="w-full">Sign In</Button>
      </form>
      <p className="mt-4 text-center text-sm text-foreground/70">
        <a href="/forgot-password" className="text-primary hover:underline">
          Forgot password?
        </a>
      </p>
    </div>
  )
}
