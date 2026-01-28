// ===== INTEGRATION: BILDARCHIV & ERWEITERTE ÜBUNGEN =====
// Diese Datei integriert das neue Bildarchiv und die themenbasierten Übungen

// ========================================
// BILDARCHIV-FUNKTIONEN
// ========================================

// Funktion zum Anzeigen des Bildarchivs in der Library
function showImageArchive() {
    const container = document.querySelector('.library-content') || document.querySelector('.content');
    if (!container) return;

    if (typeof IMAGE_ARCHIVE === 'undefined') {
        container.innerHTML = '<p>Bildarchiv wird geladen...</p>';
        return;
    }

    let html = `
        <div class="image-archive">
            <h2>📸 Bildarchiv</h2>
            <p class="subtitle">Schulbuch-Materialien organisiert nach Klassenstufe</p>

            <div class="archive-filters">
                <button class="filter-btn active" onclick="filterImageArchive('all')">Alle (33)</button>
                <button class="filter-btn" onclick="filterImageArchive('klasse8')">Klasse 8 (13)</button>
                <button class="filter-btn" onclick="filterImageArchive('klasse9')">Klasse 9 (6)</button>
                <button class="filter-btn" onclick="filterImageArchive('klasse10')">Klasse 10 (14)</button>
            </div>

            <div class="archive-categories">
                <button class="category-btn" onclick="filterByCategory('all')">Alle</button>
                <button class="category-btn" onclick="filterByCategory('glossar')">Glossare</button>
                <button class="category-btn" onclick="filterByCategory('methoden')">Methoden</button>
                <button class="category-btn" onclick="filterByCategory('karte')">Karten</button>
                <button class="category-btn" onclick="filterByCategory('grafik')">Grafiken</button>
                <button class="category-btn" onclick="filterByCategory('quelle')">Quellen</button>
            </div>

            <div id="imageGrid" class="image-grid"></div>
        </div>

        <style>
            .image-archive { padding: 20px; }
            .subtitle { color: var(--text-secondary); margin-bottom: 30px; }
            .archive-filters, .archive-categories {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 20px;
            }
            .filter-btn, .category-btn {
                padding: 10px 20px;
                border: 2px solid var(--primary);
                background: transparent;
                color: var(--primary);
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .filter-btn:hover, .category-btn:hover {
                background: var(--primary);
                color: white;
                transform: translateY(-2px);
            }
            .filter-btn.active, .category-btn.active {
                background: var(--primary);
                color: white;
            }
            .image-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 30px;
            }
            .image-card {
                background: var(--bg-secondary);
                border-radius: 15px;
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
                border: 2px solid transparent;
            }
            .image-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(201, 162, 39, 0.3);
                border-color: var(--primary);
            }
            .image-card-preview {
                width: 100%;
                height: 180px;
                background: var(--bg-tertiary);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3em;
                color: var(--primary);
            }
            .image-card-content {
                padding: 15px;
            }
            .image-card-title {
                font-weight: bold;
                margin-bottom: 5px;
                color: var(--text-primary);
            }
            .image-card-desc {
                font-size: 0.9em;
                color: var(--text-secondary);
                line-height: 1.4;
            }
            .image-card-badges {
                display: flex;
                gap: 5px;
                margin-top: 10px;
                flex-wrap: wrap;
            }
            .badge {
                padding: 3px 10px;
                border-radius: 12px;
                font-size: 0.75em;
                background: var(--primary);
                color: white;
            }
        </style>
    `;

    container.innerHTML = html;
    renderImageGrid('all', 'all');
}

// Filtern nach Klassenstufe
function filterImageArchive(level) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderImageGrid(level, getCurrentCategory());
}

// Filtern nach Kategorie
function filterByCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderImageGrid(getCurrentLevel(), category);
}

// Aktuelle Filter ermitteln
function getCurrentLevel() {
    const activeBtn = document.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.textContent.toLowerCase().includes('klasse 8') ? 'klasse8'
        : activeBtn.textContent.toLowerCase().includes('klasse 9') ? 'klasse9'
        : activeBtn.textContent.toLowerCase().includes('klasse 10') ? 'klasse10'
        : 'all' : 'all';
}

function getCurrentCategory() {
    const activeBtn = document.querySelector('.category-btn.active');
    if (!activeBtn) return 'all';
    const text = activeBtn.textContent.toLowerCase();
    if (text.includes('glossar')) return 'glossar';
    if (text.includes('methoden')) return 'methoden';
    if (text.includes('karte')) return 'karte';
    if (text.includes('grafik')) return 'grafik';
    if (text.includes('quelle')) return 'quelle';
    return 'all';
}

// Bild-Grid rendern
function renderImageGrid(level, category) {
    const grid = document.getElementById('imageGrid');
    if (!grid || typeof IMAGE_ARCHIVE === 'undefined') return;

    let images = [];

    // Sammle Bilder basierend auf Level
    if (level === 'all') {
        images = [
            ...IMAGE_ARCHIVE.klasse8,
            ...IMAGE_ARCHIVE.klasse9,
            ...IMAGE_ARCHIVE.klasse10_1,
            ...IMAGE_ARCHIVE.klasse10_2
        ];
    } else if (level === 'klasse8') {
        images = IMAGE_ARCHIVE.klasse8;
    } else if (level === 'klasse9') {
        images = IMAGE_ARCHIVE.klasse9;
    } else if (level === 'klasse10') {
        images = [...IMAGE_ARCHIVE.klasse10_1, ...IMAGE_ARCHIVE.klasse10_2];
    }

    // Filtere nach Kategorie
    if (category !== 'all') {
        images = images.filter(img => img.category === category);
    }

    // Rendere Karten
    grid.innerHTML = images.map(img => `
        <div class="image-card" onclick="viewImage('${img.id}')">
            <div class="image-card-preview">
                ${getImageIcon(img.type)}
            </div>
            <div class="image-card-content">
                <div class="image-card-title">${img.title}</div>
                <div class="image-card-desc">${img.description}</div>
                <div class="image-card-badges">
                    <span class="badge">${img.category}</span>
                    ${img.topics.slice(0, 2).map(t => `<span class="badge">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    if (images.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">Keine Bilder in dieser Kategorie gefunden.</p>';
    }
}

// Icon für Bildtyp
function getImageIcon(type) {
    const icons = {
        'document': '📄',
        'reference': '📚',
        'method': '🔍',
        'timeline': '📅',
        'infographic': '📊',
        'source': '📜',
        'map': '🗺️'
    };
    return icons[type] || '🖼️';
}

// Bild im Modal anzeigen
function viewImage(imageId) {
    // Finde das Bild
    let image = null;
    for (let key in IMAGE_ARCHIVE) {
        const found = IMAGE_ARCHIVE[key].find(img => img.id === imageId);
        if (found) {
            image = found;
            break;
        }
    }

    if (!image) return;

    // Bestimme Pfad
    let path = '';
    if (imageId.startsWith('k8-')) path = '../Klasse 8/';
    else if (imageId.startsWith('k9-')) path = '../Klasse 9/';
    else if (imageId.startsWith('k10-1')) path = '../Klasse 10.1/';
    else if (imageId.startsWith('k10-2')) path = '../Klasse 10.2/';

    // Zeige Modal
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div class="image-viewer">
            <h2>${image.title}</h2>
            <p class="image-description">${image.description}</p>

            <div class="image-container">
                <img src="${path}${image.filename}" alt="${image.title}" class="archive-image" />
            </div>

            <div class="image-meta">
                <div><strong>Kategorie:</strong> ${image.category}</div>
                <div><strong>Typ:</strong> ${image.type}</div>
                <div><strong>Themen:</strong> ${image.topics.join(', ')}</div>
            </div>

            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Schließen</button>
                <button class="btn btn-primary" onclick="downloadImage('${path}${image.filename}', '${image.filename}')">📥 Download</button>
            </div>
        </div>

        <style>
            .image-viewer { padding: 20px; max-width: 900px; margin: 0 auto; }
            .image-description { color: var(--text-secondary); margin-bottom: 20px; }
            .image-container {
                margin: 20px 0;
                background: var(--bg-tertiary);
                padding: 20px;
                border-radius: 15px;
                text-align: center;
            }
            .archive-image {
                max-width: 100%;
                max-height: 70vh;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            }
            .image-meta {
                background: var(--bg-secondary);
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
            }
            .image-meta div {
                margin: 8px 0;
            }
            .modal-actions {
                display: flex;
                gap: 15px;
                justify-content: flex-end;
                margin-top: 20px;
            }
        </style>
    `;

    modal.style.display = 'block';
}

// Bild herunterladen
function downloadImage(src, filename) {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

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
                <button class="filter-btn active" onclick="filterExercises('all')">Alle (${exercises.length})</button>
                <button class="filter-btn" onclick="filterExercises('afb1')">AFB I (${afb1.length})</button>
                <button class="filter-btn" onclick="filterExercises('afb2')">AFB II (${afb2.length})</button>
                <button class="filter-btn" onclick="filterExercises('afb3')">AFB III (${afb3.length})</button>
            </div>

            <div id="exerciseList" class="exercise-list"></div>
        </div>

        <style>
            .topic-exercises { padding: 20px; }
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
        </style>
    `;

    // Initial alle Übungen anzeigen
    renderExerciseList(exercises, 'all');

    modal.style.display = 'block';
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
        <div class="exercise-item" onclick="showExerciseDetail('${ex.id}')">
            <div class="exercise-header">
                <div class="exercise-badges">
                    <span class="badge">AFB ${ex.afb}</span>
                    <span class="badge">${ex.operator}</span>
                    <span class="badge">${ex.points}P</span>
                </div>
            </div>
            <div class="exercise-question">${ex.question}</div>
            <div class="exercise-tips" style="font-size: 0.9em; color: var(--text-secondary);">
                💡 ${ex.tips}
            </div>
        </div>
    `).join('');
}

// Themenname ermitteln
function getTopicName(topic) {
    const names = {
        'franzoesische-revolution': 'Französische Revolution',
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
        'tuerkei-osmanisches-reich': 'Osmanisches Reich & Türkei',
        'europaeische-union': 'Europäische Union'
    };
    return names[topic] || topic;
}

// Beim Laden der Seite: Bildarchiv-Button zur Library hinzufügen
document.addEventListener('DOMContentLoaded', function() {
    // Warte kurz, damit die Hauptapp geladen ist
    setTimeout(() => {
        const librarySection = document.querySelector('#library');
        if (librarySection && typeof IMAGE_ARCHIVE !== 'undefined') {
            // Füge Bildarchiv-Button hinzu (kann in UI integriert werden)
            console.log('✅ Bildarchiv geladen: ' +
                (IMAGE_ARCHIVE.klasse8.length + IMAGE_ARCHIVE.klasse9.length +
                 IMAGE_ARCHIVE.klasse10_1.length + IMAGE_ARCHIVE.klasse10_2.length) + ' Bilder');
        }
        if (typeof TOPIC_EXERCISES !== 'undefined') {
            console.log('✅ Übungssystem geladen');
        }
    }, 1000);
});
