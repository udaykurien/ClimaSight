import { supabase } from '@/lib/supabase'
import type { ApiResponse, DashboardLayoutData } from '@climasight/types'

export async function getLayout(): Promise<ApiResponse<DashboardLayoutData>> {
  const { data, error } = await supabase.auth.getSession()
  if (error !== null) {
    const result: ApiResponse<never> = {
      data: null,
      error: error.message,
      success: false
    }
    return result
  }

  const token: string | undefined = data.session?.access_token

  if (token === undefined) {
    const result: ApiResponse<never> = {
      data: null,
      error: 'Token not found.',
      success: false
    }
    return result
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/layout`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    const result: ApiResponse<DashboardLayoutData> = await response.json()
    return result
  } catch (fetchError) {
    console.log('Layout load failed: ', fetchError)
    return {
      data: null,
      error: 'Layout load failed.',
      success: false
    }
  }
}

export async function saveLayout(payload: DashboardLayoutData): Promise<ApiResponse<DashboardLayoutData>> {
  const { data, error } = await supabase.auth.getSession()
  if (error !== null) {
    const result: ApiResponse<never> = {
      data: null,
      error: error.message,
      success: false
    }
    return result
  }

  const token: string | undefined = data.session?.access_token

  if (token === undefined) {
    const result: ApiResponse<never> = {
      data: null,
      error: 'Token not found.',
      success: false
    }
    return result
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/layout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    const result: ApiResponse<DashboardLayoutData> = await response.json()
    return result
  } catch (fetchError) {
    console.log('Layout save failed: ', fetchError)
    return {
      data: null,
      error: 'Layout save failed.',
      success: false
    }
  }
}
