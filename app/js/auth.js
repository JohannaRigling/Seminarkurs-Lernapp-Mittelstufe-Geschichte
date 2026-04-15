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
        displayName: username, // Anzeigename (kann später geändert werden)
        class: userClass,
        avatar: null, // Avatar-Konfiguration
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
            },
            learningSessions: {
                current: null,
                history: []
            }
        },
        exerciseAttempts: {},
        performanceAnalytics: {
            byTopic: {},
            byOperator: {},
            byAFB: { 1: {}, 2: {}, 3: {} }
        },
        weaknesses: [],
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
        activities: [],
        tutorialCompleted: false
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

    // Tutorial beim ersten Login zeigen
    if (!user.tutorialCompleted) {
        setTimeout(() => startTutorial(), 600);
    } else {
        showToast(`Willkommen zurück, ${username}!`, 'success');
    }

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

    // Sound abspielen
    if (typeof playSound === 'function') {
        playSound('coin');
    }

    // Animation
    if (typeof animateCoinGain === 'function') {
        animateCoinGain(amount);
    }

    // Daily Challenge Progress
    if (typeof updateDailyChallengeProgress === 'function') {
        updateDailyChallengeProgress('coins', amount);
    }

    addActivity('coins', `${amount} Münzen erhalten: ${reason}`);
}

// XP hinzufügen
function addXP(amount) {
    if (!currentUser) return;

    const oldRank = currentUser.progress.rank;
    currentUser.progress.xp += amount;

    // Rang-Check
    let newRank = 0;
    for (let i = RANKS.length - 1; i >= 0; i--) {
        if (currentUser.progress.xp >= RANKS[i].minPoints) {
            newRank = i;
            break;
        }
    }

    const leveledUp = newRank > oldRank;

    updateUserProgress({
        xp: currentUser.progress.xp,
        rank: newRank
    });

    // XP Animation
    if (typeof animateXPGain === 'function') {
        animateXPGain(amount);
    }

    // Level Up!
    if (leveledUp) {
        const rank = RANKS[newRank];
        showToast(`🎉 Level Up! Du bist jetzt ${rank.icon} ${rank.name}!`, 'success');

        // Bonus-Münzen für Rang-Aufstieg
        const bonus = 10 + (newRank * 5);
        setTimeout(() => {
            addCoins(bonus, `Rang-Aufstieg: ${rank.name}`);
        }, 1000);

        // Sound und Confetti
        if (typeof playSound === 'function') {
            playSound('levelUp');
        }
        if (typeof showConfetti === 'function') {
            showConfetti(50);
        }

        addActivity('achievement', `Neuer Rang erreicht: ${rank.name}`);
    }

    // Daily Challenge Progress
    if (typeof updateDailyChallengeProgress === 'function') {
        updateDailyChallengeProgress('xp', amount);
    }
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

    // Benutzername/Anzeigename
    const usernameElements = document.querySelectorAll('#displayUsername, #welcomeName');
    usernameElements.forEach(el => {
        if (el) el.textContent = getDisplayName();
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
        progressRing.style.background = `conic-gradient(var(--secondary) ${progressPercent * 3.6}deg, var(--bg-primary) ${progressPercent * 3.6}deg)`;
    }

    // Heute gelernt
    document.getElementById('todayLearned').textContent = currentUser.progress.todayMinutes;

    // Burg aktualisieren
    updateCastleDisplay();

    // Avatar aktualisieren
    if (typeof updateAllAvatarDisplays === 'function') {
        updateAllAvatarDisplays();
    }
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
            // Neue Achievements
            case 'streak-3':
                unlocked = (p.streak || 0) >= 3;
                break;
            case 'streak-7':
                unlocked = (p.streak || 0) >= 7;
                break;
            case 'memory-champ':
                unlocked = (p.memoryWins || 0) >= 5;
                break;
            case 'chat-explorer':
                unlocked = (p.chatQuestions || 0) >= 20;
                break;
            case 'note-taker':
                unlocked = (p.notesCreated || 0) >= 5;
                break;
            case 'perfect-quiz':
                unlocked = p.perfectQuizzes >= 1;
                break;
            case 'night-owl':
                const hour = new Date().getHours();
                unlocked = p.exercisesDone >= 1 && (hour >= 22 || hour < 6);
                break;
            case 'early-bird':
                const earlyHour = new Date().getHours();
                unlocked = p.exercisesDone >= 1 && (earlyHour >= 5 && earlyHour < 8);
                break;
            case 'bookworm':
                unlocked = (p.materialsViewed || 0) >= 10;
                break;
            case 'quiz-streak':
                unlocked = (p.quizStreak || 0) >= 5;
                break;
            case 'marathon':
                unlocked = p.totalMinutes >= 300;
                break;
            case 'millionaire':
                unlocked = p.totalCoins >= 500;
                break;
            // Adaptive Learning Achievements
            case 'diagnostiker':
                unlocked = (p.learningSessions?.history || []).some(s => s.diagnosticCompleted);
                break;
            case 'weakness-crusher':
                unlocked = (currentUser.weaknesses || []).filter(w => w.improved).length >= 3;
                break;
            case 'endurance-fighter':
                const totalAttempts = Object.values(currentUser.exerciseAttempts || {})
                    .reduce((sum, attempts) => sum + attempts.length, 0);
                unlocked = totalAttempts >= 50;
                break;
            case 'perfectionist':
                unlocked = checkConsecutivePerfect(currentUser, 5);
                break;
            case 'goal-achiever':
                unlocked = (p.learningSessions?.history || []).some(s => s.overallScore >= 0.8);
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

    // Sound und Confetti
    if (typeof playSound === 'function') {
        playSound('achievement');
    }
    if (typeof showConfetti === 'function') {
        showConfetti(30);
    }
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

// Note: addXP Funktion ist weiter oben definiert (mit Sound und Confetti)

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
    updateSavedChatsList();

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

// ========================================
// ADAPTIVE LEARNING HELPER FUNCTIONS
// ========================================

/**
 * Zeichnet einen Übungsversuch auf
 * @param {Object} attempt - Der Versuch mit exerciseId, score, maxScore, etc.
 */
function recordExerciseAttempt(attempt) {
    if (!currentUser) return;

    // Initialisieren falls nötig
    if (!currentUser.exerciseAttempts) {
        currentUser.exerciseAttempts = {};
    }
    if (!currentUser.performanceAnalytics) {
        currentUser.performanceAnalytics = {
            byTopic: {},
            byOperator: {},
            byAFB: { 1: {}, 2: {}, 3: {} }
        };
    }
    if (!currentUser.weaknesses) {
        currentUser.weaknesses = [];
    }

    const exerciseId = attempt.exerciseId;

    // Attempt speichern
    if (!currentUser.exerciseAttempts[exerciseId]) {
        currentUser.exerciseAttempts[exerciseId] = [];
    }
    currentUser.exerciseAttempts[exerciseId].push({
        score: attempt.score,
        maxScore: attempt.maxScore,
        correct: attempt.correct,
        timestamp: attempt.timestamp || new Date().toISOString(),
        sessionId: attempt.sessionId
    });

    // Nur letzte 10 Versuche pro Übung behalten
    if (currentUser.exerciseAttempts[exerciseId].length > 10) {
        currentUser.exerciseAttempts[exerciseId] =
            currentUser.exerciseAttempts[exerciseId].slice(-10);
    }

    // Zur aktuellen Session hinzufügen
    if (currentUser.progress.learningSessions?.current &&
        attempt.sessionId === currentUser.progress.learningSessions.current.id) {
        if (!currentUser.progress.learningSessions.current.exercisesDone.includes(exerciseId)) {
            currentUser.progress.learningSessions.current.exercisesDone.push(exerciseId);
        }
    }

    // Performance Analytics aktualisieren
    const exercise = getExerciseById(exerciseId);
    if (exercise) {
        updatePerformanceAnalytics(exercise, attempt);
    }

    // Schwächen neu erkennen
    detectWeaknesses();

    // Speichern
    updateUserProgress({
        exerciseAttempts: currentUser.exerciseAttempts,
        performanceAnalytics: currentUser.performanceAnalytics,
        weaknesses: currentUser.weaknesses,
        learningSessions: currentUser.progress.learningSessions
    });
}

/**
 * Aktualisiert Performance-Analytics
 * @param {Object} exercise - Die Übung
 * @param {Object} attempt - Der Versuch
 */
function updatePerformanceAnalytics(exercise, attempt) {
    if (!currentUser || !currentUser.performanceAnalytics) return;

    const scoreRatio = attempt.score / attempt.maxScore;

    // By Topic
    const topicId = exercise.topicId || 'unknown';
    if (!currentUser.performanceAnalytics.byTopic[topicId]) {
        currentUser.performanceAnalytics.byTopic[topicId] = {
            attempts: 0,
            totalScore: 0,
            proficiency: 0
        };
    }
    const topicData = currentUser.performanceAnalytics.byTopic[topicId];
    topicData.attempts++;
    topicData.totalScore += scoreRatio;
    topicData.proficiency = topicData.totalScore / topicData.attempts;

    // By Operator
    if (!currentUser.performanceAnalytics.byOperator[exercise.operator]) {
        currentUser.performanceAnalytics.byOperator[exercise.operator] = {
            attempts: 0,
            totalScore: 0,
            proficiency: 0
        };
    }
    const operatorData = currentUser.performanceAnalytics.byOperator[exercise.operator];
    operatorData.attempts++;
    operatorData.totalScore += scoreRatio;
    operatorData.proficiency = operatorData.totalScore / operatorData.attempts;

    // By AFB
    if (!currentUser.performanceAnalytics.byAFB[exercise.afb]) {
        currentUser.performanceAnalytics.byAFB[exercise.afb] = {};
    }
    if (!currentUser.performanceAnalytics.byAFB[exercise.afb][topicId]) {
        currentUser.performanceAnalytics.byAFB[exercise.afb][topicId] = {
            attempts: 0,
            totalScore: 0,
            proficiency: 0
        };
    }
    const afbData = currentUser.performanceAnalytics.byAFB[exercise.afb][topicId];
    afbData.attempts++;
    afbData.totalScore += scoreRatio;
    afbData.proficiency = afbData.totalScore / afbData.attempts;
}

/**
 * Erkennt Schwächen basierend auf Performance Analytics
 */
function detectWeaknesses() {
    if (!currentUser || !currentUser.performanceAnalytics) return;

    const weaknessThreshold = 0.6; // <60% = Schwäche
    const newWeaknesses = [];

    // Check AFB-Levels
    Object.keys(currentUser.performanceAnalytics.byAFB).forEach(afb => {
        const topics = currentUser.performanceAnalytics.byAFB[afb];
        let totalAttempts = 0;
        let totalProficiency = 0;
        let count = 0;

        Object.values(topics).forEach(topicData => {
            if (topicData.attempts > 0) {
                totalAttempts += topicData.attempts;
                totalProficiency += topicData.proficiency;
                count++;
            }
        });

        if (count > 0 && totalAttempts >= 3) {
            const avgProficiency = totalProficiency / count;
            if (avgProficiency < weaknessThreshold) {
                // Prüfe ob Schwäche schon existiert
                const existing = currentUser.weaknesses.find(
                    w => w.type === 'afb' && w.identifier === afb
                );

                if (existing) {
                    newWeaknesses.push(existing);
                } else {
                    newWeaknesses.push({
                        type: 'afb',
                        identifier: afb,
                        name: `AFB ${afb}`,
                        score: avgProficiency,
                        severity: avgProficiency < 0.4 ? 'high' : 'medium',
                        practiceCount: 0,
                        recentScores: [],
                        improved: false,
                        detectedAt: new Date().toISOString()
                    });
                }
            }
        }
    });

    // Check Operators
    Object.keys(currentUser.performanceAnalytics.byOperator).forEach(operator => {
        const operatorData = currentUser.performanceAnalytics.byOperator[operator];

        if (operatorData.attempts >= 2 && operatorData.proficiency < weaknessThreshold) {
            const existing = currentUser.weaknesses.find(
                w => w.type === 'operator' && w.identifier === operator
            );

            if (existing) {
                newWeaknesses.push(existing);
            } else {
                newWeaknesses.push({
                    type: 'operator',
                    identifier: operator,
                    name: `Operator: ${operator}`,
                    score: operatorData.proficiency,
                    severity: operatorData.proficiency < 0.4 ? 'high' : 'medium',
                    practiceCount: 0,
                    recentScores: [],
                    improved: false,
                    detectedAt: new Date().toISOString()
                });
            }
        }
    });

    currentUser.weaknesses = newWeaknesses;
}

/**
 * Aktualisiert Weakness mit neuem Score und prüft Verbesserung
 * @param {Object} weakness - Die Schwäche
 * @param {number} scoreRatio - Score 0-1
 */
function updateWeaknessProgress(weakness, scoreRatio) {
    if (!weakness) return;

    weakness.practiceCount++;
    weakness.recentScores.push(scoreRatio);

    // Nur letzte 5 Scores behalten
    if (weakness.recentScores.length > 5) {
        weakness.recentScores = weakness.recentScores.slice(-5);
    }

    // Prüfe Verbesserung (3 consecutive >75%)
    if (weakness.recentScores.length >= 3) {
        const lastThree = weakness.recentScores.slice(-3);
        const allAbove75 = lastThree.every(score => score >= 0.75);

        if (allAbove75 && !weakness.improved) {
            weakness.improved = true;
            weakness.improvedAt = new Date().toISOString();

            // Celebration
            if (typeof celebrateWeaknessImprovement === 'function') {
                celebrateWeaknessImprovement(weakness);
            }
        }
    }
}

/**
 * Prüft consecutive perfekte Übungen für Achievement
 * @param {Object} user - Der User
 * @param {number} count - Anzahl consecutive
 * @returns {boolean}
 */
function checkConsecutivePerfect(user, count) {
    if (!user || !user.exerciseAttempts) return false;

    // Alle Attempts sammeln und sortieren
    const allAttempts = [];
    Object.keys(user.exerciseAttempts).forEach(exId => {
        user.exerciseAttempts[exId].forEach(attempt => {
            allAttempts.push(attempt);
        });
    });

    // Nach Timestamp sortieren
    allAttempts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Letzte N prüfen
    if (allAttempts.length < count) return false;

    const lastN = allAttempts.slice(0, count);
    return lastN.every(attempt => attempt.score === attempt.maxScore);
}

// ========================================
// PROFIL & AVATAR FUNKTIONEN
// ========================================

/**
 * Aktualisiert Anzeigenamen
 * @param {string} newDisplayName - Neuer Anzeigename
 */
function updateDisplayName(newDisplayName) {
    if (!currentUser) return false;

    if (!newDisplayName || newDisplayName.trim().length < 2) {
        showToast('Anzeigename muss mindestens 2 Zeichen lang sein!', 'error');
        return false;
    }

    if (newDisplayName.trim().length > 20) {
        showToast('Anzeigename darf maximal 20 Zeichen lang sein!', 'error');
        return false;
    }

    currentUser.displayName = newDisplayName.trim();

    updateUserProgress({ displayName: currentUser.displayName });

    showToast('Anzeigename aktualisiert!', 'success');

    // UI aktualisieren
    updateUserUI();

    return true;
}

/**
 * Gibt aktuellen Anzeigenamen zurück
 * @returns {string} Anzeigename oder Username als Fallback
 */
function getDisplayName() {
    if (!currentUser) return 'Gast';
    return currentUser.displayName || currentUser.username;
}

/**
 * Zeigt/versteckt ein Passwortfeld
 */
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

/**
 * Ändert das Passwort des eingeloggten Nutzers
 */
function changePassword() {
    if (!currentUser) return;

    const oldPwd = document.getElementById('oldPasswordInput').value;
    const newPwd = document.getElementById('newPasswordInput').value;
    const confirmPwd = document.getElementById('confirmPasswordInput').value;

    if (!oldPwd || !newPwd || !confirmPwd) {
        showToast('Bitte alle Felder ausfüllen!', 'error');
        return;
    }

    if (oldPwd !== currentUser.password) {
        showToast('Aktuelles Passwort ist falsch!', 'error');
        return;
    }

    if (newPwd !== confirmPwd) {
        showToast('Neue Passwörter stimmen nicht überein!', 'error');
        return;
    }

    if (newPwd.length < 4) {
        showToast('Passwort muss mindestens 4 Zeichen lang sein!', 'error');
        return;
    }

    // Passwort speichern
    currentUser.password = newPwd;
    const users = JSON.parse(localStorage.getItem('histolearn_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('histolearn_users', JSON.stringify(users));
    }

    // Felder leeren und Anzeige aktualisieren
    document.getElementById('oldPasswordInput').value = '';
    document.getElementById('newPasswordInput').value = '';
    document.getElementById('confirmPasswordInput').value = '';
    const display = document.getElementById('currentPasswordDisplay');
    if (display) display.value = newPwd;

    showToast('Passwort erfolgreich geändert! ✓', 'success');
}
