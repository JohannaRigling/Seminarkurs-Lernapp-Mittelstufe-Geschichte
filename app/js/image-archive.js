// ===== BILDARCHIV - Schulbuch-Scans =====

const IMAGE_ARCHIVE = {
    klasse8: {
        label: 'Klasse 8',
        path: 'data/images/klasse8/',
        images: [
            { file: 'IMG_2191.jpeg', title: 'Inhaltsverzeichnis', description: 'Klasse 8 – Schulbuch Inhaltsverzeichnis, Seite 1', category: 'inhaltsverzeichnis' },
            { file: 'IMG_2192.jpeg', title: 'Inhaltsverzeichnis', description: 'Klasse 8 – Schulbuch Inhaltsverzeichnis, Seite 2', category: 'inhaltsverzeichnis' },
            { file: 'IMG_2193.jpeg', title: 'Inhaltsverzeichnis', description: 'Klasse 8 – Schulbuch Inhaltsverzeichnis, Seite 3', category: 'inhaltsverzeichnis' },
            { file: 'IMG_2209.jpeg', title: 'Glossar', description: 'Klasse 8 – Glossar, Seite 1', category: 'glossar' },
            { file: 'IMG_2212.jpeg', title: 'Glossar', description: 'Klasse 8 – Glossar, Seite 2', category: 'glossar' },
            { file: 'IMG_2213.jpeg', title: 'Glossar', description: 'Klasse 8 – Glossar, Seite 3', category: 'glossar' },
            { file: 'IMG_2214.jpeg', title: 'Operatoren', description: 'Klasse 8 – Operatoren Übersicht', category: 'operatoren' },
            { file: 'IMG_2215.jpeg', title: 'Operatoren AFB I', description: 'Klasse 8 – Operatoren AFB I (Reproduktion)', category: 'operatoren' },
            { file: 'IMG_2216.jpeg', title: 'Operatoren AFB II', description: 'Klasse 8 – Operatoren AFB II (Reorganisation)', category: 'operatoren' },
            { file: 'IMG_2217.jpeg', title: 'Operatoren AFB III', description: 'Klasse 8 – Operatoren AFB III (Reflexion)', category: 'operatoren' },
            { file: 'IMG_2218.jpeg', title: 'Schulbuchseite', description: 'Klasse 8 – Schulbuch Seite 1', category: 'schulbuch' },
            { file: 'IMG_2219.jpeg', title: 'Schulbuchseite', description: 'Klasse 8 – Schulbuch Seite 2', category: 'schulbuch' },
            { file: 'IMG_2220.jpeg', title: 'Schulbuchseite', description: 'Klasse 8 – Schulbuch Seite 3', category: 'schulbuch' }
        ]
    },
    klasse9: {
        label: 'Klasse 9',
        path: 'data/images/klasse9/',
        images: [
            { file: 'IMG_2194.jpeg', title: 'Inhaltsverzeichnis', description: 'Klasse 9 – Schulbuch Inhaltsverzeichnis, Seite 1', category: 'inhaltsverzeichnis' },
            { file: 'IMG_2195.jpeg', title: 'Inhaltsverzeichnis', description: 'Klasse 9 – Schulbuch Inhaltsverzeichnis, Seite 2', category: 'inhaltsverzeichnis' },
            { file: 'IMG_2196.jpeg', title: 'Inhaltsverzeichnis', description: 'Klasse 9 – Schulbuch Inhaltsverzeichnis, Seite 3', category: 'inhaltsverzeichnis' },
            { file: 'IMG_2221.jpeg', title: 'Methodenverzeichnis', description: 'Klasse 9 – Methodenverzeichnis, Seite 1', category: 'methoden' },
            { file: 'IMG_2222.jpeg', title: 'Methodenverzeichnis', description: 'Klasse 9 – Methodenverzeichnis, Seite 2', category: 'methoden' },
            { file: 'IMG_2223.jpeg', title: 'Methodenverzeichnis', description: 'Klasse 9 – Methodenverzeichnis, Seite 3', category: 'methoden' }
        ]
    },
    klasse10_1: {
        label: 'Klasse 10 (Teil 1)',
        path: 'data/images/klasse10-1/',
        images: [
            { file: 'IMG_2953.jpeg', title: 'Glossar', description: 'Klasse 10 – Glossar, Seite 1', category: 'glossar' },
            { file: 'IMG_2954.jpeg', title: 'Glossar', description: 'Klasse 10 – Glossar, Seite 2', category: 'glossar' },
            { file: 'IMG_2955.jpeg', title: 'Glossar', description: 'Klasse 10 – Glossar, Seite 3', category: 'glossar' },
            { file: 'IMG_2956.jpeg', title: 'Geschichtslexikon', description: 'Klasse 10 – Geschichtslexikon, Seite 1', category: 'lexikon' },
            { file: 'IMG_2957.jpeg', title: 'Geschichtslexikon', description: 'Klasse 10 – Geschichtslexikon, Seite 2', category: 'lexikon' },
            { file: 'IMG_2958.jpeg', title: 'Geschichtslexikon', description: 'Klasse 10 – Geschichtslexikon, Seite 3', category: 'lexikon' },
            { file: 'IMG_2959.jpeg', title: 'Geschichtslexikon', description: 'Klasse 10 – Geschichtslexikon, Seite 4', category: 'lexikon' }
        ]
    },
    klasse10_2: {
        label: 'Klasse 10 (Teil 2)',
        path: 'data/images/klasse10-2/',
        images: [
            { file: 'IMG_2960.jpeg', title: 'Bildquellenverzeichnis', description: 'Klasse 10 – Bildquellenverzeichnis, Seite 1', category: 'quellen' },
            { file: 'IMG_2961.jpeg', title: 'Bildquellenverzeichnis', description: 'Klasse 10 – Bildquellenverzeichnis, Seite 2', category: 'quellen' },
            { file: 'IMG_2962.jpeg', title: 'Bildquellenverzeichnis', description: 'Klasse 10 – Bildquellenverzeichnis, Seite 3', category: 'quellen' },
            { file: 'IMG_2963.jpeg', title: 'Bildquellenverzeichnis', description: 'Klasse 10 – Bildquellenverzeichnis, Seite 4', category: 'quellen' },
            { file: 'IMG_2964.jpeg', title: 'Bildquellenverzeichnis', description: 'Klasse 10 – Bildquellenverzeichnis, Seite 5', category: 'quellen' },
            { file: 'IMG_2965.jpeg', title: 'Bildquellenverzeichnis', description: 'Klasse 10 – Bildquellenverzeichnis, Seite 6', category: 'quellen' },
            { file: 'IMG_2966.jpeg', title: 'Bildquellenverzeichnis', description: 'Klasse 10 – Bildquellenverzeichnis, Seite 7', category: 'quellen' }
        ]
    }
};

const ARCHIVE_CATEGORY_LABELS = {
    alle: 'Alle',
    inhaltsverzeichnis: 'Inhaltsverzeichnis',
    glossar: 'Glossar',
    operatoren: 'Operatoren',
    methoden: 'Methoden',
    schulbuch: 'Schulbuch',
    lexikon: 'Lexikon',
    quellen: 'Quellen'
};

let _currentArchiveClass = 'klasse8';

function showImageArchive(classKey) {
    _currentArchiveClass = classKey || 'klasse8';

    const content = document.getElementById('libraryContent');
    if (!content) return;

    const archiveData = IMAGE_ARCHIVE[_currentArchiveClass];
    if (!archiveData) return;

    // Folder-Item aktiv markieren
    document.querySelectorAll('.folder-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.folder-item[data-folder="bildarchiv"]')?.classList.add('active');

    // Klassen-Tabs ermitteln
    const classTabs = Object.entries(IMAGE_ARCHIVE).map(([key, val]) =>
        `<button class="archive-class-btn ${key === _currentArchiveClass ? 'active' : ''}" data-class="${key}" onclick="showImageArchive('${key}')">${val.label}</button>`
    ).join('');

    // Kategorien für aktuelle Klasse
    const cats = [...new Set(archiveData.images.map(i => i.category))];
    const catTabs = ['alle', ...cats].map(cat =>
        `<button class="archive-cat-btn active" data-cat="${cat}" onclick="filterArchiveImages('${cat}')">${ARCHIVE_CATEGORY_LABELS[cat] || cat}</button>`
    ).join('');

    content.innerHTML = `
        <div class="image-archive-wrapper">
            <div class="archive-class-tabs">${classTabs}</div>
            <div class="archive-cat-tabs">${catTabs}</div>
            <div class="archive-grid" id="archiveGrid"></div>
        </div>
    `;

    renderArchiveImages(archiveData.images);
}

function filterArchiveImages(category) {
    document.querySelectorAll('.archive-cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === category);
    });

    const archiveData = IMAGE_ARCHIVE[_currentArchiveClass];
    const filtered = category === 'alle'
        ? archiveData.images
        : archiveData.images.filter(img => img.category === category);
    renderArchiveImages(filtered);
}

function renderArchiveImages(images) {
    const grid = document.getElementById('archiveGrid');
    if (!grid) return;

    const basePath = IMAGE_ARCHIVE[_currentArchiveClass].path;

    if (images.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-secondary);padding:20px;">Keine Bilder in dieser Kategorie.</p>';
        return;
    }

    grid.innerHTML = images.map((img, i) => `
        <div class="archive-card" onclick="openArchiveLightbox('${basePath}${img.file}', '${escapeAttr(img.title)}', '${escapeAttr(img.description)}')">
            <div class="archive-thumb">
                <img src="${basePath}${img.file}" alt="${img.title}" loading="lazy"
                     onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="archive-thumb-fallback" style="display:none">🖼️</div>
            </div>
            <div class="archive-card-info">
                <strong>${img.title}</strong>
                <span>${img.description}</span>
            </div>
        </div>
    `).join('');
}

function escapeAttr(str) {
    return (str || '').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

function openArchiveLightbox(src, title, description) {
    const lb = document.getElementById('archiveLightbox');
    if (!lb) return;
    document.getElementById('archiveLightboxImg').src = src;
    document.getElementById('archiveLightboxTitle').textContent = title;
    document.getElementById('archiveLightboxDesc').textContent = description;
    lb.classList.add('active');
}

function closeArchiveLightbox() {
    document.getElementById('archiveLightbox')?.classList.remove('active');
}

// ESC-Taste schließt Lightbox
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeArchiveLightbox();
});
