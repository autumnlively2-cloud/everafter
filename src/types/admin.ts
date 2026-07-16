export type UserProfile = {
  id: string
  email: string
  full_name: string | null
  role: 'reader' | 'creator' | 'admin'
  created_at: string
}

export type AdminBook = {
  id: string
  title: string
  description: string | null
  author_id: string
  author_name?: string
  cover_url: string | null
  price: number
  category: string | null
  published: boolean
  created_at: string
}

export type AdminOrder = {
  id: string
  user_id: string
  user_name?: string
  book_id: string
  book_title?: string
  status: 'pending' | 'paid' | 'failed' | 'cancelled'
  total: number
  created_at: string
}

export type AdminReview = {
  id: string
  user_id: string
  user_name?: string
  book_id: string
  book_title?: string
  rating: number
  review: string | null
}

export type DashboardStats = {
  totalUsers: number
  totalBooks: number
  totalOrders: number
  totalRevenue: number
}