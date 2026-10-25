import { describe, it, expect, vi } from "vitest"
import { getTokenFromHeader } from "./requireAuth.js"

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
