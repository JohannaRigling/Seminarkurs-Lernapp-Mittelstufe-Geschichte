// ===== LERNSTRATEGIEN SYSTEM =====

let viewedStrategies = new Set();

// Lernstrategien laden — als Schaubild nach Effektivität sortiert
function loadStrategies() {
    const grid = document.getElementById('strategiesGrid');
    if (!grid) return;

    // Effektivitäts-Spalten — von „Sehr effektiv" links bis „Hilfreich" rechts
    const tiers = [
        { level: 5, label: 'Sehr effektiv', color: '#27ae60', desc: 'Wissenschaftlich gut belegt — größter Lerneffekt' },
        { level: 4, label: 'Effektiv',      color: '#7fc14e', desc: 'Solide Evidenz — empfehlenswert' },
        { level: 3, label: 'Mittel',        color: '#daa520', desc: 'Hilft beim Lernen, je nach Aufgabe' },
        { level: 2, label: 'Hilfreich',     color: '#c87f3a', desc: 'Sinnvoll als Ergänzung, kein Selbstläufer' }
    ];

    const byTier = tiers.map(t => ({
        ...t,
        strategies: LEARNING_STRATEGIES.filter(s => (s.effectiveness || 3) === t.level)
    }));

    const cardHTML = (strategy) => `
        <div class="strategy-card" onclick="showStrategyDetail('${strategy.id}')">
            <div class="strategy-icon">${strategy.icon}</div>
            <h3>${strategy.name}</h3>
            <span class="strategy-category">${strategy.category}</span>
            <p>${strategy.shortDesc}</p>
            <div class="strategy-stars" aria-label="Effektivität ${strategy.effectiveness || 3} von 5">
                ${'★'.repeat(strategy.effectiveness || 3)}${'☆'.repeat(5 - (strategy.effectiveness || 3))}
            </div>
        </div>`;

    grid.innerHTML = `
        <div class="strategies-chart">
            <div class="strategies-axis" aria-hidden="true">
                <span class="strategies-axis-label strategies-axis-left">⬅ Sehr effektiv</span>
                <div class="strategies-axis-gradient"></div>
                <span class="strategies-axis-label strategies-axis-right">Weniger effektiv ➡</span>
            </div>
            <div class="strategies-columns">
                ${byTier.map(tier => `
                    <div class="strategies-col" style="--tier-color: ${tier.color}">
                        <div class="strategies-col-header">
                            <span class="strategies-col-dot" style="background:${tier.color}"></span>
                            <span class="strategies-col-title">${tier.label}</span>
                        </div>
                        <p class="strategies-col-desc">${tier.desc}</p>
                        <div class="strategies-col-cards">
                            ${tier.strategies.map(cardHTML).join('') || '<p class="strategies-empty">—</p>'}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Strategie-Detail anzeigen
function showStrategyDetail(strategyId) {
    const strategy = LEARNING_STRATEGIES.find(s => s.id === strategyId);
    if (!strategy) return;

    const modal = document.getElementById('strategyModal');
    const content = document.getElementById('strategyDetailContent');

    // Action-Label je nach Strategie
    const actionLabels = {
        'pomodoro':         '🍅 Pomodoro-Timer starten',
        'spaced-repetition':'📅 Adaptive Lernsession öffnen',
        'active-recall':    '🧠 Übungen öffnen',
        'mind-mapping':     '🗺️ Übungsmodul öffnen',
        'feynman':          '👨‍🏫 KI-Tutor öffnen',
        'loci':             '🏛️ Loci-Übung starten',
        'chunking':         '📦 Themenübungen öffnen',
        'elaboration':      '🔗 KI-Tutor für Verknüpfungen',
        'sq3r':             '📖 Materialien öffnen',
        'dual-coding':      '🖼️ Bildarchiv öffnen',
        'interleaving':     '🔀 Adaptive Lernsession'
    };
    const actionLabel = actionLabels[strategy.id] || 'Diese Strategie jetzt nutzen';

    content.innerHTML = `
        <div class="strategy-detail">
            <div class="strategy-detail-header">
                <span class="strategy-icon-large">${strategy.icon}</span>
                <div>
                    <h2>${strategy.name}</h2>
                    <span class="strategy-category-badge">${strategy.category}</span>
                </div>
            </div>

            <div class="strategy-section">
                <h4>📖 Was ist das?</h4>
                <p>${strategy.fullDesc}</p>
            </div>

            <div class="strategy-section">
                <h4>📋 Schritt für Schritt</h4>
                <ol class="strategy-steps">
                    ${strategy.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>

            <div class="strategy-section">
                <h4>✅ Vorteile</h4>
                <ul class="strategy-benefits">
                    ${strategy.benefits.map(benefit => `<li>✓ ${benefit}</li>`).join('')}
                </ul>
            </div>

            <div class="strategy-section history-tip">
                <h4>📚 Tipp für Geschichte</h4>
                <p>${strategy.historyTip}</p>
            </div>

            <div class="strategy-actions">
                <button class="btn btn-primary" onclick="applyStrategy('${strategy.id}')">
                    ${actionLabel}
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');

    // Als angesehen markieren
    if (!viewedStrategies.has(strategyId)) {
        viewedStrategies.add(strategyId);

        if (currentUser) {
            currentUser.progress.strategiesViewed = viewedStrategies.size;
            updateUserProgress({ strategiesViewed: viewedStrategies.size });
        }
    }
}

// Strategie-Modal schließen
function closeStrategyModal() {
    const modal = document.getElementById('strategyModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Strategie anwenden — startet das jeweils passende Feature direkt
function applyStrategy(strategyId) {
    const strategy = LEARNING_STRATEGIES.find(s => s.id === strategyId);
    if (!strategy) return;

    closeStrategyModal();

    const openTimerBar = () => {
        const bar = document.getElementById('timerBar');
        if (bar && (bar.style.display === 'none' || bar.style.display === '')) {
            if (typeof window.toggleTimer === 'function') window.toggleTimer();
            else bar.style.display = 'flex';
        }
        // Optional: Timer direkt starten, wenn er nicht läuft
        if (typeof window.startTimer === 'function' && typeof timerRunning !== 'undefined' && !timerRunning) {
            try { window.startTimer(); } catch (e) { /* still */ }
        }
        // Zum oberen Bereich scrollen, damit der Timer sichtbar ist
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    switch (strategyId) {
        case 'pomodoro':
            showSection('dashboard');
            setTimeout(openTimerBar, 80);
            break;

        case 'active-recall':
        case 'chunking':
            showSection('exercises');
            break;

        case 'mind-mapping':
        case 'dual-coding':
            showSection('exercises');
            break;

        case 'feynman':
        case 'elaboration':
            showSection('chat');
            setTimeout(() => {
                const promptHint = strategyId === 'feynman'
                    ? 'Erkläre mir ein Konzept aus Geschichte so, als wäre ich 12 Jahre alt — bitte gib mir ein Thema vor und wir üben die Feynman-Technik.'
                    : 'Hilf mir, ein neues Geschichts-Thema mit etwas zu verknüpfen, das ich schon kenne. Stelle mir dazu ein paar Fragen.';
                const input = document.getElementById('chatInput');
                if (input) {
                    input.value = promptHint;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.focus();
                }
            }, 120);
            break;

        case 'spaced-repetition':
        case 'interleaving':
            // Adaptive Lernsession öffnen
            if (typeof window.openAdaptiveLearning === 'function') window.openAdaptiveLearning();
            else showSection('dashboard');
            break;

        case 'loci':
            showLociExercise();
            break;

        case 'sq3r':
            showSection('library-materials');
            break;

        default:
            // Fallback: zur passenden Übersicht
            showSection('exercises');
    }

    if (currentUser) {
        updateUserPreferences({ preferredStrategy: strategyId });
    }

    addActivity('strategy', `Lernstrategie "${strategy.name}" gestartet`);
}

// Loci-Übung
function showLociExercise() {
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div class="loci-exercise">
            <h2>🏛️ Loci-Methode: Dein Gedächtnispalast</h2>

            <div class="loci-intro">
                <p>Verknüpfe diese historischen Ereignisse mit Orten in deinem Zuhause!</p>
            </div>

            <div class="loci-events">
                <div class="loci-event">
                    <span class="loci-number">1</span>
                    <span class="loci-text">1789 - Französische Revolution</span>
                    <input type="text" placeholder="Ort: z.B. Eingangstür" class="loci-input">
                </div>
                <div class="loci-event">
                    <span class="loci-number">2</span>
                    <span class="loci-text">1815 - Wiener Kongress</span>
                    <input type="text" placeholder="Ort: z.B. Garderobe" class="loci-input">
                </div>
                <div class="loci-event">
                    <span class="loci-number">3</span>
                    <span class="loci-text">1848 - Märzrevolution</span>
                    <input type="text" placeholder="Ort: z.B. Wohnzimmer" class="loci-input">
                </div>
                <div class="loci-event">
                    <span class="loci-number">4</span>
                    <span class="loci-text">1871 - Reichsgründung</span>
                    <input type="text" placeholder="Ort: z.B. Küche" class="loci-input">
                </div>
                <div class="loci-event">
                    <span class="loci-number">5</span>
                    <span class="loci-text">1914 - Erster Weltkrieg</span>
                    <input type="text" placeholder="Ort: z.B. Schlafzimmer" class="loci-input">
                </div>
            </div>

            <div class="loci-tip">
                <p>💡 <strong>Tipp:</strong> Stelle dir lebhafte, ungewöhnliche Bilder vor!
                Z.B. "Die Bastille steht vor meiner Eingangstür und bricht zusammen."</p>
            </div>

            <div class="loci-actions">
                <button class="btn btn-primary" onclick="completeLociExercise()">Abschließen</button>
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Später</button>
            </div>
        </div>

        <style>
            .loci-exercise { padding: 20px; }
            .loci-intro { margin-bottom: 30px; }
            .loci-events { display: flex; flex-direction: column; gap: 15px; }
            .loci-event { display: flex; align-items: center; gap: 15px; padding: 15px; background: var(--bg-tertiary); border-radius: 10px; }
            .loci-number { width: 30px; height: 30px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
            .loci-text { flex: 1; font-weight: 500; }
            .loci-input { padding: 10px; border: 2px solid var(--border-color); border-radius: 8px; width: 200px; }
            .loci-tip { margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 10px; }
            .loci-actions { margin-top: 30px; display: flex; gap: 15px; justify-content: center; }
        </style>
    `;

    modal.classList.add('active');
}

// Loci-Übung abschließen
function completeLociExercise() {
    const inputs = document.querySelectorAll('.loci-input');
    let filledCount = 0;

    inputs.forEach(input => {
        if (input.value.trim()) filledCount++;
    });

    if (filledCount >= 3) {
        showToast('🎉 Super! Gehe jetzt deinen Gedächtnispalast durch und wiederhole!', 'success');
        addCoins(5, 'Loci-Übung abgeschlossen');
        addXP(10);
    } else {
        showToast('Fülle mindestens 3 Orte aus!', 'warning');
        return;
    }

    closeExerciseModal();
}

// CSS für Strategien (das ausführliche Styling lebt in components.css)
const strategyStyles = document.createElement('style');
strategyStyles.textContent = `
    .strategy-card {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .strategy-card:hover {
        transform: translateY(-10px) scale(1.02);
    }
    .strategy-category {
        display: inline-block;
        padding: 4px 12px;
        background: var(--primary);
        color: white;
        border-radius: 15px;
        font-size: 0.8em;
        margin-bottom: 10px;
    }
`;
document.head.appendChild(strategyStyles);
