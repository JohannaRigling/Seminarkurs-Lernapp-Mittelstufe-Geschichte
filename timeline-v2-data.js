// ===== TIMELINE EVENTS MIT KONTINUIERLICHEM ZOOM =====
// minZoom: Je höher, desto näher muss man ranzoomen um das Event zu sehen
// 1.0 = Nur Epochen sichtbar, keine Events!
// 1.8-2.5 = Wichtigste Events (bei leichtem Zoom)
// 3.0-5.0 = Mittlere Events
// 6.0+ = Details (nur bei starkem Zoom)

const TIMELINE_EVENTS_V2 = [
    // ========== MITTELALTER (800-1500) ==========
    {
        year: 800,
        title: 'Karl d. Große Kaiser',
        minZoom: 2.0,
        date: '25. Dezember 800',
        description: 'Krönung Karls des Großen zum römischen Kaiser durch Papst Leo III. in Rom.',
        details: 'Mit der Krönung knüpft Karl an die Tradition des antiken Imperium Romanum an und legitimiert seine Herrschaft als Schutzherr der Christenheit. Die enge Verbindung von weltlicher und geistlicher Macht prägt das mittelalterliche Europa über Jahrhunderte.'
    },
    {
        year: 843,
        title: 'Vertrag von Verdun',
        minZoom: 3.2,
        description: 'Teilung des Frankenreichs',
        details: 'Das Frankenreich wird unter Karls Enkeln aufgeteilt - die Keimzelle der späteren Staaten Deutschland, Frankreich und Italien.'
    },
    {
        year: 962,
        title: 'Otto I. Kaiser',
        minZoom: 2.4,
        date: '2. Februar 962',
        description: 'Krönung Ottos I. zum römischen Kaiser durch Papst Johannes XII.',
        details: 'Mit der Kaiserkrönung beginnt die Tradition des späteren Heiligen Römischen Reiches, das bis 1806 fortbesteht. Otto sichert sein Reich durch die enge Anbindung der Reichskirche und den Sieg über die Ungarn auf dem Lechfeld 955.'
    },
    {
        year: 1077,
        title: 'Gang nach Canossa',
        minZoom: 2,
        date: '25.–28. Januar 1077',
        description: 'Heinrich IV. erbittet als Büßer vor Papst Gregor VII. die Aufhebung des Kirchenbanns.',
        details: 'Im Investiturstreit ringen Kaiser und Papst um das Recht, Bischöfe einzusetzen. Der Gang nach Canossa wird zum Sinnbild für den Konflikt zwischen geistlicher und weltlicher Macht im Mittelalter.'
    },
    {
        year: 1096,
        title: 'Erster Kreuzzug',
        minZoom: 3.2,
        description: 'Beginn der Kreuzzüge ins Heilige Land',
        details: 'Papst Urban II. ruft zum Kreuzzug auf. Die Kreuzzüge prägen das Verhältnis zwischen Christentum und Islam für Jahrhunderte.'
    },
    {
        year: 1122,
        title: 'Wormser Konkordat',
        minZoom: 3.6,
        description: 'Kompromiss im Investiturstreit',
        details: 'Kaiser und Papst einigen sich: Der Kaiser verzichtet auf die Investitur mit Ring und Stab, darf aber bei der Wahl anwesend sein.'
    },
    {
        year: 1215,
        title: 'Magna Carta',
        minZoom: 2.8,
        description: 'Englischer König muss Adelsprivilegien anerkennen',
        details: 'Die Magna Carta schränkt die Macht des Königs ein und wird zur Grundlage der englischen Verfassungstradition.'
    },
    {
        year: 1347,
        title: 'Die Pest',
        minZoom: 2.0,
        date: 'Oktober 1347',
        description: 'Mit der Landung genuesischer Schiffe in Messina erreicht der Schwarze Tod Europa.',
        details: 'Bis 1353 stirbt rund ein Drittel der europäischen Bevölkerung. Die Seuche erschüttert das Vertrauen in Kirche und Obrigkeit, beschleunigt soziale Umwälzungen und prägt die Bildwelt des Spätmittelalters.'
    },
    {
        year: 1356,
        title: 'Goldene Bulle',
        minZoom: 4,
        description: 'Karl IV. regelt die Kaiserwahl',
        details: 'Sieben Kurfürsten wählen fortan den deutschen König. Die Goldene Bulle ist die erste "Verfassung" des Heiligen Römischen Reiches und gilt bis 1806.'
    },
    {
        year: 1378,
        title: 'Großes Schisma',
        minZoom: 3.6,
        description: 'Zwei – später drei – Päpste gleichzeitig',
        details: 'Das abendländische Schisma erschüttert die Kirche. Rivalierende Päpste in Rom und Avignon untergraben die päpstliche Autorität – ein Vorbote der Reformation.'
    },
    {
        year: 1415,
        title: 'Jan Hus verbrannt',
        minZoom: 3.6,
        description: 'Kirchenreformer auf dem Scheiterhaufen in Konstanz',
        details: 'Das Konzil von Konstanz verurteilt Jan Hus trotz freien Geleits. Seine Verbrennung löst die Hussitenkriege aus – Hus gilt als Vorreiter der Reformation.'
    },
    {
        year: 1453,
        title: 'Fall Konstantinopels',
        minZoom: 2.4,
        date: '29. Mai 1453',
        description: 'Die Osmanen unter Sultan Mehmed II. erobern Konstantinopel, die Hauptstadt des Byzantinischen Reiches.',
        details: 'Mit dem Fall des „zweiten Roms" endet das tausendjährige Byzantinische Reich. Griechische Gelehrte fliehen nach Italien und beflügeln die Renaissance; die unterbrochenen Handelswege treiben die europäische Suche nach dem Seeweg nach Indien voran.'
    },
    {
        year: 1455,
        title: 'Gutenberg-Bibel',
        minZoom: 4,
        description: 'Erster Druck mit beweglichen Lettern',
        details: 'Johannes Gutenberg revolutioniert mit dem Buchdruck die Verbreitung von Wissen. Information wird demokratisiert.'
    },

    // ========== FRÜHE NEUZEIT (1500-1789) ==========
    {
        year: 1492,
        title: 'Kolumbus in Amerika',
        minZoom: 2.0,
        date: '12. Oktober 1492',
        description: 'Christoph Kolumbus erreicht im Auftrag der spanischen Krone die Bahamas.',
        details: 'In der Annahme, einen westlichen Seeweg nach Indien gefunden zu haben, betritt er einen für Europäer unbekannten Kontinent. Die Folgen — Kolonialisierung, atlantischer Sklavenhandel und der Austausch von Pflanzen, Tieren und Krankheiten — verändern Wirtschaft und Bevölkerung beider Hemisphären grundlegend.'
    },
    {
        year: 1517,
        title: 'Reformation',
        minZoom: 2,
        date: '31. Oktober 1517',
        description: 'Martin Luther veröffentlicht seine 95 Thesen gegen den Ablasshandel.',
        details: 'Aus der theologischen Kritik wird binnen weniger Jahre eine Spaltung der westlichen Christenheit. Begünstigt durch den Buchdruck und reformfreudige Fürsten prägt die Reformation das konfessionelle Gefüge Europas bis heute.'
    },
    {
        year: 1519,
        title: 'Cortés in Mexiko',
        minZoom: 6.0,
        description: 'Eroberung des Aztekenreichs beginnt',
        details: 'Hernán Cortés landet in Mexiko und beginnt die Eroberung des Aztekenreichs. Beginn der spanischen Kolonialherrschaft in Lateinamerika.'
    },
    {
        year: 1521,
        title: 'Luther in Worms',
        minZoom: 4.5,
        description: 'Luther vor dem Reichstag',
        details: 'Luther weigert sich zu widerrufen: "Hier stehe ich, ich kann nicht anders." Er wird geächtet, aber von Friedrich dem Weisen geschützt.'
    },
    {
        year: 1524,
        title: 'Bauernkrieg',
        minZoom: 6.0,
        description: 'Größte Volkserhebung des Mittelalters',
        details: 'Südwestdeutsche Bauern fordern ihre Rechte, inspiriert von der Reformation. Über 100.000 Tote. Luther distanziert sich von den Aufständischen – die soziale Dimension der Reformation scheitert.'
    },
    {
        year: 1534,
        title: 'Jesuitenorden',
        minZoom: 6,
        description: 'Ignatius von Loyola gründet Orden',
        details: 'Die Jesuiten werden zur Speerspitze der Gegenreformation und des katholischen Bildungswesens.'
    },
    {
        year: 1545,
        title: 'Konzil von Trient',
        minZoom: 4,
        description: 'Katholische Gegenreformation beginnt',
        details: 'Das Konzil leitet die katholische Reform ein und definiert die Glaubensgrundsätze neu gegen die Protestanten.'
    },
    {
        year: 1555,
        title: 'Augsburger Religionsfrieden',
        minZoom: 3.2,
        description: 'Cuius regio, eius religio',
        details: 'Der Landesherr bestimmt die Religion. Katholiken und Lutheraner werden gleichgestellt. Erste Koexistenz der Konfessionen.'
    },
    {
        year: 1572,
        title: 'Bartholomäusnacht',
        minZoom: 3.6,
        description: 'Massaker an Hugenotten in Paris',
        details: 'In der Nacht zum 24. August werden tausende Hugenotten ermordet. Symbol für die französischen Religionskriege. Der Schock erschüttert das protestantische Europa.'
    },
    {
        year: 1588,
        title: 'Spanische Armada',
        minZoom: 4,
        description: 'England besiegt Spanien zur See',
        details: 'Die spanische Armada scheitert bei der Invasion Englands. Spaniens Niedergang beginnt, England wird zur Seemacht.'
    },
    {
        year: 1618,
        title: 'Dreißigjähriger Krieg',
        minZoom: 2.0,
        date: '23. Mai 1618',
        description: 'Der Prager Fenstersturz löst einen 30 Jahre dauernden Krieg im Heiligen Römischen Reich aus.',
        details: 'Aus dem konfessionellen Konflikt zwischen Protestanten und Katholiken wird ein europäisches Machtringen unter Beteiligung Frankreichs, Schwedens und Spaniens. Weite Teile Mitteleuropas werden verwüstet, die Bevölkerung sinkt regional um mehr als ein Drittel.'
    },
    {
        year: 1648,
        title: 'Westfälischer Frieden',
        minZoom: 2.4,
        date: '24. Oktober 1648',
        description: 'Die Friedensschlüsse von Münster und Osnabrück beenden den Dreißigjährigen Krieg.',
        details: 'Frankreich und Schweden gehen als Garantiemächte gestärkt hervor, die Niederlande und die Schweiz werden völkerrechtlich unabhängig. Das Reich zerfällt faktisch in ein lockeres Bündnis souveräner Territorien — eine Grundlage des modernen Staatensystems.'
    },
    {
        year: 1649,
        title: 'Hinrichtung Karl I.',
        minZoom: 5.5,
        description: 'Englischer König wird enthauptet',
        details: 'Nach dem Bürgerkrieg wird König Karl I. hingerichtet. England wird kurzzeitig Republik unter Cromwell.'
    },
    {
        year: 1660,
        title: 'Restauration England',
        minZoom: 6,
        description: 'Monarchie kehrt zurück',
        details: 'Nach Cromwells Tod wird die Monarchie wiederhergestellt, aber mit eingeschränkter Macht.'
    },
    {
        year: 1683,
        title: 'Belagerung Wiens',
        minZoom: 4,
        description: 'Osmanen scheitern vor Wien',
        details: 'Die Türken werden vor Wien geschlagen. Beginn des Niedergangs des Osmanischen Reiches in Europa.'
    },
    {
        year: 1685,
        title: 'Edikt von Fontainebleau',
        minZoom: 6.0,
        description: 'Ludwig XIV. hebt Toleranzedikt auf',
        details: 'Das Edikt von Nantes (1598) wird widerrufen. Über 200.000 Hugenotten fliehen aus Frankreich und bringen Handwerk und Gelehrsamkeit nach Brandenburg, England und in die Niederlande.'
    },
    {
        year: 1689,
        title: 'Bill of Rights',
        minZoom: 3.6,
        description: 'England wird konstitutionelle Monarchie',
        details: 'Nach der Glorious Revolution erhält das Parlament mehr Macht. Vorbild für spätere Demokratien.'
    },
    {
        year: 1701,
        title: 'Preußen Königreich',
        minZoom: 2.8,
        description: 'Krönung Friedrich I. in Königsberg',
        details: 'Der Kurfürst von Brandenburg wird König in Preußen. Preußen beginnt seinen Aufstieg zur Großmacht.'
    },
    {
        year: 1740,
        title: 'Friedrich II. König',
        minZoom: 3.2,
        description: 'Friedrich der Große in Preußen',
        details: 'Der "Alte Fritz" macht Preußen zur europäischen Großmacht. Aufgeklärter Absolutismus und Militärstaat.'
    },
    {
        year: 1756,
        title: 'Siebenjähriger Krieg',
        minZoom: 4.0,
        description: 'Erster "Weltkrieg" der Geschichte',
        details: 'Krieg in Europa, Amerika, Indien. Preußen behauptet sich gegen Österreich, Frankreich und Russland.'
    },
    {
        year: 1769,
        title: 'Watts Dampfmaschine',
        minZoom: 3.6,
        description: 'Motor der Industrialisierung',
        details: 'James Watt verbessert die Dampfmaschine entscheidend. Grundlage der Industriellen Revolution.'
    },
    {
        year: 1773,
        title: 'Boston Tea Party',
        minZoom: 6.0,
        description: 'Kolonisten protestieren gegen Steuern',
        details: '"No taxation without representation" – Kolonisten werfen britischen Tee in den Hafen. Unmittelbarer Vorläufer der Amerikanischen Revolution und der Unabhängigkeit 1776.'
    },
    {
        year: 1776,
        title: 'Unabhängigkeit USA',
        minZoom: 3.6,
        description: 'Declaration of Independence',
        details: 'Die 13 Kolonien erklären sich unabhängig von England. Erste moderne Demokratie entsteht.'
    },

    // ========== FRANZÖSISCHE REVOLUTION & NAPOLEON ==========
    {
        year: 1789,
        title: 'Franz. Revolution',
        minZoom: 2,
        date: '14. Juli 1789',
        description: 'Mit dem Sturm auf die Bastille beginnt die Französische Revolution.',
        details: 'Bürgerschaft und Volk stürzen die ständische Ordnung und proklamieren in der Erklärung der Menschen- und Bürgerrechte universelle Freiheits- und Gleichheitsideale. Die Revolution endet mit Königsabsetzung, Terrorherrschaft und Aufstieg Napoleons; ihre Ideen prägen ganz Europa im 19. Jahrhundert.'
    },
    {
        year: 1791,
        title: 'Verfassung Frankreich',
        minZoom: 6,
        description: 'Erste französische Verfassung',
        details: 'Frankreich wird konstitutionelle Monarchie. Der König verliert die absolute Macht.'
    },
    {
        year: 1792,
        title: 'Republik Frankreich',
        minZoom: 5,
        description: 'Ausrufung der Republik',
        details: 'Die Monarchie wird abgeschafft. Frankreich wird Republik. Radikalisierung der Revolution.'
    },
    {
        year: 1793,
        title: 'Terrorherrschaft',
        minZoom: 4,
        description: 'Robespierre und die Jakobiner',
        details: 'Tausende werden guillotiniert. König Ludwig XVI. und Marie Antoinette sterben. Schreckensherrschaft im Namen der Tugend.'
    },
    {
        year: 1794,
        title: 'Ende Robespierres',
        minZoom: 6.0,
        description: 'Robespierre selbst guillotiniert',
        details: 'Die Terrorherrschaft endet mit Robespierres Hinrichtung. Das Direktorium übernimmt.'
    },
    {
        year: 1799,
        title: 'Napoleons Putsch',
        minZoom: 4.5,
        description: 'Napoleon wird Erster Konsul',
        details: 'Staatsstreich des 18. Brumaire. Napoleon übernimmt die Macht und verspricht Stabilität.'
    },
    {
        year: 1804,
        title: 'Napoleon Kaiser',
        minZoom: 2.8,
        description: 'Selbstkrönung zum Kaiser',
        details: 'Napoleon krönt sich selbst in Notre-Dame. Er vereint Revolution und Monarchie. Der Code Civil modernisiert das Recht.'
    },
    {
        year: 1805,
        title: 'Schlacht bei Austerlitz',
        minZoom: 5.5,
        description: 'Napoleons größter Sieg',
        details: 'Napoleon besiegt Österreich und Russland in der "Dreikaiserschlacht". Höhepunkt seiner Macht.'
    },
    {
        year: 1806,
        title: 'Ende des HRR',
        minZoom: 3.2,
        description: 'Kaiser Franz II. legt Krone nieder',
        details: 'Das Heilige Römische Reich endet nach über 800 Jahren. Deutschland besteht aus vielen Einzelstaaten im Rheinbund.'
    },
    {
        year: 1807,
        title: 'Kontinentalsperre',
        minZoom: 6,
        description: 'Napoleon sperrt England aus',
        details: 'Wirtschaftsblockade gegen England. Alle müssen mitmachen - wird zu Napoleons Problem.'
    },
    {
        year: 1812,
        title: 'Russlandfeldzug',
        minZoom: 4.5,
        description: 'Napoleons Katastrophe in Russland',
        details: 'Von 600.000 Soldaten kehren nur 20.000 zurück. Der Winter und die verbrannte Erde besiegen Napoleon.'
    },
    {
        year: 1813,
        title: 'Völkerschlacht Leipzig',
        minZoom: 4,
        description: 'Größte Schlacht bis dato',
        details: 'Mit 600.000 Soldaten größte Schlacht der Geschichte. Napoleons entscheidende Niederlage gegen die Koalition.'
    },
    {
        year: 1814,
        title: 'Verbannung Elba',
        minZoom: 6.0,
        description: 'Napoleon auf Insel verbannt',
        details: 'Nach der Abdankung wird Napoleon auf die Insel Elba verbannt. Aber nicht für lange...'
    },
    {
        year: 1815,
        title: 'Waterloo',
        minZoom: 4.5,
        description: 'Napoleons endgültige Niederlage',
        details: 'Nach seiner Rückkehr wird Napoleon bei Waterloo geschlagen. Endgültige Verbannung nach St. Helena.'
    },
    {
        year: 1815,
        title: 'Wiener Kongress',
        minZoom: 2,
        date: '18. September 1814 – 9. Juni 1815',
        description: 'Die europäischen Großmächte ordnen unter Metternichs Leitung Europa nach Napoleon neu.',
        details: 'Restauration und Legitimismus dominieren: alte Dynastien werden wieder eingesetzt, der Deutsche Bund tritt an die Stelle des Reichs. Liberale und nationale Forderungen werden unterdrückt — eine Spannung, die sich 1848 in den Revolutionen entlädt.'
    },

    // ========== VORMÄRZ & REVOLUTION 1848 ==========
    {
        year: 1817,
        title: 'Wartburgfest',
        minZoom: 4,
        description: 'Studenten fordern Einheit',
        details: 'Burschenschaften versammeln sich. Sie fordern ein geeintes, freies Deutschland. Metternich reagiert mit Repression.'
    },
    {
        year: 1819,
        title: 'Karlsbader Beschlüsse',
        minZoom: 4,
        description: 'Zensur und Überwachung',
        details: 'Metternich setzt repressive Maßnahmen durch: Zensur, Universitätsüberwachung, Verbot der Burschenschaften.'
    },
    {
        year: 1830,
        title: 'Juli-Revolution',
        minZoom: 4,
        description: 'Aufstände in Europa',
        details: 'Von Frankreich ausgehend erschüttern Revolutionen Europa. Polen, Belgien, deutsche Staaten erheben sich.'
    },
    {
        year: 1832,
        title: 'Hambacher Fest',
        minZoom: 3.2,
        description: '30.000 für Einheit und Freiheit',
        details: 'Größte Freiheitsdemonstration des Vormärz. Schwarz-Rot-Gold wird Symbol. Obrigkeit verschärft Repression.'
    },
    {
        year: 1835,
        title: 'Erste dt. Eisenbahn',
        minZoom: 3.6,
        description: 'Der "Adler" fährt',
        details: 'Von Nürnberg nach Fürth. Deutschlands Eisenbahnzeitalter beginnt. Motor der Industrialisierung.'
    },
    {
        year: 1844,
        title: 'Weberaufstand',
        minZoom: 4,
        description: 'Erste Arbeiterproteste',
        details: 'Schlesische Weber protestieren gegen Ausbeutung. Frühes Zeichen der sozialen Frage.'
    },
    {
        year: 1848,
        title: 'Märzrevolution',
        minZoom: 2.4,
        date: '13.–19. März 1848',
        description: 'Bürger und Arbeiter erzwingen in Wien und Berlin Verfassungszusagen und Pressefreiheit.',
        details: 'In der Frankfurter Paulskirche tagt erstmals ein gesamtdeutsches Parlament und beschließt eine liberale Reichsverfassung. Friedrich Wilhelm IV. lehnt die Kaiserkrone ab, die Revolution scheitert — ihre Forderungen nach Einheit, Verfassung und Grundrechten bleiben aber prägend.'
    },
    {
        year: 1848,
        title: 'Kommunist. Manifest',
        minZoom: 4.5,
        description: 'Marx und Engels',
        details: '"Proletarier aller Länder, vereinigt euch!" Grundlage sozialistischer Bewegungen weltweit.'
    },
    {
        year: 1849,
        title: 'Revolution scheitert',
        minZoom: 4,
        description: 'König lehnt Kaiserkrone ab',
        details: 'Friedrich Wilhelm IV. lehnt die "Krone aus der Gosse" ab. Revolution wird niedergeschlagen. Demokraten fliehen ins Exil.'
    },
    {
        year: 1850,
        title: 'Hochindustrialisierung',
        minZoom: 3.6,
        description: 'Deutschland wird Industrienation',
        details: 'Fabriken entstehen überall, Städte wachsen explosionsartig. Neue Arbeiterschaft unter schlechten Bedingungen. Soziale Frage wird drängend.'
    },

    // ========== DEUTSCHE EINIGUNG ==========
    {
        year: 1861,
        title: 'Wilhelm I. König',
        minZoom: 6,
        description: 'Neuer preußischer König',
        details: 'Wilhelm I. wird König von Preußen und bald deutscher Kaiser. Er beruft Bismarck.'
    },
    {
        year: 1862,
        title: 'Bismarck Minister',
        minZoom: 2.8,
        description: '"Eisen und Blut"-Rede',
        details: 'Otto von Bismarck wird Ministerpräsident. Deutsche Fragen werden durch "Eisen und Blut" gelöst, nicht durch Reden.'
    },
    {
        year: 1863,
        title: 'Gründung ADAV',
        minZoom: 4.5,
        description: 'Erste Arbeiterpartei',
        details: 'Ferdinand Lassalle gründet den Allgemeinen Deutschen Arbeiterverein. Beginn der organisierten Arbeiterbewegung.'
    },
    {
        year: 1864,
        title: 'Dt.-Dänischer Krieg',
        minZoom: 5.5,
        description: 'Erster Einigungskrieg',
        details: 'Preußen und Österreich kämpfen gemeinsam gegen Dänemark um Schleswig-Holstein. Erster Schritt zur Einigung.'
    },
    {
        year: 1866,
        title: 'Deutscher Krieg',
        minZoom: 4,
        description: 'Preußen vs. Österreich',
        details: 'Preußen siegt bei Königgrätz. Österreich scheidet aus deutscher Politik aus. Preußen übernimmt Führung.'
    },
    {
        year: 1867,
        title: 'Norddeutscher Bund',
        minZoom: 6,
        description: 'Preußen führt Norddeutschland',
        details: 'Bismarck gründet den Norddeutschen Bund unter preußischer Führung. Vorstufe zum Kaiserreich.'
    },
    {
        year: 1869,
        title: 'Gründung SDAP',
        minZoom: 5,
        description: 'Bebel und Liebknecht',
        details: 'Sozialdemokratische Arbeiterpartei wird gegründet. Vorläufer der SPD.'
    },
    {
        year: 1870,
        title: 'Dt.-Franz. Krieg',
        minZoom: 3.2,
        description: 'Krieg gegen Frankreich',
        details: 'Emser Depesche provoziert Frankreich. Gemeinsamer Kampf einigt Deutschland. Napoleon III. wird bei Sedan gefangen.'
    },
    {
        year: 1871,
        title: 'Reichsgründung',
        minZoom: 2,
        date: '18. Januar 1871',
        description: 'Wilhelm I. wird im Spiegelsaal von Versailles zum Deutschen Kaiser ausgerufen.',
        details: 'Nach den drei Einigungskriegen 1864, 1866 und 1870/71 entsteht unter preußischer Führung der erste deutsche Nationalstaat. Die Verfassung sichert Kaiser und Reichskanzler Bismarck weitreichende Macht; katholische und sozialistische Bewegungen werden in den Folgejahren bekämpft.'
    },
    {
        year: 1871,
        title: 'Pariser Kommune',
        minZoom: 6.0,
        description: 'Revolutionäre Selbstverwaltung in Paris',
        details: 'Nach der Niederlage gegen Preußen entsteht in Paris eine revolutionäre Arbeiterregierung. Nach 72 Tagen brutal niedergeschlagen. Erste Erfahrung einer sozialistischen Stadtregierung.'
    },
    {
        year: 1873,
        title: 'Gründerkrise',
        minZoom: 6.0,
        description: 'Erste Wirtschaftskrise im Reich',
        details: 'Nach dem Gründerboom platzt die Spekulationsblase. Viele verlieren ihr Vermögen.'
    },
    {
        year: 1878,
        title: 'Sozialistengesetze',
        minZoom: 4,
        description: 'Bismarck verbietet SPD',
        details: 'Nach Attentaten verbietet Bismarck sozialistische Organisationen. Die "Peitsche" seiner Sozial politik.'
    },
    {
        year: 1878,
        title: 'Berliner Kongress',
        minZoom: 6.0,
        description: 'Europa regelt den Balkan neu',
        details: 'Bismarck als "ehrlicher Makler": Die Großmächte verhandeln die Neuordnung des Balkans nach dem Russisch-Osmanischen Krieg. Serbien und Rumänien werden unabhängig, Österreich erhält Bosnien.'
    },
    {
        year: 1883,
        title: 'Sozialversicherung',
        minZoom: 4,
        description: 'Erste Krankenversicherung der Welt',
        details: 'Bismarcks "Zuckerbrot": Kranken-, Unfall-, Altersversicherung. Deutschland wird Vorreiter des Sozialstaats.'
    },
    {
        year: 1884,
        title: 'Berliner Konferenz',
        minZoom: 3.6,
        description: 'Europa teilt Afrika auf',
        details: 'Die Großmächte ziehen Grenzen mit dem Lineal, ohne Rücksicht auf Völker. Hochphase des Kolonialismus.'
    },
    {
        year: 1888,
        title: 'Dreikaiserjahr',
        minZoom: 3.2,
        description: 'Drei Kaiser in einem Jahr',
        details: 'Wilhelm I. stirbt, Friedrich III. stirbt nach 99 Tagen, Wilhelm II. wird Kaiser. Generationenwechsel.'
    },
    {
        year: 1890,
        title: 'Bismarck entlassen',
        minZoom: 3.6,
        description: 'Wilhelm II. will selbst regieren',
        details: 'Der junge Kaiser entlässt den "Eisernen Kanzler". Neuer Kurs: Weltmachtstreben und Flottenausbau.'
    },
    {
        year: 1898,
        title: 'Flottengesetze',
        minZoom: 4,
        description: 'Deutschland baut Kriegsflotte',
        details: 'Tirpitz setzt Flottenausbau durch. Wettrüsten mit England beginnt. "Platz an der Sonne".'
    },

    // ========== ERSTER WELTKRIEG ==========
    {
        year: 1905,
        title: 'Erste Marokkokrise',
        minZoom: 6,
        description: 'Deutschland provoziert Frankreich',
        details: 'Wilhelm II. in Tanger. Deutschland will Frankreichs Einfluss in Marokko brechen. Spannungen steigen.'
    },
    {
        year: 1908,
        title: 'Bosnische Krise',
        minZoom: 6.0,
        description: 'Balkan als Pulverfass',
        details: 'Österreich-Ungarn annektiert Bosnien. Serbien ist empört, Russland unterstützt. Der Balkan wird zur Krisenregion.'
    },
    {
        year: 1911,
        title: 'Zweite Marokkokrise',
        minZoom: 6.0,
        description: 'Deutschland schickt Kanonenboot nach Agadir',
        details: 'Die SMS Panther soll deutsche "Interessen" schützen. Frankreich und England reagieren geschlossen. Deutschlands außenpolitische Isolation wird sichtbarer – Weg nach 1914 wird kürzer.'
    },
    {
        year: 1914,
        title: 'Attentat Sarajevo',
        minZoom: 4.5,
        description: 'Ermordung des Thronfolgers',
        details: 'Gavrilo Princip erschießt Franz Ferdinand. Österreich stellt Ultimatum. Der Bündnismechanismus greift.'
    },
    {
        year: 1914,
        title: 'Erster Weltkrieg',
        minZoom: 2,
        date: '28. Juli 1914 – 11. November 1918',
        description: 'Mit der Kriegserklärung Österreich-Ungarns an Serbien beginnt der Erste Weltkrieg.',
        details: 'Bündnissysteme, Wettrüsten und imperiale Konkurrenz münden in einen industrialisierten Stellungskrieg mit rund 17 Millionen Toten. Der Krieg beendet das Deutsche Kaiserreich sowie das Habsburger-, das Osmanische und das Russische Reich; der Versailler Vertrag legt die Grundlage für die Krise der Zwischenkriegszeit.'
    },
    {
        year: 1914,
        title: 'Schlacht an der Marne',
        minZoom: 6,
        description: 'Schlieffenplan scheitert',
        details: 'Der deutsche Vormarsch wird gestoppt. Der Bewegungskrieg erstarrt zum Stellungskrieg.'
    },
    {
        year: 1916,
        title: 'Schlacht Verdun',
        minZoom: 4,
        description: '700.000 Tote für wenige Kilometer',
        details: 'Längste Schlacht des Krieges. Verdun wird zur "Blutpumpe". Symbol für die Sinnlosigkeit des Stellungskriegs.'
    },
    {
        year: 1916,
        title: 'Schlacht Somme',
        minZoom: 5.5,
        description: 'Materialschlacht an der Somme',
        details: 'Über eine Million Tote und Verwundete. Erstmals Panzer im Einsatz. Abnutzungskrieg.'
    },
    {
        year: 1917,
        title: 'USA treten ein',
        minZoom: 4.5,
        description: 'Kriegseintritt der USA',
        details: 'Nach U-Boot-Krieg und Zimmermann-Depesche erklärt Amerika den Krieg. Deutschland kann nicht mehr gewinnen.'
    },
    {
        year: 1917,
        title: 'Russ. Revolution',
        minZoom: 4,
        description: 'Bolschewiki übernehmen Macht',
        details: 'Februarrevolution stürzt Zaren, Oktoberrevolution bringt Lenin an die Macht. Russland scheidet aus Krieg aus.'
    },
    {
        year: 1918,
        title: 'Vertrag Brest-Litowsk',
        minZoom: 6,
        description: 'Frieden mit Russland',
        details: 'Deutschland diktiert harten Frieden. Russland verliert riesige Gebiete. Deutschland konzentriert sich auf Westfront.'
    },
    {
        year: 1918,
        title: 'Novemberrevolution',
        minZoom: 4.5,
        description: 'Matrosen meutern, Kaiser dankt ab',
        details: 'Kieler Matrosenaufstand. Revolution erfasst Deutschland. Wilhelm II. flieht. Republik wird ausgerufen.'
    },
    {
        year: 1918,
        title: 'Kriegsende',
        minZoom: 2.8,
        description: 'Waffenstillstand am 11.11.',
        details: 'Deutschland kapituliert. 17 Millionen Tote. Europa liegt in Trümmern. Die alte Ordnung ist zusammengebrochen.'
    },
    {
        year: 1919,
        title: 'Versailler Vertrag',
        minZoom: 3.2,
        description: 'Friedensvertrag mit harten Bedingungen',
        details: 'Deutschland wird alleinige Kriegsschuld auferlegt. Gebietsver luste, Entwaffnung, Reparationen. "Diktatfrieden" schafft Konfliktstoff.'
    },

    // ========== WEIMARER REPUBLIK ==========
    {
        year: 1919,
        title: 'Weimarer Republik',
        minZoom: 3.2,
        description: 'Erste deutsche Demokratie',
        details: 'Nationalversammlung in Weimar verabschiedet demokratische Verfassung. Republik ohne Republikaner - von vielen abgelehnt.'
    },
    {
        year: 1919,
        title: 'Spartakusaufstand',
        minZoom: 5.5,
        description: 'Linksradikale Erhebung',
        details: 'KPD versucht Räterepublik. Wird von Freikorps blutig niedergeschlagen. Liebknecht und Luxemburg ermordet.'
    },
    {
        year: 1920,
        title: 'Kapp-Putsch',
        minZoom: 4.5,
        description: 'Rechtsputsch scheitert',
        details: 'Freikorps marschieren auf Berlin. Generalstreik stoppt Putsch. Republik von rechts und links bedroht.'
    },
    {
        year: 1923,
        title: 'Ruhrbesetzung',
        minZoom: 5,
        description: 'Frankreich besetzt Ruhrgebiet',
        details: 'Wegen ausbleibender Reparationen besetzen Franzosen das Ruhrgebiet. Passiver Widerstand. Wirtschaft kollabiert.'
    },
    {
        year: 1923,
        title: 'Hyperinflation',
        minZoom: 3.6,
        description: 'Geld wird wertlos',
        details: 'Ein Brot kostet Milliarden Mark. Menschen verlieren Ersparnisse. Vertrauen in Republik schwindet.'
    },
    {
        year: 1923,
        title: 'Hitler-Putsch',
        minZoom: 4,
        description: 'Putschversuch in München',
        details: 'Hitler und Ludendorff versuchen Umsturz. Scheitert. Hitler kommt in Festungshaft und schreibt "Mein Kampf".'
    },
    {
        year: 1924,
        title: 'Dawes-Plan',
        minZoom: 5,
        description: 'Reparationen neu geregelt',
        details: 'Amerikanische Kredite stabilisieren Wirtschaft. "Goldene Zwanziger" beginnen.'
    },
    {
        year: 1925,
        title: 'Hindenburg Präsident',
        minZoom: 4,
        description: 'Generalfeldmarschall wird Reichspräsident',
        details: 'Symbol für Ablehnung der Republik. Viele wünschen sich Monarchie zurück.'
    },
    {
        year: 1926,
        title: 'Völkerbund',
        minZoom: 6,
        description: 'Deutschland tritt bei',
        details: 'Deutschland wird in Völkerbund aufgenommen. Zeichen der Normalisierung. Stresemann betreibt Verständigungspolitik.'
    },
    {
        year: 1929,
        title: 'Weltwirtschaftskrise',
        minZoom: 2.8,
        description: 'Börsencrash löst Depression aus',
        details: 'Schwarzer Freitag in New York. In Deutschland 6 Millionen Arbeitslose. Radikale Parteien erstarken.'
    },
    {
        year: 1930,
        title: 'NSDAP zweitstärkste',
        minZoom: 4,
        description: 'Hitler gewinnt massiv',
        details: 'NSDAP wird aus dem Stand zweitstärkste Kraft mit 18,3%. Krise und Propaganda wirken.'
    },
    {
        year: 1932,
        title: 'Präsidentenwahl',
        minZoom: 5.5,
        description: 'Hindenburg gegen Hitler',
        details: 'Hindenburg wird wiedergewählt gegen Hitler. Aber er wird Hitler bald zum Kanzler ernennen.'
    },
    {
        year: 1932,
        title: 'Preußenschlag',
        minZoom: 6.0,
        description: 'Absetzung preußischer Regierung',
        details: 'Reichsregierung setzt SPD-geführte preußische Regierung ab. Demokratie wird ausgehöhlt.'
    },

    // Ich könnte hier noch VIEL mehr hinzufügen - soll ich weitermachen mit NS-Zeit, WW2, Kalter Krieg etc.?
    // Das würde sehr lang werden. Lass mich die wichtigsten ergänzen...

    // ========== NATIONALSOZIALISMUS ==========
    {
        year: 1933,
        title: 'Machtergreifung',
        minZoom: 2,
        date: '30. Januar 1933',
        description: 'Reichspräsident Hindenburg ernennt Adolf Hitler zum Reichskanzler.',
        details: 'Binnen weniger Monate beseitigt die NSDAP die Weimarer Demokratie durch Reichstagsbrand, Ermächtigungsgesetz und Verbot anderer Parteien. Es beginnt die nationalsozialistische Diktatur mit Verfolgung politischer Gegner, Antisemitismus als Staatsdoktrin und Aufrüstung zum Krieg.'
    },
    {
        year: 1933,
        title: 'Reichstagsbrand',
        minZoom: 4,
        description: 'Reichstag brennt - Notverordnung',
        details: 'Hitler beschuldigt Kommunisten. Grundrechte werden außer Kraft gesetzt. Massenverhaftungen.'
    },
    {
        year: 1933,
        title: 'Ermächtigungsgesetz',
        minZoom: 4.5,
        description: 'Parlament entmachtet sich selbst',
        details: 'Nur SPD stimmt dagegen. Hitler kann ohne Parlament Gesetze erlassen. Demokratie schafft sich selbst ab.'
    },
    {
        year: 1933,
        title: 'Gleichschaltung',
        minZoom: 4.5,
        description: 'Alle Parteien außer NSDAP verboten',
        details: 'Gewerkschaften aufgelöst, Länder entmachtet. Medien und Kultur unter NS-Kontrolle. Einparteienstaat.'
    },
    {
        year: 1933,
        title: 'Bücherverbrennung',
        minZoom: 5.5,
        description: 'Verbrennung "undeutscher" Bücher',
        details: 'Studenten verbrennen Bücher jüdischer und linker Autoren. Kultureller Kahlschlag.'
    },
    {
        year: 1934,
        title: 'Röhm-Putsch',
        minZoom: 4,
        description: 'Hitler lässt SA-Führer ermorden',
        details: 'Nacht der langen Messer. SA entmachtet, SS wird wichtigste Terrororganisation. Reichswehr loyal.'
    },
    {
        year: 1934,
        title: 'Hitler "Führer"',
        minZoom: 4.5,
        description: 'Nach Hindenburgs Tod vereint Hitler Ämter',
        details: 'Reichspräsident und Reichskanzler in einer Person. Wehrmacht schwört auf Hitler persönlich.'
    },
    {
        year: 1935,
        title: 'Nürnberger Gesetze',
        minZoom: 4,
        description: 'Juden rechtlos gemacht',
        details: 'Rassegesetze entziehen Juden Bürgerrechte. Systematische Entrechtung und Verfolgung beginnt.'
    },
    {
        year: 1936,
        title: 'Rheinland besetzt',
        minZoom: 6,
        description: 'Bruch des Versailler Vertrags',
        details: 'Deutsche Truppen marschieren ins entmilitarisierte Rheinland. Westmächte protestieren nur. Hitler ermutigt.'
    },
    {
        year: 1936,
        title: 'Olympia Berlin',
        minZoom: 3.6,
        description: 'Propaganda-Show der NS',
        details: 'Perfekt inszenierte Spiele. Jesse Owens widerlegt mit vier Gold die Rassenideologie.'
    },
    {
        year: 1936,
        title: 'Achse Berlin-Rom',
        minZoom: 5.5,
        description: 'Bündnis mit Italien',
        details: 'Hitler und Mussolini verbünden sich. "Achse" Berlin-Rom-Tokio entsteht.'
    },
    {
        year: 1938,
        title: 'Anschluss Österreich',
        minZoom: 4.5,
        description: 'Hitler annektiert Österreich',
        details: 'Einmarsch in Österreich. "Großdeutsches Reich". Viele Österreicher begrüßen es. Westmächte reagieren kaum.'
    },
    {
        year: 1938,
        title: 'Münchner Abkommen',
        minZoom: 4.5,
        description: 'Appeasement - Tschechoslowakei geopfert',
        details: 'England und Frankreich stimmen Abtretung des Sudetenlandes zu. Chamberlain glaubt Frieden gerettet. Hitler plant weiter.'
    },
    {
        year: 1938,
        title: 'Reichspogromnacht',
        minZoom: 4,
        description: 'Organisierte Gewalt gegen Juden',
        details: '9./10. November: Synagogen brennen, Geschäfte zerstört, Menschen ermordet. Orchestrierte Aktion. Verfolgung verschärft sich.'
    },
    {
        year: 1939,
        title: 'Besetzung Tschechiens',
        minZoom: 5.5,
        description: 'Rest-Tschechei besetzt',
        details: 'Hitler bricht Münchner Abkommen. Böhmen und Mähren werden Protektorat. Westmächte erkennen: Appeasement gescheitert.'
    },
    {
        year: 1939,
        title: 'Hitler-Stalin-Pakt',
        minZoom: 4.5,
        description: 'Nichtangriffspakt mit UdSSR',
        details: 'Geheimes Zusatzprotokoll teilt Osteuropa auf. Hitler kauft sich Rücken frei für Polenfeldzug.'
    },
    {
        year: 1939,
        title: 'Zweiter Weltkrieg',
        minZoom: 2,
        date: '1. September 1939 – 2. September 1945',
        description: 'Mit dem deutschen Überfall auf Polen beginnt der Zweite Weltkrieg.',
        details: 'Der Krieg weitet sich zu einem globalen Konflikt aus und endet mit dem industriellen Völkermord an rund sechs Millionen Jüdinnen und Juden, etwa 60 Millionen Toten und der bedingungslosen Kapitulation Deutschlands. Aus dem zerstörten Europa gehen die USA und die Sowjetunion als Supermächte hervor — der Kalte Krieg beginnt.'
    },

    // Ich mache mal weiter mit den wichtigsten WW2 und Nachkriegsevents...

    {
        year: 1940,
        title: 'Frankreich kapituliert',
        minZoom: 3.6,
        description: 'Westfeldzug - Frankreich in 6 Wochen',
        details: 'Deutscher Sieg. Hitler demütigt Frankreich im Waggon von 1918. Deutschland kontrolliert Westeuropa.'
    },
    {
        year: 1940,
        title: 'Luftschlacht England',
        minZoom: 5.5,
        description: 'Deutschland scheitert in Luftkrieg',
        details: 'Göring kann England nicht in die Knie zwingen. Invasion wird abgesagt. Erster Rückschlag.'
    },
    {
        year: 1941,
        title: 'Angriff auf UdSSR',
        minZoom: 4,
        description: 'Unternehmen Barbarossa',
        details: '3 Millionen Soldaten überfallen Sowjetunion. Vernichtungskrieg im Osten. Millionen sterben.'
    },
    {
        year: 1941,
        title: 'Pearl Harbor',
        minZoom: 4.5,
        description: 'Japan greift USA an',
        details: 'USA treten in Krieg ein. Hitler erklärt Amerika Krieg - fataler Fehler. Krieg wird global.'
    },
    {
        year: 1942,
        title: 'Wannseekonferenz',
        minZoom: 3.2,
        description: '"Endlösung" wird geplant',
        details: 'Systematische Ermordung aller Juden wird koordiniert. Holocaust wird industriell durchgeführt.'
    },
    {
        year: 1942,
        title: 'Stalingrad',
        minZoom: 4.5,
        description: 'Wendepunkt - 6. Armee kapituliert',
        details: 'Deutsche Armee eingekesselt. Hitler verbietet Ausbruch. Februar 1943 Kapitulation. Initiative geht an Sowjets.'
    },
    {
        year: 1943,
        title: 'Weiße Rose',
        minZoom: 4.5,
        description: 'Geschwister Scholl im Widerstand',
        details: 'Studenten verteilen Flugblätter. Werden verraten und hingerichtet. Symbol des Widerstands.'
    },
    {
        year: 1943,
        title: 'Kapitulation Italien',
        minZoom: 6,
        description: 'Mussolini stürzt, Italien kapituliert',
        details: 'Erstes Achsen-Land kapituliert. Deutschland besetzt Norditalien. Mussolini als Marionettenführer.'
    },
    {
        year: 1944,
        title: 'D-Day',
        minZoom: 3.6,
        description: 'Landung in Normandie',
        details: 'Größte Landeoperation. Zweite Front eröffnet. Deutschland eingekesselt. Befreiung beginnt.'
    },
    {
        year: 1944,
        title: '20. Juli Attentat',
        minZoom: 4.5,
        description: 'Stauffenberg-Attentat scheitert',
        details: 'Bombe im Führerhauptquartier. Hitler überlebt knapp. Verschwörer hingerichtet. Widerstand zerschlagen.'
    },
    {
        year: 1945,
        title: 'Auschwitz befreit',
        minZoom: 4.5,
        description: 'Sowjets befreien Vernichtungslager',
        details: '27. Januar: Ausmaß des Holocaust wird offenbar. Wenige Überlebende, Berge von Leichen.'
    },
    {
        year: 1945,
        title: 'Konferenz Jalta',
        minZoom: 5.5,
        description: 'Alliierte planen Nachkriegsordnung',
        details: 'Churchill, Roosevelt, Stalin teilen Einflusssphären. Beginn des Kalten Krieges zeichnet sich ab.'
    },
    {
        year: 1945,
        title: 'Kriegsende Europa',
        minZoom: 2.4,
        date: '8. Mai 1945',
        description: 'Die Wehrmacht unterzeichnet in Berlin-Karlshorst die bedingungslose Kapitulation.',
        details: 'Damit endet der Zweite Weltkrieg in Europa. Deutschland wird in vier Besatzungszonen geteilt, NS-Verbrechen werden in den Nürnberger Prozessen geahndet; der „Tag der Befreiung" markiert zugleich den Beginn einer politischen, moralischen und wirtschaftlichen Neuordnung.'
    },
    {
        year: 1945,
        title: 'Atombomben Japan',
        minZoom: 4.5,
        description: 'Hiroshima und Nagasaki',
        details: 'USA setzen Atomwaffen ein. Japan kapituliert. Atomzeitalter beginnt.'
    },
    {
        year: 1945,
        title: 'Potsdamer Konferenz',
        minZoom: 4.5,
        description: 'Deutschlands Zukunft wird beraten',
        details: 'Entnazifizierung, Entmilitarisierung, Demokratisierung. Differenzen zwischen West und Ost werden deutlich.'
    },
    {
        year: 1945,
        title: 'UN gegründet',
        minZoom: 5,
        description: 'Vereinte Nationen entstehen',
        details: 'Nachfolger des Völkerbundes. Soll Frieden sichern. Aber bald durch Kalten Krieg gelähmt.'
    },
    {
        year: 1946,
        title: 'Nürnberger Prozesse',
        minZoom: 4.5,
        description: 'NS-Verbrecher vor Gericht',
        details: 'Internationale Militärtribunale verurteilen Hauptkriegsverbrecher. Völkerstrafrecht entsteht.'
    },

    // ========== KALTER KRIEG ==========
    {
        year: 1947,
        title: 'Truman-Doktrin',
        minZoom: 4.5,
        description: 'USA verkünden Eindämmung',
        details: 'Containment des Kommunismus. Marshall-Plan unterstützt Westeuropa. Kalter Krieg beginnt.'
    },
    {
        year: 1948,
        title: 'Berlin-Blockade',
        minZoom: 3.6,
        description: 'Sowjets blockieren West-Berlin',
        details: 'Luftbrücke versorgt 2 Millionen Menschen ein Jahr lang. Symbol des Widerstands gegen Kommunismus.'
    },
    {
        year: 1949,
        title: 'NATO-Gründung',
        minZoom: 4.5,
        description: 'Westliches Verteidigungsbündnis',
        details: 'Nordatlantikpakt gegen Sowjetunion. "Angriff auf einen ist Angriff auf alle".'
    },
    {
        year: 1949,
        title: 'Gründung BRD/DDR',
        minZoom: 2.8,
        description: 'Deutschland geteilt in zwei Staaten',
        details: '23. Mai BRD (Demokratie, soziale Marktwirtschaft), 7. Oktober DDR (sozialistische Diktatur). Teilung Deutschlands ist Realität.'
    },
    {
        year: 1950,
        title: 'Korea-Krieg',
        minZoom: 5,
        description: 'Erster Stellvertreterkrieg',
        details: 'Nordkorea greift Süden an. USA intervenieren, China unterstützt Norden. Endet 1953 im Patt.'
    },
    {
        year: 1953,
        title: 'Stalin stirbt',
        minZoom: 4.5,
        description: 'Ende der Stalin-Ära',
        details: 'Chruschtschow beginnt "Tauwetter". Schlimmste Repressionen enden, System bleibt diktatorisch.'
    },
    {
        year: 1953,
        title: 'Aufstand 17. Juni',
        minZoom: 4,
        description: 'Arbeiter erheben sich in DDR',
        details: 'Proteste gegen Normerhöhungen werden Volksaufstand. Sowjetische Panzer schlagen brutal nieder.'
    },
    {
        year: 1955,
        title: 'Warschauer Pakt',
        minZoom: 5,
        description: 'Ostblock-Militärbündnis',
        details: 'Antwort auf NATO. Europa militärisch in zwei Lager geteilt.'
    },
    {
        year: 1956,
        title: 'Ungarn-Aufstand',
        minZoom: 4.5,
        description: 'Ungarn versucht Befreiung',
        details: 'Forderung nach Freiheit. Sowjetpanzer schlagen brutal nieder. Westen bleibt untätig.'
    },
    {
        year: 1957,
        title: 'Sputnik-Schock',
        minZoom: 5,
        description: 'Sowjets schießen ersten Satelliten ins All',
        details: 'Westen geschockt - Sowjets technologisch überlegen? Wettrennen ins All beginnt.'
    },
    {
        year: 1961,
        title: 'Bau der Mauer',
        minZoom: 2.8,
        description: 'Berlin wird geteilt',
        details: 'Nacht vom 12./13. August: DDR baut Mauer. Familien getrennt. Symbol der Teilung und Unfreiheit.'
    },
    {
        year: 1962,
        title: 'Kubakrise',
        minZoom: 3.6,
        description: 'Welt am Rand des Atomkriegs',
        details: 'Sowjets stationieren Raketen auf Kuba. USA verhängen Blockade. 13 Tage höchste Gefahr. Wird beigelegt.'
    },
    {
        year: 1963,
        title: 'Kennedy in Berlin',
        minZoom: 4.5,
        description: '"Ich bin ein Berliner"',
        details: 'Kennedy verspricht West-Berlin zu schützen. Symbol westlicher Solidarität.'
    },
    {
        year: 1968,
        title: 'Prager Frühling',
        minZoom: 3.2,
        description: '"Sozialismus mit menschlichem Antlitz"',
        details: 'Dubček liberalisiert. Sowjets fühlen sich bedroht. Panzer beenden Reform brutal.'
    },
    {
        year: 1969,
        title: 'Mondlandung',
        minZoom: 4.5,
        description: 'USA landen auf dem Mond',
        details: 'Apollo 11. Armstrong betritt Mond. USA gewinnen Space Race.'
    },
    {
        year: 1969,
        title: 'Brandt Kanzler',
        minZoom: 4.5,
        description: 'Neue Ostpolitik beginnt',
        details: '"Wandel durch Annäherung". Willy Brandt sucht Verständigung mit Osten.'
    },
    {
        year: 1970,
        title: 'Kniefall Warschau',
        minZoom: 4.5,
        description: 'Brandt kniet am Ghetto-Mahnmal',
        details: 'Geste der Versöhnung. Symbol für Bitte um Vergebung und Aufarbeitung.'
    },
    {
        year: 1972,
        title: 'Grundlagenvertrag',
        minZoom: 4,
        description: 'BRD und DDR erkennen sich an',
        details: 'De facto Anerkennung ohne Einheit aufzugeben. Beziehungen normalisieren sich.'
    },
    {
        year: 1973,
        title: 'Ölkrise',
        minZoom: 5,
        description: 'Arabisches Ölembargo',
        details: 'Preise explodieren. Fahrverbote in BRD. Wirtschaftswunder endet.'
    },
    {
        year: 1979,
        title: 'NATO-Doppelbeschluss',
        minZoom: 4.5,
        description: 'Nachrüstung mit Pershing-II',
        details: 'Antwort auf sowjetische SS-20. Massive Proteste der Friedensbewegung.'
    },
    {
        year: 1985,
        title: 'Gorbatschow',
        minZoom: 3.2,
        description: 'Glasnost und Perestroika',
        details: 'Neuer sowjetischer Führer leitet Reformen ein. System wird am Ende gesprengt.'
    },
    {
        year: 1986,
        title: 'Tschernobyl',
        minZoom: 4.5,
        description: 'Atomkatastrophe',
        details: 'Reaktor explodiert. Größte nukleare Katastrophe. Radioaktive Wolke über Europa.'
    },
    {
        year: 1989,
        title: 'Mauerfall',
        minZoom: 2,
        date: '9. November 1989',
        description: 'Nach der Verlesung einer neuen Reiseregelung öffnen DDR-Grenzsoldaten die Berliner Mauer.',
        details: 'In den Wochen zuvor zwingen Massenflucht über Ungarn und die Montagsdemonstrationen die SED-Führung zum Einlenken. Mit der Maueröffnung endet die Teilung Deutschlands und Europas faktisch — der Weg zur Wiedervereinigung 1990 ist frei.'
    },
    {
        year: 1990,
        title: 'Wiedervereinigung',
        minZoom: 2.4,
        date: '3. Oktober 1990',
        description: 'Mit dem Beitritt der DDR zum Geltungsbereich des Grundgesetzes wird Deutschland staatlich vereinigt.',
        details: 'Vorausgegangen sind die ersten freien Volkskammerwahlen im März, die Währungsunion am 1. Juli und der Zwei-plus-Vier-Vertrag, in dem die Siegermächte die volle Souveränität anerkennen. Die innere Einheit — wirtschaftlicher Aufbau Ost und gesellschaftliche Angleichung — dauert weit über das politische Datum hinaus an.'
    },
    {
        year: 1991,
        title: 'Ende der Sowjetunion',
        minZoom: 4,
        description: 'UdSSR zerfällt - Kalter Krieg endet',
        details: 'Nach gescheitertem Putsch zerfällt Sowjetunion. Teilrepubliken werden unabhängig. Kalter Krieg vorbei.'
    },

    // ========== EUROPÄISCHE INTEGRATION ==========
    {
        year: 1951,
        title: 'Montanunion',
        minZoom: 4.5,
        description: 'Erste europäische Integration',
        details: 'Kohle-Stahl-Gemeinschaft. Deutschland und Frankreich legen Rüstungsindustrien zusammen. Krieg wird unmöglich.'
    },
    {
        year: 1957,
        title: 'Römische Verträge',
        minZoom: 3.6,
        description: 'EWG gegründet - Vorläufer der EU',
        details: 'Sechs Staaten gründen Wirtschaftsgemeinschaft. Geburtsstunde der heutigen EU.'
    },
    {
        year: 1992,
        title: 'Maastricht-Vertrag',
        minZoom: 4,
        description: 'Europäische Union entsteht',
        details: 'EU wird gegründet. Gemeinsame Währung beschlossen. Integration vertieft sich.'
    },
    {
        year: 2002,
        title: 'Euro-Bargeld',
        minZoom: 4,
        description: '12 Staaten führen Euro ein',
        details: 'Euro wird Bargeld. Historischer Schritt der Integration. Zweite Weltwährung.'
    },
    {
        year: 2004,
        title: 'EU-Osterweiterung',
        minZoom: 4.5,
        description: 'Zehn neue Mitglieder aus Osteuropa',
        details: 'Teilung Europas überwunden. EU wächst auf 25 Mitglieder. Größte Erweiterung.'
    }
];

// ===== KLASSE 10: DREI IMPERIEN =====
// theme: 'russland' | 'china' | 'osmanisch'
const TIMELINE_EVENTS_KLASSE10 = [

    // === RUSSLAND (1812–1991) ===
    { year: 1812, theme: 'russland', minZoom: 1.5,
      title: 'Napoleons Russlandfeldzug',
      description: 'Napoleon marschiert mit 600.000 Mann ein – und scheitert.',
      details: 'Die Taktik der „verbrannten Erde" und der russische Winter vernichten Napoleons Grande Armée. Wendepunkt der napoleonischen Herrschaft in Europa.' },
    { year: 1825, theme: 'russland', minZoom: 3.0,
      title: 'Dekabristenaufstand',
      description: 'Liberale Offiziere fordern eine Verfassung.',
      details: 'Nach dem Tod von Zar Alexander I. versuchen Offiziere eine konstitutionelle Monarchie durchzusetzen. Zar Nikolaus I. schlägt den Aufstand nieder – Beginn der Reaktion.' },
    { year: 1861, theme: 'russland', minZoom: 2.0,
      title: 'Aufhebung der Leibeigenschaft',
      description: 'Alexander II. befreit 23 Millionen Bauern.',
      details: 'Die Leibeigenschaft wird abgeschafft, doch Bauern müssen Ablöse zahlen und erhalten zu wenig Land. Armut bleibt. Reform von oben, die nicht weit genug geht.' },
    { year: 1905, theme: 'russland', minZoom: 2.0,
      title: 'Revolution 1905 / Blutsonntag',
      description: 'Soldaten schießen auf friedliche Demonstranten in St. Petersburg.',
      details: 'Niederlage gegen Japan (1904/05) löst Massenproteste aus. Zar verspricht ein Parlament (Duma) – aber ohne wirkliche Macht. Vorläufer von 1917.' },
    { year: 1917, theme: 'russland', minZoom: 1.5,
      title: 'Februarrevolution',
      description: 'Zar Nikolaus II. dankt ab – Ende des Zarenreiches.',
      details: 'Massenstreiks und Meutereien zwingen den Zaren zum Rücktritt. Die Provisorische Regierung übernimmt und setzt den Krieg fort – ein fataler Fehler.' },
    { year: 1917, theme: 'russland', minZoom: 1.5,
      title: 'Oktoberrevolution',
      description: 'Lenins Bolschewiki übernehmen die Macht.',
      details: '„Alle Macht den Sowjets!" Die Bolschewiki stürzen die Provisorische Regierung. Lenin verspricht: Frieden, Land, Brot. Beginn des Sowjetstaats.' },
    { year: 1918, theme: 'russland', minZoom: 3.0,
      title: 'Bürgerkrieg & Frieden von Brest-Litowsk',
      description: 'Russland scheidet aus dem Weltkrieg aus, Bürgerkrieg beginnt.',
      details: 'Frieden mit Deutschland im März 1918. Danach Bürgerkrieg zwischen Roten (Bolschewiki) und Weißen (Zaristen, Westmächte). Die Roten siegen 1921.' },
    { year: 1922, theme: 'russland', minZoom: 2.0,
      title: 'Gründung der UdSSR',
      description: 'Union der Sozialistischen Sowjetrepubliken entsteht.',
      details: 'Russland, Ukraine, Weißrussland und Transkaukasien schließen sich zusammen. Bald folgen weitere Republiken. Erster sozialistischer Staat der Welt.' },
    { year: 1928, theme: 'russland', minZoom: 2.0,
      title: 'Stalins Fünfjahrespläne',
      description: 'Zwangsweise Industrialisierung und Kollektivierung der Landwirtschaft.',
      details: 'Millionen Bauern werden in Kolchosen gepresst. Kulaken werden als Klasse „liquidiert". Hungersnot 1932/33 tötet Millionen. Die Sowjetunion wird Industriestaat.' },
    { year: 1936, theme: 'russland', minZoom: 2.5,
      title: 'Großer Terror',
      description: 'Stalins Säuberungen: Millionen verhaftet, erschossen oder verbannt.',
      details: 'In inszenierten Schauprozessen werden „Feinde" verurteilt. Geheimpolizei NKWD verhaftet 1,5 Millionen Menschen. Gulags füllen sich. Selbst die Armee wird dezimiert.' },
    { year: 1941, theme: 'russland', minZoom: 1.5,
      title: 'Operation Barbarossa',
      description: 'Nazi-Deutschland überfällt die Sowjetunion.',
      details: 'Größter Angriffskrieg der Geschichte. 27 Millionen Sowjetbürger sterben. Stalingrad (1942/43) wird zur Wende. Sieg 1945 – aber zu einem unvorstellbaren Preis.' },
    { year: 1953, theme: 'russland', minZoom: 2.0,
      title: 'Tod Stalins',
      description: 'Ende der Stalin-Ära – Chruschtschow übernimmt.',
      details: 'Stalins Tod leitet das „Tauwetter" ein. Chruschtschow kritisiert Stalin öffentlich in der Geheimrede (1956). Lager werden geöffnet, Millionen kehren zurück.' },
    { year: 1957, theme: 'russland', minZoom: 3.0,
      title: 'Sputnik – Wettlauf ins All',
      description: 'Sowjetunion schickt ersten Satelliten ins All.',
      details: 'Sputnik 1 schockt die USA. 1961 fliegt Gagarin als erster Mensch ins All. Technologischer Prestigeerfolg des Kommunismus im Kalten Krieg.' },
    { year: 1985, theme: 'russland', minZoom: 1.8,
      title: 'Glasnost & Perestroika',
      description: 'Gorbatschow öffnet die Sowjetunion.',
      details: '„Glasnost" (Offenheit) und „Perestroika" (Umbau) sollen das System retten. Stattdessen lösen sich die Republiken los und der Ostblock bricht zusammen.' },
    { year: 1991, theme: 'russland', minZoom: 1.5,
      title: 'Ende der Sowjetunion',
      description: 'Die UdSSR löst sich auf – Kalter Krieg endet.',
      details: 'Nach gescheitertem Augustputsch erklären Republiken ihre Unabhängigkeit. Am 25. Dezember 1991 hört die UdSSR auf zu existieren. 15 neue Staaten entstehen.' },
    { year: 2000, theme: 'russland', minZoom: 2.0,
      date: '7. Mai 2000',
      title: 'Putin Präsident',
      description: 'Wladimir Putin tritt sein erstes Präsidentenamt an.',
      details: 'Nach den chaotischen Jelzin-Jahren verspricht Putin Stabilität und nationale Stärke. Schrittweise Einschränkung von Pressefreiheit, Opposition und föderaler Autonomie; Aufbau eines autoritären „gelenkten Pluralismus".' },
    { year: 2008, theme: 'russland', minZoom: 2.5,
      date: '8.–12. August 2008',
      title: 'Georgienkrieg',
      description: 'Russland marschiert in Georgien ein und besetzt Südossetien und Abchasien.',
      details: 'Erster offener militärischer Konflikt Russlands mit einem Nachbarstaat seit dem Ende der UdSSR. Russland erkennt beide Gebiete als unabhängige Staaten an — international fast ohne Resonanz. Vorbote für 2014.' },
    { year: 2014, theme: 'russland', minZoom: 1.8,
      date: '18. März 2014',
      title: 'Annexion der Krim',
      description: 'Russland annektiert nach einem Scheinreferendum die ukrainische Halbinsel Krim.',
      details: 'Bewaffnete Kräfte ohne Hoheitsabzeichen („grüne Männchen") besetzen die Krim, kurz darauf folgt der Beitritt zur Russischen Föderation. Westliche Staaten verhängen Sanktionen; gleichzeitig beginnt im Donbass ein von Russland unterstützter Krieg gegen die Ukraine.' },
    { year: 2022, theme: 'russland', minZoom: 1.5,
      date: '24. Februar 2022',
      title: 'Angriff auf die Ukraine',
      description: 'Russland startet eine großangelegte Invasion der gesamten Ukraine.',
      details: 'Der erste konventionelle Krieg dieser Größenordnung in Europa seit 1945. Die Ukraine leistet unerwartet zähen Widerstand, der Westen liefert Waffen und verhängt umfassende Sanktionen. Folgen reichen von einer Energiekrise in Europa bis zu Finnlands und Schwedens NATO-Beitritt.' },

    // === CHINA (1405–1997) ===
    { year: 1405, theme: 'china', minZoom: 2.5,
      title: 'Zheng He – Schatzflotte',
      description: 'Chinas riesige Flotte bereist Asien, Arabien und Ostafrika.',
      details: 'Admiral Zheng He führt 7 Expeditionen mit bis zu 300 Schiffen durch. China hätte die Welt dominieren können – doch der Kaiser stoppt die Fahrten und dreht sich nach innen.' },
    { year: 1644, theme: 'china', minZoom: 3.0,
      title: 'Qing-Dynastie',
      description: 'Mandschuren erobern China – Beginn der letzten Kaiserdynastie.',
      details: 'Die Qing regieren China bis 1912 und erweitern es auf Rekordfläche. Zunehmende Isolation vom Westen wird später zum Problem.' },
    { year: 1839, theme: 'china', minZoom: 2.0,
      title: 'Erster Opiumkrieg',
      description: 'England erzwingt Opiumhandel – China unterliegt.',
      details: 'Großbritannien verkauft Opium gegen chinesische Waren. Als China den Import verbietet, folgt Krieg. Ergebnis: Hongkong an England, „ungleiche Verträge". Beginn der „Jahrhundertschande".' },
    { year: 1851, theme: 'china', minZoom: 3.5,
      title: 'Taiping-Aufstand',
      description: 'Chinas größter Bürgerkrieg – bis zu 30 Millionen Tote.',
      details: 'Religiöse Sekte kämpft gegen die Qing. Schätzungsweise 20–30 Millionen Tote. Zeigt die tiefe Schwäche der Qing-Herrschaft.' },
    { year: 1894, theme: 'china', minZoom: 2.5,
      title: 'Niederlage gegen Japan',
      description: 'Japan besiegt China – Taiwan wird japanisch.',
      details: 'Die Niederlage erschüttert China tief: Ausgerechnet das „kleine" Japan schlägt das „große" Reich der Mitte. Beschleunigt den Zerfall der Qing-Dynastie.' },
    { year: 1900, theme: 'china', minZoom: 2.5,
      title: 'Boxeraufstand',
      description: 'Aufstand gegen ausländischen Einfluss wird niedergeschlagen.',
      details: 'Nationalistische Gruppen greifen ausländische Botschaften an. Internationale Allianz aus 8 Staaten schlägt den Aufstand nieder. China zahlt riesige Entschädigungen.' },
    { year: 1911, theme: 'china', minZoom: 2.0,
      title: 'Xinhai-Revolution',
      description: 'Kaiserreich stürzt – Sun Yat-sen gründet Republik China.',
      details: 'Die letzte Kaiserdynastie (Qing) fällt. Republik China unter Sun Yat-sen. Aber Chaos folgt: Kriegsherren zersplittern das Land.' },
    { year: 1919, theme: 'china', minZoom: 3.0,
      title: 'Vierte-Mai-Bewegung',
      description: 'Studenten protestieren gegen Versailler Vertrag.',
      details: 'Als Shandong nicht an China zurückgegeben wird, protestieren Tausende Studenten. Geburtsstunde des modernen chinesischen Nationalismus – und Nährboden für die KP Chinas.' },
    { year: 1934, theme: 'china', minZoom: 2.0,
      title: 'Langer Marsch',
      description: 'Mao führt die Kommunisten 12.500 km durch China.',
      details: 'Von Chiang Kai-sheks Truppen verfolgt, marschiert die Rote Armee ein Jahr lang durch unwegsamste Gebirge. Nur ein Zehntel überlebt. Mao wird unangefochtener KP-Führer.' },
    { year: 1937, theme: 'china', minZoom: 2.0,
      title: 'Japan besetzt China',
      description: 'Japanischer Angriff – Massaker von Nanjing.',
      details: 'Japan greift Peking an. In Nanjing töten japanische Soldaten 200.000–300.000 Zivilisten. China versinkt in Krieg und Chaos bis 1945.' },
    { year: 1949, theme: 'china', minZoom: 1.5,
      title: 'Volksrepublik China',
      description: 'Mao Zedong ruft die Volksrepublik aus.',
      details: '„China hat sich erhoben!" Mao gewinnt den Bürgerkrieg gegen Chiang Kai-shek. Die Kommunisten regieren das Festland. Taiwan bleibt Exilrepublik.' },
    { year: 1966, theme: 'china', minZoom: 2.0,
      title: 'Kulturrevolution',
      description: 'Mao lässt Jugend gegen „alte Werte" kämpfen.',
      details: 'Rote Garden zerstören Tempel, Bücher und Institutionen. Millionen Intellektuelle werden verfolgt und in Lager geschickt. Chaos bis zu Maos Tod 1976.' },
    { year: 1989, theme: 'china', minZoom: 2.0,
      title: 'Tiananmen-Massaker',
      description: 'Militär schlägt Demokratiebewegung nieder.',
      details: 'Wochenlange Studentenproteste auf dem Platz des Himmlischen Friedens. Militär rückt ein, Hunderte sterben. Das Foto des „Tank Man" geht um die Welt.' },
    { year: 1997, theme: 'china', minZoom: 2.5,
      title: 'Hongkong-Rückgabe',
      description: 'Großbritannien übergibt Hongkong nach 156 Jahren an China.',
      details: '„Ein Land, zwei Systeme" – Hongkong behält zunächst Sonderrechte. Symbol für Chinas Wiederaufstieg und das Ende der „Jahrhundertschande".' },

    // === OSMANISCHES REICH / TÜRKEI (1453–1952) ===
    { year: 1453, theme: 'osmanisch', minZoom: 1.5,
      title: 'Fall Konstantinopels',
      description: 'Mehmed II. erobert Konstantinopel – Ende des Byzantinischen Reiches.',
      details: 'Sultan Mehmed II. setzt erstmals Kanonen ein. Das 1000-jährige Byzanz fällt in 53 Tagen. Istanbul wird neue Hauptstadt. Schock für das christliche Europa.' },
    { year: 1517, theme: 'osmanisch', minZoom: 3.5,
      title: 'Osmanen in Ägypten',
      description: 'Selim I. erobert Ägypten – Sultan wird Kalif.',
      details: 'Die Osmanen schlagen die Mamluken. Der Sultan wird Kalif – religiöses Oberhaupt des sunnitischen Islam. Das Reich erstreckt sich nun von Wien bis Mekka.' },
    { year: 1529, theme: 'osmanisch', minZoom: 2.0,
      title: '1. Wiener Belagerung',
      description: 'Suleiman der Prächtige scheitert vor Wien.',
      details: 'Das Osmanische Reich auf seinem Höhepunkt. Suleiman belagert Wien – scheitert an Wetter, Nachschubproblemen und hartnäckigem Widerstand. Grenze der osmanischen Expansion.' },
    { year: 1571, theme: 'osmanisch', minZoom: 3.0,
      title: 'Seeschlacht von Lepanto',
      description: 'Christliche Liga besiegt die osmanische Flotte.',
      details: 'Erste große osmanische Niederlage zur See. Psychologisch wichtig für Europa: Das Osmanische Reich ist nicht unbesiegbar. Beginn des langsamen Rückzugs im Mittelmeer.' },
    { year: 1683, theme: 'osmanisch', minZoom: 2.0,
      title: '2. Wiener Belagerung',
      description: 'Osmanische Niederlage vor Wien – Beginn des Niedergangs.',
      details: 'Kara Mustafas Heer wird von Jan Sobieski geschlagen. Beginn der langen Reconquista: Osmanen verlieren Ungarn und große Teile des Balkans schrittweise.' },
    { year: 1821, theme: 'osmanisch', minZoom: 2.5,
      title: 'Griechische Unabhängigkeit',
      description: 'Griechenland erkämpft die Unabhängigkeit vom Osmanischen Reich.',
      details: 'Erster Nationalstaat auf dem Balkan entsteht nach Jahrzehnten Aufstand. Begeisterung in ganz Europa (Philhellenismus). Beginn des Zerfalls des Osmanischen Reiches.' },
    { year: 1853, theme: 'osmanisch', minZoom: 2.5,
      title: 'Krimkrieg',
      description: 'Osmanen, England und Frankreich gegen Russland.',
      details: 'Erster moderner Krieg mit Massenwaffen und Kriegsberichterstattung. Florence Nightingale revolutioniert die Krankenpflege. Osmanisches Reich gewinnt, aber bleibt abhängig vom Westen.' },
    { year: 1908, theme: 'osmanisch', minZoom: 2.5,
      title: 'Jungtürken-Revolution',
      description: 'Offiziere erzwingen Verfassung und Modernisierung.',
      details: 'Das Komitee für Einheit und Fortschritt übernimmt die Macht. Reformversuche schlagen fehl – das Reich verliert weiter Gebiete. Nationalismus und Minderheitenfeindlichkeit wachsen.' },
    { year: 1915, theme: 'osmanisch', minZoom: 2.0,
      title: 'Armenischer Völkermord',
      description: 'Deportation und Ermordung von bis zu 1,5 Millionen Armeniern.',
      details: 'Die jungtürkische Regierung ordnet Massendeportationen an. Todesmärsche in die syrische Wüste. Schätzungsweise 600.000–1,5 Millionen Armenier sterben. Bis heute politisch umstritten.' },
    { year: 1923, theme: 'osmanisch', minZoom: 1.5,
      title: 'Türkische Republik',
      description: 'Atatürk gründet die moderne, säkulare Türkei.',
      details: 'Nach dem verlorenen Weltkrieg zerfällt das Osmanische Reich. Mustafa Kemal Atatürk besiegt die Griechen, gründet eine säkulare Republik. Radikale Reformen: neues Alphabet, westliches Recht, Frauenrechte.' },
    { year: 1952, theme: 'osmanisch', minZoom: 3.0,
      title: 'Türkei tritt NATO bei',
      description: 'Türkei wird Mitglied des westlichen Verteidigungsbündnisses.',
      details: 'Im Kalten Krieg sichert die Türkei die Südflanke der NATO. Vollständige Integration in die westliche Welt, die Atatürk angestrebt hatte.' },
];
