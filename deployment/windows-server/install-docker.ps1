# Install Docker Desktop on Windows Server 2022
# Run as Administrator

Write-Host "Installing Docker Desktop for Windows Server 2022..." -ForegroundColor Green

# Enable Hyper-V and Containers features
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
Enable-WindowsOptionalFeature -Online -FeatureName Containers -All

# Download Docker Desktop
$dockerUrl = "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
$dockerInstaller = "$env:TEMP\DockerDesktopInstaller.exe"

Write-Host "Downloading Docker Desktop..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $dockerUrl -OutFile $dockerInstaller

# Install Docker Desktop
Write-Host "Installing Docker Desktop..." -ForegroundColor Yellow
Start-Process -FilePath $dockerInstaller -ArgumentList "install", "--quiet" -Wait

# Start Docker service
Write-Host "Starting Docker service..." -ForegroundColor Yellow
Start-Service docker

Write-Host "Docker installation completed!" -ForegroundColor Green
Write-Host "Please restart your server and then run the deployment script." -ForegroundColor Yellow
