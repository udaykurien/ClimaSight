import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import type { ApiResponse } from '@climasight/types'

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const response: ApiResponse<never> = {
        data: null,
        error: result.error.errors[0].message,
        success: false
      }
      res.status(400).json(response)
      return
    }

    req.body = result.data
    next()
  }
}
