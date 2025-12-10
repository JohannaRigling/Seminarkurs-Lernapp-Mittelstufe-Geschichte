// ===== ADMIN & DEVELOPER SYSTEM =====

// Admin-Konto Credentials (PRIVAT - nur für Entwickler!)
const ADMIN_CREDENTIALS = {
    username: 'admin_dev',
    password: 'HistoLearn2025!',
    email: 'admin@histolearn.dev'
};

// Email-Verifizierungscodes (simuliert - in Produktion würde das serverseitig laufen)
let pendingVerifications = {};

// Check if user is admin
function isAdmin() {
    return currentUser && currentUser.isAdmin === true;
}

// Admin Login (spezielle Prüfung)
function checkAdminLogin(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        return true;
    }
    return false;
}

// Enhanced Login für Admin
const originalHandleLogin = handleLogin;
handleLogin = function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Admin-Check
    if (checkAdminLogin(username, password)) {
        // Admin-User erstellen/laden
        let adminUser = getAdminUser();
        currentUser = adminUser;
        localStorage.setItem('histolearn_currentUser', adminUser.id);
        showMainApp();
        showToast('👑 Willkommen, Admin!', 'success');

        // Admin-Panel Button anzeigen
        showAdminButton();
        return;
    }

    // Normaler Login
    originalHandleLogin.call(this, event);
};

// Admin-User erstellen oder laden
function getAdminUser() {
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    let adminUser = users.find(u => u.isAdmin === true);

    if (!adminUser) {
        adminUser = {
            id: 'admin_' + Date.now().toString(),
            username: ADMIN_CREDENTIALS.username,
            email: ADMIN_CREDENTIALS.email,
            password: ADMIN_CREDENTIALS.password,
            isAdmin: true,
            emailVerified: true,
            createdAt: new Date().toISOString(),
            progress: {
                coins: 99999,
                totalCoins: 99999,
                rank: 5, // Legende
                xp: 10000,
                topicsCompleted: 12,
                exercisesDone: 999,
                quizCorrect: 999,
                totalMinutes: 9999,
                todayMinutes: 0,
                lastActive: null,
                operatorsViewed: 17,
                strategiesViewed: 12,
                timelineViewed: 20,
                castleLevel: 7,
                castleParts: {
                    gate: true,
                    wallLeft: true,
                    wallRight: true,
                    towerLeft: true,
                    towerRight: true,
                    keep: true,
                    flag: true
                }
            },
            achievements: ACHIEVEMENTS.map(a => a.id),
            preferences: {
                theme: 'dark',
                accentColor: '#c9a227',
                aiMode: 'tutor',
                pomodoroWork: 20,
                pomodoroBreak: 5,
                pomodoroSound: true,
                preferredStrategy: ''
            },
            savedChats: [],
            folders: [],
            activities: []
        };
        users.push(adminUser);
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }

    return adminUser;
}

// Admin-Button in Navigation anzeigen
function showAdminButton() {
    if (!isAdmin()) return;

    const nav = document.querySelector('.nav-menu');
    if (!nav) return;

    // Prüfen ob Button bereits existiert
    if (document.querySelector('[data-section="admin"]')) return;

    const adminBtn = document.createElement('button');
    adminBtn.className = 'nav-item admin-nav-item';
    adminBtn.dataset.section = 'admin';
    adminBtn.onclick = () => showSection('admin');
    adminBtn.innerHTML = `
        <span class="nav-icon">👑</span>
        <span class="nav-text">Admin Hub</span>
    `;

    // Vor Einstellungen einfügen
    const settingsBtn = nav.querySelector('[data-section="settings"]');
    nav.insertBefore(adminBtn, settingsBtn);
}

// Admin-Panel Section erstellen
function createAdminSection() {
    if (document.getElementById('admin')) return;

    const main = document.querySelector('.main-content');
    if (!main) return;

    const adminSection = document.createElement('section');
    adminSection.id = 'admin';
    adminSection.className = 'content-section';

    adminSection.innerHTML = `
        <div class="section-header admin-header">
            <h1>👑 Admin & Developer Hub</h1>
            <p>Private Verwaltung und Test-Funktionen</p>
        </div>

        <div class="admin-tabs">
            <button class="admin-tab active" onclick="showAdminTab('overview')">📊 Übersicht</button>
            <button class="admin-tab" onclick="showAdminTab('users')">👥 Benutzer</button>
            <button class="admin-tab" onclick="showAdminTab('data')">💾 Daten</button>
            <button class="admin-tab" onclick="showAdminTab('testing')">🧪 Test-Hub</button>
            <button class="admin-tab" onclick="showAdminTab('settings')">⚙️ App-Settings</button>
        </div>

        <div class="admin-content">
            <!-- Overview Tab -->
            <div class="admin-panel active" id="adminOverview">
                <div class="admin-stats-grid">
                    <div class="admin-stat-card">
                        <h3>👥 Registrierte Benutzer</h3>
                        <div class="admin-stat-value" id="totalUsers">0</div>
                    </div>
                    <div class="admin-stat-card">
                        <h3>✅ Verifizierte E-Mails</h3>
                        <div class="admin-stat-value" id="verifiedUsers">0</div>
                    </div>
                    <div class="admin-stat-card">
                        <h3>📊 Durchschn. Fortschritt</h3>
                        <div class="admin-stat-value" id="avgProgress">0%</div>
                    </div>
                    <div class="admin-stat-card">
                        <h3>🐄 Gesamte Münzen</h3>
                        <div class="admin-stat-value" id="totalCoinsAll">0</div>
                    </div>
                </div>

                <div class="admin-quick-actions">
                    <h3>Schnellaktionen</h3>
                    <div class="admin-action-buttons">
                        <button class="btn btn-primary" onclick="refreshAdminStats()">🔄 Statistiken aktualisieren</button>
                        <button class="btn btn-secondary" onclick="exportAllData()">📤 Alle Daten exportieren</button>
                        <button class="btn btn-warning" onclick="clearPendingVerifications()">🗑️ Pending Verifications löschen</button>
                    </div>
                </div>
            </div>

            <!-- Users Tab -->
            <div class="admin-panel" id="adminUsers">
                <div class="admin-users-controls">
                    <input type="text" id="userSearchInput" placeholder="Benutzer suchen..." oninput="searchUsers()">
                    <select id="userSortSelect" onchange="sortUsers()">
                        <option value="newest">Neueste zuerst</option>
                        <option value="oldest">Älteste zuerst</option>
                        <option value="name">Nach Name</option>
                        <option value="progress">Nach Fortschritt</option>
                        <option value="coins">Nach Münzen</option>
                    </select>
                </div>
                <div class="admin-users-list" id="adminUsersList">
                    <!-- Filled by JavaScript -->
                </div>
            </div>

            <!-- Data Tab -->
            <div class="admin-panel" id="adminData">
                <div class="admin-data-section">
                    <h3>📊 Datenbank-Übersicht</h3>
                    <div class="data-info">
                        <p>LocalStorage-Größe: <strong id="localStorageSize">Berechne...</strong></p>
                        <p>Benutzer-Datensätze: <strong id="userRecordCount">0</strong></p>
                        <p>Gespeicherte Chats: <strong id="chatCount">0</strong></p>
                    </div>
                </div>

                <div class="admin-data-section">
                    <h3>💾 Daten-Verwaltung</h3>
                    <div class="admin-action-buttons">
                        <button class="btn btn-primary" onclick="exportAllData()">📤 Alle Daten exportieren</button>
                        <button class="btn btn-secondary" onclick="importAllData()">📥 Daten importieren</button>
                        <button class="btn btn-danger" onclick="clearAllUsers()">⚠️ Alle Benutzer löschen</button>
                    </div>
                </div>

                <div class="admin-data-section">
                    <h3>🔍 Raw Data Viewer</h3>
                    <textarea id="rawDataViewer" readonly style="width: 100%; height: 200px; font-family: monospace; font-size: 12px;"></textarea>
                    <button class="btn btn-secondary" onclick="loadRawData()">Daten laden</button>
                </div>
            </div>

            <!-- Testing Tab -->
            <div class="admin-panel" id="adminTesting">
                <div class="test-section">
                    <h3>🧪 Feature Testing</h3>

                    <div class="test-group">
                        <h4>Münzen-System</h4>
                        <div class="test-controls">
                            <input type="number" id="testCoinAmount" value="100" min="1">
                            <button class="btn btn-primary" onclick="testAddCoins()">➕ Münzen hinzufügen</button>
                            <button class="btn btn-secondary" onclick="testRemoveCoins()">➖ Münzen entfernen</button>
                        </div>
                    </div>

                    <div class="test-group">
                        <h4>XP & Rang-System</h4>
                        <div class="test-controls">
                            <input type="number" id="testXPAmount" value="500" min="1">
                            <button class="btn btn-primary" onclick="testAddXP()">➕ XP hinzufügen</button>
                            <select id="testRankSelect">
                                ${RANKS.map((r, i) => `<option value="${i}">${r.icon} ${r.name}</option>`).join('')}
                            </select>
                            <button class="btn btn-secondary" onclick="testSetRank()">Rang setzen</button>
                        </div>
                    </div>

                    <div class="test-group">
                        <h4>Achievements</h4>
                        <div class="test-controls">
                            <select id="testAchievementSelect">
                                ${ACHIEVEMENTS.map(a => `<option value="${a.id}">${a.icon} ${a.name}</option>`).join('')}
                            </select>
                            <button class="btn btn-primary" onclick="testUnlockAchievement()">🏆 Freischalten</button>
                            <button class="btn btn-secondary" onclick="testUnlockAllAchievements()">🏆 Alle freischalten</button>
                        </div>
                    </div>

                    <div class="test-group">
                        <h4>Burg-System</h4>
                        <div class="test-controls">
                            <button class="btn btn-primary" onclick="testUnlockAllCastle()">🏰 Alle Burg-Teile freischalten</button>
                            <button class="btn btn-secondary" onclick="testResetCastle()">🔄 Burg zurücksetzen</button>
                        </div>
                    </div>

                    <div class="test-group">
                        <h4>UI & Notifications</h4>
                        <div class="test-controls">
                            <button class="btn btn-success" onclick="showToast('Test Success!', 'success')">✓ Success Toast</button>
                            <button class="btn btn-danger" onclick="showToast('Test Error!', 'error')">✕ Error Toast</button>
                            <button class="btn btn-warning" onclick="showToast('Test Warning!', 'warning')">⚠ Warning Toast</button>
                            <button class="btn btn-info" onclick="showToast('Test Info!', 'info')">ℹ Info Toast</button>
                        </div>
                    </div>
                </div>

                <div class="test-section">
                    <h3>🔧 Debug-Konsole</h3>
                    <textarea id="debugOutput" readonly style="width: 100%; height: 150px; font-family: monospace; font-size: 11px; background: #1a1a1a; color: #0f0;"></textarea>
                    <button class="btn btn-secondary" onclick="clearDebugOutput()">Konsole leeren</button>
                </div>
            </div>

            <!-- App Settings Tab -->
            <div class="admin-panel" id="adminSettings">
                <div class="admin-setting-section">
                    <h3>🎨 Standard-Theme</h3>
                    <select id="adminDefaultTheme">
                        <option value="light">Hell</option>
                        <option value="dark">Dunkel</option>
                        <option value="sepia">Sepia</option>
                    </select>
                </div>

                <div class="admin-setting-section">
                    <h3>📧 E-Mail Verifizierung</h3>
                    <label>
                        <input type="checkbox" id="emailVerificationRequired" checked>
                        E-Mail-Verifizierung erforderlich
                    </label>
                    <p class="setting-note">Wenn aktiviert, müssen neue Benutzer ihre E-Mail bestätigen.</p>
                </div>

                <div class="admin-setting-section">
                    <h3>🎮 Gamification</h3>
                    <label>
                        <input type="checkbox" id="gamificationEnabled" checked>
                        Gamification-System aktiv
                    </label>
                    <div class="setting-item">
                        <label>Münzen pro Quiz-Frage:</label>
                        <input type="number" id="coinsPerQuestion" value="1" min="0" max="10">
                    </div>
                    <div class="setting-item">
                        <label>XP-Multiplikator:</label>
                        <input type="number" id="xpMultiplier" value="1" min="0.5" max="5" step="0.5">
                    </div>
                </div>

                <div class="admin-setting-section">
                    <h3>🔒 Sicherheit</h3>
                    <button class="btn btn-warning" onclick="changeAdminPassword()">🔑 Admin-Passwort ändern</button>
                    <button class="btn btn-danger" onclick="lockApp()">🔐 App sperren (Wartungsmodus)</button>
                </div>
            </div>
        </div>
    `;

    main.appendChild(adminSection);
}

// Admin Tab wechseln
function showAdminTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(panel => panel.classList.remove('active'));

    document.querySelector(`.admin-tab[onclick="showAdminTab('${tabName}')"]`).classList.add('active');
    document.getElementById('admin' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.add('active');

    // Tab-spezifische Aktionen
    switch(tabName) {
        case 'overview':
            refreshAdminStats();
            break;
        case 'users':
            loadUsersList();
            break;
        case 'data':
            updateDataStats();
            break;
    }
}

// Admin-Statistiken aktualisieren
function refreshAdminStats() {
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const nonAdminUsers = users.filter(u => !u.isAdmin);

    document.getElementById('totalUsers').textContent = nonAdminUsers.length;
    document.getElementById('verifiedUsers').textContent = nonAdminUsers.filter(u => u.emailVerified).length;

    // Durchschnittlicher Fortschritt
    if (nonAdminUsers.length > 0) {
        const avgProgress = Math.round(
            nonAdminUsers.reduce((sum, u) => sum + ((u.progress.topicsCompleted / 12) * 100), 0) / nonAdminUsers.length
        );
        document.getElementById('avgProgress').textContent = avgProgress + '%';

        // Gesamte Münzen
        const totalCoins = nonAdminUsers.reduce((sum, u) => sum + (u.progress.totalCoins || 0), 0);
        document.getElementById('totalCoinsAll').textContent = totalCoins.toLocaleString();
    }

    debugLog('Admin stats refreshed');
}

// Benutzer-Liste laden
function loadUsersList() {
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const container = document.getElementById('adminUsersList');

    const nonAdminUsers = users.filter(u => !u.isAdmin);

    if (nonAdminUsers.length === 0) {
        container.innerHTML = '<p class="no-data">Keine Benutzer registriert.</p>';
        return;
    }

    container.innerHTML = nonAdminUsers.map(user => `
        <div class="admin-user-card" data-user-id="${user.id}">
            <div class="user-card-header">
                <div class="user-card-avatar">👤</div>
                <div class="user-card-info">
                    <h4>${user.username}</h4>
                    <span class="user-email">${user.email}</span>
                    <span class="user-status ${user.emailVerified ? 'verified' : 'unverified'}">
                        ${user.emailVerified ? '✓ Verifiziert' : '⏳ Nicht verifiziert'}
                    </span>
                </div>
            </div>
            <div class="user-card-stats">
                <div class="user-stat">
                    <span>🐄</span>
                    <span>${user.progress.coins || 0}</span>
                </div>
                <div class="user-stat">
                    <span>⭐</span>
                    <span>${user.progress.xp || 0} XP</span>
                </div>
                <div class="user-stat">
                    <span>📊</span>
                    <span>${Math.round((user.progress.topicsCompleted / 12) * 100)}%</span>
                </div>
            </div>
            <div class="user-card-actions">
                <button class="btn btn-small btn-secondary" onclick="viewUserDetails('${user.id}')">👁️ Details</button>
                <button class="btn btn-small btn-warning" onclick="verifyUserEmail('${user.id}')">✓ Verifizieren</button>
                <button class="btn btn-small btn-danger" onclick="deleteUser('${user.id}')">🗑️ Löschen</button>
            </div>
        </div>
    `).join('');
}

// Benutzer-Details anzeigen
function viewUserDetails(userId) {
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const user = users.find(u => u.id === userId);

    if (!user) {
        showToast('Benutzer nicht gefunden', 'error');
        return;
    }

    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div class="user-details-modal">
            <h2>👤 Benutzerdetails: ${user.username}</h2>

            <div class="user-detail-section">
                <h4>📋 Basisdaten</h4>
                <table class="detail-table">
                    <tr><td>ID:</td><td>${user.id}</td></tr>
                    <tr><td>E-Mail:</td><td>${user.email}</td></tr>
                    <tr><td>Klasse:</td><td>${user.class || 'Nicht angegeben'}</td></tr>
                    <tr><td>Registriert:</td><td>${new Date(user.createdAt).toLocaleString('de-DE')}</td></tr>
                    <tr><td>E-Mail verifiziert:</td><td>${user.emailVerified ? '✓ Ja' : '✗ Nein'}</td></tr>
                </table>
            </div>

            <div class="user-detail-section">
                <h4>📊 Fortschritt</h4>
                <table class="detail-table">
                    <tr><td>Münzen:</td><td>${user.progress.coins} / ${user.progress.totalCoins} (gesamt)</td></tr>
                    <tr><td>XP:</td><td>${user.progress.xp}</td></tr>
                    <tr><td>Rang:</td><td>${RANKS[user.progress.rank]?.name || 'Unbekannt'}</td></tr>
                    <tr><td>Themen abgeschlossen:</td><td>${user.progress.topicsCompleted}/12</td></tr>
                    <tr><td>Übungen gemacht:</td><td>${user.progress.exercisesDone}</td></tr>
                    <tr><td>Quiz-Fragen richtig:</td><td>${user.progress.quizCorrect}</td></tr>
                    <tr><td>Lernzeit gesamt:</td><td>${user.progress.totalMinutes} Min</td></tr>
                    <tr><td>Burg-Level:</td><td>${user.progress.castleLevel}/7</td></tr>
                </table>
            </div>

            <div class="user-detail-section">
                <h4>🏆 Achievements (${user.achievements?.length || 0})</h4>
                <div class="achievements-list">
                    ${ACHIEVEMENTS.map(a => `
                        <span class="achievement-tag ${user.achievements?.includes(a.id) ? 'unlocked' : 'locked'}">
                            ${a.icon} ${a.name}
                        </span>
                    `).join('')}
                </div>
            </div>

            <div class="user-detail-section">
                <h4>📜 Letzte Aktivitäten</h4>
                <div class="activity-scroll">
                    ${(user.activities || []).slice(0, 10).map(a => `
                        <div class="activity-entry">
                            <span>${new Date(a.timestamp).toLocaleString('de-DE')}</span>
                            <span>${a.text}</span>
                        </div>
                    `).join('') || '<p>Keine Aktivitäten</p>'}
                </div>
            </div>

            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Schließen</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

// Benutzer-E-Mail verifizieren
function verifyUserEmail(userId) {
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        showToast('Benutzer nicht gefunden', 'error');
        return;
    }

    users[userIndex].emailVerified = true;
    localStorage.setItem('histolearn_users', JSON.stringify(users));

    loadUsersList();
    refreshAdminStats();
    showToast('E-Mail wurde verifiziert', 'success');
    debugLog(`Email verified for user ${userId}`);
}

// Benutzer löschen
function deleteUser(userId) {
    if (!confirm('Wirklich diesen Benutzer löschen? Dies kann nicht rückgängig gemacht werden!')) {
        return;
    }

    let users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('histolearn_users', JSON.stringify(users));

    loadUsersList();
    refreshAdminStats();
    showToast('Benutzer gelöscht', 'info');
    debugLog(`User ${userId} deleted`);
}

// Benutzer suchen
function searchUsers() {
    const query = document.getElementById('userSearchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.admin-user-card');

    cards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const email = card.querySelector('.user-email').textContent.toLowerCase();

        if (name.includes(query) || email.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Benutzer sortieren
function sortUsers() {
    const sortBy = document.getElementById('userSortSelect').value;
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const nonAdminUsers = users.filter(u => !u.isAdmin);

    switch(sortBy) {
        case 'newest':
            nonAdminUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'oldest':
            nonAdminUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'name':
            nonAdminUsers.sort((a, b) => a.username.localeCompare(b.username));
            break;
        case 'progress':
            nonAdminUsers.sort((a, b) => b.progress.topicsCompleted - a.progress.topicsCompleted);
            break;
        case 'coins':
            nonAdminUsers.sort((a, b) => b.progress.coins - a.progress.coins);
            break;
    }

    // Temporär neu laden mit sortierter Liste
    const container = document.getElementById('adminUsersList');
    container.innerHTML = nonAdminUsers.map(user => `
        <div class="admin-user-card" data-user-id="${user.id}">
            <div class="user-card-header">
                <div class="user-card-avatar">👤</div>
                <div class="user-card-info">
                    <h4>${user.username}</h4>
                    <span class="user-email">${user.email}</span>
                    <span class="user-status ${user.emailVerified ? 'verified' : 'unverified'}">
                        ${user.emailVerified ? '✓ Verifiziert' : '⏳ Nicht verifiziert'}
                    </span>
                </div>
            </div>
            <div class="user-card-stats">
                <div class="user-stat">
                    <span>🐄</span>
                    <span>${user.progress.coins || 0}</span>
                </div>
                <div class="user-stat">
                    <span>⭐</span>
                    <span>${user.progress.xp || 0} XP</span>
                </div>
                <div class="user-stat">
                    <span>📊</span>
                    <span>${Math.round((user.progress.topicsCompleted / 12) * 100)}%</span>
                </div>
            </div>
            <div class="user-card-actions">
                <button class="btn btn-small btn-secondary" onclick="viewUserDetails('${user.id}')">👁️ Details</button>
                <button class="btn btn-small btn-warning" onclick="verifyUserEmail('${user.id}')">✓ Verifizieren</button>
                <button class="btn btn-small btn-danger" onclick="deleteUser('${user.id}')">🗑️ Löschen</button>
            </div>
        </div>
    `).join('');
}

// Daten-Statistiken aktualisieren
function updateDataStats() {
    // LocalStorage Größe
    let totalSize = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            totalSize += localStorage[key].length * 2; // UTF-16
        }
    }
    document.getElementById('localStorageSize').textContent = (totalSize / 1024).toFixed(2) + ' KB';

    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    document.getElementById('userRecordCount').textContent = users.length;

    const totalChats = users.reduce((sum, u) => sum + (u.savedChats?.length || 0), 0);
    document.getElementById('chatCount').textContent = totalChats;
}

// Raw Data laden
function loadRawData() {
    const viewer = document.getElementById('rawDataViewer');
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    viewer.value = JSON.stringify(users, null, 2);
}

// Alle Daten exportieren
function exportAllData() {
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const data = {
        exportDate: new Date().toISOString(),
        users: users,
        pendingVerifications: pendingVerifications,
        version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `histolearn_full_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    URL.revokeObjectURL(url);
    showToast('Alle Daten exportiert!', 'success');
    debugLog('Full data export completed');
}

// Daten importieren
function importAllData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);

                if (data.users) {
                    localStorage.setItem('histolearn_users', JSON.stringify(data.users));
                    showToast('Daten importiert!', 'success');
                    debugLog('Data import completed');
                    refreshAdminStats();
                    loadUsersList();
                } else {
                    throw new Error('Ungültiges Format');
                }
            } catch (err) {
                showToast('Fehler beim Importieren!', 'error');
                debugLog('Import error: ' + err.message);
            }
        };
        reader.readAsText(file);
    };

    input.click();
}

// Alle Benutzer löschen
function clearAllUsers() {
    if (!confirm('WARNUNG: Wirklich ALLE Benutzer löschen? Dies kann nicht rückgängig gemacht werden!')) {
        return;
    }
    if (!confirm('Bist du WIRKLICH sicher? Alle Fortschritte werden gelöscht!')) {
        return;
    }

    // Admin behalten
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const adminUser = users.find(u => u.isAdmin);

    localStorage.setItem('histolearn_users', JSON.stringify(adminUser ? [adminUser] : []));

    showToast('Alle Benutzer gelöscht', 'warning');
    debugLog('All users cleared');
    refreshAdminStats();
    loadUsersList();
}

// === TEST FUNKTIONEN ===

// Test: Münzen hinzufügen
function testAddCoins() {
    const amount = parseInt(document.getElementById('testCoinAmount').value) || 100;
    addCoins(amount, 'Admin Test');
    debugLog(`Added ${amount} coins`);
}

// Test: Münzen entfernen
function testRemoveCoins() {
    const amount = parseInt(document.getElementById('testCoinAmount').value) || 100;
    if (currentUser) {
        currentUser.progress.coins = Math.max(0, currentUser.progress.coins - amount);
        updateUserProgress({ coins: currentUser.progress.coins });
        showToast(`-${amount} 🐄 entfernt`, 'info');
        debugLog(`Removed ${amount} coins`);
    }
}

// Test: XP hinzufügen
function testAddXP() {
    const amount = parseInt(document.getElementById('testXPAmount').value) || 500;
    addXP(amount);
    debugLog(`Added ${amount} XP`);
}

// Test: Rang setzen
function testSetRank() {
    const rankIndex = parseInt(document.getElementById('testRankSelect').value);
    if (currentUser && rankIndex >= 0 && rankIndex < RANKS.length) {
        currentUser.progress.rank = rankIndex;
        currentUser.progress.xp = RANKS[rankIndex].minPoints;
        updateUserProgress({ rank: rankIndex, xp: currentUser.progress.xp });
        showToast(`Rang auf ${RANKS[rankIndex].name} gesetzt`, 'success');
        debugLog(`Rank set to ${RANKS[rankIndex].name}`);
    }
}

// Test: Achievement freischalten
function testUnlockAchievement() {
    const achievementId = document.getElementById('testAchievementSelect').value;
    if (currentUser && !currentUser.achievements.includes(achievementId)) {
        currentUser.achievements.push(achievementId);
        const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
        showAchievementUnlocked(achievement);
        updateAchievementsDisplay();
        debugLog(`Achievement unlocked: ${achievementId}`);
    }
}

// Test: Alle Achievements freischalten
function testUnlockAllAchievements() {
    if (currentUser) {
        currentUser.achievements = ACHIEVEMENTS.map(a => a.id);
        const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('histolearn_users', JSON.stringify(users));
        }
        updateAchievementsDisplay();
        showToast('Alle Achievements freigeschaltet!', 'success');
        debugLog('All achievements unlocked');
    }
}

// Test: Alle Burg-Teile freischalten
function testUnlockAllCastle() {
    if (currentUser) {
        currentUser.progress.castleParts = {
            gate: true,
            wallLeft: true,
            wallRight: true,
            towerLeft: true,
            towerRight: true,
            keep: true,
            flag: true
        };
        currentUser.progress.castleLevel = 7;
        updateUserProgress({
            castleParts: currentUser.progress.castleParts,
            castleLevel: 7
        });
        showToast('Burg vollständig freigeschaltet!', 'success');
        debugLog('All castle parts unlocked');
    }
}

// Test: Burg zurücksetzen
function testResetCastle() {
    if (currentUser) {
        currentUser.progress.castleParts = {
            gate: true,
            wallLeft: false,
            wallRight: false,
            towerLeft: false,
            towerRight: false,
            keep: false,
            flag: false
        };
        currentUser.progress.castleLevel = 1;
        updateUserProgress({
            castleParts: currentUser.progress.castleParts,
            castleLevel: 1
        });
        showToast('Burg zurückgesetzt', 'info');
        debugLog('Castle reset');
    }
}

// Debug Log
function debugLog(message) {
    const output = document.getElementById('debugOutput');
    if (output) {
        const timestamp = new Date().toLocaleTimeString();
        output.value += `[${timestamp}] ${message}\n`;
        output.scrollTop = output.scrollHeight;
    }
    console.log(`[ADMIN DEBUG] ${message}`);
}

// Debug-Konsole leeren
function clearDebugOutput() {
    const output = document.getElementById('debugOutput');
    if (output) {
        output.value = '';
    }
}

// Pending Verifications löschen
function clearPendingVerifications() {
    pendingVerifications = {};
    showToast('Pending Verifications gelöscht', 'info');
    debugLog('Pending verifications cleared');
}

// Admin-Passwort ändern (nur in dieser Session)
function changeAdminPassword() {
    const newPassword = prompt('Neues Admin-Passwort eingeben:');
    if (newPassword && newPassword.length >= 8) {
        ADMIN_CREDENTIALS.password = newPassword;
        showToast('Passwort geändert (nur für diese Session)', 'success');
        debugLog('Admin password changed');
    } else {
        showToast('Passwort muss mindestens 8 Zeichen haben', 'error');
    }
}

// App sperren
function lockApp() {
    if (!confirm('App wirklich in den Wartungsmodus setzen?')) return;

    localStorage.setItem('histolearn_maintenance', 'true');
    showToast('App gesperrt - Wartungsmodus aktiv', 'warning');
    debugLog('App locked - maintenance mode');
}

// === E-MAIL VERIFIZIERUNG ===

// Verifizierungscode generieren
function generateVerificationCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Verifizierungs-E-Mail "senden" (simuliert)
function sendVerificationEmail(userId, email) {
    const code = generateVerificationCode();
    pendingVerifications[userId] = {
        code: code,
        email: email,
        createdAt: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 Stunden
    };

    // In Realität: API-Call zum E-Mail-Server
    console.log(`[EMAIL SIMULATION] Verification code for ${email}: ${code}`);

    return code;
}

// Verifizierungscode prüfen
function verifyCode(userId, code) {
    const verification = pendingVerifications[userId];
    if (!verification) return false;

    if (Date.now() > verification.expiresAt) {
        delete pendingVerifications[userId];
        return false;
    }

    if (verification.code === code.toUpperCase()) {
        // Benutzer als verifiziert markieren
        const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            users[userIndex].emailVerified = true;
            localStorage.setItem('histolearn_users', JSON.stringify(users));
        }

        delete pendingVerifications[userId];
        return true;
    }

    return false;
}

// Enhanced Registration mit E-Mail-Verifizierung
const originalHandleRegister = handleRegister;
handleRegister = function(event) {
    event.preventDefault();

    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const userClass = document.getElementById('regClass').value;

    if (!username || !email || !password) {
        showToast('Bitte alle Felder ausfüllen!', 'error');
        return;
    }

    // E-Mail Format prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Bitte eine gültige E-Mail-Adresse eingeben!', 'error');
        return;
    }

    // Prüfen ob Benutzer existiert
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    if (users.find(u => u.username === username)) {
        showToast('Benutzername bereits vergeben!', 'error');
        return;
    }
    if (users.find(u => u.email === email)) {
        showToast('E-Mail-Adresse bereits registriert!', 'error');
        return;
    }

    // Neuen Benutzer erstellen
    const newUser = {
        id: Date.now().toString(),
        username: username,
        email: email,
        password: password,
        class: userClass,
        emailVerified: false, // Noch nicht verifiziert
        createdAt: new Date().toISOString(),
        progress: {
            coins: 0,
            totalCoins: 0,
            rank: 0,
            xp: 0,
            topicsCompleted: 0,
            exercisesDone: 0,
            quizCorrect: 0,
            totalMinutes: 0,
            todayMinutes: 0,
            lastActive: null,
            operatorsViewed: 0,
            strategiesViewed: 0,
            timelineViewed: 0,
            castleLevel: 1,
            castleParts: {
                gate: true,
                wallLeft: false,
                wallRight: false,
                towerLeft: false,
                towerRight: false,
                keep: false,
                flag: false
            }
        },
        achievements: [],
        preferences: {
            theme: 'dark',
            accentColor: '#c9a227',
            aiMode: 'tutor',
            pomodoroWork: 20,
            pomodoroBreak: 5,
            pomodoroSound: true,
            preferredStrategy: ''
        },
        savedChats: [],
        folders: [],
        activities: []
    };

    users.push(newUser);
    localStorage.setItem('histolearn_users', JSON.stringify(users));

    // Verifizierungscode senden
    const verificationCode = sendVerificationEmail(newUser.id, email);

    // Verifizierungs-Dialog anzeigen
    showVerificationDialog(newUser.id, email, verificationCode);
};

// Verifizierungs-Dialog anzeigen
function showVerificationDialog(userId, email, code) {
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div class="verification-dialog">
            <h2>📧 E-Mail-Bestätigung</h2>
            <p>Wir haben einen Bestätigungscode an <strong>${email}</strong> gesendet.</p>

            <div class="verification-demo">
                <p class="demo-note">⚠️ DEMO-MODUS: In der echten App würde der Code per E-Mail versendet.</p>
                <p class="demo-code">Dein Code: <strong>${code}</strong></p>
            </div>

            <div class="verification-input">
                <label>Bestätigungscode eingeben:</label>
                <input type="text" id="verificationCodeInput" maxlength="6" placeholder="XXXXXX" style="text-transform: uppercase; font-size: 1.5em; letter-spacing: 5px; text-align: center;">
            </div>

            <div class="verification-actions">
                <button class="btn btn-primary" onclick="submitVerificationCode('${userId}')">Bestätigen</button>
                <button class="btn btn-secondary" onclick="resendVerificationCode('${userId}', '${email}')">Code erneut senden</button>
                <button class="btn btn-secondary" onclick="skipVerification('${userId}')">Später verifizieren</button>
            </div>
        </div>

        <style>
            .verification-dialog { text-align: center; padding: 30px; }
            .verification-demo { background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; }
            .demo-note { color: #856404; margin-bottom: 10px; }
            .demo-code { font-size: 1.3em; }
            .verification-input { margin: 30px 0; }
            .verification-input input { width: 200px; padding: 15px; border: 2px solid var(--border-color); border-radius: 10px; }
            .verification-actions { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
        </style>
    `;

    modal.classList.add('active');
}

// Verifizierungscode einreichen
function submitVerificationCode(userId) {
    const code = document.getElementById('verificationCodeInput').value.trim();

    if (!code) {
        showToast('Bitte Code eingeben!', 'error');
        return;
    }

    if (verifyCode(userId, code)) {
        closeExerciseModal();
        showToast('E-Mail erfolgreich verifiziert! Du kannst dich jetzt anmelden.', 'success');
        showLoginTab('login');
    } else {
        showToast('Ungültiger oder abgelaufener Code!', 'error');
    }
}

// Code erneut senden
function resendVerificationCode(userId, email) {
    const newCode = sendVerificationEmail(userId, email);
    document.querySelector('.demo-code strong').textContent = newCode;
    showToast('Neuer Code gesendet!', 'success');
}

// Verifizierung überspringen
function skipVerification(userId) {
    closeExerciseModal();
    showToast('Du kannst die Verifizierung später nachholen. Einige Funktionen sind eingeschränkt.', 'info');
    showLoginTab('login');
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    // Admin-Panel erstellen
    createAdminSection();

    // Prüfen ob Admin eingeloggt
    setTimeout(() => {
        if (isAdmin()) {
            showAdminButton();
        }
    }, 100);

    // Wartungsmodus prüfen
    if (localStorage.getItem('histolearn_maintenance') === 'true' && !isAdmin()) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #1a1a2e; color: white; flex-direction: column;">
                <h1>🔧 Wartungsmodus</h1>
                <p>Die App wird gerade gewartet. Bitte versuche es später erneut.</p>
            </div>
        `;
    }
});

// CSS für Admin-Panel
const adminStyles = document.createElement('style');
adminStyles.textContent = `
    .admin-nav-item {
        background: linear-gradient(135deg, #c9a227, #8b6914) !important;
        color: white !important;
    }
    .admin-header {
        background: linear-gradient(135deg, #c9a227, #8b6914);
        color: white;
        padding: 30px;
        border-radius: 15px;
        margin-bottom: 30px;
    }
    .admin-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }
    .admin-tab {
        padding: 12px 20px;
        background: var(--bg-secondary);
        border: 2px solid var(--border-color);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .admin-tab:hover {
        border-color: #c9a227;
    }
    .admin-tab.active {
        background: linear-gradient(135deg, #c9a227, #8b6914);
        color: white;
        border-color: #c9a227;
    }
    .admin-panel {
        display: none;
        animation: fadeIn 0.3s ease;
    }
    .admin-panel.active {
        display: block;
    }
    .admin-stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }
    .admin-stat-card {
        background: var(--bg-secondary);
        padding: 25px;
        border-radius: 15px;
        text-align: center;
    }
    .admin-stat-card h3 {
        font-size: 0.9em;
        margin-bottom: 10px;
        opacity: 0.8;
    }
    .admin-stat-value {
        font-size: 2.5em;
        font-weight: bold;
        color: #c9a227;
    }
    .admin-quick-actions {
        background: var(--bg-secondary);
        padding: 25px;
        border-radius: 15px;
    }
    .admin-action-buttons {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        margin-top: 15px;
    }
    .admin-users-controls {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
    }
    .admin-users-controls input,
    .admin-users-controls select {
        padding: 12px 15px;
        border: 2px solid var(--border-color);
        border-radius: 10px;
        font-size: 1em;
    }
    .admin-users-controls input {
        flex: 1;
    }
    .admin-users-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 20px;
    }
    .admin-user-card {
        background: var(--bg-secondary);
        border-radius: 15px;
        padding: 20px;
        border: 2px solid var(--border-color);
    }
    .user-card-header {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
    }
    .user-card-avatar {
        width: 50px;
        height: 50px;
        background: var(--bg-tertiary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
    }
    .user-card-info h4 {
        margin-bottom: 5px;
    }
    .user-email {
        font-size: 0.85em;
        opacity: 0.7;
        display: block;
    }
    .user-status {
        font-size: 0.8em;
        padding: 3px 8px;
        border-radius: 10px;
        display: inline-block;
        margin-top: 5px;
    }
    .user-status.verified {
        background: #27ae60;
        color: white;
    }
    .user-status.unverified {
        background: #f39c12;
        color: white;
    }
    .user-card-stats {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
        padding: 10px;
        background: var(--bg-tertiary);
        border-radius: 8px;
    }
    .user-stat {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .user-card-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    .admin-data-section {
        background: var(--bg-secondary);
        padding: 25px;
        border-radius: 15px;
        margin-bottom: 20px;
    }
    .data-info p {
        margin: 10px 0;
    }
    .test-section {
        background: var(--bg-secondary);
        padding: 25px;
        border-radius: 15px;
        margin-bottom: 20px;
    }
    .test-group {
        margin: 20px 0;
        padding: 15px;
        background: var(--bg-tertiary);
        border-radius: 10px;
    }
    .test-group h4 {
        margin-bottom: 10px;
    }
    .test-controls {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        align-items: center;
    }
    .test-controls input,
    .test-controls select {
        padding: 10px;
        border: 2px solid var(--border-color);
        border-radius: 8px;
    }
    .admin-setting-section {
        background: var(--bg-secondary);
        padding: 25px;
        border-radius: 15px;
        margin-bottom: 20px;
    }
    .setting-note {
        font-size: 0.85em;
        opacity: 0.7;
        margin-top: 10px;
    }
    .no-data {
        text-align: center;
        padding: 40px;
        opacity: 0.6;
    }
    .user-details-modal {
        max-width: 700px;
    }
    .user-detail-section {
        margin: 20px 0;
        padding: 15px;
        background: var(--bg-tertiary);
        border-radius: 10px;
    }
    .detail-table {
        width: 100%;
    }
    .detail-table td {
        padding: 8px 0;
        border-bottom: 1px solid var(--border-color);
    }
    .detail-table td:first-child {
        font-weight: bold;
        width: 40%;
    }
    .achievements-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .achievement-tag {
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.85em;
    }
    .achievement-tag.unlocked {
        background: #27ae60;
        color: white;
    }
    .achievement-tag.locked {
        background: var(--bg-tertiary);
        opacity: 0.5;
    }
    .activity-scroll {
        max-height: 200px;
        overflow-y: auto;
    }
    .activity-entry {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--border-color);
        font-size: 0.9em;
    }
    .modal-actions {
        margin-top: 20px;
        text-align: center;
    }
    .btn-success { background: #27ae60; color: white; }
    .btn-danger { background: #e74c3c; color: white; }
    .btn-warning { background: #f39c12; color: white; }
    .btn-info { background: #3498db; color: white; }
`;
document.head.appendChild(adminStyles);
