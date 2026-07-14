import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Settings',
  path: '/dashboard/settings',
  noIndex: true,
})

export default function SettingsPage() {
  return (
    <section className="max-w-2xl">
      <h1 className="font-heading text-3xl font-bold text-foreground">Settings</h1>
      <form className="mt-8 space-y-4">
        <input
          className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 outline-none focus:border-primary/40"
          placeholder="Full name"
          defaultValue="Autumn"
        />
        <input
          className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 outline-none focus:border-primary/40"
          placeholder="Email"
          type="email"
        />
        <button className="rounded-full bg-primary px-6 py-3 font-medium text-white">
          Save Changes
        </button>
      </form>
    </section>
  )
}
