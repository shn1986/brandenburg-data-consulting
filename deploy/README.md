# Deployment Guide

This directory contains deployment configurations for various hosting platforms.

## Deployment Options

### 1. Vercel (Frontend) + Railway (Backend) [Recommended]

**Vercel (Frontend)**
1. Connect your GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Railway backend URL + `/api`
   - `NEXT_PUBLIC_BASE_URL`: Your Vercel domain

**Railway (Backend)**
1. Connect your GitHub repo to Railway
2. Set root directory to `backend`
3. Add environment variables from `backend/.env.example`
4. Railway will automatically handle builds and deployments

### 2. Netlify (Frontend) + Heroku (Backend)

**Netlify (Frontend)**
1. Connect your GitHub repo to Netlify
2. Build settings: 
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`
3. Environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Heroku backend URL + `/api`

**Heroku (Backend)**
1. Create new Heroku app
2. Set buildpack to Node.js
3. Connect GitHub repo with subfolder `backend`
4. Configure environment variables
5. Deploy from GitHub

### 3. Docker (Self-hosted)

Use the provided `docker-compose.yml` for complete deployment:

```bash
# From the deploy directory
docker-compose up -d
```

This will start both frontend and backend services with proper networking.

### 4. DigitalOcean App Platform

1. Create new app from GitHub
2. Configure two services:
   - **Backend**: Node.js service from `backend` folder
   - **Frontend**: Static site from `frontend` folder
3. Set environment variables for each service

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
NEXT_PUBLIC_BASE_URL=https://your-frontend-domain.com
NEXT_PUBLIC_GA_TRACKING_ID=GA_MEASUREMENT_ID (optional)
```

### Backend (.env)
```
NODE_ENV=production
PORT=5000
DATABASE_PATH=/app/data/database.sqlite
JWT_SECRET=your-super-secure-jwt-secret
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=secure-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@yourcompany.com
TO_EMAIL=hello@yourcompany.com
CORS_ORIGINS=https://your-frontend-domain.com
```

## Database Considerations

- **Development**: SQLite (included)
- **Production**: Consider PostgreSQL or MySQL for better performance and scalability
- **File Storage**: For production, consider cloud storage (AWS S3, Cloudinary) for uploaded files

## Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong JWT secret (32+ characters)
- [ ] Configure CORS properly
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up proper database backups
- [ ] Configure rate limiting
- [ ] Review environment variables

## Monitoring & Maintenance

1. **Health Checks**: Available at `/api/health`
2. **Logs**: Monitor application logs for errors
3. **Database**: Regular backups recommended
4. **Updates**: Keep dependencies updated
5. **SSL**: Ensure certificates are valid

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check `CORS_ORIGINS` in backend env
2. **Database Connection**: Verify database path and permissions
3. **Email Not Working**: Check SMTP credentials and settings
4. **Build Failures**: Verify Node.js version compatibility (18+)

### Debug Commands

```bash
# Check backend health
curl https://your-backend-domain.com/api/health

# Test database connection (local)
npm run setup

# View logs (Docker)
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Scaling Considerations

- **Load Balancer**: For high traffic
- **CDN**: For static assets (images, CSS, JS)
- **Database Scaling**: Read replicas for heavy read workloads
- **Caching**: Redis for session storage and caching
- **File Storage**: Cloud storage for user uploads