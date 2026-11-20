# Valore Zer0: impostazione del CMS (una tantum)

Schema: l'editor modifica i testi su `valorezero.rgbear.it/admin` → il CMS salva la modifica nel ramo `main` di GitHub → GitHub Actions ricostruisce le pagine e le pubblica nel ramo `dist` → Cloudflare Pages pubblica `dist`. Tempo dalla modifica al sito: circa 2–4 minuti.

## 1. GitHub
1. Crea un repository (privato va bene), per esempio `valore-zero`, e carica tutto il contenuto di questa cartella (compresa la cartella nascosta `.github`).
2. Repository → Settings → Actions → General → Workflow permissions: **Read and write permissions**.
3. Repository → Actions → "Build e pubblicazione" → Run workflow. Alla fine esiste il ramo `dist`.

## 2. Cloudflare Pages
1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → scegli il repository.
2. Production branch: **dist**. Build command: vuoto. Build output directory: `/` (radice).
3. Custom domains: aggiungi `valorezero.rgbear.it` e crea nel DNS del dominio il record CNAME indicato da Cloudflare. Il resto di `rgbear.it` resta dov'è.

## 3. Login dell'editor (servizio `sveltia-cms-auth`)
1. GitHub → Settings → Developer settings → OAuth Apps → New. Homepage: il sito. Callback URL: `<URL-del-Worker>/callback`. Genera il Client Secret.
2. Pubblica su Cloudflare Workers il progetto `sveltia/sveltia-cms-auth` (istruzioni nel suo README) e imposta le variabili `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (cifrata) e `ALLOWED_DOMAINS` = `valorezero.rgbear.it`.
3. In `admin/config.yml` sostituisci `repo:` (utente/repository) e `base_url:` (URL del Worker). Mandami i due valori e ti restituisco il file già pronto.
4. Aggiungi l'editor al repository: Settings → Collaborators → permesso Write. Serve un account GitHub gratuito.

## 4. Aggiornare i testi estratti (quando il codice cambia)
Se cambi testi o pagine nel codice: `npm install`, `npm run build`, `npm run extract`, poi commit. Le modifiche già fatte dall'editor restano; quelle che non trovano più il testo originale vanno nell'elenco `orfane` del file della pagina (nessuna modifica va persa).

## Come funziona la sicurezza dei dati
- L'editor cambia solo testi: titoli, paragrafi, voci di elenco. Tabelle, contatori, grafici, menu e numeri calcolati dal codice non compaiono nel CMS.
- Se modifica un testo che contiene numeri, la build ignora la modifica a meno che l'editor spunti «Autorizzo la modifica dei numeri». L'esito è scritto nel log di GitHub Actions.
- Ogni modifica è un commit con autore e data: si può annullare da GitHub.

## Da verificare al primo avvio
- Le opzioni `allow_add/allow_remove/allow_reorder: false` dei blocchi: se la tua versione di Sveltia CMS non le applica, l'editor potrebbe vedere i pulsanti di aggiunta o rimozione. Non fanno danni: un blocco rimosso torna al testo originale alla build successiva.
- Il file `admin/index.html` carica Sveltia CMS da unpkg senza versione fissa: dopo il primo test conviene indicare la versione precisa.
