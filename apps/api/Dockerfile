﻿FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY ../../package*.json ../../

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 4000

# Start application
CMD ["npm", "start"]
