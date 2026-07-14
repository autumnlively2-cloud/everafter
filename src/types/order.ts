export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled'

export type Order = {
  id: string
  user_id: string
  book_id: string
  status: OrderStatus
  total: number
  created_at: string
}
