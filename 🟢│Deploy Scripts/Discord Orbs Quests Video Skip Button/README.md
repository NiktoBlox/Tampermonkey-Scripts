# [Sorry,Discord!] DC Orbs Quests Video Skip Button

![预览](https://greasyfork.org/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6Mjg4NzA3LCJwdXIiOiJibG9iX2lkIn19--744c8b8ec444337dbb8d0147f99f295566e790be/img-2026-04-14-11-37-51.png)

## Features

**Core Functionality**
- ⏭️ Skip Discord Orbs Quests videos instantly with one click
- 🎯 Auto-detects and jumps video to the end (`currentTime = duration`)
- 🔘 Also attempts to click any skip/close/dismiss buttons on the page

**UI & Interaction**
- 🖱️ Fully draggable floating button — move it anywhere on screen
- 🛡️ Boundary detection — button stays within screen edges at all times
- 👆 Smart click vs drag detection — won't trigger skip while dragging
- 🎨 Hover color effect for visual feedback

**Feedback System**
- ✅ Shows `Skipped!` when a video or button is found and triggered
- ❌ Shows `Not Found` when nothing is detected
- 🔄 Automatically resets button text after 2 seconds

**Coverage**
- 🌐 Runs on all Discord pages including `quest-home`, `quests/*`, `channels/*`

**Technical**
- ⚡ Lightweight — no external dependencies
- 🔒 No special permissions required (`@grant none`)
- 🖼️ Custom icon included

---

## 🔐 Security & Safety

**Code Transparency**
- ✅ Fully open-source — every line of code is readable and auditable
- ✅ No obfuscated or minified code
- ✅ No external server connections — only runs locally in your browser
- ✅ No data collection — nothing is sent, stored, or tracked
- ✅ `@grant none` — requests zero special browser permissions

**What This Script Does NOT Do**
- ❌ Does not access your Discord token or credentials
- ❌ Does not call any Discord internal or private APIs
- ❌ Does not modify, delete, or transmit any of your data
- ❌ Does not inject any third-party code or libraries

**How It Works (Technically)**
- Creates a simple floating `<button>` element on the page
- On click, sets `video.currentTime = video.duration` to skip to the end
- Also attempts to find and click visible skip/close/dismiss buttons via CSS class selectors
- All actions happen entirely client-side within your browser

**Verdict**
> This script is **safe to use**. It does not interact with Discord's servers or APIs in any way.
> It simply controls the video player element directly in your browser — similar to pressing a button manually.
