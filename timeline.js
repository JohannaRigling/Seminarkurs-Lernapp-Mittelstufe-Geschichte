// ===== INTERAKTIVER ZEITSTRAHL =====

let currentZoom = 100;
let currentEra = 'all';
let viewedTimelineEvents = new Set();
let currentTimelineYear = 1800; // Standard-Jahr für Hintergrund

// Zeitstrahl laden
function loadTimeline() {
    const track = document.getElementById('timelineTrack');
    if (!track) return;

    // Events filtern
    let events = TIMELINE_EVENTS;
    if (currentEra !== 'all') {
        events = events.filter(e => e.era === currentEra);
    }

    if (events.length === 0) {
        track.innerHTML = '<p style="text-align: center; padding: 50px;">Keine Ereignisse in dieser Epoche.</p>';
        return;
    }

    // Min/Max Jahre berechnen
    const minYear = Math.min(...events.map(e => e.year));
    const maxYear = Math.max(...events.map(e => e.year));
    const yearRange = maxYear - minYear || 1;

    // Track-Breite basierend auf Zoom
    const trackWidth = Math.max(1000, events.length * 150) * (currentZoom / 100);
    track.style.width = `${trackWidth}px`;

    // Events rendern
    let html = '<div class="timeline-line"></div>';

    events.forEach((event, index) => {
        const position = ((event.year - minYear) / yearRange) * 90 + 5; // 5-95% Position

        html += `
            <div class="timeline-event"
                 style="left: ${position}%;"
                 onclick="showTimelineEvent(${index})"
                 data-year="${event.year}"
                 data-era="${event.era}">
                <div class="timeline-event-dot"></div>
                <div class="timeline-event-label">
                    <span class="event-year">${formatYear(event.year)}</span>
                    <span class="event-title">${event.title}</span>
                </div>
            </div>
        `;
    });

    // Epochen-Marker hinzufügen
    html += generateEraMarkers(minYear, maxYear);

    track.innerHTML = html;

    // Scroll zu Mitte
    const container = document.getElementById('timelineContainer');
    if (container) {
        container.scrollLeft = (track.scrollWidth - container.clientWidth) / 2;
    }
}

// Jahr formatieren
function formatYear(year) {
    if (year < 0) {
        return `${Math.abs(year)} v. Chr.`;
    }
    return year.toString();
}

// Epochen-Marker generieren
function generateEraMarkers(minYear, maxYear) {
    const eras = [
        { start: -800, end: 500, name: 'Antike', color: '#e8d5b7' },
        { start: 500, end: 1500, name: 'Mittelalter', color: '#8b4513' },
        { start: 1500, end: 1800, name: 'Frühe Neuzeit', color: '#daa520' },
        { start: 1800, end: 1900, name: '19. Jahrhundert', color: '#4a4a4a' },
        { start: 1900, end: 2000, name: '20. Jahrhundert', color: '#2c3e50' }
    ];

    let markers = '';
    const yearRange = maxYear - minYear || 1;

    eras.forEach(era => {
        if (era.end < minYear || era.start > maxYear) return;

        const startPos = Math.max(0, ((era.start - minYear) / yearRange) * 100);
        const endPos = Math.min(100, ((era.end - minYear) / yearRange) * 100);
        const width = endPos - startPos;

        markers += `
            <div class="era-marker" style="left: ${startPos}%; width: ${width}%; background: ${era.color}20; border-left: 2px solid ${era.color};">
                <span class="era-name">${era.name}</span>
            </div>
        `;
    });

    return markers;
}

// Zeitstrahl-Event anzeigen
function showTimelineEvent(index) {
    const events = currentEra === 'all' ? TIMELINE_EVENTS : TIMELINE_EVENTS.filter(e => e.era === currentEra);
    const event = events[index];
    if (!event) return;

    // Update current year for background
    currentTimelineYear = event.year;
    updateTimelineBackground(event.year, event.era);

    // Detail-Panel aktualisieren
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDate').textContent = formatYear(event.year);
    document.getElementById('eventDescription').textContent = event.description;

    // Event-Dot hervorheben
    document.querySelectorAll('.timeline-event').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.timeline-event')[index]?.classList.add('active');

    // Als angesehen markieren
    if (!viewedTimelineEvents.has(event.title)) {
        viewedTimelineEvents.add(event.title);

        if (currentUser) {
            currentUser.progress.timelineViewed = viewedTimelineEvents.size;
            updateUserProgress({ timelineViewed: viewedTimelineEvents.size });
        }
    }
}

// Hintergrund basierend auf Epoche aktualisieren
function updateTimelineBackground(year, era) {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    // Verschiedene Hintergründe je nach Epoche
    let backgroundStyle = '';
    let overlayColor = '';

    if (year < 500) {
        // Antike - Römische Säulen
        backgroundStyle = `
            linear-gradient(rgba(232, 213, 183, 0.9), rgba(232, 213, 183, 0.7)),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23d4c4a8" width="100" height="100"/><path d="M10 100V30h5V100h5V30h5V100" fill="%23c9b896"/></svg>')
        `;
        overlayColor = 'rgba(139, 90, 43, 0.1)';
    } else if (year < 1500) {
        // Mittelalter - Burgmauern
        backgroundStyle = `
            linear-gradient(rgba(139, 69, 19, 0.2), rgba(101, 67, 33, 0.3)),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%238b7355" width="100" height="100"/><rect fill="%23755c3c" x="0" y="80" width="20" height="20"/><rect fill="%23755c3c" x="40" y="80" width="20" height="20"/><rect fill="%23755c3c" x="80" y="80" width="20" height="20"/></svg>')
        `;
        overlayColor = 'rgba(139, 69, 19, 0.15)';
    } else if (year < 1800) {
        // Frühe Neuzeit - Elegante Muster
        backgroundStyle = `
            linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(184, 134, 11, 0.15))
        `;
        overlayColor = 'rgba(218, 165, 32, 0.1)';
    } else if (year < 1900) {
        // 19. Jahrhundert - Industriell
        backgroundStyle = `
            linear-gradient(rgba(74, 74, 74, 0.1), rgba(64, 64, 64, 0.15))
        `;
        overlayColor = 'rgba(74, 74, 74, 0.1)';
    } else {
        // 20. Jahrhundert - Modern
        backgroundStyle = `
            linear-gradient(135deg, rgba(44, 62, 80, 0.1), rgba(52, 73, 94, 0.15))
        `;
        overlayColor = 'rgba(44, 62, 80, 0.1)';
    }

    container.style.background = backgroundStyle;

    // Dispatch custom event for theme system
    window.dispatchEvent(new CustomEvent('timelineEraChange', {
        detail: { year, era }
    }));
}

// Zoom-Funktionen
function zoomTimeline(direction) {
    if (direction === 'in') {
        currentZoom = Math.min(200, currentZoom + 20);
    } else {
        currentZoom = Math.max(50, currentZoom - 20);
    }

    document.getElementById('zoomLevel').textContent = `${currentZoom}%`;
    loadTimeline();
}

// Filter nach Epoche
function filterTimeline() {
    currentEra = document.getElementById('timelineEra').value;
    loadTimeline();

    // Hintergrund aktualisieren
    const eraYears = {
        'all': 1800,
        'antike': -200,
        'mittelalter': 1000,
        'fruehe-neuzeit': 1650,
        '19jh': 1850,
        '20jh': 1950
    };

    updateTimelineBackground(eraYears[currentEra] || 1800, currentEra);
}

// Mehr über Event erfahren
function learnMoreEvent() {
    const title = document.getElementById('eventTitle').textContent;
    if (!title || title === 'Wähle ein Ereignis') {
        showToast('Wähle zuerst ein Ereignis aus dem Zeitstrahl.', 'warning');
        return;
    }

    // Zum Chat wechseln mit Frage
    showSection('chat');

    const input = document.getElementById('chatInput');
    input.value = `Erzähle mir mehr über: ${title}`;
    input.focus();

    showToast('Frage den KI-Tutor über das Ereignis!', 'info');
}

// Zeitstrahl-Navigation mit Maus-Drag
function setupTimelineDrag() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        if (e.target.closest('.timeline-event')) return;
        isDown = true;
        container.classList.add('dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    // Touch-Events für Mobile
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
}

// CSS für Zeitstrahl
const timelineStyles = document.createElement('style');
timelineStyles.textContent = `
    .timeline-container {
        cursor: grab;
        user-select: none;
        transition: background 0.5s ease;
    }
    .timeline-container.dragging {
        cursor: grabbing;
    }
    .timeline-track {
        position: relative;
        min-height: 200px;
        padding: 80px 50px;
    }
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
    .timeline-event:hover .timeline-event-dot,
    .timeline-event.active .timeline-event-dot {
        transform: scale(1.5);
        box-shadow: 0 0 20px var(--primary);
    }
    .timeline-event-dot {
        width: 20px;
        height: 20px;
        background: var(--primary);
        border-radius: 50%;
        border: 4px solid var(--bg-secondary);
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
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
    }
    .timeline-event:nth-child(odd) .timeline-event-label {
        bottom: 100%;
        margin-bottom: 15px;
    }
    .timeline-event:nth-child(even) .timeline-event-label {
        top: 100%;
        margin-top: 15px;
    }
    .timeline-event:hover .timeline-event-label {
        transform: translateX(-50%) scale(1.05);
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    }
    .event-year {
        display: block;
        font-weight: bold;
        color: var(--primary);
        font-size: 0.9em;
    }
    .event-title {
        display: block;
        font-size: 0.85em;
        color: var(--text-primary);
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .era-marker {
        position: absolute;
        top: 10px;
        height: 30px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding-left: 10px;
    }
    .era-name {
        font-size: 0.75em;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.8;
    }
    .timeline-detail-panel {
        animation: slideUp 0.3s ease;
    }
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(timelineStyles);

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    loadTimeline();
    setupTimelineDrag();
});
