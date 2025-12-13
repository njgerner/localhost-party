import { NextRequest, NextResponse } from "next/server";
import { roomStore } from "@/lib/store";

const MAX_CODE_GENERATION_ATTEMPTS = 100;

function generateRoomCode(attempt: number = 0): string {
  // Prevent infinite recursion
  if (attempt >= MAX_CODE_GENERATION_ATTEMPTS) {
    throw new Error(
      "Unable to generate unique room code - too many active rooms"
    );
  }

  // Generate a random 4-letter code
  // Exclude confusing letters: I, O, L (can look like 1, 0)
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ";
  let code = "";

  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Check if code already exists, regenerate if it does
  if (roomStore.get(code)) {
    return generateRoomCode(attempt + 1);
  }

  return code;
}

// Valid game types - should match PLACEHOLDER_GAMES ids in app/page.tsx
const ALLOWED_GAME_TYPES = ['game-1', 'game-2', 'game-3', 'game-4'];

export async function POST(request: NextRequest) {
  try {
    // Parse optional game type from request body
    let gameType: string | null = null;
    try {
      const body = await request.json();
      // Validate gameType against allowed values
      if (body.gameType && ALLOWED_GAME_TYPES.includes(body.gameType)) {
        gameType = body.gameType;
      }
    } catch (parseError) {
      // No body or invalid JSON, proceed without game type
      console.warn('Failed to parse request body, proceeding without gameType:', parseError);
    }

    const code = generateRoomCode();
    const room = roomStore.create(code, gameType);

    if (process.env.NODE_ENV === 'development') {
      console.log(`🎉 Room created: ${code} (gameType: ${gameType})`);
    }

    return NextResponse.json({
      code: room.code,
      id: room.id,
      gameType,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}
