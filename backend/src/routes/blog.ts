import express, { Request, Response } from 'express'
import { db } from '../config/database'

const router = express.Router()

// GET /api/blog - Get all published blog posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await db.all(
      `SELECT id, title, slug, excerpt, author, tags, created_at, updated_at
       FROM blog_posts 
       WHERE status = 'published' 
       ORDER BY created_at DESC`
    )
    
    return res.json({
      posts,
      total: posts.length
    })
  } catch (error) {
    console.error('Blog posts fetch error:', error)
    return res.status(500).json({ message: 'Failed to fetch blog posts' })
  }
})

// GET /api/blog/:slug - Get specific blog post
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    
    const post = await db.get(
      `SELECT id, title, slug, excerpt, content, featured_image, author, tags, created_at, updated_at
       FROM blog_posts 
       WHERE slug = ? AND status = 'published'`,
      [slug]
    )
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    
    return res.json(post)
  } catch (error) {
    console.error('Blog post fetch error:', error)
    return res.status(500).json({ message: 'Failed to fetch blog post' })
  }
})

export default router