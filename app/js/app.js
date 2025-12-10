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

    // Event Listener
    setupEventListeners();
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
function showSection(sectionId) {
    // Alle Sektionen ausblenden
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Gewählte Sektion anzeigen
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    // Navigation aktualisieren
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });

    // Spezifische Aktionen pro Sektion
    switch (sectionId) {
        case 'chat':
            document.getElementById('chatInput').focus();
            break;
        case 'timeline':
            if (!document.querySelector('.timeline-event')) {
                loadTimeline();
            }
            break;
    }
}

// Toast-Benachrichtigung anzeigen
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');

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

    // Nach 4 Sekunden entfernen
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

// Burg-Anzeige aktualisieren
function updateCastleDisplay() {
    if (!currentUser) return;

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
        <div class="folder-item" onclick="openFolder('antike')">
            <span>🏛️</span> Antike
        </div>
        <div class="folder-item" onclick="openFolder('mittelalter')">
            <span>🏰</span> Mittelalter
        </div>
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
                <div class="library-card ${m.isUserNote ? 'user-note' : ''}" onclick="openMaterial('${m.id}')">
                    <div class="library-card-header">
                        <span class="library-type">${getTypeIcon(m.type)}</span>
                        ${currentUser ? `
                            <button class="favorite-btn ${(currentUser.favorites || []).includes(m.id) ? 'active' : ''}"
                                    onclick="event.stopPropagation(); toggleFavorite('${m.id}')">
                                ${(currentUser.favorites || []).includes(m.id) ? '★' : '☆'}
                            </button>
                        ` : ''}
                    </div>
                    <h4>${m.title}</h4>
                    <div class="library-card-meta">
                        <span>${getCategoryName(m.category)}</span>
                        ${m.readTime ? `<span>~${m.readTime} min</span>` : ''}
                        ${m.difficulty ? `<span>${'⭐'.repeat(m.difficulty)}</span>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
        <style>
            .library-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
            .library-card { background: var(--bg-tertiary); border-radius: 15px; padding: 20px; cursor: pointer; transition: var(--transition); border: 2px solid transparent; }
            .library-card:hover { transform: translateY(-5px); border-color: var(--primary); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
            .library-card.user-note { border-left: 4px solid var(--primary); }
            .library-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
            .library-type { font-size: 1.5em; }
            .favorite-btn { background: none; border: none; font-size: 1.3em; cursor: pointer; color: var(--text-secondary); }
            .favorite-btn.active { color: #f39c12; }
            .library-card h4 { margin: 10px 0; color: var(--text-primary); }
            .library-card-meta { display: flex; gap: 15px; font-size: 0.85em; color: var(--text-secondary); flex-wrap: wrap; }
        </style>
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
        source: '📜'
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
        antike: 'Antike',
        mittelalter: 'Mittelalter',
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
                    <option value="antike">Antike</option>
                    <option value="mittelalter">Mittelalter</option>
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
                    <option value="antike" ${note.category === 'antike' ? 'selected' : ''}>Antike</option>
                    <option value="mittelalter" ${note.category === 'mittelalter' ? 'selected' : ''}>Mittelalter</option>
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
            startMemoryGame();
            break;
        case 'sequence':
            startSequenceGame();
            break;
        case 'matching':
            startMatchingGame();
            break;
    }
}

// Memory-Spiel
function startMemoryGame() {
    const area = document.getElementById('exerciseArea');

    const pairs = [
        { term: '1789', match: 'Französische Revolution' },
        { term: '1871', match: 'Deutsche Reichsgründung' },
        { term: '1914', match: 'Erster Weltkrieg' },
        { term: '1933', match: 'Machtergreifung' },
        { term: '1989', match: 'Mauerfall' },
        { term: '1517', match: 'Reformation' }
    ];

    // Karten erstellen und mischen
    let cards = [];
    pairs.forEach((pair, index) => {
        cards.push({ id: index, content: pair.term, pairId: index, type: 'term' });
        cards.push({ id: index + 100, content: pair.match, pairId: index, type: 'match' });
    });
    cards = shuffleArray(cards);

    area.innerHTML = `
        <h3>🃏 Memory - Ordne die Ereignisse den Jahren zu!</h3>
        <div class="memory-grid" id="memoryGrid">
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
            .memory-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; max-width: 600px; margin: 20px auto; }
            .memory-card { aspect-ratio: 1; cursor: pointer; perspective: 1000px; }
            .memory-card-inner { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.5s; }
            .memory-card.flipped .memory-card-inner { transform: rotateY(180deg); }
            .memory-card-front, .memory-card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-size: 0.9em; padding: 10px; text-align: center; }
            .memory-card-front { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; font-size: 2em; }
            .memory-card-back { background: var(--bg-tertiary); transform: rotateY(180deg); }
            .memory-card.matched { opacity: 0.5; pointer-events: none; }
        </style>
    `;
}

let flippedCards = [];
let matchedPairs = 0;

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

                if (matchedPairs >= 6) {
                    showToast('🎉 Gewonnen!', 'success');
                    addCoins(5, 'Memory gewonnen');
                    addXP(10);
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

// Reihenfolge-Spiel
function startSequenceGame() {
    const area = document.getElementById('exerciseArea');

    const events = [
        { year: 1789, name: 'Französische Revolution' },
        { year: 1815, name: 'Wiener Kongress' },
        { year: 1848, name: 'Märzrevolution' },
        { year: 1871, name: 'Reichsgründung' },
        { year: 1914, name: 'Erster Weltkrieg' }
    ];

    const shuffled = shuffleArray([...events]);

    area.innerHTML = `
        <h3>🔢 Bringe die Ereignisse in die richtige Reihenfolge!</h3>
        <p>Ziehe die Ereignisse oder nummeriere sie von 1 (ältestes) bis 5 (neuestes)</p>
        <div class="sequence-list" id="sequenceList">
            ${shuffled.map((event, i) => `
                <div class="sequence-item" draggable="true" data-year="${event.year}">
                    <span class="sequence-number">${i + 1}</span>
                    <span class="sequence-name">${event.name}</span>
                </div>
            `).join('')}
        </div>
        <button class="btn btn-primary" onclick="checkSequence()">Überprüfen</button>
        <style>
            .sequence-list { max-width: 500px; margin: 20px auto; }
            .sequence-item { display: flex; align-items: center; gap: 15px; padding: 15px; background: var(--bg-tertiary); border-radius: 10px; margin-bottom: 10px; cursor: grab; transition: var(--transition); }
            .sequence-item:hover { transform: translateX(5px); }
            .sequence-number { width: 30px; height: 30px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
            .sequence-item.correct .sequence-number { background: var(--success); }
            .sequence-item.incorrect .sequence-number { background: var(--danger); }
        </style>
    `;

    // Drag & Drop Funktionalität
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
        showToast('🎉 Perfekt! Alle richtig!', 'success');
        addCoins(10, 'Reihenfolge-Spiel gewonnen');
        addXP(15);
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
    const area = document.getElementById('exerciseArea');

    const pairs = [
        { person: 'Napoleon', event: 'Kaiserkrönung 1804' },
        { person: 'Bismarck', event: 'Deutsche Einigung' },
        { person: 'Luther', event: 'Reformation' },
        { person: 'Caesar', event: 'Römische Republik' }
    ];

    const persons = shuffleArray(pairs.map(p => p.person));
    const events = shuffleArray(pairs.map(p => p.event));

    area.innerHTML = `
        <h3>🔗 Ordne die Personen den Ereignissen zu!</h3>
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
        <style>
            .matching-container { display: flex; gap: 40px; justify-content: center; margin: 20px 0; }
            .matching-column { min-width: 200px; }
            .matching-column h4 { margin-bottom: 15px; text-align: center; }
            .matching-item { padding: 15px; background: var(--bg-tertiary); border-radius: 10px; margin-bottom: 10px; cursor: pointer; transition: var(--transition); text-align: center; }
            .matching-item:hover { background: var(--border-color); }
            .matching-item.selected { background: var(--primary); color: white; }
            .matching-item.matched { background: var(--success); color: white; pointer-events: none; }
            .matching-item.wrong { animation: shake 0.5s; }
            @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        </style>
    `;
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
        'Luther': 'Reformation',
        'Caesar': 'Römische Republik'
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

        if (matchedCount >= 4) {
            showToast('🎉 Alle richtig zugeordnet!', 'success');
            addCoins(10, 'Zuordnungs-Spiel gewonnen');
            addXP(15);
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
