# PRD — Deploy Web Statis Cloudflare Workers (Praktikum Minggu 4)

## 1. Problem Statement
Mahasiswa/developer membutuhkan pipeline deployment aplikasi web statis yang berjalan di Edge network global (Cloudflare Workers Static Assets) menggunakan CLI `wrangler` tanpa overhead server/VM konvensional.

## 2. Acceptance Criteria (TERUKUR)
1. **File Structure Compliance**:
   - `public/index.html`
   - `public/style.css`
   - `public/script.js`
   - `wrangler.jsonc` (valid JSONC with `assets.directory = "./public"`)
   - `package.json` (scripts: `dev`, `deploy`, `preview`)
   - `README.md`
2. **Performance & Asset Budget**:
   - Total bundle size uncompressed (HTML+CSS+JS): `<= 15.0 kB` (gzip `<= 5.0 kB`).
   - Network requests on initial load: exactly `3` requests (`index.html`, `style.css`, `script.js`).
   - p95 Edge Time to First Byte (TTFB): `<= 50 ms`.
   - RAM idle / Server Footprint: `0 MB` (serverless static edge).
   - Lighthouse Performance Score: `100/100`.
3. **Interactivity & UX Criteria**:
   - Terdapat interaksi DOM via JavaScript murni (vanilla): tombol click test event, counter click, status badge "Cloudflare Edge Active", dan log timestamp ISO.
   - Tidak ada error di browser console (`0 uncaught errors`).
4. **Deploy & Public Availability**:
   - Berhasil dideploy menggunakan Wrangler ke subdomain `*.workers.dev`.
   - HTTP status code response `200 OK` untuk `/`, `/style.css`, dan `/script.js`.
   - Valid SSL/TLS HTTPS active.

## 3. Scope yang Sengaja DIBUANG (Out of Scope)
- **Framework JS/CSS (React, Vue, Tailwind, Sass, Webpack, Vite)**: Coret. Vanilla HTML5/CSS3/ES6 digunakan untuk zero-build overhead dan payload minimalis.
- **Database / Cloudflare KV / D1 / Durable Objects**: Coret. Fokus murni Static Assets delivery.
- **Server-side Rendering / API Worker logic**: Coret. Routing sepenuhnya didelegasikan ke Cloudflare Static Assets handler.
- **User Authentication / Login**: Coret.

## 4. Stack Decision & Rationale
- **Platform**: Cloudflare Workers Static Assets (`wrangler.jsonc`).
  - *Kenapa bukan VPS/Nginx*: Nginx butuh manajemen patching, maintenance OS, dan RAM idle ~30MB. Workers static assets gratis, global CDN, 0ms cold start.
  - *Kenapa bukan Cloudflare Pages legacy*: Wrangler v3+ mengintegrasikan static assets langsung ke Cloudflare Workers dengan konfigurasi `wrangler.jsonc` yang lebih modern dan unified.
- **Frontend Stack**: Vanilla HTML5, Modern CSS (Flexbox/CSS Grid + CSS Variables), ES6 JavaScript.
  - *Kenapa bukan Tailwind/React*: Ukuran boilerplate react + react-dom > 130 kB; vanilla < 5 kB.
