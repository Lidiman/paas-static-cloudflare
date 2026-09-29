# Static Asset & Architecture Contract

## 1. Directory Layout Contract
```
/home/hugo/Project/paas-static-cloudflare/
├── AGENTS.md
├── CONTRACT.md
├── PRD.md
├── README.md
├── package.json
├── wrangler.jsonc
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

## 2. Static Routing & MIME Contract
| Path | Target File | Expected Content-Type | Status Code |
|---|---|---|---|
| `GET /` | `public/index.html` | `text/html; charset=utf-8` | `200 OK` |
| `GET /style.css` | `public/style.css` | `text/css; charset=utf-8` | `200 OK` |
| `GET /script.js` | `public/script.js` | `application/javascript; charset=utf-8` | `200 OK` |
| `GET /non-existent` | (Default 404 handler) | `text/html` / `text/plain` | `404 Not Found` |

## 3. DOM & UI Element Contract
Elemen yang WAJIB ada di `public/index.html` dan dikontrol oleh `public/script.js`:
- `#app`: Container utama.
- `#status-badge`: Badge visual status (e.g. "Edge Network: Active").
- `#btn-action`: Tombol interaktif (e.g. "Trigger Edge Event").
- `#click-count`: Span/label penampil jumlah klik (angka integer increment).
- `#log-console`: Element `<pre>` atau `<div>` penampil log event dengan timestamp ISO format (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- `#clear-btn`: Tombol reset log / counter.

## 4. Wrangler Configuration Contract (`wrangler.jsonc`)
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "paas-static-cloudflare",
  "compatibility_date": "2024-09-23",
  "assets": {
    "directory": "./public"
  }
}
```

## 5. Performance Threshold Contract
- Total Payload Size: `<= 15.0 kB`
- Initial HTML Payload: `<= 4.0 kB`
- CSS Payload: `<= 5.0 kB`
- JS Payload: `<= 4.0 kB`
- Total Blocking Time (TBT): `0 ms`
- Cumulative Layout Shift (CLS): `0.00`
