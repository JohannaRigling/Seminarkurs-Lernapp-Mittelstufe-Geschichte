# HistoLearn - Entwicklungsdokumentation

## Projektübersicht

HistoLearn ist eine gamifizierte Lernapp für Geschichte, entwickelt für Schüler der Mittelstufe (Klasse 7-10). Die App kombiniert moderne Web-Technologien mit pädagogischen Konzepten.

## Technologie-Stack

### Frontend
- **React 19** - UI-Framework
- **TypeScript** - Typsichere Programmierung
- **TailwindCSS 4** - Utility-First CSS Framework
- **Vite 7** - Build-Tool und Entwicklungsserver
- **React Router 7** - Client-Side Routing
- **Lucide React** - Icon-Bibliothek

### Backend & Datenbank
- **Firebase** - Backend-as-a-Service
  - Firebase Authentication - Benutzeranmeldung
  - Cloud Firestore - NoSQL-Datenbank
- **Cloudflare Pages** - Hosting
- **Cloudflare Pages Functions** - Serverless Functions (für KI-Chat)

### Design
- Mittelalter-Theme mit dunklem Farbschema
- Gold-Akzentfarbe (#D4AF37)
- Responsive Design für Mobile und Desktop

## Projektstruktur

```
react-app/
├── functions/              # Cloudflare Pages Functions
│   └── api/
│       └── chat.ts        # KI-Chat API Endpoint
├── src/
│   ├── components/        # React-Komponenten
│   │   ├── auth/          # Login/Register Formulare
│   │   ├── common/        # Wiederverwendbare UI-Komponenten
│   │   ├── layout/        # Layout-Komponenten (Sidebar)
│   │   └── ...
│   ├── config/
│   │   └── firebase.ts    # Firebase-Konfiguration
│   ├── contexts/          # React Context Provider
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   ├── data/              # Statische Daten
│   │   ├── quizData.ts
│   │   ├── operatorsData.ts
│   │   ├── strategiesData.ts
│   │   └── timelineData.ts
│   ├── hooks/             # Custom React Hooks
│   ├── pages/             # Seiten-Komponenten
│   ├── types/             # TypeScript Type Definitions
│   └── utils/             # Hilfsfunktionen
├── index.html
├── package.json
├── vite.config.ts
└── wrangler.toml          # Cloudflare-Konfiguration
```

## Features

### 1. Authentifizierung
- E-Mail/Passwort-Registrierung
- Login mit Persistenz
- Klassenstufen-Auswahl (7-10)

### 2. Dashboard
- Übersicht über Fortschritt
- XP und Münzen-Anzeige
- Schnellstart-Aktionen
- Letzte Aktivitäten

### 3. Quiz-System
- Multiple-Choice-Fragen
- Verschiedene Themen (Französische Revolution, Mittelalter, etc.)
- Sofortiges Feedback mit Erklärungen
- Münzen und XP als Belohnung

### 4. KI-Chat
- Drei Modi: Tutor, Kritiker, Diskussionspartner
- Schnellaktionen für häufige Anfragen
- Fallback-Antworten ohne API-Key
- Optional: OpenAI-Integration

### 5. Pomodoro-Timer
- Konfigurierbare Arbeits- und Pausenzeiten
- Belohnungssystem (Münzen pro Session)
- Bonus nach 4 Sessions
- Sound-Benachrichtigungen

### 6. Timeline
- Interaktive Zeitleiste
- Filter nach Epochen
- Detailansicht für Ereignisse

### 7. Gamification (Burg)
- Münzen als Währung
- XP und Rang-System
- Burg zum Ausbauen
- 6 kaufbare Teile

### 8. Operatoren
- Alle AFB-Stufen (1-3)
- Detaillierte Erklärungen
- Beispiele und Tipps
- Suchfunktion

### 9. Lernstrategien
- 12 verschiedene Methoden
- Schritt-für-Schritt-Anleitungen
- Geschichte-spezifische Tipps

## Lokale Entwicklung

### Voraussetzungen
- Node.js 18+
- npm oder yarn

### Setup
```bash
cd react-app
npm install
npm run dev
```

### Mit Cloudflare Functions
```bash
npm run pages:dev
```

## Deployment auf Cloudflare Pages

### Automatisch via Git
1. Repository mit GitHub verbinden
2. Build-Command: `npm run build`
3. Output-Directory: `dist`

### Manuell
```bash
npm run pages:deploy
```

### Umgebungsvariablen
Im Cloudflare Dashboard unter Pages > Settings > Environment variables:
- `OPENAI_API_KEY` (optional, für KI-Chat)

## Datenbank-Schema (Firestore)

### Collection: users
```typescript
{
  id: string,
  email: string,
  username: string,
  classLevel: number,
  createdAt: string,
  progress: {
    coins: number,
    totalCoins: number,
    xp: number,
    rank: string,
    level: number,
    // ... weitere Felder
  },
  preferences: {
    theme: string,
    pomodoroWork: number,
    // ... weitere Felder
  },
  achievements: [],
  activities: []
}
```

## Erweiterungsmöglichkeiten

1. **Mehr Quiz-Themen** - Weitere Epochen und Klassenstufen
2. **Multiplayer-Quiz** - Spielen gegen Freunde
3. **Achievements** - Mehr Erfolge zum Freischalten
4. **Leaderboard** - Rangliste unter Nutzern
5. **Push-Benachrichtigungen** - Lern-Erinnerungen
6. **Offline-Modus** - PWA mit Service Worker
7. **KI-Verbesserungen** - GPT-4, Claude, etc.

## Bekannte Limitierungen

- KI-Chat benötigt OpenAI API-Key für volle Funktionalität
- Firebase Free Tier: 50.000 Reads/Tag
- Cloudflare Free Tier: 100.000 Requests/Tag

## Lizenz

Dieses Projekt wurde im Rahmen eines Seminarkurses entwickelt.
