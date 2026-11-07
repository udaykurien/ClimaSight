import { supabase } from '@/lib/supabase'
import type { ApiResponse, DashboardLayoutData } from '@climasight/types'

export async function getLayout(): Promise<ApiResponse<DashboardLayoutData>> {
  const { data } = await supabase.auth.getSession()
  const token: string | undefined = data.session?.access_token

  if (token === undefined) {
    const result: ApiResponse<never> = {
      data: null,
      error: 'Token not found.',
      success: false
    }
    return result
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/layout`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  const result: ApiResponse<DashboardLayoutData> = await response.json()
  return result
}
