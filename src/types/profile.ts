export type UserRole = 'reader' | 'creator' | 'admin'

export type Profile = {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
}
