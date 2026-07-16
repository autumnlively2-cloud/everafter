import { getBooks } from '@/services/admin'
import { AdminBooksTable } from './books-table'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Admin Books',
  path: '/admin/books',
  noIndex: true,
})

export default async function AdminBooksPage() {
  const books = await getBooks()

  const publishedCount = books.filter((b) => b.published).length
  const draftCount = books.filter((b) => !b.published).length

  return (
    <section>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Books</h1>
        <p className="mt-1 text-foreground/70">
          {books.length} total — {publishedCount} published, {draftCount} drafts
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-primary/10 bg-white/70 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-primary/10 bg-primary/5">
              <th className="px-4 py-3 font-semibold text-foreground/80">Book</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Category</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Price</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Status</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Created</th>
              <th className="px-4 py-3 font-semibold text-foreground/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AdminBooksTable books={books} />
          </tbody>
        </table>
      </div>
    </section>
  )
}