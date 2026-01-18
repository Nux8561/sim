# Lokales Setup für introFlow (PowerShell)

## Schritt 1: Bun installieren

Bun ist der Package Manager und Runtime für dieses Projekt. Installiere es mit:

```powershell
# PowerShell (als Administrator)
irm bun.sh/install.ps1 | iex
```

Oder manuell:
1. Öffne https://bun.sh
2. Lade den Windows-Installer herunter
3. Führe die Installation aus

Nach der Installation, starte PowerShell neu oder führe aus:
```powershell
$env:PATH += ";$env:USERPROFILE\.bun\bin"
```

Prüfe die Installation:
```powershell
bun --version
```

## Schritt 2: Dependencies installieren

```powershell
cd "C:\Users\lsper\OneDrive - Dominik Scherwinsky\Desktop\introflow"
bun install
```

## Schritt 3: Datenbank einrichten

### Option A: Supabase (Empfohlen - Einfachste Option)

1. Gehe zu https://supabase.com
2. Erstelle ein kostenloses Projekt
3. Warte bis das Projekt bereit ist
4. Gehe zu Project Settings → Database
5. Kopiere die Connection String (URI Format)
6. Aktiviere pgvector Extension:
   - Gehe zu Database → Extensions
   - Suche nach "vector" und aktiviere es

### Option B: Lokales PostgreSQL

1. Installiere PostgreSQL 17+ von https://www.postgresql.org/download/windows/
2. Während der Installation:
   - Notiere das Passwort für den `postgres` User
   - Installiere pgvector Extension (falls verfügbar)
3. Nach Installation, öffne pgAdmin oder PowerShell:

```powershell
# Erstelle Datenbank
psql -U postgres -c "CREATE DATABASE introflow;"

# Verbinde zur Datenbank
psql -U postgres -d introflow

# Aktiviere pgvector Extension
CREATE EXTENSION vector;
\q
```

## Schritt 4: Umgebungsvariablen konfigurieren

Erstelle die `.env` Dateien:

### apps/sim/.env

```powershell
# Erstelle die Datei
New-Item -Path "apps\sim\.env" -ItemType File -Force
```

Füge folgende Inhalte hinzu (ersetze die Werte):

```env
# Datenbank
# Für Supabase: Kopiere die Connection String aus Supabase Dashboard
# Format: postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
DATABASE_URL="postgresql://postgres:dein_passwort@localhost:5432/introflow"

# Authentication Secrets (generiere mit: openssl rand -hex 32)
BETTER_AUTH_SECRET="generiere_mit_openssl_rand_hex_32"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Verschlüsselung (generiere mit: openssl rand -hex 32)
ENCRYPTION_KEY="generiere_mit_openssl_rand_hex_32"
INTERNAL_API_SECRET="generiere_mit_openssl_rand_hex_32"
API_ENCRYPTION_KEY="generiere_mit_openssl_rand_hex_32"

# AI Provider (mindestens einer erforderlich)
# Option 1: OpenAI
OPENAI_API_KEY="sk-..."

# Option 2: Anthropic
# ANTHROPIC_API_KEY_1="sk-ant-..."

# Option 3: Lokale Modelle mit Ollama
# OLLAMA_URL="http://localhost:11434"
```

### packages/db/.env

```powershell
# Erstelle die Datei
New-Item -Path "packages\db\.env" -ItemType File -Force
```

Füge hinzu:
```env
DATABASE_URL="postgresql://postgres:dein_passwort@localhost:5432/introflow"
```

## Schritt 5: Secrets generieren

Generiere die benötigten Secrets:

```powershell
# PowerShell - Generiere Secrets
$secret1 = -join ((48..57) + (97..102) | Get-Random -Count 64 | ForEach-Object {[char]$_})
$secret2 = -join ((48..57) + (97..102) | Get-Random -Count 64 | ForEach-Object {[char]$_})
$secret3 = -join ((48..57) + (97..102) | Get-Random -Count 64 | ForEach-Object {[char]$_})
$secret4 = -join ((48..57) + (97..102) | Get-Random -Count 64 | ForEach-Object {[char]$_})

Write-Host "BETTER_AUTH_SECRET=$secret1"
Write-Host "ENCRYPTION_KEY=$secret2"
Write-Host "INTERNAL_API_SECRET=$secret3"
Write-Host "API_ENCRYPTION_KEY=$secret4"
```

Oder mit OpenSSL (falls installiert):
```powershell
openssl rand -hex 32
```

## Schritt 6: Datenbank-Migrationen ausführen

```powershell
cd packages\db
bunx drizzle-kit migrate --config=./drizzle.config.ts
cd ..\..
```

## Schritt 7: Development-Server starten

```powershell
# Startet sowohl Next.js App als auch Realtime Socket Server
bun run dev:full
```

Oder separat in zwei Terminals:

**Terminal 1:**
```powershell
bun run dev
```

**Terminal 2:**
```powershell
cd apps\sim
bun run dev:sockets
```

## Schritt 8: App öffnen

Öffne im Browser: http://localhost:3000

## Troubleshooting

### Bun nicht gefunden
- Starte PowerShell neu nach der Installation
- Prüfe ob Bun im PATH ist: `$env:PATH`
- Füge manuell hinzu: `$env:PATH += ";$env:USERPROFILE\.bun\bin"`

### Datenbank-Verbindungsfehler
- Prüfe ob PostgreSQL läuft: `Get-Service postgresql*`
- Prüfe DATABASE_URL Format
- Für Supabase: Stelle sicher, dass pgvector Extension aktiviert ist

### Migrationen schlagen fehl
- Prüfe ob Datenbank existiert: `psql -U postgres -l`
- Prüfe pgvector Extension: `psql -U postgres -d introflow -c "\dx"`

### Port bereits belegt
- Ändere Port in `.env`: `NEXT_PUBLIC_APP_URL="http://localhost:3100"`
- Oder beende den Prozess auf Port 3000:
```powershell
netstat -ano | findstr :3000
taskkill /PID [PID_NUMMER] /F
```
