import { Router } from 'express'
import type { ApiResponse, DashboardLayoutData } from '@climasight/types'
import { createUserClient } from '../config/supabase.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { validate } from '../middleware/validate.js'
import { z } from 'zod'

const layoutItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number()
})

const saveLayoutSchema = z.object({
  version: z.number().int().gt(0, "Version must be a positive whole number."),
  layout: z.array(layoutItemSchema).max(50)
})

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
      console.error('Layout load error:', error)
      const response: ApiResponse<never> = {
        data: null,
        error: 'Could not load layout.',
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
  return
  }
})

layoutRouter.put('/', requireAuth, validate(saveLayoutSchema), async (req, res) => {
  try {
    const { layout, version } = req.body
    const userClient = createUserClient(res.locals.token)
    const { error } = await userClient
      .from('dashboard_layouts')
      .upsert({
        user_id: res.locals.userId,
        layout: layout,
        version: version,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Layout save error:', error)
      const response: ApiResponse<never> = {
        data: null,
        error: 'Could not save layout.',
        success: false
      }
      res.status(500).json(response)
      return
    }

    const response: ApiResponse<DashboardLayoutData> = {
        data: { layout, version },
        error: null,
        success: true
      }
      res.status(200).json(response)

  } catch (error) {
    console.error('Layout save error:', error)
    const response: ApiResponse<never> = {
      data: null,
      error: 'Could not save layout.',
      success: false
    }
    res.status(500).json(response)
    return
  }
})
