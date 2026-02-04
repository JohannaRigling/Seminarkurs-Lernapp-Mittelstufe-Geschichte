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
        { id: 'black', name: 'Schwarz', color: '#2C2C2C' },
        { id: 'dark-brown', name: 'Dunkelbraun', color: '#5C3A21' },
        { id: 'brown', name: 'Braun', color: '#8B4513' },
        { id: 'light-brown', name: 'Hellbraun', color: '#A0522D' },
        { id: 'blonde', name: 'Blond', color: '#F0E68C' },
        { id: 'light-blonde', name: 'Hellblond', color: '#FFF8DC' },
        { id: 'red', name: 'Rot', color: '#B94E48' },
        { id: 'auburn', name: 'Rotbraun', color: '#A52A2A' },
        { id: 'gray', name: 'Grau', color: '#A9A9A9' },
        { id: 'white', name: 'Weiß', color: '#F5F5F5' },
        { id: 'blue', name: 'Blau', color: '#4169E1' },
        { id: 'pink', name: 'Pink', color: '#FF69B4' },
        { id: 'purple', name: 'Lila', color: '#9370DB' },
        { id: 'green', name: 'Grün', color: '#32CD32' }
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
        { id: 'brown', name: 'Braun', color: '#8B4513' },
        { id: 'dark-brown', name: 'Dunkelbraun', color: '#5C4033' },
        { id: 'hazel', name: 'Haselnuss', color: '#9A7B4F' },
        { id: 'green', name: 'Grün', color: '#228B22' },
        { id: 'blue', name: 'Blau', color: '#4169E1' },
        { id: 'gray', name: 'Grau', color: '#708090' },
        { id: 'amber', name: 'Bernstein', color: '#FFBF00' }
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
 * Öffnet Avatar-Editor
 */
function openAvatarEditor() {
    if (!currentUser) return;

    const modal = document.getElementById('avatarEditorModal');
    const content = document.getElementById('avatarEditorContent');

    if (!modal || !content) return;

    // Lade aktuellen Avatar oder Default
    const currentAvatar = currentUser.avatar || { ...DEFAULT_AVATAR };

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
 * Rendert Avatar als SVG
 */
function renderAvatarSVG(avatar, size = 100) {
    if (!avatar) avatar = DEFAULT_AVATAR;

    const skinColor = AVATAR_OPTIONS.skinTones.find(t => t.id === avatar.skin)?.color || '#FFE4C4';
    const hairColor = AVATAR_OPTIONS.hairColors.find(c => c.id === avatar.hair.color)?.color || '#8B4513';
    const eyeColor = AVATAR_OPTIONS.eyeColors.find(c => c.id === avatar.eyes.color)?.color || '#8B4513';

    return `
        <svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <circle cx="100" cy="100" r="100" fill="#e8e8e8"/>

            <!-- Hair Back (behind head) -->
            ${renderHairBack(avatar.hair, hairColor)}

            <!-- Neck (minimal, at bottom) -->
            <ellipse cx="100" cy="180" rx="35" ry="25" fill="${adjustBrightness(skinColor, -10)}"/>

            <!-- Shoulders (just hints at bottom edge) -->
            <ellipse cx="50" cy="195" rx="60" ry="30" fill="${adjustBrightness(skinColor, -15)}"/>
            <ellipse cx="150" cy="195" rx="60" ry="30" fill="${adjustBrightness(skinColor, -15)}"/>

            <!-- Head (large, centered) -->
            <circle cx="100" cy="100" r="75" fill="${skinColor}" stroke="#333" stroke-width="2"/>

            <!-- Ears -->
            <ellipse cx="30" cy="100" rx="12" ry="18" fill="${adjustBrightness(skinColor, -5)}" stroke="#333" stroke-width="1.5"/>
            <ellipse cx="170" cy="100" rx="12" ry="18" fill="${adjustBrightness(skinColor, -5)}" stroke="#333" stroke-width="1.5"/>
            <ellipse cx="32" cy="100" rx="6" ry="9" fill="${adjustBrightness(skinColor, -15)}"/>
            <ellipse cx="168" cy="100" rx="6" ry="9" fill="${adjustBrightness(skinColor, -15)}"/>

            <!-- Hair Front (over head) -->
            ${renderHair(avatar.hair, hairColor)}

            <!-- Eyebrows -->
            <path d="M 60 80 Q 72 77 84 79" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M 116 79 Q 128 77 140 80" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>

            <!-- Eyes -->
            ${renderEyes(avatar.eyes, eyeColor, avatar.eyebrows)}

            <!-- Nose -->
            <ellipse cx="100" cy="110" rx="6" ry="9" fill="${adjustBrightness(skinColor, -20)}"/>
            <ellipse cx="95" cy="115" rx="3" ry="2" fill="${adjustBrightness(skinColor, -25)}"/>
            <ellipse cx="105" cy="115" rx="3" ry="2" fill="${adjustBrightness(skinColor, -25)}"/>

            <!-- Mouth -->
            ${renderMouth(avatar.mouth, skinColor)}

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
 * Rendert Haare hinten (hinter dem Kopf)
 */
function renderHairBack(hair, color) {
    switch (hair.style) {
        case 'medium-straight':
        case 'medium-wavy':
            return `<path d="M 35 85 L 32 115 L 30 145 M 165 85 L 168 115 L 170 145" fill="none" stroke="${color}" stroke-width="18" stroke-linecap="round"/>`;

        case 'long-straight':
            return `<path d="M 35 85 L 32 120 L 28 155 L 25 185 M 165 85 L 168 120 L 172 155 L 175 185" fill="none" stroke="${color}" stroke-width="20" stroke-linecap="round"/>`;

        case 'long-wavy':
            return `<path d="M 35 85 Q 28 110 35 135 Q 26 160 30 185 M 165 85 Q 172 110 165 135 Q 174 160 170 185" fill="none" stroke="${color}" stroke-width="20" stroke-linecap="round"/>`;

        case 'long-curly':
            return `<path d="M 35 85 Q 25 110 38 135 Q 22 160 32 185 M 165 85 Q 175 110 162 135 Q 178 160 168 185" fill="none" stroke="${color}" stroke-width="22" stroke-linecap="round"/>`;

        case 'ponytail':
            return `<ellipse cx="100" cy="20" rx="18" ry="45" fill="${color}" stroke="#333" stroke-width="2"/>`;

        case 'braids':
            return `
                <path d="M 33 85 L 28 110 L 24 135 L 20 160 L 16 185" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/>
                <path d="M 167 85 L 172 110 L 176 135 L 180 160 L 184 185" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/>
            `;

        default:
            return '';
    }
}

/**
 * Rendert Haare vorne (über dem Kopf)
 */
function renderHair(hair, color) {
    switch (hair.style) {
        case 'short-straight':
            return `<path d="M 40 65 Q 32 35 55 28 Q 77 24 100 24 Q 123 24 145 28 Q 168 35 160 65 L 155 70 L 45 70 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'short-curly':
            return `<path d="M 40 67 Q 32 38 52 30 Q 65 26 78 28 Q 89 24 100 24 Q 111 24 122 28 Q 135 26 148 30 Q 168 38 160 67 L 155 72 L 45 72 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'medium-straight':
            return `<path d="M 38 65 Q 30 32 52 26 Q 76 22 100 22 Q 124 22 148 26 Q 170 32 162 65 L 162 75 L 38 75 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'medium-wavy':
            return `<path d="M 38 65 Q 30 32 52 26 Q 76 22 100 22 Q 124 22 148 26 Q 170 32 162 65 L 162 75 L 38 75 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'long-straight':
            return `<path d="M 36 65 Q 28 28 50 22 Q 75 18 100 18 Q 125 18 150 22 Q 172 28 164 65 L 164 75 L 36 75 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'long-wavy':
            return `<path d="M 36 65 Q 28 28 50 22 Q 75 18 100 18 Q 125 18 150 22 Q 172 28 164 65 L 164 75 L 36 75 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'long-curly':
            return `<path d="M 36 67 Q 26 30 50 23 Q 73 18 100 18 Q 127 18 150 23 Q 174 30 164 67 L 164 75 L 36 75 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'ponytail':
            return `<path d="M 38 65 Q 30 32 52 26 Q 76 22 100 22 Q 124 22 148 26 Q 170 32 162 65 L 162 75 L 38 75 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'bun':
            return `
                <path d="M 40 65 Q 32 35 55 28 Q 77 24 100 24 Q 123 24 145 28 Q 168 35 160 65 L 155 70 L 45 70 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>
                <circle cx="100" cy="24" r="22" fill="${color}" stroke="#333" stroke-width="2.5"/>
            `;

        case 'braids':
            return `<path d="M 38 65 Q 30 32 52 26 Q 76 22 100 22 Q 124 22 148 26 Q 170 32 162 65 L 162 75 L 38 75 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'buzz':
            return `<path d="M 48 73 Q 42 48 62 40 Q 80 34 100 34 Q 120 34 138 40 Q 158 48 152 73" fill="${color}" stroke="#333" stroke-width="2.5"/>`;

        case 'bald':
            return '';

        default:
            return `<path d="M 40 65 Q 32 35 55 28 Q 77 24 100 24 Q 123 24 145 28 Q 168 35 160 65 L 155 70 L 45 70 Z" fill="${color}" stroke="#333" stroke-width="2.5"/>`;
    }
}

/**
 * Rendert Augen
 */
function renderEyes(eyes, eyeColor, eyebrows) {
    let eyeShape = '';

    switch (eyes.shape) {
        case 'round':
            eyeShape = `
                <ellipse cx="70" cy="95" rx="12" ry="14" fill="white" stroke="#333" stroke-width="2"/>
                <ellipse cx="130" cy="95" rx="12" ry="14" fill="white" stroke="#333" stroke-width="2"/>
            `;
            break;
        case 'almond':
            eyeShape = `
                <ellipse cx="70" cy="95" rx="14" ry="12" fill="white" stroke="#333" stroke-width="2"/>
                <ellipse cx="130" cy="95" rx="14" ry="12" fill="white" stroke="#333" stroke-width="2"/>
            `;
            break;
        default:
            eyeShape = `
                <ellipse cx="70" cy="95" rx="13" ry="13" fill="white" stroke="#333" stroke-width="2"/>
                <ellipse cx="130" cy="95" rx="13" ry="13" fill="white" stroke="#333" stroke-width="2"/>
            `;
    }

    // Iris
    const iris = `
        <circle cx="70" cy="95" r="7" fill="${eyeColor}"/>
        <circle cx="130" cy="95" r="7" fill="${eyeColor}"/>
        <circle cx="70" cy="95" r="3.5" fill="#000"/>
        <circle cx="130" cy="95" r="3.5" fill="#000"/>
        <circle cx="71" cy="94" r="2" fill="white"/>
        <circle cx="131" cy="94" r="2" fill="white"/>
    `;

    // Wimpern
    let lashes = '';
    if (eyes.lashes !== 'short') {
        lashes = `
            <path d="M 64 88 Q 62 86 64 84" fill="none" stroke="#333" stroke-width="1.2"/>
            <path d="M 70 87 Q 69 84 70 82" fill="none" stroke="#333" stroke-width="1.2"/>
            <path d="M 76 88 Q 78 86 76 84" fill="none" stroke="#333" stroke-width="1.2"/>
            <path d="M 124 88 Q 122 86 124 84" fill="none" stroke="#333" stroke-width="1.2"/>
            <path d="M 130 87 Q 131 84 130 82" fill="none" stroke="#333" stroke-width="1.2"/>
            <path d="M 136 88 Q 138 86 136 84" fill="none" stroke="#333" stroke-width="1.2"/>
        `;
    }

    return eyeShape + iris + lashes;
}

/**
 * Rendert Mund
 */
function renderMouth(style, skinColor) {
    const lipColor = adjustBrightness(skinColor, -30);

    switch (style) {
        case 'smile':
            return `<path d="M 75 130 Q 100 142 125 130" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`;
        case 'grin':
            return `
                <path d="M 75 130 Q 100 142 125 130" fill="white" stroke="#333" stroke-width="3"/>
                <line x1="85" y1="136" x2="115" y2="136" stroke="#333" stroke-width="2"/>
            `;
        case 'slight-smile':
            return `<path d="M 80 132 Q 100 138 120 132" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`;
        case 'smirk':
            return `<path d="M 75 132 Q 92 136 110 130" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>`;
        default:
            return `<line x1="80" y1="132" x2="120" y2="132" stroke="#333" stroke-width="3" stroke-linecap="round"/>`;
    }
}

/**
 * Rendert Sommersprossen
 */
function renderFreckles(skinColor) {
    const freckleColor = adjustBrightness(skinColor, -40);
    return `
        <circle cx="55" cy="100" r="1.5" fill="${freckleColor}"/>
        <circle cx="62" cy="104" r="1.5" fill="${freckleColor}"/>
        <circle cx="70" cy="102" r="1.5" fill="${freckleColor}"/>
        <circle cx="130" cy="102" r="1.5" fill="${freckleColor}"/>
        <circle cx="138" cy="104" r="1.5" fill="${freckleColor}"/>
        <circle cx="145" cy="100" r="1.5" fill="${freckleColor}"/>
        <circle cx="88" cy="115" r="1.5" fill="${freckleColor}"/>
        <circle cx="112" cy="115" r="1.5" fill="${freckleColor}"/>
    `;
}

/**
 * Rendert Rouge/Wangen
 */
function renderBlush() {
    return `
        <ellipse cx="48" cy="110" rx="12" ry="9" fill="#FFB6C1" opacity="0.5"/>
        <ellipse cx="152" cy="110" rx="12" ry="9" fill="#FFB6C1" opacity="0.5"/>
    `;
}

/**
 * Rendert Muttermale
 */
function renderMoles(skinColor) {
    const moleColor = adjustBrightness(skinColor, -60);
    return `
        <circle cx="125" cy="118" r="2.5" fill="${moleColor}"/>
    `;
}

/**
 * Rendert Accessoires
 */
function renderAccessories(accessories) {
    let svg = '';

    // Brille
    if (accessories.glasses && accessories.glasses !== 'none') {
        switch (accessories.glasses) {
            case 'round':
                svg += `
                    <circle cx="70" cy="95" r="18" fill="none" stroke="#333" stroke-width="3"/>
                    <circle cx="130" cy="95" r="18" fill="none" stroke="#333" stroke-width="3"/>
                    <line x1="88" y1="95" x2="112" y2="95" stroke="#333" stroke-width="3"/>
                    <line x1="52" y1="95" x2="38" y2="92" stroke="#333" stroke-width="2.5"/>
                    <line x1="148" y1="95" x2="162" y2="92" stroke="#333" stroke-width="2.5"/>
                `;
                break;
            case 'square':
                svg += `
                    <rect x="52" y="80" width="36" height="30" fill="none" stroke="#333" stroke-width="3" rx="4"/>
                    <rect x="112" y="80" width="36" height="30" fill="none" stroke="#333" stroke-width="3" rx="4"/>
                    <line x1="88" y1="95" x2="112" y2="95" stroke="#333" stroke-width="3"/>
                    <line x1="52" y1="95" x2="38" y2="92" stroke="#333" stroke-width="2.5"/>
                    <line x1="148" y1="95" x2="162" y2="92" stroke="#333" stroke-width="2.5"/>
                `;
                break;
        }
    }

    // Ohrringe
    if (accessories.earrings && accessories.earrings !== 'none') {
        switch (accessories.earrings) {
            case 'studs':
                svg += `
                    <circle cx="26" cy="103" r="4" fill="#FFD700" stroke="#333" stroke-width="1.5"/>
                    <circle cx="174" cy="103" r="4" fill="#FFD700" stroke="#333" stroke-width="1.5"/>
                `;
                break;
            case 'hoops-small':
                svg += `
                    <circle cx="26" cy="103" r="6" fill="none" stroke="#FFD700" stroke-width="3"/>
                    <circle cx="174" cy="103" r="6" fill="none" stroke="#FFD700" stroke-width="3"/>
                `;
                break;
            case 'hoops-large':
                svg += `
                    <circle cx="26" cy="108" r="10" fill="none" stroke="#FFD700" stroke-width="3"/>
                    <circle cx="174" cy="108" r="10" fill="none" stroke="#FFD700" stroke-width="3"/>
                `;
                break;
        }
    }

    // Kette
    if (accessories.necklace && accessories.necklace !== 'none') {
        svg += `<path d="M 70 175 Q 100 182 130 175" fill="none" stroke="#FFD700" stroke-width="4"/>
                <circle cx="100" cy="185" r="5" fill="#FFD700" stroke="#333" stroke-width="1.5"/>`;
    }

    // Hut/Kopfbedeckung
    if (accessories.hat && accessories.hat !== 'none') {
        switch (accessories.hat) {
            case 'cap':
                svg += `<path d="M 32 48 L 32 28 Q 100 18 168 28 L 168 48 Q 100 55 32 48 Z" fill="#4169E1" stroke="#333" stroke-width="2.5"/>
                        <ellipse cx="100" cy="28" rx="68" ry="10" fill="#4169E1" stroke="#333" stroke-width="2.5"/>`;
                break;
            case 'beanie':
                svg += `<path d="M 28 55 Q 24 28 100 20 Q 176 28 172 55 Z" fill="#DC143C" stroke="#333" stroke-width="2.5"/>
                        <circle cx="100" cy="16" r="6" fill="#FFF" stroke="#333" stroke-width="2"/>`;
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
