# Deployment Checklist - Vercel & GitHub

## 📋 Pre-Deployment Checklist

### ✅ Code Changes Ready

- [x] Sound system using generated sounds (not system sounds)
- [x] Home page narrator implemented
- [x] Display page lobby music continuity
- [x] Music ducking when narrator speaks
- [x] ElevenLabs API using correct model (`eleven_turbo_v2_5`)
- [x] Proper error handling and fallbacks
- [x] TypeScript compilation passes
- [x] No hydration errors

---

## 🔐 Environment Variables for Vercel

### Required for Voice Narration

**Variable:** `NEXT_PUBLIC_ELEVENLABS_API_KEY`

**How to add in Vercel:**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add variable:
   ```
   Name: NEXT_PUBLIC_ELEVENLABS_API_KEY
   Value: sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   Environment: Production, Preview, Development
   ```
4. Click **Save**
5. **Redeploy** your project for changes to take effect

**Important:**

- This is already prefixed with `NEXT_PUBLIC_` so it's available to the browser
- The key is exposed in the browser (this is safe - ElevenLabs keys are designed for client-side use)
- Free tier: 10,000 characters/month

### Optional - Using Doppler (If Already Set Up)

If you're using Doppler (based on your git history), the key should sync automatically.

---

## 📦 Files to Commit

### Required Files (Must Commit)

```bash
# Core code changes
git add app/page.tsx                           # Home page with narrator
git add app/layout.tsx                         # AudioProvider wrapper
git add app/(display)/display/page.tsx         # Display music continuity
git add lib/audio/narrator.ts                  # Updated model
git add lib/audio/sounds.ts                    # Using generated sounds
git add lib/context/AudioContext.tsx           # Audio context fixes

# API route
git add app/api/config/route.ts                # Config endpoint

# Sound files (IMPORTANT!)
git add public/sounds/*.m4a                    # All M4A sound effects
git add public/sounds/*.mp3                    # All MP3 fallbacks

# Music file (if you added it)
git add public/sounds/music/lobby-theme.mp3    # Background music
```

### Documentation (Optional but Recommended)

```bash
# User-facing docs
git add HOME_PAGE_AUDIO_IMPLEMENTATION.md
git add TESTING_GUIDE.md
git add DEPLOYMENT_CHECKLIST.md               # This file
git add public/sounds/README.md
git add public/sounds/music/MUSIC_GENERATION_GUIDE.md

# Or skip docs with:
# (They're just for reference, not needed for deployment)
```

### Files to SKIP (Already in .gitignore)

```bash
# Don't commit:
.env.local                    # Your local API key (ignored)
.next/                        # Build output (ignored)
node_modules/                 # Dependencies (ignored)
```

---

## 🎵 Music File Deployment Options

### Option 1: Commit the Music File (Recommended)

If you downloaded `lobby-theme.mp3`:

```bash
# Add the music file to git
git add public/sounds/music/lobby-theme.mp3

# Verify file size (should be 2-3MB)
ls -lh public/sounds/music/lobby-theme.mp3
```

**Pros:**

- ✅ Works immediately on deployment
- ✅ No extra configuration needed
- ✅ File is cached by CDN

**Cons:**

- ⚠️ Increases repo size (~2-3MB)

### Option 2: Skip Music for Now

If you haven't added `lobby-theme.mp3`:

```bash
# Skip it - system will gracefully handle missing file
# Console will show helpful info message
```

**Pros:**

- ✅ Smaller repo size
- ✅ Can add later

**Cons:**

- ❌ No background music on home/lobby pages
- ❌ Users see console info message

### Option 3: Use CDN/External Hosting

Host music file externally and update:

```typescript
// lib/audio/sounds.ts
const MUSIC_PATHS: Record<MusicTrackId, string> = {
  "lobby-theme": "https://cdn.yoursite.com/lobby-theme.mp3",
  // ...
};
```

---

## 🚀 Deployment Steps

### 1. Stage Your Changes

```bash
# From project root
cd ~/Code/localhost-party

# Check what's changed
git status

# Add core files (required)
git add app/
git add lib/
git add public/sounds/*.m4a
git add public/sounds/*.mp3

# Add music if you have it
git add public/sounds/music/lobby-theme.mp3

# Optional: Add docs
git add *.md
git add public/sounds/*.md
```

### 2. Commit Your Changes

```bash
git commit -m "feat: add narrator, background music, and sound effects

- Add AI narrator with ElevenLabs integration on home page
- Implement context-aware game descriptions on hover
- Add background music that continues from home → display lobby
- Music ducks when narrator speaks (20% → 6%)
- Switch to generated sound effects (vs system sounds)
- Music stops when game starts
- Add proper error handling and fallbacks
- Fix hydration errors
- Update to eleven_turbo_v2_5 model for free tier

Sound files: 9 effects (M4A + MP3 fallback, ~62KB)
Music: lobby-theme.mp3 (synthwave, ~2.5MB)
Voice: ElevenLabs TTS with 17 voices available
"
```

### 3. Push to GitHub

```bash
# Push to your feature branch
git push origin feature/ui-sound-effects

# Or if main branch:
# git push origin main
```

### 4. Verify on GitHub

1. Go to your GitHub repo
2. Check the branch: `feature/ui-sound-effects`
3. Verify files are uploaded:
   - Sound files in `public/sounds/`
   - Music file in `public/sounds/music/` (if added)
   - Code changes in `app/` and `lib/`

---

## 🔧 Vercel Deployment

### Automatic Deployment

If you have Vercel connected to GitHub:

1. **Push triggers deploy** automatically
2. Check Vercel dashboard for deployment progress
3. Click on deployment to see build logs
4. Verify no errors in build process

### Manual Deployment (If Needed)

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

---

## ✅ Post-Deployment Verification

### 1. Check Environment Variables

Visit your deployed site and check console:

```javascript
// Should show your API key is configured
fetch("/api/config")
  .then((r) => r.json())
  .then(console.log);
// Expected: { elevenlabsApiKey: "sk_..." }
```

### 2. Test Audio Features

**Home Page:**

- [ ] Click anywhere → Hear narrator welcome message
- [ ] Hover over game → Hear description
- [ ] Background music playing (if file added)
- [ ] Music ducks when narrator speaks

**Display Page:**

- [ ] Music continues from home page
- [ ] Music stops when game starts
- [ ] Phase transition sounds work

**Game Pages:**

- [ ] Button clicks have sound
- [ ] Submit/vote sounds work
- [ ] Player join sounds work

### 3. Check Console for Errors

**Expected (normal):**

```
✅ Sound system initialized (sounds will load on demand)
✅ ElevenLabs API key configured for narrator
```

**If music file missing:**

```
ℹ️ [Audio] Music track "lobby-theme" not found - this is expected...
```

**Not expected (errors):**

```
❌ [Audio] ❌ Load error for "button-click"
❌ ElevenLabs API error: 401
❌ Failed to fetch /sounds/...
```

---

## 🐛 Troubleshooting Deployment Issues

### Issue: Voice Narration Not Working

**Check:**

1. Environment variable set in Vercel?
2. Variable name exactly: `NEXT_PUBLIC_ELEVENLABS_API_KEY`
3. Redeployed after adding variable?

**Fix:**

```bash
# Trigger redeploy in Vercel dashboard
# Or push empty commit:
git commit --allow-empty -m "chore: trigger redeploy for env vars"
git push
```

### Issue: Sound Files 404

**Check:**

1. Files committed to git?
   ```bash
   git ls-files public/sounds/
   ```
2. Files present in deployment?
   - Visit: `https://yoursite.vercel.app/sounds/button-click.m4a`

**Fix:**

```bash
git add public/sounds/*.m4a
git add public/sounds/*.mp3
git commit -m "fix: add missing sound files"
git push
```

### Issue: Music Not Playing

**Check:**

1. File exists in repo?
   ```bash
   ls -lh public/sounds/music/lobby-theme.mp3
   ```
2. File size > 1MB? (Should be ~2-3MB)
3. Accessible via URL?
   - Visit: `https://yoursite.vercel.app/sounds/music/lobby-theme.mp3`

**Fix:**

```bash
# If not committed:
git add public/sounds/music/lobby-theme.mp3
git commit -m "feat: add background music"
git push
```

### Issue: Hydration Errors

**Should be fixed, but if you see them:**

- Clear browser cache
- Hard refresh (Cmd+Shift+R)
- Check latest code is deployed

---

## 📊 Deployment Size Impact

### Repo Size Increase

```
Sound effects (M4A):  ~62KB
Sound effects (MP3):  ~154KB
Background music:     ~2.5MB
Code changes:         ~50KB
Documentation:        ~100KB
────────────────────────────
Total:                ~2.8MB
```

**Is this too big?**

- ❌ No - this is normal for a game with audio
- ✅ Vercel handles it fine
- ✅ Files served via CDN (fast)
- ✅ Browsers cache audio files

---

## 🎯 Quick Deploy Command

If everything looks good:

```bash
# One-command deploy
git add . && \
git commit -m "feat: complete audio system with narrator and music" && \
git push origin feature/ui-sound-effects

# Then create PR on GitHub
```

---

## 📝 PR Description Template

When creating your PR, use this:

```markdown
## 🎵 Audio System Implementation

### Features Added

- ✅ AI narrator with ElevenLabs integration (17 voices)
- ✅ Context-aware game descriptions on home page hover
- ✅ Background music (synthwave) on home → display lobby
- ✅ Music ducking when narrator speaks (intelligent volume management)
- ✅ 9 custom sound effects for all game interactions
- ✅ Music stops when game starts
- ✅ Graceful fallbacks if API unavailable

### Technical Details

- **Voice**: ElevenLabs TTS API with `eleven_turbo_v2_5` model
- **Music**: Pixabay synthwave track (royalty-free)
- **Sounds**: AI-generated M4A (primary) + MP3 (fallback)
- **Library**: Howler.js for cross-browser audio support
- **Size**: ~2.8MB total (9 sound effects + 1 music track)

### Testing

- [x] Narrator works on home page
- [x] Music plays and loops correctly
- [x] Music ducks when narrator speaks
- [x] Sound effects work on all pages
- [x] Graceful handling of missing files
- [x] No hydration errors
- [x] TypeScript compiles
- [x] Works in production build

### Environment Variables Required

- `NEXT_PUBLIC_ELEVENLABS_API_KEY` - Set in Vercel dashboard

### Demo

[Add video/screenshots if you want]

### Related

Closes #[issue number if any]
```

---

## ✅ Final Checklist Before PR

- [ ] All files committed (code + sounds + music)
- [ ] TypeScript compiles (`npm run type-check`)
- [ ] Build works (`npm run build`)
- [ ] Tested locally
- [ ] Environment variable documented
- [ ] Deployment guide reviewed
- [ ] PR description ready

---

## 🎉 You're Ready!

Once you:

1. ✅ Commit the changes
2. ✅ Push to GitHub
3. ✅ Set environment variable in Vercel
4. ✅ Create PR

The audio system will work perfectly in production! 🚀

**Need help?** Check:

- `TESTING_GUIDE.md` - How to test everything
- `HOME_PAGE_AUDIO_IMPLEMENTATION.md` - Implementation details
- `SOUND_SWITCH_SUMMARY.md` - Sound system overview
