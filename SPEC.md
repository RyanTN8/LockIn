# LockIn: restoring your attention span — Chrome Extension

## What it does
Hides short-form video content across Instagram, YouTube, and TikTok.
Each site can be toggled independently via the popup.

## Target sites & behaviors

### YouTube (youtube.com)
- Hide Shorts shelf on homepage
- Hide Shorts tab in the left sidebar / mini-sidebar
- Hide Shorts in search results
- Hide Shorts in subscription feed
- Hide the Shorts row when it appears mid-scroll

### Instagram (instagram.com)
- Hide Reels tab in the left navigation
- Hide Reels grid on profile pages (the middle tab)
- Hide inline Reels suggestions in the main feed

### TikTok (tiktok.com)
- Default behavior: redirect "For You" to "Following" on page load
- Optional: hide the For You tab entirely
- (TikTok is lowest priority — ship YouTube + Instagram first)

## Non-goals
- No analytics, no telemetry, no account, no server
- No blocking of regular long-form videos
- No content modification — only hiding via CSS / display:none
- No support for mobile sites (m.youtube.com etc.) in v1
- No support for Firefox / Edge in v1 (Chrome Web Store first)

## Tech constraints
- Manifest V3 (V2 is deprecated and won't be accepted by the store)
- Vanilla JavaScript, no build step, no bundler, no React
- Settings stored in chrome.storage.sync so they sync across devices
- Must survive SPA navigation (these sites don't do full page loads,
  so we need MutationObserver and/or periodic re-runs)
- Each content script must be idempotent — running it twice should
  not cause errors or double-hide elements

## Architecture
```
manifest.json              Permissions, content script registration
content-scripts/
  youtube.js               Runs on youtube.com
  instagram.js             Runs on instagram.com
  tiktok.js                Runs on tiktok.com
  shared.js                Utilities used by all three (hide, observe)
popup/
  popup.html               Three toggles + version number
  popup.js                 Reads/writes chrome.storage.sync
  popup.css                Minimal styling
icons/
  icon-16.png
  icon-48.png
  icon-128.png
selectors.md               THE source of truth for DOM selectors
```

## Settings model
Stored under a single key `settings` in chrome.storage.sync:
```js
{
  youtube: { enabled: true },
  instagram: { enabled: true },
  tiktok: { enabled: true, mode: "redirect" } // or "hide"
}
```

Content scripts listen for `chrome.storage.onChanged` and re-apply
or un-apply their hiding rules when the user flips a toggle.

## Success criteria
- Loads as an unpacked extension with zero console errors
- Hides every selector listed in selectors.md
- Survives navigating between YouTube homepage → search → video page
  without needing a refresh
- Toggling off in the popup restores the hidden elements within 1 second
- Total uncompressed size under 100KB (excluding icons)

## Distribution
- Chrome Web Store listing
- Free, no upsell
- Open source on GitHub (link in store description)
- Goal: 500 weekly active users
