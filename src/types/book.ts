export type Book = {
  id: string
  title: string
  description: string | null
  author_id: string
  cover_url: string | null
  price: number
  category: string | null
  published: boolean
  created_at: string
}
