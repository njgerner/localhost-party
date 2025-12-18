# Testing Guide - Home Page Audio

## ✅ What Should Work Now

1. **Hydration Error**: Fixed - page should load without errors
2. **Narrator Fallback**: Works - narration appears in console logs
3. **Audio System**: Ready - just needs ElevenLabs API key for voice

---

## 🧪 Testing Without Voice (Console Fallback Mode)

The narrator system works in **fallback mode** where it logs text to console instead of playing audio.

### Test Steps:

1. **Refresh the page** at `http://localhost:3000`
2. **Open browser console** (F12 or Cmd+Option+I)
3. **Click anywhere** on the page
4. **Look for console logs:**

   ```
   [Narrator - Fallback Mode] Welcome to localhost party. The ultimate arcade experience powered by AI. Choose your game and let the fun begin!
   ```

5. **Hover over a game card** (like "Quip Clash") for 500ms
6. **See in console:**

   ```
   [Narrator - Fallback Mode] Quip Clash. Battle of wits where the funniest answer wins. Get ready to make your friends laugh!
   ```

7. **Click a game**
8. **See in console:**
   ```
   [Narrator - Fallback Mode] Quip Clash selected. Get ready to party!
   ```

### Expected Console Output:

```
Sound system initialized (sounds will load on demand)
ElevenLabs API key configured for narrator  (if you have a key)
  OR
ElevenLabs API key not configured. Voice narration will use fallback.
```

---

## 🎙️ Enable Voice Narration (Optional)

To hear actual AI voice narration, you need an ElevenLabs API key.

### Option 1: Get Free ElevenLabs Account

1. **Sign up**: https://elevenlabs.io/sign-up
2. **Free tier**: 10,000 characters/month (plenty for testing!)
3. **Get API key**:
   - Go to https://elevenlabs.io/app/settings/api-keys
   - Click "Create API Key"
   - Copy the key

### Option 2: Use Existing Account

If you already have an ElevenLabs account:

1. Go to https://elevenlabs.io/app/settings/api-keys
2. Copy your existing key

### Add API Key to Your Project:

1. **Create `.env.local` file** in project root:

   ```bash
   touch .env.local
   ```

2. **Add the API key**:

   ```bash
   NEXT_PUBLIC_ELEVENLABS_API_KEY="your_api_key_here"
   ```

3. **Restart dev server**:

   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

4. **Test again**:
   - Refresh page
   - Click anywhere
   - You should now **HEAR** the narrator speak!

---

## 🎵 Background Music (Still Needed)

The music system is ready but needs a music file.

**Quick Setup:**

1. Download a free synthwave track from [Pixabay](https://pixabay.com/music/search/synthwave%20arcade/)
2. Rename to `lobby-theme.mp3`
3. Place in `public/sounds/music/`
4. Refresh page and click - music starts!

See `public/sounds/music/MUSIC_GENERATION_GUIDE.md` for more options.

---

## 🐛 Troubleshooting

### Issue: Hydration Error

**Symptom:** Red error overlay about server/client mismatch

**Fix:** Should be fixed now - refresh the page

---

### Issue: Narrator Not Speaking (Fallback Mode)

**Symptom:** Console shows `[Narrator - Fallback Mode]` messages

**Cause:** No ElevenLabs API key configured

**Solutions:**

1. **Keep using fallback** - It works fine for testing, you just won't hear audio
2. **Add API key** - Follow steps above to enable voice

---

### Issue: ElevenLabs API Error

**Symptom:** Console shows `ElevenLabs API call failed`

**Possible Causes:**

1. **Invalid API key** - Check your `.env.local` file
2. **Quota exceeded** - Free tier: 10k chars/month
3. **Voice ID invalid** - Using "game-host" voice by default

**Check:**

```javascript
// In browser console
fetch("/api/config")
  .then((r) => r.json())
  .then(console.log);

// Should show: { elevenlabsApiKey: "sk_..." }
```

---

### Issue: Music Not Playing

**Symptom:** No background music

**Cause:** Missing `lobby-theme.mp3` file

**Fix:**

1. Add music file to `public/sounds/music/lobby-theme.mp3`
2. See music generation guide for options

---

### Issue: "Click anywhere to enable sound" Not Showing

**Symptom:** Message doesn't appear

**Cause:** Audio already unlocked from localStorage

**This is normal!** Once you click once, it remembers and won't show again.

**To reset:**

```javascript
// In browser console
localStorage.removeItem("localhost-party-audio-settings");
// Then refresh page
```

---

## ✅ Success Indicators

### Working Without Voice (Fallback Mode):

- ✅ Page loads without hydration errors
- ✅ "Click anywhere to enable sound" appears (first visit)
- ✅ Console shows `[Narrator - Fallback Mode]` messages
- ✅ Game hover shows descriptions in console
- ✅ Game click shows selection message in console

### Working With Voice:

- ✅ All above +
- ✅ Console shows `ElevenLabs API key configured`
- ✅ You **HEAR** the narrator speak on first click
- ✅ You **HEAR** game descriptions on hover
- ✅ You **HEAR** selection confirmation on click

### Working With Music:

- ✅ All above +
- ✅ Music fades in after first click
- ✅ Music loops continuously
- ✅ Music ducks (quieter) when narrator speaks
- ✅ Music fades out when clicking a game

---

## 📊 Current Status

| Feature             | Status        | Notes                  |
| ------------------- | ------------- | ---------------------- |
| Home page loads     | ✅ Working    | No hydration errors    |
| Narrator (fallback) | ✅ Working    | Console logs           |
| Narrator (voice)    | ⏳ Optional   | Needs API key          |
| Game hover          | ✅ Working    | 500ms debounce         |
| Game click          | ✅ Working    | Navigation + narration |
| Background music    | ⏳ Needs file | `lobby-theme.mp3`      |
| Music ducking       | ✅ Ready      | Works when music added |

---

## 🎮 Next Steps

### Minimum (Working Now):

1. Test in fallback mode - everything works, just no voice
2. See console logs for narration text
3. Verify game hover/click interactions

### Enhanced (Voice):

1. Get ElevenLabs API key (free tier)
2. Add to `.env.local`
3. Restart server
4. Enjoy AI voice narration!

### Complete Experience:

1. Add voice (above)
2. Add background music (`lobby-theme.mp3`)
3. Test full audio experience with music + voice + ducking

---

## 🎉 You're Ready!

The system is working! You can:

- ✅ Use it now in fallback mode (console logging)
- ✅ Add voice when you want (ElevenLabs key)
- ✅ Add music when you want (MP3 file)

Everything is modular and works independently! 🚀
