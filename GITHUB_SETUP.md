# GitHub Repository Setup Guide

Your Receipt Scanner App is now ready to be pushed to GitHub. Follow these steps:

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `receipt-scanner-app` (or your preferred name)
   - **Description**: "A full-stack receipt scanning application with OCR functionality"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Navigate to your project directory (if not already there)
cd receipt-scanner-app

# Add the GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/receipt-scanner-app.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The repository should show 39 files with your initial commit message

## Step 4: Deploy to Vercel

Now that your code is on GitHub, you can deploy to Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Click "Deploy"

## Alternative: Using GitHub CLI (if you have it installed)

If you have GitHub CLI installed, you can create the repository directly from the command line:

```bash
# Navigate to your project directory
cd receipt-scanner-app

# Create repository on GitHub and push
gh repo create receipt-scanner-app --public --source=. --remote=origin --push
```

## Your Repository Structure

Your GitHub repository will contain:
```
receipt-scanner-app/
├── .gitignore
├── README.md
├── DEPLOYMENT.md
├── GITHUB_SETUP.md (this file)
├── vercel.json
├── client/ (original React app)
└── server/ (Next.js app for deployment)
    ├── src/app/
    │   ├── page.tsx (main app)
    │   ├── layout.tsx
    │   ├── globals.css
    │   └── api/ (your API routes)
    ├── lib/ (your services)
    └── package.json
```

## Next Steps After GitHub Upload

1. ✅ Code is committed locally
2. ⏳ Push to GitHub (follow steps above)
3. ⏳ Deploy to Vercel
4. ⏳ Test your live application
5. ⏳ Set up custom domain (optional)

Your Receipt Scanner App is ready for the world! 🚀
