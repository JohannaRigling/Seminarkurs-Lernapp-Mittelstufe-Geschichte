// ========================================
// ERWEITERTE ÜBUNGEN-INTEGRATION
// ========================================

// Globale Variablen für Karteikarten
let currentExerciseIndex = 0;
let currentTopicName = '';

// Themenbasierte Übungen anzeigen
function showTopicExercises(topic) {
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    // Mapping für alternative Topic-Namen
    const topicMapping = {
        'tuerkei': 'tuerkei-osmanisches-reich'
    };

    // Verwende Mapping falls vorhanden
    const mappedTopic = topicMapping[topic] || topic;

    // Lade Übungen für das Thema
    let exercises = [];

    // Prüfe alle Exercise-Dateien
    if (typeof TOPIC_EXERCISES !== 'undefined' && TOPIC_EXERCISES[mappedTopic]) {
        exercises = TOPIC_EXERCISES[mappedTopic];
    }
    if (typeof TOPIC_EXERCISES_PART2 !== 'undefined' && TOPIC_EXERCISES_PART2[mappedTopic]) {
        exercises = TOPIC_EXERCISES_PART2[mappedTopic];
    }
    if (typeof TOPIC_EXERCISES_PART3 !== 'undefined' && TOPIC_EXERCISES_PART3[mappedTopic]) {
        exercises = TOPIC_EXERCISES_PART3[mappedTopic];
    }
    if (typeof TOPIC_EXERCISES_COMPLETE !== 'undefined' && TOPIC_EXERCISES_COMPLETE[mappedTopic]) {
        exercises = TOPIC_EXERCISES_COMPLETE[mappedTopic];
    }
    if (typeof TOPIC_EXERCISES_FINAL !== 'undefined' && TOPIC_EXERCISES_FINAL[mappedTopic]) {
        exercises = TOPIC_EXERCISES_FINAL[mappedTopic];
    }

    if (exercises.length === 0) {
        showToast('Keine Übungen für dieses Thema gefunden', 'info');
        return;
    }

    // Filtere nach AFB
    const afb1 = exercises.filter(ex => ex.afb === 1);
    const afb2 = exercises.filter(ex => ex.afb === 2);
    const afb3 = exercises.filter(ex => ex.afb === 3);

    currentTopicName = getTopicName(topic);
    window.currentTopicExercises = exercises;
    window.currentFilteredExercises = exercises;
    currentExerciseIndex = 0;

    content.innerHTML = `
        <div class="topic-exercises">
            <div class="exercise-header-section">
                <h2>Übungen: ${currentTopicName}</h2>
                <p class="subtitle">${exercises.length} Übungen zu diesem Thema</p>

                <div class="exercise-filters">
                    <button class="filter-btn active" onclick="filterExercisesByAFB('all', '${topic}')">Alle (${exercises.length})</button>
                    <button class="filter-btn" onclick="filterExercisesByAFB('afb1', '${topic}')">AFB I (${afb1.length})</button>
                    <button class="filter-btn" onclick="filterExercisesByAFB('afb2', '${topic}')">AFB II (${afb2.length})</button>
                    <button class="filter-btn" onclick="filterExercisesByAFB('afb3', '${topic}')">AFB III (${afb3.length})</button>
                </div>
            </div>

            <div id="exerciseCardContainer" class="exercise-card-container"></div>
        </div>

        <style>
            .topic-exercises {
                padding: 20px;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .exercise-header-section {
                margin-bottom: 20px;
            }
            .subtitle { color: var(--text-secondary); margin-bottom: 20px; }
            .exercise-filters {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }
            .filter-btn {
                padding: 8px 16px;
                border: 2px solid var(--secondary);
                background: transparent;
                color: var(--secondary);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .filter-btn.active {
                background: var(--secondary);
                color: var(--bg-primary);
            }
            .filter-btn:hover {
                transform: translateY(-2px);
            }
            .exercise-card-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                min-height: 400px;
            }
        </style>
    `;

    // Erste Übung anzeigen
    renderExerciseCard();

    // Modal öffnen
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

// Einzelne Übung als Karteikarte rendern
function renderExerciseCard() {
    const container = document.getElementById('exerciseCardContainer');
    if (!container || !window.currentFilteredExercises) return;

    const exercises = window.currentFilteredExercises;
    if (exercises.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Keine Übungen in dieser Kategorie.</p>';
        return;
    }

    const ex = exercises[currentExerciseIndex];
    const isAnswered = ex.answered || false;

    container.innerHTML = `
        <div class="exercise-card" id="current-exercise-card">
            <!-- Fortschrittsanzeige -->
            <div class="exercise-progress">
                <span class="progress-text">Übung ${currentExerciseIndex + 1} von ${exercises.length}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${((currentExerciseIndex + 1) / exercises.length) * 100}%"></div>
                </div>
            </div>

            <!-- Badges -->
            <div class="exercise-badges">
                <span class="badge badge-afb">AFB ${ex.afb}</span>
                <span class="badge badge-operator">${ex.operator}</span>
                <span class="badge badge-points">${ex.points}P</span>
            </div>

            <!-- Frage -->
            <div class="exercise-question">${ex.question}</div>

            <!-- Tipps -->
            <div class="exercise-tips">
                💡 <strong>Tipp:</strong> ${ex.tips}
            </div>

            <!-- Antwort-Eingabe -->
            <div class="exercise-answer-section" id="answer-section-current">
                <textarea
                    id="answer-input-current"
                    class="exercise-answer-input"
                    placeholder="Schreibe hier deine Antwort..."
                    rows="5"
                    ${isAnswered ? 'disabled' : ''}
                >${ex.userAnswer || ''}</textarea>
                <button
                    class="btn btn-primary"
                    onclick="submitCurrentExerciseAnswer()"
                    ${isAnswered ? 'style="display: none;"' : ''}
                >
                    ✓ Antwort überprüfen
                </button>
            </div>

            <!-- Bewertung (wird nach Submit angezeigt) -->
            <div class="exercise-feedback" id="feedback-current" style="${isAnswered && ex.feedback ? 'display: block;' : 'display: none;'}">
                ${isAnswered && ex.feedback ? ex.feedback : ''}
            </div>

            <!-- Musterantwort (wird nach Submit angezeigt) -->
            <div class="exercise-sample-answer" id="sample-current" style="${isAnswered ? 'display: block;' : 'display: none;'}">
                <h4>📝 Musterantwort:</h4>
                <ul>
                    ${Array.isArray(ex.sampleAnswer) ? ex.sampleAnswer.map(point => `<li>${point}</li>`).join('') : `<li>${ex.sampleAnswer}</li>`}
                </ul>
            </div>
        </div>

        <!-- Navigation -->
        <div class="exercise-navigation">
            <button
                class="btn btn-secondary nav-btn"
                onclick="previousExercise()"
                ${currentExerciseIndex === 0 ? 'disabled' : ''}
            >
                ← Zurück
            </button>
            <span class="nav-counter">${currentExerciseIndex + 1} / ${exercises.length}</span>
            <button
                class="btn btn-secondary nav-btn"
                onclick="nextExercise()"
                ${currentExerciseIndex === exercises.length - 1 ? 'disabled' : ''}
            >
                Weiter →
            </button>
        </div>
    `;
}

// Zur nächsten Übung
function nextExercise() {
    if (currentExerciseIndex < window.currentFilteredExercises.length - 1) {
        currentExerciseIndex++;
        renderExerciseCard();
    }
}

// Zur vorherigen Übung
function previousExercise() {
    if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        renderExerciseCard();
    }
}

// Aktuelle Übung (Karteikarte) bewerten
async function submitCurrentExerciseAnswer() {
    const exercise = window.currentFilteredExercises[currentExerciseIndex];
    const answerInput = document.getElementById('answer-input-current');
    const userAnswer = answerInput.value.trim();

    if (!userAnswer) {
        showToast('Bitte gib eine Antwort ein!', 'warning');
        return;
    }

    // Button deaktivieren während Bewertung läuft
    const submitBtn = event.target;
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Wird bewertet...';

    try {
        // KI-Bewertung
        const evaluation = await evaluateAnswer(exercise, userAnswer);

        // Feedback anzeigen
        const feedbackDiv = document.getElementById('feedback-current');
        feedbackDiv.style.display = 'block';
        feedbackDiv.innerHTML = `
            <div class="feedback-header ${evaluation.grade >= 70 ? 'feedback-good' : evaluation.grade >= 50 ? 'feedback-ok' : 'feedback-poor'}">
                <span class="feedback-score">${evaluation.grade}%</span>
                <span class="feedback-label">${evaluation.label}</span>
            </div>
            <div class="feedback-text">
                ${evaluation.feedback}
            </div>
        `;

        // Musterantwort anzeigen
        document.getElementById('sample-current').style.display = 'block';

        // Input deaktivieren
        answerInput.disabled = true;
        submitBtn.style.display = 'none';

        // Speichere Antwort in der Übung
        exercise.answered = true;
        exercise.userAnswer = userAnswer;
        exercise.feedback = feedbackDiv.innerHTML;

        // XP vergeben
        if (currentUser && evaluation.grade >= 50) {
            const xpGain = Math.floor(exercise.points * (evaluation.grade / 100) * 10);
            addXP(xpGain);
            showToast(`+${xpGain} XP verdient!`, 'success');
        }

    } catch (error) {
        showToast('Fehler bei der Bewertung. Versuche es erneut.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = '✓ Antwort überprüfen';
    }
}

// KI-Bewertung der Antwort
async function evaluateAnswer(exercise, userAnswer) {
    // Simulierte KI-Bewertung (später durch echte API ersetzen)
    return new Promise((resolve) => {
        setTimeout(() => {
            // Einfache Bewertungslogik basierend auf Schlüsselwörtern
            const sampleAnswerText = Array.isArray(exercise.sampleAnswer)
                ? exercise.sampleAnswer.join(' ')
                : exercise.sampleAnswer;

            const keywords = sampleAnswerText.toLowerCase().match(/\b\w{4,}\b/g) || [];
            const userWords = userAnswer.toLowerCase();

            let matchCount = 0;
            keywords.forEach(keyword => {
                if (userWords.includes(keyword)) matchCount++;
            });

            const matchPercentage = keywords.length > 0 ? (matchCount / keywords.length) * 100 : 0;
            const lengthScore = Math.min(userAnswer.length / 100, 1) * 30; // Bis zu 30% für Länge
            const grade = Math.min(Math.round(matchPercentage * 0.7 + lengthScore), 100);

            let label, feedback;
            if (grade >= 85) {
                label = '🌟 Hervorragend!';
                feedback = 'Deine Antwort ist sehr gut und deckt die wichtigsten Punkte ab. Du hast das Thema verstanden!';
            } else if (grade >= 70) {
                label = '✅ Gut gemacht!';
                feedback = 'Deine Antwort ist gut, aber es fehlen noch einige Details. Vergleiche mit der Musterantwort.';
            } else if (grade >= 50) {
                label = '👍 Okay';
                feedback = 'Du bist auf dem richtigen Weg, aber deine Antwort könnte ausführlicher sein. Schau dir die Musterantwort an.';
            } else {
                label = '📚 Noch üben';
                feedback = 'Deine Antwort ist noch zu knapp. Versuche, mehr Details einzubauen und orientiere dich an der Musterantwort.';
            }

            resolve({ grade, label, feedback });
        }, 1500);
    });
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

// Beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (typeof TOPIC_EXERCISES !== 'undefined') {
            console.log('✅ Themenübungen geladen');
        }
    }, 1000);
});
