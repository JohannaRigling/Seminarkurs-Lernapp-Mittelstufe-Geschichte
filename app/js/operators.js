// ===== OPERATOREN SYSTEM =====

let currentAFB = 1;
let selectedOperator = null;
let viewedOperators = new Set();

// Operatoren für AFB laden
function loadOperators(afb) {
    currentAFB = afb;

    // Tabs aktualisieren
    document.querySelectorAll('.afb-tab').forEach((tab, index) => {
        tab.classList.toggle('active', index + 1 === afb);
    });

    const operatorsList = document.getElementById('operatorsList');
    if (!operatorsList) return;

    const operators = OPERATORS[`afb${afb}`];

    operatorsList.innerHTML = operators.map(op => `
        <button class="operator-item" data-id="${op.id}" onclick="showOperatorDetail('${op.id}')">
            ${op.name}
        </button>
    `).join('');
}

// AFB wechseln
function showAFB(afb) {
    loadOperators(afb);

    // Erstes Operator-Detail anzeigen
    const operators = OPERATORS[`afb${afb}`];
    if (operators && operators.length > 0) {
        showOperatorDetail(operators[0].id);
    }
}

// Operator-Detail anzeigen
function showOperatorDetail(operatorId) {
    // Alle Operatoren durchsuchen
    let operator = null;

    for (const afb of ['afb1', 'afb2', 'afb3']) {
        const found = OPERATORS[afb].find(op => op.id === operatorId);
        if (found) {
            operator = found;
            break;
        }
    }

    if (!operator) return;

    selectedOperator = operator;

    // Liste aktualisieren
    document.querySelectorAll('.operator-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === operatorId);
    });

    // Detail anzeigen
    document.getElementById('operatorName').textContent = operator.name;

    const afbBadge = document.getElementById('operatorAFB');
    afbBadge.textContent = `AFB ${operator.afb}`;
    afbBadge.className = `afb-badge afb${operator.afb}`;

    document.getElementById('operatorDefinition').textContent = operator.definition;
    document.getElementById('operatorExpectation').textContent = operator.expectation;
    document.getElementById('operatorExample').textContent = operator.example;

    document.getElementById('operatorTips').innerHTML = operator.tips.map(tip =>
        `<li>${tip}</li>`
    ).join('');

    document.getElementById('operatorMistakes').innerHTML = operator.mistakes.map(mistake =>
        `<li>${mistake}</li>`
    ).join('');

    // Als angesehen markieren
    if (!viewedOperators.has(operatorId)) {
        viewedOperators.add(operatorId);

        if (currentUser) {
            currentUser.progress.operatorsViewed = viewedOperators.size;
            updateUserProgress({ operatorsViewed: viewedOperators.size });
        }
    }
}

// Operator-Übung starten
function startOperatorExercise() {
    if (!selectedOperator) {
        showToast('Bitte wähle zuerst einen Operator aus.', 'warning');
        return;
    }

    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    // Übungsaufgabe basierend auf Operator generieren
    const exercise = generateOperatorExercise(selectedOperator);

    content.innerHTML = `
        <h2>📝 Übung: ${selectedOperator.name}</h2>
        <div class="afb-badge afb${selectedOperator.afb}" style="display: inline-block; margin-bottom: 20px;">AFB ${selectedOperator.afb}</div>

        <div class="exercise-task">
            <h4>Aufgabe:</h4>
            <p>${exercise.task}</p>
        </div>

        <div class="exercise-material" style="background: var(--bg-tertiary); padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4>📄 Material:</h4>
            <p style="font-style: italic; line-height: 1.8;">${exercise.material}</p>
            <p style="font-size: 0.9em; color: var(--text-secondary); margin-top: 10px;">Quelle: ${exercise.source}</p>
        </div>

        <div class="exercise-input">
            <h4>Deine Antwort:</h4>
            <textarea id="exerciseAnswer" rows="10" style="width: 100%; padding: 15px; border: 2px solid var(--border-color); border-radius: 10px; font-size: 1em; resize: vertical;" placeholder="Schreibe hier deine Antwort..."></textarea>
        </div>

        <div class="exercise-help" style="margin-top: 20px;">
            <button class="btn btn-secondary" onclick="showOperatorHelp()">💡 Tipps anzeigen</button>
            <button class="btn btn-secondary" onclick="showSampleAnswer()">📋 Musterantwort</button>
        </div>

        <div id="exerciseHelp" style="display: none; margin-top: 15px; padding: 15px; background: #e3f2fd; border-radius: 10px;">
            <h4>💡 Tipps für "${selectedOperator.name}":</h4>
            <ul>
                ${selectedOperator.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>

        <div id="sampleAnswer" style="display: none; margin-top: 15px; padding: 15px; background: #e8f5e9; border-radius: 10px;">
            <h4>📋 Musterantwort:</h4>
            <p>${exercise.sampleAnswer}</p>
        </div>

        <div style="margin-top: 30px; display: flex; gap: 15px; justify-content: center;">
            <button class="btn btn-primary" onclick="submitExercise()">✓ Abschicken & Bewerten</button>
            <button class="btn btn-secondary" onclick="closeExerciseModal()">Abbrechen</button>
        </div>
    `;

    modal.classList.add('active');
}

// Operator-Übung generieren
function generateOperatorExercise(operator) {
    const exercises = {
        'nennen': {
            task: 'Nennen Sie drei Ursachen für den Ausbruch der Französischen Revolution.',
            material: 'Die Französische Revolution von 1789 hatte vielfältige Ursachen. Die Staatsfinanzen waren zerrüttet, der Hof in Versailles verschwendete Unsummen, während die Bevölkerung unter hohen Steuern litt. Der Dritte Stand, der 98% der Bevölkerung ausmachte, hatte keine politische Mitsprache. Zudem verbreiteten sich die Ideen der Aufklärung über Freiheit und Gleichheit. Missernten führten zu Hungersnöten und steigenden Brotpreisen.',
            source: 'Schulbuch Geschichte, Kapitel "Französische Revolution"',
            sampleAnswer: '1. Finanzielle Krise des Staates und hohe Steuerlast für das Volk\n2. Politische Ungleichheit - der Dritte Stand hatte keine Mitspracherechte\n3. Verbreitung aufklärerischer Ideen über Freiheit und Gleichheit'
        },
        'beschreiben': {
            task: 'Beschreiben Sie den Ablauf des Sturms auf die Bastille am 14. Juli 1789.',
            material: 'Am Morgen des 14. Juli 1789 versammelten sich tausende Pariser vor der Bastille, einem Staatsgefängnis und Symbol königlicher Willkür. Die Menge forderte Waffen und Schießpulver. Der Kommandant de Launay verhandelte zunächst, ließ dann aber auf die Menge schießen. Daraufhin stürmten die Aufständischen die Festung. De Launay wurde getötet, die wenigen Gefangenen befreit. Der König erfuhr am Abend von den Ereignissen.',
            source: 'Historische Darstellung',
            sampleAnswer: 'Am Morgen des 14. Juli 1789 versammelte sich eine große Menschenmenge vor der Bastille in Paris. Die Aufständischen forderten Waffen und Munition. Zunächst wurden Verhandlungen mit dem Kommandanten de Launay geführt. Als dieser jedoch das Feuer auf die Menge eröffnen ließ, eskalierte die Situation. Die Menge stürmte die Festung und überwältigte die Verteidiger. Der Kommandant wurde getötet und die Gefangenen wurden befreit. Am Abend erreichte die Nachricht König Ludwig XVI. in Versailles.'
        },
        'analysieren': {
            task: 'Analysieren Sie die folgende Quelle hinsichtlich der Position des Verfassers zur Revolution.',
            material: '"Die Revolution frisst ihre eigenen Kinder. Was als Kampf für Freiheit begann, hat sich in eine Schreckensherrschaft verwandelt. Täglich rollen Köpfe, und niemand ist mehr sicher. Die Ideale von 1789 sind verraten worden." - Aus einem Brief eines französischen Adeligen, 1794',
            source: 'Fiktiver historischer Brief, 1794',
            sampleAnswer: 'Die Quelle stammt von einem französischen Adeligen aus dem Jahr 1794, der Zeit der Schreckensherrschaft. Der Verfasser nimmt eine kritische Position zur Revolution ein. Er verwendet die Metapher "Die Revolution frisst ihre eigenen Kinder", um die Selbstzerstörung der Bewegung zu verdeutlichen. Die Wortwahl "Schreckensherrschaft" und "Köpfe rollen" zeigt die Ablehnung der Gewalt. Der Adelstand war selbst Ziel der Verfolgung, was die subjektive Perspektive erklärt. Der Verfasser sieht einen Verrat an den ursprünglichen Idealen, unterscheidet also zwischen dem Beginn 1789 und der Entwicklung bis 1794.'
        },
        'erklaeren': {
            task: 'Erklären Sie, warum die Weimarer Republik als "Republik ohne Republikaner" bezeichnet wurde.',
            material: 'Die Weimarer Republik wurde 1919 nach dem verlorenen Ersten Weltkrieg gegründet. Viele Deutsche machten die neue Demokratie für die Niederlage und den Versailler Vertrag verantwortlich ("Dolchstoßlegende"). Konservative, Monarchisten und Militärs sehnten sich nach der Kaiserzeit zurück. Die politischen Extreme links und rechts lehnten die Demokratie ab.',
            source: 'Schulbuch Geschichte',
            sampleAnswer: 'Die Weimarer Republik wurde als "Republik ohne Republikaner" bezeichnet, weil große Teile der Bevölkerung die neue Staatsform ablehnten. Dies hatte mehrere Gründe: Erstens wurde die Republik mit der Kriegsniederlage und dem als demütigend empfundenen Versailler Vertrag verbunden. Die "Dolchstoßlegende" machte Demokraten für den Kriegsausgang verantwortlich. Zweitens sehnten sich konservative Kreise, Militärs und ehemalige Monarchisten nach der Kaiserzeit zurück. Drittens bekämpften politische Extreme wie Kommunisten und Nationalsozialisten die Demokratie aktiv. Folglich fehlte der Republik eine breite gesellschaftliche Unterstützung, was sie instabil machte.'
        },
        'beurteilen': {
            task: 'Beurteilen Sie die Außenpolitik Bismarcks.',
            material: 'Otto von Bismarck verfolgte nach der Reichsgründung 1871 eine Politik der Bündnisse und des Gleichgewichts. Er schloss Verträge mit Österreich-Ungarn, Russland und Italien. Deutschland sollte "saturiert" sein und keine weiteren Gebietsansprüche stellen. Bismarck versuchte, Frankreich zu isolieren, um einen Revanchekrieg zu verhindern. Er lehnte Kolonien zunächst ab, gab diesem Druck aber später nach.',
            source: 'Geschichtsdarstellung',
            sampleAnswer: 'Bismarcks Außenpolitik kann differenziert beurteilt werden:\n\nPositiv zu bewerten ist:\n- Das komplexe Bündnissystem sicherte über zwei Jahrzehnte den Frieden in Europa\n- Die Saturiertheitspolitik verhinderte gefährliche Expansionsbestrebungen\n- Die Isolation Frankreichs war aus deutscher Sicht sicherheitspolitisch sinnvoll\n\nKritisch zu sehen ist:\n- Das Bündnissystem war sehr kompliziert und nur schwer aufrechtzuerhalten\n- Die Isolation Frankreichs schuf langfristig einen erbitterten Feind\n- Die späte Kolonialpolitik brachte Deutschland in Konkurrenz zu anderen Großmächten\n\nGesamturteil: Bismarcks Außenpolitik war kurzfristig erfolgreich, legte aber Grundlagen für spätere Konflikte.'
        },
        'vergleichen': {
            task: 'Vergleichen Sie die politischen Systeme des Absolutismus und der konstitutionellen Monarchie.',
            material: 'Im Absolutismus lag alle Macht beim König ("L\'état, c\'est moi" - Der Staat bin ich). Der Monarch regierte ohne Verfassung und Parlament. In der konstitutionellen Monarchie ist die Macht des Königs durch eine Verfassung begrenzt. Es gibt ein gewähltes Parlament mit Gesetzgebungsrechten.',
            source: 'Politische Systemvergleiche',
            sampleAnswer: 'Vergleich Absolutismus und konstitutionelle Monarchie:\n\nGemeinsamkeiten:\n- In beiden Systemen steht ein Monarch an der Staatsspitze\n- Der König hat repräsentative Funktionen\n- Es gibt eine hierarchische Gesellschaftsordnung\n\nUnterschiede:\n- Macht: Im Absolutismus unbeschränkt, in der konst. Monarchie begrenzt\n- Verfassung: Im Absolutismus keine, in der konst. Monarchie grundlegend\n- Parlament: Im Absolutismus keins oder machtlos, in der konst. Monarchie mit Gesetzgebungsrecht\n- Gewaltenteilung: Im Absolutismus keine, in der konst. Monarchie vorhanden\n\nFazit: Die konstitutionelle Monarchie stellt eine Weiterentwicklung dar, die Bürgerrechte und Mitsprache ermöglicht.'
        },
        'stellung-nehmen': {
            task: 'Nehmen Sie Stellung zu der These: "Der Versailler Vertrag machte den Zweiten Weltkrieg unvermeidlich."',
            material: 'Der Versailler Vertrag 1919 enthielt harte Bedingungen für Deutschland: Gebietsabtretungen, Reparationszahlungen, Beschränkung der Armee, alleinige Kriegsschuld. In Deutschland wurde er als "Diktat" empfunden und führte zu Revisionsforderungen.',
            source: 'Zur Debatte um den Versailler Vertrag',
            sampleAnswer: 'Zur These, der Versailler Vertrag habe den Zweiten Weltkrieg unvermeidlich gemacht, nehme ich differenziert Stellung:\n\nArgumente dafür:\n- Die harten Bedingungen demütigten Deutschland und schufen Revanchismus\n- Die Kriegsschuldklausel wurde als ungerecht empfunden\n- Wirtschaftliche Belastungen destabilisierten die Weimarer Republik\n\nGegenargumente:\n- Zwischen 1919 und 1939 lagen 20 Jahre - viele Entwicklungen kamen hinzu\n- Die Weltwirtschaftskrise 1929 war entscheidender Faktor\n- Der Aufstieg Hitlers war nicht zwangsläufig\n- Andere Länder mit harten Friedensverträgen führten keinen Krieg\n\nMeine Position: Der Versailler Vertrag war EIN wichtiger Faktor, aber nicht die alleinige oder unvermeidliche Ursache. Weitere Faktoren wie die Weltwirtschaftskrise, politische Entscheidungen und der Aufstieg des Nationalsozialismus waren ebenso entscheidend.'
        }
    };

    // Fallback für nicht definierte Operatoren
    const defaultExercise = {
        task: `Wende den Operator "${operator.name}" auf das folgende Material an.`,
        material: 'Die Industrielle Revolution begann im 18. Jahrhundert in England und veränderte Wirtschaft und Gesellschaft grundlegend. Neue Maschinen ermöglichten Massenproduktion in Fabriken. Menschen zogen vom Land in die Städte. Es entstanden neue soziale Schichten: Fabrikarbeiter und Industrielle.',
        source: 'Allgemeine Geschichtsdarstellung',
        sampleAnswer: `Eine Musterantwort würde hier die spezifischen Anforderungen des Operators "${operator.name}" (AFB ${operator.afb}) berücksichtigen.`
    };

    return exercises[operator.id] || defaultExercise;
}

// Tipps anzeigen
function showOperatorHelp() {
    const helpDiv = document.getElementById('exerciseHelp');
    helpDiv.style.display = helpDiv.style.display === 'none' ? 'block' : 'none';
}

// Musterantwort anzeigen
function showSampleAnswer() {
    const answerDiv = document.getElementById('sampleAnswer');
    answerDiv.style.display = answerDiv.style.display === 'none' ? 'block' : 'none';
}

// Übung abschicken
function submitExercise() {
    const answer = document.getElementById('exerciseAnswer').value.trim();

    if (!answer) {
        showToast('Bitte gib eine Antwort ein.', 'warning');
        return;
    }

    // Einfache Bewertung basierend auf Länge und Schlüsselwörtern
    let score = 0;
    const wordCount = answer.split(/\s+/).length;

    // Mindestlänge prüfen
    if (wordCount >= 50) score += 30;
    else if (wordCount >= 30) score += 20;
    else score += 10;

    // Struktur prüfen (Absätze)
    if (answer.includes('\n')) score += 10;

    // AFB-spezifische Bewertung
    switch (selectedOperator.afb) {
        case 1:
            // AFB 1: Fakten nennen
            if (wordCount >= 30) score += 30;
            score += 30; // Grundpunkte
            break;
        case 2:
            // AFB 2: Zusammenhänge
            if (answer.toLowerCase().includes('weil') || answer.toLowerCase().includes('deshalb')) score += 15;
            if (answer.toLowerCase().includes('zusammenhang') || answer.toLowerCase().includes('folg')) score += 15;
            score += 20;
            break;
        case 3:
            // AFB 3: Eigenständiges Urteil
            if (answer.toLowerCase().includes('meiner meinung') || answer.toLowerCase().includes('ich denke') || answer.toLowerCase().includes('fazit')) score += 15;
            if (answer.toLowerCase().includes('einerseits') || answer.toLowerCase().includes('andererseits')) score += 15;
            score += 20;
            break;
    }

    score = Math.min(score, 100);

    // Münzen berechnen
    let coins = 0;
    if (score >= 98) coins = selectedOperator.afb === 3 ? 20 : (selectedOperator.afb === 2 ? 10 : 5);
    else if (score >= 90) coins = selectedOperator.afb === 3 ? 15 : 5;
    else if (score >= 80) coins = selectedOperator.afb === 3 ? 10 : (selectedOperator.afb === 2 ? 5 : 3);
    else if (score >= 60) coins = 2;

    // Feedback anzeigen
    const content = document.getElementById('exerciseModalContent');
    content.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <h2>📊 Auswertung</h2>

            <div style="font-size: 4em; margin: 20px 0;">
                ${score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
            </div>

            <div style="font-size: 2.5em; font-weight: bold; color: var(--primary); margin-bottom: 20px;">
                ${score}%
            </div>

            <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 30px;">
                ${coins > 0 ? `<span style="font-size: 1.5em;">+${coins} 🐄</span>` : ''}
                <span style="font-size: 1.5em;">+${Math.round(score / 10)} XP</span>
            </div>

            <div style="background: var(--bg-tertiary); padding: 20px; border-radius: 10px; text-align: left; margin-bottom: 20px;">
                <h4>Feedback:</h4>
                <p>${getFeedback(score, selectedOperator)}</p>
            </div>

            <div style="display: flex; gap: 15px; justify-content: center;">
                <button class="btn btn-primary" onclick="startOperatorExercise()">Nochmal üben</button>
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Schließen</button>
            </div>
        </div>
    `;

    // Belohnungen
    if (coins > 0) {
        addCoins(coins, `Operator-Übung: ${selectedOperator.name}`);
    }
    addXP(Math.round(score / 10));

    // Statistik aktualisieren
    if (currentUser) {
        currentUser.progress.exercisesDone++;
        updateUserProgress({ exercisesDone: currentUser.progress.exercisesDone });
    }

    addActivity('exercise', `Operator "${selectedOperator.name}" geübt (${score}%)`);
}

// Feedback generieren
function getFeedback(score, operator) {
    if (score >= 90) {
        return `Ausgezeichnet! Du hast den Operator "${operator.name}" sehr gut angewendet. Weiter so!`;
    } else if (score >= 80) {
        return `Gut gemacht! Deine Antwort zeigt, dass du den Operator "${operator.name}" verstanden hast. Achte noch mehr auf die spezifischen Anforderungen.`;
    } else if (score >= 60) {
        return `Solide Arbeit! Schau dir nochmal die Tipps für "${operator.name}" an. Besonders wichtig: ${operator.tips[0]}`;
    } else {
        return `Das war ein guter erster Versuch! Bei "${operator.name}" ist besonders wichtig: ${operator.expectation}. Übe weiter und nutze die Tipps!`;
    }
}

// Quiz zum Operator
function showOperatorQuiz() {
    if (!selectedOperator) {
        showToast('Bitte wähle zuerst einen Operator aus.', 'warning');
        return;
    }

    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    const quiz = generateOperatorQuiz(selectedOperator);

    content.innerHTML = `
        <h2>❓ Quiz: ${selectedOperator.name}</h2>

        <div class="quiz-container" id="operatorQuizContainer">
            <div class="quiz-progress">
                <span>Frage <span id="quizCurrentQ">1</span> von ${quiz.length}</span>
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" id="quizProgressFill" style="width: ${100/quiz.length}%"></div>
                </div>
            </div>

            <div id="quizQuestionArea"></div>
        </div>
    `;

    modal.classList.add('active');

    // Quiz starten
    let currentQ = 0;
    let correctAnswers = 0;

    function showQuestion() {
        const q = quiz[currentQ];
        const area = document.getElementById('quizQuestionArea');

        area.innerHTML = `
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option" onclick="checkQuizAnswer(${i}, ${q.correct})">${opt}</div>
                `).join('')}
            </div>
        `;
    }

    window.checkQuizAnswer = function(selected, correct) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((opt, i) => {
            opt.classList.add('disabled');
            if (i === correct) opt.classList.add('correct');
            if (i === selected && selected !== correct) opt.classList.add('incorrect');
        });

        if (selected === correct) {
            correctAnswers++;
            if (currentUser) {
                currentUser.progress.quizCorrect++;
            }
        }

        setTimeout(() => {
            currentQ++;
            if (currentQ < quiz.length) {
                document.getElementById('quizCurrentQ').textContent = currentQ + 1;
                document.getElementById('quizProgressFill').style.width = `${((currentQ + 1) / quiz.length) * 100}%`;
                showQuestion();
            } else {
                // Quiz beendet
                showQuizResult(correctAnswers, quiz.length);
            }
        }, 1500);
    };

    showQuestion();
}

// Operator-Quiz generieren
function generateOperatorQuiz(operator) {
    return [
        {
            question: `Was bedeutet der Operator "${operator.name}"?`,
            options: [
                operator.definition,
                'Alle Informationen ohne Struktur aufschreiben',
                'Eine persönliche Meinung ohne Begründung äußern',
                'Den Text wörtlich abschreiben'
            ],
            correct: 0
        },
        {
            question: `Zu welchem Anforderungsbereich gehört "${operator.name}"?`,
            options: [
                'AFB I - Reproduktion',
                'AFB II - Reorganisation',
                'AFB III - Transfer & Reflexion',
                'AFB IV - Kreation'
            ],
            correct: operator.afb - 1
        },
        {
            question: `Welcher Tipp gilt für "${operator.name}"?`,
            options: [
                operator.tips[0],
                'Möglichst viel Text schreiben ohne Struktur',
                'Nur die eigene Meinung wiedergeben',
                'Das Material nicht beachten'
            ],
            correct: 0
        }
    ];
}

// Quiz-Ergebnis anzeigen
function showQuizResult(correct, total) {
    const percent = Math.round((correct / total) * 100);
    const coins = correct; // 1 Münze pro richtige Antwort

    const content = document.getElementById('exerciseModalContent');
    content.innerHTML = `
        <div class="quiz-result">
            <h2>${percent >= 80 ? '🎉 Super!' : percent >= 50 ? '👍 Gut!' : '📚 Weiter üben!'}</h2>
            <div class="quiz-score">${correct}/${total}</div>
            <p>Du hast ${percent}% der Fragen richtig beantwortet.</p>
            ${coins > 0 ? `<div class="quiz-coins-earned">+${coins} 🐄</div>` : ''}
            <div style="margin-top: 30px;">
                <button class="btn btn-primary" onclick="showOperatorQuiz()">Nochmal versuchen</button>
                <button class="btn btn-secondary" onclick="closeExerciseModal()">Schließen</button>
            </div>
        </div>
    `;

    if (coins > 0) {
        addCoins(coins, 'Operator-Quiz');
    }

    if (currentUser) {
        updateUserProgress({ quizCorrect: currentUser.progress.quizCorrect });
    }
}

// Operator-Übung aus Übungs-Bereich starten
function startOperatorPractice() {
    const select = document.getElementById('operatorExerciseSelect');
    const operatorId = select.value;

    if (!operatorId) {
        showToast('Bitte wähle einen Operator aus.', 'warning');
        return;
    }

    // Operator finden und auswählen
    for (const afb of ['afb1', 'afb2', 'afb3']) {
        const found = OPERATORS[afb].find(op => op.id === operatorId);
        if (found) {
            selectedOperator = found;
            break;
        }
    }

    startOperatorExercise();
}

// Operatoren-Dropdown für Übungsbereich füllen
function fillOperatorSelect() {
    const select = document.getElementById('operatorExerciseSelect');
    if (!select) return;

    let options = '<option value="">Wähle einen Operator...</option>';

    ['afb1', 'afb2', 'afb3'].forEach((afb, index) => {
        options += `<optgroup label="AFB ${index + 1}">`;
        OPERATORS[afb].forEach(op => {
            options += `<option value="${op.id}">${op.name}</option>`;
        });
        options += '</optgroup>';
    });

    select.innerHTML = options;
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    loadOperators(1);
    fillOperatorSelect();

    // Erstes Operator-Detail anzeigen
    if (OPERATORS.afb1 && OPERATORS.afb1.length > 0) {
        showOperatorDetail(OPERATORS.afb1[0].id);
    }
});
