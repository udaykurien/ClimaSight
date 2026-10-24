import { Request, Response, NextFunction } from "express"
import { ApiResponse } from "@climasight/types"
import { supabaseAnon } from "../config/supabase.js"

function getTokenFromHeader(header: string | undefined): string | null {
  if (header === undefined) {
    return null
  }
  const parts = header.split(" ")
  if (parts.length !== 2) {
    return null
  }
  if (parts[0].toLowerCase() !== "bearer" || parts[1] === "") {
    return null
  }
  return parts[1]
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = getTokenFromHeader(req.headers.authorization)
  if (token == null) {
    const response: ApiResponse<never> = {
      data: null,
      error: 'Missing or invalid Authorization header.',
      success: false
    }
    res.status(401).json(response)
    return
  }

  const result = await supabaseAnon.auth.getUser(token)
  if (result.error !== null || result.data.user === null) {
    const response: ApiResponse<never> = {
      data: null,
      error: 'Invalid or expired token.',
      success: false
    }
    res.status(401).json(response)
    return
  }

  res.locals.userId = result.data.user.id
  next()
}
