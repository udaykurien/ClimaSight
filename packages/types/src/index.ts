export interface User {
  id: string
  email: string
  fullName: string
  createdAt: string
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  email: string
  password: string
  fullName: string
}
