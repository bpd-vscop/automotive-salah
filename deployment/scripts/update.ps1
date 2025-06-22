# Update application
# Run as Administrator

Write-Host "Updating Automotive Locksmith Platform..." -ForegroundColor Green

# Pull latest code
Write-Host "Pulling latest code..." -ForegroundColor Yellow
git pull origin main

# Update dependencies
Write-Host "Updating dependencies..." -ForegroundColor Yellow
npm install

# Rebuild and restart
Write-Host "Rebuilding and restarting..." -ForegroundColor Yellow
docker-compose down
docker-compose build
docker-compose up -d

Write-Host "Update completed!" -ForegroundColor Green
