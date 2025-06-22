# Automotive Locksmith Platform

A professional B2B e-commerce platform for automotive locksmith supplies, built with Next.js, TypeScript, and modern web technologies.

## Features

- 🛍️ **Customer Website**: Professional shopping experience
- 🔧 **Admin Dashboard**: Complete business management
- 🔐 **B2B Authentication**: Business verification system
- 💳 **Multiple Payment Options**: Stripe, PayPal, Authorize.Net
- 📱 **Mobile Responsive**: Works on all devices
- 🚀 **High Performance**: Optimized for speed and SEO

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Fastify, tRPC, Prisma
- **Database**: MongoDB, Redis
- **Deployment**: Docker, Windows Server, IIS

## Quick Start

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd automotive-locksmith-platform
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Database Setup**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **Development**
   ```bash
   npm run dev
   ```

5. **Production Deployment**
   ```bash
   npm run deploy
   ```

## Project Structure

- `apps/web/` - Customer-facing website
- `apps/admin/` - Admin dashboard
- `apps/api/` - Backend API server
- `packages/ui/` - Shared UI components
- `packages/database/` - Database schema and operations
- `deployment/` - Docker and deployment configurations

## Development

Visit the development servers:
- Customer Website: http://localhost:3000
- Admin Dashboard: http://localhost:3001
- API Server: http://localhost:4000

## License

Private - All rights reserved
