# Frontend lokal starten (ohne Datenbank)

## ✅ WICHTIG: Windows-Problem gelöst

**Problem:** Turbopack hat auf Windows Probleme mit Symlinks, besonders bei langen Pfaden mit Leerzeichen (z.B. OneDrive).

**Lösung:** Verwende `dev:webpack` statt `dev` (ohne Turbopack).

## Schnellstart - Frontend sehen

### Schritt 1: .env Dateien erstellen

Die `.env` Dateien sollten bereits existieren. Falls nicht, erstelle `apps/sim/.env`:

```env
# Minimale .env für Frontend-Development
DATABASE_URL="postgresql://postgres:temp@localhost:5432/introflow"
BETTER_AUTH_SECRET="temp_auth_secret_min_32_characters_long_for_dev"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ENCRYPTION_KEY="temp_encryption_key_min_32_characters_long_for_dev"
INTERNAL_API_SECRET="temp_internal_api_secret_min_32_characters_long"
API_ENCRYPTION_KEY="temp_api_encryption_key_min_32_characters_long"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3002"
```

### Schritt 2: Frontend starten (mit Webpack)

```powershell
cd apps\sim
$env:PATH += ";$env:USERPROFILE\.bun\bin"
bun run dev:webpack
```

**Wichtig:** Verwende `dev:webpack` statt `dev` wegen Windows-Symlink Problemen!

### Schritt 3: Browser öffnen

Öffne: http://localhost:3000

## Was funktioniert / Was nicht

### ✅ Funktioniert ohne DB:
- Frontend lädt
- UI wird angezeigt
- Routing funktioniert
- Design und Branding sichtbar

### ❌ Funktioniert NICHT ohne DB:
- Login/Registrierung
- Workflows erstellen/speichern
- Datenbank-abhängige Features

## Troubleshooting

### Turbopack Error auf Windows

**Fehler:** `create symlink to ...` oder `os error 1314`

**Lösung:** Verwende `bun run dev:webpack` statt `bun run dev`

### Port bereits belegt

```powershell
# Prüfe Port 3000
netstat -ano | findstr :3000

# Beende Prozess (ersetze [PID] mit der Nummer)
taskkill /PID [PID] /F
```

### Server startet nicht

1. Prüfe ob `.env` Datei existiert: `Test-Path apps\sim\.env`
2. Prüfe ob Bun im PATH ist: `bun --version`
3. Installiere Dependencies neu: `bun install`

## Nächster Schritt

Um alle Features zu nutzen, richte später eine Datenbank ein (Supabase oder lokales PostgreSQL).

Siehe `SETUP-LOKAL.md` für vollständiges Setup mit Datenbank.
