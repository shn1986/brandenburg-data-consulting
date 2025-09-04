import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'
import { db } from '../config/database'

const router = express.Router()

// GET /api/contact - Contact API overview
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Contact Form API',
    endpoints: {
      'POST /api/contact': 'Submit contact form'
    },
    requiredFields: ['name', 'email', 'message'],
    rateLimits: {
      windowMs: '15 minutes',
      max: 3,
      note: 'Limit of 3 submissions per 15 minutes per IP'
    }
  })
})

// Contact form rate limiting - more restrictive
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 contact form submissions per 15 minutes
  message: 'Too many contact form submissions. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Validation rules
const contactValidation = [
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters'),
  
  body('phone')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Valid phone number required'),
  
  body('service')
    .optional()
    .trim()
    .isIn([
      'Data Strategy Consulting',
      'Data Modeling & Architecture',
      'Data Transformation & ETL',
      'Agentic AI Solutions',
      'Machine Learning Implementation',
      'Cloud Data Solutions',
      'Business Intelligence & Analytics',
      'Data Migration Projects',
      'Training & Workshops',
      'General Inquiry'
    ])
    .withMessage('Invalid service selection'),
  
  body('budget_range')
    .optional()
    .trim()
    .isIn([
      'Under $10,000',
      '$10,000 - $50,000',
      '$50,000 - $100,000',
      '$100,000 - $250,000',
      '$250,000+',
      'To be discussed'
    ])
    .withMessage('Invalid budget range selection'),
  
  body('timeline')
    .optional()
    .trim()
    .isIn([
      'Immediate (< 1 month)',
      '1-3 months',
      '3-6 months',
      '6-12 months',
      '12+ months',
      'Flexible/Planning stage'
    ])
    .withMessage('Invalid timeline selection'),
  
  body('contact_method')
    .optional()
    .trim()
    .isIn([
      'Email',
      'Phone call',
      'Video conference',
      'In-person meeting',
      'No preference'
    ])
    .withMessage('Invalid contact method selection'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
]

// POST /api/contact - Submit contact form
router.post('/', contactLimiter, contactValidation, async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: errors.array()
      })
    }

    const {
      first_name,
      last_name,
      email,
      company,
      phone,
      service,
      message,
      budget_range,
      timeline,
      contact_method,
      preferred_date,
      preferred_time
    } = req.body

    // Store in database - using existing contact_messages table structure
    await db.run(
      `INSERT INTO contact_messages 
       (first_name, last_name, email, company, phone, service, message) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name, 
        last_name, 
        email, 
        company || null, 
        phone || null, 
        service || null, 
        // Enhanced message with additional details
        `${message}\n\n--- Additional Details ---\n${budget_range ? `Budget Range: ${budget_range}\n` : ''}${timeline ? `Timeline: ${timeline}\n` : ''}${contact_method ? `Preferred Contact: ${contact_method}\n` : ''}${preferred_date ? `Preferred Date: ${preferred_date}\n` : ''}${preferred_time ? `Preferred Time: ${preferred_time}` : ''}`
      ]
    )

    // Send email notification if email is configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter()
        
        // Email to admin
        await transporter.sendMail({
          from: process.env.FROM_EMAIL || process.env.SMTP_USER,
          to: process.env.TO_EMAIL || 'hello@brandenburgdata.com',
          subject: `New Contact Form Submission - ${service || 'General Inquiry'}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${first_name} ${last_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ''}
            ${budget_range ? `<p><strong>Budget Range:</strong> ${budget_range}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
            ${contact_method ? `<p><strong>Preferred Contact:</strong> ${contact_method}</p>` : ''}
            ${preferred_date ? `<p><strong>Preferred Date:</strong> ${preferred_date}</p>` : ''}
            ${preferred_time ? `<p><strong>Preferred Time:</strong> ${preferred_time}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
          `
        })

        // Auto-reply to customer
        await transporter.sendMail({
          from: process.env.FROM_EMAIL || process.env.SMTP_USER,
          to: email,
          subject: 'Thank you for contacting Brandenburg Data Consulting',
          html: `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
              <h2 style="color: #0ea5e9;">Thank you for your inquiry!</h2>
              <p>Dear ${first_name},</p>
              <p>Thank you for reaching out to Brandenburg Data Consulting. We have received your message and will respond within 24 hours.</p>
              <p><strong>Your inquiry summary:</strong></p>
              <ul>
                ${service ? `<li><strong>Service of Interest:</strong> ${service}</li>` : ''}
                ${budget_range ? `<li><strong>Budget Range:</strong> ${budget_range}</li>` : ''}
                ${timeline ? `<li><strong>Timeline:</strong> ${timeline}</li>` : ''}
                ${contact_method ? `<li><strong>Preferred Contact Method:</strong> ${contact_method}</li>` : ''}
                ${preferred_date ? `<li><strong>Preferred Date:</strong> ${preferred_date}</li>` : ''}
                ${preferred_time ? `<li><strong>Preferred Time:</strong> ${preferred_time}</li>` : ''}
                <li><strong>Message:</strong> ${message}</li>
              </ul>
              <p>In the meantime, feel free to explore our services and insights on our website.</p>
              <p>Best regards,<br>
              Brandenburg Data Consulting Team</p>
              <hr>
              <p style="font-size: 12px; color: #666;">
                Brandenburg Data Consulting<br>
                Email: hello@brandenburgdata.com<br>
                Phone: +1 (555) 123-4567
              </p>
            </div>
          `
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Don't fail the request if email fails, just log it
      }
    }

    return res.status(201).json({
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      success: true
    })

  } catch (error) {
    console.error('Contact form submission error:', error)
    return res.status(500).json({
      message: 'An error occurred while processing your request. Please try again.',
      success: false
    })
  }
})

export default router