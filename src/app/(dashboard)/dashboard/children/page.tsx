import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Child Profiles',
  path: '/dashboard/children',
  noIndex: true,
})

const children = [
  {
    name: 'Lily',
    age: 5,
    hair: 'Brown',
    eyes: 'Green',
    animal: 'Bunny',
    color: 'Purple',
    toy: 'Teddy bear',
  },
]

export default function ChildrenPage() {
  return (
    <section>
      <h1 className="font-heading text-3xl font-bold text-foreground">Children</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {children.map((child) => (
          <article
            key={child.name}
            className="rounded-3xl border border-primary/10 bg-white/70 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-xl">
                {child.name[0]}
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold">{child.name}</h2>
                <p className="text-sm text-foreground/70">Age {child.age}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-sm text-foreground/70">
              <div>Hair: {child.hair}</div>
              <div>Eyes: {child.eyes}</div>
              <div>Animal: {child.animal}</div>
              <div>Color: {child.color}</div>
              <div>Toy: {child.toy}</div>
            </dl>
            <button className="mt-4 text-sm font-medium text-primary hover:underline">
              Edit
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
