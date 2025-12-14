# Sound Assets

This directory contains sound effects and music for the game.

## Directory Structure

```
sounds/
  ├── button-click.mp3          # Button interaction sound
  ├── player-join.mp3            # Player joins lobby
  ├── submit-complete.mp3        # Player submits answer
  ├── vote-cast.mp3              # Player votes
  ├── phase-transition.mp3       # Game phase changes
  ├── all-ready.mp3              # All players ready
  ├── clock-tick.mp3             # Timer ticking (normal)
  ├── clock-tick-fast.mp3        # Timer ticking (urgent)
  ├── time-up.mp3                # Timer expired
  └── music/
      ├── lobby-theme.mp3        # Lobby background music
      └── victory-fanfare.mp3    # Victory music
```

## Asset Requirements

### Sound Effects

- **Format**: MP3 or OGG
- **Bitrate**: 128kbps
- **Max file size**: 50KB per sound
- **Duration**: 0.5-2 seconds
- **Style**: Arcade/retro themed

### Music

- **Format**: MP3 or OGG
- **Bitrate**: 128kbps
- **Max file size**: 500KB per track
- **Loop quality**: Seamless loops required
- **Style**: Upbeat, 80s arcade, synthwave

## Placeholder Files

Until actual sound assets are added, the audio system will:

1. Log narration to console instead of playing
2. Gracefully handle missing sound files
3. Continue working without audio

## Adding Sounds

1. Add audio files to this directory
2. Ensure filenames match those in `/lib/audio/sounds.ts`
3. Test audio playback in development
4. Optimize file sizes for web delivery

## Sources

Recommended sources for royalty-free sounds:

- [Freesound.org](https://freesound.org) - CC0 license
- [Mixkit](https://mixkit.co/free-sound-effects/) - Free for commercial use
- [ElevenLabs Sound Effects API](https://elevenlabs.io) - Generate custom sounds
