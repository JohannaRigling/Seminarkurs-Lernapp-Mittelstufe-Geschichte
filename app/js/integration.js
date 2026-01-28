// ========================================
// ERWEITERTE ÜBUNGEN-INTEGRATION
// ========================================

// Themenbasierte Übungen anzeigen
function showTopicExercises(topic) {
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    // Lade Übungen für das Thema
    let exercises = [];

    // Prüfe alle Exercise-Dateien
    if (typeof TOPIC_EXERCISES !== 'undefined' && TOPIC_EXERCISES[topic]) {
        exercises = TOPIC_EXERCISES[topic];
    }
    if (typeof TOPIC_EXERCISES_PART2 !== 'undefined' && TOPIC_EXERCISES_PART2[topic]) {
        exercises = TOPIC_EXERCISES_PART2[topic];
    }
    if (typeof TOPIC_EXERCISES_PART3 !== 'undefined' && TOPIC_EXERCISES_PART3[topic]) {
        exercises = TOPIC_EXERCISES_PART3[topic];
    }
    if (typeof TOPIC_EXERCISES_COMPLETE !== 'undefined' && TOPIC_EXERCISES_COMPLETE[topic]) {
        exercises = TOPIC_EXERCISES_COMPLETE[topic];
    }
    if (typeof TOPIC_EXERCISES_FINAL !== 'undefined' && TOPIC_EXERCISES_FINAL[topic]) {
        exercises = TOPIC_EXERCISES_FINAL[topic];
    }

    if (exercises.length === 0) {
        showToast('Keine Übungen für dieses Thema gefunden', 'info');
        return;
    }

    // Filtere nach AFB
    const afb1 = exercises.filter(ex => ex.afb === 1);
    const afb2 = exercises.filter(ex => ex.afb === 2);
    const afb3 = exercises.filter(ex => ex.afb === 3);

    content.innerHTML = `
        <div class="topic-exercises">
            <h2>Übungen: ${getTopicName(topic)}</h2>
            <p class="subtitle">${exercises.length} Übungen zu diesem Thema</p>

            <div class="exercise-filters">
                <button class="filter-btn active" onclick="filterExercisesByAFB('all', '${topic}')">Alle (${exercises.length})</button>
                <button class="filter-btn" onclick="filterExercisesByAFB('afb1', '${topic}')">AFB I (${afb1.length})</button>
                <button class="filter-btn" onclick="filterExercisesByAFB('afb2', '${topic}')">AFB II (${afb2.length})</button>
                <button class="filter-btn" onclick="filterExercisesByAFB('afb3', '${topic}')">AFB III (${afb3.length})</button>
            </div>

            <div id="exerciseList" class="exercise-list"></div>
        </div>

        <style>
            .topic-exercises { padding: 20px; }
            .subtitle { color: var(--text-secondary); margin-bottom: 20px; }
            .exercise-filters {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }
            .filter-btn {
                padding: 8px 16px;
                border: 2px solid var(--primary);
                background: transparent;
                color: var(--primary);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .filter-btn.active {
                background: var(--primary);
                color: var(--bg-primary);
            }
            .filter-btn:hover {
                transform: translateY(-2px);
            }
            .exercise-list { margin-top: 20px; }
            .exercise-item {
                background: var(--bg-secondary);
                padding: 20px;
                border-radius: 15px;
                margin-bottom: 15px;
                border-left: 4px solid var(--primary);
                cursor: pointer;
                transition: all 0.3s;
            }
            .exercise-item:hover {
                transform: translateX(5px);
                box-shadow: 0 5px 15px rgba(201, 162, 39, 0.2);
            }
            .exercise-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            .exercise-question {
                font-weight: bold;
                color: var(--text-primary);
                margin-bottom: 10px;
            }
            .exercise-badges {
                display: flex;
                gap: 8px;
            }
            .badge {
                padding: 4px 12px;
                background: var(--primary);
                color: var(--bg-primary);
                border-radius: 12px;
                font-size: 0.85em;
                font-weight: bold;
            }
            .exercise-tips {
                font-size: 0.9em;
                color: var(--text-secondary);
                padding: 10px;
                background: rgba(201, 162, 39, 0.1);
                border-radius: 8px;
                margin-top: 10px;
            }
        </style>
    `;

    // Initial alle Übungen anzeigen
    window.currentTopicExercises = exercises;
    renderExerciseList(exercises, 'all');

    modal.style.display = 'block';
}

// Übungen nach AFB filtern
function filterExercisesByAFB(filter, topic) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (window.currentTopicExercises) {
        renderExerciseList(window.currentTopicExercises, filter);
    }
}

// Übungsliste rendern
function renderExerciseList(exercises, filter) {
    const list = document.getElementById('exerciseList');
    if (!list) return;

    let filtered = exercises;
    if (filter === 'afb1') filtered = exercises.filter(ex => ex.afb === 1);
    if (filter === 'afb2') filtered = exercises.filter(ex => ex.afb === 2);
    if (filter === 'afb3') filtered = exercises.filter(ex => ex.afb === 3);

    list.innerHTML = filtered.map(ex => `
        <div class="exercise-item">
            <div class="exercise-header">
                <div class="exercise-badges">
                    <span class="badge">AFB ${ex.afb}</span>
                    <span class="badge">${ex.operator}</span>
                    <span class="badge">${ex.points}P</span>
                </div>
            </div>
            <div class="exercise-question">${ex.question}</div>
            <div class="exercise-tips">
                💡 ${ex.tips}
            </div>
        </div>
    `).join('');
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
