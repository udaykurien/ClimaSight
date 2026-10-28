import { describe, it, expect, vi, beforeEach } from "vitest"
import { Request, Response, NextFunction } from "express"
import { getTokenFromHeader, requireAuth } from "./requireAuth.js"

const mocks = vi.hoisted(function () {
  return { getUser: vi.fn() }
})

vi.mock("../config/supabase.js", function () {
  return {
    supabaseAnon: { auth: { getUser: mocks.getUser } },
    supabaseAdmin: {}
  }
})

describe("getTokenFromHeader", function () {
  it("returns null when the header is undefined", function () {
    const result = getTokenFromHeader(undefined)
    expect(result).toBe(null)
  })
  it("returns null when the header is just Bearer with no token", function () {
    const result = getTokenFromHeader("Bearer")
    expect(result).toBe(null)
  })
  it("returns null when the token is empty", function () {
    const result = getTokenFromHeader("Bearer ")
    expect(result).toBe(null)
  })
  it("returns null when the scheme is not Bearer", function () {
    const result = getTokenFromHeader("Basic xyz")
    expect(result).toBe(null)
  })
  it("returns null when the header has more than two parts", function () {
    const result = getTokenFromHeader("Bearer a b")
    expect(result).toBe(null)
  })
  it("returns the token for a valid Bearer header", function () {
    const result = getTokenFromHeader("Bearer abc123")
    expect(result).toBe("abc123")
  })
  it("accepts the scheme in lower or upper or mixed case", function () {
    const result = getTokenFromHeader("BeAreR abc123")
    expect(result).toBe("abc123")
  })
})



describe("requireAuth", function () {

  beforeEach(function () {
      mocks.getUser.mockReset()
    })

  it("replies 401 and does not call next when there is no Authorization header", async function () {
    const req = { headers: {} }
    const res = {
      status: vi.fn(),
      json: vi.fn(),
      locals: {}
    }
    res.status.mockReturnValue(res)
    const next = vi.fn()

    await requireAuth(
      req as unknown as Request,
      res as unknown as Response,
      next as unknown as NextFunction
    )

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({
      data: null,
      error: 'Missing or invalid Authorization header.',
      success: false
    })
  })

  it("replies 401 and does not call next when Supabase rejects the token", async function () {
    const req = { headers: { authorization: "Bearer fake123" } }
    const res = {
      status: vi.fn(),
      json: vi.fn(),
      locals: {}
    }
    res.status.mockReturnValue(res)
    const next = vi.fn()
    mocks.getUser.mockResolvedValue({
      data: { user: null },
      error: { message: "invalid JWT" }
    })

    await requireAuth(
      req as unknown as Request,
      res as unknown as Response,
      next as unknown as NextFunction
    )

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({
      data: null,
      error: 'Invalid or expired token.',
      success: false
    })
  })

  it("stores the user id in res.locals and calls next when the token is valid", async function () {
    const req = { headers: { authorization: "Bearer fake123" } }
    const res = {
      status: vi.fn(),
      json: vi.fn(),
      locals: {}
    }
    res.status.mockReturnValue(res)
    const next = vi.fn()
    mocks.getUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null
    })

    await requireAuth(
      req as unknown as Request,
      res as unknown as Response,
      next as unknown as NextFunction
    )

    expect(res.locals).toEqual({ userId: "user-123" })
    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
  })

  it("replies 500 and does not call next when the Supabase call throws", async function () {
    const req = { headers: { authorization: "Bearer fake123" } }
    const res = {
      status: vi.fn(),
      json: vi.fn(),
      locals: {}
    }
    res.status.mockReturnValue(res)
    const next = vi.fn()
    mocks.getUser.mockRejectedValue(new Error("network down"))

    await requireAuth(
      req as unknown as Request,
      res as unknown as Response,
      next as unknown as NextFunction
    )

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      data: null,
      error: 'Supabase response error.',
      success: false
    })
  })

})
