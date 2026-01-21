# Standpunkt: HistoLearn Entwicklung

**Datum:** 2026-01-21
**Projekt:** Seminarkurs-Lernapp-Mittelstufe-Geschichte
**Status:** Phase 1 abgeschlossen - Schulbuch-Integration

---

## 📋 Projektübersicht

**HistoLearn** - Eine gamifizierte Geschichts-Lernapp für die Klassen 8, 9 und 10.

**Zielgruppe:** Mittelstufe (Klasse 8-10)
**Themengebiet:** Geschichte (basierend auf Schulbuchinhalten)

---

## ✅ Abgeschlossene Implementierungen

### 1. Glossar-System (NEU implementiert)
**Dateien:**
- `app/js/glossary.js` - Komplettes Glossar-System
- `app/css/components.css` - Glossar-Styling (ab Zeile 1035)
- `app/index.html` - Glossar-Section und Navigation

**Details:**
- 56 Fachbegriffe aus allen Klassenstufen
- Klasse 8: 18 Begriffe (Absolutismus, Industrialisierung, Kapitalismus, etc.)
- Klasse 9: 20 Begriffe (Antisemitismus, Holocaust, BRD/DDR, Stasi, etc.)
- Klasse 10: 18 Begriffe (Bolschewiki, Glasnost, Marxismus, Völkermord, etc.)
- Filterbar nach Klassenstufe
- Suchfunktion integriert
- Jeder Begriff: Definition, Beispiel, Themenbereich

### 2. Industrialisierung als Thema hinzugefügt
**Datei:** `app/js/chat.js` (ca. Zeile 575)

**Inhalte:**
- Technische Neuerungen (Dampfmaschine, Eisenbahn, Webstühle)
- Wirtschaftliche Veränderungen (Kapitalismus, Fabriken, Verstädterung)
- Soziale Frage (Arbeitsbedingungen, Kinderarbeit)
- Lösungsansätze (Gewerkschaften, Sozialgesetze, Arbeiterbewegung)

### 3. Timeline erweitert
**Datei:** `app/js/data.js` (TIMELINE_EVENTS, Zeilen 644-743)

**Neue Events:**
- 1769: Watts Dampfmaschine
- 1825: Erste Eisenbahn in England
- 1848: Kommunistisches Manifest
- 1863: Gründung ADAV (erste Arbeiterpartei)
- 1869: Gründung SDAP
- 1890: Ende der Ära Bismarck

### 4. Operatoren-System
**Datei:** `app/js/operators.js` + `app/js/data.js` (OPERATORS)

**Bereits vollständig implementiert:**
- AFB I (Reproduktion): nennen, beschreiben, zusammenfassen, darstellen, wiedergeben
- AFB II (Reorganisation/Transfer): erläutern, erklären, analysieren, einordnen, vergleichen, charakterisieren
- AFB III (Reflexion/Problemlösung): beurteilen, bewerten, erörtern, Stellung nehmen, diskutieren, prüfen

**Features:**
- Übungsaufgaben generieren
- Musterantworten
- Tipps und häufige Fehler
- AFB-Level-System

### 5. Library/Bildarchiv-Struktur
**Datei:** `app/index.html` (Section "library", Zeilen 510-550)

**Vorhanden:**
- Ordnerverwaltung
- Filterung nach Inhaltstypen
- Suchfunktion
- Struktur für Materialien bereit

---

## 📚 Schulbuch-Inhaltsanalyse

### Klasse 8 Themen (aus Schulbüchern):
1. **Europa nach der Französischen Revolution**
   - Bürgertum, Nationalstaat, Verfassung
   - Wiener Kongress 1815
   - Revolution 1848

2. **Der industrialisierte Nationalstaat** ✅ (implementiert)
   - Durchbruch der Moderne
   - Industrialisierung
   - Soziale Frage
   - Arbeiterbewegung

3. **Imperialismus und Erster Weltkrieg**
   - Berliner Konferenz 1884/85
   - Deutsche Kolonien
   - Erster Weltkrieg

4. **Europa in der Zwischenkriegszeit**
   - Weimarer Republik
   - Wirtschaftskrisen

### Klasse 9 Themen (aus Schulbüchern):
1. **Nationalsozialismus und Zweiter Weltkrieg**
   - Machtergreifung
   - NS-Ideologie
   - Holocaust
   - Zweiter Weltkrieg

2. **Zerstörung der Demokratie und Menschlichkeit**
   - Nürnberger Gesetze
   - Reichspogromnacht
   - Wannseekonferenz

3. **BRD und DDR**
   - Gründung 1949
   - Zwei Systeme (Demokratie vs. Diktatur)
   - Kalter Krieg
   - Wiedervereinigung

### Klasse 10 Themen (aus Schulbüchern):
1. **Fremde Räume: Imperien und ihre Herausforderungen**
   - Russland - ein Imperium im Wandel
   - China und die Türkei/Osmanisches Reich
   - Europäische Integration

2. **Russland**
   - Zarenreich
   - Revolutionen 1917
   - Sowjetunion
   - Glasnost & Perestroika

3. **China**
   - Opiumkriege
   - Xinhai-Revolution
   - Mao Zedong
   - Kulturrevolution

4. **Osmanisches Reich & Türkei**
   - Geschichte des Osmanischen Reiches
   - Völkermord an den Armeniern
   - Gründung der Republik Türkei (Atatürk)

5. **Europäische Union**
   - Montanunion
   - Römische Verträge
   - Maastricht-Vertrag

---

## 🗂️ Projektstruktur

```
Seminarkurs-Lernapp-Mittelstufe-Geschichte/
├── app/
│   ├── index.html
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css (✏️ erweitert)
│   │   └── themes.css
│   ├── js/
│   │   ├── app.js (✏️ erweitert)
│   │   ├── auth.js
│   │   ├── chat.js (✏️ erweitert)
│   │   ├── glossary.js (✨ NEU)
│   │   ├── operators.js
│   │   ├── strategies.js
│   │   ├── timeline.js
│   │   ├── exercises.js
│   │   ├── gamification.js
│   │   ├── timer.js
│   │   ├── data.js (✏️ erweitert)
│   │   └── admin.js
│   └── data/ (für zukünftige Bilder)
├── Klasse 8/ (Schulbuch-Scans)
│   └── IMG_2191.jpeg bis IMG_2220.jpeg
├── Klasse 9/ (Schulbuch-Scans)
│   └── IMG_2194.jpeg bis IMG_2223.jpeg
├── Klasse 10.1/ (Schulbuch-Scans)
│   └── IMG_2953.jpeg bis IMG_2959.jpeg
├── Klasse 10.2/ (Schulbuch-Scans)
│   └── IMG_2960.jpeg bis IMG_2966.jpeg
└── standpunkt.md (✨ DIESES DOKUMENT)
```

---

## 🎨 Design & Features

### Haupt-Features:
1. **KI-Tutor** (Chat-System mit simulierten Antworten)
2. **Operatoren-Training** (AFB I, II, III)
3. **Lernstrategien**
4. **Interaktiver Zeitstrahl**
5. **Übungen & Quizzes**
6. **Bibliothek/Library**
7. **Glossar** ✨ NEU
8. **Gamification** (Burg-System, Ränge, Münzen)
9. **Pomodoro-Timer**
10. **Einstellungen** (Themes, API-Keys)

### Theme:
- **Mittelalterlich/Historisch**
- Dunkles Theme mit goldenen Akzenten (#c9a227)
- "Kuh-Münzen" 🐄 als Währung
- Rang-System: Tagelöhner → Bauer → Handwerker → Ritter → Adel → Legende

---

## 📊 Schulbuch-Materialien

### Bildmaterial in den Ordnern:
- **Klasse 8:** 13 Bilder (Inhaltsverzeichnisse, Glossare, Operatoren)
- **Klasse 9:** 6 Bilder (Inhaltsverzeichnisse, Methodenverzeichnis)
- **Klasse 10.1:** 7 Bilder (Glossar, Geschichtslexikon)
- **Klasse 10.2:** 7 Bilder (Bildquellenverzeichnis)

### Wichtige Inhalte aus den Scans:
1. **Operatorenübersichten** (AFB I-III) - bereits in App integriert
2. **Glossare** - ✅ digitalisiert und implementiert
3. **Methodenanleitungen** - könnten noch als eigener Bereich hinzugefügt werden
4. **Bildquellenverzeichnisse** - für spätere Bildintegration

---

## 🔄 Nächste mögliche Schritte

### Priorität HOCH:
1. ❌ **Themeneinschränkung** (wurde vorerst ausgelassen)
   - User wollte nur Schulbuch-Themen in der App
   - Chat-System müsste ggf. gefiltert werden
   - Mittelalter/Römisches Reich sind NICHT in Schulbüchern → könnten entfernt werden

### Priorität MITTEL:
2. **Methodentraining hinzufügen**
   - Quellenanalyse Schritt-für-Schritt
   - Bildanalyse
   - Textanalyse
   - Basierend auf "Verzeichnis der Methoden" aus Schulbüchern

3. **Bildarchiv aufbauen**
   - Schulbuch-Bilder digitalisieren
   - In `app/data/images/` ablegen
   - In Library integrieren
   - Nach Epoche/Thema kategorisieren

4. **Exercises erweitern**
   - Mehr Industrialisierungs-Übungen
   - Bürgertum & Nationalstaat Übungen
   - Europa Zwischenkriegszeit Übungen

### Priorität NIEDRIG:
5. **API-Integration testen**
   - Claude API für echte KI-Antworten
   - Gemini API als Alternative
   - Aktuell: Nur simulierte Antworten

6. **Admin-Panel ausbauen**
   - Statistiken
   - User-Verwaltung
   - Content-Management

---

## 🔧 Technische Details

### Technologie-Stack:
- **Frontend:** Vanilla JavaScript (ES6+)
- **Styling:** CSS3 mit CSS Variables
- **Storage:** LocalStorage für User-Daten
- **API (optional):** Claude/Gemini API
- **Design:** Mobile-first, responsive

### Wichtige JavaScript-Variablen:
```javascript
// Globale Variablen
let currentUser = null;
let currentAIMode = 'tutor';
let chatHistory = [];
let currentGlossaryFilter = 'alle';

// User-Daten Struktur
currentUser = {
    id, username, email, class, password,
    progress: {
        xp, coins, rank, level,
        topicsCompleted, exercisesDone,
        operatorsViewed, timelineViewed
    },
    preferences: { theme, accentColor, defaultAIMode },
    achievements: [],
    savedChats: []
}
```

### LocalStorage Keys:
- `histolearn_users` - Alle registrierten User
- `histolearn_currentUser` - Aktuell eingeloggter User

---

## 📝 Offene Fragen & Entscheidungen

1. **Themenfilterung:** Sollen Mittelalter/Antike aus der App entfernt werden?
   - Mittelalter ist NICHT in den Schulbüchern Klasse 8-10
   - Römisches Reich ist NICHT in den Schulbüchern Klasse 8-10
   - User wollte NUR Schulbuch-Themen

2. **Bildintegration:** Wie sollen die Schulbuch-Bilder eingebunden werden?
   - Als separate Seiten in der Library?
   - Als interaktive Bildergalerie?
   - Mit Zoom-Funktion?

3. **Methodentraining:** Soll ein eigener Bereich erstellt werden?
   - Quellenanalyse Tutorial
   - Bildanalyse Tutorial
   - Schritt-für-Schritt Anleitungen

---

## 💡 Wichtige Code-Referenzen

### Glossar initialisieren:
```javascript
// In app.js showSection() bereits integriert
case 'glossary':
    if (!document.querySelector('.glossary-item')) {
        initGlossary();
    }
    break;
```

### Chat-System Prompt (chat.js, Zeile 10):
```javascript
systemPrompt: `Du bist ein freundlicher und geduldiger Geschichtslehrer für Schüler der Klassen 8-10.
Deine Themen basieren auf dem Schulbuch und umfassen: Französische Revolution, Industrialisierung, Imperialismus,
Erster Weltkrieg, Weimarer Republik, Nationalsozialismus, BRD/DDR, Russland, China, Osmanisches Reich/Türkei und Europäische Union.`
```

### Timeline Events (data.js, Zeile 644-743):
```javascript
const TIMELINE_EVENTS = [
    // Strukturiert nach Epochen
    // antike, mittelalter, fruehe-neuzeit, 19jh, 20jh
];
```

### Glossar-Datenstruktur (glossary.js):
```javascript
const GLOSSARY_DATA = {
    klasse8: [ { begriff, definition, beispiel, thema } ],
    klasse9: [ { begriff, definition, beispiel, thema } ],
    klasse10: [ { begriff, definition, beispiel, thema } ]
};
```

---

## 🎯 Projektziele

### Kurzfristig (erledigt):
✅ Glossar-System implementieren
✅ Industrialisierung hinzufügen
✅ Timeline erweitern
✅ An Schulbuchinhalte anpassen

### Mittelfristig (optional):
- Methodentraining implementieren
- Bildarchiv aufbauen
- Exercises erweitern
- Themenfilterung verfeinern

### Langfristig (optional):
- Echte KI-Integration (Claude/Gemini API)
- Multi-User Features
- Backend mit Datenbank
- Mobile App (PWA)

---

## 📞 Kontakt & Status

**Letzter Bearbeitungsstand:** 2026-01-21
**Bearbeiter:** Claude (Sonnet 4.5)
**Status:** Phase 1 abgeschlossen

**User-Feedback:**
- User ist zufrieden mit Glossar
- User ist zufrieden mit Industrialisierung
- ✅ **NEUE SESSION (21.01.2026):** Themenfilterung DURCHGEFÜHRT - App auf Schulbuch-Themen spezialisiert

---

## 🎯 Session vom 21.01.2026 - Themenfilterung

### ✅ Durchgeführte Änderungen:

**1. Chat-System bereinigt (`app/js/chat.js`):**
- ❌ Mittelalter-Response komplett entfernt
- ❌ Römisches Reich-Response komplett entfernt
- ✅ Themenliste aktualisiert: Nur noch Schulbuch-Themen (Französische Revolution, Weltkriege, Industrialisierung, BRD/DDR, Russland, China, Türkei, EU)

**2. Quiz-Themen bereinigt (`app/js/data.js`):**
- ❌ "Mittelalter" Quiz komplett entfernt
- ❌ "Antike" Quiz komplett entfernt
- ❌ "Reformation" Quiz entfernt (gehört zu Klasse 7, nicht 8-10)
- ✅ Nur noch Schulbuch-relevante Quizzes verfügbar

**3. Übungen bereinigt (`app/js/data.js`):**
- ❌ "Beschreiben Sie das Leben in einem mittelalterlichen Dorf" entfernt
- ✅ Alle Operator-Übungen fokussieren jetzt auf Schulbuch-Themen

**4. Fun Facts aktualisiert (`app/js/data.js`):**
- ❌ Entfernt: Pyramiden, Kleopatra, Antikes Rom, Mittelalter, Cäsar, Römisches Reich
- ✅ Hinzugefügt: Schulbuch-relevante Facts (Berliner Mauer, Weltkriege, Deutsches Kaiserreich, Sowjetunion)

**5. Library-Kategorien bereinigt (`app/js/data.js` + `app/js/app.js`):**
- ❌ Kategorie "Antike" entfernt
- ❌ Kategorie "Mittelalter" entfernt
- ✅ Nur noch: Frühe Neuzeit, 19. Jahrhundert, 20. Jahrhundert, Methoden, Notizen, Favoriten

**6. Matching-Spiel aktualisiert (`app/js/app.js`):**
- ❌ Caesar/Römische Republik entfernt
- ❌ Luther/Reformation entfernt
- ✅ Hinzugefügt: Hitler/Nationalsozialismus, Konrad Adenauer/BRD, Willy Brandt/Ostpolitik

**7. Zeitstrahl BEIBEHALTEN (`app/js/data.js`, `app/js/timeline.js`):**
- ✅ Antike/Mittelalter Events bleiben zur **Orientierung** im Zeitstrahl
- 📝 User-Wunsch: "beim zeitstrahl können zur orientierung noch andere zeiten mit drinnen stehen"
- ✅ Epochen-Visualisierung bleibt erhalten

---

## 📚 Finale Themenübersicht

**Alle Inhalte der App fokussieren jetzt ausschließlich auf:**

### Klasse 8:
- Französische Revolution & Napoleon
- Wiener Kongress
- Revolution 1848
- Industrialisierung & Soziale Frage
- Arbeiterbewegung
- Imperialismus
- Erster Weltkrieg
- Weimarer Republik
- Europa in der Zwischenkriegszeit

### Klasse 9:
- Nationalsozialismus
- Zweiter Weltkrieg
- Holocaust
- BRD/DDR
- Kalter Krieg
- Wiedervereinigung

### Klasse 10:
- Russland (Zarenreich, Revolutionen, Sowjetunion, Glasnost/Perestroika)
- China (Imperium im Wandel, Opiumkriege, Xinhai-Revolution, Mao, Kulturrevolution)
- Osmanisches Reich & Türkei (Völkermord Armenier, Republik Türkei, Atatürk)
- Europäische Union (Montanunion, Römische Verträge, Maastricht)

**NICHT mehr in der App (außer Zeitstrahl zur Orientierung):**
- ❌ Römisches Reich / Antike
- ❌ Mittelalter
- ❌ Reformation

---

## 🚀 So geht es weiter

Beim nächsten Mal starten mit:
1. Diese Datei lesen: `standpunkt.md`
2. Aktuelle User-Anforderungen klären
3. Ggf. an offenen Punkten weiterarbeiten:
   - Methodentraining implementieren
   - Bildarchiv aufbauen
   - Weitere Exercises zu Schulbuch-Themen

**Wichtig:** App ist jetzt vollständig auf Schulbuch-Themen (Klasse 8-10) spezialisiert!

---

**Ende Standpunkt-Dokumentation**
**Letzte Aktualisierung:** 21.01.2026 - Themenfilterung abgeschlossen
