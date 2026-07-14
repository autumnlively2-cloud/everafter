import Link from 'next/link'
import { footerNav } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-white/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-heading text-lg font-bold text-primary">EverAfter</p>
          <p className="mt-2 text-sm text-foreground/70">
            Personalized storybooks where every child becomes the hero.
          </p>
        </div>

        <FooterGroup title="Company" links={footerNav.company} />
        <FooterGroup title="Creators" links={footerNav.creators} />
        <FooterGroup title="Support" links={footerNav.support} />
      </div>
      <div className="border-t border-primary/10 px-4 py-4 text-center text-sm text-foreground/60">
        © {new Date().getFullYear()} EverAfter. All rights reserved.
      </div>
    </footer>
  )
}

function FooterGroup({
  title,
  links,
}: {
  title: string
  links: ReadonlyArray<{ label: string; href: string }>
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-foreground/70 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
