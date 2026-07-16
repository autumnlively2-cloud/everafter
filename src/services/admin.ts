import { createClient } from '@/lib/supabase/server'
import type { DashboardStats, AdminBook, AdminOrder, AdminReview, UserProfile } from '@/types/admin'

export async function getAdminUser(): Promise<{
  user: { id: string; email: string } | null
  profile: UserProfile | null
}> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { user: null, profile: null }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user: { id: user.id, email: user.email ?? '' }, profile }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient()

  const [{ count: totalUsers }, { count: totalBooks }, { count: totalOrders }, { data: revenueData }] =
    await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('books').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('total').eq('status', 'paid'),
    ])

  const totalRevenue =
    revenueData?.reduce((sum, order) => sum + Number(order.total), 0) ?? 0

  return {
    totalUsers: totalUsers ?? 0,
    totalBooks: totalBooks ?? 0,
    totalOrders: totalOrders ?? 0,
    totalRevenue,
  }
}

export async function getUsers(): Promise<UserProfile[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function getBooks(): Promise<AdminBook[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  if (!data) return []

  // Enrich with author names
  const authorIds = [...new Set(data.map((b) => b.author_id))]
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', authorIds)

  const profileMap = new Map(profiles?.map((p) => [p.id, p.full_name]) ?? [])

  return data.map((book) => ({
    ...book,
    price: Number(book.price),
    author_name: profileMap.get(book.author_id) ?? undefined,
  }))
}

export async function getOrders(): Promise<AdminOrder[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('orders')
    .select('*, profiles:user_id(full_name), books:book_id(title)')
    .order('created_at', { ascending: false })

  if (!data) return []

  return data.map((order) => ({
    id: order.id,
    user_id: order.user_id,
    user_name: (order as any).profiles?.full_name ?? undefined,
    book_id: order.book_id,
    book_title: (order as any).books?.title ?? undefined,
    status: order.status as AdminOrder['status'],
    total: Number(order.total),
    created_at: order.created_at,
  }))
}

export async function getReviews(): Promise<AdminReview[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('reviews')
    .select('*, profiles:user_id(full_name), books:book_id(title)')

  if (!data) return []

  return data.map((review) => ({
    id: review.id,
    user_id: review.user_id,
    user_name: (review as any).profiles?.full_name ?? undefined,
    book_id: review.book_id,
    book_title: (review as any).books?.title ?? undefined,
    rating: review.rating,
    review: review.review,
  }))
}

export async function updateBookStatus(
  bookId: string,
  published: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('books')
    .update({ published })
    .eq('id', bookId)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function updateOrderStatus(
  orderId: string,
  status: AdminOrder['status']
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteReview(
  reviewId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('reviews').delete().eq('id', reviewId)

  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function updateUserRole(
  userId: string,
  role: UserProfile['role']
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId)

  if (error) return { success: false, error: error.message }
  return { success: true }
}