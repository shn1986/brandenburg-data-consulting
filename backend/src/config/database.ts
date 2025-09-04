import sqlite3 from 'sqlite3'
import { promisify } from 'util'
import bcrypt from 'bcryptjs'
import path from 'path'

const DATABASE_PATH = process.env.DATABASE_PATH || './database.sqlite'

class Database {
  private db: sqlite3.Database | null = null

  async connect(): Promise<sqlite3.Database> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DATABASE_PATH, (err) => {
        if (err) {
          console.error('Error opening database:', err)
          reject(err)
        } else {
          console.log('✅ Connected to SQLite database')
          resolve(this.db!)
        }
      })
    })
  }

  async run(sql: string, params: any[] = []): Promise<void> {
    if (!this.db) await this.connect()
    
    return new Promise((resolve, reject) => {
      this.db!.run(sql, params, function(err) {
        if (err) {
          console.error('Database run error:', err)
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  async get(sql: string, params: any[] = []): Promise<any> {
    if (!this.db) await this.connect()
    
    return new Promise((resolve, reject) => {
      this.db!.get(sql, params, (err, row) => {
        if (err) {
          console.error('Database get error:', err)
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  async all(sql: string, params: any[] = []): Promise<any[]> {
    if (!this.db) await this.connect()
    
    return new Promise((resolve, reject) => {
      this.db!.all(sql, params, (err, rows) => {
        if (err) {
          console.error('Database all error:', err)
          reject(err)
        } else {
          resolve(rows || [])
        }
      })
    })
  }

  async close(): Promise<void> {
    if (!this.db) return
    
    return new Promise((resolve, reject) => {
      this.db!.close((err) => {
        if (err) {
          reject(err)
        } else {
          this.db = null
          resolve()
        }
      })
    })
  }
}

export const db = new Database()

export const initializeDatabase = async (): Promise<void> => {
  try {
    await db.connect()

    // Create users table
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create content table for CMS
    await db.run(`
      CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page TEXT NOT NULL,
        section TEXT NOT NULL,
        key TEXT NOT NULL,
        value TEXT,
        type TEXT DEFAULT 'text',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(page, section, key)
      )
    `)

    // Create contact messages table
    await db.run(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        phone TEXT,
        service TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create blog posts table
    await db.run(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        featured_image TEXT,
        author TEXT DEFAULT 'Brandenburg Data Consulting',
        status TEXT DEFAULT 'draft',
        tags TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create portfolio/case studies table
    await db.run(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        client TEXT,
        industry TEXT,
        description TEXT NOT NULL,
        challenge TEXT,
        solution TEXT,
        results TEXT,
        technologies TEXT,
        featured_image TEXT,
        gallery TEXT,
        status TEXT DEFAULT 'draft',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create testimonials table
    await db.run(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_name TEXT NOT NULL,
        client_title TEXT,
        company TEXT,
        content TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        avatar TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create consultations table
    await db.run(`
      CREATE TABLE IF NOT EXISTS consultations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        phone TEXT,
        preferred_date DATE,
        preferred_time TEXT,
        consultation_type TEXT NOT NULL,
        project_description TEXT NOT NULL,
        budget_range TEXT,
        timeline TEXT,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create default admin user if none exists
    const existingUser = await db.get('SELECT id FROM users WHERE role = ?', ['admin'])
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || 'admin123', 
        12
      )
      
      await db.run(
        'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
        [
          process.env.ADMIN_EMAIL || 'admin@brandenburgdata.com',
          hashedPassword,
          'admin'
        ]
      )
      
      console.log('✅ Default admin user created')
    }

    // Insert default content
    await insertDefaultContent()
    
    console.log('✅ Database initialized successfully')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
}

const insertDefaultContent = async (): Promise<void> => {
  const defaultContent = [
    // Home page content
    { page: 'home', section: 'hero', key: 'title', value: 'Transform Your Data Into Strategic Advantage' },
    { page: 'home', section: 'hero', key: 'subtitle', value: 'Brandenburg Data Consulting delivers expert data solutions that drive business growth. From data modeling to Agentic AI implementation, we turn complex data challenges into competitive advantages.' },
    { page: 'home', section: 'stats', key: 'accuracy', value: '99' },
    { page: 'home', section: 'stats', key: 'efficiency', value: '50' },
    { page: 'home', section: 'stats', key: 'projects', value: '25+' },
    
    // About page content
    { page: 'about', section: 'main', key: 'title', value: 'Your Trusted Data Partner' },
    { page: 'about', section: 'main', key: 'description', value: 'Brandenburg Data Consulting specializes in transforming complex data challenges into strategic business advantages. With deep expertise in modern data technologies and AI solutions, we help organizations unlock the full potential of their data assets.' },
    
    // Contact information
    { page: 'contact', section: 'info', key: 'email', value: 'hello@brandenburgdata.com' },
    { page: 'contact', section: 'info', key: 'phone', value: '+1 (555) 123-4567' },
    { page: 'contact', section: 'info', key: 'location', value: 'Remote & On-site Consulting Available' },
  ]

  for (const item of defaultContent) {
    try {
      await db.run(
        `INSERT OR IGNORE INTO content (page, section, key, value) 
         VALUES (?, ?, ?, ?)`,
        [item.page, item.section, item.key, item.value]
      )
    } catch (error) {
      console.warn(`Warning: Could not insert default content item:`, item)
    }
  }
}