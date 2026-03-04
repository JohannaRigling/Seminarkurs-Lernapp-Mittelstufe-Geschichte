// ===== LERNSTRATEGIEN SYSTEM =====

let viewedStrategies = new Set();

// Lernstrategien laden
function loadStrategies() {
    const grid = document.getElementById('strategiesGrid');
    if (!grid) return;

    grid.innerHTML = LEARNING_STRATEGIES.map(strategy => `
        <div class="strategy-card" onclick="showStrategyDetail('${strategy.id}')">
            <div class="strategy-icon">${strategy.icon}</div>
            <h3>${strategy.name}</h3>
            <span class="strategy-category">${strategy.category}</span>
            <p>${strategy.shortDesc}</p>
        </div>
    `).join('');
}

// Strategie-Detail anzeigen
function showStrategyDetail(strategyId) {
    const strategy = LEARNING_STRATEGIES.find(s => s.id === strategyId);
    if (!strategy) return;

    const modal = document.getElementById('strategyModal');
    const content = document.getElementById('strategyDetailContent');

    content.innerHTML = `
        <div class="strategy-detail" style="color: #e8e4d9;">
            <div class="strategy-detail-header">
                <span class="strategy-icon-large">${strategy.icon}</span>
                <div>
                    <h2 style="color: var(--text-gold);">${strategy.name}</h2>
                    <span class="strategy-category-badge" style="color: var(--text-gold);">${strategy.category}</span>
                </div>
            </div>

            <div class="strategy-section">
                <h4 style="color: var(--text-gold);">📖 Was ist das?</h4>
                <p>${strategy.fullDesc}</p>
            </div>

            <div class="strategy-section">
                <h4 style="color: var(--text-gold);">📋 Schritt für Schritt</h4>
                <ol class="strategy-steps">
                    ${strategy.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>

            <div class="strategy-section">
                <h4 style="color: var(--text-gold);">✅ Vorteile</h4>
                <ul class="strategy-benefits">
                    ${strategy.benefits.map(benefit => `<li>✓ ${benefit}</li>`).join('')}
                </ul>
            </div>

            <div class="strategy-section history-tip">
                <h4 style="color: var(--text-gold);">📚 Tipp für Geschichte</h4>
                <p>${strategy.historyTip}</p>
            </div>

            <div class="strategy-actions">
                <button class="btn btn-primary" onclick="applyStrategy('${strategy.id}')">
                    Diese Strategie jetzt nutzen
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

// Strategie anwenden
function applyStrategy(strategyId) {
    const strategy = LEARNING_STRATEGIES.find(s => s.id === strategyId);
    if (!strategy) return;

    closeStrategyModal();

    switch (strategyId) {
        case 'pomodoro':
            showSection('dashboard');
            showToast('🍅 Pomodoro-Timer aktiviert! Starte den Timer oben.', 'success');
            break;

        case 'active-recall':
        case 'feynman':
            showSection('chat');
            showToast(`💡 ${strategy.name} aktiv! Nutze den Chat zum Üben.`, 'success');
            break;

        case 'mind-mapping':
            showSection('exercises');
            showToast('🗺️ Erstelle eine Mind-Map zu deinem aktuellen Thema!', 'info');
            break;

        case 'spaced-repetition':
            showSection('library');
            showToast('📅 Plane deine Wiederholungen in der Bibliothek!', 'info');
            break;

        case 'loci':
            showToast('🏛️ Stelle dir deinen Gedächtnispalast vor...', 'info');
            showLociExercise();
            break;

        default:
            showToast(`${strategy.icon} ${strategy.name} gemerkt!`, 'success');
    }

    // Als Präferenz speichern
    if (currentUser) {
        updateUserPreferences({ preferredStrategy: strategyId });
    }

    addActivity('strategy', `Lernstrategie "${strategy.name}" ausgewählt`);
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

// CSS für Strategien
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
    .strategy-detail-header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 30px;
    }
    .strategy-icon-large {
        font-size: 4em;
    }
    .strategy-category-badge {
        display: inline-block;
        padding: 5px 15px;
        background: var(--bg-tertiary);
        border-radius: 20px;
        font-size: 0.9em;
        margin-top: 5px;
    }
    .strategy-section {
        margin-bottom: 25px;
    }
    .strategy-steps {
        margin-left: 20px;
    }
    .strategy-steps li {
        margin-bottom: 10px;
        line-height: 1.6;
    }
    .strategy-benefits {
        list-style: none;
    }
    .history-tip {
        padding: 20px;
        border-radius: 10px;
        border-left: 4px solid var(--secondary);
    }
    .strategy-actions {
        margin-top: 30px;
        text-align: center;
    }
`;
document.head.appendChild(strategyStyles);
