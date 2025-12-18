# Deployment Guide

This guide covers deploying localhost:party to production using Vercel (Next.js app) and Railway (WebSocket server).

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Production                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐         ┌─────────────┐         ┌─────────┐  │
│   │   Vercel    │         │   Railway   │         │  Neon   │  │
│   │  (Next.js)  │◄───────►│ (WebSocket) │◄───────►│  (DB)   │  │
│   └─────────────┘         └─────────────┘         └─────────┘  │
│         │                       │                              │
│         └───────────────────────┘                              │
│                    │                                           │
│             ┌──────┴──────┐                                    │
│             │   Doppler   │                                    │
│             │  (Secrets)  │                                    │
│             └─────────────┘                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

- **Vercel**: Hosts the Next.js frontend (serverless)
- **Railway**: Hosts the WebSocket server (persistent process)
- **Neon**: Serverless Postgres database
- **Doppler**: Secrets management across environments

## Prerequisites

1. [Vercel account](https://vercel.com)
2. [Railway account](https://railway.app)
3. [Neon account](https://neon.tech)
4. [Doppler account](https://doppler.com)
5. [Doppler CLI installed](https://docs.doppler.com/docs/install-cli)

## Step 1: Set Up Doppler

### 1.1 Create Doppler Project

```bash
# Login to Doppler
doppler login

# Create project (or use the web dashboard)
doppler projects create localhost-party
```

### 1.2 Configure Environments

In Doppler dashboard, create these configs:

- **dev** - Shared development environment
- **dev_personal** - Individual developer's local secrets (not synced to deployments)
- **preview** - Vercel preview deployments (used by PR previews)
- **prod** - Production environment (used by Vercel production)

**IMPORTANT**: Secrets added to `dev_personal` are NOT synced to deployed environments. Always add secrets to `dev`, `preview`, and `prod` configs for deployments to work.

### 1.3 Add Secrets to Doppler

Add these secrets in Doppler for **each environment** (`dev`, `preview`, `prod`):

| Secret                           | Description            | Example                              | Required |
| -------------------------------- | ---------------------- | ------------------------------------ | -------- |
| `LH_PARTY_DATABASE_URL`          | Neon connection string | `postgresql://...`                   | Yes      |
| `NEXT_PUBLIC_LH_PARTY_WS_URL`    | WebSocket server URL   | `https://localhost-party.vercel.app` | Yes      |
| `NEXT_PUBLIC_ELEVENLABS_API_KEY` | ElevenLabs TTS API key | `sk_...`                             | Yes      |

**How to add a secret to all configs:**

```bash
# Get value from dev_personal (if you added it there first)
VALUE=$(doppler secrets get SECRET_NAME --config dev_personal --plain)

# Set in all deployment configs
doppler secrets set SECRET_NAME="$VALUE" --config dev
doppler secrets set SECRET_NAME="$VALUE" --config preview
doppler secrets set SECRET_NAME="$VALUE" --config prod
```

**Get your ElevenLabs API key:**

1. Sign up at https://elevenlabs.io (free tier: 10,000 chars/month)
2. Navigate to Profile → API Keys
3. Create a new API key
4. Copy the key (starts with `sk_`)

### 1.4 Link Local Project

```bash
cd localhost-party
doppler setup
# Select project: localhost-party
# Select environment: dev
```

## Step 2: Set Up Neon Database

### 2.1 Create Database

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project: `localhost-party`
3. Copy the connection string

### 2.2 Add to Doppler

Add `DATABASE_URL` to your Doppler environments:

- **dev**: Use development branch
- **prd**: Use main branch

### 2.3 Push Schema

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
doppler run -- npm run db:push
```

## Step 3: Deploy WebSocket Server to Railway

### 3.1 Create Railway Project

1. Go to [Railway Dashboard](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set the root directory to `websocket-server`

### 3.2 Configure Environment Variables

In Railway project settings, add:

```
PORT=3001
NEXT_PUBLIC_LH_PARTY_APP_URL=https://your-vercel-app.vercel.app
```

Or connect Doppler:

1. In Railway, go to Variables
2. Click "Connect" → "Doppler"
3. Select your project and environment

### 3.3 Configure Build Settings

Railway should auto-detect the Node.js project. Verify:

- Build command: `npm install`
- Start command: `npm start`

### 3.4 Get Railway URL

After deployment, copy your Railway URL (e.g., `https://localhost-party-ws.railway.app`)

## Step 4: Deploy Next.js to Vercel

### 4.1 Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework: Next.js
   - Root Directory: `.` (root)
   - Build Command: `prisma generate && next build`

### 4.2 Configure Environment Variables

In Vercel project settings → Environment Variables:

**Option A: Manual**

```
LH_PARTY_DATABASE_URL=your-neon-url
LH_PARTY_ANTHROPIC_API_KEY=your-api-key
NEXT_PUBLIC_LH_PARTY_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_LH_PARTY_WS_URL=https://your-railway-url.railway.app
```

**Option B: Doppler Integration**

1. Go to Vercel Integrations
2. Add Doppler integration
3. Connect your project

### 4.3 Deploy

Vercel will auto-deploy on push to main. For manual deploy:

```bash
vercel --prod
```

## Step 5: Update URLs

After both services are deployed, update the URLs in Doppler:

1. Update `NEXT_PUBLIC_LH_PARTY_APP_URL` with your Vercel URL
2. Update `NEXT_PUBLIC_LH_PARTY_WS_URL` with your Railway URL
3. Redeploy both services to pick up the changes

## Local Development with Doppler

```bash
# Run with Doppler secrets
npm run dev:doppler

# Or run Next.js and WebSocket separately
npm run dev:next  # Terminal 1
npm run dev:ws    # Terminal 2
```

## Troubleshooting

### WebSocket Connection Fails

1. Check Railway logs for errors
2. Verify `NEXT_PUBLIC_LH_PARTY_WS_URL` is correct in Vercel
3. Check CORS configuration in `websocket-server/server.js`

### Database Connection Issues

1. Verify `DATABASE_URL` is set correctly
2. Check Neon dashboard for connection limits
3. The app works in-memory without database

### Build Failures

1. Check Prisma client is generated: `npm run db:generate`
2. Verify all dependencies are installed
3. Check for TypeScript errors: `npm run type-check`

## Monitoring

### Health Checks

- **WebSocket**: `GET https://your-railway-url/health`
- **API**: `GET https://your-vercel-url/api/health` (if implemented)

### Logs

- **Vercel**: Dashboard → Project → Logs
- **Railway**: Dashboard → Project → Logs
- **Neon**: Dashboard → Monitoring

## Cost Estimates (Free Tier)

| Service | Free Tier                             |
| ------- | ------------------------------------- |
| Vercel  | 100GB bandwidth, serverless functions |
| Railway | $5/month credit, enough for hobby     |
| Neon    | 0.5GB storage, 190 compute hours      |
| Doppler | Unlimited secrets, 5 team members     |
