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
        fullDesc: 'Statt alles auf einmal zu lernen, verteilst du den Stoff über mehrere Tage. Die Abstände zwischen Wiederholungen werden größer.',
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
        historyTip: 'Erstelle einen Lernplan: Montag neue Epoche, Dienstag Wiederholung, Freitag erneute Wiederholung.'
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
const TIMELINE_EVENTS = [
    // Antike
    { year: -753, title: 'Gründung Roms', era: 'antike', description: 'Der Legende nach gründeten Romulus und Remus die Stadt Rom.' },
    { year: -500, title: 'Attische Demokratie', era: 'antike', description: 'In Athen entsteht die erste Demokratie der Geschichte.' },
    { year: -336, title: 'Alexander der Große', era: 'antike', description: 'Alexander wird König von Makedonien und erobert ein Weltreich.' },
    { year: -44, title: 'Ermordung Caesars', era: 'antike', description: 'Julius Caesar wird im Senat ermordet. Ende der Republik naht.' },
    { year: 476, title: 'Ende Westroms', era: 'antike', description: 'Der letzte weströmische Kaiser wird abgesetzt. Ende der Antike.' },

    // Mittelalter
    { year: 800, title: 'Kaiserkrönung Karls', era: 'mittelalter', description: 'Karl der Große wird in Rom zum Kaiser gekrönt.' },
    { year: 962, title: 'Otto I. wird Kaiser', era: 'mittelalter', description: 'Beginn des Heiligen Römischen Reiches Deutscher Nation.' },
    { year: 1077, title: 'Gang nach Canossa', era: 'mittelalter', description: 'Heinrich IV. bittet Papst Gregor VII. um Vergebung.' },
    { year: 1096, title: 'Erster Kreuzzug', era: 'mittelalter', description: 'Beginn der Kreuzzugbewegung nach Jerusalem.' },
    { year: 1215, title: 'Magna Carta', era: 'mittelalter', description: 'Der englische König muss Adelsrechte anerkennen.' },
    { year: 1347, title: 'Die Pest erreicht Europa', era: 'mittelalter', description: 'Der Schwarze Tod tötet ein Drittel der europäischen Bevölkerung.' },
    { year: 1453, title: 'Fall Konstantinopels', era: 'mittelalter', description: 'Die Osmanen erobern Konstantinopel. Ende des Byzantinischen Reiches.' },

    // Frühe Neuzeit
    { year: 1492, title: 'Entdeckung Amerikas', era: 'fruehe-neuzeit', description: 'Kolumbus erreicht die "Neue Welt".' },
    { year: 1517, title: 'Reformation', era: 'fruehe-neuzeit', description: 'Luther veröffentlicht seine 95 Thesen.' },
    { year: 1618, title: 'Dreißigjähriger Krieg beginnt', era: 'fruehe-neuzeit', description: 'Prager Fenstersturz löst europäischen Krieg aus.' },
    { year: 1648, title: 'Westfälischer Frieden', era: 'fruehe-neuzeit', description: 'Ende des Dreißigjährigen Krieges, neues Staatensystem.' },
    { year: 1769, title: 'Watts Dampfmaschine', era: 'fruehe-neuzeit', description: 'James Watt verbessert die Dampfmaschine - Motor der Industrialisierung.' },
    { year: 1789, title: 'Französische Revolution', era: 'fruehe-neuzeit', description: 'Sturm auf die Bastille. Beginn einer neuen Ära.' },

    // 19. Jahrhundert
    { year: 1804, title: 'Napoleon wird Kaiser', era: '19jh', description: 'Napoleon krönt sich selbst zum Kaiser der Franzosen.' },
    { year: 1815, title: 'Wiener Kongress', era: '19jh', description: 'Neuordnung Europas nach Napoleon.' },
    { year: 1825, title: 'Erste Eisenbahn in England', era: '19jh', description: 'Stockton-Darlington-Eisenbahn - Beginn des Eisenbahnzeitalters.' },
    { year: 1848, title: 'Märzrevolution', era: '19jh', description: 'Revolutionen in ganz Europa für Freiheit und Einheit.' },
    { year: 1848, title: 'Kommunistisches Manifest', era: '19jh', description: 'Marx und Engels veröffentlichen das Kommunistische Manifest.' },
    { year: 1861, title: 'Einigung Italiens', era: '19jh', description: 'Viktor Emanuel II. wird König von Italien.' },
    { year: 1863, title: 'Gründung des ADAV', era: '19jh', description: 'Ferdinand Lassalle gründet den Allgemeinen Deutschen Arbeiterverein - erste Arbeiterpartei.' },
    { year: 1869, title: 'Gründung der SDAP', era: '19jh', description: 'August Bebel und Wilhelm Liebknecht gründen die Sozialdemokratische Arbeiterpartei.' },
    { year: 1871, title: 'Deutsche Reichsgründung', era: '19jh', description: 'Wilhelm I. wird Kaiser. Deutschland vereint.' },
    { year: 1884, title: 'Berliner Konferenz', era: '19jh', description: 'Europa teilt Afrika unter sich auf.' },
    { year: 1890, title: 'Ende der Ära Bismarck', era: '19jh', description: 'Wilhelm II. entlässt Bismarck. Beginn der Weltpolitik.' },

    // 20. Jahrhundert
    { year: 1914, title: 'Beginn Erster Weltkrieg', era: '20jh', description: 'Attentat von Sarajevo löst Weltkrieg aus.' },
    { year: 1917, title: 'Russische Revolution', era: '20jh', description: 'Bolschewiki übernehmen die Macht in Russland.' },
    { year: 1918, title: 'Ende Erster Weltkrieg', era: '20jh', description: 'Deutschland kapituliert. Kaiser dankt ab.' },
    { year: 1919, title: 'Weimarer Republik', era: '20jh', description: 'Erste deutsche Demokratie wird gegründet.' },
    { year: 1929, title: 'Weltwirtschaftskrise', era: '20jh', description: 'Börsencrash führt zu globaler Depression.' },
    { year: 1933, title: 'Machtergreifung Hitlers', era: '20jh', description: 'Hitler wird Reichskanzler. Beginn der NS-Diktatur.' },
    { year: 1939, title: 'Beginn Zweiter Weltkrieg', era: '20jh', description: 'Deutschland überfällt Polen.' },
    { year: 1945, title: 'Ende Zweiter Weltkrieg', era: '20jh', description: 'Bedingungslose Kapitulation Deutschlands.' },
    { year: 1949, title: 'Gründung BRD und DDR', era: '20jh', description: 'Deutschland wird in zwei Staaten geteilt.' },
    { year: 1961, title: 'Bau der Berliner Mauer', era: '20jh', description: 'Die DDR riegelt West-Berlin ab.' },
    { year: 1989, title: 'Fall der Berliner Mauer', era: '20jh', description: 'Die Mauer fällt. Ende des Kalten Krieges.' },
    { year: 1990, title: 'Deutsche Wiedervereinigung', era: '20jh', description: 'Deutschland ist wieder vereint.' },

    // Zusätzliche Events für Klasse 8
    { year: 1806, title: 'Ende des Heiligen Römischen Reiches', era: '19jh', description: 'Franz II. legt die Kaiserkrone nieder. Ende des HRR nach über 800 Jahren.' },
    { year: 1813, title: 'Völkerschlacht bei Leipzig', era: '19jh', description: 'Entscheidende Niederlage Napoleons gegen die Koalition.' },
    { year: 1817, title: 'Wartburgfest', era: '19jh', description: 'Studentenversammlung fordert nationale Einheit und Freiheit.' },
    { year: 1832, title: 'Hambacher Fest', era: '19jh', description: 'Größte politische Demonstration des Vormärz für Einheit und Freiheit.' },
    { year: 1835, title: 'Erste deutsche Eisenbahn', era: '19jh', description: 'Die "Adler" fährt von Nürnberg nach Fürth - Beginn des Eisenbahnzeitalters.' },
    { year: 1862, title: 'Bismarck wird preußischer Ministerpräsident', era: '19jh', description: 'Beginn der Bismarckschen Politik zur deutschen Einigung.' },
    { year: 1864, title: 'Deutsch-Dänischer Krieg', era: '19jh', description: 'Erster der drei Einigungskriege.' },
    { year: 1866, title: 'Deutscher Krieg (Preußen vs. Österreich)', era: '19jh', description: 'Preußen siegt bei Königgrätz und übernimmt die Führung.' },
    { year: 1870, title: 'Deutsch-Französischer Krieg', era: '19jh', description: 'Dritter Einigungskrieg führt zur Reichsgründung.' },
    { year: 1878, title: 'Sozialistengesetze', era: '19jh', description: 'Bismarck verbietet sozialdemokratische Organisationen.' },
    { year: 1883, title: 'Beginn der Sozialgesetzgebung', era: '19jh', description: 'Krankenversicherung als erstes Sozialgesetz.' },

    // Zusätzliche Events für Klasse 9
    { year: 1935, title: 'Nürnberger Rassengesetze', era: '20jh', description: 'Juden werden systematisch aus der Gesellschaft ausgeschlossen.' },
    { year: 1938, title: 'Reichspogromnacht', era: '20jh', description: 'Organisierte Gewalt gegen jüdische Geschäfte und Synagogen.' },
    { year: 1941, title: 'Angriff auf die Sowjetunion', era: '20jh', description: 'Unternehmen Barbarossa beginnt den Vernichtungskrieg im Osten.' },
    { year: 1942, title: 'Wannseekonferenz', era: '20jh', description: 'Planung der "Endlösung der Judenfrage".' },
    { year: 1944, title: 'D-Day - Landung in der Normandie', era: '20jh', description: 'Die Alliierten eröffnen die zweite Front im Westen.' },
    { year: 1948, title: 'Berlin-Blockade und Luftbrücke', era: '20jh', description: 'Die Sowjetunion blockiert West-Berlin, die Alliierten versorgen es per Luftbrücke.' },
    { year: 1953, title: 'Volksaufstand in der DDR', era: '20jh', description: 'Arbeiterproteste werden von sowjetischen Panzern niedergeschlagen.' },
    { year: 1962, title: 'Kubakrise', era: '20jh', description: 'Die Welt steht am Rand eines Atomkriegs.' },
    { year: 1963, title: 'Kennedy in Berlin', era: '20jh', description: '"Ich bin ein Berliner" - Symbol der amerikanischen Solidarität.' },
    { year: 1968, title: 'Prager Frühling', era: '20jh', description: 'Reformversuch in der Tschechoslowakei wird von Warschauer-Pakt-Truppen beendet.' },
    { year: 1972, title: 'Grundlagenvertrag BRD-DDR', era: '20jh', description: 'Beide deutsche Staaten erkennen sich de facto an.' },

    // Zusätzliche Events für Klasse 10 (Russland, China, Türkei)
    { year: 1839, title: 'Erster Opiumkrieg beginnt', era: '19jh', description: 'Großbritannien erzwingt die Öffnung Chinas.' },
    { year: 1861, title: 'Abschaffung der Leibeigenschaft in Russland', era: '19jh', description: 'Zar Alexander II. befreit die Bauern.' },
    { year: 1905, title: 'Russische Revolution', era: '20jh', description: 'Erste Revolution in Russland nach dem "Blutsonntag".' },
    { year: 1908, title: 'Jungtürkische Revolution', era: '20jh', description: 'Die Jungtürken erzwingen eine konstitutionelle Regierung.' },
    { year: 1911, title: 'Xinhai-Revolution in China', era: '20jh', description: 'Ende der Qing-Dynastie und der 2000-jährigen Kaiserzeit.' },
    { year: 1912, title: 'Republik China gegründet', era: '20jh', description: 'Sun Yat-sen wird erster Präsident der Republik China.' },
    { year: 1915, title: 'Völkermord an den Armeniern', era: '20jh', description: 'Systematische Vernichtung der armenischen Bevölkerung im Osmanischen Reich.' },
    { year: 1922, title: 'Ende des Osmanischen Reiches', era: '20jh', description: 'Das Sultanat wird abgeschafft.' },
    { year: 1923, title: 'Gründung der Republik Türkei', era: '20jh', description: 'Atatürk gründet die moderne Türkei mit säkularer Verfassung.' },
    { year: 1924, title: 'Tod Lenins', era: '20jh', description: 'Beginn des Machtkampfes, den Stalin gewinnt.' },
    { year: 1934, title: 'Langer Marsch in China', era: '20jh', description: 'Rückzug der Kommunisten unter Mao - Mythos der KP China.' },
    { year: 1937, title: 'Großer Terror in der Sowjetunion', era: '20jh', description: 'Stalins Säuberungen erreichen ihren Höhepunkt.' },
    { year: 1949, title: 'Gründung der Volksrepublik China', era: '20jh', description: 'Mao Zedong ruft die Volksrepublik aus.' },
    { year: 1953, title: 'Tod Stalins', era: '20jh', description: 'Ende der stalinistischen Ära in der Sowjetunion.' },
    { year: 1958, title: 'Großer Sprung nach vorn', era: '20jh', description: 'Maos Industrialisierungskampagne verursacht Hungersnot.' },
    { year: 1966, title: 'Kulturrevolution beginnt', era: '20jh', description: 'Mao startet die Kulturrevolution mit den Roten Garden.' },
    { year: 1976, title: 'Tod Maos', era: '20jh', description: 'Ende der Mao-Ära, Beginn der Reformen unter Deng Xiaoping.' },
    { year: 1985, title: 'Gorbatschow kommt an die Macht', era: '20jh', description: 'Beginn von Glasnost und Perestroika.' },
    { year: 1989, title: 'Tiananmen-Massaker', era: '20jh', description: 'Gewaltsame Niederschlagung der Demokratiebewegung in Peking.' },
    { year: 1991, title: 'Auflösung der Sowjetunion', era: '20jh', description: 'Das Ende der UdSSR und des Kalten Krieges.' },

    // Europäische Integration
    { year: 1951, title: 'Gründung der Montanunion (EGKS)', era: '20jh', description: 'Erster Schritt zur europäischen Integration.' },
    { year: 1957, title: 'Römische Verträge', era: '20jh', description: 'Gründung der EWG - Vorläufer der EU.' },
    { year: 1993, title: 'Vertrag von Maastricht', era: '20jh', description: 'Die Europäische Union entsteht.' },
    { year: 2002, title: 'Einführung des Euro', era: '20jh', description: 'Die gemeinsame Währung wird Bargeld.' }
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
