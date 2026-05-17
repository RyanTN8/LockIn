# Build Order

Work through these in order. Don't skip ahead. After each checkbox,
test manually and confirm before moving on.

## Phase 1: Skeleton (get something loadable)
- [ ] Create manifest.json with permissions for the three hosts
- [ ] Create empty content scripts: youtube.js, instagram.js, tiktok.js
- [ ] Create shared.js with a `hide(selector)` helper and a
      `observe(callback)` helper that wraps MutationObserver
- [ ] Create popup.html with three on/off toggles
- [ ] Create popup.js that reads and writes chrome.storage.sync
- [ ] Verify: extension loads at chrome://extensions with zero errors
- [ ] Verify: popup opens and toggles persist after browser restart

## Phase 2: YouTube (do this first — it's the hardest and most-used)
- [ ] Capture YouTube selectors into selectors.md (I will help)
- [ ] Hide Shorts shelf on homepage (ytd-rich-section-renderer variants)
- [ ] Hide Shorts tab in the left sidebar
- [ ] Hide Shorts in search results
- [ ] Hide Shorts in subscription feed
- [ ] Wire up MutationObserver so newly loaded items get hidden too
- [ ] Respect the YouTube toggle in the popup (listen for storage
      changes; un-hide when toggled off)
- [ ] Verify: navigate homepage → search → subscriptions, no Shorts
      visible anywhere, no refresh needed

## Phase 3: Instagram
- [ ] Capture Instagram selectors into selectors.md
- [ ] Hide Reels tab in left nav
- [ ] Hide Reels grid tab on profile pages
- [ ] Hide inline Reels in main feed
- [ ] MutationObserver for lazy-loaded feed items
- [ ] Respect popup toggle
- [ ] Verify on home feed and on at least two profile pages

## Phase 4: TikTok
- [ ] Capture TikTok selectors and URL patterns
- [ ] On tiktok.com root, redirect to /following
- [ ] Hide For You tab in the top nav
- [ ] Respect popup toggle (and the redirect vs hide mode setting)
- [ ] Verify: visiting tiktok.com lands on Following feed

## Phase 5: Polish for store submission
- [ ] Icons (16, 48, 128 px) — placeholder is fine for v1
- [ ] README.md with screenshots and install instructions
- [ ] Privacy policy (one paragraph: "we don't collect anything")
- [ ] Web Store listing copy: name, short description, long description
- [ ] At least 3 screenshots (1280x800 or 640x400 per store requirements)
- [ ] Submit to Chrome Web Store
- [ ] Set up a tiny landing page or GitHub readme for sharing

## Phase 6: Post-launch
- [ ] Post on r/chrome_extensions, r/productivity, Hacker News Show HN
- [ ] Reply to every review within 24h for the first month
- [ ] Set up an issues page on GitHub for bug reports
- [ ] Schedule monthly check-in to fix broken selectors
