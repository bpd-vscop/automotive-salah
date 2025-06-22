# filepath: automotive-salah/deployment/scripts/restore.ps1
# Restore database and files



# Run as Administrator







param(



    [Parameter(Mandatory=$true)]



    [string]$BackupPath



)







Write-Host "Restoring from backup: $BackupPath" -ForegroundColor Green







# Stop services



Write-Host "Stopping services..." -ForegroundColor Yellow



docker-compose down







# Restore MongoDB



Write-Host "Restoring MongoDB..." -ForegroundColor Yellow



docker run --rm -v "$BackupPath\mongodb:/backup" -v automotive-locksmith-platform_mongodb_data:/data/db mongo:7 mongorestore --drop /backup







# Restore application files if needed



if (Test-Path "$BackupPath\app") {



    Write-Host "Restoring application files..." -ForegroundColor Yellow



    # Add application file restoration logic here



}







# Start services



Write-Host "Starting services..." -ForegroundColor Yellow



docker-compose up -d







Write-Host "Restore completed!" -ForegroundColor Green














