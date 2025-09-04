import express, { Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'
import { db } from '../config/database'
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/authMiddleware'

const router = express.Router()

// GET /api/content - Content API overview
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Content Management API',
    endpoints: {
      'GET /api/content/:page': 'Get all content for a page',
      'GET /api/content/:page/:section': 'Get content for a specific section',
      'POST /api/content': 'Create new content (Admin)',
      'PUT /api/content/:page/:section/:key': 'Update content item (Admin)',
      'DELETE /api/content/:page/:section/:key': 'Delete content item (Admin)',
      'GET /api/content/all': 'Get all content (Admin)'
    }
  })
})

// GET /api/content/all - Get all content (Admin only)
router.get('/all', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const content = await db.all(
      'SELECT page, section, key, value, type, created_at, updated_at FROM content ORDER BY page, section, key'
    )

    return res.json({
      content,
      total: content.length
    })

  } catch (error) {
    console.error('All content fetch error:', error)
    return res.status(500).json({ message: 'Failed to fetch content' })
  }
})

// GET /api/content/:page - Get all content for a specific page
router.get('/:page', async (req: Request, res: Response) => {
  try {
    const { page } = req.params
    
    const content = await db.all(
      'SELECT section, key, value, type FROM content WHERE page = ?',
      [page]
    )

    // Structure content by section
    const structuredContent: Record<string, Record<string, string>> = {}
    
    content.forEach((item: any) => {
      if (!structuredContent[item.section]) {
        structuredContent[item.section] = {}
      }
      structuredContent[item.section]![item.key] = item.value
    })

    res.json({
      page,
      content: structuredContent
    })

  } catch (error) {
    console.error('Content fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch content' })
  }
})

// GET /api/content/:page/:section - Get content for a specific page section
router.get('/:page/:section', async (req, res) => {
  try {
    const { page, section } = req.params
    
    const content = await db.all(
      'SELECT key, value, type FROM content WHERE page = ? AND section = ?',
      [page, section]
    )

    const sectionContent: Record<string, string> = {}
    content.forEach((item: any) => {
      sectionContent[item.key] = item.value
    })

    res.json({
      page,
      section,
      content: sectionContent
    })

  } catch (error) {
    console.error('Section content fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch section content' })
  }
})

// POST /api/content - Create or update content (Admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('page').notEmpty().withMessage('Page is required'),
  body('section').notEmpty().withMessage('Section is required'),
  body('key').notEmpty().withMessage('Key is required'),
  body('value').notEmpty().withMessage('Value is required'),
  body('type').optional().isIn(['text', 'html', 'markdown', 'json']).withMessage('Invalid content type')
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: errors.array()
      })
    }

    const { page, section, key, value, type = 'text' } = req.body

    // Insert or update content
    await db.run(
      `INSERT INTO content (page, section, key, value, type, updated_at) 
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(page, section, key) 
       DO UPDATE SET value = ?, type = ?, updated_at = CURRENT_TIMESTAMP`,
      [page, section, key, value, type, value, type]
    )

    return res.status(201).json({
      message: 'Content saved successfully',
      data: { page, section, key, value, type }
    })

  } catch (error) {
    console.error('Content save error:', error)
    return res.status(500).json({ message: 'Failed to save content' })
  }
})

// PUT /api/content/:page/:section/:key - Update specific content item (Admin only)
router.put('/:page/:section/:key', authenticateToken, requireAdmin, [
  body('value').notEmpty().withMessage('Value is required'),
  body('type').optional().isIn(['text', 'html', 'markdown', 'json']).withMessage('Invalid content type')
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: errors.array()
      })
    }

    const { page, section, key } = req.params
    const { value, type = 'text' } = req.body

    // Check if content exists
    const existingContent = await db.get(
      'SELECT id FROM content WHERE page = ? AND section = ? AND key = ?',
      [page, section, key]
    )

    if (!existingContent) {
      return res.status(404).json({ message: 'Content not found' })
    }

    // Update content
    await db.run(
      'UPDATE content SET value = ?, type = ?, updated_at = CURRENT_TIMESTAMP WHERE page = ? AND section = ? AND key = ?',
      [value, type, page, section, key]
    )

    return res.json({
      message: 'Content updated successfully',
      data: { page, section, key, value, type }
    })

  } catch (error) {
    console.error('Content update error:', error)
    return res.status(500).json({ message: 'Failed to update content' })
  }
})

// DELETE /api/content/:page/:section/:key - Delete specific content item (Admin only)
router.delete('/:page/:section/:key', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { page, section, key } = req.params

    const result = await db.run(
      'DELETE FROM content WHERE page = ? AND section = ? AND key = ?',
      [page, section, key]
    )

    res.json({ message: 'Content deleted successfully' })

  } catch (error) {
    console.error('Content delete error:', error)
    res.status(500).json({ message: 'Failed to delete content' })
  }
})


export default router