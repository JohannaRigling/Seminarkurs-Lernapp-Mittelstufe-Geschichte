// ===== ADAPTIVE LEARNING SYSTEM =====

// ========================================
// 1. SESSION MANAGEMENT
// ========================================

/**
 * Startet eine neue adaptive Lernsession
 * @param {string} goal - Das Lernziel des Schülers
 * @param {string} topicId - Die gewählte Themen-ID
 * @param {string} examDate - Optional: Prüfungsdatum
 */
function startLearningSession(goal, topicId, examDate = null) {
    if (!currentUser) {
        showToast('Bitte melde dich an!', 'error');
        return;
    }

    const session = {
        id: `session_${Date.now()}`,
        goal: goal,
        topicId: topicId,
        examDate: examDate,
        startedAt: new Date().toISOString(),
        phase: 'diagnostic', // 'diagnostic' | 'practice' | 'completed'
        diagnosticCompleted: false,
        diagnosticResults: null,
        exercisesDone: [],
        overallScore: 0
    };

    // Session als current setzen
    if (!currentUser.progress.learningSessions) {
        currentUser.progress.learningSessions = {
            current: null,
            history: []
        };
    }

    currentUser.progress.learningSessions.current = session;
    updateUserProgress({ learningSessions: currentUser.progress.learningSessions });

    addActivity('learning', `Lernsession gestartet: ${goal.substring(0, 50)}...`);

    return session.id;
}

/**
 * Beendet die aktuelle Lernsession
 */
function endLearningSession() {
    if (!currentUser || !currentUser.progress.learningSessions?.current) {
        return;
    }

    const session = currentUser.progress.learningSessions.current;
    session.endedAt = new Date().toISOString();
    session.phase = 'completed';

    // Durchschnittlichen Score berechnen
    if (session.exercisesDone.length > 0) {
        const totalScore = session.exercisesDone.reduce((sum, exId) => {
            const attempts = currentUser.exerciseAttempts[exId] || [];
            if (attempts.length > 0) {
                const lastAttempt = attempts[attempts.length - 1];
                return sum + (lastAttempt.score / lastAttempt.maxScore);
            }
            return sum;
        }, 0);
        session.overallScore = totalScore / session.exercisesDone.length;
    }

    // Zu History verschieben
    currentUser.progress.learningSessions.history.unshift(session);
    currentUser.progress.learningSessions.current = null;

    // Nur letzte 20 Sessions behalten
    if (currentUser.progress.learningSessions.history.length > 20) {
        currentUser.progress.learningSessions.history =
            currentUser.progress.learningSessions.history.slice(0, 20);
    }

    updateUserProgress({ learningSessions: currentUser.progress.learningSessions });
    addActivity('learning', 'Lernsession beendet');

    // Achievement prüfen
    if (session.overallScore >= 0.8) {
        checkAchievements(); // Prüft "goal-achiever"
    }
}

// ========================================
// 2. DIAGNOSTIC SYSTEM
// ========================================

/**
 * Wählt 10 diagnostische Übungen stratifiziert aus
 * @param {string} topicId - Die Themen-ID
 * @returns {Array} Array mit 10 Exercise-Objekten
 */
function selectDiagnosticExercises(topicId) {
    const allExercises = getAllExercisesForTopic(topicId);

    if (!allExercises || allExercises.length === 0) {
        showToast('Keine Übungen für dieses Thema gefunden!', 'error');
        return [];
    }

    // Nach AFB filtern
    const afb1 = allExercises.filter(e => e.afb === 1);
    const afb2 = allExercises.filter(e => e.afb === 2);
    const afb3 = allExercises.filter(e => e.afb === 3);

    // Stratifizierte Auswahl: 3 AFB I + 4 AFB II + 3 AFB III
    const selected = [
        ...selectRandomExercises(afb1, 3),
        ...selectRandomExercises(afb2, 4),
        ...selectRandomExercises(afb3, 3)
    ];

    // Falls nicht genug Übungen: auffüllen
    while (selected.length < 10 && allExercises.length > selected.length) {
        const remaining = allExercises.filter(e =>
            !selected.find(s => s.id === e.id)
        );
        if (remaining.length > 0) {
            selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
        } else {
            break;
        }
    }

    return selected;
}

/**
 * Analysiert die Ergebnisse der Diagnose-Phase
 * @param {Array} exerciseIds - IDs der diagnostischen Übungen
 * @returns {Object} Analyse-Ergebnis
 */
function analyzeDiagnosticResults(exerciseIds) {
    if (!currentUser || !currentUser.exerciseAttempts) {
        return null;
    }

    const scoresByAFB = { 1: [], 2: [], 3: [] };
    const scoresByOperator = {};
    const allScores = [];

    exerciseIds.forEach(exId => {
        const exercise = getExerciseById(exId);
        if (!exercise) return;

        const attempts = currentUser.exerciseAttempts[exId] || [];
        if (attempts.length === 0) return;

        const lastAttempt = attempts[attempts.length - 1];
        const scoreRatio = lastAttempt.score / lastAttempt.maxScore;

        allScores.push(scoreRatio);
        scoresByAFB[exercise.afb].push(scoreRatio);

        if (!scoresByOperator[exercise.operator]) {
            scoresByOperator[exercise.operator] = [];
        }
        scoresByOperator[exercise.operator].push(scoreRatio);
    });

    // Durchschnittliche Scores berechnen
    const avgByAFB = {};
    Object.keys(scoresByAFB).forEach(afb => {
        const scores = scoresByAFB[afb];
        avgByAFB[afb] = scores.length > 0
            ? scores.reduce((a, b) => a + b, 0) / scores.length
            : 0;
    });

    const avgByOperator = {};
    Object.keys(scoresByOperator).forEach(op => {
        const scores = scoresByOperator[op];
        avgByOperator[op] = scores.reduce((a, b) => a + b, 0) / scores.length;
    });

    const overallScore = allScores.length > 0
        ? allScores.reduce((a, b) => a + b, 0) / allScores.length
        : 0;

    // Schwächen identifizieren (<60%)
    const weaknesses = [];

    Object.keys(avgByAFB).forEach(afb => {
        if (avgByAFB[afb] < 0.6) {
            weaknesses.push({
                type: 'afb',
                identifier: afb,
                name: `AFB ${afb}`,
                score: avgByAFB[afb],
                severity: avgByAFB[afb] < 0.4 ? 'high' : 'medium',
                practiceCount: 0,
                recentScores: [],
                improved: false,
                detectedAt: new Date().toISOString()
            });
        }
    });

    Object.keys(avgByOperator).forEach(op => {
        if (avgByOperator[op] < 0.6) {
            weaknesses.push({
                type: 'operator',
                identifier: op,
                name: `Operator: ${op}`,
                score: avgByOperator[op],
                severity: avgByOperator[op] < 0.4 ? 'high' : 'medium',
                practiceCount: 0,
                recentScores: [],
                improved: false,
                detectedAt: new Date().toISOString()
            });
        }
    });

    // Stärken identifizieren (>75%)
    const strengths = [];
    Object.keys(avgByAFB).forEach(afb => {
        if (avgByAFB[afb] >= 0.75) {
            strengths.push({
                name: `AFB ${afb}`,
                score: avgByAFB[afb]
            });
        }
    });

    Object.keys(avgByOperator).forEach(op => {
        if (avgByOperator[op] >= 0.75) {
            strengths.push({
                name: `Operator: ${op}`,
                score: avgByOperator[op]
            });
        }
    });

    return {
        overallScore,
        byAFB: avgByAFB,
        byOperator: avgByOperator,
        weaknesses,
        strengths
    };
}

// ========================================
// 3. ADAPTIVE SELECTION
// ========================================

/**
 * Wählt die nächste adaptive Übung basierend auf Schwächen
 * @param {string} sessionId - Die Session-ID
 * @returns {Object} Die nächste Übung oder null
 */
function selectNextExercise(sessionId) {
    if (!currentUser || !currentUser.progress.weaknesses ||
        currentUser.progress.weaknesses.length === 0) {
        return null;
    }

    const session = currentUser.progress.learningSessions.current;
    if (!session || session.id !== sessionId) {
        return null;
    }

    // Schwächen nach Severity sortieren
    const weaknesses = [...currentUser.progress.weaknesses]
        .filter(w => !w.improved)
        .sort((a, b) => {
            if (a.severity === 'high' && b.severity !== 'high') return -1;
            if (a.severity !== 'high' && b.severity === 'high') return 1;
            return a.practiceCount - b.practiceCount; // Weniger geübt zuerst
        });

    if (weaknesses.length === 0) {
        return selectReinforcementExercise(session);
    }

    // Weighted Selection: 60% high, 30% medium, 10% reinforcement
    const random = Math.random();
    let targetWeakness;

    if (random < 0.6) {
        // High severity
        const highWeaknesses = weaknesses.filter(w => w.severity === 'high');
        targetWeakness = highWeaknesses.length > 0
            ? highWeaknesses[0]
            : weaknesses[0];
    } else if (random < 0.9) {
        // Medium severity
        const mediumWeaknesses = weaknesses.filter(w => w.severity === 'medium');
        targetWeakness = mediumWeaknesses.length > 0
            ? mediumWeaknesses[0]
            : weaknesses[0];
    } else {
        // Reinforcement
        return selectReinforcementExercise(session);
    }

    // Übungen für diese Schwäche finden
    const exercises = getExercisesForWeakness(targetWeakness, session.topicId);

    // Filtern: Nicht kürzlich gemacht (Spaced Repetition)
    const availableExercises = exercises.filter(e =>
        !wasAttemptedRecently(e.id, 5)
    );

    if (availableExercises.length === 0) {
        // Falls alle kürzlich gemacht: nimm älteste
        return exercises.length > 0 ? exercises[0] : null;
    }

    // Zufällige Auswahl aus verfügbaren
    return availableExercises[Math.floor(Math.random() * availableExercises.length)];
}

/**
 * Wählt eine Reinforcement-Übung (Stärken wiederholen)
 */
function selectReinforcementExercise(session) {
    const allExercises = getAllExercisesForTopic(session.topicId);
    const availableExercises = allExercises.filter(e =>
        !wasAttemptedRecently(e.id, 5)
    );

    if (availableExercises.length === 0) {
        return allExercises.length > 0
            ? allExercises[Math.floor(Math.random() * allExercises.length)]
            : null;
    }

    return availableExercises[Math.floor(Math.random() * availableExercises.length)];
}

/**
 * Findet Übungen für eine spezifische Schwäche
 * @param {Object} weakness - Die Schwäche
 * @param {string} topicId - Themen-ID
 * @returns {Array} Passende Übungen
 */
function getExercisesForWeakness(weakness, topicId) {
    const allExercises = getAllExercisesForTopic(topicId);

    if (weakness.type === 'afb') {
        return allExercises.filter(e => e.afb === parseInt(weakness.identifier));
    } else if (weakness.type === 'operator') {
        return allExercises.filter(e => e.operator === weakness.identifier);
    } else if (weakness.type === 'topic') {
        return allExercises; // Alle Übungen des Topics
    }

    return [];
}

/**
 * Prüft ob eine Übung kürzlich gemacht wurde
 * @param {string} exerciseId - Die Exercise-ID
 * @param {number} count - Anzahl der letzten Versuche
 * @returns {boolean}
 */
function wasAttemptedRecently(exerciseId, count = 5) {
    if (!currentUser || !currentUser.exerciseAttempts) {
        return false;
    }

    // Alle Attempts sammeln und sortieren
    const allAttempts = [];
    Object.keys(currentUser.exerciseAttempts).forEach(exId => {
        currentUser.exerciseAttempts[exId].forEach(attempt => {
            allAttempts.push({ ...attempt, exerciseId: exId });
        });
    });

    // Nach Timestamp sortieren (neueste zuerst)
    allAttempts.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    // Letzte N Übungen prüfen
    const recentExercises = allAttempts.slice(0, count).map(a => a.exerciseId);
    return recentExercises.includes(exerciseId);
}

/**
 * Prüft ob eine Schwäche verbessert wurde
 * @param {Object} weakness - Die zu prüfende Schwäche
 * @returns {boolean}
 */
function checkWeaknessImprovement(weakness) {
    if (weakness.recentScores.length < 3) {
        return false;
    }

    // Letzte 3 Scores prüfen
    const lastThree = weakness.recentScores.slice(-3);
    const allAbove75 = lastThree.every(score => score >= 0.75);

    if (allAbove75 && !weakness.improved) {
        weakness.improved = true;
        weakness.improvedAt = new Date().toISOString();

        // Celebration!
        if (typeof celebrateWeaknessImprovement === 'function') {
            celebrateWeaknessImprovement(weakness);
        }

        return true;
    }

    return false;
}

// ========================================
// 4. HELPER FUNCTIONS
// ========================================

/**
 * Gibt alle Übungen für ein Topic zurück
 * @param {string} topicId - Die Themen-ID
 * @returns {Array} Alle Übungen
 */
function getAllExercisesForTopic(topicId) {
    // Prüfe verschiedene Exercise-Objekte
    const sources = [
        TOPIC_EXERCISES_FINAL,
        TOPIC_EXERCISES_COMPLETE,
        TOPIC_EXERCISES,
        TOPIC_EXERCISES_PART2,
        TOPIC_EXERCISES_PART3
    ];

    for (const source of sources) {
        if (source && source[topicId]) {
            return source[topicId];
        }
    }

    return [];
}

/**
 * Findet eine Übung anhand ihrer ID
 * @param {string} exerciseId - Die Exercise-ID
 * @returns {Object|null} Die Übung oder null
 */
function getExerciseById(exerciseId) {
    const sources = [
        TOPIC_EXERCISES_FINAL,
        TOPIC_EXERCISES_COMPLETE,
        TOPIC_EXERCISES,
        TOPIC_EXERCISES_PART2,
        TOPIC_EXERCISES_PART3
    ];

    for (const source of sources) {
        if (source) {
            for (const topicId of Object.keys(source)) {
                const exercise = source[topicId].find(e => e.id === exerciseId);
                if (exercise) {
                    return { ...exercise, topicId }; // Topic-ID hinzufügen
                }
            }
        }
    }

    return null;
}

/**
 * Wählt N zufällige Übungen aus einem Array
 * @param {Array} exercises - Array von Übungen
 * @param {number} count - Anzahl zu wählen
 * @returns {Array} Zufällig gewählte Übungen
 */
function selectRandomExercises(exercises, count) {
    if (!exercises || exercises.length === 0) {
        return [];
    }

    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Formatiert Weakness-Name für UI
 * @param {Object} weakness - Die Schwäche
 * @returns {string} Formatierter Name
 */
function getWeaknessName(weakness) {
    if (weakness.type === 'afb') {
        return `AFB ${weakness.identifier} (Anforderungsbereich ${weakness.identifier})`;
    } else if (weakness.type === 'operator') {
        const operator = OPERATORS.afb1.concat(OPERATORS.afb2, OPERATORS.afb3)
            .find(o => o.id === weakness.identifier);
        return operator ? operator.name : weakness.identifier;
    } else if (weakness.type === 'topic') {
        return weakness.name;
    }
    return weakness.name || 'Unbekannt';
}

/**
 * Berechnet Fortschritt einer Schwäche (0-100%)
 * @param {Object} weakness - Die Schwäche
 * @returns {number} Prozent (0-100)
 */
function calculateWeaknessProgress(weakness) {
    if (weakness.improved) {
        return 100;
    }

    // Basiert auf practiceCount und recentScores
    const practiceProgress = Math.min(weakness.practiceCount * 10, 50); // Max 50%

    let scoreProgress = 0;
    if (weakness.recentScores.length > 0) {
        const avgRecent = weakness.recentScores.reduce((a, b) => a + b, 0)
            / weakness.recentScores.length;
        scoreProgress = avgRecent * 50; // Max 50%
    }

    return Math.min(Math.round(practiceProgress + scoreProgress), 100);
}

/**
 * Gibt Anzahl der Übungen in einer Session zurück
 * @param {string} sessionId - Die Session-ID
 * @returns {number} Anzahl
 */
function getSessionExerciseCount(sessionId) {
    if (!currentUser) return 0;

    const session = currentUser.progress.learningSessions.current?.id === sessionId
        ? currentUser.progress.learningSessions.current
        : currentUser.progress.learningSessions.history.find(s => s.id === sessionId);

    return session ? session.exercisesDone.length : 0;
}

/**
 * Berechnet durchschnittlichen Score einer Session
 * @param {string} sessionId - Die Session-ID
 * @returns {number} Score (0-1)
 */
function getSessionAverageScore(sessionId) {
    if (!currentUser) return 0;

    const session = currentUser.progress.learningSessions.current?.id === sessionId
        ? currentUser.progress.learningSessions.current
        : currentUser.progress.learningSessions.history.find(s => s.id === sessionId);

    if (!session || session.exercisesDone.length === 0) {
        return 0;
    }

    const totalScore = session.exercisesDone.reduce((sum, exId) => {
        const attempts = currentUser.exerciseAttempts[exId] || [];
        if (attempts.length > 0) {
            const lastAttempt = attempts[attempts.length - 1];
            return sum + (lastAttempt.score / lastAttempt.maxScore);
        }
        return sum;
    }, 0);

    return totalScore / session.exercisesDone.length;
}

/**
 * Gibt verfügbare Topics zurück
 * @returns {Array} Topic-Objekte mit id und name
 */
function getAvailableTopics() {
    const topics = [
        { id: 'franzoesische-revolution', name: 'Französische Revolution' },
        { id: 'industrialisierung', name: 'Industrialisierung' },
        { id: 'imperialismus', name: 'Imperialismus' },
        { id: 'erster-weltkrieg', name: 'Erster Weltkrieg' },
        { id: 'weimarer-republik', name: 'Weimarer Republik' },
        { id: 'nationalsozialismus', name: 'Nationalsozialismus' },
        { id: 'brd-ddr', name: 'BRD & DDR' },
        { id: 'kalter-krieg', name: 'Kalter Krieg' },
        { id: 'wiedervereinigung', name: 'Deutsche Wiedervereinigung' },
        { id: 'russland', name: 'Russland' },
        { id: 'china', name: 'China' },
        { id: 'tuerkei', name: 'Osmanisches Reich & Türkei' },
        { id: 'eu', name: 'Europäische Union' }
    ];

    return topics;
}

/**
 * Gibt Topic-Namen für ID zurück
 * @param {string} topicId - Die Topic-ID
 * @returns {string} Topic-Name
 */
function getTopicName(topicId) {
    const topic = getAvailableTopics().find(t => t.id === topicId);
    return topic ? topic.name : topicId;
}

/**
 * Formatiert Datum
 * @param {string} isoDate - ISO-Datum-String
 * @returns {string} Formatiertes Datum
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
