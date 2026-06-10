// ===== NEUE TIMELINE EVENTS MIT ZOOM-LEVELS =====
// Basiert auf Baden-Württemberg Lehrplan Klasse 8-10
// zoomLevel: 1 = weiteste Ansicht (nur wichtigste Ereignisse)
// zoomLevel: 2 = mittlere Ansicht (wichtige Ereignisse)
// zoomLevel: 3 = detaillierte Ansicht (alle Details)

const TIMELINE_EVENTS_NEW = [
    // ========== MITTELALTER ==========
    {
        year: 800,
        title: 'Karl der Große Kaiser',
        era: 'mittelalter',
        zoomLevel: 2,
        description: 'Karl der Große wird in Rom zum Kaiser gekrönt.',
        details: 'Papst Leo III. krönt Karl den Großen am Weihnachtstag zum Kaiser. Dies begründet die Idee des christlichen Abendlandes und die enge Verbindung von geistlicher und weltlicher Macht. Das Fränkische Reich wird zur Großmacht.'
    },
    {
        year: 962,
        title: 'Otto I. Kaiser',
        era: 'mittelalter',
        zoomLevel: 3,
        description: 'Otto I. wird Kaiser - Beginn des Heiligen Römischen Reiches.',
        details: 'Mit der Kaiserkrönung Ottos I. durch den Papst beginnt das Heilige Römische Reich Deutscher Nation. Es wird für über 800 Jahre bestehen und die deutsche Geschichte prägen.'
    },
    {
        year: 1077,
        title: 'Gang nach Canossa',
        era: 'mittelalter',
        zoomLevel: 3,
        description: 'Heinrich IV. bittet Papst Gregor VII. um Vergebung.',
        details: 'Im Investiturstreit muss Kaiser Heinrich IV. als Büßer im Schnee vor der Burg Canossa warten. Der Papst erweist sich als mächtiger als der Kaiser. Symbol für den Machtkampf zwischen Kirche und weltlicher Herrschaft.'
    },
    {
        year: 1096,
        title: 'Erster Kreuzzug',
        era: 'mittelalter',
        zoomLevel: 3,
        description: 'Papst Urban II. ruft zum Kreuzzug auf.',
        details: 'Die Kreuzzüge beginnen - angeblich zur Befreiung Jerusalems, tatsächlich oft aus Machtinteressen. Sie prägen das Verhältnis zwischen Christentum und Islam für Jahrhunderte.'
    },
    {
        year: 1215,
        title: 'Magna Carta',
        era: 'mittelalter',
        zoomLevel: 3,
        description: 'Englischer König muss Adelsrechte anerkennen.',
        details: 'Die Magna Carta schränkt die Macht des Königs ein und wird zur Grundlage der englischen Verfassungstradition. Ein früher Schritt zu Rechtsstaatlichkeit und Begrenzung der Herrschermacht.'
    },
    {
        year: 1347,
        title: 'Die Pest',
        era: 'mittelalter',
        zoomLevel: 2,
        description: 'Der Schwarze Tod erreicht Europa.',
        details: 'Die Pest tötet etwa ein Drittel der europäischen Bevölkerung. Die Seuche hat massive soziale und wirtschaftliche Folgen. Das Mittelalter gerät in eine tiefe Krise.'
    },
    {
        year: 1453,
        title: 'Fall Konstantinopels',
        era: 'mittelalter',
        zoomLevel: 3,
        description: 'Osmanen erobern Konstantinopel.',
        details: 'Mit der Eroberung Konstantinopels durch die Osmanen endet das Byzantinische Reich nach über 1000 Jahren. Viele Gelehrte fliehen nach Westeuropa und bringen antikes Wissen mit - ein Impuls für die Renaissance.'
    },

    // ========== FRÜHE NEUZEIT ==========
    {
        year: 1492,
        title: 'Kolumbus in Amerika',
        era: 'fruehe-neuzeit',
        zoomLevel: 2,
        description: 'Kolumbus erreicht Amerika.',
        details: 'Kolumbus landet in der Karibik auf der Suche nach dem Seeweg nach Indien. Die "Entdeckung" Amerikas leitet das Zeitalter der europäischen Expansion ein und hat verheerende Folgen für die indigene Bevölkerung.'
    },
    {
        year: 1517,
        title: 'Reformation',
        era: 'fruehe-neuzeit',
        zoomLevel: 2,
        description: 'Luther veröffentlicht 95 Thesen.',
        details: 'Martin Luther schlägt seine 95 Thesen gegen den Ablasshandel an. Die Reformation spaltet die Kirche und verändert Europa grundlegend. Glaubenskriege werden folgen.'
    },
    {
        year: 1618,
        title: 'Dreißigjähriger Krieg',
        era: 'fruehe-neuzeit',
        zoomLevel: 2,
        description: 'Prager Fenstersturz löst Krieg aus.',
        details: 'Der Konflikt zwischen Katholiken und Protestanten eskaliert. Der Dreißigjährige Krieg verwüstet große Teile Deutschlands. Millionen Menschen sterben. Deutschland wird auf Jahrzehnte geschwächt.'
    },
    {
        year: 1648,
        title: 'Westfälischer Frieden',
        era: 'fruehe-neuzeit',
        zoomLevel: 2,
        description: 'Friedensschluss nach 30 Jahren Krieg.',
        details: 'Der Westfälische Frieden beendet den Dreißigjährigen Krieg. Deutschland ist zersplittert in über 300 Einzelstaaten. Das moderne Staatensystem Europas entsteht. Religionsfreiheit wird teilweise anerkannt.'
    },
    {
        year: 1689,
        title: 'Glorious Revolution',
        era: 'fruehe-neuzeit',
        zoomLevel: 3,
        description: 'England wird konstitutionelle Monarchie.',
        details: 'Mit der Bill of Rights wird England zur konstitutionellen Monarchie. Das Parlament erhält mehr Macht. Dies wird zum Vorbild für spätere demokratische Entwicklungen.'
    },

    // ========== KLASSE 8: FRANZÖSISCHE REVOLUTION & NAPOLEON ==========
    {
        year: 1789,
        title: 'Franz. Revolution',
        era: '18jh',
        zoomLevel: 1,
        description: 'Sturm auf die Bastille am 14. Juli. Das Volk erhebt sich gegen die absolutistische Herrschaft.',
        details: 'Die Französische Revolution läutet das Ende des Absolutismus ein. Nach einer schweren Wirtschaftskrise und Hungersnot erhebt sich das Volk. Die Generalstände werden einberufen, der dritte Stand erklärt sich zur Nationalversammlung. Mit dem Sturm auf die Bastille beginnt die Revolution, die Europa grundlegend verändern wird. Die Ideale Freiheit, Gleichheit, Brüderlichkeit werden zum Programm.'
    },
    {
        year: 1793,
        title: 'Terrorherrschaft',
        era: '18jh',
        zoomLevel: 3,
        description: 'Robespierre und die Jakobiner errichten die Schreckensherrschaft.',
        details: 'In der Phase der Terrorherrschaft werden Tausende Menschen guillotiniert, darunter König Ludwig XVI. und Marie Antoinette. Die Jakobiner um Robespierre versuchen, eine "Republik der Tugend" zu errichten. Der Terror richtet sich gegen Adelige, Geistliche und bald auch gegen gemäßigte Revolutionäre.'
    },
    {
        year: 1799,
        title: 'Napoleons Putsch',
        era: '19jh',
        zoomLevel: 3,
        description: 'Napoleon Bonaparte stürzt das Direktorium und wird Erster Konsul.',
        details: 'Mit dem Staatsstreich des 18. Brumaire beendet Napoleon die instabile Revolutionsregierung und übernimmt als Erster Konsul die Macht. Er verspricht Stabilität nach Jahren des Chaos und führt wichtige Reformen durch, darunter den Code Civil.'
    },
    {
        year: 1804,
        title: 'Kaiser Napoleon',
        era: '19jh',
        zoomLevel: 2,
        description: 'Napoleon krönt sich selbst zum Kaiser. Revolution und Monarchie vereint.',
        details: 'In Notre-Dame krönt sich Napoleon selbst zum Kaiser - ein Symbol seiner Macht. Er behält viele revolutionäre Reformen bei, führt aber eine neue kaiserliche Ordnung ein. Der Code Civil modernisiert das französische Recht und wird in vielen Ländern übernommen.'
    },
    {
        year: 1806,
        title: 'Ende des HRR',
        era: '19jh',
        zoomLevel: 2,
        description: 'Das Heilige Römische Reich endet nach über 800 Jahren.',
        details: 'Unter dem Druck Napoleons löst sich das Heilige Römische Reich Deutscher Nation auf. Franz II. legt die deutsche Kaiserkrone nieder und bleibt nur Kaiser von Österreich. Deutschland besteht aus einem Flickenteppich von Einzelstaaten im Rheinbund unter französischer Vorherrschaft.'
    },
    {
        year: 1813,
        title: 'Völkerschlacht',
        era: '19jh',
        zoomLevel: 2,
        description: 'Bei Leipzig erleidet Napoleon entscheidende Niederlage.',
        details: 'Bei Leipzig treffen Napoleons Truppen auf die vereinten Armeen Preußens, Österreichs, Russlands und Schwedens. Mit 600.000 Soldaten ist es die bis dahin größte Schlacht der Weltgeschichte. Napoleons Niederlage besiegelt den Untergang seines Reiches.'
    },
    {
        year: 1815,
        title: 'Wiener Kongress',
        era: '19jh',
        zoomLevel: 1,
        description: 'Neuordnung Europas nach Napoleon. Restauration der alten Ordnung.',
        details: 'Die Siegermächte ordnen Europa neu. Metternich etabliert das System der Restauration und Legitimität. Die alten Dynastien kehren zurück. Ein Gleichgewicht der Mächte soll neue Kriege verhindern. Doch die revolutionären Ideen lassen sich nicht mehr unterdrücken.'
    },

    // ========== KLASSE 8: INDUSTRIALISIERUNG ==========
    {
        year: 1769,
        title: 'Dampfmaschine',
        era: '18jh',
        zoomLevel: 3,
        description: 'James Watt verbessert die Dampfmaschine.',
        details: 'Die verbesserte Dampfmaschine von James Watt macht Maschinen unabhängig von Wasserkraft. Sie ermöglicht den Einsatz von Maschinen überall und wird zur Schlüsseltechnologie der Industriellen Revolution in England.'
    },
    {
        year: 1835,
        title: 'Erste dt. Eisenbahn',
        era: '19jh',
        zoomLevel: 2,
        description: 'Die "Adler" fährt von Nürnberg nach Fürth.',
        details: 'Mit der Fahrt des "Adlers" beginnt in Deutschland das Eisenbahnzeitalter. Die Eisenbahn wird zum Motor der Industrialisierung: Sie ermöglicht schnellen Warentransport, schafft einen einheitlichen Wirtschaftsraum und beschleunigt die Urbanisierung.'
    },
    {
        year: 1850,
        title: 'Hochindustrialisierung',
        era: '19jh',
        zoomLevel: 3,
        description: 'Deutschland wandelt sich zur Industrienation. Städte wachsen rasant.',
        details: 'Ab 1850 setzt in Deutschland die Hochindustrialisierung ein. Fabriken entstehen überall, besonders im Ruhrgebiet. Die Städte wachsen explosionsartig. Es entsteht eine neue Arbeiterschaft, die oft unter schlechten Bedingungen lebt und arbeitet. Die soziale Frage wird drängend.'
    },

    // ========== KLASSE 8: SOZIALE FRAGE ==========
    {
        year: 1848,
        title: 'Kommunist. Manifest',
        era: '19jh',
        zoomLevel: 3,
        description: 'Marx und Engels: "Proletarier aller Länder, vereinigt euch!"',
        details: 'Karl Marx und Friedrich Engels analysieren die kapitalistischen Verhältnisse und rufen zum Klassenkampf auf. Das Manifest wird zur Grundlage sozialistischer und kommunistischer Bewegungen weltweit und prägt die Arbeiterbewegung fundamental.'
    },
    {
        year: 1863,
        title: 'Gründung ADAV',
        era: '19jh',
        zoomLevel: 3,
        description: 'Erste deutsche Arbeiterpartei durch Ferdinand Lassalle.',
        details: 'Der Allgemeine Deutsche Arbeiterverein (ADAV) ist die erste organisierte deutsche Arbeiterpartei. Lassalle fordert politische Gleichberechtigung und staatliche Produktivgenossenschaften zur Verbesserung der Lage der Arbeiter.'
    },
    {
        year: 1878,
        title: 'Sozialistengesetze',
        era: '19jh',
        zoomLevel: 2,
        description: 'Bismarck verbietet sozialistische Organisationen.',
        details: 'Nach Attentaten auf Kaiser Wilhelm I. nutzt Bismarck die Gelegenheit zur Unterdrückung der Sozialdemokratie. Versammlungen, Schriften und Organisationen werden verboten. Trotzdem wächst die Bewegung weiter - die "Peitsche" von Bismarcks Politik.'
    },
    {
        year: 1883,
        title: 'Sozialversicherung',
        era: '19jh',
        zoomLevel: 2,
        description: 'Erste Krankenversicherung der Welt.',
        details: 'Mit der Krankenversicherung beginnt Bismarcks Sozialgesetzgebung - das "Zuckerbrot" zu den Sozialistengesetzen. Es folgen Unfallversicherung (1884) und Altersversicherung (1889). Deutschland wird Vorreiter des modernen Sozialstaats.'
    },

    // ========== KLASSE 8: REVOLUTION 1848 ==========
    {
        year: 1817,
        title: 'Wartburgfest',
        era: '19jh',
        zoomLevel: 3,
        description: 'Studenten fordern Einheit und Freiheit.',
        details: 'Burschenschaften versammeln sich auf der Wartburg. Sie fordern ein geeintes, freies Deutschland und verbrennen reaktionäre Schriften. Metternich reagiert mit den repressiven Karlsbader Beschlüssen - Zensur und Überwachung.'
    },
    {
        year: 1832,
        title: 'Hambacher Fest',
        era: '19jh',
        zoomLevel: 2,
        description: 'Größte Freiheitsdemonstration: 30.000 Menschen.',
        details: 'Beim Hambacher Fest demonstrieren etwa 30.000 Menschen für nationale Einheit, demokratische Rechte und Pressefreiheit. Schwarz-Rot-Gold wird zum Symbol der Freiheitsbewegung. Die Obrigkeit reagiert mit verstärkter Zensur und Überwachung.'
    },
    {
        year: 1848,
        title: 'Märzrevolution',
        era: '19jh',
        zoomLevel: 1,
        description: 'Revolution erfasst Deutschland. Paulskirchen-Parlament tagt.',
        details: 'Von Frankreich ausgehend erfasst die Revolution ganz Europa. In Deutschland fordern Menschen nationale Einheit und demokratische Rechte. In Berlin gibt es blutige Barrikadenkämpfe. Die Nationalversammlung tritt in der Frankfurter Paulskirche zusammen und erarbeitet eine demokratische Verfassung.'
    },
    {
        year: 1849,
        title: 'Revolution scheitert',
        era: '19jh',
        zoomLevel: 3,
        description: 'König lehnt Kaiserkrone ab. Hoffnungen enttäuscht.',
        details: 'Die Paulskirchen-Versammlung bietet dem preußischen König die deutsche Kaiserkrone an. Friedrich Wilhelm IV. lehnt ab - er wolle keine "Krone aus der Gosse". Die Revolution wird niedergeschlagen, viele Demokraten gehen ins Exil.'
    },

    // ========== KLASSE 9: DEUTSCHE EINIGUNG ==========
    {
        year: 1862,
        title: 'Bismarck Minister',
        era: '19jh',
        zoomLevel: 2,
        description: '"Eisen und Blut"-Rede im Parlament.',
        details: 'König Wilhelm I. ernennt Otto von Bismarck zum Ministerpräsidenten. In seiner berühmten Rede erklärt er, dass die deutschen Fragen nicht durch Reden gelöst werden, sondern durch "Eisen und Blut". Er beginnt seinen Weg zur deutschen Einigung von oben.'
    },
    {
        year: 1866,
        title: 'Deutscher Krieg',
        era: '19jh',
        zoomLevel: 3,
        description: 'Preußen besiegt Österreich bei Königgrätz.',
        details: 'Im Deutschen Krieg (auch Bruderkrieg) siegt Preußen entscheidend über Österreich. Österreich scheidet aus der deutschen Politik aus. Preußen gründet den Norddeutschen Bund und übernimmt eindeutig die Führung bei der deutschen Einigung.'
    },
    {
        year: 1870,
        title: 'Krieg gegen Frankreich',
        era: '19jh',
        zoomLevel: 2,
        description: '"Emser Depesche" löst Krieg aus.',
        details: 'Bismarck provoziert mit der verfälschten Emser Depesche Frankreich zum Krieg. Der gemeinsame Kampf gegen den "Erbfeind" einigt die deutschen Staaten. Nach dem Sieg bei Sedan wird Napoleon III. gefangen genommen.'
    },
    {
        year: 1871,
        title: 'Reichsgründung',
        era: '19jh',
        zoomLevel: 1,
        description: 'Deutsches Kaiserreich proklamiert in Versailles.',
        details: 'Am 18. Januar 1871 wird Wilhelm I. im Spiegelsaal von Versailles zum Deutschen Kaiser ausgerufen. Das Deutsche Reich ist gegründet - allerdings "von oben", nicht durch das Volk. Es ist eine konstitutionelle Monarchie mit starker Stellung des Kaisers. Deutschland wird zur Großmacht.'
    },
    {
        year: 1890,
        title: 'Bismarck entlassen',
        era: '19jh',
        zoomLevel: 3,
        description: 'Wilhelm II. entlässt den "Eisernen Kanzler".',
        details: 'Der junge Kaiser Wilhelm II. will selbst regieren und entlässt den "Eisernen Kanzler". Der außenpolitische Kurs ändert sich: Deutschland strebt nach Weltmacht und Kolonien ("Platz an der Sonne"). Das Bündnissystem Bismarcks bricht zusammen.'
    },

    // ========== KLASSE 9: IMPERIALISMUS ==========
    {
        year: 1884,
        title: 'Berliner Konferenz',
        era: '19jh',
        zoomLevel: 2,
        description: 'Europa teilt Afrika auf.',
        details: 'Auf der "Kongo-Konferenz" in Berlin teilen die europäischen Großmächte Afrika unter sich auf. Sie ziehen Grenzen mit dem Lineal, ohne Rücksicht auf Völker und Kulturen. Beginn der Hochphase des Kolonialismus - der "Wettlauf um Afrika".'
    },
    {
        year: 1898,
        title: 'Flottengesetze',
        era: '19jh',
        zoomLevel: 3,
        description: 'Deutschland baut Kriegsflotte aus. Wettrüsten beginnt.',
        details: 'Admiral Tirpitz setzt die Flottengesetze durch. Deutschland will zur Seemacht werden und Großbritannien herausfordern. Dies führt zu einem kostspieligen Wettrüsten und verschlechtert die Beziehungen zu England erheblich.'
    },

    // ========== KLASSE 9: ERSTER WELTKRIEG ==========
    {
        year: 1914,
        title: 'Attentat Sarajevo',
        era: '20jh',
        zoomLevel: 3,
        description: 'Ermordung des Thronfolgers löst Bündnismechanismus aus.',
        details: 'Der serbische Nationalist Gavrilo Princip erschießt Thronfolger Franz Ferdinand und seine Frau in Sarajevo. Österreich-Ungarn stellt Serbien ein Ultimatum. Durch die Bündnissysteme und das Wettrüsten wird daraus ein Weltkrieg.'
    },
    {
        year: 1914,
        title: 'Erster Weltkrieg',
        era: '20jh',
        zoomLevel: 1,
        description: 'Weltkrieg beginnt. "Augusterlebnis" - Kriegsbegeisterung.',
        details: 'Deutschland erklärt Russland und Frankreich den Krieg. Die Menschen begrüßen den Krieg zunächst begeistert ("Augusterlebnis"). Man glaubt an einen kurzen Krieg ("Weihnachten sind wir wieder daheim"). Doch es wird ein industrialisierter Massenkrieg mit Millionen Toten.'
    },
    {
        year: 1916,
        title: 'Schlacht Verdun',
        era: '20jh',
        zoomLevel: 2,
        description: 'Längste Schlacht: 700.000 Tote für wenige Kilometer.',
        details: 'Die Schlacht um Verdun wird zum Symbol für die Sinnlosigkeit des Stellungskriegs. Deutsche und französische Truppen kämpfen fast ein Jahr lang um wenige Kilometer. Hunderttausende sterben in einem gnadenlosen Abnutzungskrieg - Verdun wird zur "Blutpumpe".'
    },
    {
        year: 1917,
        title: 'USA treten ein',
        era: '20jh',
        zoomLevel: 2,
        description: 'Kriegseintritt USA - Deutschland kann nicht mehr gewinnen.',
        details: 'Nach dem uneingeschränkten U-Boot-Krieg und der Zimmermann-Depesche treten die USA auf Seiten der Entente in den Krieg ein. Die industrielle und militärische Überlegenheit der USA wird zum entscheidenden Faktor. Deutschland kann nicht mehr gewinnen.'
    },
    {
        year: 1917,
        title: 'Russ. Revolution',
        era: '20jh',
        zoomLevel: 2,
        description: 'Bolschewiki übernehmen Macht in Russland.',
        details: 'Die Februarrevolution stürzt den Zaren, im Oktober übernehmen die Bolschewiki unter Lenin die Macht. Sie schließen Frieden mit Deutschland (Brest-Litowsk) und beginnen den Aufbau eines kommunistischen Staates. Die "Rote Gefahr" wird zum Schreckgespenst Europas.'
    },
    {
        year: 1918,
        title: 'Kriegsende',
        era: '20jh',
        zoomLevel: 1,
        description: 'Deutschland kapituliert. Kaiser dankt ab. 17 Mio. Tote.',
        details: 'Nach der Niederlage bricht die Heimatfront zusammen. Matrosenaufstände und Revolutionen erfassen Deutschland. Kaiser Wilhelm II. dankt ab und flieht nach Holland. Am 11. November wird der Waffenstillstand unterzeichnet. Der Krieg forderte 17 Millionen Tote.'
    },
    {
        year: 1919,
        title: 'Versailler Vertrag',
        era: '20jh',
        zoomLevel: 1,
        description: 'Friedensvertrag mit harten Bedingungen für Deutschland.',
        details: 'Der Versailler Vertrag legt Deutschland die alleinige Kriegsschuld auf ("Kriegsschuldartikel"). Deutschland verliert Gebiete, muss entwaffnen und enorme Reparationen zahlen. Der "Diktatfrieden" wird von vielen Deutschen als Demütigung empfunden und schafft Konfliktstoff.'
    },

    // ========== KLASSE 9: WEIMARER REPUBLIK ==========
    {
        year: 1919,
        title: 'Weimarer Republik',
        era: '20jh',
        zoomLevel: 1,
        description: 'Erste deutsche Demokratie gegründet.',
        details: 'Die Nationalversammlung tagt in Weimar (Berlin ist zu unsicher) und verabschiedet eine demokratische Verfassung. Deutschland wird Republik mit einem starken Reichspräsidenten. Die Demokratie wird jedoch von vielen abgelehnt - "Republik ohne Republikaner".'
    },
    {
        year: 1920,
        title: 'Kapp-Putsch',
        era: '20jh',
        zoomLevel: 3,
        description: 'Rechtsradikale Putschversuch scheitert am Generalstreik.',
        details: 'Rechtsradikale Freikorps marschieren auf Berlin. Der Putsch scheitert am Generalstreik der Arbeiter. Die junge Demokratie ist von rechts und links bedroht. Viele Richter und Beamte sympathisieren mit den Rechten.'
    },
    {
        year: 1923,
        title: 'Hyperinflation',
        era: '20jh',
        zoomLevel: 2,
        description: 'Geld wird wertlos. Brot kostet Milliarden Mark.',
        details: 'Als Deutschland Reparationen nicht zahlt, besetzen französische Truppen das Ruhrgebiet (Ruhrkampf). Der passive Widerstand und das Drucken von Geld führen zur Hyperinflation. Ein Brot kostet Milliarden Mark. Viele Menschen verlieren ihre Ersparnisse - Vertrauensverlust in die Republik.'
    },
    {
        year: 1923,
        title: 'Hitler-Putsch',
        era: '20jh',
        zoomLevel: 3,
        description: 'Hitler versucht Putsch in München. Scheitert.',
        details: 'Hitler und Ludendorff versuchen in München die Regierung zu stürzen. Der Putsch wird niedergeschlagen. Hitler wird zu 5 Jahren Festungshaft verurteilt (kommt nach 9 Monaten frei) und schreibt in Haft "Mein Kampf".'
    },
    {
        year: 1929,
        title: 'Weltwirtschaftskrise',
        era: '20jh',
        zoomLevel: 1,
        description: 'Börsencrash löst globale Depression aus.',
        details: 'Der "Schwarze Freitag" an der New Yorker Börse löst eine weltweite Wirtschaftskrise aus. In Deutschland steigt die Arbeitslosigkeit auf über 6 Millionen. Die Krise erschüttert das Vertrauen in die Demokratie und stärkt radikale Parteien, besonders die NSDAP.'
    },
    {
        year: 1930,
        title: 'NSDAP zweitstärkste',
        era: '20jh',
        zoomLevel: 3,
        description: 'Hitlers Partei gewinnt massiv in der Krise.',
        details: 'Bei den Reichstagswahlen wird die NSDAP aus dem Stand zweitstärkste Kraft mit 18,3%. Die Wirtschaftskrise, Massenarbeitslosigkeit und geschickte Propaganda machen Hitler salonfähig. Die demokratische Mitte erodiert.'
    },

    // ========== KLASSE 9: NATIONALSOZIALISMUS ==========
    {
        year: 1933,
        title: 'Machtergreifung',
        era: '20jh',
        zoomLevel: 1,
        description: 'Hitler wird Reichskanzler. NS-Diktatur beginnt.',
        details: 'Reichspräsident Hindenburg ernennt Hitler am 30. Januar zum Reichskanzler. Die Nationalsozialisten nutzen legale Mittel, um die Demokratie abzuschaffen. Innerhalb weniger Monate errichten sie eine totalitäre Diktatur. Die "Machtergreifung" wird inszeniert.'
    },
    {
        year: 1933,
        title: 'Ermächtigungsgesetz',
        era: '20jh',
        zoomLevel: 2,
        description: 'Parlament entmachtet sich selbst.',
        details: 'Mit dem Ermächtigungsgesetz kann Hitler ohne Zustimmung des Reichstags Gesetze erlassen. Nur die SPD stimmt dagegen (KPD-Abgeordnete sind bereits verhaftet). Die Demokratie schafft sich selbst ab. Die Diktatur wird legalisiert.'
    },
    {
        year: 1933,
        title: 'Gleichschaltung',
        era: '20jh',
        zoomLevel: 2,
        description: 'Parteien und Gewerkschaften werden aufgelöst.',
        details: 'Alle Parteien außer der NSDAP werden verboten. Gewerkschaften aufgelöst, Länder entmachtet. Medien, Kultur und Gesellschaft werden "gleichgeschaltet" - unter totale NS-Kontrolle gebracht. Der Einparteienstaat entsteht.'
    },
    {
        year: 1935,
        title: 'Nürnberger Gesetze',
        era: '20jh',
        zoomLevel: 2,
        description: 'Juden werden per Gesetz rechtlos gemacht.',
        details: 'Die Nürnberger Rassegesetze entziehen Juden die Bürgerrechte und verbieten "Rassenschande" (Beziehungen zwischen Juden und "Ariern"). Dies ist ein weiterer Schritt zur systematischen Verfolgung. Juden werden aus dem öffentlichen Leben ausgeschlossen.'
    },
    {
        year: 1938,
        title: 'Reichspogromnacht',
        era: '20jh',
        zoomLevel: 2,
        description: 'Synagogen brennen. Organisierte Gewalt gegen Juden.',
        details: 'In der Nacht vom 9. auf 10. November brennen überall Synagogen. Jüdische Geschäfte werden zerstört, Menschen misshandelt und ermordet. Es ist eine orchestrierte Aktion der SA, kein "spontaner Volkszorn". Die Verfolgung verschärft sich dramatisch.'
    },

    // ========== KLASSE 9: ZWEITER WELTKRIEG ==========
    {
        year: 1939,
        title: 'Zweiter Weltkrieg',
        era: '20jh',
        zoomLevel: 1,
        description: 'Deutschland überfällt Polen. Weltkrieg beginnt.',
        details: 'Am 1. September greift Deutschland Polen an. Mit dem "Blitzkrieg" - schnellen Panzer- und Luftangriffen - wird Polen in wenigen Wochen erobert. Großbritannien und Frankreich erklären den Krieg, bleiben aber zunächst passiv ("Sitzkrieg"). Der Zweite Weltkrieg beginnt.'
    },
    {
        year: 1940,
        title: 'Frankreich kapituliert',
        era: '20jh',
        zoomLevel: 3,
        description: 'Deutscher Westfeldzug. Frankreich in 6 Wochen besiegt.',
        details: 'Mit dem Angriff im Westen erobert Deutschland in nur 6 Wochen Frankreich. Hitler zwingt Frankreich zur Kapitulation im selben Eisenbahnwaggon wie 1918 - eine bewusste Demütigung. Deutschland kontrolliert fast ganz Westeuropa. Die Wehrmacht scheint unbesiegbar.'
    },
    {
        year: 1941,
        title: 'Angriff auf UdSSR',
        era: '20jh',
        zoomLevel: 1,
        description: 'Unternehmen Barbarossa - Vernichtungskrieg im Osten.',
        details: 'Mit 3 Millionen Soldaten überfällt Deutschland die Sowjetunion. Es ist ein rassenideologischer Vernichtungskrieg. Millionen sowjetische Kriegsgefangene sterben durch Hunger und Misshandlung. Hinter der Front morden Einsatzgruppen Juden, Kommunisten und andere.'
    },
    {
        year: 1942,
        title: 'Wannseekonferenz',
        era: '20jh',
        zoomLevel: 2,
        description: 'Planung der "Endlösung" - industrieller Massenmord.',
        details: 'Bei der Wannseekonferenz koordinieren NS-Funktionäre die systematische Ermordung aller europäischen Juden. In Vernichtungslagern wie Auschwitz wird der Holocaust industriell durchgeführt. Bis Kriegsende werden 6 Millionen Juden ermordet - der größte Völkermord der Geschichte.'
    },
    {
        year: 1942,
        title: 'Schlacht Stalingrad',
        era: '20jh',
        zoomLevel: 2,
        description: 'Wendepunkt. Deutsche 6. Armee kapituliert.',
        details: 'Die Schlacht um Stalingrad wird zum Wendepunkt. Die 6. Armee wird eingekesselt. Hitler verbietet den Ausbruch. Im Februar 1943 kapituliert sie - das erste Mal, dass eine deutsche Armee kapituliert. Die Initiative geht endgültig an die Sowjets über.'
    },
    {
        year: 1943,
        title: 'Weiße Rose',
        era: '20jh',
        zoomLevel: 3,
        description: 'Geschwister Scholl leisten Widerstand.',
        details: 'Die Widerstandsgruppe "Weiße Rose" um die Geschwister Scholl verteilt Flugblätter gegen das NS-Regime. Sie werden verraten, verhaftet und nach Schauprozessen hingerichtet. Ihr Mut wird zum Symbol des studentischen Widerstands gegen die Diktatur.'
    },
    {
        year: 1944,
        title: 'D-Day',
        era: '20jh',
        zoomLevel: 2,
        description: 'Alliierte landen in Normandie. Zweite Front eröffnet.',
        details: 'Mit der größten Landeoperation der Geschichte landen die Alliierten am 6. Juni in der Normandie. Deutschland kämpft nun an zwei Fronten und ist eingekesselt. Die Befreiung Westeuropas beginnt. Das Ende Nazi-Deutschlands rückt näher.'
    },
    {
        year: 1944,
        title: 'Attentat auf Hitler',
        era: '20jh',
        zoomLevel: 3,
        description: 'Stauffenberg-Attentat scheitert.',
        details: 'Claus Schenk Graf von Stauffenberg platziert eine Bombe im Führerhauptquartier. Hitler überlebt knapp. Die Verschwörer des 20. Juli werden brutal verfolgt und hingerichtet. Der militärische Widerstand wird zerschlagen.'
    },
    {
        year: 1945,
        title: 'Befreiung Auschwitz',
        era: '20jh',
        zoomLevel: 3,
        description: 'Sowjets befreien Vernichtungslager. Holocaust offenbar.',
        details: 'Sowjetische Soldaten befreien das Vernichtungslager Auschwitz am 27. Januar. Sie finden wenige überlebende Häftlinge und Berge von Leichen. Das Ausmaß des industriellen Massenmords wird der Welt bekannt.'
    },
    {
        year: 1945,
        title: 'Kriegsende',
        era: '20jh',
        zoomLevel: 1,
        description: 'Deutschland kapituliert. 60 Millionen Tote.',
        details: 'Nach Hitlers Selbstmord am 30. April kapituliert Deutschland am 8. Mai bedingungslos. Europa liegt in Trümmern. Der Zweite Weltkrieg forderte etwa 60 Millionen Menschenleben. Der Holocaust ermordete 6 Millionen Juden und Millionen weitere Menschen. Deutschland ist besetzt und geteilt.'
    },

    // ========== KLASSE 10: KALTER KRIEG ==========
    {
        year: 1947,
        title: 'Truman-Doktrin',
        era: '20jh',
        zoomLevel: 3,
        description: 'USA verkünden Eindämmung des Kommunismus.',
        details: 'Präsident Truman verkündet, dass die USA den Kommunismus eindämmen werden ("Containment"). Mit dem Marshall-Plan unterstützen sie den Wiederaufbau Westeuropas. Der Kalte Krieg zwischen den Supermächten USA und UdSSR beginnt.'
    },
    {
        year: 1948,
        title: 'Berlin-Blockade',
        era: '20jh',
        zoomLevel: 2,
        description: 'Sowjets blockieren Berlin. Luftbrücke versorgt Stadt.',
        details: 'Die Sowjetunion blockiert alle Land- und Wasserwege nach West-Berlin. Die Alliierten versorgen die 2 Millionen Einwohner fast ein Jahr lang aus der Luft - die größte Luftbrücke der Geschichte. West-Berlin wird zum Symbol des Widerstands gegen den Kommunismus.'
    },
    {
        year: 1949,
        title: 'Gründung BRD/DDR',
        era: '20jh',
        zoomLevel: 1,
        description: 'Deutschland wird in zwei Staaten geteilt.',
        details: 'Am 23. Mai wird die Bundesrepublik Deutschland gegründet - eine parlamentarische Demokratie mit sozialer Marktwirtschaft. Am 7. Oktober folgt die DDR - eine sozialistische Diktatur unter sowjetischer Kontrolle. Die Teilung Deutschlands ist Realität und wird zum Symbol des Kalten Krieges.'
    },
    {
        year: 1953,
        title: 'Aufstand 17. Juni',
        era: '20jh',
        zoomLevel: 2,
        description: 'Arbeiter erheben sich in DDR. Panzer schlagen nieder.',
        details: 'Zunächst protestieren Bauarbeiter in Berlin gegen Normerhöhungen. Schnell wird daraus ein Volksaufstand gegen die SED-Diktatur in der ganzen DDR. Sowjetische Panzer schlagen den Aufstand brutal nieder. Die SED-Herrschaft wird mit Gewalt gefestigt.'
    },
    {
        year: 1961,
        title: 'Bau der Mauer',
        era: '20jh',
        zoomLevel: 1,
        description: 'DDR riegelt West-Berlin ab. Symbol der Teilung.',
        details: 'In der Nacht vom 12. auf 13. August beginnt die DDR mit dem Mauerbau. Über Nacht wird Berlin geteilt. Familien werden getrennt. Die Mauer wird zum Symbol des Kalten Krieges und der deutschen Teilung. Sie steht für die Unfreiheit im Osten.'
    },
    {
        year: 1962,
        title: 'Kubakrise',
        era: '20jh',
        zoomLevel: 2,
        description: 'Welt steht am Rand eines Atomkriegs.',
        details: 'Die Sowjetunion stationiert Atomraketen auf Kuba. Die USA verhängen eine Seeblockade. 13 Tage lang steht die Welt am Rand eines Atomkriegs. Durch geheime Verhandlungen zwischen Kennedy und Chruschtschow wird die Krise beigelegt - ein Wendepunkt im Kalten Krieg.'
    },
    {
        year: 1968,
        title: 'Prager Frühling',
        era: '20jh',
        zoomLevel: 2,
        description: '"Sozialismus mit menschlichem Antlitz" - Panzer beenden Reform.',
        details: 'In der Tschechoslowakei beginnt unter Alexander Dubček eine Liberalisierung - der "Prager Frühling". Die Sowjetunion sieht ihre Kontrolle bedroht. In der Nacht vom 20. auf 21. August marschieren Warschauer-Pakt-Truppen ein und beenden die Reformen brutal.'
    },
    {
        year: 1972,
        title: 'Grundlagenvertrag',
        era: '20jh',
        zoomLevel: 2,
        description: 'BRD und DDR erkennen sich gegenseitig an.',
        details: 'Mit dem Grundlagenvertrag erkennen sich beide deutsche Staaten de facto an, ohne die Einheit aufzugeben (Willy Brandts "Neue Ostpolitik"). Die Beziehungen normalisieren sich. Reisen werden leichter. Doch die DDR baut die Mauer weiter aus und verschärft die Kontrollen.'
    },
    {
        year: 1985,
        title: 'Gorbatschow',
        era: '20jh',
        zoomLevel: 2,
        description: 'Glasnost und Perestroika - Reformen in UdSSR.',
        details: 'Michail Gorbatschow wird Generalsekretär der KPdSU. Er erkennt, dass die Sowjetunion reformiert werden muss. Mit Glasnost (Offenheit) und Perestroika (Umbau) leitet er Reformen ein, die das System am Ende sprengen werden. Er sagt: "Wer zu spät kommt, den bestraft das Leben."'
    },
    {
        year: 1989,
        title: 'Mauerfall',
        era: '20jh',
        zoomLevel: 1,
        description: 'Die Mauer fällt! Deutschland jubelt.',
        details: 'Nach Massenfluchten über Ungarn und wachsendem Druck gibt die DDR-Führung nach. Am 9. November verkündet Schabowski versehentlich die sofortige Grenzöffnung. Tausende strömen nach West-Berlin. Die Mauer fällt. Es ist der Anfang vom Ende der DDR und des Kalten Krieges.'
    },
    {
        year: 1990,
        title: 'Wiedervereinigung',
        era: '20jh',
        zoomLevel: 1,
        description: 'Deutschland ist wieder vereint.',
        details: 'Nach Verhandlungen der "Zwei-plus-Vier" (beide deutsche Staaten und die Siegermächte) wird die Wiedervereinigung besiegelt. Am 3. Oktober 1990 tritt die DDR der Bundesrepublik bei. Deutschland ist nach 45 Jahren wieder vereint. Ein historischer Moment.'
    },
    {
        year: 1991,
        title: 'Ende der Sowjetunion',
        era: '20jh',
        zoomLevel: 1,
        description: 'UdSSR zerfällt. Kalter Krieg endet.',
        details: 'Nach einem gescheiterten Putsch gegen Gorbatschow zerfällt die Sowjetunion. Die Teilrepubliken werden unabhängig. Der Kalte Krieg ist endgültig vorbei. Die USA sind die einzige verbliebene Supermacht. Eine neue Weltordnung entsteht.'
    },

    // ========== KLASSE 10: EUROPÄISCHE INTEGRATION ==========
    {
        year: 1951,
        title: 'Montanunion',
        era: '20jh',
        zoomLevel: 2,
        description: 'Erste europäische Integration: Kohle und Stahl.',
        details: 'Die Europäische Gemeinschaft für Kohle und Stahl (EGKS/Montanunion) ist der erste Schritt zur europäischen Integration. Die ehemaligen Kriegsgegner Deutschland und Frankreich legen ihre Rüstungsindustrien zusammen - Krieg wird unmöglich gemacht. Robert Schuman und Jean Monnet sind die Väter Europas.'
    },
    {
        year: 1957,
        title: 'Römische Verträge',
        era: '20jh',
        zoomLevel: 2,
        description: 'Gründung der EWG - Vorläufer der EU.',
        details: 'Mit den Römischen Verträgen gründen sechs Staaten (Deutschland, Frankreich, Italien, Belgien, Niederlande, Luxemburg) die Europäische Wirtschaftsgemeinschaft (EWG). Ziel ist ein gemeinsamer Markt. Dies ist die Geburtsstunde der heutigen EU.'
    },
    {
        year: 1992,
        title: 'Maastricht-Vertrag',
        era: '20jh',
        zoomLevel: 2,
        description: 'Die Europäische Union entsteht.',
        details: 'Der Vertrag von Maastricht schafft die Europäische Union. Es werden gemeinsame Politikfelder geschaffen (Außen- und Sicherheitspolitik, Justiz und Inneres). Die Einführung einer gemeinsamen Währung wird beschlossen. Die Integration vertieft sich erheblich - mit Unionsbürgerschaft.'
    },
    {
        year: 2002,
        title: 'Euro-Bargeld',
        era: '20jh',
        zoomLevel: 2,
        description: '12 Staaten führen gemeinsame Währung ein.',
        details: 'Nach einer dreijährigen Übergangsphase wird der Euro zum Bargeld. In 12 EU-Staaten ersetzen Euro-Münzen und -Scheine die nationalen Währungen (D-Mark, Franc, Lira etc.). Es ist ein historischer Schritt der europäischen Integration. Der Euro wird zur zweitwichtigsten Währung der Welt.'
    },
    {
        year: 2004,
        title: 'EU-Osterweiterung',
        era: '20jh',
        zoomLevel: 3,
        description: 'Zehn neue Mitglieder aus Osteuropa.',
        details: 'Mit der Osterweiterung treten zehn neue Mitglieder bei, darunter Polen, Tschechien, Ungarn und die baltischen Staaten. Die Teilung Europas wird überwunden. Die EU wächst auf 25 Mitglieder. Es ist die größte Erweiterung in der Geschichte der Union.'
    }
];
