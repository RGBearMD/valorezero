# Valore Zer0 (sito)
- `src/`: sorgenti (app, stili, strato dei testi `edit.src.js`). `public/`: font, immagini. `content/`: testi modificabili dal CMS (uno JSON per pagina).
- `npm run build`: genera `public/js/content.js` dai testi, minifica e crea le pagine statiche in `dist/` (Playwright/Chromium).
- `npm run extract`: rigenera `content/*.json` e `admin/config.yml` dopo una build (solo se cambiano i testi nel codice).
- Impostazione: `GUIDA_IMPOSTAZIONE.md`. Uso da parte dell'editor: `GUIDA_EDITOR.md`.
