import { beforeEach, describe, expect, it, vi } from 'vitest'
import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import request from 'supertest'
import { layoutRouter } from './layout.js'
import { createUserClient } from '../config/supabase.js'

const mocks = vi.hoisted(function () {
  return {
    createUserClient: vi.fn(),
    from: vi.fn(),
    select: vi.fn(),
    eq: vi.fn(),
    maybeSingle: vi.fn(),
    upsert: vi.fn()
  }
})

vi.mock('../config/supabase.js', function () {
  return { createUserClient: mocks.createUserClient }
})

vi.mock('../middleware/requireAuth.js', function () {
  return {
    requireAuth(_req: Request, res: Response, next: NextFunction) {
      res.locals.userId = "user-123"
      res.locals.token = "fake-token"
      next()
    }
  }
})

function createApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/layout', layoutRouter)
  return app
}

const validItem = { id: 'w1', type: 'test', x: 0, y: 0, width: 4, height: 2 }
const validBody = { version: 1, layout: [validItem] }

beforeEach(function () {
  vi.resetAllMocks()
  mocks.createUserClient.mockReturnValue({ from: mocks.from })
  mocks.from.mockReturnValue({ select: mocks.select, upsert: mocks.upsert })
  mocks.select.mockReturnValue({ eq: mocks.eq })
  mocks.eq.mockReturnValue({ maybeSingle: mocks.maybeSingle })
})
