# Golden Shield — Officer Tactical Patrol & Security Management

An enterprise-grade, high-fidelity security operations web application built faithfully from the **Google Stitch** design system (`Project #2124397902356485373`).

---

## 📱 Google Stitch Screen Mapping

| Screen Name | Stitch Resource URI | Primary Features |
| :--- | :--- | :--- |
| **GOLDEN SHIELD PATROL** | `.../screens/109e566dc9d247b3a55a72f879969205` | Active Patrol Dispatch, Sequential Checkpoint Manifest, Mission Telemetry (50%), GPS HUD (`LAT 34.0592° N • LON 118.4201° W`), Tactical Map, ISO-27001 Cryptographic Audit Signing |
| **GOLDEN SHIELD ASSIGNMENTS** | `.../screens/246fc5de515a4aeaaa37cb25067c8a4b` | Operational Duty roster, Featured Active Deployment (`Westfield Business Center Post #774-B`), Scheduled Post Rotations (Metro Financial, Apex Tech Campus, Harborview), 24h Shift Trade Requests |
| **GOLDEN SHIELD HOME** | `.../screens/723b093f68a14513852b2f8f82c89a2a` | Officer Dashboard (James Wilson, Badge #GS-1048), Live Active Shift Stopwatch (`04h 25m Elapsed`), Geofence Verified (`±0.02m`), Access Keycode copy (`#8842-SEC`), Quick Actions (Start Patrol, Instant SOS, Scan Tag, Guard Logbook) |
| **GOLDEN SHIELD SCHEDULE** | `.../screens/8525570e3e1e447cace72e4d646a5c5d` | Executive Roster & Attendance stats (164 hrs, 18 shifts, +12.5 OT), Weekly & Monthly strip view, In-Progress Shift Tracker (42% elapsed), Upcoming 72-Hour assignments, Certified Timesheet PDF Exporter |
| **GOLDEN SHIELD PROFILE** | `Bottom Tab #5` | Security certifications (CA Exposed Firearm, CPR/AED, ISO-27001), Device Telemetry (NFC 13.56MHz, GPS RTK lock, Bodycam link), Emergency Dispatch contacts |

---

## ⚡ Key Interactive Capabilities

1. **Dual Viewing Modes**:
   - **Interactive Single-Screen Device**: Realistic mobile smartphone frame with active bottom navigation and sound effects.
   - **Stitch 4-Screen Canvas**: High-definition infinite design board rendering all 4 Stitch screens side-by-side with synchronized live data.
2. **Interactive Hardware Scanner**:
   - Dual-mode NFC (13.56 MHz contact) and QR Code optical scanner simulator with animated targeting reticle, laser beam, sound effects, and geofence lock (`±0.02m`).
   - Verifying Checkpoint 3 dynamically advances patrol telemetry from 50% to 75% / 100%.
3. **Emergency Instant SOS Dispatch**:
   - Triggers tactical sirens, simulated bodycam live stream (1080p 30fps), classification selection, and broadcast to Central Security Operations.
4. **Officer Tactical Loggers**:
   - Log observations with GPS geo-tagged evidence photos and audit stamps.
5. **Shift Trade & Swapping**:
   - Full trade request workflow complying with Golden Shield 24h SOP.
6. **Certified Timesheet PDF Export**:
   - Generates and downloads signed timesheets with cryptographic verification.
7. **Tactical Audio Synthesizer**:
   - Native Web Audio API sound synthesis (radio chirp, scan confirmation, emergency alert, UI clicks) with zero external audio file dependencies.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API Sound Synthesizer

---

## 🚀 Running Locally

```bash
# Start the Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
