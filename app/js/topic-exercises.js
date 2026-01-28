// ===== THEMENBASIERTE ÜBUNGEN =====
// Jedes Thema hat mindestens 20 Übungen mit verschiedenen Operatoren und Methoden

const TOPIC_EXERCISES = {
    // ========================================
    // KLASSE 8 THEMEN
    // ========================================

    'franzoesische-revolution': [
        // AFB I - Reproduktion (Übungen 1-7)
        {
            id: 'fr-1',
            operator: 'nennen',
            afb: 1,
            method: 'reproduktion',
            question: 'Nennen Sie die drei Stände der französischen Gesellschaft vor 1789.',
            points: 3,
            sampleAnswer: ['1. Stand: Klerus (Geistlichkeit)', '2. Stand: Adel', '3. Stand: Bürgertum und Bauern (ca. 97% der Bevölkerung)'],
            tips: 'Die Ständeordnung war hierarchisch. Der 3. Stand trug die Hauptlast der Steuern.'
        },
        {
            id: 'fr-2',
            operator: 'nennen',
            afb: 1,
            method: 'reproduktion',
            question: 'Nennen Sie vier wichtige Ereignisse der Französischen Revolution 1789-1794.',
            points: 4,
            sampleAnswer: ['Sturm auf die Bastille (14.7.1789)', 'Erklärung der Menschen- und Bürgerrechte (26.8.1789)', 'Hinrichtung Ludwig XVI. (21.1.1793)', 'Schreckensherrschaft/Terreur (1793-1794)'],
            tips: 'Konzentriere dich auf die wichtigsten Wendepunkte der Revolution.'
        },
        {
            id: 'fr-3',
            operator: 'beschreiben',
            afb: 1,
            method: 'reproduktion',
            question: 'Beschreiben Sie die wirtschaftliche und soziale Situation Frankreichs vor der Revolution.',
            points: 6,
            sampleAnswer: 'Frankreich war Ende des 18. Jahrhunderts von schweren wirtschaftlichen und sozialen Problemen geprägt: Der Staat war durch kostspielige Kriege und die luxuriöse Hofhaltung praktisch bankrott. Missernten führten zu Hungersnöten. Die Steuerlast lag fast ausschließlich beim 3. Stand, während Klerus und Adel privilegiert waren. Die wachsende Unzufriedenheit des Bürgertums und der Bauern bildete den Nährboden für revolutionäre Ideen.',
            tips: 'Strukturiere nach: Staatsfinanzen, Wirtschaft, soziale Lage, Privilegien.'
        },
        {
            id: 'fr-4',
            operator: 'beschreiben',
            afb: 1,
            method: 'reproduktion',
            question: 'Beschreiben Sie den Ablauf des Sturms auf die Bastille am 14. Juli 1789.',
            points: 5,
            sampleAnswer: 'Am 14. Juli 1789 zog eine bewaffnete Menschenmenge zum Gefängnis Bastille in Paris. Sie forderten die Herausgabe von Waffen und Munition. Nach stundenlangem Kampf kapitulierte die Besatzung. Die Bastille wurde gestürmt und teilweise zerstört. Obwohl nur wenige Gefangene befreit wurden, wurde der Sturm zum Symbol des Kampfes gegen die Tyrannei.',
            tips: 'Chronologisch strukturieren: Anlass, Verlauf, Ergebnis, Bedeutung.'
        },
        {
            id: 'fr-5',
            operator: 'zusammenfassen',
            afb: 1,
            method: 'reproduktion',
            question: 'Fassen Sie die Hauptaussagen der Menschen- und Bürgerrechtserklärung von 1789 zusammen.',
            points: 5,
            sampleAnswer: 'Die Erklärung verkündete grundlegende Prinzipien: Alle Menschen sind frei und gleich an Rechten geboren. Freiheit, Eigentum, Sicherheit und Widerstand gegen Unterdrückung sind natürliche Menschenrechte. Die Souveränität liegt beim Volk, nicht beim Monarchen. Gewaltenteilung ist notwendig. Meinungs- und Religionsfreiheit werden garantiert.',
            tips: 'Fokussiere auf die Kernprinzipien: Freiheit, Gleichheit, Volkssouveränität.'
        },
        {
            id: 'fr-6',
            operator: 'wiedergeben',
            afb: 1,
            method: 'reproduktion',
            question: 'Geben Sie die Phasen der Französischen Revolution von 1789 bis 1799 wieder.',
            points: 5,
            sampleAnswer: '1789-1791: Gemäßigte Phase, konstitutionelle Monarchie. 1792-1793: Radikalisierung, Ausrufung der Republik, Hinrichtung des Königs. 1793-1794: Schreckensherrschaft unter Robespierre und den Jakobinern. 1794-1795: Thermidor-Reaktion, Ende der Terreur. 1795-1799: Direktorium, politische Instabilität. 1799: Napoleons Staatsstreich.',
            tips: 'Jede Phase hat charakteristische Merkmale - benenne diese kurz.'
        },
        {
            id: 'fr-7',
            operator: 'skizzieren',
            afb: 1,
            method: 'reproduktion',
            question: 'Skizzieren Sie die Verfassung von 1791 in Grundzügen.',
            points: 4,
            sampleAnswer: 'Konstitutionelle Monarchie: König behält Exekutivgewalt, gesetzgebende Nationalversammlung. Gewaltenteilung eingeführt. Wahlrecht an Vermögen gebunden (Zensuswahlrecht). Menschen- und Bürgerrechte verankert. Säkularisierung von Kirchengütern.',
            tips: 'Grundzüge bedeutet: Staatsform, Machtverteilung, wichtigste Prinzipien.'
        },

        // AFB II - Reorganisation/Transfer (Übungen 8-14)
        {
            id: 'fr-8',
            operator: 'erklaeren',
            afb: 2,
            method: 'transfer',
            question: 'Erklären Sie, warum die Französische Revolution 1789 ausbrach.',
            points: 7,
            sampleAnswer: 'Die Revolution hatte mehrere Ursachen: Wirtschaftlich war der Staat bankrott durch Kriege und Luxusausgaben, was zu Steuererhöhungen führte. Sozial herrschte große Ungleichheit - der 3. Stand trug alle Lasten, hatte aber keine Rechte. Politisch lehnte der Absolutismus jede Mitsprache ab. Ideengeschichtlich verbreiteten Aufklärer wie Rousseau und Voltaire Ideen von Freiheit und Volkssouveränität. Unmittelbarer Auslöser waren Missernten und Hungersnöte 1788/89. Diese Faktoren verstärkten sich gegenseitig und führten zur Explosion.',
            tips: 'Nenne verschiedene Ursachenebenen und zeige deren Zusammenwirken.'
        },
        {
            id: 'fr-9',
            operator: 'analysieren',
            afb: 2,
            method: 'quellenanalyse',
            question: 'Analysieren Sie die Karikatur "Der dritte Stand trägt die Last": Was kritisiert der Künstler?',
            points: 6,
            sampleAnswer: 'Die Karikatur zeigt einen gebückten Mann (3. Stand), der auf seinem Rücken Geistlichkeit und Adel trägt. Bildanalyse: Der Bauer ist erschöpft, die beiden oberen Stände sitzen bequem. Intention: Kritik an der ungerechten Lastenverteilung. Die privilegierten Stände leben auf Kosten des Volkes. Historischer Kontext: Typisch für vorrevolutionäre Kritik am Ancien Régime. Wirkung: Emotionalisierung, Sympathie für den 3. Stand.',
            tips: 'Struktur: Beschreibung - Deutung - Kontext - Intention - Wirkung.'
        },
        {
            id: 'fr-10',
            operator: 'einordnen',
            afb: 2,
            method: 'transfer',
            question: 'Ordnen Sie die Französische Revolution in den Kontext der Aufklärung ein.',
            points: 6,
            sampleAnswer: 'Die Aufklärung (17./18. Jh.) schuf die geistigen Grundlagen der Revolution: Rousseau forderte Volkssouveränität ("Gesellschaftsvertrag"), Montesquieu entwickelte die Gewaltenteilung, Voltaire kämpfte für Toleranz und gegen Absolutismus. Diese Ideen wurden in der Revolution praktisch umgesetzt: Die Menschenrechtserklärung basiert auf Aufklärungsprinzipien. Die Revolution war somit der Versuch, aufklärerische Theorie in politische Praxis umzusetzen. Sie verbreitete diese Ideen in ganz Europa.',
            tips: 'Zeige die Verbindung zwischen Aufklärungsphilosophie und revolutionärer Praxis.'
        },
        {
            id: 'fr-11',
            operator: 'vergleichen',
            afb: 2,
            method: 'transfer',
            question: 'Vergleichen Sie die Situation des französischen Adels vor und nach 1789.',
            points: 6,
            sampleAnswer: 'Vorher: Privilegierte Stellung, Steuerfreiheit, politische Macht, großer Landbesitz, eigene Gerichtsbarkeit, Zugang zu hohen Ämtern. Nachher: Abschaffung der Adelsprivilegien (4.8.1789), Verlust von Ländereien durch Säkularisierung, keine Sonderrechte mehr, viele flohen ins Ausil (Emigranten), rechtliche Gleichstellung mit allen Bürgern. Gemeinsam: Verlust der gesellschaftlichen Vormachtstellung bedeutete kompletten Machtverlust.',
            tips: 'Systematischer Vergleich nach Kriterien: Rechte, Privilegien, Besitz, Macht.'
        },
        {
            id: 'fr-12',
            operator: 'herausarbeiten',
            afb: 2,
            method: 'textanalyse',
            question: 'Arbeiten Sie aus einer Rede Robespierres die Rechtfertigung der Schreckensherrschaft heraus.',
            points: 6,
            sampleAnswer: 'Robespierres Argumentation: Die Republik ist in Gefahr durch innere (Konterrevolutionäre) und äußere Feinde (Koalitionskriege). Terror ist notwendig, um die Revolution zu schützen. "Terror ist nichts anderes als schnelle und strenge Gerechtigkeit". Die Tugend muss durch Schrecken durchgesetzt werden. Ziel: Rettung der Republik und Verwirklichung der Freiheit. Der Zweck (Freiheit) heiligt die Mittel (Terror). Kritische Einordnung: Diese Logik führte zu Willkürherrschaft und tausenden Todesopfern.',
            tips: 'Identifiziere: These, Argumente, Feindbilder, Rechtfertigungsmuster.'
        },
        {
            id: 'fr-13',
            operator: 'charakterisieren',
            afb: 2,
            method: 'transfer',
            question: 'Charakterisieren Sie die politische Rolle der Jakobiner während der Revolution.',
            points: 6,
            sampleAnswer: 'Die Jakobiner waren ein radikaler politischer Klub: Ideologisch forderten sie eine demokratische Republik und soziale Gleichheit. Führungsfiguren waren Robespierre, Marat und Danton. Politisch setzten sie die Hinrichtung des Königs durch und etablierten die Schreckensherrschaft. Sozial vertraten sie stärker die Interessen der unteren Schichten (sans-culottes). Methoden: Terror gegen "Volksfeinde", Massenhinrichtungen. Niedergang: Nach Robespierre Sturz 1794 verloren sie ihre Macht. Historische Rolle: Radikalisierung und Brutalisierung der Revolution.',
            tips: 'Charakterisierung umfasst: Ideologie, Führung, Methoden, Unterstützer, Wirkung.'
        },
        {
            id: 'fr-14',
            operator: 'erlaeutern',
            afb: 2,
            method: 'transfer',
            question: 'Erläutern Sie die Bedeutung des Begriffs "Volkssouveränität" im Kontext der Revolution.',
            points: 5,
            sampleAnswer: 'Volkssouveränität bedeutet, dass die Staatsgewalt vom Volk ausgeht, nicht vom Monarchen. Rousseau entwickelte diese Idee theoretisch. In der Revolution wurde sie praktisch: Die Nationalversammlung beanspruchte, das Volk zu vertreten. Die Verfassung von 1791 begründete Macht nicht mehr göttlich, sondern durch Volkswillen. Allerdings gab es Widersprüche: Zensuswahlrecht schloss viele aus. Die Jakobiner definierten "Volk" exklusiv. Langfristige Wirkung: Das Prinzip prägte moderne Demokratievorstellungen.',
            tips: 'Erläutern = Begriff definieren + historischen Kontext + Bedeutung zeigen.'
        },

        // AFB III - Reflexion/Problemlösung (Übungen 15-20)
        {
            id: 'fr-15',
            operator: 'beurteilen',
            afb: 3,
            method: 'reflexion',
            question: 'Beurteilen Sie, ob die Schreckensherrschaft zur "Rettung der Revolution" notwendig war.',
            points: 8,
            sampleAnswer: 'Pro: Die Republik war tatsächlich bedroht durch Koalitionskriege und Aufstände (Vendée). Radikale Maßnahmen mobilisierten die Nation (levée en masse). Ohne harte Hand wäre die Revolution gescheitert. Kontra: Der Terror richtete sich auch gegen gemäßigte Revolutionäre. Willkürliche Hinrichtungen zerstörten Vertrauen und Legitimität. Langfristig schadete die Brutalisierung der demokratischen Entwicklung. Urteil: Kurzfristig mag Terror militärische Erfolge gebracht haben, aber er untergrub die eigenen Ideale (Menschenrechte) und führte zur Diktatur. Die Mittel widersprachen den Zielen der Revolution.',
            tips: 'Beurteilung: Kriterien festlegen, Pro/Kontra abwägen, begründetes Urteil fällen.'
        },
        {
            id: 'fr-16',
            operator: 'bewerten',
            afb: 3,
            method: 'reflexion',
            question: 'Bewerten Sie die langfristigen Auswirkungen der Französischen Revolution auf Europa.',
            points: 8,
            sampleAnswer: 'Positiv: Verbreitung demokratischer Ideen (Volkssouveränität, Menschenrechte). Ende des Feudalismus in vielen Ländern. Code civil als Vorbild moderner Rechtssysteme. Impuls für weitere Revolutionen (1830, 1848). Säkularisierung. Negativ: Napoleonische Kriege mit Millionen Toten. Reaktion in Form der Restauration. Radikalisierung setzte gefährliches Muster (Terror als politisches Mittel). Bewertung: Trotz Gewalt und Terror überwogen langfristig die positiven Wirkungen. Die Revolution etablierte Prinzipien, die heute selbstverständlich sind.',
            tips: 'Bewertung: Kurz- und langfristige Folgen, verschiedene Perspektiven, Gesamturteil.'
        },
        {
            id: 'fr-17',
            operator: 'eroertern',
            afb: 3,
            method: 'reflexion',
            question: 'Erörtern Sie: War die Hinrichtung Ludwigs XVI. historisch gerechtfertigt?',
            points: 8,
            sampleAnswer: 'These Pro: Ludwig hatte die Revolution verraten (Fluchtversuch Varennes), mit ausländischen Mächten konspiriert und schwor Eide, die er brach. Als Symbol des Absolutismus musste er fallen, um die Republik zu etablieren. Ohne klaren Bruch mit der Monarchie wäre die Revolution gescheitert. These Kontra: Die Hinrichtung war ein Schauprozess ohne faires Verfahren. Sie radikalisierte die Revolution und führte zu noch mehr Gewalt. Diplomatisch isolierte sie Frankreich. Menschenrechtlich war sie problematisch - die Revolution brach ihre eigenen Prinzipien. Dialektik: Politisch-strategisch mag sie notwendig erschienen sein, moralisch-ethisch war sie fragwürdig. Die Frage zeigt den Konflikt zwischen revolutionärer Realpolitik und humanistischen Idealen.',
            tips: 'Erörterung: These und Gegenthese entwickeln, dialektisch vermitteln.'
        },
        {
            id: 'fr-18',
            operator: 'stellung-nehmen',
            afb: 3,
            method: 'reflexion',
            question: 'Nehmen Sie Stellung: Hat die Französische Revolution mehr Freiheit oder mehr Gewalt gebracht?',
            points: 8,
            sampleAnswer: 'Die Revolution brachte beides in extremer Form. Freiheit: Abschaffung des Feudalismus, Gleichheit vor dem Gesetz, Menschenrechtserklärung, Religionsfreiheit, Ende der Zensur. Gewalt: 40.000 Tote während der Terreur, Bürgerkrieg (Vendée), Revolutionskriege. Meine Position: Kurzfristig überwog die Gewalt - die Revolution fraß ihre Kinder. Langfristig überwog die Freiheit - die erkämpften Rechte wurden Grundlage moderner Demokratien. Wichtig: Freiheit und Gewalt waren dialektisch verbunden. Die Frage ist: War die Gewalt der Preis für die Freiheit oder hätte es auch anders gehen können? Ich tendiere zu: Die Gewalt war teilweise vermeidbar und schadete den Idealen der Revolution.',
            tips: 'Stellungnahme: Eigene Position klar formulieren und fundiert begründen.'
        },
        {
            id: 'fr-19',
            operator: 'diskutieren',
            afb: 3,
            method: 'reflexion',
            question: 'Diskutieren Sie: War die Französische Revolution eine bürgerliche oder eine Volksrevolution?',
            points: 8,
            sampleAnswer: 'Bürgerliche Revolution: Getragen vom aufstrebenden Bürgertum (Advokaten, Händler, Intellektuelle). Ziele waren liberale Rechte, Eigentumssicherung, Karrierechancen. Führung lag bei Bürgern (Robespierre, Danton). Resultat: Bürgertum gewann Macht. Volksrevolution: Ohne Bauern und städtische Unterschichten (sans-culottes) wäre sie gescheitert. Diese forderten soziale Gleichheit, nicht nur rechtliche. Hungerrevolten waren Motor der Radikalisierung. Synthese: Sie begann als bürgerliche Revolution, wurde zeitweise zur Volksrevolution (1792-1794), endete aber als bürgerliche Revolution (Direktorium, Napoleon). Das Bürgertum nutzte die Volksmassen, übernahm aber die Macht. Soziale Forderungen wurden nicht erfüllt.',
            tips: 'Diskussion: Verschiedene Positionen darstellen, gegeneinander abwägen, differenzieren.'
        },
        {
            id: 'fr-20',
            operator: 'pruefen',
            afb: 3,
            method: 'reflexion',
            question: 'Prüfen Sie die These: "Die Revolution von 1789 war der Beginn der Moderne."',
            points: 8,
            sampleAnswer: 'Prüfkriterien für "Moderne": Demokratie, Menschenrechte, Säkularisierung, Rationalität, Fortschritt. Argumente dafür: Die Revolution etablierte erstmals Volkssouveränität, universelle Menschenrechte, Trennung von Kirche und Staat, Meritokratie statt Ständeordnung, rationale Verfassung statt Tradition. Sie brach radikal mit der Vergangenheit. Argumente dagegen: Aufklärung begann früher. Industrialisierung war mindestens ebenso wichtig. Die Revolution führte zu Napoleon, also Diktatur. Amerikanische Revolution war früher (1776). Prüfergebnis: Die These ist weitgehend zutreffend. Die Revolution markierte einen fundamentalen Bruch und setzte Prinzipien durch, die die Moderne prägen. Sie war aber Teil eines längeren Prozesses, nicht isolierter Anfangspunkt.',
            tips: 'Prüfung: Kriterien definieren, These daran messen, differenziertes Urteil.'
        }
    ],

    'industrialisierung': [
        // AFB I - Reproduktion (Übungen 1-7)
        {
            id: 'ind-1',
            operator: 'nennen',
            afb: 1,
            method: 'reproduktion',
            question: 'Nennen Sie fünf wichtige technische Erfindungen der Industrialisierung.',
            points: 5,
            sampleAnswer: ['Dampfmaschine (James Watt, 1769)', 'Spinning Jenny (Spinnmaschine)', 'Mechanischer Webstuhl', 'Eisenbahn (Stephenson, 1825)', 'Bessemer-Verfahren (Stahlproduktion)'],
            tips: 'Nenne Erfindung und idealerweise Erfinder oder Jahr.'
        },
        {
            id: 'ind-2',
            operator: 'nennen',
            afb: 1,
            method: 'reproduktion',
            question: 'Nennen Sie vier Merkmale der Fabrikarbeit im 19. Jahrhundert.',
            points: 4,
            sampleAnswer: ['Lange Arbeitszeiten (12-16 Stunden)', 'Niedrige Löhne', 'Kinderarbeit', 'Gefährliche Arbeitsbedingungen', 'Monotone Tätigkeit'],
            tips: 'Konzentriere dich auf negative Aspekte der frühen Industrialisierung.'
        },
        {
            id: 'ind-3',
            operator: 'beschreiben',
            afb: 1,
            method: 'reproduktion',
            question: 'Beschreiben Sie die Funktionsweise und Bedeutung der Dampfmaschine.',
            points: 5,
            sampleAnswer: 'Die Dampfmaschine wandelt Wärmeenergie in mechanische Energie um: Wasser wird erhitzt, der entstehende Dampf treibt einen Kolben an. James Watt verbesserte sie 1769 entscheidend. Bedeutung: Unabhängigkeit von Naturkräften (Wasser, Wind), Einsatz in Fabriken, Bergbau und Transport (Eisenbahn). Sie ermöglichte die industrielle Massenproduktion.',
            tips: 'Erkläre: Funktionsprinzip, Erfinder, technische Bedeutung, Anwendungen.'
        },
        {
            id: 'ind-4',
            operator: 'beschreiben',
            afb: 1,
            method: 'reproduktion',
            question: 'Beschreiben Sie die Lebensbedingungen der Arbeiter in Industriestädten um 1850.',
            points: 6,
            sampleAnswer: 'Die Arbeiter lebten in überfüllten, unhygienischen Mietskasernen. Ganze Familien bewohnten ein Zimmer. Es fehlte an sauberem Wasser und Kanalisation. Krankheiten wie Cholera und Typhus verbreiteten sich schnell. Die Ernährung war mangelhaft. Kinder mussten arbeiten statt zur Schule zu gehen. Arbeitslosigkeit und Armut waren ständige Bedrohungen. Die Lebenserwartung war niedrig.',
            tips: 'Aspekte: Wohnsituation, Hygiene, Gesundheit, Ernährung, Bildung.'
        },
        {
            id: 'ind-5',
            operator: 'zusammenfassen',
            afb: 1,
            method: 'reproduktion',
            question: 'Fassen Sie die Phasen der Industrialisierung in Deutschland zusammen.',
            points: 5,
            sampleAnswer: 'Frühindustrialisierung (1815-1850): Textilindustrie, erste Eisenbahnen, Zollverein. Hochindustrialisierung (1850-1890): Schwerindustrie, Kohlenbergbau, Stahlproduktion, Eisenbahnbau. Spätindustrialisierung (1890-1914): Elektro- und Chemieindustrie, Massenfertigung, Deutschland wird zur Industriemacht.',
            tips: 'Drei Phasen mit jeweils charakteristischen Branchen.'
        },
        {
            id: 'ind-6',
            operator: 'wiedergeben',
            afb: 1,
            method: 'reproduktion',
            question: 'Geben Sie die wichtigsten Ursachen der Industrialisierung in England wieder.',
            points: 5,
            sampleAnswer: 'Kolonien lieferten Rohstoffe und Absatzmärkte. Agrarrevolution schuf Kapital und Arbeitskräfte. Rohstoffreichtum (Kohle, Eisen). Politische Stabilität und Rechtssi cherheit. Liberale Wirtschaftspolitik. Technische Innovationsfreude. Kapitalverfügbarkeit durch Bank- und Handelssystem.',
            tips: 'England als "Mutterland der Industrialisierung" - mehrere Faktoren wirkten zusammen.'
        },
        {
            id: 'ind-7',
            operator: 'skizzieren',
            afb: 1,
            method: 'reproduktion',
            question: 'Skizzieren Sie die Grundzüge des Kapitalismus als Wirtschaftssystem.',
            points: 5,
            sampleAnswer: 'Privateigentum an Produktionsmitteln. Gewinnstreben als Motiv. Freier Markt und Wettbewerb. Angebot und Nachfrage regeln Preise. Lohnarbeit statt Leibeigenschaft. Kapitalakkumulation. Unternehmer investieren, Arbeiter verkaufen Arbeitskraft.',
            tips: 'Grundprinzipien des kapitalistischen Systems.'
        },

        // AFB II - Reorganisation/Transfer (Übungen 8-14)
        {
            id: 'ind-8',
            operator: 'erklaeren',
            afb: 2,
            method: 'transfer',
            question: 'Erklären Sie, warum die Industrialisierung zu sozialen Problemen führte.',
            points: 7,
            sampleAnswer: 'Die Soziale Frage entstand durch: 1) Urbanisierung - Massenansammlung in Städten ohne Infrastruktur. 2) Ausbeutung - Unternehmer zahlten Minimallöhne für Maximalprofite. 3) Rechtlosigkeit - Arbeiter hatten keine Mitbestimmung, kein Streikrecht. 4) Soziale Unsicherheit - bei Krankheit, Unfall, Alter keine Absicherung. 5) Kinderarbeit - Familien brauchten jedes Einkommen. Das liberale Prinzip "Laissez-faire" verhinderte staatliche Eingriffe. Der technische Fortschritt ging nicht mit sozialem Fortschritt einher.',
            tips: 'Zeige Ursache-Wirkungs-Ketten auf. Verbinde ökonomische und soziale Faktoren.'
        },
        {
            id: 'ind-9',
            operator: 'analysieren',
            afb: 2,
            method: 'quellenanalyse',
            question: 'Analysieren Sie eine Fabrikordnung aus dem 19. Jahrhundert: Welche Macht hatten Unternehmer?',
            points: 6,
            sampleAnswer: 'Fabrikordnungen regelten jeden Aspekt: Arbeitszeiten (oft 12-16h), Pausenregelungen, Verhalten. Strafen für Unpünktlichkeit, "Faulheit", Reden. Entlassung ohne Begründung möglich. Keine Verhandlung über Bedingungen. Analyse: Totale Kontrolle des Unternehmers. Arbeiter waren rechtlos. Asymmetrisches Machtverhältnis. Quelle zeigt: Arbeiter als Produktionsfaktor, nicht als Menschen. Historischer Kontext: Fehlende Arbeitsschutzgesetze, keine Gewerkschaften.',
            tips: 'Analysiere: Was wird geregelt? Welche Sanktionen? Was bedeutet das für Machtverhältnisse?'
        },
        {
            id: 'ind-10',
            operator: 'einordnen',
            afb: 2,
            method: 'transfer',
            question: 'Ordnen Sie die Entstehung der Arbeiterbewegung in den Kontext der Industrialisierung ein.',
            points: 6,
            sampleAnswer: 'Die Arbeiterbewegung entstand als Reaktion auf die Soziale Frage: Notlage schuf Solidarität unter Arbeitern. Erste Formen: Maschinenstürmerei (Weberaufstand 1844). Organisierte Phase: Gründung von Gewerkschaften (Arbeiterbildungsvereinen) ab 1860er. Politisch: Sozialdemokratische Parteien (ADAV 1863, SDAP 1869, SPD 1875). Ideologisch beeinflusst von Marx und Lassalle. Ziele: Bessere Arbeitsbedingungen, politische Teilhabe, langfristig: Überwindung des Kapitalismus.',
            tips: 'Zeige: Problem → Reaktion → Organisation → Ziele.'
        },
        {
            id: 'ind-11',
            operator: 'vergleichen',
            afb: 2,
            method: 'transfer',
            question: 'Vergleichen Sie Handwerk und Fabrikproduktion im 19. Jahrhundert.',
            points: 6,
            sampleAnswer: 'Handwerk: Kleine Werkstätten, Meister-Geselle-Lehrling, ganzheitliche Produktion, Qualitätsarbeit, lange Ausbildung, Zunftregeln, individuelle Produkte, geringe Stückzahlen. Fabrik: Großbetriebe, Lohnarbeiter ohne Aufstiegschancen, Arbeitsteilung, Massenware, keine Ausbildung nötig, freier Arbeitsmarkt, standardisierte Produkte, Massenproduktion. Unterschied: Handwerk basiert auf Können und Tradition, Fabrik auf Kapital und Maschinen. Gemeinsam: Beide produzieren für Markt.',
            tips: 'Systematischer Vergleich nach: Organisation, Arbeitsprozess, Qualifikation, Produkt.'
        },
        {
            id: 'ind-12',
            operator: 'herausarbeiten',
            afb: 2,
            method: 'textanalyse',
            question: 'Arbeiten Sie aus dem Kommunistischen Manifest die Kritik am Kapitalismus heraus.',
            points: 6,
            sampleAnswer: 'Marx/Engels kritisieren: Ausbeutung - Mehrwert entsteht durch unbezahlte Arbeit. Entfremdung - Arbeiter ist von Produkt und Arbeit entfremdet. Klassenkampf - Bourgeoisie vs. Proletariat, unversöhnlicher Gegensatz. Verelendung - Arbeiter werden immer ärmer. Krisen - Überproduktion führt zu zyklischen Krisen. Unmenschlichkeit - Alles wird zur Ware, auch der Mensch. Lösung: Proletarische Revolution, Abschaffung des Privateigentums an Produktionsmitteln.',
            tips: 'Identifiziere: Kritikpunkte, Ursachenanalyse, vorgeschlagene Lösung.'
        },
        {
            id: 'ind-13',
            operator: 'charakterisieren',
            afb: 2,
            method: 'transfer',
            question: 'Charakterisieren Sie die Rolle des Bürgertums in der Industrialisierung.',
            points: 6,
            sampleAnswer: 'Unternehmer: Eigentümer von Fabriken, Banken, Handel. Bildungsbürger: Ingenieure, Ärzte, Juristen. Werte: Fleiß, Bildung, Besitz, Leistung. Politisch: Liberal, forderten Freiheit und Mitsprache. Wirtschaftlich: Profiteure der Industrialisierung, Akkumulation von Kapital. Sozial: Abgrenzung nach unten (Arbeiter) und oben (Adel). Kulturell: Träger der Hochkultur (Theater, Musik). Widerspruch: Forderten Freiheit für sich, verweigerten sie Arbeitern.',
            tips: 'Charakterisierung: Zusammensetzung, Werte, ökonomische Rolle, politische Position.'
        },
        {
            id: 'ind-14',
            operator: 'erlaeutern',
            afb: 2,
            method: 'transfer',
            question: 'Erläutern Sie den Zusammenhang zwischen Eisenbahn und industriellem Wachstum.',
            points: 5,
            sampleAnswer: 'Die Eisenbahn war Motor und Produkt der Industrialisierung zugleich: Sie benötigte Eisen, Stahl und Kohle in Massen - stimulierte diese Industrien. Sie ermöglichte schnellen, günstigen Transport von Rohstoffen und Produkten - vergrößerte Absatzmärkte. Sie vernetzte Regionen - schuf einen einheitlichen Wirtschaftsraum. Sie beschleunigte Urbanisierung. Sie erforderte Kapitalkonzentration (Aktiengesellschaften). Der Eisenbahnbau war selbst Großindustrie.',
            tips: 'Zeige wechselseitige Beziehung: Eisenbahn braucht Industrie, fördert Industrie.'
        },

        // AFB III - Reflexion/Problemlösung (Übungen 15-20)
        {
            id: 'ind-15',
            operator: 'beurteilen',
            afb: 3,
            method: 'reflexion',
            question: 'Beurteilen Sie: War die Industrialisierung insgesamt Fortschritt oder Rückschritt?',
            points: 8,
            sampleAnswer: 'Kriterien: Lebensstandard, Freiheit, Gesundheit, Bildung, Produktivität. Fortschritt: Höhere Produktivität ermöglichte langfristig Wohlstand. Technischer Fortschritt. Überwindung der Agrargesellschaft. Soziale Mobilität. Langfristig: Arbeiterschutz, Bildung. Rückschritt: Zunächst Verelendung. Verlust handwerklicher Traditionen. Umweltzerstörung. Soziale Ungerechtigkeit. Urteil: Kurzfristig (1. Generation) überwogen Nachteile für Arbeiter. Langfristig überwog Fortschritt, aber zu hohem sozialen Preis. Wichtig: Fortschritt war nicht zwangsläufig, sondern musste erkämpft werden (Arbeiterbewegung).',
            tips: 'Differenziere nach: Zeitperspektive, sozialer Gruppe, Aspekten.'
        },
        {
            id: 'ind-16',
            operator: 'bewerten',
            afb: 3,
            method: 'reflexion',
            question: 'Bewerten Sie verschiedene Lösungsansätze für die Soziale Frage.',
            points: 8,
            sampleAnswer: 'Liberale Lösung: Selbsthilfe, Bildung, Sparsamkeit. Bewertung: Ignorierte strukturelle Probleme, verlangte Unmögliches. Sozialistische Lösung: Revolution, Verstaatlichung. Bewertung: Radikal, riskant, führte später zu Diktaturen. Christlich-karitative Lösung: Wohltätigkeit, Arbeiterfürsorge. Bewertung: Linderte Symptome, keine strukturellen Veränderungen. Gewerkschaftliche Lösung: Organisation, Streiks, Tarifverträge. Bewertung: Erfolgreich in Verbesserungen, braucht aber Macht. Staatliche Lösung (Bismarck): Sozialversicherungen. Bewertung: Innovativ, aber paternalistisch, Antisozialistengesetz parallel. Gesamtbewertung: Kombination aus Gewerkschaften und Sozialstaat war langfristig am effektivsten.',
            tips: 'Verschiedene Ansätze darstellen, nach Kriterien bewerten, vergleichen.'
        },
        {
            id: 'ind-17',
            operator: 'eroertern',
            afb: 3,
            method: 'reflexion',
            question: 'Erörtern Sie: War Kinderarbeit in der Frühindustrialisierung unvermeidbar?',
            points: 8,
            sampleAnswer: 'These: Ja, unvermeidbar. Argument: Familien brauchten jedes Einkommen zum Überleben. Niedrige Löhne erzwangen Kinderarbeit. Wirtschaftlich war sie rational (niedrige Kosten). Alternativen fehlten (keine Sozialversicherung). Antithese: Nein, vermeidbar. Argument: Resultat bewusster Ausbeutung. Höhere Löhne hätten Kinderarbeit unnötig gemacht. Andere Länder verboten sie früher. Ethisch inakzeptabel. Bildung wurde verhindert. Synthese: Ökonomisch schien sie zunächst "notwendig" im System des Frühkapitalismus. Aber das System selbst war Menschenwerk. Kinderarbeit war Folge politischer Entscheidungen (Laissez-faire). Mit staatlicher Regulierung wäre sie vermeidbar gewesen. Die Frage ist falsch gestellt: Nicht ob unvermeidbar, sondern warum zugelassen.',
            tips: 'Erörterung: Ökonomische vs. ethische Perspektive, Systemfrage stellen.'
        },
        {
            id: 'ind-18',
            operator: 'stellung-nehmen',
            afb: 3,
            method: 'reflexion',
            question: 'Nehmen Sie Stellung: Hätte der Staat früher in die Soziale Frage eingreifen müssen?',
            points: 8,
            sampleAnswer: 'Position: Ja, definitiv. Begründung: Die liberale Doktrin "Laissez-faire" führte zu unerträglichen Zuständen. Der Staat hat die Pflicht, Bürger zu schützen. Kinderarbeit, 16-Stunden-Tage, Hungerlöhne hätten früher verboten werden können. England führte erste Fabrikgesetze bereits 1833 ein - Deutschland erst Jahrzehnte später. Früheres Eingreifen hätte: Leid vermindert, Revolution verhindert, soziale Integration gefördert. Gegenargument: Liberale fürchteten Wohlfahrtsstaat. Wirtschaftliche Konkurrenz. Aber: Menschenwürde geht vor Wettbewerb. Bismarcks Sozialgesetze (1880er) kamen zu spät und waren taktisch motiviert. Fazit: Staatliche Verantwortung für Schwache rechtfertigt frühes Eingreifen.',
            tips: 'Klare Position beziehen, ethisch-politisch begründen, Gegenargumente entkräften.'
        },
        {
            id: 'ind-19',
            operator: 'diskutieren',
            afb: 3,
            method: 'reflexion',
            question: 'Diskutieren Sie: War die Arbeiterbewegung reformistisch oder revolutionär ausgerichtet?',
            points: 8,
            sampleAnswer: 'Revolutionäre Strömung (Marx, Bebel): Ziel war Überwindung des Kapitalismus durch Revolution. "Diktatur des Proletariats". Klassenkampf als historische Notwendigkeit. Parlament nur Tribüne. Reformistische Strömung (Revisionisten, Gewerkschaften): Schrittweise Verbesserungen durch Reformen. Arbeit im Parlament, Tarifverträge. Evolution statt Revolution. Historische Realität: Offiziell revolutionär (Erfurter Programm 1891), praktisch reformistisch. SPD wurde Massenpartei im Kaiserreich. Gewerkschaften erkämpften konkrete Verbesserungen. 1914: Zustimmung zu Kriegskrediten = Abkehr von Internationalismus. Synthese: Ideologie war revolutionär, Praxis reformistisch. Dieser Widerspruch prägte die Bewegung bis 1918/19.',
            tips: 'Verschiedene Strömungen darstellen, historische Praxis analysieren, Widersprüche zeigen.'
        },
        {
            id: 'ind-20',
            operator: 'pruefen',
            afb: 3,
            method: 'reflexion',
            question: 'Prüfen Sie die These: "Die Industrialisierung zerstörte traditionelle Gesellschaftsstrukturen."',
            points: 8,
            sampleAnswer: 'Kriterien: Familie, Dorf/Stadt, Stände, Werte, Arbeitswelt. Argumente dafür: Auflösung der Zunftordnung. Landflucht zerstörte Dorfgemeinschaften. Großfamilie wurde zu Kleinfamilie. Ständegesellschaft wich Klassengesellschaft. Traditionelle Werte (Ehre, Treue) vs. neue (Geld, Leistung). Arbeit nicht mehr in Haushalt, sondern Fabrik. Argumente dagegen: Nicht alle Traditionen verschwanden. Adel blieb mächtig. Familienstrukturen passten sich an. Kirche verlor langsam. Werte wandelten sich graduell. Prüfergebnis: Die These ist im Kern zutreffend. Die Industrialisierung war eine fundamentale Zäsur. Aber: Prozess war graduell, nicht plötzlich. Alte und neue Strukturen existierten parallel. Manche Traditionen persistierten. Besser formuliert: Industrialisierung transformierte Gesellschaft grundlegend.',
            tips: 'These operationalisieren, empirisch prüfen, differenziert urteilen.'
        }
    ],

    'imperialismus': [
        // AFB I - Reproduktion (Übungen 1-7)
        {
            id: 'imp-1',
            operator: 'nennen',
            afb: 1,
            method: 'reproduktion',
            question: 'Nennen Sie fünf europäische Kolonialmächte im 19. Jahrhundert.',
            points: 5,
            sampleAnswer: ['Großbritannien', 'Frankreich', 'Deutschland', 'Belgien', 'Niederlande', 'Portugal', 'Spanien', 'Italien'],
            tips: 'Die größten Kolonialreiche hatten Großbritannien und Frankreich.'
        },
        {
            id: 'imp-2',
            operator: 'nennen',
            afb: 1,
            method: 'reproduktion',
            question: 'Nennen Sie vier Motive für den europäischen Imperialismus.',
            points: 4,
            sampleAnswer: ['Wirtschaftliche Motive (Rohstoffe, Absatzmärkte)', 'Machtpolitische Motive (Prestige, strategische Stützpunkte)', 'Ideologische Motive ("Zivilisierungsmission", Sozialdarwinismus)', 'Religiöse Motive (Missionierung)'],
            tips: 'Die vier Hauptmotive: Wirtschaft, Politik, Ideologie, Religion.'
        },
        {
            id: 'imp-3',
            operator: 'beschreiben',
            afb: 1,
            method: 'reproduktion',
            question: 'Beschreiben Sie den Verlauf der Berliner Konferenz 1884/85 ("Kongo-Konferenz").',
            points: 6,
            sampleAnswer: 'Die Berliner Konferenz wurde von Bismarck einberufen, um die Aufteilung Afrikas zu regeln. 14 Staaten nahmen teil, keine afrikanischen Vertreter. Ergebnisse: Kongo wurde König Leopold II. von Belgien zugesprochen. Freier Handel auf Flüssen sollte gesichert werden. "Effektive Besetzung" wurde Voraussetzung für Kolonialansprüche. Die Konferenz leitete den "Wettlauf um Afrika" ein - bis 1914 war fast ganz Afrika kolonisiert.',
            tips: 'Strukturiere nach: Anlass, Teilnehmer, Ergebnisse, Folgen.'
        },
        {
            id: 'imp-4',
            operator: 'beschreiben',
            afb: 1,
            method: 'reproduktion',
            question: 'Beschreiben Sie die deutschen Kolonien und deren wirtschaftliche Bedeutung.',
            points: 6,
            sampleAnswer: 'Deutschland erwarb ab 1884 Kolonien: Deutsch-Südwestafrika (Namibia), Deutsch-Ostafrika (Tansania), Kamerun, Togo in Afrika; in der Südsee: Deutsch-Neuguinea, Samoa, verschiedene Inseln; in China: Kiautschou. Wirtschaftlich waren sie wenig bedeutend: Hohe Verwaltungskosten, geringe Erträge. Rohstoffe wie Kautschuk, Sisal. Hauptsächlich Prestige- und Machtpolitik. Verlust aller Kolonien nach dem Ersten Weltkrieg (Versailler Vertrag).',
            tips: 'Nenne: Gebiete, wirtschaftliche Bilanz, Ende der Kolonialherrschaft.'
        },
        {
            id: 'imp-5',
            operator: 'zusammenfassen',
            afb: 1,
            method: 'reproduktion',
            question: 'Fassen Sie die Hauptmerkmale des Sozialdarwinismus zusammen.',
            points: 5,
            sampleAnswer: 'Der Sozialdarwinismus übertrug Darwins Evolutionstheorie auf Gesellschaften: "Survival of the fittest" - die Stärksten setzen sich durch. Menschenrassen wurden in Hierarchien eingeteilt. Europäer sahen sich als "höchste Rasse". Dies legitimierte Kolonialismus ("Recht des Stärkeren"). Auch innergesellschaftlich: Konkurrenz sei natürlich und gut. Wissenschaftlich unhaltbar, aber weitverbreitet im 19. Jahrhundert.',
            tips: 'Kernidee: Biologische Evolution auf Gesellschaft übertragen.'
        },
        {
            id: 'imp-6',
            operator: 'wiedergeben',
            afb: 1,
            method: 'reproduktion',
            question: 'Geben Sie die wesentlichen Inhalte von Rudyard Kiplings "White Man\'s Burden" wieder.',
            points: 5,
            sampleAnswer: 'Kipling beschreibt Kolonialismus als Bürde (Last) des weißen Mannes: Pflicht, "primitive Völker" zu zivilisieren. Kolonialherren müssten sich opfern, um Fortschritt zu bringen. Die "Eingeborenen" seien wie Kinder, die Erziehung brauchen. Undankbarkeit müsse ertragen werden. Das Gedicht rechtfertigt imperialistische Herrschaft als zivilisatorische Mission. Heute gilt es als typisches Beispiel rassistischer Kolonialideologie.',
            tips: 'Wiedergabe der Kernaussage und kritische Einordnung.'
        },
        {
            id: 'imp-7',
            operator: 'skizzieren',
            afb: 1,
            method: 'reproduktion',
            question: 'Skizzieren Sie die kolonialen Herrschaftsformen in Afrika.',
            points: 5,
            sampleAnswer: 'Direkte Herrschaft: Eigene Verwaltung durch Kolonialmacht (z.B. Frankreich). Indirekte Herrschaft: Lokale Herrscher als Mittelsmänner (z.B. Großbritannien). Siedlerkolonien: Europäische Siedler verdrängten indigene Bevölkerung (z.B. Südafrika). Plantagenwirtschaft: Monokulturen für Export. Zwangsarbeit war üblich. Ausbeutung von Bodenschätzen.',
            tips: 'Unterscheide verschiedene Herrschafts- und Wirtschaftsformen.'
        },

        // AFB II - Reorganisation/Transfer (Übungen 8-14)
        {
            id: 'imp-8',
            operator: 'erklaeren',
            afb: 2,
            method: 'transfer',
            question: 'Erklären Sie den Zusammenhang zwischen Industrialisierung und Imperialismus.',
            points: 7,
            sampleAnswer: 'Die Industrialisierung trieb den Imperialismus: 1) Rohstoffbedarf - Industrie brauchte Baumwolle, Kautschuk, Metalle aus Übersee. 2) Absatzmärkte - Überproduktion erforderte neue Märkte. 3) Kapitalanlage - Überschusskapital suchte profitable Investitionen. 4) Technologie - Dampfschiffe, Telegraf, Waffen ermöglichten Kolonisierung. 5) Bevölkerungsdruck - Auswanderung in Kolonien als Ventil. 6) Soziale Ablenkung - Kolonialbegeisterung lenkte von inneren Problemen ab. Der Imperialismus war die außenpolitische Konsequenz der Industrialisierung.',
            tips: 'Zeige verschiedene Dimensionen: Wirtschaft, Technik, Gesellschaft, Politik.'
        },
        {
            id: 'imp-9',
            operator: 'analysieren',
            afb: 2,
            method: 'bildanalyse',
            question: 'Analysieren Sie ein Kolonialpropaganda-Plakat: Welches Bild von Kolonisierten wird vermittelt?',
            points: 6,
            sampleAnswer: 'Typische Darstellung: Europäer als Lehrende, Helfende, Zivilisatoren. Afrikaner/Asiaten als kindlich, hilfsbedürftig, primitiv. Bildsprache: Europäer stehen, Kolonisierte knien oder sitzen. Kleidung: Europäer uniformiert/zivilisiert, Kolonisierte "exotisch"/spärlich bekleidet. Farben: Hell (Europäer) vs. Dunkel (Andere). Intention: Legitimation der Kolonialherrschaft. Rassistische Stereotypen. "Zivilisierungsmission" visualisieren. Wirkung: Schafft Überlegenheitsgefühl, rechtfertigt Herrschaft.',
            tips: 'Bildanalyse: Darstellung, Komposition, Symbolik, Intention, Wirkung.'
        },
        {
            id: 'imp-10',
            operator: 'einordnen',
            afb: 2,
            method: 'transfer',
            question: 'Ordnen Sie den Herero-Aufstand 1904 in den Kontext des deutschen Kolonialismus ein.',
            points: 6,
            sampleAnswer: 'Kontext: Deutsch-Südwestafrika (Namibia) war seit 1884 deutsche Kolonie. Siedler nahmen Herero-Land. Unterdrückung und Ausbeutung. 1904: Herero-Aufstand unter Samuel Maharero. Deutsche Reaktion: Vernichtungsbefehl General von Trothas. Folge: Ca. 80% der Herero starben (Völkermord). Bedeutung: Zeigt brutale Realität des Kolonialismus. Rassistische Vernichtungspolitik. Heute als erster Völkermord des 20. Jahrhunderts anerkannt. Verbindung zum Holocaust wird diskutiert.',
            tips: 'Kontext → Ereignis → Folgen → historische Einordnung.'
        },
        {
            id: 'imp-11',
            operator: 'vergleichen',
            afb: 2,
            method: 'transfer',
            question: 'Vergleichen Sie den britischen und den belgischen Kolonialismus in Afrika.',
            points: 6,
            sampleAnswer: 'Großbritannien: Größtes Kolonialreich. Indirekte Herrschaft ("indirect rule") über lokale Eliten. Pragmatisch-wirtschaftlich orientiert. Gewisse Infrastruktur (Eisenbahnen). Später gradueller Rückzug. Belgien (Kongo): Privatbesitz Leopold II. bis 1908. Extreme Ausbeutung (Kautschuk). Zwangsarbeit, Verstümmelungen. Millionen Tote. Internationale Kritik führte zur Verstaatlichung 1908. Gemeinsam: Ausbeutung, Rassismus, Gewalt. Unterschied: Belgien im Kongo besonders brutal.',
            tips: 'Vergleiche: Herrschaftsform, Ausbeutungsgrad, Gewalt, Hinterlassenschaft.'
        },
        {
            id: 'imp-12',
            operator: 'herausarbeiten',
            afb: 2,
            method: 'textanalyse',
            question: 'Arbeiten Sie aus einer Rede Kaiser Wilhelms II. die imperialistische Ideologie heraus.',
            points: 6,
            sampleAnswer: 'Wilhelm II. ("Weltpolitik"): Deutschland brauche "Platz an der Sonne". Konkurrenzkampf mit anderen Mächten. Deutsche Überlegenheit (Kultur, Technik). Wirtschaftliche Notwendigkeit (Rohstoffe, Märkte). Nationale Größe durch Kolonien. "Wir wollen niemand in den Schatten stellen, aber wir verlangen auch unseren Platz an der Sonne." Ideologie: Nationalismus, Sozialdarwinismus, Machtdenken. Rechtfertigung: Wirtschaftlich, prestigepolitisch. Ton: Aggressiv, fordernd.',
            tips: 'Analysiere: Kernaussagen, Begründungen, ideologische Muster, Rhetorik.'
        },
        {
            id: 'imp-13',
            operator: 'charakterisieren',
            afb: 2,
            method: 'transfer',
            question: 'Charakterisieren Sie die Rolle der Missionare im Kolonialismus.',
            points: 6,
            sampleAnswer: 'Doppelrolle: Einerseits religiöse Missionierung, Bildung, medizinische Versorgung. Schulen und Krankenhäuser gebaut. Kritik an Auswüchsen der Kolonialherrschaft. Andererseits: Kulturelle Zerstörung (afrikanische Religionen als "Heidentum"). Wegbereiter kolonialer Herrschaft. Legitimation durch "Zivilisierungsmission". Ambivalenz: Manche Missionare engagierten sich für Kolonisierte, andere waren Komplizen der Unterdrückung. Langfristig: Christentum in Afrika etabliert, aber oft mit kolonialer Gewalt verbunden.',
            tips: 'Zeige Ambivalenz: Positive Aspekte vs. Rolle im kolonialen System.'
        },
        {
            id: 'imp-14',
            operator: 'erlaeutern',
            afb: 2,
            method: 'transfer',
            question: 'Erläutern Sie den Begriff "Wettlauf um Afrika" ("Scramble for Africa").',
            points: 5,
            sampleAnswer: 'Begriff beschreibt die rasche Aufteilung Afrikas zwischen europäischen Mächten 1880-1914. Vor 1880: Nur Küstengebiete kolonisiert. Nach Berliner Konferenz 1884/85: Wettlauf ins Innere. Motive: Prestige, Wirtschaft, Konkurrenz. Methoden: Verträge mit lokalen Herrschern (oft unter Zwang), militärische Eroberung, Wettlauf gegen Konkurrenten. Ergebnis: 1914 waren 90% Afrikas kolonisiert. Nur Äthiopien und Liberia unabhängig. Folgen: Willkürliche Grenzen ignorierten ethnische/kulturelle Grenzen - Konflikte bis heute.',
            tips: 'Begriff definieren, Zeitraum, Prozess, Ergebnis, Folgen.'
        },

        // AFB III - Reflexion/Problemlösung (Übungen 15-20)
        {
            id: 'imp-15',
            operator: 'beurteilen',
            afb: 3,
            method: 'reflexion',
            question: 'Beurteilen Sie: Brachte der Kolonialismus den kolonisierten Ländern Fortschritt?',
            points: 8,
            sampleAnswer: 'Kriterien: Wirtschaft, Infrastruktur, Bildung, Gesundheit, politische Entwicklung, kulturelle Autonomie. Argumente für "Fortschritt": Eisenbahnen, Schulen, Krankenhäuser gebaut. Medizinische Versorgung verbessert. Schriftsysteme eingeführt. Argumente dagegen: Infrastruktur diente Ausbeutung, nicht Entwicklung. Plantagenwirtschaft zerstörte Subsistenzwirtschaft. Bildung war eurozentrisch, entwertete eigene Kultur. Politische Unterdrückung, keine Selbstbestimmung. Wirtschaft auf Export ausgerichtet - Abhängigkeit. Urteil: Einzelne "moderne" Elemente können nicht den Gesamtschaden aufwiegen. Ausbeutung, Gewalt, kulturelle Zerstörung überwiegen bei Weitem. "Fortschritt" war Nebeneffekt der Ausbeutung, kein Ziel.',
            tips: 'Kritisch hinterfragen, was "Fortschritt" bedeutet und für wen.'
        },
        {
            id: 'imp-16',
            operator: 'bewerten',
            afb: 3,
            method: 'reflexion',
            question: 'Bewerten Sie verschiedene Formen des antikolonialen Widerstands.',
            points: 8,
            sampleAnswer: 'Bewaffneter Widerstand (Herero, Maji-Maji): Direkt, aber militärisch unterlegen. Oft brutal niedergeschlagen. Symbolisch wichtig für Selbstbehauptung. Kultureller Widerstand: Bewahrung von Sprachen, Traditionen. Langfristig effektiv. Religiöse Bewegungen: Synkretistische Religionen als Identitätsstiftung. Politische Organisation (später): Unabhängigkeitsbewegungen im 20. Jh. Bildungseliten als Träger. Ultimativ erfolgreich. Passiver Widerstand: Verweigerung, Sabotage. Schwer zu unterdrücken. Bewertung: Bewaffneter Widerstand war heroisch, aber scheiterte meist. Kulturelle und später politische Formen waren langfristig erfolgreicher. Kolonialismus konnte nur überwunden werden durch Kombination aus Widerstand und Schwächung der Kolonialmächte (Weltkriege).',
            tips: 'Verschiedene Widerstandsformen nach Effektivität und Langzeitwirkung bewerten.'
        },
        {
            id: 'imp-17',
            operator: 'eroertern',
            afb: 3,
            method: 'reflexion',
            question: 'Erörtern Sie: Ist der Begriff "Zivilisierungsmission" gerechtfertigt?',
            points: 8,
            sampleAnswer: 'These: Ja. Argument: Europäer brachten Technik, Wissenschaft, Medizin, Bildung. Beendeten Stammeskonflikte, Sklaverei. Moderne Infrastruktur. Antithese: Nein. Argument: "Zivilisierungsmission" war Propaganda zur Rechtfertigung von Ausbeutung. Afrikanische/asiatische Kulturen waren nicht "primitiv", sondern anders. Gewalt und Unterdrückung widersprechen jeder "Mission". Eigene Interessen (Rohstoffe, Profit) waren eigentliches Motiv. Synthese: Der Begriff selbst ist eurozentrisch und rassistisch. Er impliziert, nicht-europäische Kulturen seien minderwertig. Reale Motivation war wirtschaftlich-politisch, nicht humanitär. Einzelne positive Entwicklungen können den Begriff nicht rechtfertigen. Fazit: Der Begriff gehört in Anführungszeichen - er war Ideologie, nicht Realität.',
            tips: 'Dekonstruiere den Begriff, zeige Diskrepanz zwischen Ideologie und Praxis.'
        },
        {
            id: 'imp-18',
            operator: 'stellung-nehmen',
            afb: 3,
            method: 'reflexion',
            question: 'Nehmen Sie Stellung: Sollten ehemalige Kolonialmächte Reparationen zahlen?',
            points: 8,
            sampleAnswer: 'Position: Grundsätzlich ja. Begründung: Kolonialismus war Unrecht - Raub, Ausbeutung, Gewalt, Völkermord (Herero). Heutige Unterentwicklung ist teilweise Folge kolonialer Strukturen (Plantagenwirtschaft, willkürliche Grenzen, Bildungsdefizite). Moralische Verantwortung für historisches Unrecht. Materielle Wiedergutmachung ist angemessen. Gegenargumente: Heutige Generationen sind nicht verantwortlich. Praktische Schwierigkeiten (Höhe? An wen? Korruption?). Andere Ursachen für Unterentwicklung. Meine Antwort auf Gegenargumente: Historische Verantwortung endet nicht mit Generation. Praktische Schwierigkeiten sind keine prinzipiellen Einwände. Entwicklungshilfe allein reicht nicht, weil sie paternalistisch ist. Form: Kombination aus Reparationen, Schuldenerlass, fairer Handel, Technologietransfer, Rückgabe von Kulturgütern.',
            tips: 'Klare Position, ethisch-politische Begründung, Einwände entkräften, konkrete Vorschläge.'
        },
        {
            id: 'imp-19',
            operator: 'diskutieren',
            afb: 3,
            method: 'reflexion',
            question: 'Diskutieren Sie: War der Imperialismus Hauptursache des Ersten Weltkriegs?',
            points: 8,
            sampleAnswer: 'Position 1: Ja, Hauptursache. Argument: Imperialistische Rivalitäten (z.B. Marokkokrisen) schufen Spannungen. Wettlauf um Kolonien führte zu Nationalismus und Militarismus. Sozialdarwinismus legitimierte Krieg. Wirtschaftliche Konkurrenz. Position 2: Nein, nur eine von mehreren Ursachen. Argument: Bündnissysteme wichtiger. Balkankrise direkter Auslöser. Nationalismus hatte auch innereuropäische Ursachen. Wettrüsten unabhängig von Kolonien. Synthese: Imperialismus war wichtiger Faktor, aber nicht alleinige Ursache. Er verschärfte Nationalismus und Rivalitäten. Weltkrieg hatte multiple Ursachen (MAIN: Militarismus, Allianzen, Imperialismus, Nationalismus). Imperialismus war Teil eines komplexen Ursachengeflechts. Historiker-Debatte: Unterschiedliche Gewichtungen je nach Perspektive.',
            tips: 'Verschiedene Positionen, Argumente, Synthese, Hinweis auf Komplexität.'
        },
        {
            id: 'imp-20',
            operator: 'pruefen',
            afb: 3,
            method: 'reflexion',
            question: 'Prüfen Sie die These: "Kolonialismus ist bis heute wirksam."',
            points: 8,
            sampleAnswer: 'Kriterien: Wirtschaft, Politik, Kultur, Psychologie. Argumente dafür: Wirtschaftsstrukturen (Rohstoffexport, Monokulturen) bestehen fort. Neokolonialismus durch multinationale Konzerne. Willkürliche Grenzen verursachen Konflikte (Afrika). Politische Instabilität durch koloniales Erbe. Kulturelle Dominanz des Westens (Sprache, Normen). Minderwertigkeitskomplexe/Überlegenheitsgefühle. Migration als Folge. Argumente dagegen: Unabhängigkeit seit Jahrzehnten. Eigene Verantwortung für Entwicklung. Andere Ursachen (Korruption, Diktaturen). Globalisierung betrifft alle. Prüfergebnis: Die These ist weitgehend zutreffend. Kolonialismus hat langfristige Strukturen geschaffen, die bis heute wirken. Aber: Kolonialismus ist nicht determinierend. Postkoloniale Gesellschaften sind nicht passiv. Besser formuliert: "Kolonialismus hat langfristige Nachwirkungen, die aber nicht monokausal sind."',
            tips: 'Operationalisiere "wirksam", prüfe empirisch, differenziere.'
        }
    ]
};
