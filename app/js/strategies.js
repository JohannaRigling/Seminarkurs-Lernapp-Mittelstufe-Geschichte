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
        'spaced-repetition':'📅 Adaptive Lernsession (Lernplan erstellen)',
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
    const noActionButtonIds = ['dual-coding', 'mind-mapping', 'cornell'];
    const showActionButton = !noActionButtonIds.includes(strategy.id);

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

            ${showActionButton ? `
            <div class="strategy-actions">
                <button class="btn btn-primary" onclick="applyStrategy('${strategy.id}')">
                    ${actionLabel}
                </button>
            </div>
            ` : ''}
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
            openTimerBar();
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
            window.chatFeynmanMode = true;
            showSection('chat');
            setTimeout(() => {
                const promptHint = 'Ich möchte die Feynman-Methode anwenden. Tu bitte so, als wärst du 12 Jahre alt. Ich werde dir ein historisches Thema erklären, und du stellst mir einfache Fragen dazu oder sagst mir, wenn du etwas nicht verstehst.';
                const input = document.getElementById('chatInput');
                if (input) {
                    input.value = promptHint;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.focus();
                }
            }, 120);
            break;

        case 'elaboration':
            window.chatFeynmanMode = false;
            showSection('chat');
            setTimeout(() => {
                const promptHint = 'Hilf mir, ein neues Geschichts-Thema mit etwas zu verknüpfen, das ich schon kenne. Stelle mir dazu ein paar Fragen.';
                const input = document.getElementById('chatInput');
                if (input) {
                    input.value = promptHint;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.focus();
                }
            }, 120);
            break;

        case 'spaced-repetition':
            showSection('adaptive-session');
            if (typeof showToast === 'function') {
                showToast('Erstelle hier deinen Lernplan für das verteilte Lernen!', 'info');
            }
            break;

        case 'interleaving':
            // Adaptive Lernsession öffnen
            showSection('adaptive-session');
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

// Loci-Übung global state
let lociData = [];
let currentLociIndex = 0;
let lociAnswers = [];

// Helper: Escape HTML
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Helper: Create a Loci setup input row element
function createLociRowElement(rowNum, eventVal = '', locationVal = '') {
    const row = document.createElement('div');
    row.className = 'loci-event-row';
    row.innerHTML = `
        <span class="loci-row-number">${rowNum}</span>
        <input type="text" placeholder="Ereignis (z.B. 1789 Französische Revolution)" class="loci-event-input" value="${escapeHTML(eventVal)}">
        <input type="text" placeholder="Ort (z.B. Eingangstür)" class="loci-location-input" value="${escapeHTML(locationVal)}">
        <button type="button" class="loci-btn-delete" onclick="deleteLociRow(this)" title="Zeile löschen">🗑️</button>
    `;
    return row;
}

// Add a new row to Loci setup
function addLociRow() {
    const container = document.getElementById('lociEventsContainer');
    if (container) {
        const nextNum = container.querySelectorAll('.loci-event-row').length + 1;
        container.appendChild(createLociRowElement(nextNum));
        container.scrollTop = container.scrollHeight;
    }
}

// Delete a row from Loci setup
function deleteLociRow(btn) {
    const row = btn.closest('.loci-event-row');
    if (row) {
        row.remove();
        updateLociRowNumbers();
    }
}

// Re-sequence row numbers
function updateLociRowNumbers() {
    const rows = document.querySelectorAll('.loci-event-row');
    rows.forEach((row, index) => {
        const numSpan = row.querySelector('.loci-row-number');
        if (numSpan) {
            numSpan.textContent = index + 1;
        }
    });
}

// Loci-Übung
function showLociExercise() {
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div class="loci-exercise">
            <h2>🏛️ Loci-Methode: Dein Gedächtnispalast</h2>

            <div class="loci-intro">
                <p>Erstelle deinen eigenen Gedächtnispalast! Trage historische Ereignisse ein, die du lernen möchtest, und verknüpfe sie mit bekannten Orten (z.B. in deiner Wohnung oder auf deinem Schulweg).</p>
            </div>

            <div class="loci-events" id="lociEventsContainer">
                <!-- Initial rows will be inserted here -->
            </div>

            <div class="loci-row-actions" style="margin-top: 15px; display: flex; gap: 10px;">
                <button class="btn btn-secondary" onclick="addLociRow()">➕ Zeile hinzufügen</button>
            </div>

            <div class="loci-tip">
                <p>💡 <strong>Tipp:</strong> Trage mindestens 3 Ereignis-Ort-Paare ein. Stelle dir lebhafte, ungewöhnliche Bilder vor (z.B. "Die Bastille steht vor meiner Eingangstür und bricht zusammen").</p>
            </div>

            <div class="loci-actions">
                <button class="btn btn-primary" onclick="startLociRecallExercise()">Übung starten 🧠</button>
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Abbrechen</button>
            </div>
        </div>

        <style>
            .loci-exercise { padding: 20px; }
            .loci-intro { margin-bottom: 20px; }
            .loci-events { display: flex; flex-direction: column; gap: 12px; max-height: 280px; overflow-y: auto; padding-right: 5px; }
            .loci-event-row { display: flex; align-items: center; gap: 12px; padding: 10px; background: var(--bg-tertiary); border-radius: 8px; }
            .loci-row-number { width: 25px; height: 25px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9em; flex-shrink: 0; }
            .loci-event-input, .loci-location-input { flex: 1; padding: 8px 12px; border: 2px solid var(--border-color); border-radius: 8px; background: var(--bg-primary); color: var(--text-primary); font-size: 0.95em; min-width: 0; }
            .loci-event-input:focus, .loci-location-input:focus { outline: none; border-color: var(--primary); }
            .loci-btn-delete { background: none; border: none; font-size: 1.2rem; cursor: pointer; padding: 5px; filter: grayscale(1); transition: filter 0.2s, transform 0.2s; }
            .loci-btn-delete:hover { filter: grayscale(0); transform: scale(1.1); }
            .loci-tip { margin-top: 20px; padding: 15px; background: var(--bg-secondary); border-left: 4px solid var(--primary); border-radius: 4px; }
            .loci-actions { margin-top: 30px; display: flex; gap: 15px; justify-content: center; }
            /* Custom Scrollbar for loci-events container */
            .loci-events::-webkit-scrollbar { width: 6px; }
            .loci-events::-webkit-scrollbar-track { background: transparent; }
            .loci-events::-webkit-scrollbar-thumb { background-color: var(--border-color); border-radius: 3px; }
        </style>
    `;

    // Populate initial 5 rows
    const container = document.getElementById('lociEventsContainer');
    if (container) {
        for (let i = 0; i < 5; i++) {
            container.appendChild(createLociRowElement(i + 1));
        }
    }

    modal.classList.add('active');
}

// Start exercise after validation
function startLociRecallExercise() {
    const rows = document.querySelectorAll('.loci-event-row');
    const data = [];
    
    rows.forEach(row => {
        const eventInput = row.querySelector('.loci-event-input');
        const locationInput = row.querySelector('.loci-location-input');
        const eventVal = eventInput ? eventInput.value.trim() : '';
        const locationVal = locationInput ? locationInput.value.trim() : '';
        
        if (eventVal || locationVal) {
            data.push({ event: eventVal, location: locationVal });
        }
    });

    // Make sure at least 3 rows are fully completed
    const validPairs = data.filter(item => item.event && item.location);
    
    if (validPairs.length < 3) {
        if (typeof showToast === 'function') {
            showToast('Fülle bitte mindestens 3 vollständige Ereignis-Ort-Paare aus!', 'warning');
        } else {
            alert('Fülle bitte mindestens 3 vollständige Ereignis-Ort-Paare aus!');
        }
        return;
    }

    lociData = validPairs;
    currentLociIndex = 0;
    lociAnswers = [];

    renderLociRecallStep();
}

// Render one step of the recall phase
function renderLociRecallStep() {
    const content = document.getElementById('exerciseModalContent');
    if (!content) return;

    const currentPair = lociData[currentLociIndex];
    const totalSteps = lociData.length;

    content.innerHTML = `
        <div class="loci-exercise loci-recall-step">
            <div class="loci-progress" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <span style="font-weight: bold; color: var(--text-muted);">Schritt ${currentLociIndex + 1} von ${totalSteps}</span>
                <div class="loci-progress-bar-container" style="flex: 1; margin-left: 15px; height: 8px; background: var(--bg-secondary); border-radius: 4px; overflow: hidden;">
                    <div style="width: ${((currentLociIndex + 1) / totalSteps) * 100}%; height: 100%; background: var(--primary); transition: width 0.3s ease;"></div>
                </div>
            </div>

            <h2>🏛️ Loci-Recall: Gehe deinen Pfad ab</h2>
            
            <div class="loci-recall-card" style="background: var(--bg-tertiary); padding: 25px; border-radius: 12px; text-align: center; margin-bottom: 25px; border: 1px solid var(--border-color);">
                <span class="loci-card-label" style="text-transform: uppercase; font-size: 0.8em; letter-spacing: 1px; color: var(--primary); font-weight: bold; display: block; margin-bottom: 10px;">Aktueller Ort</span>
                <h3 style="font-size: 1.8rem; margin: 0 0 10px 0; color: var(--text-primary);">${escapeHTML(currentPair.location)}</h3>
                <p style="color: var(--text-muted); margin: 0;">Rufe die Verknüpfung in deinem Gedächtnis auf. Was ist an diesem Ort geschehen?</p>
            </div>

            <div class="loci-input-section">
                <label for="lociRecallInput" style="display: block; font-weight: bold; margin-bottom: 8px;">Deine Assoziationen / Notizen:</label>
                <textarea id="lociRecallInput" placeholder="Schreibe hier auf, woran du dich erinnerst (z.B. Ereignis, Jahreszahlen, bildliche Geschichte)..." style="width: 100%; min-height: 100px; padding: 12px; border: 2px solid var(--border-color); border-radius: 8px; font-size: 1em; background: var(--bg-primary); color: var(--text-primary); resize: vertical; margin-bottom: 20px; font-family: inherit;"></textarea>
            </div>

            <div id="lociSolutionBox" class="loci-solution-box" style="display: none; padding: 15px; background: var(--bg-secondary); border-left: 4px solid var(--primary); border-radius: 4px; margin-bottom: 20px; text-align: left;">
                <p style="margin: 0; font-weight: bold; color: var(--primary);">Dein verknüpftes Ereignis:</p>
                <p id="lociSolutionText" style="margin: 5px 0 0 0; font-size: 1.15em; font-weight: bold; color: var(--text-primary);"></p>
            </div>

            <div class="loci-actions">
                <button id="btnLociShowSolution" class="btn btn-primary" onclick="showLociSolution()">Lösung anzeigen 👁️</button>
                <button id="btnLociNext" class="btn btn-primary" onclick="nextLociStep()" style="display: none;">Weiter ➡️</button>
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Abbrechen</button>
            </div>
        </div>
    `;

    // Focus input field
    const input = document.getElementById('lociRecallInput');
    if (input) input.focus();
}

// Show the solution and capture user recall text
function showLociSolution() {
    const input = document.getElementById('lociRecallInput');
    const solutionBox = document.getElementById('lociSolutionBox');
    const solutionText = document.getElementById('lociSolutionText');
    const btnShowSolution = document.getElementById('btnLociShowSolution');
    const btnNext = document.getElementById('btnLociNext');

    if (!input || !solutionBox || !solutionText || !btnShowSolution || !btnNext) return;

    const answerVal = input.value.trim();
    lociAnswers.push(answerVal || '(Keine Notizen gemacht)');

    input.disabled = true;

    const currentPair = lociData[currentLociIndex];
    solutionText.textContent = currentPair.event;
    solutionBox.style.display = 'block';

    btnShowSolution.style.display = 'none';
    btnNext.style.display = 'inline-block';
    btnNext.focus();
}

// Next recall step or summary
function nextLociStep() {
    currentLociIndex++;
    if (currentLociIndex < lociData.length) {
        renderLociRecallStep();
    } else {
        renderLociSummary();
    }
}

// Restart recall exercise with current data
function restartLociRecall() {
    currentLociIndex = 0;
    lociAnswers = [];
    renderLociRecallStep();
}

// Render final summary comparing inputs vs user recall
function renderLociSummary() {
    const content = document.getElementById('exerciseModalContent');
    if (!content) return;

    let rowsHTML = '';
    lociData.forEach((pair, index) => {
        const answer = lociAnswers[index] || '';
        rowsHTML += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary);">${escapeHTML(pair.location)}</td>
                <td style="padding: 12px; font-weight: 500;">${escapeHTML(pair.event)}</td>
                <td style="padding: 12px; color: var(--text-primary); font-style: ${answer === '(Keine Notizen gemacht)' ? 'italic' : 'normal'}; opacity: ${answer === '(Keine Notizen gemacht)' ? '0.7' : '1'}; white-space: pre-wrap;">${escapeHTML(answer)}</td>
            </tr>
        `;
    });

    content.innerHTML = `
        <div class="loci-exercise loci-summary">
            <h2>🏆 Loci-Übung: Auswertung</h2>
            
            <div class="loci-intro">
                <p>Vergleiche deine aufgeschriebenen Assoziationen mit den tatsächlichen Ereignissen an jedem Ort.</p>
            </div>

            <div class="loci-summary-table-container" style="max-height: 250px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; background: var(--bg-primary);">
                    <thead>
                        <tr style="background: var(--bg-secondary); border-bottom: 2px solid var(--border-color); position: sticky; top: 0; z-index: 1;">
                            <th style="padding: 12px; font-weight: bold;">Ort</th>
                            <th style="padding: 12px; font-weight: bold;">Ereignis</th>
                            <th style="padding: 12px; font-weight: bold;">Deine Notiz</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHTML}
                    </tbody>
                </table>
            </div>

            <div class="loci-reward-badge" style="background: rgba(39, 174, 96, 0.1); border: 2px dashed var(--success, #27ae60); border-radius: 12px; padding: 15px; text-align: center; margin-bottom: 25px;">
                <h4 style="margin: 0 0 5px 0; color: var(--success, #27ae60); font-size: 1.2rem;">🎉 Übung erfolgreich beendet!</h4>
                <p style="margin: 0; font-weight: 500; font-size: 1em;">Du erhältst: <strong>🪙 10 Münzen</strong> und <strong>✨ 15 XP</strong></p>
            </div>

            <div class="loci-actions">
                <button class="btn btn-primary" onclick="finishLociExercise()">Übung abschließen 🪙</button>
                <button class="btn btn-secondary" onclick="restartLociRecall()">Wiederholen 🔄</button>
                <button class="btn btn-secondary" onclick="showLociExercise()">Neuer Pfad 🏛️</button>
            </div>
        </div>
    `;
}

// Complete the exercise, award rewards
function finishLociExercise() {
    if (typeof addCoins === 'function') {
        addCoins(10, 'Loci-Recall erfolgreich beendet');
    }
    if (typeof addXP === 'function') {
        addXP(15);
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
