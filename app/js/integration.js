// ========================================
// ERWEITERTE ÜBUNGEN-INTEGRATION
// ========================================

let currentExerciseIndex = 0;
let currentTopicName = '';
let currentTopicKey = '';

// Themenbasierte Übungen als kompakte Karteikarte anzeigen
function showTopicExercises(topic) {
    const topicMapping = { 'tuerkei': 'tuerkei-osmanisches-reich' };
    const mappedTopic = topicMapping[topic] || topic;

    let exercises = [];
    if (typeof TOPIC_EXERCISES !== 'undefined' && TOPIC_EXERCISES[mappedTopic]) exercises = TOPIC_EXERCISES[mappedTopic];
    if (typeof TOPIC_EXERCISES_PART2 !== 'undefined' && TOPIC_EXERCISES_PART2[mappedTopic]) exercises = TOPIC_EXERCISES_PART2[mappedTopic];
    if (typeof TOPIC_EXERCISES_PART3 !== 'undefined' && TOPIC_EXERCISES_PART3[mappedTopic]) exercises = TOPIC_EXERCISES_PART3[mappedTopic];
    if (typeof TOPIC_EXERCISES_COMPLETE !== 'undefined' && TOPIC_EXERCISES_COMPLETE[mappedTopic]) exercises = TOPIC_EXERCISES_COMPLETE[mappedTopic];
    if (typeof TOPIC_EXERCISES_FINAL !== 'undefined' && TOPIC_EXERCISES_FINAL[mappedTopic]) exercises = TOPIC_EXERCISES_FINAL[mappedTopic];

    if (exercises.length === 0) {
        showToast('Keine Übungen für dieses Thema gefunden', 'info');
        return;
    }

    const afb1 = exercises.filter(ex => ex.afb === 1);
    const afb2 = exercises.filter(ex => ex.afb === 2);
    const afb3 = exercises.filter(ex => ex.afb === 3);

    currentTopicName = getTopicName(topic);
    currentTopicKey = topic;
    window.currentTopicExercises = exercises;
    window.currentFilteredExercises = exercises;
    currentExerciseIndex = 0;

    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');
    const prog = getTopicProgress(topic);
    const pct = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;

    content.innerHTML = `
        <div class="flashcard-header">
            <div class="flashcard-title">📚 ${currentTopicName}</div>
            <div class="flashcard-filters">
                <button class="filter-btn active" onclick="filterExercisesByAFB('all','${topic}')">Alle&nbsp;(${exercises.length})</button>
                <button class="filter-btn" onclick="filterExercisesByAFB('afb1','${topic}')">AFB&nbsp;I&nbsp;(${afb1.length})</button>
                <button class="filter-btn" onclick="filterExercisesByAFB('afb2','${topic}')">AFB&nbsp;II&nbsp;(${afb2.length})</button>
                <button class="filter-btn" onclick="filterExercisesByAFB('afb3','${topic}')">AFB&nbsp;III&nbsp;(${afb3.length})</button>
            </div>
            <div class="topic-overall-progress">
                <span id="topic-prog-label">Erledigt: ${prog.completed} / ${prog.total}</span>
                <div class="topic-prog-bar"><div class="topic-prog-fill" id="topic-prog-fill" style="width:${pct}%"></div></div>
            </div>
        </div>
        <div id="exerciseCardContainer"></div>
    `;

    renderExerciseCard();
    modal.classList.add('active');
}

// Übungen nach AFB filtern
function filterExercisesByAFB(filter, topic) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (window.currentTopicExercises) {
        let filtered = window.currentTopicExercises;
        if (filter === 'afb1') filtered = window.currentTopicExercises.filter(ex => ex.afb === 1);
        if (filter === 'afb2') filtered = window.currentTopicExercises.filter(ex => ex.afb === 2);
        if (filter === 'afb3') filtered = window.currentTopicExercises.filter(ex => ex.afb === 3);

        window.currentFilteredExercises = filtered;
        currentExerciseIndex = 0;
        renderExerciseCard();
    }
}

// Kompakte Karteikarte rendern
function renderExerciseCard() {
    const container = document.getElementById('exerciseCardContainer');
    if (!container || !window.currentFilteredExercises) return;

    const exercises = window.currentFilteredExercises;
    if (exercises.length === 0) {
        container.innerHTML = '<p class="no-exercises-msg">Keine Übungen in dieser Kategorie.</p>';
        return;
    }

    const ex = exercises[currentExerciseIndex];
    const isAnswered = ex.answered || false;
    const progress = Math.round(((currentExerciseIndex + 1) / exercises.length) * 100);
    const sampleHtml = Array.isArray(ex.sampleAnswer)
        ? ex.sampleAnswer.map(p => `<li>${p}</li>`).join('')
        : `<li>${ex.sampleAnswer}</li>`;

    const prog = getTopicProgress(currentTopicKey);
    const alreadyDone = prog.completedIds && prog.completedIds.includes(ex.id);

    const grade = ex.grade || 50;
    const feedbackCls = grade >= 70 ? 'feedback-good' : grade >= 50 ? 'feedback-ok' : 'feedback-poor';

    container.innerHTML = `
        <div class="fc-card">
            <div class="fc-progress">
                <span>${currentExerciseIndex + 1} / ${exercises.length}</span>
                <div class="fc-progress-bar"><div class="fc-progress-fill" style="width:${progress}%"></div></div>
                <span class="fc-badges">
                    <span class="badge badge-afb">AFB ${ex.afb}</span>
                    <span class="badge badge-operator">${ex.operator}</span>
                    <span class="badge badge-points">${ex.points}P</span>
                    ${alreadyDone ? '<span class="badge badge-done">✅</span>' : ''}
                </span>
            </div>

            <div class="fc-question">${ex.question}</div>

            <div class="fc-answer-section">
                <textarea
                    id="answer-input-current"
                    class="fc-textarea"
                    placeholder="Schreibe hier deine Antwort..."
                    rows="3"
                    ${isAnswered ? 'disabled' : ''}
                >${ex.userAnswer || ''}</textarea>

                <div class="fc-action-bar">
                    ${!isAnswered ? `<button class="btn btn-primary fc-submit-btn" onclick="submitCurrentExerciseAnswer()">✓ KI-Auswertung</button>` : ''}
                    <label class="btn btn-secondary fc-photo-btn" for="exercisePhotoInput" title="Handschriftliche Antwort als Foto hochladen">
                        📷 Foto
                    </label>
                    <input type="file" id="exercisePhotoInput" accept="image/*" capture="environment" style="display:none" onchange="handleExercisePhotoUpload(event)">
                    <button class="fc-help-btn" onclick="openChatForHelp()">🆘 KI-Hilfe</button>
                </div>

                <div id="photo-preview-area" class="fc-photo-preview" style="display:none">
                    <img id="photo-preview-img" src="" alt="Foto-Vorschau">
                    <div class="fc-photo-actions">
                        <button class="btn btn-primary" onclick="submitPhotoAnswer()">🤖 Foto auswerten</button>
                        <button class="btn btn-secondary" onclick="clearExercisePhoto()">🗑️ Entfernen</button>
                    </div>
                </div>
            </div>

            <div class="fc-feedback ${feedbackCls}" id="feedback-current" style="${isAnswered && ex.feedback ? '' : 'display:none;'}">
                ${isAnswered && ex.feedback ? ex.feedback : ''}
            </div>

            <div class="fc-sample" id="sample-current" style="${isAnswered ? '' : 'display:none;'}">
                <strong>📝 Musterlösung:</strong>
                <ul>${sampleHtml}</ul>
            </div>
        </div>

        <div class="fc-navigation">
            <button class="btn btn-secondary" onclick="previousExercise()" ${currentExerciseIndex === 0 ? 'disabled' : ''}>← Zurück</button>
            <span class="fc-nav-counter">${currentExerciseIndex + 1} / ${exercises.length}</span>
            <button class="btn btn-secondary" onclick="nextExercise()" ${currentExerciseIndex === exercises.length - 1 ? 'disabled' : ''}>Weiter →</button>
        </div>
    `;
}

// Foto hochladen
function handleExercisePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
        showToast('Bild zu groß (max. 15 MB)', 'warning');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        window._exercisePhotoData = e.target.result;
        window._exercisePhotoMediaType = file.type || 'image/jpeg';

        const preview = document.getElementById('photo-preview-area');
        const img = document.getElementById('photo-preview-img');
        if (preview && img) {
            img.src = e.target.result;
            preview.style.display = 'flex';
        }

        // Textarea ausblenden wenn Foto vorhanden
        const textarea = document.getElementById('answer-input-current');
        if (textarea) textarea.placeholder = 'Antwort wird aus dem Foto gelesen...';
    };
    reader.readAsDataURL(file);
}

function clearExercisePhoto() {
    window._exercisePhotoData = null;
    const preview = document.getElementById('photo-preview-area');
    if (preview) preview.style.display = 'none';
    const input = document.getElementById('exercisePhotoInput');
    if (input) input.value = '';
    const textarea = document.getElementById('answer-input-current');
    if (textarea) textarea.placeholder = 'Schreibe hier deine Antwort...';
}

// Foto-Antwort durch KI auswerten
async function submitPhotoAnswer() {
    if (!window._exercisePhotoData) return;

    const exercise = window.currentFilteredExercises[currentExerciseIndex];
    const btn = document.querySelector('.fc-photo-actions .btn-primary');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Wird ausgewertet...'; }

    try {
        const base64 = window._exercisePhotoData.split(',')[1];
        const mediaType = window._exercisePhotoMediaType || 'image/jpeg';

        const apiKey = (typeof HISTOLEARN_CONFIG !== 'undefined' && HISTOLEARN_CONFIG.apiKey)
            ? HISTOLEARN_CONFIG.apiKey
            : localStorage.getItem('histolearn_apiKey');

        if (!apiKey) {
            showToast('Kein API-Key konfiguriert. Bitte in Einstellungen eintragen.', 'error');
            if (btn) { btn.disabled = false; btn.textContent = '🤖 Foto auswerten'; }
            return;
        }

        const sampleText = Array.isArray(exercise.sampleAnswer)
            ? exercise.sampleAnswer.join('; ')
            : exercise.sampleAnswer;

        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 700,
                system: 'Du bist ein Geschichtslehrer der Klassen 8-10. Erkenne handgeschriebene Texte und bewerte sie konstruktiv und motivierend. Antworte immer auf Deutsch.',
                messages: [{
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: { type: 'base64', media_type: mediaType, data: base64 }
                        },
                        {
                            type: 'text',
                            text: `Aufgabe: ${exercise.question}\nOperator: ${exercise.operator} (AFB ${exercise.afb})\nMusterantwort: ${sampleText}\n\nBitte:\n1. Erkenne den handgeschriebenen Text (schreibe: "Dein Text: ...")\n2. Bewerte die Antwort (0–100%) anhand von Operator und Musterantwort\n3. Gib kurzes, motivierendes Feedback\n\nAntworte NUR als JSON: {"transcription": "...", "grade": 75, "label": "Gut gemacht! ✅", "feedback": "Was gut ist: ... Was fehlt: ..."}`
                        }
                    ]
                }]
            })
        });

        const data = await response.json();
        const text = data.content?.[0]?.text || '';

        let result;
        try {
            const match = text.match(/\{[\s\S]*?\}/);
            result = match ? JSON.parse(match[0]) : null;
        } catch(e) { result = null; }

        if (!result) {
            result = { grade: 50, label: '✅ Bewertet', transcription: '(Text erkannt)', feedback: text.substring(0, 300) };
        }

        // Transkription in Textarea übernehmen
        const textarea = document.getElementById('answer-input-current');
        if (textarea) {
            textarea.value = result.transcription || '';
            textarea.disabled = true;
        }

        // Foto-Bereich ausblenden
        const preview = document.getElementById('photo-preview-area');
        if (preview) preview.style.display = 'none';

        // Feedback anzeigen
        const feedbackDiv = document.getElementById('feedback-current');
        if (feedbackDiv) {
            feedbackDiv.style.display = 'block';
            feedbackDiv.innerHTML = buildFeedbackHTML(result);
            const cls = (result.grade || 50) >= 70 ? 'feedback-good' : (result.grade || 50) >= 50 ? 'feedback-ok' : 'feedback-poor';
            feedbackDiv.className = `fc-feedback ${cls}`;
        }

        document.getElementById('sample-current')?.style && (document.getElementById('sample-current').style.display = 'block');
        document.querySelector('.fc-submit-btn')?.style && (document.querySelector('.fc-submit-btn').style.display = 'none');

        exercise.answered = true;
        exercise.userAnswer = result.transcription || '';
        exercise.grade = result.grade || 50;
        exercise.feedback = feedbackDiv?.innerHTML || '';

        saveExerciseProgress(exercise, result.grade || 50);

        if (currentUser && (result.grade || 0) >= 50) {
            const xpGain = Math.floor(exercise.points * ((result.grade || 50) / 100) * 10);
            addXP(xpGain);
            addCoins(Math.floor(xpGain / 5), 'Übung abgeschlossen');
        }

    } catch(error) {
        console.error('Photo evaluation error:', error);
        showToast('Fehler beim Auswerten des Fotos. Versuche es erneut.', 'error');
        if (btn) { btn.disabled = false; btn.textContent = '🤖 Foto auswerten'; }
    }
}

// Navigation
function nextExercise() {
    if (currentExerciseIndex < window.currentFilteredExercises.length - 1) {
        currentExerciseIndex++;
        renderExerciseCard();
    }
}

function previousExercise() {
    if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        renderExerciseCard();
    }
}

// ===== FORTSCHRITTSTRACKING =====

function getTopicProgress(topic) {
    if (!currentUser) return { completed: 0, total: 20, scores: [], completedIds: [] };
    if (!currentUser.progress.topicProgress) currentUser.progress.topicProgress = {};

    const mapped = topic === 'tuerkei' ? 'tuerkei-osmanisches-reich' : topic;
    let exercises = [];
    if (typeof TOPIC_EXERCISES !== 'undefined' && TOPIC_EXERCISES[mapped]) exercises = TOPIC_EXERCISES[mapped];
    else if (typeof TOPIC_EXERCISES_PART2 !== 'undefined' && TOPIC_EXERCISES_PART2[mapped]) exercises = TOPIC_EXERCISES_PART2[mapped];
    else if (typeof TOPIC_EXERCISES_PART3 !== 'undefined' && TOPIC_EXERCISES_PART3[mapped]) exercises = TOPIC_EXERCISES_PART3[mapped];
    else if (typeof TOPIC_EXERCISES_COMPLETE !== 'undefined' && TOPIC_EXERCISES_COMPLETE[mapped]) exercises = TOPIC_EXERCISES_COMPLETE[mapped];
    else if (typeof TOPIC_EXERCISES_FINAL !== 'undefined' && TOPIC_EXERCISES_FINAL[mapped]) exercises = TOPIC_EXERCISES_FINAL[mapped];

    if (!currentUser.progress.topicProgress[topic]) {
        currentUser.progress.topicProgress[topic] = {
            completed: 0,
            total: exercises.length || 20,
            scores: [],
            completedIds: []
        };
    }
    return currentUser.progress.topicProgress[topic];
}

function saveExerciseProgress(exercise, grade) {
    if (!currentUser || !currentTopicKey) return;
    const prog = getTopicProgress(currentTopicKey);

    if (!prog.completedIds.includes(exercise.id)) {
        prog.completedIds.push(exercise.id);
        prog.completed = prog.completedIds.length;
        prog.scores.push(grade);
    }

    updateUserProgress({ topicProgress: currentUser.progress.topicProgress });
    updateTopicCardProgress(currentTopicKey);

    const fill = document.getElementById('topic-prog-fill');
    const label = document.getElementById('topic-prog-label');
    if (fill) fill.style.width = Math.round((prog.completed / prog.total) * 100) + '%';
    if (label) label.textContent = `Erledigt: ${prog.completed} / ${prog.total}`;
}

function updateTopicCardProgress(topic) {
    const card = document.querySelector(`.topic-card[data-topic="${topic}"]`);
    if (!card) return;
    const prog = getTopicProgress(topic);
    const pct = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;
    const avgScore = prog.scores.length > 0
        ? Math.round(prog.scores.reduce((a, b) => a + b, 0) / prog.scores.length)
        : 0;

    let progEl = card.querySelector('.topic-card-progress');
    if (!progEl) {
        progEl = document.createElement('div');
        progEl.className = 'topic-card-progress';
        card.appendChild(progEl);
    }
    progEl.innerHTML = `
        <div class="tcp-bar"><div class="tcp-fill" style="width:${pct}%"></div></div>
        <span>${prog.completed}/${prog.total}${avgScore > 0 ? ' · ⌀' + avgScore + '%' : ''}</span>
    `;
}

function updateAllTopicCardProgress() {
    if (!currentUser) return;
    document.querySelectorAll('.topic-card[data-topic]').forEach(card => {
        updateTopicCardProgress(card.dataset.topic);
    });
}

// ===== KI-BEWERTUNG (Text) =====

async function submitCurrentExerciseAnswer() {
    const exercise = window.currentFilteredExercises[currentExerciseIndex];
    const answerInput = document.getElementById('answer-input-current');
    const userAnswer = answerInput.value.trim();

    if (!userAnswer) {
        showToast('Bitte gib eine Antwort ein!', 'warning');
        return;
    }

    const submitBtn = document.querySelector('.fc-submit-btn');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '⏳ KI bewertet...'; }

    try {
        const evaluation = await evaluateAnswer(exercise, userAnswer);

        const feedbackDiv = document.getElementById('feedback-current');
        feedbackDiv.style.display = 'block';
        feedbackDiv.innerHTML = buildFeedbackHTML(evaluation);

        const cls = (evaluation.grade || 50) >= 70 ? 'feedback-good' : (evaluation.grade || 50) >= 50 ? 'feedback-ok' : 'feedback-poor';
        feedbackDiv.className = `fc-feedback ${cls}`;

        document.getElementById('sample-current').style.display = 'block';
        answerInput.disabled = true;
        if (submitBtn) submitBtn.style.display = 'none';

        exercise.answered = true;
        exercise.userAnswer = userAnswer;
        exercise.grade = evaluation.grade || 50;
        exercise.feedback = feedbackDiv.innerHTML;

        saveExerciseProgress(exercise, evaluation.grade);

        if (currentUser && evaluation.grade >= 50) {
            const xpGain = Math.floor(exercise.points * (evaluation.grade / 100) * 10);
            addXP(xpGain);
            addCoins(Math.floor(xpGain / 5), 'Übung abgeschlossen');
        }

    } catch (error) {
        console.error('Evaluation error:', error);
        showToast('Fehler bei der Bewertung. Versuche es erneut.', 'error');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = '✓ KI-Auswertung'; }
    }
}

function buildFeedbackHTML(evaluation) {
    const grade = evaluation.grade || 50;
    const cls = grade >= 70 ? 'feedback-good' : grade >= 50 ? 'feedback-ok' : 'feedback-poor';
    const icon = grade >= 70 ? '🌟' : grade >= 50 ? '👍' : '📚';
    return `
        <div class="feedback-header-premium">
            <div class="feedback-score-badge">
                <span class="feedback-score-number">${grade}%</span>
            </div>
            <div class="feedback-status">
                <span class="feedback-status-icon">${icon}</span>
                <span class="feedback-status-label">${evaluation.label || ''}</span>
            </div>
        </div>
        <div class="feedback-body">
            <h4>Feedback des KI-Tutors:</h4>
            <p class="feedback-text-premium">${evaluation.feedback || ''}</p>
        </div>
    `;
}

async function evaluateAnswer(exercise, userAnswer) {
    const apiKey = (typeof HISTOLEARN_CONFIG !== 'undefined' && HISTOLEARN_CONFIG.apiKey)
        ? HISTOLEARN_CONFIG.apiKey
        : localStorage.getItem('histolearn_apiKey');

    if (!apiKey) return simulatedEvaluate(exercise, userAnswer);

    const sampleText = Array.isArray(exercise.sampleAnswer)
        ? exercise.sampleAnswer.join('; ')
        : exercise.sampleAnswer;

    const prompt = `Du bewertest die Antwort eines Geschichtsschülers (Klasse 8-10).

Aufgabe: ${exercise.question}
Operator: ${exercise.operator} (AFB ${exercise.afb})
Musterantwort: ${sampleText}
Schülerantwort: ${userAnswer}

WICHTIGE BEWERTUNGSRICHTLINIEN:
- Nimm die Musterantwort nicht als starre Wort-für-Wort-Vorgabe.
- Akzeptiere synonyme Begriffe und inhaltlich gleichwertige Konzepte voll als richtig (Beispiel: "Adel, Klerus und Bauern" ist absolut gleichwertig mit "Geistliche, Adel und Bürgertum/Dritter Stand").
- Sei nicht übermäßig pedantisch. Wenn der Schüler den historischen Kern des Themas richtig erfasst hat, bewerte dies sehr großzügig.
- Achte auf das Niveau eines 8.-10. Klässlers.

Bewerte auf einer Skala von 0–100 und erkläre kurz was gut ist und was fehlt. Sei motivierend.

Antworte NUR als JSON: {"grade": 75, "label": "Gut gemacht! ✅", "feedback": "Was gut ist: ... Was noch fehlt: ..."}`;

    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 400,
            system: 'Du bist ein Geschichtslehrer. Bewerte sachlich, kurz und motivierend auf Deutsch.',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    try {
        const match = text.match(/\{[\s\S]*?\}/);
        if (match) return JSON.parse(match[0]);
    } catch(e) {}

    return { grade: 60, label: '✅ Bewertet', feedback: text.substring(0, 300) };
}

function simulatedEvaluate(exercise, userAnswer) {
    const sampleText = Array.isArray(exercise.sampleAnswer)
        ? exercise.sampleAnswer.join(' ') : exercise.sampleAnswer;
    const userLower = userAnswer.toLowerCase();

    // Define synonym clusters for common historical terms to allow generous matches
    const synonyms = {
        'klerus': ['geistlich', 'kirche', 'klerus', 'priester', 'bischof'],
        'adel': ['adel', 'adlig', 'fürst', 'graf', 'ritter'],
        'bauer': ['bauer', 'bürger', 'dritter stand', 'bauern'],
        'bürger': ['bürger', 'dritter stand', 'bauern', 'bevölkerung'],
        'geistliche': ['geistlich', 'kirche', 'klerus', 'priester'],
        'dampfmaschine': ['dampfmaschine', 'watt', 'antrieb'],
        'eisenbahn': ['eisenbahn', 'zug', 'schienen', 'lokomotive'],
        'webstuhl': ['webstuhl', 'jenny', 'spinn', 'textil'],
        'revolution': ['revolution', 'sturm', 'aufstand', 'rebell', 'umsturz'],
        'verfassung': ['verfassung', 'gesetz', 'grundrecht', 'recht']
    };

    const rawKeywords = sampleText.toLowerCase().match(/\b[a-zäöüß]{5,}\b/g) || [];
    const keywords = [...new Set(rawKeywords)];

    let matchCount = 0;
    keywords.forEach(kw => {
        if (userLower.includes(kw)) {
            matchCount++;
            return;
        }
        for (const [key, list] of Object.entries(synonyms)) {
            if (kw.includes(key) || key.includes(kw)) {
                if (list.some(syn => userLower.includes(syn))) {
                    matchCount++;
                    return;
                }
            }
        }
    });

    const matchPct = keywords.length > 0 ? (matchCount / keywords.length) * 100 : 0;
    const lengthScore = Math.min(userLower.length / 80, 1) * 35;
    const bonus = matchCount > 0 ? 15 : 0;
    let grade = Math.min(Math.round(matchPct * 0.6 + lengthScore + bonus), 100);

    if (userLower.length > 15 && grade < 50) {
        grade = 50;
    }

    if (grade >= 80) return { grade, label: '🌟 Hervorragend!', feedback: 'Sehr vollständige und inhaltlich korrekte Antwort! Du hast das Thema verstanden.' };
    if (grade >= 65) return { grade, label: '✅ Gut gemacht!', feedback: 'Gute Antwort – die wichtigsten historischen Kernpunkte wurden richtig erfasst.' };
    if (grade >= 50) return { grade, label: '👍 Bestanden', feedback: 'Auf dem richtigen Weg! Du hast die Grundlagen verstanden. Schau dir die Musterantwort für weitere Details an.' };
    return { grade, label: '📚 Noch üben', feedback: 'Versuche noch etwas mehr Details oder Fachbegriffe einzubauen. Die Musterantwort zeigt dir, was wichtig ist.' };
}

// Themenname ermitteln
function getTopicName(topic) {
    const names = {
        'französische-revolution': 'Französische Revolution',
        'industrialisierung': 'Industrialisierung',
        'imperialismus': 'Imperialismus',
        'erster-weltkrieg': 'Erster Weltkrieg',
        'weimarer-republik': 'Weimarer Republik',
        'revolution-1848': 'Revolution 1848',
        'nationalsozialismus': 'Nationalsozialismus',
        'zweiter-weltkrieg': 'Zweiter Weltkrieg',
        'holocaust': 'Holocaust',
        'brd-ddr': 'BRD und DDR',
        'kalter-krieg': 'Kalter Krieg',
        'wiedervereinigung': 'Wiedervereinigung',
        'russland': 'Russland',
        'china': 'China',
        'tuerkei': 'Türkei / Osmanisches Reich',
        'tuerkei-osmanisches-reich': 'Türkei / Osmanisches Reich',
        'europaeische-union': 'Europäische Union'
    };
    return names[topic] || topic;
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateAllTopicCardProgress();
    }, 1200);
});
