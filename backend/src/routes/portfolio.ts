import express, { Request, Response } from 'express'
import { db } from '../config/database'

const router = express.Router()

// GET /api/portfolio - Get all published portfolio items
router.get('/', async (req: Request, res: Response) => {
  try {
    const portfolio = await db.all(
      `SELECT id, title, slug, client, industry, description, challenge, solution, results, technologies, created_at, updated_at
       FROM portfolio 
       WHERE status = 'published' 
       ORDER BY created_at DESC`
    )
    
    return res.json({
      portfolio,
      total: portfolio.length
    })
  } catch (error) {
    console.error('Portfolio fetch error:', error)
    return res.status(500).json({ message: 'Failed to fetch portfolio items' })
  }
})

// GET /api/portfolio/:slug - Get specific portfolio item
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    
    const portfolioItem = await db.get(
      `SELECT id, title, slug, client, industry, description, challenge, solution, results, technologies, featured_image, gallery, created_at, updated_at
       FROM portfolio 
       WHERE slug = ? AND status = 'published'`,
      [slug]
    )
    
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' })
    }
    
    return res.json(portfolioItem)
  } catch (error) {
    console.error('Portfolio item fetch error:', error)
    return res.status(500).json({ message: 'Failed to fetch portfolio item' })
  }
})

export default router