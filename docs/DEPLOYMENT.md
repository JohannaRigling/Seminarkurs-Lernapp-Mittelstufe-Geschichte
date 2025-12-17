# HistoLearn - Deployment-Anleitung

Diese Anleitung erklärt Schritt für Schritt, wie du HistoLearn auf Cloudflare Pages deployen kannst.

## Voraussetzungen

1. **Cloudflare-Konto** - Kostenlos unter https://dash.cloudflare.com/sign-up
2. **GitHub-Konto** - Falls du Git-Integration nutzen möchtest
3. **Node.js 18+** - Für lokales Bauen

## Methode 1: Git-Integration (Empfohlen)

### Schritt 1: Repository zu GitHub pushen

```bash
cd Seminarkurs-Lernapp-Mittelstufe-Geschichte
git add .
git commit -m "Initial commit: HistoLearn React App"
git push origin main
```

### Schritt 2: Cloudflare Pages einrichten

1. Gehe zu https://dash.cloudflare.com
2. Klicke im linken Menü auf **"Workers & Pages"**
3. Klicke auf **"Create"** > **"Pages"** > **"Connect to Git"**
4. Wähle GitHub und autorisiere Cloudflare
5. Wähle dein Repository aus

### Schritt 3: Build-Einstellungen konfigurieren

- **Production branch:** `main`
- **Build command:** `cd react-app && npm install && npm run build`
- **Build output directory:** `react-app/dist`
- **Root directory:** `/` (leer lassen)

### Schritt 4: Umgebungsvariablen (Optional)

Für KI-Chat-Funktionalität mit OpenAI:
1. Klicke auf **"Environment variables"**
2. Füge hinzu: `OPENAI_API_KEY` = dein API-Key

### Schritt 5: Deploy

Klicke auf **"Save and Deploy"**. Cloudflare baut und deployed automatisch.

Nach dem Deploy erhältst du eine URL wie: `https://histolearn-xxx.pages.dev`

## Methode 2: Manuelles Deployment

### Schritt 1: Projekt lokal bauen

```bash
cd react-app
npm install
npm run build
```

Dies erstellt einen `dist` Ordner mit der produktionsfertigen App.

### Schritt 2: Wrangler installieren

```bash
npm install -g wrangler
```

### Schritt 3: Bei Cloudflare anmelden

```bash
wrangler login
```

Ein Browser-Fenster öffnet sich zur Autorisierung.

### Schritt 4: Deployment

```bash
cd react-app
wrangler pages deploy ./dist
```

Bei der ersten Ausführung wirst du gefragt:
- Projektname: `histolearn`
- Production branch: `main`

## Nach dem Deployment

### Custom Domain einrichten (Optional)

1. Gehe zu deinem Pages-Projekt im Cloudflare Dashboard
2. Klicke auf **"Custom domains"**
3. Füge deine Domain hinzu (z.B. `histolearn.de`)
4. Folge den DNS-Anweisungen

### Umgebungsvariablen ändern

1. Gehe zu Pages > Dein Projekt > **"Settings"**
2. Klicke auf **"Environment variables"**
3. Füge Variablen hinzu oder ändere sie
4. Klicke auf **"Save"**
5. Führe ein neues Deployment durch

### Deployment-Logs prüfen

1. Gehe zu Pages > Dein Projekt
2. Klicke auf das aktuelle Deployment
3. Unter **"Build log"** siehst du Details

## Automatische Deployments

Bei Git-Integration deployed Cloudflare automatisch bei jedem Push:
- **Production:** Bei Push zu `main`
- **Preview:** Bei Push zu anderen Branches

## Fehlerbehebung

### Build schlägt fehl
- Prüfe die Build-Logs auf Fehler
- Stelle sicher, dass `npm install` erfolgreich läuft
- Prüfe TypeScript-Fehler mit `npm run build` lokal

### Functions funktionieren nicht
- Stelle sicher, dass der `functions/` Ordner im Root liegt
- Prüfe die Functions-Logs im Dashboard

### Firebase-Fehler
- Prüfe, ob deine Firebase-Config korrekt ist
- Stelle sicher, dass Firestore-Regeln den Zugriff erlauben

## Firebase-Sicherheitsregeln

Für Produktion solltest du die Firestore-Regeln anpassen:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Kosten

Cloudflare Pages ist großzügig kostenlos:
- **Unbegrenzte** statische Requests
- **100.000** Functions-Requests/Tag
- **500** Builds/Monat

Firebase (Spark Plan - kostenlos):
- **50.000** Firestore-Reads/Tag
- **20.000** Writes/Tag
- **50.000** Auth-Verifications/Monat

Diese Limits sind mehr als ausreichend für eine Schulapp.

## Support

Bei Problemen:
1. Prüfe die Cloudflare-Dokumentation: https://developers.cloudflare.com/pages/
2. Prüfe die Firebase-Dokumentation: https://firebase.google.com/docs
3. Erstelle ein Issue im GitHub-Repository
