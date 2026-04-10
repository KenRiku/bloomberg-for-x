# SciFind — Bloomberg-Style Scientific Intelligence Platform

## Overview
SciFind is a Next.js 14 application providing a Bloomberg Terminal-style interface for scientific research intelligence. It aggregates and ranks scientific papers based on user-defined focus areas, provides AI-powered analysis, and includes a streaming RAG-enhanced chat interface.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL via Neon (serverless) + Prisma ORM
- **Auth**: NextAuth v5 (credentials-based JWT)
- **AI**: Anthropic Claude via @ai-sdk/anthropic + Vercel AI SDK
- **Styling**: Tailwind CSS v4 + shadcn/ui components

### Key Files
- `auth.ts` — NextAuth configuration with JWT strategy
- `middleware.ts` — Route protection
- `lib/prisma.ts` — Prisma client with Neon adapter
- `lib/seed-data.ts` — Focus areas and paper seed data
- `prisma/schema.prisma` — Database schema
- `prisma.config.ts` — Prisma datasource config (uses DATABASE_URL from env)

### API Routes
- `POST /api/signup` — User registration
- `POST /api/onboarding` — Save focus areas
- `GET /api/briefing` — Fetch/generate daily briefing
- `POST /api/chat` — Streaming AI chat with RAG
- `GET /api/papers/[id]` — Paper details
- `GET/POST /api/seed` — Seed database with test papers

## Setup

1. Copy `.env.example` to `.env.local` and fill in values
2. Run `npx prisma db push` to create database tables
3. Visit `/api/seed` to populate the database with seed papers
4. Create an account at `/signup`

## Development
```bash
npm run dev
```

## Design System
Bloomberg Terminal aesthetic:
- Background: #0a0a0a
- Accent green: #00ff41
- Accent amber: #f59e0b
- Monospace font: JetBrains Mono
- Display font: DM Serif Display
