# filepath: automotive-salah/deployment/scripts/backup.ps1
# Backup database and files



# Run as Administrator







$backupDir = "C:\Backups\automotive-locksmith"



$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm"







Write-Host "Creating backup..." -ForegroundColor Green







# Create backup directory



New-Item -ItemType Directory -Path "$backupDir\$timestamp" -Force







# Backup MongoDB



Write-Host "Backing up MongoDB..." -ForegroundColor Yellow



docker exec automotive-locksmith-platform-mongodb-1 mongodump --out /data/backup







# Copy backup files



docker cp automotive-locksmith-platform-mongodb-1:/data/backup "$backupDir\$timestamp\mongodb"







# Backup application files



Write-Host "Backing up application files..." -ForegroundColor Yellow



Copy-Item -Path "." -Destination "$backupDir\$timestamp\app" -Recurse -Exclude "node_modules", ".git", ".next", "dist"







Write-Host "Backup completed: $backupDir\$timestamp" -ForegroundColor Green














