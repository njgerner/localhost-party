# Generate New Game

Generate a new game module for localhost:party following the established architecture patterns.

## Process

1. **Gather Requirements**
   - Ask for the game name (e.g., "AI Quiplash", "Rap Battle")
   - Get a brief description of gameplay
   - Understand the game flow and phases
   - Identify AI integration points

2. **Create Game Module** (`/lib/games/{game-name}.ts`)
   ```typescript
   - Game state interface
   - Game configuration object
   - State machine with phases (lobby → playing → voting → results)
   - Action handlers for each phase
   - AI integration hooks
   - Scoring logic
   ```

3. **Create Display View** (`/app/display/games/{game-name}/page.tsx`)
   ```typescript
   - Layout for TV/large screen
   - Show game state to all players
   - Display submissions, votes, scores
   - Host announcements area
   - Timer component
   - Use design system components
   ```

4. **Create Controller View** (`/app/play/games/{game-name}/page.tsx`)
   ```typescript
   - Mobile-optimized input
   - Player-specific state
   - Submission forms
   - Voting interface
   - Touch-friendly UI
   ```

5. **Define Types** (`/lib/types/games/{game-name}.ts`)
   ```typescript
   - Game state type
   - Player action types
   - WebSocket event types
   - Zod validation schemas
   ```

6. **Update Game Registry**
   - Add game to `/lib/games/index.ts`
   - Register WebSocket handlers
   - Add to game selection menu

7. **AI Integration** (if applicable)
   - Content generation functions in `/lib/ai/`
   - Agent configuration if using Claude Agent SDK
   - Define agent tools and context

## Reference Implementation

Look at existing games (e.g., AI Quiplash) as reference for:
- File structure
- Naming conventions
- State management patterns
- WebSocket event naming
- Component organization

## Checklist

- [ ] Game module created with all required functions
- [ ] Display view implemented and styled
- [ ] Controller view implemented and mobile-optimized
- [ ] Types defined and validated with Zod
- [ ] Game registered in the games index
- [ ] WebSocket events handled
- [ ] AI integration configured (if needed)
- [ ] README updated with new game description

## Notes

- Follow the existing code style and patterns
- Ensure type safety throughout
- Add error handling for all user inputs
- Consider edge cases (players leaving mid-game, etc.)
- Make it fun!
