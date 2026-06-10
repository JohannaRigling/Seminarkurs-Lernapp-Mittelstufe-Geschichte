// ===== NEUER INTERAKTIVER ZEITSTRAHL MIT MEHRSTUFIGEM ZOOM =====

let currentZoom = 1; // 1 = weit, 2 = mittel, 3 = nah
let viewedTimelineEvents = new Set();
let currentCentury = 19; // Aktuell fokussiertes Jahrhundert
let scrollPosition = 0;
let selectedEventId = null;

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

    // Events nach Zoom-Level filtern
    const visibleEvents = TIMELINE_EVENTS_NEW.filter(e => e.zoomLevel <= currentZoom);

    if (visibleEvents.length === 0) {
        track.innerHTML = '<p style="text-align: center; padding: 50px;">Keine Ereignisse in dieser Ansicht.</p>';
        return;
    }

    // Zeitbereich berechnen
    const minYear = 800; // Ab Mittelalter
    const maxYear = 2025;
    const yearRange = maxYear - minYear;

    // Track-Breite basierend auf Zoom
    // Je näher gezoomt, desto breiter wird der Track
    const baseWidth = container.clientWidth;
    let trackWidth;

    if (currentZoom === 1) {
        trackWidth = baseWidth * 2; // Bei weitestem Zoom: 2x Container-Breite
    } else if (currentZoom === 2) {
        trackWidth = baseWidth * 5; // Bei mittlerem Zoom: 5x Container-Breite
    } else {
        trackWidth = baseWidth * 10; // Bei nähestem Zoom: 10x Container-Breite
    }

    track.style.width = `${trackWidth}px`;
    track.style.transition = 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    // Timeline neu rendern
    let html = '<div class="timeline-line"></div>';

    // Jahrhunderte und Epochen anzeigen
    html += generateCenturyMarkers(minYear, maxYear, yearRange, trackWidth);
    html += generateEraMarkers(minYear, maxYear, yearRange, trackWidth);

    // Events rendern - mit Abwechslung oben/unten für bessere Lesbarkeit
    visibleEvents.forEach((event, index) => {
        const position = ((event.year - minYear) / yearRange) * 100;
        const isActive = selectedEventId === event.year + event.title;

        // Prüfe ob Events zu nah beieinander sind
        const prevEvent = index > 0 ? visibleEvents[index - 1] : null;
        const yearDiff = prevEvent ? event.year - prevEvent.year : 100;

        // Abwechselnd oben/unten, aber intelligenter basierend auf Nähe
        let positionClass = '';
        if (yearDiff < 10) {
            // Sehr nah beieinander - abwechselnd
            positionClass = index % 2 === 0 ? 'event-top' : 'event-bottom';
        } else if (yearDiff < 30) {
            // Mittelnahe - gruppieren
            positionClass = Math.floor(index / 2) % 2 === 0 ? 'event-top' : 'event-bottom';
        } else {
            // Weit auseinander - nach Index
            positionClass = index % 2 === 0 ? 'event-top' : 'event-bottom';
        }

        html += `
            <div class="timeline-event ${isActive ? 'active' : ''} ${positionClass}"
                 style="left: ${position}%;"
                 data-year="${event.year}"
                 data-index="${index}">
                <div class="timeline-event-dot"></div>
                <div class="timeline-event-label">
                    <span class="event-year">${formatYear(event.year)}</span>
                    <span class="event-title-short">${event.title}</span>
                    <button class="event-expand-btn" onclick="showEventCard(${index}, event)" title="Mehr Informationen">
                        <span class="plus-icon">+</span>
                    </button>
                </div>
            </div>
        `;
    });

    track.innerHTML = html;

    // Smooth scroll animation
    requestAnimationFrame(() => {
        container.scrollLeft = scrollPosition;
    });
}

// Jahrhundert-Marker generieren
function generateCenturyMarkers(minYear, maxYear, yearRange, trackWidth) {
    let markers = '';

    // Jahrhunderte dynamisch berechnen
    const startCentury = Math.floor(minYear / 100) * 100;
    const centuries = [];

    for (let year = startCentury; year <= maxYear; year += 100) {
        if (year >= minYear) {
            centuries.push(year);
        }
    }

    centuries.forEach(century => {
        const position = ((century - minYear) / yearRange) * 100;
        markers += `
            <div class="century-marker" style="left: ${position}%;">
                <div class="century-line"></div>
                <div class="century-label">${century}</div>
            </div>
        `;
    });

    return markers;
}

// Epochen-Marker generieren
function generateEraMarkers(minYear, maxYear, yearRange, trackWidth) {
    const eras = [
        { start: 800, end: 1500, name: 'Mittelalter', color: '#8b4513' },
        { start: 1500, end: 1789, name: 'Frühe Neuzeit', color: '#c9a96e' },
        { start: 1789, end: 1815, name: 'Revolution', color: '#e74c3c' },
        { start: 1815, end: 1848, name: 'Restauration', color: '#8b7355' },
        { start: 1848, end: 1871, name: 'Einigung', color: '#d4a574' },
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

        // Nur bei Zoom 1 Epochen-Hintergrund anzeigen
        if (currentZoom === 1) {
            markers += `
                <div class="era-marker"
                     style="left: ${startPos}%; width: ${width}%; background: ${era.color}15; border-left: 3px solid ${era.color};">
                    <span class="era-name" style="color: ${era.color};">${era.name}</span>
                </div>
            `;
        }
    });

    return markers;
}

// Jahr formatieren
function formatYear(year) {
    if (year < 0) {
        return `${Math.abs(year)} v. Chr.`;
    }
    return year.toString();
}

// Event-Karteikarte anzeigen
function showEventCard(index, clickEvent) {
    // Verhindere dass das Event selbst auch geklickt wird
    if (clickEvent) {
        clickEvent.stopPropagation();
    }

    const visibleEvents = TIMELINE_EVENTS_NEW.filter(e => e.zoomLevel <= currentZoom);
    const event = visibleEvents[index];
    if (!event) return;

    selectedEventId = event.year + event.title;

    // Karteikarte erstellen oder updaten
    let card = document.getElementById('eventCard');
    if (!card) {
        card = document.createElement('div');
        card.id = 'eventCard';
        card.className = 'event-card';
        document.body.appendChild(card);
    }

    // Position der Karteikarte berechnen
    const eventElement = document.querySelector(`.timeline-event[data-index="${index}"]`);
    if (eventElement) {
        const rect = eventElement.getBoundingClientRect();
        const container = document.getElementById('timelineContainer');
        const containerRect = container.getBoundingClientRect();

        // Karteikarte unterhalb des Events positionieren
        card.style.left = `${rect.left + window.scrollX}px`;
        card.style.top = `${rect.bottom + window.scrollY + 10}px`;

        // Wenn zu weit rechts, nach links ausrichten
        if (rect.left > window.innerWidth - 400) {
            card.style.left = `${rect.right + window.scrollX - 350}px`;
        }
    }

    card.innerHTML = `
        <button class="card-close-btn" onclick="closeEventCard()">×</button>
        <div class="card-header">
            <h3>${event.title}</h3>
            <span class="card-year">${formatYear(event.year)}</span>
        </div>
        <div class="card-content">
            <p class="card-description"><strong>Kurz:</strong> ${event.description}</p>
            ${event.details ? `<p class="card-details"><strong>Details:</strong> ${event.details}</p>` : ''}
        </div>
        <div class="card-actions">
            <button class="btn btn-secondary" onclick="learnMoreAboutEvent('${event.title}')">
                💬 Mit KI-Tutor besprechen
            </button>
        </div>
    `;

    card.classList.add('show');

    // Event als angesehen markieren
    if (!viewedTimelineEvents.has(event.title)) {
        viewedTimelineEvents.add(event.title);
        if (currentUser) {
            currentUser.progress.timelineViewed = viewedTimelineEvents.size;
            updateUserProgress({ timelineViewed: viewedTimelineEvents.size });
        }
    }

    // Event-Dot hervorheben
    document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('active'));
    if (eventElement) {
        eventElement.classList.add('active');
    }
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

// Mit KI-Tutor über Event sprechen
function learnMoreAboutEvent(title) {
    closeEventCard();
    showSection('chat');

    const input = document.getElementById('chatInput');
    input.value = `Erzähle mir mehr über: ${title}`;
    input.focus();

    showToast('Frage den KI-Tutor über das Ereignis!', 'info');
}

// Zoom-Steuerung
function zoomTimeline(direction) {
    const container = document.getElementById('timelineContainer');
    const oldZoom = currentZoom;

    // Aktuelle Scroll-Position relativ zur Track-Breite merken
    const track = document.getElementById('timelineTrack');
    const scrollRatio = container.scrollLeft / track.clientWidth;

    if (direction === 'in') {
        currentZoom = Math.min(3, currentZoom + 1);
    } else {
        currentZoom = Math.max(1, currentZoom - 1);
    }

    // Wenn Zoom sich geändert hat
    if (oldZoom !== currentZoom) {
        // Zoom-Level-Anzeige aktualisieren
        updateZoomDisplay();

        // Timeline neu laden
        loadTimeline();

        // Nach dem Rendern: Scroll-Position anpassen
        setTimeout(() => {
            const newTrack = document.getElementById('timelineTrack');
            container.scrollLeft = scrollRatio * newTrack.clientWidth;
            scrollPosition = container.scrollLeft;
        }, 50);

        // Feedback
        let zoomText = '';
        if (currentZoom === 1) zoomText = 'Übersicht: Epochen & Schlüsselereignisse';
        else if (currentZoom === 2) zoomText = 'Wichtige Ereignisse';
        else zoomText = 'Detailansicht: Alle Ereignisse';

        showToast(zoomText, 'info');
    }
}

// Zoom-Display aktualisieren
function updateZoomDisplay() {
    const display = document.getElementById('zoomLevel');
    if (display) {
        let text = '';
        if (currentZoom === 1) text = '🔍 Übersicht';
        else if (currentZoom === 2) text = '🔍🔍 Wichtig';
        else text = '🔍🔍🔍 Detail';
        display.textContent = text;
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

    // Mouse drag zum Scrollen
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        // Nur wenn nicht auf Event oder Button geklickt
        if (e.target.closest('.timeline-event') || e.target.closest('.event-expand-btn')) {
            return;
        }

        isDown = true;
        container.classList.add('dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('dragging');
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('dragging');
        container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-Geschwindigkeit
        container.scrollLeft = scrollLeft - walk;
    });

    // Touch-Events für Mobile
    let touchStartX;
    let touchScrollLeft;

    container.addEventListener('touchstart', (e) => {
        if (e.target.closest('.timeline-event') || e.target.closest('.event-expand-btn')) {
            return;
        }
        touchStartX = e.touches[0].pageX - container.offsetLeft;
        touchScrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - touchStartX) * 2;
        container.scrollLeft = touchScrollLeft - walk;
    });

    container.addEventListener('touchend', () => {
        touchStartX = null;
    });

    // Mausrad für horizontales Scrollen UND Touchpad-Zoom
    container.addEventListener('wheel', (e) => {
        // Wenn Ctrl gedrückt ist: Zoomen (Touchpad Pinch-to-Zoom)
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();

            // Delta < 0 = zoom in, Delta > 0 = zoom out
            if (e.deltaY < 0) {
                zoomTimeline('in');
            } else {
                zoomTimeline('out');
            }
        }
        // Sonst: Horizontal scrollen
        else if (e.deltaY !== 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Keyboard-Steuerung
    document.addEventListener('keydown', (e) => {
        // Nur wenn Timeline-Section aktiv ist
        const timelineSection = document.getElementById('timeline');
        if (!timelineSection || !timelineSection.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            container.scrollLeft -= 100;
        } else if (e.key === 'ArrowRight') {
            container.scrollLeft += 100;
        } else if (e.key === '+' || e.key === '=') {
            zoomTimeline('in');
        } else if (e.key === '-' || e.key === '_') {
            zoomTimeline('out');
        } else if (e.key === 'Escape') {
            closeEventCard();
        }
    });

    // Klick außerhalb der Karte schließt sie
    document.addEventListener('click', (e) => {
        const card = document.getElementById('eventCard');
        if (card && !card.contains(e.target) && !e.target.closest('.timeline-event')) {
            closeEventCard();
        }
    });

    // Initial Zoom-Display setzen
    updateZoomDisplay();
}

// CSS für neues Timeline-System
const timelineStyles = document.createElement('style');
timelineStyles.textContent = `
    /* Timeline Container */
    .timeline-container {
        position: relative;
        overflow-x: auto !important;
        overflow-y: hidden;
        background: var(--bg-primary);
        border-radius: 12px;
        padding: 120px 20px 120px;
        cursor: grab;
        user-select: none;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
    }

    .timeline-container.dragging {
        cursor: grabbing;
        scroll-behavior: auto;
    }

    .timeline-container::-webkit-scrollbar {
        height: 12px;
    }

    .timeline-container::-webkit-scrollbar-track {
        background: var(--bg-secondary);
        border-radius: 6px;
    }

    .timeline-container::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 6px;
    }

    /* Timeline Track */
    .timeline-track {
        position: relative;
        min-height: 400px;
        padding: 80px 50px;
        min-width: 100%;
    }

    /* Timeline Line */
    .timeline-line {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg,
            var(--primary) 0%,
            var(--secondary) 50%,
            var(--primary) 100%
        );
        transform: translateY(-50%);
        border-radius: 2px;
        z-index: 1;
    }

    /* Jahrhundert-Marker */
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
        opacity: 0.3;
        margin: 0 auto;
    }

    .century-label {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.2em;
        font-weight: bold;
        color: var(--text-primary);
        white-space: nowrap;
        padding: 5px 10px;
        background: var(--bg-primary);
        border-radius: 6px;
        border: 2px solid var(--primary);
    }

    /* Epochen-Marker */
    .era-marker {
        position: absolute;
        top: 10px;
        height: 30px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        z-index: 0;
        transition: all 0.6s ease;
    }

    .era-name {
        font-size: 0.75em;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.8;
    }

    /* Timeline Events */
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
        width: 16px;
        height: 16px;
        background: var(--primary);
        border-radius: 50%;
        border: 3px solid var(--bg-primary);
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        margin: 0 auto;
    }

    .timeline-event:hover .timeline-event-dot,
    .timeline-event.active .timeline-event-dot {
        transform: scale(1.4);
        box-shadow: 0 0 20px var(--primary);
    }

    .timeline-event-label {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        text-align: center;
        padding: 8px 12px;
        background: var(--bg-secondary);
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        min-width: 120px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
    }

    /* Events abwechselnd oben und unten positionieren */
    .timeline-event.event-top .timeline-event-label {
        bottom: 100%;
        margin-bottom: 25px;
    }

    .timeline-event.event-bottom .timeline-event-label {
        top: 100%;
        margin-top: 25px;
    }

    .timeline-event:hover .timeline-event-label {
        transform: translateX(-50%) scale(1.05);
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    }

    .event-year {
        display: block;
        font-weight: bold;
        color: var(--primary);
        font-size: 0.85em;
    }

    .event-title-short {
        display: block;
        font-size: 0.9em;
        color: var(--text-primary);
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .event-expand-btn {
        margin-top: 4px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 1.1em;
        font-weight: bold;
    }

    .event-expand-btn:hover {
        background: var(--secondary);
        transform: scale(1.15);
    }

    .plus-icon {
        line-height: 1;
    }

    /* Event-Karteikarte */
    .event-card {
        position: fixed;
        background: var(--bg-primary);
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        padding: 20px;
        max-width: 400px;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
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
        top: 10px;
        right: 10px;
        background: var(--bg-secondary);
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        font-size: 1.5em;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-primary);
        transition: all 0.2s ease;
    }

    .card-close-btn:hover {
        background: var(--primary);
        color: white;
        transform: rotate(90deg);
    }

    .card-header {
        margin-bottom: 15px;
        padding-right: 30px;
    }

    .card-header h3 {
        margin: 0 0 5px 0;
        color: var(--text-primary);
        font-size: 1.3em;
    }

    .card-year {
        display: inline-block;
        background: var(--primary);
        color: white;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 0.9em;
        font-weight: bold;
    }

    .card-content {
        margin-bottom: 15px;
    }

    .card-description,
    .card-details {
        margin: 10px 0;
        line-height: 1.6;
        color: var(--text-secondary);
        font-size: 0.95em;
    }

    .card-details {
        border-top: 1px solid var(--bg-secondary);
        padding-top: 10px;
        margin-top: 10px;
    }

    .card-actions {
        display: flex;
        gap: 10px;
    }

    .card-actions .btn {
        flex: 1;
        padding: 10px;
        font-size: 0.9em;
    }

    /* Zoom-Controls */
    .timeline-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 15px;
        background: var(--bg-secondary);
        border-radius: 8px;
    }

    .timeline-zoom {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .timeline-zoom button {
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        font-size: 1.2em;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .timeline-zoom button:hover {
        background: var(--secondary);
        transform: scale(1.1);
    }

    .timeline-zoom button:active {
        transform: scale(0.95);
    }

    #zoomLevel {
        font-weight: bold;
        min-width: 120px;
        text-align: center;
        padding: 8px 15px;
        background: var(--bg-primary);
        border-radius: 6px;
        color: var(--text-primary);
    }

    /* Animationen */
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Responsive */
    @media (max-width: 768px) {
        .timeline-container {
            padding: 60px 10px 30px;
        }

        .timeline-track {
            padding: 40px 30px;
        }

        .event-card {
            max-width: 90vw;
            left: 5vw !important;
        }

        .timeline-event-label {
            min-width: 100px;
            font-size: 0.85em;
        }

        .century-label {
            font-size: 1em;
        }
    }
`;
document.head.appendChild(timelineStyles);
