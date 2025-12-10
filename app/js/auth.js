// ===== AUTHENTICATION & USER MANAGEMENT =====

// Aktueller Benutzer
let currentUser = null;

// Login Tab wechseln
function showLoginTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));

    if (tab === 'login') {
        document.querySelector('.tab-btn:first-child').classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelector('.tab-btn:last-child').classList.add('active');
        document.getElementById('registerForm').classList.add('active');
    }
}

// Registrierung
function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const userClass = document.getElementById('regClass').value;

    if (!username || !email || !password) {
        showToast('Bitte alle Felder ausfüllen!', 'error');
        return;
    }

    // Prüfen ob Benutzer existiert
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    if (users.find(u => u.username === username)) {
        showToast('Benutzername bereits vergeben!', 'error');
        return;
    }

    // Neuen Benutzer erstellen
    const newUser = {
        id: Date.now().toString(),
        username: username,
        email: email,
        password: password, // In Produktion: hashen!
        class: userClass,
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
            theme: 'light',
            accentColor: '#667eea',
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

    showToast('Registrierung erfolgreich! Du kannst dich jetzt anmelden.', 'success');
    showLoginTab('login');

    // Felder leeren
    document.getElementById('regUsername').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
}

// Login
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        showToast('Bitte alle Felder ausfüllen!', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        showToast('Falscher Benutzername oder Passwort!', 'error');
        return;
    }

    // Login erfolgreich
    currentUser = user;
    localStorage.setItem('histolearn_currentUser', user.id);

    // Letztes Aktivitätsdatum aktualisieren
    updateUserProgress({ lastActive: new Date().toISOString() });

    // Prüfen ob neuer Tag
    const today = new Date().toDateString();
    const lastActive = user.progress.lastActive ? new Date(user.progress.lastActive).toDateString() : null;
    if (lastActive !== today) {
        updateUserProgress({ todayMinutes: 0 });
    }

    // Zur App wechseln
    showMainApp();

    showToast(`Willkommen zurück, ${username}!`, 'success');

    // Aktivität loggen
    addActivity('login', 'Angemeldet');
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('histolearn_currentUser');

    // Zurück zum Login
    document.getElementById('mainApp').classList.remove('active');
    document.getElementById('loginScreen').classList.add('active');

    // Timer stoppen
    pauseTimer();

    showToast('Erfolgreich abgemeldet!', 'info');
}

// Benutzerfortschritt aktualisieren
function updateUserProgress(updates) {
    if (!currentUser) return;

    Object.assign(currentUser.progress, updates);

    // In localStorage speichern
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }

    // UI aktualisieren
    updateUserUI();

    // Achievements prüfen
    checkAchievements();
}

// Benutzereinstellungen aktualisieren
function updateUserPreferences(updates) {
    if (!currentUser) return;

    Object.assign(currentUser.preferences, updates);

    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }
}

// Münzen hinzufügen
function addCoins(amount, reason) {
    if (!currentUser) return;

    currentUser.progress.coins += amount;
    currentUser.progress.totalCoins += amount;

    updateUserProgress({
        coins: currentUser.progress.coins,
        totalCoins: currentUser.progress.totalCoins
    });

    showToast(`+${amount} 🐄 ${reason}`, 'success');

    // Animation
    animateCoinGain(amount);

    addActivity('coins', `${amount} Münzen erhalten: ${reason}`);
}

// Münzen ausgeben
function spendCoins(amount) {
    if (!currentUser) return false;

    if (currentUser.progress.coins < amount) {
        showToast('Nicht genug Münzen!', 'error');
        return false;
    }

    currentUser.progress.coins -= amount;
    updateUserProgress({ coins: currentUser.progress.coins });

    return true;
}

// Aktivität hinzufügen
function addActivity(type, text) {
    if (!currentUser) return;

    const activity = {
        type: type,
        text: text,
        timestamp: new Date().toISOString()
    };

    currentUser.activities.unshift(activity);

    // Nur letzte 50 Aktivitäten behalten
    if (currentUser.activities.length > 50) {
        currentUser.activities = currentUser.activities.slice(0, 50);
    }

    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }

    updateActivityList();
}

// UI aktualisieren
function updateUserUI() {
    if (!currentUser) return;

    // Benutzername
    const usernameElements = document.querySelectorAll('#displayUsername, #welcomeName');
    usernameElements.forEach(el => {
        if (el) el.textContent = currentUser.username;
    });

    // Münzen
    const coinElements = document.querySelectorAll('#coinCount, #coinsAmount');
    coinElements.forEach(el => {
        if (el) el.textContent = currentUser.progress.coins;
    });

    // Rang
    const rank = RANKS[currentUser.progress.rank] || RANKS[0];
    const nextRank = RANKS[currentUser.progress.rank + 1];

    document.getElementById('displayRank').textContent = `${rank.icon} ${rank.name}`;
    document.getElementById('rankIcon').textContent = rank.icon;
    document.getElementById('rankName').textContent = rank.name;

    if (nextRank) {
        document.getElementById('nextRank').textContent = nextRank.name;
        const progress = ((currentUser.progress.xp - rank.minPoints) / (nextRank.minPoints - rank.minPoints)) * 100;
        document.getElementById('rankBarFill').style.width = `${Math.min(progress, 100)}%`;
    } else {
        document.getElementById('nextRank').textContent = 'Maximum erreicht!';
        document.getElementById('rankBarFill').style.width = '100%';
    }

    // Fortschritt
    const progressPercent = Math.round((currentUser.progress.topicsCompleted / 12) * 100);
    document.getElementById('progressValue').textContent = `${progressPercent}%`;
    document.getElementById('topicsCompleted').textContent = `${currentUser.progress.topicsCompleted}/12`;
    document.getElementById('exercisesDone').textContent = currentUser.progress.exercisesDone;

    // Progress Ring
    const progressRing = document.getElementById('progressRing');
    if (progressRing) {
        progressRing.style.background = `conic-gradient(var(--primary) ${progressPercent * 3.6}deg, var(--bg-tertiary) 0deg)`;
    }

    // Heute gelernt
    document.getElementById('todayLearned').textContent = currentUser.progress.todayMinutes;

    // Burg aktualisieren
    updateCastleDisplay();
}

// Aktivitätsliste aktualisieren
function updateActivityList() {
    const list = document.getElementById('activityList');
    if (!list || !currentUser) return;

    if (currentUser.activities.length === 0) {
        list.innerHTML = '<div class="activity-item"><span class="activity-icon">🎯</span><span class="activity-text">Starte deine erste Übung!</span></div>';
        return;
    }

    const icons = {
        login: '👋',
        quiz: '❓',
        exercise: '🎯',
        coins: '🐄',
        achievement: '🏆',
        timer: '⏱️',
        chat: '💬'
    };

    list.innerHTML = currentUser.activities.slice(0, 5).map(a => `
        <div class="activity-item">
            <span class="activity-icon">${icons[a.type] || '📝'}</span>
            <span class="activity-text">${a.text}</span>
        </div>
    `).join('');
}

// Achievements prüfen
function checkAchievements() {
    if (!currentUser) return;

    const p = currentUser.progress;

    ACHIEVEMENTS.forEach(achievement => {
        if (currentUser.achievements.includes(achievement.id)) return;

        let unlocked = false;

        // Bedingungen prüfen
        switch (achievement.id) {
            case 'first-steps':
                unlocked = p.exercisesDone >= 1;
                break;
            case 'quiz-master':
                unlocked = p.quizCorrect >= 10;
                break;
            case 'time-traveler':
                unlocked = p.timelineViewed >= 5;
                break;
            case 'operator-pro':
                unlocked = p.operatorsViewed >= 17;
                break;
            case 'strategy-guru':
                unlocked = p.strategiesViewed >= 12;
                break;
            case 'dedicated':
                unlocked = p.totalMinutes >= 60;
                break;
            case 'castle-builder':
                unlocked = p.castleLevel >= 2;
                break;
            case 'rich':
                unlocked = p.totalCoins >= 100;
                break;
        }

        if (unlocked) {
            currentUser.achievements.push(achievement.id);
            showAchievementUnlocked(achievement);
            addCoins(25, `Achievement: ${achievement.name}`);
        }
    });

    // Speichern
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }

    updateAchievementsDisplay();
}

// Achievement freigeschaltet anzeigen
function showAchievementUnlocked(achievement) {
    showToast(`🏆 Achievement freigeschaltet: ${achievement.name}!`, 'success');
    addActivity('achievement', `${achievement.name} freigeschaltet`);
}

// Achievements-Anzeige aktualisieren
function updateAchievementsDisplay() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid || !currentUser) return;

    grid.innerHTML = ACHIEVEMENTS.slice(0, 4).map(a => {
        const unlocked = currentUser.achievements.includes(a.id);
        return `
            <div class="achievement ${unlocked ? 'unlocked' : 'locked'}">
                <span class="achievement-icon">${unlocked ? a.icon : '🔒'}</span>
                <span class="achievement-name">${a.name}</span>
            </div>
        `;
    }).join('');
}

// XP hinzufügen und Rang prüfen
function addXP(amount) {
    if (!currentUser) return;

    currentUser.progress.xp += amount;

    // Rang-Aufstieg prüfen
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (currentUser.progress.xp >= RANKS[i].minPoints) {
            if (i > currentUser.progress.rank) {
                currentUser.progress.rank = i;
                showToast(`🎉 Aufgestiegen zu: ${RANKS[i].icon} ${RANKS[i].name}!`, 'success');
                addCoins(50, 'Rang-Aufstieg');
                addActivity('achievement', `Rang ${RANKS[i].name} erreicht`);
            }
            break;
        }
    }

    updateUserProgress({ xp: currentUser.progress.xp, rank: currentUser.progress.rank });
}

// Münzanimation
function animateCoinGain(amount) {
    const coinDisplay = document.querySelector('.coin-amount');
    if (coinDisplay) {
        coinDisplay.style.transform = 'scale(1.3)';
        coinDisplay.style.color = '#27ae60';
        setTimeout(() => {
            coinDisplay.style.transform = 'scale(1)';
            coinDisplay.style.color = '';
        }, 300);
    }
}

// Beim Laden prüfen ob eingeloggt
function checkAuth() {
    const userId = localStorage.getItem('histolearn_currentUser');
    if (userId) {
        const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
        const user = users.find(u => u.id === userId);
        if (user) {
            currentUser = user;
            showMainApp();
            return true;
        }
    }
    return false;
}

// Main App anzeigen
function showMainApp() {
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('mainApp').classList.add('active');

    // Theme anwenden
    if (currentUser && currentUser.preferences) {
        applyTheme(currentUser.preferences.theme);
        applyAccentColor(currentUser.preferences.accentColor);
    }

    // UI aktualisieren
    updateUserUI();
    updateActivityList();
    updateAchievementsDisplay();

    // Fun Fact aktualisieren
    updateFunFact();
}

// Fun Fact aktualisieren
function updateFunFact() {
    const factElement = document.getElementById('funFactText');
    if (factElement) {
        const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
        factElement.textContent = randomFact;
    }
}

// Daten exportieren
function exportData() {
    if (!currentUser) return;

    const data = JSON.stringify(currentUser, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `histolearn_backup_${currentUser.username}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    URL.revokeObjectURL(url);
    showToast('Daten exportiert!', 'success');
}

// Daten importieren
function importData() {
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

                // Validieren
                if (!data.id || !data.username) {
                    throw new Error('Ungültige Datei');
                }

                // Benutzer aktualisieren
                const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
                const userIndex = users.findIndex(u => u.id === currentUser.id);

                data.id = currentUser.id; // ID beibehalten

                if (userIndex !== -1) {
                    users[userIndex] = data;
                    localStorage.setItem('histolearn_users', JSON.stringify(users));
                    currentUser = data;
                    updateUserUI();
                    showToast('Daten importiert!', 'success');
                }
            } catch (err) {
                showToast('Fehler beim Importieren!', 'error');
            }
        };
        reader.readAsText(file);
    };

    input.click();
}

// Fortschritt zurücksetzen
function resetProgress() {
    if (!currentUser) return;

    if (!confirm('Wirklich ALLEN Fortschritt zurücksetzen? Das kann nicht rückgängig gemacht werden!')) {
        return;
    }

    currentUser.progress = {
        coins: 0,
        totalCoins: 0,
        rank: 0,
        xp: 0,
        topicsCompleted: 0,
        exercisesDone: 0,
        quizCorrect: 0,
        totalMinutes: 0,
        todayMinutes: 0,
        lastActive: new Date().toISOString(),
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
    };
    currentUser.achievements = [];
    currentUser.activities = [];

    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }

    updateUserUI();
    updateActivityList();
    updateAchievementsDisplay();

    showToast('Fortschritt zurückgesetzt.', 'info');
}
