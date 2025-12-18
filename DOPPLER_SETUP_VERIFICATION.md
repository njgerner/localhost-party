# Doppler Setup Verification

## ✅ Current Status

### Environment Variables in Doppler

I verified the following variable is already set in Doppler:

```
✅ NEXT_PUBLIC_ELEVENLABS_API_KEY
   Value: sk_b21249027d494d54b1fd5b39708f30f74f19ffcc6c8c8631
   Project: localhost-party
   Config: dev_personal
```

**This means the API key is already configured!** 🎉

---

## 🔄 Doppler → Vercel Sync

### How to Verify Sync is Working

**Option 1: Check Doppler Dashboard**

1. Go to https://dashboard.doppler.com/
2. Select project: **localhost-party**
3. Click **Integrations** in left sidebar
4. Look for **Vercel** integration
5. Verify it's:
   - ✅ Connected
   - ✅ Syncing to your Vercel project
   - ✅ Includes the config: `dev_personal` or `prd`

**Option 2: Check Vercel Dashboard**

1. Go to https://vercel.com/[your-team]/localhost-party
2. Navigate to **Settings** → **Environment Variables**
3. Look for: `NEXT_PUBLIC_ELEVENLABS_API_KEY`
4. Should show:
   ```
   Source: Doppler
   Value: sk_b2124... (masked)
   ```

---

## 🔧 If Sync Isn't Set Up

### Setup Doppler → Vercel Integration

**In Doppler Dashboard:**

1. **Navigate to Integrations**
   - https://dashboard.doppler.com/workplace/[your-workspace]/projects/localhost-party/integrations

2. **Click "Add Integration"**

3. **Select "Vercel"**

4. **Authorize Doppler** to access your Vercel account

5. **Configure:**

   ```
   Vercel Project: localhost-party
   Doppler Config: prd (or dev_personal)
   Import to Vercel: ✅ All environments
   ```

6. **Save Integration**

7. **Trigger Sync**
   - Click "Sync Now" or
   - Make any change to Doppler config to trigger auto-sync

---

## 📋 Environment Variables Checklist

### Required for Audio System

✅ **NEXT_PUBLIC_ELEVENLABS_API_KEY**

- Status: Already in Doppler ✅
- Type: Public (safe for client-side)
- Used for: AI narrator voice generation
- Free tier: 10,000 characters/month

### Other Variables (Already Configured)

These are already set up and will sync automatically:

- ✅ `LH_PARTY_DATABASE_URL`
- ✅ `NEXT_PUBLIC_LH_PARTY_WS_URL`
- ✅ Various Neon/Postgres credentials

---

## 🧪 Test the Integration

### After Verifying Sync

1. **Deploy to Vercel** (or trigger redeploy)

2. **Check deployed app** at `https://yoursite.vercel.app/api/config`

   ```json
   {
     "elevenlabsApiKey": "sk_b21249027d494d54b1fd5b39708f30f74f19ffcc6c8c8631"
   }
   ```

3. **Test narrator** on home page:
   - Visit `https://yoursite.vercel.app`
   - Click anywhere
   - Should hear: "Welcome to localhost party..."

4. **Check console** (no errors):
   ```
   ✅ Sound system initialized
   ✅ ElevenLabs API key configured for narrator
   ```

---

## 🎯 What Happens When You Deploy

### With Doppler Sync Enabled

```
You push to GitHub
  ↓
Vercel triggers build
  ↓
Doppler injects environment variables
  ↓
App builds with NEXT_PUBLIC_ELEVENLABS_API_KEY
  ↓
API key available at runtime in browser
  ↓
Narrator works! 🎙️
```

### Without Doppler Sync

```
You push to GitHub
  ↓
Vercel triggers build
  ↓
No NEXT_PUBLIC_ELEVENLABS_API_KEY
  ↓
Narrator falls back to console logging
  ↓
No voice (but still functional)
```

---

## 🔍 Verification Commands

### Local Development

```bash
# Check what Doppler will inject
doppler secrets get NEXT_PUBLIC_ELEVENLABS_API_KEY --plain

# Should output:
# sk_b21249027d494d54b1fd5b39708f30f74f19ffcc6c8c8631
```

### Production Check

```bash
# After deployment, check if key is available
curl https://yoursite.vercel.app/api/config

# Should return:
# {"elevenlabsApiKey":"sk_b21249..."}
```

---

## ⚙️ Doppler Config Files

You don't have a `.doppler.yaml` file in your repo, which is fine! The CLI is using:

```
Project: localhost-party
Config: dev_personal
Environment: dev
```

**To make this explicit** (optional):

```bash
# Create config file
doppler setup

# Select:
# - Project: localhost-party
# - Config: dev_personal (or prd for production)

# This creates .doppler.yaml
```

**Then add to `.gitignore`:**

```
.doppler.yaml  # Don't commit - personal config
```

---

## 🚀 Quick Verification Steps

### Step 1: Check Doppler Has the Key ✅

```bash
doppler secrets get NEXT_PUBLIC_ELEVENLABS_API_KEY --plain
# ✅ Already confirmed - key exists
```

### Step 2: Verify Vercel Integration

**Go to Doppler Dashboard:**

- https://dashboard.doppler.com/
- Check if Vercel integration exists and is active

**If not set up:**

- Follow "Setup Doppler → Vercel Integration" above

### Step 3: Deploy and Test

```bash
# Push your changes
git push origin feature/ui-sound-effects

# Wait for Vercel to deploy

# Test the deployed site
open https://yoursite.vercel.app
```

---

## ✅ Summary

**Current Status:**

- ✅ ElevenLabs API key is in Doppler
- ✅ Local development will work with `doppler run`
- ⏳ Need to verify Vercel integration is set up

**Next Steps:**

1. Check Doppler dashboard for Vercel integration
2. If not set up, add integration (5 minutes)
3. Deploy and test

**That's it!** Once the Doppler → Vercel sync is configured, all environment variables (including the ElevenLabs key) will automatically be available in production. 🎉

---

## 📚 Resources

- **Doppler Dashboard**: https://dashboard.doppler.com/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Doppler Docs**: https://docs.doppler.com/docs/vercel
