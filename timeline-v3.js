// ===== TIMELINE V3 - ROBUST MIT FIXEM SCROLL =====

const TOTAL_MIN_YEAR = 800;
const TOTAL_MAX_YEAR = 2025;
const TOTAL_RANGE = TOTAL_MAX_YEAR - TOTAL_MIN_YEAR;
const BASE_TRACK_WIDTH = 7000; // px bei Zoom 1.0

let zoomLevel = 1.0;
let viewedTimelineEvents = new Set();
let selectedEventId = null;
let isPanning = false;
let startX = 0;
let startScrollLeft = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadTimeline();
    setupTimelineControls();
});

function loadTimeline() {
    const container = document.getElementById('timelineContainer');
    const track = document.getElementById('timelineTrack');
    if (!track || !container) return;

    // Track wächst proportional zum Zoom → Events rücken auseinander
    const trackPixels = BASE_TRACK_WIDTH * zoomLevel;
    track.style.width = `${trackPixels}px`;

    const visibleEvents = TIMELINE_EVENTS_V2.filter(e => e.minZoom <= zoomLevel);

    let html = '<div class="timeline-line"></div>';
    html += generateCenturyMarkers();
    html += generateEraMarkers();

    visibleEvents.forEach((event, index) => {
        // Position basiert immer auf dem gesamten Jahresbereich
        const position = ((event.year - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
        const isActive = selectedEventId === event.year + event.title;

        // Wichtigkeit bestimmt Ebene: niedrigerer minZoom = wichtiger = näher am Strahl
        const importanceLevel = Math.min(5, Math.max(1, Math.round(event.minZoom - 1)));
        const posClass = index % 2 === 0 ? 'event-top' : 'event-bottom';
        const levelOffset = `level-${importanceLevel}`;

        html += `
            <div class="timeline-event ${isActive ? 'active' : ''} ${posClass} ${levelOffset}"
                 style="left: ${position}%;"
                 data-year="${event.year}"
                 data-index="${index}">
                <div class="timeline-event-dot"></div>
                <div class="timeline-event-label" onclick="showEventCard(${index}, event)">
                    <span class="event-year">${formatYear(event.year)}</span>
                    <span class="event-title-short">${event.title}</span>
                </div>
            </div>
        `;
    });

    track.innerHTML = html;
}

function formatYear(year) {
    return year < 0 ? `${Math.abs(year)} v. Chr.` : year.toString();
}

function generateCenturyMarkers() {
    let markers = '';

    let step;
    if (zoomLevel < 2) {
        step = 200;
    } else if (zoomLevel < 5) {
        step = 100;
    } else {
        step = 50;
    }

    const startYear = Math.ceil(TOTAL_MIN_YEAR / step) * step;
    for (let year = startYear; year <= TOTAL_MAX_YEAR; year += step) {
        const position = ((year - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
        markers += `
            <div class="century-marker" style="left: ${position}%;">
                <div class="century-line"></div>
                <div class="century-label">${year}</div>
            </div>
        `;
    }

    // 10-Jahres-Marker
    if (zoomLevel >= 3) {
        const decadeStart = Math.ceil(TOTAL_MIN_YEAR / 10) * 10;
        for (let year = decadeStart; year <= TOTAL_MAX_YEAR; year += 10) {
            if (year % step === 0) continue;
            const position = ((year - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
            markers += `
                <div class="decade-marker" style="left: ${position}%;">
                    <div class="decade-line"></div>
                    <div class="decade-label">${year}</div>
                </div>
            `;
        }
    }

    // 5-Jahres-Marker
    if (zoomLevel >= 10) {
        const fiveStart = Math.ceil(TOTAL_MIN_YEAR / 5) * 5;
        for (let year = fiveStart; year <= TOTAL_MAX_YEAR; year += 5) {
            if (year % 10 === 0) continue;
            const position = ((year - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
            markers += `
                <div class="five-marker" style="left: ${position}%;">
                    <div class="five-line"></div>
                    <div class="five-label">${year}</div>
                </div>
            `;
        }
    }

    // 1-Jahres-Marker
    if (zoomLevel >= 13) {
        for (let year = TOTAL_MIN_YEAR + 1; year <= TOTAL_MAX_YEAR; year++) {
            if (year % 5 === 0) continue;
            const position = ((year - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
            markers += `
                <div class="year-marker" style="left: ${position}%;">
                    <div class="year-line"></div>
                </div>
            `;
        }
    }

    return markers;
}

function generateEraMarkers() {

    const eras = [
        { start: 800,  end: 1500, name: 'Mittelalter',       color: '#c4a065' },
        { start: 1500, end: 1789, name: 'Frühe Neuzeit',     color: '#d4b870' },
        { start: 1789, end: 1815, name: 'Revolution',        color: '#d49090' },
        { start: 1815, end: 1871, name: 'Einigung',          color: '#c48870' },
        { start: 1871, end: 1914, name: 'Kaiserreich',       color: '#8aaac4' },
        { start: 1914, end: 1918, name: 'WW1',               color: '#c47878' },
        { start: 1918, end: 1933, name: 'Weimar',            color: '#8ab890' },
        { start: 1933, end: 1945, name: 'NS-Zeit',           color: '#a880b0' },
        { start: 1945, end: 1990, name: 'Kalter Krieg',      color: '#78a0c4' },
        { start: 1990, end: 2025, name: 'Wiedervereinigung', color: '#80b898' }
    ];

    let markers = '';
    eras.forEach((era, i) => {
        const startPos = ((era.start - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
        const endPos = ((era.end - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
        const width = endPos - startPos;
        const opacity = zoomLevel <= 2 ? 1.0 : Math.max(0.3, 1.0 - (zoomLevel - 2) / 2);
        const row = i % 3;

        markers += `
            <div class="era-marker era-row-${row}" title="${era.name}" style="left: ${startPos}%; width: ${width}%; background: ${era.color}30; border-left: 4px solid ${era.color}; opacity: ${opacity};">
                <span class="era-name" style="color: ${era.color};">${era.name}</span>
            </div>
        `;
    });
    return markers;
}

function showEventCard(index, clickEvent) {
    if (clickEvent) clickEvent.stopPropagation();
    _openCard(index);
}

function _openCard(index) {
    const visibleEvents = TIMELINE_EVENTS_V2.filter(e => e.minZoom <= zoomLevel);
    const event = visibleEvents[index];
    if (!event) return;

    selectedEventId = event.year + event.title;

    let backdrop = document.getElementById('eventCardBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'eventCardBackdrop';
        backdrop.className = 'event-card-backdrop';
        backdrop.onclick = closeEventCard;
        document.body.appendChild(backdrop);
    }
    backdrop.style.display = 'block';

    let card = document.getElementById('eventCard');
    if (!card) {
        card = document.createElement('div');
        card.id = 'eventCard';
        card.className = 'event-card';
        document.body.appendChild(card);
    }

    card.innerHTML = `
        <button class="card-close-btn" onclick="closeEventCard()">×</button>
        <div class="card-header">
            <h3>${event.title}</h3>
            <span class="card-year">${formatYear(event.year)}</span>
        </div>
        <div class="card-content">
            <p class="card-description">${event.description}</p>
            ${event.details ? `<p class="card-details">${event.details}</p>` : ''}
        </div>
        <div class="card-actions">
            <button class="btn btn-secondary" onclick="learnMoreAboutEvent('${event.title.replace(/'/g, "\\'")}')">
                💬 Mit KI-Tutor besprechen
            </button>
        </div>
    `;

    card.classList.add('show');

    if (!viewedTimelineEvents.has(event.title)) {
        viewedTimelineEvents.add(event.title);
        if (typeof currentUser !== 'undefined' && currentUser && typeof updateUserProgress === 'function') {
            currentUser.progress.timelineViewed = viewedTimelineEvents.size;
            updateUserProgress({ timelineViewed: viewedTimelineEvents.size });
        }
    }

    document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('active'));
    if (eventElement) eventElement.classList.add('active');
}

function closeEventCard() {
    const card = document.getElementById('eventCard');
    if (card) card.classList.remove('show');
    const backdrop = document.getElementById('eventCardBackdrop');
    if (backdrop) backdrop.style.display = 'none';
    selectedEventId = null;
    document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('active'));
}

function learnMoreAboutEvent(title) {
    closeEventCard();
    if (typeof showSection === 'function') {
        showSection('chat');
        const input = document.getElementById('chatInput');
        if (input) {
            input.value = `Erzähle mir mehr über: ${title}`;
            input.focus();
        }
    }
    if (typeof showToast === 'function') {
        showToast('Frage den KI-Tutor über das Ereignis!', 'info');
    }
}

function changeZoom(delta) {
    const container = document.getElementById('timelineContainer');
    const track = document.getElementById('timelineTrack');
    if (!container || !track) return;

    // Mittelpunkt-Jahr vor dem Zoom merken
    const oldTrackWidth = track.clientWidth;
    const centerPixel = container.scrollLeft + container.clientWidth / 2;
    const centerRatio = oldTrackWidth > 0 ? centerPixel / oldTrackWidth : 0.5;
    const centerYear = TOTAL_MIN_YEAR + centerRatio * TOTAL_RANGE;

    const oldZoom = zoomLevel;
    zoomLevel = Math.max(1.0, Math.min(15.0, zoomLevel + delta));

    if (oldZoom !== zoomLevel) {
        loadTimeline();
        updateZoomDisplay();

        // Scroll so, dass dasselbe Jahr weiterhin in der Mitte bleibt
        const newTrackWidth = BASE_TRACK_WIDTH * zoomLevel;
        const newCenterRatio = (centerYear - TOTAL_MIN_YEAR) / TOTAL_RANGE;
        const newScrollLeft = newCenterRatio * newTrackWidth - container.clientWidth / 2;
        container.scrollLeft = Math.max(0, newScrollLeft);
    }
}

function zoomTimeline(direction) {
    changeZoom(direction === 'in' ? 1.0 : -1.0);
}

function updateZoomDisplay() {
    const display = document.getElementById('zoomLevel');
    if (display) {
        const eventCount = TIMELINE_EVENTS_V2.filter(e => e.minZoom <= zoomLevel).length;
        if (zoomLevel < 1.5) {
            display.textContent = `Übersicht (${eventCount} Events)`;
        } else {
            display.textContent = `Zoom ${zoomLevel.toFixed(1)}x (${eventCount} Events)`;
        }
    }
}

function setupTimelineControls() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    // Drag to scroll
    container.addEventListener('mousedown', (e) => {
        if (e.target.closest('.timeline-event') || e.target.closest('.event-plus-btn')) return;
        isPanning = true;
        startX = e.pageX - container.offsetLeft;
        startScrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = startScrollLeft - walk;
    });

    document.addEventListener('mouseup', () => {
        isPanning = false;
        container.style.cursor = 'grab';
    });

    // Touch
    let touchStartX = 0;
    let touchScrollLeft = 0;

    container.addEventListener('touchstart', (e) => {
        if (e.target.closest('.timeline-event') || e.target.closest('.event-plus-btn')) return;
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const x = e.touches[0].pageX;
        const walk = (touchStartX - x) * 1.5;
        container.scrollLeft = touchScrollLeft + walk;
    });

    container.addEventListener('touchend', () => {
        touchStartX = 0;
    });

    // Wheel: Ctrl = Zoom, sonst = Scroll
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
            const delta = e.deltaY > 0 ? -0.3 : 0.3;
            changeZoom(delta);
        } else {
            container.scrollLeft += e.deltaY * 2;
        }
    }, { passive: false });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        const timelineSection = document.getElementById('timeline');
        if (!timelineSection || !timelineSection.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            container.scrollLeft -= 100;
        } else if (e.key === 'ArrowRight') {
            container.scrollLeft += 100;
        } else if (e.key === '+' || e.key === '=') {
            changeZoom(0.5);
        } else if (e.key === '-' || e.key === '_') {
            changeZoom(-0.5);
        } else if (e.key === 'Escape') {
            closeEventCard();
        }
    });

    document.addEventListener('click', (e) => {
        const card = document.getElementById('eventCard');
        if (card && !card.contains(e.target) && !e.target.closest('.timeline-event')) {
            closeEventCard();
        }
    });

    updateZoomDisplay();
}

// CSS
const styles = document.createElement('style');
styles.textContent = `
    .timeline-container {
        position: relative;
        overflow-x: scroll !important;
        overflow-y: hidden !important;
        background: var(--bg-primary);
        border-radius: 12px;
        padding: 150px 40px 130px 40px;
        cursor: grab;
        user-select: none;
        -webkit-overflow-scrolling: touch;
        height: calc(100vh - 60px);
    }

    .timeline-container:active {
        cursor: grabbing;
    }

    .timeline-container::-webkit-scrollbar {
        height: 18px;
        background: var(--bg-tertiary);
    }

    .timeline-container::-webkit-scrollbar-track {
        background: var(--bg-secondary);
        border-radius: 9px;
        border: 2px solid var(--border-color);
        margin: 0 20px;
    }

    .timeline-container::-webkit-scrollbar-thumb {
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        border-radius: 9px;
        border: 2px solid var(--bg-primary);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    .timeline-container::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(90deg, var(--secondary), var(--primary));
        box-shadow: 0 3px 12px rgba(0,0,0,0.4);
    }

    /* Firefox Scrollbar */
    .timeline-container {
        scrollbar-width: thick;
        scrollbar-color: var(--primary) var(--bg-secondary);
    }

    .timeline-track {
        position: relative;
        min-height: 400px;
        padding: 80px 50px;
        height: 100%;
    }

    .timeline-line {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 50%, var(--primary) 100%);
        transform: translateY(-50%);
        border-radius: 2px;
        z-index: 1;
    }

    .century-marker {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
    }

    .century-line {
        width: 2px;
        height: 80px;
        background: var(--text-secondary);
        opacity: 0.4;
        margin: 0 auto;
    }

    .century-label {
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.2em;
        font-weight: bold;
        color: var(--text-primary);
        white-space: nowrap;
        padding: 6px 12px;
        background: var(--bg-primary);
        border-radius: 8px;
        border: 2px solid var(--primary);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .era-marker {
        position: absolute;
        height: 30px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding-left: 8px;
        z-index: 0;
        overflow: visible;
    }

    .era-marker.era-row-0 { top: -155px; }
    .era-marker.era-row-1 { top: -120px; }
    .era-marker.era-row-2 { top: -85px; }

    .era-name {
        font-size: 0.8em;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        opacity: 0.9;
    }

    .timeline-event {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
    }

    .timeline-event:hover,
    .timeline-event.active {
        z-index: 20;
    }

    /* Verbindungslinie vom Event zum Zeitstrahl */
    .timeline-event::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        background: var(--text-secondary);
        opacity: 0.3;
        pointer-events: none;
    }

    .timeline-event.event-top.level-1::before  { bottom: 0; height: 67px; }
    .timeline-event.event-top.level-2::before  { bottom: 0; height: 112px; }
    .timeline-event.event-top.level-3::before  { bottom: 0; height: 157px; }
    .timeline-event.event-top.level-4::before  { bottom: 0; height: 202px; }
    .timeline-event.event-top.level-5::before  { bottom: 0; height: 247px; }

    .timeline-event.event-bottom.level-1::before  { top: 0; height: 67px; }
    .timeline-event.event-bottom.level-2::before  { top: 0; height: 112px; }
    .timeline-event.event-bottom.level-3::before  { top: 0; height: 157px; }
    .timeline-event.event-bottom.level-4::before  { top: 0; height: 202px; }
    .timeline-event.event-bottom.level-5::before  { top: 0; height: 247px; }

    .timeline-event:hover::before,
    .timeline-event.active::before {
        opacity: 0.6;
        background: var(--primary);
    }

    .timeline-event-dot {
        display: none;
    }

    .timeline-event-label {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        text-align: center;
        padding: 5px 7px;
        background: var(--bg-secondary);
        border-radius: 8px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 3px;
        align-items: center;
        border: 2px solid var(--border-color);
    }

    /* 5 Ebenen oben/unten — level-1 = wichtigste Events */
    .timeline-event.event-top.level-1 .timeline-event-label { bottom: 100%; margin-bottom: 55px; }
    .timeline-event.event-top.level-2 .timeline-event-label { bottom: 100%; margin-bottom: 100px; }
    .timeline-event.event-top.level-3 .timeline-event-label { bottom: 100%; margin-bottom: 145px; }
    .timeline-event.event-top.level-4 .timeline-event-label { bottom: 100%; margin-bottom: 190px; }
    .timeline-event.event-top.level-5 .timeline-event-label { bottom: 100%; margin-bottom: 235px; }

    .timeline-event.event-bottom.level-1 .timeline-event-label { top: 100%; margin-top: 55px; }
    .timeline-event.event-bottom.level-2 .timeline-event-label { top: 100%; margin-top: 100px; }
    .timeline-event.event-bottom.level-3 .timeline-event-label { top: 100%; margin-top: 145px; }
    .timeline-event.event-bottom.level-4 .timeline-event-label { top: 100%; margin-top: 190px; }
    .timeline-event.event-bottom.level-5 .timeline-event-label { top: 100%; margin-top: 235px; }

    .timeline-event:hover .timeline-event-label {
        transform: translateX(-50%) scale(1.05);
        box-shadow: 0 6px 24px rgba(0,0,0,0.2);
        border-color: var(--primary);
    }

    .event-year {
        display: block;
        font-weight: bold;
        color: var(--primary);
        font-size: 0.8em;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.2s ease, opacity 0.2s ease;
    }

    .timeline-event:hover .event-year,
    .timeline-event.active .event-year {
        max-height: 30px;
        opacity: 1;
    }

    .event-title-short {
        display: block;
        font-size: 0.78em;
        color: var(--text-primary);
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 110px;
    }

    .event-title-row {
        display: flex;
        align-items: center;
        gap: 4px;
        width: 100%;
    }

    .event-plus-btn {
        flex-shrink: 0;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        min-width: 12px;
        min-height: 12px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;
        font-size: 0.6em;
        font-weight: bold;
        line-height: 1;
        position: relative;
    }

    .event-plus-btn:hover {
        background: var(--secondary);
        transform: scale(1.15);
    }

    .event-plus-btn.loading {
        background: transparent;
        color: transparent;
    }

    .event-plus-btn.loading::after {
        content: '';
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-top-color: #e06060;
        border-right-color: #d4a03a;
        border-bottom-color: #4db88a;
        border-left-color: #5b96c4;
        animation: spin-loader 0.5s linear infinite;
    }

    @keyframes spin-loader {
        to { transform: rotate(360deg); }
    }

    /* 10-Jahres-Marker */
    .decade-marker {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        pointer-events: none;
    }

    .decade-line {
        width: 1px;
        height: 45px;
        background: var(--text-secondary);
        opacity: 0.4;
        margin: 0 auto;
    }

    .decade-label {
        position: absolute;
        top: -26px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.78em;
        color: var(--text-secondary);
        opacity: 0.7;
        white-space: nowrap;
    }

    .five-marker {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        pointer-events: none;
    }

    .five-line {
        width: 1px;
        height: 22px;
        background: var(--text-secondary);
        opacity: 0.25;
        margin: 0 auto;
    }

    .five-label {
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.6em;
        color: var(--text-secondary);
        opacity: 0.55;
        white-space: nowrap;
    }

    .year-marker {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        pointer-events: none;
    }

    .year-line {
        width: 1px;
        height: 12px;
        background: var(--text-secondary);
        opacity: 0.15;
        margin: 0 auto;
    }

    .event-card {
        position: fixed;
        left: 50% !important;
        top: 50% !important;
        transform: translate(-50%, -50%) scale(0.92) !important;
        background: var(--bg-primary);
        border-radius: 14px;
        box-shadow: 0 12px 48px rgba(0,0,0,0.5);
        padding: 24px;
        width: 90vw;
        max-width: 480px;
        max-height: 80vh;
        overflow-y: auto;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.25s ease, transform 0.25s ease;
        pointer-events: none;
        border: 2px solid var(--primary);
    }

    .event-card.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1) !important;
        pointer-events: all;
    }

    .event-card-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    }

    .card-close-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        background: var(--bg-secondary);
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        font-size: 1.6em;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-primary);
        transition: all 0.2s ease;
        line-height: 1;
    }

    .card-close-btn:hover {
        background: var(--primary);
        color: white;
        transform: rotate(90deg);
    }

    .card-header {
        margin-bottom: 16px;
        padding-right: 35px;
    }

    .card-header h3 {
        margin: 0 0 8px 0;
        color: var(--text-primary);
        font-size: 1.4em;
        line-height: 1.3;
    }

    .card-year {
        display: inline-block;
        background: var(--primary);
        color: white;
        padding: 4px 12px;
        border-radius: 14px;
        font-size: 0.9em;
        font-weight: bold;
    }

    .card-content {
        margin-bottom: 16px;
    }

    .card-description,
    .card-details {
        margin: 12px 0;
        line-height: 1.7;
        color: var(--text-secondary);
        font-size: 0.98em;
    }

    .card-details {
        border-top: 1px solid var(--border-color);
        padding-top: 12px;
        margin-top: 12px;
    }

    .card-actions {
        display: flex;
        gap: 10px;
    }

    .card-actions .btn {
        flex: 1;
        padding: 11px;
        font-size: 0.92em;
    }

    @media (max-width: 768px) {
        .timeline-container {
            padding: 100px 15px;
        }
        .event-card {
            max-width: 90vw;
            left: 5vw !important;
        }
    }
`;
document.head.appendChild(styles);
