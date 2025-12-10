// ===== KI-CHAT FUNKTIONALITÄT =====

let chatHistory = [];
let currentAIMode = 'tutor';

// KI-Modi Beschreibungen
const AI_MODES = {
    tutor: {
        name: 'Tutor',
        systemPrompt: `Du bist ein freundlicher und geduldiger Geschichtslehrer für Schüler der Mittelstufe (Klasse 7-10).
        Erkläre Konzepte einfach und verständlich. Nutze Beispiele und Vergleiche aus dem Alltag.
        Ermutige den Schüler und gib konstruktives Feedback. Halte deine Antworten kurz und prägnant (max. 150 Wörter).
        Antworte immer auf Deutsch.`
    },
    critic: {
        name: 'Kritiker',
        systemPrompt: `Du bist ein strenger, aber fairer Geschichtslehrer.
        Prüfe die Antworten des Schülers kritisch auf historische Korrektheit.
        Weise auf Fehler und Ungenauigkeiten hin. Fordere Belege und Begründungen ein.
        Stelle Rückfragen, um das Verständnis zu überprüfen. Sei anspruchsvoll aber respektvoll.
        Halte deine Antworten kurz (max. 150 Wörter). Antworte immer auf Deutsch.`
    },
    discussion: {
        name: 'Diskussionspartner',
        systemPrompt: `Du bist ein Diskussionspartner für historische Themen.
        Vertrete verschiedene Perspektiven und rege zum Nachdenken an.
        Stelle kontroverse Fragen und fordere den Schüler auf, seine Meinung zu begründen.
        Bringe Gegenargumente ein und zeige verschiedene Interpretationen auf.
        Halte deine Antworten kurz (max. 150 Wörter). Antworte immer auf Deutsch.`
    }
};

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

    if (!message) return;

    // Nachricht anzeigen
    addChatMessage(message, 'user');
    input.value = '';

    // Chat-Timer starten
    startChatTimer();

    // KI-Antwort holen
    await getAIResponse(message);
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
async function getAIResponse(message) {
    showTypingIndicator();

    const apiKey = localStorage.getItem('histolearn_apiKey');

    try {
        let response;

        if (apiKey && apiKey.startsWith('sk-')) {
            // Claude API (Anthropic)
            response = await callClaudeAPI(message, apiKey);
        } else if (apiKey && apiKey.startsWith('AIza')) {
            // Google Gemini API
            response = await callGeminiAPI(message, apiKey);
        } else {
            // Fallback: Simulierte Antwort
            response = await getSimulatedResponse(message);
        }

        hideTypingIndicator();
        addChatMessage(response, 'ai');

        // XP für Chat-Nutzung
        addXP(2);

    } catch (error) {
        hideTypingIndicator();
        addChatMessage('Es gab einen Fehler bei der Verbindung. Bitte überprüfe deinen API-Key in den Einstellungen.', 'ai');
        console.error('AI Error:', error);
    }
}

// Claude API aufrufen
async function callClaudeAPI(message, apiKey) {
    const mode = AI_MODES[currentAIMode];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 500,
            system: mode.systemPrompt,
            messages: chatHistory.slice(-10).map(m => ({
                role: m.role,
                content: m.content
            })).concat([{ role: 'user', content: message }])
        })
    });

    const data = await response.json();

    if (data.content && data.content[0]) {
        return data.content[0].text;
    }

    throw new Error('Invalid response');
}

// Google Gemini API aufrufen
async function callGeminiAPI(message, apiKey) {
    const mode = AI_MODES[currentAIMode];
    const fullPrompt = `${mode.systemPrompt}\n\nFrage: ${message}`;

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

    // Mittelalter
    if (lowerMessage.includes('mittelalter')) {
        return `Das **Mittelalter** (ca. 500-1500) - 1000 Jahre europäischer Geschichte

📅 **Einteilung:**
• **Frühmittelalter** (500-1000): Völkerwanderung, Karl der Große
• **Hochmittelalter** (1000-1250): Kreuzzüge, Städtegründungen
• **Spätmittelalter** (1250-1500): Pest, Reformation beginnt

🏰 **Gesellschaft (Ständeordnung):**
• 1. Stand: Klerus (Geistliche)
• 2. Stand: Adel (Ritter, Fürsten)
• 3. Stand: Bauern und Bürger

⚔️ **Wichtige Ereignisse:**
• 800: Kaiserkrönung Karls des Großen
• 1077: Gang nach Canossa
• 1096-1291: Kreuzzüge
• 1347-1351: Die Pest tötet 1/3 der Bevölkerung

🏠 **Leben im Mittelalter:**
• Landwirtschaft prägt das Leben
• Burgen als Herrschaftszentren
• Kirche bestimmt das geistige Leben
• Städte wachsen (Handel, Handwerk)

Welcher Aspekt interessiert dich besonders?`;
    }

    // Römisches Reich
    if (lowerMessage.includes('rom') || lowerMessage.includes('römisch') || lowerMessage.includes('caesar') || lowerMessage.includes('antike')) {
        return `Das **Römische Reich** - Von der Gründung bis zum Untergang

📅 **Geschichte Roms:**
• **753 v. Chr.**: Legendäre Gründung (Romulus & Remus)
• **509-27 v. Chr.**: Römische Republik
• **27 v. Chr. - 476 n. Chr.**: Römisches Kaiserreich

🏛️ **Wichtige Persönlichkeiten:**
• **Julius Caesar**: Eroberer Galliens, ermordet 44 v. Chr.
• **Augustus**: Erster Kaiser, Pax Romana
• **Nero**: Berüchtigter Kaiser, Brand Roms
• **Konstantin**: Machte Christentum zur Staatsreligion

⚔️ **Errungenschaften:**
• Straßenbau und Aquädukte
• Römisches Recht (Grundlage unserer Gesetze)
• Latein (Grundlage romanischer Sprachen)
• Architektur (Kolosseum, Pantheon)

💫 **Untergang:**
• 395: Teilung in West- und Ostrom
• 476: Ende des Weströmischen Reiches
• Ursachen: Völkerwanderung, innere Krisen, Überdehnung`;
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
• Mittelalter
• Antikes Rom

**Tipp:** Nutze die **Quick-Buttons** für schnelle Hilfe!

Was möchtest du lernen?`;
    }

    // Standard-Antwort mit mehr Kontext
    const defaultResponses = AI_RESPONSES.default;
    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];

    return `${randomResponse}

Ich kann dir bei vielen Geschichtsthemen helfen:
• Französische Revolution
• Weltkriege
• Weimarer Republik
• Nationalsozialismus
• Kalter Krieg
• Mittelalter
• Antike

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
            <span class="chat-name">${escapeHtml(chat.name)}</span>
            <span class="chat-date">${new Date(chat.savedAt).toLocaleDateString('de-DE')}</span>
        </div>
    `).join('');
}

// Chat laden
function loadChat(chatId) {
    if (!currentUser || !currentUser.savedChats) return;

    const chat = currentUser.savedChats.find(c => c.id === chatId);
    if (!chat) return;

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
