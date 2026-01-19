# introFlow Frontend Starter Script
# Fuehrt alle notwendigen Schritte aus, um das Frontend zu starten

Write-Host "=== introFlow Frontend Starter ===" -ForegroundColor Cyan
Write-Host ""

# 1. Bun zum PATH hinzufuegen (falls noch nicht vorhanden)
$bunPath = "$env:USERPROFILE\.bun\bin"
if ($env:PATH -notlike "*$bunPath*") {
    $env:PATH += ";$bunPath"
    Write-Host "[OK] Bun zum PATH hinzugefuegt" -ForegroundColor Green
} else {
    Write-Host "[OK] Bun bereits im PATH" -ForegroundColor Green
}

# 2. Pruefe ob Bun installiert ist
Write-Host "Pruefe Bun-Installation..." -ForegroundColor Yellow
try {
    $bunVersion = bun --version 2>&1
    Write-Host "[OK] Bun installiert: $bunVersion" -ForegroundColor Green
} catch {
    Write-Host "[FEHLER] Bun nicht gefunden! Installiere Bun..." -ForegroundColor Red
    irm bun.sh/install.ps1 | iex
    $env:PATH += ";$bunPath"
    Write-Host "[OK] Bun installiert" -ForegroundColor Green
}

# 3. Wechsle ins Projekt-Verzeichnis
$projectRoot = "C:\Users\lsper\OneDrive - Dominik Scherwinsky\Desktop\introflow"
$appDir = Join-Path $projectRoot "apps\sim"

if (-not (Test-Path $appDir)) {
    Write-Host "[FEHLER] Projekt-Verzeichnis nicht gefunden: $appDir" -ForegroundColor Red
    exit 1
}

Set-Location $appDir
Write-Host "[OK] Wechsle ins Verzeichnis: $appDir" -ForegroundColor Green

# 4. Pruefe ob bereits ein Next.js Prozess laeuft
Write-Host ""
Write-Host "Pruefe auf laufende Next.js Prozesse..." -ForegroundColor Yellow
$nextProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*node.exe*" }

if ($nextProcesses) {
    Write-Host "[WARNUNG] Node.js Prozesse gefunden. Beende sie..." -ForegroundColor Yellow
    foreach ($proc in $nextProcesses) {
        try {
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
            Write-Host "[OK] Prozess beendet: PID $($proc.Id)" -ForegroundColor Green
        } catch {
            Write-Host "[WARNUNG] Konnte Prozess nicht beenden: PID $($proc.Id)" -ForegroundColor Yellow
        }
    }
    Start-Sleep -Seconds 2
}

# 5. Loesche Lock-File falls vorhanden
$lockFile = Join-Path $appDir ".next\dev\lock"
if (Test-Path $lockFile) {
    Write-Host "[OK] Loesche Lock-File..." -ForegroundColor Yellow
    Remove-Item -Path $lockFile -Force -ErrorAction SilentlyContinue
    Write-Host "[OK] Lock-File geloescht" -ForegroundColor Green
}

# 6. Pruefe .env Datei
if (-not (Test-Path ".env")) {
    Write-Host "[WARNUNG] .env Datei nicht gefunden. Erstelle minimal .env..." -ForegroundColor Yellow
    
    $envContent = @"
DATABASE_URL="postgresql://postgres:temp@localhost:5432/introflow"
BETTER_AUTH_SECRET="temp_auth_secret_min_32_characters_long_for_dev"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ENCRYPTION_KEY="temp_encryption_key_min_32_characters_long_for_dev"
INTERNAL_API_SECRET="temp_internal_api_secret_min_32_characters_long"
API_ENCRYPTION_KEY="temp_api_encryption_key_min_32_characters_long"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3002"
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
    
    Write-Host "[OK] .env Datei erstellt" -ForegroundColor Green
} else {
    Write-Host "[OK] .env Datei vorhanden" -ForegroundColor Green
}

# 7. Starte Frontend-Server
Write-Host ""
Write-Host "=== Starte Frontend-Server ===" -ForegroundColor Cyan
Write-Host "Verwende Webpack (statt Turbopack) wegen Windows-Symlink Problemen" -ForegroundColor Yellow
Write-Host ""
Write-Host "[OK] Server startet auf: http://localhost:3000 (oder 3001 falls 3000 belegt)" -ForegroundColor Green
Write-Host ""
Write-Host "Druecke Ctrl+C zum Beenden" -ForegroundColor Gray
Write-Host ""

# Starte den Server
bun run dev:webpack
