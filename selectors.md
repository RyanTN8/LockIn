# DOM Selectors

This file is the source of truth for which elements the extension hides.
Claude should never invent selectors. If you need one that isn't here,
capture it from the live site and add it below.

## How to capture a selector
1. Open the site in Chrome
2. Right-click the element you want to hide → Inspect
3. In DevTools, right-click the element in the Elements panel
4. Copy → Copy selector (or copy a more stable one by hand)
5. Test it: in the DevTools Console, run
   `document.querySelectorAll('YOUR_SELECTOR').length`
6. Add it below with the date captured

Prefer selectors based on:
- aria-label (stable, accessible)
- href patterns (e.g. `a[href^="/shorts/"]`)
- title attributes
- semantic tag names (ytd-rich-section-renderer)
Avoid:
- Auto-generated class names like `_aacl _aaco` — they change often
- Deep nth-child chains — they break on layout changes

---

## YouTube selectors

### Shorts shelf on homepage
- Confirmed 2026-05-16: `ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])`
  - Hides the full grid cell, not just the inner shelf, so no empty gap remains.
  - The `is-shorts` boolean attribute is set by YouTube on the shelf component itself — more stable than class names or title strings.

### Shorts tab in left sidebar
- Confirmed 2026-05-16: `ytd-guide-entry-renderer:has(a[title="Shorts"])`
  - The inner `<a>` has no `href` (YouTube intercepts the click for SPA routing), so `title="Shorts"` is the stable signal.
  - Hiding the outer `ytd-guide-entry-renderer` removes the icon and row spacing, not just the link.
- Mini-sidebar variant, confirmed 2026-05-16: `ytd-mini-guide-entry-renderer:has(a[href^="/shorts"])`
  - The mini-sidebar `<a>` has a real `href="/shorts/"`, so we match on path (locale-independent) rather than the title string.
  - Starts-with match tolerates a trailing-slash change. Safe to broaden here — mini-guide entries don't contain video links.

### Shorts in search results
YouTube serves at least two different layouts for search-page Shorts shelves
(probably an A/B test). Both selectors are needed.

- Variant A, confirmed 2026-05-16: the homepage selector above
  (`ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])`)
  matches when search uses the rich-grid layout.
- Variant B, confirmed 2026-05-16:
  `grid-shelf-view-model:has(a[href^="/shorts"])`
  - Newer view-model layout — the shelf is a `<grid-shelf-view-model>`, not a
    `ytd-*-renderer`.
  - We hide the inner shelf, NOT the surrounding `ytd-item-section-renderer`.
    Hiding the section wrapper shortens the page enough to trigger YouTube's
    infinite-scroll continuation loop (search keeps re-fetching to fill the
    viewport). Hiding the inner shelf leaves a small empty gap but avoids the
    cascade.
  - The `:has(a[href^="/shorts"])` guard keeps this from matching other
    grid shelves (music, channels, etc.) that don't link to Shorts.
- Older `ytd-reel-shelf-renderer` variant: not observed in current YouTube; do
  NOT add speculatively. If a user reports Shorts still showing in search,
  capture the actual wrapper before adding a fallback.
- Individual Shorts as standalone results, confirmed 2026-05-16:
  `ytd-video-renderer:has(a[href^="/shorts/"])`
  - YouTube mixes standalone Shorts into search results alongside regular
    videos, both wrapped in `ytd-video-renderer`. The `/shorts/` href
    distinguishes them; regular videos use `/watch?v=...`.
  - Hides 9+ rows on a typical search — watch the Network tab on first
    deployment for any continuation-loop cascade.

### Shorts in subscription feed
- Assumed (NOT independently verified) 2026-05-16: same selector as homepage —
  `ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])`.
- Reason for assumption: the subs feed uses the same rich-grid layout family as
  the homepage and search results; both confirmed cases use this wrapper.
- No Shorts shelf was visible on the subs feed during capture (YouTube only
  injects them when subscribed channels post Shorts), so we couldn't observe
  the live DOM. Revisit if a user reports Shorts leaking on subs.

---

## Instagram selectors

_Captured: 2026-05-16_

### Reels tab in left navigation + Reels tab on profile pages
- Confirmed 2026-05-16: `a[href$="/reels/"]:has(svg[aria-label="Reels"])`
  - Left nav item has `href="/reels/"` (exact); profile grid tab has `href="/<username>/reels/"`.
    The ends-with match (`$=`) covers both with one selector — confirmed to return 2 on a
    profile page (one for each).
  - The `aria-label="Reels"` on the SVG is the stable signal; Instagram's class names are
    obfuscated and change frequently.
  - Hiding the `<a>` collapses the wrapper divs above it since they contain no other content.

### Inline Reels in main feed
- Confirmed 2026-05-16: `article:has(a[href^="/reels/"])`
  - Instagram wraps each feed post in `<article>`. Reel posts contain a link whose href
    starts with `/reels/<reel-id>/`; regular photo/carousel posts use `/p/<id>/`.
  - The nav item is not inside an `<article>`, so this selector cannot accidentally match it.
  - Returns the full card including header, video, and action buttons — no empty gap left behind.

