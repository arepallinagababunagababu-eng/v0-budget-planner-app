# Budget Planner - Replit Project

## Overview
A comprehensive budget planning application built with Next.js 16, React 19, MongoDB, and Tailwind CSS. This application helps users manage their income, expenses, investments, and financial goals in one intuitive platform.

## Recent Changes (October 30, 2025)
- **Migrated from Vercel to Replit**
  - Updated package.json scripts to bind to `0.0.0.0:5000` for Replit compatibility
  - Removed hardcoded fallback secrets from `lib/auth.js` and `lib/mongodb.js` for improved security
  - Fixed deprecated Next.js config by removing `eslint` key from `next.config.mjs`
  - Added `app/icon.svg` favicon to resolve 404 errors
  - Configured deployment settings for autoscale deployment
  - Set up workflow for Next.js dev server on port 5000
  - Added `allowedDevOrigins` to Next.js config to fix cross-origin warnings

- **Enhanced Landing Page & UI/UX** (October 30, 2025)
  - Completely redesigned landing page with professional stock images
  - Added hero section with animated gradient text and compelling statistics
  - Enhanced feature section with icon-based cards and hover effects
  - Added "How It Works" section with step-by-step visual guide
  - Improved benefits section with security, speed, and goal-oriented messaging
  - Added call-to-action section and comprehensive footer
  - Implemented custom animations including gradient animation effect
  - Improved color scheme, typography, and spacing throughout
  - Added Lucide React icons for better visual hierarchy
  - Enhanced button styles with hover effects and transitions

## Project Architecture

### Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **UI Components**: Radix UI, Lucide React icons, Recharts for data visualization

### Directory Structure
```
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # API endpoints (auth, expenses, income, investments, goals)
│   ├── dashboard/         # Dashboard page
│   ├── expenses/          # Expense management page
│   ├── goals/             # Financial goals page
│   ├── income/            # Income tracking page
│   ├── investments/       # Investment tracking page
│   ├── reports/           # Reports page
│   ├── settings/          # Settings page
│   └── layout.jsx         # Root layout
├── components/            # React components
├── lib/                   # Utility functions and configurations
│   ├── auth.js           # JWT authentication utilities
│   ├── mongodb.js        # MongoDB connection handler
│   └── utils.ts          # Helper functions
├── models/                # Mongoose models
└── public/                # Static assets
```

### Key Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Income Tracking**: Monitor multiple income sources with categorization
- **Expense Management**: Track and categorize spending with smart insights
- **Investment Tracking**: Monitor investments and portfolio performance
- **Goal Setting**: Set and track financial goals with progress visualization
- **Analytics & Reports**: View spending patterns and financial trends
- **Real-time Updates**: Data syncs instantly across all devices

## Environment Variables
Required secrets (configured in Replit Secrets):
- `JWT_SECRET` - Secret key for JWT token signing and verification
- `MONGODB_URI` - MongoDB connection string

## Development

### Running Locally
```bash
pnpm install
pnpm run dev
```
The application will be available at `http://0.0.0.0:5000`

### Building for Production
```bash
pnpm run build
pnpm run start
```

## Deployment
Configured for Replit autoscale deployment:
- **Build command**: `pnpm run build`
- **Start command**: `pnpm start`
- **Port**: 5000

## Security Practices
- No hardcoded secrets or API keys
- Environment variables enforced with runtime validation
- Password hashing with bcrypt
- JWT token-based authentication
- Secure MongoDB connection handling
