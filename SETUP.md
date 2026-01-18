# introFlow Setup-Anleitung

Diese Anleitung führt dich durch das komplette Setup von introFlow auf deinem lokalen System.

## Voraussetzungen

- **Bun** >= 1.2.13 ([Installation](https://bun.sh/))
- **Node.js** >= 20.0.0 ([Installation](https://nodejs.org/))
- **PostgreSQL** 12+ mit **pgvector** Extension
- **Docker** (optional, für einfaches Setup)

## Option 1: Docker Compose (Empfohlen für schnelles Setup)

### 1. Repository klonen

```bash
git clone https://github.com/yourusername/introflow.git
cd introflow
```

### 2. Docker Compose starten

```bash
docker compose -f docker-compose.prod.yml up -d
```

Warte bis alle Container healthy sind (ca. 1-2 Minuten):

```bash
docker compose -f docker-compose.prod.yml ps
```

### 3. App öffnen

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Option 2: Manuelles Setup

### 1. Dependencies installieren

```bash
bun install
```

### 2. PostgreSQL mit pgvector einrichten

#### Option A: Docker (Empfohlen)

```bash
docker run --name introflow-db \
  -e POSTGRES_PASSWORD=introflow_password \
  -e POSTGRES_DB=introflow \
  -p 5432:5432 \
  -d pgvector/pgvector:pg17
```

#### Option B: Lokale Installation

1. Installiere PostgreSQL 17+
2. Installiere pgvector Extension:
   ```bash
   # Ubuntu/Debian
   sudo apt install postgresql-17-pgvector
   
   # macOS (Homebrew)
   brew install pgvector
   ```
3. Erstelle Datenbank:
   ```sql
   CREATE DATABASE introflow;
   \c introflow
   CREATE EXTENSION vector;
   ```

### 3. Umgebungsvariablen konfigurieren

Erstelle `.env` Dateien basierend auf den Beispielen:

```bash
# Für die Haupt-App
cp apps/sim/.env.example apps/sim/.env 2>/dev/null || touch apps/sim/.env

# Für die Datenbank-Packages
cp packages/db/.env.example packages/db/.env 2>/dev/null || touch packages/db/.env
```

#### Wichtige Umgebungsvariablen für `apps/sim/.env`:

```bash
# Datenbank
DATABASE_URL="postgresql://postgres:introflow_password@localhost:5432/introflow"

# Authentication (generiere mit: openssl rand -hex 32)
BETTER_AUTH_SECRET="dein_auth_secret_hier"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Verschlüsselung (generiere mit: openssl rand -hex 32)
ENCRYPTION_KEY="dein_encryption_key_hier"
INTERNAL_API_SECRET="dein_internal_api_secret_hier"
API_ENCRYPTION_KEY="dein_api_encryption_key_hier"

# AI Provider (mindestens einer erforderlich)
OPENAI_API_KEY="sk-..."
# ODER
ANTHROPIC_API_KEY_1="sk-ant-..."
# ODER für lokale Modelle
OLLAMA_URL="http://localhost:11434"
```

#### Optional: Erweiterte Features

```bash
# Online-Suche
SERPER_API_KEY="..."
EXA_API_KEY="..."

# Text-to-Speech
ELEVENLABS_API_KEY="..."

# E-Mail-Versand
RESEND_API_KEY="..."
FROM_EMAIL_ADDRESS="noreply@introflow.ai"
```

### 4. Datenbank-Migrationen ausführen

```bash
cd packages/db
bunx drizzle-kit migrate --config=./drizzle.config.ts
cd ../..
```

### 5. Development-Server starten

```bash
# Startet sowohl Next.js App als auch Realtime Socket Server
bun run dev:full
```

Oder separat:

```bash
# Terminal 1: Next.js App
bun run dev

# Terminal 2: Realtime Socket Server
cd apps/sim && bun run dev:sockets
```

### 6. App öffnen

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## API Keys - Was brauchst du wirklich?

### Erforderlich (mindestens einer)

- **OpenAI API Key** - Für die meisten AI-Funktionen
- **Anthropic API Key** - Alternative zu OpenAI, für Claude-Modelle
- **Ollama** - Für lokale Modelle (kein API Key nötig)

### Optional (für spezifische Features)

- **Serper API Key** - Für Online-Suche in Workflows
- **Exa API Key** - Für erweiterte Suche
- **ElevenLabs API Key** - Für Text-to-Speech
- **Resend API Key** - Für E-Mail-Versand
- **COPILOT_API_KEY** - Für Copilot-Features (wird von introFlow verwaltet)

## Troubleshooting

### Port bereits in Verwendung

Wenn Port 3000, 3002 oder 5432 bereits belegt sind:

```bash
# Custom Ports setzen
NEXT_PUBLIC_APP_URL=http://localhost:3100 \
POSTGRES_PORT=5433 \
docker compose -f docker-compose.prod.yml up -d
```

### Datenbank-Verbindungsfehler

1. Prüfe ob PostgreSQL läuft:
   ```bash
   docker ps | grep introflow-db
   # oder
   psql -U postgres -h localhost -c "SELECT 1"
   ```

2. Prüfe ob pgvector installiert ist:
   ```sql
   \c introflow
   SELECT * FROM pg_extension WHERE extname = 'vector';
   ```

3. Prüfe DATABASE_URL Format:
   ```
   postgresql://username:password@host:port/database
   ```

### Migrationen schlagen fehl

1. Stelle sicher, dass die Datenbank existiert und pgvector installiert ist
2. Prüfe die DATABASE_URL in `packages/db/.env`
3. Führe Migrationen manuell aus:
   ```bash
   cd packages/db
   bunx drizzle-kit push --config=./drizzle.config.ts
   ```

### Ollama-Modelle erscheinen nicht

Wenn Ollama auf dem Host läuft und introFlow in Docker:

```bash
# Windows/Mac
OLLAMA_URL=http://host.docker.internal:11434 docker compose up -d

# Linux
OLLAMA_URL=http://$(hostname -I | awk '{print $1}'):11434 docker compose up -d
```

## Deployment

### Vercel (Frontend)

1. Verbinde dein GitHub Repository mit Vercel
2. Setze alle Umgebungsvariablen im Vercel Dashboard
3. Deploy automatisch bei jedem Push

**Wichtig**: Setze `NEXT_PUBLIC_APP_URL` auf deine Vercel-URL.

### Railway (Backend/Datenbank)

1. Erstelle neues Projekt auf Railway
2. Füge PostgreSQL-Datenbank hinzu
3. Kopiere `DATABASE_URL` in deine Vercel-Umgebungsvariablen
4. Optional: Deploy Backend-Services auf Railway

### Docker Images bauen

```bash
# App Image
docker build -f docker/app.Dockerfile -t introflow:latest .

# Realtime Image
docker build -f docker/realtime.Dockerfile -t introflow-realtime:latest .

# Migrations Image
docker build -f docker/db.Dockerfile -t introflow-migrations:latest .
```

## Nächste Schritte

- [ ] Erstelle dein erstes Workflow
- [ ] Konfiguriere Branding (Logo, Farben) über Umgebungsvariablen
- [ ] Setze Copilot API Key für erweiterte Features
- [ ] Integriere externe Services (Slack, Discord, etc.)

## Support

Bei Problemen:
1. Prüfe die [Troubleshooting](#troubleshooting) Sektion
2. Öffne ein Issue auf GitHub
3. Siehe die [Dokumentation](README.md)
