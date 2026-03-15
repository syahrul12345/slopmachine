# Marketing Launch Workflow

Triggered after the app is built, or on demand for marketing material creation.

## Steps

### 1. Capture Product Screenshots
Use the simulator to capture key screens on all required devices.

```bash
# Boot specific simulators
xcrun simctl boot "iPhone 15 Pro Max"
xcrun simctl boot "iPhone 14 Plus"

# Run the app on each simulator
npx expo run:ios --device "iPhone 15 Pro Max"

# Capture screenshots
xcrun simctl io "iPhone 15 Pro Max" screenshot marketing/screenshots/iphone-6.7/screen-1.png
```

Capture these screens (minimum):
1. Hero / onboarding screen
2. Main app screen (core value)
3. Key feature screen #1
4. Key feature screen #2
5. Paywall / premium features

### 2. Record Demo Video
```bash
# Record simulator screen
xcrun simctl io booted recordVideo marketing/videos/raw/demo-raw.mp4
# Walk through the app's key flows, then Ctrl+C to stop
```

### 3. Process Video with ffmpeg
```bash
# Trim to best 30 seconds
ffmpeg -i marketing/videos/raw/demo-raw.mp4 -ss 00:00:02 -t 00:00:30 -c copy marketing/videos/demo-trimmed.mp4

# Add transitions
ffmpeg -i marketing/videos/demo-trimmed.mp4 -vf "fade=t=in:st=0:d=0.5,fade=t=out:st=29:d=1" marketing/videos/demo-final.mp4

# Create social vertical (9:16 for TikTok/Reels)
ffmpeg -i marketing/videos/demo-final.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" marketing/videos/social-vertical.mp4

# Create App Store preview
ffmpeg -i marketing/videos/demo-final.mp4 -vf "scale=1290:2796:force_original_aspect_ratio=decrease,pad=1290:2796:(ow-iw)/2:(oh-ih)/2" -t 30 -c:v libx264 -c:a aac marketing/videos/appstore-preview.mp4
```

### 4. Generate UGC Scripts
Create 3+ scripts in `marketing/ugc/`:
- Hook-based (attention grabber → demo → CTA)
- Problem-solution (pain point → app solves it)
- Tutorial-style (quick how-to)

Each script should include: hook, problem, solution, demo instructions, CTA, caption with hashtags.

### 5. Write App Store Listing
Create `marketing/store-listing/ios-listing.md`:
- Title (max 30 chars)
- Subtitle (max 30 chars)
- Description (first 3 lines are critical)
- Keywords (100 chars max)
- Category

Create `marketing/store-listing/android-listing.md`:
- Title (max 30 chars)
- Short description (max 80 chars)
- Full description (max 4000 chars)

### 6. Output Verification
Ensure all assets exist:
```
marketing/
├── screenshots/
│   ├── iphone-6.7/    (5+ screenshots)
│   ├── iphone-6.5/    (5+ screenshots)
│   └── iphone-5.5/    (5+ screenshots)
├── videos/
│   ├── demo-final.mp4
│   ├── social-vertical.mp4
│   └── appstore-preview.mp4
├── ugc/
│   ├── script-1-hook.md
│   ├── script-2-problem-solution.md
│   └── script-3-tutorial.md
└── store-listing/
    ├── ios-listing.md
    └── android-listing.md
```
