import { Router } from 'express'
import { z } from 'zod'
import type { ApiResponse, User } from '@climasight/types'
import { supabaseAnon } from '../config/supabase.js'
import { validate } from '../middleware/validate.js'

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(1, 'Full name is required')
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export const authRouter = Router()

authRouter.post('/signup', validate(signUpSchema), async (req, res) => {
  const { email, password, fullName } = req.body

  const { data, error } = await supabaseAnon.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  })

  if (error) {
    const response: ApiResponse<never> = {
      data: null,
      error: error.message,
      success: false
    }
    res.status(400).json(response)
    return
  }

  const user: User = {
    id: data.user!.id,
    email: data.user!.email!,
    fullName: fullName,
    createdAt: data.user!.created_at
  }

  const response: ApiResponse<User> = {
    data: user,
    error: null,
    success: true
  }

  res.status(201).json(response)
})

authRouter.post('/login', validate(loginSchema), async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabaseAnon.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    const response: ApiResponse<never> = {
      data: null,
      error: error.message,
      success: false
    }
    res.status(401).json(response)
    return
  }

  const user: User = {
    id: data.user.id,
    email: data.user.email!,
    fullName: data.user.user_metadata.full_name,
    createdAt: data.user.created_at
  }

  const response: ApiResponse<User> = {
    data: user,
    error: null,
    success: true
  }

  res.status(200).json(response)
})
