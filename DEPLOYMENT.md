# Deployment Guide for Receipt Scanner App

This guide will help you deploy your Receipt Scanner App to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git repository with your code
3. Vercel CLI (optional but recommended)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Import your Git repository
   - Select the `receipt-scanner-app` folder as the root directory

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `receipt-scanner-app/server`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be available at the provided URL

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from the project root**
   ```bash
   cd receipt-scanner-app
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: receipt-scanner-app (or your preferred name)
   - In which directory is your code located: ./server

## Project Structure for Deployment

The app is now configured as a single Next.js application with:

- **Frontend**: React components in `server/src/app/page.tsx`
- **Backend**: API routes in `server/src/app/api/`
- **Styling**: Tailwind CSS configured
- **Build**: Optimized for Vercel deployment

## Environment Variables

If you have any environment variables, add them in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add any required variables

## Custom Domain (Optional)

1. In your Vercel project dashboard
2. Go to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Monitoring and Logs

- View deployment logs in the Vercel dashboard
- Monitor performance and errors
- Set up alerts for issues

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check that all dependencies are listed in `package.json`
   - Ensure TypeScript types are correct
   - Verify API routes are properly structured

2. **Runtime Errors**
   - Check Vercel function logs
   - Verify environment variables are set
   - Ensure file paths are correct

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check that `globals.css` is imported in `layout.tsx`

## Next Steps

After deployment:
1. Test all functionality
2. Set up monitoring
3. Configure custom domain if needed
4. Set up CI/CD for automatic deployments

Your Receipt Scanner App should now be live and accessible via the Vercel URL!
