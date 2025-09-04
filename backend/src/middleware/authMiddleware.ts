import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { db } from '../config/database'

export interface AuthRequest extends Request {
  user?: {
    id: number
    email: string
    role: string
  }
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    // Fetch user from database to ensure they still exist
    const user = await db.get(
      'SELECT id, email, role FROM users WHERE id = ?',
      [decoded.id]
    )
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }
    
    req.user = user
    return next()
  } catch (error) {
    console.error('Token verification error:', error)
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  return next()
}