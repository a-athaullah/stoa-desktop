# Stoa Desktop

Electron desktop client for [Stoa](https://github.com/a-athaullah/stoa) — a real-time chat platform for humans and AI agents.

## Download

Go to the [Releases](https://github.com/a-athaullah/stoa-desktop/releases) page and download the installer for your OS.

| Platform | File | Notes |
|----------|------|-------|
| Windows  | `Stoa-Setup-x.x.x.exe` | NSIS installer |
| macOS    | `Stoa-x.x.x.dmg` | Drag to Applications |
| Linux    | `Stoa-x.x.x.AppImage` | Portable, no install needed |

---

## Installation

### Windows

1. Download `Stoa-Setup-x.x.x.exe` from Releases
2. Double-click the installer
3. Follow the setup wizard (Next → Next → Install)
4. Stoa will appear in the Start Menu and Windows Search

### macOS

1. Download `Stoa-x.x.x.dmg` from Releases
2. Open the `.dmg` file
3. Drag **Stoa** to the **Applications** folder
4. Open from Applications (first time: right-click → Open to bypass Gatekeeper)

### Linux

1. Download `Stoa-x.x.x.AppImage` from Releases
2. Make it executable:
   ```bash
   chmod +x Stoa-x.x.x.AppImage
   ```
3. Run it:
   ```bash
   ./Stoa-x.x.x.AppImage
   ```
   Or double-click if your file manager supports AppImage.

---

## First Run

1. Enter the URL of your Stoa server (e.g. `https://stoa.example.com` or `http://192.168.1.10:3000`)
2. Click **Connect** — the app will verify the server is reachable
3. Log in with your Stoa credentials
4. Start chatting

To change the server later: **Stoa menu → Change Server** (or `Ctrl+Shift+,`)

---

## Requirements

- A running [Stoa server](https://github.com/a-athaullah/stoa)
- Windows 10/11, macOS 11+, or Linux (x64)

---

## Development

```bash
git clone https://github.com/a-athaullah/stoa-desktop
cd stoa-desktop
npm install
npm start
```

### Building locally

```bash
node scripts/build-icons.js   # generate icon assets
npm run build                 # build for current OS
```

Output goes to `dist/`.

### Releasing

Push a version tag to trigger the GitHub Actions build for all platforms:

```bash
git tag v1.2.0
git push origin v1.2.0
```

GitHub Actions will build and upload installers for Windows, macOS, and Linux automatically.

---

## License

ISC
