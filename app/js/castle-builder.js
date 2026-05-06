// ===== BURG-BAUMEISTER (Minecraft-Style) =====

const CB_ROWS = 14, CB_COLS = 18;
const CB_CELL = 38; // px pro Zelle

// Blocktypen
const CB_BLOCKS = {
    stein:        { label: 'Gestein',    emoji: '🪨', cost: 10, cat: 'bau',  desc: 'Robustes Mauerwerk' },
    ziegel:       { label: 'Ziegel',     emoji: '🧱', cost: 15, cat: 'bau',  desc: 'Gemauerte Ziegel' },
    holz:         { label: 'Holz',       emoji: '🪵', cost: 8,  cat: 'bau',  desc: 'Balken und Dielen' },
    fenster:      { label: 'Fenster',    emoji: '🔲', cost: 18, cat: 'bau',  desc: 'Glasfenster' },
    tuer:         { label: 'Tür',        emoji: '🚪', cost: 25, cat: 'bau',  desc: 'Eichentür' },
    dach:         { label: 'Dach',       emoji: '🔷', cost: 12, cat: 'bau',  desc: 'Dachziegel' },
    baum:         { label: 'Baum',       emoji: '🌲', cost: 5,  cat: 'deko', desc: 'Großer Baum' },
    busch:        { label: 'Busch',      emoji: '🌿', cost: 3,  cat: 'deko', desc: 'Blühender Busch' },
    blume:        { label: 'Blume',      emoji: '🌸', cost: 2,  cat: 'deko', desc: 'Bunte Blume' },
    brunnen:      { label: 'Brunnen',    emoji: '⛲', cost: 30, cat: 'deko', desc: 'Steinbrunnen' },
    fackel:       { label: 'Fackel',     emoji: '🔥', cost: 8,  cat: 'deko', desc: 'Beleuchtung' },
    kuh:          { label: 'Kuh',        emoji: '🐄', cost: 40, cat: 'tier', desc: 'Milchkuh' },
    schaf:        { label: 'Schaf',      emoji: '🐑', cost: 25, cat: 'tier', desc: 'Wollschaf' },
    huhn:         { label: 'Huhn',       emoji: '🐔', cost: 15, cat: 'tier', desc: 'Brathühnchen' },
    pferd:        { label: 'Pferd',      emoji: '🐴', cost: 35, cat: 'tier', desc: 'Edles Pferd' },
};

// Zonen-Definitionen: welche Zellen gehören zu welcher Zone
const CB_ZONES = (() => {
    const border = [];
    // Obere Mauer (Reihe 0)
    for (let c = 0; c < CB_COLS; c++) border.push([0, c]);
    // Untere Mauer (Reihe 13) mit Toreinfahrt bei cols 7-9 frei lassen (nur Außenwand)
    for (let c = 0; c < CB_COLS; c++) {
        if (c < 7 || c > 9) border.push([CB_ROWS - 1, c]);
    }
    // Linke Mauer (Spalte 0)
    for (let r = 1; r < CB_ROWS - 1; r++) border.push([r, 0]);
    // Rechte Mauer (Spalte 17)
    for (let r = 1; r < CB_ROWS - 1; r++) border.push([r, CB_COLS - 1]);

    // Burgtor-Eingang (Reihe 12 bei den Gate-Spalten)
    const burgtor = [[12, 7], [12, 8], [12, 9], [13, 7], [13, 8], [13, 9]];

    const rect = (r1, c1, r2, c2) => {
        const cells = [];
        for (let r = r1; r <= r2; r++)
            for (let c = c1; c <= c2; c++) cells.push([r, c]);
        return cells;
    };

    return {
        mauer:      { label: 'Mauer',       color: '#5a4832', hcolor: '#8a6840', cells: border,             allowed: ['stein','ziegel','holz','tuer','fenster','fackel'], desc: 'Äußere Befestigungsmauer' },
        burgtor:    { label: 'Burgtor',      color: '#3a3020', hcolor: '#6a5040', cells: burgtor,            allowed: ['stein','ziegel','holz','tuer','fackel'],           desc: 'Einfahrt und Zugbrücke' },
        kirche:     { label: 'Kirche',       color: '#3d3d6b', hcolor: '#5555aa', cells: rect(2,2,4,4),     allowed: ['stein','ziegel','fenster','tuer','dach','fackel'],  desc: 'Burgkapelle' },
        garten:     { label: 'Garten',       color: '#2a5a2a', hcolor: '#3a8a3a', cells: rect(2,7,4,9),     allowed: ['baum','busch','blume','brunnen','fackel'],          desc: 'Burgkräutergarten' },
        frauenhaus: { label: 'Frauenhaus',   color: '#5a2a5a', hcolor: '#8a4a8a', cells: rect(2,12,4,14),   allowed: ['holz','ziegel','fenster','tuer','dach','blume'],   desc: 'Gemächer der Burgherrin' },
        herrenhaus: { label: 'Herrenhaus',   color: '#5a4a2a', hcolor: '#8a7040', cells: rect(6,2,8,4),     allowed: ['holz','ziegel','fenster','tuer','dach','fackel'],  desc: 'Wohnbereich des Herrn' },
        bergfried:  { label: 'Bergfried',    color: '#5a2a2a', hcolor: '#9a4040', cells: rect(6,12,8,15),   allowed: ['stein','ziegel','fenster','tuer','dach','fackel'], desc: 'Hauptturm der Burg' },
        backhaus:   { label: 'Backhaus',     color: '#5a4020', hcolor: '#8a6030', cells: rect(10,2,11,4),   allowed: ['stein','holz','tuer','dach','fackel'],             desc: 'Bäckerei und Küche' },
        stall:      { label: 'Stall',        color: '#4a5a2a', hcolor: '#6a8a40', cells: rect(10,8,11,11),  allowed: ['holz','dach','tuer','kuh','schaf','huhn','pferd'], desc: 'Tiere und Pferde' },
        burghof:    { label: 'Burghof',      color: '#302820', hcolor: '#504030', cells: null,              allowed: ['brunnen','blume','baum','busch','fackel','kuh','schaf','huhn'], desc: 'Zentraler Innenhof' },
    };
})();

// Burghof-Zellen = alle nicht-zugewiesenen Innenzellen
function computeBurghofCells() {
    const assigned = new Set();
    Object.values(CB_ZONES).forEach(z => {
        if (z.cells) z.cells.forEach(([r, c]) => assigned.add(r + ',' + c));
    });
    const cells = [];
    for (let r = 1; r <= CB_ROWS - 2; r++) {
        for (let c = 1; c <= CB_COLS - 2; c++) {
            if (!assigned.has(r + ',' + c)) cells.push([r, c]);
        }
    }
    return cells;
}

// Lookup: [row,col] → zone-id
let _cellZoneMap = {};
function buildCellZoneMap() {
    _cellZoneMap = {};
    CB_ZONES.burghof.cells = computeBurghofCells();
    Object.entries(CB_ZONES).forEach(([zoneId, zone]) => {
        if (zone.cells) {
            zone.cells.forEach(([r, c]) => {
                _cellZoneMap[r + ',' + c] = zoneId;
            });
        }
    });
}

// Spielzustand
let _selectedBlock = null;  // blockId
let _zoomZone = null;       // zoneId oder null
let _currentInventory = {}; // blockId → count
let _castleGrid = [];       // Array(ROWS*COLS) of null|blockId

function cbInit() {
    buildCellZoneMap();
    if (!currentUser) return;
    if (!currentUser.castleBuilder) {
        currentUser.castleBuilder = { grid: Array(CB_ROWS * CB_COLS).fill(null), inventory: {} };
    }
    _castleGrid = currentUser.castleBuilder.grid;
    _currentInventory = currentUser.castleBuilder.inventory;
    renderCastleBuilder();
}

// Burg speichern
function cbSave() {
    if (!currentUser) return;
    currentUser.castleBuilder = { grid: _castleGrid, inventory: _currentInventory };
    updateUserProgress({});
}

// Index in 1D-Array
function cbIdx(r, c) { return r * CB_COLS + c; }

// ===== RENDER =====

function renderCastleBuilder() {
    const container = document.getElementById('castleBuilderContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="cb-layout">
            <!-- Linkes Panel: Zonen-Info + Inventar -->
            <div class="cb-left-panel">
                <div class="cb-zone-info" id="cbZoneInfo">
                    <div class="cb-zone-info-empty">
                        <span>🏰</span>
                        <p>Klicke auf eine Zone im Bauplan</p>
                    </div>
                </div>
                <div class="cb-inventory" id="cbInventory">
                    ${renderInventoryHTML()}
                </div>
            </div>

            <!-- Mitte: Bauplan-Grid -->
            <div class="cb-grid-wrapper">
                <div class="cb-zoom-hint">Doppelklick = Zoom | Klick = bauen/entfernen</div>
                <div class="cb-grid-outer" id="cbGridOuter">
                    <div class="cb-grid" id="cbGrid" style="width:${CB_COLS*CB_CELL}px;height:${CB_ROWS*CB_CELL}px">
                        ${renderGridHTML()}
                    </div>
                </div>
            </div>

            <!-- Rechtes Panel: Shop -->
            <div class="cb-right-panel">
                <div class="cb-shop">
                    <h3>🛒 Baustoff-Shop</h3>
                    <div class="cb-coins-display">
                        <span>💰 Deine Münzen:</span>
                        <strong id="cbCoinsDisplay">${currentUser ? currentUser.progress.coins : 0} 🐄</strong>
                    </div>
                    ${renderShopHTML()}
                </div>
            </div>
        </div>
    `;
}

function renderGridHTML() {
    let html = '';
    for (let r = 0; r < CB_ROWS; r++) {
        for (let c = 0; c < CB_COLS; c++) {
            const zoneId = _cellZoneMap[r + ',' + c] || null;
            const block = _castleGrid[cbIdx(r, c)];
            const zone = zoneId ? CB_ZONES[zoneId] : null;
            const bg = zone ? zone.color : '#1a1a1a';
            const emoji = block ? (CB_BLOCKS[block]?.emoji || '') : '';
            const title = zone ? zone.label : '';

            html += `<div class="cb-cell"
                data-r="${r}" data-c="${c}" data-zone="${zoneId || ''}"
                style="background:${bg};left:${c*CB_CELL}px;top:${r*CB_CELL}px;width:${CB_CELL}px;height:${CB_CELL}px"
                title="${title}"
                onclick="cbCellClick(${r},${c})"
                ondblclick="cbCellDblClick(${r},${c})"
            >${emoji}</div>`;
        }
    }
    // Beschriftungen der Zonen
    const labeled = new Set();
    Object.entries(CB_ZONES).forEach(([zoneId, zone]) => {
        if (!zone.cells || zone.cells.length === 0) return;
        // Finde ungefähren Mittelpunkt der Zone
        const rows = zone.cells.map(([r]) => r);
        const cols = zone.cells.map(([, c]) => c);
        const midR = Math.round(rows.reduce((a, b) => a + b, 0) / rows.length);
        const midC = Math.round(cols.reduce((a, b) => a + b, 0) / cols.length);
        html += `<div class="cb-zone-label" style="left:${midC*CB_CELL}px;top:${midR*CB_CELL}px"
            onclick="cbSelectZone('${zoneId}')"
        >${zone.label}</div>`;
    });
    return html;
}

function renderInventoryHTML() {
    const items = Object.entries(_currentInventory).filter(([, v]) => v > 0);
    if (items.length === 0) return '<p class="cb-inv-empty">Inventar leer – kaufe Bausteine im Shop!</p>';
    return '<h4>🎒 Inventar</h4>' + items.map(([blockId, count]) => {
        const b = CB_BLOCKS[blockId];
        if (!b) return '';
        return `<div class="cb-inv-item ${_selectedBlock === blockId ? 'selected' : ''}" onclick="cbSelectBlock('${blockId}')">
            <span>${b.emoji}</span>
            <span>${b.label}</span>
            <strong>×${count}</strong>
        </div>`;
    }).join('');
}

function renderShopHTML() {
    const cats = { bau: '🧱 Baumaterial', deko: '🌸 Dekoration', tier: '🐄 Tiere' };
    let html = '';
    Object.entries(cats).forEach(([cat, catLabel]) => {
        const blocks = Object.entries(CB_BLOCKS).filter(([, b]) => b.cat === cat);
        html += `<div class="cb-shop-cat"><strong>${catLabel}</strong>`;
        blocks.forEach(([blockId, b]) => {
            const owned = _currentInventory[blockId] || 0;
            const canAfford = currentUser && currentUser.progress.coins >= b.cost;
            html += `<div class="cb-shop-item ${!canAfford ? 'unaffordable' : ''}">
                <span class="cb-block-emoji">${b.emoji}</span>
                <span class="cb-block-label">${b.label}</span>
                <span class="cb-block-owned">×${owned}</span>
                <span class="cb-block-price">${b.cost}🐄</span>
                <button class="btn btn-small ${canAfford ? '' : 'disabled'}"
                    onclick="cbBuyBlock('${blockId}')" ${canAfford ? '' : 'disabled'}>
                    Kaufen
                </button>
            </div>`;
        });
        html += '</div>';
    });
    return html;
}

// ===== INTERAKTION =====

function cbSelectBlock(blockId) {
    _selectedBlock = _selectedBlock === blockId ? null : blockId;
    document.getElementById('cbInventory').innerHTML = renderInventoryHTML();
    updateCbCellHighlights();
    updateZoneInfoDisplay();
}

function cbSelectZone(zoneId) {
    const zone = CB_ZONES[zoneId];
    if (!zone) return;
    showCbZoneInfo(zoneId);
    // Hebe Zone hervor
    document.querySelectorAll('.cb-cell').forEach(cell => {
        cell.classList.toggle('zone-highlight', cell.dataset.zone === zoneId);
    });
}

function updateCbCellHighlights() {
    if (!_selectedBlock) {
        document.querySelectorAll('.cb-cell.placeable').forEach(el => el.classList.remove('placeable'));
        return;
    }
    document.querySelectorAll('.cb-cell').forEach(cell => {
        const zoneId = cell.dataset.zone;
        if (!zoneId) { cell.classList.remove('placeable'); return; }
        const zone = CB_ZONES[zoneId];
        const allowed = zone && zone.allowed.includes(_selectedBlock);
        cell.classList.toggle('placeable', !!allowed);
    });
}

function cbCellClick(r, c) {
    const zoneId = _cellZoneMap[r + ',' + c];
    if (!zoneId) return;

    const idx = cbIdx(r, c);
    const currentBlock = _castleGrid[idx];

    if (currentBlock) {
        // Block entfernen → zurück ins Inventar
        _currentInventory[currentBlock] = (_currentInventory[currentBlock] || 0) + 1;
        _castleGrid[idx] = null;
        updateCell(r, c);
        document.getElementById('cbInventory').innerHTML = renderInventoryHTML();
        cbSave();
        showToast(`${CB_BLOCKS[currentBlock]?.emoji || ''} ${CB_BLOCKS[currentBlock]?.label} entfernt → Inventar`, 'info');
        return;
    }

    if (!_selectedBlock) {
        // Kein Block ausgewählt → Zone-Info zeigen
        cbSelectZone(zoneId);
        return;
    }

    // Prüfen ob Block in dieser Zone erlaubt
    const zone = CB_ZONES[zoneId];
    if (!zone.allowed.includes(_selectedBlock)) {
        showToast(`${CB_BLOCKS[_selectedBlock]?.label} kann hier nicht platziert werden.`, 'warning');
        return;
    }

    // Prüfen ob Block im Inventar
    if (!_currentInventory[_selectedBlock] || _currentInventory[_selectedBlock] <= 0) {
        showToast('Nicht genug im Inventar! Kaufe mehr im Shop.', 'warning');
        return;
    }

    // Block platzieren
    _currentInventory[_selectedBlock]--;
    _castleGrid[idx] = _selectedBlock;
    updateCell(r, c);
    document.getElementById('cbInventory').innerHTML = renderInventoryHTML();
    cbSave();

    if (_currentInventory[_selectedBlock] <= 0) {
        _selectedBlock = null;
        updateCbCellHighlights();
    }
}

function cbCellDblClick(r, c) {
    const zoneId = _cellZoneMap[r + ',' + c];
    const outer = document.getElementById('cbGridOuter');
    const grid = document.getElementById('cbGrid');
    if (!outer || !grid) return;

    if (_zoomZone === zoneId) {
        // Rauszoomen
        _zoomZone = null;
        grid.style.transform = '';
        grid.style.transformOrigin = '';
        outer.classList.remove('zoomed');
    } else {
        // Reinzoomen: Mittelpunkt der Zone berechnen
        const zone = CB_ZONES[zoneId];
        if (!zone || !zone.cells || zone.cells.length === 0) return;
        const rows = zone.cells.map(([r2]) => r2);
        const cols = zone.cells.map(([, c2]) => c2);
        const midR = rows.reduce((a, b) => a + b, 0) / rows.length;
        const midC = cols.reduce((a, b) => a + b, 0) / cols.length;
        const originX = midC * CB_CELL + CB_CELL / 2;
        const originY = midR * CB_CELL + CB_CELL / 2;

        _zoomZone = zoneId;
        grid.style.transformOrigin = `${originX}px ${originY}px`;
        grid.style.transform = 'scale(2.8)';
        outer.classList.add('zoomed');
    }
}

function updateCell(r, c) {
    const cell = document.querySelector(`.cb-cell[data-r="${r}"][data-c="${c}"]`);
    if (!cell) return;
    const block = _castleGrid[cbIdx(r, c)];
    cell.textContent = block ? (CB_BLOCKS[block]?.emoji || '') : '';
    updateCbCellHighlights();
}

function showCbZoneInfo(zoneId) {
    const zone = CB_ZONES[zoneId];
    if (!zone) return;
    const panel = document.getElementById('cbZoneInfo');
    if (!panel) return;

    const allowedBlocks = zone.allowed.map(id => {
        const b = CB_BLOCKS[id];
        return b ? `<span class="cb-allowed-block" onclick="cbSelectBlock('${id}')" title="${b.label} – ${b.cost}🐄">${b.emoji}</span>` : '';
    }).join('');

    panel.innerHTML = `
        <div class="cb-zone-detail" style="border-top: 3px solid ${zone.hcolor}">
            <strong style="color:${zone.hcolor}">${zone.label}</strong>
            <p>${zone.desc}</p>
            <div class="cb-allowed-blocks">${allowedBlocks}</div>
            <small>Klicke auf einen Block um ihn auszuwählen</small>
        </div>
    `;
}

function updateZoneInfoDisplay() {
    // nichts → Inventar-Auswahl zeigt sich durch renderInventoryHTML
}

// ===== SHOP: Block kaufen =====
function cbBuyBlock(blockId) {
    const b = CB_BLOCKS[blockId];
    if (!b || !currentUser) return;

    if (currentUser.progress.coins < b.cost) {
        showToast('Nicht genug Münzen! 🐄', 'warning');
        return;
    }

    currentUser.progress.coins -= b.cost;
    _currentInventory[blockId] = (_currentInventory[blockId] || 0) + 1;
    updateUserProgress({ coins: currentUser.progress.coins });
    cbSave();

    // UI aktualisieren
    document.getElementById('cbInventory').innerHTML = renderInventoryHTML();
    document.getElementById('cbCoinsDisplay').textContent = currentUser.progress.coins + ' 🐄';
    // Shop neu rendern (Affordability update)
    document.querySelector('.cb-shop').innerHTML = `
        <h3>🛒 Baustoff-Shop</h3>
        <div class="cb-coins-display">
            <span>💰 Deine Münzen:</span>
            <strong id="cbCoinsDisplay">${currentUser.progress.coins} 🐄</strong>
        </div>
        ${renderShopHTML()}
    `;

    showToast(`${b.emoji} ${b.label} gekauft!`, 'success');
    if (_selectedBlock === null) cbSelectBlock(blockId);
}

// Wird von showSection('castle') aufgerufen
document.addEventListener('DOMContentLoaded', () => {
    // Castle section becomes active → init builder
    const observer = new MutationObserver(() => {
        const section = document.getElementById('castle');
        if (section && section.classList.contains('active') && document.getElementById('castleBuilderContainer') && !document.getElementById('cbGrid')) {
            cbInit();
        }
    });
    const castle = document.getElementById('castle');
    if (castle) observer.observe(castle, { attributes: true, attributeFilter: ['class'] });
});
