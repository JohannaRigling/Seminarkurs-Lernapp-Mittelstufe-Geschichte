// ===== AVATAR EDITOR & RENDERING SYSTEM =====

// Avatar-Konfigurationsoptionen
const AVATAR_OPTIONS = {
    skinTones: [
        { id: 'very-light', name: 'Sehr hell', color: '#FFE4C4' },
        { id: 'light', name: 'Hell', color: '#F4D5B4' },
        { id: 'light-medium', name: 'Hell-Mittel', color: '#E8B895' },
        { id: 'medium', name: 'Mittel', color: '#D4A574' },
        { id: 'medium-dark', name: 'Mittel-Dunkel', color: '#B8865A' },
        { id: 'dark', name: 'Dunkel', color: '#8B6C47' },
        { id: 'very-dark', name: 'Sehr dunkel', color: '#5D4037' }
    ],

    hairStyles: [
        { id: 'short-straight', name: 'Kurz Glatt', icon: '💇' },
        { id: 'short-curly', name: 'Kurz Lockig', icon: '💇‍♀️' },
        { id: 'medium-straight', name: 'Mittel Glatt', icon: '👱' },
        { id: 'medium-wavy', name: 'Mittel Wellig', icon: '👱‍♀️' },
        { id: 'long-straight', name: 'Lang Glatt', icon: '🙎' },
        { id: 'long-wavy', name: 'Lang Wellig', icon: '🙎‍♀️' },
        { id: 'long-curly', name: 'Lang Lockig', icon: '👩‍🦱' },
        { id: 'ponytail', name: 'Pferdeschwanz', icon: '👧' },
        { id: 'bun', name: 'Dutt', icon: '👩' },
        { id: 'braids', name: 'Zöpfe', icon: '👧' },
        { id: 'buzz', name: 'Kurzhaar', icon: '👨' },
        { id: 'bald', name: 'Glatze', icon: '👨‍🦲' }
    ],

    hairColors: [
        { id: 'black', name: 'Schwarz', color: '#000000' },
        { id: 'jet-black', name: 'Tiefschwarz', color: '#0C0C0C' },
        { id: 'dark-brown', name: 'Dunkelbraun', color: '#3B2414' },
        { id: 'brown', name: 'Braun', color: '#5C3A21' },
        { id: 'chestnut', name: 'Kastanienbraun', color: '#8B4513' },
        { id: 'light-brown', name: 'Hellbraun', color: '#A0522D' },
        { id: 'golden-brown', name: 'Goldbraun', color: '#B8860B' },
        { id: 'dark-blonde', name: 'Dunkelblond', color: '#C9A961' },
        { id: 'blonde', name: 'Blond', color: '#E6C28F' },
        { id: 'light-blonde', name: 'Hellblond', color: '#F0E68C' },
        { id: 'platinum', name: 'Platinblond', color: '#FFF8DC' },
        { id: 'strawberry', name: 'Erdbeerblond', color: '#D4916C' },
        { id: 'ginger', name: 'Ingwer', color: '#C85A38' },
        { id: 'red', name: 'Rot', color: '#B94E48' },
        { id: 'auburn', name: 'Rotbraun', color: '#A52A2A' },
        { id: 'burgundy', name: 'Burgunderrot', color: '#8B0A50' },
        { id: 'copper', name: 'Kupfer', color: '#B87333' },
        { id: 'silver', name: 'Silber', color: '#C0C0C0' },
        { id: 'gray', name: 'Grau', color: '#808080' },
        { id: 'white', name: 'Weiß', color: '#F5F5F5' },
        { id: 'blue', name: 'Blau', color: '#4169E1' },
        { id: 'navy', name: 'Marineblau', color: '#000080' },
        { id: 'teal', name: 'Türkis', color: '#008080' },
        { id: 'pink', name: 'Pink', color: '#FF69B4' },
        { id: 'hot-pink', name: 'Hot Pink', color: '#FF1493' },
        { id: 'purple', name: 'Lila', color: '#9370DB' },
        { id: 'violet', name: 'Violett', color: '#8B00FF' },
        { id: 'green', name: 'Grün', color: '#32CD32' },
        { id: 'mint', name: 'Mint', color: '#98FF98' },
        { id: 'orange', name: 'Orange', color: '#FF8C00' }
    ],

    eyeShapes: [
        { id: 'round', name: 'Rund' },
        { id: 'almond', name: 'Mandelförmig' },
        { id: 'hooded', name: 'Schlupflid' },
        { id: 'upturned', name: 'Aufwärts' },
        { id: 'downturned', name: 'Abwärts' },
        { id: 'monolid', name: 'Monolid' }
    ],

    eyeColors: [
        { id: 'dark-brown', name: 'Dunkelbraun', color: '#3B2414' },
        { id: 'brown', name: 'Braun', color: '#5C4033' },
        { id: 'light-brown', name: 'Hellbraun', color: '#8B4513' },
        { id: 'hazel', name: 'Haselnuss', color: '#9A7B4F' },
        { id: 'amber', name: 'Bernstein', color: '#FFBF00' },
        { id: 'honey', name: 'Honig', color: '#D4A017' },
        { id: 'dark-green', name: 'Dunkelgrün', color: '#013220' },
        { id: 'green', name: 'Grün', color: '#228B22' },
        { id: 'light-green', name: 'Hellgrün', color: '#90EE90' },
        { id: 'emerald', name: 'Smaragd', color: '#50C878' },
        { id: 'dark-blue', name: 'Dunkelblau', color: '#00008B' },
        { id: 'blue', name: 'Blau', color: '#4169E1' },
        { id: 'light-blue', name: 'Hellblau', color: '#87CEEB' },
        { id: 'gray', name: 'Grau', color: '#708090' },
        { id: 'blue-gray', name: 'Blaugrau', color: '#6699CC' },
        { id: 'violet', name: 'Violett', color: '#8B00FF' },
        { id: 'red', name: 'Rot', color: '#DC143C' },
        { id: 'black', name: 'Schwarz', color: '#000000' }
    ],

    mouthStyles: [
        { id: 'smile', name: 'Lächeln' },
        { id: 'neutral', name: 'Neutral' },
        { id: 'slight-smile', name: 'Kleines Lächeln' },
        { id: 'grin', name: 'Grinsen' },
        { id: 'smirk', name: 'Schmunzeln' }
    ],

    eyebrowStyles: [
        { id: 'natural', name: 'Natürlich' },
        { id: 'arched', name: 'Geschwungen' },
        { id: 'straight', name: 'Gerade' },
        { id: 'round', name: 'Rund' },
        { id: 'angled', name: 'Eckig' }
    ],

    lashStyles: [
        { id: 'short', name: 'Kurz' },
        { id: 'medium', name: 'Mittel' },
        { id: 'long', name: 'Lang' },
        { id: 'dramatic', name: 'Dramatisch' }
    ],

    glasses: [
        { id: 'none', name: 'Keine' },
        { id: 'round', name: 'Rund' },
        { id: 'square', name: 'Eckig' },
        { id: 'cat-eye', name: 'Cat-Eye' },
        { id: 'aviator', name: 'Pilotenbrille' },
        { id: 'sunglasses', name: 'Sonnenbrille' }
    ],

    earrings: [
        { id: 'none', name: 'Keine' },
        { id: 'studs', name: 'Ohrstecker' },
        { id: 'hoops-small', name: 'Kleine Ringe' },
        { id: 'hoops-large', name: 'Große Ringe' },
        { id: 'dangles', name: 'Hänger' }
    ],

    necklaces: [
        { id: 'none', name: 'Keine' },
        { id: 'chain', name: 'Kette' },
        { id: 'pendant', name: 'Anhänger' },
        { id: 'choker', name: 'Choker' }
    ],

    hats: [
        { id: 'none', name: 'Keiner' },
        { id: 'cap', name: 'Cap' },
        { id: 'beanie', name: 'Mütze' },
        { id: 'hat', name: 'Hut' },
        { id: 'headband', name: 'Stirnband' },
        { id: 'bow', name: 'Schleife' }
    ]
};

// Standard-Avatar-Konfiguration
const DEFAULT_AVATAR = {
    skin: 'light',
    hair: { style: 'medium-straight', color: 'brown' },
    eyes: { shape: 'almond', color: 'brown', lashes: 'medium' },
    eyebrows: { style: 'natural', thickness: 'medium' },
    mouth: 'smile',
    features: {
        freckles: false,
        moles: false,
        blush: false
    },
    accessories: {
        glasses: 'none',
        earrings: 'none',
        necklace: 'none',
        hat: 'none'
    }
};

// ========================================
// AVATAR EDITOR UI
// ========================================

/**
 * Hilfsfunktion: Merged User-Avatar mit Default-Avatar
 */
function mergeWithDefault(userAvatar) {
    const defaultCopy = JSON.parse(JSON.stringify(DEFAULT_AVATAR));
    if (!userAvatar) return defaultCopy;

    const merged = JSON.parse(JSON.stringify(userAvatar));

    // Stelle sicher dass alle Nested Objects existieren
    if (!merged.hair) merged.hair = defaultCopy.hair;
    if (!merged.eyes) merged.eyes = defaultCopy.eyes;
    if (!merged.eyebrows) merged.eyebrows = defaultCopy.eyebrows;
    if (!merged.features) merged.features = defaultCopy.features;
    if (!merged.accessories) merged.accessories = defaultCopy.accessories;

    // Merge nested properties
    merged.hair = { ...defaultCopy.hair, ...merged.hair };
    merged.eyes = { ...defaultCopy.eyes, ...merged.eyes };
    merged.eyebrows = { ...defaultCopy.eyebrows, ...merged.eyebrows };
    merged.features = { ...defaultCopy.features, ...merged.features };
    merged.accessories = { ...defaultCopy.accessories, ...merged.accessories };

    return merged;
}

/**
 * Öffnet Avatar-Editor
 */
function openAvatarEditor() {
    if (!currentUser) return;

    const modal = document.getElementById('avatarEditorModal');
    const content = document.getElementById('avatarEditorContent');

    if (!modal || !content) return;

    // Lade aktuellen Avatar oder Default (mit vollständiger Struktur)
    const currentAvatar = mergeWithDefault(currentUser.avatar);

    content.innerHTML = `
        <div class="avatar-editor">
            <h2>🎨 Avatar gestalten</h2>

            <div class="avatar-editor-layout">
                <!-- Avatar Preview -->
                <div class="avatar-preview-section">
                    <div class="avatar-preview-container">
                        <div id="avatarPreview"></div>
                    </div>
                    <button class="btn btn-secondary" onclick="randomizeAvatar()">
                        🎲 Zufällig
                    </button>
                </div>

                <!-- Customization Options -->
                <div class="avatar-options-section">
                    <div class="avatar-tabs">
                        <button class="avatar-tab active" data-tab="skin" onclick="switchAvatarTab('skin')">
                            Haut
                        </button>
                        <button class="avatar-tab" data-tab="hair" onclick="switchAvatarTab('hair')">
                            Haare
                        </button>
                        <button class="avatar-tab" data-tab="face" onclick="switchAvatarTab('face')">
                            Gesicht
                        </button>
                        <button class="avatar-tab" data-tab="features" onclick="switchAvatarTab('features')">
                            Merkmale
                        </button>
                        <button class="avatar-tab" data-tab="accessories" onclick="switchAvatarTab('accessories')">
                            Accessoires
                        </button>
                    </div>

                    <div class="avatar-options-content" id="avatarOptionsContent">
                        <!-- Content wird dynamisch geladen -->
                    </div>
                </div>
            </div>

            <div class="avatar-editor-actions">
                <button class="btn btn-primary" onclick="saveAvatar()">
                    💾 Speichern
                </button>
                <button class="btn btn-secondary" onclick="closeAvatarEditor()">
                    Abbrechen
                </button>
            </div>
        </div>
    `;

    // Initialisiere Editor
    window.currentEditingAvatar = currentAvatar;
    switchAvatarTab('skin');
    updateAvatarPreview();

    modal.style.display = 'block';
}

/**
 * Wechselt Tab im Avatar-Editor
 */
function switchAvatarTab(tabName) {
    // Update active tab
    document.querySelectorAll('.avatar-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });

    // Lade Tab-Content
    const content = document.getElementById('avatarOptionsContent');
    if (!content) return;

    switch (tabName) {
        case 'skin':
            content.innerHTML = renderSkinOptions();
            break;
        case 'hair':
            content.innerHTML = renderHairOptions();
            break;
        case 'face':
            content.innerHTML = renderFaceOptions();
            break;
        case 'features':
            content.innerHTML = renderFeaturesOptions();
            break;
        case 'accessories':
            content.innerHTML = renderAccessoriesOptions();
            break;
    }
}

/**
 * Rendert Haut-Optionen
 */
function renderSkinOptions() {
    return `
        <div class="option-category">
            <h3>Hautfarbe</h3>
            <div class="color-picker-grid">
                ${AVATAR_OPTIONS.skinTones.map(tone => `
                    <div class="color-option ${window.currentEditingAvatar.skin === tone.id ? 'selected' : ''}"
                         onclick="updateAvatar('skin', '${tone.id}')"
                         style="background-color: ${tone.color};"
                         title="${tone.name}">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Rendert Haar-Optionen
 */
function renderHairOptions() {
    const avatar = window.currentEditingAvatar;

    return `
        <div class="option-category">
            <h3>Frisur</h3>
            <div class="style-picker-grid">
                ${AVATAR_OPTIONS.hairStyles.map(style => `
                    <div class="style-option ${avatar.hair.style === style.id ? 'selected' : ''}"
                         onclick="updateAvatar('hair.style', '${style.id}')">
                        <span class="style-icon">${style.icon}</span>
                        <span class="style-name">${style.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="option-category">
            <h3>Haarfarbe</h3>
            <div class="color-picker-grid">
                ${AVATAR_OPTIONS.hairColors.map(color => `
                    <div class="color-option ${avatar.hair.color === color.id ? 'selected' : ''}"
                         onclick="updateAvatar('hair.color', '${color.id}')"
                         style="background-color: ${color.color};"
                         title="${color.name}">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Rendert Gesichts-Optionen
 */
function renderFaceOptions() {
    const avatar = window.currentEditingAvatar;

    return `
        <div class="option-category">
            <h3>Augenform</h3>
            <div class="style-picker-grid">
                ${AVATAR_OPTIONS.eyeShapes.map(shape => `
                    <div class="style-option ${avatar.eyes.shape === shape.id ? 'selected' : ''}"
                         onclick="updateAvatar('eyes.shape', '${shape.id}')">
                        <span class="style-name">${shape.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="option-category">
            <h3>Augenfarbe</h3>
            <div class="color-picker-grid">
                ${AVATAR_OPTIONS.eyeColors.map(color => `
                    <div class="color-option ${avatar.eyes.color === color.id ? 'selected' : ''}"
                         onclick="updateAvatar('eyes.color', '${color.id}')"
                         style="background-color: ${color.color};"
                         title="${color.name}">
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="option-category">
            <h3>Wimpern</h3>
            <div class="style-picker-grid small">
                ${AVATAR_OPTIONS.lashStyles.map(style => `
                    <div class="style-option ${avatar.eyes.lashes === style.id ? 'selected' : ''}"
                         onclick="updateAvatar('eyes.lashes', '${style.id}')">
                        <span class="style-name">${style.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="option-category">
            <h3>Augenbrauen</h3>
            <div class="style-picker-grid">
                ${AVATAR_OPTIONS.eyebrowStyles.map(style => `
                    <div class="style-option ${avatar.eyebrows.style === style.id ? 'selected' : ''}"
                         onclick="updateAvatar('eyebrows.style', '${style.id}')">
                        <span class="style-name">${style.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="option-category">
            <h3>Mund</h3>
            <div class="style-picker-grid">
                ${AVATAR_OPTIONS.mouthStyles.map(style => `
                    <div class="style-option ${avatar.mouth === style.id ? 'selected' : ''}"
                         onclick="updateAvatar('mouth', '${style.id}')">
                        <span class="style-name">${style.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Rendert Merkmale-Optionen
 */
function renderFeaturesOptions() {
    const avatar = window.currentEditingAvatar;

    return `
        <div class="option-category">
            <h3>Besondere Merkmale</h3>

            <label class="toggle-option">
                <input type="checkbox"
                       ${avatar.features.freckles ? 'checked' : ''}
                       onchange="updateAvatar('features.freckles', this.checked)">
                <span>Sommersprossen</span>
            </label>

            <label class="toggle-option">
                <input type="checkbox"
                       ${avatar.features.moles ? 'checked' : ''}
                       onchange="updateAvatar('features.moles', this.checked)">
                <span>Muttermale</span>
            </label>

            <label class="toggle-option">
                <input type="checkbox"
                       ${avatar.features.blush ? 'checked' : ''}
                       onchange="updateAvatar('features.blush', this.checked)">
                <span>Rouge/Wangen</span>
            </label>
        </div>
    `;
}

/**
 * Rendert Accessoire-Optionen
 */
function renderAccessoriesOptions() {
    const avatar = window.currentEditingAvatar;

    return `
        <div class="option-category">
            <h3>Brille</h3>
            <div class="style-picker-grid">
                ${AVATAR_OPTIONS.glasses.map(style => `
                    <div class="style-option ${avatar.accessories.glasses === style.id ? 'selected' : ''}"
                         onclick="updateAvatar('accessories.glasses', '${style.id}')">
                        <span class="style-name">${style.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="option-category">
            <h3>Ohrringe</h3>
            <div class="style-picker-grid">
                ${AVATAR_OPTIONS.earrings.map(style => `
                    <div class="style-option ${avatar.accessories.earrings === style.id ? 'selected' : ''}"
                         onclick="updateAvatar('accessories.earrings', '${style.id}')">
                        <span class="style-name">${style.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="option-category">
            <h3>Kette</h3>
            <div class="style-picker-grid">
                ${AVATAR_OPTIONS.necklaces.map(style => `
                    <div class="style-option ${avatar.accessories.necklace === style.id ? 'selected' : ''}"
                         onclick="updateAvatar('accessories.necklace', '${style.id}')">
                        <span class="style-name">${style.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="option-category">
            <h3>Kopfbedeckung</h3>
            <div class="style-picker-grid">
                ${AVATAR_OPTIONS.hats.map(style => `
                    <div class="style-option ${avatar.accessories.hat === style.id ? 'selected' : ''}"
                         onclick="updateAvatar('accessories.hat', '${style.id}')">
                        <span class="style-name">${style.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Aktualisiert Avatar-Property
 */
function updateAvatar(path, value) {
    const avatar = window.currentEditingAvatar;
    const parts = path.split('.');

    if (parts.length === 1) {
        avatar[parts[0]] = value;
    } else if (parts.length === 2) {
        if (!avatar[parts[0]]) avatar[parts[0]] = {};
        avatar[parts[0]][parts[1]] = value;
    }

    updateAvatarPreview();

    // Re-render aktuellen Tab um Auswahl zu aktualisieren
    const activeTab = document.querySelector('.avatar-tab.active');
    if (activeTab) {
        switchAvatarTab(activeTab.dataset.tab);
    }
}

/**
 * Randomisiert Avatar
 */
function randomizeAvatar() {
    const avatar = window.currentEditingAvatar;

    avatar.skin = AVATAR_OPTIONS.skinTones[Math.floor(Math.random() * AVATAR_OPTIONS.skinTones.length)].id;
    avatar.hair = {
        style: AVATAR_OPTIONS.hairStyles[Math.floor(Math.random() * AVATAR_OPTIONS.hairStyles.length)].id,
        color: AVATAR_OPTIONS.hairColors[Math.floor(Math.random() * AVATAR_OPTIONS.hairColors.length)].id
    };
    avatar.eyes = {
        shape: AVATAR_OPTIONS.eyeShapes[Math.floor(Math.random() * AVATAR_OPTIONS.eyeShapes.length)].id,
        color: AVATAR_OPTIONS.eyeColors[Math.floor(Math.random() * AVATAR_OPTIONS.eyeColors.length)].id,
        lashes: AVATAR_OPTIONS.lashStyles[Math.floor(Math.random() * AVATAR_OPTIONS.lashStyles.length)].id
    };
    avatar.eyebrows = {
        style: AVATAR_OPTIONS.eyebrowStyles[Math.floor(Math.random() * AVATAR_OPTIONS.eyebrowStyles.length)].id,
        thickness: 'medium'
    };
    avatar.mouth = AVATAR_OPTIONS.mouthStyles[Math.floor(Math.random() * AVATAR_OPTIONS.mouthStyles.length)].id;
    avatar.features = {
        freckles: Math.random() > 0.7,
        moles: Math.random() > 0.8,
        blush: Math.random() > 0.5
    };
    avatar.accessories = {
        glasses: Math.random() > 0.7 ? AVATAR_OPTIONS.glasses[Math.floor(Math.random() * AVATAR_OPTIONS.glasses.length)].id : 'none',
        earrings: Math.random() > 0.6 ? AVATAR_OPTIONS.earrings[Math.floor(Math.random() * AVATAR_OPTIONS.earrings.length)].id : 'none',
        necklace: Math.random() > 0.8 ? AVATAR_OPTIONS.necklaces[Math.floor(Math.random() * AVATAR_OPTIONS.necklaces.length)].id : 'none',
        hat: Math.random() > 0.85 ? AVATAR_OPTIONS.hats[Math.floor(Math.random() * AVATAR_OPTIONS.hats.length)].id : 'none'
    };

    updateAvatarPreview();

    // Refresh aktuellen Tab
    const activeTab = document.querySelector('.avatar-tab.active');
    if (activeTab) {
        switchAvatarTab(activeTab.dataset.tab);
    }

    showToast('Avatar zufällig generiert! 🎲', 'success');
}

/**
 * Speichert Avatar
 */
function saveAvatar() {
    if (!currentUser) return;

    currentUser.avatar = window.currentEditingAvatar;

    updateUserProgress({ avatar: currentUser.avatar });

    showToast('Avatar gespeichert! 🎨', 'success');
    addXP(10);

    closeAvatarEditor();

    // Update Avatar-Anzeigen
    updateAllAvatarDisplays();
}

/**
 * Schließt Avatar-Editor
 */
function closeAvatarEditor() {
    const modal = document.getElementById('avatarEditorModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ========================================
// AVATAR RENDERING (SVG)
// ========================================

/**
 * Aktualisiert Avatar-Vorschau
 */
function updateAvatarPreview() {
    const container = document.getElementById('avatarPreview');
    if (!container) return;

    const avatar = window.currentEditingAvatar;
    container.innerHTML = renderAvatarSVG(avatar, 200);
}

/**
 * Rendert Avatar als SVG im flachen Cartoon-Stil
 */
function renderAvatarSVG(avatar, size = 100) {
    if (!avatar) avatar = DEFAULT_AVATAR;

    const skinColor = AVATAR_OPTIONS.skinTones.find(t => t.id === avatar.skin)?.color || '#FFE4C4';
    const hairColor = AVATAR_OPTIONS.hairColors.find(c => c.id === avatar.hair.color)?.color || '#8B4513';
    const eyeColor = AVATAR_OPTIONS.eyeColors.find(c => c.id === avatar.eyes.color)?.color || '#8B4513';

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="240" height="240" fill="#6b6b6b" rx="0"/>

            <!-- Clothing/Body -->
            <rect x="70" y="180" width="100" height="60" fill="#333" rx="10"/>

            <!-- Hair (komplett - eng am Kopf anliegend) -->
            ${renderHair(avatar.hair, hairColor)}

            <!-- Head (breiter und höher) -->
            <rect x="60" y="60" width="120" height="130" fill="${skinColor}" rx="60"/>

            <!-- Ears (smaller) -->
            <ellipse cx="50" cy="110" rx="12" ry="16" fill="${adjustBrightness(skinColor, -5)}"/>
            <ellipse cx="190" cy="110" rx="12" ry="16" fill="${adjustBrightness(skinColor, -5)}"/>
            <ellipse cx="54" cy="110" rx="6" ry="9" fill="${adjustBrightness(skinColor, -15)}"/>
            <ellipse cx="186" cy="110" rx="6" ry="9" fill="${adjustBrightness(skinColor, -15)}"/>

            <!-- Eyes (large, simple style) -->
            ${renderEyes(avatar.eyes, eyeColor)}

            <!-- Eyebrows (verschiedene Stile) -->
            ${renderEyebrows(avatar.eyebrows, hairColor)}

            <!-- Nose (small, simple) -->
            <ellipse cx="120" cy="125" rx="6" ry="8" fill="${adjustBrightness(skinColor, -15)}" opacity="0.7"/>

            <!-- Mouth -->
            ${renderMouth(avatar.mouth)}

            <!-- Features -->
            ${avatar.features.freckles ? renderFreckles(skinColor) : ''}
            ${avatar.features.blush ? renderBlush() : ''}
            ${avatar.features.moles ? renderMoles(skinColor) : ''}

            <!-- Accessories -->
            ${renderAccessories(avatar.accessories)}
        </svg>
    `;
}

/**
 * Rendert Haare - KEINE separate Funktion mehr, wird in renderHair integriert
 */
function renderHairBack(hair, color) {
    // Diese Funktion wird nicht mehr verwendet, bleibt nur für Kompatibilität
    return '';
}

/**
 * Rendert Haare - eng am Kopf anliegend wie eine Kappe
 * Kopf: x=60, y=60, width=120, height=130, rx=60
 */
function renderHair(hair, color) {
    // Basis-Haarform: folgt der Kopfform eng
    const baseHair = `
        <!-- Haar-Hauptform (oben und Seiten) -->
        <ellipse cx="120" cy="60" rx="70" ry="45" fill="${color}"/>
        <rect x="50" y="60" width="140" height="80" fill="${color}"/>
    `;

    switch (hair.style) {
        case 'short-straight':
            return `
                ${baseHair}
                <!-- Kurze Haare enden am Ohr -->
                <ellipse cx="50" cy="100" rx="8" ry="15" fill="${color}"/>
                <ellipse cx="190" cy="100" rx="8" ry="15" fill="${color}"/>
            `;

        case 'short-curly':
            return `
                <ellipse cx="120" cy="60" rx="70" ry="48" fill="${color}"/>
                <rect x="50" y="60" width="140" height="80" fill="${color}"/>
                <!-- Lockige Textur -->
                <circle cx="75" cy="70" r="12" fill="${color}"/>
                <circle cx="120" cy="65" r="14" fill="${color}"/>
                <circle cx="165" cy="70" r="12" fill="${color}"/>
                <ellipse cx="50" cy="100" rx="10" ry="18" fill="${color}"/>
                <ellipse cx="190" cy="100" rx="10" ry="18" fill="${color}"/>
            `;

        case 'medium-straight':
            return `
                ${baseHair}
                <!-- Mittellange Haare über die Ohren -->
                <rect x="40" y="100" width="20" height="50" fill="${color}" rx="10"/>
                <rect x="180" y="100" width="20" height="50" fill="${color}" rx="10"/>
            `;

        case 'medium-wavy':
            return `
                ${baseHair}
                <!-- Mittellange wellige Haare -->
                <ellipse cx="45" cy="120" rx="15" ry="35" fill="${color}"/>
                <ellipse cx="195" cy="120" rx="15" ry="35" fill="${color}"/>
            `;

        case 'long-straight':
            return `
                ${baseHair}
                <!-- Lange Haare - gerade nach unten -->
                <rect x="45" y="100" width="20" height="80" fill="${color}" rx="10"/>
                <rect x="175" y="100" width="20" height="80" fill="${color}" rx="10"/>
            `;

        case 'long-wavy':
            return `
                ${baseHair}
                <!-- Lange wellige Haare - gerade nach unten -->
                <ellipse cx="55" cy="135" rx="15" ry="55" fill="${color}"/>
                <ellipse cx="185" cy="135" rx="15" ry="55" fill="${color}"/>
            `;

        case 'long-curly':
            return `
                ${baseHair}
                <!-- Lange lockige Haare - gerade nach unten -->
                <ellipse cx="55" cy="135" rx="16" ry="50" fill="${color}"/>
                <ellipse cx="185" cy="135" rx="16" ry="50" fill="${color}"/>
                <circle cx="58" cy="150" r="12" fill="${color}"/>
                <circle cx="182" cy="150" r="12" fill="${color}"/>
            `;

        case 'ponytail':
            return `
                ${baseHair}
                <!-- Pferdeschwanz hinten -->
                <ellipse cx="120" cy="40" rx="30" ry="50" fill="${color}"/>
            `;

        case 'bun':
            return `
                ${baseHair}
                <!-- Dutt oben -->
                <circle cx="120" cy="45" r="25" fill="${color}"/>
            `;

        case 'braids':
            return `
                ${baseHair}
                <!-- Zöpfe - gerade nach unten -->
                <rect x="45" y="100" width="18" height="70" fill="${color}" rx="9"/>
                <rect x="177" y="100" width="18" height="70" fill="${color}" rx="9"/>
            `;

        case 'buzz':
            return `
                <!-- Sehr kurze Haare -->
                <ellipse cx="120" cy="65" rx="65" ry="40" fill="${color}"/>
                <rect x="55" y="65" width="130" height="60" fill="${color}"/>
            `;

        case 'bald':
            return '';

        default:
            return baseHair;
    }
}

/**
 * Rendert Augen - verschiedene Formen basierend auf eyes.shape
 */
function renderEyes(eyes, eyeColor) {
    let eyeShape = '';
    let topEdgeLeft = 92;  // Y-Position des oberen Augenrands (links)
    let topEdgeRight = 92; // Y-Position des oberen Augenrands (rechts)

    // Verschiedene Augenformen
    switch (eyes.shape) {
        case 'round':
            // Runde Augen (Standard)
            eyeShape = `
                <circle cx="90" cy="110" r="18" fill="white"/>
                <circle cx="150" cy="110" r="18" fill="white"/>
            `;
            topEdgeLeft = 92;
            topEdgeRight = 92;
            break;

        case 'almond':
            // Mandelförmige Augen
            eyeShape = `
                <ellipse cx="90" cy="110" rx="20" ry="16" fill="white"/>
                <ellipse cx="150" cy="110" rx="20" ry="16" fill="white"/>
            `;
            topEdgeLeft = 94;
            topEdgeRight = 94;
            break;

        case 'hooded':
            // Schlupflider
            eyeShape = `
                <ellipse cx="90" cy="112" rx="18" ry="14" fill="white"/>
                <ellipse cx="150" cy="112" rx="18" ry="14" fill="white"/>
            `;
            topEdgeLeft = 98;
            topEdgeRight = 98;
            break;

        case 'upturned':
            // Aufwärts gerichtete Augen
            eyeShape = `
                <ellipse cx="90" cy="110" rx="18" ry="16" fill="white" transform="rotate(-10 90 110)"/>
                <ellipse cx="150" cy="110" rx="18" ry="16" fill="white" transform="rotate(10 150 110)"/>
            `;
            topEdgeLeft = 94;
            topEdgeRight = 94;
            break;

        case 'downturned':
            // Abwärts gerichtete Augen
            eyeShape = `
                <ellipse cx="90" cy="110" rx="18" ry="16" fill="white" transform="rotate(10 90 110)"/>
                <ellipse cx="150" cy="110" rx="18" ry="16" fill="white" transform="rotate(-10 150 110)"/>
            `;
            topEdgeLeft = 94;
            topEdgeRight = 94;
            break;

        case 'monolid':
            // Monolid
            eyeShape = `
                <ellipse cx="90" cy="111" rx="19" ry="13" fill="white"/>
                <ellipse cx="150" cy="111" rx="19" ry="13" fill="white"/>
            `;
            topEdgeLeft = 98;
            topEdgeRight = 98;
            break;

        default:
            // Standard rund
            eyeShape = `
                <circle cx="90" cy="110" r="18" fill="white"/>
                <circle cx="150" cy="110" r="18" fill="white"/>
            `;
            topEdgeLeft = 92;
            topEdgeRight = 92;
    }

    // Farbige Iris
    eyeShape += `
        <circle cx="90" cy="110" r="10" fill="${eyeColor}"/>
        <circle cx="150" cy="110" r="10" fill="${eyeColor}"/>
    `;

    // Schwarze Pupille
    eyeShape += `
        <circle cx="90" cy="110" r="5" fill="#000"/>
        <circle cx="150" cy="110" r="5" fill="#000"/>
    `;

    // Highlight (weiße Reflexion)
    eyeShape += `
        <circle cx="92" cy="107" r="3" fill="white"/>
        <circle cx="152" cy="107" r="3" fill="white"/>
    `;

    // Wimpern am Augenlid (Position angepasst an Augenform)
    if (eyes.lashes && eyes.lashes !== 'short') {
        const lashLength = eyes.lashes === 'dramatic' ? 8 : eyes.lashes === 'long' ? 6 : 4;
        eyeShape += `
            <path d="M 78 ${topEdgeLeft} Q 76 ${topEdgeLeft - lashLength} 78 ${topEdgeLeft - lashLength + 2}" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M 90 ${topEdgeLeft - 2} Q 90 ${topEdgeLeft - lashLength - 2} 90 ${topEdgeLeft - lashLength}" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M 102 ${topEdgeLeft} Q 104 ${topEdgeLeft - lashLength} 102 ${topEdgeLeft - lashLength + 2}" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>

            <path d="M 138 ${topEdgeRight} Q 136 ${topEdgeRight - lashLength} 138 ${topEdgeRight - lashLength + 2}" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M 150 ${topEdgeRight - 2} Q 150 ${topEdgeRight - lashLength - 2} 150 ${topEdgeRight - lashLength}" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M 162 ${topEdgeRight} Q 164 ${topEdgeRight - lashLength} 162 ${topEdgeRight - lashLength + 2}" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
        `;
    }

    return eyeShape;
}

/**
 * Rendert Augenbrauen - verschiedene Stile (höher platziert, keine Überschneidung mit Wimpern)
 */
function renderEyebrows(eyebrows, hairColor) {
    const browColor = adjustBrightness(hairColor, -30);
    const thickness = eyebrows.thickness === 'thick' ? 4 : eyebrows.thickness === 'thin' ? 2 : 3;

    switch (eyebrows.style) {
        case 'natural':
            // Natürlich geschwungen
            return `
                <path d="M 82 87 Q 95 84 108 87" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
                <path d="M 132 87 Q 145 84 158 87" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
            `;

        case 'arched':
            // Stark geschwungen
            return `
                <path d="M 82 89 Q 95 81 108 88" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
                <path d="M 132 88 Q 145 81 158 89" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
            `;

        case 'straight':
            // Gerade
            return `
                <path d="M 82 86 L 108 85" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
                <path d="M 132 85 L 158 86" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
            `;

        case 'round':
            // Rund
            return `
                <path d="M 82 88 Q 95 83 108 88" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
                <path d="M 132 88 Q 145 83 158 88" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
            `;

        case 'angled':
            // Eckig
            return `
                <path d="M 82 89 L 95 82 L 108 86" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M 132 86 L 145 82 L 158 89" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round" stroke-linejoin="round"/>
            `;

        default:
            return `
                <path d="M 82 87 Q 95 84 108 87" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
                <path d="M 132 87 Q 145 84 158 87" fill="none" stroke="${browColor}" stroke-width="${thickness}" stroke-linecap="round"/>
            `;
    }
}

/**
 * Rendert Mund - einfacher Cartoon-Stil wie im Bild
 */
function renderMouth(style) {
    switch (style) {
        case 'smile':
            return `<path d="M 95 145 Q 120 153 145 145" fill="none" stroke="#b8866f" stroke-width="3" stroke-linecap="round"/>`;
        case 'grin':
            return `
                <path d="M 95 145 Q 120 155 145 145" fill="none" stroke="#b8866f" stroke-width="3" stroke-linecap="round"/>
                <ellipse cx="120" cy="150" rx="20" ry="8" fill="#FF69B4"/>
            `;
        case 'slight-smile':
            return `<path d="M 100 147 Q 120 152 140 147" fill="none" stroke="#b8866f" stroke-width="3" stroke-linecap="round"/>`;
        case 'smirk':
            return `<path d="M 95 147 Q 115 152 135 147" fill="none" stroke="#b8866f" stroke-width="3" stroke-linecap="round"/>`;
        default:
            return `<line x1="100" y1="147" x2="140" y2="147" stroke="#b8866f" stroke-width="3" stroke-linecap="round"/>`;
    }
}

/**
 * Rendert Sommersprossen
 */
function renderFreckles(skinColor) {
    const freckleColor = adjustBrightness(skinColor, -40);
    return `
        <circle cx="70" cy="120" r="2" fill="${freckleColor}"/>
        <circle cx="78" cy="125" r="2" fill="${freckleColor}"/>
        <circle cx="65" cy="128" r="2" fill="${freckleColor}"/>
        <circle cx="162" cy="125" r="2" fill="${freckleColor}"/>
        <circle cx="170" cy="120" r="2" fill="${freckleColor}"/>
        <circle cx="175" cy="128" r="2" fill="${freckleColor}"/>
    `;
}

/**
 * Rendert Rouge/Wangen - Cartoon-Stil
 */
function renderBlush() {
    return `
        <ellipse cx="65" cy="125" rx="14" ry="10" fill="#FFB6C1" opacity="0.5"/>
        <ellipse cx="175" cy="125" rx="14" ry="10" fill="#FFB6C1" opacity="0.5"/>
    `;
}

/**
 * Rendert Muttermale - Cartoon-Stil
 */
function renderMoles(skinColor) {
    const moleColor = adjustBrightness(skinColor, -60);
    return `
        <circle cx="160" cy="135" r="3" fill="${moleColor}"/>
    `;
}

/**
 * Rendert Accessoires - angepasst an höheres Layout
 */
function renderAccessories(accessories) {
    let svg = '';

    // Brille (alle Stile)
    if (accessories.glasses && accessories.glasses !== 'none') {
        switch (accessories.glasses) {
            case 'round':
                svg += `
                    <circle cx="90" cy="110" r="20" fill="none" stroke="#333" stroke-width="2.5"/>
                    <circle cx="150" cy="110" r="20" fill="none" stroke="#333" stroke-width="2.5"/>
                    <line x1="110" y1="110" x2="130" y2="110" stroke="#333" stroke-width="2.5"/>
                    <line x1="70" y1="110" x2="55" y2="108" stroke="#333" stroke-width="2"/>
                    <line x1="170" y1="110" x2="185" y2="108" stroke="#333" stroke-width="2"/>
                `;
                break;
            case 'square':
                svg += `
                    <rect x="70" y="90" width="40" height="40" fill="none" stroke="#333" stroke-width="2.5" rx="5"/>
                    <rect x="130" y="90" width="40" height="40" fill="none" stroke="#333" stroke-width="2.5" rx="5"/>
                    <line x1="110" y1="110" x2="130" y2="110" stroke="#333" stroke-width="2.5"/>
                    <line x1="70" y1="110" x2="55" y2="108" stroke="#333" stroke-width="2"/>
                    <line x1="170" y1="110" x2="185" y2="108" stroke="#333" stroke-width="2"/>
                `;
                break;
            case 'cat-eye':
                svg += `
                    <path d="M 70 110 Q 80 105 90 110 Q 80 115 70 110" fill="none" stroke="#333" stroke-width="2.5"/>
                    <path d="M 110 110 Q 100 105 90 110 Q 100 115 110 110" fill="none" stroke="#333" stroke-width="2.5"/>
                    <path d="M 130 110 Q 140 105 150 110 Q 140 115 130 110" fill="none" stroke="#333" stroke-width="2.5"/>
                    <path d="M 170 110 Q 160 105 150 110 Q 160 115 170 110" fill="none" stroke="#333" stroke-width="2.5"/>
                    <line x1="110" y1="110" x2="130" y2="110" stroke="#333" stroke-width="2.5"/>
                `;
                break;
            case 'aviator':
                svg += `
                    <path d="M 70 105 Q 80 95 90 105 L 90 115 Q 80 120 70 110 Z" fill="none" stroke="#333" stroke-width="2.5"/>
                    <path d="M 110 105 Q 100 95 90 105 L 90 115 Q 100 120 110 110 Z" fill="none" stroke="#333" stroke-width="2.5"/>
                    <path d="M 130 105 Q 140 95 150 105 L 150 115 Q 140 120 130 110 Z" fill="none" stroke="#333" stroke-width="2.5"/>
                    <path d="M 170 105 Q 160 95 150 105 L 150 115 Q 160 120 170 110 Z" fill="none" stroke="#333" stroke-width="2.5"/>
                    <line x1="110" y1="107" x2="130" y2="107" stroke="#333" stroke-width="2.5"/>
                `;
                break;
            case 'sunglasses':
                svg += `
                    <rect x="70" y="95" width="40" height="30" fill="#000" opacity="0.7" rx="8"/>
                    <rect x="130" y="95" width="40" height="30" fill="#000" opacity="0.7" rx="8"/>
                    <line x1="110" y1="110" x2="130" y2="110" stroke="#333" stroke-width="2.5"/>
                    <line x1="70" y1="110" x2="55" y2="108" stroke="#333" stroke-width="2"/>
                    <line x1="170" y1="110" x2="185" y2="108" stroke="#333" stroke-width="2"/>
                `;
                break;
        }
    }

    // Ohrringe (am Ohrläppchen platziert)
    if (accessories.earrings && accessories.earrings !== 'none') {
        switch (accessories.earrings) {
            case 'studs':
                svg += `
                    <circle cx="48" cy="122" r="4" fill="#FFD700"/>
                    <circle cx="192" cy="122" r="4" fill="#FFD700"/>
                    <circle cx="48" cy="122" r="2" fill="#FFF" opacity="0.6"/>
                    <circle cx="192" cy="122" r="2" fill="#FFF" opacity="0.6"/>
                `;
                break;
            case 'hoops-small':
                svg += `
                    <ellipse cx="45" cy="124" rx="5" ry="7" fill="none" stroke="#FFD700" stroke-width="2.5"/>
                    <ellipse cx="195" cy="124" rx="5" ry="7" fill="none" stroke="#FFD700" stroke-width="2.5"/>
                `;
                break;
            case 'hoops-large':
                svg += `
                    <ellipse cx="42" cy="128" rx="7" ry="11" fill="none" stroke="#FFD700" stroke-width="2.5"/>
                    <ellipse cx="198" cy="128" rx="7" ry="11" fill="none" stroke="#FFD700" stroke-width="2.5"/>
                `;
                break;
            case 'dangles':
                svg += `
                    <line x1="48" y1="122" x2="48" y2="135" stroke="#FFD700" stroke-width="2"/>
                    <circle cx="48" cy="137" r="3" fill="#FFD700"/>
                    <line x1="192" y1="122" x2="192" y2="135" stroke="#FFD700" stroke-width="2"/>
                    <circle cx="192" cy="137" r="3" fill="#FFD700"/>
                `;
                break;
        }
    }

    // Kette
    if (accessories.necklace && accessories.necklace !== 'none') {
        svg += `
            <circle cx="80" cy="185" r="3" fill="#FFD700"/>
            <circle cx="95" cy="188" r="3" fill="#FFD700"/>
            <circle cx="105" cy="190" r="3" fill="#FFD700"/>
            <circle cx="120" cy="190" r="3" fill="#FFD700"/>
            <circle cx="135" cy="190" r="3" fill="#FFD700"/>
            <circle cx="145" cy="188" r="3" fill="#FFD700"/>
            <circle cx="160" cy="185" r="3" fill="#FFD700"/>
            <circle cx="120" cy="195" r="6" fill="#FFD700"/>
        `;
    }

    // Hut/Kopfbedeckung (alle Stile)
    if (accessories.hat && accessories.hat !== 'none') {
        switch (accessories.hat) {
            case 'cap':
                svg += `
                    <!-- Schirm -->
                    <ellipse cx="120" cy="65" rx="50" ry="8" fill="#2E4C8B"/>
                    <!-- Cap-Hauptteil -->
                    <ellipse cx="120" cy="48" rx="70" ry="25" fill="#4169E1"/>
                    <rect x="50" y="48" width="140" height="18" fill="#4169E1"/>
                    <!-- Knopf oben -->
                    <circle cx="120" cy="40" r="4" fill="#2E4C8B"/>
                `;
                break;
            case 'beanie':
                svg += `
                    <ellipse cx="120" cy="48" rx="75" ry="28" fill="#DC143C"/>
                    <rect x="45" y="48" width="150" height="18" fill="#DC143C"/>
                    <circle cx="120" cy="35" r="8" fill="#FFF"/>
                    <!-- Umschlag -->
                    <rect x="50" y="60" width="140" height="6" fill="#B71C1C"/>
                `;
                break;
            case 'hat':
                svg += `
                    <!-- Hutkrempe -->
                    <ellipse cx="120" cy="58" rx="90" ry="12" fill="#8B4513"/>
                    <!-- Hut-Hauptteil -->
                    <rect x="70" y="30" width="100" height="28" fill="#A0522D" rx="8"/>
                    <ellipse cx="120" cy="30" rx="50" ry="10" fill="#8B4513"/>
                    <!-- Band -->
                    <rect x="70" y="52" width="100" height="4" fill="#654321"/>
                `;
                break;
            case 'headband':
                svg += `
                    <rect x="50" y="62" width="140" height="8" fill="#FF69B4" rx="4"/>
                    <circle cx="80" cy="66" r="6" fill="#FF1493"/>
                    <circle cx="160" cy="66" r="6" fill="#FF1493"/>
                `;
                break;
            case 'bow':
                svg += `
                    <!-- Schleife links -->
                    <ellipse cx="90" cy="55" rx="20" ry="15" fill="#FF69B4"/>
                    <!-- Schleife rechts -->
                    <ellipse cx="150" cy="55" rx="20" ry="15" fill="#FF69B4"/>
                    <!-- Mitte -->
                    <rect x="110" y="48" width="20" height="14" fill="#FF1493" rx="3"/>
                `;
                break;
        }
    }

    return svg;
}

/**
 * Hilfsfunktion: Helligkeit anpassen
 */
function adjustBrightness(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Aktualisiert alle Avatar-Anzeigen in der App
 */
function updateAllAvatarDisplays() {
    if (!currentUser) return;

    // Sidebar Avatar
    const sidebarAvatar = document.getElementById('userAvatar');
    if (sidebarAvatar) {
        if (currentUser.avatar) {
            sidebarAvatar.innerHTML = renderAvatarSVG(currentUser.avatar, 50);
        } else {
            sidebarAvatar.innerHTML = '👤';
        }
    }

    // Settings Avatar Preview
    const settingsAvatar = document.getElementById('profileAvatarPreview');
    if (settingsAvatar) {
        if (currentUser.avatar) {
            settingsAvatar.innerHTML = renderAvatarSVG(currentUser.avatar, 100);
        } else {
            settingsAvatar.innerHTML = '<div class="no-avatar-placeholder">👤</div>';
        }
    }
}
