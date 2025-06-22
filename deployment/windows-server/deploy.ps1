# Deploy Automotive Locksmith Platform to Windows Server
# Run as Administrator

param(
    [string]$Domain = "localhost",
    [string]$Environment = "production"
)

Write-Host "Deploying Automotive Locksmith Platform..." -ForegroundColor Green
Write-Host "Domain: $Domain" -ForegroundColor Yellow
Write-Host "Environment: $Environment" -ForegroundColor Yellow

# Stop existing containers
Write-Host "Stopping existing containers..." -ForegroundColor Yellow
docker-compose down

# Pull latest images and rebuild
Write-Host "Building application..." -ForegroundColor Yellow
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Start services
Write-Host "Starting services..." -ForegroundColor Yellow
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Wait for services to be ready
Write-Host "Waiting for services to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Check service health
Write-Host "Checking service health..." -ForegroundColor Yellow
$webHealth = try { Invoke-WebRequest -Uri "http://localhost:3000/api/health" -UseBasicParsing } catch { $null }
$adminHealth = try { Invoke-WebRequest -Uri "http://localhost:3001/api/health" -UseBasicParsing } catch { $null }
$apiHealth = try { Invoke-WebRequest -Uri "http://localhost:4000/health" -UseBasicParsing } catch { $null }

if ($webHealth -and $adminHealth -and $apiHealth) {
    Write-Host "Deployment successful!" -ForegroundColor Green
    Write-Host "Customer Website: http://$Domain" -ForegroundColor Cyan
    Write-Host "Admin Dashboard: http://admin.$Domain" -ForegroundColor Cyan
    Write-Host "API Endpoint: http://api.$Domain" -ForegroundColor Cyan
} else {
    Write-Host "Deployment may have issues. Check docker logs:" -ForegroundColor Red
    Write-Host "docker-compose logs" -ForegroundColor Yellow
}
