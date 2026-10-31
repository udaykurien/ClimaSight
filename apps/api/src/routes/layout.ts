import { Router } from 'express'
import type { ApiResponse, DashboardLayoutData } from '@climasight/types'
import { createUserClient } from '../config/supabase.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const layoutRouter = Router()

layoutRouter.get('/', requireAuth, async (req, res) => {
  try {
    const userClient = createUserClient(res.locals.token)
    const { data, error } = await userClient
      .from('dashboard_layouts')
      .select('layout, version')
      .eq('user_id', res.locals.userId)
      .maybeSingle()

    if (error) {
      const response: ApiResponse<never> = {
        data: null,
        error: error.message,
        success: false
      }
      res.status(500).json(response)
      return
    }

    if (data === null) {
      const response: ApiResponse<DashboardLayoutData> = {
        data: null,
        error: null,
        success: true
      }
      res.status(200).json(response)
      return
    }

    const response: ApiResponse<DashboardLayoutData> = {
      data: {
        layout: data.layout,
        version: data.version
      },
      error: null,
      success: true
    }
    res.status(200).json(response)

  } catch (error) {
      console.error('Layout load error:', error)
      const response: ApiResponse<never> = {
        data: null,
        error: 'Could not load layout.',
        success: false
      }
      res.status(500).json(response)
    }

})
