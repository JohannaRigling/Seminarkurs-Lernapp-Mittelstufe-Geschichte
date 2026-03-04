// ===== OPERATOREN SYSTEM =====

let currentAFB = 1;
let selectedOperator = null;
let viewedOperators = new Set();
let currentExercise = null; // Speichert die aktuelle Übung für Musterantwort

// AFB Accordion öffnen/schließen
function toggleAFB(afb) {
    const list = document.getElementById(`afb-list-${afb}`);
    const btn = document.getElementById(`afb-btn-${afb}`);
    if (!list || !btn) return;

    const isOpen = list.classList.contains('open');

    // Alle schließen
    [1, 2, 3].forEach(n => {
        document.getElementById(`afb-list-${n}`).classList.remove('open');
        document.getElementById(`afb-btn-${n}`).classList.remove('active');
    });

    // Aktuellen öffnen wenn er zu war
    if (!isOpen) {
        list.classList.add('open');
        btn.classList.add('active');
        currentAFB = afb;

        // Liste befüllen falls leer
        if (!list.innerHTML.trim()) {
            const operators = OPERATORS[`afb${afb}`];
            list.innerHTML = operators.map(op => `
                <button class="operator-item" data-id="${op.id}" onclick="showOperatorDetail('${op.id}')">
                    ${op.name}
                </button>
            `).join('');
        }

        // Ersten Operator anzeigen
        const operators = OPERATORS[`afb${afb}`];
        if (operators && operators.length > 0) {
            showOperatorDetail(operators[0].id);
        }
    }
}

// Rückwärtskompatibilität
function loadOperators(afb) { toggleAFB(afb); }
function showAFB(afb) { toggleAFB(afb); }

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
    currentExercise = exercise; // Für spätere Anzeige speichern

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

// Operator-Übung generieren - nutzt OPERATOR_EXERCISES aus data.js
function generateOperatorExercise(operator) {
    // Prüfe ob Übungen in OPERATOR_EXERCISES vorhanden sind
    if (typeof OPERATOR_EXERCISES !== 'undefined' && OPERATOR_EXERCISES[operator.id]) {
        const exercises = OPERATOR_EXERCISES[operator.id];
        // Zufällige Übung auswählen
        const exercise = exercises[Math.floor(Math.random() * exercises.length)];

        return {
            task: exercise.question,
            material: getExerciseMaterial(operator.id, exercise.id),
            source: 'HistoLearn Übungsmaterial',
            sampleAnswer: Array.isArray(exercise.sampleAnswer)
                ? exercise.sampleAnswer.map((a, i) => `${i + 1}. ${a}`).join('\n')
                : exercise.sampleAnswer,
            expectedPoints: exercise.expectedPoints || 3,
            tips: exercise.tips
        };
    }

    // Fallback: Eingebaute Übungen
    const exercises = {
        'nennen': {
            task: 'Nennen Sie drei Ursachen für den Ausbruch der Französischen Revolution.',
            material: 'Die Französische Revolution von 1789 hatte vielfältige Ursachen. Die Staatsfinanzen waren zerrüttet, der Hof in Versailles verschwendete Unsummen, während die Bevölkerung unter hohen Steuern litt. Der Dritte Stand, der 98% der Bevölkerung ausmachte, hatte keine politische Mitsprache. Zudem verbreiteten sich die Ideen der Aufklärung über Freiheit und Gleichheit. Missernten führten zu Hungersnöten und steigenden Brotpreisen.',
            source: 'Schulbuch Geschichte, Kapitel "Französische Revolution"',
            sampleAnswer: '1. Finanzielle Krise des Staates und hohe Steuerlast für das Volk\n2. Politische Ungleichheit - der Dritte Stand hatte keine Mitspracherechte\n3. Verbreitung aufklärerischer Ideen über Freiheit und Gleichheit',
            expectedPoints: 3
        },
        'beschreiben': {
            task: 'Beschreiben Sie den Ablauf des Sturms auf die Bastille am 14. Juli 1789.',
            material: 'Am Morgen des 14. Juli 1789 versammelten sich tausende Pariser vor der Bastille, einem Staatsgefängnis und Symbol königlicher Willkür. Die Menge forderte Waffen und Schießpulver. Der Kommandant de Launay verhandelte zunächst, ließ dann aber auf die Menge schießen. Daraufhin stürmten die Aufständischen die Festung. De Launay wurde getötet, die wenigen Gefangenen befreit. Der König erfuhr am Abend von den Ereignissen.',
            source: 'Historische Darstellung',
            sampleAnswer: 'Am Morgen des 14. Juli 1789 versammelte sich eine große Menschenmenge vor der Bastille in Paris. Die Aufständischen forderten Waffen und Munition. Zunächst wurden Verhandlungen mit dem Kommandanten de Launay geführt. Als dieser jedoch das Feuer auf die Menge eröffnen ließ, eskalierte die Situation. Die Menge stürmte die Festung und überwältigte die Verteidiger. Der Kommandant wurde getötet und die Gefangenen wurden befreit. Am Abend erreichte die Nachricht König Ludwig XVI. in Versailles.',
            expectedPoints: 5
        },
        'zusammenfassen': {
            task: 'Fassen Sie die Hauptursachen und Folgen des Dreißigjährigen Krieges zusammen.',
            material: 'Der Dreißigjährige Krieg (1618-1648) begann als Religionskonflikt zwischen Protestanten und Katholiken im Heiligen Römischen Reich. Der Prager Fenstersturz 1618 war der Auslöser. Der Krieg weitete sich zu einem europäischen Machtkampf aus. Schweden, Frankreich, Spanien und andere Mächte griffen ein. Die Bevölkerung Deutschlands wurde um ein Drittel dezimiert. Ganze Landstriche wurden verwüstet. Der Westfälische Frieden 1648 beendete den Krieg und schuf ein neues Staatensystem mit dem Prinzip der Souveränität.',
            source: 'Überblicksdarstellung',
            sampleAnswer: 'Hauptursachen: Religiöse Konflikte zwischen Protestanten und Katholiken, Machtkämpfe im Reich, europäische Hegemonialbestrebungen.\n\nFolgen: Massive Bevölkerungsverluste, wirtschaftliche Verwüstung, Westfälischer Frieden mit neuem Staatensystem, Stärkung der Landesfürsten, Schwächung des Kaisers.',
            expectedPoints: 4
        },
        'analysieren': {
            task: 'Analysieren Sie die folgende Quelle hinsichtlich der Position des Verfassers zur Revolution.',
            material: '"Die Revolution frisst ihre eigenen Kinder. Was als Kampf für Freiheit begann, hat sich in eine Schreckensherrschaft verwandelt. Täglich rollen Köpfe, und niemand ist mehr sicher. Die Ideale von 1789 sind verraten worden." - Aus einem Brief eines französischen Adeligen, 1794',
            source: 'Fiktiver historischer Brief, 1794',
            sampleAnswer: 'Die Quelle stammt von einem französischen Adeligen aus dem Jahr 1794, der Zeit der Schreckensherrschaft. Der Verfasser nimmt eine kritische Position zur Revolution ein. Er verwendet die Metapher "Die Revolution frisst ihre eigenen Kinder", um die Selbstzerstörung der Bewegung zu verdeutlichen. Die Wortwahl "Schreckensherrschaft" und "Köpfe rollen" zeigt die Ablehnung der Gewalt. Der Adelstand war selbst Ziel der Verfolgung, was die subjektive Perspektive erklärt. Der Verfasser sieht einen Verrat an den ursprünglichen Idealen, unterscheidet also zwischen dem Beginn 1789 und der Entwicklung bis 1794.',
            expectedPoints: 6
        },
        'erklaeren': {
            task: 'Erklären Sie, warum die Weimarer Republik als "Republik ohne Republikaner" bezeichnet wurde.',
            material: 'Die Weimarer Republik wurde 1919 nach dem verlorenen Ersten Weltkrieg gegründet. Viele Deutsche machten die neue Demokratie für die Niederlage und den Versailler Vertrag verantwortlich ("Dolchstoßlegende"). Konservative, Monarchisten und Militärs sehnten sich nach der Kaiserzeit zurück. Die politischen Extreme links und rechts lehnten die Demokratie ab.',
            source: 'Schulbuch Geschichte',
            sampleAnswer: 'Die Weimarer Republik wurde als "Republik ohne Republikaner" bezeichnet, weil große Teile der Bevölkerung die neue Staatsform ablehnten. Dies hatte mehrere Gründe: Erstens wurde die Republik mit der Kriegsniederlage und dem als demütigend empfundenen Versailler Vertrag verbunden. Die "Dolchstoßlegende" machte Demokraten für den Kriegsausgang verantwortlich. Zweitens sehnten sich konservative Kreise, Militärs und ehemalige Monarchisten nach der Kaiserzeit zurück. Drittens bekämpften politische Extreme wie Kommunisten und Nationalsozialisten die Demokratie aktiv. Folglich fehlte der Republik eine breite gesellschaftliche Unterstützung, was sie instabil machte.',
            expectedPoints: 6
        },
        'einordnen': {
            task: 'Ordnen Sie die Märzrevolution 1848 in den europäischen Kontext ein.',
            material: 'Im März 1848 kam es in vielen deutschen Staaten zu Aufständen. Bürger forderten Pressefreiheit, Versammlungsfreiheit und eine Verfassung. In Berlin kam es zu Barrikadenkämpfen. Die Nationalversammlung trat in der Frankfurter Paulskirche zusammen. Auch in anderen europäischen Ländern gab es 1848 Revolutionen.',
            source: 'Schulbuchauszug',
            sampleAnswer: 'Die Märzrevolution 1848 war Teil einer europaweiten Revolutionswelle. In Frankreich stürzte die Februarrevolution König Louis-Philippe. In Italien, Ungarn und anderen Ländern kam es ebenfalls zu Aufständen gegen die bestehende Ordnung. Gemeinsame Forderungen waren liberale Reformen, nationale Einheit und Verfassungen. Die Revolutionen waren eine Reaktion auf die Restaurationspolitik nach 1815. Der Wiener Kongress hatte die alten Herrschaftsverhältnisse wiederhergestellt, was auf wachsenden Widerstand stieß. Die deutschen Revolutionäre waren inspiriert von den Ereignissen in Paris und hofften auf ähnliche Erfolge.',
            expectedPoints: 5
        },
        'vergleichen': {
            task: 'Vergleichen Sie die politischen Systeme des Absolutismus und der konstitutionellen Monarchie.',
            material: 'Im Absolutismus lag alle Macht beim König ("L\'état, c\'est moi" - Der Staat bin ich). Der Monarch regierte ohne Verfassung und Parlament. In der konstitutionellen Monarchie ist die Macht des Königs durch eine Verfassung begrenzt. Es gibt ein gewähltes Parlament mit Gesetzgebungsrechten.',
            source: 'Politische Systemvergleiche',
            sampleAnswer: 'Vergleich Absolutismus und konstitutionelle Monarchie:\n\nGemeinsamkeiten:\n- In beiden Systemen steht ein Monarch an der Staatsspitze\n- Der König hat repräsentative Funktionen\n- Es gibt eine hierarchische Gesellschaftsordnung\n\nUnterschiede:\n- Macht: Im Absolutismus unbeschränkt, in der konst. Monarchie begrenzt\n- Verfassung: Im Absolutismus keine, in der konst. Monarchie grundlegend\n- Parlament: Im Absolutismus keins oder machtlos, in der konst. Monarchie mit Gesetzgebungsrecht\n- Gewaltenteilung: Im Absolutismus keine, in der konst. Monarchie vorhanden\n\nFazit: Die konstitutionelle Monarchie stellt eine Weiterentwicklung dar, die Bürgerrechte und Mitsprache ermöglicht.',
            expectedPoints: 6
        },
        'herausarbeiten': {
            task: 'Arbeiten Sie die Argumentation des Autors zur Kriegsschuldfrage heraus.',
            material: '"Deutschland trägt die alleinige Verantwortung für den Ausbruch des Krieges. Der Blankoscheck an Österreich, der Schlieffen-Plan und die Kriegserklärungen zeigen, dass Deutschland den Krieg wollte und herbeiführte. Die Mittelmächte handelten aggressiv, während die Entente nur reagierte." - Auszug aus einer britischen Zeitung, 1919',
            source: 'Historische Quelle',
            sampleAnswer: 'Der Autor vertritt die These der alleinigen deutschen Kriegsschuld.\n\nSeine Argumente:\n1. Blankoscheck: Deutschland unterstützte Österreich-Ungarn bedingungslos\n2. Schlieffen-Plan: Ein vorgefertigter Angriffsplan zeuge von Kriegsabsichten\n3. Kriegserklärungen: Deutschland erklärte zuerst den Krieg\n4. Handlungsweise: Mittelmächte = aggressiv, Entente = reaktiv\n\nDer Autor argumentiert eindeutig pro-Entente und weist Deutschland die Hauptschuld zu. Diese Position entspricht dem späteren Versailler Vertrag.',
            expectedPoints: 5
        },
        'charakterisieren': {
            task: 'Charakterisieren Sie die Politik Napoleons.',
            material: 'Napoleon Bonaparte stieg vom General zum Kaiser auf. Er modernisierte Frankreich durch den Code Civil, ein einheitliches Rechtssystem. Er führte zahlreiche Kriege und eroberte weite Teile Europas. Er setzte Verwandte als Herrscher ein. Sein Russlandfeldzug 1812 scheiterte katastrophal. 1815 wurde er endgültig besiegt.',
            source: 'Biografische Darstellung',
            sampleAnswer: 'Napoleons Politik war gekennzeichnet durch:\n\n1. Modernisierung: Code Civil, Verwaltungsreformen, Bildungsreformen\n2. Autoritäre Herrschaft: Konzentration der Macht, Zensur, Polizeistaat\n3. Expansionspolitik: Militärische Eroberungen in ganz Europa\n4. Nepotismus: Einsetzung von Familienangehörigen als Herrscher\n5. Pragmatismus: Verbindung revolutionärer Ideen mit monarchischen Strukturen\n\nNapoleon war sowohl Vollender als auch Totengräber der Revolution.',
            expectedPoints: 5
        },
        'beurteilen': {
            task: 'Beurteilen Sie die Außenpolitik Bismarcks.',
            material: 'Otto von Bismarck verfolgte nach der Reichsgründung 1871 eine Politik der Bündnisse und des Gleichgewichts. Er schloss Verträge mit Österreich-Ungarn, Russland und Italien. Deutschland sollte "saturiert" sein und keine weiteren Gebietsansprüche stellen. Bismarck versuchte, Frankreich zu isolieren, um einen Revanchekrieg zu verhindern. Er lehnte Kolonien zunächst ab, gab diesem Druck aber später nach.',
            source: 'Geschichtsdarstellung',
            sampleAnswer: 'Bismarcks Außenpolitik kann differenziert beurteilt werden:\n\nPositiv zu bewerten ist:\n- Das komplexe Bündnissystem sicherte über zwei Jahrzehnte den Frieden in Europa\n- Die Saturiertheitspolitik verhinderte gefährliche Expansionsbestrebungen\n- Die Isolation Frankreichs war aus deutscher Sicht sicherheitspolitisch sinnvoll\n\nKritisch zu sehen ist:\n- Das Bündnissystem war sehr kompliziert und nur schwer aufrechtzuerhalten\n- Die Isolation Frankreichs schuf langfristig einen erbitterten Feind\n- Die späte Kolonialpolitik brachte Deutschland in Konkurrenz zu anderen Großmächten\n\nGesamturteil: Bismarcks Außenpolitik war kurzfristig erfolgreich, legte aber Grundlagen für spätere Konflikte.',
            expectedPoints: 7
        },
        'bewerten': {
            task: 'Bewerten Sie die Bedeutung der Menschen- und Bürgerrechtserklärung von 1789 für heute.',
            material: 'Die Erklärung der Menschen- und Bürgerrechte wurde am 26. August 1789 von der französischen Nationalversammlung verkündet. Sie enthält Grundsätze wie die Freiheit und Gleichheit aller Menschen, das Recht auf Eigentum, Meinungsfreiheit und die Volkssouveränität.',
            source: 'Historisches Dokument',
            sampleAnswer: 'Die Menschen- und Bürgerrechtserklärung von 1789 hat bis heute große Bedeutung:\n\nHistorische Bedeutung:\n- Erste umfassende Formulierung von Menschenrechten\n- Bruch mit dem Absolutismus\n- Grundlage für moderne Demokratien\n\nHeutige Relevanz:\n- Vorbild für UN-Menschenrechtserklärung 1948\n- Grundwerte wie Freiheit und Gleichheit sind universell anerkannt\n- Maßstab für Kritik an Menschenrechtsverletzungen\n\nEinschränkungen:\n- Frauen und Sklaven wurden nicht einbezogen\n- Umsetzung dauerte Jahrhunderte\n\nFazit: Die Erklärung war revolutionär und prägt unser Verständnis von Menschenrechten bis heute.',
            expectedPoints: 7
        },
        'stellung-nehmen': {
            task: 'Nehmen Sie Stellung zu der These: "Der Versailler Vertrag machte den Zweiten Weltkrieg unvermeidlich."',
            material: 'Der Versailler Vertrag 1919 enthielt harte Bedingungen für Deutschland: Gebietsabtretungen, Reparationszahlungen, Beschränkung der Armee, alleinige Kriegsschuld. In Deutschland wurde er als "Diktat" empfunden und führte zu Revisionsforderungen.',
            source: 'Zur Debatte um den Versailler Vertrag',
            sampleAnswer: 'Zur These, der Versailler Vertrag habe den Zweiten Weltkrieg unvermeidlich gemacht, nehme ich differenziert Stellung:\n\nArgumente dafür:\n- Die harten Bedingungen demütigten Deutschland und schufen Revanchismus\n- Die Kriegsschuldklausel wurde als ungerecht empfunden\n- Wirtschaftliche Belastungen destabilisierten die Weimarer Republik\n\nGegenargumente:\n- Zwischen 1919 und 1939 lagen 20 Jahre - viele Entwicklungen kamen hinzu\n- Die Weltwirtschaftskrise 1929 war entscheidender Faktor\n- Der Aufstieg Hitlers war nicht zwangsläufig\n- Andere Länder mit harten Friedensverträgen führten keinen Krieg\n\nMeine Position: Der Versailler Vertrag war EIN wichtiger Faktor, aber nicht die alleinige oder unvermeidliche Ursache. Weitere Faktoren wie die Weltwirtschaftskrise, politische Entscheidungen und der Aufstieg des Nationalsozialismus waren ebenso entscheidend.',
            expectedPoints: 7
        },
        'diskutieren': {
            task: 'Diskutieren Sie die Frage, ob Bismarck ein "Nationalist" oder ein "Realpolitiker" war.',
            material: 'Bismarck vereinte Deutschland durch drei Kriege. Er nutzte nationale Gefühle für seine Politik, war aber kein überzeugter Nationalist. Er ordnete alles den Interessen Preußens unter. Nach der Reichsgründung verfolgte er eine zurückhaltende Außenpolitik.',
            source: 'Historikerurteile',
            sampleAnswer: 'Die Frage lässt sich nicht eindeutig beantworten:\n\nBismarck als Nationalist:\n- Er schuf den deutschen Nationalstaat\n- Er nutzte nationale Symbole und Rhetorik\n- Die Reichsgründung war ein nationales Projekt\n\nBismarck als Realpolitiker:\n- Nationale Einheit war Mittel, nicht Ziel\n- Preußische Interessen standen im Vordergrund\n- Pragmatische Bündnispolitik statt ideologischer Festlegung\n- Ablehnung weiterer nationaler Expansion nach 1871\n\nAbwägung: Bismarck instrumentalisierte den Nationalismus für seine machtpolitischen Ziele. Er war primär ein Realpolitiker, der nationale Gefühle geschickt einsetzte, ohne ihnen selbst zu verfallen.\n\nFazit: Die Kategorien schließen sich nicht aus - Bismarck war beides, wobei der Realpolitiker überwog.',
            expectedPoints: 7
        },
        'gestalten': {
            task: 'Entwerfen Sie eine kurze Rede, die ein Arbeiter 1848 in der Frankfurter Paulskirche hätte halten können.',
            material: 'In der Paulskirche tagte 1848 die erste deutsche Nationalversammlung. Abgeordnete diskutierten über Verfassung, Grundrechte und nationale Einheit. Die Arbeiterschaft war kaum vertreten.',
            source: 'Historischer Kontext',
            sampleAnswer: 'Geehrte Abgeordnete!\n\nSie sprechen von Freiheit und Einheit - aber für wen? Wir Arbeiter schuften 14 Stunden am Tag in Fabriken, unsere Kinder haben keine Schulbildung, und wenn wir krank werden, verhungern unsere Familien.\n\nSie fordern Pressefreiheit - doch was nützt sie dem, der nicht lesen kann? Sie wollen Wahlen - aber nur für Besitzende!\n\nWenn diese Verfassung nur dem Bürgertum dient, wird die Revolution scheitern. Die soziale Frage muss gelöst werden! Wir fordern:\n- Arbeitsschutzgesetze\n- Bildung für alle Kinder\n- Hilfe bei Krankheit und Alter\n\nEine Nation, die ihre Arbeiter vergisst, baut auf Sand!\n\n(Die Rede spiegelt die zeitgenössischen Forderungen der Arbeiterbewegung wider)',
            expectedPoints: 7
        },
        'entwickeln': {
            task: 'Entwickeln Sie Thesen zur Frage, welche Lehren aus der Geschichte des Nationalsozialismus zu ziehen sind.',
            material: 'Der Nationalsozialismus führte zu Diktatur, Krieg und Holocaust. Die Weimarer Demokratie wurde von innen zerstört. Propaganda und Terror ermöglichten die Machtfestigung.',
            source: 'Zur Erinnerungskultur',
            sampleAnswer: 'Lehren aus dem Nationalsozialismus:\n\nThese 1: Demokratie braucht aktive Verteidigung\n- Antidemokratische Kräfte dürfen nicht unterschätzt werden\n- Die Verfassung muss wehrhaft sein\n\nThese 2: Menschenrechte sind unantastbar\n- Würde des Menschen als höchster Wert\n- Keine Ausgrenzung von Minderheiten\n\nThese 3: Kritisches Denken muss gefördert werden\n- Bildung gegen Propaganda\n- Medienkompetenz entwickeln\n\nThese 4: Zivilcourage ist notwendig\n- Frühzeitig Widerstand gegen Unrecht\n- Nicht wegsehen bei Diskriminierung\n\nThese 5: Erinnerung ist Verantwortung\n- Gedenken an die Opfer\n- Aufklärung über Mechanismen der Diktatur\n\nDiese Lehren sind auch heute aktuell und erfordern ständige Wachsamkeit.',
            expectedPoints: 7
        },
        'ueberpruefen': {
            task: 'Überprüfen Sie die These, dass die "Dolchstoßlegende" historisch berechtigt war.',
            material: 'Nach dem Ersten Weltkrieg verbreitete sich die Behauptung, das deutsche Heer sei "im Felde unbesiegt" gewesen und von der Heimatfront ("Novemberverbrecher") durch Revolution verraten worden. Diese These wurde vor allem von rechten Kreisen verbreitet.',
            source: 'Zur Dolchstoßlegende',
            sampleAnswer: 'Überprüfung der Dolchstoßlegende:\n\nDie These:\n- Das Heer sei unbesiegt gewesen\n- Revolution und Politiker hätten den Krieg verloren\n\nFakten dagegen:\n1. Militärische Lage 1918: Das Heer war erschöpft, Reserven fehlten\n2. Ludendorff forderte selbst den Waffenstillstand\n3. Die Alliierten waren durch US-Truppen überlegen\n4. Heimatfront brach wegen Kriegsmüdigkeit zusammen\n5. Die Revolution kam NACH der militärischen Niederlage\n\nHistorisches Urteil:\nDie Dolchstoßlegende ist widerlegt. Sie war eine Propagandalüge, die die militärische Führung von ihrer Verantwortung entlasten sollte. Sie vergiftete das politische Klima der Weimarer Republik und half den Nationalsozialisten.\n\nErgebnis: Die These ist historisch NICHT berechtigt.',
            expectedPoints: 7
        }
    };

    // Fallback für nicht definierte Operatoren
    const defaultExercise = {
        task: `Wende den Operator "${operator.name}" auf das folgende Material an.`,
        material: 'Die Industrielle Revolution begann im 18. Jahrhundert in England und veränderte Wirtschaft und Gesellschaft grundlegend. Neue Maschinen ermöglichten Massenproduktion in Fabriken. Menschen zogen vom Land in die Städte. Es entstanden neue soziale Schichten: Fabrikarbeiter und Industrielle. Die Arbeitsbedingungen waren oft menschenunwürdig: 14-Stunden-Tage, Kinderarbeit, gefährliche Maschinen. Es entstand die "Soziale Frage".',
        source: 'Allgemeine Geschichtsdarstellung',
        sampleAnswer: `Eine Musterantwort würde hier die spezifischen Anforderungen des Operators "${operator.name}" (AFB ${operator.afb}) berücksichtigen: ${operator.expectation}`,
        expectedPoints: 5
    };

    return exercises[operator.id] || defaultExercise;
}

// Zusätzliches Material für erweiterte Übungen
function getExerciseMaterial(operatorId, exerciseId) {
    const materials = {
        'nennen-1': 'Der Erste Weltkrieg brach 1914 aus. Vorausgegangen waren jahrzehntelange Spannungen zwischen den europäischen Großmächten. Deutschland, Österreich-Ungarn und Italien bildeten den Dreibund. Frankreich, Russland und Großbritannien schlossen sich zur Triple Entente zusammen. Die Staaten rüsteten ihre Armeen auf. Nationalistische Bewegungen forderten Unabhängigkeit oder Expansion. Auf dem Balkan gab es mehrere Krisen. Das Attentat von Sarajevo am 28. Juni 1914 löste schließlich den Krieg aus.',
        'nennen-2': 'Frankreich vor der Revolution war eine Ständegesellschaft. Der erste Stand umfasste die Geistlichkeit mit etwa 130.000 Mitgliedern. Sie besaßen viel Land und zahlten kaum Steuern. Der zweite Stand war der Adel mit etwa 400.000 Mitgliedern. Auch sie genossen Steuerfreiheit und Privilegien. Der dritte Stand umfasste alle anderen: Bürger, Bauern, Handwerker - etwa 26 Millionen Menschen. Sie trugen fast die gesamte Steuerlast.',
        'nennen-3': 'Die Französische Revolution begann 1789 mit der Einberufung der Generalstände. Der dritte Stand erklärte sich zur Nationalversammlung. Am 14. Juli stürmte das Volk die Bastille. Im August wurden die Menschen- und Bürgerrechte erklärt. 1792 wurde die Republik ausgerufen. König Ludwig XVI. wurde 1793 hingerichtet. Es folgte die Schreckensherrschaft unter Robespierre. 1794 wurde Robespierre selbst gestürzt. 1799 kam Napoleon an die Macht.',
        'beschreiben-1': 'Die Märzrevolution 1848 war Teil einer europäischen Bewegung. Inspiriert von der Februarrevolution in Frankreich erhoben sich Bürger in vielen deutschen Staaten. Sie forderten Pressefreiheit, Versammlungsfreiheit und nationale Einheit. In Berlin kam es am 18. März zu Barrikadenkämpfen mit über 200 Toten. König Friedrich Wilhelm IV. machte Zugeständnisse und versprach eine Verfassung. Am 18. Mai trat die Nationalversammlung in der Frankfurter Paulskirche zusammen. Die Abgeordneten arbeiteten eine demokratische Verfassung aus. Im Frühjahr 1849 lehnte Friedrich Wilhelm IV. jedoch die angebotene Kaiserkrone ab. Die Revolution scheiterte.',
        'beschreiben-2': 'Das mittelalterliche Dorf war das Zentrum des Lebens für die meisten Menschen. Die Häuser waren aus Holz und Lehm gebaut. In der Mitte lag meist ein Dorfplatz mit Kirche und Brunnen. Die Bauern bearbeiteten die Felder mit einfachen Geräten. Sie mussten Abgaben an den Grundherrn leisten: einen Teil der Ernte, Arbeitsleistungen (Frondienste) und Geld. Die Dreifelderwirtschaft war üblich. Das Leben folgte dem kirchlichen Kalender mit seinen Festen. Die Dorfgemeinschaft half sich gegenseitig bei Ernte und Hausbau.',
        'analysieren-1': 'Die nationalsozialistische Propaganda nutzte alle verfügbaren Medien. Joseph Goebbels leitete das Reichsministerium für Volksaufklärung und Propaganda. Der "Volksempfänger" brachte das Radio in jedes Haus. Filme wie "Triumph des Willens" glorifizierten das Regime. Die Reichsparteitage in Nürnberg waren Massenspektakel. Plakate zeigten idealisierte Bilder der "Volksgemeinschaft". Feindbilder (Juden, Kommunisten) wurden systematisch aufgebaut. Die Jugend wurde durch HJ und BDM indoktriniert.'
    };
    return materials[exerciseId] || 'Material nicht verfügbar';
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

// Musterantwort nach dem Einreichen anzeigen
function showSampleAnswerAfterSubmit() {
    if (!currentExercise) return;

    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div style="padding: 20px;">
            <h2>📋 Musterantwort: ${selectedOperator.name}</h2>

            <div style="background: var(--bg-tertiary); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4>Aufgabe:</h4>
                <p style="color: var(--text-secondary);">${currentExercise.task}</p>
            </div>

            <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #27ae60;">
                <h4 style="color: #27ae60;">Musterantwort:</h4>
                <p style="white-space: pre-wrap; line-height: 1.8;">${currentExercise.sampleAnswer}</p>
            </div>

            <div style="background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: #1976d2;">💡 Tipps für "${selectedOperator.name}":</h4>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    ${selectedOperator.tips.map(tip => `<li style="margin: 5px 0;">${tip}</li>`).join('')}
                </ul>
            </div>

            <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                <button class="btn btn-primary" onclick="startOperatorExercise()">🔄 Neue Übung</button>
                <button class="btn btn-secondary" onclick="closeExerciseModal()">✕ Schließen</button>
            </div>
        </div>
    `;
}

// Übung abschicken
function submitExercise() {
    const answer = document.getElementById('exerciseAnswer').value.trim();

    if (!answer) {
        showToast('Bitte gib eine Antwort ein.', 'warning');
        return;
    }

    // Erweiterte Bewertung basierend auf mehreren Kriterien
    let score = 0;
    const wordCount = answer.split(/\s+/).length;
    const answerLower = answer.toLowerCase();
    let feedbackDetails = [];

    // 1. Längenkriterium (max 25 Punkte)
    const minWords = selectedOperator.afb === 1 ? 20 : (selectedOperator.afb === 2 ? 50 : 80);
    if (wordCount >= minWords * 1.5) {
        score += 25;
        feedbackDetails.push('Ausführliche Antwort');
    } else if (wordCount >= minWords) {
        score += 20;
        feedbackDetails.push('Angemessene Länge');
    } else if (wordCount >= minWords * 0.5) {
        score += 10;
        feedbackDetails.push('Etwas zu kurz');
    } else {
        score += 5;
        feedbackDetails.push('Deutlich zu kurz');
    }

    // 2. Strukturkriterium (max 15 Punkte)
    if (answer.includes('\n\n') || answer.includes(':\n')) {
        score += 15;
        feedbackDetails.push('Gute Strukturierung');
    } else if (answer.includes('\n') || answer.includes('. ')) {
        score += 10;
        feedbackDetails.push('Grundlegende Struktur');
    } else {
        score += 5;
    }

    // 3. Fachsprachliche Begriffe (max 15 Punkte)
    const fachbegriffe = ['ursache', 'folge', 'wirkung', 'zusammenhang', 'epoche', 'quelle',
        'revolution', 'reform', 'demokratie', 'monarchie', 'republik', 'krieg', 'frieden',
        'gesellschaft', 'wirtschaft', 'politik', 'verfassung', 'macht', 'herrschaft'];
    let fachCount = fachbegriffe.filter(b => answerLower.includes(b)).length;
    if (fachCount >= 5) {
        score += 15;
        feedbackDetails.push('Gute Fachsprache');
    } else if (fachCount >= 3) {
        score += 10;
        feedbackDetails.push('Fachsprache vorhanden');
    } else {
        score += 5;
    }

    // 4. AFB-spezifische Kriterien (max 45 Punkte)
    switch (selectedOperator.afb) {
        case 1:
            // AFB 1: Reproduktion - Fakten, Aufzählungen
            const hasNumbering = /\d\.|•|-|–/.test(answer);
            const hasListFormat = answer.split('\n').length >= 2;

            if (hasNumbering) {
                score += 20;
                feedbackDetails.push('Klare Aufzählung');
            } else if (hasListFormat) {
                score += 15;
            }

            // Prüfe auf konkrete Fakten
            if (/\d{3,4}/.test(answer)) { // Jahreszahlen
                score += 15;
                feedbackDetails.push('Konkrete Daten genannt');
            }
            score += 10; // Grundpunkte
            break;

        case 2:
            // AFB 2: Reorganisation - Zusammenhänge, Erklärungen
            const kausalwoerter = ['weil', 'da', 'deshalb', 'daher', 'folglich', 'dadurch',
                'aufgrund', 'infolge', 'somit', 'demnach', 'führte zu', 'hatte zur folge'];
            let kausalCount = kausalwoerter.filter(w => answerLower.includes(w)).length;

            if (kausalCount >= 3) {
                score += 25;
                feedbackDetails.push('Kausale Verknüpfungen');
            } else if (kausalCount >= 1) {
                score += 15;
                feedbackDetails.push('Zusammenhänge erkannt');
            }

            // Vergleichsoperatoren
            if (selectedOperator.id === 'vergleichen') {
                const vergleichswoerter = ['gemeinsamkeit', 'unterschied', 'hingegen', 'während',
                    'im gegensatz', 'ebenso', 'ähnlich', 'anders als'];
                let vergleichCount = vergleichswoerter.filter(w => answerLower.includes(w)).length;
                if (vergleichCount >= 2) {
                    score += 10;
                    feedbackDetails.push('Vergleichskategorien');
                }
            }
            score += 10; // Grundpunkte
            break;

        case 3:
            // AFB 3: Transfer & Reflexion - eigenes Urteil
            const urteilswoerter = ['meiner meinung', 'ich denke', 'fazit', 'bewertung',
                'beurteilung', 'abschließend', 'zusammenfassend', 'insgesamt', 'meine position',
                'ich halte', 'lässt sich sagen'];
            let urteilCount = urteilswoerter.filter(w => answerLower.includes(w)).length;

            if (urteilCount >= 2) {
                score += 20;
                feedbackDetails.push('Klares eigenes Urteil');
            } else if (urteilCount >= 1) {
                score += 12;
                feedbackDetails.push('Ansätze zum Urteil');
            }

            // Multiperspektivität
            const perspektivwoerter = ['einerseits', 'andererseits', 'pro', 'contra',
                'argument dafür', 'argument dagegen', 'allerdings', 'jedoch'];
            let perspektivCount = perspektivwoerter.filter(w => answerLower.includes(w)).length;

            if (perspektivCount >= 2) {
                score += 15;
                feedbackDetails.push('Multiperspektivisch');
            } else if (perspektivCount >= 1) {
                score += 8;
            }

            score += 10; // Grundpunkte
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
    const gradeEmoji = score >= 90 ? '🌟' : score >= 80 ? '🎉' : score >= 70 ? '👍' : score >= 60 ? '📝' : '📚';
    const gradeName = score >= 90 ? 'Ausgezeichnet!' : score >= 80 ? 'Sehr gut!' : score >= 70 ? 'Gut!' : score >= 60 ? 'Befriedigend' : 'Weiter üben!';
    const gradeColor = score >= 80 ? '#27ae60' : score >= 60 ? '#f39c12' : '#e74c3c';

    content.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <h2>📊 Auswertung: ${selectedOperator.name}</h2>

            <div style="font-size: 4em; margin: 20px 0;">
                ${gradeEmoji}
            </div>

            <div style="font-size: 2.5em; font-weight: bold; color: ${gradeColor}; margin-bottom: 10px;">
                ${score}%
            </div>
            <div style="font-size: 1.2em; color: var(--text-secondary); margin-bottom: 20px;">
                ${gradeName}
            </div>

            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px;">
                ${coins > 0 ? `<span style="font-size: 1.3em; background: rgba(201, 162, 39, 0.2); padding: 8px 16px; border-radius: 20px;">+${coins} 🐄</span>` : ''}
                <span style="font-size: 1.3em; background: rgba(102, 126, 234, 0.2); padding: 8px 16px; border-radius: 20px;">+${Math.round(score / 10)} XP</span>
            </div>

            ${feedbackDetails.length > 0 ? `
            <div style="background: var(--bg-tertiary); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px;">✅ Erkannte Stärken:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
                    ${feedbackDetails.map(d => `<span style="background: rgba(39, 174, 96, 0.2); color: #27ae60; padding: 5px 12px; border-radius: 15px; font-size: 0.9em;">${d}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <div style="background: var(--bg-tertiary); padding: 20px; border-radius: 10px; text-align: left; margin-bottom: 20px;">
                <h4>💬 Feedback:</h4>
                <p>${getFeedback(score, selectedOperator)}</p>
            </div>

            <div style="background: rgba(102, 126, 234, 0.1); padding: 15px; border-radius: 10px; text-align: left; margin-bottom: 20px;">
                <h4>📝 Statistik:</h4>
                <p>Wortanzahl: ${wordCount} | AFB: ${selectedOperator.afb}</p>
            </div>

            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="startOperatorExercise()">🔄 Nochmal üben</button>
                <button class="btn btn-secondary" onclick="showSampleAnswerAfterSubmit()">📋 Musterantwort</button>
                <button class="btn btn-secondary" onclick="closeExerciseModal()">✕ Schließen</button>
            </div>
        </div>
    `;

    // Sound abspielen
    if (typeof playSound === 'function') {
        playSound(score >= 60 ? 'correct' : 'wrong');
    }

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
