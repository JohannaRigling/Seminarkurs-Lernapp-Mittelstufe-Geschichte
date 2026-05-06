// ===== BURG-BAUMEISTER (2D Seitenansicht) =====

// Szenen-Abmessungen (Referenz)
const CB_W = 860, CB_H = 340, CB_GROUND = 42;

// Gebäude-Definitionen: id, Name, Typ, Szenen-X, Breite, Höhe je Level, Kosten, Beschreibung
const CB_DEFS = [
    { id: 'mauer_l',    name: 'Linke Mauer',    type: 'wall',      x: 0,   w: 118, hh: [58,  75,  95],  costs: [15, 30],        icon: '🧱', desc: 'Äußere Schutzmauer – erste Verteidigungslinie der linken Flanke.' },
    { id: 'turm_l',     name: 'Linker Turm',    type: 'tower',     x: 74,  w: 78,  hh: [125, 162, 198], costs: [50, 100, 200],  icon: '🗼', desc: 'Eckturm – von hier aus überblicken Wachen das Land.' },
    { id: 'kirche',     name: 'Burgkapelle',    type: 'church',    x: 156, w: 98,  hh: [138, 180],       costs: [80, 160],       icon: '⛪', desc: 'Geistliches Zentrum – hier beten die Bewohner der Burg.' },
    { id: 'burgtor',    name: 'Burgtor',        type: 'gate',      x: 258, w: 100, hh: [88,  118, 148], costs: [40, 80, 150],   icon: '🚪', desc: 'Einziger Eingang – gesichert durch Zugbrücke und Fallgitter.' },
    { id: 'garten',     name: 'Kräutergarten', type: 'garden',    x: 362, w: 88,  hh: [40,  58],        costs: [20, 40],        icon: '🌿', desc: 'Kräuter für Küche und Heilkunst der Burgbewohner.' },
    { id: 'bergfried',  name: 'Bergfried',      type: 'bergfried', x: 448, w: 108, hh: [200, 258, 318], costs: [100, 200, 400], icon: '🏰', desc: 'Stärkster Turm – Herz der Burg und letzte Zuflucht.' },
    { id: 'herrenhaus', name: 'Herrenhaus',     type: 'house',     x: 556, w: 100, hh: [98,  136, 170], costs: [60, 120, 240],  icon: '🏠', desc: 'Wohnstätte des Burgherrn und seiner Ritter.' },
    { id: 'backhaus',   name: 'Backhaus',       type: 'stall',     x: 656, w: 88,  hh: [58,  80],        costs: [25, 50],        icon: '🍞', desc: 'Bäckerei und Vorratskammer für die Burgküche.' },
    { id: 'turm_r',     name: 'Rechter Turm',   type: 'tower',     x: 706, w: 78,  hh: [125, 162, 198], costs: [50, 100, 200],  icon: '🗼', desc: 'Eckturm – bewacht die rechte Flanke der Burg.' },
    { id: 'mauer_r',    name: 'Rechte Mauer',   type: 'wall',      x: 744, w: 118, hh: [58,  75,  95],  costs: [15, 30],        icon: '🧱', desc: 'Äußere Schutzmauer der rechten Flanke.' },
];

// Spielzustand: bldState = { [id]: level }  (0 = nicht gebaut)
let _bldState = {};
let _selectedBld = null;

// ───────────────────────── INIT / SPEICHERN ─────────────────────────

function cbInit() {
    if (!currentUser) return;
    if (!currentUser.castleBuilder2) {
        currentUser.castleBuilder2 = { bldState: {} };
    }
    _bldState = currentUser.castleBuilder2.bldState || {};
    _selectedBld = null;
    renderCastleBuilder();
}

function cbSave() {
    if (!currentUser) return;
    currentUser.castleBuilder2 = { bldState: _bldState };
    updateUserProgress({});
}

// ───────────────────────── HAUPTRENDER ─────────────────────────────

function renderCastleBuilder() {
    const container = document.getElementById('castleBuilderContainer');
    if (!container) return;

    const coins = currentUser ? currentUser.progress.coins : 0;

    container.innerHTML = `
        <div class="cb2-wrapper">
            <div class="cb2-topbar">
                <span class="cb2-coins">💰 <strong id="cb2CoinsVal">${coins}</strong> Kuh-Münzen</span>
                <span class="cb2-hint">Klicke auf ein Gebäude, um es zu bauen oder auszubauen</span>
            </div>
            <div class="cb2-scene" id="cb2Scene">
                ${renderSceneHTML()}
            </div>
            <div class="cb2-info-panel" id="cb2InfoPanel">
                ${renderInfoPanel(null)}
            </div>
        </div>
    `;
}

// ───────────────────────── SZENE ───────────────────────────────────

function renderSceneHTML() {
    let html = '<div class="cb2-clouds"><div class="cb2-cloud c1"></div><div class="cb2-cloud c2"></div><div class="cb2-cloud c3"></div></div>';
    html += '<div class="cb2-ground-strip"></div>';

    // Gebäude von links nach rechts
    CB_DEFS.forEach(def => {
        const lv = _bldState[def.id] || 0;
        const isLocked = lv === 0;
        const height = isLocked ? (def.hh[0] * 0.65) : def.hh[Math.min(lv - 1, def.hh.length - 1)];
        const selected = _selectedBld === def.id ? 'selected' : '';
        const lockedClass = isLocked ? 'locked' : '';

        html += `
            <div class="cb2-bld ${selected} ${lockedClass}"
                style="left:${def.x}px; width:${def.w}px; height:${height}px;"
                onclick="cbClickBuilding('${def.id}')"
                title="${def.name} ${lv > 0 ? '(Level ' + lv + ')' : '(nicht gebaut)'}">
                ${renderBuildingArt(def, lv, height)}
                ${isLocked ? `<div class="cb2-bld-lock">🔒</div>` : ''}
                ${lv > 0 ? `<div class="cb2-bld-badge">Lv.${lv}</div>` : ''}
                <div class="cb2-bld-label">${def.name}</div>
            </div>
        `;
    });

    return html;
}

// ───────────────────────── GEBÄUDE-KUNST ───────────────────────────

function renderBuildingArt(def, lv, height) {
    const t = def.type;
    if (t === 'wall')      return renderWall(def, lv, height);
    if (t === 'tower')     return renderTower(def, lv, height);
    if (t === 'bergfried') return renderBergfried(def, lv, height);
    if (t === 'church')    return renderChurch(def, lv, height);
    if (t === 'gate')      return renderGate(def, lv, height);
    if (t === 'house')     return renderHouse(def, lv, height);
    if (t === 'stall')     return renderStall(def, lv, height);
    if (t === 'garden')    return renderGarden(def, lv, height);
    return `<div class="bld-body" style="height:${height}px">${def.icon}</div>`;
}

function renderWall(def, lv, h) {
    const battH = 10, notchW = 13, blockW = 11;
    const num = Math.floor(def.w / (notchW + blockW));
    let battlements = '';
    for (let i = 0; i < num; i++) {
        battlements += `<div class="bld-merlon" style="width:${blockW}px;height:${battH}px"></div>
                        <div class="bld-crenel" style="width:${notchW}px;height:${battH}px"></div>`;
    }
    const arrowH = Math.round(h * 0.45), arrowW = 5;
    return `
        <div class="bld-top-battlements">${battlements}</div>
        <div class="bld-wall-body" style="height:${h - battH}px">
            <div class="bld-arrow-slit" style="height:${arrowH}px;width:${arrowW}px"></div>
        </div>
    `;
}

function renderTower(def, lv, h) {
    const battH = 12;
    const blockW = 10, notchW = 8, num = Math.floor(def.w / (blockW + notchW));
    let battlements = '';
    for (let i = 0; i < num; i++) {
        battlements += `<div class="bld-merlon tower-merlon" style="width:${blockW}px;height:${battH}px"></div>
                        <div class="bld-crenel" style="width:${notchW}px;height:${battH}px"></div>`;
    }
    const bodyH = h - battH;
    const winH = lv >= 1 ? Math.round(bodyH * 0.15) : 0;
    const winCount = lv >= 2 ? 4 : (lv >= 1 ? 2 : 0);
    let windows = '';
    const winPositions = [0.2, 0.45, 0.65, 0.82];
    for (let i = 0; i < winCount; i++) {
        windows += `<div class="bld-window arch-window" style="top:${Math.round(bodyH * winPositions[i])}px;width:8px;height:${winH}px"></div>`;
    }
    return `
        <div class="bld-top-battlements tower-battlements">${battlements}</div>
        <div class="bld-tower-body" style="height:${bodyH}px">
            ${windows}
            <div class="bld-door arch-door" style="bottom:0;width:12px;height:18px"></div>
        </div>
    `;
}

function renderBergfried(def, lv, h) {
    const battH = 14;
    const blockW = 12, notchW = 10, num = Math.floor(def.w / (blockW + notchW));
    let battlements = '';
    for (let i = 0; i < num; i++) {
        battlements += `<div class="bld-merlon berg-merlon" style="width:${blockW}px;height:${battH}px"></div>
                        <div class="bld-crenel" style="width:${notchW}px;height:${battH}px"></div>`;
    }
    const bodyH = h - battH;
    const rows = lv >= 3 ? 4 : (lv >= 2 ? 3 : (lv >= 1 ? 2 : 1));
    const wPerRow = lv >= 2 ? 2 : 1;
    let winHTML = '';
    for (let r = 0; r < rows; r++) {
        const yPos = Math.round(bodyH * (0.12 + r * (0.72 / rows)));
        let rowWins = '';
        if (wPerRow === 2) {
            rowWins = `<div class="bld-window arch-window" style="top:${yPos}px;left:20%;width:10px;height:14px"></div>
                       <div class="bld-window arch-window" style="top:${yPos}px;right:20%;width:10px;height:14px"></div>`;
        } else {
            rowWins = `<div class="bld-window arch-window" style="top:${yPos}px;left:50%;transform:translateX(-50%);width:10px;height:14px"></div>`;
        }
        winHTML += rowWins;
    }
    const banner = lv >= 2 ? `<div class="bld-banner">⚑</div>` : '';
    return `
        ${banner}
        <div class="bld-top-battlements berg-battlements">${battlements}</div>
        <div class="bld-bergfried-body" style="height:${bodyH}px">
            ${winHTML}
            <div class="bld-door arch-door" style="bottom:0;width:16px;height:22px;left:50%;transform:translateX(-50%)"></div>
        </div>
    `;
}

function renderChurch(def, lv, h) {
    const spireH = Math.round(h * 0.35);
    const bodyH = h - spireH;
    const win = `<div class="bld-rose-window" style="top:${Math.round(bodyH * 0.22)}px"></div>`;
    const door = `<div class="bld-door arch-door" style="bottom:0;width:14px;height:20px;left:50%;transform:translateX(-50%)"></div>`;
    const cross = lv >= 2 ? `<div class="bld-cross">✝</div>` : '';
    return `
        <div class="bld-spire" style="height:${spireH}px;width:${Math.round(def.w * 0.45)}px">
            ${cross}
        </div>
        <div class="bld-church-body" style="height:${bodyH}px">
            ${lv >= 1 ? win : ''}
            ${door}
        </div>
    `;
}

function renderGate(def, lv, h) {
    const battH = 12;
    const bodyH = h - battH;
    const gateW = Math.round(def.w * 0.42);
    const gateH = Math.round(bodyH * 0.62);
    const blockW = 10, notchW = 8, num = Math.floor(def.w / (blockW + notchW));
    let battlements = '';
    for (let i = 0; i < num; i++) {
        battlements += `<div class="bld-merlon" style="width:${blockW}px;height:${battH}px"></div>
                        <div class="bld-crenel" style="width:${notchW}px;height:${battH}px"></div>`;
    }
    const chains = lv >= 2 ? `<div class="bld-chains">⛓</div>` : '';
    return `
        <div class="bld-top-battlements">${battlements}</div>
        <div class="bld-gate-body" style="height:${bodyH}px">
            <div class="bld-gate-arch" style="width:${gateW}px;height:${gateH}px"></div>
            ${chains}
            ${lv >= 3 ? `<div class="bld-window" style="top:6px;left:10%;width:8px;height:10px"></div>
                          <div class="bld-window" style="top:6px;right:10%;width:8px;height:10px"></div>` : ''}
        </div>
    `;
}

function renderHouse(def, lv, h) {
    const roofH = Math.round(h * 0.32);
    const bodyH = h - roofH;
    const chimney = lv >= 2 ? `<div class="bld-chimney"></div>` : '';
    const wCount = lv >= 2 ? 2 : 1;
    let wins = '';
    if (wCount === 2) {
        wins = `<div class="bld-window rect-win" style="top:${Math.round(bodyH*0.25)}px;left:20%;width:12px;height:10px"></div>
                <div class="bld-window rect-win" style="top:${Math.round(bodyH*0.25)}px;right:20%;width:12px;height:10px"></div>`;
    } else {
        wins = `<div class="bld-window rect-win" style="top:${Math.round(bodyH*0.25)}px;left:50%;transform:translateX(-50%);width:12px;height:10px"></div>`;
    }
    return `
        ${chimney}
        <div class="bld-roof" style="height:${roofH}px;width:${def.w + 8}px;margin-left:-4px"></div>
        <div class="bld-house-body" style="height:${bodyH}px">
            ${wins}
            <div class="bld-door rect-door" style="bottom:0;width:14px;height:20px;left:50%;transform:translateX(-50%)"></div>
        </div>
    `;
}

function renderStall(def, lv, h) {
    const roofH = Math.round(h * 0.28);
    const bodyH = h - roofH;
    const animal = lv >= 2 ? `<span class="bld-animal">🐄</span>` : '';
    return `
        <div class="bld-stall-roof" style="height:${roofH}px;width:${def.w + 6}px;margin-left:-3px"></div>
        <div class="bld-stall-body" style="height:${bodyH}px">
            <div class="bld-door rect-door" style="bottom:0;width:18px;height:22px;left:50%;transform:translateX(-50%)"></div>
            ${animal}
        </div>
    `;
}

function renderGarden(def, lv, h) {
    const trees = lv >= 2 ? `🌲🌲🌸🌲` : `🌲🌿`;
    const well = lv >= 2 ? `<div class="bld-well">⛲</div>` : '';
    return `
        <div class="bld-garden" style="height:${h}px">
            <div class="bld-garden-trees">${trees}</div>
            <div class="bld-garden-wall"></div>
            ${well}
        </div>
    `;
}

// ───────────────────────── INFO-PANEL ─────────────────────────────

function renderInfoPanel(bldId) {
    if (!bldId) {
        return `<div class="cb2-info-empty">
            <span class="cb2-info-arrow">👆</span>
            Klicke auf ein Gebäude, um es zu bauen oder zu verbessern
        </div>`;
    }
    const def = CB_DEFS.find(d => d.id === bldId);
    if (!def) return '';
    const lv = _bldState[bldId] || 0;
    const maxLv = def.hh.length;
    const coins = currentUser ? currentUser.progress.coins : 0;

    let actionHTML = '';
    if (lv === 0) {
        const cost = def.costs[0];
        const canAfford = coins >= cost;
        actionHTML = `
            <button class="btn btn-primary cb2-build-btn ${canAfford ? '' : 'disabled'}"
                onclick="cbBuyBuilding('${bldId}')" ${canAfford ? '' : 'disabled'}>
                🏗️ Bauen — ${cost} 🐄
            </button>`;
    } else if (lv < maxLv) {
        const cost = def.costs[lv];
        const canAfford = coins >= cost;
        actionHTML = `
            <div class="cb2-level-info">
                ${'⭐'.repeat(lv)}${'☆'.repeat(maxLv - lv)} Level ${lv}/${maxLv}
            </div>
            <button class="btn btn-primary cb2-build-btn ${canAfford ? '' : 'disabled'}"
                onclick="cbBuyBuilding('${bldId}')" ${canAfford ? '' : 'disabled'}>
                ⬆️ Ausbauen auf Level ${lv + 1} — ${cost} 🐄
            </button>`;
    } else {
        actionHTML = `
            <div class="cb2-level-info">
                ${'⭐'.repeat(lv)} Level ${lv}/${maxLv} — vollständig ausgebaut!
            </div>
            <div class="cb2-maxed">✅ Fertig ausgebaut</div>`;
    }

    return `
        <div class="cb2-info-content">
            <div class="cb2-info-icon">${def.icon}</div>
            <div class="cb2-info-text">
                <strong>${def.name}</strong>
                <p>${def.desc}</p>
            </div>
            <div class="cb2-info-actions">${actionHTML}</div>
        </div>
    `;
}

// ───────────────────────── INTERAKTION ────────────────────────────

function cbClickBuilding(id) {
    _selectedBld = id;
    // Selektions-Highlight
    document.querySelectorAll('.cb2-bld').forEach(el => el.classList.remove('selected'));
    const bldEl = document.querySelector(`.cb2-bld[onclick*="'${id}'"]`);
    if (bldEl) bldEl.classList.add('selected');
    // Info-Panel aktualisieren
    document.getElementById('cb2InfoPanel').innerHTML = renderInfoPanel(id);
}

function cbBuyBuilding(id) {
    const def = CB_DEFS.find(d => d.id === id);
    if (!def || !currentUser) return;
    const lv = _bldState[id] || 0;
    const maxLv = def.hh.length;
    if (lv >= maxLv) return;
    const cost = def.costs[lv];
    if (currentUser.progress.coins < cost) {
        showToast('Nicht genug Münzen! 🐄', 'warning');
        return;
    }
    currentUser.progress.coins -= cost;
    _bldState[id] = lv + 1;
    updateUserProgress({ coins: currentUser.progress.coins });
    cbSave();
    // Szene neu rendern
    document.getElementById('cb2Scene').innerHTML = renderSceneHTML();
    document.getElementById('cb2InfoPanel').innerHTML = renderInfoPanel(id);
    document.getElementById('cb2CoinsVal').textContent = currentUser.progress.coins;
    // Selektiert lassen
    const bldEl = document.querySelector(`.cb2-bld[onclick*="'${id}'"]`);
    if (bldEl) bldEl.classList.add('selected');
    showToast(`${def.icon} ${def.name} ${lv === 0 ? 'gebaut' : 'ausgebaut'}!`, 'success');
    if (lv === 0) { addXP(10); addActivity('castle', `${def.name} gebaut`); }
    else { addXP(5); }
}

// ───────────────────────── INIT-OBSERVER ──────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const castle = document.getElementById('castle');
    if (!castle) return;
    const obs = new MutationObserver(() => {
        if (castle.classList.contains('active') && document.getElementById('castleBuilderContainer') && !document.getElementById('cb2Scene')) {
            cbInit();
        }
    });
    obs.observe(castle, { attributes: true, attributeFilter: ['class'] });
});
