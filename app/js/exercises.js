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
        }
        // Münze für richtige Antwort
        addCoins(1, 'Quiz-Frage richtig');
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
        updateUserProgress({
            exercisesDone: currentUser.progress.exercisesDone,
            quizCorrect: currentUser.progress.quizCorrect
        });
    }

    addActivity('quiz', `${currentQuiz.name} Quiz: ${quizScore}/${total}`);

    // Thema als abgeschlossen markieren (wenn >= 80%)
    if (percent >= 80 && currentUser) {
        // Hier könnten abgeschlossene Themen gespeichert werden
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
