// ===== ÜBUNGEN & QUIZ SYSTEM =====

let currentQuiz = null;
let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswered = false;

// Quiz starten
function startQuiz(topicId) {
    const topic = QUIZ_TOPICS.find(t => t.id === topicId);
    if (!topic) {
        showToast('Quiz nicht gefunden.', 'error');
        return;
    }

    currentQuiz = topic;
    currentQuizQuestion = 0;
    quizScore = 0;

    showQuizQuestion();
}

// Quiz-Frage anzeigen
function showQuizQuestion() {
    if (!currentQuiz) return;

    const area = document.getElementById('exerciseArea');
    area.style.display = 'block';

    if (currentQuizQuestion >= currentQuiz.questions.length) {
        showQuizResults();
        return;
    }

    const q = currentQuiz.questions[currentQuizQuestion];
    quizAnswered = false;

    area.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-header">
                <h3>${currentQuiz.icon} ${currentQuiz.name}</h3>
                <div class="quiz-progress">
                    <span>Frage ${currentQuizQuestion + 1} von ${currentQuiz.questions.length}</span>
                    <div class="quiz-progress-bar">
                        <div class="quiz-progress-fill" style="width: ${((currentQuizQuestion + 1) / currentQuiz.questions.length) * 100}%"></div>
                    </div>
                </div>
            </div>

            <div class="quiz-question">${q.question}</div>

            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option" data-index="${i}" onclick="selectQuizAnswer(${i})">
                        <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                        <span class="option-text">${opt}</span>
                    </div>
                `).join('')}
            </div>

            <div class="quiz-explanation" id="quizExplanation" style="display: none;">
                <h4>💡 Erklärung:</h4>
                <p>${q.explanation}</p>
            </div>

            <div class="quiz-actions" id="quizActions" style="display: none;">
                <button class="btn btn-primary" onclick="nextQuizQuestion()">
                    ${currentQuizQuestion < currentQuiz.questions.length - 1 ? 'Nächste Frage →' : 'Ergebnis anzeigen'}
                </button>
            </div>
        </div>
    `;

    // Animation
    area.style.animation = 'none';
    area.offsetHeight; // Reflow
    area.style.animation = 'fadeIn 0.3s ease';
}

// Quiz-Antwort auswählen
function selectQuizAnswer(index) {
    if (quizAnswered || !currentQuiz) return;

    quizAnswered = true;
    const q = currentQuiz.questions[currentQuizQuestion];
    const options = document.querySelectorAll('.quiz-option');

    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === q.correct) {
            opt.classList.add('correct');
        }
        if (i === index && index !== q.correct) {
            opt.classList.add('incorrect');
        }
    });

    if (index === q.correct) {
        quizScore++;
        if (currentUser) {
            currentUser.progress.quizCorrect++;
            // Quiz-Streak erhöhen
            currentUser.progress.quizStreak = (currentUser.progress.quizStreak || 0) + 1;
        }
        // Münze für richtige Antwort
        addCoins(1, 'Quiz-Frage richtig');

        // Sound für richtige Antwort
        if (typeof playSound === 'function') {
            playSound('correct');
        }
    } else {
        // Quiz-Streak zurücksetzen
        if (currentUser) {
            currentUser.progress.quizStreak = 0;
        }

        // Sound für falsche Antwort
        if (typeof playSound === 'function') {
            playSound('wrong');
        }
    }

    // Erklärung und Weiter-Button anzeigen
    document.getElementById('quizExplanation').style.display = 'block';
    document.getElementById('quizActions').style.display = 'flex';
}

// Nächste Quiz-Frage
function nextQuizQuestion() {
    currentQuizQuestion++;
    showQuizQuestion();
}

// Quiz-Ergebnisse anzeigen
function showQuizResults() {
    const area = document.getElementById('exerciseArea');
    const total = currentQuiz.questions.length;
    const percent = Math.round((quizScore / total) * 100);

    // Zusätzliche Münzen basierend auf Ergebnis
    let bonusCoins = 0;
    if (percent === 100) {
        bonusCoins = 10;
    } else if (percent >= 80) {
        bonusCoins = 5;
    } else if (percent >= 60) {
        bonusCoins = 2;
    }

    let message = '';
    let emoji = '';

    if (percent >= 90) {
        message = 'Ausgezeichnet! Du bist ein echter Geschichtsexperte!';
        emoji = '🏆';
    } else if (percent >= 70) {
        message = 'Gut gemacht! Du kennst dich schon gut aus!';
        emoji = '🎉';
    } else if (percent >= 50) {
        message = 'Nicht schlecht! Mit etwas Übung wirst du noch besser!';
        emoji = '👍';
    } else {
        message = 'Weiter üben! Geschichte ist spannend, wenn man dranbleibt!';
        emoji = '📚';
    }

    area.innerHTML = `
        <div class="quiz-result">
            <div class="result-emoji">${emoji}</div>
            <h2>${currentQuiz.name} - Ergebnis</h2>

            <div class="result-score">
                <div class="score-circle">
                    <span class="score-value">${quizScore}/${total}</span>
                    <span class="score-percent">${percent}%</span>
                </div>
            </div>

            <p class="result-message">${message}</p>

            <div class="result-rewards">
                <div class="reward">
                    <span class="reward-icon">🐄</span>
                    <span class="reward-value">+${quizScore + bonusCoins}</span>
                    <span class="reward-label">Münzen</span>
                </div>
                <div class="reward">
                    <span class="reward-icon">⭐</span>
                    <span class="reward-value">+${quizScore * 5}</span>
                    <span class="reward-label">XP</span>
                </div>
            </div>

            <div class="result-actions">
                <button class="btn btn-primary" onclick="startQuiz('${currentQuiz.id}')">🔄 Nochmal spielen</button>
                <button class="btn btn-secondary" onclick="hideExerciseArea()">Zurück zur Übersicht</button>
            </div>
        </div>
    `;

    // Belohnungen
    if (bonusCoins > 0) {
        addCoins(bonusCoins, `Quiz-Bonus (${percent}%)`);
    }
    addXP(quizScore * 5);

    // Statistik
    if (currentUser) {
        currentUser.progress.exercisesDone++;

        // Perfektes Quiz tracken
        if (percent === 100) {
            currentUser.progress.perfectQuizzes = (currentUser.progress.perfectQuizzes || 0) + 1;
        }

        updateUserProgress({
            exercisesDone: currentUser.progress.exercisesDone,
            quizCorrect: currentUser.progress.quizCorrect,
            perfectQuizzes: currentUser.progress.perfectQuizzes
        });
    }

    addActivity('quiz', `${currentQuiz.name} Quiz: ${quizScore}/${total}`);

    // Thema als abgeschlossen markieren (wenn >= 80%)
    if (percent >= 80 && currentUser) {
        if (typeof playSound === 'function') {
            playSound('achievement');
        }
    }

    // Confetti für perfektes Ergebnis
    if (percent === 100 && typeof showConfetti === 'function') {
        showConfetti(100);
    } else if (percent >= 80 && typeof showConfetti === 'function') {
        showConfetti(30);
    }

    // Daily Challenge Progress
    if (typeof updateDailyChallengeProgress === 'function') {
        updateDailyChallengeProgress('quiz', 1);
    }
}

// Übungsbereich ausblenden
function hideExerciseArea() {
    const area = document.getElementById('exerciseArea');
    area.style.display = 'none';
    currentQuiz = null;
}

// CSS für Quiz
const quizStyles = document.createElement('style');
quizStyles.textContent = `
    .quiz-container {
        max-width: 700px;
        margin: 0 auto;
        padding: 20px;
    }
    .quiz-header {
        text-align: center;
        margin-bottom: 30px;
    }
    .quiz-header h3 {
        margin-bottom: 15px;
    }
    .quiz-progress {
        display: flex;
        align-items: center;
        gap: 15px;
        justify-content: center;
    }
    .quiz-progress-bar {
        flex: 1;
        max-width: 300px;
        height: 8px;
        background: var(--bg-tertiary);
        border-radius: 4px;
        overflow: hidden;
    }
    .quiz-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        transition: width 0.3s ease;
    }
    .quiz-question {
        font-size: 1.3em;
        text-align: center;
        margin-bottom: 30px;
        line-height: 1.5;
    }
    .quiz-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .quiz-option {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 18px 20px;
        background: var(--bg-tertiary);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    .quiz-option:hover:not(.disabled) {
        border-color: var(--primary);
        transform: translateX(10px);
        background: var(--bg-secondary);
    }
    .quiz-option.disabled {
        cursor: default;
    }
    .quiz-option.correct {
        background: #27ae60;
        color: white;
        border-color: #27ae60;
    }
    .quiz-option.incorrect {
        background: #e74c3c;
        color: white;
        border-color: #e74c3c;
    }
    .option-letter {
        width: 35px;
        height: 35px;
        background: var(--primary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }
    .quiz-option.correct .option-letter,
    .quiz-option.incorrect .option-letter {
        background: rgba(255,255,255,0.3);
    }
    .option-text {
        flex: 1;
    }
    .quiz-explanation {
        margin-top: 25px;
        padding: 20px;
        background: linear-gradient(135deg, #e3f2fd, #bbdefb);
        border-radius: 12px;
        border-left: 4px solid var(--primary);
        animation: slideIn 0.3s ease;
    }
    .quiz-explanation h4 {
        margin-bottom: 10px;
        color: var(--primary);
    }
    .quiz-actions {
        margin-top: 25px;
        display: flex;
        justify-content: center;
    }

    /* Quiz Results */
    .quiz-result {
        text-align: center;
        padding: 40px 20px;
    }
    .result-emoji {
        font-size: 5em;
        margin-bottom: 20px;
        animation: bounce 0.5s ease;
    }
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    .result-score {
        margin: 30px 0;
    }
    .score-circle {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        color: white;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
    .score-value {
        font-size: 2em;
        font-weight: bold;
    }
    .score-percent {
        font-size: 1.2em;
        opacity: 0.9;
    }
    .result-message {
        font-size: 1.2em;
        color: var(--text-secondary);
        margin-bottom: 30px;
    }
    .result-rewards {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-bottom: 30px;
    }
    .reward {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }
    .reward-icon {
        font-size: 2em;
    }
    .reward-value {
        font-size: 1.5em;
        font-weight: bold;
        color: var(--success);
    }
    .reward-label {
        font-size: 0.9em;
        color: var(--text-secondary);
    }
    .result-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    }

    /* Topic Cards */
    .topic-card {
        background: var(--bg-secondary);
        border-radius: 15px;
        padding: 25px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        position: relative;
        overflow: hidden;
    }
    .topic-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .topic-card:hover::before {
        opacity: 0.1;
    }
    .topic-card:hover {
        transform: translateY(-5px);
        border-color: var(--primary);
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .topic-icon {
        font-size: 3em;
        margin-bottom: 15px;
        position: relative;
    }
    .topic-card h4 {
        margin-bottom: 8px;
        position: relative;
    }
    .topic-card span {
        font-size: 0.85em;
        color: var(--text-secondary);
        position: relative;
    }
`;
document.head.appendChild(quizStyles);

// ========================================
// ADAPTIVE EXERCISE SYSTEM
// ========================================

/**
 * Zeigt Exercise Practice Modal
 * @param {Object} exercise - Die Übung
 * @param {string} sessionId - Die Session-ID
 */
function showExercisePractice(exercise, sessionId) {
    const modal = document.getElementById('adaptiveLearningModal');
    const content = document.getElementById('adaptiveLearningContent');

    if (!modal || !content) return;

    content.innerHTML = `
        <div class="exercise-practice">
            <div class="exercise-header">
                <h3>Übung</h3>
                <div class="exercise-meta">
                    <span class="badge afb-badge afb-${exercise.afb}">AFB ${exercise.afb}</span>
                    <span class="badge operator-badge">${exercise.operator}</span>
                    <span class="badge points-badge">${exercise.points} Punkte</span>
                </div>
            </div>

            <div class="exercise-question">
                <h4>Aufgabe:</h4>
                <p>${exercise.question}</p>
            </div>

            ${exercise.tips ? `
                <div class="exercise-tips">
                    <strong>💡 Tipp:</strong> ${exercise.tips}
                </div>
            ` : ''}

            <div class="exercise-answer-area">
                <label for="exerciseAnswer">Deine Antwort:</label>
                <textarea id="exerciseAnswer" rows="8" placeholder="Schreibe hier deine Antwort..."></textarea>
            </div>

            <div class="exercise-actions">
                <button class="btn btn-primary" onclick="submitExerciseAnswer('${exercise.id}', '${sessionId}')">
                    Antwort einreichen
                </button>
                <button class="btn btn-secondary" onclick="showModelAnswer('${exercise.id}')">
                    Musterlösung zeigen
                </button>
                <button class="btn btn-tertiary" onclick="skipExercise('${exercise.id}', '${sessionId}')">
                    Überspringen
                </button>
            </div>

            <div id="feedbackArea" style="display: none;"></div>
        </div>
    `;

    modal.style.display = 'block';
}

/**
 * Reicht Exercise-Antwort ein und evaluiert
 * @param {string} exerciseId - Die Exercise-ID
 * @param {string} sessionId - Die Session-ID
 */
async function submitExerciseAnswer(exerciseId, sessionId) {
    const answerTextarea = document.getElementById('exerciseAnswer');
    const answer = answerTextarea?.value?.trim();

    if (!answer) {
        showToast('Bitte schreibe eine Antwort!', 'error');
        return;
    }

    const exercise = getExerciseById(exerciseId);
    if (!exercise) {
        showToast('Übung nicht gefunden!', 'error');
        return;
    }

    // Disable submit button
    const submitBtn = event.target;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird ausgewertet...';

    try {
        // Evaluate mit AI oder Fallback
        const apiKey = localStorage.getItem('histolearn_apiKey');
        let feedback;

        if (apiKey && (apiKey.startsWith('sk-') || apiKey.startsWith('AIza'))) {
            feedback = await evaluateWithAI(exercise, answer, apiKey);
        } else {
            feedback = evaluateWithoutAI(exercise, answer);
        }

        // Record attempt
        recordExerciseAttempt({
            exerciseId: exerciseId,
            sessionId: sessionId,
            userAnswer: answer,
            score: feedback.score,
            maxScore: exercise.points,
            correct: feedback.score >= exercise.points * 0.6,
            timestamp: new Date().toISOString()
        });

        // Update weakness progress
        if (currentUser && currentUser.weaknesses) {
            currentUser.weaknesses.forEach(weakness => {
                if ((weakness.type === 'afb' && weakness.identifier == exercise.afb) ||
                    (weakness.type === 'operator' && weakness.identifier === exercise.operator)) {
                    updateWeaknessProgress(weakness, feedback.score / exercise.points);
                }
            });
        }

        // Display feedback
        displayExerciseFeedback(feedback, exercise);

        // Rewards
        if (feedback.score >= exercise.points * 0.6) {
            addCoins(2, 'Übung gelöst');
            addXP(exercise.points * 2);
        } else {
            addXP(exercise.points); // Participation XP
        }

        // Check achievements
        checkAchievements();

    } catch (error) {
        console.error('Evaluation error:', error);
        showToast('Fehler bei der Auswertung!', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Antwort einreichen';
    }
}

/**
 * Evaluiert mit AI (Claude oder Gemini)
 * @param {Object} exercise - Die Übung
 * @param {string} userAnswer - Die User-Antwort
 * @param {string} apiKey - Der API-Key
 * @returns {Object} Feedback-Objekt
 */
async function evaluateWithAI(exercise, userAnswer, apiKey) {
    const sampleAnswerText = Array.isArray(exercise.sampleAnswer)
        ? exercise.sampleAnswer.join(', ')
        : exercise.sampleAnswer;

    const prompt = `Du bist ein Geschichtslehrer. Bewerte folgende Schülerantwort:

Aufgabe (Operator: ${exercise.operator}, AFB ${exercise.afb}, ${exercise.points} Punkte):
${exercise.question}

Musterantwort:
${sampleAnswerText}

Schülerantwort:
${userAnswer}

Bewerte nach:
1. Inhaltliche Korrektheit (0-${exercise.points} Punkte)
2. Vollständigkeit
3. Fachsprache
4. Struktur

Antworte in folgendem Format:
PUNKTE: [Zahl von 0 bis ${exercise.points}]
STÄRKEN: [Was gut war, Stichpunkte]
SCHWÄCHEN: [Was fehlt oder falsch ist, Stichpunkte]
VERBESSERUNGSVORSCHLÄGE: [Konkrete Tipps, Stichpunkte]
MUSTERANTWORT_ERKLÄRUNG: [Erkläre die Musterantwort kurz]`;

    try {
        let responseText;

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
                    max_tokens: 1000,
                    messages: [{ role: 'user', content: prompt }]
                })
            });

            const data = await response.json();
            if (data.content && data.content[0]) {
                responseText = data.content[0].text;
            } else {
                throw new Error('Invalid AI response');
            }
        } else if (apiKey.startsWith('AIza')) {
            // Gemini API
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                responseText = data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid AI response');
            }
        }

        return parseAIFeedback(responseText, exercise);

    } catch (error) {
        console.error('AI evaluation failed:', error);
        // Fallback to non-AI evaluation
        return evaluateWithoutAI(exercise, userAnswer);
    }
}

/**
 * Parst AI-Response zu Feedback-Objekt
 * @param {string} responseText - AI-Response
 * @param {Object} exercise - Die Übung
 * @returns {Object} Feedback-Objekt
 */
function parseAIFeedback(responseText, exercise) {
    const lines = responseText.split('\n');

    let score = 0;
    const strengths = [];
    const weaknesses = [];
    const suggestions = [];
    let modelAnswerDiscussion = '';

    let currentSection = '';

    lines.forEach(line => {
        line = line.trim();

        if (line.startsWith('PUNKTE:')) {
            const match = line.match(/(\d+)/);
            if (match) {
                score = Math.min(parseInt(match[1]), exercise.points);
            }
        } else if (line.startsWith('STÄRKEN:')) {
            currentSection = 'strengths';
        } else if (line.startsWith('SCHWÄCHEN:')) {
            currentSection = 'weaknesses';
        } else if (line.startsWith('VERBESSERUNGSVORSCHLÄGE:')) {
            currentSection = 'suggestions';
        } else if (line.startsWith('MUSTERANTWORT_ERKLÄRUNG:') || line.startsWith('MUSTERANTWORT_DISKUSSION:')) {
            currentSection = 'model';
        } else if (line && !line.startsWith('-') && currentSection) {
            // Section content
            if (currentSection === 'strengths') {
                strengths.push(line.replace(/^[-•*]\s*/, ''));
            } else if (currentSection === 'weaknesses') {
                weaknesses.push(line.replace(/^[-•*]\s*/, ''));
            } else if (currentSection === 'suggestions') {
                suggestions.push(line.replace(/^[-•*]\s*/, ''));
            } else if (currentSection === 'model') {
                modelAnswerDiscussion += line + ' ';
            }
        }
    });

    // Fallback values
    if (strengths.length === 0 && score >= exercise.points * 0.7) {
        strengths.push('Gute Ansätze erkennbar');
    }
    if (suggestions.length === 0) {
        suggestions.push(...getOperatorSpecificTips(exercise.operator));
    }
    if (!modelAnswerDiscussion) {
        const sampleText = Array.isArray(exercise.sampleAnswer)
            ? exercise.sampleAnswer.join('; ')
            : exercise.sampleAnswer;
        modelAnswerDiscussion = `Musterantwort: ${sampleText}. ${getOperatorExplanation(exercise.operator)}`;
    }

    return {
        score,
        maxScore: exercise.points,
        strengths,
        weaknesses,
        suggestions,
        modelAnswerDiscussion: modelAnswerDiscussion.trim()
    };
}

/**
 * Fallback-Evaluation ohne AI (Keyword-Matching)
 * @param {Object} exercise - Die Übung
 * @param {string} userAnswer - Die User-Antwort
 * @returns {Object} Feedback-Objekt
 */
function evaluateWithoutAI(exercise, userAnswer) {
    const sampleText = (Array.isArray(exercise.sampleAnswer)
        ? exercise.sampleAnswer.join(' ')
        : exercise.sampleAnswer).toLowerCase();

    // Extract keywords
    const keywords = extractKeywords(sampleText);

    // Count matches
    const userAnswerLower = userAnswer.toLowerCase();
    const matchedKeywords = keywords.filter(kw => userAnswerLower.includes(kw));
    const matchRatio = matchedKeywords.length / keywords.length;

    // Length check
    const wordsCount = userAnswer.split(/\s+/).filter(w => w.length > 0).length;
    const minWords = exercise.afb * 20; // AFB 1: 20, AFB 2: 40, AFB 3: 60
    const lengthRatio = Math.min(wordsCount / minWords, 1);

    // Combined score
    const combinedScore = (matchRatio * 0.7 + lengthRatio * 0.3);
    const score = Math.round(combinedScore * exercise.points);

    // Generate feedback
    const strengths = [];
    const weaknesses = [];

    if (matchRatio > 0.6) {
        strengths.push('Wichtige Aspekte wurden genannt');
    }
    if (wordsCount >= minWords) {
        strengths.push('Ausreichende Ausführlichkeit');
    }
    if (matchRatio < 0.5) {
        weaknesses.push('Mehr relevante Details erforderlich');
    }
    if (wordsCount < minWords * 0.7) {
        weaknesses.push('Antwort könnte ausführlicher sein');
    }

    const sampleAnswerText = Array.isArray(exercise.sampleAnswer)
        ? exercise.sampleAnswer.join('; ')
        : exercise.sampleAnswer;

    return {
        score,
        maxScore: exercise.points,
        strengths,
        weaknesses,
        suggestions: getOperatorSpecificTips(exercise.operator),
        modelAnswerDiscussion: `Musterantwort: ${sampleAnswerText}. ${getOperatorExplanation(exercise.operator)}`
    };
}

/**
 * Extrahiert Keywords aus Text
 * @param {string} text - Der Text
 * @returns {Array} Keywords
 */
function extractKeywords(text) {
    const stopwords = ['der', 'die', 'das', 'und', 'oder', 'in', 'ist', 'war',
        'wurden', 'eine', 'ein', 'von', 'zu', 'mit', 'auf', 'für', 'als', 'bei',
        'den', 'dem', 'des', 'im', 'am', 'zum', 'zur', 'durch', 'über', 'unter'];

    return text.split(/\s+/)
        .map(word => word.replace(/[.,!?;:()]/g, ''))
        .filter(word => word.length > 3 && !stopwords.includes(word))
        .slice(0, 15); // Top 15 keywords
}

/**
 * Gibt operator-spezifische Tipps
 * @param {string} operator - Der Operator
 * @returns {Array} Tipps
 */
function getOperatorSpecificTips(operator) {
    const tips = {
        'nennen': ['Nutze klare Stichpunkte', 'Sei präzise und konkret'],
        'beschreiben': ['Beschreibe Details', 'Nutze beschreibende Adjektive', 'Bleibe sachlich'],
        'zusammenfassen': ['Konzentriere dich auf Kernaussagen', 'Formuliere in eigenen Worten'],
        'analysieren': ['Zerlege in Teile', 'Erkenne Zusammenhänge', 'Nutze Fachbegriffe'],
        'erklaeren': ['Nutze Kausalketten ("weil")', 'Zeige Ursachen und Wirkungen'],
        'erlaeutern': ['Erkläre ausführlich', 'Nutze Beispiele'],
        'vergleichen': ['Finde Gemeinsamkeiten und Unterschiede', 'Nutze Vergleichswörter'],
        'einordnen': ['Stelle in größeren Kontext', 'Zeige historische Bedeutung'],
        'beurteilen': ['Wäge Pro und Contra ab', 'Begründe dein Urteil', 'Nutze Kriterien'],
        'bewerten': ['Nimm begründet Stellung', 'Zeige verschiedene Perspektiven'],
        'eroertern': ['Diskutiere verschiedene Sichtweisen', 'Gewichte Argumente'],
        'stellung-nehmen': ['Formuliere klare Position', 'Begründe ausführlich']
    };

    return tips[operator] || ['Beantworte vollständig', 'Nutze Fachbegriffe', 'Strukturiere logisch'];
}

/**
 * Gibt Operator-Erklärung
 * @param {string} operator - Der Operator
 * @returns {string} Erklärung
 */
function getOperatorExplanation(operator) {
    const explanations = {
        'nennen': 'Beim Nennen sollst du Fakten aufzählen, ohne sie zu erklären.',
        'beschreiben': 'Beim Beschreiben sollst du sachlich und detailliert darstellen.',
        'zusammenfassen': 'Beim Zusammenfassen reduzierst du auf die Kernaussagen.',
        'analysieren': 'Beim Analysieren zerlegst du in Bestandteile und erkennst Strukturen.',
        'erklaeren': 'Beim Erklären zeigst du Ursache-Wirkungs-Zusammenhänge.',
        'erlaeutern': 'Beim Erläutern erklärst du ausführlich und mit Beispielen.',
        'vergleichen': 'Beim Vergleichen stellst du Gemeinsamkeiten und Unterschiede gegenüber.',
        'einordnen': 'Beim Einordnen stellst du in einen größeren historischen Kontext.',
        'beurteilen': 'Beim Beurteilen wägst du ab und begründest ein Urteil.',
        'bewerten': 'Beim Bewerten nimmst du begründet Stellung.',
        'eroertern': 'Beim Erörtern diskutierst du aus verschiedenen Perspektiven.',
        'stellung-nehmen': 'Beim Stellung nehmen formulierst du eine begründete Position.'
    };

    return explanations[operator] || 'Achte auf die Anforderungen des Operators.';
}

/**
 * Zeigt Feedback für Exercise an
 * @param {Object} feedback - Das Feedback-Objekt
 * @param {Object} exercise - Die Übung
 */
function displayExerciseFeedback(feedback, exercise) {
    const feedbackArea = document.getElementById('feedbackArea');
    if (!feedbackArea) return;

    const scorePercent = (feedback.score / feedback.maxScore) * 100;
    const scoreColor = scorePercent >= 75 ? 'success' :
                       scorePercent >= 50 ? 'warning' : 'error';

    feedbackArea.innerHTML = `
        <div class="exercise-feedback">
            <div class="feedback-score ${scoreColor}">
                <span class="score-value">${feedback.score}/${feedback.maxScore}</span>
                <span class="score-label">Punkte (${Math.round(scorePercent)}%)</span>
            </div>

            ${feedback.strengths && feedback.strengths.length > 0 ? `
                <div class="feedback-section strengths">
                    <h4>✅ Stärken</h4>
                    <ul>${feedback.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
                </div>
            ` : ''}

            ${feedback.weaknesses && feedback.weaknesses.length > 0 ? `
                <div class="feedback-section weaknesses">
                    <h4>⚠️ Verbesserungspotenzial</h4>
                    <ul>${feedback.weaknesses.map(w => `<li>${w}</li>`).join('')}</ul>
                </div>
            ` : ''}

            <div class="feedback-section suggestions">
                <h4>💡 Tipps für den Operator "${exercise.operator}"</h4>
                <ul>${feedback.suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>

            <div class="feedback-section model-answer">
                <h4>📚 Musterantwort & Erklärung</h4>
                <p>${feedback.modelAnswerDiscussion}</p>
            </div>

            <div class="feedback-actions">
                <button class="btn btn-primary" onclick="continueAdaptivePractice()">
                    Nächste Übung
                </button>
                <button class="btn btn-secondary" onclick="retryExercise('${exercise.id}')">
                    Nochmal versuchen
                </button>
            </div>
        </div>
    `;

    feedbackArea.style.display = 'block';
    feedbackArea.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Zeigt Musterlösung an
 * @param {string} exerciseId - Die Exercise-ID
 */
function showModelAnswer(exerciseId) {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return;

    const sampleAnswerText = Array.isArray(exercise.sampleAnswer)
        ? exercise.sampleAnswer.join('<br>• ')
        : exercise.sampleAnswer;

    const feedbackArea = document.getElementById('feedbackArea');
    if (!feedbackArea) return;

    feedbackArea.innerHTML = `
        <div class="model-answer-display">
            <h4>📚 Musterlösung</h4>
            <div class="model-answer-content">
                ${Array.isArray(exercise.sampleAnswer) ? '• ' : ''}${sampleAnswerText}
            </div>
            <p class="model-answer-note">
                <em>Hinweis: Dies ist eine Beispielantwort. Deine Antwort kann auch anders formuliert sein und trotzdem richtig sein.</em>
            </p>
        </div>
    `;

    feedbackArea.style.display = 'block';
    feedbackArea.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Überspringt Übung
 * @param {string} exerciseId - Die Exercise-ID
 * @param {string} sessionId - Die Session-ID
 */
function skipExercise(exerciseId, sessionId) {
    if (confirm('Möchtest du diese Übung wirklich überspringen?')) {
        continueAdaptivePractice();
    }
}

/**
 * Retry Exercise
 * @param {string} exerciseId - Die Exercise-ID
 */
function retryExercise(exerciseId) {
    const answerTextarea = document.getElementById('exerciseAnswer');
    const feedbackArea = document.getElementById('feedbackArea');

    if (answerTextarea) {
        answerTextarea.value = '';
        answerTextarea.focus();
    }

    if (feedbackArea) {
        feedbackArea.style.display = 'none';
    }

    showToast('Versuch es nochmal!', 'info');
}
