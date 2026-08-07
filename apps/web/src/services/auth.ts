import type { ApiResponse, LoginRequest, LoginResponseData, SignUpRequest, User } from '@climasight/types'

export async function signUp(payload: SignUpRequest): Promise<ApiResponse<User>> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const result: ApiResponse<User> = await response.json()
  return result
}

export async function login(payload: LoginRequest): Promise<ApiResponse<LoginResponseData>> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  const result: ApiResponse<LoginResponseData> = await response.json()
  return result
}
