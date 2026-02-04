// ===== LERNZETTEL-UPLOAD & KI-VERARBEITUNG =====

let uploadedStudyNotes = [];
let currentProcessingNote = null;

// ========================================
// 1. UPLOAD HANDLING
// ========================================

/**
 * Öffnet Lernzettel-Upload-Modal
 */
function openStudyNotesUpload() {
    const modal = document.getElementById('studyNotesModal');
    const content = document.getElementById('studyNotesContent');

    if (!modal || !content) return;

    content.innerHTML = `
        <div class="study-notes-upload">
            <h2>📚 Lernzettel hochladen</h2>
            <p>Lade deine Lernzettel hoch und lass die KI dir beim Lernen helfen!</p>

            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">📤</div>
                <h3>Lernzettel hochladen</h3>
                <p>Ziehe Bilder hierher oder klicke zum Auswählen</p>

                <input type="file" id="fileInput" accept="image/*" multiple style="display: none;">

                <div class="upload-buttons">
                    <button class="btn btn-primary" onclick="document.getElementById('fileInput').click()">
                        📁 Von Gerät wählen
                    </button>
                    <button class="btn btn-secondary" onclick="openCameraCapture()">
                        📷 Foto aufnehmen
                    </button>
                </div>
            </div>

            <div id="uploadedNotesList" class="uploaded-notes-list" style="display: none;">
                <h3>Hochgeladene Lernzettel</h3>
                <div id="notesPreview"></div>
            </div>
        </div>
    `;

    // Event Listeners
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');

    fileInput.addEventListener('change', handleFileSelect);

    // Drag & Drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    modal.style.display = 'block';
}

/**
 * Behandelt File-Auswahl
 */
function handleFileSelect(event) {
    const files = event.target.files;
    processFiles(files);
}

/**
 * Drag Over Handler
 */
function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add('drag-over');
}

/**
 * Drag Leave Handler
 */
function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('drag-over');
}

/**
 * Drop Handler
 */
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('drag-over');

    const files = event.dataTransfer.files;
    processFiles(files);
}

/**
 * Verarbeitet ausgewählte Dateien
 */
function processFiles(files) {
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            showToast('Bitte nur Bilder hochladen!', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const note = {
                id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                fileName: file.name,
                dataUrl: e.target.result,
                uploadedAt: new Date().toISOString(),
                processed: false,
                extractedText: null,
                generatedContent: {}
            };

            uploadedStudyNotes.push(note);
            displayUploadedNotes();
            showToast(`${file.name} hochgeladen!`, 'success');
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Öffnet Kamera für Foto-Aufnahme (Mobile)
 */
function openCameraCapture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Rückkamera bevorzugen

    input.onchange = (e) => {
        processFiles(e.target.files);
    };

    input.click();
}

/**
 * Zeigt hochgeladene Notizen
 */
function displayUploadedNotes() {
    const listDiv = document.getElementById('uploadedNotesList');
    const previewDiv = document.getElementById('notesPreview');

    if (!listDiv || !previewDiv) return;

    if (uploadedStudyNotes.length === 0) {
        listDiv.style.display = 'none';
        return;
    }

    listDiv.style.display = 'block';

    previewDiv.innerHTML = uploadedStudyNotes.map(note => `
        <div class="note-preview-card" data-note-id="${note.id}">
            <img src="${note.dataUrl}" alt="${note.fileName}">
            <div class="note-preview-info">
                <p class="note-filename">${note.fileName}</p>
                ${note.processed ?
                    '<span class="note-status processed">✓ Verarbeitet</span>' :
                    '<span class="note-status pending">⏳ Bereit</span>'
                }
            </div>
            <div class="note-preview-actions">
                <button class="btn btn-small btn-primary" onclick="processStudyNote('${note.id}')">
                    ${note.processed ? 'Erneut verarbeiten' : 'Verarbeiten'}
                </button>
                <button class="btn btn-small btn-danger" onclick="removeStudyNote('${note.id}')">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Entfernt eine Notiz
 */
function removeStudyNote(noteId) {
    uploadedStudyNotes = uploadedStudyNotes.filter(n => n.id !== noteId);
    displayUploadedNotes();
    showToast('Lernzettel entfernt', 'info');
}

// ========================================
// 2. KI-VERARBEITUNG
// ========================================

/**
 * Verarbeitet Lernzettel mit KI
 */
async function processStudyNote(noteId) {
    const note = uploadedStudyNotes.find(n => n.id === noteId);
    if (!note) return;

    currentProcessingNote = note;

    const apiKey = localStorage.getItem('histolearn_apiKey');

    if (!apiKey || (!apiKey.startsWith('sk-') && !apiKey.startsWith('AIza'))) {
        showToast('Bitte API-Key in den Einstellungen hinterlegen!', 'error');
        return;
    }

    // Zeige Processing UI
    showProcessingUI(note);

    try {
        // Extrahiere Text mit Vision API
        const extractedText = await extractTextFromImage(note.dataUrl, apiKey);

        if (!extractedText || extractedText.trim().length < 10) {
            throw new Error('Kein Text erkannt. Bitte ein deutlicheres Foto hochladen.');
        }

        note.extractedText = extractedText;
        note.processed = true;

        showToast('Text erfolgreich erkannt!', 'success');

        // Zeige Generierungs-Optionen
        showGenerationOptions(note);

    } catch (error) {
        console.error('Processing error:', error);
        showToast(`Fehler: ${error.message}`, 'error');
    }
}

/**
 * Extrahiert Text aus Bild mit Vision API
 */
async function extractTextFromImage(dataUrl, apiKey) {
    // Konvertiere dataUrl zu base64 ohne prefix
    const base64Data = dataUrl.split(',')[1];

    if (apiKey.startsWith('sk-')) {
        // Claude Vision API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 2000,
                messages: [{
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: 'image/jpeg',
                                data: base64Data
                            }
                        },
                        {
                            type: 'text',
                            text: 'Extrahiere den gesamten Text aus diesem Lernzettel. Gib nur den reinen Text zurück, keine Erklärungen oder Formatierungen.'
                        }
                    ]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message || 'API-Fehler');
        }

        if (data.content && data.content[0]) {
            return data.content[0].text;
        }

    } else if (apiKey.startsWith('AIza')) {
        // Gemini Vision API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            inline_data: {
                                mime_type: 'image/jpeg',
                                data: base64Data
                            }
                        },
                        {
                            text: 'Extrahiere den gesamten Text aus diesem Lernzettel. Gib nur den reinen Text zurück, keine Erklärungen oder Formatierungen.'
                        }
                    ]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message || 'API-Fehler');
        }

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        }
    }

    throw new Error('Keine gültige API-Antwort');
}

/**
 * Zeigt Processing UI
 */
function showProcessingUI(note) {
    const content = document.getElementById('studyNotesContent');
    if (!content) return;

    content.innerHTML = `
        <div class="processing-ui">
            <h2>🔄 Verarbeite Lernzettel...</h2>
            <div class="processing-image">
                <img src="${note.dataUrl}" alt="${note.fileName}">
            </div>
            <div class="processing-status">
                <div class="spinner"></div>
                <p>Text wird erkannt...</p>
            </div>
        </div>
    `;
}

/**
 * Zeigt Generierungs-Optionen
 */
function showGenerationOptions(note) {
    const content = document.getElementById('studyNotesContent');
    if (!content) return;

    content.innerHTML = `
        <div class="generation-options">
            <h2>✨ Was möchtest du erstellen?</h2>

            <div class="extracted-text-preview">
                <h3>Erkannter Text:</h3>
                <div class="text-preview-box">
                    ${note.extractedText.substring(0, 300)}${note.extractedText.length > 300 ? '...' : ''}
                </div>
                <button class="btn btn-small" onclick="showFullText('${note.id}')">
                    Vollständigen Text anzeigen
                </button>
            </div>

            <div class="generation-option-cards">
                <label class="option-card">
                    <input type="checkbox" id="opt-mindmap" value="mindmap">
                    <div class="option-card-content">
                        <div class="option-icon">🗺️</div>
                        <h4>Mindmap</h4>
                        <p>Übersichtliche Mindmap mit Hauptthemen und Unterpunkten</p>
                    </div>
                </label>

                <label class="option-card">
                    <input type="checkbox" id="opt-diagram" value="diagram">
                    <div class="option-card-content">
                        <div class="option-icon">📊</div>
                        <h4>Schaubild</h4>
                        <p>Visuelles Diagramm mit Zusammenhängen und Strukturen</p>
                    </div>
                </label>

                <label class="option-card">
                    <input type="checkbox" id="opt-flashcards" value="flashcards">
                    <div class="option-card-content">
                        <div class="option-icon">🗃️</div>
                        <h4>Karteikarten</h4>
                        <p>Lernkarten mit Fragen und Antworten</p>
                    </div>
                </label>

                <label class="option-card">
                    <input type="checkbox" id="opt-exercises" value="exercises">
                    <div class="option-card-content">
                        <div class="option-icon">🎯</div>
                        <h4>Übungen</h4>
                        <p>Praxisaufgaben zum Üben und Vertiefen</p>
                    </div>
                </label>
            </div>

            <div class="generation-actions">
                <button class="btn btn-primary" onclick="generateSelectedContent('${note.id}')">
                    Ausgewählte Inhalte generieren
                </button>
                <button class="btn btn-secondary" onclick="openStudyNotesUpload()">
                    Zurück zur Übersicht
                </button>
            </div>
        </div>
    `;
}

/**
 * Zeigt vollständigen Text
 */
function showFullText(noteId) {
    const note = uploadedStudyNotes.find(n => n.id === noteId);
    if (!note) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
            <h3>Vollständiger Text</h3>
            <div class="full-text-display">
                ${note.extractedText.replace(/\n/g, '<br>')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// ========================================
// 3. CONTENT GENERATION
// ========================================

/**
 * Generiert ausgewählte Inhalte
 */
async function generateSelectedContent(noteId) {
    const note = uploadedStudyNotes.find(n => n.id === noteId);
    if (!note) return;

    const selectedOptions = [];
    if (document.getElementById('opt-mindmap')?.checked) selectedOptions.push('mindmap');
    if (document.getElementById('opt-diagram')?.checked) selectedOptions.push('diagram');
    if (document.getElementById('opt-flashcards')?.checked) selectedOptions.push('flashcards');
    if (document.getElementById('opt-exercises')?.checked) selectedOptions.push('exercises');

    if (selectedOptions.length === 0) {
        showToast('Bitte wähle mindestens eine Option!', 'error');
        return;
    }

    // Zeige Loading
    showGenerationLoading(selectedOptions);

    const apiKey = localStorage.getItem('histolearn_apiKey');

    try {
        for (const option of selectedOptions) {
            let content;

            switch (option) {
                case 'mindmap':
                    content = await generateMindmap(note.extractedText, apiKey);
                    break;
                case 'diagram':
                    content = await generateDiagram(note.extractedText, apiKey);
                    break;
                case 'flashcards':
                    content = await generateFlashcards(note.extractedText, apiKey);
                    break;
                case 'exercises':
                    content = await generateExercises(note.extractedText, apiKey);
                    break;
            }

            note.generatedContent[option] = content;
        }

        // Zeige Ergebnisse
        displayGeneratedContent(note, selectedOptions);

        // Rewards
        addCoins(5, 'Lernmaterialien generiert');
        addXP(20);

    } catch (error) {
        console.error('Generation error:', error);
        showToast(`Fehler: ${error.message}`, 'error');
    }
}

/**
 * Zeigt Generation Loading
 */
function showGenerationLoading(options) {
    const content = document.getElementById('studyNotesContent');
    if (!content) return;

    content.innerHTML = `
        <div class="generation-loading">
            <h2>✨ Generiere Inhalte...</h2>
            <div class="spinner-large"></div>
            <p>Erstelle ${options.length} Lernmaterialien...</p>
            <ul class="generation-progress">
                ${options.map(opt => `<li id="progress-${opt}">⏳ ${getOptionName(opt)}</li>`).join('')}
            </ul>
        </div>
    `;
}

/**
 * Gibt Options-Namen zurück
 */
function getOptionName(option) {
    const names = {
        mindmap: 'Mindmap',
        diagram: 'Schaubild',
        flashcards: 'Karteikarten',
        exercises: 'Übungen'
    };
    return names[option] || option;
}

/**
 * Generiert Mindmap
 */
async function generateMindmap(text, apiKey) {
    const prompt = `Erstelle eine Mindmap aus folgendem Lernzettel-Text:

${text}

Format als strukturierte hierarchische Liste:
- Hauptthema
  - Unterthema 1
    - Detail 1
    - Detail 2
  - Unterthema 2
    - Detail 1

Nur die Struktur ausgeben, keine Erklärungen.`;

    return await callAIForGeneration(prompt, apiKey);
}

/**
 * Generiert Schaubild
 */
async function generateDiagram(text, apiKey) {
    const prompt = `Erstelle ein Schaubild/Diagramm aus folgendem Lernzettel-Text:

${text}

Beschreibe das Schaubild als strukturierte Text-Darstellung mit:
- Zentrale Elemente
- Verbindungen zwischen Elementen
- Beschriftungen und Pfeile

Format:
[Element A] → [Element B]: Beziehung
[Element C] ← [Element D]: Beziehung

Nur die Struktur ausgeben.`;

    return await callAIForGeneration(prompt, apiKey);
}

/**
 * Generiert Karteikarten
 */
async function generateFlashcards(text, apiKey) {
    const prompt = `Erstelle Karteikarten aus folgendem Lernzettel-Text:

${text}

Format:
FRAGE: [Frage]
ANTWORT: [Antwort]

FRAGE: [Frage]
ANTWORT: [Antwort]

Erstelle mindestens 10 Karteikarten. Nur Fragen und Antworten, keine zusätzlichen Erklärungen.`;

    return await callAIForGeneration(prompt, apiKey);
}

/**
 * Generiert Übungen
 */
async function generateExercises(text, apiKey) {
    const prompt = `Erstelle Übungsaufgaben aus folgendem Lernzettel-Text:

${text}

Erstelle verschiedene Aufgabentypen:
1. Multiple-Choice Fragen (mit 4 Optionen, richtige Antwort markiert)
2. Lückentext
3. Offene Fragen

Format:
AUFGABE 1 (Multiple Choice):
Frage: [Frage]
A) [Option]
B) [Option]
C) [Option] ✓
D) [Option]

AUFGABE 2 (Lückentext):
[Text mit _____ für Lücken]
Lösung: [Wörter]

AUFGABE 3 (Offene Frage):
Frage: [Frage]
Erwartete Antwort: [Stichpunkte]

Erstelle mindestens 5 Aufgaben.`;

    return await callAIForGeneration(prompt, apiKey);
}

/**
 * Ruft KI für Generation auf
 */
async function callAIForGeneration(prompt, apiKey) {
    if (apiKey.startsWith('sk-')) {
        // Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 2000,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.content[0].text;

    } else if (apiKey.startsWith('AIza')) {
        // Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.candidates[0].content.parts[0].text;
    }
}

// ========================================
// 4. DISPLAY GENERATED CONTENT
// ========================================

/**
 * Zeigt generierte Inhalte
 */
function displayGeneratedContent(note, selectedOptions) {
    const content = document.getElementById('studyNotesContent');
    if (!content) return;

    content.innerHTML = `
        <div class="generated-content-display">
            <h2>✅ Inhalte erfolgreich generiert!</h2>

            <div class="generated-tabs">
                ${selectedOptions.map((opt, idx) => `
                    <button class="tab-btn ${idx === 0 ? 'active' : ''}"
                            onclick="showGeneratedTab('${opt}', '${note.id}')">
                        ${getOptionIcon(opt)} ${getOptionName(opt)}
                    </button>
                `).join('')}
            </div>

            <div class="generated-content-area" id="generatedContentArea">
                ${renderGeneratedContent(note.generatedContent[selectedOptions[0]], selectedOptions[0])}
            </div>

            <div class="generated-actions">
                <button class="btn btn-primary" onclick="downloadGeneratedContent('${note.id}')">
                    💾 Herunterladen
                </button>
                <button class="btn btn-secondary" onclick="openStudyNotesUpload()">
                    Weitere Lernzettel hochladen
                </button>
            </div>
        </div>
    `;

    showToast('Alle Inhalte erfolgreich generiert! 🎉', 'success');
}

/**
 * Gibt Option-Icon zurück
 */
function getOptionIcon(option) {
    const icons = {
        mindmap: '🗺️',
        diagram: '📊',
        flashcards: '🗃️',
        exercises: '🎯'
    };
    return icons[option] || '📄';
}

/**
 * Zeigt generierten Tab
 */
function showGeneratedTab(option, noteId) {
    const note = uploadedStudyNotes.find(n => n.id === noteId);
    if (!note) return;

    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Update content
    const contentArea = document.getElementById('generatedContentArea');
    if (contentArea) {
        contentArea.innerHTML = renderGeneratedContent(note.generatedContent[option], option);
    }
}

/**
 * Rendert generierten Content
 */
function renderGeneratedContent(content, type) {
    if (!content) return '<p>Fehler beim Laden des Inhalts</p>';

    switch (type) {
        case 'mindmap':
            return `<div class="mindmap-display">${formatMindmap(content)}</div>`;
        case 'diagram':
            return `<div class="diagram-display"><pre>${content}</pre></div>`;
        case 'flashcards':
            return formatFlashcards(content);
        case 'exercises':
            return `<div class="exercises-display"><pre>${content}</pre></div>`;
        default:
            return `<pre>${content}</pre>`;
    }
}

/**
 * Formatiert Mindmap für Display
 */
function formatMindmap(text) {
    return `<pre class="mindmap-text">${text}</pre>`;
}

/**
 * Formatiert Karteikarten für Display
 */
function formatFlashcards(text) {
    const cards = text.split('\n\n').filter(block => block.includes('FRAGE:'));

    return `
        <div class="flashcards-container">
            ${cards.map((card, idx) => {
                const lines = card.split('\n');
                const question = lines.find(l => l.startsWith('FRAGE:'))?.replace('FRAGE:', '').trim() || '';
                const answer = lines.find(l => l.startsWith('ANTWORT:'))?.replace('ANTWORT:', '').trim() || '';

                return `
                    <div class="flashcard" id="flashcard-${idx}">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <h4>Frage ${idx + 1}</h4>
                                <p>${question}</p>
                                <button class="btn btn-small" onclick="flipCard(${idx})">
                                    Antwort zeigen
                                </button>
                            </div>
                            <div class="flashcard-back" style="display: none;">
                                <h4>Antwort</h4>
                                <p>${answer}</p>
                                <button class="btn btn-small" onclick="flipCard(${idx})">
                                    Frage zeigen
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

/**
 * Flippt Karteikarte
 */
function flipCard(index) {
    const card = document.getElementById(`flashcard-${index}`);
    if (!card) return;

    const front = card.querySelector('.flashcard-front');
    const back = card.querySelector('.flashcard-back');

    if (front.style.display !== 'none') {
        front.style.display = 'none';
        back.style.display = 'block';
    } else {
        front.style.display = 'block';
        back.style.display = 'none';
    }
}

/**
 * Lädt generierten Content herunter
 */
function downloadGeneratedContent(noteId) {
    const note = uploadedStudyNotes.find(n => n.id === noteId);
    if (!note) return;

    let content = `LERNMATERIALIEN - ${note.fileName}\n`;
    content += `Erstellt am: ${new Date().toLocaleString('de-DE')}\n\n`;
    content += `========================================\n\n`;

    Object.keys(note.generatedContent).forEach(type => {
        content += `${getOptionName(type).toUpperCase()}\n`;
        content += `========================================\n`;
        content += note.generatedContent[type];
        content += `\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lernmaterialien_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('Download gestartet!', 'success');
}

/**
 * Schließt Study Notes Modal
 */
function closeStudyNotesModal() {
    const modal = document.getElementById('studyNotesModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
