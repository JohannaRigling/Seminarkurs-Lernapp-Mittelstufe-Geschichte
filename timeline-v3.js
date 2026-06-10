// ===== TIMELINE V3 =====

let zoomLevel = 1.0;           // 1–15; Stufe 1 zeigt ~1600–2025 (vgl. früher Stufe 4)
let currentMode = 'allgemein'; // 'allgemein' | 'klasse10'
let activeThemes = { russland: true, china: true, osmanisch: true }; // K10-Filter
let viewedTimelineEvents = new Set();
let selectedEventId = null;
let isPanning = false;
let startX = 0;
let startScrollLeft = 0;
let visibleEventsCache = [];

// ===== HILFSFUNKTIONEN =====

function getActiveEvents() {
    if (currentMode === 'klasse10') {
        return TIMELINE_EVENTS_KLASSE10.filter(e => activeThemes[e.theme]);
    }
    return TIMELINE_EVENTS_V2;
}

function getYearBounds() {
    // Vorlauf an beiden Rändern: links läuft der Strahl ins Bild ein, bevor das erste
    // Label (800 bzw. 1400) kommt. Rechts läuft er nach 2025 bzw. 2000 weiter aus,
    // damit es nicht wirkt als ende die Geschichte abrupt.
    return currentMode === 'klasse10' ? { min: 1390, max: 2050 } : { min: 780, max: 2025 };
}

function getMaxZoom() {
    return currentMode === 'klasse10' ? 5.0 : 10.0;
}

function getThemeColor(theme) {
    return { russland: '#c0392b', china: '#d4a017', osmanisch: '#16a085' }[theme] || null;
}

function formatYear(year) {
    return year < 0 ? `${Math.abs(year)} v. Chr.` : String(year);
}

// Exponentieller Skalierungsfaktor: Stufe 1 = ~477 Jahre sichtbar (=früher Stufe 4), Stufe 15 ≈ 6 Jahre
function getScaleFactor(zoom) {
    return Math.pow(1.37, zoom + 2); // +2 Versatz: neue Stufe 1 = alte Stufe 4
}

// Gestaffelte Event-Sichtbarkeit – sanfter Anstieg (~ähnlich viele Events sichtbar je Zoom)
// Z1→13 ‖ Z2→19 ‖ Z3→27 ‖ Z4→40 ‖ Z5→58 ‖ Z6→90 ‖ Z7→126 ‖ Z8→135 ‖ Z9→146 ‖ Z10+→170 Events
function getMaxMinZoom() {
    if (currentMode === 'klasse10') return 99;
    const z = Math.floor(zoomLevel);
    const table = { 1:2.0, 2:2.4, 3:2.8, 4:3.2, 5:3.6, 6:4.0, 7:4.5, 8:5.0, 9:5.5 };
    return table[z] || 6.0;
}


// ===== START =====

document.addEventListener('DOMContentLoaded', function () {
    // Container in einen Wrapper packen, damit die Fade-Overlays am Bildschirmrand
    // bleiben können (Pseudo-Elemente direkt auf dem Scroll-Container würden mitscrollen).
    const container = document.getElementById('timelineContainer');
    if (container && !container.parentNode.classList.contains('timeline-fade-wrap')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'timeline-fade-wrap';
        container.parentNode.insertBefore(wrapper, container);
        wrapper.appendChild(container);
    }

    loadTimeline();
    setupTimelineControls();
    // Startposition: Bereich 1700–2025 (allgemein) bzw. 1700–2000 (Klasse 10)
    requestAnimationFrame(() => {
        const container = document.getElementById('timelineContainer');
        const track = document.getElementById('timelineTrack');
        if (!container || !track) return;
        const { min, max } = getYearBounds();
        // Mitte des 1600-2000-Fensters – beim Öffnen sieht man so direkt diesen Bereich
        const targetYear = 1800;
        const yearTrackPixels = track.clientWidth - 350;
        const pos = (targetYear - min) / (max - min);
        container.scrollLeft = pos * yearTrackPixels - container.clientWidth / 2;
    });
});

// ===== EVENT-PLATZIERUNG (8 Ebenen, kollisionsfrei) =====
// - Side aus year%2 als Standard, anderes Seite als Ausweich bei Kollision
// - Level startet bei Wichtigkeit (minZoom), wird bei Überlappung erhöht
// - Events im selben Jahr landen IMMER auf unterschiedlichen Ebenen (slot.year-Check)

// Oben weniger Ebenen, weil dort die Epochen-Banner liegen.
const MAX_LEVEL_TOP    = 6;
const MAX_LEVEL_BOTTOM = 8;

function placeEvents(events, totalMinYear, totalRange, trackPixels) {
    const MAX_LEVELS = Math.max(MAX_LEVEL_TOP, MAX_LEVEL_BOTTOM);
    const LABEL_HALF = 75; // halbe Label-Breite + Sicherheits-Puffer
    const placement = new Map();
    const sides = {
        T: Array.from({ length: MAX_LEVELS + 1 }, () => ({ rightEdge: -Infinity, year: null })),
        B: Array.from({ length: MAX_LEVELS + 1 }, () => ({ rightEdge: -Infinity, year: null }))
    };
    const maxFor = side => side === 'T' ? MAX_LEVEL_TOP : MAX_LEVEL_BOTTOM;

    // Links→rechts, im selben Jahr wichtigste zuerst (bekommen die niedrigsten Ebenen)
    const sorted = [...events].sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return (a.minZoom || 1) - (b.minZoom || 1);
    });

    sorted.forEach(event => {
        const xPx       = ((event.year - totalMinYear) / totalRange) * trackPixels;
        const leftEdge  = xPx - LABEL_HALF;
        const rightEdge = xPx + LABEL_HALF;
        const key       = event.year + event.title;

        const prefSide   = event.year % 2 === 0 ? 'T' : 'B';
        const startLevel = Math.max(1, Math.min(MAX_LEVELS - 1, Math.floor(event.minZoom || 1)));

        let placed = false;
        for (let lev = startLevel; lev <= MAX_LEVELS && !placed; lev++) {
            for (const side of [prefSide, prefSide === 'T' ? 'B' : 'T']) {
                if (lev > maxFor(side)) continue; // Ebene auf dieser Seite nicht erlaubt
                const slot = sides[side][lev];
                if (slot.rightEdge < leftEdge && slot.year !== event.year) {
                    slot.rightEdge = rightEdge;
                    slot.year      = event.year;
                    placement.set(key, { side, level: lev });
                    placed = true;
                    break;
                }
            }
        }
        if (!placed) {
            // Notfall: höchste erlaubte Ebene auf der bevorzugten Seite
            placement.set(key, { side: prefSide, level: maxFor(prefSide) });
        }
    });

    return placement;
}

// ===== TIMELINE RENDERN =====

function loadTimeline() {
    const container = document.getElementById('timelineContainer');
    const track = document.getElementById('timelineTrack');
    if (!track || !container) return;

    const { min: totalMinYear, max: totalMaxYear } = getYearBounds();
    const totalRange = totalMaxYear - totalMinYear;

    const containerWidth   = container.clientWidth || 1200;
    const scaleFactor      = getScaleFactor(zoomLevel);
    const yearTrackPixels  = Math.round(containerWidth * scaleFactor);
    // Zusätzlicher Pixel-Puffer rechts: Track ist breiter als der Jahres-Bereich,
    // damit der Strahl bei jedem Zoom über den rechten Bildschirmrand HINAUS reicht
    // (sonst klebt der Strahl bei Z1 genau am Rand und der Fade wirkt wie eine Lücke).
    const RIGHT_BUFFER_PX  = 350;
    const trackPixels      = yearTrackPixels + RIGHT_BUFFER_PX;
    track.style.width      = `${trackPixels}px`;

    const visibleYearRange = totalRange / scaleFactor;

    // Events gestaffelt: bei Zoom 1–3 nur die wichtigsten, mit Zoom immer detaillierter
    const allEvents = getActiveEvents().filter(e => e.minZoom <= getMaxMinZoom());
    visibleEventsCache = allEvents;

    let html = '<div class="timeline-line"></div>';
    html += generateYearMarkers(totalMinYear, totalMaxYear, totalRange, visibleYearRange, yearTrackPixels);
    if (currentMode === 'allgemein') html += generateEraMarkers(totalMinYear, totalMaxYear, totalRange, yearTrackPixels);

    // Kollisionsfreie Platzierung (8/6 Ebenen, gleichjährige Events auf verschiedene Ebenen)
    const placement = placeEvents(allEvents, totalMinYear, totalRange, yearTrackPixels);

    // Zwei Schichten: Linien zuerst (z-index niedrig), Labels danach (z-index hoch).
    // Dadurch laufen Verbindungslinien anderer Events HINTER die Eventkarten.
    let linesHtml  = '';
    let labelsHtml = '';

    allEvents.forEach((event, index) => {
        const positionPx = ((event.year - totalMinYear) / totalRange) * yearTrackPixels;
        const isActive  = selectedEventId === event.year + event.title;
        const key = event.year + event.title;
        const { side, level } = placement.get(key) || { side: 'T', level: 3 };

        const posClass   = side === 'T' ? 'event-top' : 'event-bottom';
        const themeColor = currentMode === 'klasse10' ? getThemeColor(event.theme) : null;
        const labelStyle = themeColor ? `border-color:${themeColor}90; color:${themeColor};` : '';
        // K10: Verbindungslinie komplett in Themen-Farbe (statt grau)
        const lineVars   = themeColor ? `--event-line:${themeColor}cc;--event-line-active:${themeColor};` : '';
        const wrapStyle  = `left:${positionPx}px;${lineVars}`;
        const labelInline = labelStyle ? ` style="${labelStyle}"` : '';
        const activeCls   = isActive ? ' active' : '';

        // Linie (Hintergrund-Layer)
        linesHtml += `<div class="event-line ${posClass} level-${level}${activeCls}"
                            data-index="${index}"
                            style="${wrapStyle}"></div>`;

        // Label-Wrapper (Vordergrund-Layer)
        labelsHtml += `<div class="event-label-wrap ${posClass} level-${level}${activeCls}"
                             data-index="${index}"
                             style="${wrapStyle}"
                             onclick="showEventCard(${index})">
            <div class="event-label-spacer"></div>
            <div class="timeline-event-label"${labelInline}>${event.title}</div>
        </div>`;
    });

    track.innerHTML = html + linesHtml + labelsHtml;
}

// ===== JAHRES-MARKER =====

function generateYearMarkers(totalMinYear, totalMaxYear, totalRange, visibleYearRange, yearTrackPixels) {
    let markers = '';

    let majorStep;
    if      (visibleYearRange > 600) majorStep = 200;
    else if (visibleYearRange > 200) majorStep = 100;
    else if (visibleYearRange > 80)  majorStep = 50;
    else if (visibleYearRange > 30)  majorStep = 20;
    else                             majorStep = 10;

    // Feinschritte: 10er ab ~Stufe 7 (allgemein) bzw. von Anfang an (K10), 5er ab ~Stufe 10
    let minorStep = null;
    const minorThreshold = currentMode === 'klasse10' ? 250 : 200;
    if (visibleYearRange <= minorThreshold) minorStep = 10;
    if (visibleYearRange <= 85)             minorStep = 5;

    // Hauptmarken auf Jahrhundert-Raster (800, 900, 1000, …)
    // firstYear ist die untere Beschriftungs-Grenze, oben dürfen Label bis kurz vor
    // dem Bound-Ende erscheinen (kleine 10er-Marker auch nach 2000).
    const firstYear     = currentMode === 'allgemein' ? 800 : 1400;
    const lastLabelYear = totalMaxYear - 5;
    const startY        = Math.max(firstYear, Math.ceil(totalMinYear / majorStep) * majorStep);

    for (let y = startY; y <= totalMaxYear; y += majorStep) {
        if (y < firstYear || y > lastLabelYear) continue;
        const pos  = ((y - totalMinYear) / totalRange) * yearTrackPixels;
        const isMill = y % 1000 === 0;
        const isCent = !isMill && y % 100 === 0;
        const cls  = isMill ? 'century-marker marker-millennium'
                   : isCent ? 'century-marker marker-century'
                   :          'century-marker';
        markers += `<div class="${cls}" style="left:${pos}px;">
            <div class="century-line"></div>
            <div class="century-label">${y}</div>
        </div>`;
    }

    if (minorStep) {
        for (let y = Math.ceil(totalMinYear / minorStep) * minorStep; y <= totalMaxYear; y += minorStep) {
            if (y % majorStep === 0) continue;
            if (y < firstYear || y > lastLabelYear) continue;
            const pos = ((y - totalMinYear) / totalRange) * yearTrackPixels;
            markers += `<div class="year-marker-minor" style="left:${pos}px;">
                <div class="year-line-minor"></div>
                <div class="year-label-minor">${y}</div>
            </div>`;
        }
    }

    return markers;
}

// ===== EPOCHEN-MARKER (immer sichtbar, 5 Ebenen) =====

function generateEraMarkers(totalMinYear, totalMaxYear, totalRange, yearTrackPixels) {
    const eras = [
        { start: 800,  end: 1500, name: 'Mittelalter',       color: '#8b4513' },
        { start: 1500, end: 1789, name: 'Frühe Neuzeit',     color: '#c9a96e' },
        { start: 1789, end: 1815, name: 'Revolution',        color: '#e74c3c' },
        { start: 1815, end: 1871, name: 'Einigung',          color: '#d4a574' },
        { start: 1871, end: 1914, name: 'Kaiserreich',       color: '#6a6a6a' },
        { start: 1914, end: 1918, name: 'WW1',               color: '#7d3c3c' },
        { start: 1918, end: 1933, name: 'Weimar',            color: '#b8a090' },
        { start: 1933, end: 1945, name: 'NS-Zeit',           color: '#5c5c5c' },
        { start: 1945, end: 1990, name: 'Kalter Krieg',      color: '#5d8aa8' },
        { start: 1990, end: 2025, name: 'Wiedervereinigung', color: '#27ae60' }
    ];
    // 3 Ebenen kompakt am oberen Track-Rand (Labels überlappen sonst bei schmalen Bannern)
    const levels = [4, 26, 48];
    let html = '';
    eras.forEach((era, i) => {
        const s   = ((era.start - totalMinYear) / totalRange) * yearTrackPixels;
        const e   = ((era.end   - totalMinYear) / totalRange) * yearTrackPixels;
        const top = levels[i % 3];
        // Etwas kräftiger als zuvor, ohne die Events zu überstrahlen
        const opacity = Math.max(0.4, 0.8 - (zoomLevel - 1) / 30);
        html += `<div class="era-marker"
            style="left:${s}px;width:${e-s}px;top:${top}px;background:${era.color}22;border-left:3px solid ${era.color};opacity:${opacity};">
            <span class="era-name" style="color:${era.color};">${era.name}</span>
        </div>`;
    });
    return html;
}

// ===== EVENT-KARTE (zentriert) =====

function showEventCard(index) {
    const event = visibleEventsCache[index];
    if (!event) return;
    selectedEventId = event.year + event.title;

    let backdrop = document.getElementById('cardBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'cardBackdrop';
        backdrop.className = 'event-card-backdrop';
        backdrop.onclick = closeEventCard;
        document.body.appendChild(backdrop);
    }

    let card = document.getElementById('eventCard');
    if (!card) {
        card = document.createElement('div');
        card.id = 'eventCard';
        card.className = 'event-card';
        document.body.appendChild(card);
    }

    const themeColor = currentMode === 'klasse10' ? getThemeColor(event.theme) : null;
    const themeNames = { russland: 'Russland', china: 'China', osmanisch: 'Osmanisches Reich' };
    const themeName  = event.theme ? themeNames[event.theme] : null;

    card.innerHTML = `
        <button class="card-close-btn" onclick="closeEventCard()">×</button>
        <div class="card-header">
            ${themeName ? `<span class="card-theme-label" style="background:${themeColor};">${themeName}</span><br>` : ''}
            <h3>${event.title}</h3>
            <span class="card-year" ${themeColor ? `style="background:${themeColor};"` : ''}>${event.date || formatYear(event.year)}</span>
        </div>
        <div class="card-content">
            <p class="card-description">${event.description}</p>
            ${event.details ? `<p class="card-details">${event.details}</p>` : ''}
        </div>
        <div class="card-actions">
            <button class="btn btn-secondary" onclick="learnMoreAboutEvent('${event.title.replace(/'/g, "\\'")}')">
                💬 Mit KI-Tutor besprechen
            </button>
        </div>`;

    card.classList.remove('show');
    backdrop.classList.remove('show');
    requestAnimationFrame(() => {
        card.classList.add('show');
        backdrop.classList.add('show');
    });

    if (!viewedTimelineEvents.has(event.title)) {
        viewedTimelineEvents.add(event.title);
        if (typeof currentUser !== 'undefined' && currentUser && typeof updateUserProgress === 'function') {
            currentUser.progress.timelineViewed = viewedTimelineEvents.size;
            updateUserProgress({ timelineViewed: viewedTimelineEvents.size });
        }
    }

    document.querySelectorAll('.event-line.active, .event-label-wrap.active')
        .forEach(el => el.classList.remove('active'));
    document.querySelectorAll(`.event-line[data-index="${index}"], .event-label-wrap[data-index="${index}"]`)
        .forEach(el => el.classList.add('active'));
}

function closeEventCard() {
    const card     = document.getElementById('eventCard');
    const backdrop = document.getElementById('cardBackdrop');
    if (card)     { card.classList.remove('show');     setTimeout(() => card.remove(),     260); }
    if (backdrop) { backdrop.classList.remove('show'); setTimeout(() => backdrop.remove(), 260); }
    selectedEventId = null;
    document.querySelectorAll('.event-line.active, .event-label-wrap.active')
        .forEach(el => el.classList.remove('active'));
}

function learnMoreAboutEvent(title) {
    closeEventCard();
    if (typeof showSection === 'function') {
        showSection('chat');
        const input = document.getElementById('chatInput');
        if (input) { input.value = `Erzähle mir mehr über: ${title}`; input.focus(); }
    }
    if (typeof showToast === 'function') showToast('Frage den KI-Tutor über das Ereignis!', 'info');
}

// ===== ZOOM (15 Stufen, exponentiell, ruckelfrei) =====

function changeZoom(delta) {
    const container = document.getElementById('timelineContainer');
    const track     = document.getElementById('timelineTrack');
    if (!container || !track) return;

    // Mittelpunkt des aktuellen Sichtbereichs als Anteil des Tracks merken
    const midRatio = track.clientWidth > 0
        ? (container.scrollLeft + container.clientWidth / 2) / track.clientWidth
        : 0.5;

    const oldZoom = zoomLevel;
    zoomLevel = Math.max(1.0, Math.min(getMaxZoom(), Math.round((zoomLevel + delta) * 10) / 10));

    if (oldZoom !== zoomLevel) {
        const containerWidth = container.clientWidth || 1200;
        // Neue Track-Breite (inkl. RIGHT_BUFFER_PX=350) und Scroll-Position berechnen
        const newTrackPixels = Math.round(containerWidth * getScaleFactor(zoomLevel)) + 350;
        const newScrollLeft  = Math.max(0, midRatio * newTrackPixels - containerWidth / 2);

        loadTimeline();
        updateZoomDisplay();
        // Scroll nach Layout-Update setzen (kein Blitzen)
        requestAnimationFrame(() => { container.scrollLeft = newScrollLeft; });
    }
}

function zoomTimeline(direction) {
    changeZoom(direction === 'in' ? 1.0 : -1.0);
}

function updateZoomDisplay() {
    const display = document.getElementById('zoomLevel');
    if (!display) return;
    const { min, max } = getYearBounds();
    const visibleYears = Math.round((max - min) / getScaleFactor(zoomLevel));
    const count = getActiveEvents().filter(e => e.minZoom <= getMaxMinZoom()).length;
    display.textContent = `${zoomLevel}×`;
}

// ===== MODUS-WECHSEL =====

function switchTimelineMode(mode) {
    if (currentMode === mode) return;
    currentMode = mode;
    zoomLevel = 1.0;
    // Filter beim Mode-Wechsel zurücksetzen (alle Imperien aktiv)
    activeThemes = { russland: true, china: true, osmanisch: true };
    document.querySelectorAll('.k10-legend-item').forEach(el => el.classList.add('active'));

    const container = document.getElementById('timelineContainer');
    if (container) container.scrollLeft = 0;

    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(mode === 'klasse10' ? 'btnModeKlasse10' : 'btnModeAllgemein');
    if (btn) btn.classList.add('active');

    // index.html Legenden
    const lk10 = document.getElementById('timelineLegendK10');
    const lall = document.getElementById('timelineLegendAllgemein');
    if (lk10) lk10.style.display = mode === 'klasse10' ? 'block' : 'none';
    if (lall) lall.style.display = mode === 'klasse10' ? 'none'  : 'block';

    // timeline-test.html Legende
    const k10leg = document.getElementById('k10Legend');
    if (k10leg) k10leg.classList.toggle('visible', mode === 'klasse10');

    loadTimeline();
    updateZoomDisplay();
}

// ===== IMPERIEN-FILTER (Klasse 10) =====
function toggleEmpireFilter(theme) {
    if (!(theme in activeThemes)) return;
    activeThemes[theme] = !activeThemes[theme];
    document.querySelectorAll('.k10-legend-item').forEach(el => {
        const t = el.dataset.theme;
        if (t) el.classList.toggle('active', activeThemes[t]);
    });
    loadTimeline();
}

// ===== STEUERUNG =====

function setupTimelineControls() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    // Drag to scroll
    container.addEventListener('mousedown', (e) => {
        if (e.target.closest('.timeline-event-label')) return;
        isPanning = true;
        startX = e.pageX - container.offsetLeft;
        startScrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
        e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        container.scrollLeft = startScrollLeft - (e.pageX - container.offsetLeft - startX) * 1.5;
    });
    document.addEventListener('mouseup', () => {
        isPanning = false;
        container.style.cursor = 'grab';
    });

    // Touch
    let touchStartX = 0, touchScrollLeft = 0;
    container.addEventListener('touchstart', (e) => {
        if (e.target.closest('.timeline-event-label')) return;
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = container.scrollLeft;
    });
    container.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        container.scrollLeft = touchScrollLeft + (touchStartX - e.touches[0].pageX) * 1.5;
    });
    container.addEventListener('touchend', () => { touchStartX = 0; });

    // Wheel: Ctrl = Zoom, sonst Horizontal-Scroll
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) changeZoom(e.deltaY > 0 ? -1.0 : 1.0);
        else container.scrollLeft += e.deltaY * 2;
    }, { passive: false });

    // Tastatur
    document.addEventListener('keydown', (e) => {
        const sec = document.getElementById('timeline');
        if (sec && !sec.classList.contains('active')) return;
        if      (e.key === 'ArrowLeft')          container.scrollLeft -= 120;
        else if (e.key === 'ArrowRight')         container.scrollLeft += 120;
        else if (e.key === '+' || e.key === '=') changeZoom(1.0);
        else if (e.key === '-' || e.key === '_') changeZoom(-1.0);
        else if (e.key === 'Escape')             closeEventCard();
    });

    document.addEventListener('click', (e) => {
        const card = document.getElementById('eventCard');
        if (card && !card.contains(e.target) && !e.target.closest('.timeline-event-label')) closeEventCard();
    });

    // Hover-Sync: wenn das Label hovered ist, die zugehörige Linie hervorheben
    container.addEventListener('mouseover', (e) => {
        const label = e.target.closest('.timeline-event-label');
        if (!label) return;
        const idx = label.parentElement?.dataset.index;
        if (idx == null) return;
        const line = container.querySelector(`.event-line[data-index="${idx}"]`);
        if (line) line.classList.add('hovered');
    });
    container.addEventListener('mouseout', (e) => {
        const label = e.target.closest('.timeline-event-label');
        if (!label) return;
        const idx = label.parentElement?.dataset.index;
        if (idx == null) return;
        const line = container.querySelector(`.event-line[data-index="${idx}"]`);
        if (line) line.classList.remove('hovered');
    });

    updateZoomDisplay();
}

// ===== CSS =====
const styles = document.createElement('style');
styles.textContent = `
    /* ===== TIMELINE-LINIE ===== */
    .timeline-line {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 50%, var(--primary) 100%);
        transform: translateY(-50%);
        border-radius: 2px;
        z-index: 1;
    }

    /* ===== AUSLAUF-FADE am Bildschirmrand (scroll-unabhängig) =====
       Wrapper umschließt den Scroll-Container. Pseudo-Elemente am Wrapper bleiben
       am linken/rechten Bildschirmrand fix sitzen und fadenden alles dahinter zur
       Hintergrundfarbe — der Strahl läuft so bei jedem Zoom & Scroll "aus dem Bild". */
    .timeline-fade-wrap {
        position: relative;
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
    }
    .timeline-fade-wrap > #timelineContainer,
    .timeline-fade-wrap > .timeline-container { flex: 1; min-height: 0; }

    /* Strahl direkt an der Container-Innenkante — kein horizontaler Versatz */
    #timelineContainer, .timeline-container { padding-left: 0 !important; padding-right: 0 !important; }
    #timelineTrack, .timeline-track         { padding-left: 0 !important; padding-right: 0 !important; }

    .timeline-fade-wrap::after {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0;
        width: 110px;
        background: linear-gradient(90deg, transparent, rgba(19, 19, 32, 0.85));
        pointer-events: none;
        z-index: 50;
    }
    .timeline-fade-wrap::before {
        content: '';
        position: absolute;
        top: 0; left: 0; bottom: 0;
        width: 55px;
        background: linear-gradient(90deg, rgba(19, 19, 32, 0.85), transparent);
        pointer-events: none;
        z-index: 50;
    }

    /* ===== JAHRESMARKER – Label knapp ÜBER dem Zeitstrahl ===== */
    /* Unterkante = Zeitstrahl; Strich (order 2) unten, Label (order 1) darüber */
    .century-marker {
        position: absolute;
        top: 50%;
        transform: translateX(-50%) translateY(-100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
        pointer-events: none;
    }
    .century-line {
        order: 2;
        width: 1px;
        height: 10px;
        background: rgba(140,140,140,0.28);
        flex-shrink: 0;
    }
    .century-label {
        order: 1;
        font-size: 0.63em;
        font-weight: 600;
        color: rgba(150,150,150,0.7);
        white-space: nowrap;
        padding: 1px 4px;
        background: var(--bg-primary);
        border-radius: 3px;
        border: 1px solid rgba(100,100,100,0.28);
        margin-bottom: 2px;
        line-height: 1.3;
    }

    /* Jahrhundertwende: deutlich hervorgehoben */
    .marker-century .century-line {
        width: 2px;
        height: 16px;
        background: rgba(200,200,200,0.55);
    }
    .marker-century .century-label {
        font-size: 0.72em;
        color: rgba(220,220,220,0.9);
        border-color: rgba(180,180,180,0.5);
        padding: 1px 6px;
    }

    /* Jahrtausendwende: primärfarbe, gut sichtbar */
    .marker-millennium .century-line {
        width: 2px;
        height: 22px;
        background: var(--primary);
        opacity: 0.85;
    }
    .marker-millennium .century-label {
        font-size: 0.78em;
        font-weight: bold;
        color: var(--primary);
        border-color: var(--primary);
        padding: 1px 7px;
    }

    /* ===== FEINE JAHRESMARKER (10er / 5er) – gleiche Richtung ===== */
    .year-marker-minor {
        position: absolute;
        top: 50%;
        transform: translateX(-50%) translateY(-100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
        pointer-events: none;
    }
    .year-line-minor {
        order: 2;
        width: 1px;
        height: 6px;
        background: rgba(120,120,120,0.2);
        flex-shrink: 0;
    }
    .year-label-minor {
        order: 1;
        font-size: 0.52em;
        color: rgba(140,140,140,0.5);
        white-space: nowrap;
        margin-bottom: 1px;
        line-height: 1.2;
    }

    /* ===== EPOCHEN-BANNER (3 kompakte Reihen am oberen Track-Rand) ===== */
    .era-marker {
        position: absolute;
        height: 18px;
        border-radius: 3px;
        align-items: center;
        padding-left: 5px;
        z-index: 0;
        overflow: visible; /* Text ragt raus statt abgeschnitten zu werden */
        display: flex;
    }
    .era-name {
        font-size: 0.68em;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.7px;
        white-space: nowrap;
        pointer-events: none;
    }

    /* ===== EVENTS: ZWEI LAYER (Linien HINTEN, Labels VORN) =====
       Linien-Layer (z-index 5) und Label-Layer (z-index 15) sind getrennte
       Geschwister im DOM, damit Verbindungslinien anderer Events HINTER
       fremden Eventkarten liegen. */

    /* Ebenenhöhen (gap 60px + stem-Anteil pro Level). Über CSS-Variable,
       damit .event-line und .event-label-spacer dieselbe Höhe verwenden. */
    .level-1 { --line-height:  74px; }
    .level-2 { --line-height: 100px; }
    .level-3 { --line-height: 126px; }
    .level-4 { --line-height: 152px; }
    .level-5 { --line-height: 178px; }
    .level-6 { --line-height: 204px; }
    .level-7 { --line-height: 230px; }
    .level-8 { --line-height: 256px; }

    /* ----- Linien-Layer ----- */
    .event-line {
        position: absolute;
        top: 50%;
        left: 0;
        width: 1px;
        height: var(--line-height, 100px);
        background: var(--event-line, rgba(155,155,155,0.3));
        transform: translateX(-50%);
        transition: background 0.2s;
        z-index: 5;
        pointer-events: none;
    }
    .event-line.event-top {
        transform: translateX(-50%) translateY(-100%);
    }
    .event-line.hovered,
    .event-line.active {
        background: var(--event-line-active, rgba(225,225,225,0.9));
    }

    /* ----- Label-Layer ----- */
    .event-label-wrap {
        position: absolute;
        top: 50%;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
        z-index: 15;
        pointer-events: none; /* nur das Label fängt Klicks */
    }
    .event-label-wrap.event-top {
        flex-direction: column-reverse;
        transform: translateX(-50%) translateY(-100%);
    }
    .event-label-wrap.active,
    .event-label-wrap:has(.timeline-event-label:hover) {
        z-index: 200; /* aktive/gehoverte Karte über alle anderen */
    }
    .event-label-spacer {
        width: 1px;
        height: var(--line-height, 100px);
        flex-shrink: 0;
    }

    /* Event-Label – nur das Label fängt Maus-Events */
    .timeline-event-label {
        padding: 4px 9px;
        background: var(--bg-secondary);
        border-radius: 5px;
        border: 1px solid var(--border-color);
        font-size: 0.8em;
        white-space: nowrap;
        max-width: 130px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        color: var(--text-primary);
        transition: all 0.2s ease;
        user-select: none;
        cursor: pointer;
        pointer-events: all; /* nur das sichtbare Kästchen reagiert auf Hover/Klick */
    }
    .timeline-event-label:hover,
    .event-label-wrap.active .timeline-event-label {
        background: var(--bg-tertiary);
        border-color: var(--primary);
        max-width: 190px;
        overflow: visible;
        box-shadow: 0 2px 10px rgba(0,0,0,0.4);
        position: relative;
        z-index: 20;
    }

    /* ===== KARTE ZENTRIERT ===== */
    .event-card-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.45);
        z-index: 999;
        opacity: 0;
        transition: opacity 0.24s;
        pointer-events: none;
    }
    .event-card-backdrop.show {
        opacity: 1;
        pointer-events: all;
    }
    .event-card {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.93);
        background: var(--bg-primary);
        border-radius: 14px;
        box-shadow: 0 20px 70px rgba(0,0,0,0.55);
        padding: 26px;
        max-width: 460px;
        width: 90vw;
        z-index: 1000;
        opacity: 0;
        transition: all 0.24s cubic-bezier(0.4,0,0.2,1);
        pointer-events: none;
        border: 2px solid var(--primary);
    }
    .event-card.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
        pointer-events: all;
    }
    .card-close-btn {
        position: absolute;
        top: 13px;
        right: 13px;
        background: var(--bg-secondary);
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        font-size: 1.35em;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-primary);
        transition: all 0.2s;
        line-height: 1;
    }
    .card-close-btn:hover { background: var(--primary); color: white; transform: rotate(90deg); }
    .card-header { margin-bottom: 14px; padding-right: 38px; }
    .card-header h3 { margin: 0 0 10px 0; color: var(--text-primary); font-size: 1.28em; line-height: 1.3; }
    .card-year {
        display: inline-block;
        background: var(--primary);
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.87em;
        font-weight: bold;
    }
    .card-theme-label {
        display: inline-block;
        font-size: 0.73em;
        font-weight: bold;
        color: white;
        padding: 3px 9px;
        border-radius: 9px;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin-bottom: 7px;
    }
    .card-content { margin-bottom: 14px; }
    .card-description, .card-details {
        margin: 9px 0;
        line-height: 1.7;
        color: var(--text-secondary);
        font-size: 0.92em;
    }
    .card-details {
        border-top: 1px solid var(--border-color);
        padding-top: 9px;
        margin-top: 9px;
    }
    .card-actions { display: flex; gap: 10px; }
    .card-actions .btn { flex: 1; padding: 10px; font-size: 0.87em; }

    /* ===== MODUS-TOGGLE ===== */
    .timeline-mode-toggle { display: flex; gap: 8px; align-items: center; }
    .mode-btn {
        padding: 8px 16px;
        border: 2px solid var(--border-color);
        border-radius: 20px;
        background: var(--bg-secondary);
        color: var(--text-secondary);
        font-size: 0.88em;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s ease;
        white-space: nowrap;
    }
    .mode-btn:hover { border-color: var(--primary); color: var(--primary); }
    .mode-btn.active {
        background: var(--primary);
        border-color: var(--primary);
        color: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }

    @media (max-width: 768px) { .event-card { max-width: 93vw; } }
`;
document.head.appendChild(styles);
