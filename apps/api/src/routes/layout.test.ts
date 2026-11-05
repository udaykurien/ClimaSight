import { beforeEach, describe, expect, it, vi } from 'vitest'
import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import request from 'supertest'
import { layoutRouter } from './layout.js'

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

describe('GET /api/layout', function () {
  it('returns 200 with the saved layout and version when the user has one', async function () {
    mocks.maybeSingle.mockResolvedValue({
      data: { layout: [validItem], version: 1 },
      error: null
    })

    const response = await request(createApp()).get('/api/layout')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: { layout: [validItem], version: 1 },
      error: null,
      success: true
    })
  })

  it('returns 200 with null data when the user has no saved layout', async function () {
    mocks.maybeSingle.mockResolvedValue({
      data: null,
      error: null
    })

    const response = await request(createApp()).get('/api/layout')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: null,
      error: null,
      success: true
    })
  })

  it('queries Supabase with the token and user id that requireAuth stored in res.locals', async function () {
    mocks.maybeSingle.mockResolvedValue({
      data: null,
      error: null
    })

    await request(createApp()).get('/api/layout')

    expect(mocks.createUserClient).toHaveBeenCalledWith('fake-token')
    expect(mocks.from).toHaveBeenCalledWith('dashboard_layouts')
    expect(mocks.eq).toHaveBeenCalledWith('user_id', 'user-123')
  })

  it('returns 500 with a fixed message, not the Supabase error text, when Supabase returns an error', async function () {
    mocks.maybeSingle.mockResolvedValue({
      data: null,
      error: { message: "secret database error message." }
    })

    const response = await request(createApp()).get('/api/layout')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      data: null,
      error: 'Could not load layout.',
      success: false
    })
  })

  it('returns 500 when the query throws', async function () {
    mocks.maybeSingle.mockRejectedValue(new Error('network down'))

    const response = await request(createApp()).get('/api/layout')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      data: null,
      error: 'Could not load layout.',
      success: false
    })
  })
})

describe('PUT /api/layout', function () {
  it('returns 200 with the saved layout and version when the save succeeds', async function () {
    mocks.upsert.mockResolvedValue({ error: null })

    const response = await request(createApp()).put('/api/layout').send(validBody)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: { layout: [validItem], version: 1 },
      error: null,
      success: true
    })
  })

  it('saves the row under the user id from res.locals, not one sent in the body', async function () {
    mocks.upsert.mockResolvedValue({ error: null })

    await request(createApp())
      .put('/api/layout')
      .send({ ...validBody, user_id: 'someone-else' })

    expect(mocks.createUserClient).toHaveBeenCalledWith('fake-token')
    expect(mocks.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: 'user-123', version: 1, layout: [validItem] })
    )
  })

  it('strips unknown keys from layout items before saving', async function () {
    mocks.upsert.mockResolvedValue({ error: null })

    await request(createApp())
      .put('/api/layout')
      .send({ version: 1, layout: [{ ...validItem, extra: 'should not be saved' }] })

    expect(mocks.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ layout: [validItem] })
    )
  })

  it('returns 500 with a fixed message when Supabase returns an error', async function () {
    mocks.upsert.mockResolvedValue({ error: {message: "secret database error details."} })

    const response = await request(createApp())
      .put('/api/layout')
      .send(validBody)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      data: null,
      error: 'Could not save layout.',
      success: false
    })
  })

  it('returns 500 when the save throws', async function () {
    mocks.upsert.mockRejectedValue(new Error('network down'))

    const response = await request(createApp())
      .put('/api/layout')
      .send(validBody)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      data: null,
      error: 'Could not save layout.',
      success: false
    })
  })

  it('returns 400 and does not save when the version is 0', async function () {

    const response = await request(createApp())
      .put('/api/layout').send({ version: 0, layout: [validItem] })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      data: null,
      error: "Version must be a positive whole number.",
      success: false
    })
    expect(mocks.upsert).not.toHaveBeenCalled()
  })

  it('returns 400 and does not save when the version is not a whole number', async function () {

    const response = await request(createApp())
      .put('/api/layout').send({ version: 1.5, layout: [validItem] })

    expect(response.status).toBe(400)
    expect(mocks.upsert).not.toHaveBeenCalled()
  })

  it('returns 400 and does not save when the layout has more than 50 items', async function () {
    const tooMany = Array.from({ length: 51 }, function (_unused, index) {
          return { ...validItem, id: 'w' + index }
        })

    const response = await request(createApp())
      .put('/api/layout')
      .send({ version: 1, layout: tooMany })

    expect(response.status).toBe(400)
    expect(mocks.upsert).not.toHaveBeenCalled()
  })

})
