# PaaS Static Cloudflare

Static single-page application deployed to Cloudflare Workers using Static Assets.

## Architecture
- **Runtime / Hosting**: Cloudflare Workers (Static Assets)
- **Configuration**: `wrangler.jsonc` (Static assets mounted from `./public`)
- **Assets**:
  - `public/index.html`: Semantic HTML5 structure and UI layout
  - `public/style.css`: Clean modern CSS styling and responsive states
  - `public/script.js`: Interactive client logic

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run local preview server:
   ```bash
   npm run dev
   ```

## Deployment
Deployment is handled via Wrangler:
```bash
npm run deploy
```

## Repository & Live Demo
- **GitHub Repository**: [https://github.com/Lidiman/paas-static-cloudflare](https://github.com/Lidiman/paas-static-cloudflare)
- **Live Deployment**: Pending Cloudflare credentials / Production approval
