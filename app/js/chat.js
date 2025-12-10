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
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const lowerMessage = message.toLowerCase();

    // Einfache Antwort-Logik
    if (lowerMessage.includes('französische revolution')) {
        return `Die Französische Revolution (1789-1799) war ein einschneidendes Ereignis der europäischen Geschichte.

**Wichtige Punkte:**
- Begann am 14. Juli 1789 mit dem Sturm auf die Bastille
- Motto: "Liberté, Égalité, Fraternité" (Freiheit, Gleichheit, Brüderlichkeit)
- König Ludwig XVI. wurde 1793 hingerichtet
- Führte zu grundlegenden Veränderungen in Gesellschaft und Politik

Möchtest du mehr über einen bestimmten Aspekt erfahren?`;
    }

    if (lowerMessage.includes('erster weltkrieg') || lowerMessage.includes('1. weltkrieg')) {
        return `Der Erste Weltkrieg (1914-1918) war der erste globale Konflikt der Geschichte.

**Ursachen:**
- Nationalismus und Imperialismus
- Bündnissysteme (Triple Entente vs. Mittelmächte)
- Attentat von Sarajevo als Auslöser

**Folgen:**
- Über 17 Millionen Tote
- Ende der Kaiserreiche (Deutschland, Österreich, Russland)
- Versailler Vertrag und neue Grenzen

Was interessiert dich besonders?`;
    }

    if (lowerMessage.includes('eselsbrücke')) {
        return `Hier ist eine Eselsbrücke für dich:

**753 - Rom schlüpft aus dem Ei**
(Gründung Roms: 753 v. Chr.)

**Tipp:** Eselsbrücken funktionieren am besten, wenn du sie selbst erstellst und mit lustigen oder persönlichen Bildern verbindest!

Soll ich dir eine Eselsbrücke für ein bestimmtes Datum oder Ereignis erstellen?`;
    }

    // Standard-Antwort
    return `Das ist eine interessante Frage!

Um dir besser helfen zu können, gib bitte in den **Einstellungen** einen API-Key ein:
- Google Gemini API (kostenlos): https://aistudio.google.com/apikey
- Claude API (von Anthropic)

Ohne API-Key kann ich nur begrenzt antworten. Mit API-Key bekommst du ausführliche, personalisierte Antworten zu allen Geschichtsthemen!

In der Zwischenzeit kannst du die **Quiz-Funktion** oder den **Zeitstrahl** nutzen.`;
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
