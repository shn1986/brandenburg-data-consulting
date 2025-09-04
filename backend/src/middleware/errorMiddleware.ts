import { Request, Response, NextFunction } from 'express'

export interface CustomError extends Error {
  statusCode?: number
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as CustomError
  error.statusCode = 404
  next(error)
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  
  res.status(statusCode).json({
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}