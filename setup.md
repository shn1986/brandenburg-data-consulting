# Brandenburg Data Consulting - Setup Guide

## Prerequisites

- Node.js 18+ and npm
- Git (for version control)

## Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies and all sub-project dependencies
npm run install:all
```

### 2. Environment Setup

#### Backend Environment

```bash
# Copy the example environment file
cp backend/.env.example backend/.env

# Edit the .env file with your configuration
# Important: Change the JWT_SECRET and admin credentials
```

#### Frontend Environment

```bash
# Copy the example environment file  
cp frontend/.env.local.example frontend/.env.local

# Edit if needed (default values should work for local development)
```

### 3. Database Setup

```bash
# Set up the database and create default admin user
npm run setup
```

### 4. Start Development Servers

```bash
# Start both frontend and backend in development mode
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin

## Default Admin Credentials

- **Email**: admin@brandenburgdata.com
- **Password**: admin123

⚠️ **Important**: Change these credentials immediately after first login!

## Development URLs

- **Main Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Health Check**: http://localhost:5000/api/health
- **API Documentation**: Available through the admin panel

## Project Structure

```
brandenburg-data-consulting/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utility functions
│   ├── public/           # Static assets
│   └── package.json
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── config/       # Database and config
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/       # API routes
│   │   └── server.ts     # Main server file
│   └── package.json
├── package.json          # Root package.json with scripts
└── README.md
```

## Available Scripts

From the root directory:

```bash
# Development
npm run dev              # Start both frontend and backend in dev mode
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend

# Setup
npm run install:all      # Install all dependencies
npm run setup           # Set up database and admin user

# Production
npm run build           # Build frontend for production
npm run start           # Start frontend in production mode
```

## Features

### Frontend Features
- ✅ Responsive design with Tailwind CSS
- ✅ SEO-optimized with Next.js 14
- ✅ Modern React components with TypeScript
- ✅ Contact form with validation
- ✅ Professional design and animations

### Backend Features
- ✅ REST API with Express.js
- ✅ SQLite database (easily migrable to PostgreSQL/MySQL)
- ✅ JWT authentication for admin
- ✅ Rate limiting and security middleware
- ✅ Email integration for contact forms
- ✅ Content Management System (CMS)

### Admin Panel Features
- ✅ Secure login system
- ✅ Dashboard with key metrics
- ✅ Contact message management
- ✅ Dynamic content management
- ✅ User-friendly interface

## Customization

### Branding & Content
1. Update company information in `frontend/src/components/`
2. Modify colors in `frontend/tailwind.config.js`
3. Replace logo and favicon in `frontend/public/`
4. Update content through the admin panel

### Email Configuration
Update the backend `.env` file with your SMTP settings:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@brandenburgdata.com
TO_EMAIL=hello@brandenburgdata.com
```

## Deployment

See the deployment section in the main README.md for platform-specific instructions.

## Support

For issues or questions, please check the troubleshooting section in the main README or create an issue in the project repository.