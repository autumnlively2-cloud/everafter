'use client'

import { useOptimistic, useTransition } from 'react'
import type { AdminBook } from '@/types/admin'
import { updateBookStatus } from '@/services/admin'

type Props = {
  books: AdminBook[]
}

export function AdminBooksTable({ books: initialBooks }: Props) {
  const [isPending, startTransition] = useTransition()
  const [optimisticBooks, setOptimisticBooks] = useOptimistic(initialBooks)

  async function handleTogglePublish(bookId: string, current: boolean) {
    startTransition(async () => {
      setOptimisticBooks((prev) =>
        prev.map((b) => (b.id === bookId ? { ...b, published: !current } : b))
      )
      const result = await updateBookStatus(bookId, !current)
      if (!result.success) {
        alert(result.error ?? 'Failed to update book')
      }
    })
  }

  return (
    <>
      {optimisticBooks.map((book) => (
        <tr
          key={book.id}
          className="border-b border-primary/5 transition-colors hover:bg-primary/[0.02]"
        >
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="h-10 w-8 rounded object-cover"
                />
              ) : (
                <div className="flex h-10 w-8 items-center justify-center rounded bg-primary/10 text-xs text-primary">
                  📖
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">{book.title}</p>
                <p className="text-xs text-foreground/60">by {book.author_name || 'Unknown'}</p>
              </div>
            </div>
          </td>
          <td className="px-4 py-3 text-foreground/70">{book.category || '—'}</td>
          <td className="px-4 py-3 text-foreground/70">${Number(book.price).toFixed(2)}</td>
          <td className="px-4 py-3">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                book.published
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {book.published ? 'Published' : 'Draft'}
            </span>
          </td>
          <td className="px-4 py-3 text-foreground/60">
            {new Date(book.created_at).toLocaleDateString()}
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTogglePublish(book.id, book.published)}
                disabled={isPending}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
                  book.published
                    ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                    : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {isPending ? '...' : book.published ? 'Archive' : 'Publish'}
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}