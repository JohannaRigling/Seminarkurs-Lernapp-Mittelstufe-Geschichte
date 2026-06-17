// ===== KI-CHAT FUNKTIONALITÄT =====

let chatHistory = [];
let currentAIMode = 'tutor';
window.chatFeynmanMode = false;

// Sicherheitshinweis der an alle System-Prompts angehängt wird
const SAFETY_ADDENDUM = `

WICHTIGE SICHERHEITSREGELN (höchste Priorität):
- Du bist eine Lern-App für Schüler der Klassen 8-10. Bleibe immer bei historischen Bildungsthemen.
- Lehne jede Anfrage nach sexuellen, pornographischen oder gewaltverharmlosenden Inhalten höflich aber bestimmt ab.
- Wenn ein Schüler Anzeichen von Depressionen, Suizidgedanken oder emotionaler Not zeigt, antworte einfühlsam und weise auf die Telefonseelsorge hin: 0800 111 0 111 (kostenlos, 24/7).
- Gib keine Anleitung zu gefährlichen, illegalen oder schädlichen Handlungen.
- Bleibe stets respektvoll, unterstützend und altersgerecht.`;

// KI-Modi Beschreibungen
const AI_MODES = {
    tutor: {
        name: 'Tutor',
        systemPrompt: `Du bist ein freundlicher und geduldiger Geschichtslehrer für Schüler der Klassen 8-10.
        Deine Themen basieren auf dem Schulbuch und umfassen: Französische Revolution, Industrialisierung, Imperialismus,
        Erster Weltkrieg, Weimarer Republik, Nationalsozialismus, BRD/DDR, Russland, China, Osmanisches Reich/Türkei und Europäische Union.
        Erkläre Konzepte einfach und verständlich. Nutze Beispiele und Vergleiche aus dem Alltag.
        Ermutige den Schüler und gib konstruktives Feedback. Halte deine Antworten kurz und prägnant (max. 150 Wörter).
        Antworte immer auf Deutsch.` + SAFETY_ADDENDUM
    },
    critic: {
        name: 'Kritiker',
        systemPrompt: `Du bist ein strenger, aber fairer Geschichtslehrer.
        Prüfe die Antworten des Schülers kritisch auf historische Korrektheit.
        Weise auf Fehler und Ungenauigkeiten hin. Fordere Belege und Begründungen ein.
        Stelle Rückfragen, um das Verständnis zu überprüfen. Sei anspruchsvoll aber respektvoll.
        Halte deine Antworten kurz (max. 150 Wörter). Antworte immer auf Deutsch.` + SAFETY_ADDENDUM
    },
    discussion: {
        name: 'Diskussionspartner',
        systemPrompt: `Du bist ein Diskussionspartner für historische Themen.
        Vertrete verschiedene Perspektiven und rege zum Nachdenken an.
        Stelle kontroverse Fragen und fordere den Schüler auf, seine Meinung zu begründen.
        Bringe Gegenargumente ein und zeige verschiedene Interpretationen auf.
        Halte deine Antworten kurz (max. 150 Wörter). Antworte immer auf Deutsch.` + SAFETY_ADDENDUM
    }
};

// ===== KINDERSICHERUNG =====

// Schlüsselwörter für blockierte Inhalte
const BLOCKED_KEYWORDS = [
    'porno', 'pornograph', 'nackt', 'sex', 'erotik', 'nacktbild',
    'masturbier', 'orgasmus', 'penis', 'vagina', 'dildo',
    'drogen kaufen', 'drogen nehmen', 'joints', 'kokain', 'heroin',
    'waffe kaufen', 'bombe bauen', 'anschlag planen', 'jemanden töten'
];

// Schlüsselwörter für Krisenthemen (Hilfe anbieten)
const CRISIS_KEYWORDS = [
    'suizid', 'selbstmord', 'umbringen', 'töten mich', 'leben beenden',
    'nicht mehr leben', 'sterben wollen', 'aufhören zu leben',
    'depression', 'depressiv', 'hoffnungslos', 'keinen ausweg',
    'selbstverletzung', 'ritzen', 'schneiden', 'schmerzen zufügen',
    'niemand mag mich', 'bin eine last', 'wertlos', 'bin allein'
];

// Nachricht für blockierte Inhalte
const BLOCKED_RESPONSE = `Das liegt leider außerhalb meiner Möglichkeiten als Geschichts-Tutor. 📚

Ich bin hier, um dir beim Lernen von Geschichte zu helfen! Frag mich gerne zu:
• Französische Revolution, Weltkriege, Industrialisierung
• Nationalsozialismus, BRD/DDR, Kalter Krieg
• Russland, China, Osmanisches Reich, EU

Was möchtest du lernen?`;

// Nachricht für Krisenthemen
const CRISIS_RESPONSE = `Ich mache mir Sorgen um dich und möchte, dass du weißt: Du bist nicht allein. 💙

Wenn du gerade schwere Gedanken hast oder dich sehr schlecht fühlst, gibt es Menschen, die dir helfen können:

📞 **Telefonseelsorge** – kostenlos, 24/7, anonym:
• **0800 111 0 111**
• **0800 111 0 222**

💬 **Online-Beratung:** www.online.telefonseelsorge.de

Diese Menschen hören dir zu – egal was, egal wann. Du musst das nicht alleine durchmachen.

Ich bin als Geschichts-Tutor leider nicht die richtige Anlaufstelle für solche Themen, aber die Menschen bei der Telefonseelsorge sind es. Bitte ruf an. 🙏`;

/**
 * Prüft eine Nachricht auf sicherheitsrelevante Inhalte.
 * Gibt zurück: 'blocked', 'crisis', oder 'ok'
 */
function checkMessageSafety(message) {
    const lower = message.toLowerCase();

    for (const keyword of CRISIS_KEYWORDS) {
        if (lower.includes(keyword)) return 'crisis';
    }

    for (const keyword of BLOCKED_KEYWORDS) {
        if (lower.includes(keyword)) return 'blocked';
    }

    return 'ok';
}

// Quick Prompts
const QUICK_PROMPTS = {
    eselsbruecke: 'Erstelle mir eine kreative und einprägsame Eselsbrücke für folgendes Thema: ',
    zusammenfassung: 'Fasse mir folgendes Thema in einfachen Worten zusammen: ',
    quiz: 'Erstelle mir 3 Quiz-Fragen (mit je 4 Antwortmöglichkeiten und der richtigen Lösung) zu: ',
    erklaerung: 'Erkläre mir einfach und verständlich, als wäre ich 12 Jahre alt: ',
    zeitstrahl: 'Ordne folgendes Ereignis zeitlich ein und nenne wichtige Ereignisse davor und danach: ',
    vergleich: 'Erstelle einen Vergleich mit Gemeinsamkeiten und Unterschieden für: ',
    pruefung: 'Stelle mir eine typische Prüfungsfrage (mit Erwartungshorizont) zu: '
};

// Chat-Nachricht senden
async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message && !chatAttachment) return;

    // Anzeigenachricht mit Anhang-Info
    let displayMessage = message;
    if (chatAttachment) {
        displayMessage = chatAttachment.type === 'image'
            ? `[📷 ${chatAttachment.name}]${message ? ' ' + message : ''}`
            : `[📄 ${chatAttachment.name}]${message ? ' ' + message : ''}`;
    }

    addChatMessage(displayMessage, 'user');
    input.value = '';

    const attachment = chatAttachment;
    clearChatAttachment();
    startChatTimer();
    await getAIResponse(message || 'Bitte analysiere diesen Inhalt.', '', attachment);
}

// Quick Prompt senden
async function sendQuickPrompt(type) {
    const promptPrefix = QUICK_PROMPTS[type];
    if (!promptPrefix) return;

    const topic = prompt(`Zu welchem Thema möchtest du ${type === 'eselsbruecke' ? 'eine Eselsbrücke' : type === 'quiz' ? 'ein Quiz' : 'eine ' + type}?`);

    if (!topic || !topic.trim()) return;

    const fullMessage = promptPrefix + topic;

    addChatMessage(fullMessage, 'user');
    startChatTimer();
    await getAIResponse(fullMessage);
}

// Nachricht zum Chat hinzufügen
function addChatMessage(content, sender) {
    const container = document.getElementById('chatMessages');

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${formatMessage(content)}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${escapeHtml(content)}</p>
            </div>
            <div class="message-avatar">👤</div>
        `;
    }

    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;

    // Chat-Historie aktualisieren
    chatHistory.push({ role: sender === 'user' ? 'user' : 'assistant', content: content });
}

// Lade-Animation anzeigen
function showTypingIndicator() {
    const container = document.getElementById('chatMessages');

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p><span class="typing-dots">●●●</span></p>
        </div>
    `;

    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;

    // Animation
    let dots = 0;
    const dotsEl = typingDiv.querySelector('.typing-dots');
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        dotsEl.textContent = '●'.repeat(dots + 1) + '○'.repeat(3 - dots);
    }, 300);

    typingDiv.dataset.interval = interval;
}

// Lade-Animation entfernen
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        clearInterval(indicator.dataset.interval);
        indicator.remove();
    }
}

// KI-Antwort holen
async function getAIResponse(message, extraSystemInstruction = '', attachment = null) {
    // Sicherheitscheck vor API-Aufruf
    const safetyResult = checkMessageSafety(message);
    if (safetyResult === 'blocked') {
        addChatMessage(BLOCKED_RESPONSE, 'ai');
        return;
    }
    if (safetyResult === 'crisis') {
        addChatMessage(CRISIS_RESPONSE, 'ai');
        return;
    }

    // Intercept initial Feynman prompt in both API and simulated mode to guarantee the expected response.
    if (window.chatFeynmanMode && (message.includes('Feynman-Methode') || message.includes('Feynman-Technik') || (message.includes('Feynman') && message.includes('12')))) {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addChatMessage('Schieß los! Welches Thema möchtest du mir erklären? Ich bin ganz Ohr und versuche es zu verstehen! 😊', 'ai');
            addXP(2);
        }, 600);
        return;
    }

    showTypingIndicator();

    const apiKey = (typeof HISTOLEARN_CONFIG !== 'undefined' && HISTOLEARN_CONFIG.apiKey)
        ? HISTOLEARN_CONFIG.apiKey
        : localStorage.getItem('histolearn_apiKey');

    // Feynman mode system instruction injection
    let systemInstruction = extraSystemInstruction;
    if (window.chatFeynmanMode) {
        const feynmanPrompt = 'Du bist ab jetzt ein 12-jähriges Kind namens Fynn (oder Fionn), das noch nicht viel über Geschichte weiß. Der Schüler wendet die Feynman-Methode an und erklärt dir ein geschichtliches Thema. Antworte immer als 12-jähriges Kind, stelle einfache, naive und neugierige Fragen und weise den Schüler darauf hin, wenn er unverständliche Fachbegriffe verwendet, die ein 12-Jähriger nicht verstehen würde. Verhalte dich genau wie ein neugieriges 12-jähriges Kind.';
        systemInstruction = systemInstruction 
            ? `${systemInstruction}\n\n${feynmanPrompt}`
            : feynmanPrompt;
    }

    try {
        let response;

        if (apiKey && apiKey.startsWith('sk-')) {
            response = await callClaudeAPI(message, apiKey, systemInstruction, attachment);
        } else if (apiKey && apiKey.startsWith('AIza')) {
            response = await callGeminiAPI(message, apiKey, systemInstruction);
        } else {
            response = await getSimulatedResponse(message);
        }

        hideTypingIndicator();
        addChatMessage(response, 'ai');

        // XP für Chat-Nutzung
        addXP(2);

    } catch (error) {
        hideTypingIndicator();
        addChatMessage('Es gab einen Fehler bei der Verbindung zur KI. Bitte versuche es erneut.', 'ai');
        console.error('AI Error:', error);
    }
}

// Claude API aufrufen
async function callClaudeAPI(message, apiKey, extraSystemInstruction = '', attachment = null) {
    const mode = AI_MODES[currentAIMode];
    const systemPrompt = extraSystemInstruction
        ? `${mode.systemPrompt}\n\n${extraSystemInstruction}`
        : mode.systemPrompt;

    // Nachrichteninhalt aufbauen (mit oder ohne Anhang)
    let userContent;
    if (attachment && attachment.type === 'image') {
        userContent = [
            {
                type: 'image',
                source: { type: 'base64', media_type: attachment.mediaType, data: attachment.data }
            },
            {
                type: 'text',
                text: message || 'Bitte analysiere dieses Bild und erkläre was du siehst.'
            }
        ];
    } else if (attachment && attachment.type === 'text') {
        userContent = `[Hochgeladene Datei: ${attachment.name}]\n\n${attachment.data.substring(0, 3000)}\n\n---\nFrage: ${message}`;
    } else {
        userContent = message;
    }

    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 500,
            system: systemPrompt,
            messages: chatHistory.slice(-10).map(m => ({
                role: m.role,
                content: m.content
            })).concat([{ role: 'user', content: userContent }])
        })
    });

    const data = await response.json();

    if (data.content && data.content[0]) {
        return data.content[0].text;
    }

    throw new Error('Invalid response');
}

// Google Gemini API aufrufen
async function callGeminiAPI(message, apiKey, extraSystemInstruction = '') {
    const mode = AI_MODES[currentAIMode];
    const systemPrompt = extraSystemInstruction
        ? `${mode.systemPrompt}\n\n${extraSystemInstruction}`
        : mode.systemPrompt;
    const fullPrompt = `${systemPrompt}\n\nFrage: ${message}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: fullPrompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500
            }
        })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Invalid response');
}

// Simulierte Antwort (wenn kein API-Key)
async function getSimulatedResponse(message) {
    // Verzögerung simulieren
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));

    const lowerMessage = message.toLowerCase();

    // Chat-Statistik aktualisieren
    if (currentUser) {
        currentUser.progress.chatQuestions = (currentUser.progress.chatQuestions || 0) + 1;
        updateUserProgress({ chatQuestions: currentUser.progress.chatQuestions });
    }

    // Feynman-Methode (wenn aktiv, antworte als neugieriges Kind)
    if (window.chatFeynmanMode) {
        if (lowerMessage.includes('revolution') || lowerMessage.includes('rebell')) {
            return 'Eine Revolution? Das klingt spannend, aber auch irgendwie gefährlich. Warum haben die Menschen denn damals rebelliert? Wollten die den König oder Herrscher nicht mehr haben?';
        }
        if (lowerMessage.includes('krieg') || lowerMessage.includes('kampf') || lowerMessage.includes('kämpfen') || lowerMessage.includes('soldat')) {
            return 'Krieg finde ich voll gruselig. Warum haben die Länder denn damals nicht einfach miteinander geredet, anstatt Soldaten loszuschicken und sich zu bekämpfen?';
        }
        if (lowerMessage.includes('mauer') || lowerMessage.includes('ddr') || lowerMessage.includes('teilung') || lowerMessage.includes('brd')) {
            return 'Warum wurde denn eine echte Mauer mitten durch eine Stadt wie Berlin gebaut? Durften die Leute gar nicht auf die andere Seite rübergehen, um ihre Familie zu besuchen?';
        }
        if (lowerMessage.includes('hitler') || lowerMessage.includes('nationalsozialismus') || lowerMessage.includes('nazi') || lowerMessage.includes('holocaust')) {
            return 'Das klingt alles so traurig und gemein. Warum haben die Menschen damals eigentlich auf diese schlimmen Ideen gehört? Und warum hat niemand versucht, das zu stoppen?';
        }
        if (lowerMessage.includes('dampfmaschine') || lowerMessage.includes('fabrik') || lowerMessage.includes('industrialisierung') || lowerMessage.includes('maschine')) {
            return 'Maschinen statt Handarbeit? War das nicht voll laut und dreckig in den alten Fabriken? Und stimmt es, dass damals auch Kinder in meinem Alter dort arbeiten mussten?';
        }
        if (lowerMessage.includes('kaiser') || lowerMessage.includes('könig') || lowerMessage.includes('fürst') || lowerMessage.includes('sultan')) {
            return 'Könige und Herrscher haben einfach alles bestimmt? Durften die normalen Menschen denn gar nichts mitentscheiden, so wie wir heute bei Wahlen?';
        }
        if (lowerMessage.includes('europa') || lowerMessage.includes('eu ') || lowerMessage.includes('europäische union')) {
            return 'Die Europäische Union kenne ich! Da kann man einfach so über die Grenzen reisen, oder? Wie haben die Länder es geschafft, sich nach den ganzen Kriegen zu vertragen?';
        }

        const childResponses = [
            'Das klingt echt spannend! Aber kannst du mir das noch mal ganz einfach erklären? Ich verstehe manche von den schweren Wörtern noch nicht so richtig. 😊',
            'Ah, verstehe! Aber warum war das für die Menschen damals eigentlich so wichtig? Was hat sich dadurch für sie geändert?',
            'Puh, das ist ganz schön kompliziert. Gibt es dafür vielleicht ein einfaches Beispiel aus dem Alltag, damit ich mir das besser vorstellen kann?',
            'Oh, das wusste ich gar nicht! Wer war denn die wichtigste Person bei diesem Thema und was genau hat sie gemacht?',
            'Das ist echt interessant! Und was hat dieses Ereignis mit unserem Leben heute zu tun? Merken wir davon heute noch irgendwas?'
        ];
        return childResponses[Math.floor(Math.random() * childResponses.length)];
    }

    // Eselsbrücke-Anfragen
    if (lowerMessage.includes('eselsbrücke')) {
        for (const [key, value] of Object.entries(AI_RESPONSES.eselsbruecke)) {
            if (key !== 'default' && lowerMessage.includes(key)) {
                return value;
            }
        }
        return AI_RESPONSES.eselsbruecke.default;
    }

    // Zusammenfassung-Anfragen
    if (lowerMessage.includes('zusammenfassung') || lowerMessage.includes('zusammenfassen')) {
        for (const [key, value] of Object.entries(AI_RESPONSES.zusammenfassung)) {
            if (key !== 'default' && lowerMessage.includes(key)) {
                return value;
            }
        }
        return AI_RESPONSES.zusammenfassung.default;
    }

    // Erklärung-Anfragen
    if (lowerMessage.includes('erkläre') || lowerMessage.includes('erklär') || lowerMessage.includes('was ist')) {
        for (const [key, value] of Object.entries(AI_RESPONSES.erklaerung)) {
            if (key !== 'default' && lowerMessage.includes(key)) {
                return value;
            }
        }
        return AI_RESPONSES.erklaerung.default;
    }

    // Quiz-Anfragen
    if (lowerMessage.includes('quiz')) {
        return AI_RESPONSES.quiz.default;
    }

    // Französische Revolution
    if (lowerMessage.includes('französische revolution') || lowerMessage.includes('frankreich 1789')) {
        return `Die **Französische Revolution** (1789-1799) war ein Wendepunkt der europäischen Geschichte.

🏰 **Ursachen:**
• Finanzielle Krise des Staates
• Soziale Ungleichheit (Ständegesellschaft)
• Ideen der Aufklärung (Freiheit, Gleichheit)

📅 **Wichtige Ereignisse:**
• 14. Juli 1789: Sturm auf die Bastille
• August 1789: Erklärung der Menschen- und Bürgerrechte
• 1793: Hinrichtung Ludwigs XVI.
• 1793-94: Schreckensherrschaft (Terreur)
• 1799: Napoleon übernimmt die Macht

🎯 **Folgen:**
• Ende des Absolutismus
• Neue politische Ideen verbreiten sich in Europa
• Vorbild für spätere Revolutionen

Möchtest du mehr über einen bestimmten Aspekt erfahren?`;
    }

    // Erster Weltkrieg
    if (lowerMessage.includes('erster weltkrieg') || lowerMessage.includes('1. weltkrieg') || lowerMessage.includes('ww1')) {
        return `Der **Erste Weltkrieg** (1914-1918) - "Die Urkatastrophe des 20. Jahrhunderts"

⚔️ **Ursachen (MAIN):**
• **M**ilitarismus - Wettrüsten
• **A**llianzen - Bündnissysteme
• **I**mperialismus - Kolonialkonkurrenz
• **N**ationalismus - übersteigertes Nationalgefühl

💥 **Auslöser:**
Attentat von Sarajevo (28. Juni 1914) auf Erzherzog Franz Ferdinand

📊 **Verlauf:**
• 1914: Kriegsausbruch, Schlieffen-Plan scheitert
• 1915-17: Stellungskrieg, Materialschlachten
• 1917: USA tritt ein, Revolution in Russland
• 11.11.1918: Waffenstillstand

😢 **Folgen:**
• 17 Millionen Tote
• Ende von 4 Kaiserreichen
• Versailler Vertrag
• Grundlage für den 2. Weltkrieg

Was möchtest du genauer wissen?`;
    }

    // Weimarer Republik
    if (lowerMessage.includes('weimarer republik') || lowerMessage.includes('weimar')) {
        return `Die **Weimarer Republik** (1919-1933) - Deutschlands erste Demokratie

🏛️ **Gründung:**
• 9. November 1918: Ausrufung der Republik
• 1919: Weimarer Verfassung tritt in Kraft
• Friedrich Ebert wird erster Reichspräsident

📅 **Die drei Phasen:**

**1. Krisenjahre (1919-1923):**
• Versailler Vertrag und "Kriegsschuld"
• Putschversuche (Kapp, Hitler)
• Hyperinflation 1923

**2. Goldene Zwanziger (1924-1929):**
• Wirtschaftliche Stabilisierung
• Kulturelle Blüte
• Außenpolitische Erfolge (Stresemann)

**3. Untergang (1929-1933):**
• Weltwirtschaftskrise
• Massenarbeitslosigkeit
• Radikalisierung, Aufstieg der NSDAP

❌ **Warum scheiterte sie?**
• Dolchstoßlegende belastete von Anfang an
• Antidemokratische Kräfte links und rechts
• Schwächen der Verfassung (Artikel 48)
• Weltwirtschaftskrise ab 1929`;
    }

    // Nationalsozialismus
    if (lowerMessage.includes('nationalsozialismus') || lowerMessage.includes('ns-zeit') || lowerMessage.includes('hitler') || lowerMessage.includes('drittes reich')) {
        return `Der **Nationalsozialismus** (1933-1945) - Die dunkelste Zeit der deutschen Geschichte

⚠️ **Machtergreifung:**
• 30. Januar 1933: Hitler wird Reichskanzler
• Februar 1933: Reichstagsbrand, Notverordnungen
• März 1933: Ermächtigungsgesetz

🚫 **Ideologie:**
• Rassismus und Antisemitismus
• "Volksgemeinschaft" und Führerprinzip
• Expansion und "Lebensraum im Osten"

😢 **Terror:**
• Verfolgung politischer Gegner
• Nürnberger Gesetze 1935
• Reichspogromnacht 1938
• Holocaust: 6 Millionen ermordete Juden

⚔️ **Zweiter Weltkrieg (1939-1945):**
• 1. September 1939: Überfall auf Polen
• 1941: Angriff auf Sowjetunion
• 8. Mai 1945: Bedingungslose Kapitulation

📚 **Merke:** Aus der Geschichte lernen bedeutet, Demokratie zu schützen und Menschenwürde zu verteidigen.`;
    }

    // Kalter Krieg
    if (lowerMessage.includes('kalter krieg') || lowerMessage.includes('cold war') || lowerMessage.includes('ost west')) {
        return `Der **Kalte Krieg** (1947-1991) - Der Konflikt ohne direkten Krieg

🌍 **Was war das?**
Ein Systemkonflikt zwischen:
• 🇺🇸 USA und westlichen Demokratien (NATO)
• 🇷🇺 Sowjetunion und Ostblock (Warschauer Pakt)

❄️ **Warum "kalt"?**
Kein direkter Krieg, aber: Wettrüsten, Spionage, Propaganda, Stellvertreterkriege

📅 **Wichtige Ereignisse:**
• 1948/49: Berlin-Blockade und Luftbrücke
• 1949: Gründung BRD und DDR
• 1961: Bau der Berliner Mauer
• 1962: Kubakrise (fast Atomkrieg!)
• 1989: Fall der Mauer
• 1991: Ende der Sowjetunion

🇩🇪 **Deutschland im Kalten Krieg:**
• Teilung in BRD (West) und DDR (Ost)
• Berlin als Symbol des Konflikts
• "Eiserner Vorhang" durch Europa

🎉 **Ende:** Der friedliche Zusammenbruch des Ostblocks 1989-1991`;
    }

    // ===== KLASSE 8 THEMEN =====

    // Wiener Kongress
    if (lowerMessage.includes('wiener kongress') || lowerMessage.includes('metternich') || lowerMessage.includes('restauration')) {
        return `Der **Wiener Kongress** (1814-1815) - Europa wird neu geordnet

🎭 **Was war das Ziel?**
Nach der Niederlage Napoleons sollte Europa "restauriert" werden - also die alte Ordnung wiederhergestellt.

👑 **Wichtige Akteure:**
• **Metternich** (Österreich): Gastgeber und wichtigster Politiker
• **Zar Alexander I.** (Russland)
• **Talleyrand** (Frankreich): Geschickter Diplomat des besiegten Landes
• **Hardenberg** (Preußen)

⚖️ **Die drei Prinzipien:**
1. **Legitimität**: Nur "rechtmäßige" Herrscher dürfen regieren
2. **Restauration**: Wiederherstellung der vorrevolutionären Ordnung
3. **Gleichgewicht**: Keine Macht soll dominieren

📜 **Ergebnisse:**
• Gründung des **Deutschen Bundes** (loser Staatenbund)
• Neuordnung der europäischen Grenzen
• "Heilige Allianz" (Russland, Österreich, Preußen)

⚠️ **Kritik:** Die Ideen von Freiheit und Nationalismus wurden unterdrückt!`;
    }

    // Revolution 1848
    if (lowerMessage.includes('1848') || lowerMessage.includes('märzrevolution') || lowerMessage.includes('paulskirche') || lowerMessage.includes('vormärz')) {
        return `Die **Revolution 1848** - Der Kampf um Freiheit und Einheit

🔥 **Auslöser:**
• Februarrevolution in Frankreich (1848)
• Wirtschaftskrise und Hungersnöte
• Unterdrückung im "Vormärz" (Zeit vor März 1848)

✊ **Märzforderungen:**
• Pressefreiheit
• Versammlungsfreiheit
• Verfassung
• Deutsches Parlament

🏛️ **Frankfurter Nationalversammlung:**
• Tagte in der **Paulskirche**
• Erste demokratisch gewählte Versammlung
• Erarbeitete die "Paulskirchenverfassung"

👑 **Warum scheiterte die Revolution?**
• Friedrich Wilhelm IV. lehnte die Kaiserkrone ab ("Krone aus der Gosse")
• Militär blieb den Fürsten treu
• Spaltung zwischen Liberalen und Demokraten

💡 **Langfristige Folgen:**
• Grundrechte wurden später aufgegriffen
• Erfahrung der Demokratiebewegung
• Vorbild für spätere Verfassungen`;
    }

    // Imperialismus
    if (lowerMessage.includes('imperialismus') || lowerMessage.includes('koloni') || lowerMessage.includes('wettlauf um afrika') || lowerMessage.includes('berliner konferenz')) {
        return `Der **Imperialismus** (ca. 1880-1914) - Europas Griff nach der Welt

🌍 **Was ist Imperialismus?**
Das Streben von Staaten nach Kolonien, Einflusszonen und Weltmacht.

🏃 **Der "Wettlauf um Afrika":**
• Europäische Mächte teilen Afrika unter sich auf
• **Berliner Konferenz 1884/85**: Regeln für die Aufteilung
• Innerhalb von 30 Jahren wird fast ganz Afrika kolonisiert

🇩🇪 **Deutsche Kolonien ("Schutzgebiete"):**
• Deutsch-Südwestafrika (heute Namibia)
• Deutsch-Ostafrika (heute Tansania)
• Kamerun, Togo
• Pazifische Inseln

💭 **Rechtfertigung durch:**
• **Sozialdarwinismus**: "Überlegenheit" der europäischen "Rasse"
• "Zivilisierungsmission": angebliche Pflicht, "Wilde" zu "erziehen"
• Wirtschaftliche Interessen: Rohstoffe und Absatzmärkte

⚠️ **Folgen:**
• Ausbeutung der Kolonien
• Zerstörung lokaler Kulturen
• Konflikte zwischen Kolonialmächten
• Grundlage für den Ersten Weltkrieg`;
    }

    // Industrialisierung
    if (lowerMessage.includes('industrialisierung') || lowerMessage.includes('industrielle revolution') || lowerMessage.includes('dampfmaschine') || lowerMessage.includes('fabrik') || lowerMessage.includes('soziale frage')) {
        return `**Die Industrialisierung** - Der Durchbruch der Moderne

🏭 **Was war die Industrialisierung?**
Übergang von der Agrargesellschaft zur Industriegesellschaft ab ca. 1750 (England), in Deutschland ab 1830er Jahren.

⚙️ **Technische Neuerungen:**
• **Dampfmaschine** (James Watt, 1769): Antrieb für Maschinen
• **Eisenbahn** (ab 1835 in Deutschland): Schneller Transport
• **Mechanische Webstühle**: Massenproduktion von Textilien
• **Stahl- und Kohleproduktion**: Grundlage der Industrie

📊 **Wirtschaftliche Veränderungen:**
• **Kapitalismus** entsteht: Privatbesitz an Produktionsmitteln
• **Fabriken** ersetzen Handwerk
• Verstädterung: Menschen ziehen in Städte
• Neue Berufe: Fabrikarbeiter, Ingenieure

😢 **Die "Soziale Frage":**
• Arbeiter leben in Armut (Proletariat)
• 12-16 Stunden Arbeit pro Tag, 6 Tage/Woche
• Kinderarbeit
• Keine soziale Absicherung
• Schlechte Wohnverhältnisse in Mietskasernen

💡 **Lösungsansätze:**
• **Gewerkschaften**: Arbeiter organisieren sich
• **Sozialgesetzgebung** (Bismarck ab 1883): Kranken-, Unfall-, Rentenversicherung
• **Arbeiterbewegung**: SPD, sozialistische Ideen
• **Kirchen**: Caritative Arbeit

🌍 **Folgen:**
• Deutschland wird zur Industriemacht
• Bürgertum gewinnt an Einfluss
• Lebensstandard steigt langfristig
• Umweltprobleme (Luftverschmutzung)
• Grundlage für moderne Gesellschaft`;
    }

    // ===== KLASSE 9 THEMEN =====

    // Holocaust
    if (lowerMessage.includes('holocaust') || lowerMessage.includes('shoah') || lowerMessage.includes('judenverfolgung') || lowerMessage.includes('konzentrationslager')) {
        return `Der **Holocaust** (1933-1945) - Der Völkermord an den europäischen Juden

⚠️ **Was war der Holocaust?**
Die systematische Ermordung von etwa 6 Millionen Juden durch das NS-Regime.

📅 **Stufen der Verfolgung:**
1. **1933**: Boykott jüdischer Geschäfte, erste Gesetze
2. **1935**: Nürnberger Rassengesetze (Entrechtung)
3. **1938**: Reichspogromnacht (9./10. November)
4. **1941**: Beginn der systematischen Ermordung
5. **1942**: Wannseekonferenz - Planung der "Endlösung"

🏭 **Vernichtungslager:**
• Auschwitz-Birkenau (größtes Lager)
• Treblinka, Sobibor, Belzec
• Chelmno, Majdanek

✡️ **"Shoah"** ist die jüdische Bezeichnung (hebräisch: "Katastrophe")

📚 **Warum erinnern?**
• Aus der Geschichte lernen
• Mahnung gegen Rassismus und Antisemitismus
• Verantwortung für die Zukunft

"Wer die Vergangenheit nicht kennt, ist dazu verurteilt, sie zu wiederholen."`;
    }

    // BRD und DDR
    if (lowerMessage.includes('brd') || lowerMessage.includes('ddr') || lowerMessage.includes('deutsche teilung') || lowerMessage.includes('stasi')) {
        return `**BRD und DDR** (1949-1990) - Deutschland geteilt

🇩🇪 **Die Teilung:**
• **23. Mai 1949**: Gründung der BRD (Bundesrepublik Deutschland)
• **7. Oktober 1949**: Gründung der DDR (Deutsche Demokratische Republik)

📊 **Unterschiede:**

| | **BRD** | **DDR** |
|---|---|---|
| System | Demokratie | SED-Diktatur |
| Wirtschaft | Soziale Marktwirtschaft | Planwirtschaft |
| Bündnis | NATO | Warschauer Pakt |
| Verbündeter | USA | Sowjetunion |

🕵️ **Die Stasi:**
• Ministerium für Staatssicherheit
• Überwachte die eigene Bevölkerung
• 91.000 hauptamtliche + ~180.000 inoffizielle Mitarbeiter

📅 **Wichtige Ereignisse:**
• **1953**: Volksaufstand in der DDR (niedergeschlagen)
• **1961**: Bau der Berliner Mauer
• **1989**: Friedliche Revolution
• **1990**: Wiedervereinigung (3. Oktober)

Die Teilung dauerte **41 Jahre**!`;
    }

    // ===== KLASSE 10 THEMEN =====

    // Russland
    if (lowerMessage.includes('russland') || lowerMessage.includes('sowjetunion') || lowerMessage.includes('lenin') || lowerMessage.includes('stalin') || lowerMessage.includes('bolschewiki')) {
        return `**Russland - Ein Imperium im Wandel**

👑 **Zarenreich bis 1917:**
• Autokratie (Alleinherrschaft des Zaren)
• Rückständige Agrargesellschaft
• 1861: Abschaffung der Leibeigenschaft

🔴 **Die Revolutionen 1917:**
• **Februar**: Sturz des Zaren
• **Oktober/November**: Bolschewiki unter **Lenin** übernehmen die Macht

☭ **Der Marxismus:**
• Klassenkampf: Bourgeoisie vs. Proletariat
• Ziel: Kommunistische Gesellschaft ohne Klassen
• "Diktatur des Proletariats" als Übergangsphase

😨 **Stalinismus (1924-1953):**
• Totalitäre Diktatur mit Personenkult
• **Zwangskollektivierung**: Millionen Hungertote
• **Großer Terror**: Säuberungen, Gulags
• **Industrialisierung**: "Fünfjahrespläne"

⚔️ **Der "Große Vaterländische Krieg" (1941-1945):**
• 27 Millionen sowjetische Tote
• Sieg über NS-Deutschland

🔄 **Ende der UdSSR:**
• **Gorbatschow**: Glasnost & Perestroika
• **1991**: Auflösung der Sowjetunion`;
    }

    // China
    if (lowerMessage.includes('china') || lowerMessage.includes('mao') || lowerMessage.includes('kulturrevolution') || lowerMessage.includes('opiumkrieg')) {
        return `**China - Ein Imperium im Wandel**

🏯 **Das alte China:**
• Jahrtausendealte Kaiserreiche
• "Reich der Mitte" - sah sich als Zentrum der Welt
• Isolationspolitik gegenüber dem Westen

💊 **Die Opiumkriege (1839-1860):**
• Großbritannien erzwingt Öffnung Chinas
• "Ungleiche Verträge" demütigen China
• Beginn des "Jahrhunderts der Demütigung"

🔄 **Revolution und Bürgerkrieg:**
• **1911**: Ende der Kaiserzeit (Xinhai-Revolution)
• Bürgerkrieg: Nationalisten vs. Kommunisten
• **1949**: Mao gründet die **Volksrepublik China**

☭ **Unter Mao Zedong (1949-1976):**
• **Großer Sprung nach vorn** (1958-1961): Gescheiterte Industrialisierung, Millionen Hungertote
• **Kulturrevolution** (1966-1976): Verfolgung durch Rote Garden

📈 **Nach Mao:**
• **Deng Xiaoping**: Wirtschaftsreformen
• **1989**: Tiananmen-Massaker
• Aufstieg zur Wirtschaftsmacht bei politischer Diktatur`;
    }

    // Osmanisches Reich und Türkei
    if (lowerMessage.includes('osmanisch') || lowerMessage.includes('türkei') || lowerMessage.includes('atatürk') || lowerMessage.includes('sultan')) {
        return `**Osmanisches Reich & Türkei** - Vom Imperium zum Nationalstaat

🌙 **Das Osmanische Reich (1299-1922):**
• Eines der größten Imperien der Geschichte
• **1453**: Eroberung Konstantinopels
• Herrschaft über Südosteuropa, Naher Osten, Nordafrika
• Kalifat: Sultan als religiöser Führer der Muslime

📉 **Der "kranke Mann am Bosporus":**
• 19. Jahrhundert: Niedergang und Gebietsverluste
• Balkanvölker werden unabhängig
• **Jungtürken**: Reformbewegung ab 1908

⚔️ **Erster Weltkrieg:**
• Osmanisches Reich kämpft auf Seiten Deutschlands
• **1915**: Völkermord an den Armeniern
• 1918: Niederlage und Zusammenbruch

🇹🇷 **Gründung der Republik Türkei (1923):**
• **Mustafa Kemal Atatürk** als Gründer
• Radikale Reformen:
  - **Laizismus**: Trennung von Staat und Religion
  - Lateinisches Alphabet statt arabischer Schrift
  - Gleichberechtigung der Frauen
  - Westliche Kleidung

💡 **Atatürks Motto:** "Frieden im Land, Frieden in der Welt"`;
    }

    // Europäische Union
    if (lowerMessage.includes('europäische union') || lowerMessage.includes(' eu ') || lowerMessage.includes('europa') || lowerMessage.includes('maastricht') || lowerMessage.includes('montanunion')) {
        return `**Die Europäische Union** - Einigung nach Jahrhunderten der Kriege

🕊️ **Idee:**
Nach zwei Weltkriegen: "Nie wieder Krieg in Europa!"

📅 **Stationen der Integration:**
• **1951**: Montanunion (EGKS) - Kohle & Stahl gemeinsam verwaltet
• **1957**: Römische Verträge - EWG gegründet
• **1993**: Vertrag von Maastricht - EU entsteht
• **2002**: Euro wird Bargeld

🏛️ **EU-Institutionen:**
• **Europäisches Parlament** (gewählt von den Bürgern)
• **Europäische Kommission** (Exekutive)
• **Europäischer Rat** (Staats- und Regierungschefs)
• **Europäischer Gerichtshof**

✨ **Errungenschaften:**
• **Schengen**: Reisen ohne Grenzkontrollen
• **Erasmus**: Studieren im Ausland
• **Euro**: Gemeinsame Währung
• Längste Friedensperiode in Europa

🎯 **Werte der EU:**
• Menschenwürde
• Freiheit
• Demokratie
• Rechtsstaatlichkeit
• Menschenrechte

Die EU hat 2012 den **Friedensnobelpreis** erhalten!`;
    }

    // Marxismus
    if (lowerMessage.includes('marxismus') || lowerMessage.includes('kommunismus') || lowerMessage.includes('marx') || lowerMessage.includes('klassenkampf') || lowerMessage.includes('proletariat')) {
        return `**Marxismus & Kommunismus** - Eine Ideologie verändert die Welt

📚 **Die Begründer:**
• **Karl Marx** (1818-1883) und **Friedrich Engels** (1820-1895)
• Hauptwerk: "Das Kapital"
• 1848: "Kommunistisches Manifest"

💡 **Kernideen:**

**1. Historischer Materialismus:**
Geschichte wird durch wirtschaftliche Verhältnisse bestimmt.

**2. Klassenkampf:**
• **Bourgeoisie** (Kapitalisten): Besitzen Produktionsmittel
• **Proletariat** (Arbeiter): Besitzen nur ihre Arbeitskraft
• Der Konflikt treibt die Geschichte voran

**3. Mehrwerttheorie:**
Arbeiter produzieren mehr Wert als sie als Lohn erhalten → Ausbeutung

**4. Revolution:**
Das Proletariat stürzt die Bourgeoisie
→ "Diktatur des Proletariats"
→ Klassenlose Gesellschaft (Kommunismus)

🌍 **Umsetzung:**
• **Sowjetunion** (1917-1991)
• **China** (ab 1949)
• **Kuba, Nordkorea, Vietnam...**

⚠️ **Kritik:**
In der Praxis führten kommunistische Regime oft zu Diktatur, Terror und wirtschaftlichem Versagen.`;
    }

    // Grußformeln
    if (lowerMessage.includes('hallo') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('guten tag')) {
        const greetings = AI_RESPONSES.greeting;
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Danke
    if (lowerMessage.includes('danke') || lowerMessage.includes('vielen dank')) {
        return `Gerne! 😊 Das freut mich, wenn ich dir helfen konnte!

Hast du noch weitere Fragen zur Geschichte? Ich bin hier, um zu helfen!

**Tipp:** Nutze die Quick-Buttons oben für:
• 🐴 Eselsbrücken
• 📋 Zusammenfassungen
• ❓ Quiz-Fragen
• 💡 Einfache Erklärungen`;
    }

    // Hilfe
    if (lowerMessage.includes('hilfe') || lowerMessage.includes('help') || lowerMessage.includes('was kannst du')) {
        return `Ich bin dein **Geschichts-Tutor**! 📚

**Das kann ich für dich tun:**
• 🐴 **Eselsbrücken** erstellen
• 📋 **Zusammenfassungen** von Themen
• ❓ **Quiz-Fragen** stellen
• 💡 Begriffe **einfach erklären**
• 📅 Ereignisse **zeitlich einordnen**
• ⚖️ **Vergleiche** erstellen
• 📝 **Prüfungsfragen** simulieren

**Themen, zu denen ich viel weiß:**
• Französische Revolution
• Erster & Zweiter Weltkrieg
• Weimarer Republik
• Nationalsozialismus
• Kalter Krieg
• BRD/DDR & Wiedervereinigung
• Industrialisierung & Soziale Frage
• Imperialismus
• Russland, China, Türkei
• Europäische Union

**Tipp:** Nutze die **Quick-Buttons** für schnelle Hilfe!

Was möchtest du lernen?`;
    }

    // Standard-Antwort mit mehr Kontext
    const defaultResponses = AI_RESPONSES.default;
    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];

    return `${randomResponse}

Ich kann dir bei vielen Geschichtsthemen helfen:
• Französische Revolution & Napoleon
• Wiener Kongress & Revolution 1848
• Industrialisierung & Soziale Frage
• Imperialismus & Erster Weltkrieg
• Weimarer Republik & Nationalsozialismus
• Zweiter Weltkrieg & Holocaust
• BRD/DDR & Kalter Krieg
• Russland, China, Osmanisches Reich/Türkei
• Europäische Union

**Nutze die Quick-Buttons** oben für:
🐴 Eselsbrücken | 📋 Zusammenfassungen | ❓ Quiz

Oder frag mich einfach direkt! Was möchtest du wissen?`;
}

// KI-Modus ändern
function changeAIMode() {
    const select = document.getElementById('aiMode');
    currentAIMode = select.value;

    const mode = AI_MODES[currentAIMode];
    showToast(`KI-Modus: ${mode.name}`, 'info');

    // Systemnachricht im Chat
    addChatMessage(`[Modus gewechselt zu: ${mode.name}]`, 'ai');
}

// Chat speichern
function saveCurrentChat() {
    if (!currentUser || chatHistory.length === 0) {
        showToast('Kein Chat zum Speichern vorhanden.', 'warning');
        return;
    }

    const chatName = prompt('Name für den Chat:', `Chat vom ${new Date().toLocaleDateString('de-DE')}`);
    if (!chatName) return;

    const savedChat = {
        id: Date.now().toString(),
        name: chatName,
        messages: [...chatHistory],
        savedAt: new Date().toISOString()
    };

    if (!currentUser.savedChats) {
        currentUser.savedChats = [];
    }

    currentUser.savedChats.push(savedChat);

    // Speichern
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }

    updateSavedChatsList();
    showToast('Chat gespeichert!', 'success');
    addActivity('chat', `Chat "${chatName}" gespeichert`);
}

// Gespeicherte Chats laden
function updateSavedChatsList() {
    const container = document.getElementById('savedChats');
    if (!container || !currentUser) return;

    if (!currentUser.savedChats || currentUser.savedChats.length === 0) {
        container.innerHTML = '<p class="no-chats">Noch keine Chats gespeichert</p>';
        return;
    }

    container.innerHTML = currentUser.savedChats.slice(-5).reverse().map(chat => `
        <div class="saved-chat-item" onclick="loadChat('${chat.id}')">
            <div class="saved-chat-info">
                <span class="chat-name">${escapeHtml(chat.name)}</span>
                <span class="chat-date">${new Date(chat.savedAt).toLocaleDateString('de-DE')}</span>
            </div>
            <button class="chat-delete-btn" onclick="event.stopPropagation(); deleteChat('${chat.id}')" title="Chat löschen">🗑️</button>
        </div>
    `).join('');
}

// Chat löschen
function deleteChat(chatId) {
    if (!currentUser || !currentUser.savedChats) return;

    if (!confirm('Chat wirklich löschen?')) return;

    currentUser.savedChats = currentUser.savedChats.filter(c => c.id !== chatId);

    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }

    updateSavedChatsList();
    showToast('Chat gelöscht.', 'info');
}

// Chat laden
function loadChat(chatId) {
    if (!currentUser || !currentUser.savedChats) return;

    const chat = currentUser.savedChats.find(c => c.id === chatId);
    if (!chat) return;

    window.chatFeynmanMode = false;

    // Chat-Container leeren
    const container = document.getElementById('chatMessages');
    container.innerHTML = '';

    // Willkommensnachricht
    addChatMessage(`Chat "${chat.name}" geladen.`, 'ai');

    // Nachrichten wiederherstellen
    chat.messages.forEach(msg => {
        addChatMessage(msg.content, msg.role === 'user' ? 'user' : 'ai');
    });

    chatHistory = [...chat.messages];
    showToast('Chat geladen!', 'success');
}

// Neuen Chat starten
function startNewChat() {
    chatHistory = [];
    window.chatFeynmanMode = false;

    const container = document.getElementById('chatMessages');
    container.innerHTML = `
        <div class="message ai">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>Hallo! Ich bin dein KI-Geschichtstutor. Ich helfe dir beim Lernen für Geschichte. Du kannst mich alles fragen oder die Schnell-Buttons unten nutzen!</p>
            </div>
        </div>
    `;

    const input = document.getElementById('chatInput');
    if (input) input.value = '';

    showToast('Neuer Chat gestartet!', 'success');
}

// HTML escapen
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Nachricht formatieren (Markdown-ähnlich)
function formatMessage(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/- (.*?)(?=<br>|$)/g, '• $1');
}

// CSS für Typing-Animation
const chatStyles = document.createElement('style');
chatStyles.textContent = `
    .typing-dots {
        animation: typing 1s infinite;
    }
    @keyframes typing {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    .saved-chat-item {
        padding: 10px;
        background: var(--bg-tertiary);
        border-radius: 8px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: var(--transition);
    }
    .saved-chat-item:hover {
        background: var(--primary);
        color: white;
    }
    .chat-name {
        display: block;
        font-weight: 500;
    }
    .chat-date {
        font-size: 0.8em;
        opacity: 0.7;
    }
`;
document.head.appendChild(chatStyles);

// ===== CHAT ANHÄNGE =====

let chatAttachment = null;

function handleChatAttachment(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
        showToast('Datei zu groß (max. 15 MB)', 'warning');
        return;
    }

    const reader = new FileReader();

    if (file.type.startsWith('image/')) {
        reader.onload = function(e) {
            chatAttachment = {
                type: 'image',
                data: e.target.result.split(',')[1],
                mediaType: file.type,
                name: file.name,
                previewUrl: e.target.result
            };
            showChatAttachmentPreview();
        };
        reader.readAsDataURL(file);
    } else {
        reader.onload = function(e) {
            chatAttachment = { type: 'text', data: e.target.result, name: file.name };
            showChatAttachmentPreview();
        };
        reader.readAsText(file);
    }
}

function showChatAttachmentPreview() {
    let preview = document.getElementById('chatAttachmentPreview');
    if (!preview) {
        preview = document.createElement('div');
        preview.id = 'chatAttachmentPreview';
        preview.className = 'chat-attachment-preview';
        const inputArea = document.querySelector('.chat-input-area');
        if (inputArea) inputArea.insertBefore(preview, inputArea.firstChild);
    }

    if (chatAttachment.type === 'image') {
        preview.innerHTML = `
            <img src="${chatAttachment.previewUrl}" alt="${chatAttachment.name}" class="chat-attach-thumb">
            <span class="chat-attach-name">${chatAttachment.name}</span>
            <button onclick="clearChatAttachment()" class="chat-attach-remove" title="Entfernen">×</button>
        `;
    } else {
        preview.innerHTML = `
            <span class="chat-attach-icon">📄</span>
            <span class="chat-attach-name">${chatAttachment.name}</span>
            <button onclick="clearChatAttachment()" class="chat-attach-remove" title="Entfernen">×</button>
        `;
    }
}

function clearChatAttachment() {
    chatAttachment = null;
    document.getElementById('chatAttachmentPreview')?.remove();
    const fi = document.getElementById('chatFileInput');
    if (fi) fi.value = '';
}
