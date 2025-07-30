# Deployment Guide

This guide will help you deploy the Maxed AI Workout Planner to various platforms.

## Prerequisites

- A Google Gemini API key
- A GitHub account (for version control)
- An account on your chosen deployment platform

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest option for Next.js applications.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/workout-planner.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable:
     - Name: `GEMINI_API_KEY`
     - Value: Your Gemini API key
   - Click "Deploy"

3. **Your app will be live at**: `https://your-project-name.vercel.app`

### 2. Netlify

#### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with your GitHub account
   - Click "New site from Git"
   - Choose your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variable:
     - Key: `GEMINI_API_KEY`
     - Value: Your Gemini API key
   - Click "Deploy site"

### 3. Railway

#### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Add environment variable:
     - Name: `GEMINI_API_KEY`
     - Value: Your Gemini API key
   - Railway will automatically deploy

## Environment Variables

Make sure to set these environment variables in your deployment platform:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## Database

The application uses SQLite which will be automatically created on first run. For production, you might want to consider:

1. **SQLite with persistent storage** (works on most platforms)
2. **PostgreSQL** (for better scalability)
3. **MySQL** (alternative option)

## Custom Domain

After deployment, you can add a custom domain:

1. **Vercel**: Go to Project Settings → Domains
2. **Netlify**: Go to Site Settings → Domain Management
3. **Railway**: Go to Project Settings → Domains

## Monitoring

Set up monitoring for your deployed application:

1. **Error tracking**: Consider adding Sentry
2. **Analytics**: Add Google Analytics or similar
3. **Uptime monitoring**: Use UptimeRobot or similar

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in `package.json`
2. **API errors**: Verify your `GEMINI_API_KEY` is set correctly
3. **Database errors**: Ensure the app has write permissions for SQLite

### Getting Help:

- Check the deployment platform's logs
. Verify environment variables are set correctly
- Test locally first with `npm run dev`

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use platform-specific secret management
3. **HTTPS**: Most platforms provide HTTPS by default
4. **Rate Limiting**: Consider adding rate limiting for API endpoints

## Performance Optimization

1. **Caching**: Add caching headers for static assets
2. **CDN**: Use platform CDN for faster loading
3. **Image Optimization**: Next.js handles this automatically
4. **Bundle Analysis**: Use `@next/bundle-analyzer` to optimize bundle size 