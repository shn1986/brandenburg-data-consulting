# Brandenburg Data Consulting Website

Professional full-stack website for Brandenburg Data Consulting, offering data consultancy services including data modeling, data transformation, Agentic AI solutions, and other data-related services.

## Features

- **Frontend**: Next.js with responsive design and SEO optimization
- **Backend**: Node.js/Express API with SQLite database
- **Admin Panel**: Dynamic content management system
- **Contact Form**: Email integration for inquiries
- **Modern Design**: Professional, mobile-responsive layout

## Quick Start

1. **Install dependencies for all components:**
   ```bash
   npm run install:all
   ```

2. **Set up the database:**
   ```bash
   npm run setup
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:3000/admin

## Project Structure

```
brandenburg-data-consulting/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js/Express API server
├── package.json       # Root package.json with scripts
└── README.md         # This file
```

## Development

- Frontend runs on port 3000
- Backend API runs on port 5000
- Database: SQLite (local development), easily configurable for production

## Deployment

The project is designed for flexible hosting compatibility. Frontend can be deployed to Vercel, Netlify, or any static hosting provider. Backend can be deployed to Heroku, Railway, or any Node.js hosting service.