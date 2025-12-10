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
const LEARNING_STRATEGIES = [
    {
        id: 'pomodoro',
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
    { year: 1789, title: 'Französische Revolution', era: 'fruehe-neuzeit', description: 'Sturm auf die Bastille. Beginn einer neuen Ära.' },

    // 19. Jahrhundert
    { year: 1804, title: 'Napoleon wird Kaiser', era: '19jh', description: 'Napoleon krönt sich selbst zum Kaiser der Franzosen.' },
    { year: 1815, title: 'Wiener Kongress', era: '19jh', description: 'Neuordnung Europas nach Napoleon.' },
    { year: 1848, title: 'Märzrevolution', era: '19jh', description: 'Revolutionen in ganz Europa für Freiheit und Einheit.' },
    { year: 1861, title: 'Einigung Italiens', era: '19jh', description: 'Viktor Emanuel II. wird König von Italien.' },
    { year: 1871, title: 'Deutsche Reichsgründung', era: '19jh', description: 'Wilhelm I. wird Kaiser. Deutschland vereint.' },
    { year: 1884, title: 'Berliner Konferenz', era: '19jh', description: 'Europa teilt Afrika unter sich auf.' },

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
    { year: 1990, title: 'Deutsche Wiedervereinigung', era: '20jh', description: 'Deutschland ist wieder vereint.' }
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
            }
        ]
    }
];

// ===== FUN FACTS =====
const FUN_FACTS = [
    'Die Pyramiden von Gizeh waren über 3.800 Jahre lang die höchsten Bauwerke der Welt!',
    'Kleopatra lebte näher an der Mondlandung als am Bau der Pyramiden.',
    'Die kürzeste Kriegserklärung dauerte nur 38 Minuten (Großbritannien vs. Sansibar, 1896).',
    'Napoleon war nicht klein! Mit 1,68m war er für seine Zeit durchschnittlich groß.',
    'Die Chinesische Mauer ist vom Mond aus NICHT sichtbar - das ist ein Mythos.',
    'Im alten Rom wurde Urin zum Wäschewaschen und Zähneputzen verwendet.',
    'Die Wikinger nannten Amerika "Vinland" und erreichten es 500 Jahre vor Kolumbus.',
    'Im Mittelalter glaubte man, Tomaten seien giftig.',
    'Der Hundertjährige Krieg dauerte eigentlich 116 Jahre (1337-1453).',
    'Cäsar wurde nicht am 15. März geboren - er wurde an diesem Tag ermordet.',
    'Die erste U-Bahn der Welt wurde 1863 in London eröffnet.',
    'Das Römische Reich existierte länger als die USA bisher.',
    'Im alten Ägypten wurden Katzen so verehrt, dass bei deren Tod die Familie trauerte.',
    'Die Azteken nutzten Kakaobohnen als Währung.',
    'Der Eiffelturm sollte ursprünglich nach 20 Jahren abgerissen werden.'
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
    { id: 'rich', name: 'Wohlhabend', icon: '🐄', description: '100 Münzen gesammelt', condition: 'totalCoins >= 100' }
];
