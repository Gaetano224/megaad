# MegaAd - Web App

Benvenuto in **MegaAd**, uno strumento web responsive e moderno per tracciare turni, mana e statistiche dei personaggi in tempo reale.

Questo progetto è una **Web Application pura** sviluppata con tecnologie all'avanguardia:
- **Vite** (Build tool ultra-veloce)
- **React 18** & **TypeScript**
- **Tailwind CSS** (Styling responsive)
- **shadcn/ui** (Componenti UI premium)

---

## 🚀 Come eseguirlo in locale

Per eseguire l'applicazione sul tuo computer locale, segui questi semplici passaggi:

### Prerequisiti
Assicurati di avere installato [Node.js](https://nodejs.org/) (consigliata versione LTS).

### Istruzioni

1. **Installa le dipendenze**:
   ```sh
   npm install
   ```

2. **Avvia il server di sviluppo**:
   ```sh
   npm run dev
   ```
   *Questo avvierà un server di sviluppo locale. Troverai l'app all'indirizzo `http://localhost:5173` (o simile).*

3. **Crea la build per la produzione**:
   ```sh
   npm run build
   ```
   *Questo compilerà l'applicazione e genererà i file statici HTML/CSS/JS all'interno della cartella `dist/`, pronti per essere pubblicati online.*

---

## 🌐 Come pubblicarlo online gratuitamente

Puoi rendere questa applicazione accessibile a chiunque online a costo zero utilizzando uno dei seguenti servizi di hosting statico consigliati:

### Opzione A: Vercel (Consigliato - Più veloce)
1. Crea un account gratuito su [Vercel](https://vercel.com).
2. Carica questo progetto su un repository GitHub.
3. Su Vercel, clicca su **Add New** > **Project** e seleziona il tuo repository GitHub.
4. Vercel riconoscerà automaticamente il progetto come **Vite**. Clicca su **Deploy**.
5. Fatto! Il tuo sito sarà online in pochi secondi con un URL pubblico gratuito (es. `nome-progetto.vercel.app`).

### Opzione B: GitHub Pages
1. Carica il progetto su un repository GitHub pubblico.
2. Installa il pacchetto `gh-pages` come dipendenza di sviluppo:
   ```sh
   npm install -D gh-pages
   ```
3. Nel tuo `package.json`, aggiungi la proprietà `homepage`:
   ```json
   "homepage": "https://<tuo-username-github>.github.io/<nome-del-repo>"
   ```
4. Aggiungi i seguenti script in `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. Esegui il comando di pubblicazione:
   ```sh
   npm run deploy
   ```
6. Abilita GitHub Pages nelle impostazioni del tuo repository su GitHub impostando come sorgente il branch `gh-pages`.

---

## 🛠️ Tecnologie Utilizzate

- **Framework**: [React](https://reactjs.org/) con [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icone**: [Lucide React](https://lucide.dev/)
- **Gestione Stato & Query**: [@tanstack/react-query](https://tanstack.com/query/latest)
