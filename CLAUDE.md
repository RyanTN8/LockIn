# Instructions for Claude

You are working on a Chrome extension. Read SPEC.md and TASKS.md before
making changes. This file contains standing rules for the whole project.

## Style
- Vanilla JavaScript only. No React, no TypeScript, no bundlers, no npm.
- One content script per site, kept under ~150 lines each.
- Comments only where the *why* isn't obvious. The *what* should be
  clear from the code.
- Use modern syntax (const, arrow functions, optional chaining).
- Two-space indentation.

## Selectors — the most important rule
- **Never invent CSS selectors.** Use only what's in selectors.md.
- If you need a selector that isn't in selectors.md, stop and tell me.
  I will capture it from the live site and add it to the file.
- Class names on YouTube, Instagram, and TikTok are often randomized
  or obfuscated. Guessing will produce code that looks right but
  hides nothing.
- Prefer structural selectors (tag names, aria-labels, hrefs) over
  class names whenever possible — they're more stable.

## Workflow
- Work on one unchecked item from TASKS.md at a time. Stop after each.
- Before writing code for a new task, restate what you're about to do
  in one sentence and wait for me to confirm.
- After any change, tell me exactly how to test it:
  1. Reload the unpacked extension at chrome://extensions
  2. Navigate to <specific URL>
  3. Look for <specific element> to be hidden
- Do not claim something works until I confirm I've tested it.

## What to ask about before doing
- Adding any dependency or external script
- Changing manifest.json permissions
- Adding analytics or any network request
- Significantly restructuring files

## What to do when stuck
- If a selector that worked before stops working, say "the DOM appears
  to have changed" — don't guess at new ones.
- If a feature in TASKS.md is ambiguous, ask before implementing.
- If you find yourself writing more than ~50 lines for a single task,
  pause and check whether the task should be split.

## Testing approach
- This extension can't be unit tested meaningfully — it's all DOM
  manipulation on live sites. Manual testing is the only real check.
- After each task, run through the manual test steps and confirm with me.
- Keep a small CHANGELOG.md updated as we go.

## Chrome Web Store readiness
- Every code change should keep the extension submittable.
- That means: no `eval`, no remote code, minimal permissions, and
  every permission justified by a feature in SPEC.md.
