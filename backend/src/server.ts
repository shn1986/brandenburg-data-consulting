import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'

import { errorHandler, notFound } from './middleware/errorMiddleware'
import { initializeDatabase } from './config/database'
import authRoutes from './routes/auth'
import contentRoutes from './routes/content'
import contactRoutes from './routes/contact'
import adminRoutes from './routes/admin'
import portfolioRoutes from './routes/portfolio'
import blogRoutes from './routes/blog'
import consultationRoutes from './routes/consultations'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static files (for uploaded content)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/consultations', consultationRoutes)

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Brandenburg Data Consulting API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      content: '/api/content',
      contact: '/api/contact',
      admin: '/api/admin',
      portfolio: '/api/portfolio',
      blog: '/api/blog',
      consultations: '/api/consultations',
      health: '/api/health'
    },
    timestamp: new Date().toISOString()
  })
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase()
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📊 Environment: ${process.env.NODE_ENV}`)
      console.log(`🔗 API URL: http://localhost:${PORT}/api`)
      console.log(`🌐 CORS Origins: ${process.env.CORS_ORIGINS}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app