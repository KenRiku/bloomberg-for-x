# SciFind

A Bloomberg Terminal-style scientific intelligence platform built with Next.js 14, Anthropic Claude, and Neon PostgreSQL.

## Features

- **Morning Briefing**: Daily AI-ranked research papers based on your focus areas
- **Cross-Field Sparks**: Discover unexpected connections across scientific domains
- **Research Chat**: Streaming RAG-powered AI assistant with citation tracking
- **Bloomberg Terminal UI**: Dark monospace aesthetic with real-time data feel

## Setup

### Prerequisites
- Node.js 18+
- Neon PostgreSQL database
- Anthropic API key

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `AUTH_SECRET` — Random secret (generate with `openssl rand -base64 32`)
- `ANTHROPIC_API_KEY` — Anthropic API key

### Database Setup

```bash
npx prisma db push
```

### Seed Data

Visit `http://localhost:3000/api/seed` after starting the dev server to populate the database with 15 sample research papers.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Tech Stack

- **Next.js 14** — App Router, Server Components, Streaming
- **Prisma + Neon** — Serverless PostgreSQL
- **NextAuth v5** — JWT authentication
- **Anthropic Claude** — AI analysis via @ai-sdk/anthropic
- **Vercel AI SDK** — Streaming chat
- **Tailwind CSS v4** — Styling
- **shadcn/ui** — Component library

## License

MIT
