// ===== POMODORO TIMER =====

let timerInterval = null;
let timerSeconds = 20 * 60; // 20 Minuten
let timerRunning = false;
let isBreak = false;
let pomodoroCount = 0;

const WORK_TIME = 20 * 60; // 20 Minuten
const BREAK_TIME = 5 * 60; // 5 Minuten

// Timer starten
function startTimer() {
    if (timerRunning) return;

    timerRunning = true;
    document.getElementById('timerStartBtn').style.display = 'none';
    document.getElementById('timerPauseBtn').style.display = 'inline-block';

    if (isBreak) {
        document.getElementById('skipBreakBtn').style.display = 'inline-block';
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

// Pause überspringen
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

    if (isBreak) {
        // Pause vorbei -> Arbeitszeit
        isBreak = false;
        timerSeconds = WORK_TIME;
        showToast('☕ Pause vorbei! Bereit für die nächste Lerneinheit?', 'info');
    } else {
        // Arbeitszeit vorbei -> Pause + Belohnung
        pomodoroCount++;
        isBreak = true;
        timerSeconds = BREAK_TIME;

        // Münzen für 20 Minuten lernen
        addCoins(10, '20 Minuten gelernt');
        addXP(20);
        addActivity('timer', 'Pomodoro abgeschlossen');

        // Nach 4 Pomodoros extra Bonus
        if (pomodoroCount % 4 === 0) {
            addCoins(15, 'Bonus: 4 Pomodoros geschafft!');
            showToast('🎉 Super! 4 Pomodoros geschafft! Gönn dir eine längere Pause!', 'success');
        } else {
            showToast('🍅 Pomodoro geschafft! Zeit für eine kurze Pause.', 'success');
        }

        document.getElementById('skipBreakBtn').style.display = 'inline-block';
    }

    updateTimerDisplay();
    updateTimerProgress();
    updateTimerStatus();
}

// Timer-Anzeige aktualisieren
function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById('timerDisplay').textContent = display;
}

// Timer-Fortschrittsbalken aktualisieren
function updateTimerProgress() {
    const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
    const progress = ((totalTime - timerSeconds) / totalTime) * 100;

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

    currentUser.progress.todayMinutes++;
    currentUser.progress.totalMinutes++;

    updateUserProgress({
        todayMinutes: currentUser.progress.todayMinutes,
        totalMinutes: currentUser.progress.totalMinutes
    });

    // 1 Stunde gelernt = 25 Münzen Bonus
    if (currentUser.progress.todayMinutes === 60) {
        addCoins(25, '1 Stunde heute gelernt!');
        showToast('🎉 Eine Stunde gelernt! 25 Bonus-Münzen!', 'success');
    }
}

// Timer-Sound abspielen
function playTimerSound() {
    // Einfacher Beep mit Web Audio API
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

        // Zweiter Beep
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

// Pomodoro-Einstellungen aktualisieren
function updatePomodoroSettings() {
    const workTime = parseInt(document.getElementById('pomodoroWork')?.value) || 20;
    const breakTime = parseInt(document.getElementById('pomodoroBreak')?.value) || 5;
    const sound = document.getElementById('pomodoroSound')?.checked ?? true;

    if (currentUser) {
        updateUserPreferences({
            pomodoroWork: workTime,
            pomodoroBreak: breakTime,
            pomodoroSound: sound
        });
    }

    // Timer zurücksetzen mit neuen Werten
    if (!timerRunning) {
        timerSeconds = workTime * 60;
        updateTimerDisplay();
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
    if (chatTimeEl) {
        chatTimeEl.textContent = display;
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    updateTimerDisplay();
    updateTimerProgress();
});
