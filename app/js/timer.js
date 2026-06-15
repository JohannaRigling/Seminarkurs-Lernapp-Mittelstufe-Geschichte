// ===== POMODORO TIMER =====

let timerInterval = null;
let timerSeconds = 20 * 60;
let timerRunning = false;
let isBreak = false;
let pomodoroCount = 0;
let breakOverlayInterval = null;

let WORK_TIME = 20 * 60; // wird bei Einstellungsänderung aktualisiert

function getBreakTime() {
    return Math.round(WORK_TIME / 4);
}

// Timer starten
function startTimer() {
    if (timerRunning) return;

    timerRunning = true;
    // Globale Lernzeit-Flagge: nur während aktiver Lernphase TRUE (nicht in der Pause)
    window.isStudyActive = !isBreak;
    document.getElementById('timerStartBtn').style.display = 'none';
    document.getElementById('timerPauseBtn').style.display = 'inline-block';

    // Wenn der User gerade auf der Burg ist: automatisch zum Dashboard wechseln
    // (Burg ist während aktiver Lernzeit gesperrt — Wechsel direkt zur Lernumgebung)
    if (!isBreak) {
        const castle = document.getElementById('castle');
        if (castle && castle.classList.contains('active') && typeof window.showSection === 'function') {
            try { window.showSection('dashboard'); } catch (e) { /* still */ }
        }
    }

    updateTimerStatus();

    timerInterval = setInterval(() => {
        timerSeconds--;

        if (timerSeconds <= 0) {
            timerComplete();
        }

        updateTimerDisplay();
        updateTimerProgress();

        // Jede Minute Lernzeit aktualisieren (nur wenn kein Break)
        if (!isBreak && timerSeconds % 60 === 0) {
            updateLearningTime();
        }
    }, 1000);
}

// Timer pausieren
function pauseTimer() {
    if (!timerRunning) return;

    timerRunning = false;
    window.isStudyActive = false;
    clearInterval(timerInterval);

    document.getElementById('timerStartBtn').style.display = 'inline-block';
    document.getElementById('timerPauseBtn').style.display = 'none';
    document.getElementById('skipBreakBtn').style.display = 'none';

    document.getElementById('timerStatus').textContent = '⏸️ Timer pausiert';
}

// Timer zurücksetzen
function resetTimer() {
    pauseTimer();
    isBreak = false;
    timerSeconds = WORK_TIME;
    updateTimerDisplay();
    updateTimerProgress();
    updateTimerStatus();
}

// Pause überspringen (nur noch für manuelle Fälle, Overlay hat eigene Buttons)
function skipBreak() {
    if (!isBreak) return;
    pauseTimer();
    isBreak = false;
    timerSeconds = WORK_TIME;
    updateTimerDisplay();
    updateTimerProgress();
    updateTimerStatus();
    document.getElementById('skipBreakBtn').style.display = 'none';
    showToast('Pause übersprungen. Weiter geht\'s!', 'info');
}

// Timer abgeschlossen
function timerComplete() {
    pauseTimer();

    const preferences = currentUser?.preferences || {};
    if (preferences.pomodoroSound !== false) {
        playTimerSound();
    }

    // Lernzeit vorbei → Break-Overlay zeigen
    pomodoroCount++;
    isBreak = true;

    addCoins(10, 'Pomodoro abgeschlossen');
    addXP(20);
    addActivity('timer', 'Pomodoro abgeschlossen');

    if (pomodoroCount % 4 === 0) {
        addCoins(15, 'Bonus: 4 Pomodoros geschafft!');
    }

    showBreakOverlay();
}

// Break-Overlay anzeigen und Countdown starten
function showBreakOverlay() {
    const overlay = document.getElementById('breakOverlay');
    const countdownEl = document.getElementById('breakOverlayCountdown');
    const actionsEl = document.getElementById('breakOverlayActions');
    const titleEl = document.getElementById('breakOverlayTitle');
    const msgEl = document.getElementById('breakOverlayMessage');

    if (!overlay) return;

    let breakSeconds = getBreakTime();

    titleEl.textContent = '☕ Pause!';
    msgEl.textContent = 'Gönn dir eine Auszeit! Du kannst die Burg, den Zeitstrahl, Lernhilfen und Einstellungen nutzen.';
    countdownEl.textContent = formatTimerTime(breakSeconds);
    countdownEl.style.display = 'block';
    actionsEl.style.display = 'none';
    overlay.style.display = 'flex';
    window.isBreakActive = true;
    // Burg darf in der Pause weiter genutzt werden — also keine aktive Lernzeit
    window.isStudyActive = false;

    breakOverlayInterval = setInterval(() => {
        breakSeconds--;
        countdownEl.textContent = formatTimerTime(breakSeconds);

        if (breakSeconds <= 0) {
            clearInterval(breakOverlayInterval);
            breakOverlayInterval = null;

            // Pause vorbei → Buttons zeigen
            titleEl.textContent = '✅ Pause vorbei!';
            msgEl.textContent = 'Möchtest du weitermachen?';
            countdownEl.style.display = 'none';
            actionsEl.style.display = 'flex';

            if ((currentUser?.preferences || {}).pomodoroSound !== false) {
                playTimerSound();
            }
        }
    }, 1000);
}

// Overlay verstecken
function hideBreakOverlay() {
    const overlay = document.getElementById('breakOverlay');
    if (overlay) overlay.style.display = 'none';
    window.isBreakActive = false;

    if (breakOverlayInterval) {
        clearInterval(breakOverlayInterval);
        breakOverlayInterval = null;
    }

    // Countdown-Element zurücksetzen für nächste Runde
    const countdownEl = document.getElementById('breakOverlayCountdown');
    if (countdownEl) countdownEl.style.display = 'block';

    isBreak = false;
}

// "Weiterlernen" geklickt → Overlay weg, Timer neu starten
function continuePomodoro() {
    hideBreakOverlay();
    timerSeconds = WORK_TIME;
    updateTimerDisplay();
    updateTimerProgress();
    updateTimerStatus();
    startTimer();
    showToast('📚 Auf geht\'s! Viel Erfolg beim Lernen!', 'success');
}

// "Fertig" geklickt → Overlay weg, Timer komplett zurücksetzen
function finishPomodoro() {
    hideBreakOverlay();
    pomodoroCount = 0;
    timerSeconds = WORK_TIME;
    updateTimerDisplay();
    updateTimerProgress();
    updateTimerStatus();
    showToast('🎉 Super gemacht! Bis zum nächsten Mal!', 'success');
}

// Timer-Anzeige aktualisieren
function updateTimerDisplay() {
    document.getElementById('timerDisplay').textContent = formatTimerTime(timerSeconds);
}

// Hilfsfunktion: Sekunden → MM:SS
function formatTimerTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Timer-Fortschrittsbalken aktualisieren
function updateTimerProgress() {
    const totalTime = isBreak ? getBreakTime() : WORK_TIME;
    const elapsed = totalTime - timerSeconds;
    const progress = Math.min(100, (elapsed / totalTime) * 100);
    document.getElementById('timerProgressBar').style.width = `${progress}%`;
}

// Timer-Status aktualisieren
function updateTimerStatus() {
    const status = document.getElementById('timerStatus');
    if (!timerRunning) {
        status.textContent = '⏸️ Timer pausiert';
    } else if (isBreak) {
        status.textContent = '☕ Pause';
    } else {
        status.textContent = '📚 Lernzeit';
    }
}

// Lernzeit aktualisieren
function updateLearningTime() {
    if (!currentUser) return;

    // Midnight reset check: if day has shifted, reset todayMinutes to 0
    const today = new Date().toDateString();
    const lastActive = currentUser.progress.lastActive ? new Date(currentUser.progress.lastActive).toDateString() : null;
    if (lastActive && lastActive !== today) {
        currentUser.progress.todayMinutes = 0;
        updateUserProgress({
            todayMinutes: 0,
            lastActive: new Date().toISOString()
        });
    }

    currentUser.progress.todayMinutes++;
    currentUser.progress.totalMinutes++;

    updateUserProgress({
        todayMinutes: currentUser.progress.todayMinutes,
        totalMinutes: currentUser.progress.totalMinutes,
        lastActive: new Date().toISOString()
    });

    if (currentUser.progress.todayMinutes === 60) {
        addCoins(25, '1 Stunde heute gelernt!');
        showToast('🎉 Eine Stunde gelernt! 25 Bonus-Münzen!', 'success');
    }
}

// Pomodoro-Einstellungen aktualisieren (Pausenzeit = immer 1/4 der Lernzeit)
function updatePomodoroSettings() {
    const workTime = parseInt(document.getElementById('pomodoroWork')?.value) || 20;
    const sound = document.getElementById('pomodoroSound')?.checked ?? true;

    WORK_TIME = workTime * 60;

    if (currentUser) {
        updateUserPreferences({
            pomodoroWork: workTime,
            pomodoroSound: sound
        });
    }

    // Timer zurücksetzen mit neuen Werten (nur wenn nicht läuft)
    if (!timerRunning && !isBreak) {
        timerSeconds = WORK_TIME;
        updateTimerDisplay();
        updateTimerProgress();
    }

    updateBreakTimeDisplay();
}

// Pausenzeit-Anzeige in den Einstellungen aktualisieren
function updateBreakTimeDisplay() {
    const workTime = parseInt(document.getElementById('pomodoroWork')?.value) || 20;
    const breakTime = Math.round(workTime / 4);
    const display = document.getElementById('breakTimeDisplay');
    if (display) display.textContent = `${breakTime} Min. = 1/4 der Lernzeit`;
}

// Timer-Sound abspielen
function playTimerSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);

        setTimeout(() => {
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            osc2.frequency.value = 1000;
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            osc2.start(audioContext.currentTime);
            osc2.stop(audioContext.currentTime + 0.5);
        }, 200);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Chat-Zeit tracken
let chatStartTime = null;
let chatTimeInterval = null;

function startChatTimer() {
    if (chatStartTime) return;
    chatStartTime = Date.now();
    updateChatTime();
    chatTimeInterval = setInterval(updateChatTime, 1000);
}

function stopChatTimer() {
    if (chatTimeInterval) {
        clearInterval(chatTimeInterval);
        chatTimeInterval = null;
    }
    chatStartTime = null;
}

function updateChatTime() {
    if (!chatStartTime) return;
    const elapsed = Math.floor((Date.now() - chatStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const chatTimeEl = document.getElementById('chatTime');
    if (chatTimeEl) chatTimeEl.textContent = display;
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    updateTimerDisplay();
    updateTimerProgress();
    updateBreakTimeDisplay();
});
