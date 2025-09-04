import express, { Response } from 'express'
import { body, query, validationResult } from 'express-validator'
import { db } from '../config/database'
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/authMiddleware'

const router = express.Router()

// All admin routes require authentication
router.use(authenticateToken, requireAdmin)

// GET /api/admin - Admin API overview
router.get('/', (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Admin Dashboard API',
    endpoints: {
      'GET /api/admin/dashboard': 'Get dashboard statistics',
      'GET /api/admin/messages': 'Get contact messages with pagination',
      'PUT /api/admin/messages/:id/status': 'Update message status',
      'GET /api/admin/blog': 'Get blog posts (placeholder)',
      'GET /api/admin/portfolio': 'Get portfolio items (placeholder)',
      'GET /api/admin/testimonials': 'Get testimonials (placeholder)'
    },
    note: 'All admin routes require authentication and admin role',
    user: req.user
  })
})

// GET /api/admin/dashboard - Dashboard stats
router.get('/dashboard', async (req: AuthRequest, res: Response) => {
  try {
    // Get contact messages count
    const contactCount = await db.get(
      'SELECT COUNT(*) as count FROM contact_messages WHERE status = ?',
      ['new']
    )

    // Get total messages
    const totalMessages = await db.get(
      'SELECT COUNT(*) as count FROM contact_messages'
    )

    // Get blog posts count
    const blogCount = await db.get(
      'SELECT COUNT(*) as count FROM blog_posts WHERE status = ?',
      ['published']
    )

    // Get portfolio items count
    const portfolioCount = await db.get(
      'SELECT COUNT(*) as count FROM portfolio WHERE status = ?',
      ['published']
    )

    // Get recent messages
    const recentMessages = await db.all(
      `SELECT id, first_name, last_name, email, service, created_at 
       FROM contact_messages 
       ORDER BY created_at DESC 
       LIMIT 5`
    )

    res.json({
      stats: {
        newMessages: contactCount.count,
        totalMessages: totalMessages.count,
        publishedPosts: blogCount.count,
        portfolioItems: portfolioCount.count
      },
      recentMessages
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({ message: 'Failed to fetch dashboard stats' })
  }
})

// GET /api/admin/messages - Get contact messages
router.get('/messages', [
  query('status').optional().isIn(['new', 'read', 'replied']).withMessage('Invalid status'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: errors.array()
      })
    }

    const { status, page = 1, limit = 20 } = req.query
    const offset = (Number(page) - 1) * Number(limit)

    let whereClause = ''
    const params: any[] = []

    if (status) {
      whereClause = 'WHERE status = ?'
      params.push(status)
    }

    const messages = await db.all(
      `SELECT id, first_name, last_name, email, company, phone, service, message, status, created_at
       FROM contact_messages 
       ${whereClause}
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    )

    // Get total count
    const totalResult = await db.get(
      `SELECT COUNT(*) as count FROM contact_messages ${whereClause}`,
      params
    )

    return res.json({
      messages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalResult.count,
        pages: Math.ceil(totalResult.count / Number(limit))
      }
    })

  } catch (error) {
    console.error('Messages fetch error:', error)
    return res.status(500).json({ message: 'Failed to fetch messages' })
  }
})

// PUT /api/admin/messages/:id/status - Update message status
router.put('/messages/:id/status', [
  body('status').isIn(['new', 'read', 'replied']).withMessage('Invalid status')
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: errors.array()
      })
    }

    const { id } = req.params
    const { status } = req.body

    // Check if message exists
    const message = await db.get(
      'SELECT id FROM contact_messages WHERE id = ?',
      [id]
    )

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    // Update status
    await db.run(
      'UPDATE contact_messages SET status = ? WHERE id = ?',
      [status, id]
    )

    return res.json({ message: 'Message status updated successfully' })

  } catch (error) {
    console.error('Message status update error:', error)
    return res.status(500).json({ message: 'Failed to update message status' })
  }
})

// GET /api/admin/blog - Get blog posts
router.get('/blog', [
  query('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
], async (req: AuthRequest, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const offset = (Number(page) - 1) * Number(limit)

    let whereClause = ''
    const params: any[] = []

    if (status) {
      whereClause = 'WHERE status = ?'
      params.push(status)
    }

    const posts = await db.all(
      `SELECT id, title, slug, excerpt, author, status, tags, created_at, updated_at
       FROM blog_posts 
       ${whereClause}
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    )

    const totalResult = await db.get(
      `SELECT COUNT(*) as count FROM blog_posts ${whereClause}`,
      params
    )

    res.json({
      posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalResult.count,
        pages: Math.ceil(totalResult.count / Number(limit))
      }
    })

  } catch (error) {
    console.error('Blog posts fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch blog posts' })
  }
})

// GET /api/admin/portfolio - Get portfolio items
router.get('/portfolio', [
  query('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
], async (req: AuthRequest, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const offset = (Number(page) - 1) * Number(limit)

    let whereClause = ''
    const params: any[] = []

    if (status) {
      whereClause = 'WHERE status = ?'
      params.push(status)
    }

    const items = await db.all(
      `SELECT id, title, slug, client, industry, description, status, created_at, updated_at
       FROM portfolio 
       ${whereClause}
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    )

    const totalResult = await db.get(
      `SELECT COUNT(*) as count FROM portfolio ${whereClause}`,
      params
    )

    res.json({
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalResult.count,
        pages: Math.ceil(totalResult.count / Number(limit))
      }
    })

  } catch (error) {
    console.error('Portfolio fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch portfolio items' })
  }
})

// GET /api/admin/testimonials - Get testimonials
router.get('/testimonials', async (req: AuthRequest, res: Response) => {
  try {
    const testimonials = await db.all(
      `SELECT id, client_name, client_title, company, content, rating, status, created_at
       FROM testimonials 
       ORDER BY created_at DESC`
    )

    res.json({ testimonials })

  } catch (error) {
    console.error('Testimonials fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch testimonials' })
  }
})

export default router