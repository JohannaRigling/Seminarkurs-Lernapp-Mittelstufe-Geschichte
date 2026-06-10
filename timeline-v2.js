// ===== INTERAKTIVER ZEITSTRAHL MIT STUFENLOSEM ZOOM =====

let zoomLevel = 1.0; // Stufenloser Zoom von 1.0 (weit) bis 10.0 (nah)
let viewedTimelineEvents = new Set();
let scrollPosition = 0;
let selectedEventId = null;
let isPanning = false;
let startX = 0;
let startScrollLeft = 0;

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    loadTimeline();
    setupTimelineControls();
});

// Zeitstrahl laden
function loadTimeline() {
    const container = document.getElementById('timelineContainer');
    const track = document.getElementById('timelineTrack');
    if (!track || !container) return;

    // Events nach aktuellem Zoom-Level filtern
    const visibleEvents = TIMELINE_EVENTS_V2.filter(e => e.minZoom <= zoomLevel);

    if (visibleEvents.length === 0) {
        track.innerHTML = '<p style="text-align: center; padding: 50px;">Keine Ereignisse in dieser Ansicht.</p>';
        return;
    }

    // Zeitbereich
    const minYear = 800;
    const maxYear = 2025;
    const yearRange = maxYear - minYear;

    // Track-Breite basierend auf Zoom
    // Bei niedrigem Zoom: mindestens 2x Container für vollen Bereich
    // Bei hohem Zoom: exponentiell wachsen
    const baseWidth = container.clientWidth;
    let trackWidth;

    if (zoomLevel <= 2.0) {
        // Bei niedrigem Zoom: Linear, mindestens 2-3x Container
        trackWidth = baseWidth * (1.5 + zoomLevel * 0.75);
    } else {
        // Bei höherem Zoom: Exponentiell
        trackWidth = baseWidth * Math.pow(zoomLevel, 1.5);
    }

    track.style.width = `${trackWidth}px`;

    // Timeline neu rendern
    let html = '<div class="timeline-line"></div>';

    // Jahrhunderte und Epochen
    html += generateCenturyMarkers(minYear, maxYear, yearRange);
    html += generateEraMarkers(minYear, maxYear, yearRange);

    // Events rendern - mit intelligentem Spacing
    visibleEvents.forEach((event, index) => {
        const position = ((event.year - minYear) / yearRange) * 100;
        const isActive = selectedEventId === event.year + event.title;

        // Intelligente Positionierung: abwechselnd oben/unten
        const posClass = index % 2 === 0 ? 'event-top' : 'event-bottom';

        html += `
            <div class="timeline-event ${isActive ? 'active' : ''} ${posClass}"
                 style="left: ${position}%;"
                 data-year="${event.year}"
                 data-index="${index}">
                <div class="timeline-event-dot"></div>
                <div class="timeline-event-label">
                    <span class="event-year">${formatYear(event.year)}</span>
                    <span class="event-title-short">${event.title}</span>
                    <button class="event-plus-btn" onclick="showEventCard(${index}, event)">
                        +
                    </button>
                </div>
            </div>
        `;
    });

    track.innerHTML = html;
}

// Jahr formatieren
function formatYear(year) {
    return year < 0 ? `${Math.abs(year)} v. Chr.` : year.toString();
}

// Jahrhundert-Marker (in 200er Schritten)
function generateCenturyMarkers(minYear, maxYear, yearRange) {
    let markers = '';
    const startCentury = Math.floor(minYear / 200) * 200;

    for (let year = startCentury; year <= maxYear; year += 200) {
        if (year >= minYear) {
            const position = ((year - minYear) / yearRange) * 100;
            markers += `
                <div class="century-marker" style="left: ${position}%;">
                    <div class="century-line"></div>
                    <div class="century-label">${year}</div>
                </div>
            `;
        }
    }
    return markers;
}

// Epochen-Marker (immer sichtbar bei niedrigem Zoom)
function generateEraMarkers(minYear, maxYear, yearRange) {
    // Bei hohem Zoom keine Epochen anzeigen
    if (zoomLevel > 4) return '';

    const eras = [
        { start: 800, end: 1500, name: 'Mittelalter', color: '#8b4513' },
        { start: 1500, end: 1789, name: 'Frühe Neuzeit', color: '#c9a96e' },
        { start: 1789, end: 1815, name: 'Revolution', color: '#e74c3c' },
        { start: 1815, end: 1871, name: 'Einigung', color: '#d4a574' },
        { start: 1871, end: 1914, name: 'Kaiserreich', color: '#4a4a4a' },
        { start: 1914, end: 1918, name: 'WW1', color: '#7d3c3c' },
        { start: 1918, end: 1933, name: 'Weimar', color: '#e8d5b7' },
        { start: 1933, end: 1945, name: 'NS-Zeit', color: '#2c2c2c' },
        { start: 1945, end: 1990, name: 'Kalter Krieg', color: '#5d8aa8' },
        { start: 1990, end: 2025, name: 'Wiedervereinigung', color: '#27ae60' }
    ];

    let markers = '';
    eras.forEach(era => {
        if (era.end < minYear || era.start > maxYear) return;
        const startPos = Math.max(0, ((era.start - minYear) / yearRange) * 100);
        const endPos = Math.min(100, ((era.end - minYear) / yearRange) * 100);
        const width = endPos - startPos;

        // Epochen-Transparenz basierend auf Zoom
        const opacity = zoomLevel <= 2 ? 1.0 : Math.max(0.3, 1.0 - (zoomLevel - 2) / 2);

        markers += `
            <div class="era-marker" style="left: ${startPos}%; width: ${width}%; background: ${era.color}15; border-left: 3px solid ${era.color}; opacity: ${opacity};">
                <span class="era-name" style="color: ${era.color};">${era.name}</span>
            </div>
        `;
    });
    return markers;
}

// Event-Karteikarte anzeigen
function showEventCard(index, clickEvent) {
    if (clickEvent) clickEvent.stopPropagation();

    const visibleEvents = TIMELINE_EVENTS_V2.filter(e => e.minZoom <= zoomLevel);
    const event = visibleEvents[index];
    if (!event) return;

    selectedEventId = event.year + event.title;

    let card = document.getElementById('eventCard');
    if (!card) {
        card = document.createElement('div');
        card.id = 'eventCard';
        card.className = 'event-card';
        document.body.appendChild(card);
    }

    const eventElement = document.querySelector(`.timeline-event[data-index="${index}"]`);
    if (eventElement) {
        const rect = eventElement.getBoundingClientRect();
        card.style.left = `${Math.min(rect.left + window.scrollX, window.innerWidth - 420)}px`;
        card.style.top = `${rect.bottom + window.scrollY + 10}px`;
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
        if (typeof currentUser !== 'undefined' && currentUser) {
            currentUser.progress.timelineViewed = viewedTimelineEvents.size;
            if (typeof updateUserProgress === 'function') {
                updateUserProgress({ timelineViewed: viewedTimelineEvents.size });
            }
        }
    }

    document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('active'));
    if (eventElement) eventElement.classList.add('active');
}

// Karteikarte schließen
function closeEventCard() {
    const card = document.getElementById('eventCard');
    if (card) {
        card.classList.remove('show');
        setTimeout(() => card.remove(), 300);
    }
    selectedEventId = null;
    document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('active'));
}

// Mit KI-Tutor sprechen
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

// Zoom-Funktion (stufenlos)
function changeZoom(delta) {
    const container = document.getElementById('timelineContainer');
    const track = document.getElementById('timelineTrack');

    // Aktuelle Scroll-Position relativ zur Track-Breite merken
    const oldScrollRatio = track.clientWidth > 0 ? container.scrollLeft / track.clientWidth : 0.5;

    // Zoom ändern
    const oldZoom = zoomLevel;
    zoomLevel = Math.max(1.0, Math.min(10.0, zoomLevel + delta));

    if (oldZoom !== zoomLevel) {
        updateZoomDisplay();
        loadTimeline();

        // Nach Render: Scroll-Position proportional anpassen
        setTimeout(() => {
            const newTrack = document.getElementById('timelineTrack');
            container.scrollLeft = oldScrollRatio * newTrack.clientWidth;
        }, 10);
    }
}

// Zoom mit Buttons
function zoomTimeline(direction) {
    changeZoom(direction === 'in' ? 0.5 : -0.5);
}

// Zoom-Display aktualisieren
function updateZoomDisplay() {
    const display = document.getElementById('zoomLevel');
    if (display) {
        const eventCount = TIMELINE_EVENTS_V2.filter(e => e.minZoom <= zoomLevel).length;
        const percent = Math.round((zoomLevel - 1) / 9 * 100);

        if (zoomLevel < 1.5) {
            display.textContent = `Übersicht (${eventCount} Events)`;
        } else {
            display.textContent = `Zoom ${zoomLevel.toFixed(1)}x (${eventCount} Events)`;
        }
    }
}

// Timeline-Controls einrichten
function setupTimelineControls() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    // Scroll-Position speichern
    container.addEventListener('scroll', () => {
        scrollPosition = container.scrollLeft;
    });

    // Mouse Drag
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

    // Touch für Mobile
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

    // Mausrad: Ctrl = Zoom, sonst = Scroll
    container.addEventListener('wheel', (e) => {
        e.preventDefault();

        if (e.ctrlKey || e.metaKey) {
            // Zoom
            const delta = e.deltaY > 0 ? -0.3 : 0.3;
            changeZoom(delta);
        } else {
            // Horizontal scroll
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

    // Klick außerhalb schließt Karte
    document.addEventListener('click', (e) => {
        const card = document.getElementById('eventCard');
        if (card && !card.contains(e.target) && !e.target.closest('.timeline-event')) {
            closeEventCard();
        }
    });

    updateZoomDisplay();
}

// CSS Styles
const styles = document.createElement('style');
styles.textContent = `
    .timeline-container {
        position: relative;
        overflow-x: scroll !important;
        overflow-y: hidden;
        background: var(--bg-primary);
        border-radius: 12px;
        padding: 140px 40px;
        cursor: grab;
        user-select: none;
        -webkit-overflow-scrolling: touch;
    }

    .timeline-container:active {
        cursor: grabbing;
    }

    .timeline-container::-webkit-scrollbar {
        height: 14px;
    }

    .timeline-container::-webkit-scrollbar-track {
        background: var(--bg-secondary);
        border-radius: 7px;
    }

    .timeline-container::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 7px;
    }

    .timeline-track {
        position: relative;
        min-height: 400px;
        padding: 80px 50px;
        transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
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
        top: 10px;
        height: 35px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding-left: 12px;
        z-index: 0;
        transition: opacity 0.3s;
    }

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

    .timeline-event-dot {
        width: 18px;
        height: 18px;
        background: var(--primary);
        border-radius: 50%;
        border: 4px solid var(--bg-primary);
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        margin: 0 auto;
    }

    .timeline-event:hover .timeline-event-dot,
    .timeline-event.active .timeline-event-dot {
        transform: scale(1.5);
        box-shadow: 0 0 25px var(--primary);
    }

    .timeline-event-label {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        text-align: center;
        padding: 10px 14px;
        background: var(--bg-secondary);
        border-radius: 10px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        min-width: 130px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: center;
        border: 2px solid var(--border-color);
    }

    .timeline-event.event-top .timeline-event-label {
        bottom: 100%;
        margin-bottom: 30px;
    }

    .timeline-event.event-bottom .timeline-event-label {
        top: 100%;
        margin-top: 30px;
    }

    .timeline-event:hover .timeline-event-label {
        transform: translateX(-50%) scale(1.05);
        box-shadow: 0 6px 24px rgba(0,0,0,0.2);
        border-color: var(--primary);
    }

    .event-year {
        display: block;
        font-weight: bold;
        color: var(--primary);
        font-size: 0.9em;
    }

    .event-title-short {
        display: block;
        font-size: 0.95em;
        color: var(--text-primary);
        max-width: 180px;
        font-weight: 500;
    }

    .event-plus-btn {
        margin-top: 6px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 1.3em;
        font-weight: bold;
        line-height: 1;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }

    .event-plus-btn:hover {
        background: var(--secondary);
        transform: scale(1.2) rotate(90deg);
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
    }

    .event-card {
        position: fixed;
        background: var(--bg-primary);
        border-radius: 14px;
        box-shadow: 0 12px 48px rgba(0,0,0,0.35);
        padding: 24px;
        max-width: 420px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-15px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        border: 2px solid var(--primary);
    }

    .event-card.show {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
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
