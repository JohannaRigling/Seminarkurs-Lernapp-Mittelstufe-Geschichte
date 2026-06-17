// ===== OPERATOREN DATENBANK =====
const OPERATORS = {
    afb1: [
        {
            id: 'nennen',
            name: 'Nennen / Angeben',
            afb: 1,
            definition: 'Informationen aus dem Material oder aus dem eigenen Wissen ohne weitere Erläuterungen aufzählen.',
            expectation: 'Du sollst Fakten, Daten, Namen oder Begriffe aufzählen, ohne sie zu erklären oder zu begründen. Es geht um reines Reproduzieren von Wissen.',
            example: 'Nennen Sie drei Ursachen für den Ausbruch des Ersten Weltkriegs.',
            tips: [
                'Lies die Frage genau - wie viele Punkte werden verlangt?',
                'Formuliere kurze, prägnante Stichpunkte',
                'Keine Erklärungen oder Begründungen nötig',
                'Achte auf Vollständigkeit der geforderten Anzahl'
            ],
            mistakes: [
                'Zu ausführliche Erklärungen geben',
                'Weniger Punkte nennen als gefordert',
                'Zusammenhänge erklären, obwohl nur genannt werden soll'
            ]
        },
        {
            id: 'beschreiben',
            name: 'Beschreiben',
            afb: 1,
            definition: 'Sachverhalte, Situationen oder Zusammenhänge mit eigenen Worten strukturiert und sachlich wiedergeben.',
            expectation: 'Du sollst einen Sachverhalt detailliert darstellen, ohne ihn zu bewerten. Nutze eigene Worte, aber bleibe sachlich und objektiv.',
            example: 'Beschreiben Sie den Ablauf der Französischen Revolution von 1789 bis 1794.',
            tips: [
                'Strukturiere chronologisch oder thematisch',
                'Verwende Fachbegriffe korrekt',
                'Bleibe sachlich - keine Bewertungen',
                'W-Fragen helfen: Was? Wer? Wann? Wo? Wie?'
            ],
            mistakes: [
                'Eigene Meinung einbringen',
                'Zu oberflächlich bleiben',
                'Wichtige Details auslassen',
                'Unstrukturiert schreiben'
            ]
        },
        {
            id: 'zusammenfassen',
            name: 'Zusammenfassen',
            afb: 1,
            definition: 'Die wesentlichen Inhalte eines Textes oder Materials in verkürzter Form wiedergeben.',
            expectation: 'Du sollst die Kernaussagen eines Textes erfassen und in eigenen Worten kurz darstellen. Unwichtige Details werden weggelassen.',
            example: 'Fassen Sie die Hauptaussagen der Quelle zur Sozialen Frage im 19. Jahrhundert zusammen.',
            tips: [
                'Lies den Text mehrmals',
                'Markiere die Hauptaussagen',
                'Formuliere in eigenen Worten',
                'Kürze radikal - nur das Wesentliche'
            ],
            mistakes: [
                'Zu viele Details übernehmen',
                'Wörtlich aus dem Text abschreiben',
                'Eigene Interpretationen hinzufügen',
                'Die Struktur des Originals ignorieren'
            ]
        },
        {
            id: 'wiedergeben',
            name: 'Wiedergeben',
            afb: 1,
            definition: 'Inhalte aus Materialien oder eigenem Wissen sachlich und strukturiert darstellen.',
            expectation: 'Ähnlich wie Beschreiben - du stellst Informationen dar, ohne eigene Wertungen hinzuzufügen.',
            example: 'Geben Sie die Position Bismarcks zur Kolonialpolitik wieder.',
            tips: [
                'Halte dich eng am Material',
                'Strukturiere logisch',
                'Nutze indirekte Rede bei Meinungswiedergabe',
                'Trenne Fakten von Meinungen des Autors'
            ],
            mistakes: [
                'Eigene Meinung einfließen lassen',
                'Material falsch verstehen',
                'Zu frei interpretieren'
            ]
        },
        {
            id: 'skizzieren',
            name: 'Skizzieren',
            afb: 1,
            definition: 'Sachverhalte in Grundzügen darstellen, oft auch grafisch.',
            expectation: 'Du sollst einen Überblick geben, ohne ins Detail zu gehen. Oft wird eine vereinfachte Darstellung erwartet.',
            example: 'Skizzieren Sie die Machtverhältnisse in Europa vor dem Ersten Weltkrieg.',
            tips: [
                'Konzentriere dich auf Hauptlinien',
                'Grafische Darstellungen können helfen',
                'Keine tiefen Details erforderlich',
                'Übersichtlichkeit ist wichtig'
            ],
            mistakes: [
                'Zu detailliert werden',
                'Wichtige Grundzüge vergessen',
                'Unübersichtlich darstellen'
            ]
        }
    ],
    afb2: [
        {
            id: 'analysieren',
            name: 'Analysieren / Untersuchen',
            afb: 2,
            definition: 'Materialien oder Sachverhalte systematisch untersuchen und in ihre Bestandteile zerlegen.',
            expectation: 'Du sollst das Material nach bestimmten Kriterien untersuchen, Zusammenhänge erkennen und die Struktur offenlegen. Die Ergebnisse werden geordnet dargestellt.',
            example: 'Analysieren Sie die Propaganda-Plakate der NS-Zeit hinsichtlich ihrer Bildsprache und Wirkungsabsicht.',
            tips: [
                'Gehe systematisch vor',
                'Nutze Analysekategorien (z.B. Autor, Adressat, Absicht)',
                'Belege deine Aussagen mit Textstellen',
                'Trenne Beschreibung von Deutung'
            ],
            mistakes: [
                'Unsystematisch vorgehen',
                'Nur beschreiben statt analysieren',
                'Keine Belege aus dem Material',
                'Bewertung statt Analyse'
            ]
        },
        {
            id: 'erklaeren',
            name: 'Erklären',
            afb: 2,
            definition: 'Sachverhalte durch Wissen über Zusammenhänge, Ursachen und Folgen verständlich machen.',
            expectation: 'Du sollst Zusammenhänge aufzeigen und begründen, WARUM etwas so ist. Es geht um Ursache-Wirkungs-Beziehungen.',
            example: 'Erklären Sie, warum die Weimarer Republik scheiterte.',
            tips: [
                'Nenne Ursachen und Wirkungen',
                'Zeige Zusammenhänge auf',
                'Nutze Konnektoren: weil, daher, deshalb, folglich',
                'Strukturiere nach Ursachen/Folgen'
            ],
            mistakes: [
                'Nur beschreiben statt erklären',
                'Keine Begründungen liefern',
                'Zusammenhänge nicht deutlich machen'
            ]
        },
        {
            id: 'einordnen',
            name: 'Einordnen / Zuordnen',
            afb: 2,
            definition: 'Einen Sachverhalt in einen größeren historischen Zusammenhang stellen.',
            expectation: 'Du sollst zeigen, wie ein Ereignis oder eine Quelle in den historischen Kontext passt. Verbindungen zu anderen Ereignissen herstellen.',
            example: 'Ordnen Sie die Märzrevolution 1848 in den europäischen Kontext ein.',
            tips: [
                'Beschreibe zuerst den größeren Kontext',
                'Zeige Verbindungen auf',
                'Nenne zeitgleiche Ereignisse',
                'Erkläre die Bedeutung im Gesamtzusammenhang'
            ],
            mistakes: [
                'Nur das Ereignis selbst beschreiben',
                'Keinen Kontext liefern',
                'Verbindungen nicht klar machen'
            ]
        },
        {
            id: 'vergleichen',
            name: 'Vergleichen / Gegenüberstellen',
            afb: 2,
            definition: 'Gemeinsamkeiten und Unterschiede zwischen Sachverhalten oder Positionen herausarbeiten.',
            expectation: 'Du sollst systematisch Gemeinsamkeiten UND Unterschiede benennen. Ein Vergleich braucht Kriterien.',
            example: 'Vergleichen Sie die Herrschaftssysteme von Absolutismus und konstitutioneller Monarchie.',
            tips: [
                'Lege Vergleichskriterien fest',
                'Strukturiere: erst Kriterium, dann beide Seiten',
                'Nenne explizit Gemeinsamkeiten UND Unterschiede',
                'Abschließendes Fazit formulieren'
            ],
            mistakes: [
                'Nur einen Aspekt beschreiben',
                'Keine klaren Kriterien haben',
                'Nur Unterschiede ODER nur Gemeinsamkeiten nennen'
            ]
        },
        {
            id: 'herausarbeiten',
            name: 'Herausarbeiten',
            afb: 2,
            definition: 'Aus Materialien bestimmte Informationen oder Positionen ermitteln und darstellen.',
            expectation: 'Du sollst aus einem Text oder Material die relevanten Informationen "herausholen" und strukturiert präsentieren.',
            example: 'Arbeiten Sie die Argumentation des Autors zur Kriegsschuldfrage heraus.',
            tips: [
                'Lies das Material genau',
                'Identifiziere die Kernaussagen',
                'Strukturiere nach Argumenten/Thesen',
                'Belege mit Textstellen'
            ],
            mistakes: [
                'Zu oberflächlich lesen',
                'Eigene Meinung einbringen',
                'Wichtige Aspekte übersehen'
            ]
        },
        {
            id: 'charakterisieren',
            name: 'Charakterisieren',
            afb: 2,
            definition: 'Personen, Epochen oder Sachverhalte mit ihren typischen Merkmalen darstellen.',
            expectation: 'Du sollst die wesentlichen, typischen Eigenschaften herausarbeiten, die etwas ausmachen.',
            example: 'Charakterisieren Sie die Politik Napoleons.',
            tips: [
                'Konzentriere dich auf typische Merkmale',
                'Nenne prägnante Eigenschaften',
                'Belege mit Beispielen',
                'Strukturiere thematisch'
            ],
            mistakes: [
                'Zu allgemein bleiben',
                'Nur Fakten aufzählen ohne Typisches zu benennen',
                'Bewertungen statt Charakterisierung'
            ]
        },
        {
            id: 'eroertern',
            name: 'Erörtern',
            afb: 2,
            definition: 'Eine Fragestellung oder These unter Abwägung verschiedener Gesichtspunkte untersuchen und zu einem begründeten Ergebnis kommen.',
            expectation: 'Du sollst Pro- und Contra-Argumente sammeln, abwägen und zu einem eigenen, begründeten Urteil kommen.',
            example: 'Erörtern Sie, ob die Revolution von 1848 gescheitert ist.',
            tips: [
                'Sammle Pro- und Contra-Argumente',
                'Gewichte die Argumente',
                'Strukturiere: These - Argumente - Fazit',
                'Komme zu einem begründeten Schluss'
            ],
            mistakes: [
                'Nur eine Seite betrachten',
                'Kein eigenes Urteil formulieren',
                'Argumente nicht abwägen'
            ]
        }
    ],
    afb3: [
        {
            id: 'beurteilen',
            name: 'Beurteilen',
            afb: 3,
            definition: 'Zu einem Sachverhalt ein selbstständiges, begründetes Urteil unter Verwendung von Fachwissen formulieren.',
            expectation: 'Du sollst mit historischen Maßstäben bewerten. Dein Urteil muss nachvollziehbar begründet sein.',
            example: 'Beurteilen Sie die Außenpolitik Wilhelms II.',
            tips: [
                'Lege Beurteilungskriterien fest',
                'Nutze historische Maßstäbe (nicht heutige!)',
                'Begründe dein Urteil ausführlich',
                'Berücksichtige verschiedene Perspektiven'
            ],
            mistakes: [
                'Moralische statt historische Maßstäbe',
                'Keine Begründung für das Urteil',
                'Nur beschreiben statt beurteilen'
            ]
        },
        {
            id: 'bewerten',
            name: 'Bewerten',
            afb: 3,
            definition: 'Ähnlich wie Beurteilen, aber oft mit stärkerem Bezug zu heutigen Wertmaßstäben.',
            expectation: 'Du sollst zu einer begründeten Einschätzung kommen, die auch gegenwärtige Perspektiven einbeziehen kann.',
            example: 'Bewerten Sie die Bedeutung der Menschenrechtserklärung von 1789 für heute.',
            tips: [
                'Heutige Maßstäbe dürfen einfließen',
                'Zeige Relevanz für die Gegenwart',
                'Begründe deine Bewertung',
                'Berücksichtige verschiedene Perspektiven'
            ],
            mistakes: [
                'Nur beschreiben',
                'Urteil nicht begründen',
                'Einseitige Betrachtung'
            ]
        },
        {
            id: 'stellung-nehmen',
            name: 'Stellung nehmen',
            afb: 3,
            definition: 'Zu einer These oder einem Problem eine eigene, begründete Position entwickeln.',
            expectation: 'Du sollst deine eigene Meinung darlegen, aber diese MUSS gut begründet und argumentativ gestützt sein.',
            example: 'Nehmen Sie Stellung zur These, dass der Versailler Vertrag den Zweiten Weltkrieg verursacht hat.',
            tips: [
                'Formuliere eine klare Position',
                'Begründe mit Argumenten und Belegen',
                'Gehe auf Gegenargumente ein',
                'Zeige, dass du abgewogen hast'
            ],
            mistakes: [
                'Keine klare Position beziehen',
                'Meinung ohne Begründung',
                'Gegenargumente ignorieren'
            ]
        },
        {
            id: 'diskutieren',
            name: 'Diskutieren',
            afb: 3,
            definition: 'Eine strittige Frage aus verschiedenen Perspektiven betrachten und abwägend erörtern.',
            expectation: 'Du sollst verschiedene Standpunkte darstellen, gegeneinander abwägen und zu einem differenzierten Ergebnis kommen.',
            example: 'Diskutieren Sie die Frage, ob Bismarck ein Nationalist oder ein Realpolitiker war.',
            tips: [
                'Stelle verschiedene Positionen dar',
                'Wäge Argumente gegeneinander ab',
                'Bleibe differenziert',
                'Komme zu einem ausgewogenen Fazit'
            ],
            mistakes: [
                'Nur eine Position vertreten',
                'Keine Abwägung vornehmen',
                'Zu vereinfachend urteilen'
            ]
        },
        {
            id: 'gestalten',
            name: 'Gestalten / Entwerfen',
            afb: 3,
            definition: 'Eine kreative, historisch fundierte Darstellung erstellen.',
            expectation: 'Du sollst z.B. eine Rede, einen Brief oder Dialog aus historischer Perspektive verfassen. Kreativität mit historischer Korrektheit verbinden.',
            example: 'Entwerfen Sie eine Rede, die ein Arbeiter 1848 in der Paulskirche hätte halten können.',
            tips: [
                'Versetze dich in die historische Person',
                'Nutze zeitgenössische Sprache und Argumente',
                'Bleibe historisch korrekt',
                'Zeige Perspektivübernahme'
            ],
            mistakes: [
                'Anachronismen (moderne Begriffe/Ideen)',
                'Historisch unpassend argumentieren',
                'Die Perspektive nicht halten'
            ]
        },
        {
            id: 'entwickeln',
            name: 'Entwickeln',
            afb: 3,
            definition: 'Eigene Gedanken, Thesen oder Lösungsansätze auf Basis des Materials formulieren.',
            expectation: 'Du sollst eigenständig weiterdenken und neue Ideen oder Zusammenhänge aufzeigen.',
            example: 'Entwickeln Sie Thesen zur Frage, welche Lehren aus der Geschichte des Nationalsozialismus zu ziehen sind.',
            tips: [
                'Baue auf dem Material auf',
                'Denke eigenständig weiter',
                'Formuliere klare Thesen',
                'Begründe deine Ideen'
            ],
            mistakes: [
                'Nur Material wiedergeben',
                'Keine eigenen Gedanken',
                'Thesen nicht begründen'
            ]
        },
        {
            id: 'ueberpruefen',
            name: 'Überprüfen / Prüfen',
            afb: 3,
            definition: 'Eine Aussage, These oder Darstellung an Fakten oder anderen Quellen messen.',
            expectation: 'Du sollst kritisch prüfen, ob eine Behauptung stimmt, indem du sie mit Fakten oder anderen Quellen vergleichst.',
            example: 'Überprüfen Sie die These, dass die Dolchstoßlegende historisch begründet war.',
            tips: [
                'Identifiziere die zu prüfende These',
                'Sammle Fakten und Belege',
                'Vergleiche These mit Belegen',
                'Komme zu einem begründeten Ergebnis'
            ],
            mistakes: [
                'These nur wiedergeben',
                'Keine Belege für Prüfung',
                'Zu oberflächlich prüfen'
            ]
        }
    ]
};

// ===== LERNSTRATEGIEN DATENBANK =====
// Effektivitäts-Bewertung (1-5) nach Dunlosky et al. (2013) und verwandter Lernforschung:
//   5 = Sehr effektiv  | 4 = Effektiv  | 3 = Mittel  | 2 = Hilfreich  | 1 = Eher schwach
// Wird in loadStrategies() für das Schaubild verwendet.
const LEARNING_STRATEGIES = [
    {
        id: 'pomodoro',
        effectiveness: 3,
        name: 'Pomodoro-Technik',
        icon: '🍅',
        category: 'Zeitmanagement',
        shortDesc: 'Arbeite in fokussierten 25-Minuten-Blöcken mit kurzen Pausen.',
        fullDesc: 'Die Pomodoro-Technik teilt Lernzeit in 25-Minuten-Blöcke (Pomodoros) mit 5-Minuten-Pausen. Nach vier Pomodoros folgt eine längere Pause von 15-30 Minuten.',
        steps: [
            'Wähle eine Aufgabe aus',
            'Stelle den Timer auf 25 Minuten',
            'Arbeite konzentriert bis der Timer klingelt',
            'Mache 5 Minuten Pause',
            'Nach 4 Pomodoros: 15-30 Minuten Pause'
        ],
        benefits: [
            'Verbesserte Konzentration',
            'Weniger Prokrastination',
            'Besseres Zeitgefühl',
            'Regelmäßige Erholung'
        ],
        historyTip: 'Nutze jeden Pomodoro für ein Thema, z.B. "Ursachen des WW1" oder "Französische Revolution - Akteure".'
    },
    {
        id: 'spaced-repetition',
        effectiveness: 5,
        name: 'Verteiltes Lernen',
        icon: '📅',
        category: 'Gedächtnis',
        shortDesc: 'Wiederhole Inhalte in zunehmenden Zeitabständen.',
        fullDesc: 'Statt alles auf einmal zu lernen, verteilst du den Stoff über mehrere Tage. Die Abstände zwischen Wiederholungen werden größer. Nutze die adaptive Lernsession, um dir einen optimalen Lernplan zu erstellen.',
        steps: [
            'Lerne neuen Stoff',
            'Wiederhole nach 1 Tag',
            'Wiederhole nach 3 Tagen',
            'Wiederhole nach 1 Woche',
            'Wiederhole nach 2 Wochen'
        ],
        benefits: [
            'Besseres Langzeitgedächtnis',
            'Effizientere Lernzeit',
            'Weniger Vergessen',
            'Nachhaltigeres Wissen'
        ],
        historyTip: 'Erstelle einen Lernplan über die adaptive Lernsession (z. B. Montag neue Epoche, Dienstag Wiederholung, Freitag erneute Wiederholung).'
    },
    {
        id: 'active-recall',
        effectiveness: 5,
        name: 'Aktives Erinnern',
        icon: '🧠',
        category: 'Gedächtnis',
        shortDesc: 'Teste dich selbst, statt nur zu lesen.',
        fullDesc: 'Statt passiv zu lesen, versuchst du aktiv, Informationen aus dem Gedächtnis abzurufen. Das stärkt die Verbindungen im Gehirn.',
        steps: [
            'Lies einen Abschnitt',
            'Schließe das Buch',
            'Schreibe auf, was du erinnerst',
            'Vergleiche mit dem Original',
            'Wiederhole schwierige Punkte'
        ],
        benefits: [
            'Stärkere Gedächtnisspur',
            'Bessere Prüfungsvorbereitung',
            'Schnelleres Lernen',
            'Erkennen von Wissenslücken'
        ],
        historyTip: 'Nach dem Lesen über die Französische Revolution: Schreibe ohne Hilfsmittel alle Ereignisse auf, die dir einfallen.'
    },
    {
        id: 'mind-mapping',
        effectiveness: 3,
        name: 'Mind-Mapping',
        icon: '🗺️',
        category: 'Visualisierung',
        shortDesc: 'Visualisiere Zusammenhänge in einer Gedankenkarte.',
        fullDesc: 'Eine Mind-Map stellt Informationen als verzweigtes Netzwerk dar. In der Mitte steht das Hauptthema, davon gehen Äste mit Unterthemen ab.',
        steps: [
            'Schreibe das Hauptthema in die Mitte',
            'Zeichne Hauptäste für Unterthemen',
            'Füge Zweige für Details hinzu',
            'Nutze Farben und Symbole',
            'Verbinde zusammenhängende Punkte'
        ],
        benefits: [
            'Überblick über komplexe Themen',
            'Erkennen von Zusammenhängen',
            'Kreative Strukturierung',
            'Leichter zu merken'
        ],
        historyTip: 'Erstelle eine Mind-Map zu "Ursachen des Ersten Weltkriegs" mit Ästen für Politik, Wirtschaft, Militär, Nationalismus.'
    },
    {
        id: 'feynman',
        effectiveness: 4,
        name: 'Feynman-Technik',
        icon: '👨‍🏫',
        category: 'Verständnis',
        shortDesc: 'Erkläre komplexe Themen so einfach wie möglich.',
        fullDesc: 'Benannt nach dem Physiker Richard Feynman: Wenn du etwas nicht einfach erklären kannst, hast du es nicht verstanden.',
        steps: [
            'Wähle ein Konzept',
            'Erkläre es, als wäre dein Zuhörer 12 Jahre alt',
            'Identifiziere Lücken in deiner Erklärung',
            'Geh zurück zum Material',
            'Vereinfache und nutze Analogien'
        ],
        benefits: [
            'Tieferes Verständnis',
            'Erkennen von Wissenslücken',
            'Besseres Erklären können',
            'Komplexes wird einfach'
        ],
        historyTip: 'Erkläre die "Ständegesellschaft" so, dass ein Grundschüler es versteht. Nutze Vergleiche aus dem Alltag.'
    },
    {
        id: 'loci',
        effectiveness: 2,
        name: 'Loci-Methode',
        icon: '🏛️',
        category: 'Mnemotechnik',
        shortDesc: 'Verknüpfe Informationen mit Orten in deiner Vorstellung.',
        fullDesc: 'Die Loci-Methode (auch Gedächtnispalast) verknüpft Lerninhalte mit bekannten Orten. Du "gehst" mental durch diese Orte und erinnerst dich.',
        steps: [
            'Wähle einen bekannten Ort (dein Haus)',
            'Definiere eine Route durch diesen Ort',
            'Platziere Lerninhalte an markanten Punkten',
            'Stelle dir lebhafte Bilder vor',
            'Gehe die Route mental durch'
        ],
        benefits: [
            'Reihenfolgen merken',
            'Große Mengen speichern',
            'Langfristiges Behalten',
            'Macht Spaß'
        ],
        historyTip: 'Die Stationen der Französischen Revolution als Rundgang durch deine Wohnung: Bastille am Eingang, Menschenrechte im Wohnzimmer...'
    },
    {
        id: 'chunking',
        effectiveness: 3,
        name: 'Chunking',
        icon: '📦',
        category: 'Organisation',
        shortDesc: 'Teile große Informationsmengen in kleine Einheiten.',
        fullDesc: 'Das Gehirn kann nur 5-9 Einheiten gleichzeitig behalten. Chunking fasst Informationen zu sinnvollen Gruppen zusammen.',
        steps: [
            'Sammle alle Informationen',
            'Suche nach Mustern oder Gemeinsamkeiten',
            'Gruppiere zusammengehörige Infos',
            'Gib jeder Gruppe einen Namen',
            'Lerne Gruppen statt Einzelheiten'
        ],
        benefits: [
            'Mehr Informationen merken',
            'Bessere Organisation',
            'Schnellerer Abruf',
            'Weniger Überforderung'
        ],
        historyTip: 'Gruppiere Ereignisse: "Revolutionen 1848" (Deutschland, Frankreich, Österreich) statt einzelne Daten.'
    },
    {
        id: 'elaboration',
        effectiveness: 4,
        name: 'Elaboration',
        icon: '🔗',
        category: 'Verständnis',
        shortDesc: 'Verknüpfe neues Wissen mit bereits Bekanntem.',
        fullDesc: 'Neue Informationen werden besser behalten, wenn du sie mit vorhandenem Wissen verbindest. Stelle Fragen wie "Warum?" und "Wie hängt das zusammen?"',
        steps: [
            'Lies neue Information',
            'Frage: Was weiß ich schon darüber?',
            'Suche Verbindungen zu anderen Themen',
            'Stelle "Warum?"-Fragen',
            'Erkläre Zusammenhänge'
        ],
        benefits: [
            'Tieferes Verständnis',
            'Besseres Behalten',
            'Vernetztes Wissen',
            'Leichterer Abruf'
        ],
        historyTip: 'Verbinde die Industrialisierung mit der Französischen Revolution: Welche Ideen wurden übernommen? Was war anders?'
    },
    {
        id: 'sq3r',
        effectiveness: 3,
        name: 'SQ3R-Methode',
        icon: '📖',
        category: 'Lesen',
        shortDesc: 'Systematisch Texte lesen und verstehen.',
        fullDesc: 'SQ3R steht für Survey (Überblick), Question (Fragen), Read (Lesen), Recite (Wiedergeben), Review (Überprüfen).',
        steps: [
            'Survey: Überfliege den Text (Überschriften, Bilder)',
            'Question: Formuliere Fragen zum Text',
            'Read: Lies aufmerksam und suche Antworten',
            'Recite: Gib das Gelesene wieder',
            'Review: Wiederhole und überprüfe'
        ],
        benefits: [
            'Strukturiertes Lesen',
            'Besseres Textverständnis',
            'Aktive Auseinandersetzung',
            'Nachhaltigeres Lernen'
        ],
        historyTip: 'Vor einem Kapitel über den Dreißigjährigen Krieg: Überschriften lesen, Fragen formulieren, dann erst detailliert lesen.'
    },
    {
        id: 'dual-coding',
        effectiveness: 4,
        name: 'Dual Coding',
        icon: '🖼️',
        category: 'Visualisierung',
        shortDesc: 'Kombiniere Text und Bilder für besseres Lernen.',
        fullDesc: 'Das Gehirn verarbeitet visuelle und verbale Informationen getrennt. Wenn beides kombiniert wird, entstehen stärkere Erinnerungen.',
        steps: [
            'Lies den Text',
            'Erstelle ein passendes Bild oder Diagramm',
            'Verbinde Bild mit Schlüsselwörtern',
            'Zeichne beim Wiederholen aus dem Gedächtnis',
            'Vergleiche mit dem Original'
        ],
        benefits: [
            'Doppelte Gedächtnisspur',
            'Besseres Verständnis',
            'Leichterer Abruf',
            'Kreatives Lernen'
        ],
        historyTip: 'Zeichne die Verfassung der Weimarer Republik als Schaubild mit Reichstag, Reichspräsident, Reichsregierung.'
    },
    {
        id: 'interleaving',
        effectiveness: 4,
        name: 'Interleaving',
        icon: '🔀',
        category: 'Organisation',
        shortDesc: 'Wechsle zwischen verschiedenen Themen ab.',
        fullDesc: 'Statt ein Thema komplett abzuschließen, wechselst du zwischen verschiedenen Themen. Das ist anfangs schwieriger, aber effektiver.',
        steps: [
            'Wähle 2-3 verschiedene Themen',
            'Lerne 20-30 Minuten Thema A',
            'Wechsle zu Thema B',
            'Dann zu Thema C',
            'Wiederhole den Zyklus'
        ],
        benefits: [
            'Bessere Unterscheidung',
            'Flexibleres Wissen',
            'Besserer Transfer',
            'Langfristig effektiver'
        ],
        historyTip: 'Wechsle zwischen Französischer Revolution, Wiener Kongress und Industrialisierung - erkenne die Zusammenhänge!'
    },
    {
        id: 'cornell',
        name: 'Cornell-Methode',
        icon: '📝',
        category: 'Notizen',
        shortDesc: 'Strukturierte Notizen für besseres Lernen.',
        fullDesc: 'Teile dein Blatt in drei Bereiche: Notizen (rechts), Schlüsselwörter (links), Zusammenfassung (unten).',
        steps: [
            'Teile das Blatt in 3 Bereiche',
            'Schreibe Notizen rechts während des Lernens',
            'Ergänze links Schlüsselwörter danach',
            'Schreibe unten eine kurze Zusammenfassung',
            'Wiederhole mit den Schlüsselwörtern'
        ],
        benefits: [
            'Aktives Mitschreiben',
            'Gute Wiederholungsgrundlage',
            'Wichtiges hervorgehoben',
            'Zusammenfassungen üben'
        ],
        historyTip: 'Notizen zur NS-Zeit: Rechts die Fakten, links Begriffe wie "Machtergreifung", "Gleichschaltung", unten das Wichtigste.'
    }
];

// ===== ZEITSTRAHL EVENTS =====
// ===== TIMELINE EVENTS MIT KONTINUIERLICHEM ZOOM =====
// minZoom: Je höher, desto näher muss man ranzoomen um das Event zu sehen
// 1.0 = Nur Epochen sichtbar, keine Events!
// 1.8-2.5 = Wichtigste Events (bei leichtem Zoom)
// 3.0-5.0 = Mittlere Events
// 6.0+ = Details (nur bei starkem Zoom)

const TIMELINE_EVENTS = [
    // ========== MITTELALTER (800-1500) ==========
    {
        grade: 8,
        year: 800,
        title: 'Karl d. Große Kaiser',
        minZoom: 2.0,
        description: 'Papst Leo III. krönt Karl den Großen am Weihnachtstag zum Kaiser.',
        details: 'Diese Krönung in Rom legte den Grundstein für die Idee eines christlichen Abendlandes, in dem geistliche und weltliche Macht eng miteinander verknüpft waren. Karl herrschte über ein riesiges Reich, das weite Teile Europas umfasste, und förderte Bildung und Kirche. Sein Reich gilt als Vorläufer der späteren europäischen Nationen.'
    },
    {
        grade: 8,
        year: 843,
        title: 'Vertrag von Verdun',
        minZoom: 5.0,
        description: 'Karls Enkel teilen das Frankenreich in drei eigenständige Reiche auf.',
        details: 'Mit dem Vertrag von Verdun wurde das mächtige Frankenreich aufgespalten – in ein westliches, ein östliches und ein mittleres Reich. Diese Teilung gilt als Geburtsstunde der späteren Staaten Frankreich, Deutschland und Italien. Damit begann die eigenständige Geschichte der deutschsprachigen Länder.'
    },
    {
        grade: 8,
        year: 962,
        title: 'Otto I. Kaiser',
        minZoom: 3.0,
        description: 'Otto I. wird in Rom zum Kaiser gekrönt und begründet das Heilige Römische Reich.',
        details: 'Mit dieser Krönung entstand das Heilige Römische Reich Deutscher Nation, das über 800 Jahre lang Bestand haben sollte. Otto verband die Herrschaft über deutsche und italienische Gebiete und machte die Verbindung von Kirche und Kaisertum zu einem zentralen Merkmal seiner Herrschaft. Das Reich wurde zur prägenden politischen Größe Mitteleuropas.'
    },
    {
        grade: 8,
        year: 1077,
        title: 'Gang nach Canossa',
        minZoom: 4.0,
        description: 'Kaiser Heinrich IV. steht drei Tage barfuß im Schnee vor Papst Gregor VII.',
        details: 'Im sogenannten Investiturstreit, also dem Kampf um die Frage, wer Bischöfe einsetzen darf, musste der mächtige Kaiser demütig um Verzeihung bitten. Dieser Moment zeigt eindrucksvoll, wie groß die Macht des Papstes im Mittelalter war. Der Begriff „nach Canossa gehen" ist bis heute ein Ausdruck für eine öffentliche Unterwerfung geblieben.'
    },
    {
        grade: 8,
        year: 1096,
        title: 'Erster Kreuzzug',
        minZoom: 3.5,
        description: 'Papst Urban II. ruft das christliche Europa zum bewaffneten Zug ins Heilige Land.',
        details: 'Hunderttausende Ritter und Pilger machten sich auf den gefährlichen Weg nach Jerusalem, das sie 1099 eroberten. Die Kreuzzüge prägten das Verhältnis zwischen Christentum und Islam für Jahrhunderte und sind bis heute ein Symbol für religiös motivierte Gewalt. Sie führten aber auch zu einem intensiveren kulturellen und wirtschaftlichen Austausch zwischen Orient und Okzident.'
    },
    {
        grade: 8,
        year: 1122,
        title: 'Wormser Konkordat',
        minZoom: 6.0,
        description: 'Kaiser und Papst einigen sich im langen Investiturstreit auf einen Kompromiss.',
        details: 'Nach jahrzehntelangem Streit wurde festgelegt, dass der Papst Bischöfe geistlich einsetzt, der Kaiser aber beim weltlichen Teil mitwirken darf. Dieser Kompromiss beendete einen der größten Konflikte des Mittelalters und regelte das Verhältnis von Kirche und Staat neu. Er zeigte, dass auch mächtige Institutionen miteinander verhandeln konnten.'
    },
    {
        grade: 8,
        year: 1215,
        title: 'Magna Carta',
        minZoom: 4.0,
        description: 'Der englische König muss seinen Adeligen zum ersten Mal Rechte schriftlich zusichern.',
        details: 'König Johann Ohneland war gezwungen, die Magna Carta zu unterzeichnen – ein Dokument, das die Macht des Königs einschränkte und bestimmte Rechte für den Adel festlegte. Obwohl es zunächst nur für Adlige galt, wurde die Magna Carta zur Grundlage der englischen Verfassungstradition und inspirierte spätere Demokraten weltweit. Sie gilt als frühes Zeichen dafür, dass Herrscher nicht uneingeschränkt regieren dürfen.'
    },
    {
        grade: 8,
        year: 1347,
        title: 'Die Pest',
        minZoom: 2.0,
        description: 'Der Schwarze Tod erreicht Europa und tötet etwa ein Drittel der Bevölkerung.',
        details: 'Die Beulenpest breitete sich rasend schnell aus und verwandelte ganze Städte in Geisterstädte. Die sozialen und wirtschaftlichen Folgen waren verheerend: Arbeitskräfte fehlten, alte Ordnungen brachen zusammen, und viele Menschen wandten sich von der Kirche ab, weil Gebete nicht halfen. Die Pest veränderte Europa nachhaltig und trieb das Mittelalter in eine tiefe Krise.'
    },
    {
        grade: 8,
        year: 1453,
        title: 'Fall Konstantinopels',
        minZoom: 3.0,
        description: 'Die osmanischen Türken erobern die tausendjährige Hauptstadt des Byzantinischen Reiches.',
        details: 'Mit der Einnahme Konstantinopels endete das Oströmische Reich, das über tausend Jahre Bestand gehabt hatte. Viele byzantinische Gelehrte flohen mit ihren Büchern und Handschriften nach Westeuropa und beflügelten damit die Renaissance. Für die Osmanen war der Sieg der Beginn ihrer Herrschaft über weite Teile Südosteuropas.'
    },
    {
        grade: 8,
        year: 1455,
        title: 'Gutenberg-Bibel',
        minZoom: 5.0,
        description: 'Johannes Gutenberg druckt die erste Bibel mit beweglichen Lettern.',
        details: 'Der Buchdruck war eine der folgenreichsten Erfindungen der Geschichte, denn er machte Wissen plötzlich für viel mehr Menschen zugänglich. Bücher wurden günstiger und verbreiteten sich schneller, was Bildung und kritisches Denken förderte. Ohne Gutenbergs Erfindung hätte die Reformation von Martin Luther wohl nie so schnell ganz Europa erfasst.'
    },

    // ========== FRÜHE NEUZEIT (1500-1789) ==========
    {
        grade: 8,
        year: 1492,
        title: 'Kolumbus in Amerika',
        minZoom: 2.0,
        description: 'Christoph Kolumbus landet in der Karibik und eröffnet das Zeitalter der Entdeckungen.',
        details: 'Für die Europäer war es ein Aufbruch in eine unbekannte Welt, für die Menschen Amerikas bedeutete es Katastrophe: Millionen starben durch eingeschleppte Krankheiten und Gewalt. Europa profitierte enorm von Gold, Silber und neuen Nahrungspflanzen wie Kartoffeln und Mais. Der Kolonialismus, der hier begann, prägte die Welt bis heute.'
    },
    {
        grade: 8,
        year: 1517,
        title: 'Reformation',
        minZoom: 1.8,
        description: 'Martin Luther veröffentlicht 95 Thesen und erschüttert die katholische Kirche.',
        details: 'Luther kritisierte den Ablasshandel, bei dem man sich buchstäblich von Sünden freikaufen konnte, als Betrug am einfachen Volk. Dank des Buchdrucks verbreiteten sich seine Ideen blitzschnell durch ganz Europa. Die Reformation spaltete die Kirche dauerhaft in Katholiken und Protestanten und löste Jahrzehnte religioser Konflikte aus.'
    },
    {
        grade: 8,
        year: 1519,
        title: 'Cortés in Mexiko',
        minZoom: 6.0,
        description: 'Hernán Cortés beginnt mit wenigen Soldaten die Eroberung des mächtigen Aztekenreiches.',
        details: 'Mit Tricks, Bündnissen mit Feinden der Azteken und dem Schock seiner Waffen besiegte Cortés das riesige Reich von Kaiser Moctezuma. Innerhalb weniger Jahre war das Aztekenreich vernichtet und Mexiko zur spanischen Kolonie geworden. Millionen indigener Menschen starben durch Krieg, Sklaverei und vor allem durch eingeschleppte europäische Krankheiten.'
    },
    {
        grade: 8,
        year: 1521,
        title: 'Luther in Worms',
        minZoom: 4.5,
        description: 'Luther verweigert vor Kaiser und Reichstag den Widerruf seiner Lehren.',
        details: 'Vor dem Reichstag in Worms sollte Luther seine Schriften widerrufen – doch er weigerte sich standhaft mit den Worten: „Hier stehe ich, ich kann nicht anders." Er wurde daraufhin geächtet, also für vogelfrei erklärt, aber Kurfürst Friedrich der Weise ließ ihn in Sicherheit auf der Wartburg bringen. Dort übersetzte Luther die Bibel ins Deutsche und machte sie dem Volk zugänglich.'
    },
    {
        grade: 8,
        year: 1534,
        title: 'Jesuitenorden',
        minZoom: 6.5,
        description: 'Ignatius von Loyola gründet den Orden der Jesuiten als Antwort auf die Reformation.',
        details: 'Die Jesuiten wurden zur wichtigsten Kraft der Gegenreformation, also der katholischen Erneuerungsbewegung. Mit exzellenter Bildung, strenger Disziplin und Missionstätigkeit in aller Welt kämpften sie für den Erhalt des Katholizismus. Ihre Schulen prägten die Bildung in vielen Ländern für Jahrhunderte.'
    },
    {
        grade: 8,
        year: 1545,
        title: 'Konzil von Trient',
        minZoom: 5.5,
        description: 'Die katholische Kirche erneuert sich auf dem Konzil von Trient von innen heraus.',
        details: 'Als Antwort auf Luthers Kritik reformierte die Kirche sich selbst: Missstände wurden beseitigt, Glaubensgrundsätze klar definiert und das Bildungswesen gestärkt. Das Konzil markierte den Beginn der Gegenreformation und stärkte die Kirche wieder erheblich. Es legte den Grundstein für das moderne Katholizismus.'
    },
    {
        grade: 8,
        year: 1555,
        title: 'Augsburger Religionsfrieden',
        minZoom: 4.0,
        description: 'Katholiken und Lutheraner werden im Reich erstmals rechtlich gleichgestellt.',
        details: 'Der Grundsatz „Cuius regio, eius religio" bedeutete: Der Landesherr bestimmt, welche Religion in seinem Gebiet gilt. Das war zwar keine Religionsfreiheit für den Einzelnen, aber es beendete die unmittelbaren Religionskriege im Reich. Erstmals in der Geschichte wurden zwei verschiedene Konfessionen offiziell anerkannt.'
    },
    {
        grade: 8,
        year: 1588,
        title: 'Spanische Armada',
        minZoom: 6.0,
        description: 'Englands Flotte zerstört Spaniens unbesiegbar geglaubte Armada.',
        details: 'König Philipp II. von Spanien schickte eine riesige Flotte, um England zu erobern – doch Stürme und englische Seefahrer zerstörten sie. Spanien verlor damit seinen Ruf als unbesiegbare Seemacht, während England seinen Aufstieg zur führenden Seefahrernation begann. Dieser Sieg gab England das Selbstbewusstsein, eine eigene Kolonialmacht zu werden.'
    },
    {
        grade: 8,
        year: 1590,
        title: 'Hexenverfolgung',
        minZoom: 4.5,
        description: 'Die Hexenverfolgung erreicht in Mitteleuropa ihren grausamen Höhepunkt.',
        details: 'Vor allem im 16. und 17. Jahrhundert wurden in Europa zehntausende Menschen (meist Frauen) als Hexen angeklagt, gefoltert und verbrannt. Der Hexenwahn wurde durch religiöse Ängste und Krisen im Zuge der Reformation und des Dreißigjährigen Krieges befeuert.'
    },
    {
        grade: 8,
        year: 1618,
        title: 'Dreißigjähriger Krieg',
        minZoom: 2.0,
        description: 'Der Prager Fenstersturz zündet den Funken für einen verheerenden europäischen Krieg.',
        details: 'Was als Streit zwischen böhmischen Protestanten und dem habsburgischen Kaiser begann, wurde zu einem dreißigjährigen Flächenbrand, in den fast ganz Europa hineingezogen wurde. Deutschland wurde besonders stark verwüstet – ganze Landstriche entvölkerten sich durch Kämpfe, Hunger und Seuchen. Teile Deutschlands verloren bis zu einem Drittel ihrer Bevölkerung.'
    },
    {
        grade: 8,
        year: 1648,
        title: 'Westfälischer Frieden',
        minZoom: 2.0,
        description: 'Der Westfälische Frieden beendet den Dreißigjährigen Krieg und ordnet Europa neu.',
        details: 'Nach jahrelangen Verhandlungen wurde ein Frieden geschlossen, der Deutschland in über 300 Einzelstaaten zersplittert zurückließ. Gleichzeitig entstand das moderne Staatensystem Europas, in dem Souveränität und Nichteinmischung zu Grundprinzipien wurden. Religiöse Toleranz zwischen Katholiken, Lutheranern und Reformierten wurde erstmals vertraglich gesichert.'
    },
    {
        grade: 8,
        year: 1649,
        title: 'Hinrichtung Karl I.',
        minZoom: 5.0,
        description: 'König Karl I. von England wird öffentlich hingerichtet – ein Tabubruch ohne Vorbild.',
        details: 'Nach einem blutigen Bürgerkrieg zwischen König und Parlament wurde Karl I. vor Gericht gestellt und zum Tode verurteilt. Dieses Ereignis erschütterte ganz Europa, denn ein König, der als Gottes Stellvertreter galt, wurde von seinem eigenen Volk enthauptet. England wurde danach kurzzeitig zur Republik unter Oliver Cromwell.'
    },
    {
        grade: 8,
        year: 1660,
        title: 'Restauration England',
        minZoom: 6.5,
        description: 'Nach Cromwells Tod kehrt die Monarchie nach England zurück.',
        details: 'Karl II. bestieg den englischen Thron und stellte die Monarchie wieder her – aber die Zeit ohne König hatte das politische Bewusstsein verändert. Das Parlament war stärker geworden und ließ sich nicht mehr vollständig zurückdrängen. England bewegte sich schrittweise auf eine konstitutionelle Monarchie zu.'
    },
    {
        grade: 8,
        year: 1683,
        title: 'Belagerung Wiens',
        minZoom: 5.0,
        description: 'Ein polnisch-deutsches Entsatzheer schlägt die osmanischen Belagerer vor Wien.',
        details: 'Das Osmanische Reich hatte Wien belagert und wäre fast erfolgreich gewesen – doch ein Entsatzheer unter dem polnischen König Jan Sobieski wendete das Blatt. Diese Niederlage markierte den Beginn des langen osmanischen Rückzugs aus Europa. Für Wien und das Habsburgerreich war es eine Rettung in letzter Sekunde.'
    },
    {
        grade: 8,
        year: 1689,
        title: 'Bill of Rights',
        minZoom: 3.5,
        description: 'Englands Parlament sichert sich mit der Bill of Rights dauerhafte Rechte gegenüber der Krone.',
        details: 'Nach der Glorious Revolution, bei der Wilhelm von Oranien ohne Blutvergießen den englischen Thron übernahm, musste er die Bill of Rights unterzeichnen. Sie garantierte Redefreiheit im Parlament, freie Wahlen und schränkte die Macht des Königs erheblich ein. Dieses Dokument wurde zum Vorbild für spätere Verfassungen und Menschenrechtserklärungen.'
    },
    {
        grade: 8,
        year: 1701,
        title: 'Preußen Königreich',
        minZoom: 5.5,
        description: 'Friedrich I. krönt sich selbst zum König in Preußen und begründet eine neue Großmacht.',
        details: 'Der Kurfürst von Brandenburg setzte sich in Königsberg eigenhändig die Krone auf – ein bewusster Akt, der seine Unabhängigkeit von Kaiser und Papst betonte. Preußen begann damit seinen Aufstieg von einem kleinen Herzogtum zur europäischen Großmacht. Dieser Aufstieg sollte die Geschichte Deutschlands für die nächsten 250 Jahre bestimmen.'
    },
    {
        grade: 8,
        year: 1740,
        title: 'Friedrich II. König',
        minZoom: 4.5,
        description: 'Friedrich der Große übernimmt Preußens Thron und macht es zur führenden deutschen Macht.',
        details: 'Der „Alte Fritz" war eine widersprüchliche Persönlichkeit: philosophisch gebildet und Freund Voltaires, aber auch skrupelloser Militärstratege, der Schlesien von Österreich raubte. Unter seiner Herrschaft wurde Preußen zu einer anerkannten Großmacht, die Österreich das Gleichgewicht hielt. Sein aufgeklärter Absolutismus – „Ich bin der erste Diener des Staates" – blieb ein berühmtes Zitat.'
    },
    {
        grade: 8,
        year: 1756,
        title: 'Siebenjähriger Krieg',
        minZoom: 4.0,
        description: 'Der Siebenjährige Krieg ist der erste wirklich weltumspannende Konflikt der Geschichte.',
        details: 'Auf fünf Kontinenten kämpften Europas Mächte gegeneinander: Preußen behauptete sich gegen Österreich, Frankreich und Russland, während England und Frankreich in Amerika, Indien und Afrika um Kolonien stritten. Preußen überstand den Krieg mit knapper Not, England wurde zur Weltmacht. Für Amerika legte der Krieg den Keim zur Unabhängigkeitsbewegung.'
    },
    {
        grade: 8,
        year: 1769,
        title: 'Watts Dampfmaschine',
        minZoom: 3.0,
        description: 'James Watt verbessert die Dampfmaschine so grundlegend, dass sie industriell nutzbar wird.',
        details: 'Watts Dampfmaschine war nicht die erste, aber die erste wirklich effiziente – sie verbrauchte viel weniger Kohle und war vielseitig einsetzbar. Damit wurde sie zum zentralen Motor der Industriellen Revolution: Fabriken, Eisenbahnen und Dampfschiffe wurden möglich. Die Art, wie Menschen arbeiteten und lebten, veränderte sich grundlegend.'
    },
    {
        grade: 8,
        year: 1776,
        title: 'Unabhängigkeit USA',
        minZoom: 2.5,
        description: 'Die 13 amerikanischen Kolonien erklären sich von England für unabhängig.',
        details: 'Die Unabhängigkeitserklärung vom 4. Juli 1776 proklamierte, dass alle Menschen gleich geschaffen seien und unveräußerliche Rechte hätten. Das war eine revolutionäre Idee, die Aufklärer in Europa begeisterte und die Französische Revolution mitbeeinflusste. Die USA wurden zur ersten modernen Demokratie der Welt.'
    },

    // ========== FRANZÖSISCHE REVOLUTION & NAPOLEON ==========
    {
        grade: 8,
        year: 1789,
        title: 'Franz. Revolution',
        minZoom: 1.8,
        description: 'Das französische Volk stürmt die Bastille und läutet eine neue Epoche ein.',
        details: 'Die Französische Revolution beseitigte den Absolutismus und proklamierte die Ideale Freiheit, Gleichheit und Brüderlichkeit. Alte Privilegien des Adels und der Kirche wurden abgeschafft, und zum ersten Mal erhob das Volk Anspruch auf politische Mitbestimmung. Diese Ereignisse veränderten Europa und die Welt grundlegend und gelten als Beginn der modernen Geschichte.'
    },
    {
        grade: 8,
        year: 1791,
        title: 'Verfassung Frankreich',
        minZoom: 5.5,
        description: 'Frankreich erhält seine erste schriftliche Verfassung und wird konstitutionelle Monarchie.',
        details: 'Die Verfassung von 1791 begrenzte die Macht des Königs durch ein gewähltes Parlament und garantierte grundlegende Bürgerrechte. Damit wurde Frankreich zur konstitutionellen Monarchie – der König regierte noch, aber nicht mehr unbeschränkt. Es war ein erster Schritt, der zeigt, wie die Revolution anfangs moderate Ziele verfolgte.'
    },
    {
        grade: 8,
        year: 1792,
        title: 'Republik Frankreich',
        minZoom: 4.5,
        description: 'Die Monarchie wird abgeschafft und Frankreich zur Republik ausgerufen.',
        details: 'Als König Ludwig XVI. des Verrats verdächtig wurde und ausländische Armeen Frankreich bedrohten, radikalisierte sich die Revolution. Die Nationalversammlung schaffte die Monarchie ab und rief die Republik aus. Damit begann eine Phase der Radikalisierung, die in den Schrecken der Terrorherrschaft gipfeln sollte.'
    },
    {
        grade: 8,
        year: 1793,
        title: 'Terrorherrschaft',
        minZoom: 3.5,
        description: 'Robespierre und die Jakobiner regieren Frankreich mit dem Fallbeil.',
        details: 'Im Namen von Freiheit und Tugend wurden Tausende Menschen guillotiniert, darunter König Ludwig XVI. und Königin Marie Antoinette. Wer als Feind der Revolution galt, lebte in tödlicher Gefahr – auch ehemalige Revolutionäre. Diese Phase zeigt, wie Revolutionen in Gewalt und Willkür umschlagen können.'
    },
    {
        grade: 8,
        year: 1794,
        title: 'Ende Robespierres',
        minZoom: 6.0,
        description: 'Robespierre wird von seinen eigenen Mitstreitern verhaftet und guillotiniert.',
        details: 'Als Robespierre plante, weitere Mitglieder des Konvents hinrichten zu lassen, wendeten sie sich gegen ihn. Am 9. Thermidor (27. Juli) wurde er verhaftet und am nächsten Tag hingerichtet. Die Terrorherrschaft endete abrupt, und Frankreich bewegte sich unter dem Direktorium auf gemäßigtere Bahnen.'
    },
    {
        grade: 8,
        year: 1799,
        title: 'Napoleons Putsch',
        minZoom: 3.5,
        description: 'Napoleon Bonaparte greift durch einen Staatsstreich die Macht in Frankreich.',
        details: 'Am 18. Brumaire (9. November) putschte Napoleon das schwache Direktorium weg und machte sich zum Ersten Konsul. Die meisten Franzosen begrüßten das: Nach Jahren der Instabilität sehnte man sich nach Ordnung und starker Führung. Napoleon versprach, die Errungenschaften der Revolution zu sichern und Frieden zu bringen.'
    },
    {
        grade: 8,
        year: 1804,
        title: 'Napoleon Kaiser',
        minZoom: 2.0,
        description: 'Napoleon krönt sich selbst zum Kaiser der Franzosen in Notre-Dame.',
        details: 'Indem Napoleon die Krone aus den Händen des Papstes nahm und sie sich selbst aufsetzte, machte er deutlich, dass seine Macht von niemandem außer ihm selbst stammte. Als Kaiser modernisierte er Frankreich grundlegend mit dem Code Civil, einem einheitlichen Gesetzbuch, das Gleichheit vor dem Gesetz sicherte. Napoleons Herrschaft verband revolutionäre Ideen mit monarchischer Macht.'
    },
    {
        grade: 8,
        year: 1805,
        title: 'Schlacht bei Austerlitz',
        minZoom: 5.0,
        description: 'Napoleon besiegt die Armeen Österreichs und Russlands in seiner brillantesten Schlacht.',
        details: 'Die „Dreikaiserschlacht" bei Austerlitz gilt als Napoleons militärisches Meisterwerk. Er täuschte den Feind, schwächte absichtlich seinen rechten Flügel und schlug dann mit der Mitte durch. Nach diesem Sieg war Napoleon auf dem Höhepunkt seiner Macht und diktierte Österreich harte Friedensbedingungen.'
    },
    {
        grade: 8,
        year: 1806,
        title: 'Ende des HRR',
        minZoom: 2.0,
        description: 'Kaiser Franz II. legt die Krone des Heiligen Römischen Reiches nieder.',
        details: 'Nach über 800 Jahren hörte das Heilige Römische Reich Deutscher Nation auf zu existieren. Napoleon hatte die deutschen Fürsten in seinem Rheinbund zusammengefasst und Franz II. gezwungen, die Kaiserwürde abzulegen. Deutschland war nun ein Flickenteppich von 36 Einzelstaaten ohne gemeinsame politische Führung.'
    },
    {
        grade: 8,
        year: 1807,
        title: 'Kontinentalsperre',
        minZoom: 5.5,
        description: 'Napoleon verbietet ganz Europa den Handel mit England, um es wirtschaftlich zu besiegen.',
        details: 'Da er England nicht militärisch besiegen konnte, versuchte Napoleon es durch eine Wirtschaftsblockade zu erdrosseln. Alle europäischen Länder mussten mitmachen – doch das schadete auch Napoleons Verbündeten. Als Russland die Sperre nicht mehr mittragen wollte, war das einer der Gründe für den verheerenden Russlandfeldzug.'
    },
    {
        grade: 8,
        year: 1812,
        title: 'Russlandfeldzug',
        minZoom: 3.5,
        description: 'Napoleons Grande Armée marschiert nach Russland und wird dort vernichtet.',
        details: 'Mit 600.000 Soldaten begann Napoleon den Feldzug gegen Russland, doch die Russen wich en immer weiter zurück und verbrannten alles hinter sich. Moskau stand in Flammen, und der russische Winter traf die unvorbereitete Armee mit voller Wucht. Von den 600.000 Soldaten kehrten weniger als 100.000 lebend zurück – Napoleons Macht war gebrochen.'
    },
    {
        grade: 8,
        year: 1813,
        title: 'Völkerschlacht Leipzig',
        minZoom: 2.5,
        description: 'Preußen, Österreich und Russland besiegen Napoleon in der größten Schlacht der Geschichte.',
        details: 'Vier Tage lang kämpften über 500.000 Soldaten bei Leipzig – mehr als in jeder anderen Schlacht bis dahin. Die Koalition aus Preußen, Österreich, Russland und Schweden umzingelte Napoleons Armee und zwang ihn zum Rückzug. Diese entscheidende Niederlage bedeutete das Ende von Napoleons Herrschaft über Deutschland.'
    },
    {
        grade: 8,
        year: 1814,
        title: 'Verbannung Elba',
        minZoom: 6.0,
        description: 'Nach seiner Abdankung wird Napoleon auf die Mittelmeerinsel Elba verbannt.',
        details: 'Die siegreichen Mächte ließen Napoleon zwar überleben, verbannten ihn aber auf die kleine Insel Elba, wo er als nomineller Herrscher residierte. Doch Napoleon war nicht der Typ, um ruhig auf einer Insel zu sitzen. Bereits nach zehn Monaten floh er und kehrte nach Frankreich zurück – für die Hundert Tage seiner letzten Herrschaft.'
    },
    {
        grade: 8,
        year: 1815,
        title: 'Waterloo',
        minZoom: 4.0,
        description: 'Wellington und Blücher schlagen Napoleon bei Waterloo endgültig.',
        details: 'Bei Waterloo in Belgien vereinten sich die britische Armee unter Wellington und die preußische unter Blücher, um Napoleon ein letztes Mal zu besiegen. Die Niederlage war vernichtend, und Napoleon wurde diesmal auf die ferne Insel St. Helena im Südatlantik verbannt, aus der es keine Rückkehr gab. Dort starb er 1821.'
    },
    {
        grade: 8,
        year: 1815,
        title: 'Wiener Kongress',
        minZoom: 1.8,
        description: 'Europas Mächte ordnen nach Napoleon auf dem Wiener Kongress den Kontinent neu.',
        details: 'Unter der Führung des österreichischen Diplomaten Metternich wurde Europa auf dem Kongress neu aufgeteilt: Alte Dynastien kehrten zurück, Grenzen wurden gezogen und ein System des Gleichgewichts der Mächte sollte künftige Kriege verhindern. Die Idee nationaler Einheit und liberaler Freiheiten wurde bewusst zurückgedrängt – was Spannungen schuf, die in den Revolutionen von 1848 explodierten.'
    },

    // ========== VORMÄRZ & REVOLUTION 1848 ==========
    {
        grade: 8,
        year: 1817,
        title: 'Wartburgfest',
        minZoom: 3.5,
        description: 'Studenten aus ganz Deutschland versammeln sich auf der Wartburg und fordern Einheit.',
        details: 'Auf der Wartburg, dem Ort, an dem Luther die Bibel übersetzt hatte, kamen Burschenschafter zusammen und forderten ein freies, geeintes Deutschland. Sie verbrannten symbolisch Bücher und Schriften, die sie als reaktionär empfanden. Metternich sah darin eine gefährliche Bedrohung und reagierte mit verschärfter Überwachung und Zensur.'
    },
    {
        grade: 8,
        year: 1819,
        title: 'Karlsbader Beschlüsse',
        minZoom: 5.5,
        description: 'Metternich setzt strenge Zensur und Überwachung an deutschen Universitäten durch.',
        details: 'Nach der Ermordung des Schriftstellers Kotzebue durch einen Studenten nutzte Metternich die Gunst der Stunde: Die Karlsbader Beschlüsse führten Zensur für alle Druckerzeugnisse ein, die Universitäten wurden überwacht, und Burschenschaften wurden verboten. Diese Repression dämpfte die Freiheitsbewegung, konnte sie aber nicht dauerhaft aufhalten.'
    },
    {
        grade: 8,
        year: 1830,
        title: 'Juli-Revolution',
        minZoom: 4.5,
        description: 'Die Pariser Juli-Revolution löst eine Welle von Aufständen in ganz Europa aus.',
        details: 'Als König Karl X. in Frankreich versuchte, die Presse zu knebeln und die Macht des Parlaments zu beschneiden, erhob sich Paris. Der Funke sprang über: In Polen, Belgien und einigen deutschen Staaten kam es zu Unruhen. Belgien erlangte sogar seine Unabhängigkeit. Die Reaktion zeigte, dass sie die Freiheitsbewegungen nicht dauerhaft unterdrücken konnte.'
    },
    {
        grade: 8,
        year: 1832,
        title: 'Hambacher Fest',
        minZoom: 2.5,
        description: 'Dreißigtausend Menschen versammeln sich am Hambacher Schloss für Freiheit und Einheit.',
        details: 'Das Hambacher Fest war die größte politische Demonstration, die Deutschland bis dahin erlebt hatte. Bürger, Handwerker und Studenten schwangen Schwarz-Rot-Gold, die Farben der Einheitsbewegung. Die Obrigkeit reagierte mit verschärfter Repression, aber die Sehnsucht nach einem freien, geeinten Deutschland ließ sich nicht mehr aufhalten.'
    },
    {
        grade: 8,
        year: 1835,
        title: 'Erste dt. Eisenbahn',
        minZoom: 2.5,
        description: 'Die Lokomotive „Adler" befährt die erste deutsche Eisenbahnstrecke von Nürnberg nach Fürth.',
        details: 'Was zunächst wie eine Kuriosität wirkte, wurde zum Symbol einer neuen Zeit: Die Eisenbahn verband Städte, beschleunigte den Handel und trieb die Industrialisierung voran. Innerhalb weniger Jahrzehnte überzog ein Schienennetz Deutschland und veränderte die Wirtschaft und das Leben der Menschen grundlegend. Die Eisenbahn war der Beschleuniger der industriellen Revolution.'
    },
    {
        grade: 8,
        year: 1844,
        title: 'Weberaufstand',
        minZoom: 5.0,
        description: 'Schlesische Weber erheben sich gegen Hunger und Ausbeutung durch die Fabrikanten.',
        details: 'Die Weber der schlesischen Gebirgsregion hatten durch die Konkurrenz billig hergestellter Fabrikstoffe ihre Einnahmen verloren und lebten in bitterer Armut. Ihr verzweifelter Aufstand wurde brutal niedergeschlagen, zeigte aber zum ersten Mal, dass die „soziale Frage" – die Armut der entstehenden Arbeiterklasse – zur zentralen politischen Herausforderung des Industriezeitalters werden würde.'
    },
    {
        grade: 8,
        year: 1848,
        title: 'Märzrevolution',
        minZoom: 1.8,
        description: 'Revolutionäre Barrikadenkämpfe erschüttern Berlin und ganz Deutschland.',
        details: 'Von der Februarrevolution in Paris inspiriert, erhoben sich Menschen in Wien, Berlin und vielen deutschen Städten. Sie forderten Pressefreiheit, Volksvertretungen und die deutsche Einheit. Das Frankfurter Paulskirchen-Parlament tagte als erste gesamtdeutsche Nationalversammlung – ein historischer Moment, auch wenn die Revolution letztlich scheiterte.'
    },
    {
        grade: 8,
        year: 1848,
        title: 'Kommunist. Manifest',
        minZoom: 4.0,
        description: 'Karl Marx und Friedrich Engels rufen im Kommunistischen Manifest zur Revolution auf.',
        details: 'Das Manifest erschien genau zur Zeit der europäischen Revolutionen und analysierte die Gesellschaft als Klassenkampf zwischen Bourgeoisie und Proletariat. Der letzte Satz – „Proletarier aller Länder, vereinigt euch!" – wurde zum meistzitierten politischen Aufruf der Geschichte. Es legte den Grundstein für die sozialistischen und kommunistischen Bewegungen des 20. Jahrhunderts.'
    },
    {
        grade: 8,
        year: 1849,
        title: 'Revolution scheitert',
        minZoom: 3.5,
        description: 'Friedrich Wilhelm IV. lehnt die deutsche Kaiserkrone ab und zerschlägt die Revolution.',
        details: 'Das Paulskirchen-Parlament hatte mühsam eine Verfassung ausgearbeitet und Friedrich Wilhelm IV. die Kaiserkrone angeboten – doch er lehnte verächtlich ab, weil sie „aus der Gosse" stammte, also vom Volk und nicht von Gottes Gnaden. Die Revolution wurde niedergeschlagen, Demokraten flohen ins Ausland, und Deutschland blieb zersplittert. Die Einheit musste auf anderem Weg kommen.'
    },
    {
        grade: 8,
        year: 1850,
        title: 'Hochindustrialisierung',
        minZoom: 3.0,
        description: 'Deutschland wandelt sich in rasantem Tempo zur Industrienation.',
        details: 'In der zweiten Hälfte des 19. Jahrhunderts schossen Fabriken aus dem Boden, Städte wuchsen explosionsartig an, und Millionen Menschen verließen das Land, um in den Fabriken zu arbeiten. Die Lebensbedingungen der Arbeiter waren oft erbärmlich: lange Arbeitszeiten, gefährliche Bedingungen, Kinderarbeit. Aus diesem sozialen Elend erwuchs die organisierte Arbeiterbewegung.'
    },

    // ========== DEUTSCHE EINIGUNG ==========
    {
        grade: 8,
        year: 1861,
        title: 'Wilhelm I. König',
        minZoom: 5.5,
        description: 'Wilhelm I. wird König von Preußen und beruft bald darauf Bismarck als Minister.',
        details: 'Wilhelm I. war ein konservativer Militärmann, der fest entschlossen war, die Macht der Krone gegen das Parlament zu verteidigen. Als er in einen Streit über die Heeresreform geriet, berief er Otto von Bismarck zum Ministerpräsidenten – eine Entscheidung, die die Geschichte Deutschlands für Jahrzehnte prägen sollte. Zusammen führten sie Preußen und Deutschland zur Einigung.'
    },
    {
        grade: 8,
        year: 1862,
        title: 'Bismarck Minister',
        minZoom: 2.5,
        description: 'Bismarck wird Ministerpräsident und kündigt an, Fragen durch „Eisen und Blut" zu lösen.',
        details: 'Otto von Bismarck war ein Meister der Realpolitik, der bereit war, alle Mittel einzusetzen, um seine Ziele zu erreichen. Seine berühmte Rede, in der er erklärte, die großen Fragen der Zeit würden nicht durch Reden, sondern durch „Eisen und Blut" entschieden, schockierte das liberale Bürgertum. Genau so handelte er: Drei Kriege führten zur deutschen Einigung unter preußischer Führung.'
    },
    {
        grade: 8,
        year: 1863,
        title: 'Gründung ADAV',
        minZoom: 4.0,
        description: 'Ferdinand Lassalle gründet die erste deutsche Arbeiterpartei.',
        details: 'Der Allgemeine Deutsche Arbeiterverein war die erste politische Organisation, die sich ausdrücklich für die Rechte der Arbeiterklasse einsetzte. Lassalle forderte das allgemeine Wahlrecht und staatliche Unterstützung für Arbeitergenossenschaften. Obwohl der ADAV noch klein war, legte er den Grundstein für die spätere Sozialdemokratische Partei.'
    },
    {
        grade: 8,
        year: 1864,
        title: 'Dt.-Dänischer Krieg',
        minZoom: 5.0,
        description: 'Preußen und Österreich erkämpfen gemeinsam die Herzogtümer Schleswig und Holstein.',
        details: 'Im ersten von Bismarcks drei Einigungskriegen besiegten Preußen und Österreich Dänemark und gewannen die umstrittenen Herzogtümer. Dieser Krieg zeigte Bismarcks Fähigkeit, Österreich zunächst als Verbündeten einzubinden – und später gegen es zu wenden. Schleswig-Holstein wurde zum Streitpunkt, der den nächsten Krieg vorbereitete.'
    },
    {
        grade: 8,
        year: 1866,
        title: 'Deutscher Krieg',
        minZoom: 3.5,
        description: 'Preußen besiegt Österreich bei Königgrätz und übernimmt die Führung in Deutschland.',
        details: 'Nach nur sieben Wochen Krieg besiegte Preußen Österreich bei Königgrätz so überzeugend, dass Österreich für immer aus der deutschen Politik ausschied. Bismarck verzichtete bewusst auf übermäßige Demütigung Österreichs, um es als möglichen Verbündeten zu erhalten. Preußen übernahm nun die Führung über die norddeutschen Staaten.'
    },
    {
        grade: 8,
        year: 1867,
        title: 'Norddeutscher Bund',
        minZoom: 5.5,
        description: 'Preußen fasst die norddeutschen Staaten zum Norddeutschen Bund zusammen.',
        details: 'Nach dem Sieg über Österreich gründete Bismarck den Norddeutschen Bund als politisches Gebilde unter preußischer Führung. Die süddeutschen Staaten Bayern, Württemberg und Baden blieben noch außen vor, unterhielten aber enge wirtschaftliche und militärische Verbindungen. Der Norddeutsche Bund war die unmittelbare Vorstufe zum Deutschen Kaiserreich.'
    },
    {
        grade: 8,
        year: 1869,
        title: 'Gründung SDAP',
        minZoom: 4.5,
        description: 'August Bebel und Wilhelm Liebknecht gründen die Sozialdemokratische Arbeiterpartei.',
        details: 'Die SDAP war radikaler als Lassalles ADAV und stellte sich ausdrücklich auf den Boden des Marxismus. Sie forderte die Überwindung des kapitalistischen Systems und die Befreiung der Arbeiterklasse. 1875 vereinten sich ADAV und SDAP zur Sozialistischen Arbeiterpartei, dem direkten Vorläufer der heutigen SPD.'
    },
    {
        grade: 8,
        year: 1870,
        title: 'Dt.-Franz. Krieg',
        minZoom: 2.0,
        description: 'Bismarck provoziert Frankreich in den Krieg und schweißt die deutschen Staaten zusammen.',
        details: 'Die von Bismarck manipulierte Emser Depesche beleidigte Frankreich so, dass es den Krieg erklärte – genau wie Bismarck es geplant hatte. Der gemeinsame Kampf gegen den Erbfeind Frankreich brachte die süddeutschen Staaten ins preußische Lager. Kaiser Napoleon III. wurde bei Sedan gefangen genommen, Paris belagert, und das Kaiserreich stand unmittelbar bevor.'
    },
    {
        grade: 8,
        year: 1871,
        title: 'Reichsgründung',
        minZoom: 1.8,
        description: 'Im Spiegelsaal von Versailles wird das Deutsche Kaiserreich ausgerufen.',
        details: 'Am 18. Januar 1871 wurde Wilhelm I. im Herzstück der französischen Macht zum deutschen Kaiser proklamiert – eine bewusste Demütigung für Frankreich. Deutschland war endlich geeint, aber von oben, durch Kriege und Diplomatie, nicht durch eine Volksbewegung. Das Reich war ein konservatives Gebilde, das demokratische Kräfte einzubinden versuchte, ohne ihnen wirkliche Macht zu geben.'
    },
    {
        grade: 8,
        year: 1873,
        title: 'Gründerkrise',
        minZoom: 6.0,
        description: 'Nach dem Gründerboom platzt eine riesige Spekulationsblase und stürzt Deutschland in die Krise.',
        details: 'Die Milliarden aus den französischen Kriegsentschädigungen hatten eine Welle von Unternehmensgründungen und Spekulationen ausgelöst. Als die Blase 1873 platzte, verloren viele ihr gesamtes Vermögen, und eine lang anhaltende Wirtschaftskrise begann. Die Krise stärkte antisemitische Vorurteile, da jüdische Banker fälschlicherweise als Schuldige ausgemacht wurden.'
    },
    {
        grade: 8,
        year: 1878,
        title: 'Sozialistengesetze',
        minZoom: 2.5,
        description: 'Bismarck lässt nach Attentaten auf den Kaiser alle sozialistischen Organisationen verbieten.',
        details: 'Nach zwei Attentaten auf Kaiser Wilhelm I. nutzte Bismarck die Gelegenheit, um die aufstrebende Sozialdemokratie zu bekämpfen. Sozialistische Parteien, Vereine und Zeitungen wurden verboten. Die SPD-Mitglieder wurden verfolgt und mussten im Untergrund arbeiten. Ironischerweise machte dies die Partei nur populärer, und bei der Aufhebung der Gesetze 1890 war die SPD stärker als je zuvor.'
    },
    {
        grade: 8,
        year: 1883,
        title: 'Sozialversicherung',
        minZoom: 2.0,
        description: 'Bismarck führt die erste staatliche Krankenversicherung der Welt ein.',
        details: 'Mit Kranken-, Unfall- und Altersversicherung schuf Bismarck ein soziales Sicherungsnetz, das es in dieser Form noch nirgends gegeben hatte. Er nannte es das „Zuckerbrot" neben der „Peitsche" der Sozialistengesetze – er wollte den Arbeitern zeigen, dass der Staat für sie sorgte, ohne ihnen politische Macht geben zu müssen. Deutschland wurde damit zum Pionier des modernen Sozialstaats.'
    },
    {
        grade: 8,
        year: 1884,
        title: 'Berliner Konferenz',
        minZoom: 2.0,
        description: 'Europas Großmächte teilen auf der Berliner Konferenz Afrika unter sich auf.',
        details: 'Ohne einen einzigen Afrikaner einzuladen, zogen die europäischen Mächte mit dem Lineal Grenzen durch den Kontinent und verteilten ihn unter sich. Völker wurden auseinandergerissen oder unter eine Herrschaft gezwungen, obwohl sie keine Gemeinsamkeiten hatten. Der Kolonialismus dieser Epoche hinterließ Wunden, die bis heute spürbar sind.'
    },
    {
        grade: 8,
        year: 1888,
        title: 'Dreikaiserjahr',
        minZoom: 6.0,
        description: 'Innerhalb eines Jahres sterben zwei Kaiser – am Ende thront der junge Wilhelm II.',
        details: 'Kaiser Wilhelm I. starb hochbetagt, sein Sohn Friedrich III. regierte nur 99 Tage, bevor auch er an Kehlkopfkrebs starb. Damit kam der 29-jährige Wilhelm II. an die Macht – impulsiv, ehrgeizig und entschlossen, selbst zu regieren. Der Generationenwechsel wurde zur politischen Zäsur, denn Wilhelm würde bald Bismarck entlassen und einen neuen Kurs einschlagen.'
    },
    {
        grade: 8,
        year: 1890,
        title: 'Bismarck entlassen',
        minZoom: 3.0,
        description: 'Kaiser Wilhelm II. entlässt Bismarck und will Deutschland selbst in die Weltpolitik führen.',
        details: 'Der junge Kaiser und der alte Kanzler passten nicht zusammen – Wilhelm wollte selbst regieren, Bismarck ließ sich nicht einfach zur Seite drängen. Der „Lotse verlässt das Schiff", titelte eine britische Zeitung. Ohne Bismarcks vorsichtige Außenpolitik steuerte Deutschland in das Fahrwasser aggressiver Weltmachtpolitik und Aufrüstung.'
    },
    {
        grade: 8,
        year: 1898,
        title: 'Flottengesetze',
        minZoom: 3.5,
        description: 'Admiral Tirpitz beginnt mit dem Bau einer deutschen Hochseeflotte als Herausforderung Englands.',
        details: 'Wilhelm II. träumte von einem „Platz an der Sonne" für Deutschland und brauchte dafür eine starke Flotte. Die Flottengesetze lösten ein massives Wettrüsten mit England aus, das sich durch die deutsche Flotte bedroht fühlte. Diese Rivalität war einer der wichtigsten Faktoren, die England in das Lager der Gegner Deutschlands trieben und den Ersten Weltkrieg mitverursachten.'
    },

    // ========== ERSTER WELTKRIEG ==========
    {
        grade: 8,
        year: 1905,
        title: 'Erste Marokkokrise',
        minZoom: 6.5,
        description: 'Deutschland provoziert Frankreich in Marokko und verschärft die europäischen Spannungen.',
        details: 'Kaiser Wilhelm II. landete demonstrativ in Tanger und bestand auf deutschen Interessen in Marokko, das Frankreich als seinen Einflussbereich betrachtete. Deutschland wollte die Entente zwischen Frankreich und England testen und spalten – doch das Gegenteil trat ein: Die Krise schweißte die beiden Länder noch enger zusammen. Es war ein frühes Zeichen für die wachsenden Spannungen, die in den Krieg führen würden.'
    },
    {
        grade: 8,
        year: 1908,
        title: 'Bosnische Krise',
        minZoom: 6.0,
        description: 'Österreich-Ungarns Annexion Bosniens macht den Balkan zum gefährlichsten Fleck Europas.',
        details: 'Als Österreich-Ungarn Bosnien annektierte, war Serbien empört und sah sich in seinen nationalen Interessen verletzt. Russland, das sich als Schutzmacht der Slawen verstand, war gedemütigt, weil es zu schwach war, einzugreifen. Die Krise zeigte, dass der Balkan ein Pulverfass war, an dem nur ein Funke fehlte – und dieser Funke kam 1914 in Sarajevo.'
    },
    {
        grade: 8,
        year: 1914,
        title: 'Attentat Sarajevo',
        minZoom: 3.5,
        description: 'Gavrilo Princip erschießt den österreichischen Thronfolger Franz Ferdinand in Sarajevo.',
        details: 'Das Attentat war der Auslöser, aber nicht die eigentliche Ursache des Krieges. Österreich-Ungarn stellte Serbien ein Ultimatum, Russland mobilisierte zur Unterstützung Serbiens, Deutschland erklärte daraufhin Russland und Frankreich den Krieg. Der komplizierte Bündnismechanismus, der Europa sicherer machen sollte, zog in wenigen Wochen den ganzen Kontinent in den Krieg.'
    },
    {
        grade: 8,
        year: 1914,
        title: 'Erster Weltkrieg',
        minZoom: 1.8,
        description: 'Europa stürzt sich in einen industriellen Massenkrieg, den niemand in dieser Form erwartet hatte.',
        details: 'Millionen Soldaten zogen voller Begeisterung in den Krieg, überzeugt, zu Weihnachten wieder zu Hause zu sein. Stattdessen wurden sie in einen zermürbenden Stellungskrieg gezogen, in dem modernes Industriezeitalter und traditionelle Kriegsführung aufeinanderprallten. Am Ende waren über 17 Millionen Menschen tot, und die alte politische Ordnung Europas lag in Trümmern.'
    },
    {
        grade: 8,
        year: 1914,
        title: 'Schlacht an der Marne',
        minZoom: 5.5,
        description: 'Frankreich stoppt den deutschen Vormarsch an der Marne und rettet Paris.',
        details: 'Der deutsche Schlieffen-Plan sah vor, Frankreich in wenigen Wochen zu besiegen, bevor man sich gegen Russland wenden würde. An der Marne scheiterte dieser Plan: Die Franzosen stoppten den Vormarsch, und aus dem Bewegungskrieg wurde ein starrer Stellungskrieg. Hunderte Kilometer langer Schützengräben zogen sich quer durch Frankreich und Belgien.'
    },
    {
        grade: 8,
        year: 1916,
        title: 'Schlacht Verdun',
        minZoom: 2.0,
        description: 'Zehn Monate lang kämpfen Deutsche und Franzosen um Verdun – mit hunderttausenden Toten.',
        details: 'Die deutsche Strategie war zynisch: Man wollte Frankreich „ausbluten", indem man es zwang, jeden Meter Erde zu verteidigen. Fast 700.000 Soldaten starben oder wurden verwundet – für einen Geländegewinn von wenigen Kilometern. Verdun wurde zum Symbol für die sinnlose Brutalität des Ersten Weltkriegs und bleibt bis heute ein heiliger Ort der Erinnerung für Frankreich.'
    },
    {
        grade: 8,
        year: 1916,
        title: 'Schlacht Somme',
        minZoom: 5.0,
        description: 'An der Somme erleiden die Alliierten am ersten Tag über 57.000 Verluste.',
        details: 'Die britisch-französische Offensive an der Somme sollte den Druck auf Verdun nehmen, endete aber in einem Desaster. Allein am ersten Tag, dem 1. Juli 1916, verlor die britische Armee über 57.000 Mann. Erstmals wurden auch Panzer eingesetzt, ohne den erhofften Durchbruch zu erzielen. Die Somme wurde zum Symbol des sinnlosen Massenmordens.'
    },
    {
        grade: 8,
        year: 1917,
        title: 'USA treten ein',
        minZoom: 2.5,
        description: 'Nach dem deutschen U-Boot-Krieg und der Zimmermann-Depesche erklären die USA Deutschland den Krieg.',
        details: 'Deutschland hatte gehofft, England durch rücksichtslosen U-Boot-Krieg zur Kapitulation zu zwingen, nahm dabei aber den Kriegseintritt der USA in Kauf. Die Zimmermann-Depesche, in der Deutschland Mexiko ein Bündnis gegen die USA anbot, empörte die amerikanische Öffentlichkeit. Mit den frischen amerikanischen Truppen und Ressourcen war Deutschlands Niederlage nur noch eine Frage der Zeit.'
    },
    {
        grade: 10,
        year: 1917,
        title: 'Russ. Revolution',
        minZoom: 2.0,
        description: 'Lenin und die Bolschewiki übernehmen in Russland die Macht und schließen einen Separatfrieden.',
        details: 'Zunächst stürzte die Februarrevolution den Zaren, dann putschten die Bolschewiki im Oktober die provisorische Regierung weg. Lenin versprach den erschöpften Russen Frieden, Land und Brot. Die kommunistische Machtübernahme schütterte die Welt und sollte das 20. Jahrhundert entscheidend prägen.'
    },
    {
        grade: 10,
        year: 1918,
        title: 'Vertrag Brest-Litowsk',
        minZoom: 5.5,
        description: 'Deutschland diktiert Russland einen harten Frieden und gewinnt riesige Gebiete im Osten.',
        details: 'Im Vertrag von Brest-Litowsk musste das revolutionäre Russland Deutschland und Österreich-Ungarn enorme Gebiete abtreten, darunter Polen, das Baltikum und die Ukraine. Deutschland schien am Ziel – der Zweifrontenkrieg war beendet. Doch der Sieg im Osten band viele Truppen, und im Westen konnte die letzte deutsche Offensive nicht entscheiden.'
    },
    {
        grade: 8,
        year: 1918,
        title: 'Novemberrevolution',
        minZoom: 3.5,
        description: 'Matrosenaufstand und Revolution fegen Kaiser Wilhelm II. vom Thron.',
        details: 'Als die Marineführung die Flotte zu einem aussichtslosen Angriff schicken wollte, meuterten die Matrosen in Kiel. Die Revolution erfasste schnell ganz Deutschland: Arbeiter- und Soldatenräte übernahmen die Macht in den Städten. Kaiser Wilhelm II. dankte ab und floh in die Niederlande. Deutschland war Republik – aber welche Art von Republik, darüber waren die Deutschen tief gespalten.'
    },
    {
        grade: 10,
        year: 1918,
        title: 'Kriegsende',
        minZoom: 1.8,
        description: 'Am 11. November 1918 um 11 Uhr verstummen die Waffen des Ersten Weltkriegs.',
        details: 'Nach über vier Jahren Krieg und 17 Millionen Toten war Europa erschöpft und zerstört. Die alten Kaiserreiche Deutschlands, Österreich-Ungarns, Russlands und des Osmanischen Reiches existierten nicht mehr. An ihre Stelle traten neue Nationalstaaten und der gescheiterte Versuch, eine dauerhafte Friedensordnung zu schaffen.'
    },
    {
        grade: 8,
        year: 1919,
        title: 'Versailler Vertrag',
        minZoom: 1.8,
        description: 'Die Siegermächte zwingen Deutschland im Versailler Vertrag demütigende Bedingungen auf.',
        details: 'Deutschland wurde die alleinige Kriegsschuld aufgebürdet, musste Gebiete abtreten, seine Armee auf 100.000 Mann beschränken und enorme Reparationszahlungen leisten. Viele Deutsche empfanden den Vertrag als tiefen Verrat, zumal Präsident Wilsons Vierzehn Punkte Gerechtigkeit versprochen hatten. Die Verbitterung über den „Diktatfrieden" nährte Nationalismus und Revanchismus und bereitete den Boden für Hitler.'
    },

    // ========== WEIMARER REPUBLIK ==========
    {
        grade: 8,
        year: 1919,
        title: 'Weimarer Republik',
        minZoom: 1.8,
        description: 'Deutschland erhält in Weimar seine erste demokratische Verfassung.',
        details: 'Die Weimarer Verfassung war für ihre Zeit fortschrittlich: allgemeines Wahlrecht, auch für Frauen, Grundrechte und ein parlamentarisches System. Doch die Republik war von Anfang an von Feinden umgeben – von links sahen Kommunisten sie als zu bürgerlich, von rechts lehnten Nationalisten und Monarchisten sie ab. Sie galt vielen als „Republik ohne Republikaner".'
    },
    {
        grade: 8,
        year: 1919,
        title: 'Spartakusaufstand',
        minZoom: 5.0,
        description: 'Kommunisten unter Rosa Luxemburg und Karl Liebknecht versuchen eine Räterevolution.',
        details: 'Die KPD wollte nach russischem Vorbild eine Räterepublik errichten. Der Aufstand wurde von der neuen Regierung mit Hilfe rechtsgerichteter Freikorps brutal niedergeschlagen. Rosa Luxemburg und Karl Liebknecht wurden ermordet – ein tiefer Riss zwischen SPD und KPD, der die Weimarer Republik bis zu ihrem Ende schwächen sollte.'
    },
    {
        grade: 8,
        year: 1920,
        title: 'Kapp-Putsch',
        minZoom: 4.0,
        description: 'Rechtsgerichtete Freikorps marschieren auf Berlin und scheitern an einem Generalstreik.',
        details: 'Reaktionäre Offiziere und ihre Freikorps besetzten Berlin und riefen eine neue Regierung aus. Doch die Bevölkerung antwortete mit einem spontanen Generalstreik: Nichts funktionierte mehr, und die Putschisten mussten aufgeben. Der Kapp-Putsch zeigte, wie fragil die Republik war, aber auch, dass das Volk sie notfalls aktiv verteidigen konnte.'
    },
    {
        grade: 8,
        year: 1923,
        title: 'Ruhrbesetzung',
        minZoom: 4.5,
        description: 'Frankreich besetzt das Ruhrgebiet, weil Deutschland mit Reparationszahlungen im Rückstand ist.',
        details: 'Als Deutschland Kohlelieferungen nicht wie vereinbart erbrachte, marschierten französische und belgische Truppen in das Industrieherz Deutschlands ein. Die Berliner Regierung rief zum passiven Widerstand auf und druckte massenhaft Geld, um die streikenden Arbeiter zu bezahlen. Das Ergebnis war die galoppierende Hyperinflation, die Millionen Deutsche in den Ruin trieb.'
    },
    {
        grade: 8,
        year: 1923,
        title: 'Hyperinflation',
        minZoom: 2.0,
        description: 'Die Mark wird so wertlos, dass Menschen mit Schubkarren voll Geld einkaufen gehen.',
        details: 'Im Herbst 1923 brauchte man Milliarden Mark für ein Brot – die Ersparnisse eines Lebens waren über Nacht wertlos. Wer feste Sachwerte oder Devisen besaß, konnte günstig einkaufen; wer Sparkonten oder Rentenbezüge hatte, verlor alles. Das tiefe Misstrauen gegenüber dem Geld und dem Staat, das diese Erfahrung auslöste, blieb den Deutschen noch Generationen lang.'
    },
    {
        grade: 8,
        year: 1923,
        title: 'Hitler-Putsch',
        minZoom: 3.5,
        description: 'Hitler versucht in München einen Putsch nach Mussolinis Vorbild – und scheitert.',
        details: 'Inspiriert von Mussolinis Marsch auf Rom wollte Hitler von München aus die Macht im Reich übernehmen. Doch der Putsch scheiterte kläglich: Die Polizei schoss die Putschisten auseinander, Hitler wurde verhaftet. Sein anschließender Prozess wurde ihm zur Propagandabühne, und in der Festungshaft schrieb er „Mein Kampf". Er hatte aus dem Scheitern gelernt: Die Macht musste auf legalem Weg erobert werden.'
    },
    {
        grade: 8,
        year: 1924,
        title: 'Dawes-Plan',
        minZoom: 4.5,
        description: 'Der amerikanische Dawes-Plan regelt die Reparationszahlungen neu und stabilisiert Deutschland.',
        details: 'Amerikanische Banken pumpten Kredite in die deutsche Wirtschaft, die damit die Reparationen bezahlen konnte, was wiederum England und Frankreich ermöglichte, ihre Kriegsschulden an Amerika zu begleichen. Dieses Kreislaufsystem stabilisierte kurzzeitig die Wirtschaft und leitete die „Goldenen Zwanziger" ein. Aber das System war brüchig – es zerbrach beim Börsenkrach von 1929.'
    },
    {
        grade: 8,
        year: 1925,
        title: 'Hindenburg Präsident',
        minZoom: 3.5,
        description: 'Generalfeldmarschall Hindenburg wird Reichspräsident und symbolisiert die alte Ordnung.',
        details: 'Die Wahl des greisen Kriegshelden Hindenburg zum Präsidenten zeigte, wie wenig viele Deutsche die Republik liebten. Hindenburg selbst war Monarchist und hielt die Republik für eine Notlösung. Er erfüllte seine Pflichten korrekt – bis er 1933 Hitler zum Kanzler ernannte und damit die Demokratie beendete.'
    },
    {
        grade: 8,
        year: 1926,
        title: 'Völkerbund',
        minZoom: 5.5,
        description: 'Deutschland wird in den Völkerbund aufgenommen – ein Zeichen der Normalisierung.',
        details: 'Der Eintritt in den Völkerbund war ein Symbol für Deutschlands Rückkehr in die Gemeinschaft der Nationen. Außenminister Stresemann verfolgte eine Verständigungspolitik und erhielt dafür zusammen mit dem Franzosen Briand den Friedensnobelpreis. Die Verständigung blieb jedoch fragil – die Weltwirtschaftskrise 1929 würde alles wieder in Frage stellen.'
    },
    {
        grade: 8,
        year: 1929,
        title: 'Weltwirtschaftskrise',
        minZoom: 1.8,
        description: 'Der Schwarze Freitag in New York löst eine globale Wirtschaftskrise aus.',
        details: 'Als die New Yorker Börse zusammenbrach, zogen amerikanische Banken ihre Kredite aus Deutschland ab – und damit brach die mühsam stabilisierte Wirtschaft zusammen. Sechs Millionen Arbeitslose in Deutschland bedeuteten sechs Millionen verzweifelte Menschen, die empfänglich waren für radikale politische Versprechen. Die Krise trieb Millionen in die Arme der NSDAP und der KPD.'
    },
    {
        grade: 8,
        year: 1930,
        title: 'NSDAP zweitstärkste',
        minZoom: 3.5,
        description: 'Die NSDAP wird bei den Reichstagswahlen aus dem Nichts zur zweitstärksten Partei.',
        details: 'Mit 18,3 Prozent und 107 Sitzen schoss die NSDAP in die erste Reihe der deutschen Politik – eine Sensation, die die Welt schockierte. Hitlers Propaganda, seine einfachen Antworten auf komplexe Probleme und die Abstimmung auf die Ängste der Bevölkerung in der Krise zeigten Wirkung. Die demokratischen Parteien hatten keine überzeugende Antwort.'
    },
    {
        grade: 8,
        year: 1932,
        title: 'Präsidentenwahl',
        minZoom: 5.0,
        description: 'Hindenburg wird gegen Hitler wiedergewählt, aber Hitler ist stärker als je zuvor.',
        details: 'Der 85-jährige Hindenburg, von den Demokraten als kleineres Übel unterstützt, schlug Hitler im zweiten Wahlgang. Aber Hitler hatte bewiesen, dass er ein Massenphänomen war: Fast 37 Prozent stimmten für ihn. In den folgenden Monaten trieb die politische Instabilität immer mehr konservative Kreise dazu, Hitler als kontrollierbares Mittel zum Zweck zu betrachten.'
    },
    {
        grade: 8,
        year: 1932,
        title: 'Preußenschlag',
        minZoom: 6.0,
        description: 'Die Reichsregierung setzt die demokratisch gewählte preußische Regierung gewaltsam ab.',
        details: 'Preußen mit seiner SPD-geführten Regierung war die wichtigste demokratische Bastion Deutschlands. Als Reichskanzler Papen sie per Notverordnung absetzte und durch einen Reichskommissar ersetzte, war das ein Staatsstreich, der die Demokratie untergrub. Der Vorgang zeigte, wie leicht verfassungswidrige Maßnahmen möglich waren – und gab Hitler ein Vorbild.'
    },

    // ========== NATIONALSOZIALISMUS ==========
    {
        grade: 9,
        year: 1933,
        title: 'Machtergreifung',
        minZoom: 1.8,
        description: 'Reichspräsident Hindenburg ernennt Hitler am 30. Januar zum Reichskanzler.',
        details: 'Konservative Politiker wie Papen glaubten, Hitler als Kanzler einspannen und kontrollieren zu können – ein fataler Irrtum. Hitler nutzte alle legalen Mittel, um die Demokratie von innen auszuhöhlen, und innerhalb von Monaten hatte er eine Diktatur errichtet. Der 30. Januar 1933 ist einer der dunkelsten Tage der deutschen Geschichte.'
    },
    {
        grade: 9,
        year: 1933,
        title: 'Reichstagsbrand',
        minZoom: 3.5,
        description: 'Der brennende Reichstag gibt Hitler den Vorwand, Grundrechte außer Kraft zu setzen.',
        details: 'Einen Monat nach Hitlers Ernennung brannte der Reichstag. Hitler beschuldigte sofort die Kommunisten und ließ eine Notverordnung erlassen, die alle wesentlichen Grundrechte aufhob. Tausende Kommunisten, Sozialdemokraten und andere Gegner wurden verhaftet. Ob der Brandstifter Marinus van der Lubbe allein handelte, bleibt bis heute umstritten.'
    },
    {
        grade: 9,
        year: 1933,
        title: 'Ermächtigungsgesetz',
        minZoom: 2.0,
        description: 'Das Parlament stimmt für seine eigene Entmachtung und gibt Hitler unbegrenzte Vollmachten.',
        details: 'Nur die SPD stimmte gegen das Ermächtigungsgesetz, das Hitler erlaubte, ohne das Parlament zu regieren. Viele Abgeordnete wurden durch SA-Männer im Saal eingeschüchtert, andere waren bereits verhaftet. Damit hatte die Demokratie sich selbst abgeschafft – die parlamentarische Kontrolle, die einzige Bremse gegen Hitlers Macht, war beseitigt.'
    },
    {
        grade: 9,
        year: 1933,
        title: 'Gleichschaltung',
        minZoom: 2.5,
        description: 'Alle Parteien, Gewerkschaften und Verbände werden verboten oder gleichgeschaltet.',
        details: 'In rasantem Tempo wurde Deutschland zum Einparteienstaat: Gewerkschaften wurden zerschlagen, andere Parteien verboten oder lösten sich selbst auf, die Länder verloren ihre Eigenständigkeit. Presse, Rundfunk, Schulen und Kultur wurden unter NS-Kontrolle gebracht. Wer nicht mitmachte, riskierte Verhaftung oder Schlimmeres.'
    },
    {
        grade: 9,
        year: 1933,
        title: 'Bücherverbrennung',
        minZoom: 5.0,
        description: 'Studenten verbrennen öffentlich Bücher jüdischer und missliebiger Autoren.',
        details: 'Am 10. Mai 1933 loderten auf Plätzen in deutschen Universitätsstädten Scheiterhaufen aus Büchern. Werke von Marx, Freud, Heinrich Heine und vielen anderen wurden verbrannt. Heinrich Heine hatte bereits 1820 prophetisch geschrieben: „Dort wo man Bücher verbrennt, verbrennt man am Ende auch Menschen."'
    },
    {
        grade: 9,
        year: 1934,
        title: 'Röhm-Putsch',
        minZoom: 3.5,
        description: 'Hitler lässt in der „Nacht der langen Messer" SA-Führer und andere Gegner ermorden.',
        details: 'SA-Chef Röhm wollte eine zweite Revolution und die SA zur neuen deutschen Armee machen – das passte Hitler nicht, der die Reichswehr als Stütze brauchte. In einer Nacht im Juni 1934 wurden Röhm und Dutzende SA-Führer ermordet, ebenso andere unliebsame Personen. Die SS löste die SA als wichtigste Terrororganisation ab.'
    },
    {
        grade: 9,
        year: 1934,
        title: 'Hitler "Führer"',
        minZoom: 4.0,
        description: 'Nach Hindenburgs Tod vereint Hitler Kanzler- und Präsidentenamt in seiner Person.',
        details: 'Als Hindenburg starb, schaffte Hitler das Amt des Reichspräsidenten ab und nannte sich „Führer und Reichskanzler". Die Wehrmacht schwor einen persönlichen Eid auf Hitler – nicht auf die Verfassung oder das Vaterland. Damit war die letzte institutionelle Kontrolle beseitigt, und Hitlers Macht war absolut.'
    },
    {
        grade: 9,
        year: 1935,
        title: 'Nürnberger Gesetze',
        minZoom: 2.0,
        description: 'Die Nürnberger Rassegesetze machen Juden zu Bürgern zweiter Klasse.',
        details: 'Die Gesetze entzogen deutschen Juden die Staatsbürgerschaft, verboten Ehen und sexuelle Beziehungen zwischen Juden und Nichtjuden und schufen eine bürokratische Grundlage für die Entrechtung. Was zunächst wie eine Legalisierung bestehender Diskriminierung wirkte, war der erste Schritt auf dem Weg zur Vernichtung. Wer als „Jude" galt, wurde nun exakt nach Abstammung definiert.'
    },
    {
        grade: 9,
        year: 1936,
        title: 'Rheinland besetzt',
        minZoom: 5.5,
        description: 'Deutsche Truppen marschieren ins entmilitarisierte Rheinland und brechen den Versailler Vertrag.',
        details: 'Hitler riskierte einen enormen Bluff: Die deutschen Truppen hatten Befehl, sich bei jedem Widerstand zurückzuziehen, denn sie waren noch zu schwach. Doch England und Frankreich protestierten nur und griffen nicht ein. Hitler zog die richtige Lehre: Die Westmächte wollten keinen Krieg und würden wegschauen. Das ermutigte ihn zu immer größeren Wagnissen.'
    },
    {
        grade: 9,
        year: 1936,
        title: 'Olympia Berlin',
        minZoom: 4.0,
        description: 'Deutschland präsentiert sich bei den Berliner Olympischen Spielen als friedliche Nation.',
        details: 'Leni Riefenstahl filmte die perfekte NS-Inszenierung: ein modernes, sportliches Deutschland ohne Judensterne und Gewalt. Antisemitische Schilder verschwanden für die Dauer der Spiele. Doch Jesse Owens, ein schwarzer Amerikaner, gewann vier Goldmedaillen und widerlegte damit vor aller Welt Hitlers Rassentheorie von der arischen Überlegenheit.'
    },
    {
        grade: 9,
        year: 1936,
        title: 'Achse Berlin-Rom',
        minZoom: 5.0,
        description: 'Hitler und Mussolini schließen ein Bündnis, das später zum Dreimächtepakt wird.',
        details: 'Die beiden faschistischen Diktatoren, die lange misstrauisch aufeinander geschaut hatten, verbündeten sich. Die „Achse Berlin-Rom" wurde später durch Japan zum Dreimächtepakt erweitert. Dieses Bündnis der aggressivsten Mächte stellte die demokratischen Staaten vor die Herausforderung, gemeinsam zu handeln – was ihnen lange nicht gelang.'
    },
    {
        grade: 9,
        year: 1938,
        title: 'Anschluss Österreich',
        minZoom: 3.0,
        description: 'Deutschland marschiert in Österreich ein und gliedert es dem Reich an.',
        details: 'Unter dem Druck eines deutschen Ultimatums gab die österreichische Regierung nach, und die Wehrmacht marschierte ein. Viele Österreicher jubelten – die Sehnsucht nach dem Anschluss an Deutschland war tief verwurzelt. Die Westmächte akzeptierten es stillschweigend. Das „Großdeutsche Reich" umfasste nun 80 Millionen Menschen.'
    },
    {
        grade: 9,
        year: 1938,
        title: 'Münchner Abkommen',
        minZoom: 3.5,
        description: 'England und Frankreich opfern die Tschechoslowakei, um Hitler zu beschwichtigen.',
        details: 'In München stimmten Chamberlain und Daladier der Abtretung des sudetendeutschen Gebiets zu, obwohl die Tschechoslowakei kein Mitspracherecht hatte. Chamberlain glaubte, „Frieden für unsere Zeit" gerettet zu haben, und wurde als Held gefeiert. Doch Hitler hatte längst weitere Pläne, und die Besetzung des restlichen Tschechiens ein halbes Jahr später zeigte, dass Appeasement gescheitert war.'
    },
    {
        grade: 9,
        year: 1938,
        title: 'Reichspogromnacht',
        minZoom: 2.0,
        description: 'In der Nacht vom 9. auf den 10. November brennen Synagogen in ganz Deutschland.',
        details: 'Was als spontaner Volksprotest gegen die Ermordung eines deutschen Diplomaten in Paris dargestellt wurde, war eine von der SS und SA orchestrierte Gewaltaktion. Hunderte Synagogen brannten, tausende Geschäfte wurden zerstört, fast 100 Juden sofort getötet und rund 30.000 in Konzentrationslager verschleppt. Die Reichspogromnacht war der sichtbare Beginn des organisierten Terrors gegen die jüdische Bevölkerung.'
    },
    {
        grade: 9,
        year: 1939,
        title: 'Besetzung Tschechiens',
        minZoom: 5.0,
        description: 'Hitler besetzt die Rest-Tschechei und beweist, dass seine Versprechen wertlos sind.',
        details: 'Nur ein halbes Jahr nach dem Münchner Abkommen ließ Hitler die Wehrmacht in die tschechischen Gebiete einmarschieren. Böhmen und Mähren wurden zum deutschen Protektorat. Für Chamberlain und Daladier war nun klar: Appeasement hatte versagt, und Hitler würde durch Nachgeben nicht zu stoppen sein. England und Frankreich gaben Polen Sicherheitsgarantien.'
    },
    {
        grade: 10,
        year: 1939,
        title: 'Hitler-Stalin-Pakt',
        minZoom: 4.0,
        description: 'Das kommunistische Russland und das nationalsozialistische Deutschland schließen einen Nichtangriffspakt.',
        details: 'Der Pakt schockierte die Welt, denn die beiden Diktatoren hatten sich als erbitterte Feinde dargestellt. In einem geheimen Zusatzprotokoll teilten sie Osteuropa unter sich auf: Polen, das Baltikum und Teile Rumäniens sollten ihre jeweiligen Einflusssphären werden. Für Hitler war der Pakt das grüne Licht für den Überfall auf Polen, ohne gleichzeitig gegen Russland kämpfen zu müssen.'
    },
    {
        grade: 9,
        year: 1939,
        title: 'Zweiter Weltkrieg',
        minZoom: 1.8,
        description: 'Am 1. September 1939 überfällt Deutschland Polen und löst den Zweiten Weltkrieg aus.',
        details: 'Mit einem fingierten Überfall auf einen deutschen Radiosender als Vorwand marschierte die Wehrmacht in Polen ein. England und Frankreich erklärten daraufhin Deutschland den Krieg – aber Polen war schon verloren, auch weil die Sowjetunion von Osten einmarschierte. Der Zweite Weltkrieg hatte begonnen, der am Ende 70 Millionen Menschenleben kosten sollte.'
    },

    {
        grade: 9,
        year: 1940,
        title: 'Frankreich kapituliert',
        minZoom: 3.0,
        description: 'Deutschland besiegt Frankreich in nur sechs Wochen und demütigt es am selben Ort wie 1918.',
        details: 'Die Wehrmacht umging die Maginot-Linie durch den Ardennen-Wald, den niemand für passierbar hielt, und schnitt die alliierten Armeen ab. Frankreich kapitulierte nach nur sechs Wochen – eine Schockwelle für die ganze Welt. Hitler ließ den Waffenstillstand in demselben Eisenbahnwaggon unterzeichnen, in dem Deutschland 1918 kapituliert hatte, um Frankreich zu demütigen.'
    },
    {
        grade: 9,
        year: 1940,
        title: 'Luftschlacht England',
        minZoom: 5.0,
        description: 'Die Royal Air Force verhindert eine deutsche Invasion Englands in der Luftschlacht.',
        details: 'Hitler wollte England durch Luftüberlegenheit zur Kapitulation zwingen, bevor er die Invasion wagte. Aber die britische Luftwaffe, unterstützt von Radar und tapferen Piloten, hielt stand. Göring wechselte von Angriffen auf Flugplätze zu Angriffen auf London – ein taktischer Fehler, der England rettete. Es war Hitlers erste deutliche Niederlage.'
    },
    {
        grade: 9,
        year: 1941,
        title: 'Angriff auf UdSSR',
        minZoom: 2.0,
        description: 'Mit drei Millionen Soldaten überfällt Deutschland die Sowjetunion – ein Vernichtungskrieg.',
        details: 'Unternehmen Barbarossa war kein normaler Krieg, sondern ein rassenideologischer Vernichtungskrieg: Kommissare sollten sofort erschossen, Gefangene verhungert und die slawische Bevölkerung versklavt oder vernichtet werden. Der Angriff kam militärisch zunächst erfolgreich voran, aber der Widerstand der Sowjets war härter als erwartet. Hitlers Entscheidung, gleichzeitig gegen die UdSSR und England zu kämpfen, war strategisch verhängnisvoll.'
    },
    {
        grade: 9,
        year: 1941,
        title: 'Pearl Harbor',
        minZoom: 3.5,
        description: 'Japans Überfall auf Pearl Harbor zieht die USA in den Weltkrieg.',
        details: 'Am 7. Dezember 1941 griffen japanische Flugzeuge überraschend den amerikanischen Marinestützpunkt Pearl Harbor auf Hawaii an. Amerika trat in den Krieg ein, und Hitler erklärte den USA seinerseits den Krieg – ein fataler Fehler, der die überlegenen amerikanischen Ressourcen gegen Deutschland mobilisierte. Von diesem Moment an war Deutschlands Niederlage nur noch eine Frage der Zeit.'
    },
    {
        grade: 9,
        year: 1942,
        title: 'Wannseekonferenz',
        minZoom: 2.0,
        description: 'NS-Funktionäre koordinieren auf der Wannseekonferenz die Vernichtung aller europäischen Juden.',
        details: 'In einer Villa am Wannsee berieten hochrangige NS-Vertreter, wie die „Endlösung der Judenfrage" organisiert werden sollte. In weniger als zwei Stunden wurde die Ermordung von elf Millionen Menschen bürokratisch geplant. Der Holocaust war damit nicht eine spontane Eskalation, sondern ein systematisch geplanter Völkermord – das schlimmste Verbrechen der Geschichte.'
    },
    {
        grade: 9,
        year: 1942,
        title: 'Stalingrad',
        minZoom: 2.5,
        description: 'Die eingekesselte 6. Armee kapituliert bei Stalingrad – der Wendepunkt des Krieges.',
        details: 'Hitler hatte verboten, sich aus dem Kessel zurückzuziehen, obwohl die 6. Armee hoffnungslos eingeschlossen war. Nach monatelangem Häuserkampf und Hunger musste Feldmarschall Paulus im Februar 1943 kapitulieren – der erste Sieg, bei dem eine komplette deutsche Armee vernichtet wurde. Stalingrad war der psychologische Wendepunkt: Jetzt glaubten die Deutschen, dass Deutschland verlieren könnte.'
    },
    {
        grade: 9,
        year: 1943,
        title: 'Weiße Rose',
        minZoom: 4.0,
        description: 'Münchner Studenten der Weißen Rose werden für ihre Flugblätter hingerichtet.',
        details: 'Hans und Sophie Scholl sowie ihre Freunde verteilten Flugblätter, in denen sie zum Widerstand gegen das NS-Regime aufriefen. Sie wurden verraten, verhaftet und nach einem kurzen Schauprozess guillotiniert. Ihr Mut angesichts der unmittelbaren Todesgefahr machte sie zu Symbolen des deutschen Widerstands und ist bis heute unvergessen.'
    },
    {
        grade: 9,
        year: 1943,
        title: 'Kapitulation Italien',
        minZoom: 5.5,
        description: 'Mussolini wird gestürzt und Italien wechselt die Seiten.',
        details: 'Nach der alliierten Invasion Siziliens stürzten Italiens eigene Machthaber Mussolini und schlossen einen Waffenstillstand mit den Alliierten. Deutschland besetzte daraufhin Norditalien und befreite Mussolini, den es als Marionetten-Chef einer Restregierung einsetzte. Der schwierige Vormarsch der Alliierten durch Italien zog aber viele deutsche Truppen vom anderen Kriegsschauplätzen ab.'
    },
    {
        grade: 9,
        year: 1944,
        title: 'D-Day',
        minZoom: 2.0,
        description: 'Die Alliierten landen mit der größten Amphibienoperation der Geschichte in der Normandie.',
        details: 'Am 6. Juni 1944 stürmten amerikanische, britische und kanadische Soldaten unter enormen Verlusten die befestigten Strände der Normandie. Die zweite Front war eröffnet, und nun war Deutschland von Osten, Süden und Westen bedroht. Die Befreiung Westeuropas begann, und es war nur noch eine Frage der Zeit, wann Berlin fallen würde.'
    },
    {
        grade: 9,
        year: 1944,
        title: '20. Juli Attentat',
        minZoom: 3.5,
        description: 'Claus von Stauffenberg legt eine Bombe im Führerhauptquartier – Hitler überlebt.',
        details: 'Der Widerstandskreis um Stauffenberg plante, Hitler zu töten und eine neue Regierung zu bilden, die sofort Friedensverhandlungen aufnehmen sollte. Die Bombe explodierte, aber Hitler überlebte durch Zufall. Die Verschwörer wurden noch in derselben Nacht verhaftet und hingerichtet. Tausende mutmaßliche Mitwisser wurden in der Folge verfolgt.'
    },
    {
        grade: 9,
        year: 1945,
        title: 'Auschwitz befreit',
        minZoom: 3.5,
        description: 'Sowjetische Soldaten befreien Auschwitz und stoßen auf die Überreste des Holocaust.',
        details: 'Am 27. Januar 1945 betraten sowjetische Soldaten das Lager Auschwitz-Birkenau und fanden rund 7.000 ausgezehrte Überlebende sowie Berge von Kleidung, Haaren und Knochen. Über eine Million Menschen, vor allem Juden, waren hier ermordet worden. Das Datum wurde später zum internationalen Gedenktag für die Opfer des Holocaust.'
    },
    {
        grade: 9,
        year: 1945,
        title: 'Konferenz Jalta',
        minZoom: 5.0,
        description: 'Churchill, Roosevelt und Stalin teilen in Jalta die Nachkriegswelt unter sich auf.',
        details: 'Auf der Krimhalbinsel trafen die drei großen Siegermächte weitreichende Entscheidungen über die Nachkriegsordnung: Deutschland sollte in Besatzungszonen aufgeteilt, freie Wahlen in Osteuropa abgehalten werden. In der Realität sicherte Stalin seine Herrschaft über Osteuropa, und die Spannungen zwischen Ost und West, die den Kalten Krieg ankündigten, wurden bereits sichtbar.'
    },
    {
        grade: 9,
        year: 1945,
        title: 'Kriegsende Europa',
        minZoom: 1.8,
        description: 'Am 8. Mai 1945 kapituliert Deutschland bedingungslos – der Krieg in Europa ist vorbei.',
        details: 'Nach Hitlers Selbstmord im Bunker unterzeichneten die deutschen Generäle die bedingungslose Kapitulation. 60 Millionen Menschen hatten ihr Leben verloren, sechs Millionen Juden wurden im Holocaust ermordet, Europa lag in Trümmern. Deutschland hatte alles zerstört und war selbst zerstört – nun begann der lange Weg zum Wiederaufbau.'
    },
    {
        grade: 9,
        year: 1945,
        title: 'Atombomben Japan',
        minZoom: 3.0,
        description: 'Die USA werfen auf Hiroshima und Nagasaki Atombomben und zwingen Japan zur Kapitulation.',
        details: 'Am 6. August 1945 zerstörte die erste Atombombe Hiroshima, drei Tage später traf Nagasaki. Hunderttausende starben sofort oder an den Folgen der Strahlung. Japan kapitulierte, und der Zweite Weltkrieg war endgültig vorbei. Gleichzeitig hatte die Welt eine neue, existenzielle Bedrohung: Atomwaffen, die die ganze Menschheit vernichten konnten.'
    },
    {
        grade: 9,
        year: 1945,
        title: 'Potsdamer Konferenz',
        minZoom: 4.0,
        description: 'Die Siegermächte beschließen in Potsdam Deutschlands Zukunft als besetztes Land.',
        details: 'Truman, Stalin und Churchill bzw. Attlee trafen sich in Potsdam, um die Nachkriegsordnung für Deutschland festzulegen: Entnazifizierung, Demilitarisierung, Demokratisierung und Dezentralisierung. Deutschlands Ostgebiete wurden abgetrennt, Millionen Deutsche vertrieben. Die Differenzen zwischen West und Ost waren bereits so groß, dass eine gemeinsame Verwaltung Deutschlands kaum möglich war.'
    },
    {
        grade: 9,
        year: 1945,
        title: 'UN gegründet',
        minZoom: 4.5,
        description: 'Fünfzig Nationen gründen die Vereinten Nationen, um künftige Kriege zu verhindern.',
        details: 'Nach dem Scheitern des Völkerbundes sollte die neue Weltorganisation mit einem Sicherheitsrat, der militärisch eingreifen konnte, dauerhaften Frieden sichern. Die Charta legte Menschenrechte und die Gleichheit aller Nationen fest. In der Praxis wurde die UN schnell durch den Kalten Krieg gelähmt, spielte aber in vielen regionalen Konflikten eine wichtige vermittelnde Rolle.'
    },
    {
        grade: 9,
        year: 1946,
        title: 'Nürnberger Prozesse',
        minZoom: 4.0,
        description: 'Ein internationales Tribunal verurteilt die Hauptverantwortlichen der NS-Verbrechen.',
        details: 'Zum ersten Mal in der Geschichte wurden Staatenlenker für Kriegsverbrechen und Verbrechen gegen die Menschlichkeit vor Gericht gestellt. Zwölf Hauptangeklagte wurden zum Tode verurteilt, andere zu langen Gefängnisstrafen. Die Nürnberger Prozesse legten den Grundstein für das internationale Völkerstrafrecht und die Idee, dass es keine Immunität für Verbrechen gegen die Menschheit gibt.'
    },

    // ========== KALTER KRIEG ==========
    {
        grade: 9,
        year: 1947,
        title: 'Truman-Doktrin',
        minZoom: 4.0,
        description: 'US-Präsident Truman erklärt die Eindämmung des Kommunismus zur amerikanischen Außenpolitik.',
        details: 'In einer historischen Rede vor dem Kongress erklärte Truman, die USA würden überall in der Welt freie Völker unterstützen, die sich kommunistischem Druck widersetzten. Der Marshall-Plan pumpte Milliarden Dollar in den Wiederaufbau Westeuropas – mit dem Kalkül, wirtschaftliche Stabilität mache den Kommunismus unattraktiv. Der Kalte Krieg hatte offiziell begonnen.'
    },
    {
        grade: 9,
        year: 1948,
        title: 'Berlin-Blockade',
        minZoom: 2.0,
        description: 'Die Sowjets blockieren alle Zufahrten nach West-Berlin – die Luftbrücke rettet die Stadt.',
        details: 'Als die Westmächte eine Währungsreform in ihren Zonen durchführten, sperrten die Sowjets alle Land- und Wasserwege nach West-Berlin. Für fast ein Jahr versorgten amerikanische und britische Transportflugzeuge die zweieinhalb Millionen West-Berliner. Die Luftbrücke wurde zum Symbol des westlichen Widerstands, und die Sowjets hoben die Blockade schließlich erfolglos auf.'
    },
    {
        grade: 9,
        year: 1949,
        title: 'NATO-Gründung',
        minZoom: 3.5,
        description: 'Zwölf westliche Nationen schließen sich im NATO-Bündnis zusammen.',
        details: 'Die Nordatlantische Allianz basierte auf dem Prinzip der kollektiven Verteidigung: Ein Angriff auf ein Mitglied galt als Angriff auf alle. Damit war erstmals eine dauerhafte amerikanische Militärpräsenz in Europa garantiert. Die NATO bildete das militärische Rückgrat des Westens während des gesamten Kalten Krieges.'
    },
    {
        grade: 9,
        year: 1949,
        title: 'Gründung BRD/DDR',
        minZoom: 1.8,
        description: 'Aus den Besatzungszonen entstehen zwei deutsche Staaten mit entgegengesetzten Systemen.',
        details: 'Am 23. Mai 1949 trat das Grundgesetz der Bundesrepublik Deutschland in Kraft, am 7. Oktober 1949 konstituierte sich die DDR als sozialistischer Staat. Deutschland war nun geteilt: im Westen parlamentarische Demokratie und soziale Marktwirtschaft, im Osten Einparteienstaat nach sowjetischem Vorbild. Diese Teilung sollte 40 Jahre andauern.'
    },
    {
        grade: 10,
        year: 1950,
        title: 'Korea-Krieg',
        minZoom: 4.5,
        description: 'Nordkorea überfällt Südkorea und zieht Amerika und China in einen blutigen Stellvertreterkrieg.',
        details: 'Nordkorea marschierte in den Süden ein, die UN unter amerikanischer Führung griffen ein, und als die Front sich der chinesischen Grenze näherte, intervenierte auch China. Der Krieg endete 1953 in einem Waffenstillstand ungefähr auf der Ausgangslinie – keiner hatte gewonnen. Korea wurde zur bleibenden Teilung verurteilt und ist bis heute ein gefährlicher Konfliktherd.'
    },
    {
        grade: 10,
        year: 1951,
        title: 'Montanunion',
        minZoom: 2.5,
        description: 'Deutschland und Frankreich legen ihre Kohle- und Stahlindustrie in eine gemeinsame Behörde.',
        details: 'Die Europäische Gemeinschaft für Kohle und Stahl war ein genialer Plan: Indem die Rohstoffe für die Rüstungsindustrie unter gemeinsame Verwaltung gestellt wurden, sollte ein neuer Krieg zwischen Frankreich und Deutschland unmöglich werden. Es war der erste Schritt der europäischen Integration und wurde zum Vorbild für die spätere Europäische Gemeinschaft.'
    },
    {
        grade: 10,
        year: 1953,
        title: 'Stalin stirbt',
        minZoom: 4.0,
        description: 'Nach Stalins Tod beginnt in der Sowjetunion ein vorsichtiges „Tauwetter".',
        details: 'Stalins Tod im März 1953 beendete eine Herrschaft, die Millionen Sowjetbürger das Leben gekostet hatte. Sein Nachfolger Chruschtschow begann eine „Entstalinisierung": In einer Geheimrede verurteilte er Stalins Verbrechen, und das Klima im Sowjetreich wurde etwas milder. Aber das System der Diktatur blieb bestehen, wie die Niederschlagung des ungarischen Aufstands 1956 bewies.'
    },
    {
        grade: 9,
        year: 1953,
        title: 'Aufstand 17. Juni',
        minZoom: 2.0,
        description: 'Ostdeutsche Arbeiter erheben sich gegen das SED-Regime und werden von Sowjetpanzern niedergeschlagen.',
        details: 'Was als Protest gegen erhöhte Arbeitsnormen in Ostberlin begann, wurde schnell zu einem landesweiten Volksaufstand gegen die SED-Diktatur. Sowjetische Panzer rollten in die Städte und erstickten den Aufstand gewaltsam. Für die DDR-Führung war es ein Schock, der zeigte, wie unbeliebt das Regime war; für den Westen wurde der 17. Juni zum nationalen Gedenktag.'
    },
    {
        grade: 9,
        year: 1955,
        title: 'Warschauer Pakt',
        minZoom: 4.5,
        description: 'Die Sowjetunion bindet ihre Satellitenstaaten im Warschauer Pakt militärisch zusammen.',
        details: 'Als Antwort auf den NATO-Beitritt Westdeutschlands schloss die UdSSR mit sieben osteuropäischen Staaten ein Militärbündnis. Der Warschauer Pakt war jedoch kein gleichberechtigtes Bündnis: Die Sowjetunion bestimmte, und die anderen gehorchten – wie Ungarn 1956 und die Tschechoslowakei 1968 schmerzhaft erfahren mussten. Europa war nun in zwei militärische Blöcke geteilt.'
    },
    {
        grade: 9,
        year: 1956,
        title: 'Ungarn-Aufstand',
        minZoom: 4.0,
        description: 'Ungarns Freiheitsrevolution wird von sowjetischen Panzern brutal niedergewalzt.',
        details: 'Angestachelt durch Chruschtschows Entstalinisierung, erhoben sich die Ungarn und wählten den Reformer Imre Nagy zum Ministerpräsidenten. Als Ungarn ankündigte, den Warschauer Pakt zu verlassen, marschierte die Rote Armee ein. Rund 2.500 Ungarn starben, 200.000 flohen in den Westen. Der Westen schaute weg – er war zu vertieft in die Suez-Krise.'
    },
    {
        grade: 9,
        year: 1957,
        title: 'Sputnik-Schock',
        minZoom: 4.5,
        description: 'Die Sowjets schießen den ersten Satelliten ins All und erschüttern das westliche Selbstvertrauen.',
        details: 'Das Piepen von Sputnik aus dem All versetzte den Westen in Schock: Wenn die Sowjets Satelliten in den Orbit bringen konnten, konnten sie auch Atombomben in Raketen stecken und Amerika treffen. Das Wettrüsten im Weltraum begann, mit Milliarden-Investitionen in Raumfahrt und Wissenschaft. Letztendlich wurde das Apollo-Programm zum amerikanischen Triumph.'
    },
    {
        grade: 10,
        year: 1957,
        title: 'Römische Verträge',
        minZoom: 2.0,
        description: 'Sechs europäische Nationen unterzeichnen die Römischen Verträge und gründen die EWG.',
        details: 'Die Europäische Wirtschaftsgemeinschaft schaffte einen gemeinsamen Markt ohne Zölle und legte den Grundstein für die heutige Europäische Union. Die Idee dahinter war, die Volkswirtschaften so eng miteinander zu verflechten, dass ein Krieg wirtschaftlich unmöglich würde. Es war ein mutiger Schritt, dem Deutschland und Frankreich als treibende Kräfte voranstanden.'
    },
    {
        grade: 9,
        year: 1961,
        title: 'Bau der Mauer',
        minZoom: 1.8,
        description: 'Die DDR schließt in der Nacht vom 12. auf den 13. August Berlin mit einer Mauer ab.',
        details: 'Dreieinhalb Millionen Menschen waren seit 1949 aus der DDR in den Westen geflohen – viele davon über Berlin. Um diese Massenflucht zu stoppen, ließ SED-Chef Ulbricht in einer Nacht Stacheldraht und dann Mauer bauen. Familien wurden über Nacht getrennt, und wer zu fliehen versuchte, riskierte sein Leben. Die Mauer wurde zum Symbol der Unfreiheit und der deutschen Teilung.'
    },
    {
        grade: 10,
        year: 1962,
        title: 'Kubakrise',
        minZoom: 2.0,
        description: 'Dreizehn Tage lang steht die Welt am Rand eines Atomkrieges.',
        details: 'Als Amerika entdeckte, dass die Sowjets auf Kuba Raketen stationierten, verhängte Kennedy eine Seeblockade. Für 13 Tage waren die Finger der Mächte am Abzug, und Atomkrieg schien möglich. Am Ende lenkte Chruschtschow ein und zog die Raketen ab; im Gegenzug sicherte Kennedy zu, Kuba nicht anzugreifen und zog US-Raketen aus der Türkei ab. Es war die gefährlichste Krise des Kalten Krieges.'
    },
    {
        grade: 9,
        year: 1963,
        title: 'Kennedy in Berlin',
        minZoom: 4.0,
        description: 'Kennedy verspricht den Berlinern mit den Worten „Ich bin ein Berliner" amerikanischen Schutz.',
        details: 'Nur zwei Jahre nach dem Mauerbau besuchte Kennedy West-Berlin und hielt eine bewegende Rede vor Hunderttausenden jubelnden Menschen. Sein Satz zeigte, dass Amerika die Berliner nicht allein ließ – eine wichtige Botschaft nach der schmerzhaften Erfahrung des Mauerbaus. Der Besuch wurde zu einem der emotionalsten Momente des Kalten Krieges.'
    },
    {
        grade: 9,
        year: 1968,
        title: 'Prager Frühling',
        minZoom: 2.5,
        description: 'Tschechoslowakiens Reformkommunismus wird durch sowjetische Panzer zertreten.',
        details: 'Alexander Dubček wollte einen „Sozialismus mit menschlichem Antlitz" schaffen: Pressefreiheit, politischen Pluralismus und wirtschaftliche Reformen. Die Sowjetunion sah ihre Kontrolle über den Ostblock in Gefahr und ließ Panzer einmarschieren. Prager Bürger stellten sich den Panzern in den Weg – vergeblich. Die Breschnew-Doktrin besagte: Sozialistischen Errungenschaften wird die UdSSR immer verteidigen.'
    },
    {
        grade: 9,
        year: 1969,
        title: 'Mondlandung',
        minZoom: 4.0,
        description: 'Neil Armstrong betritt als erster Mensch den Mond und erfüllt Kennedys Versprechen.',
        details: 'Am 20. Juli 1969 setzte Apollo 11 auf dem Mond auf, und Armstrong sprach seinen historischen Satz über einen kleinen Schritt für einen Menschen und einen großen Sprung für die Menschheit. Amerika hatte das Wettrennen ins All gewonnen und das von Kennedy 1961 gegebene Versprechen eingelöst. Die Mondlandung war ein Triumph der Wissenschaft und des menschlichen Erfindungsgeistes.'
    },
    {
        grade: 9,
        year: 1969,
        title: 'Brandt Kanzler',
        minZoom: 3.5,
        description: 'Willy Brandt wird Bundeskanzler und leitet eine neue Ostpolitik der Annäherung ein.',
        details: 'Mit dem Slogan „Wir wollen mehr Demokratie wagen" verkörperte Brandt einen neuen Aufbruch. Seine Ostpolitik des „Wandels durch Annäherung" versuchte, durch Kontakte und Gesprächsbereitschaft die Lage der Menschen in der DDR zu verbessern. Das war umstritten, aber erfolgreich: Reiseerleichterungen, Familienzusammenführungen und schließlich der Grundlagenvertrag wurden erreicht.'
    },
    {
        grade: 9,
        year: 1970,
        title: 'Kniefall Warschau',
        minZoom: 4.0,
        description: 'Willy Brandt kniet spontan vor dem Denkmal für die Opfer des Warschauer Ghettos.',
        details: 'Bei einem Staatsbesuch in Polen kniete Brandt am Mahnmal für die ermordeten Juden des Warschauer Ghettos nieder – spontan, ohne Absprache. Ein Journalist beschrieb es so: „Er tat, was die taten, die nichts zu sagen hatten." Die Geste wurde weltberühmt als Symbol der deutschen Bereitschaft zur Verantwortung und Versöhnung, und Brandt erhielt 1971 den Friedensnobelpreis.'
    },
    {
        grade: 9,
        year: 1972,
        title: 'Grundlagenvertrag',
        minZoom: 2.5,
        description: 'BRD und DDR erkennen sich erstmals gegenseitig als eigenständige Staaten an.',
        details: 'Der Grundlagenvertrag normalisierte die Beziehungen zwischen beiden deutschen Staaten: Es gab diplomatische Vertretungen, Reiseerleichterungen und Möglichkeiten zur Familienzusammenführung. Die BRD gab damit nicht das Ziel der Einheit auf, erkannte aber die politische Realität an. Für viele DDR-Bürger bedeutete es konkrete Verbesserungen im Alltag.'
    },
    {
        grade: 9,
        year: 1973,
        title: 'Ölkrise',
        minZoom: 4.5,
        description: 'Das arabische Ölembargo lässt die Energiepreise explodieren und beendet das Wirtschaftswunder.',
        details: 'Als Reaktion auf den Jom-Kippur-Krieg drosselten die arabischen Ölstaaten ihre Produktion und stoppten Lieferungen an westliche Länder. In Deutschland gab es autofreie Sonntage, und die Benzinpreise explodierten. Die Krise zeigte die gefährliche Abhängigkeit moderner Industriegesellschaften von billigem Öl und löste ein Umdenken in Energie- und Wirtschaftspolitik aus.'
    },
    {
        grade: 9,
        year: 1979,
        title: 'NATO-Doppelbeschluss',
        minZoom: 4.0,
        description: 'Die NATO beschließt Nachrüstung mit Pershing-II-Raketen und löst eine Friedensbewegung aus.',
        details: 'Als Antwort auf die sowjetischen SS-20-Mittelstreckenraketen beschloss die NATO, neue Raketen in Westeuropa zu stationieren – aber zunächst noch einmal Abrüstungsverhandlungen anzubieten. Der Doppelbeschluss löste die größte Friedensbewegung in der Geschichte der Bundesrepublik aus: Hunderttausende demonstrierten gegen die Nachrüstung. Letztlich wurden die Raketen stationiert, und der Druck führte zum INF-Vertrag.'
    },
    {
        grade: 10,
        year: 1985,
        title: 'Gorbatschow',
        minZoom: 2.0,
        description: 'Michail Gorbatschow wird Generalsekretär und leitet mit Glasnost und Perestroika Reformen ein.',
        details: 'Der junge, energische Gorbatschow erkannte, dass das sowjetische System reformiert werden musste, um zu überleben. Glasnost (Offenheit) erlaubte kritischere Medien, Perestroika (Umbau) sollte die Wirtschaft reformieren. Doch die Reformen öffneten eine Büchse der Pandora: In Osteuropa wuchsen die Freiheitsbewegungen, und am Ende überlebte das System die Reformen nicht.'
    },
    {
        grade: 9,
        year: 1986,
        title: 'Tschernobyl',
        minZoom: 4.0,
        description: 'Die Explosion des Reaktors in Tschernobyl ist die schlimmste Atomkatastrophe der Geschichte.',
        details: 'In der Nacht zum 26. April 1986 explodierte Reaktorblock 4 des Atomkraftwerks Tschernobyl in der Ukraine. Eine radioaktive Wolke zog über Europa, und weite Gebiete wurden auf Jahrzehnte verseucht. Die Katastrophe erschütterte das Vertrauen in die Atomkraft weltweit und stärkte die Anti-Atomkraft-Bewegung enorm. In der Sowjetunion zwang sie Gorbatschow zur Transparenz.'
    },
    {
        grade: 9,
        year: 1989,
        title: 'Mauerfall',
        minZoom: 1.8,
        description: 'Am 9. November 1989 öffnet die DDR die Grenzen – die Mauer fällt.',
        details: 'SED-Sprecher Günter Schabowski verkündete versehentlich, die neuen Reiseregelungen gälten „sofort, unverzüglich". Tausende DDR-Bürger strömten zu den Grenzübergängen, und überforderte Grenzwächter öffneten die Schranken. Jubelnde Menschen kletterten auf die Mauer, Familien trafen sich nach jahrelanger Trennung. Der Mauerfall war der emotionalste Moment der deutschen Nachkriegsgeschichte.'
    },
    {
        grade: 9,
        year: 1990,
        title: 'Wiedervereinigung',
        minZoom: 1.8,
        description: 'Am 3. Oktober 1990 tritt die DDR der Bundesrepublik bei – Deutschland ist wieder ein Staat.',
        details: 'Nach 40 Jahren Teilung war Deutschland wieder vereint. Der Weg dahin war schneller gegangen als jeder geglaubt hatte: Von der Maueröffnung bis zur Einheit vergingen nur elf Monate. Der „Zwei-plus-Vier-Vertrag" mit den vier Siegermächten schuf die internationale Grundlage, und am 3. Oktober wurde ein neuer Nationalfeiertag geboren. Die Herausforderungen des Zusammenwachsens sollten noch Jahrzehnte dauern.'
    },
    {
        grade: 9,
        year: 1991,
        title: 'Ende der Sowjetunion',
        minZoom: 2.0,
        description: 'Die Sowjetunion löst sich auf – der Kalte Krieg ist zu Ende.',
        details: 'Nach einem gescheiterten Putsch konservativer Kommunisten gegen Gorbatschow erklärten die Teilrepubliken eine nach der anderen ihre Unabhängigkeit. Am 25. Dezember 1991 senkte Gorbatschow die sowjetische Flagge über dem Kreml und trat zurück. 15 neue Staaten entstanden, und das 20. Jahrhundert, das mit dem Ersten Weltkrieg begonnen hatte, war zu Ende.'
    },

    // ========== EUROPÄISCHE INTEGRATION ==========
    {
        grade: 10,
        year: 1992,
        title: 'Maastricht-Vertrag',
        minZoom: 2.5,
        description: 'Der Maastricht-Vertrag verwandelt die EWG in die Europäische Union.',
        details: 'Mit dem Vertrag von Maastricht vertiefte Europa die Integration entscheidend: Eine gemeinsame Währung wurde beschlossen, europäische Staatsbürgerschaft eingeführt und eine gemeinsame Außen- und Sicherheitspolitik angestrebt. Es war der mutigste Integrationsschritt seit der EWG-Gründung und machte aus einem Wirtschaftsbündnis eine politische Union.'
    },
    {
        grade: 10,
        year: 2002,
        title: 'Euro-Bargeld',
        minZoom: 2.0,
        description: 'Zwölf europäische Staaten tauschen ihre nationalen Währungen gegen den Euro.',
        details: 'Am 1. Januar 2002 wurden in zwölf Ländern die alten Scheine und Münzen durch den Euro ersetzt. Für Deutschland bedeutete es den Abschied von der D-Mark, die seit dem Wirtschaftswunder Stabilität symbolisiert hatte. Der Euro wurde zur zweitwichtigsten Währung der Welt und zum greifbaren Symbol europäischer Einheit im Alltag der Bürger.'
    },
    {
        grade: 9,
        year: 2004,
        title: 'EU-Osterweiterung',
        minZoom: 3.5,
        description: 'Zehn neue Mitglieder aus Osteuropa treten der EU bei und überwinden die Teilung des Kontinents.',
        details: 'Mit dem Beitritt von Polen, Tschechien, der Slowakei, Ungarn, Slowenien, den baltischen Staaten, Malta und Zypern wuchs die EU von 15 auf 25 Mitglieder. Es war die größte Erweiterung in der Geschichte der Union und heilte symbolisch die Wunden des Kalten Krieges. Zum ersten Mal seit Jahrhunderten war Europa in einem Friedensraum mit freiem Personenverkehr vereint.'
    }
];

// ===== QUIZ FRAGEN =====
const QUIZ_TOPICS = [
    {
        id: 'franz-revolution',
        name: 'Französische Revolution',
        icon: '🇫🇷',
        questions: [
            {
                question: 'Wann begann die Französische Revolution?',
                options: ['1776', '1789', '1799', '1804'],
                correct: 1,
                explanation: 'Die Französische Revolution begann 1789 mit dem Sturm auf die Bastille am 14. Juli.'
            },
            {
                question: 'Was bedeutet "Liberté, Égalité, Fraternité"?',
                options: ['Freiheit, Gleichheit, Brüderlichkeit', 'Leben, Liebe, Frieden', 'Mut, Stärke, Ehre', 'Glaube, Hoffnung, Liebe'],
                correct: 0,
                explanation: 'Der Wahlspruch der Revolution bedeutet "Freiheit, Gleichheit, Brüderlichkeit" und steht für die Grundwerte.'
            },
            {
                question: 'Welches Gebäude wurde am 14. Juli 1789 gestürmt?',
                options: ['Versailles', 'Die Bastille', 'Der Louvre', 'Notre-Dame'],
                correct: 1,
                explanation: 'Die Bastille war ein Staatsgefängnis und Symbol der königlichen Willkür.'
            },
            {
                question: 'Wer war der König während der Revolution?',
                options: ['Ludwig XIV.', 'Ludwig XV.', 'Ludwig XVI.', 'Napoleon'],
                correct: 2,
                explanation: 'Ludwig XVI. war König von 1774 bis zu seiner Hinrichtung 1793.'
            },
            {
                question: 'Was waren die "drei Stände"?',
                options: ['Könige, Bauern, Händler', 'Klerus, Adel, Dritter Stand', 'Militär, Kirche, Bürger', 'Reich, Mittel, Arm'],
                correct: 1,
                explanation: 'Die Gesellschaft war in Klerus (1. Stand), Adel (2. Stand) und den Rest der Bevölkerung (3. Stand) geteilt.'
            }
        ]
    },
    {
        id: 'erster-weltkrieg',
        name: 'Erster Weltkrieg',
        icon: '⚔️',
        questions: [
            {
                question: 'Was war der Auslöser des Ersten Weltkriegs?',
                options: ['Überfall auf Polen', 'Attentat von Sarajevo', 'Versailler Vertrag', 'Russische Revolution'],
                correct: 1,
                explanation: 'Das Attentat auf Erzherzog Franz Ferdinand am 28. Juni 1914 in Sarajevo löste die Julikrise aus.'
            },
            {
                question: 'Wann endete der Erste Weltkrieg?',
                options: ['1916', '1917', '1918', '1919'],
                correct: 2,
                explanation: 'Der Waffenstillstand wurde am 11. November 1918 unterzeichnet.'
            },
            {
                question: 'Was war der Schlieffen-Plan?',
                options: ['Ein Friedensplan', 'Ein Wirtschaftsplan', 'Ein deutscher Kriegsplan', 'Ein Bündnisvertrag'],
                correct: 2,
                explanation: 'Der Schlieffen-Plan war die deutsche Strategie für einen Zwei-Fronten-Krieg.'
            }
        ]
    },
    {
        id: 'weimarer-republik',
        name: 'Weimarer Republik',
        icon: '🏛️',
        questions: [
            {
                question: 'Wann wurde die Weimarer Republik gegründet?',
                options: ['1918', '1919', '1920', '1923'],
                correct: 1,
                explanation: 'Die Weimarer Verfassung trat am 14. August 1919 in Kraft.'
            },
            {
                question: 'Wer war der erste Reichspräsident?',
                options: ['Paul von Hindenburg', 'Friedrich Ebert', 'Gustav Stresemann', 'Heinrich Brüning'],
                correct: 1,
                explanation: 'Friedrich Ebert (SPD) war von 1919 bis 1925 Reichspräsident.'
            },
            {
                question: 'Was war die Hyperinflation 1923?',
                options: ['Massenarbeitslosigkeit', 'Extremer Geldwertverlust', 'Hungersnot', 'Bürgerkrieg'],
                correct: 1,
                explanation: 'Die Inflation führte dazu, dass Geld praktisch wertlos wurde.'
            }
        ]
    },
    {
        id: 'ns-zeit',
        name: 'Nationalsozialismus',
        icon: '🚫',
        questions: [
            {
                question: 'Wann wurde Hitler Reichskanzler?',
                options: ['1930', '1932', '1933', '1934'],
                correct: 2,
                explanation: 'Hitler wurde am 30. Januar 1933 zum Reichskanzler ernannt.'
            },
            {
                question: 'Was war die "Machtergreifung"?',
                options: ['Ein Putschversuch', 'Hitlers Ernennung zum Kanzler', 'Der Reichstagsbrand', 'Die Olympiade 1936'],
                correct: 1,
                explanation: 'Als Machtergreifung bezeichnet man die Übernahme der Regierungsgewalt durch die Nationalsozialisten.'
            },
            {
                question: 'Wann begann der Zweite Weltkrieg?',
                options: ['1938', '1939', '1940', '1941'],
                correct: 1,
                explanation: 'Der Überfall auf Polen am 1. September 1939 markiert den Kriegsbeginn.'
            }
        ]
    },
    {
        id: 'kalter-krieg',
        name: 'Kalter Krieg',
        icon: '🧊',
        questions: [
            {
                question: 'Was war der "Eiserne Vorhang"?',
                options: ['Eine Mauer in Berlin', 'Die Grenze zwischen Ost und West', 'Ein sowjetisches Waffensystem', 'Ein amerikanischer Plan'],
                correct: 1,
                explanation: 'Churchill prägte den Begriff für die ideologische und physische Teilung Europas.'
            },
            {
                question: 'Wann wurde die Berliner Mauer gebaut?',
                options: ['1949', '1953', '1961', '1968'],
                correct: 2,
                explanation: 'Der Bau begann in der Nacht vom 12. auf den 13. August 1961.'
            },
            {
                question: 'Wann fiel die Berliner Mauer?',
                options: ['1987', '1988', '1989', '1990'],
                correct: 2,
                explanation: 'Am 9. November 1989 wurden die Grenzen geöffnet.'
            },
            {
                question: 'Was war die Kubakrise?',
                options: ['Ein Bürgerkrieg', 'Eine Wirtschaftskrise', 'Eine Konfrontation wegen Raketen', 'Eine Naturkatastrophe'],
                correct: 2,
                explanation: 'Die Kubakrise 1962 war eine Konfrontation zwischen USA und UdSSR wegen sowjetischer Raketen auf Kuba.'
            },
            {
                question: 'Was war die Berlin-Blockade?',
                options: ['Eine Mauer um Berlin', 'Sperrung der Zugangswege', 'Ein Putsch', 'Eine Demonstration'],
                correct: 1,
                explanation: 'Die Sowjetunion blockierte 1948/49 alle Land- und Wasserwege nach West-Berlin.'
            }
        ]
    },
    {
        id: 'industrialisierung',
        name: 'Industrialisierung',
        icon: '🏭',
        questions: [
            {
                question: 'Wo begann die Industrielle Revolution?',
                options: ['Deutschland', 'Frankreich', 'England', 'USA'],
                correct: 2,
                explanation: 'Die Industrialisierung begann Mitte des 18. Jahrhunderts in England.'
            },
            {
                question: 'Was war die "Soziale Frage"?',
                options: ['Ein Fragebogen', 'Probleme der Arbeiterschaft', 'Eine politische Partei', 'Ein Gesetz'],
                correct: 1,
                explanation: 'Die Soziale Frage beschreibt die Probleme der Arbeiterschaft: Armut, Kinderarbeit, schlechte Bedingungen.'
            },
            {
                question: 'Wer erfand die Dampfmaschine?',
                options: ['Thomas Edison', 'James Watt', 'Carl Benz', 'Werner von Siemens'],
                correct: 1,
                explanation: 'James Watt verbesserte die Dampfmaschine entscheidend und machte sie praktisch nutzbar.'
            },
            {
                question: 'Was waren Gewerkschaften?',
                options: ['Arbeitgeberverbände', 'Zusammenschlüsse von Arbeitern', 'Handelsgilden', 'Parteien'],
                correct: 1,
                explanation: 'Gewerkschaften waren Zusammenschlüsse von Arbeitern zur Durchsetzung besserer Arbeitsbedingungen.'
            },
            {
                question: 'Was war das "Manchestertum"?',
                options: ['Eine Kunstrichtung', 'Radikaler Wirtschaftsliberalismus', 'Eine Textilfirma', 'Eine Stadt'],
                correct: 1,
                explanation: 'Manchestertum bezeichnet einen radikalen Wirtschaftsliberalismus ohne staatliche Eingriffe.'
            }
        ]
    },
    {
        id: 'reichsgruendung',
        name: 'Deutsche Einigung',
        icon: '🇩🇪',
        questions: [
            {
                question: 'Wann wurde das Deutsche Reich gegründet?',
                options: ['1848', '1866', '1871', '1890'],
                correct: 2,
                explanation: 'Am 18. Januar 1871 wurde das Deutsche Kaiserreich in Versailles proklamiert.'
            },
            {
                question: 'Wer war der "Eiserne Kanzler"?',
                options: ['Wilhelm I.', 'Friedrich III.', 'Otto von Bismarck', 'Helmuth von Moltke'],
                correct: 2,
                explanation: 'Otto von Bismarck wurde wegen seiner harten Politik "Eiserner Kanzler" genannt.'
            },
            {
                question: 'Was war die "Blut und Eisen"-Rede?',
                options: ['Ein Kriegsplan', 'Bismarcks Machtpolitik-Ankündigung', 'Eine Friedensrede', 'Ein Wirtschaftsprogramm'],
                correct: 1,
                explanation: 'Bismarck verkündete 1862, dass die deutschen Fragen durch "Blut und Eisen" gelöst würden.'
            },
            {
                question: 'Welche Kriege führte Bismarck zur Einigung?',
                options: ['Nur gegen Frankreich', 'Gegen Dänemark, Österreich, Frankreich', 'Gegen Russland', 'Keine Kriege'],
                correct: 1,
                explanation: 'Die drei Einigungskriege: gegen Dänemark (1864), Österreich (1866) und Frankreich (1870/71).'
            }
        ]
    },
    // ===== KLASSE 8 THEMEN =====
    {
        id: 'wiener-kongress',
        name: 'Wiener Kongress',
        icon: '👑',
        grade: 8,
        questions: [
            {
                question: 'Wann fand der Wiener Kongress statt?',
                options: ['1804-1805', '1814-1815', '1848-1849', '1871'],
                correct: 1,
                explanation: 'Der Wiener Kongress tagte von September 1814 bis Juni 1815 und ordnete Europa nach Napoleon neu.'
            },
            {
                question: 'Wer war der führende Politiker Österreichs auf dem Wiener Kongress?',
                options: ['Napoleon', 'Bismarck', 'Metternich', 'Talleyrand'],
                correct: 2,
                explanation: 'Fürst Metternich war der österreichische Außenminister und Gastgeber des Kongresses.'
            },
            {
                question: 'Was war das Hauptziel des Wiener Kongresses?',
                options: ['Revolution fördern', 'Restauration der alten Ordnung', 'Nationalstaaten gründen', 'Demokratie einführen'],
                correct: 1,
                explanation: 'Das Ziel war die Restauration, also die Wiederherstellung der vorrevolutionären monarchischen Ordnung.'
            },
            {
                question: 'Was wurde durch den Wiener Kongress gegründet?',
                options: ['Das Deutsche Kaiserreich', 'Der Deutsche Bund', 'Die EU', 'Die NATO'],
                correct: 1,
                explanation: 'Der Deutsche Bund war ein loser Zusammenschluss deutscher Staaten unter österreichischer Führung.'
            },
            {
                question: 'Welches Prinzip war zentral für den Wiener Kongress?',
                options: ['Volkssouveränität', 'Legitimität', 'Nationalismus', 'Liberalismus'],
                correct: 1,
                explanation: 'Das Legitimitätsprinzip bedeutete, dass nur "rechtmäßige" (legitime) Herrscher regieren sollten.'
            }
        ]
    },
    {
        id: 'revolution-1848',
        name: 'Revolution 1848',
        icon: '⚔️',
        grade: 8,
        questions: [
            {
                question: 'Wo tagte die erste deutsche Nationalversammlung 1848?',
                options: ['Berlin', 'Wien', 'Frankfurt (Paulskirche)', 'München'],
                correct: 2,
                explanation: 'Die Nationalversammlung tagte in der Frankfurter Paulskirche und erarbeitete eine Verfassung.'
            },
            {
                question: 'Was forderten die Revolutionäre 1848?',
                options: ['Monarchie stärken', 'Freiheit und nationale Einheit', 'Ständegesellschaft', 'Absolutismus'],
                correct: 1,
                explanation: 'Die Hauptforderungen waren Freiheitsrechte (Pressefreiheit, Versammlungsfreiheit) und nationale Einheit.'
            },
            {
                question: 'Warum scheiterte die Revolution 1848?',
                options: ['Militärische Niederlage', 'König nahm Kaiserkrone nicht an', 'Ausländische Invasion', 'Pest-Epidemie'],
                correct: 1,
                explanation: 'Friedrich Wilhelm IV. lehnte die "Krone aus der Gosse" ab, was das Scheitern besiegelte.'
            },
            {
                question: 'Welches Land löste die Revolutionswelle 1848 aus?',
                options: ['Deutschland', 'Österreich', 'Frankreich', 'Italien'],
                correct: 2,
                explanation: 'Die Februarrevolution in Frankreich war der Auslöser für die europaweiten Revolutionen.'
            },
            {
                question: 'Was waren die "Märzforderungen"?',
                options: ['Höhere Steuern', 'Pressefreiheit, Parlament, Verfassung', 'Krieg gegen Frankreich', 'Abschaffung der Religion'],
                correct: 1,
                explanation: 'Die Märzforderungen umfassten Grundrechte, Pressefreiheit, Parlament und eine Verfassung.'
            }
        ]
    },
    {
        id: 'imperialismus',
        name: 'Imperialismus',
        icon: '🌍',
        grade: 8,
        questions: [
            {
                question: 'Was versteht man unter Imperialismus?',
                options: ['Friedliche Zusammenarbeit', 'Streben nach Kolonien und Weltmacht', 'Demokratisierung', 'Industrialisierung'],
                correct: 1,
                explanation: 'Imperialismus bezeichnet das Streben von Staaten nach Kolonien, Einflusszonen und Weltmacht.'
            },
            {
                question: 'Wann fand die Berliner Konferenz ("Kongo-Konferenz") statt?',
                options: ['1871', '1884-1885', '1914', '1919'],
                correct: 1,
                explanation: 'Die Berliner Konferenz 1884/85 regelte die Aufteilung Afrikas unter den europäischen Mächten.'
            },
            {
                question: 'Wie nannte man den Konkurrenzkampf der Großmächte um Kolonien in Afrika?',
                options: ['Kalter Krieg', 'Wettlauf um Afrika', 'Weltkrieg', 'Kreuzzug'],
                correct: 1,
                explanation: 'Der "Wettlauf um Afrika" (Scramble for Africa) war die Aufteilung des Kontinents unter europäischen Mächten.'
            },
            {
                question: 'Welche Ideologie rechtfertigte den Imperialismus?',
                options: ['Sozialismus', 'Sozialdarwinismus', 'Liberalismus', 'Pazifismus'],
                correct: 1,
                explanation: 'Der Sozialdarwinismus übertrug Darwins Theorien auf Gesellschaften und rechtfertigte die "Überlegenheit" Europas.'
            },
            {
                question: 'Was war ein "Schutzgebiet"?',
                options: ['Ein Nationalpark', 'Eine deutsche Kolonie', 'Ein Kriegsgefangenenlager', 'Ein Naturreservat'],
                correct: 1,
                explanation: 'Das Deutsche Reich bezeichnete seine Kolonien euphemistisch als "Schutzgebiete".'
            }
        ]
    },
    // ===== KLASSE 9 THEMEN =====
    {
        id: 'holocaust',
        name: 'Holocaust',
        icon: '✡️',
        grade: 9,
        questions: [
            {
                question: 'Was waren die Nürnberger Gesetze?',
                options: ['Wirtschaftsgesetze', 'Rassengesetze gegen Juden', 'Militärgesetze', 'Schulgesetze'],
                correct: 1,
                explanation: 'Die Nürnberger Gesetze von 1935 entzogen Juden ihre Bürgerrechte und verboten "Mischehen".'
            },
            {
                question: 'Wann war die Reichspogromnacht?',
                options: ['30. Januar 1933', '9. November 1938', '1. September 1939', '20. Juli 1944'],
                correct: 1,
                explanation: 'In der Nacht vom 9. auf 10. November 1938 wurden Synagogen zerstört und Juden ermordet und deportiert.'
            },
            {
                question: 'Was war die Wannseekonferenz?',
                options: ['Friedensverhandlung', 'Planung des Holocaust', 'Wirtschaftskonferenz', 'Militärbesprechung'],
                correct: 1,
                explanation: 'Auf der Wannseekonferenz 1942 wurde die systematische Ermordung der europäischen Juden organisiert.'
            },
            {
                question: 'Was bedeutet der Begriff "Shoah"?',
                options: ['Krieg', 'Vernichtung/Katastrophe', 'Frieden', 'Revolution'],
                correct: 1,
                explanation: 'Shoah (hebräisch für "Katastrophe") ist die jüdische Bezeichnung für den Holocaust.'
            },
            {
                question: 'Wie viele Juden wurden im Holocaust ermordet?',
                options: ['Etwa 1 Million', 'Etwa 3 Millionen', 'Etwa 6 Millionen', 'Etwa 10 Millionen'],
                correct: 2,
                explanation: 'Etwa 6 Millionen Juden wurden während des Holocaust systematisch ermordet.'
            }
        ]
    },
    {
        id: 'brd-ddr',
        name: 'BRD und DDR',
        icon: '🇩🇪',
        grade: 9,
        questions: [
            {
                question: 'Wann wurden BRD und DDR gegründet?',
                options: ['1945', '1949', '1953', '1961'],
                correct: 1,
                explanation: 'Die BRD wurde am 23. Mai 1949 gegründet, die DDR am 7. Oktober 1949.'
            },
            {
                question: 'Was war die Stasi?',
                options: ['Eine Partei', 'Der Geheimdienst der DDR', 'Eine Zeitung', 'Eine Gewerkschaft'],
                correct: 1,
                explanation: 'Die Stasi (Staatssicherheit) war der Geheimdienst der DDR, der die Bevölkerung überwachte.'
            },
            {
                question: 'Was geschah am 17. Juni 1953?',
                options: ['Mauerfall', 'Volksaufstand in der DDR', 'Gründung der BRD', 'Wiedervereinigung'],
                correct: 1,
                explanation: 'Am 17. Juni 1953 kam es zu einem Volksaufstand in der DDR, der von sowjetischen Truppen niedergeschlagen wurde.'
            },
            {
                question: 'Was war die "Hallstein-Doktrin"?',
                options: ['Wirtschaftsplan', 'Keine diplomatischen Beziehungen zu DDR-Anerkennern', 'Militärstrategie', 'Bildungsreform'],
                correct: 1,
                explanation: 'Die Hallstein-Doktrin drohte Staaten, die die DDR anerkannten, mit dem Abbruch diplomatischer Beziehungen.'
            },
            {
                question: 'Was war die "Soziale Marktwirtschaft"?',
                options: ['Planwirtschaft', 'Wirtschaftsordnung der BRD', 'Kommunismus', 'Feudalismus'],
                correct: 1,
                explanation: 'Die Soziale Marktwirtschaft kombinierte freien Markt mit sozialer Absicherung und prägte die BRD.'
            }
        ]
    },
    {
        id: 'zweiter-weltkrieg',
        name: 'Zweiter Weltkrieg',
        icon: '💥',
        grade: 9,
        questions: [
            {
                question: 'Wann begann der Zweite Weltkrieg?',
                options: ['1. September 1938', '1. September 1939', '22. Juni 1941', '7. Dezember 1941'],
                correct: 1,
                explanation: 'Der Zweite Weltkrieg begann am 1. September 1939 mit dem deutschen Überfall auf Polen.'
            },
            {
                question: 'Was war das "Unternehmen Barbarossa"?',
                options: ['Invasion Frankreichs', 'Angriff auf die Sowjetunion', 'Luftschlacht um England', 'Landung in der Normandie'],
                correct: 1,
                explanation: 'Unternehmen Barbarossa war der deutsche Angriff auf die Sowjetunion am 22. Juni 1941.'
            },
            {
                question: 'Was war der D-Day?',
                options: ['Kriegsbeginn', 'Kapitulation Deutschlands', 'Landung der Alliierten in der Normandie', 'Atombombenabwurf'],
                correct: 2,
                explanation: 'Am D-Day (6. Juni 1944) landeten die Alliierten in der Normandie und eröffneten die Westfront.'
            },
            {
                question: 'Wann endete der Zweite Weltkrieg in Europa?',
                options: ['30. April 1945', '8. Mai 1945', '2. September 1945', '9. November 1945'],
                correct: 1,
                explanation: 'Am 8. Mai 1945 kapitulierte Deutschland bedingungslos. Dieser Tag ist als "Tag der Befreiung" bekannt.'
            },
            {
                question: 'Was war der "Totale Krieg"?',
                options: ['Nur Soldaten kämpfen', 'Mobilisierung aller Ressourcen für den Krieg', 'Kurzer Krieg', 'Defensivkrieg'],
                correct: 1,
                explanation: 'Der Totale Krieg bedeutete die vollständige Mobilisierung aller Ressourcen und der Zivilbevölkerung.'
            }
        ]
    },
    // ===== KLASSE 10 THEMEN =====
    {
        id: 'russland-imperium',
        name: 'Russland - Imperium im Wandel',
        icon: '🇷🇺',
        grade: 10,
        questions: [
            {
                question: 'Wann fand die Oktoberrevolution statt?',
                options: ['Februar 1917', 'Oktober/November 1917', '1918', '1922'],
                correct: 1,
                explanation: 'Die Oktoberrevolution fand im November 1917 (nach altem russischen Kalender: Oktober) statt.'
            },
            {
                question: 'Wer führte die Bolschewiki?',
                options: ['Stalin', 'Trotzki', 'Lenin', 'Zar Nikolaus II.'],
                correct: 2,
                explanation: 'Wladimir Lenin führte die Bolschewiki und wurde erster Regierungschef Sowjetrusslands.'
            },
            {
                question: 'Was war der Stalinismus?',
                options: ['Demokratie', 'Totalitäre Diktatur mit Personenkult', 'Monarchie', 'Anarchie'],
                correct: 1,
                explanation: 'Der Stalinismus war eine totalitäre Herrschaftsform mit Terror, Personenkult und Zwangskollektivierung.'
            },
            {
                question: 'Was war der "Große Vaterländische Krieg"?',
                options: ['Erster Weltkrieg', 'Bürgerkrieg', 'Sowjetischer Name für den Krieg gegen NS-Deutschland', 'Afghanistankrieg'],
                correct: 2,
                explanation: 'So nannten die Sowjets den Kampf gegen NS-Deutschland (1941-1945).'
            },
            {
                question: 'Was versteht man unter "Glasnost"?',
                options: ['Planwirtschaft', 'Offenheit/Transparenz unter Gorbatschow', 'Geheimpolizei', 'Raumfahrtprogramm'],
                correct: 1,
                explanation: 'Glasnost (Offenheit) war eine Reformpolitik Gorbatschows in den 1980er Jahren.'
            }
        ]
    },
    {
        id: 'china-imperium',
        name: 'China - Imperium im Wandel',
        icon: '🇨🇳',
        grade: 10,
        questions: [
            {
                question: 'Was war der Opiumkrieg?',
                options: ['Bürgerkrieg', 'Krieg zwischen China und Großbritannien', 'Religionskrieg', 'Handelskrieg mit Japan'],
                correct: 1,
                explanation: 'Die Opiumkriege (1839-1842, 1856-1860) führte Großbritannien gegen China wegen des Opiumhandels.'
            },
            {
                question: 'Wer war Mao Zedong?',
                options: ['Letzter Kaiser', 'Gründer der Volksrepublik China', 'Taiwanesischer Präsident', 'Japanischer General'],
                correct: 1,
                explanation: 'Mao Zedong gründete 1949 die Volksrepublik China und war bis 1976 ihr Führer.'
            },
            {
                question: 'Was war die Kulturrevolution?',
                options: ['Kunstbewegung', 'Politische Kampagne Maos gegen "Klassenfeinde"', 'Bildungsreform', 'Wirtschaftsprogramm'],
                correct: 1,
                explanation: 'Die Kulturrevolution (1966-1976) war eine politische Kampagne mit Massenverfolgungen.'
            },
            {
                question: 'Was war der "Große Sprung nach vorn"?',
                options: ['Raumfahrtprogramm', 'Gescheiterte Industrialisierungskampagne', 'Demokratisierung', 'Militäroffensive'],
                correct: 1,
                explanation: 'Der "Große Sprung nach vorn" (1958-1961) war eine gescheiterte Kampagne, die Millionen Hungertote forderte.'
            },
            {
                question: 'Was geschah 1989 auf dem Tiananmen-Platz?',
                options: ['Olympische Spiele', 'Niederschlagung der Demokratiebewegung', 'Wirtschaftsreform', 'Kaiserkrönung'],
                correct: 1,
                explanation: 'Am 4. Juni 1989 wurde die Demokratiebewegung auf dem Tiananmen-Platz gewaltsam niedergeschlagen.'
            }
        ]
    },
    {
        id: 'osmanisches-reich-tuerkei',
        name: 'Osmanisches Reich & Türkei',
        icon: '🇹🇷',
        grade: 10,
        questions: [
            {
                question: 'Wann eroberten die Osmanen Konstantinopel?',
                options: ['1299', '1453', '1683', '1923'],
                correct: 1,
                explanation: 'Die Osmanen unter Mehmed II. eroberten Konstantinopel 1453 und beendeten das Byzantinische Reich.'
            },
            {
                question: 'Was bedeutet "Laizismus" in der Türkei?',
                options: ['Islamische Staatsreligion', 'Trennung von Staat und Religion', 'Theokratie', 'Monarchie'],
                correct: 1,
                explanation: 'Laizismus bedeutet die strikte Trennung von Staat und Religion, eingeführt von Atatürk.'
            },
            {
                question: 'Wer gründete die moderne Türkei?',
                options: ['Sultan Mehmed', 'Enver Pascha', 'Mustafa Kemal Atatürk', 'Erdoğan'],
                correct: 2,
                explanation: 'Mustafa Kemal Atatürk gründete 1923 die Republik Türkei und führte weitreichende Reformen durch.'
            },
            {
                question: 'Was waren die "Jungtürken"?',
                options: ['Kinderarmee', 'Reformbewegung im Osmanischen Reich', 'Religiöse Sekte', 'Handelsgesellschaft'],
                correct: 1,
                explanation: 'Die Jungtürken waren eine politische Bewegung, die das Osmanische Reich modernisieren wollte.'
            },
            {
                question: 'Wann endete das Osmanische Reich?',
                options: ['1918', '1922/1923', '1945', '1991'],
                correct: 1,
                explanation: 'Das Sultanat wurde 1922 abgeschafft, 1923 wurde die Republik Türkei ausgerufen.'
            }
        ]
    },
    {
        id: 'europaeische-union',
        name: 'Europäische Union',
        icon: '🇪🇺',
        grade: 10,
        questions: [
            {
                question: 'Was war die Montanunion (EGKS)?',
                options: ['Militärbündnis', 'Wirtschaftsgemeinschaft für Kohle und Stahl', 'Umweltorganisation', 'Kulturprogramm'],
                correct: 1,
                explanation: 'Die EGKS (1951) war der erste Schritt zur europäischen Integration durch gemeinsame Verwaltung von Kohle und Stahl.'
            },
            {
                question: 'Wann wurden die Römischen Verträge unterzeichnet?',
                options: ['1945', '1951', '1957', '1992'],
                correct: 2,
                explanation: 'Die Römischen Verträge von 1957 gründeten die EWG und EURATOM.'
            },
            {
                question: 'Wann wurde aus der EG die EU?',
                options: ['1957', '1979', '1993 (Vertrag von Maastricht)', '2002'],
                correct: 2,
                explanation: 'Mit dem Vertrag von Maastricht 1993 wurde die Europäische Union gegründet.'
            },
            {
                question: 'Was ist das Schengen-Abkommen?',
                options: ['Militärpakt', 'Abschaffung der Grenzkontrollen', 'Handelsabkommen', 'Währungsunion'],
                correct: 1,
                explanation: 'Das Schengen-Abkommen ermöglicht freies Reisen ohne Grenzkontrollen innerhalb der Mitgliedsstaaten.'
            },
            {
                question: 'Welche Werte sind Grundlage der EU?',
                options: ['Nur Wirtschaftsinteressen', 'Menschenwürde, Freiheit, Demokratie, Rechtsstaatlichkeit', 'Militärische Stärke', 'Religiöse Einheit'],
                correct: 1,
                explanation: 'Die EU basiert auf Werten wie Menschenwürde, Freiheit, Demokratie, Gleichheit und Rechtsstaatlichkeit.'
            }
        ]
    },
    {
        id: 'marxismus-kommunismus',
        name: 'Marxismus & Kommunismus',
        icon: '☭',
        grade: 10,
        questions: [
            {
                question: 'Wer schrieb das "Kommunistische Manifest"?',
                options: ['Lenin und Stalin', 'Marx und Engels', 'Mao und Ho Chi Minh', 'Trotzki und Luxemburg'],
                correct: 1,
                explanation: 'Karl Marx und Friedrich Engels verfassten 1848 das Kommunistische Manifest.'
            },
            {
                question: 'Was ist der "Klassenkampf"?',
                options: ['Schulwettbewerb', 'Konflikt zwischen Bourgeoisie und Proletariat', 'Sportereignis', 'Religionskrieg'],
                correct: 1,
                explanation: 'Nach Marx ist die Geschichte ein Kampf zwischen besitzender Klasse (Bourgeoisie) und Arbeiterklasse (Proletariat).'
            },
            {
                question: 'Was bedeutet "Diktatur des Proletariats"?',
                options: ['Demokratie', 'Herrschaft der Arbeiterklasse als Übergangsstadium', 'Monarchie', 'Anarchie'],
                correct: 1,
                explanation: 'Die Diktatur des Proletariats sollte nach Marx die Übergangsphase zum Kommunismus sein.'
            },
            {
                question: 'Was ist "Historischer Materialismus"?',
                options: ['Archäologie', 'Geschichtstheorie basierend auf wirtschaftlichen Verhältnissen', 'Kunstrichtung', 'Religionsphilosophie'],
                correct: 1,
                explanation: 'Der Historische Materialismus erklärt Geschichte durch die Entwicklung der Produktionsverhältnisse.'
            },
            {
                question: 'Was war die Planwirtschaft?',
                options: ['Freie Marktwirtschaft', 'Staatlich gelenkte Wirtschaft', 'Tauschwirtschaft', 'Feudalwirtschaft'],
                correct: 1,
                explanation: 'In der Planwirtschaft plant der Staat Produktion und Verteilung aller Güter zentral.'
            }
        ]
    }
];

// ===== FUN FACTS =====
const FUN_FACTS = [
    'Die kürzeste Kriegserklärung dauerte nur 38 Minuten (Großbritannien vs. Sansibar, 1896).',
    'Napoleon war nicht klein! Mit 1,68m war er für seine Zeit durchschnittlich groß.',
    'Die Chinesische Mauer ist vom Mond aus NICHT sichtbar - das ist ein Mythos.',
    'Die Wikinger nannten Amerika "Vinland" und erreichten es 500 Jahre vor Kolumbus.',
    'Der Hundertjährige Krieg dauerte eigentlich 116 Jahre (1337-1453).',
    'Die erste U-Bahn der Welt wurde 1863 in London eröffnet.',
    'Die Azteken nutzten Kakaobohnen als Währung.',
    'Der Eiffelturm sollte ursprünglich nach 20 Jahren abgerissen werden.',
    'Albert Einstein konnte bis zum Alter von 3 Jahren nicht sprechen.',
    'Die Berliner Mauer war 155 km lang.',
    'Der Erste Weltkrieg hatte über 17 Millionen Tote.',
    'Die Sowjetunion existierte nur 69 Jahre (1922-1991).',
    'Das Deutsche Kaiserreich bestand nur 47 Jahre (1871-1918).'
];

// ===== RÄNGE =====
const RANKS = [
    { name: 'Tagelöhner', icon: '🌾', minPoints: 0 },
    { name: 'Bauer', icon: '🌾', minPoints: 100 },
    { name: 'Handwerker', icon: '🔨', minPoints: 300 },
    { name: 'Ritter', icon: '⚔️', minPoints: 600 },
    { name: 'Adel', icon: '👑', minPoints: 1000 },
    { name: 'Legende', icon: '⚡', minPoints: 2000 }
];

// ===== ERFOLGE/ACHIEVEMENTS =====
const ACHIEVEMENTS = [
    { id: 'first-steps', name: 'Erste Schritte', icon: '👣', description: 'Erste Übung abgeschlossen', condition: 'exercises >= 1' },
    { id: 'quiz-master', name: 'Quiz-Meister', icon: '🎯', description: '10 Quiz-Fragen richtig beantwortet', condition: 'quizCorrect >= 10' },
    { id: 'time-traveler', name: 'Zeitreisender', icon: '⏰', description: '5 Zeitstrahl-Events erkundet', condition: 'timelineViewed >= 5' },
    { id: 'operator-pro', name: 'Operator-Pro', icon: '📝', description: 'Alle Operatoren angesehen', condition: 'operatorsViewed >= 17' },
    { id: 'strategy-guru', name: 'Strategie-Guru', icon: '🧠', description: 'Alle Lernstrategien entdeckt', condition: 'strategiesViewed >= 12' },
    { id: 'dedicated', name: 'Fleißig', icon: '📚', description: '1 Stunde gelernt', condition: 'totalMinutes >= 60' },
    { id: 'castle-builder', name: 'Burgenbauer', icon: '🏰', description: 'Erstes Burg-Upgrade gekauft', condition: 'castleLevel >= 2' },
    { id: 'rich', name: 'Wohlhabend', icon: '🐄', description: '100 Münzen gesammelt', condition: 'totalCoins >= 100' },
    { id: 'streak-3', name: '3-Tage-Streak', icon: '🔥', description: '3 Tage in Folge gelernt', condition: 'streak >= 3' },
    { id: 'streak-7', name: 'Wochenläufer', icon: '🔥', description: '7 Tage in Folge gelernt', condition: 'streak >= 7' },
    { id: 'memory-champ', name: 'Memory-Champion', icon: '🃏', description: '5 Memory-Spiele gewonnen', condition: 'memoryWins >= 5' },
    { id: 'chat-explorer', name: 'Wissbegierig', icon: '💬', description: '20 Fragen an den KI-Tutor gestellt', condition: 'chatQuestions >= 20' },
    { id: 'note-taker', name: 'Notizenmeister', icon: '📒', description: '10 Notizen erstellt', condition: 'notesCreated >= 10' },
    { id: 'perfect-quiz', name: 'Perfektionist', icon: '💯', description: 'Ein Quiz mit 100% abgeschlossen', condition: 'perfectQuizzes >= 1' },
    { id: 'night-owl', name: 'Nachteule', icon: '🦉', description: 'Nach 22 Uhr gelernt', condition: 'nightLearning >= 1' },
    { id: 'early-bird', name: 'Frühaufsteher', icon: '🐦', description: 'Vor 7 Uhr gelernt', condition: 'earlyLearning >= 1' },
    // Adaptive Learning Achievements
    { id: 'diagnostiker', name: 'Diagnostiker', icon: '🔍', description: 'Erste Diagnose abgeschlossen', condition: 'diagnostic >= 1' },
    { id: 'weakness-crusher', name: 'Schwächen-Bezwinger', icon: '💪', description: '3 Schwächen verbessert', condition: 'weaknessesImproved >= 3' },
    { id: 'endurance-fighter', name: 'Ausdauerkämpfer', icon: '🏃', description: '50 adaptive Übungen absolviert', condition: 'adaptiveExercises >= 50' },
    { id: 'perfectionist', name: 'Perfektionist', icon: '⭐', description: '5 Übungen in Folge mit 100%', condition: 'consecutivePerfect >= 5' },
    { id: 'goal-achiever', name: 'Lernziel erreicht', icon: '🎯', description: 'Session mit über 80% abgeschlossen', condition: 'sessionScore >= 0.8' }
];

// ===== OPERATOR ÜBUNGEN =====
const OPERATOR_EXERCISES = {
    nennen: [
        {
            id: 'nennen-1',
            question: 'Nennen Sie drei Ursachen für den Ausbruch des Ersten Weltkriegs.',
            expectedPoints: 3,
            sampleAnswer: ['Bündnissysteme (Dreibund, Triple Entente)', 'Nationalismus und imperialistische Rivalitäten', 'Wettrüsten und Militarismus', 'Balkankrise', 'Attentat von Sarajevo'],
            tips: 'Konzentriere dich auf die Hauptursachen. Jeder Punkt sollte kurz und prägnant sein.'
        },
        {
            id: 'nennen-2',
            question: 'Nennen Sie die drei Stände der französischen Gesellschaft vor der Revolution.',
            expectedPoints: 3,
            sampleAnswer: ['Erster Stand: Klerus/Geistlichkeit', 'Zweiter Stand: Adel', 'Dritter Stand: Bürger und Bauern'],
            tips: 'Die Ständeordnung war hierarchisch aufgebaut.'
        },
        {
            id: 'nennen-3',
            question: 'Nennen Sie vier wichtige Ereignisse der Französischen Revolution.',
            expectedPoints: 4,
            sampleAnswer: ['Sturm auf die Bastille 1789', 'Erklärung der Menschen- und Bürgerrechte', 'Hinrichtung Ludwigs XVI. 1793', 'Schreckensherrschaft (Terreur)', 'Sturz Robespierres 1794'],
            tips: 'Wähle die wichtigsten Meilensteine aus.'
        }
    ],
    beschreiben: [
        {
            id: 'beschreiben-1',
            question: 'Beschreiben Sie den Verlauf der Märzrevolution 1848 in Deutschland.',
            expectedPoints: 5,
            sampleAnswer: 'Die Märzrevolution begann im März 1848 mit Unruhen in verschiedenen deutschen Staaten. Inspiriert von der Februarrevolution in Frankreich forderten Bürger politische Reformen, Pressefreiheit und nationale Einheit. In Berlin kam es zu Barrikadenkämpfen, woraufhin Friedrich Wilhelm IV. Zugeständnisse machte. Die Nationalversammlung trat in der Frankfurter Paulskirche zusammen, um eine Verfassung auszuarbeiten.',
            tips: 'Strukturiere chronologisch: Beginn, Verlauf, wichtige Stationen.'
        }
    ],
    analysieren: [
        {
            id: 'analysieren-1',
            question: 'Analysieren Sie die Propaganda im Nationalsozialismus: Welche Methoden wurden eingesetzt?',
            expectedPoints: 6,
            sampleAnswer: 'Die NS-Propaganda nutzte verschiedene Methoden: 1) Massenkommunikation durch Radio (Volksempfänger) und Film, 2) Inszenierung von Großveranstaltungen (Reichsparteitage), 3) Personenkult um Hitler, 4) Verwendung einfacher Feindbilder, 5) Kontrolle aller Medien durch das Propagandaministerium, 6) Ansprache von Emotionen statt Vernunft.',
            tips: 'Gehe systematisch vor: Medium, Methode, Ziel, Wirkung.'
        }
    ],
    erklaeren: [
        {
            id: 'erklaeren-1',
            question: 'Erklären Sie, warum die Weimarer Republik scheiterte.',
            expectedPoints: 6,
            sampleAnswer: 'Die Weimarer Republik scheiterte aus mehreren Gründen: Die Dolchstoßlegende belastete die Demokratie von Anfang an. Die Weltwirtschaftskrise 1929 führte zu Massenarbeitslosigkeit und radikalisierte die Bevölkerung. Die Verfassung hatte Schwächen (Artikel 48, Verhältniswahlrecht ohne Sperrklausel). Antidemokratische Kräfte von links und rechts bekämpften die Republik. Das Bürgertum unterstützte die Demokratie nicht ausreichend.',
            tips: 'Nenne Ursachen und erkläre die Zusammenhänge zwischen ihnen.'
        }
    ],
    beurteilen: [
        {
            id: 'beurteilen-1',
            question: 'Beurteilen Sie die Außenpolitik Bismarcks.',
            expectedPoints: 7,
            sampleAnswer: 'Bismarcks Außenpolitik kann als erfolgreich beurteilt werden, da sie Deutschland eine lange Friedensperiode sicherte. Positiv: Das komplexe Bündnissystem isolierte Frankreich und verhinderte einen Zweifrontenkrieg. Der Rückversicherungsvertrag mit Russland zeugte von diplomatischem Geschick. Kritisch: Die Politik war zu sehr auf Bismarck zugeschnitten und brach nach seinem Rücktritt zusammen. Die Kolonialpolitik widersprach seiner anfänglichen Zurückhaltung. Insgesamt überwogen die stabilisierenden Elemente.',
            tips: 'Lege Beurteilungskriterien fest und wäge Pro und Contra ab.'
        }
    ],
    vergleichen: [
        {
            id: 'vergleichen-1',
            question: 'Vergleichen Sie die Französische Revolution mit der Russischen Revolution 1917.',
            expectedPoints: 6,
            sampleAnswer: 'Gemeinsamkeiten: Beide Revolutionen entstanden aus sozialer Unzufriedenheit und wirtschaftlicher Not. Beide stürzten das bestehende monarchische System. In beiden Fällen folgte eine radikale Phase mit Terror. Unterschiede: Die Französische Revolution hatte bürgerliche Ideale (Menschenrechte), die Russische kommunistische. Die soziale Trägerschaft war unterschiedlich (Bürgertum vs. Arbeiter/Soldaten). Die Ergebnisse waren verschieden: bürgerliche Gesellschaft vs. Diktatur des Proletariats.',
            tips: 'Strukturiere nach Vergleichskriterien und nenne immer beide Seiten.'
        }
    ]
};

// ===== KI CHAT ANTWORTEN (Offline-Fallback) =====
const AI_RESPONSES = {
    greeting: [
        'Hallo! Ich bin dein Geschichtstutor. Was möchtest du heute lernen?',
        'Willkommen zurück! Bereit für eine Zeitreise durch die Geschichte?',
        'Hi! Ich helfe dir gerne bei Geschichte. Was interessiert dich?'
    ],
    eselsbruecke: {
        'französische revolution': 'Merke dir "1789 - Die Bastille fällt, der König zählt" - Im Jahr 1789 stürmte das Volk die Bastille!',
        'wiener kongress': '1815 - "Nach Napoleons Fall tanzt Wien überall" - Der Wiener Kongress ordnete Europa nach Napoleon neu.',
        'reichsgründung': '1871 - "Einundsiebzig - Wilhelm ist König, aber auch Kaiser wenig" - Die deutsche Reichsgründung unter Wilhelm I.',
        'erster weltkrieg': '1914-1918: "Vierzehn bis achtzehn, der große Krieg bricht ein" - Die Jahre des Ersten Weltkriegs.',
        'mauerfall': '1989 - "Neunundachtzig, die Mauer geht fort, Freiheit das Wort!" - Der Fall der Berliner Mauer.',
        default: 'Eine gute Eselsbrücke für Geschichte: Verbinde das Jahr mit einem Reim oder Bild! Z.B. "1789 - Die Bastille fällt, der König zählt".'
    },
    zusammenfassung: {
        'französische revolution': 'Die Französische Revolution (1789-1799) war ein Wendepunkt der Geschichte:\n\n📌 Ursachen: Finanzielle Krise, soziale Ungleichheit, Aufklärungsideen\n📌 Beginn: Sturm auf die Bastille (14.7.1789)\n📌 Wichtige Phasen: Nationalversammlung, Schreckensherrschaft, Direktorium\n📌 Errungenschaften: Menschen- und Bürgerrechte, Ende des Absolutismus\n📌 Ende: Napoleons Machtergreifung 1799',
        'nationalsozialismus': 'Der Nationalsozialismus (1933-1945):\n\n📌 Machtergreifung: 30. Januar 1933\n📌 Ideologie: Rassismus, Antisemitismus, Führerprinzip\n📌 Terror: Verfolgung politischer Gegner, Holocaust\n📌 Krieg: Zweiter Weltkrieg (1939-1945)\n📌 Ende: Bedingungslose Kapitulation 8. Mai 1945',
        'kalter krieg': 'Der Kalte Krieg (1947-1991):\n\n📌 Konfliktparteien: USA (West) vs. UdSSR (Ost)\n📌 Kennzeichen: Kein direkter Krieg, aber Stellvertreterkriege\n📌 Symbole: Eiserner Vorhang, Berliner Mauer\n📌 Krisen: Kubakrise, Berlin-Blockade\n📌 Ende: Fall der Mauer 1989, Auflösung UdSSR 1991',
        default: 'Ich erstelle gerne eine Zusammenfassung! Nenne mir das Thema genauer. Beispiele:\n- Französische Revolution\n- Nationalsozialismus\n- Kalter Krieg\n- Weimarer Republik'
    },
    erklaerung: {
        'ständegesellschaft': 'Die Ständegesellschaft - einfach erklärt:\n\nStell dir vor, die Gesellschaft ist wie eine Pyramide:\n\n👑 OBEN: Der König (absolute Macht)\n⛪ 1. Stand: Klerus (Priester, Bischöfe) - ca. 1%\n🏰 2. Stand: Adel (Fürsten, Ritter) - ca. 2%\n👨‍🌾 3. Stand: Alle anderen - ca. 97%!\n\nDas Unfaire: Die oberen 3% zahlten kaum Steuern, der 3. Stand trug fast alle Lasten. Das führte zur Revolution!',
        'absolutismus': 'Absolutismus - einfach erklärt:\n\nDer König hat ALLE Macht:\n\n"Der Staat bin ich!" (Ludwig XIV.)\n\n📜 Keine Gewaltenteilung\n👑 König = Gesetzgeber + Richter + Herrscher\n🏰 Prunkvolle Hofhaltung (Versailles)\n⚔️ Stehendes Heer\n💰 Merkantilismus (Staat kontrolliert Wirtschaft)\n\nEnde: Aufklärung und Revolutionen brachten neue Ideen!',
        default: 'Ich erkläre dir gerne historische Begriffe! Frag mich zum Beispiel nach:\n- Ständegesellschaft\n- Absolutismus\n- Imperialismus\n- Nationalismus'
    },
    quiz: {
        default: 'Lass uns ein Quiz starten! Hier eine Frage:\n\n❓ Wann begann die Französische Revolution?\n\nA) 1776\nB) 1789\nC) 1799\nD) 1804\n\n(Schreib mir den Buchstaben deiner Antwort!)'
    },
    default: [
        'Interessante Frage! Lass mich dir dabei helfen...',
        'Das ist ein wichtiges Thema in der Geschichte!',
        'Gute Frage! Geschichte kann manchmal kompliziert sein, aber ich erkläre es dir.'
    ]
};

// ===== SOUND EFFEKTE (Base64 encoded kurze Töne) =====
const SOUNDS = {
    coin: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAACAf4B/gH+Af4B/gH+Af4A=',
    achievement: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAACAf4CAf4CAf4CAf4CAf4A=',
    correct: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAACAf4CAf4CAf4CAf4CAf4A=',
    wrong: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAACAf4B/gH+Af4B/gH+Af4A=',
    timer: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAACAf4CAf4CAf4CAf4CAf4A=',
    levelUp: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAACAf4CAf4CAf4CAf4CAf4A='
};

// ===== BIBLIOTHEK KATEGORIEN =====
const LIBRARY_CATEGORIES = [
    { id: 'fruehe-neuzeit', name: 'Frühe Neuzeit', icon: '⚓', color: '#daa520' },
    { id: 'neuzeit', name: '19. Jahrhundert', icon: '🏭', color: '#4a4a4a' },
    { id: 'zeitgeschichte', name: '20. Jahrhundert', icon: '🌍', color: '#2c3e50' },
    { id: 'methoden', name: 'Methoden', icon: '📝', color: '#667eea' },
    { id: 'notizen', name: 'Meine Notizen', icon: '📒', color: '#27ae60' },
    { id: 'favoriten', name: 'Favoriten', icon: '⭐', color: '#f39c12' }
];

// ===== LERNMATERIALIEN =====
const LEARNING_MATERIALS = [
    {
        id: 'mat-1',
        title: 'Die Französische Revolution - Überblick',
        category: 'fruehe-neuzeit',
        type: 'article',
        content: `# Die Französische Revolution (1789-1799)

## Ursachen
- **Finanzielle Krise**: Der Staat war bankrott
- **Soziale Ungleichheit**: Der 3. Stand trug alle Lasten
- **Ideen der Aufklärung**: Freiheit, Gleichheit, Volkssouveränität

## Verlauf
1. **1789**: Sturm auf die Bastille, Erklärung der Menschenrechte
2. **1791**: Erste Verfassung, konstitutionelle Monarchie
3. **1792**: Republik wird ausgerufen
4. **1793-94**: Schreckensherrschaft unter Robespierre
5. **1799**: Napoleon ergreift die Macht

## Folgen
- Ende des Absolutismus in Frankreich
- Verbreitung der Menschenrechtsidee
- Vorbild für andere Revolutionen`,
        difficulty: 2,
        readTime: 5
    },
    {
        id: 'mat-2',
        title: 'Der Erste Weltkrieg - Ursachen und Verlauf',
        category: 'zeitgeschichte',
        type: 'article',
        content: `# Der Erste Weltkrieg (1914-1918)

## Ursachen (MAIN)
- **M**ilitarismus: Wettrüsten der Großmächte
- **A**llianzen: Bündnissysteme (Dreibund, Triple Entente)
- **I**mperialismus: Konkurrenz um Kolonien
- **N**ationalismus: Übersteigerte Vaterlandsliebe

## Auslöser
Das Attentat von Sarajevo am 28. Juni 1914 auf Erzherzog Franz Ferdinand.

## Verlauf
- **1914**: Kriegsausbruch, Schlieffen-Plan scheitert
- **1915-17**: Stellungskrieg, Materialschlachten
- **1917**: USA tritt ein, Revolution in Russland
- **1918**: Deutsche Niederlage, Waffenstillstand am 11.11.

## Folgen
- 17 Millionen Tote
- Ende der Kaiserreiche
- Versailler Vertrag
- Grundlage für den 2. Weltkrieg`,
        difficulty: 2,
        readTime: 6
    },
    {
        id: 'mat-3',
        title: 'Die Weimarer Republik',
        category: 'zeitgeschichte',
        type: 'article',
        content: `# Die Weimarer Republik (1919-1933)

## Gründung
Nach der Novemberrevolution 1918 wurde am 9. November die Republik ausgerufen.

## Die Verfassung
- Demokratische Grundrechte
- Reichspräsident mit starker Stellung (Artikel 48!)
- Verhältniswahlrecht

## Phasen
1. **Krisenjahre (1919-1923)**: Inflation, Putschversuche
2. **Goldene Zwanziger (1924-1929)**: Stabilisierung, Kultur
3. **Niedergang (1929-1933)**: Weltwirtschaftskrise, Radikalisierung

## Warum scheiterte sie?
- Belastung durch Versailles
- Antidemokratische Kräfte
- Weltwirtschaftskrise
- Schwächen der Verfassung`,
        difficulty: 2,
        readTime: 5
    }
];

// ===== GESCHICHTSLEXIKON =====
const HISTORY_LEXICON = {
    // Klasse 8 Begriffe
    'absolutismus': {
        term: 'Absolutismus',
        definition: 'Regierungsform, in der der Herrscher (meist König) alle Macht in sich vereint ohne Kontrolle durch Parlament oder Verfassung.',
        example: 'Ludwig XIV. von Frankreich: "Der Staat bin ich!"',
        grade: 8
    },
    'aufklaerung': {
        term: 'Aufklärung',
        definition: 'Geistige Bewegung des 18. Jahrhunderts, die Vernunft und Wissenschaft über Tradition und Aberglauben stellte.',
        example: 'Kant: "Habe Mut, dich deines eigenen Verstandes zu bedienen!"',
        grade: 8
    },
    'restauration': {
        term: 'Restauration',
        definition: 'Wiederherstellung der politischen Ordnung vor der Französischen Revolution nach 1815.',
        example: 'Der Wiener Kongress stellte die alten Monarchien wieder her.',
        grade: 8
    },
    'nationalismus': {
        term: 'Nationalismus',
        definition: 'Ideologie, die die eigene Nation über andere stellt und nationale Einheit und Unabhängigkeit fordert.',
        example: 'Die deutsche Einigungsbewegung im 19. Jahrhundert.',
        grade: 8
    },
    'liberalismus': {
        term: 'Liberalismus',
        definition: 'Politische Weltanschauung, die individuelle Freiheit, Rechtsstaatlichkeit und freie Marktwirtschaft betont.',
        example: 'Forderungen der Revolution 1848 nach Grundrechten.',
        grade: 8
    },
    'industrialisierung': {
        term: 'Industrialisierung',
        definition: 'Übergang von der Agrar- zur Industriegesellschaft durch Mechanisierung und Fabrikproduktion.',
        example: 'Die Erfindung der Dampfmaschine durch James Watt.',
        grade: 8
    },
    'soziale-frage': {
        term: 'Soziale Frage',
        definition: 'Bezeichnung für die sozialen Probleme der Arbeiterschaft während der Industrialisierung.',
        example: 'Kinderarbeit, niedrige Löhne, schlechte Wohnverhältnisse.',
        grade: 8
    },
    'imperialismus': {
        term: 'Imperialismus',
        definition: 'Streben von Staaten nach Kolonien, Einflusszonen und Weltmacht im späten 19. Jahrhundert.',
        example: 'Der "Wettlauf um Afrika" nach der Berliner Konferenz 1884/85.',
        grade: 8
    },
    // Klasse 9 Begriffe
    'antisemitismus': {
        term: 'Antisemitismus',
        definition: 'Feindschaft und Hass gegen Juden als religiöse oder angebliche "rassische" Gruppe.',
        example: 'Die Nürnberger Rassengesetze von 1935.',
        grade: 9
    },
    'gleichschaltung': {
        term: 'Gleichschaltung',
        definition: 'Unterordnung aller gesellschaftlichen Bereiche unter die NS-Ideologie nach 1933.',
        example: 'Auflösung von Parteien, Gewerkschaften, Vereinen.',
        grade: 9
    },
    'holocaust': {
        term: 'Holocaust/Shoah',
        definition: 'Systematische Ermordung von etwa 6 Millionen Juden durch das NS-Regime.',
        example: 'Vernichtungslager Auschwitz-Birkenau.',
        grade: 9
    },
    'kalter-krieg': {
        term: 'Kalter Krieg',
        definition: 'Konflikt zwischen USA und UdSSR (1947-1991) ohne direkte militärische Auseinandersetzung.',
        example: 'Berliner Mauer, Kubakrise, Wettrüsten.',
        grade: 9
    },
    'planwirtschaft': {
        term: 'Planwirtschaft',
        definition: 'Wirtschaftssystem, in dem der Staat Produktion und Verteilung aller Güter zentral plant.',
        example: 'Die Wirtschaft der DDR und der Sowjetunion.',
        grade: 9
    },
    'propaganda': {
        term: 'Propaganda',
        definition: 'Gezielte Beeinflussung der öffentlichen Meinung durch einseitige Information.',
        example: 'NS-Propaganda durch das Reichspropagandaministerium unter Goebbels.',
        grade: 9
    },
    // Klasse 10 Begriffe
    'bolschewiki': {
        term: 'Bolschewiki',
        definition: 'Radikale Fraktion der russischen Sozialdemokraten unter Lenin, die 1917 die Macht übernahm.',
        example: 'Die Oktoberrevolution 1917.',
        grade: 10
    },
    'stalinismus': {
        term: 'Stalinismus',
        definition: 'Totalitäre Herrschaftsform in der Sowjetunion unter Stalin mit Terror, Personenkult und Zwangskollektivierung.',
        example: 'Der Große Terror 1937/38 mit Millionen Opfern.',
        grade: 10
    },
    'marxismus': {
        term: 'Marxismus',
        definition: 'Von Karl Marx begründete Gesellschaftstheorie, die Geschichte als Klassenkampf erklärt.',
        example: 'Das Kommunistische Manifest von 1848.',
        grade: 10
    },
    'maoismus': {
        term: 'Maoismus',
        definition: 'Chinesische Variante des Kommunismus unter Mao Zedong mit Betonung der Bauernschaft.',
        example: 'Die Kulturrevolution in China (1966-1976).',
        grade: 10
    },
    'laizismus': {
        term: 'Laizismus',
        definition: 'Strikte Trennung von Staat und Religion.',
        example: 'Die Reformen Atatürks in der Türkei ab 1923.',
        grade: 10
    },
    'glasnost': {
        term: 'Glasnost',
        definition: 'Politik der Offenheit und Transparenz unter Gorbatschow in der Sowjetunion.',
        example: 'Lockerung der Zensur in den 1980er Jahren.',
        grade: 10
    },
    'perestroika': {
        term: 'Perestroika',
        definition: 'Umgestaltung und Reform des sowjetischen Systems unter Gorbatschow.',
        example: 'Wirtschaftsreformen und begrenzte Marktöffnung.',
        grade: 10
    },
    'europaeische-integration': {
        term: 'Europäische Integration',
        definition: 'Prozess der politischen und wirtschaftlichen Vereinigung europäischer Staaten seit 1951.',
        example: 'Von der Montanunion zur Europäischen Union.',
        grade: 10
    },
    'nato': {
        term: 'NATO',
        definition: 'North Atlantic Treaty Organization - westliches Verteidigungsbündnis seit 1949.',
        example: 'Gegenpol zum Warschauer Pakt während des Kalten Krieges.',
        grade: 10
    },
    'warschauer-pakt': {
        term: 'Warschauer Pakt',
        definition: 'Militärbündnis der sozialistischen Staaten Osteuropas unter sowjetischer Führung (1955-1991).',
        example: 'Niederschlagung des Prager Frühlings 1968.',
        grade: 10
    },
    'voelkermord': {
        term: 'Völkermord (Genozid)',
        definition: 'Systematische Zerstörung einer nationalen, ethnischen, rassischen oder religiösen Gruppe.',
        example: 'Holocaust, Völkermord an den Armeniern 1915.',
        grade: 10
    },
    'ost-west-konflikt': {
        term: 'Ost-West-Konflikt',
        definition: 'Systemkonflikt zwischen kapitalistischem Westen und kommunistischem Osten nach 1945.',
        example: 'Die Teilung Deutschlands in BRD und DDR.',
        grade: 10
    }
};

// ===== TÄGLICHE CHALLENGES =====
const DAILY_CHALLENGES = [
    { id: 'dc-1', name: 'Quiz-Runde', description: 'Beantworte 5 Quiz-Fragen richtig', reward: 20, type: 'quiz', target: 5 },
    { id: 'dc-2', name: 'Zeitreisender', description: 'Erkunde 3 Ereignisse im Zeitstrahl', reward: 15, type: 'timeline', target: 3 },
    { id: 'dc-3', name: 'Operator-Training', description: 'Schau dir 2 Operatoren an', reward: 10, type: 'operators', target: 2 },
    { id: 'dc-4', name: 'Lernmarathon', description: 'Lerne 30 Minuten mit dem Timer', reward: 30, type: 'timer', target: 30 },
    { id: 'dc-5', name: 'Strategie-Entdecker', description: 'Lerne eine neue Lernstrategie kennen', reward: 15, type: 'strategies', target: 1 },
    { id: 'dc-6', name: 'Chat-Profi', description: 'Stelle 3 Fragen an den KI-Tutor', reward: 15, type: 'chat', target: 3 },
    { id: 'dc-7', name: 'Memory-Meister', description: 'Gewinne ein Memory-Spiel', reward: 25, type: 'memory', target: 1 },
    { id: 'dc-8', name: 'Notizen-Macher', description: 'Erstelle eine Notiz', reward: 10, type: 'notes', target: 1 }
];
