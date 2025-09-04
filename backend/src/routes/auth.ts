import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import rateLimit from 'express-rate-limit'
import { db } from '../config/database'
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware'

const router = express.Router()

// GET /api/auth - Auth routes overview
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Authentication API',
    endpoints: {
      'POST /api/auth/login': 'Login with email and password',
      'GET /api/auth/verify': 'Verify JWT token validity',
      'POST /api/auth/change-password': 'Change user password (authenticated)',
      'POST /api/auth/logout': 'Logout user'
    }
  })
})

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
})

// Validation rules
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
]

// POST /api/auth/login - Admin login
router.post('/login', authLimiter, loginValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: errors.array()
      })
    }

    const { email, password } = req.body

    // Find user in database
    const user = await db.get(
      'SELECT id, email, password, role FROM users WHERE email = ?',
      [email]
    )

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// POST /api/auth/change-password - Change password (authenticated)
router.post('/change-password', authenticateToken, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain uppercase, lowercase, number, and special character')
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: errors.array()
      })
    }

    const { currentPassword, newPassword } = req.body
    const userId = req.user!.id

    // Get current password hash
    const user = await db.get(
      'SELECT password FROM users WHERE id = ?',
      [userId]
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' })
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // Update password in database
    await db.run(
      'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [hashedNewPassword, userId]
    )

    return res.json({ message: 'Password changed successfully' })

  } catch (error) {
    console.error('Password change error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// GET /api/auth/verify - Verify token validity
router.get('/verify', authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Token is valid',
    user: req.user
  })
})

// POST /api/auth/logout - Logout (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

export default router