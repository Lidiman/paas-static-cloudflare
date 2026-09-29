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
Deployment is automated via Wrangler:
```bash
CLOUDFLARE_ACCOUNT_ID="<account_id>" CLOUDFLARE_API_TOKEN="<api_token>" npm run deploy
```

## Verification & Smoke Testing
Automated health check and smoke testing script validates HTTP 200 and Content-Type headers for all critical endpoints:
```bash
npm run test:smoke
```

## Rollback Procedure
In case of deployment failure or regression:
1. Roll back to the previous deployment version using Wrangler:
   ```bash
   ./node_modules/.bin/wrangler rollback
   ```
2. Or checkout the previous known stable commit and redeploy:
   ```bash
   git checkout <stable-commit-hash>
   ./node_modules/.bin/wrangler deploy
   ```

## Repository & Live Demo
- **GitHub Repository**: [https://github.com/Lidiman/paas-static-cloudflare](https://github.com/Lidiman/paas-static-cloudflare)
- **Live Deployment**: [https://paas-static-cloudflare.bamaground.workers.dev](https://paas-static-cloudflare.bamaground.workers.dev)
