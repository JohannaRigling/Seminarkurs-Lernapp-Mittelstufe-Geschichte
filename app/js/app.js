// ===== MAIN APP LOGIC =====

// App initialisieren
document.addEventListener('DOMContentLoaded', function() {
    // Prüfen ob eingeloggt
    if (!checkAuth()) {
        // Fun Fact auf Login-Seite
        updateFunFact();
    }

    // Operatoren laden
    loadOperators(1);

    // Lernstrategien laden
    loadStrategies();

    // Zeitstrahl laden
    loadTimeline();

    // Quiz-Themen laden
    loadQuizTopics();

    // Sidebar-Status wiederherstellen
    if (localStorage.getItem('histolearn_sidebar_collapsed') === 'true') {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        const toggleBtn = document.querySelector('.sidebar-toggle-btn');
        if (sidebar) sidebar.classList.add('collapsed');
        if (mainContent) mainContent.classList.add('sidebar-collapsed');
        if (toggleBtn) toggleBtn.textContent = '▶';
        document.body.classList.add('sidebar-collapsed');
    }

    // Event Listener
    setupEventListeners();

    // Pomodoro-Mini in Übungsmodal synchronisieren
    _initExercisePomodoroObserver();
});

// Event Listener einrichten
function setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC schließt Modals
        if (e.key === 'Escape') {
            closeExerciseModal();
            closeStrategyModal();
        }
    });

    // Fun Fact alle 30 Sekunden wechseln
    setInterval(updateFunFact, 30000);
}

// Sektion anzeigen
const BREAK_BLOCKED_SECTIONS = ['chat', 'exercises', 'library-materials', 'library-glossary', 'adaptive-session'];
const STUDY_BLOCKED_SECTIONS = ['castle'];

function showSection(sectionId) {
    // Während Pause: Lernbereiche sperren
    if (window.isBreakActive && BREAK_BLOCKED_SECTIONS.includes(sectionId)) {
        showToast('⏸️ Du bist in der Pause! Genieße deine Auszeit.', 'info');
        return;
    }
    // Während aktiver Lernzeit: Burg ist gesperrt — erst in der Pause oder bei pausiertem Timer
    if (window.isStudyActive && STUDY_BLOCKED_SECTIONS.includes(sectionId)) {
        showToast('📚 Die Burg gibt es in der Pause! Bleib jetzt am Stoff dran.', 'info');
        return;
    }

    // Alle Sektionen ausblenden
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Gewählte Sektion anzeigen
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    // Navigation aktualisieren - sowohl nav-items als auch nav-category-header
    document.querySelectorAll('.nav-item, .nav-category-header').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });

    // Spezifische Aktionen pro Sektion
    switch (sectionId) {
        case 'chat':
            document.getElementById('chatInput').focus();
            updateSavedChatsList();
            break;
        case 'timeline':
            if (!document.querySelector('.timeline-event')) {
                loadTimeline();
            }
            break;
        case 'glossary':
            if (!document.querySelector('.glossary-item')) {
                initGlossary();
            }
            break;
        case 'settings':
            loadProfileSettings();
            updateAllAvatarDisplays();
            break;
        case 'exercises':
            setTimeout(() => {
                if (typeof updateAllTopicCardProgress === 'function') updateAllTopicCardProgress();
            }, 100);
            break;
        case 'castle':
            setTimeout(() => {
                if (typeof cbInit === 'function' && !document.getElementById('cb3Canvas')) {
                    cbInit();
                } else if (typeof window.cb3UpdateUI === 'function') {
                    window.cb3UpdateUI();
                }
            }, 50);
            break;
        case 'library-materials':
        case 'library-glossary':
            document.getElementById('library').classList.add('active');
            showLibraryTab(sectionId === 'library-materials' ? 'materials' : 'glossary');
            break;
    }
}

// Toast-Benachrichtigung anzeigen
// Nutzer-Wunsch: nur wichtige Hinweise zeigen — info/success unterdrücken,
// damit Standard-Aktionen (z.B. Burg-Kauf) keine Popup-Spam erzeugen.
function showToast(message, type = 'info') {
    // Nur kritische Meldungen anzeigen
    if (type !== 'warning' && type !== 'error') return;

    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Modal schließen
function closeExerciseModal() {
    const modal = document.getElementById('exerciseModal');
    if (modal) {
        modal.classList.remove('active');
        modal.classList.remove('exercise-fullscreen');
        const btn = modal.querySelector('.modal-fullscreen-btn');
        if (btn) btn.textContent = '⤢';
    }
    clearInterval(_exercisePomodoroInterval);
    _exercisePomodoroInterval = null;
}

let _exercisePomodoroInterval = null;

function _syncExercisePomodoroMini() {
    const src = document.getElementById('timerDisplay');
    const dst = document.getElementById('exercisePomodoroTime');
    if (src && dst) dst.textContent = src.textContent;
}

function _initExercisePomodoroObserver() {
    const modal = document.getElementById('exerciseModal');
    if (!modal) return;
    new MutationObserver(() => {
        if (modal.classList.contains('active')) {
            _syncExercisePomodoroMini();
            if (!_exercisePomodoroInterval) {
                _exercisePomodoroInterval = setInterval(_syncExercisePomodoroMini, 1000);
            }
        } else {
            clearInterval(_exercisePomodoroInterval);
            _exercisePomodoroInterval = null;
        }
    }).observe(modal, { attributes: true, attributeFilter: ['class'] });
}

function toggleExerciseFullscreen() {
    const modal = document.getElementById('exerciseModal');
    if (!modal) return;
    const isFullscreen = modal.classList.toggle('exercise-fullscreen');
    const btn = modal.querySelector('.modal-fullscreen-btn');
    if (btn) btn.textContent = isFullscreen ? '✕' : '⤢';
}

// Öffnet den KI-Tutor-Chat mit der aktuellen Aufgabenfrage als Kontext
function openChatForHelp() {
    // Aktuelle Aufgabenfrage ermitteln
    let question = '';
    let operator = '';
    if (window.currentFilteredExercises && typeof currentExerciseIndex !== 'undefined') {
        const ex = window.currentFilteredExercises[currentExerciseIndex];
        if (ex) {
            question = ex.question || '';
            operator = ex.operator || '';
        }
    }

    closeExerciseModal();
    showSection('chat');

    setTimeout(async () => {
        if (typeof addChatMessage !== 'function' || typeof getAIResponse !== 'function') return;

        const helpPrompt = question
            ? `🆘 SOS-Hilfe – ich stecke bei dieser Aufgabe fest:\n\n„${question}"\n\nKannst du mir helfen?`
            : '🆘 SOS-Hilfe – ich stecke bei einer Aufgabe fest. Kannst du mir helfen?';

        const sosInstruction = `Wenn der Schüler eine SOS-Hilfe-Anfrage sendet, gehe so vor:
1. Zitiere die Aufgabenstellung kurz (falls vorhanden).
2. Frage freundlich, was genau er nicht versteht.
3. Biete konkret drei Wege an, wie du helfen kannst – zum Beispiel: (a) das Thema erklären, (b) zeigen, wie man die Aufgabe angeht, (c) die Frage in kleinere Teilfragen aufteilen.
Halte die Antwort übersichtlich und ermutigend.`;

        addChatMessage(helpPrompt, 'user');
        await getAIResponse(helpPrompt, sosInstruction);

        const input = document.getElementById('chatInput');
        if (input) input.focus();
    }, 300);
}

// Info-Popup anzeigen
function showInfoPopup(title, html) {
    document.getElementById('infoPopupTitle').innerHTML = title;
    document.getElementById('infoPopupBody').innerHTML = html;
    document.getElementById('infoPopup').classList.add('active');
    document.getElementById('infoPopupOverlay').classList.add('active');
}

function closeInfoPopup() {
    document.getElementById('infoPopup').classList.remove('active');
    document.getElementById('infoPopupOverlay').classList.remove('active');
}

// Auszeichnungen Info
function showAchievementsInfo() {
    const achievements = typeof ACHIEVEMENTS !== 'undefined' ? ACHIEVEMENTS : [
        { icon: '👣', name: 'Erste Schritte',       description: 'Erste Übung abschließen' },
        { icon: '🎯', name: 'Quiz-Meister',          description: '10 Quiz-Fragen richtig beantworten' },
        { icon: '⏰', name: 'Zeitreisender',         description: '5 Zeitstrahl-Events erkunden' },
        { icon: '📝', name: 'Operator-Pro',          description: 'Alle Operatoren angesehen' },
        { icon: '🧠', name: 'Strategie-Guru',        description: 'Alle Lernstrategien entdeckt' },
        { icon: '📚', name: 'Fleißig',               description: '1 Stunde gelernt' },
        { icon: '🏰', name: 'Burgenbauer',           description: 'Erstes Burg-Upgrade kaufen' },
        { icon: '🐄', name: 'Wohlhabend',            description: '100 Münzen sammeln' },
        { icon: '🔥', name: '3-Tage-Streak',         description: '3 Tage in Folge lernen' },
        { icon: '🔥', name: 'Wochenläufer',          description: '7 Tage in Folge lernen' },
        { icon: '🃏', name: 'Memory-Champion',       description: '5 Memory-Spiele gewinnen' },
        { icon: '💬', name: 'Wissbegierig',          description: '20 Fragen an den KI-Tutor stellen' },
        { icon: '📒', name: 'Notizenmeister',        description: '10 Notizen erstellen' },
        { icon: '💯', name: 'Perfektionist',         description: 'Ein Quiz mit 100% abschließen' },
        { icon: '🦉', name: 'Nachteule',             description: 'Nach 22 Uhr lernen' },
        { icon: '🐦', name: 'Frühaufsteher',         description: 'Vor 7 Uhr lernen' },
    ];

    const html = `<ul class="info-list">` +
        achievements.map(a => `
            <li class="info-list-item">
                <span class="info-list-icon">${a.icon}</span>
                <div>
                    <strong>${a.name}</strong>
                    <span>${a.description}</span>
                </div>
            </li>
        `).join('') +
        `</ul>`;
    showInfoPopup('🏆 Auszeichnungen – Anforderungen', html);
}

// Rang Info
function showRankInfo() {
    const ranks = typeof RANKS !== 'undefined' ? RANKS : [
        { icon: '🌾', name: 'Tagelöhner', minPoints: 0 },
        { icon: '🌾', name: 'Bauer',      minPoints: 100 },
        { icon: '🔨', name: 'Handwerker', minPoints: 300 },
        { icon: '⚔️', name: 'Ritter',     minPoints: 600 },
        { icon: '👑', name: 'Adel',       minPoints: 1000 },
        { icon: '⚡', name: 'Legende',    minPoints: 2000 },
    ];

    const html = `<ul class="info-list">` +
        ranks.map((r, i) => `
            <li class="info-list-item">
                <span class="info-list-icon">${r.icon}</span>
                <div>
                    <strong>${r.name}</strong>
                    <span>${r.minPoints === 0 ? 'Startrang' : `ab ${r.minPoints} XP`}</span>
                </div>
            </li>
        `).join('') +
        `</ul>
        <p class="info-note">XP erhältst du durch Übungen, Quiz, Memory und tägliches Lernen.</p>`;
    showInfoPopup('⚔️ Rang-Aufstieg – Übersicht', html);
}

// Sidebar ein-/ausklappen
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.querySelector('.sidebar-toggle-btn');

    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('sidebar-collapsed');
    // Body-Klasse für globale Layout-Anpassungen (z.B. zentrierte Modals)
    document.body.classList.toggle('sidebar-collapsed', sidebar.classList.contains('collapsed'));

    if (sidebar.classList.contains('collapsed')) {
        toggleBtn.textContent = '▶';
        localStorage.setItem('histolearn_sidebar_collapsed', 'true');
    } else {
        toggleBtn.textContent = '◀';
        localStorage.setItem('histolearn_sidebar_collapsed', 'false');
    }
}

// Chat Vollbild umschalten
let _pomodoroSyncInterval = null;

function _syncPomodoroMini() {
    const src = document.getElementById('timerDisplay');
    const dst = document.getElementById('chatPomodoroTime');
    if (src && dst) dst.textContent = src.textContent;
}

function toggleChatFullscreen() {
    const chatSection = document.getElementById('chat');
    const btn = document.getElementById('chatFullscreenBtn');
    const sidebar = document.getElementById('sidebar');
    const isFullscreen = chatSection.classList.toggle('chat-fullscreen');

    btn.textContent = isFullscreen ? '✕ Schließen' : '⤢ Vollbild';
    btn.title = isFullscreen ? 'Vollbild beenden' : 'Vollbild';

    // Sidebar im Vollbild verstecken
    if (sidebar) sidebar.style.display = isFullscreen ? 'none' : '';

    // Pomodoro-Mini-Anzeige synchronisieren
    if (isFullscreen) {
        _syncPomodoroMini();
        _pomodoroSyncInterval = setInterval(_syncPomodoroMini, 1000);
    } else {
        clearInterval(_pomodoroSyncInterval);
        _pomodoroSyncInterval = null;
    }

    // Escape-Taste zum Beenden
    if (isFullscreen) {
        document.addEventListener('keydown', _chatEscHandler);
    } else {
        document.removeEventListener('keydown', _chatEscHandler);
    }
}

function _chatEscHandler(e) {
    if (e.key === 'Escape') {
        const chatSection = document.getElementById('chat');
        if (chatSection.classList.contains('chat-fullscreen')) {
            toggleChatFullscreen();
        }
    }
}

// Theme ändern
function changeTheme() {
    const theme = document.getElementById('themeSelect').value;
    applyTheme(theme);
    if (currentUser) {
        updateUserPreferences({ theme: theme });
    }
}

function applyTheme(theme) {
    document.body.classList.remove('light', 'dark', 'sepia');
    document.body.classList.add(theme);
}

// Akzentfarbe setzen
function setAccentColor(color) {
    document.body.style.setProperty('--primary', color);

    // Dunklere Version berechnen
    const darkerColor = adjustColor(color, -20);
    document.body.style.setProperty('--primary-dark', darkerColor);

    // Sekundäre Farb-Variablen mitaktualisieren (für Buttons, Borders, Text)
    document.body.style.setProperty('--secondary', color);
    document.body.style.setProperty('--secondary-light', adjustColor(color, 15));
    document.body.style.setProperty('--secondary-dark', adjustColor(color, -15));
    document.body.style.setProperty('--text-gold', adjustColor(color, 10));
    document.body.style.setProperty('--border-gold', color);
    document.body.style.setProperty('--shadow-gold', `0 0 20px ${color}4D`);

    // Button aktivieren
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.style.background === color || btn.style.backgroundColor === color) {
            btn.classList.add('active');
        }
    });

    if (currentUser) {
        updateUserPreferences({ accentColor: color });
    }
}

function applyAccentColor(color) {
    if (color) {
        setAccentColor(color);
    }
}

// Farbe anpassen (heller/dunkler)
function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;

    return '#' + (0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}

// API-Key speichern
function saveApiKey() {
    const key = document.getElementById('apiKeyInput').value.trim();
    if (key) {
        localStorage.setItem('histolearn_apiKey', key);
        showToast('API-Key gespeichert!', 'success');
    }
}

// Burg-Anzeige aktualisieren (Legacy – ersetzt durch castle-builder.js)
function updateCastleDisplay() {
    if (!currentUser) return;
    if (!document.getElementById('castleLevel')) return; // neuer Baumeister ist aktiv

    const parts = currentUser.progress.castleParts;

    Object.entries(parts).forEach(([part, unlocked]) => {
        const element = document.getElementById(part);
        if (element) {
            if (unlocked) {
                element.classList.remove('locked');
                element.classList.add('unlocked');
            } else {
                element.classList.add('locked');
                element.classList.remove('unlocked');
            }
        }
    });

    // Level und Kosten
    document.getElementById('castleLevel').textContent = `${currentUser.progress.castleLevel}/7`;

    const upgradeCosts = [0, 50, 75, 100, 150, 200, 300];
    const nextCost = upgradeCosts[currentUser.progress.castleLevel] || 'MAX';
    document.getElementById('nextUpgradeCost').textContent = typeof nextCost === 'number' ? `${nextCost} 🐄` : 'Fertig!';

    // Rang-Liste aktualisieren
    document.querySelectorAll('.rank-item').forEach((item, index) => {
        item.classList.remove('current', 'achieved');
        if (index < currentUser.progress.rank) {
            item.classList.add('achieved');
        } else if (index === currentUser.progress.rank) {
            item.classList.add('current');
        }
    });
}

// Burg-Upgrade kaufen
function buyUpgrade(type) {
    if (!currentUser) return;

    const costs = {
        wall: 50,
        tower: 100,
        keep: 200
    };

    const cost = costs[type];
    if (!cost) return;

    if (!spendCoins(cost)) {
        return;
    }

    // Upgrade anwenden
    switch (type) {
        case 'wall':
            if (!currentUser.progress.castleParts.wallLeft) {
                currentUser.progress.castleParts.wallLeft = true;
            } else if (!currentUser.progress.castleParts.wallRight) {
                currentUser.progress.castleParts.wallRight = true;
            }
            break;
        case 'tower':
            if (!currentUser.progress.castleParts.towerLeft) {
                currentUser.progress.castleParts.towerLeft = true;
            } else if (!currentUser.progress.castleParts.towerRight) {
                currentUser.progress.castleParts.towerRight = true;
            }
            break;
        case 'keep':
            currentUser.progress.castleParts.keep = true;
            break;
    }

    // Castle Level erhöhen
    const unlockedParts = Object.values(currentUser.progress.castleParts).filter(v => v).length;
    currentUser.progress.castleLevel = unlockedParts;

    updateUserProgress({
        castleParts: currentUser.progress.castleParts,
        castleLevel: currentUser.progress.castleLevel
    });

    showToast(`🏰 Burg ausgebaut!`, 'success');
    addActivity('achievement', `Burg-Upgrade: ${type}`);
}

// Ordner erstellen
function createFolder() {
    const name = prompt('Name des neuen Ordners:');
    if (!name || !name.trim()) return;

    if (!currentUser.folders) {
        currentUser.folders = [];
    }

    currentUser.folders.push({
        id: Date.now().toString(),
        name: name.trim(),
        createdAt: new Date().toISOString(),
        items: []
    });

    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }

    loadFolders();
    showToast(`Ordner "${name}" erstellt!`, 'success');
}

// Ordner laden
function loadFolders() {
    const list = document.getElementById('folderList');
    if (!list) return;

    const noteCount = currentUser?.notes?.length || 0;
    const favCount = currentUser?.favorites?.length || 0;
    const learnedCount = currentUser?.learnedMaterials?.length || 0;

    let html = `
        <div class="folder-item active" onclick="openFolder('alle')">
            <span>📂</span> Alle Materialien
        </div>
        <div class="folder-item" onclick="openFolder('notizen')">
            <span>📝</span> Meine Notizen ${noteCount > 0 ? `<span class="folder-count">${noteCount}</span>` : ''}
        </div>
        <div class="folder-item" onclick="openFolder('favoriten')">
            <span>⭐</span> Favoriten ${favCount > 0 ? `<span class="folder-count">${favCount}</span>` : ''}
        </div>
        <div class="folder-item" onclick="openFolder('gelernt')">
            <span>✅</span> Gelernt ${learnedCount > 0 ? `<span class="folder-count">${learnedCount}</span>` : ''}
        </div>
        <hr style="border-color: var(--border-color); margin: 10px 0;">
        <div class="folder-item" onclick="openFolder('fruehe-neuzeit')">
            <span>⚓</span> Frühe Neuzeit
        </div>
        <div class="folder-item" onclick="openFolder('neuzeit')">
            <span>🏭</span> 19. Jahrhundert
        </div>
        <div class="folder-item" onclick="openFolder('zeitgeschichte')">
            <span>🌍</span> 20. Jahrhundert
        </div>
        <div class="folder-item" onclick="openFolder('methoden')">
            <span>📝</span> Methoden
        </div>
    `;

    // Benutzerdefinierte Ordner
    if (currentUser && currentUser.folders) {
        html += '<hr style="border-color: var(--border-color); margin: 10px 0;">';
        currentUser.folders.forEach(folder => {
            html += `
                <div class="folder-item" onclick="openFolder('${folder.id}')">
                    <span>📁</span> ${folder.name}
                </div>
            `;
        });
    }

    list.innerHTML = html;

    // CSS für Folder-Counts
    if (!document.getElementById('folderStyles')) {
        const style = document.createElement('style');
        style.id = 'folderStyles';
        style.textContent = `
            .folder-item { display: flex; align-items: center; gap: 10px; padding: 10px 15px; cursor: pointer; border-radius: 8px; transition: var(--transition); }
            .folder-item:hover { background: var(--bg-tertiary); }
            .folder-item.active { background: var(--primary); color: white; }
            .folder-count { background: var(--primary); color: white; font-size: 0.75em; padding: 2px 8px; border-radius: 10px; margin-left: auto; }
            .folder-item.active .folder-count { background: white; color: var(--primary); }
        `;
        document.head.appendChild(style);
    }

    // Beim Laden auch Bibliothek-Inhalt anzeigen
    displayLibraryContent('alle');
}

// Ordner öffnen
function openFolder(folderId) {
    // Aktiven Ordner markieren
    document.querySelectorAll('.folder-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.folder-item')?.classList.add('active');

    // Inhalt laden
    displayLibraryContent(folderId);
}

// Bibliothek durchsuchen
function searchLibrary() {
    const query = document.getElementById('librarySearch').value.toLowerCase().trim();
    displayLibraryContent('alle', query);
}

// Bibliothek filtern
function filterLibrary() {
    const filter = document.getElementById('libraryFilter').value;
    displayLibraryContent(filter);
}

// Bibliothek-Inhalt anzeigen
function displayLibraryContent(folderId = 'alle', searchQuery = '') {
    const content = document.getElementById('libraryContent');
    if (!content) return;

    let materials = [];

    // Basis-Materialien aus data.js
    if (typeof LEARNING_MATERIALS !== 'undefined') {
        materials = [...LEARNING_MATERIALS];
    }

    // Benutzer-Notizen hinzufügen
    if (currentUser && currentUser.notes) {
        const userNotes = currentUser.notes.map(note => ({
            id: note.id,
            title: note.title,
            category: 'notizen',
            type: 'note',
            content: note.content,
            createdAt: note.createdAt,
            isUserNote: true
        }));
        materials = [...materials, ...userNotes];
    }

    // Filter nach Kategorie
    if (folderId !== 'alle' && folderId !== 'favoriten' && folderId !== 'gelernt') {
        materials = materials.filter(m => m.category === folderId || (m.isUserNote && folderId === 'notizen'));
    }

    // Filter nach Favoriten
    if (folderId === 'favoriten' && currentUser) {
        const favorites = currentUser.favorites || [];
        materials = materials.filter(m => favorites.includes(m.id));
    }

    // Filter nach gelernt
    if (folderId === 'gelernt' && currentUser) {
        const learned = currentUser.learnedMaterials || [];
        materials = materials.filter(m => learned.includes(m.id));

        // Abgeschlossene Themenübungen hinzufügen
        if (currentUser.progress && currentUser.progress.topicProgress) {
            const TOPIC_NAMES = {
                'französische-revolution': 'Französische Revolution', 'industrialisierung': 'Industrialisierung',
                'imperialismus': 'Imperialismus', 'erster-weltkrieg': 'Erster Weltkrieg',
                'weimarer-republik': 'Weimarer Republik', 'revolution-1848': 'Revolution 1848',
                'nationalsozialismus': 'Nationalsozialismus', 'zweiter-weltkrieg': 'Zweiter Weltkrieg',
                'holocaust': 'Holocaust', 'brd-ddr': 'BRD und DDR', 'kalter-krieg': 'Kalter Krieg',
                'wiedervereinigung': 'Wiedervereinigung', 'russland': 'Russland', 'china': 'China',
                'tuerkei': 'Türkei / Osmanisches Reich', 'europaeische-union': 'Europäische Union'
            };
            Object.entries(currentUser.progress.topicProgress).forEach(([topic, prog]) => {
                if (prog.completed > 0) {
                    const avgScore = prog.scores.length > 0
                        ? Math.round(prog.scores.reduce((a, b) => a + b, 0) / prog.scores.length) : 0;
                    materials.push({
                        id: 'topic-progress-' + topic,
                        title: '📚 ' + (TOPIC_NAMES[topic] || topic),
                        category: 'gelernt',
                        type: 'topic-progress',
                        content: `${prog.completed} von ${prog.total} Übungen erledigt • Ø ${avgScore}%`,
                        isTopicProgress: true,
                        topic
                    });
                }
            });
        }
    }

    // Suche
    if (searchQuery) {
        materials = materials.filter(m =>
            m.title.toLowerCase().includes(searchQuery) ||
            (m.content && m.content.toLowerCase().includes(searchQuery))
        );
    }

    // Anzeige
    if (materials.length === 0) {
        content.innerHTML = `
            <div style="text-align: center; padding: 60px; color: var(--text-secondary);">
                <div style="font-size: 4em; margin-bottom: 20px;">📚</div>
                <p>Keine Materialien gefunden.</p>
                ${folderId === 'notizen' ? '<button class="btn btn-primary" onclick="createNote()">+ Neue Notiz erstellen</button>' : ''}
            </div>
        `;
        return;
    }

    content.innerHTML = `
        <div class="library-grid">
            ${materials.map(m => `
                <div class="library-card ${m.isUserNote ? 'user-note' : ''} ${m.isTopicProgress ? 'topic-progress-card' : ''}" onclick="openMaterial('${m.id}')">
                    <div class="library-card-header">
                        <span class="library-type">${getTypeIcon(m.type)}</span>
                        ${currentUser && !m.isTopicProgress ? `
                            <button class="favorite-btn ${(currentUser.favorites || []).includes(m.id) ? 'active' : ''}"
                                    onclick="event.stopPropagation(); toggleFavorite('${m.id}')">
                                ${(currentUser.favorites || []).includes(m.id) ? '★' : '☆'}
                            </button>
                        ` : ''}
                    </div>
                    <h4>${m.title}</h4>
                    ${m.content && m.isTopicProgress ? `<p class="lib-card-progress-info">${m.content}</p>` : ''}
                    <div class="library-card-meta">
                        <span>${getCategoryName(m.category)}</span>
                        ${m.readTime ? `<span>~${m.readTime} min</span>` : ''}
                        ${m.difficulty ? `<span>${'⭐'.repeat(m.difficulty)}</span>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Typ-Icon ermitteln
function getTypeIcon(type) {
    const icons = {
        article: '📄',
        video: '🎬',
        quiz: '❓',
        note: '📝',
        summary: '📋',
        timeline: '📅',
        source: '📜',
        lernzettel: '📋',
        lernplan: '🗓️',
        'topic-progress': '📚'
    };
    return icons[type] || '📄';
}

// Kategorie-Name ermitteln
function getCategoryName(category) {
    if (typeof LIBRARY_CATEGORIES !== 'undefined') {
        const cat = LIBRARY_CATEGORIES.find(c => c.id === category);
        if (cat) return cat.name;
    }
    const names = {
        'fruehe-neuzeit': 'Frühe Neuzeit',
        neuzeit: '19. Jahrhundert',
        zeitgeschichte: '20. Jahrhundert',
        methoden: 'Methoden',
        notizen: 'Meine Notizen'
    };
    return names[category] || category;
}

// Material öffnen
function openMaterial(materialId) {
    // Topic-Fortschritts-Eintrag: direkt Übungen öffnen
    if (materialId.startsWith('topic-progress-')) {
        const topic = materialId.replace('topic-progress-', '');
        showTopicExercises(topic);
        return;
    }

    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    // Material finden
    let material = null;

    // In LEARNING_MATERIALS suchen
    if (typeof LEARNING_MATERIALS !== 'undefined') {
        material = LEARNING_MATERIALS.find(m => m.id === materialId);
    }

    // In Benutzer-Notizen suchen
    if (!material && currentUser && currentUser.notes) {
        const note = currentUser.notes.find(n => n.id === materialId);
        if (note) {
            material = {
                id: note.id,
                title: note.title,
                content: note.content,
                type: 'note',
                isUserNote: true
            };
        }
    }

    if (!material) {
        showToast('Material nicht gefunden', 'error');
        return;
    }

    const isFavorite = currentUser && (currentUser.favorites || []).includes(materialId);
    const isLearned = currentUser && (currentUser.learnedMaterials || []).includes(materialId);

    content.innerHTML = `
        <div class="material-view">
            <div class="material-header">
                <h2>${material.title}</h2>
                <div class="material-actions">
                    ${currentUser ? `
                        <button class="btn btn-icon ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${materialId}')" title="Favorit">
                            ${isFavorite ? '★' : '☆'}
                        </button>
                        <button class="btn btn-icon ${isLearned ? 'active' : ''}" onclick="toggleLearned('${materialId}')" title="Als gelernt markieren">
                            ${isLearned ? '✓' : '○'}
                        </button>
                    ` : ''}
                    ${material.isUserNote ? `
                        <button class="btn btn-secondary" onclick="editNote('${materialId}')">✏️ Bearbeiten</button>
                        <button class="btn btn-danger" onclick="deleteNote('${materialId}')">🗑️ Löschen</button>
                    ` : ''}
                </div>
            </div>

            <div class="material-content markdown-body">
                ${renderMarkdown(material.content)}
            </div>

            <div class="material-footer">
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Schließen</button>
                ${!material.isUserNote ? `
                    <button class="btn btn-primary" onclick="startMaterialQuiz('${materialId}')">🎯 Wissen testen</button>
                ` : ''}
            </div>
        </div>
        <style>
            .material-view { max-height: 80vh; overflow-y: auto; }
            .material-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; }
            .material-actions { display: flex; gap: 10px; flex-wrap: wrap; }
            .btn-icon { width: 40px; height: 40px; border-radius: 50%; font-size: 1.2em; }
            .btn-icon.active { background: var(--primary); color: white; }
            .btn-danger { background: #e74c3c; color: white; }
            .btn-danger:hover { background: #c0392b; }
            .material-content { background: var(--bg-tertiary); padding: 30px; border-radius: 15px; line-height: 1.8; }
            .material-content h1, .material-content h2, .material-content h3 { margin-top: 20px; margin-bottom: 10px; color: var(--primary); }
            .material-content ul, .material-content ol { margin-left: 20px; }
            .material-content li { margin: 8px 0; }
            .material-content strong { color: var(--primary); }
            .material-footer { margin-top: 20px; display: flex; gap: 15px; justify-content: flex-end; }
        </style>
    `;

    modal.classList.add('active');

    // Als angesehen tracken
    if (currentUser) {
        currentUser.progress.materialsViewed = (currentUser.progress.materialsViewed || 0) + 1;
        updateUserProgress({ materialsViewed: currentUser.progress.materialsViewed });
    }
}

// Einfaches Markdown rendern
function renderMarkdown(text) {
    if (!text) return '';

    return text
        // Headers
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Lists
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
}

// Favorit togglen
function toggleFavorite(materialId) {
    if (!currentUser) return;

    if (!currentUser.favorites) currentUser.favorites = [];

    const index = currentUser.favorites.indexOf(materialId);
    if (index === -1) {
        currentUser.favorites.push(materialId);
        showToast('Zu Favoriten hinzugefügt!', 'success');
    } else {
        currentUser.favorites.splice(index, 1);
        showToast('Aus Favoriten entfernt', 'info');
    }

    saveCurrentUser();
    displayLibraryContent('alle');
}

// Als gelernt markieren
function toggleLearned(materialId) {
    if (!currentUser) return;

    if (!currentUser.learnedMaterials) currentUser.learnedMaterials = [];

    const index = currentUser.learnedMaterials.indexOf(materialId);
    if (index === -1) {
        currentUser.learnedMaterials.push(materialId);
        showToast('Als gelernt markiert! +5 XP', 'success');
        addXP(5);
    } else {
        currentUser.learnedMaterials.splice(index, 1);
        showToast('Markierung entfernt', 'info');
    }

    saveCurrentUser();
}

// ===== NOTIZEN-SYSTEM =====

// Notiz erstellen
function createNote() {
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div class="note-editor">
            <h2>📝 Neue Notiz erstellen</h2>

            <div class="form-group">
                <label>Titel:</label>
                <input type="text" id="noteTitle" placeholder="Titel der Notiz..." style="width: 100%; padding: 12px; border-radius: 10px; border: 2px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary);">
            </div>

            <div class="form-group" style="margin-top: 15px;">
                <label>Kategorie:</label>
                <select id="noteCategory" style="width: 100%; padding: 12px; border-radius: 10px; border: 2px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary);">
                    <option value="fruehe-neuzeit">Frühe Neuzeit</option>
                    <option value="neuzeit">19. Jahrhundert</option>
                    <option value="zeitgeschichte">20. Jahrhundert</option>
                    <option value="methoden">Methoden</option>
                    <option value="notizen" selected>Allgemein</option>
                </select>
            </div>

            <div class="form-group" style="margin-top: 15px;">
                <label>Inhalt:</label>
                <textarea id="noteContent" rows="15" placeholder="Schreibe hier deine Notiz...

Du kannst Markdown verwenden:
# Überschrift
**fett**
*kursiv*
- Aufzählung" style="width: 100%; padding: 15px; border-radius: 10px; border: 2px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); font-family: inherit; resize: vertical;"></textarea>
            </div>

            <div style="margin-top: 20px; display: flex; gap: 15px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Abbrechen</button>
                <button class="btn btn-primary" onclick="saveNote()">💾 Speichern</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.getElementById('noteTitle').focus();
}

// Notiz speichern
function saveNote(noteId = null) {
    if (!currentUser) {
        showToast('Bitte erst einloggen!', 'warning');
        return;
    }

    const title = document.getElementById('noteTitle').value.trim();
    const category = document.getElementById('noteCategory').value;
    const content = document.getElementById('noteContent').value.trim();

    if (!title) {
        showToast('Bitte gib einen Titel ein!', 'warning');
        return;
    }

    if (!content) {
        showToast('Bitte gib einen Inhalt ein!', 'warning');
        return;
    }

    if (!currentUser.notes) currentUser.notes = [];

    if (noteId) {
        // Bestehende Notiz aktualisieren
        const noteIndex = currentUser.notes.findIndex(n => n.id === noteId);
        if (noteIndex !== -1) {
            currentUser.notes[noteIndex] = {
                ...currentUser.notes[noteIndex],
                title,
                category,
                content,
                updatedAt: new Date().toISOString()
            };
            showToast('Notiz aktualisiert!', 'success');
        }
    } else {
        // Neue Notiz erstellen
        const newNote = {
            id: 'note-' + Date.now(),
            title,
            category,
            content,
            createdAt: new Date().toISOString()
        };
        currentUser.notes.push(newNote);

        // Achievement prüfen
        currentUser.progress.notesCreated = (currentUser.progress.notesCreated || 0) + 1;
        updateUserProgress({ notesCreated: currentUser.progress.notesCreated });

        showToast('Notiz erstellt! +2 🐄', 'success');
        addCoins(2, 'Notiz erstellt');
        addXP(3);
    }

    saveCurrentUser();
    closeExerciseModal();
    displayLibraryContent('notizen');
}

// Notiz bearbeiten
function editNote(noteId) {
    if (!currentUser || !currentUser.notes) return;

    const note = currentUser.notes.find(n => n.id === noteId);
    if (!note) return;

    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div class="note-editor">
            <h2>✏️ Notiz bearbeiten</h2>

            <div class="form-group">
                <label>Titel:</label>
                <input type="text" id="noteTitle" value="${escapeHtml(note.title)}" style="width: 100%; padding: 12px; border-radius: 10px; border: 2px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary);">
            </div>

            <div class="form-group" style="margin-top: 15px;">
                <label>Kategorie:</label>
                <select id="noteCategory" style="width: 100%; padding: 12px; border-radius: 10px; border: 2px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary);">
                    <option value="fruehe-neuzeit" ${note.category === 'fruehe-neuzeit' ? 'selected' : ''}>Frühe Neuzeit</option>
                    <option value="neuzeit" ${note.category === 'neuzeit' ? 'selected' : ''}>19. Jahrhundert</option>
                    <option value="zeitgeschichte" ${note.category === 'zeitgeschichte' ? 'selected' : ''}>20. Jahrhundert</option>
                    <option value="methoden" ${note.category === 'methoden' ? 'selected' : ''}>Methoden</option>
                    <option value="notizen" ${note.category === 'notizen' ? 'selected' : ''}>Allgemein</option>
                </select>
            </div>

            <div class="form-group" style="margin-top: 15px;">
                <label>Inhalt:</label>
                <textarea id="noteContent" rows="15" style="width: 100%; padding: 15px; border-radius: 10px; border: 2px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); font-family: inherit; resize: vertical;">${escapeHtml(note.content)}</textarea>
            </div>

            <div style="margin-top: 20px; display: flex; gap: 15px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Abbrechen</button>
                <button class="btn btn-primary" onclick="saveNote('${noteId}')">💾 Speichern</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

// Notiz löschen
function deleteNote(noteId) {
    if (!currentUser || !currentUser.notes) return;

    if (!confirm('Möchtest du diese Notiz wirklich löschen?')) return;

    currentUser.notes = currentUser.notes.filter(n => n.id !== noteId);
    saveCurrentUser();

    showToast('Notiz gelöscht', 'info');
    closeExerciseModal();
    displayLibraryContent('notizen');
}

// HTML escapen
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Benutzer speichern
function saveCurrentUser() {
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }
}

// Übungstyp wechseln
function showExerciseType(type) {
    document.querySelectorAll('.exercise-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.exercise-type').forEach(ex => {
        ex.classList.remove('active');
    });

    event.target.classList.add('active');
    document.getElementById(`exercise${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.add('active');
}

// Quiz-Themen laden
function loadQuizTopics() {
    const container = document.getElementById('quizTopics');
    if (!container) return;

    container.innerHTML = QUIZ_TOPICS.map(topic => `
        <div class="topic-card" onclick="startQuiz('${topic.id}')">
            <div class="topic-icon">${topic.icon}</div>
            <h4>${topic.name}</h4>
            <span>${topic.questions.length} Fragen</span>
        </div>
    `).join('');
}

// Kognitives Spiel starten
function startCognitiveGame(gameType) {
    const area = document.getElementById('exerciseArea');
    area.style.display = 'block';

    switch (gameType) {
        case 'memory':
            showMemoryDifficultySelection();
            break;
        case 'sequence':
            startSequenceGame();
            break;
        case 'matching':
            startMatchingGame();
            break;
    }
}

// Hilfsfunktion: öffnet exerciseModal für kognitive Übungen
function _openCognitiveModal(html) {
    const content = document.getElementById('exerciseModalContent');
    const modal = document.getElementById('exerciseModal');
    if (!content || !modal) return;
    content.innerHTML = `<div class="cognitive-game-wrapper">${html}</div>`;
    modal.classList.add('active');
}

// Memory-Spiel: Schwierigkeitsstufen-Auswahl
function showMemoryDifficultySelection() {
    const levels = JSON.parse(localStorage.getItem('histolearn_memory_levels') || '{"max":1}');
    const maxUnlocked = levels.max || 1;

    _openCognitiveModal(`
        <h3>🃏 Memory - Schwierigkeitsstufe wählen</h3>
        <div class="memory-difficulty-select">
            <div class="difficulty-card ${maxUnlocked >= 1 ? 'unlocked' : 'locked'}" onclick="startMemoryGame(1)">
                <h4>⭐ Leicht</h4>
                <p>6 Paare · Jahreszahlen &amp; Ereignisse</p>
            </div>
            <div class="difficulty-card ${maxUnlocked >= 2 ? 'unlocked' : 'locked'}" ${maxUnlocked >= 2 ? 'onclick="startMemoryGame(2)"' : ''}>
                <h4>⭐⭐ Mittel</h4>
                <p>8 Paare · Begriffe &amp; Definitionen</p>
                ${maxUnlocked < 2 ? '<span class="difficulty-lock">🔒 Gewinne Stufe 1</span>' : ''}
            </div>
            <div class="difficulty-card ${maxUnlocked >= 3 ? 'unlocked' : 'locked'}" ${maxUnlocked >= 3 ? 'onclick="startMemoryGame(3)"' : ''}>
                <h4>⭐⭐⭐ Schwer</h4>
                <p>10 Paare · Personen &amp; historische Rolle</p>
                ${maxUnlocked < 3 ? '<span class="difficulty-lock">🔒 Gewinne Stufe 2</span>' : ''}
            </div>
        </div>
    `);
}

let flippedCards = [];
let matchedPairs = 0;
let memoryTotalPairs = 6;
let memoryCurrentDifficulty = 1;

// Memory-Spiel mit Schwierigkeitsstufe
function startMemoryGame(difficulty) {
    difficulty = difficulty || 1;
    memoryCurrentDifficulty = difficulty;

    const allPairs = {
        1: [
            { term: '1789', match: 'Französische Revolution' },
            { term: '1871', match: 'Deutsche Reichsgründung' },
            { term: '1914', match: 'Erster Weltkrieg' },
            { term: '1933', match: 'Machtergreifung' },
            { term: '1989', match: 'Mauerfall' },
            { term: '1517', match: 'Reformation' }
        ],
        2: [
            { term: 'Absolutismus', match: 'Uneingeschränkte Herrschaft eines Monarchen' },
            { term: 'Imperialismus', match: 'Ausdehnung staatlicher Macht über fremde Gebiete' },
            { term: 'Industrialisierung', match: 'Übergang von Agrar- zu Industriegesellschaft' },
            { term: 'Nationalismus', match: 'Übersteigertes Nationalgefühl' },
            { term: 'Sozialismus', match: 'Gesellschaft mit gemeinschaftlichem Eigentum' },
            { term: 'Demokratie', match: 'Herrschaft des Volkes durch Wahlen' },
            { term: 'Kolonialismus', match: 'Herrschaft über fremde Völker und Gebiete' },
            { term: 'Antisemitismus', match: 'Hass und Feindschaft gegen Juden' }
        ],
        3: [
            { term: 'Napoleon Bonaparte', match: 'Französischer Kaiser, Code Civil' },
            { term: 'Otto von Bismarck', match: 'Gründer des Deutschen Reiches 1871' },
            { term: 'Karl Marx', match: 'Begründer des wissenschaftlichen Sozialismus' },
            { term: 'Adolf Hitler', match: 'NS-Diktator, Ermächtigungsgesetz 1933' },
            { term: 'Konrad Adenauer', match: 'Erster Bundeskanzler der BRD' },
            { term: 'Michail Gorbatschow', match: 'Glasnost und Perestroika' },
            { term: 'Mao Zedong', match: 'Gründer der Volksrepublik China' },
            { term: 'Kemal Atatürk', match: 'Gründer der modernen Türkei' },
            { term: 'Lenin', match: 'Führer der Oktoberrevolution 1917' },
            { term: 'Franz Ferdinand', match: 'Erschossen 1914, Auslöser WK1' }
        ]
    };

    const pairs = allPairs[difficulty] || allPairs[1];
    memoryTotalPairs = pairs.length;
    flippedCards = [];
    matchedPairs = 0;

    const gridCols = difficulty === 3 ? 5 : 4;
    const diffLabel = difficulty === 1 ? 'Leicht' : difficulty === 2 ? 'Mittel' : 'Schwer';

    let cards = [];
    pairs.forEach((pair, index) => {
        cards.push({ id: index, content: pair.term, pairId: index, type: 'term' });
        cards.push({ id: index + 100, content: pair.match, pairId: index, type: 'match' });
    });
    cards = shuffleArray(cards);

    _openCognitiveModal(`
        <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px; flex-wrap:wrap;">
            <button class="btn btn-secondary" onclick="showMemoryDifficultySelection()">← Stufe wählen</button>
            <h3 style="margin:0;">🃏 Memory - ${diffLabel} (${pairs.length} Paare)</h3>
        </div>
        <div class="memory-grid" id="memoryGrid" style="grid-template-columns: repeat(${gridCols}, 1fr);">
            ${cards.map((card, i) => `
                <div class="memory-card" data-index="${i}" data-pair="${card.pairId}" onclick="flipMemoryCard(this)">
                    <div class="memory-card-inner">
                        <div class="memory-card-front">?</div>
                        <div class="memory-card-back">${card.content}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        <style>
            .memory-grid { display: grid; gap: 10px; max-width: 700px; margin: 0 auto; }
            .memory-card { aspect-ratio: 1; cursor: pointer; perspective: 1000px; }
            .memory-card-inner { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.5s; }
            .memory-card.flipped .memory-card-inner { transform: rotateY(180deg); }
            .memory-card-front, .memory-card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-size: 0.85em; padding: 8px; text-align: center; }
            .memory-card-front { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; font-size: 1.8em; }
            .memory-card-back { background: var(--bg-tertiary); border: 1px solid var(--border-color); transform: rotateY(180deg); }
            .memory-card.matched { opacity: 0.4; pointer-events: none; border: 2px solid var(--secondary); border-radius: 10px; }
        </style>
    `);
}

function flipMemoryCard(card) {
    if (flippedCards.length >= 2) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const pair1 = card1.dataset.pair;
        const pair2 = card2.dataset.pair;

        if (pair1 === pair2) {
            // Match!
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                flippedCards = [];
                matchedPairs++;

                if (matchedPairs >= memoryTotalPairs) {
                    // Nächste Stufe freischalten
                    const levels = JSON.parse(localStorage.getItem('histolearn_memory_levels') || '{"max":1}');
                    if (memoryCurrentDifficulty >= levels.max) {
                        levels.max = Math.min(memoryCurrentDifficulty + 1, 3);
                        localStorage.setItem('histolearn_memory_levels', JSON.stringify(levels));
                    }
                    const diff = memoryCurrentDifficulty;
                    setTimeout(() => showCognitiveReward(
                        5 * diff, 10 * diff,
                        () => startMemoryGame(diff)
                    ), 400);
                }
            }, 500);
        } else {
            // Kein Match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

let _cognitiveReplayFn = null;

function showCognitiveReward(coins, xp, replayFn) {
    const praises = [
        'Historisches Gespür bewiesen!',
        'Du kennst die Geschichte wirklich gut!',
        'Ausgezeichnet — das sitzt!',
        'Klasse gemacht, weiter so!',
        'Du bist auf dem richtigen Weg!'
    ];
    const praise = praises[Math.floor(Math.random() * praises.length)];
    addCoins(coins, 'Kognitives Spiel gewonnen');
    addXP(xp);
    _cognitiveReplayFn = replayFn;

    const content = document.getElementById('exerciseModalContent');
    if (!content) return;
    content.innerHTML = `
        <div class="cognitive-reward">
            <div class="cr-trophy">🏆</div>
            <h2 class="cr-title">Geschafft!</h2>
            <p class="cr-praise">${praise}</p>
            <div class="cr-rewards">
                <div class="cr-badge"><span class="cr-icon">🐄</span><span class="cr-val">+${coins}</span></div>
                <div class="cr-badge"><span class="cr-icon">⭐</span><span class="cr-val">+${xp} XP</span></div>
            </div>
            <div class="cr-actions">
                <button class="btn btn-secondary" onclick="_cognitiveReplayFn && _cognitiveReplayFn()">🔄 Nochmal</button>
                <button class="btn btn-primary" onclick="closeExerciseModal()">✓ Fertig</button>
            </div>
        </div>
    `;
}

// Reihenfolge-Spiel
function startSequenceGame() {
    const events = [
        { year: 1789, name: 'Französische Revolution' },
        { year: 1815, name: 'Wiener Kongress' },
        { year: 1848, name: 'Märzrevolution' },
        { year: 1871, name: 'Reichsgründung' },
        { year: 1914, name: 'Erster Weltkrieg' }
    ];

    const shuffled = shuffleArray([...events]);

    const html = `
        <h3 style="color:var(--secondary-light);margin-bottom:8px;">🔢 Bringe die Ereignisse in die richtige Reihenfolge!</h3>
        <p style="color:#a09080;margin-bottom:12px;">Ziehe die Ereignisse oder nummeriere sie von 1 (ältestes) bis 5 (neuestes)</p>
        <div class="sequence-list" id="sequenceList">
            ${shuffled.map((event, i) => `
                <div class="sequence-item" draggable="true" data-year="${event.year}">
                    <span class="sequence-number">${i + 1}</span>
                    <span class="sequence-name">${event.name}</span>
                </div>
            `).join('')}
        </div>
        <button class="btn btn-primary" onclick="checkSequence()">Überprüfen</button>
    `;

    _openCognitiveModal(html);
    setupSequenceDragDrop();
}

function setupSequenceDragDrop() {
    const list = document.getElementById('sequenceList');
    const items = list.querySelectorAll('.sequence-item');

    items.forEach(item => {
        item.addEventListener('dragstart', () => item.classList.add('dragging'));
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            updateSequenceNumbers();
        });
    });

    list.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        const dragging = document.querySelector('.dragging');
        if (afterElement) {
            list.insertBefore(dragging, afterElement);
        } else {
            list.appendChild(dragging);
        }
    });
}

function getDragAfterElement(container, y) {
    const elements = [...container.querySelectorAll('.sequence-item:not(.dragging)')];
    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateSequenceNumbers() {
    const items = document.querySelectorAll('#sequenceList .sequence-item');
    items.forEach((item, i) => {
        item.querySelector('.sequence-number').textContent = i + 1;
    });
}

function checkSequence() {
    const items = document.querySelectorAll('#sequenceList .sequence-item');
    let correct = 0;
    const years = [];

    items.forEach(item => {
        years.push(parseInt(item.dataset.year));
    });

    // Prüfen ob sortiert
    for (let i = 0; i < years.length; i++) {
        const isCorrectPosition = years.slice(0, i + 1).every((y, j) => j === 0 || years[j - 1] < y);
        if (i === 0 || years[i] > years[i - 1]) {
            if (years.slice(0, i + 1).every((y, j, arr) => j === 0 || arr[j - 1] < y)) {
                items[i].classList.add('correct');
                items[i].classList.remove('incorrect');
            }
        }
    }

    // Vollständig korrekt?
    const isSorted = years.every((y, i, arr) => i === 0 || arr[i - 1] < y);

    if (isSorted) {
        showCognitiveReward(10, 15, startSequenceGame);
    } else {
        items.forEach((item, i) => {
            if (i > 0 && years[i] < years[i - 1]) {
                item.classList.add('incorrect');
                item.classList.remove('correct');
            }
        });
        showToast('Noch nicht ganz richtig. Versuch es nochmal!', 'warning');
    }
}

// Zuordnungs-Spiel
function startMatchingGame() {
    matchedCount = 0;
    selectedPerson = null;
    selectedEvent = null;
    const pairs = [
        { person: 'Napoleon', event: 'Kaiserkrönung 1804' },
        { person: 'Bismarck', event: 'Deutsche Einigung' },
        { person: 'Hitler', event: 'Nationalsozialismus' },
        { person: 'Konrad Adenauer', event: 'Erster Bundeskanzler der BRD' },
        { person: 'Willy Brandt', event: 'Ostpolitik und Entspannung' }
    ];

    const persons = shuffleArray(pairs.map(p => p.person));
    const events = shuffleArray(pairs.map(p => p.event));

    const html = `
        <h3 style="color:var(--secondary-light);margin-bottom:12px;">🔗 Ordne die Personen den Ereignissen zu!</h3>
        <div class="matching-container">
            <div class="matching-column">
                <h4>Personen</h4>
                ${persons.map(p => `<div class="matching-item" data-type="person" data-value="${p}" onclick="selectMatchingItem(this)">${p}</div>`).join('')}
            </div>
            <div class="matching-column">
                <h4>Ereignisse</h4>
                ${events.map(e => `<div class="matching-item" data-type="event" data-value="${e}" onclick="selectMatchingItem(this)">${e}</div>`).join('')}
            </div>
        </div>
        <div class="matching-results" id="matchingResults"></div>
    `;

    _openCognitiveModal(html);
}

let selectedPerson = null;
let selectedEvent = null;
let matchedCount = 0;

function selectMatchingItem(element) {
    const type = element.dataset.type;
    const value = element.dataset.value;

    if (element.classList.contains('matched')) return;

    // Auswahl aufheben bei erneutem Klick
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        if (type === 'person') selectedPerson = null;
        else selectedEvent = null;
        return;
    }

    // Alte Auswahl des gleichen Typs aufheben
    document.querySelectorAll(`.matching-item[data-type="${type}"]`).forEach(el => {
        el.classList.remove('selected');
    });

    element.classList.add('selected');

    if (type === 'person') {
        selectedPerson = value;
    } else {
        selectedEvent = value;
    }

    // Prüfen ob beide ausgewählt
    if (selectedPerson && selectedEvent) {
        checkMatch();
    }
}

function checkMatch() {
    const correctPairs = {
        'Napoleon': 'Kaiserkrönung 1804',
        'Bismarck': 'Deutsche Einigung',
        'Hitler': 'Nationalsozialismus',
        'Konrad Adenauer': 'Erster Bundeskanzler der BRD',
        'Willy Brandt': 'Ostpolitik und Entspannung'
    };

    const isCorrect = correctPairs[selectedPerson] === selectedEvent;

    const personEl = document.querySelector(`.matching-item[data-value="${selectedPerson}"]`);
    const eventEl = document.querySelector(`.matching-item[data-value="${selectedEvent}"]`);

    if (isCorrect) {
        personEl.classList.remove('selected');
        personEl.classList.add('matched');
        eventEl.classList.remove('selected');
        eventEl.classList.add('matched');
        matchedCount++;

        if (matchedCount >= 5) {
            showCognitiveReward(10, 15, startMatchingGame);
        }
    } else {
        personEl.classList.add('wrong');
        eventEl.classList.add('wrong');
        setTimeout(() => {
            personEl.classList.remove('selected', 'wrong');
            eventEl.classList.remove('selected', 'wrong');
        }, 500);
    }

    selectedPerson = null;
    selectedEvent = null;
}

// Array mischen
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// CSS für Slide-Out Animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========================================
// ADAPTIVE LEARNING UI FUNCTIONS
// ========================================

/**
 * Zeigt Session Start UI
 */
function showLearningSessionStart() {
    const modal = document.getElementById('adaptiveLearningModal');
    const content = document.getElementById('adaptiveLearningContent');

    if (!modal || !content) return;

    const today = new Date().toISOString().split('T')[0];

    content.innerHTML = `
        <div class="learning-session-start">
            <h2>🎯 Lernsession einrichten</h2>

            <div class="setup-row">
                <div class="setup-field">
                    <label>📅 Prüfungsdatum *</label>
                    <input type="date" id="examDate" min="${today}" required>
                </div>
                <div class="setup-field">
                    <label>📚 Thema *</label>
                    <select id="sessionTopic">
                        <option value="">-- Thema wählen --</option>
                        ${getAvailableTopics().map(t =>
                            `<option value="${t.id}">${t.name}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>

            <div class="setup-field">
                <label>🎯 Fokus <span class="optional-hint">(optional)</span></label>
                <input type="text" id="sessionFocus"
                    placeholder="z.B. Ursachen, Folgen, wichtige Personen, Daten">
            </div>

            <div class="setup-field">
                <label>📋 Kann-Liste <span class="optional-hint">(optional)</span></label>
                <textarea id="kannListe" rows="4"
                    placeholder="Füge hier ein, was du können musst – z.B. aus dem Aufgabenblatt deiner Lehrkraft:&#10;• Ursachen der Französischen Revolution nennen&#10;• Verlauf der Revolution erläutern&#10;• Bedeutung für Europa beurteilen"></textarea>
                <button class="btn btn-secondary btn-small" onclick="document.getElementById('kannListeFile').click()" style="margin-top:6px">
                    📁 Textdatei laden
                </button>
                <input type="file" id="kannListeFile" accept=".txt,.md" style="display:none" onchange="loadKannListeFile(event)">
            </div>

            <div class="session-paths">
                <div class="path-card" onclick="startDirectLernplan()">
                    <div class="path-icon">📋</div>
                    <h3>Lernplan erstellen</h3>
                    <p>KI erstellt einen strukturierten Lernplan basierend auf deinen Angaben</p>
                </div>
                <div class="path-card" onclick="startWissenTest()">
                    <div class="path-icon">🧪</div>
                    <h3>Wissen testen</h3>
                    <p>Zeige was du kannst → erhalte Feedback + individuellen Lernplan</p>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

/**
 * Liest eine Textdatei in das Kann-Liste-Feld
 */
function loadKannListeFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const ta = document.getElementById('kannListe');
        if (ta) ta.value = e.target.result;
    };
    reader.readAsText(file, 'UTF-8');
}

/**
 * Liest die Setup-Felder aus und validiert sie
 * @returns {Object|null} examInfo oder null bei Fehler
 */
function readSessionSetup() {
    const examDate = document.getElementById('examDate')?.value;
    const topicId = document.getElementById('sessionTopic')?.value;
    const focus = document.getElementById('sessionFocus')?.value?.trim() || '';
    const kannListe = document.getElementById('kannListe')?.value?.trim() || '';

    if (!examDate) {
        showToast('Bitte gib das Prüfungsdatum an!', 'error');
        return null;
    }
    if (!topicId) {
        showToast('Bitte wähle ein Thema!', 'error');
        return null;
    }

    const topicName = getTopicName(topicId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(examDate);
    const daysLeft = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));

    return { examDate, topicId, topicName, focus, kannListe, daysLeft };
}

/**
 * Pfad A: Direkt Lernplan erstellen
 */
function startDirectLernplan() {
    const examInfo = readSessionSetup();
    if (!examInfo) return;
    generateLernplan(examInfo, null);
}

// Cache für KI-generierte Diagnoseaufgaben (wird auch von adaptive-learning.js genutzt)
let _aiExerciseCache = {};

/**
 * Gibt den Text-Inhalt aller hochgeladenen Lernzettel zurück (max. 3000 Zeichen)
 */
function getLernzettelContent() {
    if (!currentUser || !currentUser.notes) return '';
    const texte = currentUser.notes
        .filter(n => n.type === 'lernzettel' && n.content && !n.content.startsWith('data:'))
        .map(n => `=== ${n.title} ===\n${n.content}`);
    return texte.join('\n\n').substring(0, 3000);
}

/**
 * Generiert 5 Diagnoseaufgaben per KI, passend zu Thema, Fokus und Lernzetteln
 * @param {Object} examInfo
 * @returns {Promise<Array>} Array von Exercise-Objekten
 */
async function generateAIDiagnosticQuestions(examInfo) {
    let prompt = `Du bist ein Geschichtslehrer für Schüler der Klasse 8-10 in Deutschland.

Erstelle genau 5 Diagnoseaufgaben zum Thema "${examInfo.topicName}".`;

    if (examInfo.focus) {
        prompt += `\n\nFokus des Schülers: ${examInfo.focus}`;
    }
    if (examInfo.kannListe) {
        prompt += `\n\nDer Schüler muss laut Aufgabenblatt folgendes können:\n${examInfo.kannListe}`;
    }
    const lernzettel = getLernzettelContent();
    if (lernzettel) {
        prompt += `\n\nLernzettel des Schülers (Aufgaben darauf aufbauen):\n${lernzettel}`;
    }

    prompt += `

Verteile die 5 Aufgaben so: 2× AFB I (Reproduktion), 2× AFB II (Transfer), 1× AFB III (Reflexion).
Basiere die Fragen konkret auf dem Fokus/den Lernzetteln, nicht allgemein.

Antworte NUR mit einem JSON-Array (kein Text davor/danach):
[
  {
    "question": "Aufgabenstellung",
    "afb": 1,
    "operator": "nennen",
    "points": 3,
    "sampleAnswer": "Musterantwort als Fließtext",
    "tips": "Kurzer Hinweis für den Schüler"
  },
  ...
]`;

    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 2000,
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) throw new Error(`API ${response.status}`);

    const data = await response.json();
    const rawText = data.content[0].text;

    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Kein JSON in KI-Antwort');

    const questions = JSON.parse(jsonMatch[0]);

    return questions.map((q, i) => {
        const id = `ai_diag_${Date.now()}_${i}`;
        const exercise = {
            id,
            question: q.question || '',
            afb: q.afb || (i < 2 ? 1 : i < 4 ? 2 : 3),
            operator: q.operator || 'beschreiben',
            points: q.points || 3,
            sampleAnswer: [q.sampleAnswer || ''],
            tips: q.tips || ''
        };
        _aiExerciseCache[id] = exercise;
        return exercise;
    });
}

/**
 * Pfad B: Wissen testen → danach Lernplan anbieten
 */
async function startWissenTest() {
    const examInfo = readSessionSetup();
    if (!examInfo) return;

    localStorage.setItem('histolearn_pending_examinfo', JSON.stringify(examInfo));

    const sessionId = startLearningSession(
        `Vorbereitung: ${examInfo.topicName} – Prüfung am ${examInfo.examDate}`,
        examInfo.topicId,
        examInfo.examDate
    );

    // KI-Fragen generieren, wenn Fokus, Kann-Liste oder Lernzettel vorhanden
    const hasLernzettel = currentUser?.notes?.some(
        n => n.type === 'lernzettel' && n.content && !n.content.startsWith('data:')
    );
    if (examInfo.focus || examInfo.kannListe || hasLernzettel) {
        const content = document.getElementById('adaptiveLearningContent');
        const modal = document.getElementById('adaptiveLearningModal');
        if (content) {
            content.innerHTML = `
                <div class="lernplan-loading">
                    <div class="loading-spinner">⏳</div>
                    <h3>Aufgaben werden vorbereitet…</h3>
                    <p>Die KI erstellt Fragen passend zu deinem Fokus und deinen Lernzetteln.</p>
                </div>
            `;
        }
        if (modal) modal.style.display = 'block';

        try {
            const aiExercises = await generateAIDiagnosticQuestions(examInfo);
            const session = currentUser?.progress?.learningSessions?.current;
            if (session) {
                session.aiDiagnosticExercises = aiExercises.map(e => e.id);
            }
        } catch (err) {
            console.error('KI-Fragengenerierung fehlgeschlagen, nutze statische Aufgaben:', err);
        }
    }

    showDiagnosticIntro(sessionId);
}

/**
 * Generiert einen KI-Lernplan via Claude API
 * @param {Object} examInfo - { examDate, topicId, topicName, focus, kannListe, daysLeft }
 * @param {Object|null} diagnosticResults - optional Diagnose-Ergebnisse
 */
// Zwischenspeicher für Retry
let _currentLernplanRequest = null;

async function generateLernplan(examInfo, diagnosticResults) {
    const content = document.getElementById('adaptiveLearningContent');
    if (!content) return;

    // Für Retry merken
    _currentLernplanRequest = { examInfo, diagnosticResults };

    // Lade-Anzeige
    content.innerHTML = `
        <div class="lernplan-loading">
            <div class="loading-spinner">⏳</div>
            <h3>Lernplan wird erstellt…</h3>
            <p>Die KI analysiert deine Angaben und erstellt einen individuellen Plan.</p>
        </div>
    `;

    // Prompt aufbauen
    const todayStr = new Date().toLocaleDateString('de-DE');
    const examDateStr = new Date(examInfo.examDate).toLocaleDateString('de-DE');

    let prompt = `Du bist ein erfahrener Geschichtslehrer für Schüler der Mittelstufe (Klasse 8-10). Erstelle einen konkreten, tagesgenauen Lernplan.

**Prüfungsinfos:**
- Thema: ${examInfo.topicName}
- Prüfungsdatum: ${examDateStr}
- Heute: ${todayStr}
- Verbleibende Tage: ${examInfo.daysLeft}`;

    if (examInfo.focus) {
        prompt += `\n- Fokusthemen: ${examInfo.focus}`;
    }
    if (examInfo.kannListe) {
        prompt += `\n\n**Kann-Liste (muss beherrscht werden):**\n${examInfo.kannListe}`;
    }
    if (diagnosticResults) {
        const stärken = diagnosticResults.strengths.map(s => `${s.name} (${Math.round(s.score * 100)}%)`).join(', ') || 'keine';
        const schwächen = diagnosticResults.weaknesses.map(w => `${getWeaknessName(w)} (${Math.round(w.score * 100)}%)`).join(', ') || 'keine';
        prompt += `\n\n**Diagnose-Ergebnis:**\n- Gesamtergebnis: ${Math.round(diagnosticResults.overallScore * 100)}%\n- Stärken: ${stärken}\n- Verbesserungsbedarf: ${schwächen}`;
    }

    prompt += `\n\n**Format des Lernplans:**
Erstelle eine tagesweise Aufteilung mit konkreten Lernzielen. Struktur:
- Überschrift mit Datum oder "Tag X"
- 2-3 konkrete Lernziele für diesen Tag
- Empfohlene Methode (z.B. Zusammenfassung schreiben, Zeitleiste erstellen, Übungsaufgaben lösen)
- Zeitaufwand (ca.)

Zum Schluss: 3 Tipps für den Prüfungstag. Halte den Plan realistisch und ermutigend.`;

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 2000,
                system: 'Du bist ein freundlicher, motivierender Geschichtslehrer für Schüler der Klassen 8-10. Antworte immer auf Deutsch. Sei konkret, strukturiert und ermutigend.',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();
        const lernplanText = data.content?.[0]?.text || null;

        if (!lernplanText) throw new Error('Keine Antwort von der KI');

        showLernplanResult(lernplanText, examInfo);

    } catch (err) {
        content.innerHTML = `
            <div class="lernplan-error">
                <h3>⚠️ Fehler beim Erstellen des Lernplans</h3>
                <p>Die KI konnte gerade nicht erreicht werden. Bitte versuche es erneut.</p>
                <button class="btn btn-primary" onclick="retryLernplan()">
                    🔄 Erneut versuchen
                </button>
                <button class="btn btn-secondary" onclick="showLearningSessionStart()">← Zurück</button>
            </div>
        `;
    }
}

/**
 * Erneuter Versuch für Lernplan-Generierung
 */
function retryLernplan() {
    if (_currentLernplanRequest) {
        generateLernplan(_currentLernplanRequest.examInfo, _currentLernplanRequest.diagnosticResults);
    } else {
        showLearningSessionStart();
    }
}

/**
 * Zeigt den fertigen Lernplan im Modal an
 */
// Zwischenspeicher für aktuellen Lernplan
let _currentLernplan = null;

function showLernplanResult(lernplanText, examInfo) {
    const content = document.getElementById('adaptiveLearningContent');
    if (!content) return;

    const examDateStr = examInfo.examDate
        ? new Date(examInfo.examDate).toLocaleDateString('de-DE')
        : '–';

    // Lernplan global speichern für den Speichern-Button
    _currentLernplan = { lernplanText, examInfo, examDateStr };

    // Markdown → HTML
    const formatted = lernplanText
        .replace(/^## (.+)$/gm, '<h3 class="lp-h2">$1</h3>')
        .replace(/^### (.+)$/gm, '<h4 class="lp-h3">$1</h4>')
        .replace(/^---+$/gm, '<hr class="lp-hr">')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
        .replace(/\n/g, '<br>');

    content.innerHTML = `
        <div class="lernplan-result">
            <div class="lernplan-header">
                <h2>📋 Dein Lernplan</h2>
                <div class="lernplan-meta">
                    <span>📚 ${escapeHtml(examInfo.topicName)}</span>
                    <span>📅 Prüfung: ${examDateStr}</span>
                    ${examInfo.daysLeft ? `<span>⏳ ${examInfo.daysLeft} Tage</span>` : ''}
                </div>
            </div>
            <div class="lernplan-text" id="lernplanTextContent">${formatted}</div>
            <div class="lernplan-actions">
                <button class="btn btn-primary" id="saveLernplanBtn" onclick="saveLernplanToMaterials()">
                    💾 In Materialien speichern
                </button>
                <button class="btn btn-secondary" onclick="showLearningSessionStart()">← Neu einrichten</button>
            </div>
        </div>
    `;
}

/**
 * Speichert den aktuellen Lernplan als Notiz in Materialien
 */
function saveLernplanToMaterials() {
    if (!currentUser) {
        showToast('Bitte erst einloggen!', 'warning');
        return;
    }
    if (!_currentLernplan) {
        showToast('Kein Lernplan zum Speichern vorhanden!', 'error');
        return;
    }

    const { lernplanText, examInfo, examDateStr } = _currentLernplan;
    const title = `Lernplan: ${examInfo.topicName} – Prüfung am ${examDateStr}`;

    if (!currentUser.notes) currentUser.notes = [];

    const newNote = {
        id: 'lernplan-' + Date.now(),
        title: title,
        category: 'methoden',
        content: lernplanText,
        type: 'lernplan',
        topicId: examInfo.topicId,
        createdAt: new Date().toISOString()
    };

    currentUser.notes.push(newNote);
    currentUser.progress.notesCreated = (currentUser.progress.notesCreated || 0) + 1;
    updateUserProgress({ notesCreated: currentUser.progress.notesCreated });
    saveCurrentUser();

    showToast('Lernplan in Materialien gespeichert! 💾', 'success');
    addXP(5);
    addCoins(3, 'Lernplan erstellt');

    const saveBtn = document.getElementById('saveLernplanBtn');
    if (saveBtn) {
        saveBtn.textContent = '✅ Gespeichert';
        saveBtn.disabled = true;
    }
}

/**
 * Erstellt eine neue Lernsession (Legacy – bleibt für Kompatibilität)
 */
function createLearningSession() {
    startWissenTest();
}

/**
 * Zeigt Diagnose-Intro
 * @param {string} sessionId - Die Session-ID
 */
function showDiagnosticIntro(sessionId) {
    const content = document.getElementById('adaptiveLearningContent');
    if (!content) return;

    const session = currentUser?.progress?.learningSessions?.current;
    const hasAiQuestions = session?.aiDiagnosticExercises?.length > 0;
    const questionCount = hasAiQuestions ? session.aiDiagnosticExercises.length : 10;
    const aiHint = hasAiQuestions
        ? '<p>✨ Die Aufgaben wurden <strong>individuell auf deinen Fokus und deine Lernzettel abgestimmt</strong>.</p>'
        : '';

    content.innerHTML = `
        <div class="diagnostic-intro">
            <h2>📊 Diagnose-Phase</h2>
            <p>Ich möchte zunächst einschätzen, wo du stehst!</p>
            ${aiHint}
            <p>Du bekommst <strong>${questionCount} Aufgaben</strong> aus verschiedenen Schwierigkeitsstufen.</p>

            <div class="diagnostic-tips">
                <h4>💡 Tipps:</h4>
                <ul>
                    <li>Beantworte so gut du kannst</li>
                    <li>Wenn du etwas nicht weißt, überspringe die Aufgabe</li>
                    <li>Dauer: etwa ${Math.round(questionCount * 1.5)}-${questionCount * 2} Minuten</li>
                </ul>
            </div>

            <div class="diagnostic-progress-indicator">
                <div class="progress-bar">
                    <div class="progress-fill" id="diagnosticProgressFill" style="width: 0%"></div>
                </div>
                <span class="progress-text" id="diagnosticProgressText">0 / ${questionCount} Aufgaben</span>
            </div>

            <button class="btn btn-primary" onclick="startDiagnosticExercises('${sessionId}')">
                Los geht's! 🚀
            </button>
        </div>
    `;
}

/**
 * Startet die diagnostischen Übungen
 * @param {string} sessionId - Die Session-ID
 */
function startDiagnosticExercises(sessionId) {
    if (!currentUser || !currentUser.progress.learningSessions?.current) {
        showToast('Keine aktive Session!', 'error');
        return;
    }

    const session = currentUser.progress.learningSessions.current;

    // KI-generierte Aufgaben nutzen, falls vorhanden; sonst statische Auswahl
    let diagnosticExercises;
    if (session.aiDiagnosticExercises && session.aiDiagnosticExercises.length > 0) {
        diagnosticExercises = session.aiDiagnosticExercises
            .map(id => _aiExerciseCache[id])
            .filter(Boolean);
    } else {
        diagnosticExercises = selectDiagnosticExercises(session.topicId);
    }

    if (diagnosticExercises.length === 0) {
        showToast('Keine Übungen gefunden!', 'error');
        return;
    }

    // Speichere diagnostic exercises in session
    session.diagnosticExercises = diagnosticExercises.map(e => e.id);
    session.currentDiagnosticIndex = 0;

    // Zeige erste Übung
    showNextDiagnosticExercise(sessionId);
}

/**
 * Zeigt nächste Diagnose-Übung
 * @param {string} sessionId - Die Session-ID
 */
function showNextDiagnosticExercise(sessionId) {
    const session = currentUser.progress.learningSessions.current;
    if (!session || session.id !== sessionId) return;

    const index = session.currentDiagnosticIndex || 0;
    const diagnosticIds = session.diagnosticExercises || [];

    if (index >= diagnosticIds.length) {
        // Diagnose abgeschlossen
        completeDiagnosticPhase(sessionId);
        return;
    }

    const exercise = getExerciseById(diagnosticIds[index]);
    if (!exercise) {
        session.currentDiagnosticIndex++;
        showNextDiagnosticExercise(sessionId);
        return;
    }

    // Update progress indicator
    updateDiagnosticProgress(index, diagnosticIds.length);

    // Zeige Übung
    showExercisePractice(exercise, sessionId);
}

/**
 * Aktualisiert Diagnose-Fortschritt
 * @param {number} current - Aktueller Index
 * @param {number} total - Gesamt-Anzahl
 */
function updateDiagnosticProgress(current, total) {
    const progressFill = document.getElementById('diagnosticProgressFill');
    const progressText = document.getElementById('diagnosticProgressText');

    if (progressFill) {
        const percent = ((current + 1) / total) * 100;
        progressFill.style.width = `${percent}%`;
    }

    if (progressText) {
        progressText.textContent = `${current + 1} / ${total} Aufgaben`;
    }
}

/**
 * Fortsetzt nach Submit in Diagnose
 */
function continueAdaptivePractice() {
    const session = currentUser?.progress?.learningSessions?.current;
    if (!session) {
        closeAdaptiveLearningModal();
        return;
    }

    if (session.phase === 'diagnostic') {
        // Nächste Diagnose-Übung
        session.currentDiagnosticIndex = (session.currentDiagnosticIndex || 0) + 1;
        showNextDiagnosticExercise(session.id);
    } else if (session.phase === 'practice') {
        // Nächste adaptive Übung
        const nextExercise = selectNextExercise(session.id);
        if (nextExercise) {
            showExercisePractice(nextExercise, session.id);
        } else {
            // Keine Schwächen mehr
            showSessionSummary();
        }
    }
}

/**
 * Schließt Diagnose-Phase ab
 * @param {string} sessionId - Die Session-ID
 */
function completeDiagnosticPhase(sessionId) {
    const session = currentUser.progress.learningSessions.current;
    if (!session || session.id !== sessionId) return;

    // Diagnose analysieren
    const results = analyzeDiagnosticResults(session.diagnosticExercises);

    if (!results) {
        showToast('Fehler bei der Analyse!', 'error');
        return;
    }

    // Speichern
    session.diagnosticCompleted = true;
    session.diagnosticResults = results;
    session.phase = 'practice';

    // Weaknesses in User-Progress speichern
    if (!currentUser.weaknesses) {
        currentUser.weaknesses = [];
    }
    currentUser.weaknesses = results.weaknesses;

    updateUserProgress({
        learningSessions: currentUser.progress.learningSessions,
        weaknesses: currentUser.weaknesses
    });

    // Achievement prüfen
    checkAchievements();

    // Ergebnisse zeigen
    showDiagnosticResults(results, sessionId);
}

/**
 * Zeigt Diagnose-Ergebnisse
 * @param {Object} results - Die Analyse-Ergebnisse
 * @param {string} sessionId - Die Session-ID
 */
function showDiagnosticResults(results, sessionId) {
    const content = document.getElementById('adaptiveLearningContent');
    if (!content) return;

    content.innerHTML = `
        <div class="diagnostic-results">
            <h2>📊 Diagnose-Ergebnisse</h2>

            <div class="result-summary">
                <div class="result-card main">
                    <div class="result-icon">🎯</div>
                    <div class="result-value">${Math.round(results.overallScore * 100)}%</div>
                    <div class="result-label">Gesamtergebnis</div>
                </div>
            </div>

            <div class="strength-weakness-analysis">
                <div class="strengths-box">
                    <h3>💪 Deine Stärken</h3>
                    ${results.strengths.length > 0 ? `
                        <ul>
                            ${results.strengths.map(s =>
                                `<li><strong>${s.name}:</strong> ${Math.round(s.score * 100)}%</li>`
                            ).join('')}
                        </ul>
                    ` : '<p>Noch keine Stärken identifiziert.</p>'}
                </div>

                <div class="weaknesses-box">
                    <h3>📚 Übungsbedarf</h3>
                    ${results.weaknesses.length > 0 ? `
                        <ul>
                            ${results.weaknesses.map(w =>
                                `<li><strong>${getWeaknessName(w)}:</strong> ${Math.round(w.score * 100)}%
                                <span class="severity-badge ${w.severity}">${w.severity === 'high' ? 'hoch' : 'mittel'}</span></li>`
                            ).join('')}
                        </ul>
                    ` : '<p>Sehr gut! Keine Schwächen gefunden.</p>'}
                </div>
            </div>

            <div class="learning-plan">
                <h3>🗺️ Dein Lernplan</h3>
                <p>Ich habe <strong>${results.weaknesses.length} Bereiche</strong> gefunden,
                   ${results.weaknesses.length > 0 ? 'die wir zusammen üben sollten.' : 'du bist gut vorbereitet!'}</p>
                ${results.weaknesses.length > 0 ? '<p>Ich werde dir Aufgaben geben, die auf diese Bereiche abgestimmt sind!</p>' : ''}
            </div>

            <div class="diagnostic-after-actions">
                <button class="btn btn-primary" onclick="startAdaptivePractice('${sessionId}')">
                    ${results.weaknesses.length > 0 ? 'Jetzt üben! 🚀' : 'Übungen machen 🎯'}
                </button>
                <button class="btn btn-secondary" onclick="generateLernplanAfterDiagnostic(${JSON.stringify(results).replace(/"/g, '&quot;')})">
                    📋 Individuellen Lernplan erstellen
                </button>
            </div>
        </div>
    `;
}

/**
 * Erstellt Lernplan nach Diagnostik mit gespeichertem examInfo
 */
function generateLernplanAfterDiagnostic(diagnosticResults) {
    let examInfo = null;
    try {
        const stored = localStorage.getItem('histolearn_pending_examinfo');
        if (stored) examInfo = JSON.parse(stored);
    } catch(e) {}

    if (!examInfo) {
        // Fallback: Session-Daten nutzen
        const session = currentUser?.progress?.learningSessions?.current;
        if (session) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const examDate = session.examDate || '';
            const daysLeft = examDate
                ? Math.ceil((new Date(examDate) - today) / (1000 * 60 * 60 * 24))
                : 7;
            examInfo = {
                examDate: examDate || '',
                topicId: session.topicId,
                topicName: getTopicName(session.topicId),
                focus: '',
                kannListe: '',
                daysLeft
            };
        }
    }

    if (!examInfo) {
        showToast('Keine Prüfungsinfos gefunden. Bitte neu einrichten.', 'error');
        showLearningSessionStart();
        return;
    }

    generateLernplan(examInfo, diagnosticResults);
}

/**
 * Startet adaptive Practice-Phase
 * @param {string} sessionId - Die Session-ID
 */
function startAdaptivePractice(sessionId) {
    const session = currentUser?.progress?.learningSessions?.current;
    if (!session || session.id !== sessionId) return;

    const nextExercise = selectNextExercise(sessionId);
    if (nextExercise) {
        showExercisePractice(nextExercise, sessionId);
    } else {
        showToast('Keine weiteren Übungen verfügbar.', 'info');
        showSessionSummary();
    }
}

/**
 * Zeigt Lernfortschritt-Dashboard
 */
function showLearningProgress() {
    const session = currentUser?.progress?.learningSessions?.current;
    const weaknesses = currentUser?.weaknesses || [];

    if (!session) {
        showToast('Keine aktive Session!', 'error');
        return;
    }

    const content = document.getElementById('adaptiveLearningContent');
    if (!content) return;

    content.innerHTML = `
        <div class="learning-progress-dashboard">
            <h2>📈 Dein Lernfortschritt</h2>

            <div class="session-info">
                <h3>${getTopicName(session.topicId)}</h3>
                <p>Gestartet: ${formatDate(session.startedAt)}</p>
            </div>

            <div class="progress-cards">
                <div class="progress-card">
                    <h4>Übungen absolviert</h4>
                    <div class="progress-value">${getSessionExerciseCount(session.id)}</div>
                </div>
                <div class="progress-card">
                    <h4>Durchschnitt</h4>
                    <div class="progress-value">${Math.round(getSessionAverageScore(session.id) * 100)}%</div>
                </div>
            </div>

            <div class="weakness-progress-section">
                <h3>Schwachstellen-Training</h3>
                ${weaknesses.length > 0 ? weaknesses.map(w => `
                    <div class="weakness-item ${w.improved ? 'improved' : ''}">
                        <div class="weakness-header">
                            <span>${getWeaknessName(w)}</span>
                            <span class="severity-badge ${w.severity}">${w.severity === 'high' ? 'hoch' : 'mittel'}</span>
                        </div>
                        <div class="weakness-progress-bar">
                            <div class="progress-fill" style="width: ${calculateWeaknessProgress(w)}%"></div>
                        </div>
                        <div class="weakness-stats">
                            ${w.practiceCount} Übungen ${w.improved ? '• ✅ Verbessert!' : ''}
                        </div>
                    </div>
                `).join('') : '<p>Keine Schwächen identifiziert.</p>'}
            </div>

            <div class="actions">
                <button class="btn btn-primary" onclick="continueAdaptivePractice()">Weiter üben</button>
                <button class="btn btn-secondary" onclick="showSessionSummary()">Session beenden</button>
            </div>
        </div>
    `;

    const modal = document.getElementById('adaptiveLearningModal');
    if (modal) modal.style.display = 'block';
}

/**
 * Zeigt Session-Summary
 */
function showSessionSummary() {
    const session = currentUser?.progress?.learningSessions?.current;

    if (!session) {
        closeAdaptiveLearningModal();
        return;
    }

    const content = document.getElementById('adaptiveLearningContent');
    if (!content) return;

    const exerciseCount = getSessionExerciseCount(session.id);
    const avgScore = getSessionAverageScore(session.id);
    const weaknessesImproved = currentUser.weaknesses.filter(w => w.improved).length;

    content.innerHTML = `
        <div class="session-summary">
            <h2>🎉 Session abgeschlossen!</h2>

            <div class="summary-stats">
                <div class="summary-card">
                    <div class="summary-icon">🎯</div>
                    <div class="summary-value">${exerciseCount}</div>
                    <div class="summary-label">Übungen gemacht</div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon">📊</div>
                    <div class="summary-value">${Math.round(avgScore * 100)}%</div>
                    <div class="summary-label">Durchschnitt</div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon">💪</div>
                    <div class="summary-value">${weaknessesImproved}</div>
                    <div class="summary-label">Schwächen verbessert</div>
                </div>
            </div>

            <div class="summary-message">
                ${avgScore >= 0.8 ? '<p>🌟 Exzellente Leistung! Du hast das Thema sehr gut verstanden.</p>' :
                  avgScore >= 0.6 ? '<p>👍 Gute Arbeit! Mit noch etwas Übung wirst du perfekt vorbereitet sein.</p>' :
                  '<p>💪 Weiter so! Übung macht den Meister. Bleib dran!</p>'}
            </div>

            <div class="summary-actions">
                <button class="btn btn-primary" onclick="endLearningSessionUI()">
                    Session beenden
                </button>
                <button class="btn btn-secondary" onclick="continueAdaptivePractice()">
                    Noch weiter üben
                </button>
            </div>
        </div>
    `;
}

/**
 * Beendet Session UI
 */
function endLearningSessionUI() {
    endLearningSession();
    closeAdaptiveLearningModal();
    showToast('Session gespeichert! 🎉', 'success');
    checkAchievements();
}

/**
 * Schließt Adaptive Learning Modal
 */
function closeAdaptiveLearningModal() {
    const modal = document.getElementById('adaptiveLearningModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ========================================
// PROFIL FUNKTIONEN
// ========================================

/**
 * Speichert Anzeigenamen
 */
function saveDisplayName() {
    const input = document.getElementById('displayNameInput');
    if (!input) return;

    const newName = input.value.trim();

    if (updateDisplayName(newName)) {
        // Erfolg - bereits durch updateDisplayName behandelt
        loadProfileSettings(); // Refresh anzeige
    }
}

/**
 * Lädt Profil-Einstellungen in UI
 */
function loadProfileSettings() {
    if (!currentUser) return;

    // Display Name
    const displayNameInput = document.getElementById('displayNameInput');
    if (displayNameInput) {
        displayNameInput.value = getDisplayName();
    }

    // Username-Hint
    const usernameHint = document.getElementById('profileUsername');
    if (usernameHint) {
        usernameHint.textContent = currentUser.username;
    }

    // Avatar Preview
    const avatarPreview = document.getElementById('profileAvatarPreview');
    if (avatarPreview) {
        if (currentUser.avatar) {
            avatarPreview.innerHTML = renderAvatarSVG(currentUser.avatar, 100);
        } else {
            avatarPreview.innerHTML = '<div class="no-avatar-placeholder">👤</div>';
        }
    }

    // Passwort-Anzeige befüllen
    const pwdDisplay = document.getElementById('currentPasswordDisplay');
    if (pwdDisplay) {
        pwdDisplay.value = currentUser.password || '';
        pwdDisplay.type = 'password';
        const eyeBtn = pwdDisplay.nextElementSibling;
        if (eyeBtn) eyeBtn.textContent = '👁️';
    }

    // Pomodoro-Einstellungen aus Preferences laden
    const workInput = document.getElementById('pomodoroWork');
    if (workInput && currentUser.preferences?.pomodoroWork) {
        workInput.value = currentUser.preferences.pomodoroWork;
    }
    const soundCheckbox = document.getElementById('pomodoroSound');
    if (soundCheckbox && currentUser.preferences?.pomodoroSound !== undefined) {
        soundCheckbox.checked = currentUser.preferences.pomodoroSound;
    }
    if (typeof updateBreakTimeDisplay === 'function') updateBreakTimeDisplay();
}

// ===== NEUE NAVIGATION FUNKTIONEN =====

// Toggle Navigation Category
function toggleNavCategory(button) {
    const categoryItems = button.nextElementSibling;
    const isCollapsed = categoryItems.classList.contains('collapsed');

    if (isCollapsed) {
        categoryItems.classList.remove('collapsed');
        button.classList.remove('collapsed');
    } else {
        categoryItems.classList.add('collapsed');
        button.classList.add('collapsed');
    }
}

// Toggle Timer Visibility
function toggleTimer() {
    const timerBar = document.getElementById('timerBar');
    const toggleBtn = document.querySelector('.timer-toggle-btn');

    if (timerBar.style.display === 'none' || timerBar.style.display === '') {
        timerBar.style.display = 'flex';
        if (toggleBtn) toggleBtn.style.display = 'none';
    } else {
        timerBar.style.display = 'none';
        if (toggleBtn) toggleBtn.style.display = 'block';
    }
}

// Show Library Tab
function showLibraryTab(tabName) {
    document.querySelectorAll('.library-tab-content').forEach(c => c.classList.remove('active'));

    const contentId = 'libraryTab' + tabName.charAt(0).toUpperCase() + tabName.slice(1);
    const content = document.getElementById(contentId);
    if (content) {
        content.classList.add('active');
        if (tabName === 'glossary' && !document.querySelector('.glossary-item')) {
            if (typeof initGlossary === 'function') initGlossary();
        }
        if (tabName === 'materials') {
            displayLibraryContent();
        }
    }
}

// Lernzettel hochladen
function uploadLernzettel(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
        showToast('Datei ist zu groß (max. 10 MB)', 'error');
        event.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        if (!currentUser.notes) currentUser.notes = [];
        const note = {
            id: 'lernzettel-' + Date.now(),
            title: file.name.replace(/\.[^/.]+$/, ''),
            category: 'notizen',
            type: 'lernzettel',
            content: e.target.result,
            createdAt: new Date().toLocaleDateString('de-DE'),
            isUserNote: true
        };
        currentUser.notes.push(note);
        saveCurrentUser();
        showToast('Lernzettel "' + note.title + '" hochgeladen!', 'success');
        displayLibraryContent();
    };

    if (file.type === 'application/pdf') {
        reader.readAsDataURL(file);
    } else {
        reader.readAsText(file, 'UTF-8');
    }
    event.target.value = '';
}

// Die showExerciseType Funktion unterstützt bereits den neuen 'adaptive' Tab!

// ===== TUTORIAL (Erstanmeldung) =====

let tutorialStep = 0;

const TUTORIAL_STEPS = [
    {
        icon: '🏰',
        title: (name) => `Hi ${name}, schön dass du da bist!`,
        text: 'Ich erkläre dir jetzt kurz, wie HistoLearn funktioniert. Klick einfach immer auf „Weiter", um zum nächsten Bereich zu kommen.'
    },
    {
        icon: '📊',
        title: () => 'Dein Dashboard',
        text: 'Hier siehst du auf einen Blick wie weit du bist: deine Münzen, dein XP, deinen Rang und was du zuletzt gemacht hast.'
    },
    {
        icon: '🤖',
        title: () => 'Der KI-Tutor',
        text: 'Dein persönlicher Geschichtslehrer! Stell ihm Fragen zu allen Themen aus dem Schulbuch – er erklärt dir alles auf deinem Level.'
    },
    {
        icon: '📝',
        title: () => 'Themenübungen',
        text: 'Über 320 Aufgaben zu allen Schulbuch-Themen – von einfach (nennen, beschreiben) bis anspruchsvoll (erörtern, bewerten). Perfekt zur Prüfungsvorbereitung.'
    },
    {
        icon: '🔤',
        title: () => 'Operatoren-Training',
        text: 'Was heißt eigentlich „analysieren" oder „erörtern"? Hier lernst du alle Aufgabenoperatoren mit Beispielen und typischen Fehlern kennen.'
    },
    {
        icon: '📅',
        title: () => 'Interaktiver Zeitstrahl',
        text: 'Alle wichtigen Ereignisse der Geschichte auf einem Blick – von der Französischen Revolution bis zur Europäischen Union.'
    },
    {
        icon: '📖',
        title: () => 'Glossar',
        text: '56 Fachbegriffe einfach erklärt – von Absolutismus bis Wiedervereinigung. Du kannst nach Klasse filtern oder suchen.'
    },
    {
        icon: '🐄',
        title: () => 'Meine Burg',
        text: 'Durch Lernen verdienst du Kuh-Münzen und XP. Damit baust du deine eigene Burg aus und steigst im Rang auf – vom Tagelöhner bis zur Legende!'
    },
    {
        icon: '⏱️',
        title: () => 'Pomodoro-Timer',
        text: 'Konzentriert lernen mit echten Pausen! Nach der Lernzeit wird die App automatisch gesperrt. Danach entscheidest du: weitermachen oder fertig für heute.'
    },
    {
        icon: '🚀',
        title: () => 'Adaptive Lernsession',
        text: 'Du gibst Ziel, Thema und Prüfungsdatum an – eine kurze Diagnose findet deinen Stand, und die App stellt dir personalisierten Stoff zusammen. Genau das, was du brauchst, nichts doppelt.'
    },
    {
        icon: '🧠',
        title: () => 'Lernhilfen & Strategien',
        text: 'Pomodoro, Loci-Methode, Mind-Mapping, Feynman & Co – elf Lernstrategien zum Ausprobieren. Klick eine an und das passende Tool öffnet sich direkt.'
    },
    {
        icon: '📚',
        title: () => 'Materialien & Bibliothek',
        text: 'Deine Lernzettel hochladen, das Glossar nachschlagen, Bilder zu Themen ablegen. Alles, was du für den Geschichtsunterricht brauchst, an einem Ort.'
    },
    {
        icon: '⚙️',
        title: () => 'Einstellungen',
        text: 'Hier kannst du deinen Avatar gestalten, dein Passwort ändern, die Akzentfarbe wechseln und den Pomodoro-Timer auf deine Lernzeit einstellen.'
    },
    {
        icon: '🎉',
        title: () => 'Du bist startklar!',
        text: 'Das war\'s! Viel Spaß beim Lernen. Tipp: Regelmäßig ein bisschen ist besser als einmal alles auf einmal!',
        isLast: true
    }
];

function startTutorial() {
    tutorialStep = 0;
    renderTutorialStep();
    document.getElementById('tutorialOverlay').style.display = 'flex';
}

function renderTutorialStep() {
    const step = TUTORIAL_STEPS[tutorialStep];
    const name = currentUser ? (currentUser.displayName || currentUser.username) : '';

    document.getElementById('tutorialIcon').textContent = step.icon;
    document.getElementById('tutorialTitle').textContent = step.title(name);
    document.getElementById('tutorialText').textContent = step.text;

    // Fortschrittspunkte
    const dotsEl = document.getElementById('tutorialDots');
    dotsEl.innerHTML = '';
    TUTORIAL_STEPS.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'tutorial-dot' + (i === tutorialStep ? ' active' : '');
        dotsEl.appendChild(dot);
    });

    // Letzter Schritt: Button-Text ändern
    const nextBtn = document.getElementById('tutorialNextBtn');
    if (step.isLast) {
        nextBtn.textContent = '🚀 Los geht\'s!';
        nextBtn.onclick = completeTutorial;
    } else {
        nextBtn.textContent = 'Weiter →';
        nextBtn.onclick = tutorialNext;
    }
}

function tutorialNext() {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
        tutorialStep++;
        renderTutorialStep();
    }
}

function skipTutorial() {
    completeTutorial();
}

function completeTutorial() {
    document.getElementById('tutorialOverlay').style.display = 'none';

    // Als abgeschlossen markieren
    if (currentUser) {
        currentUser.tutorialCompleted = true;
        const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
        const idx = users.findIndex(u => u.id === currentUser.id);
        if (idx !== -1) {
            users[idx] = currentUser;
            localStorage.setItem('histolearn_users', JSON.stringify(users));
        }
    }

    showToast(`Willkommen bei HistoLearn, ${currentUser?.displayName || currentUser?.username}! 🎉`, 'success');
}
