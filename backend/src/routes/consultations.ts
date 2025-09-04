import express, { Request, Response } from 'express'
import { db } from '../config/database'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Rate limiting for consultation requests
const consultationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 consultation requests per windowMs
  message: 'Too many consultation requests from this IP, please try again later.'
})

// POST /api/consultations - Schedule a new consultation
router.post('/', consultationLimiter, async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      company,
      phone,
      preferred_date,
      preferred_time,
      consultation_type,
      project_description,
      budget_range,
      timeline
    } = req.body

    // Validate required fields
    if (!first_name || !last_name || !email || !consultation_type || !project_description) {
      return res.status(400).json({ 
        message: 'Missing required fields: first_name, last_name, email, consultation_type, project_description' 
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format' 
      })
    }

    // Insert consultation request
    await db.run(
      `INSERT INTO consultations 
       (first_name, last_name, email, company, phone, preferred_date, preferred_time, 
        consultation_type, project_description, budget_range, timeline) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name, 
        email,
        company || null,
        phone || null,
        preferred_date || null,
        preferred_time || null,
        consultation_type,
        project_description,
        budget_range || null,
        timeline || null
      ]
    )

    // Send success response
    return res.status(201).json({
      message: 'Consultation scheduled successfully! We will contact you within 24 hours to confirm the details.',
      status: 'success'
    })

  } catch (error) {
    console.error('Consultation scheduling error:', error)
    return res.status(500).json({ 
      message: 'Failed to schedule consultation. Please try again later.',
      status: 'error'
    })
  }
})

export default router