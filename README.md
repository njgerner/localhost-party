# localhost:party

An AI-powered party game suite inspired by Jackbox Games, featuring dynamic AI hosts, real-time multiplayer gameplay, and customizable content generation.

## Features

- **AI-Powered Gameplay**: Leverages Claude AI for dynamic content generation, intelligent game hosting, and real-time judging
- **Immersive Audio**: AI narrator with ElevenLabs TTS, background music, and comprehensive sound effects
- **Multiplayer Fun**: Real-time WebSocket-based gameplay with room codes
- **Currently Playable**:
  - **AI Quiplash** - Witty responses judged by AI ✅ IMPLEMENTED
- **Planned Games**:
  - AI Drawful - Drawing prompts with AI-generated challenges
  - Fibbage with AI - AI generates plausible fake answers
  - Murder Mystery Generator - Unique mysteries created on the fly
  - Rap Battle - AI judges and provides commentary
- **Dual View System**: Separate display (TV) and controller (phone) interfaces
- **Dynamic AI Narrator**: Context-aware narrator that reads game descriptions and provides commentary

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes, Custom WebSocket Server (Socket.io)
- **Database**: Neon (Serverless Postgres), Prisma ORM v7
- **AI**: Claude API (Anthropic), Claude Agent SDK
- **Audio**: ElevenLabs TTS API, Howler.js for sound management
- **Deployment**: Vercel (app), Doppler (secrets management), Neon (database)
- **Testing**: Vitest, React Testing Library

## Project Structure

```
localhost-party/
├── app/                     # Next.js app router
│   ├── (display)/          # TV/main screen route group
│   │   └── display/        # Display views (lobby, game, results)
│   ├── (controller)/       # Mobile controller route group
│   │   └── play/           # Player controller views
│   ├── api/                # REST API endpoints
│   │   ├── config/         # App configuration
│   │   └── tts/            # Text-to-speech proxy
│   └── audio-test/         # Audio testing page
├── components/
│   ├── display/            # Display view components
│   └── controller/         # Controller view components
├── lib/
│   ├── audio/              # Audio system (narrator, sounds, types)
│   ├── context/            # React context providers (Audio, WebSocket)
│   ├── games/              # Game logic modules (Quiplash)
│   ├── types/              # Shared TypeScript types
│   ├── db.ts               # Database client
│   └── store.ts            # In-memory data store
├── prisma/                 # Database schema
├── public/sounds/          # Audio assets (music, sound effects)
├── scripts/                # Utility scripts (voice listing, sound generation)
├── websocket-server/       # Standalone WebSocket server
└── server.ts               # Combined Next.js + WebSocket server
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Neon database (free tier works great)
- ElevenLabs API key (free tier: 10,000 chars/month)
- Doppler CLI (for secrets management)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/localhost-party.git
cd localhost-party
```

2. Install dependencies:

```bash
npm install
```

3. Set up Doppler for secrets management:

```bash
# Install Doppler CLI
brew install dopplerhq/cli/doppler  # macOS
# or visit https://docs.doppler.com/docs/install-cli

# Login and setup
doppler login
doppler setup
# Select project: localhost-party
# Select config: dev_personal
```

Add your secrets to Doppler:

```bash
doppler secrets set LH_PARTY_DATABASE_URL
doppler secrets set NEXT_PUBLIC_LH_PARTY_WS_URL
doppler secrets set NEXT_PUBLIC_ELEVENLABS_API_KEY
```

**Or** use `.env.local` without Doppler:

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. Initialize the database:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to see the app

## Development

### Available Scripts

**Development:**

- `npm run dev` - Start with Doppler secrets (Next.js + WebSocket)
- `npm run dev:local` - Start without Doppler (uses .env.local)
- `npm run dev:next` - Start Next.js only (no WebSocket)
- `npm run dev:ws` - Start WebSocket server only

**Production:**

- `npm run build` - Build for production
- `npm run start` - Start production server (Next.js + WebSocket)
- `npm run start:next` - Start Next.js production (no WebSocket)

**Quality:**

- `npm run lint` - Run ESLint
- `npm run type-check` - Type check TypeScript files
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI

**Database:**

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

### Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality:

**Pre-commit:**

- Formats and lints staged files with Prettier and ESLint
- Type checks the entire project

**Pre-push:**

- Attempts to build the project (currently non-blocking due to turbo/SWC issue)

**Commit Message:**

- Validates commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
- Allowed types: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `build`, `ci`, `perf`, `revert`

**Bypass hooks:** In emergencies, you can skip hooks with `git commit --no-verify` or `git push --no-verify`

## How to Play

### Display View (TV/Large Screen)

1. Navigate to `/display` on your large screen or TV
2. A unique 4-letter room code will be generated automatically
3. A QR code will be displayed for easy joining
4. Wait for players to join

### Controller View (Mobile/Phone)

1. Open `/play` on your mobile device
2. Enter the 4-letter room code shown on the TV
3. Enter your name
4. Wait in the lobby for other players
5. Once at least 2 players have joined, anyone can tap "Start Game"
6. Follow the on-screen instructions to play

### Tips

- Display view is optimized for large screens (1080p/4K)
- Controller view is optimized for mobile devices
- At least 2 players required to start a game
- Players can join mid-game by scanning the QR code

## Contributing

This is a weekend project, but contributions are welcome! Check out the issues tab for planned features and improvements.

## License

MIT

## Acknowledgments

- Inspired by Jackbox Games
- Powered by Anthropic's Claude AI
- Built with love over a weekend
