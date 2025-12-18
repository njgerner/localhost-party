# Quick Vercel Deployment Guide

## ✅ What You Need to Do

### 1. Set Environment Variable in Vercel (Required for Voice)

**Go to:** https://vercel.com/[your-team]/localhost-party/settings/environment-variables

**Add:**

```
Name: NEXT_PUBLIC_ELEVENLABS_API_KEY
Value: [your ElevenLabs API key]
Environments: ✅ Production ✅ Preview ✅ Development
```

**Then:** Click "Save" and redeploy

---

### 2. Commit & Push Your Changes

**Option A: Use the Helper Script**

```bash
# Run the automated script
./scripts/prepare-pr.sh

# It will:
# - Check TypeScript compilation
# - Show you what files will be added
# - Stage all necessary files
# - Give you a commit message template
```

**Option B: Manual Commands**

```bash
# Add all audio-related files
git add app/ lib/ public/sounds/

# Add documentation (optional)
git add *.md

# Commit with detailed message
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
Voice: ElevenLabs TTS with 17 voices available"

# Push to GitHub
git push origin feature/ui-sound-effects
```

---

### 3. Create Pull Request on GitHub

1. Go to: https://github.com/njgerner/localhost-party/pulls
2. Click "New Pull Request"
3. Select: `feature/ui-sound-effects` → `main`
4. Title: `feat: Add narrator, background music, and sound effects`
5. Description: See template in `DEPLOYMENT_CHECKLIST.md`
6. Click "Create Pull Request"

---

### 4. Verify Deployment

Once merged/deployed:

**Check these URLs on your live site:**

```
✅ https://yoursite.vercel.app/
   - Click anywhere → Hear narrator
   - Hover game → Hear description
   - Music plays in background

✅ https://yoursite.vercel.app/display
   - Music continues
   - Music stops when game starts

✅ https://yoursite.vercel.app/sounds/button-click.m4a
   - Sound file accessible

✅ https://yoursite.vercel.app/sounds/music/lobby-theme.mp3
   - Music file accessible (if you added it)

✅ https://yoursite.vercel.app/api/config
   - Should return: {"elevenlabsApiKey": "sk_..."}
```

---

## 🐛 If Something Doesn't Work

### Voice Not Working?

**Check Vercel environment variable:**

1. Vercel Dashboard → Settings → Environment Variables
2. Verify `NEXT_PUBLIC_ELEVENLABS_API_KEY` exists
3. Trigger redeploy

**Still not working?**

- Check browser console: `fetch('/api/config').then(r=>r.json()).then(console.log)`
- Should show your API key
- If null, redeploy after adding env var

### Music Not Playing?

**Check if file exists:**

- Visit: `https://yoursite.vercel.app/sounds/music/lobby-theme.mp3`
- Should download/play the file
- If 404, file wasn't committed to git

**Fix:**

```bash
git add public/sounds/music/lobby-theme.mp3
git commit -m "fix: add lobby music file"
git push
```

### Sound Effects 404?

**Check files committed:**

```bash
git ls-files public/sounds/*.m4a
```

**Should show:**

```
public/sounds/all-ready.m4a
public/sounds/button-click.m4a
public/sounds/clock-tick-fast.m4a
public/sounds/clock-tick.m4a
public/sounds/phase-transition.m4a
public/sounds/player-join.m4a
public/sounds/submit-complete.m4a
public/sounds/time-up.m4a
public/sounds/vote-cast.m4a
```

---

## 📊 Expected Build Output

When Vercel builds, you should see:

```
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                    [size]
├ ○ /display                             [size]
└ ○ /play                                [size]

○  (Static)  prerendered as static content

✓ Build completed successfully
```

**No errors about:**

- Missing files
- Type errors
- Hydration mismatches

---

## ✅ Success Checklist

After deployment:

- [ ] Environment variable set in Vercel
- [ ] Code pushed to GitHub
- [ ] PR created and reviewed
- [ ] Deployment successful (no errors)
- [ ] Home page narrator works
- [ ] Background music plays
- [ ] Music ducks when narrator speaks
- [ ] Sound effects work in game
- [ ] No console errors
- [ ] Music files accessible via URL

---

## 🎉 That's It!

Your audio system will be live! The entire experience:

1. **Home page** - Narrator welcomes, music plays, game descriptions on hover
2. **Display page** - Music continues in lobby, stops when game starts
3. **Game pages** - Sound effects for all interactions

All with proper fallbacks, error handling, and graceful degradation! 🚀
