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
        description: 'Papst Leo III. krönt Karl den Großen am Weihnachtstag zum Kaiser.',
        details: 'Diese Krönung in Rom legte den Grundstein für die Idee eines christlichen Abendlandes, in dem geistliche und weltliche Macht eng miteinander verknüpft waren. Karl herrschte über ein riesiges Reich, das weite Teile Europas umfasste, und förderte Bildung und Kirche. Sein Reich gilt als Vorläufer der späteren europäischen Nationen.'
    },
    {
        year: 843,
        title: 'Vertrag von Verdun',
        minZoom: 5.0,
        description: 'Karls Enkel teilen das Frankenreich in drei eigenständige Reiche auf.',
        details: 'Mit dem Vertrag von Verdun wurde das mächtige Frankenreich aufgespalten – in ein westliches, ein östliches und ein mittleres Reich. Diese Teilung gilt als Geburtsstunde der späteren Staaten Frankreich, Deutschland und Italien. Damit begann die eigenständige Geschichte der deutschsprachigen Länder.'
    },
    {
        year: 962,
        title: 'Otto I. Kaiser',
        minZoom: 3.0,
        description: 'Otto I. wird in Rom zum Kaiser gekrönt und begründet das Heilige Römische Reich.',
        details: 'Mit dieser Krönung entstand das Heilige Römische Reich Deutscher Nation, das über 800 Jahre lang Bestand haben sollte. Otto verband die Herrschaft über deutsche und italienische Gebiete und machte die Verbindung von Kirche und Kaisertum zu einem zentralen Merkmal seiner Herrschaft. Das Reich wurde zur prägenden politischen Größe Mitteleuropas.'
    },
    {
        year: 1077,
        title: 'Gang nach Canossa',
        minZoom: 4.0,
        description: 'Kaiser Heinrich IV. steht drei Tage barfuß im Schnee vor Papst Gregor VII.',
        details: 'Im sogenannten Investiturstreit, also dem Kampf um die Frage, wer Bischöfe einsetzen darf, musste der mächtige Kaiser demütig um Verzeihung bitten. Dieser Moment zeigt eindrucksvoll, wie groß die Macht des Papstes im Mittelalter war. Der Begriff „nach Canossa gehen" ist bis heute ein Ausdruck für eine öffentliche Unterwerfung geblieben.'
    },
    {
        year: 1096,
        title: 'Erster Kreuzzug',
        minZoom: 3.5,
        description: 'Papst Urban II. ruft das christliche Europa zum bewaffneten Zug ins Heilige Land.',
        details: 'Hunderttausende Ritter und Pilger machten sich auf den gefährlichen Weg nach Jerusalem, das sie 1099 eroberten. Die Kreuzzüge prägten das Verhältnis zwischen Christentum und Islam für Jahrhunderte und sind bis heute ein Symbol für religiös motivierte Gewalt. Sie führten aber auch zu einem intensiveren kulturellen und wirtschaftlichen Austausch zwischen Orient und Okzident.'
    },
    {
        year: 1122,
        title: 'Wormser Konkordat',
        minZoom: 6.0,
        description: 'Kaiser und Papst einigen sich im langen Investiturstreit auf einen Kompromiss.',
        details: 'Nach jahrzehntelangem Streit wurde festgelegt, dass der Papst Bischöfe geistlich einsetzt, der Kaiser aber beim weltlichen Teil mitwirken darf. Dieser Kompromiss beendete einen der größten Konflikte des Mittelalters und regelte das Verhältnis von Kirche und Staat neu. Er zeigte, dass auch mächtige Institutionen miteinander verhandeln konnten.'
    },
    {
        year: 1215,
        title: 'Magna Carta',
        minZoom: 4.0,
        description: 'Der englische König muss seinen Adeligen zum ersten Mal Rechte schriftlich zusichern.',
        details: 'König Johann Ohneland war gezwungen, die Magna Carta zu unterzeichnen – ein Dokument, das die Macht des Königs einschränkte und bestimmte Rechte für den Adel festlegte. Obwohl es zunächst nur für Adlige galt, wurde die Magna Carta zur Grundlage der englischen Verfassungstradition und inspirierte spätere Demokraten weltweit. Sie gilt als frühes Zeichen dafür, dass Herrscher nicht uneingeschränkt regieren dürfen.'
    },
    {
        year: 1347,
        title: 'Die Pest',
        minZoom: 2.0,
        description: 'Der Schwarze Tod erreicht Europa und tötet etwa ein Drittel der Bevölkerung.',
        details: 'Die Beulenpest breitete sich rasend schnell aus und verwandelte ganze Städte in Geisterstädte. Die sozialen und wirtschaftlichen Folgen waren verheerend: Arbeitskräfte fehlten, alte Ordnungen brachen zusammen, und viele Menschen wandten sich von der Kirche ab, weil Gebete nicht halfen. Die Pest veränderte Europa nachhaltig und trieb das Mittelalter in eine tiefe Krise.'
    },
    {
        year: 1453,
        title: 'Fall Konstantinopels',
        minZoom: 3.0,
        description: 'Die osmanischen Türken erobern die tausendjährige Hauptstadt des Byzantinischen Reiches.',
        details: 'Mit der Einnahme Konstantinopels endete das Oströmische Reich, das über tausend Jahre Bestand gehabt hatte. Viele byzantinische Gelehrte flohen mit ihren Büchern und Handschriften nach Westeuropa und beflügelten damit die Renaissance. Für die Osmanen war der Sieg der Beginn ihrer Herrschaft über weite Teile Südosteuropas.'
    },
    {
        year: 1455,
        title: 'Gutenberg-Bibel',
        minZoom: 5.0,
        description: 'Johannes Gutenberg druckt die erste Bibel mit beweglichen Lettern.',
        details: 'Der Buchdruck war eine der folgenreichsten Erfindungen der Geschichte, denn er machte Wissen plötzlich für viel mehr Menschen zugänglich. Bücher wurden günstiger und verbreiteten sich schneller, was Bildung und kritisches Denken förderte. Ohne Gutenbergs Erfindung hätte die Reformation von Martin Luther wohl nie so schnell ganz Europa erfasst.'
    },

    // ========== FRÜHE NEUZEIT (1500-1789) ==========
    {
        year: 1492,
        title: 'Kolumbus in Amerika',
        minZoom: 2.0,
        description: 'Christoph Kolumbus landet in der Karibik und eröffnet das Zeitalter der Entdeckungen.',
        details: 'Für die Europäer war es ein Aufbruch in eine unbekannte Welt, für die Menschen Amerikas bedeutete es Katastrophe: Millionen starben durch eingeschleppte Krankheiten und Gewalt. Europa profitierte enorm von Gold, Silber und neuen Nahrungspflanzen wie Kartoffeln und Mais. Der Kolonialismus, der hier begann, prägte die Welt bis heute.'
    },
    {
        year: 1517,
        title: 'Reformation',
        minZoom: 1.8,
        description: 'Martin Luther veröffentlicht 95 Thesen und erschüttert die katholische Kirche.',
        details: 'Luther kritisierte den Ablasshandel, bei dem man sich buchstäblich von Sünden freikaufen konnte, als Betrug am einfachen Volk. Dank des Buchdrucks verbreiteten sich seine Ideen blitzschnell durch ganz Europa. Die Reformation spaltete die Kirche dauerhaft in Katholiken und Protestanten und löste Jahrzehnte religioser Konflikte aus.'
    },
    {
        year: 1519,
        title: 'Cortés in Mexiko',
        minZoom: 6.0,
        description: 'Hernán Cortés beginnt mit wenigen Soldaten die Eroberung des mächtigen Aztekenreiches.',
        details: 'Mit Tricks, Bündnissen mit Feinden der Azteken und dem Schock seiner Waffen besiegte Cortés das riesige Reich von Kaiser Moctezuma. Innerhalb weniger Jahre war das Aztekenreich vernichtet und Mexiko zur spanischen Kolonie geworden. Millionen indigener Menschen starben durch Krieg, Sklaverei und vor allem durch eingeschleppte europäische Krankheiten.'
    },
    {
        year: 1521,
        title: 'Luther in Worms',
        minZoom: 4.5,
        description: 'Luther verweigert vor Kaiser und Reichstag den Widerruf seiner Lehren.',
        details: 'Vor dem Reichstag in Worms sollte Luther seine Schriften widerrufen – doch er weigerte sich standhaft mit den Worten: „Hier stehe ich, ich kann nicht anders." Er wurde daraufhin geächtet, also für vogelfrei erklärt, aber Kurfürst Friedrich der Weise ließ ihn in Sicherheit auf der Wartburg bringen. Dort übersetzte Luther die Bibel ins Deutsche und machte sie dem Volk zugänglich.'
    },
    {
        year: 1534,
        title: 'Jesuitenorden',
        minZoom: 6.5,
        description: 'Ignatius von Loyola gründet den Orden der Jesuiten als Antwort auf die Reformation.',
        details: 'Die Jesuiten wurden zur wichtigsten Kraft der Gegenreformation, also der katholischen Erneuerungsbewegung. Mit exzellenter Bildung, strenger Disziplin und Missionstätigkeit in aller Welt kämpften sie für den Erhalt des Katholizismus. Ihre Schulen prägten die Bildung in vielen Ländern für Jahrhunderte.'
    },
    {
        year: 1545,
        title: 'Konzil von Trient',
        minZoom: 5.5,
        description: 'Die katholische Kirche erneuert sich auf dem Konzil von Trient von innen heraus.',
        details: 'Als Antwort auf Luthers Kritik reformierte die Kirche sich selbst: Missstände wurden beseitigt, Glaubensgrundsätze klar definiert und das Bildungswesen gestärkt. Das Konzil markierte den Beginn der Gegenreformation und stärkte die Kirche wieder erheblich. Es legte den Grundstein für das moderne Katholizismus.'
    },
    {
        year: 1555,
        title: 'Augsburger Religionsfrieden',
        minZoom: 4.0,
        description: 'Katholiken und Lutheraner werden im Reich erstmals rechtlich gleichgestellt.',
        details: 'Der Grundsatz „Cuius regio, eius religio" bedeutete: Der Landesherr bestimmt, welche Religion in seinem Gebiet gilt. Das war zwar keine Religionsfreiheit für den Einzelnen, aber es beendete die unmittelbaren Religionskriege im Reich. Erstmals in der Geschichte wurden zwei verschiedene Konfessionen offiziell anerkannt.'
    },
    {
        year: 1588,
        title: 'Spanische Armada',
        minZoom: 6.0,
        description: 'Englands Flotte zerstört Spaniens unbesiegbar geglaubte Armada.',
        details: 'König Philipp II. von Spanien schickte eine riesige Flotte, um England zu erobern – doch Stürme und englische Seefahrer zerstörten sie. Spanien verlor damit seinen Ruf als unbesiegbare Seemacht, während England seinen Aufstieg zur führenden Seefahrernation begann. Dieser Sieg gab England das Selbstbewusstsein, eine eigene Kolonialmacht zu werden.'
    },
    {
        year: 1618,
        title: 'Dreißigjähriger Krieg',
        minZoom: 2.0,
        description: 'Der Prager Fenstersturz zündet den Funken für einen verheerenden europäischen Krieg.',
        details: 'Was als Streit zwischen böhmischen Protestanten und dem habsburgischen Kaiser begann, wurde zu einem dreißigjährigen Flächenbrand, in den fast ganz Europa hineingezogen wurde. Deutschland wurde besonders stark verwüstet – ganze Landstriche entvölkerten sich durch Kämpfe, Hunger und Seuchen. Teile Deutschlands verloren bis zu einem Drittel ihrer Bevölkerung.'
    },
    {
        year: 1648,
        title: 'Westfälischer Frieden',
        minZoom: 2.0,
        description: 'Der Westfälische Frieden beendet den Dreißigjährigen Krieg und ordnet Europa neu.',
        details: 'Nach jahrelangen Verhandlungen wurde ein Frieden geschlossen, der Deutschland in über 300 Einzelstaaten zersplittert zurückließ. Gleichzeitig entstand das moderne Staatensystem Europas, in dem Souveränität und Nichteinmischung zu Grundprinzipien wurden. Religiöse Toleranz zwischen Katholiken, Lutheranern und Reformierten wurde erstmals vertraglich gesichert.'
    },
    {
        year: 1649,
        title: 'Hinrichtung Karl I.',
        minZoom: 5.0,
        description: 'König Karl I. von England wird öffentlich hingerichtet – ein Tabubruch ohne Vorbild.',
        details: 'Nach einem blutigen Bürgerkrieg zwischen König und Parlament wurde Karl I. vor Gericht gestellt und zum Tode verurteilt. Dieses Ereignis erschütterte ganz Europa, denn ein König, der als Gottes Stellvertreter galt, wurde von seinem eigenen Volk enthauptet. England wurde danach kurzzeitig zur Republik unter Oliver Cromwell.'
    },
    {
        year: 1660,
        title: 'Restauration England',
        minZoom: 6.5,
        description: 'Nach Cromwells Tod kehrt die Monarchie nach England zurück.',
        details: 'Karl II. bestieg den englischen Thron und stellte die Monarchie wieder her – aber die Zeit ohne König hatte das politische Bewusstsein verändert. Das Parlament war stärker geworden und ließ sich nicht mehr vollständig zurückdrängen. England bewegte sich schrittweise auf eine konstitutionelle Monarchie zu.'
    },
    {
        year: 1683,
        title: 'Belagerung Wiens',
        minZoom: 5.0,
        description: 'Ein polnisch-deutsches Entsatzheer schlägt die osmanischen Belagerer vor Wien.',
        details: 'Das Osmanische Reich hatte Wien belagert und wäre fast erfolgreich gewesen – doch ein Entsatzheer unter dem polnischen König Jan Sobieski wendete das Blatt. Diese Niederlage markierte den Beginn des langen osmanischen Rückzugs aus Europa. Für Wien und das Habsburgerreich war es eine Rettung in letzter Sekunde.'
    },
    {
        year: 1689,
        title: 'Bill of Rights',
        minZoom: 3.5,
        description: 'Englands Parlament sichert sich mit der Bill of Rights dauerhafte Rechte gegenüber der Krone.',
        details: 'Nach der Glorious Revolution, bei der Wilhelm von Oranien ohne Blutvergießen den englischen Thron übernahm, musste er die Bill of Rights unterzeichnen. Sie garantierte Redefreiheit im Parlament, freie Wahlen und schränkte die Macht des Königs erheblich ein. Dieses Dokument wurde zum Vorbild für spätere Verfassungen und Menschenrechtserklärungen.'
    },
    {
        year: 1701,
        title: 'Preußen Königreich',
        minZoom: 5.5,
        description: 'Friedrich I. krönt sich selbst zum König in Preußen und begründet eine neue Großmacht.',
        details: 'Der Kurfürst von Brandenburg setzte sich in Königsberg eigenhändig die Krone auf – ein bewusster Akt, der seine Unabhängigkeit von Kaiser und Papst betonte. Preußen begann damit seinen Aufstieg von einem kleinen Herzogtum zur europäischen Großmacht. Dieser Aufstieg sollte die Geschichte Deutschlands für die nächsten 250 Jahre bestimmen.'
    },
    {
        year: 1740,
        title: 'Friedrich II. König',
        minZoom: 4.5,
        description: 'Friedrich der Große übernimmt Preußens Thron und macht es zur führenden deutschen Macht.',
        details: 'Der „Alte Fritz" war eine widersprüchliche Persönlichkeit: philosophisch gebildet und Freund Voltaires, aber auch skrupelloser Militärstratege, der Schlesien von Österreich raubte. Unter seiner Herrschaft wurde Preußen zu einer anerkannten Großmacht, die Österreich das Gleichgewicht hielt. Sein aufgeklärter Absolutismus – „Ich bin der erste Diener des Staates" – blieb ein berühmtes Zitat.'
    },
    {
        year: 1756,
        title: 'Siebenjähriger Krieg',
        minZoom: 4.0,
        description: 'Der Siebenjährige Krieg ist der erste wirklich weltumspannende Konflikt der Geschichte.',
        details: 'Auf fünf Kontinenten kämpften Europas Mächte gegeneinander: Preußen behauptete sich gegen Österreich, Frankreich und Russland, während England und Frankreich in Amerika, Indien und Afrika um Kolonien stritten. Preußen überstand den Krieg mit knapper Not, England wurde zur Weltmacht. Für Amerika legte der Krieg den Keim zur Unabhängigkeitsbewegung.'
    },
    {
        year: 1769,
        title: 'Watts Dampfmaschine',
        minZoom: 3.0,
        description: 'James Watt verbessert die Dampfmaschine so grundlegend, dass sie industriell nutzbar wird.',
        details: 'Watts Dampfmaschine war nicht die erste, aber die erste wirklich effiziente – sie verbrauchte viel weniger Kohle und war vielseitig einsetzbar. Damit wurde sie zum zentralen Motor der Industriellen Revolution: Fabriken, Eisenbahnen und Dampfschiffe wurden möglich. Die Art, wie Menschen arbeiteten und lebten, veränderte sich grundlegend.'
    },
    {
        year: 1776,
        title: 'Unabhängigkeit USA',
        minZoom: 2.5,
        description: 'Die 13 amerikanischen Kolonien erklären sich von England für unabhängig.',
        details: 'Die Unabhängigkeitserklärung vom 4. Juli 1776 proklamierte, dass alle Menschen gleich geschaffen seien und unveräußerliche Rechte hätten. Das war eine revolutionäre Idee, die Aufklärer in Europa begeisterte und die Französische Revolution mitbeeinflusste. Die USA wurden zur ersten modernen Demokratie der Welt.'
    },

    // ========== FRANZÖSISCHE REVOLUTION & NAPOLEON ==========
    {
        year: 1789,
        title: 'Franz. Revolution',
        minZoom: 1.8,
        description: 'Das französische Volk stürmt die Bastille und läutet eine neue Epoche ein.',
        details: 'Die Französische Revolution beseitigte den Absolutismus und proklamierte die Ideale Freiheit, Gleichheit und Brüderlichkeit. Alte Privilegien des Adels und der Kirche wurden abgeschafft, und zum ersten Mal erhob das Volk Anspruch auf politische Mitbestimmung. Diese Ereignisse veränderten Europa und die Welt grundlegend und gelten als Beginn der modernen Geschichte.'
    },
    {
        year: 1791,
        title: 'Verfassung Frankreich',
        minZoom: 5.5,
        description: 'Frankreich erhält seine erste schriftliche Verfassung und wird konstitutionelle Monarchie.',
        details: 'Die Verfassung von 1791 begrenzte die Macht des Königs durch ein gewähltes Parlament und garantierte grundlegende Bürgerrechte. Damit wurde Frankreich zur konstitutionellen Monarchie – der König regierte noch, aber nicht mehr unbeschränkt. Es war ein erster Schritt, der zeigt, wie die Revolution anfangs moderate Ziele verfolgte.'
    },
    {
        year: 1792,
        title: 'Republik Frankreich',
        minZoom: 4.5,
        description: 'Die Monarchie wird abgeschafft und Frankreich zur Republik ausgerufen.',
        details: 'Als König Ludwig XVI. des Verrats verdächtig wurde und ausländische Armeen Frankreich bedrohten, radikalisierte sich die Revolution. Die Nationalversammlung schaffte die Monarchie ab und rief die Republik aus. Damit begann eine Phase der Radikalisierung, die in den Schrecken der Terrorherrschaft gipfeln sollte.'
    },
    {
        year: 1793,
        title: 'Terrorherrschaft',
        minZoom: 3.5,
        description: 'Robespierre und die Jakobiner regieren Frankreich mit dem Fallbeil.',
        details: 'Im Namen von Freiheit und Tugend wurden Tausende Menschen guillotiniert, darunter König Ludwig XVI. und Königin Marie Antoinette. Wer als Feind der Revolution galt, lebte in tödlicher Gefahr – auch ehemalige Revolutionäre. Diese Phase zeigt, wie Revolutionen in Gewalt und Willkür umschlagen können.'
    },
    {
        year: 1794,
        title: 'Ende Robespierres',
        minZoom: 6.0,
        description: 'Robespierre wird von seinen eigenen Mitstreitern verhaftet und guillotiniert.',
        details: 'Als Robespierre plante, weitere Mitglieder des Konvents hinrichten zu lassen, wendeten sie sich gegen ihn. Am 9. Thermidor (27. Juli) wurde er verhaftet und am nächsten Tag hingerichtet. Die Terrorherrschaft endete abrupt, und Frankreich bewegte sich unter dem Direktorium auf gemäßigtere Bahnen.'
    },
    {
        year: 1799,
        title: 'Napoleons Putsch',
        minZoom: 3.5,
        description: 'Napoleon Bonaparte greift durch einen Staatsstreich die Macht in Frankreich.',
        details: 'Am 18. Brumaire (9. November) putschte Napoleon das schwache Direktorium weg und machte sich zum Ersten Konsul. Die meisten Franzosen begrüßten das: Nach Jahren der Instabilität sehnte man sich nach Ordnung und starker Führung. Napoleon versprach, die Errungenschaften der Revolution zu sichern und Frieden zu bringen.'
    },
    {
        year: 1804,
        title: 'Napoleon Kaiser',
        minZoom: 2.0,
        description: 'Napoleon krönt sich selbst zum Kaiser der Franzosen in Notre-Dame.',
        details: 'Indem Napoleon die Krone aus den Händen des Papstes nahm und sie sich selbst aufsetzte, machte er deutlich, dass seine Macht von niemandem außer ihm selbst stammte. Als Kaiser modernisierte er Frankreich grundlegend mit dem Code Civil, einem einheitlichen Gesetzbuch, das Gleichheit vor dem Gesetz sicherte. Napoleons Herrschaft verband revolutionäre Ideen mit monarchischer Macht.'
    },
    {
        year: 1805,
        title: 'Schlacht bei Austerlitz',
        minZoom: 5.0,
        description: 'Napoleon besiegt die Armeen Österreichs und Russlands in seiner brillantesten Schlacht.',
        details: 'Die „Dreikaiserschlacht" bei Austerlitz gilt als Napoleons militärisches Meisterwerk. Er täuschte den Feind, schwächte absichtlich seinen rechten Flügel und schlug dann mit der Mitte durch. Nach diesem Sieg war Napoleon auf dem Höhepunkt seiner Macht und diktierte Österreich harte Friedensbedingungen.'
    },
    {
        year: 1806,
        title: 'Ende des HRR',
        minZoom: 2.0,
        description: 'Kaiser Franz II. legt die Krone des Heiligen Römischen Reiches nieder.',
        details: 'Nach über 800 Jahren hörte das Heilige Römische Reich Deutscher Nation auf zu existieren. Napoleon hatte die deutschen Fürsten in seinem Rheinbund zusammengefasst und Franz II. gezwungen, die Kaiserwürde abzulegen. Deutschland war nun ein Flickenteppich von 36 Einzelstaaten ohne gemeinsame politische Führung.'
    },
    {
        year: 1807,
        title: 'Kontinentalsperre',
        minZoom: 5.5,
        description: 'Napoleon verbietet ganz Europa den Handel mit England, um es wirtschaftlich zu besiegen.',
        details: 'Da er England nicht militärisch besiegen konnte, versuchte Napoleon es durch eine Wirtschaftsblockade zu erdrosseln. Alle europäischen Länder mussten mitmachen – doch das schadete auch Napoleons Verbündeten. Als Russland die Sperre nicht mehr mittragen wollte, war das einer der Gründe für den verheerenden Russlandfeldzug.'
    },
    {
        year: 1812,
        title: 'Russlandfeldzug',
        minZoom: 3.5,
        description: 'Napoleons Grande Armée marschiert nach Russland und wird dort vernichtet.',
        details: 'Mit 600.000 Soldaten begann Napoleon den Feldzug gegen Russland, doch die Russen wich en immer weiter zurück und verbrannten alles hinter sich. Moskau stand in Flammen, und der russische Winter traf die unvorbereitete Armee mit voller Wucht. Von den 600.000 Soldaten kehrten weniger als 100.000 lebend zurück – Napoleons Macht war gebrochen.'
    },
    {
        year: 1813,
        title: 'Völkerschlacht Leipzig',
        minZoom: 2.5,
        description: 'Preußen, Österreich und Russland besiegen Napoleon in der größten Schlacht der Geschichte.',
        details: 'Vier Tage lang kämpften über 500.000 Soldaten bei Leipzig – mehr als in jeder anderen Schlacht bis dahin. Die Koalition aus Preußen, Österreich, Russland und Schweden umzingelte Napoleons Armee und zwang ihn zum Rückzug. Diese entscheidende Niederlage bedeutete das Ende von Napoleons Herrschaft über Deutschland.'
    },
    {
        year: 1814,
        title: 'Verbannung Elba',
        minZoom: 6.0,
        description: 'Nach seiner Abdankung wird Napoleon auf die Mittelmeerinsel Elba verbannt.',
        details: 'Die siegreichen Mächte ließen Napoleon zwar überleben, verbannten ihn aber auf die kleine Insel Elba, wo er als nomineller Herrscher residierte. Doch Napoleon war nicht der Typ, um ruhig auf einer Insel zu sitzen. Bereits nach zehn Monaten floh er und kehrte nach Frankreich zurück – für die Hundert Tage seiner letzten Herrschaft.'
    },
    {
        year: 1815,
        title: 'Waterloo',
        minZoom: 4.0,
        description: 'Wellington und Blücher schlagen Napoleon bei Waterloo endgültig.',
        details: 'Bei Waterloo in Belgien vereinten sich die britische Armee unter Wellington und die preußische unter Blücher, um Napoleon ein letztes Mal zu besiegen. Die Niederlage war vernichtend, und Napoleon wurde diesmal auf die ferne Insel St. Helena im Südatlantik verbannt, aus der es keine Rückkehr gab. Dort starb er 1821.'
    },
    {
        year: 1815,
        title: 'Wiener Kongress',
        minZoom: 1.8,
        description: 'Europas Mächte ordnen nach Napoleon auf dem Wiener Kongress den Kontinent neu.',
        details: 'Unter der Führung des österreichischen Diplomaten Metternich wurde Europa auf dem Kongress neu aufgeteilt: Alte Dynastien kehrten zurück, Grenzen wurden gezogen und ein System des Gleichgewichts der Mächte sollte künftige Kriege verhindern. Die Idee nationaler Einheit und liberaler Freiheiten wurde bewusst zurückgedrängt – was Spannungen schuf, die in den Revolutionen von 1848 explodierten.'
    },

    // ========== VORMÄRZ & REVOLUTION 1848 ==========
    {
        year: 1817,
        title: 'Wartburgfest',
        minZoom: 3.5,
        description: 'Studenten aus ganz Deutschland versammeln sich auf der Wartburg und fordern Einheit.',
        details: 'Auf der Wartburg, dem Ort, an dem Luther die Bibel übersetzt hatte, kamen Burschenschafter zusammen und forderten ein freies, geeintes Deutschland. Sie verbrannten symbolisch Bücher und Schriften, die sie als reaktionär empfanden. Metternich sah darin eine gefährliche Bedrohung und reagierte mit verschärfter Überwachung und Zensur.'
    },
    {
        year: 1819,
        title: 'Karlsbader Beschlüsse',
        minZoom: 5.5,
        description: 'Metternich setzt strenge Zensur und Überwachung an deutschen Universitäten durch.',
        details: 'Nach der Ermordung des Schriftstellers Kotzebue durch einen Studenten nutzte Metternich die Gunst der Stunde: Die Karlsbader Beschlüsse führten Zensur für alle Druckerzeugnisse ein, die Universitäten wurden überwacht, und Burschenschaften wurden verboten. Diese Repression dämpfte die Freiheitsbewegung, konnte sie aber nicht dauerhaft aufhalten.'
    },
    {
        year: 1830,
        title: 'Juli-Revolution',
        minZoom: 4.5,
        description: 'Die Pariser Juli-Revolution löst eine Welle von Aufständen in ganz Europa aus.',
        details: 'Als König Karl X. in Frankreich versuchte, die Presse zu knebeln und die Macht des Parlaments zu beschneiden, erhob sich Paris. Der Funke sprang über: In Polen, Belgien und einigen deutschen Staaten kam es zu Unruhen. Belgien erlangte sogar seine Unabhängigkeit. Die Reaktion zeigte, dass sie die Freiheitsbewegungen nicht dauerhaft unterdrücken konnte.'
    },
    {
        year: 1832,
        title: 'Hambacher Fest',
        minZoom: 2.5,
        description: 'Dreißigtausend Menschen versammeln sich am Hambacher Schloss für Freiheit und Einheit.',
        details: 'Das Hambacher Fest war die größte politische Demonstration, die Deutschland bis dahin erlebt hatte. Bürger, Handwerker und Studenten schwangen Schwarz-Rot-Gold, die Farben der Einheitsbewegung. Die Obrigkeit reagierte mit verschärfter Repression, aber die Sehnsucht nach einem freien, geeinten Deutschland ließ sich nicht mehr aufhalten.'
    },
    {
        year: 1835,
        title: 'Erste dt. Eisenbahn',
        minZoom: 2.5,
        description: 'Die Lokomotive „Adler" befährt die erste deutsche Eisenbahnstrecke von Nürnberg nach Fürth.',
        details: 'Was zunächst wie eine Kuriosität wirkte, wurde zum Symbol einer neuen Zeit: Die Eisenbahn verband Städte, beschleunigte den Handel und trieb die Industrialisierung voran. Innerhalb weniger Jahrzehnte überzog ein Schienennetz Deutschland und veränderte die Wirtschaft und das Leben der Menschen grundlegend. Die Eisenbahn war der Beschleuniger der industriellen Revolution.'
    },
    {
        year: 1844,
        title: 'Weberaufstand',
        minZoom: 5.0,
        description: 'Schlesische Weber erheben sich gegen Hunger und Ausbeutung durch die Fabrikanten.',
        details: 'Die Weber der schlesischen Gebirgsregion hatten durch die Konkurrenz billig hergestellter Fabrikstoffe ihre Einnahmen verloren und lebten in bitterer Armut. Ihr verzweifelter Aufstand wurde brutal niedergeschlagen, zeigte aber zum ersten Mal, dass die „soziale Frage" – die Armut der entstehenden Arbeiterklasse – zur zentralen politischen Herausforderung des Industriezeitalters werden würde.'
    },
    {
        year: 1848,
        title: 'Märzrevolution',
        minZoom: 1.8,
        description: 'Revolutionäre Barrikadenkämpfe erschüttern Berlin und ganz Deutschland.',
        details: 'Von der Februarrevolution in Paris inspiriert, erhoben sich Menschen in Wien, Berlin und vielen deutschen Städten. Sie forderten Pressefreiheit, Volksvertretungen und die deutsche Einheit. Das Frankfurter Paulskirchen-Parlament tagte als erste gesamtdeutsche Nationalversammlung – ein historischer Moment, auch wenn die Revolution letztlich scheiterte.'
    },
    {
        year: 1848,
        title: 'Kommunist. Manifest',
        minZoom: 4.0,
        description: 'Karl Marx und Friedrich Engels rufen im Kommunistischen Manifest zur Revolution auf.',
        details: 'Das Manifest erschien genau zur Zeit der europäischen Revolutionen und analysierte die Gesellschaft als Klassenkampf zwischen Bourgeoisie und Proletariat. Der letzte Satz – „Proletarier aller Länder, vereinigt euch!" – wurde zum meistzitierten politischen Aufruf der Geschichte. Es legte den Grundstein für die sozialistischen und kommunistischen Bewegungen des 20. Jahrhunderts.'
    },
    {
        year: 1849,
        title: 'Revolution scheitert',
        minZoom: 3.5,
        description: 'Friedrich Wilhelm IV. lehnt die deutsche Kaiserkrone ab und zerschlägt die Revolution.',
        details: 'Das Paulskirchen-Parlament hatte mühsam eine Verfassung ausgearbeitet und Friedrich Wilhelm IV. die Kaiserkrone angeboten – doch er lehnte verächtlich ab, weil sie „aus der Gosse" stammte, also vom Volk und nicht von Gottes Gnaden. Die Revolution wurde niedergeschlagen, Demokraten flohen ins Ausland, und Deutschland blieb zersplittert. Die Einheit musste auf anderem Weg kommen.'
    },
    {
        year: 1850,
        title: 'Hochindustrialisierung',
        minZoom: 3.0,
        description: 'Deutschland wandelt sich in rasantem Tempo zur Industrienation.',
        details: 'In der zweiten Hälfte des 19. Jahrhunderts schossen Fabriken aus dem Boden, Städte wuchsen explosionsartig an, und Millionen Menschen verließen das Land, um in den Fabriken zu arbeiten. Die Lebensbedingungen der Arbeiter waren oft erbärmlich: lange Arbeitszeiten, gefährliche Bedingungen, Kinderarbeit. Aus diesem sozialen Elend erwuchs die organisierte Arbeiterbewegung.'
    },

    // ========== DEUTSCHE EINIGUNG ==========
    {
        year: 1861,
        title: 'Wilhelm I. König',
        minZoom: 5.5,
        description: 'Wilhelm I. wird König von Preußen und beruft bald darauf Bismarck als Minister.',
        details: 'Wilhelm I. war ein konservativer Militärmann, der fest entschlossen war, die Macht der Krone gegen das Parlament zu verteidigen. Als er in einen Streit über die Heeresreform geriet, berief er Otto von Bismarck zum Ministerpräsidenten – eine Entscheidung, die die Geschichte Deutschlands für Jahrzehnte prägen sollte. Zusammen führten sie Preußen und Deutschland zur Einigung.'
    },
    {
        year: 1862,
        title: 'Bismarck Minister',
        minZoom: 2.5,
        description: 'Bismarck wird Ministerpräsident und kündigt an, Fragen durch „Eisen und Blut" zu lösen.',
        details: 'Otto von Bismarck war ein Meister der Realpolitik, der bereit war, alle Mittel einzusetzen, um seine Ziele zu erreichen. Seine berühmte Rede, in der er erklärte, die großen Fragen der Zeit würden nicht durch Reden, sondern durch „Eisen und Blut" entschieden, schockierte das liberale Bürgertum. Genau so handelte er: Drei Kriege führten zur deutschen Einigung unter preußischer Führung.'
    },
    {
        year: 1863,
        title: 'Gründung ADAV',
        minZoom: 4.0,
        description: 'Ferdinand Lassalle gründet die erste deutsche Arbeiterpartei.',
        details: 'Der Allgemeine Deutsche Arbeiterverein war die erste politische Organisation, die sich ausdrücklich für die Rechte der Arbeiterklasse einsetzte. Lassalle forderte das allgemeine Wahlrecht und staatliche Unterstützung für Arbeitergenossenschaften. Obwohl der ADAV noch klein war, legte er den Grundstein für die spätere Sozialdemokratische Partei.'
    },
    {
        year: 1864,
        title: 'Dt.-Dänischer Krieg',
        minZoom: 5.0,
        description: 'Preußen und Österreich erkämpfen gemeinsam die Herzogtümer Schleswig und Holstein.',
        details: 'Im ersten von Bismarcks drei Einigungskriegen besiegten Preußen und Österreich Dänemark und gewannen die umstrittenen Herzogtümer. Dieser Krieg zeigte Bismarcks Fähigkeit, Österreich zunächst als Verbündeten einzubinden – und später gegen es zu wenden. Schleswig-Holstein wurde zum Streitpunkt, der den nächsten Krieg vorbereitete.'
    },
    {
        year: 1866,
        title: 'Deutscher Krieg',
        minZoom: 3.5,
        description: 'Preußen besiegt Österreich bei Königgrätz und übernimmt die Führung in Deutschland.',
        details: 'Nach nur sieben Wochen Krieg besiegte Preußen Österreich bei Königgrätz so überzeugend, dass Österreich für immer aus der deutschen Politik ausschied. Bismarck verzichtete bewusst auf übermäßige Demütigung Österreichs, um es als möglichen Verbündeten zu erhalten. Preußen übernahm nun die Führung über die norddeutschen Staaten.'
    },
    {
        year: 1867,
        title: 'Norddeutscher Bund',
        minZoom: 5.5,
        description: 'Preußen fasst die norddeutschen Staaten zum Norddeutschen Bund zusammen.',
        details: 'Nach dem Sieg über Österreich gründete Bismarck den Norddeutschen Bund als politisches Gebilde unter preußischer Führung. Die süddeutschen Staaten Bayern, Württemberg und Baden blieben noch außen vor, unterhielten aber enge wirtschaftliche und militärische Verbindungen. Der Norddeutsche Bund war die unmittelbare Vorstufe zum Deutschen Kaiserreich.'
    },
    {
        year: 1869,
        title: 'Gründung SDAP',
        minZoom: 4.5,
        description: 'August Bebel und Wilhelm Liebknecht gründen die Sozialdemokratische Arbeiterpartei.',
        details: 'Die SDAP war radikaler als Lassalles ADAV und stellte sich ausdrücklich auf den Boden des Marxismus. Sie forderte die Überwindung des kapitalistischen Systems und die Befreiung der Arbeiterklasse. 1875 vereinten sich ADAV und SDAP zur Sozialistischen Arbeiterpartei, dem direkten Vorläufer der heutigen SPD.'
    },
    {
        year: 1870,
        title: 'Dt.-Franz. Krieg',
        minZoom: 2.0,
        description: 'Bismarck provoziert Frankreich in den Krieg und schweißt die deutschen Staaten zusammen.',
        details: 'Die von Bismarck manipulierte Emser Depesche beleidigte Frankreich so, dass es den Krieg erklärte – genau wie Bismarck es geplant hatte. Der gemeinsame Kampf gegen den Erbfeind Frankreich brachte die süddeutschen Staaten ins preußische Lager. Kaiser Napoleon III. wurde bei Sedan gefangen genommen, Paris belagert, und das Kaiserreich stand unmittelbar bevor.'
    },
    {
        year: 1871,
        title: 'Reichsgründung',
        minZoom: 1.8,
        description: 'Im Spiegelsaal von Versailles wird das Deutsche Kaiserreich ausgerufen.',
        details: 'Am 18. Januar 1871 wurde Wilhelm I. im Herzstück der französischen Macht zum deutschen Kaiser proklamiert – eine bewusste Demütigung für Frankreich. Deutschland war endlich geeint, aber von oben, durch Kriege und Diplomatie, nicht durch eine Volksbewegung. Das Reich war ein konservatives Gebilde, das demokratische Kräfte einzubinden versuchte, ohne ihnen wirkliche Macht zu geben.'
    },
    {
        year: 1873,
        title: 'Gründerkrise',
        minZoom: 6.0,
        description: 'Nach dem Gründerboom platzt eine riesige Spekulationsblase und stürzt Deutschland in die Krise.',
        details: 'Die Milliarden aus den französischen Kriegsentschädigungen hatten eine Welle von Unternehmensgründungen und Spekulationen ausgelöst. Als die Blase 1873 platzte, verloren viele ihr gesamtes Vermögen, und eine lang anhaltende Wirtschaftskrise begann. Die Krise stärkte antisemitische Vorurteile, da jüdische Banker fälschlicherweise als Schuldige ausgemacht wurden.'
    },
    {
        year: 1878,
        title: 'Sozialistengesetze',
        minZoom: 2.5,
        description: 'Bismarck lässt nach Attentaten auf den Kaiser alle sozialistischen Organisationen verbieten.',
        details: 'Nach zwei Attentaten auf Kaiser Wilhelm I. nutzte Bismarck die Gelegenheit, um die aufstrebende Sozialdemokratie zu bekämpfen. Sozialistische Parteien, Vereine und Zeitungen wurden verboten. Die SPD-Mitglieder wurden verfolgt und mussten im Untergrund arbeiten. Ironischerweise machte dies die Partei nur populärer, und bei der Aufhebung der Gesetze 1890 war die SPD stärker als je zuvor.'
    },
    {
        year: 1883,
        title: 'Sozialversicherung',
        minZoom: 2.0,
        description: 'Bismarck führt die erste staatliche Krankenversicherung der Welt ein.',
        details: 'Mit Kranken-, Unfall- und Altersversicherung schuf Bismarck ein soziales Sicherungsnetz, das es in dieser Form noch nirgends gegeben hatte. Er nannte es das „Zuckerbrot" neben der „Peitsche" der Sozialistengesetze – er wollte den Arbeitern zeigen, dass der Staat für sie sorgte, ohne ihnen politische Macht geben zu müssen. Deutschland wurde damit zum Pionier des modernen Sozialstaats.'
    },
    {
        year: 1884,
        title: 'Berliner Konferenz',
        minZoom: 2.0,
        description: 'Europas Großmächte teilen auf der Berliner Konferenz Afrika unter sich auf.',
        details: 'Ohne einen einzigen Afrikaner einzuladen, zogen die europäischen Mächte mit dem Lineal Grenzen durch den Kontinent und verteilten ihn unter sich. Völker wurden auseinandergerissen oder unter eine Herrschaft gezwungen, obwohl sie keine Gemeinsamkeiten hatten. Der Kolonialismus dieser Epoche hinterließ Wunden, die bis heute spürbar sind.'
    },
    {
        year: 1888,
        title: 'Dreikaiserjahr',
        minZoom: 6.0,
        description: 'Innerhalb eines Jahres sterben zwei Kaiser – am Ende thront der junge Wilhelm II.',
        details: 'Kaiser Wilhelm I. starb hochbetagt, sein Sohn Friedrich III. regierte nur 99 Tage, bevor auch er an Kehlkopfkrebs starb. Damit kam der 29-jährige Wilhelm II. an die Macht – impulsiv, ehrgeizig und entschlossen, selbst zu regieren. Der Generationenwechsel wurde zur politischen Zäsur, denn Wilhelm würde bald Bismarck entlassen und einen neuen Kurs einschlagen.'
    },
    {
        year: 1890,
        title: 'Bismarck entlassen',
        minZoom: 3.0,
        description: 'Kaiser Wilhelm II. entlässt Bismarck und will Deutschland selbst in die Weltpolitik führen.',
        details: 'Der junge Kaiser und der alte Kanzler passten nicht zusammen – Wilhelm wollte selbst regieren, Bismarck ließ sich nicht einfach zur Seite drängen. Der „Lotse verlässt das Schiff", titelte eine britische Zeitung. Ohne Bismarcks vorsichtige Außenpolitik steuerte Deutschland in das Fahrwasser aggressiver Weltmachtpolitik und Aufrüstung.'
    },
    {
        year: 1898,
        title: 'Flottengesetze',
        minZoom: 3.5,
        description: 'Admiral Tirpitz beginnt mit dem Bau einer deutschen Hochseeflotte als Herausforderung Englands.',
        details: 'Wilhelm II. träumte von einem „Platz an der Sonne" für Deutschland und brauchte dafür eine starke Flotte. Die Flottengesetze lösten ein massives Wettrüsten mit England aus, das sich durch die deutsche Flotte bedroht fühlte. Diese Rivalität war einer der wichtigsten Faktoren, die England in das Lager der Gegner Deutschlands trieben und den Ersten Weltkrieg mitverursachten.'
    },

    // ========== ERSTER WELTKRIEG ==========
    {
        year: 1905,
        title: 'Erste Marokkokrise',
        minZoom: 6.5,
        description: 'Deutschland provoziert Frankreich in Marokko und verschärft die europäischen Spannungen.',
        details: 'Kaiser Wilhelm II. landete demonstrativ in Tanger und bestand auf deutschen Interessen in Marokko, das Frankreich als seinen Einflussbereich betrachtete. Deutschland wollte die Entente zwischen Frankreich und England testen und spalten – doch das Gegenteil trat ein: Die Krise schweißte die beiden Länder noch enger zusammen. Es war ein frühes Zeichen für die wachsenden Spannungen, die in den Krieg führen würden.'
    },
    {
        year: 1908,
        title: 'Bosnische Krise',
        minZoom: 6.0,
        description: 'Österreich-Ungarns Annexion Bosniens macht den Balkan zum gefährlichsten Fleck Europas.',
        details: 'Als Österreich-Ungarn Bosnien annektierte, war Serbien empört und sah sich in seinen nationalen Interessen verletzt. Russland, das sich als Schutzmacht der Slawen verstand, war gedemütigt, weil es zu schwach war, einzugreifen. Die Krise zeigte, dass der Balkan ein Pulverfass war, an dem nur ein Funke fehlte – und dieser Funke kam 1914 in Sarajevo.'
    },
    {
        year: 1914,
        title: 'Attentat Sarajevo',
        minZoom: 3.5,
        description: 'Gavrilo Princip erschießt den österreichischen Thronfolger Franz Ferdinand in Sarajevo.',
        details: 'Das Attentat war der Auslöser, aber nicht die eigentliche Ursache des Krieges. Österreich-Ungarn stellte Serbien ein Ultimatum, Russland mobilisierte zur Unterstützung Serbiens, Deutschland erklärte daraufhin Russland und Frankreich den Krieg. Der komplizierte Bündnismechanismus, der Europa sicherer machen sollte, zog in wenigen Wochen den ganzen Kontinent in den Krieg.'
    },
    {
        year: 1914,
        title: 'Erster Weltkrieg',
        minZoom: 1.8,
        description: 'Europa stürzt sich in einen industriellen Massenkrieg, den niemand in dieser Form erwartet hatte.',
        details: 'Millionen Soldaten zogen voller Begeisterung in den Krieg, überzeugt, zu Weihnachten wieder zu Hause zu sein. Stattdessen wurden sie in einen zermürbenden Stellungskrieg gezogen, in dem modernes Industriezeitalter und traditionelle Kriegsführung aufeinanderprallten. Am Ende waren über 17 Millionen Menschen tot, und die alte politische Ordnung Europas lag in Trümmern.'
    },
    {
        year: 1914,
        title: 'Schlacht an der Marne',
        minZoom: 5.5,
        description: 'Frankreich stoppt den deutschen Vormarsch an der Marne und rettet Paris.',
        details: 'Der deutsche Schlieffen-Plan sah vor, Frankreich in wenigen Wochen zu besiegen, bevor man sich gegen Russland wenden würde. An der Marne scheiterte dieser Plan: Die Franzosen stoppten den Vormarsch, und aus dem Bewegungskrieg wurde ein starrer Stellungskrieg. Hunderte Kilometer langer Schützengräben zogen sich quer durch Frankreich und Belgien.'
    },
    {
        year: 1916,
        title: 'Schlacht Verdun',
        minZoom: 2.0,
        description: 'Zehn Monate lang kämpfen Deutsche und Franzosen um Verdun – mit hunderttausenden Toten.',
        details: 'Die deutsche Strategie war zynisch: Man wollte Frankreich „ausbluten", indem man es zwang, jeden Meter Erde zu verteidigen. Fast 700.000 Soldaten starben oder wurden verwundet – für einen Geländegewinn von wenigen Kilometern. Verdun wurde zum Symbol für die sinnlose Brutalität des Ersten Weltkriegs und bleibt bis heute ein heiliger Ort der Erinnerung für Frankreich.'
    },
    {
        year: 1916,
        title: 'Schlacht Somme',
        minZoom: 5.0,
        description: 'An der Somme erleiden die Alliierten am ersten Tag über 57.000 Verluste.',
        details: 'Die britisch-französische Offensive an der Somme sollte den Druck auf Verdun nehmen, endete aber in einem Desaster. Allein am ersten Tag, dem 1. Juli 1916, verlor die britische Armee über 57.000 Mann. Erstmals wurden auch Panzer eingesetzt, ohne den erhofften Durchbruch zu erzielen. Die Somme wurde zum Symbol des sinnlosen Massenmordens.'
    },
    {
        year: 1917,
        title: 'USA treten ein',
        minZoom: 2.5,
        description: 'Nach dem deutschen U-Boot-Krieg und der Zimmermann-Depesche erklären die USA Deutschland den Krieg.',
        details: 'Deutschland hatte gehofft, England durch rücksichtslosen U-Boot-Krieg zur Kapitulation zu zwingen, nahm dabei aber den Kriegseintritt der USA in Kauf. Die Zimmermann-Depesche, in der Deutschland Mexiko ein Bündnis gegen die USA anbot, empörte die amerikanische Öffentlichkeit. Mit den frischen amerikanischen Truppen und Ressourcen war Deutschlands Niederlage nur noch eine Frage der Zeit.'
    },
    {
        year: 1917,
        title: 'Russ. Revolution',
        minZoom: 2.0,
        description: 'Lenin und die Bolschewiki übernehmen in Russland die Macht und schließen einen Separatfrieden.',
        details: 'Zunächst stürzte die Februarrevolution den Zaren, dann putschten die Bolschewiki im Oktober die provisorische Regierung weg. Lenin versprach den erschöpften Russen Frieden, Land und Brot. Die kommunistische Machtübernahme schütterte die Welt und sollte das 20. Jahrhundert entscheidend prägen.'
    },
    {
        year: 1918,
        title: 'Vertrag Brest-Litowsk',
        minZoom: 5.5,
        description: 'Deutschland diktiert Russland einen harten Frieden und gewinnt riesige Gebiete im Osten.',
        details: 'Im Vertrag von Brest-Litowsk musste das revolutionäre Russland Deutschland und Österreich-Ungarn enorme Gebiete abtreten, darunter Polen, das Baltikum und die Ukraine. Deutschland schien am Ziel – der Zweifrontenkrieg war beendet. Doch der Sieg im Osten band viele Truppen, und im Westen konnte die letzte deutsche Offensive nicht entscheiden.'
    },
    {
        year: 1918,
        title: 'Novemberrevolution',
        minZoom: 3.5,
        description: 'Matrosenaufstand und Revolution fegen Kaiser Wilhelm II. vom Thron.',
        details: 'Als die Marineführung die Flotte zu einem aussichtslosen Angriff schicken wollte, meuterten die Matrosen in Kiel. Die Revolution erfasste schnell ganz Deutschland: Arbeiter- und Soldatenräte übernahmen die Macht in den Städten. Kaiser Wilhelm II. dankte ab und floh in die Niederlande. Deutschland war Republik – aber welche Art von Republik, darüber waren die Deutschen tief gespalten.'
    },
    {
        year: 1918,
        title: 'Kriegsende',
        minZoom: 1.8,
        description: 'Am 11. November 1918 um 11 Uhr verstummen die Waffen des Ersten Weltkriegs.',
        details: 'Nach über vier Jahren Krieg und 17 Millionen Toten war Europa erschöpft und zerstört. Die alten Kaiserreiche Deutschlands, Österreich-Ungarns, Russlands und des Osmanischen Reiches existierten nicht mehr. An ihre Stelle traten neue Nationalstaaten und der gescheiterte Versuch, eine dauerhafte Friedensordnung zu schaffen.'
    },
    {
        year: 1919,
        title: 'Versailler Vertrag',
        minZoom: 1.8,
        description: 'Die Siegermächte zwingen Deutschland im Versailler Vertrag demütigende Bedingungen auf.',
        details: 'Deutschland wurde die alleinige Kriegsschuld aufgebürdet, musste Gebiete abtreten, seine Armee auf 100.000 Mann beschränken und enorme Reparationszahlungen leisten. Viele Deutsche empfanden den Vertrag als tiefen Verrat, zumal Präsident Wilsons Vierzehn Punkte Gerechtigkeit versprochen hatten. Die Verbitterung über den „Diktatfrieden" nährte Nationalismus und Revanchismus und bereitete den Boden für Hitler.'
    },

    // ========== WEIMARER REPUBLIK ==========
    {
        year: 1919,
        title: 'Weimarer Republik',
        minZoom: 1.8,
        description: 'Deutschland erhält in Weimar seine erste demokratische Verfassung.',
        details: 'Die Weimarer Verfassung war für ihre Zeit fortschrittlich: allgemeines Wahlrecht, auch für Frauen, Grundrechte und ein parlamentarisches System. Doch die Republik war von Anfang an von Feinden umgeben – von links sahen Kommunisten sie als zu bürgerlich, von rechts lehnten Nationalisten und Monarchisten sie ab. Sie galt vielen als „Republik ohne Republikaner".'
    },
    {
        year: 1919,
        title: 'Spartakusaufstand',
        minZoom: 5.0,
        description: 'Kommunisten unter Rosa Luxemburg und Karl Liebknecht versuchen eine Räterevolution.',
        details: 'Die KPD wollte nach russischem Vorbild eine Räterepublik errichten. Der Aufstand wurde von der neuen Regierung mit Hilfe rechtsgerichteter Freikorps brutal niedergeschlagen. Rosa Luxemburg und Karl Liebknecht wurden ermordet – ein tiefer Riss zwischen SPD und KPD, der die Weimarer Republik bis zu ihrem Ende schwächen sollte.'
    },
    {
        year: 1920,
        title: 'Kapp-Putsch',
        minZoom: 4.0,
        description: 'Rechtsgerichtete Freikorps marschieren auf Berlin und scheitern an einem Generalstreik.',
        details: 'Reaktionäre Offiziere und ihre Freikorps besetzten Berlin und riefen eine neue Regierung aus. Doch die Bevölkerung antwortete mit einem spontanen Generalstreik: Nichts funktionierte mehr, und die Putschisten mussten aufgeben. Der Kapp-Putsch zeigte, wie fragil die Republik war, aber auch, dass das Volk sie notfalls aktiv verteidigen konnte.'
    },
    {
        year: 1923,
        title: 'Ruhrbesetzung',
        minZoom: 4.5,
        description: 'Frankreich besetzt das Ruhrgebiet, weil Deutschland mit Reparationszahlungen im Rückstand ist.',
        details: 'Als Deutschland Kohlelieferungen nicht wie vereinbart erbrachte, marschierten französische und belgische Truppen in das Industrieherz Deutschlands ein. Die Berliner Regierung rief zum passiven Widerstand auf und druckte massenhaft Geld, um die streikenden Arbeiter zu bezahlen. Das Ergebnis war die galoppierende Hyperinflation, die Millionen Deutsche in den Ruin trieb.'
    },
    {
        year: 1923,
        title: 'Hyperinflation',
        minZoom: 2.0,
        description: 'Die Mark wird so wertlos, dass Menschen mit Schubkarren voll Geld einkaufen gehen.',
        details: 'Im Herbst 1923 brauchte man Milliarden Mark für ein Brot – die Ersparnisse eines Lebens waren über Nacht wertlos. Wer feste Sachwerte oder Devisen besaß, konnte günstig einkaufen; wer Sparkonten oder Rentenbezüge hatte, verlor alles. Das tiefe Misstrauen gegenüber dem Geld und dem Staat, das diese Erfahrung auslöste, blieb den Deutschen noch Generationen lang.'
    },
    {
        year: 1923,
        title: 'Hitler-Putsch',
        minZoom: 3.5,
        description: 'Hitler versucht in München einen Putsch nach Mussolinis Vorbild – und scheitert.',
        details: 'Inspiriert von Mussolinis Marsch auf Rom wollte Hitler von München aus die Macht im Reich übernehmen. Doch der Putsch scheiterte kläglich: Die Polizei schoss die Putschisten auseinander, Hitler wurde verhaftet. Sein anschließender Prozess wurde ihm zur Propagandabühne, und in der Festungshaft schrieb er „Mein Kampf". Er hatte aus dem Scheitern gelernt: Die Macht musste auf legalem Weg erobert werden.'
    },
    {
        year: 1924,
        title: 'Dawes-Plan',
        minZoom: 4.5,
        description: 'Der amerikanische Dawes-Plan regelt die Reparationszahlungen neu und stabilisiert Deutschland.',
        details: 'Amerikanische Banken pumpten Kredite in die deutsche Wirtschaft, die damit die Reparationen bezahlen konnte, was wiederum England und Frankreich ermöglichte, ihre Kriegsschulden an Amerika zu begleichen. Dieses Kreislaufsystem stabilisierte kurzzeitig die Wirtschaft und leitete die „Goldenen Zwanziger" ein. Aber das System war brüchig – es zerbrach beim Börsenkrach von 1929.'
    },
    {
        year: 1925,
        title: 'Hindenburg Präsident',
        minZoom: 3.5,
        description: 'Generalfeldmarschall Hindenburg wird Reichspräsident und symbolisiert die alte Ordnung.',
        details: 'Die Wahl des greisen Kriegshelden Hindenburg zum Präsidenten zeigte, wie wenig viele Deutsche die Republik liebten. Hindenburg selbst war Monarchist und hielt die Republik für eine Notlösung. Er erfüllte seine Pflichten korrekt – bis er 1933 Hitler zum Kanzler ernannte und damit die Demokratie beendete.'
    },
    {
        year: 1926,
        title: 'Völkerbund',
        minZoom: 5.5,
        description: 'Deutschland wird in den Völkerbund aufgenommen – ein Zeichen der Normalisierung.',
        details: 'Der Eintritt in den Völkerbund war ein Symbol für Deutschlands Rückkehr in die Gemeinschaft der Nationen. Außenminister Stresemann verfolgte eine Verständigungspolitik und erhielt dafür zusammen mit dem Franzosen Briand den Friedensnobelpreis. Die Verständigung blieb jedoch fragil – die Weltwirtschaftskrise 1929 würde alles wieder in Frage stellen.'
    },
    {
        year: 1929,
        title: 'Weltwirtschaftskrise',
        minZoom: 1.8,
        description: 'Der Schwarze Freitag in New York löst eine globale Wirtschaftskrise aus.',
        details: 'Als die New Yorker Börse zusammenbrach, zogen amerikanische Banken ihre Kredite aus Deutschland ab – und damit brach die mühsam stabilisierte Wirtschaft zusammen. Sechs Millionen Arbeitslose in Deutschland bedeuteten sechs Millionen verzweifelte Menschen, die empfänglich waren für radikale politische Versprechen. Die Krise trieb Millionen in die Arme der NSDAP und der KPD.'
    },
    {
        year: 1930,
        title: 'NSDAP zweitstärkste',
        minZoom: 3.5,
        description: 'Die NSDAP wird bei den Reichstagswahlen aus dem Nichts zur zweitstärksten Partei.',
        details: 'Mit 18,3 Prozent und 107 Sitzen schoss die NSDAP in die erste Reihe der deutschen Politik – eine Sensation, die die Welt schockierte. Hitlers Propaganda, seine einfachen Antworten auf komplexe Probleme und die Abstimmung auf die Ängste der Bevölkerung in der Krise zeigten Wirkung. Die demokratischen Parteien hatten keine überzeugende Antwort.'
    },
    {
        year: 1932,
        title: 'Präsidentenwahl',
        minZoom: 5.0,
        description: 'Hindenburg wird gegen Hitler wiedergewählt, aber Hitler ist stärker als je zuvor.',
        details: 'Der 85-jährige Hindenburg, von den Demokraten als kleineres Übel unterstützt, schlug Hitler im zweiten Wahlgang. Aber Hitler hatte bewiesen, dass er ein Massenphänomen war: Fast 37 Prozent stimmten für ihn. In den folgenden Monaten trieb die politische Instabilität immer mehr konservative Kreise dazu, Hitler als kontrollierbares Mittel zum Zweck zu betrachten.'
    },
    {
        year: 1932,
        title: 'Preußenschlag',
        minZoom: 6.0,
        description: 'Die Reichsregierung setzt die demokratisch gewählte preußische Regierung gewaltsam ab.',
        details: 'Preußen mit seiner SPD-geführten Regierung war die wichtigste demokratische Bastion Deutschlands. Als Reichskanzler Papen sie per Notverordnung absetzte und durch einen Reichskommissar ersetzte, war das ein Staatsstreich, der die Demokratie untergrub. Der Vorgang zeigte, wie leicht verfassungswidrige Maßnahmen möglich waren – und gab Hitler ein Vorbild.'
    },

    // ========== NATIONALSOZIALISMUS ==========
    {
        year: 1933,
        title: 'Machtergreifung',
        minZoom: 1.8,
        description: 'Reichspräsident Hindenburg ernennt Hitler am 30. Januar zum Reichskanzler.',
        details: 'Konservative Politiker wie Papen glaubten, Hitler als Kanzler einspannen und kontrollieren zu können – ein fataler Irrtum. Hitler nutzte alle legalen Mittel, um die Demokratie von innen auszuhöhlen, und innerhalb von Monaten hatte er eine Diktatur errichtet. Der 30. Januar 1933 ist einer der dunkelsten Tage der deutschen Geschichte.'
    },
    {
        year: 1933,
        title: 'Reichstagsbrand',
        minZoom: 3.5,
        description: 'Der brennende Reichstag gibt Hitler den Vorwand, Grundrechte außer Kraft zu setzen.',
        details: 'Einen Monat nach Hitlers Ernennung brannte der Reichstag. Hitler beschuldigte sofort die Kommunisten und ließ eine Notverordnung erlassen, die alle wesentlichen Grundrechte aufhob. Tausende Kommunisten, Sozialdemokraten und andere Gegner wurden verhaftet. Ob der Brandstifter Marinus van der Lubbe allein handelte, bleibt bis heute umstritten.'
    },
    {
        year: 1933,
        title: 'Ermächtigungsgesetz',
        minZoom: 2.0,
        description: 'Das Parlament stimmt für seine eigene Entmachtung und gibt Hitler unbegrenzte Vollmachten.',
        details: 'Nur die SPD stimmte gegen das Ermächtigungsgesetz, das Hitler erlaubte, ohne das Parlament zu regieren. Viele Abgeordnete wurden durch SA-Männer im Saal eingeschüchtert, andere waren bereits verhaftet. Damit hatte die Demokratie sich selbst abgeschafft – die parlamentarische Kontrolle, die einzige Bremse gegen Hitlers Macht, war beseitigt.'
    },
    {
        year: 1933,
        title: 'Gleichschaltung',
        minZoom: 2.5,
        description: 'Alle Parteien, Gewerkschaften und Verbände werden verboten oder gleichgeschaltet.',
        details: 'In rasantem Tempo wurde Deutschland zum Einparteienstaat: Gewerkschaften wurden zerschlagen, andere Parteien verboten oder lösten sich selbst auf, die Länder verloren ihre Eigenständigkeit. Presse, Rundfunk, Schulen und Kultur wurden unter NS-Kontrolle gebracht. Wer nicht mitmachte, riskierte Verhaftung oder Schlimmeres.'
    },
    {
        year: 1933,
        title: 'Bücherverbrennung',
        minZoom: 5.0,
        description: 'Studenten verbrennen öffentlich Bücher jüdischer und missliebiger Autoren.',
        details: 'Am 10. Mai 1933 loderten auf Plätzen in deutschen Universitätsstädten Scheiterhaufen aus Büchern. Werke von Marx, Freud, Heinrich Heine und vielen anderen wurden verbrannt. Heinrich Heine hatte bereits 1820 prophetisch geschrieben: „Dort wo man Bücher verbrennt, verbrennt man am Ende auch Menschen."'
    },
    {
        year: 1934,
        title: 'Röhm-Putsch',
        minZoom: 3.5,
        description: 'Hitler lässt in der „Nacht der langen Messer" SA-Führer und andere Gegner ermorden.',
        details: 'SA-Chef Röhm wollte eine zweite Revolution und die SA zur neuen deutschen Armee machen – das passte Hitler nicht, der die Reichswehr als Stütze brauchte. In einer Nacht im Juni 1934 wurden Röhm und Dutzende SA-Führer ermordet, ebenso andere unliebsame Personen. Die SS löste die SA als wichtigste Terrororganisation ab.'
    },
    {
        year: 1934,
        title: 'Hitler "Führer"',
        minZoom: 4.0,
        description: 'Nach Hindenburgs Tod vereint Hitler Kanzler- und Präsidentenamt in seiner Person.',
        details: 'Als Hindenburg starb, schaffte Hitler das Amt des Reichspräsidenten ab und nannte sich „Führer und Reichskanzler". Die Wehrmacht schwor einen persönlichen Eid auf Hitler – nicht auf die Verfassung oder das Vaterland. Damit war die letzte institutionelle Kontrolle beseitigt, und Hitlers Macht war absolut.'
    },
    {
        year: 1935,
        title: 'Nürnberger Gesetze',
        minZoom: 2.0,
        description: 'Die Nürnberger Rassegesetze machen Juden zu Bürgern zweiter Klasse.',
        details: 'Die Gesetze entzogen deutschen Juden die Staatsbürgerschaft, verboten Ehen und sexuelle Beziehungen zwischen Juden und Nichtjuden und schufen eine bürokratische Grundlage für die Entrechtung. Was zunächst wie eine Legalisierung bestehender Diskriminierung wirkte, war der erste Schritt auf dem Weg zur Vernichtung. Wer als „Jude" galt, wurde nun exakt nach Abstammung definiert.'
    },
    {
        year: 1936,
        title: 'Rheinland besetzt',
        minZoom: 5.5,
        description: 'Deutsche Truppen marschieren ins entmilitarisierte Rheinland und brechen den Versailler Vertrag.',
        details: 'Hitler riskierte einen enormen Bluff: Die deutschen Truppen hatten Befehl, sich bei jedem Widerstand zurückzuziehen, denn sie waren noch zu schwach. Doch England und Frankreich protestierten nur und griffen nicht ein. Hitler zog die richtige Lehre: Die Westmächte wollten keinen Krieg und würden wegschauen. Das ermutigte ihn zu immer größeren Wagnissen.'
    },
    {
        year: 1936,
        title: 'Olympia Berlin',
        minZoom: 4.0,
        description: 'Deutschland präsentiert sich bei den Berliner Olympischen Spielen als friedliche Nation.',
        details: 'Leni Riefenstahl filmte die perfekte NS-Inszenierung: ein modernes, sportliches Deutschland ohne Judensterne und Gewalt. Antisemitische Schilder verschwanden für die Dauer der Spiele. Doch Jesse Owens, ein schwarzer Amerikaner, gewann vier Goldmedaillen und widerlegte damit vor aller Welt Hitlers Rassentheorie von der arischen Überlegenheit.'
    },
    {
        year: 1936,
        title: 'Achse Berlin-Rom',
        minZoom: 5.0,
        description: 'Hitler und Mussolini schließen ein Bündnis, das später zum Dreimächtepakt wird.',
        details: 'Die beiden faschistischen Diktatoren, die lange misstrauisch aufeinander geschaut hatten, verbündeten sich. Die „Achse Berlin-Rom" wurde später durch Japan zum Dreimächtepakt erweitert. Dieses Bündnis der aggressivsten Mächte stellte die demokratischen Staaten vor die Herausforderung, gemeinsam zu handeln – was ihnen lange nicht gelang.'
    },
    {
        year: 1938,
        title: 'Anschluss Österreich',
        minZoom: 3.0,
        description: 'Deutschland marschiert in Österreich ein und gliedert es dem Reich an.',
        details: 'Unter dem Druck eines deutschen Ultimatums gab die österreichische Regierung nach, und die Wehrmacht marschierte ein. Viele Österreicher jubelten – die Sehnsucht nach dem Anschluss an Deutschland war tief verwurzelt. Die Westmächte akzeptierten es stillschweigend. Das „Großdeutsche Reich" umfasste nun 80 Millionen Menschen.'
    },
    {
        year: 1938,
        title: 'Münchner Abkommen',
        minZoom: 3.5,
        description: 'England und Frankreich opfern die Tschechoslowakei, um Hitler zu beschwichtigen.',
        details: 'In München stimmten Chamberlain und Daladier der Abtretung des sudetendeutschen Gebiets zu, obwohl die Tschechoslowakei kein Mitspracherecht hatte. Chamberlain glaubte, „Frieden für unsere Zeit" gerettet zu haben, und wurde als Held gefeiert. Doch Hitler hatte längst weitere Pläne, und die Besetzung des restlichen Tschechiens ein halbes Jahr später zeigte, dass Appeasement gescheitert war.'
    },
    {
        year: 1938,
        title: 'Reichspogromnacht',
        minZoom: 2.0,
        description: 'In der Nacht vom 9. auf den 10. November brennen Synagogen in ganz Deutschland.',
        details: 'Was als spontaner Volksprotest gegen die Ermordung eines deutschen Diplomaten in Paris dargestellt wurde, war eine von der SS und SA orchestrierte Gewaltaktion. Hunderte Synagogen brannten, tausende Geschäfte wurden zerstört, fast 100 Juden sofort getötet und rund 30.000 in Konzentrationslager verschleppt. Die Reichspogromnacht war der sichtbare Beginn des organisierten Terrors gegen die jüdische Bevölkerung.'
    },
    {
        year: 1939,
        title: 'Besetzung Tschechiens',
        minZoom: 5.0,
        description: 'Hitler besetzt die Rest-Tschechei und beweist, dass seine Versprechen wertlos sind.',
        details: 'Nur ein halbes Jahr nach dem Münchner Abkommen ließ Hitler die Wehrmacht in die tschechischen Gebiete einmarschieren. Böhmen und Mähren wurden zum deutschen Protektorat. Für Chamberlain und Daladier war nun klar: Appeasement hatte versagt, und Hitler würde durch Nachgeben nicht zu stoppen sein. England und Frankreich gaben Polen Sicherheitsgarantien.'
    },
    {
        year: 1939,
        title: 'Hitler-Stalin-Pakt',
        minZoom: 4.0,
        description: 'Das kommunistische Russland und das nationalsozialistische Deutschland schließen einen Nichtangriffspakt.',
        details: 'Der Pakt schockierte die Welt, denn die beiden Diktatoren hatten sich als erbitterte Feinde dargestellt. In einem geheimen Zusatzprotokoll teilten sie Osteuropa unter sich auf: Polen, das Baltikum und Teile Rumäniens sollten ihre jeweiligen Einflusssphären werden. Für Hitler war der Pakt das grüne Licht für den Überfall auf Polen, ohne gleichzeitig gegen Russland kämpfen zu müssen.'
    },
    {
        year: 1939,
        title: 'Zweiter Weltkrieg',
        minZoom: 1.8,
        description: 'Am 1. September 1939 überfällt Deutschland Polen und löst den Zweiten Weltkrieg aus.',
        details: 'Mit einem fingierten Überfall auf einen deutschen Radiosender als Vorwand marschierte die Wehrmacht in Polen ein. England und Frankreich erklärten daraufhin Deutschland den Krieg – aber Polen war schon verloren, auch weil die Sowjetunion von Osten einmarschierte. Der Zweite Weltkrieg hatte begonnen, der am Ende 70 Millionen Menschenleben kosten sollte.'
    },

    {
        year: 1940,
        title: 'Frankreich kapituliert',
        minZoom: 3.0,
        description: 'Deutschland besiegt Frankreich in nur sechs Wochen und demütigt es am selben Ort wie 1918.',
        details: 'Die Wehrmacht umging die Maginot-Linie durch den Ardennen-Wald, den niemand für passierbar hielt, und schnitt die alliierten Armeen ab. Frankreich kapitulierte nach nur sechs Wochen – eine Schockwelle für die ganze Welt. Hitler ließ den Waffenstillstand in demselben Eisenbahnwaggon unterzeichnen, in dem Deutschland 1918 kapituliert hatte, um Frankreich zu demütigen.'
    },
    {
        year: 1940,
        title: 'Luftschlacht England',
        minZoom: 5.0,
        description: 'Die Royal Air Force verhindert eine deutsche Invasion Englands in der Luftschlacht.',
        details: 'Hitler wollte England durch Luftüberlegenheit zur Kapitulation zwingen, bevor er die Invasion wagte. Aber die britische Luftwaffe, unterstützt von Radar und tapferen Piloten, hielt stand. Göring wechselte von Angriffen auf Flugplätze zu Angriffen auf London – ein taktischer Fehler, der England rettete. Es war Hitlers erste deutliche Niederlage.'
    },
    {
        year: 1941,
        title: 'Angriff auf UdSSR',
        minZoom: 2.0,
        description: 'Mit drei Millionen Soldaten überfällt Deutschland die Sowjetunion – ein Vernichtungskrieg.',
        details: 'Unternehmen Barbarossa war kein normaler Krieg, sondern ein rassenideologischer Vernichtungskrieg: Kommissare sollten sofort erschossen, Gefangene verhungert und die slawische Bevölkerung versklavt oder vernichtet werden. Der Angriff kam militärisch zunächst erfolgreich voran, aber der Widerstand der Sowjets war härter als erwartet. Hitlers Entscheidung, gleichzeitig gegen die UdSSR und England zu kämpfen, war strategisch verhängnisvoll.'
    },
    {
        year: 1941,
        title: 'Pearl Harbor',
        minZoom: 3.5,
        description: 'Japans Überfall auf Pearl Harbor zieht die USA in den Weltkrieg.',
        details: 'Am 7. Dezember 1941 griffen japanische Flugzeuge überraschend den amerikanischen Marinestützpunkt Pearl Harbor auf Hawaii an. Amerika trat in den Krieg ein, und Hitler erklärte den USA seinerseits den Krieg – ein fataler Fehler, der die überlegenen amerikanischen Ressourcen gegen Deutschland mobilisierte. Von diesem Moment an war Deutschlands Niederlage nur noch eine Frage der Zeit.'
    },
    {
        year: 1942,
        title: 'Wannseekonferenz',
        minZoom: 2.0,
        description: 'NS-Funktionäre koordinieren auf der Wannseekonferenz die Vernichtung aller europäischen Juden.',
        details: 'In einer Villa am Wannsee berieten hochrangige NS-Vertreter, wie die „Endlösung der Judenfrage" organisiert werden sollte. In weniger als zwei Stunden wurde die Ermordung von elf Millionen Menschen bürokratisch geplant. Der Holocaust war damit nicht eine spontane Eskalation, sondern ein systematisch geplanter Völkermord – das schlimmste Verbrechen der Geschichte.'
    },
    {
        year: 1942,
        title: 'Stalingrad',
        minZoom: 2.5,
        description: 'Die eingekesselte 6. Armee kapituliert bei Stalingrad – der Wendepunkt des Krieges.',
        details: 'Hitler hatte verboten, sich aus dem Kessel zurückzuziehen, obwohl die 6. Armee hoffnungslos eingeschlossen war. Nach monatelangem Häuserkampf und Hunger musste Feldmarschall Paulus im Februar 1943 kapitulieren – der erste Sieg, bei dem eine komplette deutsche Armee vernichtet wurde. Stalingrad war der psychologische Wendepunkt: Jetzt glaubten die Deutschen, dass Deutschland verlieren könnte.'
    },
    {
        year: 1943,
        title: 'Weiße Rose',
        minZoom: 4.0,
        description: 'Münchner Studenten der Weißen Rose werden für ihre Flugblätter hingerichtet.',
        details: 'Hans und Sophie Scholl sowie ihre Freunde verteilten Flugblätter, in denen sie zum Widerstand gegen das NS-Regime aufriefen. Sie wurden verraten, verhaftet und nach einem kurzen Schauprozess guillotiniert. Ihr Mut angesichts der unmittelbaren Todesgefahr machte sie zu Symbolen des deutschen Widerstands und ist bis heute unvergessen.'
    },
    {
        year: 1943,
        title: 'Kapitulation Italien',
        minZoom: 5.5,
        description: 'Mussolini wird gestürzt und Italien wechselt die Seiten.',
        details: 'Nach der alliierten Invasion Siziliens stürzten Italiens eigene Machthaber Mussolini und schlossen einen Waffenstillstand mit den Alliierten. Deutschland besetzte daraufhin Norditalien und befreite Mussolini, den es als Marionetten-Chef einer Restregierung einsetzte. Der schwierige Vormarsch der Alliierten durch Italien zog aber viele deutsche Truppen vom anderen Kriegsschauplätzen ab.'
    },
    {
        year: 1944,
        title: 'D-Day',
        minZoom: 2.0,
        description: 'Die Alliierten landen mit der größten Amphibienoperation der Geschichte in der Normandie.',
        details: 'Am 6. Juni 1944 stürmten amerikanische, britische und kanadische Soldaten unter enormen Verlusten die befestigten Strände der Normandie. Die zweite Front war eröffnet, und nun war Deutschland von Osten, Süden und Westen bedroht. Die Befreiung Westeuropas begann, und es war nur noch eine Frage der Zeit, wann Berlin fallen würde.'
    },
    {
        year: 1944,
        title: '20. Juli Attentat',
        minZoom: 3.5,
        description: 'Claus von Stauffenberg legt eine Bombe im Führerhauptquartier – Hitler überlebt.',
        details: 'Der Widerstandskreis um Stauffenberg plante, Hitler zu töten und eine neue Regierung zu bilden, die sofort Friedensverhandlungen aufnehmen sollte. Die Bombe explodierte, aber Hitler überlebte durch Zufall. Die Verschwörer wurden noch in derselben Nacht verhaftet und hingerichtet. Tausende mutmaßliche Mitwisser wurden in der Folge verfolgt.'
    },
    {
        year: 1945,
        title: 'Auschwitz befreit',
        minZoom: 3.5,
        description: 'Sowjetische Soldaten befreien Auschwitz und stoßen auf die Überreste des Holocaust.',
        details: 'Am 27. Januar 1945 betraten sowjetische Soldaten das Lager Auschwitz-Birkenau und fanden rund 7.000 ausgezehrte Überlebende sowie Berge von Kleidung, Haaren und Knochen. Über eine Million Menschen, vor allem Juden, waren hier ermordet worden. Das Datum wurde später zum internationalen Gedenktag für die Opfer des Holocaust.'
    },
    {
        year: 1945,
        title: 'Konferenz Jalta',
        minZoom: 5.0,
        description: 'Churchill, Roosevelt und Stalin teilen in Jalta die Nachkriegswelt unter sich auf.',
        details: 'Auf der Krimhalbinsel trafen die drei großen Siegermächte weitreichende Entscheidungen über die Nachkriegsordnung: Deutschland sollte in Besatzungszonen aufgeteilt, freie Wahlen in Osteuropa abgehalten werden. In der Realität sicherte Stalin seine Herrschaft über Osteuropa, und die Spannungen zwischen Ost und West, die den Kalten Krieg ankündigten, wurden bereits sichtbar.'
    },
    {
        year: 1945,
        title: 'Kriegsende Europa',
        minZoom: 1.8,
        description: 'Am 8. Mai 1945 kapituliert Deutschland bedingungslos – der Krieg in Europa ist vorbei.',
        details: 'Nach Hitlers Selbstmord im Bunker unterzeichneten die deutschen Generäle die bedingungslose Kapitulation. 60 Millionen Menschen hatten ihr Leben verloren, sechs Millionen Juden wurden im Holocaust ermordet, Europa lag in Trümmern. Deutschland hatte alles zerstört und war selbst zerstört – nun begann der lange Weg zum Wiederaufbau.'
    },
    {
        year: 1945,
        title: 'Atombomben Japan',
        minZoom: 3.0,
        description: 'Die USA werfen auf Hiroshima und Nagasaki Atombomben und zwingen Japan zur Kapitulation.',
        details: 'Am 6. August 1945 zerstörte die erste Atombombe Hiroshima, drei Tage später traf Nagasaki. Hunderttausende starben sofort oder an den Folgen der Strahlung. Japan kapitulierte, und der Zweite Weltkrieg war endgültig vorbei. Gleichzeitig hatte die Welt eine neue, existenzielle Bedrohung: Atomwaffen, die die ganze Menschheit vernichten konnten.'
    },
    {
        year: 1945,
        title: 'Potsdamer Konferenz',
        minZoom: 4.0,
        description: 'Die Siegermächte beschließen in Potsdam Deutschlands Zukunft als besetztes Land.',
        details: 'Truman, Stalin und Churchill bzw. Attlee trafen sich in Potsdam, um die Nachkriegsordnung für Deutschland festzulegen: Entnazifizierung, Demilitarisierung, Demokratisierung und Dezentralisierung. Deutschlands Ostgebiete wurden abgetrennt, Millionen Deutsche vertrieben. Die Differenzen zwischen West und Ost waren bereits so groß, dass eine gemeinsame Verwaltung Deutschlands kaum möglich war.'
    },
    {
        year: 1945,
        title: 'UN gegründet',
        minZoom: 4.5,
        description: 'Fünfzig Nationen gründen die Vereinten Nationen, um künftige Kriege zu verhindern.',
        details: 'Nach dem Scheitern des Völkerbundes sollte die neue Weltorganisation mit einem Sicherheitsrat, der militärisch eingreifen konnte, dauerhaften Frieden sichern. Die Charta legte Menschenrechte und die Gleichheit aller Nationen fest. In der Praxis wurde die UN schnell durch den Kalten Krieg gelähmt, spielte aber in vielen regionalen Konflikten eine wichtige vermittelnde Rolle.'
    },
    {
        year: 1946,
        title: 'Nürnberger Prozesse',
        minZoom: 4.0,
        description: 'Ein internationales Tribunal verurteilt die Hauptverantwortlichen der NS-Verbrechen.',
        details: 'Zum ersten Mal in der Geschichte wurden Staatenlenker für Kriegsverbrechen und Verbrechen gegen die Menschlichkeit vor Gericht gestellt. Zwölf Hauptangeklagte wurden zum Tode verurteilt, andere zu langen Gefängnisstrafen. Die Nürnberger Prozesse legten den Grundstein für das internationale Völkerstrafrecht und die Idee, dass es keine Immunität für Verbrechen gegen die Menschheit gibt.'
    },

    // ========== KALTER KRIEG ==========
    {
        year: 1947,
        title: 'Truman-Doktrin',
        minZoom: 4.0,
        description: 'US-Präsident Truman erklärt die Eindämmung des Kommunismus zur amerikanischen Außenpolitik.',
        details: 'In einer historischen Rede vor dem Kongress erklärte Truman, die USA würden überall in der Welt freie Völker unterstützen, die sich kommunistischem Druck widersetzten. Der Marshall-Plan pumpte Milliarden Dollar in den Wiederaufbau Westeuropas – mit dem Kalkül, wirtschaftliche Stabilität mache den Kommunismus unattraktiv. Der Kalte Krieg hatte offiziell begonnen.'
    },
    {
        year: 1948,
        title: 'Berlin-Blockade',
        minZoom: 2.0,
        description: 'Die Sowjets blockieren alle Zufahrten nach West-Berlin – die Luftbrücke rettet die Stadt.',
        details: 'Als die Westmächte eine Währungsreform in ihren Zonen durchführten, sperrten die Sowjets alle Land- und Wasserwege nach West-Berlin. Für fast ein Jahr versorgten amerikanische und britische Transportflugzeuge die zweieinhalb Millionen West-Berliner. Die Luftbrücke wurde zum Symbol des westlichen Widerstands, und die Sowjets hoben die Blockade schließlich erfolglos auf.'
    },
    {
        year: 1949,
        title: 'NATO-Gründung',
        minZoom: 3.5,
        description: 'Zwölf westliche Nationen schließen sich im NATO-Bündnis zusammen.',
        details: 'Die Nordatlantische Allianz basierte auf dem Prinzip der kollektiven Verteidigung: Ein Angriff auf ein Mitglied galt als Angriff auf alle. Damit war erstmals eine dauerhafte amerikanische Militärpräsenz in Europa garantiert. Die NATO bildete das militärische Rückgrat des Westens während des gesamten Kalten Krieges.'
    },
    {
        year: 1949,
        title: 'Gründung BRD/DDR',
        minZoom: 1.8,
        description: 'Aus den Besatzungszonen entstehen zwei deutsche Staaten mit entgegengesetzten Systemen.',
        details: 'Am 23. Mai 1949 trat das Grundgesetz der Bundesrepublik Deutschland in Kraft, am 7. Oktober 1949 konstituierte sich die DDR als sozialistischer Staat. Deutschland war nun geteilt: im Westen parlamentarische Demokratie und soziale Marktwirtschaft, im Osten Einparteienstaat nach sowjetischem Vorbild. Diese Teilung sollte 40 Jahre andauern.'
    },
    {
        year: 1950,
        title: 'Korea-Krieg',
        minZoom: 4.5,
        description: 'Nordkorea überfällt Südkorea und zieht Amerika und China in einen blutigen Stellvertreterkrieg.',
        details: 'Nordkorea marschierte in den Süden ein, die UN unter amerikanischer Führung griffen ein, und als die Front sich der chinesischen Grenze näherte, intervenierte auch China. Der Krieg endete 1953 in einem Waffenstillstand ungefähr auf der Ausgangslinie – keiner hatte gewonnen. Korea wurde zur bleibenden Teilung verurteilt und ist bis heute ein gefährlicher Konfliktherd.'
    },
    {
        year: 1951,
        title: 'Montanunion',
        minZoom: 2.5,
        description: 'Deutschland und Frankreich legen ihre Kohle- und Stahlindustrie in eine gemeinsame Behörde.',
        details: 'Die Europäische Gemeinschaft für Kohle und Stahl war ein genialer Plan: Indem die Rohstoffe für die Rüstungsindustrie unter gemeinsame Verwaltung gestellt wurden, sollte ein neuer Krieg zwischen Frankreich und Deutschland unmöglich werden. Es war der erste Schritt der europäischen Integration und wurde zum Vorbild für die spätere Europäische Gemeinschaft.'
    },
    {
        year: 1953,
        title: 'Stalin stirbt',
        minZoom: 4.0,
        description: 'Nach Stalins Tod beginnt in der Sowjetunion ein vorsichtiges „Tauwetter".',
        details: 'Stalins Tod im März 1953 beendete eine Herrschaft, die Millionen Sowjetbürger das Leben gekostet hatte. Sein Nachfolger Chruschtschow begann eine „Entstalinisierung": In einer Geheimrede verurteilte er Stalins Verbrechen, und das Klima im Sowjetreich wurde etwas milder. Aber das System der Diktatur blieb bestehen, wie die Niederschlagung des ungarischen Aufstands 1956 bewies.'
    },
    {
        year: 1953,
        title: 'Aufstand 17. Juni',
        minZoom: 2.0,
        description: 'Ostdeutsche Arbeiter erheben sich gegen das SED-Regime und werden von Sowjetpanzern niedergeschlagen.',
        details: 'Was als Protest gegen erhöhte Arbeitsnormen in Ostberlin begann, wurde schnell zu einem landesweiten Volksaufstand gegen die SED-Diktatur. Sowjetische Panzer rollten in die Städte und erstickten den Aufstand gewaltsam. Für die DDR-Führung war es ein Schock, der zeigte, wie unbeliebt das Regime war; für den Westen wurde der 17. Juni zum nationalen Gedenktag.'
    },
    {
        year: 1955,
        title: 'Warschauer Pakt',
        minZoom: 4.5,
        description: 'Die Sowjetunion bindet ihre Satellitenstaaten im Warschauer Pakt militärisch zusammen.',
        details: 'Als Antwort auf den NATO-Beitritt Westdeutschlands schloss die UdSSR mit sieben osteuropäischen Staaten ein Militärbündnis. Der Warschauer Pakt war jedoch kein gleichberechtigtes Bündnis: Die Sowjetunion bestimmte, und die anderen gehorchten – wie Ungarn 1956 und die Tschechoslowakei 1968 schmerzhaft erfahren mussten. Europa war nun in zwei militärische Blöcke geteilt.'
    },
    {
        year: 1956,
        title: 'Ungarn-Aufstand',
        minZoom: 4.0,
        description: 'Ungarns Freiheitsrevolution wird von sowjetischen Panzern brutal niedergewalzt.',
        details: 'Angestachelt durch Chruschtschows Entstalinisierung, erhoben sich die Ungarn und wählten den Reformer Imre Nagy zum Ministerpräsidenten. Als Ungarn ankündigte, den Warschauer Pakt zu verlassen, marschierte die Rote Armee ein. Rund 2.500 Ungarn starben, 200.000 flohen in den Westen. Der Westen schaute weg – er war zu vertieft in die Suez-Krise.'
    },
    {
        year: 1957,
        title: 'Sputnik-Schock',
        minZoom: 4.5,
        description: 'Die Sowjets schießen den ersten Satelliten ins All und erschüttern das westliche Selbstvertrauen.',
        details: 'Das Piepen von Sputnik aus dem All versetzte den Westen in Schock: Wenn die Sowjets Satelliten in den Orbit bringen konnten, konnten sie auch Atombomben in Raketen stecken und Amerika treffen. Das Wettrüsten im Weltraum begann, mit Milliarden-Investitionen in Raumfahrt und Wissenschaft. Letztendlich wurde das Apollo-Programm zum amerikanischen Triumph.'
    },
    {
        year: 1957,
        title: 'Römische Verträge',
        minZoom: 2.0,
        description: 'Sechs europäische Nationen unterzeichnen die Römischen Verträge und gründen die EWG.',
        details: 'Die Europäische Wirtschaftsgemeinschaft schaffte einen gemeinsamen Markt ohne Zölle und legte den Grundstein für die heutige Europäische Union. Die Idee dahinter war, die Volkswirtschaften so eng miteinander zu verflechten, dass ein Krieg wirtschaftlich unmöglich würde. Es war ein mutiger Schritt, dem Deutschland und Frankreich als treibende Kräfte voranstanden.'
    },
    {
        year: 1961,
        title: 'Bau der Mauer',
        minZoom: 1.8,
        description: 'Die DDR schließt in der Nacht vom 12. auf den 13. August Berlin mit einer Mauer ab.',
        details: 'Dreieinhalb Millionen Menschen waren seit 1949 aus der DDR in den Westen geflohen – viele davon über Berlin. Um diese Massenflucht zu stoppen, ließ SED-Chef Ulbricht in einer Nacht Stacheldraht und dann Mauer bauen. Familien wurden über Nacht getrennt, und wer zu fliehen versuchte, riskierte sein Leben. Die Mauer wurde zum Symbol der Unfreiheit und der deutschen Teilung.'
    },
    {
        year: 1962,
        title: 'Kubakrise',
        minZoom: 2.0,
        description: 'Dreizehn Tage lang steht die Welt am Rand eines Atomkrieges.',
        details: 'Als Amerika entdeckte, dass die Sowjets auf Kuba Raketen stationierten, verhängte Kennedy eine Seeblockade. Für 13 Tage waren die Finger der Mächte am Abzug, und Atomkrieg schien möglich. Am Ende lenkte Chruschtschow ein und zog die Raketen ab; im Gegenzug sicherte Kennedy zu, Kuba nicht anzugreifen und zog US-Raketen aus der Türkei ab. Es war die gefährlichste Krise des Kalten Krieges.'
    },
    {
        year: 1963,
        title: 'Kennedy in Berlin',
        minZoom: 4.0,
        description: 'Kennedy verspricht den Berlinern mit den Worten „Ich bin ein Berliner" amerikanischen Schutz.',
        details: 'Nur zwei Jahre nach dem Mauerbau besuchte Kennedy West-Berlin und hielt eine bewegende Rede vor Hunderttausenden jubelnden Menschen. Sein Satz zeigte, dass Amerika die Berliner nicht allein ließ – eine wichtige Botschaft nach der schmerzhaften Erfahrung des Mauerbaus. Der Besuch wurde zu einem der emotionalsten Momente des Kalten Krieges.'
    },
    {
        year: 1968,
        title: 'Prager Frühling',
        minZoom: 2.5,
        description: 'Tschechoslowakiens Reformkommunismus wird durch sowjetische Panzer zertreten.',
        details: 'Alexander Dubček wollte einen „Sozialismus mit menschlichem Antlitz" schaffen: Pressefreiheit, politischen Pluralismus und wirtschaftliche Reformen. Die Sowjetunion sah ihre Kontrolle über den Ostblock in Gefahr und ließ Panzer einmarschieren. Prager Bürger stellten sich den Panzern in den Weg – vergeblich. Die Breschnew-Doktrin besagte: Sozialistischen Errungenschaften wird die UdSSR immer verteidigen.'
    },
    {
        year: 1969,
        title: 'Mondlandung',
        minZoom: 4.0,
        description: 'Neil Armstrong betritt als erster Mensch den Mond und erfüllt Kennedys Versprechen.',
        details: 'Am 20. Juli 1969 setzte Apollo 11 auf dem Mond auf, und Armstrong sprach seinen historischen Satz über einen kleinen Schritt für einen Menschen und einen großen Sprung für die Menschheit. Amerika hatte das Wettrennen ins All gewonnen und das von Kennedy 1961 gegebene Versprechen eingelöst. Die Mondlandung war ein Triumph der Wissenschaft und des menschlichen Erfindungsgeistes.'
    },
    {
        year: 1969,
        title: 'Brandt Kanzler',
        minZoom: 3.5,
        description: 'Willy Brandt wird Bundeskanzler und leitet eine neue Ostpolitik der Annäherung ein.',
        details: 'Mit dem Slogan „Wir wollen mehr Demokratie wagen" verkörperte Brandt einen neuen Aufbruch. Seine Ostpolitik des „Wandels durch Annäherung" versuchte, durch Kontakte und Gesprächsbereitschaft die Lage der Menschen in der DDR zu verbessern. Das war umstritten, aber erfolgreich: Reiseerleichterungen, Familienzusammenführungen und schließlich der Grundlagenvertrag wurden erreicht.'
    },
    {
        year: 1970,
        title: 'Kniefall Warschau',
        minZoom: 4.0,
        description: 'Willy Brandt kniet spontan vor dem Denkmal für die Opfer des Warschauer Ghettos.',
        details: 'Bei einem Staatsbesuch in Polen kniete Brandt am Mahnmal für die ermordeten Juden des Warschauer Ghettos nieder – spontan, ohne Absprache. Ein Journalist beschrieb es so: „Er tat, was die taten, die nichts zu sagen hatten." Die Geste wurde weltberühmt als Symbol der deutschen Bereitschaft zur Verantwortung und Versöhnung, und Brandt erhielt 1971 den Friedensnobelpreis.'
    },
    {
        year: 1972,
        title: 'Grundlagenvertrag',
        minZoom: 2.5,
        description: 'BRD und DDR erkennen sich erstmals gegenseitig als eigenständige Staaten an.',
        details: 'Der Grundlagenvertrag normalisierte die Beziehungen zwischen beiden deutschen Staaten: Es gab diplomatische Vertretungen, Reiseerleichterungen und Möglichkeiten zur Familienzusammenführung. Die BRD gab damit nicht das Ziel der Einheit auf, erkannte aber die politische Realität an. Für viele DDR-Bürger bedeutete es konkrete Verbesserungen im Alltag.'
    },
    {
        year: 1973,
        title: 'Ölkrise',
        minZoom: 4.5,
        description: 'Das arabische Ölembargo lässt die Energiepreise explodieren und beendet das Wirtschaftswunder.',
        details: 'Als Reaktion auf den Jom-Kippur-Krieg drosselten die arabischen Ölstaaten ihre Produktion und stoppten Lieferungen an westliche Länder. In Deutschland gab es autofreie Sonntage, und die Benzinpreise explodierten. Die Krise zeigte die gefährliche Abhängigkeit moderner Industriegesellschaften von billigem Öl und löste ein Umdenken in Energie- und Wirtschaftspolitik aus.'
    },
    {
        year: 1979,
        title: 'NATO-Doppelbeschluss',
        minZoom: 4.0,
        description: 'Die NATO beschließt Nachrüstung mit Pershing-II-Raketen und löst eine Friedensbewegung aus.',
        details: 'Als Antwort auf die sowjetischen SS-20-Mittelstreckenraketen beschloss die NATO, neue Raketen in Westeuropa zu stationieren – aber zunächst noch einmal Abrüstungsverhandlungen anzubieten. Der Doppelbeschluss löste die größte Friedensbewegung in der Geschichte der Bundesrepublik aus: Hunderttausende demonstrierten gegen die Nachrüstung. Letztlich wurden die Raketen stationiert, und der Druck führte zum INF-Vertrag.'
    },
    {
        year: 1985,
        title: 'Gorbatschow',
        minZoom: 2.0,
        description: 'Michail Gorbatschow wird Generalsekretär und leitet mit Glasnost und Perestroika Reformen ein.',
        details: 'Der junge, energische Gorbatschow erkannte, dass das sowjetische System reformiert werden musste, um zu überleben. Glasnost (Offenheit) erlaubte kritischere Medien, Perestroika (Umbau) sollte die Wirtschaft reformieren. Doch die Reformen öffneten eine Büchse der Pandora: In Osteuropa wuchsen die Freiheitsbewegungen, und am Ende überlebte das System die Reformen nicht.'
    },
    {
        year: 1986,
        title: 'Tschernobyl',
        minZoom: 4.0,
        description: 'Die Explosion des Reaktors in Tschernobyl ist die schlimmste Atomkatastrophe der Geschichte.',
        details: 'In der Nacht zum 26. April 1986 explodierte Reaktorblock 4 des Atomkraftwerks Tschernobyl in der Ukraine. Eine radioaktive Wolke zog über Europa, und weite Gebiete wurden auf Jahrzehnte verseucht. Die Katastrophe erschütterte das Vertrauen in die Atomkraft weltweit und stärkte die Anti-Atomkraft-Bewegung enorm. In der Sowjetunion zwang sie Gorbatschow zur Transparenz.'
    },
    {
        year: 1989,
        title: 'Mauerfall',
        minZoom: 1.8,
        description: 'Am 9. November 1989 öffnet die DDR die Grenzen – die Mauer fällt.',
        details: 'SED-Sprecher Günter Schabowski verkündete versehentlich, die neuen Reiseregelungen gälten „sofort, unverzüglich". Tausende DDR-Bürger strömten zu den Grenzübergängen, und überforderte Grenzwächter öffneten die Schranken. Jubelnde Menschen kletterten auf die Mauer, Familien trafen sich nach jahrelanger Trennung. Der Mauerfall war der emotionalste Moment der deutschen Nachkriegsgeschichte.'
    },
    {
        year: 1990,
        title: 'Wiedervereinigung',
        minZoom: 1.8,
        description: 'Am 3. Oktober 1990 tritt die DDR der Bundesrepublik bei – Deutschland ist wieder ein Staat.',
        details: 'Nach 40 Jahren Teilung war Deutschland wieder vereint. Der Weg dahin war schneller gegangen als jeder geglaubt hatte: Von der Maueröffnung bis zur Einheit vergingen nur elf Monate. Der „Zwei-plus-Vier-Vertrag" mit den vier Siegermächten schuf die internationale Grundlage, und am 3. Oktober wurde ein neuer Nationalfeiertag geboren. Die Herausforderungen des Zusammenwachsens sollten noch Jahrzehnte dauern.'
    },
    {
        year: 1991,
        title: 'Ende der Sowjetunion',
        minZoom: 2.0,
        description: 'Die Sowjetunion löst sich auf – der Kalte Krieg ist zu Ende.',
        details: 'Nach einem gescheiterten Putsch konservativer Kommunisten gegen Gorbatschow erklärten die Teilrepubliken eine nach der anderen ihre Unabhängigkeit. Am 25. Dezember 1991 senkte Gorbatschow die sowjetische Flagge über dem Kreml und trat zurück. 15 neue Staaten entstanden, und das 20. Jahrhundert, das mit dem Ersten Weltkrieg begonnen hatte, war zu Ende.'
    },

    // ========== EUROPÄISCHE INTEGRATION ==========
    {
        year: 1992,
        title: 'Maastricht-Vertrag',
        minZoom: 2.5,
        description: 'Der Maastricht-Vertrag verwandelt die EWG in die Europäische Union.',
        details: 'Mit dem Vertrag von Maastricht vertiefte Europa die Integration entscheidend: Eine gemeinsame Währung wurde beschlossen, europäische Staatsbürgerschaft eingeführt und eine gemeinsame Außen- und Sicherheitspolitik angestrebt. Es war der mutigste Integrationsschritt seit der EWG-Gründung und machte aus einem Wirtschaftsbündnis eine politische Union.'
    },
    {
        year: 2002,
        title: 'Euro-Bargeld',
        minZoom: 2.0,
        description: 'Zwölf europäische Staaten tauschen ihre nationalen Währungen gegen den Euro.',
        details: 'Am 1. Januar 2002 wurden in zwölf Ländern die alten Scheine und Münzen durch den Euro ersetzt. Für Deutschland bedeutete es den Abschied von der D-Mark, die seit dem Wirtschaftswunder Stabilität symbolisiert hatte. Der Euro wurde zur zweitwichtigsten Währung der Welt und zum greifbaren Symbol europäischer Einheit im Alltag der Bürger.'
    },
    {
        year: 2004,
        title: 'EU-Osterweiterung',
        minZoom: 3.5,
        description: 'Zehn neue Mitglieder aus Osteuropa treten der EU bei und überwinden die Teilung des Kontinents.',
        details: 'Mit dem Beitritt von Polen, Tschechien, der Slowakei, Ungarn, Slowenien, den baltischen Staaten, Malta und Zypern wuchs die EU von 15 auf 25 Mitglieder. Es war die größte Erweiterung in der Geschichte der Union und heilte symbolisch die Wunden des Kalten Krieges. Zum ersten Mal seit Jahrhunderten war Europa in einem Friedensraum mit freiem Personenverkehr vereint.'
    }
];
