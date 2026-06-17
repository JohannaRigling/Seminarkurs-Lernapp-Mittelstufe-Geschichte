// ===== TIMELINE V3 - ROBUST MIT FIXEM SCROLL =====

const TOTAL_MIN_YEAR = 800;
const TOTAL_MAX_YEAR = 2025;
const TOTAL_RANGE = TOTAL_MAX_YEAR - TOTAL_MIN_YEAR;
const BASE_TRACK_WIDTH = 7000; // px bei Zoom 1.0

const TIMELINE_ERAS = [
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

function getEraForYear(year) {
    return TIMELINE_ERAS.find(era => year >= era.start && year < era.end) || null;
}

let zoomLevel = 1.8;
let viewedTimelineEvents = new Set();
let selectedEventId = null;
let isPanning = false;
let startX = 0;
let startScrollLeft = 0;
let currentGrade = 'all';
let selectedEraName = null;
let searchQuery = '';
let lastScrolledSearchQuery = '';

document.addEventListener('DOMContentLoaded', function() {
    loadTimeline();
    setupTimelineControls();
});

function getVisibleEvents() {
    let events;
    const hasSearch = typeof searchQuery !== 'undefined' && searchQuery.length >= 2;
    if (hasSearch) {
        const keywords = getSearchKeywords(searchQuery);
        events = TIMELINE_EVENTS.filter(e => {
            const gradeMatch = currentGrade === 'all' || e.grade === parseInt(currentGrade);
            const matchesQuery = eventMatchesQuery(e, keywords);
            const matchesZoom = e.minZoom <= zoomLevel;
            return gradeMatch && (matchesQuery || matchesZoom);
        });
    } else {
        events = TIMELINE_EVENTS.filter(e => e.minZoom <= zoomLevel);
        if (currentGrade !== 'all') {
            events = events.filter(e => e.grade === parseInt(currentGrade));
        }
    }
    return events.sort((a, b) => a.year - b.year);
}

function loadTimeline() {
    const container = document.getElementById('timelineContainer');
    const track = document.getElementById('timelineTrack');
    if (!track || !container) return;

    // Force clamp zoomLevel to a valid range of [1.8, 15.0] to prevent zoom 0/NaN or empty views
    if (typeof zoomLevel !== 'number' || isNaN(zoomLevel) || zoomLevel < 1.8) {
        zoomLevel = 1.8;
    } else if (zoomLevel > 15.0) {
        zoomLevel = 15.0;
    }

    // Track wächst proportional zum Zoom → Events rücken auseinander
    const trackPixels = BASE_TRACK_WIDTH * zoomLevel;
    track.style.width = `${trackPixels}px`;

    // Sync era track width
    const eraTrack = document.getElementById('timelineErasTrack');
    if (eraTrack) {
        eraTrack.style.width = `${trackPixels}px`;
    }

    // 1. Get visible candidate events based on zoom and filter
    const candidateEvents = getVisibleEvents();

    // 2. Sort by importance (minZoom ascending) so that key events get priority placement
    // If search is active, we prioritize search matches
    const hasSearch = typeof searchQuery !== 'undefined' && searchQuery.length >= 2;
    const keywords = hasSearch ? getSearchKeywords(searchQuery) : [];

    candidateEvents.sort((a, b) => {
        if (hasSearch) {
            const aMatch = eventMatchesQuery(a, keywords);
            const bMatch = eventMatchesQuery(b, keywords);
            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;
        }
        return a.minZoom - b.minZoom;
    });

    const placedTop = [];
    const placedBottom = [];
    const cardWidth = 145; // minimum safe horizontal distance between card centers (px) - reduced for smaller cards
    const maxLevel = 4;    // maximum vertical level allowed on either side

    const finalizedEvents = [];

    candidateEvents.forEach((event) => {
        const position = ((event.year - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
        const x = (position / 100) * trackPixels;

        // Find lowest collision-free level on top side
        let levelTop = 1;
        while (true) {
            let collision = false;
            for (const placed of placedTop) {
                if (placed.level === levelTop && Math.abs(placed.x - x) < cardWidth) {
                    collision = true;
                    break;
                }
            }
            if (!collision) break;
            levelTop++;
        }

        // Find lowest collision-free level on bottom side
        let levelBottom = 1;
        while (true) {
            let collision = false;
            for (const placed of placedBottom) {
                if (placed.level === levelBottom && Math.abs(placed.x - x) < cardWidth) {
                    collision = true;
                    break;
                }
            }
            if (!collision) break;
            levelBottom++;
        }

        // Decide side and level
        let side, level;
        if (levelTop < levelBottom) {
            side = 'top';
            level = levelTop;
        } else if (levelBottom < levelTop) {
            side = 'bottom';
            level = levelBottom;
        } else {
            // Equal levels, use alternating pattern based on year/title hash to stay stable
            const stableHash = event.year + event.title.charCodeAt(0);
            side = stableHash % 2 === 0 ? 'top' : 'bottom';
            level = side === 'top' ? levelTop : levelBottom;
        }

        // If it exceeds the maximum vertical level, hide it to prevent clutter/clipping
        // EXCEPT if search is active and it is a match — we always show search matches!
        const isMatch = hasSearch && eventMatchesQuery(event, keywords);
        if (level > maxLevel && (!hasSearch || !isMatch)) {
            // Drop this event at the current zoom level to prevent crowding
            return;
        }

        // Record placement
        const placement = { x, level, side, event };
        if (side === 'top') {
            placedTop.push(placement);
        } else {
            placedBottom.push(placement);
        }
        finalizedEvents.push(placement);
    });

    // 3. Sort finalized events chronologically by year for correct rendering indices
    finalizedEvents.sort((a, b) => a.event.year - b.event.year);

    let html = '<div class="timeline-line"></div>';
    html += generateCenturyMarkers();

    finalizedEvents.forEach((placement) => {
        const { level, side, event } = placement;
        const position = ((event.year - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
        const isActive = selectedEventId === event.year + event.title;
        const globalIndex = TIMELINE_EVENTS.indexOf(event);

        const posClass = side === 'top' ? 'event-top' : 'event-bottom';

        // Use 40px vertical step size to eliminate vertical overlaps for smaller cards, with a 28px base offset
        const labelOffset = (level - 1) * 40 + 28;
        const lineHeight = (level - 1) * 40 + 40;

        const era = getEraForYear(event.year);
        const isEraSelected = era && selectedEraName === era.name;

        const isMatch = hasSearch && eventMatchesQuery(event, keywords);

        let opacityStyle = '';
        if (hasSearch) {
            opacityStyle = isMatch ? 'opacity: 1.0; z-index: 30;' : 'opacity: 0.25; pointer-events: none;';
        }

        let eventStyle = `left: ${position}%; --line-height: ${lineHeight}px; --label-offset: ${labelOffset}px;`;
        let labelStyle = '';
        let yearStyle = '';

        if (hasSearch && isMatch) {
            labelStyle = `background: var(--bg-secondary); border-color: #f59e0b; box-shadow: 0 0 10px #f59e0b; --hover-border: #f59e0b;`;
            yearStyle = `color: #d97706;`;
            eventStyle += ` --hover-border: #f59e0b;`;
        } else if (isEraSelected) {
            labelStyle = `background: ${era.color}15; border-color: ${era.color}70;`;
            yearStyle = `color: ${era.color};`;
            eventStyle += ` --hover-border: ${era.color};`;
        }

        const matchClass = (hasSearch && isMatch) ? 'search-match' : '';
        const eraSelectClass = isEraSelected ? 'era-selected' : '';

        html += `
            <div class="timeline-event ${isActive ? 'active' : ''} ${eraSelectClass} ${matchClass} ${posClass}"
                 style="${eventStyle} ${opacityStyle}"
                 data-year="${event.year}"
                 data-index="${globalIndex}">
                <div class="timeline-event-dot" style="${isEraSelected ? `background: ${era.color};` : ''}"></div>
                <div class="timeline-event-label" onclick="showEventCard(${globalIndex}, event)" style="${labelStyle}">
                    <span class="event-year" style="${yearStyle}">${formatYear(event.year)}</span>
                    <span class="event-title-short">${event.title}</span>
                </div>
            </div>
        `;
    });

    track.innerHTML = html;

    // Render era markers into the dedicated container
    if (eraTrack) {
        eraTrack.innerHTML = generateEraMarkers();
    }
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
    let markers = '';
    TIMELINE_ERAS.forEach((era, i) => {
        const startPos = ((era.start - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
        const endPos = ((era.end - TOTAL_MIN_YEAR) / TOTAL_RANGE) * 100;
        const width = endPos - startPos;
        const row = i % 3;
        const isSelected = selectedEraName === era.name;

        const backgroundStyle = isSelected ? `${era.color}75` : `${era.color}45`;
        const borderStyle = isSelected ? `border: 2px solid ${era.color}; border-left: 5px solid ${era.color};` : `border-left: 4px solid ${era.color};`;
        const shadowStyle = isSelected ? `box-shadow: 0 0 10px ${era.color};` : '';

        markers += `
            <div class="era-marker era-row-${row} ${isSelected ? 'selected' : ''}" title="${era.name}" onclick="toggleEraSelection('${era.name.replace(/'/g, "\\'")}', ${era.start}, ${era.end}, event)" style="left: ${startPos}%; width: ${width}%; background: ${backgroundStyle}; ${borderStyle} ${shadowStyle} opacity: 1.0; cursor: pointer;">
                <span class="era-name" style="color: ${era.color};">${era.name}</span>
            </div>
        `;
    });
    return markers;
}

function toggleEraSelection(eraName, startYear, endYear, event) {
    if (event) event.stopPropagation();
    if (selectedEraName === eraName) {
        selectedEraName = null;
        loadTimeline();
    } else {
        selectedEraName = eraName;
        zoomToEra(startYear, endYear);
    }
}

function zoomToEra(startYear, endYear) {
    const container = document.getElementById('timelineContainer');
    const track = document.getElementById('timelineTrack');
    if (!container || !track) return;

    // Zoom-Faktor dynamisch berechnen, damit kürzere Epochen stärker gezoomt werden
    const duration = endYear - startYear;
    zoomLevel = Math.max(2.0, Math.min(15.0, 450 / duration));
    
    // Ensure zoom is valid
    if (isNaN(zoomLevel) || zoomLevel < 1.0) {
        zoomLevel = 2.0;
    }
    
    loadTimeline();
    updateZoomDisplay();

    // Mitte der Epoche berechnen
    const centerYear = (startYear + endYear) / 2;

    // Scroll-Ziel berechnen, um das Jahr mittig auszurichten
    const newTrackWidth = BASE_TRACK_WIDTH * zoomLevel;
    const centerRatio = (centerYear - TOTAL_MIN_YEAR) / TOTAL_RANGE;
    const newScrollLeft = centerRatio * newTrackWidth - container.clientWidth / 2;

    // Sanfter Scroll zur Position
    container.scrollTo({
        left: Math.max(0, newScrollLeft),
        behavior: 'smooth'
    });
}

function showEventCard(globalIndex, clickEvent) {
    if (clickEvent) clickEvent.stopPropagation();
    _openCard(globalIndex);
}

function _openCard(globalIndex) {
    const event = TIMELINE_EVENTS[globalIndex];
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
    const eventElement = document.querySelector(`.timeline-event[data-index="${index}"]`);
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

    // Ensure current zoom is valid before adding delta
    if (typeof zoomLevel !== 'number' || isNaN(zoomLevel) || zoomLevel < 1.8) {
        zoomLevel = 1.8;
    }

    // Mittelpunkt-Jahr vor dem Zoom merken
    const oldTrackWidth = track.clientWidth;
    const centerPixel = container.scrollLeft + container.clientWidth / 2;
    const centerRatio = oldTrackWidth > 0 ? centerPixel / oldTrackWidth : 0.5;
    const centerYear = TOTAL_MIN_YEAR + centerRatio * TOTAL_RANGE;

    const oldZoom = zoomLevel;
    zoomLevel = Math.max(1.8, Math.min(15.0, zoomLevel + delta));

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
        const eventCount = getVisibleEvents().length;
        if (zoomLevel <= 1.8) {
            display.textContent = `Übersicht (${eventCount} Events)`;
        } else {
            display.textContent = `Zoom ${zoomLevel.toFixed(1)}x (${eventCount} Events)`;
        }
    }

    // Disable/enable zoom buttons at limits
    const btnOut = document.querySelector('.timeline-zoom button:first-child');
    const btnIn = document.querySelector('.timeline-zoom button:last-child');
    if (btnOut) {
        const isMin = zoomLevel <= 1.8;
        btnOut.disabled = isMin;
        btnOut.style.opacity = isMin ? '0.4' : '1.0';
        btnOut.style.cursor = isMin ? 'not-allowed' : 'pointer';
    }
    if (btnIn) {
        const isMax = zoomLevel >= 15.0;
        btnIn.disabled = isMax;
        btnIn.style.opacity = isMax ? '0.4' : '1.0';
        btnIn.style.cursor = isMax ? 'not-allowed' : 'pointer';
    }
}

function filterByGrade(grade) {
    currentGrade = grade;
    
    // Update active class on filter buttons
    document.querySelectorAll('.grade-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Select the button that was clicked
    let btnId = '';
    if (grade === 'all') {
        btnId = 'filter-grade-all';
    } else {
        btnId = `filter-grade-${grade}`;
    }
    const activeBtn = document.getElementById(btnId);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Reload timeline and update display
    loadTimeline();
    updateZoomDisplay();
}

function setupTimelineControls() {
    const container = document.getElementById('timelineContainer');
    const eraContainer = document.getElementById('timelineErasContainer');
    if (!container) return;

    if (eraContainer) {
        container.addEventListener('scroll', () => {
            eraContainer.scrollLeft = container.scrollLeft;
        });
    }

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

function getSearchKeywords(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    
    const synonyms = {
        'judenvernichtung': ['holocaust', 'shoah', 'wannsee', 'auschwitz', 'rassegesetze', 'jude', 'vernichtung'],
        'judenverfolgung': ['holocaust', 'shoah', 'pogrom', 'rassegesetze', 'jude', 'verfolgung', 'reichspogrom'],
        'shoah': ['holocaust', 'wannsee', 'auschwitz', 'jude', 'vernichtung'],
        'weltkrieg': ['krieg', 'ww1', 'wk1', 'weimar', 'reichsgründung', 'kapitulation'],
        'erster weltkrieg': ['ww1', 'wk1', '1914', '1918'],
        'zweiter weltkrieg': ['krieg', '1939', '1945', 'kapitulation', 'd-day', 'potsdamer'],
        'ns-zeit': ['hitler', 'nationalsozialismus', 'goebbels', 'gleichschaltung', 'drittes reich'],
        'ddr': ['mauer', 'kalter krieg', 'teilung', 'wiedervereinigung', 'brd'],
        'bonn': ['brd', 'grundgesetz', 'kalter krieg'],
        'bismarck': ['reichsgründung', 'kaiserreich', 'sozialistengesetze'],
        'entdeckung amerika': ['kolumbus', 'amerika', 'entdeckung', 'entdeckungen', '1492'],
        'entdeckung': ['kolumbus', 'amerika', 'entdeckungen', '1492'],
        'hexenverbrennung': ['hexenverfolgung', 'hexen', 'verfolgung', 'wahn', '1590'],
        'hexen': ['hexenverfolgung', '1590'],
        'jakobiner': ['jakobiner', 'robespierre', 'terrorherrschaft', 'schreckensherrschaft', '1793']
    };
    
    let keywords = [q];
    
    // Add individual words (excluding short stop words)
    const words = q.split(/\s+/).filter(w => w.length >= 3 && !['von', 'der', 'die', 'das', 'und', 'den', 'dem', 'ein', 'eine', 'mit', 'auf', 'aus'].includes(w));
    keywords.push(...words);

    for (const [key, values] of Object.entries(synonyms)) {
        if (q.includes(key) || key.includes(q)) {
            keywords.push(...values);
        }
    }
    
    return [...new Set(keywords)];
}

function eventMatchesQuery(event, keywords) {
    if (keywords.length === 0) return false;
    const title = (event.title || '').toLowerCase();
    const desc = (event.description || '').toLowerCase();
    const details = (event.details || '').toLowerCase();
    const yearStr = (event.year || '').toString();
    
    return keywords.some(kw => 
        title.includes(kw) || 
        desc.includes(kw) || 
        details.includes(kw) ||
        yearStr === kw ||
        (kw.length >= 3 && yearStr.includes(kw))
    );
}

function handleTimelineSearch() {
    const input = document.getElementById('timelineSearchInput');
    const clearBtn = document.getElementById('clearTimelineSearch');
    if (!input || !clearBtn) return;
    
    searchQuery = input.value.trim();
    clearBtn.style.display = searchQuery ? 'block' : 'none';
    
    loadTimeline();
    
    if (searchQuery.length >= 3 && searchQuery !== lastScrolledSearchQuery) {
        const keywords = getSearchKeywords(searchQuery);
        const visibleEvents = getVisibleEvents();
        const firstMatch = visibleEvents.find(e => eventMatchesQuery(e, keywords));
        if (firstMatch) {
            lastScrolledSearchQuery = searchQuery;
            scrollToYear(firstMatch.year);
        }
    }
    if (!searchQuery) {
        lastScrolledSearchQuery = '';
    }
}

function clearTimelineSearch() {
    const input = document.getElementById('timelineSearchInput');
    if (input) {
        input.value = '';
        handleTimelineSearch();
    }
}

function scrollToYear(year) {
    const container = document.getElementById('timelineContainer');
    const track = document.getElementById('timelineTrack');
    if (!container || !track) return;
    
    const newTrackWidth = BASE_TRACK_WIDTH * zoomLevel;
    const centerRatio = (year - TOTAL_MIN_YEAR) / TOTAL_RANGE;
    const newScrollLeft = centerRatio * newTrackWidth - container.clientWidth / 2;
    
    container.scrollTo({
        left: Math.max(0, newScrollLeft),
        behavior: 'smooth'
    });
}

function handleTimelineSearchKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = document.getElementById('timelineSearchInput');
        if (!input) return;
        const query = input.value.trim();
        if (query) {
            const keywords = getSearchKeywords(query);
            const visibleEvents = getVisibleEvents();
            const firstMatch = visibleEvents.find(e => eventMatchesQuery(e, keywords));
            if (firstMatch) {
                lastScrolledSearchQuery = query;
                scrollToYear(firstMatch.year);
            }
        }
    }
}

// CSS