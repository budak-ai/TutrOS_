# TutrOS Deployment Plan

> Practical deployment guide for TutrOS (Virtual Tutor Platform) - Next.js 15 + Prisma

**Target:** AWS Free Tier (EC2 t2.micro + RDS PostgreSQL)  
**Audience:** Malaysia-based tutoring platform

---

## Table of Contents

1. [AWS Free Tier Setup](#1-aws-free-tier-setup)
2. [Domain Options & DNS Setup](#2-domain-options--dns-setup)
3. [SQLite to PostgreSQL Migration](#3-sqlite-to-postgresql-migration)
4. [ToyyibPay Integration](#4-toyyibpay-integration)
5. [Docker/PM2 Deployment](#5-dockerpm2-deployment)
6. [Estimated Costs](#6-estimated-costs)
7. [Pre-flight Checklist](#7-pre-flight-checklist)

---

## 1. AWS Free Tier Setup

### 1.1 What You Get (12-month Free Tier)

| Service | Free Tier Allocation |
|---------|---------------------|
| EC2 t2.micro | 750 hours/month (1 vCPU, 1GB RAM) |
| RDS PostgreSQL | 750 hours/month + 20GB storage |
| EBS | 30GB SSD storage |
| Data Transfer | 15GB outbound/month |

### 1.2 EC2 Instance Setup

```bash
# 1. Launch EC2 Instance
Region: ap-southeast-1 (Singapore) - closest to Malaysia
AMI: Ubuntu 24.04 LTS
Instance Type: t2.micro (free tier)
Storage: 20GB gp3 (SSD)

# 2. Security Group Rules
Inbound:
- SSH (22) from your IP
- HTTP (80) from 0.0.0.0/0
- HTTPS (443) from 0.0.0.0/0
- Custom TCP (3000) from your IP (for testing)
```

**After launch:**

```bash
# Connect to instance
ssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 22.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install essential tools
sudo apt install -y git nginx certbot python3-certbot-nginx

# Verify
node -v  # Should show v22.x
npm -v
```

### 1.3 RDS PostgreSQL Setup

```bash
# 1. Create RDS Instance via AWS Console
Engine: PostgreSQL 16
Template: Free Tier
Instance: db.t3.micro (or db.t4g.micro if available)
Storage: 20GB (uncheck auto-scaling for free tier)
DB Name: tutros
Master Username: tutros_admin
Password: <STRONG_PASSWORD>

# 2. VPC Settings
- Create in same VPC as EC2
- Create new security group: tutros-db-sg
- Initially enable public access for setup (disable later)

# 3. Security Group Rules for RDS
Inbound: PostgreSQL (5432) from EC2 security group

# 4. Note the Endpoint
Example: tutros.xxxxx.ap-southeast-1.rds.amazonaws.com
```

### 1.4 Environment Variables

Create `/home/ubuntu/tutros/.env`:

```env
# Database (RDS PostgreSQL)
DATABASE_URL="postgresql://tutros_admin:PASSWORD@tutros.xxxxx.ap-southeast-1.rds.amazonaws.com:5432/tutros?schema=public"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://tutros.my"

# ToyyibPay (production)
TOYYIBPAY_SECRET_KEY="your-secret-key"
TOYYIBPAY_CATEGORY_CODE="your-category-code"
TOYYIBPAY_API_URL="https://toyyibpay.com"

# App
NODE_ENV="production"
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## 2. Domain Options & DNS Setup

### 2.1 Domain Options (Malaysia-focused)

| Option | Cost/Year | Notes |
|--------|-----------|-------|
| `.my` domain | ~RM80-150 | Most trusted for MY market (via Shinjiru, WebServer) |
| `.com.my` | ~RM80-120 | Professional, requires MY business registration |
| `.com` | ~$10-15 | Universal, good if planning to expand |
| `.co` | ~$25-30 | Modern alternative |

**Recommended:** `tutros.my` or `tutros.com.my` for Malaysia market trust.

### 2.2 Registrars for .my domains

- [Shinjiru](https://www.shinjiru.com.my) - Local, good support
- [WebServer](https://www.webserver.com.my) - Competitive pricing
- [IP ServerOne](https://www.ipserverone.com.my) - Reliable

### 2.3 DNS Configuration

Using Cloudflare (free tier) for DNS + CDN:

```bash
# 1. Add domain to Cloudflare
# 2. Update nameservers at registrar to Cloudflare's

# 3. Create DNS Records:
Type: A     | Name: @         | Value: <EC2-PUBLIC-IP> | Proxy: Yes
Type: A     | Name: www       | Value: <EC2-PUBLIC-IP> | Proxy: Yes
Type: CNAME | Name: api       | Value: tutros.my       | Proxy: Yes
```

### 2.4 SSL/TLS Setup

**Option A: Cloudflare (Recommended)**
- Enable "Full (Strict)" SSL mode in Cloudflare
- Use Cloudflare Origin Certificate on server

**Option B: Let's Encrypt (Direct)**
```bash
sudo certbot --nginx -d tutros.my -d www.tutros.my
# Auto-renews via cron
```

---

## 3. SQLite to PostgreSQL Migration

### 3.1 Update Prisma Schema

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}

// Rest of schema stays the same - Prisma handles the differences
```

### 3.2 Schema Adjustments

SQLite → PostgreSQL considerations:

```prisma
// These work fine as-is:
model Tutor {
  id              String   @id @default(cuid())
  // ... all fields work the same
}

// Optional: Use PostgreSQL-specific features
model Invoice {
  id          String   @id @default(cuid())
  // For better performance, consider:
  // id       String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  
  amount      Float    // Works, but consider:
  // amount   Decimal  @db.Decimal(10, 2)  // Better for money
}
```

### 3.3 Migration Steps

```bash
# 1. Export existing SQLite data (if any)
sqlite3 db/tutros.db ".dump" > backup.sql

# 2. Update .env with PostgreSQL URL
DATABASE_URL="postgresql://..."

# 3. Generate new Prisma client
npx prisma generate

# 4. Push schema to PostgreSQL (development)
npx prisma db push

# OR for production with migrations:
npx prisma migrate dev --name init
npx prisma migrate deploy

# 5. Verify connection
npx prisma studio
```

### 3.4 Data Migration Script

If you have existing data in SQLite:

```typescript
// scripts/migrate-data.ts
import { PrismaClient as SqliteClient } from '@prisma/client'
import { PrismaClient as PostgresClient } from '@prisma/client'

async function migrate() {
  const sqlite = new SqliteClient({
    datasources: { db: { url: 'file:./db/tutros.db' } }
  })
  const postgres = new PostgresClient({
    datasources: { db: { url: process.env.DATABASE_URL } }
  })

  // Migrate tutors
  const tutors = await sqlite.tutor.findMany()
  for (const tutor of tutors) {
    await postgres.tutor.create({ data: tutor })
  }
  
  // Migrate invoices, schedules, messages...
  console.log('Migration complete!')
}

migrate()
```

Run: `npx tsx scripts/migrate-data.ts`

---

## 4. ToyyibPay Integration

### 4.1 Overview

[ToyyibPay](https://toyyibpay.com) is a Malaysian payment gateway supporting FPX (online banking), cards, and e-wallets.

**Fees:**
- FPX: 1% per transaction (min RM0.50)
- Cards: 2.5% + RM0.50
- No monthly fee

### 4.2 Account Setup

1. Register at [toyyibpay.com](https://toyyibpay.com)
2. Complete verification (IC, bank account)
3. Create a **Category** for your payments
4. Get your **Secret Key** and **Category Code**

### 4.3 Integration Code

Create `src/lib/toyyibpay.ts`:

```typescript
const TOYYIBPAY_URL = process.env.TOYYIBPAY_API_URL || 'https://dev.toyyibpay.com'
const SECRET_KEY = process.env.TOYYIBPAY_SECRET_KEY!
const CATEGORY_CODE = process.env.TOYYIBPAY_CATEGORY_CODE!

interface BillPayload {
  billName: string
  billDescription: string
  billAmount: number  // in cents (RM10 = 1000)
  billTo: string
  billEmail: string
  billPhone: string
  billReturnUrl: string
  billCallbackUrl: string
  billExternalReferenceNo: string
}

export async function createBill(payload: BillPayload) {
  const formData = new FormData()
  formData.append('userSecretKey', SECRET_KEY)
  formData.append('categoryCode', CATEGORY_CODE)
  formData.append('billName', payload.billName)
  formData.append('billDescription', payload.billDescription)
  formData.append('billPriceSetting', '1')  // Fixed price
  formData.append('billPayorInfo', '1')     // Require payer info
  formData.append('billAmount', payload.billAmount.toString())
  formData.append('billReturnUrl', payload.billReturnUrl)
  formData.append('billCallbackUrl', payload.billCallbackUrl)
  formData.append('billExternalReferenceNo', payload.billExternalReferenceNo)
  formData.append('billTo', payload.billTo)
  formData.append('billEmail', payload.billEmail)
  formData.append('billPhone', payload.billPhone)
  
  const response = await fetch(`${TOYYIBPAY_URL}/index.php/api/createBill`, {
    method: 'POST',
    body: formData,
  })
  
  const result = await response.json()
  
  if (result[0]?.BillCode) {
    return {
      billCode: result[0].BillCode,
      paymentUrl: `${TOYYIBPAY_URL}/${result[0].BillCode}`
    }
  }
  throw new Error('Failed to create bill')
}

export async function verifyPayment(billCode: string) {
  const formData = new FormData()
  formData.append('billCode', billCode)
  
  const response = await fetch(`${TOYYIBPAY_URL}/index.php/api/getBillTransactions`, {
    method: 'POST',
    body: formData,
  })
  
  return response.json()
}
```

### 4.4 Payment API Routes

Create `src/app/api/payments/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createBill } from '@/lib/toyyibpay'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  const { invoiceId } = await request.json()
  
  const invoice = await db.invoice.findUnique({
    where: { id: invoiceId },
    include: { tutor: true }
  })
  
  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }
  
  const bill = await createBill({
    billName: `TutrOS Invoice ${invoice.invoiceNumber}`,
    billDescription: `Tuition for ${invoice.subject}`,
    billAmount: invoice.amount * 100,  // Convert to cents
    billTo: invoice.studentName,
    billEmail: invoice.tutor.contactEmail,
    billPhone: invoice.tutor.phoneNumber || '',
    billReturnUrl: `${process.env.NEXTAUTH_URL}/payment/complete`,
    billCallbackUrl: `${process.env.NEXTAUTH_URL}/api/payments/callback`,
    billExternalReferenceNo: invoice.id,
  })
  
  return NextResponse.json(bill)
}
```

### 4.5 Callback Handler

Create `src/app/api/payments/callback/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  
  const refno = formData.get('refno') as string
  const status = formData.get('status') as string
  const billcode = formData.get('billcode') as string
  const orderId = formData.get('order_id') as string  // billExternalReferenceNo
  
  if (status === '1') {  // Success
    await db.invoice.update({
      where: { id: orderId },
      data: { status: 'paid' }
    })
  }
  
  return NextResponse.json({ received: true })
}
```

### 4.6 Testing

Use ToyyibPay sandbox first:
- Sandbox URL: `https://dev.toyyibpay.com`
- Get sandbox credentials from dashboard

---

## 5. Docker/PM2 Deployment

### Option A: PM2 (Simpler, Recommended for t2.micro)

PM2 uses less memory than Docker, better for 1GB RAM.

```bash
# Install PM2
sudo npm install -g pm2

# Clone and setup
cd /home/ubuntu
git clone <your-repo> tutros
cd tutros
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name "tutros" -- start
pm2 save
pm2 startup  # Follow instructions to enable on boot
```

**PM2 Ecosystem File** (`ecosystem.config.js`):

```javascript
module.exports = {
  apps: [{
    name: 'tutros',
    script: '.next/standalone/server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    max_memory_restart: '800M',
    error_file: '/home/ubuntu/tutros/logs/error.log',
    out_file: '/home/ubuntu/tutros/logs/out.log',
  }]
}
```

### Option B: Docker

**Dockerfile** (already exists, verify/update):

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# Build and run
docker build -t tutros .
docker run -d -p 3000:3000 --env-file .env --name tutros tutros
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/tutros
server {
    listen 80;
    server_name tutros.my www.tutros.my;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tutros.my www.tutros.my;
    
    # SSL (Let's Encrypt or Cloudflare Origin)
    ssl_certificate /etc/ssl/certs/cloudflare-origin.pem;
    ssl_certificate_key /etc/ssl/private/cloudflare-origin.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/tutros /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash
set -e

cd /home/ubuntu/tutros

echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm ci --production=false

echo "🔄 Generating Prisma client..."
npx prisma generate

echo "🏗️ Building..."
npm run build

echo "🔄 Running migrations..."
npx prisma migrate deploy

echo "🔄 Restarting PM2..."
pm2 restart tutros

echo "✅ Deployment complete!"
```

---

## 6. Estimated Costs

### Monthly Costs (After Free Tier)

| Item | Free Tier | After 12 Months |
|------|-----------|-----------------|
| EC2 t2.micro | RM0 | ~RM35/month |
| RDS db.t3.micro | RM0 | ~RM50/month |
| EBS 20GB | RM0 | ~RM8/month |
| Data transfer | RM0 (15GB) | ~RM0.40/GB |
| **AWS Subtotal** | **RM0** | **~RM95/month** |

### Other Costs

| Item | One-time | Monthly |
|------|----------|---------|
| Domain (.my) | RM80-150 | - |
| Cloudflare | RM0 | RM0 (free tier) |
| ToyyibPay | RM0 | 1-2.5% per transaction |

### Cost Optimization Tips

1. **Reserve Instance** - After 12 months, buy 1-year reserved EC2/RDS for 30-40% savings
2. **Spot Instance** - For dev/staging, use spot instances (70% cheaper)
3. **Right-size** - Monitor with CloudWatch, upgrade only if needed
4. **Use Cloudflare** - Caches static assets, reduces bandwidth
5. **Alternative: Vercel/Railway** - Consider managed platforms (~RM40-80/month, less ops)

### Break-even Analysis

At RM95/month server cost + 1% payment fees:
- Need ~RM9,500 monthly GMV just to cover ToyyibPay fees
- Total platform viability: ~50+ active paying students

---

## 7. Pre-flight Checklist

### Before Deployment

- [ ] PostgreSQL migration tested locally
- [ ] All environment variables set
- [ ] ToyyibPay sandbox tested
- [ ] NextAuth configured with correct URLs
- [ ] Domain purchased and DNS configured
- [ ] SSL certificates ready
- [ ] Backup strategy defined

### Security Hardening

- [ ] RDS not publicly accessible (use VPC only)
- [ ] SSH key-based auth only (disable password)
- [ ] UFW firewall enabled (22, 80, 443 only)
- [ ] Fail2ban installed
- [ ] Regular security updates (`unattended-upgrades`)
- [ ] Database credentials in environment, not code
- [ ] HTTPS enforced everywhere

### Monitoring Setup

```bash
# PM2 monitoring
pm2 install pm2-logrotate

# Basic monitoring (free)
pm2 monit

# CloudWatch agent (optional)
# Sends EC2 metrics to AWS CloudWatch
```

### Backup Strategy

```bash
# RDS automated backups (enable in console)
Retention: 7 days
Backup window: 3:00-4:00 UTC (11-12 AM MYT)

# Manual backup script
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

---

## Quick Reference Commands

```bash
# Check app status
pm2 status
pm2 logs tutros

# Restart app
pm2 restart tutros

# View nginx logs
sudo tail -f /var/log/nginx/error.log

# Database connection test
npx prisma db pull

# Run migrations
npx prisma migrate deploy

# SSH to server
ssh -i key.pem ubuntu@<EC2-IP>
```

---

*Last updated: 2025*
