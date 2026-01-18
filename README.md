<p align="center">
  <a href="https://introflow.ai" target="_blank" rel="noopener noreferrer">
    <img src="apps/sim/public/logo/reverse/text/large.png" alt="introFlow Logo" width="500"/>
  </a>
</p>

<p align="center">Erstelle und deploye AI-Agent-Workflows in Minuten.</p>

<p align="center">
  <a href="https://introflow.ai" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/introflow.ai-2563eb" alt="introFlow.ai"></a>
  <a href="https://docs.introflow.ai" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Docs-2563eb.svg" alt="Documentation"></a>
</p>

### Workflows visuell erstellen
Erstelle AI-Agent-Workflows visuell auf einem Canvas – verbinde Agents, Tools und Blocks, dann führe sie sofort aus.

### Mit Copilot erweitern
Nutze Copilot, um Nodes zu generieren, Fehler zu beheben und Flows direkt aus natürlicher Sprache zu iterieren.

### Vector-Datenbanken integrieren
Lade Dokumente in einen Vector Store hoch und lass Agents Fragen basierend auf deinem spezifischen Content beantworten.

## Quickstart

### Self-hosted: Docker Compose

```bash
git clone https://github.com/yourusername/introflow.git && cd introflow
docker compose -f docker-compose.prod.yml up -d
```

Öffne [http://localhost:3000](http://localhost:3000)

#### Mit lokalen Modellen (Ollama)

Führe introFlow mit lokalen AI-Modellen über [Ollama](https://ollama.ai) aus – keine externen APIs erforderlich:

```bash
# Start mit GPU-Unterstützung (lädt automatisch gemma3:4b Modell)
docker compose -f docker-compose.ollama.yml --profile setup up -d

# Für CPU-only Systeme:
docker compose -f docker-compose.ollama.yml --profile cpu --profile setup up -d
```

Warte bis das Modell heruntergeladen ist, dann besuche [http://localhost:3000](http://localhost:3000). Weitere Modelle hinzufügen mit:
```bash
docker compose -f docker-compose.ollama.yml exec ollama ollama pull llama3.1:8b
```

#### Externe Ollama-Instanz verwenden

Wenn Ollama auf deinem Host-Rechner läuft, verwende `host.docker.internal` statt `localhost`:

```bash
OLLAMA_URL=http://host.docker.internal:11434 docker compose -f docker-compose.prod.yml up -d
```

Auf Linux verwende die IP-Adresse deines Hosts oder füge `extra_hosts: ["host.docker.internal:host-gateway"]` zur Compose-Datei hinzu.

#### vLLM verwenden

introFlow unterstützt [vLLM](https://docs.vllm.ai/) für selbst-gehostete Modelle. Setze `VLLM_BASE_URL` und optional `VLLM_API_KEY` in deiner Umgebung.

### Self-hosted: Manuelles Setup

**Anforderungen:** [Bun](https://bun.sh/), [Node.js](https://nodejs.org/) v20+, PostgreSQL 12+ mit [pgvector](https://github.com/pgvector/pgvector)

1. Klone und installiere:

```bash
git clone https://github.com/yourusername/introflow.git
cd introflow
bun install
```

2. PostgreSQL mit pgvector einrichten:

```bash
docker run --name introflow-db -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=introflow -p 5432:5432 -d pgvector/pgvector:pg17
```

Oder installiere manuell über die [pgvector Anleitung](https://github.com/pgvector/pgvector#installation).

3. Umgebung konfigurieren:

```bash
cp apps/sim/.env.example apps/sim/.env
cp packages/db/.env.example packages/db/.env
# Bearbeite beide .env Dateien und setze DATABASE_URL="postgresql://postgres:your_password@localhost:5432/introflow"
```

4. Migrationen ausführen:

```bash
cd packages/db && bunx drizzle-kit migrate --config=./drizzle.config.ts
```

5. Development-Server starten:

```bash
bun run dev:full  # Startet sowohl Next.js App als auch Realtime Socket Server
```

Oder separat ausführen: `bun run dev` (Next.js) und `cd apps/sim && bun run dev:sockets` (realtime).

## Copilot API Keys

Copilot ist ein introFlow-verwalteter Service. Um Copilot auf einer selbst-gehosteten Instanz zu verwenden:

- Gehe zu https://introflow.ai → Settings → Copilot und generiere einen Copilot API Key
- Setze die `COPILOT_API_KEY` Umgebungsvariable in deiner selbst-gehosteten apps/sim/.env Datei auf diesen Wert

## Umgebungsvariablen

Wichtige Umgebungsvariablen für selbst-gehostete Deployments. Siehe [`.env.example`](apps/sim/.env.example) für Standardwerte oder [`env.ts`](apps/sim/lib/core/config/env.ts) für die vollständige Liste.

| Variable | Erforderlich | Beschreibung |
|----------|-------------|--------------|
| `DATABASE_URL` | Ja | PostgreSQL Connection String mit pgvector |
| `BETTER_AUTH_SECRET` | Ja | Auth Secret (`openssl rand -hex 32`) |
| `BETTER_AUTH_URL` | Ja | Deine App URL (z.B. `http://localhost:3000`) |
| `NEXT_PUBLIC_APP_URL` | Ja | Öffentliche App URL (gleich wie oben) |
| `ENCRYPTION_KEY` | Ja | Verschlüsselt Umgebungsvariablen (`openssl rand -hex 32`) |
| `INTERNAL_API_SECRET` | Ja | Verschlüsselt interne API Routes (`openssl rand -hex 32`) |
| `API_ENCRYPTION_KEY` | Ja | Verschlüsselt API Keys (`openssl rand -hex 32`) |
| `COPILOT_API_KEY` | Nein | API Key von introflow.ai für Copilot Features |

## API Keys

### Erforderlich (für grundlegende Funktionalität)
- **OpenAI API Key** (`OPENAI_API_KEY`) - Für AI-Funktionalität
- **Anthropic API Key** (`ANTHROPIC_API_KEY_1`) - Optional, für Claude-Modelle

### Optional (für erweiterte Features)
- **Serper API Key** (`SERPER_API_KEY`) - Für Online-Suche
- **Exa API Key** (`EXA_API_KEY`) - Für erweiterte Suche
- **ElevenLabs API Key** (`ELEVENLABS_API_KEY`) - Für Text-to-Speech
- **Resend API Key** (`RESEND_API_KEY`) - Für E-Mail-Versand

## Troubleshooting

### Ollama-Modelle erscheinen nicht im Dropdown (Docker)

Wenn du Ollama auf deinem Host-Rechner laufen hast und introFlow in Docker, ändere `OLLAMA_URL` von `localhost` zu `host.docker.internal`:

```bash
OLLAMA_URL=http://host.docker.internal:11434 docker compose -f docker-compose.prod.yml up -d
```

Siehe [Externe Ollama-Instanz verwenden](#externe-ollama-instanz-verwenden) für Details.

### Datenbank-Verbindungsprobleme

Stelle sicher, dass PostgreSQL die pgvector Extension installiert hat. Bei Verwendung von Docker, warte bis die Datenbank healthy ist, bevor du Migrationen ausführst.

### Port-Konflikte

Wenn Ports 3000, 3002 oder 5432 bereits in Verwendung sind, konfiguriere Alternativen:

```bash
# Custom Ports
NEXT_PUBLIC_APP_URL=http://localhost:3100 POSTGRES_PORT=5433 docker compose up -d
```

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Runtime**: [Bun](https://bun.sh/)
- **Datenbank**: PostgreSQL mit [Drizzle ORM](https://orm.drizzle.team)
- **Authentifizierung**: [Better Auth](https://better-auth.com)
- **UI**: [Shadcn](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Flow Editor**: [ReactFlow](https://reactflow.dev/)
- **Docs**: [Fumadocs](https://fumadocs.vercel.app/)
- **Monorepo**: [Turborepo](https://turborepo.org/)
- **Realtime**: [Socket.io](https://socket.io/)
- **Background Jobs**: [Trigger.dev](https://trigger.dev/)
- **Remote Code Execution**: [E2B](https://www.e2b.dev/)

## Deployment

### Vercel (Frontend)

1. Verbinde dein GitHub Repository mit Vercel
2. Setze die Umgebungsvariablen in Vercel Dashboard
3. Deploy automatisch bei jedem Push

### Railway (Backend/Datenbank)

1. Erstelle ein neues Projekt auf Railway
2. Füge eine PostgreSQL-Datenbank hinzu
3. Setze `DATABASE_URL` in deiner Vercel-Umgebung
4. Optional: Deploy Backend-Services auf Railway

## Contributing

Wir freuen uns über Beiträge! Bitte siehe unsere [Contributing Guide](.github/CONTRIBUTING.md) für Details.

## License

Dieses Projekt ist lizenziert unter der Apache License 2.0 - siehe die [LICENSE](LICENSE) Datei für Details.

<p align="center">Made with ❤️ by the introFlow Team</p>
