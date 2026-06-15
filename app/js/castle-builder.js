// ===== BURG-BAUMEISTER 3D (Voxel) =====
// Three.js wird via ES-Module geladen (ImportMap in index.html)

import * as THREE from 'https://esm.sh/three@0.160.0';
import { OrbitControls } from 'https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// ─────────────────────── KONSTANTEN ───────────────────────────────

const GRID_SIZE = 24;       // 24 × 24 Grundfläche
const MAX_HEIGHT = 14;      // 14 Etagen Höhe
const BLOCK = 1;            // Block-Größe (1 Welt-Einheit)

// Block-Definitionen (Reihenfolge = Shop-Reihenfolge)
const CB3_BLOCKS = [
    { id: 'stein',      name: 'Stein',        color: 0x8a8a8a, price: 2,  texture: 'stone' },
    { id: 'ziegel',     name: 'Ziegel',       color: 0xb14a3a, price: 3,  texture: 'brick' },
    { id: 'sandstein',  name: 'Sandstein',    color: 0xd4b483, price: 4,  texture: 'sandstone' },
    { id: 'holz',       name: 'Holz',         color: 0x8b5a2b, price: 2,  texture: 'wood' },
    { id: 'dachziegel', name: 'Dachziegel',   color: 0x6b2818, price: 3,  texture: 'roof' },
    { id: 'zinne',      name: 'Mauerzinne',   color: 0xb0b0b0, price: 5,  texture: 'merlon' },
    { id: 'fenster',    name: 'Fenster',      color: 0x88ddff, price: 6,  texture: 'window', transparent: true, opacity: 0.35 },
    { id: 'tuer',       name: 'Tür',          color: 0x4a2818, price: 8,  texture: 'door', multiHeight: 2 },
    { id: 'fackel',     name: 'Fackel',       color: 0xff7700, price: 4,  texture: 'torch', emissive: 0xff5500, light: true, transparent: true, alphaTest: 0.5 },
    { id: 'banner',     name: 'Banner',       color: 0x9a2a2a, price: 10, texture: 'banner', transparent: true, alphaTest: 0.5 },
    { id: 'baum',       name: 'Baumkrone',    color: 0x2d8a3a, price: 5,  texture: 'leaves' },
    { id: 'gold',       name: 'Gold-Block',   color: 0xffd700, price: 50, texture: 'gold', metalness: 0.85, roughness: 0.25 },
    { id: 'wasser',     name: 'Wasser',       color: 0x3a7ec0, price: 3,  texture: 'water', transparent: true, opacity: 0.75 },
    { id: 'blume',      name: 'Blume',        color: 0xff5577, price: 3,  texture: 'flower', transparent: true, alphaTest: 0.5 },
    { id: 'zaun',       name: 'Zaun',         color: 0x8b5a2b, price: 4,  texture: 'fence', transparent: true, alphaTest: 0.5 },
    // Möbel & Treppen
    { id: 'buecherregal',  name: 'Bücherregal',  color: 0x6b3f1c, price: 8,  texture: 'bookshelf' },
    { id: 'bett_rot',      name: 'Rotes Bett',   color: 0xcc2233, price: 12, texture: 'bed', multiLength: 2, isBed: true },
    { id: 'bett_blau',     name: 'Blaues Bett',  color: 0x2244cc, price: 12, texture: 'bed', multiLength: 2, isBed: true },
    { id: 'bett_gruen',    name: 'Grünes Bett',  color: 0x33aa44, price: 12, texture: 'bed', multiLength: 2, isBed: true },
    { id: 'bett_gelb',     name: 'Gelbes Bett',  color: 0xeecc22, price: 12, texture: 'bed', multiLength: 2, isBed: true },
    { id: 'bett_weiss',    name: 'Weißes Bett',  color: 0xeeeeee, price: 12, texture: 'bed', multiLength: 2, isBed: true },
    { id: 'bett_lila',     name: 'Lila Bett',    color: 0x9a44cc, price: 12, texture: 'bed', multiLength: 2, isBed: true },
    { id: 'treppe_stein',     name: 'Stein-Treppe',     color: 0x8a8a8a, price: 3, texture: 'stairs', stairBase: 'stone' },
    { id: 'treppe_ziegel',    name: 'Ziegel-Treppe',    color: 0xb14a3a, price: 4, texture: 'stairs', stairBase: 'brick' },
    { id: 'treppe_sandstein', name: 'Sandstein-Treppe', color: 0xd4b483, price: 5, texture: 'stairs', stairBase: 'sandstone' },
    { id: 'treppe_holz',      name: 'Holz-Treppe',      color: 0x8b5a2b, price: 3, texture: 'stairs', stairBase: 'wood' },
    { id: 'treppe_dachziegel',name: 'Dach-Treppe',      color: 0x6b2818, price: 4, texture: 'stairs', stairBase: 'roof' },
    { id: 'schaf',      name: 'Schaf',        color: 0xeeeeee, price: 15, texture: 'animal', isAnimal: true },
    { id: 'kuh',        name: 'Kuh',          color: 0x884422, price: 18, texture: 'animal', isAnimal: true },
    { id: 'huhn',       name: 'Huhn',         color: 0xfff5d0, price: 12, texture: 'animal', isAnimal: true },
    { id: 'pferd',      name: 'Pferd',        color: 0x6e4828, price: 25, texture: 'animal', isAnimal: true },
    { id: 'schwein',    name: 'Schwein',      color: 0xe89aa0, price: 14, texture: 'animal', isAnimal: true },
];

// ─────────────────────── ZUSTAND ──────────────────────────────────

let _scene, _camera, _renderer, _controls, _raycaster, _mouse;
let _plateau, _ghostMesh;
let _blocks = new Map();      // "x,y,z" → { mesh, type, light }
let _inventory = {};          // typeId → count
let _selectedType = null;
let _animFrameId = null;
let _resizeHandler = null;
let _materials = {};          // shared material cache
let _blockGeo = null;         // shared block geometry
let _animals = [];            // [{ mesh, type, x, z, homeX, homeZ, targetX, targetZ, idleUntil, legs }]
let _lastAnimalTime = 0;
let _atmosphereOceanTex = null;
let _mouseDownPos = null;
let _eventCleanup = [];
let _buildMode = false;       // false = Normalmodus (nur ansehen), true = Baumodus
let _gridHelper = null;       // Referenz auf das weiße Karoliniengrid

// ─────────────────────── INIT / SAVE ──────────────────────────────

function cbInit() {
    if (!window.currentUser) {
        console.warn('[Burg] Bitte zuerst einloggen.');
        return;
    }
    _buildMode = false; // Zurücksetzen auf Normalmodus bei jedem Eintritt
    if (!window.currentUser.castleBuilder3) {
        window.currentUser.castleBuilder3 = { blocks: [], inventory: {} };
    }
    _inventory = { ...(window.currentUser.castleBuilder3.inventory || {}) };
    _selectedType = null;
    _blocks = new Map();
    _animals = [];

    try { cb3RenderLayout(); }    catch (e) { console.error('[Burg] Layout fehlgeschlagen:', e); }
    try { cb3SetupScene(); }      catch (e) { console.error('[Burg] Szene fehlgeschlagen:', e); }
    try { cb3LoadBlocks(window.currentUser.castleBuilder3.blocks || []); } catch (e) { console.error('[Burg] LoadBlocks fehlgeschlagen:', e); }
    try { cb3LoadAnimals(window.currentUser.castleBuilder3.animals || []); } catch (e) { console.error('[Burg] LoadAnimals fehlgeschlagen:', e); }
    try { cb3UpdateUI(); }        catch (e) { console.error('[Burg] UpdateUI fehlgeschlagen:', e); }
    try { cb3StartAnimation(); }  catch (e) { console.error('[Burg] Animation fehlgeschlagen:', e); }
}

function cb3LoadAnimals(list) {
    list.forEach(a => {
        cb3SpawnAnimal(a.type, a.x, a.z);
        const an = _animals[_animals.length - 1];
        if (an && a.homeX !== undefined) {
            an.homeX = a.homeX;
            an.homeZ = a.homeZ;
        }
    });
}

function cb3Save() {
    if (!window.currentUser) return;
    const blocks = [];
    _blocks.forEach((b, key) => {
        const [x, y, z] = key.split(',').map(Number);
        const entry = { x, y, z, type: b.type };
        if (b.wall) entry.wall = b.wall;
        blocks.push(entry);
    });
    const animals = _animals.map(a => ({
        type: a.type, x: a.x, z: a.z, homeX: a.homeX, homeZ: a.homeZ
    }));
    window.currentUser.castleBuilder3 = { blocks, inventory: { ..._inventory }, animals };
    if (typeof window.updateUserProgress === 'function') window.updateUserProgress({});
}

// ─────────────────────── HTML-LAYOUT ──────────────────────────────

function cb3RenderLayout() {
    const container = document.getElementById('castleBuilderContainer');
    if (!container) return;

    cb3Cleanup();

    const coins = window.currentUser ? window.currentUser.progress.coins : 0;

    container.innerHTML = `
        <div class="cb3-wrapper" id="cb3Wrapper">
            <div class="cb3-topbar">
                <div class="cb3-coins-display">
                    <span class="cb3-coin-dot"></span>
                    <span class="cb3-coins-label">Kuh-Münzen:</span>
                    <strong id="cb3CoinsVal">${coins}</strong>
                </div>
                <button type="button" class="cb3-mode-toggle" id="cb3ModeToggle" onclick="cb3ToggleBuildMode()">
                    <span class="cb3-mode-icon">🔨</span>
                    <span class="cb3-mode-label">Baumodus aktivieren</span>
                </button>
                <div class="cb3-controls-hint cb3-hint-build">
                    <span><strong>Klick</strong> bauen</span>
                    <span><strong>Rechtsklick</strong> abreißen</span>
                    <span><strong>Maus ziehen</strong> drehen</span>
                    <span><strong>Scrollen</strong> zoomen</span>
                    <span><strong>Pfeiltasten/WASD</strong> bewegen</span>
                    <span><strong>ESC</strong> Block loslassen</span>
                </div>
                <div class="cb3-controls-hint cb3-hint-view">
                    <span><strong>Maus ziehen</strong> drehen</span>
                    <span><strong>Scrollen</strong> zoomen</span>
                    <span><strong>Pfeiltasten/WASD</strong> bewegen</span>
                </div>
            </div>
            <div class="cb3-main">
                <div class="cb3-side cb3-side-left">
                    <h3 class="cb3-side-title">Inventar</h3>
                    <div class="cb3-inventory" id="cb3Inventory"></div>
                </div>
                <div class="cb3-canvas-wrap" id="cb3CanvasWrap">
                    <canvas id="cb3Canvas"></canvas>
                    <div class="cb3-status" id="cb3Status"></div>
                </div>
                <div class="cb3-side cb3-side-right">
                    <h3 class="cb3-side-title">Shop</h3>
                    <div class="cb3-shop" id="cb3Shop"></div>
                </div>
            </div>
        </div>
    `;
    cb3ApplyModeClass();
}

function cb3ApplyModeClass() {
    const wrapper = document.getElementById('cb3Wrapper');
    if (!wrapper) return;
    wrapper.classList.toggle('cb3-build-on', _buildMode);
    const lbl = document.querySelector('#cb3ModeToggle .cb3-mode-label');
    const icon = document.querySelector('#cb3ModeToggle .cb3-mode-icon');
    if (lbl) lbl.textContent = _buildMode ? 'Baumodus verlassen' : 'Baumodus aktivieren';
    if (icon) icon.textContent = _buildMode ? '👁️' : '🔨';
    if (_gridHelper) _gridHelper.visible = _buildMode;
    if (_ghostMesh) _ghostMesh.visible = _buildMode && !!_selectedType;
}

function cb3ToggleBuildMode() {
    _buildMode = !_buildMode;
    if (!_buildMode) _selectedType = null;
    cb3ApplyModeClass();
    if (typeof cb3UpdateUI === 'function') cb3UpdateUI();
}

function cb3Cleanup() {
    if (_animFrameId) { cancelAnimationFrame(_animFrameId); _animFrameId = null; }
    if (_resizeHandler) { window.removeEventListener('resize', _resizeHandler); _resizeHandler = null; }
    _eventCleanup.forEach(fn => { try { fn(); } catch (e) {} });
    _eventCleanup = [];
    if (_controls) { _controls.dispose(); _controls = null; }
    if (_renderer) { _renderer.dispose(); _renderer = null; }
    if (_blockGeo) { _blockGeo.dispose(); _blockGeo = null; }
    Object.values(_materials).forEach(m => { try { if (m.map) m.map.dispose(); m.dispose(); } catch (e) {} });
    _scene = null;
    _camera = null;
    _materials = {};
    _gridHelper = null;
    _buildMode = false;
}

// ─────────────────────── 3D-SZENE ─────────────────────────────────

function cb3SetupScene() {
    const canvas = document.getElementById('cb3Canvas');
    const wrap = document.getElementById('cb3CanvasWrap');
    if (!canvas || !wrap) return;

    const w = wrap.clientWidth;
    const h = wrap.clientHeight;

    _renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    _renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    _renderer.setSize(w, h);
    _renderer.shadowMap.enabled = true;
    _renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    _scene = new THREE.Scene();
    _scene.background = cb3CreateSkyTexture();
    // Sanfter, weiter Fog — keine trübe Suppe mehr
    _scene.fog = new THREE.Fog(0xdbeaf5, 60, 140);

    // Vogelperspektive: leicht schräg von oben/Seite
    _camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 200);
    _camera.position.set(GRID_SIZE * 1.0, GRID_SIZE * 1.1, GRID_SIZE * 1.4);

    _controls = new OrbitControls(_camera, canvas);
    _controls.target.set(GRID_SIZE / 2, 2, GRID_SIZE / 2);
    _controls.enableDamping = true;
    _controls.dampingFactor = 0.08;
    _controls.minDistance = 8;
    _controls.maxDistance = 80;
    _controls.maxPolarAngle = Math.PI / 2 - 0.05;
    _controls.update();

    try { cb3SetupLights(); }     catch (e) { console.error('[Burg] Lichter fehlgeschlagen:', e); }
    try { cb3CreatePlateau(); }   catch (e) { console.error('[Burg] Plateau fehlgeschlagen:', e); }
    try { cb3CreateGrid(); }      catch (e) { console.error('[Burg] Grid fehlgeschlagen:', e); }
    try { cb3CreateSurroundings(); } catch (e) { console.error('[Burg] Atmosphäre fehlgeschlagen:', e); }
    try { cb3CreateGhost(); }     catch (e) { console.error('[Burg] Geistblock fehlgeschlagen:', e); }

    _raycaster = new THREE.Raycaster();
    _mouse = new THREE.Vector2(-10, -10);

    cb3BindEvents(canvas, wrap);
}

function cb3BindEvents(canvas, wrap) {
    const onDown = (e) => {
        _mouseDownPos = { x: e.clientX, y: e.clientY, button: e.button };
    };
    const onUp = (e) => {
        if (!_mouseDownPos || _mouseDownPos.button !== e.button) { _mouseDownPos = null; return; }
        const dx = e.clientX - _mouseDownPos.x;
        const dy = e.clientY - _mouseDownPos.y;
        const moved = (dx * dx + dy * dy) > 25; // > 5 px = Drag
        _mouseDownPos = null;
        if (moved) return;
        if (e.button === 0) cb3OnClick(e);
        else if (e.button === 2) cb3OnContextMenu(e);
    };
    const onMove = (e) => cb3OnMouseMove(e);
    const onCtx = (e) => e.preventDefault();
    const onLeave = () => cb3HideGhost();

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('contextmenu', onCtx);
    canvas.addEventListener('mouseleave', onLeave);

    // Tastatur: Pfeiltasten/WASD = Kamera + ESC = Block-Auswahl aufheben
    const onKey = (e) => {
        const castle = document.getElementById('castle');
        if (!castle || !castle.classList.contains('active')) return;
        if (!_camera || !_controls) return;
        const tag = document.activeElement && document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        // ESC: Block-Auswahl loslassen
        if (e.key === 'Escape') {
            if (_selectedType) {
                _selectedType = null;
                cb3HideGhost();
                cb3UpdateUI();
                // success/info Toast stummgeschaltet wie gewünscht
                e.preventDefault();
            }
            return;
        }
        const speed = 0.8;
        const forward = new THREE.Vector3();
        _camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        const right = new THREE.Vector3();
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
        let move = new THREE.Vector3();
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') move.add(forward.clone().multiplyScalar(speed));
        else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') move.add(forward.clone().multiplyScalar(-speed));
        else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') move.add(right.clone().multiplyScalar(-speed));
        else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') move.add(right.clone().multiplyScalar(speed));
        if (move.length() > 0) {
            _camera.position.add(move);
            _controls.target.add(move);
            e.preventDefault();
        }
    };
    window.addEventListener('keydown', onKey);

    _eventCleanup.push(() => canvas.removeEventListener('mousedown', onDown));
    _eventCleanup.push(() => canvas.removeEventListener('mouseup', onUp));
    _eventCleanup.push(() => canvas.removeEventListener('mousemove', onMove));
    _eventCleanup.push(() => canvas.removeEventListener('contextmenu', onCtx));
    _eventCleanup.push(() => canvas.removeEventListener('mouseleave', onLeave));
    _eventCleanup.push(() => window.removeEventListener('keydown', onKey));

    _resizeHandler = () => {
        if (!_renderer || !_camera || !wrap) return;
        const w2 = wrap.clientWidth, h2 = wrap.clientHeight;
        if (w2 < 1 || h2 < 1) return;
        _renderer.setSize(w2, h2);
        _camera.aspect = w2 / h2;
        _camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', _resizeHandler);
    // Auch bei Sidebar-Toggle / Layout-Wechseln (kein Window-Resize) Canvas-Größe nachziehen
    if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => _resizeHandler());
        ro.observe(wrap);
        _eventCleanup.push(() => ro.disconnect());
    }
}

function cb3CreateSkyTexture() {
    // Hellerer, freundlicher Himmel — Pastell-Blau
    const c = document.createElement('canvas');
    c.width = 4; c.height = 256;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#6cb4e8');     // helles Himmelblau oben
    grad.addColorStop(0.5, '#a9d4f2');   // weicher Übergang
    grad.addColorStop(1, '#eaf5ff');     // fast weiß am Horizont
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 4, 256);
    return new THREE.CanvasTexture(c);
}

function cb3SetupLights() {
    // Hellere Beleuchtung — Sonniger-Tag-Atmosphäre
    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    _scene.add(ambient);

    const hemi = new THREE.HemisphereLight(0xa9d4f2, 0x6ca858, 0.7);
    _scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xfff8e0, 1.25);
    sun.position.set(GRID_SIZE * 0.7, GRID_SIZE * 1.5, GRID_SIZE * 0.3);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    const d = GRID_SIZE * 1.3;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 80;
    sun.shadow.bias = -0.001;
    _scene.add(sun);
}

function cb3CreatePlateau() {
    // Das Plateau (Wiese) — hier wird gebaut, gleiche Farbe wie Außenwiese
    const groundGeo = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE);
    const grassTex = cb3MakeGrassTexture(false);  // selbe Farbe wie drumherum
    const groundMat = new THREE.MeshLambertMaterial({ map: grassTex });
    _plateau = new THREE.Mesh(groundGeo, groundMat);
    _plateau.rotation.x = -Math.PI / 2;
    _plateau.position.set(GRID_SIZE / 2, 0, GRID_SIZE / 2);
    _plateau.receiveShadow = true;
    _plateau.userData.isPlateau = true;
    _scene.add(_plateau);

    // Erweiterte Außenwiese — etwas dunkleres Grün (zur Unterscheidung vom Plateau)
    const wideGeo = new THREE.PlaneGeometry(GRID_SIZE * 5, GRID_SIZE * 5);
    const wideTex = cb3MakeGrassTexture(false);  // normales/dunkleres Grün
    wideTex.repeat.set(10, 10);
    const wideMat = new THREE.MeshLambertMaterial({ map: wideTex });
    const wide = new THREE.Mesh(wideGeo, wideMat);
    wide.rotation.x = -Math.PI / 2;
    // Minimal unter dem Plateau, damit kein Z-Flackern
    wide.position.set(GRID_SIZE / 2, -0.005, GRID_SIZE / 2);
    wide.receiveShadow = true;
    _scene.add(wide);
    // (Steinkante entfernt — wirkt freundlicher ohne harte schwarze Umrandung)
}

function cb3MakeGrassTexture(light) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 256;
    const ctx = c.getContext('2d');
    if (light) {
        // Helles, saftiges Frühlings-Grün für das Bauplateau
        ctx.fillStyle = '#9adf6e';
        ctx.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 1200; i++) {
            const x = Math.random() * 256, y = Math.random() * 256;
            const s = 1 + Math.random() * 3;
            ctx.fillStyle = Math.random() > 0.5
                ? `rgba(200,240,170,${0.25 + Math.random() * 0.4})`  // sehr helle Highlights
                : `rgba(110,165,80,${0.15 + Math.random() * 0.25})`; // sanfte Schatten
            ctx.fillRect(x, y, s, s);
        }
    } else {
        // Dunkleres Standardgrün für die Außenwiese
        ctx.fillStyle = '#5e9e4a';
        ctx.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 1200; i++) {
            const x = Math.random() * 256, y = Math.random() * 256;
            const s = 1 + Math.random() * 3;
            ctx.fillStyle = Math.random() > 0.5
                ? `rgba(120,180,80,${0.2 + Math.random() * 0.4})`
                : `rgba(40,80,30,${0.15 + Math.random() * 0.25})`;
            ctx.fillRect(x, y, s, s);
        }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    return tex;
}

function cb3CreateGrid() {
    // Karolinien als deutlicher Kontrast — weiß mit hoher Opacity
    const grid = new THREE.GridHelper(GRID_SIZE, GRID_SIZE, 0xffffff, 0xffffff);
    grid.position.set(GRID_SIZE / 2, 0.015, GRID_SIZE / 2);
    grid.material.opacity = 0.45;
    grid.material.transparent = true;
    grid.visible = _buildMode; // nur im Baumodus sichtbar
    _gridHelper = grid;
    _scene.add(grid);
}

function cb3CreateSurroundings() {
    const cx = GRID_SIZE / 2, cz = GRID_SIZE / 2;

    // === Filter-Hilfsfunktionen (zuerst definiert!) ===
    const LAND_Z_LIMIT = GRID_SIZE * 1.0;     // ab Plateau-Ende beginnt Strand → kein Grün
    const isLandPosition = (x, z) => {
        if (z >= LAND_Z_LIMIT) return false;
        if (x > GRID_SIZE * 1.0) return false;
        return true;
    };
    const isOnPlateau = (x, z) => x >= 0 && x <= GRID_SIZE && z >= 0 && z <= GRID_SIZE;

    // ☀️ SONNE (am Himmel, unbeeinflusst von Beleuchtung)
    const sunGeo = new THREE.SphereGeometry(3.5, 24, 16);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfff4a0 });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.set(cx + 30, 35, cz - 50);
    _scene.add(sun);
    // Sonnen-Halo (etwas größer, gelblich-weiß)
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xfff8c8, transparent: true, opacity: 0.35 });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(5, 16, 12), haloMat);
    halo.position.copy(sun.position);
    _scene.add(halo);
    // Wolken
    for (let i = 0; i < 6; i++) {
        const cloudGrp = new THREE.Group();
        const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
        for (let j = 0; j < 4; j++) {
            const c = new THREE.Mesh(new THREE.BoxGeometry(2 + Math.random() * 2, 1, 1.5 + Math.random()), cloudMat);
            c.position.set((Math.random() - 0.5) * 4, Math.random() * 0.5, (Math.random() - 0.5) * 2);
            cloudGrp.add(c);
        }
        const ang = Math.random() * Math.PI * 2;
        const dist = GRID_SIZE * 1.5 + Math.random() * GRID_SIZE;
        cloudGrp.position.set(cx + Math.cos(ang) * dist, 25 + Math.random() * 8, cz + Math.sin(ang) * dist);
        _scene.add(cloudGrp);
    }

    // 🌲 WALD (Norden, z < 0) — deutlich dichter besetzt
    for (let i = 0; i < 180; i++) {
        const x = cx + (Math.random() - 0.5) * GRID_SIZE * 4;
        const z = -2 - Math.random() * GRID_SIZE * 2.6;
        if (!isLandPosition(x, z)) continue;
        const tree = cb3MakeTree();
        tree.position.set(x, 0, z);
        const sc = 0.9 + Math.random() * 0.7;
        tree.scale.set(sc, sc * (0.9 + Math.random() * 0.3), sc);
        _scene.add(tree);
    }

    // 🌊 MEER (Süden)
    const oceanGeo = new THREE.PlaneGeometry(GRID_SIZE * 6, GRID_SIZE * 3);
    const oceanCanvas = document.createElement('canvas');
    oceanCanvas.width = 64; oceanCanvas.height = 64;
    const oc = oceanCanvas.getContext('2d');
    oc.imageSmoothingEnabled = false;
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
        const v = (x * 7 + y * 11) % 11;
        const colors = ['#2c6db0', '#3a7ec0', '#4a8fd0', '#5fa0e0'];
        oc.fillStyle = colors[v % 4];
        oc.fillRect(x * 4, y * 4, 4, 4);
    }
    const oceanTex = new THREE.CanvasTexture(oceanCanvas);
    oceanTex.wrapS = oceanTex.wrapT = THREE.RepeatWrapping;
    oceanTex.repeat.set(20, 10);
    oceanTex.magFilter = THREE.NearestFilter;
    oceanTex.minFilter = THREE.NearestFilter;
    const oceanMat = new THREE.MeshLambertMaterial({ map: oceanTex });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.rotation.x = -Math.PI / 2;
    // Meer leicht über der Außenwiese (-0.005), aber unter dem Plateau (0)
    // → kein grüner Streifen mehr zwischen Strand und Meer
    ocean.position.set(cx, -0.002, GRID_SIZE * 3.0);
    _scene.add(ocean);
    _atmosphereOceanTex = oceanTex;
    // Sandstrand — direkt am Plateau-Rand, geht bis zum Meer (kein Grün dazwischen)
    const beachGeo = new THREE.PlaneGeometry(GRID_SIZE * 4, GRID_SIZE * 0.5);
    const beachCanvas = document.createElement('canvas');
    beachCanvas.width = 32; beachCanvas.height = 32;
    const bc = beachCanvas.getContext('2d');
    bc.fillStyle = '#e8d29c';
    bc.fillRect(0, 0, 32, 32);
    for (let i = 0; i < 80; i++) {
        bc.fillStyle = Math.random() > 0.5 ? 'rgba(220,200,150,0.8)' : 'rgba(180,160,120,0.6)';
        bc.fillRect(Math.random() * 32, Math.random() * 32, 1 + Math.random() * 2, 1);
    }
    const beachTex = new THREE.CanvasTexture(beachCanvas);
    beachTex.wrapS = beachTex.wrapT = THREE.RepeatWrapping;
    beachTex.repeat.set(8, 2);
    const beachMat = new THREE.MeshLambertMaterial({ map: beachTex });
    const beach = new THREE.Mesh(beachGeo, beachMat);
    beach.rotation.x = -Math.PI / 2;
    // Strand bei z = 1.0..1.5 GRID_SIZE → direkt nach Plateau, direkt vor Meer
    beach.position.set(cx, 0.005, GRID_SIZE * 1.25);
    beach.receiveShadow = true;
    _scene.add(beach);
    // Ein paar Muscheln/Steinchen am Strand
    for (let i = 0; i < 10; i++) {
        const s = new THREE.Mesh(
            new THREE.SphereGeometry(0.08 + Math.random() * 0.05, 5, 4),
            new THREE.MeshLambertMaterial({ color: Math.random() > 0.5 ? 0xc8c0a0 : 0xe0d0b0 })
        );
        // Auf dem Strand-Bereich (z = 1.0 bis 1.5 GRID_SIZE)
        s.position.set(cx + (Math.random() - 0.5) * GRID_SIZE * 3, 0.01, GRID_SIZE * (1.05 + Math.random() * 0.4));
        s.scale.y = 0.5;
        _scene.add(s);
    }

    // ⛰️ BERGE (Osten, x deutlich hinter dem Plateau — kein Overlap mit Bauplatz)
    for (let i = 0; i < 6; i++) {
        const mtnH = GRID_SIZE * (0.55 + Math.random() * 0.7);
        const mtnR = GRID_SIZE * (0.4 + Math.random() * 0.3);
        const mtnGeo = new THREE.ConeGeometry(mtnR, mtnH, 6);
        const mtnMat = new THREE.MeshLambertMaterial({ color: 0x6a5a4a });
        const mtn = new THREE.Mesh(mtnGeo, mtnMat);
        // Mindestabstand vergrößert (+4.5), um Überlappung mit dem Bauplatz sicher zu verhindern
        const baseX = GRID_SIZE + mtnR + 4.5 + Math.random() * GRID_SIZE * 0.5;
        mtn.position.set(baseX, mtnH / 2 - 0.5, cz + (i - 2.5) * GRID_SIZE * 0.45);
        mtn.rotation.y = Math.random() * Math.PI;
        _scene.add(mtn);
        // Schneekuppe oben
        if (mtnH > GRID_SIZE * 0.7) {
            const snowGeo = new THREE.ConeGeometry(mtnR * 0.4, mtnH * 0.3, 6);
            const snowMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
            const snow = new THREE.Mesh(snowGeo, snowMat);
            snow.position.copy(mtn.position);
            snow.position.y = mtn.position.y + mtnH * 0.35;
            snow.rotation.y = mtn.rotation.y;
            _scene.add(snow);
        }
    }
    // Hügel-Vorland Richtung Berge — komplett östlich des Plateaus
    for (let i = 0; i < 15; i++) {
        const hillR = GRID_SIZE * 0.12;
        const hillGeo = new THREE.SphereGeometry(hillR, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2);
        const hillMat = new THREE.MeshLambertMaterial({ color: 0x4a7a3e });
        const hill = new THREE.Mesh(hillGeo, hillMat);
        // Mindestabstand vergrößert (+3.5), um Überlappung mit dem Bauplatz sicher zu verhindern
        const hx = GRID_SIZE + hillR + 3.5 + Math.random() * GRID_SIZE * 0.5;
        hill.position.set(hx, -0.2, cz + (Math.random() - 0.5) * GRID_SIZE * 2);
        hill.scale.y = 0.4 + Math.random() * 0.5;
        _scene.add(hill);
    }

    // 🏘️ DORF (Westen, x < 0) — strikt im West-Wiesenbereich
    for (let i = 0; i < 5; i++) {
        const offsetX = -GRID_SIZE * 0.4 - Math.random() * GRID_SIZE * 0.7;
        const offsetZ = (i - 2) * GRID_SIZE * 0.25 + (Math.random() - 0.5) * 2;
        const x = offsetX;
        const z = cz + offsetZ;
        if (!isLandPosition(x, z)) continue;
        const house = cb3MakeVillageHouse();
        house.position.set(x, 0, z);
        house.rotation.y = (Math.random() - 0.5) * 0.5;
        _scene.add(house);
    }
    // Brunnen im Dorf-Zentrum
    const wellGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 8);
    const wellMat = new THREE.MeshLambertMaterial({ color: 0x6e6e6e });
    const well = new THREE.Mesh(wellGeo, wellMat);
    well.position.set(-GRID_SIZE * 0.5, 0.2, cz);
    _scene.add(well);

    // 🌸 ATMOSPHÄRE-BLUMEN (verstreut auf dem Gras drumherum)
    for (let i = 0; i < 130; i++) {
        let x, z, ok = false;
        for (let attempt = 0; attempt < 8; attempt++) {
            const ang = Math.random() * Math.PI * 2;
            const dist = GRID_SIZE * 0.6 + Math.random() * GRID_SIZE * 1.0;
            x = cx + Math.cos(ang) * dist;
            z = cz + Math.sin(ang) * dist;
            if (isOnPlateau(x, z)) continue;
            if (!isLandPosition(x, z)) continue;
            ok = true; break;
        }
        if (!ok) continue;
        const fl = cb3MakeAtmosphereFlower();
        fl.position.set(x, 0, z);
        _scene.add(fl);
    }

    // Zusätzlich Bäume vor dem Plateau (West-Halbkreis, nur Land)
    for (let i = 0; i < 14; i++) {
        const ang = Math.PI + (Math.random() - 0.5) * Math.PI * 0.5;
        const dist = GRID_SIZE * 0.7 + Math.random() * GRID_SIZE * 0.4;
        const x = cx + Math.cos(ang) * dist;
        const z = cz + Math.sin(ang) * dist;
        if (isOnPlateau(x, z)) continue;
        if (!isLandPosition(x, z)) continue;
        const tree = cb3MakeTree();
        tree.position.set(x, 0, z);
        const sc = 0.7 + Math.random() * 0.4;
        tree.scale.set(sc, sc, sc);
        _scene.add(tree);
    }
}

function cb3MakeVillageHouse() {
    const grp = new THREE.Group();
    const w = 1.6 + Math.random() * 1.2;
    const d = 1.6 + Math.random() * 0.8;
    const h = 1.6 + Math.random() * 0.5;
    // Wand-Material: Sandsteinfarbe oder hell-Holz
    const wallColors = [0xc9b78c, 0xd4b483, 0xb89968];
    const wallColor = wallColors[Math.floor(Math.random() * wallColors.length)];
    const wallMat = new THREE.MeshLambertMaterial({ color: wallColor });
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
    body.position.y = h / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    grp.add(body);
    // Holzbalken-Akzente (Fachwerk-Look)
    const beamMat = new THREE.MeshLambertMaterial({ color: 0x4a3018 });
    const beamH = new THREE.Mesh(new THREE.BoxGeometry(w + 0.05, 0.12, 0.04), beamMat);
    beamH.position.set(0, h * 0.55, d / 2 + 0.03);
    grp.add(beamH);
    const beamH2 = beamH.clone(); beamH2.position.z = -d / 2 - 0.03; grp.add(beamH2);
    // Dach (Pyramide)
    const roofColors = [0x7a3020, 0x8a3428, 0x6a2a1a];
    const roofMat = new THREE.MeshLambertMaterial({ color: roofColors[Math.floor(Math.random() * roofColors.length)] });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.75, 0.9, 4), roofMat);
    roof.position.y = h + 0.45;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    grp.add(roof);
    // Tür
    const doorMat = new THREE.MeshLambertMaterial({ color: 0x4a2818 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.6, 0.04), doorMat);
    door.position.set(0, 0.3, d / 2 + 0.022);
    grp.add(door);
    // Fenster
    const winMat = new THREE.MeshLambertMaterial({ color: 0x88ddff, emissive: 0x445566, emissiveIntensity: 0.3 });
    const winL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.03), winMat);
    winL.position.set(-w / 2 + 0.3, h * 0.6, d / 2 + 0.02);
    grp.add(winL);
    const winR = winL.clone(); winR.position.x = w / 2 - 0.3; grp.add(winR);
    return grp;
}

function cb3MakeAtmosphereFlower() {
    const colors = [0xff5577, 0xffaa33, 0xffffff, 0xff3344, 0x9a55cc, 0xffe066];
    const c = colors[Math.floor(Math.random() * colors.length)];
    const grp = new THREE.Group();
    const stem = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.25 + Math.random() * 0.15, 0.05),
        new THREE.MeshLambertMaterial({ color: 0x3a7a35 })
    );
    stem.position.y = stem.geometry.parameters.height / 2;
    grp.add(stem);
    const petalSize = 0.12 + Math.random() * 0.06;
    const petal = new THREE.Mesh(
        new THREE.BoxGeometry(petalSize, petalSize, petalSize),
        new THREE.MeshLambertMaterial({ color: c })
    );
    petal.position.y = stem.geometry.parameters.height + 0.04;
    grp.add(petal);
    return grp;
}

function cb3CreateTorchMesh(wall) {
    // 3D-Fackel — Boden- oder Wand-Variante (Minecraft-Style)
    const grp = new THREE.Group();
    grp.userData.isTorch = true;

    const isWall = wall && (wall.x !== 0 || wall.z !== 0);

    // Inneres Group, dessen Origin am Stiel-Boden liegt (für saubere Rotation)
    const inner = new THREE.Group();

    // Holzstiel
    const stick = new THREE.Mesh(
        new THREE.BoxGeometry(2/16, 10/16, 2/16),
        new THREE.MeshLambertMaterial({ color: 0x6b3f1c })
    );
    stick.position.y = 5/16;  // Stiel-Mitte
    stick.castShadow = true;
    inner.add(stick);

    // Flamme (3 Schichten)
    const flameOuter = new THREE.Mesh(
        new THREE.BoxGeometry(5/16, 4/16, 5/16),
        new THREE.MeshBasicMaterial({ color: 0xff7800, transparent: true, opacity: 0.9 })
    );
    flameOuter.position.y = 12/16;
    inner.add(flameOuter);

    const flameMid = new THREE.Mesh(
        new THREE.BoxGeometry(3/16, 4/16, 3/16),
        new THREE.MeshBasicMaterial({ color: 0xffb030 })
    );
    flameMid.position.y = 13/16;
    inner.add(flameMid);

    const flameCore = new THREE.Mesh(
        new THREE.BoxGeometry(1.5/16, 4/16, 1.5/16),
        new THREE.MeshBasicMaterial({ color: 0xfff0a0 })
    );
    flameCore.position.y = 14/16;
    inner.add(flameCore);

    if (isWall) {
        // Wand-Fackel: Pivot nahe der Wand, schräg gekippt nach oben weg von der Wand
        const angle = Math.PI / 7; // ~25°
        if (wall.x !== 0) inner.rotation.z = -wall.x * angle;
        else if (wall.z !== 0) inner.rotation.x = wall.z * angle;
        // Pivot-Position: nahe der Wand des angeklickten Block-Slots
        // Group-origin ist Slot-Center, Wand also bei (±0.5, 0, 0) oder (0, 0, ±0.5)
        // Stiel soll bei der Wand stehen, also Pivot dort
        inner.position.set(-wall.x * 0.42, -0.15, -wall.z * 0.42);
        grp.userData.isWallTorch = true;
        grp.userData.wall = { x: wall.x, y: 0, z: wall.z };
    } else {
        // Boden-Fackel: zentral, Basis am Slot-Boden
        inner.position.set(0, -0.5, 0);
    }

    grp.add(inner);
    grp.userData.flameMid = flameMid;
    return grp;
}

function cb3CreateBannerMesh(wall) {
    // 3D-Banner: Holzstange oben + senkrecht hängende Stoffbahn (DoubleSide)
    const grp = new THREE.Group();
    grp.userData.isBanner = true;
    const isWall = wall && (wall.x !== 0 || wall.z !== 0);

    // Holzstange (horizontal über die Block-Breite, dunkles Holz)
    const pole = new THREE.Mesh(
        new THREE.BoxGeometry(14/16, 1.5/16, 1.5/16),
        new THREE.MeshLambertMaterial({ color: 0x4a3018 })
    );
    pole.position.y = 7/16;
    pole.castShadow = true;
    grp.add(pole);

    // Aufhänger-Stäbchen an den Enden
    const hangerMat = new THREE.MeshLambertMaterial({ color: 0x4a3018 });
    const hangerL = new THREE.Mesh(new THREE.BoxGeometry(1/16, 3/16, 1/16), hangerMat);
    hangerL.position.set(-5/16, 5/16, 0);
    grp.add(hangerL);
    const hangerR = new THREE.Mesh(new THREE.BoxGeometry(1/16, 3/16, 1/16), hangerMat);
    hangerR.position.set(5/16, 5/16, 0);
    grp.add(hangerR);

    // Stoffbahn (PlaneGeometry mit DoubleSide, Banner-Textur mit V-Schnitt)
    const def = CB3_BLOCKS.find(b => b.id === 'banner');
    const tex = cb3MakeBlockTexture(def);
    const clothMat = new THREE.MeshLambertMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.5,
        side: THREE.DoubleSide
    });
    const cloth = new THREE.Mesh(
        new THREE.PlaneGeometry(12/16, 14/16),
        clothMat
    );
    cloth.position.y = -1/16;
    cloth.castShadow = false;
    grp.add(cloth);

    if (isWall) {
        // An die Wand drehen + verschieben
        if (wall.x === 1)       grp.rotation.y = -Math.PI / 2;
        else if (wall.x === -1) grp.rotation.y = Math.PI / 2;
        else if (wall.z === -1) grp.rotation.y = Math.PI;
        // Nach hinten an die Wand drücken (Pivot ist Group-Center)
        grp.position.x = -wall.x * 0.42;
        grp.position.z = -wall.z * 0.42;
        grp.userData.wall = { x: wall.x, y: 0, z: wall.z };
    }

    return grp;
}

function cb3MakeTree() {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.22, 1.4, 6),
        new THREE.MeshLambertMaterial({ color: 0x6b3d1a })
    );
    trunk.position.y = 0.7;
    trunk.castShadow = true;
    g.add(trunk);
    const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 8, 6),
        new THREE.MeshLambertMaterial({ color: 0x2a7a35 })
    );
    leaves.position.y = 1.85;
    leaves.castShadow = true;
    g.add(leaves);
    return g;
}

function cb3CreateBuildableTree() {
    // 3D-Baum als Block: Stamm (Box) + zwei Blattkugeln, passt in 1×1×1 Slot
    const grp = new THREE.Group();
    grp.userData.isTree = true;
    const trunk = new THREE.Mesh(
        new THREE.BoxGeometry(4/16, 14/16, 4/16),
        new THREE.MeshLambertMaterial({ color: 0x6b3d1a })
    );
    trunk.position.y = -0.05;
    trunk.castShadow = true;
    grp.add(trunk);
    // Blätter (Kubische Krone — Minecraft-Stil)
    const leaves1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, 0.45, 0.85),
        new THREE.MeshLambertMaterial({ color: 0x2a7a35 })
    );
    leaves1.position.y = 0.35;
    leaves1.castShadow = true;
    grp.add(leaves1);
    return grp;
}

function cb3CreateFlowerMesh() {
    // Cross-Plane (zwei gekreuzte Planes) für 3D-Effekt von allen Seiten
    const grp = new THREE.Group();
    grp.userData.isFlower = true;
    const def = CB3_BLOCKS.find(b => b.id === 'blume');
    const tex = cb3MakeBlockTexture(def);
    const mat = new THREE.MeshLambertMaterial({
        map: tex, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide
    });
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), mat);
    p1.position.y = -0.05;
    grp.add(p1);
    const p2 = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), mat);
    p2.position.y = -0.05;
    p2.rotation.y = Math.PI / 2;
    grp.add(p2);
    return grp;
}

function cb3CreateStairMesh(stairBaseTexture, wall) {
    // Treppe: untere volle Hälfte + obere hintere Hälfte (L-Querschnitt)
    // Konvention: `wall` gibt die Richtung an, in der die OBERE Stufe liegt.
    //   wall.z = +1 → obere Stufe an +z   (Default: kein Rotate)
    //   wall.z = -1 → obere Stufe an -z   (Rotate π)
    //   wall.x = +1 → obere Stufe an +x   (Rotate -π/2)
    //   wall.x = -1 → obere Stufe an -x   (Rotate +π/2)
    const grp = new THREE.Group();
    grp.userData.isStair = true;
    const baseDef = CB3_BLOCKS.find(b => b.texture === stairBaseTexture);
    if (!baseDef) return grp;
    const mat = cb3GetMaterial(baseDef);

    // Untere Box (volle Breite, halbe Höhe)
    const lower = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 1), mat);
    lower.position.y = -0.25;
    lower.castShadow = true; lower.receiveShadow = true;
    grp.add(lower);
    // Obere Box: voller x, halb in z (Default zeigt nach +z)
    const upper = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 0.5), mat);
    upper.position.set(0, 0.25, 0.25);
    upper.castShadow = true; upper.receiveShadow = true;
    grp.add(upper);

    if (wall) {
        if (wall.x === 1)       grp.rotation.y = Math.PI / 2;  // obere Stufe nach +x
        else if (wall.x === -1) grp.rotation.y = -Math.PI / 2; // obere Stufe nach -x
        else if (wall.z === -1) grp.rotation.y = Math.PI;      // obere Stufe nach -z
        // wall.z === 1 → 0° (default — obere Stufe nach +z)
        grp.userData.wall = { x: wall.x || 0, y: 0, z: wall.z || 0 };
    }
    return grp;
}

function cb3CreateBedMesh(half, color) {
    // half: 'foot' (mit Fußteil-Brett) oder 'head' (mit hohem Kopfteil + Kissen)
    const grp = new THREE.Group();
    grp.userData.isBed = true;
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x6b3f1c });
    const woodLightMat = new THREE.MeshLambertMaterial({ color: 0x8b5a2b });
    const blanketCol = new THREE.Color(color || 0xcc2233);
    const darkColor = blanketCol.clone().multiplyScalar(0.65);
    const blanketMat = new THREE.MeshLambertMaterial({ color: blanketCol });
    const blanketDarkMat = new THREE.MeshLambertMaterial({ color: darkColor });
    const pillowMat = new THREE.MeshLambertMaterial({ color: 0xf5f5f5 });

    // Solides Holzgestell — wir überlappen leicht (1.02 statt 1.0) und verschieben um 0.01
    // um Z-Fighting und gapping Linien an der Verbindungsstelle komplett zu vermeiden
    const frameDepth = 1.02;
    const frameZ = half === 'head' ? 0.01 : -0.01;

    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.32, frameDepth), woodMat);
    frame.position.set(0, -0.34, frameZ);
    frame.castShadow = true; frame.receiveShadow = true;
    grp.add(frame);

    // Bettdecke
    const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.18, frameDepth), blanketMat);
    blanket.position.set(0, -0.09, frameZ);
    grp.add(blanket);

    // Dunklere Decken-Naht NUR an Außenseite (head: hinten, foot: vorne)
    const blanketEdge = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.2, 0.05),
        blanketDarkMat
    );
    blanketEdge.position.set(0, -0.08, half === 'head' ? -0.475 + frameZ : 0.475 + frameZ);
    grp.add(blanketEdge);

    if (half === 'head') {
        // HOHES KOPFTEIL-BRETT (charakteristisches Bett-Element)
        const headBoard = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.7, 0.1), woodLightMat);
        headBoard.position.set(0, 0.18, -0.45 + frameZ);
        headBoard.castShadow = true;
        grp.add(headBoard);
        // Holzverzierung an den Ecken
        const ornL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.13, 0.13), woodMat);
        ornL.position.set(-0.4, 0.55, -0.45 + frameZ);
        grp.add(ornL);
        const ornR = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.13, 0.13), woodMat);
        ornR.position.set(0.4, 0.55, -0.45 + frameZ);
        grp.add(ornR);
        // Großes Kopfkissen
        const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.16, 0.32), pillowMat);
        pillow.position.set(0, 0.05, -0.28 + frameZ);
        grp.add(pillow);
    } else {
        // NIEDRIGERES FUSSTEIL-BRETT
        const footBoard = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.32, 0.1), woodLightMat);
        footBoard.position.set(0, 0.0, 0.45 + frameZ);
        footBoard.castShadow = true;
        grp.add(footBoard);
        // Decken-Falten am Fußende
        for (let i = 0; i < 2; i++) {
            const stripe = new THREE.Mesh(
                new THREE.BoxGeometry(0.92, 0.008, 0.04),
                blanketDarkMat
            );
            stripe.position.set(0, 0.005, 0.05 + i * 0.18 + frameZ);
            grp.add(stripe);
        }
    }
    return grp;
}

function cb3CreateDoorMesh(variant) {
    // Schmaler Tür-Mesh: 14×16×3 Pixel (statt voller Würfel)
    const grp = new THREE.Group();
    grp.userData.isDoor = true;
    const def = CB3_BLOCKS.find(b => b.id === 'tuer');
    const tex = cb3MakeBlockTexture(def, variant);
    const mat = new THREE.MeshLambertMaterial({
        map: tex, side: THREE.DoubleSide
    });
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(14/16, 1, 3/16),
        mat
    );
    door.castShadow = true;
    door.receiveShadow = true;
    grp.add(door);
    return grp;
}

function cb3CreateAnimalMesh(type) {
    const grp = new THREE.Group();
    grp.userData.isAnimal = true;
    grp.userData.animalType = type;

    const sizes = {
        schaf:   { body: [0.55, 0.45, 0.85], bodyColor: 0xeeeeee, head: [0.4, 0.4, 0.4], headColor: 0x222222, legColor: 0x222222 },
        kuh:     { body: [0.6,  0.55, 0.95], bodyColor: 0x884422, head: [0.4, 0.4, 0.4], headColor: 0x884422, legColor: 0x4a2818 },
        huhn:    { body: [0.35, 0.35, 0.5],  bodyColor: 0xfff5d0, head: [0.25, 0.25, 0.25], headColor: 0xfff5d0, legColor: 0xff8800 },
        pferd:   { body: [0.55, 0.6,  1.05], bodyColor: 0x6e4828, head: [0.32, 0.5, 0.4], headColor: 0x6e4828, legColor: 0x3a2412 },
        schwein: { body: [0.55, 0.45, 0.9],  bodyColor: 0xe89aa0, head: [0.4, 0.35, 0.35], headColor: 0xe89aa0, legColor: 0xc06070 },
    };
    const s = sizes[type] || sizes.schaf;

    const bodyMat = new THREE.MeshLambertMaterial({ color: s.bodyColor });
    const headMat = new THREE.MeshLambertMaterial({ color: s.headColor });
    const legMat = new THREE.MeshLambertMaterial({ color: s.legColor });

    // Körper
    const body = new THREE.Mesh(new THREE.BoxGeometry(...s.body), bodyMat);
    body.position.y = 0.45;
    body.castShadow = true;
    grp.add(body);

    // Kopf
    const head = new THREE.Mesh(new THREE.BoxGeometry(...s.head), headMat);
    head.position.set(0, 0.6, s.body[2] / 2 + s.head[2] / 2);
    head.castShadow = true;
    grp.add(head);

    // Spezielles für Tiere
    if (type === 'huhn') {
        // Schnabel
        const beak = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.1, 0.15),
            new THREE.MeshLambertMaterial({ color: 0xffaa00 })
        );
        beak.position.set(0, 0.6, head.position.z + s.head[2] / 2 + 0.07);
        grp.add(beak);
        // Roter Kamm
        const comb = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.15, 0.2),
            new THREE.MeshLambertMaterial({ color: 0xcc0000 })
        );
        comb.position.set(0, 0.78, head.position.z);
        grp.add(comb);
    } else if (type === 'kuh') {
        // Hörner
        const hornMat = new THREE.MeshLambertMaterial({ color: 0xeeeebb });
        for (const dx of [-0.12, 0.12]) {
            const horn = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.15, 0.06), hornMat);
            horn.position.set(dx, 0.78, head.position.z);
            grp.add(horn);
        }
        const spotMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const spot = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), spotMat);
        spot.position.set(0.18, 0.5, 0.1);
        grp.add(spot);
    } else if (type === 'pferd') {
        // Mähne (dunkler Streifen oben am Körper + Rücken)
        const maneMat = new THREE.MeshLambertMaterial({ color: 0x2a1a0a });
        const mane = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.6), maneMat);
        mane.position.set(0, 0.78, 0.1);
        grp.add(mane);
        // Mähne am Hals/Kopf
        const maneFront = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.55, 0.15), maneMat);
        maneFront.position.set(0, 0.7, head.position.z - s.head[2] / 2 + 0.05);
        grp.add(maneFront);
        // Schwanz
        const tail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.1), maneMat);
        tail.position.set(0, 0.4, -s.body[2] / 2 - 0.05);
        tail.rotation.x = 0.3;
        grp.add(tail);
        // Schnauze (heller)
        const muzzleMat = new THREE.MeshLambertMaterial({ color: 0x4a3018 });
        const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.15), muzzleMat);
        muzzle.position.set(0, 0.55, head.position.z + s.head[2] / 2 + 0.07);
        grp.add(muzzle);
    } else if (type === 'schwein') {
        // Rüssel
        const snoutMat = new THREE.MeshLambertMaterial({ color: 0xc06070 });
        const snout = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.12), snoutMat);
        snout.position.set(0, 0.58, head.position.z + s.head[2] / 2 + 0.06);
        grp.add(snout);
        // Nasenlöcher
        const noseMat = new THREE.MeshBasicMaterial({ color: 0x2a1a1a });
        const nL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.02), noseMat);
        nL.position.set(-0.05, 0.58, head.position.z + s.head[2] / 2 + 0.13);
        grp.add(nL);
        const nR = nL.clone(); nR.position.x = 0.05; grp.add(nR);
        // Ringelschwanz (kleines Stück hinten)
        const tailMat = new THREE.MeshLambertMaterial({ color: 0xc06070 });
        const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 0.08), tailMat);
        tail.position.set(0, 0.55, -s.body[2] / 2 - 0.05);
        tail.rotation.z = 0.5;
        grp.add(tail);
    }

    // Augen (kleine schwarze Boxen)
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), eyeMat);
    eyeL.position.set(-s.head[0] * 0.3, 0.62, head.position.z + s.head[2] / 2 + 0.001);
    grp.add(eyeL);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), eyeMat);
    eyeR.position.set(s.head[0] * 0.3, 0.62, head.position.z + s.head[2] / 2 + 0.001);
    grp.add(eyeR);

    // Huhn hat 2 Beine (typische Hühner-Anatomie), alle anderen 4
    const legs = [];
    const legHeight = 0.35;
    const legW = type === 'huhn' ? 0.08 : 0.13;
    const legGeo = new THREE.BoxGeometry(legW, legHeight, legW);
    const lx = s.body[0] / 2 - legW / 2;
    const lz = s.body[2] / 2 - legW;
    let legPositions;
    if (type === 'huhn') {
        // 2 Beine mittig
        legPositions = [[-lx * 0.5, 0], [lx * 0.5, 0]];
    } else {
        legPositions = [[-lx, lz], [lx, lz], [-lx, -lz], [lx, -lz]];
    }
    legPositions.forEach(([x, z]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(x, 0.18, z);
        leg.castShadow = true;
        grp.add(leg);
        legs.push(leg);
    });
    grp.userData.legs = legs;
    grp.userData.bodyMesh = body;

    return grp;
}

function cb3SpawnAnimal(type, x, z) {
    const mesh = cb3CreateAnimalMesh(type);
    mesh.position.set(x, 0, z);
    _scene.add(mesh);
    _animals.push({
        mesh, type,
        x, z,
        homeX: x, homeZ: z,
        targetX: x, targetZ: z,
        idleUntil: 0,
        legs: mesh.userData.legs
    });
}

function cb3SlotIsBlocked(x, z) {
    // True wenn auf Bodenebene (y=0) ein Block steht — Tiere können dort nicht hin
    if (x < 0 || x >= GRID_SIZE || z < 0 || z >= GRID_SIZE) return true;
    const slotX = Math.floor(x);
    const slotZ = Math.floor(z);
    return _blocks.has(`${slotX},0,${slotZ}`);
}

function cb3UpdateAnimals() {
    const now = Date.now();
    const dt = Math.min((now - _lastAnimalTime) / 1000, 0.05);
    _lastAnimalTime = now;
    const t = now * 0.001;

    _animals.forEach(a => {
        if (a.idleUntil > now) {
            a.legs.forEach(leg => { leg.rotation.x = 0; });
            return;
        }

        const dx = a.targetX - a.x;
        const dz = a.targetZ - a.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist < 0.06) {
            if (Math.random() < 0.4) {
                a.idleUntil = now + 1500 + Math.random() * 3000;
                return;
            }
            cb3PickAnimalTarget(a);
        } else {
            const speed = a.type === 'huhn' ? 1.4 :
                          a.type === 'pferd' ? 1.6 :
                          a.type === 'kuh' ? 0.6 :
                          a.type === 'schwein' ? 0.8 : 0.9;
            const stepX = (dx / dist) * speed * dt;
            const stepZ = (dz / dist) * speed * dt;
            const newX = a.x + stepX;
            const newZ = a.z + stepZ;

            // Kollisionsprüfung — Tier darf NICHT in einen Block-Slot laufen
            const radius = 0.25; // Ausweich-Radius
            const blockedX = cb3SlotIsBlocked(newX + Math.sign(stepX) * radius, a.z);
            const blockedZ = cb3SlotIsBlocked(a.x, newZ + Math.sign(stepZ) * radius);

            if (!blockedX && !blockedZ && !cb3SlotIsBlocked(newX + Math.sign(stepX) * radius, newZ + Math.sign(stepZ) * radius)) {
                a.x = newX;
                a.z = newZ;
            } else if (!blockedX) {
                a.x = newX;
                // Eine Achse blockiert → neues Ziel sofort, aber weiterlaufen erlaubt
                if (Math.random() < 0.05) cb3PickAnimalTarget(a);
            } else if (!blockedZ) {
                a.z = newZ;
                if (Math.random() < 0.05) cb3PickAnimalTarget(a);
            } else {
                // Komplett blockiert → sofort umkehren, neues Ziel im Zurück-Sektor
                cb3PickReverseTarget(a);
                return;
            }

            const bob = Math.abs(Math.sin(t * 8 + a.homeX)) * 0.04;
            a.mesh.position.set(a.x, bob, a.z);
            a.mesh.rotation.y = Math.atan2(stepX, stepZ);
            // Beine animieren
            const swing = Math.sin(t * 12) * 0.6;
            if (a.legs.length === 4) {
                a.legs[0].rotation.x = swing;
                a.legs[1].rotation.x = -swing;
                a.legs[2].rotation.x = -swing;
                a.legs[3].rotation.x = swing;
            } else if (a.legs.length === 2) {
                a.legs[0].rotation.x = swing;
                a.legs[1].rotation.x = -swing;
            }
        }
    });
}

function cb3PickAnimalTarget(a) {
    // Zufallsziel im 5er Radius vom Home, ohne Block-Slot, innerhalb des Plateaus
    for (let attempt = 0; attempt < 16; attempt++) {
        const r = 1.5 + Math.random() * 4;
        const ang = Math.random() * Math.PI * 2;
        const tx = a.homeX + Math.cos(ang) * r;
        const tz = a.homeZ + Math.sin(ang) * r;
        if (tx < 0.5 || tx > GRID_SIZE - 0.5) continue;
        if (tz < 0.5 || tz > GRID_SIZE - 0.5) continue;
        if (cb3SlotIsBlocked(tx, tz)) continue;
        a.targetX = tx;
        a.targetZ = tz;
        return;
    }
    a.idleUntil = Date.now() + 1500;
}

function cb3PickReverseTarget(a) {
    // Bei Wand-Kollision: drehe um 90-180° und such ein neues Ziel in entgegengesetzter Richtung
    const dxCur = a.targetX - a.x;
    const dzCur = a.targetZ - a.z;
    const curAng = Math.atan2(dxCur, dzCur);
    for (let attempt = 0; attempt < 12; attempt++) {
        // Drehung 90° bis 270° gegenüber der aktuellen Richtung
        const turn = (Math.PI / 2) + Math.random() * Math.PI;
        const sign = Math.random() < 0.5 ? 1 : -1;
        const ang = curAng + sign * turn;
        const r = 1.5 + Math.random() * 3;
        const tx = a.x + Math.sin(ang) * r;
        const tz = a.z + Math.cos(ang) * r;
        if (tx < 0.5 || tx > GRID_SIZE - 0.5) continue;
        if (tz < 0.5 || tz > GRID_SIZE - 0.5) continue;
        if (cb3SlotIsBlocked(tx, tz)) continue;
        a.targetX = tx;
        a.targetZ = tz;
        return;
    }
    // Ganz blockiert: kurze Pause
    a.idleUntil = Date.now() + 600;
}

function cb3RemoveAnimal(animal) {
    _scene.remove(animal.mesh);
    const idx = _animals.indexOf(animal);
    if (idx >= 0) _animals.splice(idx, 1);
}

function cb3CreateFenceMesh(connections) {
    // connections: { N:bool, S:bool, E:bool, W:bool } — Querbalken nur zu echten Nachbarn
    const grp = new THREE.Group();
    grp.userData.isFence = true;
    const wood = new THREE.MeshLambertMaterial({ color: 0x8b5a2b });
    const c = connections || { N: false, S: false, E: false, W: false };

    // Pfosten — immer da
    const post = new THREE.Mesh(new THREE.BoxGeometry(4/16, 1, 4/16), wood);
    post.position.y = 0;
    post.castShadow = true;
    grp.add(post);

    // Querbalken — nur halb so lang, von Pfosten-Mitte bis zur Block-Kante
    // Länge = 0.5 (vom Zentrum bis zum Block-Rand)
    const railLen = 0.5;
    const addRail = (dx, dz, lenX, lenZ) => {
        // Oberer Balken
        const railUp = new THREE.Mesh(new THREE.BoxGeometry(lenX, 2/16, lenZ), wood);
        railUp.position.set(dx, 4/16, dz);
        grp.add(railUp);
        // Unterer Balken
        const railLo = new THREE.Mesh(new THREE.BoxGeometry(lenX, 2/16, lenZ), wood);
        railLo.position.set(dx, -2/16, dz);
        grp.add(railLo);
    };
    if (c.E) addRail(+railLen / 2, 0, railLen, 2/16); // nach +X
    if (c.W) addRail(-railLen / 2, 0, railLen, 2/16); // nach -X
    if (c.S) addRail(0, +railLen / 2, 2/16, railLen); // nach +Z
    if (c.N) addRail(0, -railLen / 2, 2/16, railLen); // nach -Z

    return grp;
}

// Hilfsfunktion: Prüft, ob ein Nachbar-Block solide und connectable ist
function cb3IsConnectable(type) {
    if (!type) return false;
    // Blumen, Fackeln, Banner, Wasser und Tiere sind Deko/flüssig und verbinden sich nicht mit Felsen/Zäunen
    const nonConnectable = ['fackel', 'banner', 'blume', 'wasser', 'schaf', 'kuh', 'huhn', 'pferd', 'schwein'];
    return !nonConnectable.includes(type);
}

function cb3GetFenceConnections(x, y, z) {
    const hasNeighbor = (dx, dz) => {
        const b = _blocks.get(`${x + dx},${y},${z + dz}`);
        return b && cb3IsConnectable(b.type);
    };
    return {
        E: hasNeighbor(1, 0),
        W: hasNeighbor(-1, 0),
        S: hasNeighbor(0, 1),
        N: hasNeighbor(0, -1)
    };
}

// ───── Mauer (Minecraft-Wall-Stil): Pfosten + Cap + Verbindungs-Arme ─────
// Schmalerer und eleganterer Look (Pfosten-Dicke 0.35 statt 0.5)
function cb3CreateWallMesh(connections) {
    const grp = new THREE.Group();
    grp.userData.isWall = true;
    const def = CB3_BLOCKS.find(b => b.id === 'zinne');
    const mat = cb3GetMaterial(def);
    const c = connections || { N: false, S: false, E: false, W: false };

    // Zentraler Pfosten: 0.35 × 1 × 0.35
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1, 0.35), mat);
    post.castShadow = true; post.receiveShadow = true;
    grp.add(post);

    // Wenn vollständig isoliert: Top-Kappe (Pfostenkappe) drauf
    const isolated = !c.N && !c.S && !c.E && !c.W;
    if (isolated) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3/16, 0.5), mat);
        cap.position.y = 0.5 - (3/16) / 2; // sitzt oben
        cap.castShadow = true;
        grp.add(cap);
    }

    // Verbindungs-Arme — Pfosten-breit, fast volle Höhe, vom Pfosten bis Block-Rand
    const armHeight = 15/16;
    const armY = -0.5 + armHeight / 2;
    const addArm = (dir) => {
        let arm;
        if (dir === 'N' || dir === 'S') {
            arm = new THREE.Mesh(new THREE.BoxGeometry(0.35, armHeight, 0.325), mat);
            arm.position.set(0, armY, dir === 'N' ? -0.3375 : 0.3375);
        } else {
            arm = new THREE.Mesh(new THREE.BoxGeometry(0.325, armHeight, 0.35), mat);
            arm.position.set(dir === 'E' ? 0.3375 : -0.3375, armY, 0);
        }
        arm.castShadow = true; arm.receiveShadow = true;
        grp.add(arm);
    };
    if (c.N) addArm('N');
    if (c.S) addArm('S');
    if (c.E) addArm('E');
    if (c.W) addArm('W');

    return grp;
}

function cb3GetWallConnections(x, y, z) {
    // Mauer verbindet mit anderer Mauer oder mit einem Vollblock auf gleicher Höhe
    const hasNeighbor = (dx, dz) => {
        const b = _blocks.get(`${x + dx},${y},${z + dz}`);
        return b && cb3IsConnectable(b.type);
    };
    return {
        E: hasNeighbor(1, 0),
        W: hasNeighbor(-1, 0),
        S: hasNeighbor(0, 1),
        N: hasNeighbor(0, -1)
    };
}

function cb3RebuildWall(key) {
    const b = _blocks.get(key);
    if (!b || b.type !== 'zinne' || !b.mesh) return;
    const [x, y, z] = key.split(',').map(Number);
    const oldMesh = b.mesh;
    _scene.remove(oldMesh);
    oldMesh.traverse(o => {
        if (o.geometry) { try { o.geometry.dispose(); } catch (_) {} }
    });
    const conn = cb3GetWallConnections(x, y, z);
    const mesh = cb3CreateWallMesh(conn);
    mesh.position.set(x + 0.5, y + 0.5, z + 0.5);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.key = key;
    mesh.userData.type = 'zinne';
    _scene.add(mesh);
    b.mesh = mesh;
}

function cb3UpdateWallsAround(x, y, z) {
    cb3RebuildWall(`${x},${y},${z}`);
    cb3RebuildWall(`${x + 1},${y},${z}`);
    cb3RebuildWall(`${x - 1},${y},${z}`);
    cb3RebuildWall(`${x},${y},${z + 1}`);
    cb3RebuildWall(`${x},${y},${z - 1}`);
}

function cb3RebuildFence(key) {
    const b = _blocks.get(key);
    if (!b || b.type !== 'zaun' || !b.mesh) return;
    const [x, y, z] = key.split(',').map(Number);
    const oldMesh = b.mesh;
    _scene.remove(oldMesh);
    oldMesh.traverse(o => {
        if (o.geometry) { try { o.geometry.dispose(); } catch (_) {} }
    });
    const conn = cb3GetFenceConnections(x, y, z);
    const mesh = cb3CreateFenceMesh(conn);
    mesh.position.set(x + 0.5, y + 0.5, z + 0.5);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.key = key;
    mesh.userData.type = 'zaun';
    _scene.add(mesh);
    b.mesh = mesh;
}

function cb3UpdateFencesAround(x, y, z) {
    // Den eigenen Zaun + 4 horizontale Nachbarn neu aufbauen
    cb3RebuildFence(`${x},${y},${z}`);
    cb3RebuildFence(`${x + 1},${y},${z}`);
    cb3RebuildFence(`${x - 1},${y},${z}`);
    cb3RebuildFence(`${x},${y},${z + 1}`);
    cb3RebuildFence(`${x},${y},${z - 1}`);
}

// ─────────────────────── BLOCK-MATERIALIEN ─────────────────────────

function cb3GetMaterial(def, variant) {
    const cacheKey = variant ? `${def.id}_${variant}` : def.id;
    if (_materials[cacheKey]) return _materials[cacheKey];
    const tex = cb3MakeBlockTexture(def, variant);
    const opts = { map: tex };
    if (def.transparent) {
        opts.transparent = true;
        if (def.opacity !== undefined) opts.opacity = def.opacity;
    }
    if (def.alphaTest !== undefined) opts.alphaTest = def.alphaTest;
    let mat;
    if (def.metalness !== undefined) {
        mat = new THREE.MeshStandardMaterial({
            ...opts,
            metalness: def.metalness,
            roughness: def.roughness ?? 0.4
        });
    } else {
        const lambertOpts = { ...opts };
        if (def.emissive) {
            lambertOpts.emissive = def.emissive;
            lambertOpts.emissiveIntensity = 0.7;
        }
        mat = new THREE.MeshLambertMaterial(lambertOpts);
    }
    if (def.transparent || def.alphaTest) mat.side = THREE.DoubleSide;
    _materials[cacheKey] = mat;
    return mat;
}

// Pixel-Stil: 16×16 logische Pixel, je 4 Canvas-Pixel = 1 Minecraft-Pixel
const PX = 4;
const TEX = 64; // 16 * 4
function px(ctx, x, y, color, w = 1, h = 1) {
    ctx.fillStyle = color;
    ctx.fillRect(x * PX, y * PX, w * PX, h * PX);
}

function cb3MakeBlockTexture(def, variant) {
    const c = document.createElement('canvas');
    c.width = TEX; c.height = TEX;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    // Transparente Texturen NICHT mit Grundfarbe füllen
    const skipBaseFill = (def.texture === 'torch' || def.texture === 'banner' || def.texture === 'flower' || def.texture === 'fence');
    if (!skipBaseFill) {
        const base = '#' + def.color.toString(16).padStart(6, '0');
        ctx.fillStyle = base;
        ctx.fillRect(0, 0, TEX, TEX);
    }
    switch (def.texture) {
        case 'stone':     cb3TexStone(ctx); break;
        case 'brick':     cb3TexBrick(ctx); break;
        case 'sandstone': cb3TexSandstone(ctx); break;
        case 'wood':      cb3TexWood(ctx); break;
        case 'roof':      cb3TexRoof(ctx); break;
        case 'merlon':    cb3TexMerlon(ctx); break;
        case 'window':    cb3TexWindow(ctx); break;
        case 'door':      cb3TexDoor(ctx, variant); break;
        case 'torch':     cb3TexTorch(ctx); break;
        case 'banner':    cb3TexBanner(ctx); break;
        case 'leaves':    cb3TexLeaves(ctx); break;
        case 'gold':      cb3TexGold(ctx); break;
        case 'water':     cb3TexWater(ctx); break;
        case 'flower':    cb3TexFlower(ctx); break;
        case 'fence':     cb3TexFence(ctx); break;
        case 'bookshelf': cb3TexBookshelf(ctx); break;
    }
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    if (def.texture === 'water') {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    }
    return tex;
}

function cb3TexWater(ctx) {
    // Pixeliges Wasser mit verschiedenen Blautönen
    const w1 = '#2c6db0', w2 = '#3a7ec0', w3 = '#4a8fd0', w4 = '#5fa0e0';
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            const v = (x * 7 + y * 11 + Math.floor(Math.sin(x * 0.5 + y * 0.7) * 3)) % 11;
            let c;
            if (v < 3) c = w1;
            else if (v < 6) c = w2;
            else if (v < 9) c = w3;
            else c = w4;
            px(ctx, x, y, c);
        }
    }
    // Wellenkämme
    for (let y = 0; y < 16; y += 3) {
        for (let x = 0; x < 16; x++) {
            if ((x + y) % 4 === 0) px(ctx, x, y, w4);
        }
    }
}

function cb3TexFlower(ctx) {
    // Blume mit Stängel und 4 Blütenblättern (transparenter Hintergrund)
    const stem = '#3a7a35', stemLight = '#5a9a55';
    const petal = '#ff5577', petalLight = '#ffa3b8', petalDark = '#cc3355';
    const center = '#ffea60';
    // Stängel mittig
    for (let y = 8; y < 16; y++) {
        px(ctx, 7, y, stem);
        px(ctx, 8, y, stemLight);
    }
    // Blatt am Stiel
    px(ctx, 5, 11, stemLight); px(ctx, 6, 11, stemLight); px(ctx, 6, 12, stem);
    px(ctx, 9, 13, stemLight); px(ctx, 10, 13, stemLight); px(ctx, 10, 12, stem);
    // Blütenblätter (kreuz aus)
    px(ctx, 7, 3, petal); px(ctx, 8, 3, petal);                              // oben
    px(ctx, 6, 4, petalLight); px(ctx, 7, 4, petal); px(ctx, 8, 4, petal); px(ctx, 9, 4, petalLight);
    px(ctx, 5, 5, petalDark); px(ctx, 6, 5, petal); px(ctx, 9, 5, petal); px(ctx, 10, 5, petalDark);
    px(ctx, 4, 6, petalDark); px(ctx, 5, 6, petalLight); px(ctx, 10, 6, petalLight); px(ctx, 11, 6, petalDark);
    px(ctx, 4, 7, petalDark); px(ctx, 5, 7, petalLight); px(ctx, 10, 7, petalLight); px(ctx, 11, 7, petalDark);
    // Zentrum (gelb)
    px(ctx, 7, 6, center); px(ctx, 8, 6, center);
    px(ctx, 7, 7, center); px(ctx, 8, 7, center);
    // Untere Blütenblätter
    px(ctx, 6, 8, petalLight); px(ctx, 9, 8, petalLight);
}

function cb3TexStairsPreview(ctx, def) {
    // Basis-Material zeichnen, dann L-Form (Treppen-Profil) als Overlay
    switch (def.stairBase) {
        case 'stone':     cb3TexStone(ctx); break;
        case 'brick':     cb3TexBrick(ctx); break;
        case 'sandstone': cb3TexSandstone(ctx); break;
        case 'wood':      cb3TexWood(ctx); break;
        case 'roof':      cb3TexRoof(ctx); break;
    }
    // Treppen-Stufen-Indicator: schwarze Linie als L
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    // Untere Hälfte voll, Stufe oben rechts entfernt → Schatten links unten
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) px(ctx, x, y, 'rgba(0,0,0,0.55)');
    }
    // Obere rechte Hälfte hervorgehoben (Stufe)
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    for (let x = 8; x < 16; x++) {
        for (let y = 8; y < 16; y++) px(ctx, x, y, 'rgba(255,255,255,0.18)');
    }
}

function cb3TexBedPreview(ctx, def) {
    // Bett von oben — Decken-Farbe aus def.color
    const wood = '#6b3f1c', white = '#f0f0f0';
    const r = ((def && def.color) >> 16) & 0xff;
    const g = ((def && def.color) >> 8) & 0xff;
    const b = (def && def.color) & 0xff;
    const blanket = `rgb(${r},${g},${b})`;
    const blanketDark = `rgb(${Math.floor(r*0.6)},${Math.floor(g*0.6)},${Math.floor(b*0.6)})`;
    // Holzrahmen
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) px(ctx, x, y, wood);
    // Decke (zentral)
    for (let y = 1; y < 15; y++) for (let x = 1; x < 15; x++) px(ctx, x, y, blanket);
    // Decken-Kanten (dunkler)
    for (let x = 1; x < 15; x++) { px(ctx, x, 1, blanketDark); px(ctx, x, 14, blanketDark); }
    for (let y = 1; y < 15; y++) { px(ctx, 1, y, blanketDark); px(ctx, 14, y, blanketDark); }
    // Kissen oben (Kopfteil-Seite)
    for (let y = 2; y < 6; y++) for (let x = 3; x < 13; x++) px(ctx, x, y, white);
    px(ctx, 3, 2, '#cccccc'); px(ctx, 12, 2, '#cccccc');
}

function cb3TexBookshelf(ctx) {
    const wood = '#6b3f1c', woodLight = '#8b5a2b', woodDark = '#3a1f0a';
    // Holz-Hintergrund
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) px(ctx, x, y, wood);
    // Holzrahmen oben/unten
    for (let x = 0; x < 16; x++) {
        px(ctx, x, 0, woodDark); px(ctx, x, 1, woodLight);
        px(ctx, x, 14, woodDark); px(ctx, x, 15, woodDark);
    }
    // Seitenrahmen
    for (let y = 2; y < 14; y++) {
        px(ctx, 0, y, woodDark); px(ctx, 1, y, woodLight);
        px(ctx, 14, y, woodLight); px(ctx, 15, y, woodDark);
    }
    // Mittelregal-Holzbrett
    for (let x = 2; x < 14; x++) {
        px(ctx, x, 7, woodDark); px(ctx, x, 8, woodLight);
    }
    // Bücher (deterministisches Muster, 2 Reihen)
    const books = [
        // [startX, width, color]
        [2, 1, '#8a2222'], [3, 2, '#225a8a'], [5, 1, '#2a8a2a'], [6, 2, '#cc8a22'],
        [8, 1, '#7a3a8a'], [9, 2, '#3a8a8a'], [11, 1, '#aa3333'], [12, 2, '#3344aa']
    ];
    for (const [x, w, c] of books) {
        for (let dx = 0; dx < w; dx++) {
            for (let dy = 2; dy < 7; dy++) px(ctx, x + dx, dy, c);
        }
        // Highlight am oberen Rand
        for (let dx = 0; dx < w; dx++) px(ctx, x + dx, 2, c);
        // Schwarzer Schatten zwischen Büchern
        if (x + w < 14) px(ctx, x + w, 2, '#000');
    }
    const books2 = [
        [2, 2, '#3a8a3a'], [4, 1, '#aa4422'], [5, 2, '#4444aa'], [7, 2, '#aa6611'],
        [9, 1, '#882288'], [10, 2, '#cccc44'], [12, 2, '#226688']
    ];
    for (const [x, w, c] of books2) {
        for (let dx = 0; dx < w; dx++) {
            for (let dy = 9; dy < 14; dy++) px(ctx, x + dx, dy, c);
        }
        for (let dx = 0; dx < w; dx++) px(ctx, x + dx, 9, c);
        if (x + w < 14) px(ctx, x + w, 9, '#000');
    }
}

function cb3TexAnimalPreview(ctx, def) {
    // Einfache Pixel-Silhouette: Körper, Kopf, Beine (Huhn = 2, andere = 4)
    const bodyColor = '#' + def.color.toString(16).padStart(6, '0');
    const dark = '#3a2a1a';
    // Körper (zentral, ovaler Block)
    for (let y = 6; y < 11; y++) {
        for (let x = 3; x < 13; x++) {
            px(ctx, x, y, bodyColor);
        }
    }
    // Kopf vorne (rechts)
    for (let y = 5; y < 9; y++) {
        for (let x = 11; x < 15; x++) {
            px(ctx, x, y, bodyColor);
        }
    }
    // Augen
    px(ctx, 13, 6, dark);
    // Beine
    if (def.id === 'huhn') {
        // 2 orangefarbene Beine mittig (typische Hühner-Anatomie)
        const legColor = '#ff8800';
        for (let y = 11; y < 14; y++) {
            px(ctx, 7, y, legColor);
            px(ctx, 9, y, legColor);
        }
    } else {
        for (let y = 11; y < 14; y++) {
            px(ctx, 4, y, dark);
            px(ctx, 7, y, dark);
            px(ctx, 10, y, dark);
            px(ctx, 12, y, dark);
        }
    }
    // Unterscheidung Huhn vs. andere
    if (def.id === 'huhn') {
        // Schnabel + Kamm
        px(ctx, 14, 7, '#ffaa00');
        px(ctx, 12, 4, '#cc0000');
    } else if (def.id === 'kuh') {
        // Hörner
        px(ctx, 12, 4, '#eeeebb'); px(ctx, 14, 4, '#eeeebb');
        // Weißer Fleck
        px(ctx, 5, 7, '#ffffff'); px(ctx, 6, 7, '#ffffff'); px(ctx, 5, 8, '#ffffff');
    }
}

function cb3TexFence(ctx) {
    // Zaun: senkrechter Pfosten mit zwei Querbalken
    const wood = '#8b5a2b', woodLight = '#a06b3a', woodDark = '#5a3a18';
    // Zentraler Pfosten (4 Pixel breit, volle Höhe)
    for (let y = 0; y < 16; y++) {
        for (let x = 6; x < 10; x++) {
            let c = wood;
            if (x === 6) c = woodDark;
            if (x === 9) c = woodLight;
            if (y % 4 === 0) c = woodDark;
            px(ctx, x, y, c);
        }
    }
    // Querbalken oberer
    for (let x = 0; x < 16; x++) {
        for (let y = 4; y < 6; y++) {
            let c = wood;
            if (y === 4) c = woodLight;
            if (y === 5) c = woodDark;
            px(ctx, x, y, c);
        }
    }
    // Querbalken unterer
    for (let x = 0; x < 16; x++) {
        for (let y = 10; y < 12; y++) {
            let c = wood;
            if (y === 10) c = woodLight;
            if (y === 11) c = woodDark;
            px(ctx, x, y, c);
        }
    }
}

// ───── Pixel-Texturen (Minecraft-Stil, 16×16 Logikpixel) ─────

function cb3TexStone(ctx) {
    // Cobblestone-Look: einzelne Steinklötze in unregelmäßigem Muster
    const dark  = '#5e5e5e';
    const mid   = '#6e6e6e';
    const light = '#9a9a9a';
    const high  = '#b0b0b0';
    const seam  = '#3a3a3a';
    // Basis-Variation
    const map = [
        // 16×16 logische Pixel (0=Basis, 1=dunkler, 2=heller, 3=highlight, 4=seam)
        '4444444444444444',
        '4112221124111224',
        '4112221124211224',
        '4422222444222244',
        '4111224412211124',
        '4112221412221224',
        '4444444444444444',
        '4111244411112244',
        '4112224412211224',
        '4112224422211124',
        '4422224444444444',
        '4112221111122244',
        '4112221121221124',
        '4112221121221124',
        '4444444444444444',
        '4111111111111111',
    ];
    // Weniger schematisch, mehr cobble
    const colors = { '0': mid, '1': mid, '2': light, '3': high, '4': seam };
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            const ch = map[y][x];
            px(ctx, x, y, colors[ch] || mid);
        }
    }
    // Highlights an einzelnen Steinen
    px(ctx, 1, 1, high);
    px(ctx, 5, 1, high);
    px(ctx, 9, 1, high);
    px(ctx, 13, 1, high);
    px(ctx, 1, 7, high);
    px(ctx, 5, 7, high);
    px(ctx, 9, 7, high);
    px(ctx, 13, 7, high);
    px(ctx, 1, 11, high);
    // Schatten
    px(ctx, 3, 3, dark);
    px(ctx, 7, 4, dark);
    px(ctx, 11, 3, dark);
    px(ctx, 14, 5, dark);
    px(ctx, 4, 9, dark);
    px(ctx, 9, 9, dark);
    px(ctx, 13, 9, dark);
    px(ctx, 6, 12, dark);
}

function cb3TexBrick(ctx) {
    // Ziegelmauer im Minecraft-Stil: rote Ziegel mit hellem Mörtel, versetzte Reihen
    const brick = '#a04535';
    const brickLight = '#c25a47';
    const brickDark = '#7a2f22';
    const mortar = '#c9b78c';
    // Basis (alles Mörtel)
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) px(ctx, x, y, mortar);
    // 4 Reihen Ziegel, je 4 Pixel hoch (3 Pixel Ziegel + 1 Pixel Mörtel)
    // Reihe 0 (y=0..2): Ziegel beginnen bei x=0, alle 4 Pixel
    // Reihe 1 (y=4..6): versetzt, beginnen bei x=2
    const drawBrickRow = (yStart, offset) => {
        for (let bx = 0; bx < 16; bx += 4) {
            const x = (bx + offset) % 16;
            for (let dy = 0; dy < 3; dy++) {
                for (let dx = 0; dx < 3; dx++) {
                    const xx = (x + dx) % 16;
                    const yy = yStart + dy;
                    if (yy >= 16) continue;
                    let c;
                    if (dy === 0) c = brickLight;       // Highlight oben
                    else if (dy === 2) c = brickDark;   // Schatten unten
                    else c = brick;
                    // Ein paar zufällige Farb-Variationen für lebendigen Look
                    const variation = (xx * 7 + yy * 3) % 9;
                    if (variation === 0) c = brickDark;
                    if (variation === 4) c = brickLight;
                    px(ctx, xx, yy, c);
                }
            }
        }
    };
    drawBrickRow(0, 0);
    drawBrickRow(4, 2);
    drawBrickRow(8, 0);
    drawBrickRow(12, 2);
}

function cb3TexSandstone(ctx) {
    const c1 = '#d4b483';
    const c2 = '#b89968';
    const c3 = '#e8cc99';
    const c4 = '#a48758';
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            // Horizontale Streifen
            const layer = Math.floor(y / 4) % 2;
            let c = layer === 0 ? c1 : c2;
            // Highlight oben
            if (y % 4 === 0) c = c3;
            // Schatten unten
            if (y % 4 === 3) c = c4;
            // Einzelne Variationen
            const v = (x * 13 + y * 7) % 17;
            if (v < 2) c = c4;
            if (v === 16) c = c3;
            px(ctx, x, y, c);
        }
    }
}

function cb3TexWood(ctx) {
    // Eichenholzbretter: 2 vertikale Bretter à 8 Pixel mit dunkler Trennlinie und Maserung
    const wood = '#a06b3a';
    const woodDark = '#6b3f1c';
    const woodLight = '#b88450';
    const woodVeryDark = '#4a2812';
    // Basis
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) px(ctx, x, y, wood);
    // Bretter-Trennlinien
    px(ctx, 0, 7, woodVeryDark, 16, 1);
    // Vertikale Trennung mittig (zwei Bretter nebeneinander, oberes/unteres versetzt)
    // Oberes Brett: Trennung bei x=8
    px(ctx, 7, 0, woodVeryDark, 1, 7);
    // Unteres Brett: Trennung bei x=4 und x=12 (drei Sub-Bretter)
    // Eigentlich: zwei Bretter horizontal → einfacher Look
    // Maserung im oberen Brett
    px(ctx, 1, 1, woodLight); px(ctx, 2, 1, woodLight); px(ctx, 3, 1, woodLight);
    px(ctx, 5, 2, woodDark);  px(ctx, 6, 2, woodDark);
    px(ctx, 1, 3, woodDark);
    px(ctx, 9, 1, woodLight); px(ctx, 10, 1, woodLight); px(ctx, 12, 1, woodLight); px(ctx, 13, 1, woodLight); px(ctx, 14, 1, woodLight);
    px(ctx, 11, 2, woodDark); px(ctx, 12, 2, woodDark); px(ctx, 15, 2, woodDark);
    px(ctx, 9, 3, woodDark);  px(ctx, 14, 3, woodDark);
    px(ctx, 1, 5, woodLight); px(ctx, 2, 5, woodLight);
    px(ctx, 5, 5, woodLight); px(ctx, 6, 5, woodLight);
    px(ctx, 11, 5, woodLight); px(ctx, 14, 5, woodLight);
    px(ctx, 3, 6, woodDark);  px(ctx, 5, 6, woodDark);
    // Maserung im unteren Brett
    px(ctx, 1, 8, woodLight); px(ctx, 2, 8, woodLight); px(ctx, 4, 8, woodLight); px(ctx, 6, 8, woodLight);
    px(ctx, 9, 8, woodLight); px(ctx, 10, 8, woodLight); px(ctx, 12, 8, woodLight); px(ctx, 14, 8, woodLight);
    px(ctx, 3, 9, woodDark);  px(ctx, 7, 9, woodDark);
    px(ctx, 11, 9, woodDark); px(ctx, 14, 9, woodDark);
    px(ctx, 1, 10, woodDark); px(ctx, 5, 10, woodDark);
    px(ctx, 9, 10, woodDark); px(ctx, 13, 10, woodDark);
    px(ctx, 2, 12, woodLight); px(ctx, 5, 12, woodLight); px(ctx, 6, 12, woodLight);
    px(ctx, 10, 12, woodLight); px(ctx, 13, 12, woodLight); px(ctx, 14, 12, woodLight);
    px(ctx, 4, 13, woodDark);  px(ctx, 7, 13, woodDark);
    px(ctx, 11, 13, woodDark); px(ctx, 15, 13, woodDark);
    px(ctx, 1, 14, woodDark);  px(ctx, 6, 14, woodDark);
    px(ctx, 9, 14, woodDark);
}

function cb3TexRoof(ctx) {
    // Dachziegel: dunkelrote Schuppen, versetzte Reihen
    const tile = '#7a2f1a';
    const tileLight = '#a04030';
    const tileDark = '#4a1a0a';
    const seam = '#2a0a04';
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) px(ctx, x, y, tile);
    // 4 Reihen Schuppen, je 4 Pixel hoch
    for (let row = 0; row < 4; row++) {
        const yT = row * 4;
        const offset = (row % 2) * 2;
        for (let s = 0; s < 4; s++) {
            const x = (s * 4 + offset) % 16;
            // Schuppen-Highlight oben
            for (let dx = 0; dx < 4; dx++) {
                const xx = (x + dx) % 16;
                px(ctx, xx, yT, tileLight);
            }
            // Schuppen-Schatten an Kanten
            px(ctx, x, yT + 1, tileDark);
            px(ctx, (x + 3) % 16, yT + 1, tileDark);
            // Trennfuge unten
            px(ctx, x, yT + 3, seam);
            px(ctx, (x + 1) % 16, yT + 3, seam);
            px(ctx, (x + 2) % 16, yT + 3, seam);
            px(ctx, (x + 3) % 16, yT + 3, seam);
        }
    }
}

function cb3TexMerlon(ctx) {
    // Stein unten + Zinnen oben
    const dark  = '#5e5e5e';
    const mid   = '#7e7e7e';
    const light = '#a8a8a8';
    const seam  = '#3a3a3a';
    const sky   = '#1a1a2a'; // Lücke zwischen Zinnen (sieht "leer" aus)
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            // Obere 5 Pixel = Zinnen mit Lücken
            if (y < 5) {
                // Zinnen bei x=0..3, 8..11, Lücken bei 4..7, 12..15
                const inMerlon = (x < 4) || (x >= 8 && x < 12);
                if (inMerlon) {
                    let c = mid;
                    if (x === 0 || x === 8) c = light;
                    if (x === 3 || x === 11) c = dark;
                    if (y === 4) c = seam;
                    px(ctx, x, y, c);
                } else {
                    px(ctx, x, y, sky);
                }
            } else {
                // Mauer-Stein (Stein-Pattern)
                let c = mid;
                // Steinfugen
                if (y === 8 || y === 11 || y === 14) c = seam;
                else if ((y === 6 && (x === 4 || x === 12)) ||
                         (y === 9 && (x === 0 || x === 8)) ||
                         (y === 12 && (x === 6 || x === 14))) c = seam;
                else if ((y + x) % 5 === 0) c = light;
                else if ((y * 3 + x) % 7 === 0) c = dark;
                px(ctx, x, y, c);
            }
        }
    }
}

function cb3TexWindow(ctx) {
    // Minecraft-Glasscheibe: dünner dunkler Rahmen, Glas innen fast komplett klar
    const frame = '#5a5a5a';
    const frameLight = '#a0a0a0';
    const glass = '#bfe8f4';
    const glassHighlight = '#ffffff';
    // Glas im ganzen Inneren (sehr hell, fast weiß)
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            px(ctx, x, y, glass);
        }
    }
    // Dünner Rahmen außen (1 Pixel)
    for (let i = 0; i < 16; i++) {
        px(ctx, i, 0, frame);
        px(ctx, i, 15, frame);
        px(ctx, 0, i, frame);
        px(ctx, 15, i, frame);
    }
    // Glanz oben links (Lichtreflexion)
    px(ctx, 2, 2, glassHighlight);
    px(ctx, 3, 2, glassHighlight);
    px(ctx, 2, 3, glassHighlight);
    px(ctx, 4, 2, glassHighlight);
    px(ctx, 2, 4, glassHighlight);
    // Schwächere Linie diagonal
    px(ctx, 3, 5, glassHighlight);
    px(ctx, 5, 3, glassHighlight);
    // Ecken-Highlights am Rahmen
    px(ctx, 1, 1, frameLight);
    px(ctx, 14, 1, frameLight);
    px(ctx, 1, 14, frameLight);
    px(ctx, 14, 14, frameLight);
}

function cb3TexDoor(ctx, variant) {
    // Minecraft-Tür: zwei Hälften (lower=Klinke, upper=Querbalken)
    // variant: 'lower' oder 'upper'
    const wood = '#7a4a20';
    const woodDark = '#4a2810';
    const woodLight = '#9a6030';
    const iron = '#3a3a3a';
    const ironLight = '#666';
    const knob = '#d4af37';
    // Holz-Hintergrund
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) px(ctx, x, y, wood);
    // Vertikale Bretter-Trennungen (5 Bretter à 3 Pixel)
    for (let y = 0; y < 16; y++) {
        px(ctx, 3, y, woodDark);
        px(ctx, 7, y, woodDark);
        px(ctx, 11, y, woodDark);
    }
    // Maserung
    for (let y = 0; y < 16; y += 3) {
        const yy = y + ((y * 7) % 3);
        if (yy >= 16) continue;
        px(ctx, 1, yy, woodLight);
        px(ctx, 5, yy, woodLight);
        px(ctx, 9, yy, woodLight);
        px(ctx, 13, yy, woodLight);
    }
    if (variant === 'upper') {
        // Obere Hälfte: schmaler Querbalken oben + Eisenbeschlag
        for (let x = 0; x < 16; x++) {
            px(ctx, x, 0, iron);
            px(ctx, x, 1, iron);
        }
        // Highlights auf dem Eisenbeschlag
        px(ctx, 2, 0, ironLight);
        px(ctx, 8, 0, ironLight);
        px(ctx, 14, 0, ironLight);
        // Kleines rundes Sichtfenster
        const winColor = '#444';
        px(ctx, 6, 5, winColor); px(ctx, 7, 5, winColor); px(ctx, 8, 5, winColor); px(ctx, 9, 5, winColor);
        px(ctx, 5, 6, winColor); px(ctx, 10, 6, winColor);
        px(ctx, 5, 7, winColor); px(ctx, 10, 7, winColor);
        px(ctx, 6, 8, winColor); px(ctx, 7, 8, winColor); px(ctx, 8, 8, winColor); px(ctx, 9, 8, winColor);
    } else {
        // Untere Hälfte: Klinke + Querbalken unten
        for (let x = 0; x < 16; x++) {
            px(ctx, x, 14, iron);
            px(ctx, x, 15, iron);
        }
        px(ctx, 2, 14, ironLight);
        px(ctx, 8, 14, ironLight);
        px(ctx, 14, 14, ironLight);
        // Türklinke (rechts mittig)
        px(ctx, 13, 7, knob);
        px(ctx, 13, 8, knob);
        px(ctx, 14, 8, knob);
        // Schloss
        px(ctx, 13, 9, iron);
        px(ctx, 14, 9, iron);
    }
}

function cb3TexTorch(ctx) {
    // Minecraft-Fackel: dünner Holzstiel mittig + Flamme oben, Rest TRANSPARENT
    const stick = '#6b3f1c';
    const stickLight = '#8a5430';
    const stickDark = '#3a1f0a';
    const flameOuter = '#ff7800';
    const flameMid = '#ffaa33';
    const flameCore = '#ffee88';
    const flameWhite = '#ffffff';
    // Stiel: 2 Pixel breit, von y=8 bis y=15 (untere Hälfte)
    for (let y = 8; y < 16; y++) {
        px(ctx, 7, y, stick);
        px(ctx, 8, y, stickLight);
    }
    // Stiel-Schatten (links)
    for (let y = 8; y < 16; y++) {
        px(ctx, 7, y, stickDark);
    }
    px(ctx, 8, 8, stick);
    // Flammen-Spitze (Stiel-Spitze bei y=7, etwas dicker)
    px(ctx, 7, 7, flameOuter);
    px(ctx, 8, 7, flameOuter);
    // Flamme oben (Pixel-Pyramide)
    // y=6 (Hauptflamme)
    px(ctx, 6, 6, flameOuter);
    px(ctx, 7, 6, flameMid);
    px(ctx, 8, 6, flameMid);
    px(ctx, 9, 6, flameOuter);
    // y=5
    px(ctx, 6, 5, flameMid);
    px(ctx, 7, 5, flameCore);
    px(ctx, 8, 5, flameCore);
    px(ctx, 9, 5, flameMid);
    // y=4 (Kern)
    px(ctx, 7, 4, flameCore);
    px(ctx, 8, 4, flameCore);
    // y=3
    px(ctx, 7, 3, flameWhite);
    px(ctx, 8, 3, flameMid);
    // Rest des Canvas bleibt TRANSPARENT (wegen alphaTest)
}

function cb3TexBanner(ctx) {
    // Banner-Stoff (transparent außerhalb der Stoffbahn — keine Wand mehr)
    const banner = '#a02f2a';
    const bannerLight = '#c84540';
    const bannerDark = '#6e1a18';
    const gold = '#d4af37';
    const goldLight = '#f4d067';

    // Stoff-Pixel-Maske mit V-Schnitt unten
    const isCloth = (x, y) => {
        if (y < 0 || y > 15) return false;
        // Volle Stoffbahn von y=0 bis y=12, dann gezackter Saum
        if (y <= 12) return x >= 0 && x <= 15;
        if (y === 13) return x >= 0 && x <= 15;
        if (y === 14) return (x >= 0 && x <= 3) || (x >= 6 && x <= 9) || (x >= 12 && x <= 15);
        if (y === 15) return (x >= 1 && x <= 2) || (x >= 7 && x <= 8) || (x >= 13 && x <= 14);
        return false;
    };

    // Stoff zeichnen (mit horizontalen Schattierungen für Falten-Look)
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            if (!isCloth(x, y)) continue;
            let c = banner;
            // Falten-Effekt: Spalten 4-5 und 10-11 dunkler, 7-8 heller
            if (x === 4 || x === 11) c = bannerDark;
            else if (x === 7 || x === 8) c = bannerLight;
            else if (x === 0 || x === 15) c = bannerDark;
            px(ctx, x, y, c);
        }
    }

    // Goldborte oben (Stoff-Aufhängung)
    for (let x = 0; x < 16; x++) {
        if (!isCloth(x, 0)) continue;
        px(ctx, x, 0, gold);
        if (isCloth(x, 1)) px(ctx, x, 1, goldLight);
    }

    // Goldenes Wappen — vertikales Kreuz/Pfeil in der Mitte
    const goldPx = (x, y) => { if (isCloth(x, y)) px(ctx, x, y, gold); };
    const goldPxLight = (x, y) => { if (isCloth(x, y)) px(ctx, x, y, goldLight); };

    // Vertikale Achse
    for (let y = 4; y < 12; y++) goldPx(7, y);
    for (let y = 4; y < 12; y++) goldPxLight(8, y);
    // Horizontale Achse
    for (let x = 5; x < 11; x++) goldPx(x, 6);
    for (let x = 5; x < 11; x++) goldPxLight(x, 7);
    // Pfeilspitze unten
    goldPx(6, 11); goldPxLight(9, 11);
}

function cb3TexLeaves(ctx) {
    // Blätterwerk mit dichtem Pixel-Pattern
    const leaf1 = '#2d8a3a';
    const leaf2 = '#3aa84a';
    const leaf3 = '#226a2a';
    const leaf4 = '#1a4a1c';
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            // Deterministisches "Rauschen" für reproduzierbares Pixel-Pattern
            const v = (x * 17 + y * 31 + x * y) % 11;
            let c;
            if (v < 3) c = leaf3;
            else if (v < 5) c = leaf4;
            else if (v < 8) c = leaf1;
            else c = leaf2;
            px(ctx, x, y, c);
        }
    }
}

function cb3TexGold(ctx) {
    const gold = '#ffd700';
    const goldLight = '#fff5a0';
    const goldDark = '#b88a18';
    const sparkle = '#ffffff';
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            const v = (x * 7 + y * 11) % 9;
            let c;
            if (v < 2) c = goldDark;
            else if (v < 6) c = gold;
            else c = goldLight;
            px(ctx, x, y, c);
        }
    }
    // Glanz-Sterne
    px(ctx, 3, 3, sparkle);
    px(ctx, 11, 5, sparkle);
    px(ctx, 7, 9, sparkle);
    px(ctx, 13, 12, sparkle);
}

// ─────────────────────── GHOST-BLOCK / PLAZIERUNG ──────────────────

function cb3CreateGhost() {
    const geo = new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK);
    const mat = new THREE.MeshBasicMaterial({
        color: 0x55ff55,
        transparent: true,
        opacity: 0.4,
        depthWrite: false
    });
    _ghostMesh = new THREE.Mesh(geo, mat);
    _ghostMesh.visible = false;

    // Wireframe-Kontur
    const edges = new THREE.EdgesGeometry(geo);
    const wfMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
    const wf = new THREE.LineSegments(edges, wfMat);
    _ghostMesh.add(wf);
    _ghostMesh.userData.wireframe = wf;

    _scene.add(_ghostMesh);
}

function cb3SetGhostState(valid) {
    if (!_ghostMesh) return;
    _ghostMesh.material.color.setHex(valid ? 0x55ff55 : 0xff4444);
    _ghostMesh.userData.wireframe.material.color.setHex(valid ? 0xffffff : 0xffdddd);
}

function cb3HideGhost() {
    if (_ghostMesh) _ghostMesh.visible = false;
    cb3SetStatus('');
}

function cb3SetStatus(text) {
    const el = document.getElementById('cb3Status');
    if (el) el.textContent = text;
}

function cb3OnMouseMove(e) {
    if (!_camera || !_renderer) return;
    const rect = _renderer.domElement.getBoundingClientRect();
    _mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    _mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (!_buildMode || !_selectedType) {
        cb3HideGhost();
        return;
    }

    const target = cb3GetPlacementTarget();
    if (!target) {
        cb3HideGhost();
        return;
    }

    const { pos, valid, reason } = target;
    const def = CB3_BLOCKS.find(b => b.id === _selectedType);
    const height = (def && def.multiHeight) ? def.multiHeight : 1;
    const length = (def && def.multiLength) ? def.multiLength : 1;

    _ghostMesh.visible = true;
    let scaleZ = 1, posZOffset = 0.5;
    if (length === 2) {
        let dx = 0, dz = -1;
        if (target.wall) { dx = target.wall.x; dz = target.wall.z; }
        scaleZ = 2;
        // Geistblock zwischen beiden Slots
        _ghostMesh.scale.set(Math.abs(dx) === 1 ? 2 : 1, height, Math.abs(dz) === 1 ? 2 : 1);
        _ghostMesh.position.set(
            pos.x + 0.5 + dx * 0.5,
            pos.y + height / 2,
            pos.z + 0.5 + dz * 0.5
        );
    } else {
        _ghostMesh.scale.set(1, height, 1);
        _ghostMesh.position.set(pos.x + 0.5, pos.y + height / 2, pos.z + 0.5);
    }
    cb3SetGhostState(valid);
    if (valid) {
        cb3SetStatus(`Platzieren: ${def ? def.name : ''} bei (${pos.x}, ${pos.y}, ${pos.z})`);
    } else {
        cb3SetStatus(reason || 'Hier nicht möglich');
    }
}

function cb3GetPlacementTarget() {
    _raycaster.setFromCamera(_mouse, _camera);

    const targets = [_plateau];
    _blocks.forEach(b => targets.push(b.mesh));

    const hits = _raycaster.intersectObjects(targets, true);
    if (!hits.length) return null;

    const hit = hits[0];
    // Aufstieg zum Top-Level-Mesh (für Fackel-Group)
    let topObj = hit.object;
    while (topObj && !topObj.userData.isPlateau && !topObj.userData.key) {
        topObj = topObj.parent;
    }
    if (!topObj) return null;
    let pos;

    let wallNormal = null;
    if (topObj.userData.isPlateau) {
        const x = Math.floor(hit.point.x);
        const z = Math.floor(hit.point.z);
        pos = { x, y: 0, z };
    } else {
        const blockPos = topObj.position;
        // Bei Spezial-Meshes (Fackel, Banner, Blume, Baum, Zaun, Mauer, Bett, Treppe, Tier): Block oben drauf platzieren
        if (topObj.userData.isTorch || topObj.userData.isBanner || topObj.userData.isFlower || topObj.userData.isTree || topObj.userData.isFence || topObj.userData.isWall || topObj.userData.isBed || topObj.userData.isStair) {
            pos = {
                x: Math.floor(blockPos.x - 0.5),
                y: Math.floor(blockPos.y - 0.5) + 1,
                z: Math.floor(blockPos.z - 0.5)
            };
        } else {
            const normal = hit.face ? hit.face.normal.clone() : new THREE.Vector3(0, 1, 0);
            pos = {
                x: Math.floor(blockPos.x - 0.5 + normal.x + 0.5),
                y: Math.floor(blockPos.y - 0.5 + normal.y + 0.5),
                z: Math.floor(blockPos.z - 0.5 + normal.z + 0.5)
            };
            // Wenn die normal horizontal ist, ist das eine Wand → für Fackel relevant
            if (Math.abs(normal.y) < 0.1) {
                wallNormal = { x: Math.round(normal.x), y: 0, z: Math.round(normal.z) };
            }
        }
    }

    if (pos.x < 0 || pos.x >= GRID_SIZE || pos.z < 0 || pos.z >= GRID_SIZE) {
        return { pos, valid: false, reason: 'Außerhalb des Bauplatzes' };
    }
    if (pos.y < 0 || pos.y >= MAX_HEIGHT) {
        return { pos, valid: false, reason: pos.y < 0 ? 'Unter dem Boden' : 'Maximalhöhe erreicht' };
    }
    // Höhen-Check (Tür = 2 hoch)
    const def = _selectedType ? CB3_BLOCKS.find(b => b.id === _selectedType) : null;
    const height = (def && def.multiHeight) ? def.multiHeight : 1;
    for (let dh = 0; dh < height; dh++) {
        if (pos.y + dh >= MAX_HEIGHT) {
            return { pos, valid: false, reason: 'Oben kein Platz mehr' };
        }
        if (cb3HasBlock(pos.x, pos.y + dh, pos.z)) {
            return { pos, valid: false, reason: 'Hier steht schon ein Block' };
        }
    }
    // Längen-Check (Bett = 2 in z-Richtung)
    if (def && def.multiLength === 2) {
        // Auto-Drehung für Bett: Kopfteil zeigt weg vom Spieler (= weg von Kamera)
        if (def.isBed && !wallNormal && _camera) {
            const dxCam = (pos.x + 0.5) - _camera.position.x;
            const dzCam = (pos.z + 0.5) - _camera.position.z;
            if (Math.abs(dxCam) > Math.abs(dzCam)) {
                wallNormal = { x: Math.sign(dxCam) || 1, y: 0, z: 0 };
            } else {
                wallNormal = { x: 0, y: 0, z: Math.sign(dzCam) || -1 };
            }
        }
        let dx2 = 0, dz2 = -1;
        if (wallNormal) { dx2 = wallNormal.x; dz2 = wallNormal.z; }
        const x2 = pos.x + dx2, z2 = pos.z + dz2;
        if (x2 < 0 || x2 >= GRID_SIZE || z2 < 0 || z2 >= GRID_SIZE) {
            return { pos, valid: false, reason: 'Bett ragt über den Bauplatz' };
        }
        if (cb3HasBlock(x2, pos.y, z2)) {
            return { pos, valid: false, reason: 'Bett-Kopfteil blockiert' };
        }
    }
    // Auto-Drehung für Treppen: Stufe steigt in die Richtung, in die der Spieler schaut
    if (def && def.texture === 'stairs' && !wallNormal && _camera) {
        const dxCam = (pos.x + 0.5) - _camera.position.x;
        const dzCam = (pos.z + 0.5) - _camera.position.z;
        // Spieler schaut vom Kamera-Punkt zum Block (in Richtung sign(dCam)).
        // wallNormal = obere-Stufe-Richtung = Blickrichtung = sign(dCam).
        if (Math.abs(dxCam) > Math.abs(dzCam)) {
            wallNormal = { x: Math.sign(dxCam) || 1, y: 0, z: 0 };
        } else {
            wallNormal = { x: 0, y: 0, z: Math.sign(dzCam) || 1 };
        }
    }
    return { pos, valid: true, wall: wallNormal };
}

function cb3HasBlock(x, y, z) {
    return _blocks.has(`${x},${y},${z}`);
}

function cb3OnClick(e) {
    if (!_buildMode) return;
    if (!_selectedType) return;
    const target = cb3GetPlacementTarget();
    if (!target || !target.valid) return;

    const inv = _inventory[_selectedType] || 0;
    if (inv <= 0) {
        if (typeof window.showToast === 'function') window.showToast('Nicht genug Blöcke im Inventar — kauf welche im Shop.', 'warning');
        return;
    }

    const def = CB3_BLOCKS.find(b => b.id === _selectedType);
    if (def && def.isAnimal) {
        cb3SpawnAnimal(_selectedType, target.pos.x + 0.5, target.pos.z + 0.5);
    } else if (def && def.multiHeight === 2) {
        cb3PlaceBlock(target.pos.x, target.pos.y, target.pos.z, 'tuer_lower');
        cb3PlaceBlock(target.pos.x, target.pos.y + 1, target.pos.z, 'tuer_upper');
    } else if (def && def.multiLength === 2) {
        // Bett: zwei Hälften nebeneinander; Kopfteil zeigt weg vom Spieler (target.wall ist auto-bestimmt)
        let dx = 0, dz = -1;
        if (target.wall) {
            dx = target.wall.x; dz = target.wall.z;
        }
        // Foot ist beim Spieler, Head in die Ferne (wall-Richtung)
        cb3PlaceBlock(target.pos.x, target.pos.y, target.pos.z, _selectedType + '_foot', target.wall);
        cb3PlaceBlock(target.pos.x + dx, target.pos.y, target.pos.z + dz, _selectedType + '_head', target.wall);
    } else if (def && (def.id === 'fackel' || def.id === 'banner' || def.texture === 'stairs') && target.wall) {
        cb3PlaceBlock(target.pos.x, target.pos.y, target.pos.z, _selectedType, target.wall);
    } else {
        cb3PlaceBlock(target.pos.x, target.pos.y, target.pos.z, _selectedType);
    }
    _inventory[_selectedType] = inv - 1;
    cb3Save();
    cb3UpdateUI();

    if (_inventory[_selectedType] <= 0) {
        _selectedType = null;
        cb3HideGhost();
    }
}

function cb3OnContextMenu(e) {
    if (!_buildMode) return;
    if (!_camera || !_renderer) return;
    const rect = _renderer.domElement.getBoundingClientRect();
    _mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    _mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    _raycaster.setFromCamera(_mouse, _camera);
    const targets = [];
    _blocks.forEach(b => targets.push(b.mesh));
    _animals.forEach(a => targets.push(a.mesh));
    if (!targets.length) return;

    const hits = _raycaster.intersectObjects(targets, true);
    if (!hits.length) return;

    // Aufstieg zum Top-Level-Mesh
    let topMesh = hits[0].object;
    while (topMesh && !topMesh.userData.key && !topMesh.userData.isAnimal) topMesh = topMesh.parent;
    if (!topMesh) return;

    // Tier entfernen?
    if (topMesh.userData.isAnimal) {
        const animal = _animals.find(a => a.mesh === topMesh);
        if (!animal) return;
        cb3RemoveAnimal(animal);
        _inventory[animal.type] = (_inventory[animal.type] || 0) + 1;
        cb3Save();
        cb3UpdateUI();
        // success/info Toast stummgeschaltet wie gewünscht
        return;
    }

    const key = topMesh.userData.key;
    if (!key) return;
    const block = _blocks.get(key);
    if (!block) return;

    // Tür/Bett-Spezialfall: beide Hälften gemeinsam entfernen
    if (block.type === 'tuer_lower' || block.type === 'tuer_upper') {
        const [bx, by, bz] = key.split(',').map(Number);
        const otherY = block.type === 'tuer_lower' ? by + 1 : by - 1;
        cb3RemoveBlock(key);
        cb3RemoveBlock(`${bx},${otherY},${bz}`);
        _inventory['tuer'] = (_inventory['tuer'] || 0) + 1;
    } else if (block.type.endsWith('_foot') || block.type.endsWith('_head')) {
        // Bett-Hälften: andere Hälfte finden + entfernen
        const baseId = block.type.replace(/_foot$|_head$/, '');
        const isFoot = block.type.endsWith('_foot');
        const wantedOther = isFoot ? baseId + '_head' : baseId + '_foot';
        const [bx, by, bz] = key.split(',').map(Number);
        const directions = [[0,0,-1],[0,0,1],[-1,0,0],[1,0,0]];
        for (const [dx, , dz] of directions) {
            const otherKey = `${bx+dx},${by},${bz+dz}`;
            const ob = _blocks.get(otherKey);
            if (ob && ob.type === wantedOther) {
                cb3RemoveBlock(otherKey);
                break;
            }
        }
        cb3RemoveBlock(key);
        _inventory[baseId] = (_inventory[baseId] || 0) + 1;
    } else {
        cb3RemoveBlock(key);
        _inventory[block.type] = (_inventory[block.type] || 0) + 1;
    }
    cb3Save();
    cb3UpdateUI();
    // success/info Toast stummgeschaltet wie gewünscht
}

function cb3PlaceBlock(x, y, z, typeId, wall) {
    // Mapping von internen Typen auf Block-Definition + Variante
    let actualType = typeId;
    let variant = null;
    if (typeId === 'tuer_lower') { actualType = 'tuer'; variant = 'lower'; }
    else if (typeId === 'tuer_upper') { actualType = 'tuer'; variant = 'upper'; }
    else if (typeId.endsWith('_foot') || typeId.endsWith('_head')) {
        const baseId = typeId.replace(/_foot$|_head$/, '');
        const baseDef = CB3_BLOCKS.find(b => b.id === baseId);
        if (baseDef && baseDef.isBed) {
            actualType = baseId;
            variant = typeId.endsWith('_foot') ? 'foot' : 'head';
        }
    }

    const def = CB3_BLOCKS.find(b => b.id === actualType);
    if (!def) return;

    if (!_blockGeo) _blockGeo = new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK);

    // Spezial-Geometrien für Fackel und Banner
    let mesh;
    if (actualType === 'fackel') {
        mesh = cb3CreateTorchMesh(wall);
    } else if (actualType === 'banner') {
        mesh = cb3CreateBannerMesh(wall);
    } else if (actualType === 'tuer') {
        // Tür-Hälfte als schmaler Mesh (nicht voller Würfel)
        mesh = cb3CreateDoorMesh(variant);
    } else if (def.isBed) {
        mesh = cb3CreateBedMesh(variant, def.color);
        // Bett-Drehung — Kopf nach -z default; mit Wall-Vector dreht sich das Bett dort hin
        if (wall) {
            if (wall.x === 1)       mesh.rotation.y = -Math.PI / 2;
            else if (wall.x === -1) mesh.rotation.y = Math.PI / 2;
            else if (wall.z === 1)  mesh.rotation.y = Math.PI;
            // wall.z === -1 → keine Rotation (Default)
        }
    } else if (def.texture === 'stairs') {
        mesh = cb3CreateStairMesh(def.stairBase, wall);
    } else if (actualType === 'baum') {
        mesh = cb3CreateBuildableTree();
    } else if (actualType === 'blume') {
        mesh = cb3CreateFlowerMesh();
    } else if (actualType === 'zaun') {
        // Verbindungen basierend auf bereits existierenden Nachbarn
        mesh = cb3CreateFenceMesh(cb3GetFenceConnections(x, y, z));
    } else if (actualType === 'zinne') {
        // Mauer im Minecraft-Wall-Stil — Pfosten, Cap, Verbindungs-Arme zu Nachbarn
        mesh = cb3CreateWallMesh(cb3GetWallConnections(x, y, z));
    } else {
        const mat = cb3GetMaterial(def, variant);
        mesh = new THREE.Mesh(_blockGeo, mat);
    }
    mesh.position.set(x + 0.5, y + 0.5, z + 0.5);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const key = `${x},${y},${z}`;
    mesh.userData.key = key;
    mesh.userData.type = typeId;
    _scene.add(mesh);

    let light = null;
    if (def.light) {
        light = new THREE.PointLight(0xff8833, 1.0, 6, 2);
        light.position.set(x + 0.5, y + 0.85, z + 0.5);
        _scene.add(light);
    }

    _blocks.set(key, { mesh, type: typeId, light, wall: wall || null });
    // Zaun- und Mauer-Nachbarn neu verbinden
    cb3UpdateFencesAround(x, y, z);
    cb3UpdateWallsAround(x, y, z);
}

function cb3RemoveBlock(key) {
    const b = _blocks.get(key);
    if (!b) return;
    _scene.remove(b.mesh);
    if (b.light) _scene.remove(b.light);
    // Geometry geteilt → nicht disposen
    _blocks.delete(key);
    // Nach Entfernen: Nachbar-Zäune & -Mauern neu verbinden
    const [x, y, z] = key.split(',').map(Number);
    cb3UpdateFencesAround(x, y, z);
    cb3UpdateWallsAround(x, y, z);
}

function cb3LoadBlocks(list) {
    list.forEach(b => cb3PlaceBlock(b.x, b.y, b.z, b.type, b.wall));
    // Nach dem Laden: alle Zäune & Mauern mit aktueller Nachbarschaft neu aufbauen
    _blocks.forEach((b, key) => {
        if (b.type === 'zaun')  cb3RebuildFence(key);
        if (b.type === 'zinne') cb3RebuildWall(key);
    });
}

// ─────────────────────── ANIMATIONS-LOOP ───────────────────────────

function cb3StartAnimation() {
    const loop = () => {
        if (!_renderer || !_scene || !_camera) return;
        if (_controls) _controls.update();
        if (_ghostMesh && _ghostMesh.visible) {
            const pulse = 0.3 + Math.abs(Math.sin(Date.now() * 0.004)) * 0.3;
            _ghostMesh.material.opacity = pulse;
        }
        // Flammen flackern
        const t = Date.now() * 0.012;
        _blocks.forEach((b, key) => {
            if (b.mesh.userData.isTorch && b.mesh.userData.flameMid) {
                const [bx, , bz] = key.split(',').map(Number);
                const w = 0.85 + Math.sin(t + bx * 1.3 + bz * 0.7) * 0.15;
                b.mesh.userData.flameMid.scale.y = w;
            }
        });
        // Wasser fließen lassen (Block-Wasser + Hintergrund-Meer)
        const waterMat = _materials['wasser'];
        if (waterMat && waterMat.map) {
            waterMat.map.offset.x = (Date.now() * 0.00008) % 1;
            waterMat.map.offset.y = (Date.now() * 0.00005) % 1;
        }
        if (_atmosphereOceanTex) {
            _atmosphereOceanTex.offset.x = (Date.now() * 0.00006) % 1;
            _atmosphereOceanTex.offset.y = (Date.now() * 0.00004) % 1;
        }
        // Tiere bewegen
        cb3UpdateAnimals();
        _renderer.render(_scene, _camera);
        _animFrameId = requestAnimationFrame(loop);
    };
    loop();
}

// ─────────────────────── INVENTAR / SHOP UI ────────────────────────

function cb3UpdateUI() {
    cb3RenderInventory();
    cb3RenderShop();
    const coinsEl = document.getElementById('cb3CoinsVal');
    if (coinsEl && window.currentUser) coinsEl.textContent = window.currentUser.progress.coins;
}

function cb3RenderInventory() {
    const el = document.getElementById('cb3Inventory');
    if (!el) return;
    const owned = CB3_BLOCKS.filter(b => (_inventory[b.id] || 0) > 0);
    if (!owned.length) {
        el.innerHTML = `<div class="cb3-inv-empty">Noch keine Blöcke.<br>Kauf welche rechts im Shop!</div>`;
        return;
    }
    let html = '';
    owned.forEach(def => {
        const count = _inventory[def.id] || 0;
        const sel = _selectedType === def.id ? 'selected' : '';
        html += `
            <div class="cb3-inv-item ${sel}" onclick="cb3SelectBlock('${def.id}')">
                <div class="cb3-block-preview" data-type="${def.id}"></div>
                <div class="cb3-inv-info">
                    <div class="cb3-inv-name">${def.name}</div>
                    <div class="cb3-inv-count">×${count}</div>
                </div>
            </div>
        `;
    });
    el.innerHTML = html;
    cb3RenderPreviewTextures();
}

function cb3RenderShop() {
    const el = document.getElementById('cb3Shop');
    if (!el) return;
    const coins = window.currentUser ? window.currentUser.progress.coins : 0;
    let html = '';
    CB3_BLOCKS.forEach(def => {
        const canAfford = coins >= def.price;
        html += `
            <div class="cb3-shop-item ${canAfford ? '' : 'unaffordable'}">
                <div class="cb3-block-preview" data-type="${def.id}"></div>
                <div class="cb3-shop-info">
                    <div class="cb3-shop-name">${def.name}</div>
                    <div class="cb3-shop-price">${def.price} Münzen</div>
                </div>
                <button class="cb3-buy-btn" ${canAfford ? '' : 'disabled'} onclick="cb3BuyBlock('${def.id}')">Kaufen</button>
            </div>
        `;
    });
    el.innerHTML = html;
    cb3RenderPreviewTextures();
}

function cb3RenderPreviewTextures() {
    document.querySelectorAll('.cb3-block-preview').forEach(el => {
        const type = el.dataset.type;
        const def = CB3_BLOCKS.find(b => b.id === type);
        if (!def) return;
        if (el.dataset.rendered === 'true') return;
        // Block-Textur generieren (gleiche Funktion wie für 3D)
        const blockCanvas = document.createElement('canvas');
        blockCanvas.width = TEX; blockCanvas.height = TEX;
        const bctx = blockCanvas.getContext('2d');
        bctx.imageSmoothingEnabled = false;
        const base = '#' + def.color.toString(16).padStart(6, '0');
        bctx.fillStyle = base;
        bctx.fillRect(0, 0, TEX, TEX);
        // Hintergrund je nach Typ anders
        if (def.texture === 'torch' || def.texture === 'banner' || def.texture === 'flower' || def.texture === 'fence' || def.texture === 'animal') {
            bctx.clearRect(0, 0, TEX, TEX);
            bctx.fillStyle = (def.texture === 'animal') ? '#6e9e5a' : '#3a3a4a';
            bctx.fillRect(0, 0, TEX, TEX);
        }
        switch (def.texture) {
            case 'stone':     cb3TexStone(bctx); break;
            case 'brick':     cb3TexBrick(bctx); break;
            case 'sandstone': cb3TexSandstone(bctx); break;
            case 'wood':      cb3TexWood(bctx); break;
            case 'roof':      cb3TexRoof(bctx); break;
            case 'merlon':    cb3TexMerlon(bctx); break;
            case 'window':    cb3TexWindow(bctx); break;
            case 'door':      cb3TexDoor(bctx, 'lower'); break;
            case 'torch':     cb3TexTorch(bctx); break;
            case 'banner':    cb3TexBanner(bctx); break;
            case 'leaves':    cb3TexLeaves(bctx); break;
            case 'gold':      cb3TexGold(bctx); break;
            case 'water':     cb3TexWater(bctx); break;
            case 'flower':    cb3TexFlower(bctx); break;
            case 'fence':     cb3TexFence(bctx); break;
            case 'animal':    cb3TexAnimalPreview(bctx, def); break;
            case 'bookshelf': cb3TexBookshelf(bctx); break;
            case 'stairs':    cb3TexStairsPreview(bctx, def); break;
            case 'bed':       cb3TexBedPreview(bctx, def); break;
        }
        // Leichten 3D-Lichteffekt drüberlegen (oben hell, unten dunkel)
        bctx.fillStyle = 'rgba(255,255,255,0.18)';
        bctx.fillRect(0, 0, TEX, 4);
        bctx.fillRect(0, 0, 4, TEX);
        bctx.fillStyle = 'rgba(0,0,0,0.25)';
        bctx.fillRect(0, TEX - 4, TEX, 4);
        bctx.fillRect(TEX - 4, 0, 4, TEX);
        el.style.backgroundImage = `url(${blockCanvas.toDataURL()})`;
        el.dataset.rendered = 'true';
    });
}
function cb3SelectBlock(typeId) {
    if ((_inventory[typeId] || 0) <= 0) return;
    _selectedType = _selectedType === typeId ? null : typeId;
    cb3UpdateUI();
    if (!_selectedType) cb3HideGhost();
}

function cb3BuyBlock(typeId) {
    const def = CB3_BLOCKS.find(b => b.id === typeId);
    if (!def || !window.currentUser) return;
    const isAdmin = window.currentUser.isAdmin === true;
    if (!isAdmin && window.currentUser.progress.coins < def.price) {
        if (typeof window.showToast === 'function') window.showToast('Nicht genug Münzen!', 'warning');
        return;
    }
    if (!isAdmin) {
        window.currentUser.progress.coins -= def.price;
    }
    _inventory[typeId] = (_inventory[typeId] || 0) + 1;
    if (typeof window.updateUserProgress === 'function') {
        window.updateUserProgress({ coins: window.currentUser.progress.coins });
    }
    cb3Save();
    cb3UpdateUI();
    // success/info Toast stummgeschaltet wie gewünscht
}

// ─────────────────────── GLOBAL EXPORTS ────────────────────────────

window.cbInit = cbInit;
window.cb3SelectBlock = cb3SelectBlock;
window.cb3BuyBlock = cb3BuyBlock;
window.cb3UpdateUI = cb3UpdateUI;
window.cb3ToggleBuildMode = cb3ToggleBuildMode;

// Auto-Init bei Section-Wechsel
function cb3SetupObserver() {
    const castle = document.getElementById('castle');
    if (!castle) {
        // Falls Element noch nicht da → später erneut versuchen
        setTimeout(cb3SetupObserver, 100);
        return;
    }
    const obs = new MutationObserver(() => {
        if (castle.classList.contains('active')
            && document.getElementById('castleBuilderContainer')
            && !document.getElementById('cb3Canvas')) {
            cbInit();
        }
    });
    obs.observe(castle, { attributes: true, attributeFilter: ['class'] });
    // Falls die Burg-Section schon aktiv ist, jetzt initialisieren
    if (castle.classList.contains('active') && document.getElementById('castleBuilderContainer') && !document.getElementById('cb3Canvas')) {
        cbInit();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb3SetupObserver);
} else {
    cb3SetupObserver();
}
