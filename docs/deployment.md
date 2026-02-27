# Deployment Instructions (Production)

## 1. Infrastructure
- Ubuntu 22.04 LTS VM(s)
- PostgreSQL 15+
- Nginx reverse proxy
- Node.js 20 LTS
- PM2 process manager

## 2. Backend Deployment
```bash
cd /opt/prime-hms/backend
npm ci
export NODE_ENV=production
export PORT=4000
export JWT_SECRET=<strong-secret>
export DATABASE_URL=postgresql://<user>:<pass>@<host>:5432/<db>
pm2 start src/server.js --name hms-api
```

## 3. Database Migration
```bash
psql "$DATABASE_URL" -f backend/prisma/schema.sql
```

## 4. Frontend Deployment
```bash
cd /opt/prime-hms/frontend
npm ci
npm run build
# Serve dist/ via nginx
```

## 5. Nginx Essentials
- Route `/api` to backend `localhost:4000`
- Serve frontend static files from `frontend/dist`
- Enable gzip and HTTP/2
- Enable TLS (Let's Encrypt)

## 6. Monitoring & Backup
- PM2 restart policy + uptime checks
- Centralized logs (ELK/Grafana Loki)
- Daily DB backup cron to cloud object storage

## 7. Security Hardening
- Rotate JWT secrets every 90 days
- Enable IP allow-list for admin routes
- Encrypt backups and store offsite
- Enable audit trail review workflows
