# TutrOS Deployment Guide - Render.com

This guide will walk you through deploying TutrOS to Render.com with a free PostgreSQL database.

## Prerequisites

- A GitHub account
- A Render.com account (sign up at https://render.com)
- Your code pushed to a GitHub repository

## Deployment Steps

### 1. Push Your Code to GitHub

Make sure all your changes are committed and pushed to your GitHub repository.

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin claude/deploy-free-hosting-017JXTkT4NTtrFasEXMTDncj
```

### 2. Connect to Render

1. Go to https://render.com and sign in
2. Click on "New +" button in the top right
3. Select "Blueprint"

### 3. Deploy Using Blueprint

1. Connect your GitHub repository
2. Render will automatically detect the `render.yaml` file
3. Click "Apply" to create the services

Render will create:
- **Web Service**: Your Next.js application
- **PostgreSQL Database**: Free tier database

### 4. Environment Variables

The following environment variables are automatically configured in `render.yaml`:

- `DATABASE_URL` - Auto-connected from the database
- `NEXTAUTH_SECRET` - Auto-generated secure secret
- `NODE_ENV` - Set to "production"

**You need to manually set:**

1. Go to your web service in the Render dashboard
2. Navigate to "Environment" tab
3. Add `NEXTAUTH_URL` with your Render service URL (e.g., `https://tutros.onrender.com`)

### 5. Database Migration

The database schema will be automatically applied during the build process via `prisma db push` in the build command.

### 6. Access Your Application

Once deployment completes (usually 5-10 minutes):
- Your app will be available at: `https://tutros.onrender.com` (or your custom URL)
- The database is automatically connected and migrated

## Free Tier Limitations

### Render Free Tier Includes:
- ✅ 750 hours/month of runtime (enough for one service)
- ✅ 512 MB RAM
- ✅ Free PostgreSQL database
- ✅ Automatic deploys from Git
- ⚠️ Services spin down after 15 minutes of inactivity
- ⚠️ Cold starts may take 30-60 seconds

### PostgreSQL Free Tier:
- ✅ 1 GB storage
- ✅ Automatic backups for 90 days
- ⚠️ Expires after 90 days (you'll need to create a new one)

## Monitoring & Logs

- View logs in the Render dashboard under your service
- Check database metrics in the database dashboard
- Set up notifications for deployment failures

## Custom Domain (Optional)

1. Go to your web service settings
2. Click "Custom Domain"
3. Add your domain and follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify `DATABASE_URL` is properly connected

### Database Connection Issues
- Ensure `DATABASE_URL` environment variable is set from database
- Check database is in the same region as web service
- Verify Prisma schema is valid

### Cold Starts
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading to paid tier ($7/month) for always-on service

## Alternative Deployment Methods

### Manual Deployment (Without render.yaml)

If you prefer not to use the blueprint:

1. Create PostgreSQL database first:
   - New > PostgreSQL > Free tier
   - Name: `tutros-db`

2. Create Web Service:
   - New > Web Service
   - Connect your repository
   - Settings:
     - **Build Command**: `npm install && npx prisma generate && npx prisma db push && npm run build`
     - **Start Command**: `npm start`
     - **Environment Variables**: Add all required vars

## Updates & Redeployment

Render automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

## Cost Optimization

To stay within free tier:
- Use one web service
- Use one database
- Monitor your usage in Render dashboard
- Consider upgrading for production apps ($7/month web service + $7/month database)

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- GitHub Issues: Report issues in your repository

---

**Next Steps**: After deployment, set up your admin account and start using TutrOS!
