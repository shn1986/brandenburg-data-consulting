import { initializeDatabase } from './config/database'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const setupDatabase = async () => {
  console.log('🔄 Setting up database...')
  
  try {
    await initializeDatabase()
    console.log('✅ Database setup completed successfully!')
    console.log('\n📋 Default admin credentials:')
    console.log(`Email: ${process.env.ADMIN_EMAIL || 'admin@brandenburgdata.com'}`)
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`)
    console.log('\n⚠️  Please change these credentials after first login!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()