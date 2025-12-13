# Claude Code Configuration for localhost:party

This directory contains Claude Code skills and commands for the localhost:party project.

## Using Skills

Skills are reusable prompts that help automate common development tasks. You can create custom skills for this project in the `.claude/skills/` directory.

### Suggested Skills to Create

#### 1. Game Generator Skill
Create a skill that scaffolds a new game following the established pattern.

**File: `.claude/skills/generate-game.md`**
```markdown
Generate a new game for localhost:party following these steps:

1. Ask for the game name and description
2. Create game module in `/lib/games/{game-name}.ts` with:
   - Game state interface
   - Game configuration
   - State machine (phases: lobby → playing → voting → results)
   - Action handlers
3. Create display view component in `/app/display/games/{game-name}/`
4. Create controller view component in `/app/play/games/{game-name}/`
5. Add game to the games registry
6. Create types in `/lib/types/games/{game-name}.ts`
7. Update WebSocket handlers to support new game events

Follow the existing patterns from AI Quiplash as reference.
```

#### 2. Component Generator Skill
**File: `.claude/skills/generate-component.md`**
```markdown
Generate a new React component for localhost:party:

1. Ask for component name and purpose
2. Create component file with TypeScript
3. Use Tailwind CSS for styling
4. Follow design system tokens
5. Include JSDoc comments
6. Export from index file
7. Create Storybook story (if applicable)

Use the existing component patterns and design tokens.
```

#### 3. AI Integration Skill
**File: `.claude/skills/add-ai-feature.md`**
```markdown
Add an AI-powered feature to localhost:party:

1. Identify if this should use:
   - Direct Claude API call (simple content generation)
   - Claude Agent SDK (needs context and tools)
2. Create the AI service in `/lib/ai/`
3. Set up error handling and fallbacks
4. Add rate limiting considerations
5. Update types for AI responses
6. Add tests for AI integration

Consider cost implications and caching strategies.
```

#### 4. Database Schema Update Skill
**File: `.claude/skills/update-schema.md`**
```markdown
Update the Prisma database schema:

1. Modify `/prisma/schema.prisma`
2. Run `npx prisma format`
3. Generate migration or push changes
4. Update related TypeScript types
5. Update database access functions in `/lib/prisma/`
6. Update seed data if needed
7. Document schema changes

Ensure backward compatibility or provide migration path.
```

## Slash Commands

You can also create slash commands in `.claude/commands/` for quick actions.

### Suggested Commands

#### `/new-game`
Quick command to start creating a new game (calls the generate-game skill).

#### `/review-pr`
Reviews code changes against project standards before creating a PR.

#### `/add-test`
Generates tests for a given file or component.

## Best Practices

1. **Consistency**: Skills should maintain the project's architectural patterns
2. **Documentation**: Always update relevant docs when using skills
3. **Type Safety**: Ensure generated code is fully typed
4. **Error Handling**: Include proper error handling in generated code
5. **Testing**: Skills should prompt for or generate tests

## Learning More

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [Creating Custom Skills](https://github.com/anthropics/claude-code/blob/main/docs/skills.md)
- [Slash Commands Guide](https://github.com/anthropics/claude-code/blob/main/docs/commands.md)
