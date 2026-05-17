# LockIn: restoring your attention span

A Chrome extension that hides YouTube Shorts and Instagram Reels.
No accounts, no telemetry, no remote code. Toggle per site from the popup.

## Install (development)
1. Clone or download this repo
2. Open chrome://extensions in Chrome
3. Turn on "Developer mode" (top right)
4. Click "Load unpacked" and select this folder
5. Pin the extension from the puzzle-piece menu

## Develop
- See SPEC.md for what this extension does
- See TASKS.md for the build order
- See CLAUDE.md if you're working with Claude Code
- See selectors.md before changing any DOM-hiding logic

## Test manually
After making changes:
1. Open chrome://extensions and click the reload icon on LockIn
2. Open the affected site in a new tab
3. Confirm the targeted elements are hidden
4. Open the popup, toggle the site off, and confirm elements reappear

## License
MIT
