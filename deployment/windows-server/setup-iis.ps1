# filepath: automotive-salah/deployment/windows-server/setup-iis.ps1
# Setup IIS as reverse proxy for Docker containers



# Run as Administrator







Write-Host "Setting up IIS reverse proxy..." -ForegroundColor Green







# Install IIS and required features



Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole



Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServer



Enable-WindowsOptionalFeature -Online -FeatureName IIS-CommonHttpFeatures



Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpErrors



Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpLogging



Enable-WindowsOptionalFeature -Online -FeatureName IIS-RequestFiltering



Enable-WindowsOptionalFeature -Online -FeatureName IIS-StaticContent







# Install URL Rewrite module



$urlRewriteUrl = "https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi"



$urlRewriteInstaller = "$env:TEMP\rewrite_amd64_en-US.msi"







Write-Host "Downloading URL Rewrite module..." -ForegroundColor Yellow



Invoke-WebRequest -Uri $urlRewriteUrl -OutFile $urlRewriteInstaller







Write-Host "Installing URL Rewrite module..." -ForegroundColor Yellow



Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $urlRewriteInstaller, "/quiet" -Wait







# Install Application Request Routing



$arrUrl = "https://download.microsoft.com/download/E/9/8/E9849D6A-020E-47E4-9FD0-A023E99B54EB/requestRouter_amd64.msi"



$arrInstaller = "$env:TEMP\requestRouter_amd64.msi"







Write-Host "Downloading Application Request Routing..." -ForegroundColor Yellow



Invoke-WebRequest -Uri $arrUrl -OutFile $arrInstaller







Write-Host "Installing Application Request Routing..." -ForegroundColor Yellow



Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $arrInstaller, "/quiet" -Wait







Write-Host "IIS setup completed!" -ForegroundColor Green



Write-Host "Please configure your domain and SSL certificates." -ForegroundColor Yellow














