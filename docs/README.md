<!-- filepath: automotive-salah/docs/README.md -->

# Automotive Locksmith Platform Documentation

## Overview

Professional B2B e-commerce platform for automotive locksmith supplies.

## Getting Started

### Prerequisites

- Node.js 18+

- Docker Desktop

- Git

### Installation

1. Clone the repository

2. Run the setup script

3. Install dependencies: `npm install`

4. Start development: `npm run dev`

## Development

### Project Structure

- `apps/web/` - Customer website

- `apps/admin/` - Admin dashboard

- `apps/api/` - Backend API

- `packages/` - Shared code

### Available Scripts

- `npm run dev` - Start development servers

- `npm run build` - Build for production

- `npm run deploy` - Deploy to production

## Deployment

### Windows Server 2022

1. Run `deployment/windows-server/install-docker.ps1`

2. Run `deployment/windows-server/setup-iis.ps1`

3. Configure environment variables

4. Run `deployment/windows-server/deploy.ps1`

## API Documentation

### Authentication

- POST `/api/auth/login` - User login

- POST `/api/auth/register` - User registration

- POST `/api/auth/refresh` - Refresh token

### Products

- GET `/api/products` - List products

- POST `/api/products` - Create product

- PUT `/api/products/:id` - Update product

- DELETE `/api/products/:id` - Delete product

## Contributing

1. Create feature branch

2. Make changes

3. Run tests

4. Submit pull request

## Support

Contact: support@yourdomain.com
