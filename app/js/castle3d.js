// ===== 3D BURG SYSTEM - CLASH OF CLANS STYLE =====

// Three.js wird per CDN geladen
let scene, camera, renderer, controls;
let castleGroup;
let selectedObject = null;
let isDragging = false;
let raycaster, mouse;
let castleObjects = {};
let cameraAngle = 0;
let isAutoRotating = true;

// Burg-Gebäude Definitionen (erweitert)
const CASTLE_BUILDINGS = {
    // Basis-Gebäude
    mainKeep: {
        name: 'Bergfried',
        cost: 0, // Startet mit
        unlockLevel: 1,
        size: { w: 3, h: 4, d: 3 },
        color: 0x8b7355,
        position: { x: 0, y: 0, z: 0 },
        description: 'Das Herz deiner Burg'
    },
    gate: {
        name: 'Burgtor',
        cost: 0,
        unlockLevel: 1,
        size: { w: 2, h: 2.5, d: 1 },
        color: 0x654321,
        position: { x: 0, y: 0, z: 5 },
        description: 'Der Eingang zur Burg'
    },
    // Level 2 Upgrades
    wallLeft: {
        name: 'Linke Mauer',
        cost: 50,
        unlockLevel: 2,
        size: { w: 0.5, h: 2, d: 4 },
        color: 0x696969,
        position: { x: -4, y: 0, z: 2 },
        description: 'Schutz vor Angreifern'
    },
    wallRight: {
        name: 'Rechte Mauer',
        cost: 50,
        unlockLevel: 2,
        size: { w: 0.5, h: 2, d: 4 },
        color: 0x696969,
        position: { x: 4, y: 0, z: 2 },
        description: 'Schutz vor Angreifern'
    },
    // Level 3 Upgrades
    towerLeft: {
        name: 'Linker Wachturm',
        cost: 100,
        unlockLevel: 3,
        size: { w: 1.5, h: 3.5, d: 1.5 },
        color: 0x5a5a5a,
        position: { x: -4, y: 0, z: 5 },
        description: 'Überblick über das Land'
    },
    towerRight: {
        name: 'Rechter Wachturm',
        cost: 100,
        unlockLevel: 3,
        size: { w: 1.5, h: 3.5, d: 1.5 },
        color: 0x5a5a5a,
        position: { x: 4, y: 0, z: 5 },
        description: 'Überblick über das Land'
    },
    // Level 4 Upgrades
    barracks: {
        name: 'Kaserne',
        cost: 150,
        unlockLevel: 4,
        size: { w: 2, h: 1.5, d: 2 },
        color: 0x8b4513,
        position: { x: -3, y: 0, z: -2 },
        description: 'Ausbildung der Wachen'
    },
    stable: {
        name: 'Stall',
        cost: 150,
        unlockLevel: 4,
        size: { w: 2.5, h: 1.5, d: 2 },
        color: 0xa0522d,
        position: { x: 3, y: 0, z: -2 },
        description: 'Pferde und Reittiere'
    },
    // Level 5 Upgrades
    smithy: {
        name: 'Schmiede',
        cost: 200,
        unlockLevel: 5,
        size: { w: 2, h: 2, d: 2 },
        color: 0x4a4a4a,
        position: { x: -2, y: 0, z: -4 },
        description: 'Waffen und Rüstungen'
    },
    treasury: {
        name: 'Schatzkammer',
        cost: 250,
        unlockLevel: 5,
        size: { w: 2, h: 2, d: 2 },
        color: 0xdaa520,
        position: { x: 2, y: 0, z: -4 },
        description: 'Sicherer Münzspeicher'
    },
    // Level 6 Upgrades
    chapel: {
        name: 'Kapelle',
        cost: 300,
        unlockLevel: 6,
        size: { w: 2, h: 3, d: 3 },
        color: 0xf5f5dc,
        position: { x: 0, y: 0, z: -5 },
        description: 'Spiritueller Rückzugsort'
    },
    wallBack: {
        name: 'Hintere Mauer',
        cost: 200,
        unlockLevel: 6,
        size: { w: 8, h: 2, d: 0.5 },
        color: 0x696969,
        position: { x: 0, y: 0, z: -7 },
        description: 'Vollständiger Schutz'
    },
    // Level 7+ Upgrades
    library: {
        name: 'Bibliothek',
        cost: 400,
        unlockLevel: 7,
        size: { w: 2.5, h: 2.5, d: 2 },
        color: 0x8b0000,
        position: { x: -5, y: 0, z: -4 },
        description: '+10% XP Bonus'
    },
    garden: {
        name: 'Burggarten',
        cost: 350,
        unlockLevel: 7,
        size: { w: 3, h: 0.3, d: 3 },
        color: 0x228b22,
        position: { x: 5, y: 0, z: -4 },
        description: 'Erholung und Schönheit'
    },
    // Level 8+ Premium
    dragonTower: {
        name: 'Drachenturm',
        cost: 500,
        unlockLevel: 8,
        size: { w: 2, h: 5, d: 2 },
        color: 0x800080,
        position: { x: 0, y: 0, z: 3 },
        description: 'Legendäres Bauwerk'
    },
    moat: {
        name: 'Burggraben',
        cost: 600,
        unlockLevel: 9,
        size: { w: 14, h: 0.5, d: 14 },
        color: 0x1e90ff,
        position: { x: 0, y: -0.5, z: 0 },
        description: 'Ultimativer Schutz',
        isWater: true
    },
    flags: {
        name: 'Königsbanner',
        cost: 100,
        unlockLevel: 3,
        size: { w: 0.1, h: 2, d: 0.5 },
        color: 0xff0000,
        position: { x: 0, y: 4, z: 0 },
        description: 'Zeige deine Macht'
    }
};

// Berechne Burg-Level basierend auf gekauften Gebäuden
function calculateCastleLevel(castleParts) {
    let level = 1;
    let totalValue = 0;

    Object.entries(castleParts).forEach(([key, owned]) => {
        if (owned && CASTLE_BUILDINGS[key]) {
            totalValue += CASTLE_BUILDINGS[key].cost;
        }
    });

    // Level basierend auf Gesamtwert
    if (totalValue >= 2000) level = 10;
    else if (totalValue >= 1500) level = 9;
    else if (totalValue >= 1000) level = 8;
    else if (totalValue >= 700) level = 7;
    else if (totalValue >= 500) level = 6;
    else if (totalValue >= 300) level = 5;
    else if (totalValue >= 200) level = 4;
    else if (totalValue >= 100) level = 3;
    else if (totalValue >= 50) level = 2;

    return level;
}

// 3D-Szene initialisieren
function init3DCastle() {
    const container = document.getElementById('castle3DContainer');
    if (!container) return;

    // Prüfen ob Three.js geladen ist
    if (typeof THREE === 'undefined') {
        console.error('Three.js nicht geladen');
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">3D wird geladen...</p>';
        return;
    }

    // Szene erstellen
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.Fog(0x1a1a2e, 20, 50);

    // Kamera
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
    camera.position.set(15, 12, 15);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Raycaster für Maus-Interaktion
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Lichter
    setupLights();

    // Boden
    createGround();

    // Burg-Gruppe
    castleGroup = new THREE.Group();
    scene.add(castleGroup);

    // Burg-Gebäude laden
    loadCastleBuildings();

    // Event Listeners
    setupEventListeners3D(container);

    // Animation starten
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        if (!container.clientWidth) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Lichter einrichten
function setupLights() {
    // Ambient Light (Grundbeleuchtung)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Direktionales Licht (Sonne)
    const sunLight = new THREE.DirectionalLight(0xffd700, 0.8);
    sunLight.position.set(10, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    scene.add(sunLight);

    // Punktlicht für Fackeln-Effekt
    const torchLight1 = new THREE.PointLight(0xff6600, 0.5, 10);
    torchLight1.position.set(-4, 2, 5);
    scene.add(torchLight1);

    const torchLight2 = new THREE.PointLight(0xff6600, 0.5, 10);
    torchLight2.position.set(4, 2, 5);
    scene.add(torchLight2);
}

// Boden erstellen
function createGround() {
    // Gras-Boden
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x3d5c3d,
        roughness: 0.9,
        metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Stein-Fundament
    const foundationGeometry = new THREE.BoxGeometry(12, 0.3, 12);
    const foundationMaterial = new THREE.MeshStandardMaterial({
        color: 0x555555,
        roughness: 0.8
    });
    const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
    foundation.position.y = 0.05;
    foundation.receiveShadow = true;
    scene.add(foundation);
}

// Einzelnes Gebäude erstellen
function createBuilding(key, building, isOwned) {
    const group = new THREE.Group();
    group.userData = { key, building, isOwned };

    // Hauptgebäude-Geometrie
    let geometry;
    let material;

    if (building.isWater) {
        // Wasser/Graben
        geometry = new THREE.TorusGeometry(7, 0.8, 8, 32);
        material = new THREE.MeshStandardMaterial({
            color: building.color,
            transparent: true,
            opacity: 0.7,
            roughness: 0.1,
            metalness: 0.3
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = building.position.y || 0;
        group.add(mesh);
    } else {
        // Standard Gebäude
        geometry = new THREE.BoxGeometry(
            building.size.w,
            building.size.h,
            building.size.d
        );

        if (!isOwned) {
            // Gesperrtes Gebäude - transparent und grau
            material = new THREE.MeshStandardMaterial({
                color: 0x333333,
                transparent: true,
                opacity: 0.3,
                roughness: 0.9
            });
        } else {
            material = new THREE.MeshStandardMaterial({
                color: building.color,
                roughness: 0.7,
                metalness: 0.2
            });
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = building.size.h / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);

        // Dach hinzufügen (für bestimmte Gebäude)
        if (['mainKeep', 'towerLeft', 'towerRight', 'chapel', 'library', 'dragonTower'].includes(key) && isOwned) {
            addRoof(group, building);
        }

        // Details hinzufügen
        if (isOwned) {
            addBuildingDetails(group, key, building);
        }
    }

    group.position.set(
        building.position.x,
        building.position.y || 0,
        building.position.z
    );

    return group;
}

// Dach hinzufügen
function addRoof(group, building) {
    const roofGeometry = new THREE.ConeGeometry(
        Math.max(building.size.w, building.size.d) * 0.7,
        building.size.h * 0.4,
        4
    );
    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b0000,
        roughness: 0.8
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = building.size.h + building.size.h * 0.2;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    group.add(roof);
}

// Details zu Gebäuden hinzufügen
function addBuildingDetails(group, key, building) {
    switch(key) {
        case 'mainKeep':
            // Fenster
            for (let i = 0; i < 3; i++) {
                const windowGeom = new THREE.BoxGeometry(0.3, 0.5, 0.1);
                const windowMat = new THREE.MeshStandardMaterial({ color: 0xffff99, emissive: 0xffff00, emissiveIntensity: 0.3 });
                const window1 = new THREE.Mesh(windowGeom, windowMat);
                window1.position.set(-0.8 + i * 0.8, building.size.h * 0.6, building.size.d / 2 + 0.05);
                group.add(window1);
            }
            break;

        case 'gate':
            // Tor-Öffnung
            const archGeom = new THREE.TorusGeometry(0.7, 0.1, 8, 16, Math.PI);
            const archMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a });
            const arch = new THREE.Mesh(archGeom, archMat);
            arch.position.set(0, 1.2, building.size.d / 2 + 0.05);
            group.add(arch);
            break;

        case 'flags':
            // Fahnenstange
            const poleGeom = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
            const poleMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
            const pole = new THREE.Mesh(poleGeom, poleMat);
            pole.position.y = 1;
            group.add(pole);

            // Flagge (animiert)
            const flagGeom = new THREE.PlaneGeometry(1, 0.6);
            const flagMat = new THREE.MeshStandardMaterial({
                color: 0xff0000,
                side: THREE.DoubleSide,
                roughness: 0.9
            });
            const flag = new THREE.Mesh(flagGeom, flagMat);
            flag.position.set(0.5, 1.7, 0);
            flag.userData.isFlag = true;
            group.add(flag);
            break;

        case 'garden':
            // Bäume
            for (let i = 0; i < 4; i++) {
                const treeGroup = new THREE.Group();

                // Stamm
                const trunkGeom = new THREE.CylinderGeometry(0.1, 0.15, 0.8, 8);
                const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
                const trunk = new THREE.Mesh(trunkGeom, trunkMat);
                trunk.position.y = 0.4;
                treeGroup.add(trunk);

                // Krone
                const crownGeom = new THREE.SphereGeometry(0.4, 8, 8);
                const crownMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
                const crown = new THREE.Mesh(crownGeom, crownMat);
                crown.position.y = 1;
                crown.castShadow = true;
                treeGroup.add(crown);

                treeGroup.position.set(
                    (i % 2 === 0 ? -1 : 1) * 0.8,
                    0.15,
                    (i < 2 ? -0.8 : 0.8)
                );
                group.add(treeGroup);
            }
            break;
    }
}

// Alle Burg-Gebäude laden
function loadCastleBuildings() {
    if (!castleGroup) return;

    // Alte Gebäude entfernen
    while (castleGroup.children.length > 0) {
        castleGroup.remove(castleGroup.children[0]);
    }
    castleObjects = {};

    // Benutzer-Daten laden
    const castleParts = currentUser?.progress?.castleParts || {
        mainKeep: true,
        gate: true
    };
    const userLevel = calculateCastleLevel(castleParts);

    // Gebäude erstellen
    Object.entries(CASTLE_BUILDINGS).forEach(([key, building]) => {
        const isOwned = castleParts[key] || false;
        const isUnlocked = userLevel >= building.unlockLevel;

        // Nur anzeigen wenn freigeschaltet oder im Besitz
        if (isOwned || isUnlocked) {
            const buildingMesh = createBuilding(key, building, isOwned);
            castleGroup.add(buildingMesh);
            castleObjects[key] = buildingMesh;
        }
    });

    // Level-Anzeige aktualisieren
    updateCastleLevelDisplay(userLevel);
}

// Castle Level Display aktualisieren
function updateCastleLevelDisplay(level) {
    const levelDisplay = document.getElementById('castle3DLevel');
    if (levelDisplay) {
        levelDisplay.textContent = `Level ${level}`;
    }

    const levelBar = document.getElementById('castleLevelBar');
    if (levelBar) {
        levelBar.style.width = `${Math.min(level * 10, 100)}%`;
    }
}

// Event Listeners für 3D-Szene
function setupEventListeners3D(container) {
    // Maus-Position tracken
    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

        // Auto-Rotation pausieren bei Mausbewegung
        isAutoRotating = false;
        clearTimeout(window.autoRotateTimeout);
        window.autoRotateTimeout = setTimeout(() => {
            isAutoRotating = true;
        }, 3000);
    });

    // Klick auf Gebäude
    container.addEventListener('click', (event) => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(castleGroup.children, true);

        if (intersects.length > 0) {
            let clicked = intersects[0].object;

            // Parent-Gruppe finden
            while (clicked.parent && clicked.parent !== castleGroup) {
                clicked = clicked.parent;
            }

            if (clicked.userData && clicked.userData.key) {
                selectBuilding(clicked.userData.key);
            }
        }
    });

    // Kamera-Steuerung mit Maus-Drag
    let isDraggingCamera = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => {
        isDraggingCamera = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mouseup', () => {
        isDraggingCamera = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDraggingCamera) return;

        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        cameraAngle += deltaX * 0.01;

        const radius = 20;
        const height = Math.max(5, Math.min(25, camera.position.y - deltaY * 0.05));

        camera.position.x = Math.sin(cameraAngle) * radius;
        camera.position.z = Math.cos(cameraAngle) * radius;
        camera.position.y = height;
        camera.lookAt(0, 2, 0);

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Zoom mit Mausrad
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomSpeed = 0.5;
        const direction = e.deltaY > 0 ? 1 : -1;

        const newDistance = camera.position.length() + direction * zoomSpeed;
        if (newDistance > 10 && newDistance < 40) {
            camera.position.normalize().multiplyScalar(newDistance);
        }
    });
}

// Gebäude auswählen
function selectBuilding(key) {
    const building = CASTLE_BUILDINGS[key];
    if (!building) return;

    const isOwned = currentUser?.progress?.castleParts?.[key] || false;

    // Info-Panel aktualisieren
    const infoPanel = document.getElementById('buildingInfoPanel');
    if (infoPanel) {
        infoPanel.innerHTML = `
            <h4>${building.name}</h4>
            <p>${building.description}</p>
            ${isOwned ?
                '<span class="building-owned">✓ Im Besitz</span>' :
                `<div class="building-cost">
                    <span>Kosten: ${building.cost} 🐄</span>
                    <button class="btn btn-small btn-primary" onclick="purchaseCastleBuilding('${key}')">
                        Bauen
                    </button>
                </div>`
            }
        `;
        infoPanel.classList.add('active');
    }

    // Gebäude hervorheben
    Object.values(castleObjects).forEach(obj => {
        if (obj.userData.key === key) {
            // Hervorhebung
            obj.traverse(child => {
                if (child.isMesh) {
                    child.material.emissive = new THREE.Color(0xffff00);
                    child.material.emissiveIntensity = 0.3;
                }
            });
        } else {
            obj.traverse(child => {
                if (child.isMesh && child.material.emissive) {
                    child.material.emissiveIntensity = 0;
                }
            });
        }
    });
}

// Gebäude kaufen
function purchaseCastleBuilding(key) {
    if (!currentUser) return;

    const building = CASTLE_BUILDINGS[key];
    if (!building) return;

    if (currentUser.progress.coins < building.cost) {
        showToast('Nicht genug Münzen! 🐄', 'error');
        return;
    }

    // Level prüfen
    const currentLevel = calculateCastleLevel(currentUser.progress.castleParts);
    if (currentLevel < building.unlockLevel) {
        showToast(`Benötigt Burg-Level ${building.unlockLevel}!`, 'warning');
        return;
    }

    // Kaufen
    currentUser.progress.coins -= building.cost;
    currentUser.progress.castleParts[key] = true;
    currentUser.progress.castleLevel = calculateCastleLevel(currentUser.progress.castleParts);

    // Speichern
    updateUserProgress({
        coins: currentUser.progress.coins,
        castleParts: currentUser.progress.castleParts,
        castleLevel: currentUser.progress.castleLevel
    });

    // Animation
    showToast(`🏰 ${building.name} wurde gebaut!`, 'success');

    // Konfetti
    if (typeof createConfetti === 'function') {
        createConfetti();
    }

    // Sound
    if (typeof playSound === 'function') {
        playSound('levelup');
    }

    // 3D-Szene neu laden
    loadCastleBuildings();

    // Shop aktualisieren
    update3DShop();

    // UI aktualisieren
    updateSidebarStats();
}

// 3D Shop aktualisieren
function update3DShop() {
    const shopContainer = document.getElementById('castle3DShop');
    if (!shopContainer || !currentUser) return;

    const castleParts = currentUser.progress.castleParts || {};
    const userLevel = calculateCastleLevel(castleParts);

    let html = '<h3>🛒 Verfügbare Gebäude</h3><div class="shop-grid">';

    Object.entries(CASTLE_BUILDINGS).forEach(([key, building]) => {
        const isOwned = castleParts[key] || false;
        const isUnlocked = userLevel >= building.unlockLevel;
        const canAfford = currentUser.progress.coins >= building.cost;

        if (building.cost === 0) return; // Starter-Gebäude nicht anzeigen

        let statusClass = '';
        let statusText = '';

        if (isOwned) {
            statusClass = 'owned';
            statusText = '✓ Gebaut';
        } else if (!isUnlocked) {
            statusClass = 'locked';
            statusText = `Level ${building.unlockLevel}`;
        } else if (!canAfford) {
            statusClass = 'expensive';
            statusText = `${building.cost} 🐄`;
        } else {
            statusClass = 'available';
            statusText = `${building.cost} 🐄`;
        }

        html += `
            <div class="shop-item-3d ${statusClass}" onclick="${isUnlocked && !isOwned && canAfford ? `purchaseCastleBuilding('${key}')` : ''}">
                <div class="shop-item-icon" style="background-color: #${building.color.toString(16).padStart(6, '0')}"></div>
                <div class="shop-item-info">
                    <span class="shop-item-name">${building.name}</span>
                    <span class="shop-item-desc">${building.description}</span>
                </div>
                <span class="shop-item-status">${statusText}</span>
            </div>
        `;
    });

    html += '</div>';
    shopContainer.innerHTML = html;
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    if (!renderer || !scene || !camera) return;

    // Auto-Rotation
    if (isAutoRotating) {
        cameraAngle += 0.002;
        const radius = camera.position.length();
        camera.position.x = Math.sin(cameraAngle) * radius * 0.7;
        camera.position.z = Math.cos(cameraAngle) * radius * 0.7;
        camera.lookAt(0, 2, 0);
    }

    // Flaggen-Animation
    castleGroup.traverse(child => {
        if (child.userData && child.userData.isFlag) {
            child.rotation.y = Math.sin(Date.now() * 0.003) * 0.2;
        }
    });

    renderer.render(scene, camera);
}

// Kamera-Buttons
function rotateCameraLeft() {
    cameraAngle -= 0.5;
    updateCameraPosition();
}

function rotateCameraRight() {
    cameraAngle += 0.5;
    updateCameraPosition();
}

function zoomCameraIn() {
    const newDistance = camera.position.length() - 2;
    if (newDistance > 10) {
        camera.position.normalize().multiplyScalar(newDistance);
    }
}

function zoomCameraOut() {
    const newDistance = camera.position.length() + 2;
    if (newDistance < 40) {
        camera.position.normalize().multiplyScalar(newDistance);
    }
}

function resetCameraView() {
    cameraAngle = Math.PI / 4;
    camera.position.set(15, 12, 15);
    camera.lookAt(0, 2, 0);
}

function updateCameraPosition() {
    const radius = camera.position.length();
    const height = camera.position.y;
    camera.position.x = Math.sin(cameraAngle) * radius * 0.7;
    camera.position.z = Math.cos(cameraAngle) * radius * 0.7;
    camera.lookAt(0, 2, 0);
}

// CSS für 3D-Burg
const castle3DStyles = document.createElement('style');
castle3DStyles.textContent = `
    /* 3D Castle Container */
    #castle3DContainer {
        width: 100%;
        height: 400px;
        border-radius: 15px;
        overflow: hidden;
        background: linear-gradient(180deg, #1a1a2e 0%, #2d2d4a 100%);
        position: relative;
    }

    #castle3DContainer canvas {
        display: block;
    }

    /* Camera Controls */
    .camera-controls {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    }

    .camera-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--border-gold);
        background: rgba(26, 26, 46, 0.9);
        color: var(--text-gold);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        transition: all 0.3s ease;
    }

    .camera-btn:hover {
        background: var(--border-gold);
        color: var(--bg-primary);
        transform: scale(1.1);
    }

    /* Castle Level Display */
    .castle-level-display {
        position: absolute;
        top: 15px;
        left: 15px;
        background: rgba(26, 26, 46, 0.9);
        padding: 10px 20px;
        border-radius: 25px;
        border: 2px solid var(--border-gold);
        z-index: 10;
    }

    .castle-level-display h3 {
        color: var(--text-gold);
        margin: 0;
        font-size: 1em;
    }

    .level-bar {
        width: 150px;
        height: 8px;
        background: var(--bg-tertiary);
        border-radius: 4px;
        margin-top: 5px;
        overflow: hidden;
    }

    .level-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--secondary), var(--secondary-light));
        border-radius: 4px;
        transition: width 0.5s ease;
    }

    /* Building Info Panel */
    #buildingInfoPanel {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(26, 26, 46, 0.95);
        padding: 15px;
        border-radius: 12px;
        border: 2px solid var(--border-gold);
        max-width: 250px;
        z-index: 10;
        opacity: 0;
        transform: translateX(20px);
        transition: all 0.3s ease;
        pointer-events: none;
    }

    #buildingInfoPanel.active {
        opacity: 1;
        transform: translateX(0);
        pointer-events: auto;
    }

    #buildingInfoPanel h4 {
        color: var(--text-gold);
        margin: 0 0 8px 0;
    }

    #buildingInfoPanel p {
        color: var(--text-secondary);
        font-size: 0.9em;
        margin: 0 0 10px 0;
    }

    .building-owned {
        color: var(--success);
        font-weight: bold;
    }

    .building-cost {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    .building-cost span {
        color: var(--warning);
        font-weight: bold;
    }

    /* 3D Shop Grid */
    .shop-grid {
        display: grid;
        gap: 10px;
        max-height: 300px;
        overflow-y: auto;
        padding-right: 5px;
    }

    .shop-item-3d {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: var(--bg-tertiary);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }

    .shop-item-3d:hover:not(.owned):not(.locked) {
        border-color: var(--border-gold);
        transform: translateX(5px);
    }

    .shop-item-3d.owned {
        opacity: 0.6;
        cursor: default;
    }

    .shop-item-3d.locked {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .shop-item-3d.available {
        border-color: var(--success);
    }

    .shop-item-3d.expensive {
        opacity: 0.7;
    }

    .shop-item-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        flex-shrink: 0;
    }

    .shop-item-info {
        flex: 1;
        min-width: 0;
    }

    .shop-item-name {
        display: block;
        font-weight: bold;
        color: var(--text-primary);
    }

    .shop-item-desc {
        display: block;
        font-size: 0.75em;
        color: var(--text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .shop-item-status {
        font-weight: bold;
        color: var(--warning);
        white-space: nowrap;
    }

    .shop-item-3d.owned .shop-item-status {
        color: var(--success);
    }

    .shop-item-3d.locked .shop-item-status {
        color: var(--text-light);
    }

    /* Castle Stats */
    .castle-stats-3d {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-bottom: 20px;
    }

    .stat-card {
        background: var(--bg-tertiary);
        padding: 15px;
        border-radius: 12px;
        text-align: center;
        border: 1px solid var(--border-color);
    }

    .stat-card .stat-value {
        font-size: 1.5em;
        font-weight: bold;
        color: var(--text-gold);
    }

    .stat-card .stat-label {
        font-size: 0.8em;
        color: var(--text-secondary);
    }

    /* Responsive */
    @media (max-width: 768px) {
        #castle3DContainer {
            height: 300px;
        }

        .camera-controls {
            bottom: 10px;
        }

        .camera-btn {
            width: 35px;
            height: 35px;
        }
    }
`;
document.head.appendChild(castle3DStyles);

// Initialisierung wenn Seite geladen
document.addEventListener('DOMContentLoaded', function() {
    // Three.js laden
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
            console.log('Three.js geladen');
            // Warte bis Castle-Sektion angezeigt wird
        };
        document.head.appendChild(script);
    }
});

// Burg-Sektion zeigen
function showCastleSection() {
    // Kleine Verzögerung damit Container sichtbar ist
    setTimeout(() => {
        if (typeof THREE !== 'undefined' && !renderer) {
            init3DCastle();
        }
        update3DShop();
    }, 100);
}
