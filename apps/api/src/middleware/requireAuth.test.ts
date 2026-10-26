import { describe, it, expect, vi } from "vitest"
import { Request, Response, NextFunction } from "express"
import { getTokenFromHeader, requireAuth } from "./requireAuth.js"

const mocks = vi.hoisted(function () {
  return { getUser: vi.fn() }
})

vi.mock("../config/supabase.js", function () {
  return {
    supabaseAnon: {},
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
  })
})
