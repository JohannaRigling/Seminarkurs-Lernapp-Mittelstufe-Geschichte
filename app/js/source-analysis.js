// ===== QUELLENARBEIT: KARIKATUREN & HISTORIKERTEXTE =====

let currentQuellenarbeitType = 'karikatur';

// =============================================
// DATEN: KARIKATUREN
// =============================================
const KARIKATUREN_DATA = {
    'französische-revolution': [
        {
            id: 'fr-kar-1',
            title: '„Der dritte Stand trägt die Last" (1789)',
            beschreibung: 'Die Karikatur zeigt einen gebückten, ärmlich gekleideten Mann – er symbolisiert den Dritten Stand. Auf seinem Rücken sitzen bequem ein fetter Adliger mit Schwert und ein Priester mit Kreuz. Beide lachen und schauen weg. Auf dem Rücken des Mannes ist ein großer Sack mit der Aufschrift „Steuern & Abgaben" zu sehen. Der Mann schwitzt und bricht fast zusammen, während der Boden unter ihm mit leeren Taschen bedeckt ist.',
            fragen: [
                { frage: 'Beschreibe die Karikatur: Welche Figuren sind zu sehen, und was tun sie?', hinweis: 'Gehe auf alle drei Figuren, ihre Kleidung, Haltung und Symbole ein.' },
                { frage: 'Erkläre, welche gesellschaftliche Situation die Karikatur darstellt. Beziehe dich auf das Ständesystem.', hinweis: 'Wer sind die drei Stände? Welche Rechte und Pflichten hatte jeder Stand?' },
                { frage: 'Beurteile die Botschaft der Karikatur: Welche Wirkung sollte sie beim Betrachter erzielen?', hinweis: 'Für wen war die Karikatur gedacht? Welche Gefühle wollte der Zeichner wecken?' }
            ]
        },
        {
            id: 'fr-kar-2',
            title: '„Liberté, Égalité, Fraternité" – Revolutionsallegorie (1793)',
            beschreibung: 'Eine Allegorie der Freiheit als Frau mit Jakobinermütze und Trikolore steht triumphierend auf zerbrochenen Ketten und einem umgestürzten Thron. In einer Hand hält sie die Verfassung, in der anderen eine Fackel. Im Hintergrund brennt eine Burg (Symbol des Adels), und jubelnde Menschen umringen sie. Die Szene ist dynamisch und hell ausgeleuchtet – ein Kontrast zur Dunkelheit links im Bild, wo geflohene Adlige dargestellt sind.',
            fragen: [
                { frage: 'Beschreibe die Allegorie: Welche Symbole erkennst du, und was bedeuten sie?', hinweis: 'Jakobinermütze, Ketten, Thron, Fackel, Trikolore – erkläre jedes Symbol.' },
                { frage: 'Erkläre, welche Ideale der Französischen Revolution in dieser Allegorie dargestellt werden.', hinweis: 'Denke an Freiheit, Gleichheit, Brüderlichkeit und den Sturz des Ancien Régime.' },
                { frage: 'Untersuche: Inwiefern entspricht dieses Bild der tatsächlichen Entwicklung der Revolution? Wo weicht es von der Realität ab?', hinweis: 'Denke an Terror, Gewalt, Guillotine – war die Revolution wirklich so glorreich?' }
            ]
        }
    ],

    'industrialisierung': [
        {
            id: 'ind-kar-1',
            title: '„Der Moloch Fabrik" (ca. 1870)',
            beschreibung: 'Eine riesige Fabrik ist als Monster dargestellt – der Schornstein ist ein geöffneter Rachen, der dunklen Rauch ausstößt. Kleine Arbeiterfiguren werden wie in einen Schlund hineingezogen, während auf der anderen Seite Geldstücke herausfallen und ein fetter Fabrikbesitzer sie auffängt. Kinder sind unter den Arbeitern zu erkennen. Der Himmel über der Fabrik ist schwarz, darunter ein kleines Dorf, das vom Rauch erstickt wird.',
            fragen: [
                { frage: 'Beschreibe die Karikatur und benenne alle wichtigen Bildelemente.', hinweis: 'Achte auf: Fabrik, Arbeiter, Kinder, Fabrikbesitzer, Rauch, Geld.' },
                { frage: 'Erkläre, welche sozialen Probleme der Industrialisierung der Zeichner kritisiert.', hinweis: 'Kinderarbeit, Arbeitsbedingungen, Lohnungleichheit, Umweltverschmutzung.' },
                { frage: 'Beurteile: Ist die Darstellung in der Karikatur fair und ausgewogen? Was fehlt in der Darstellung?', hinweis: 'Welche positiven Aspekte der Industrialisierung werden nicht gezeigt? Warum?' }
            ]
        },
        {
            id: 'ind-kar-2',
            title: '„Fortschritt" – Zwei Seiten der Industrialisierung (1880)',
            beschreibung: 'Das Bild ist geteilt: Auf der linken Seite (beschriftet „Früher") sieht man ein idyllisches Dorf mit Bauern auf dem Feld, sauberer Luft und spielenden Kindern. Auf der rechten Seite (beschriftet „Heute") rauchen Fabrikschlote, ein Zug rast durch die Landschaft, Arbeiter schleppen Kisten, Kinder betteln. Oben in der Mitte hält ein Engel eine Waage: Links liegt „Natur & Gemeinschaft", rechts liegt „Wohlstand & Fortschritt" – die Waage kippt nach rechts.',
            fragen: [
                { frage: 'Beschreibe die zwei Seiten der Karikatur. Was wird jeweils dargestellt?', hinweis: 'Gehe auf beide Hälften ausführlich ein.' },
                { frage: 'Erkläre, welche Ambivalenz des Fortschritts der Zeichner zeigt.', hinweis: 'Was geht verloren, was wird gewonnen? Wer profitiert, wer verliert?' },
                { frage: 'Erörtre: Überwiegen die Vorteile oder die Nachteile der Industrialisierung für die Bevölkerung der damaligen Zeit?', hinweis: 'Berücksichtige verschiedene Bevölkerungsgruppen: Fabrikbesitzer, Arbeiter, Kinder, Bauern.' }
            ]
        }
    ],

    'imperialismus': [
        {
            id: 'imp-kar-1',
            title: '„Der Wettlauf um Afrika" (1884)',
            beschreibung: 'Europäische Staatsmänner in Frack und Zylinder stehen um einen großen Tisch, auf dem eine Karte Afrikas liegt. Sie streiten und reißen an der Karte, jeder versucht das größte Stück zu ergreifen. Eine kleine Figur, die einen Afrikaner darstellt, steht außen vor der Szene und schaut zu – ohne Stimme, ohne Mitspracherecht. Beschriftungen zeigen Länder wie „England", „Frankreich", „Deutschland", „Belgien" auf den Figuren.',
            fragen: [
                { frage: 'Beschreibe die Szene: Wer ist abgebildet, was geschieht, und welche Symbole verwendete der Zeichner?', hinweis: 'Achte auf die Figuren, ihre Kleidung, die Karte, die afrikanische Figur am Rand.' },
                { frage: 'Erkläre, welche historische Situation die Karikatur zeigt. Was war die „Berliner Konferenz" 1884/85?', hinweis: 'Welche europäischen Mächte nahmen teil? Was wurde beschlossen? Wer war nicht eingeladen?' },
                { frage: 'Bewerte: Wie bewertest du das Verhalten der europäischen Mächte aus heutiger Sicht?', hinweis: 'Denke an Menschenrechte, Selbstbestimmungsrecht, Folgen des Kolonialismus.' }
            ]
        },
        {
            id: 'imp-kar-2',
            title: '„Die Last des weißen Mannes" – Antwort auf Kipling (1899)',
            beschreibung: 'Eine Karikatur als Reaktion auf Kiplings Gedicht: Zu sehen sind zwei Männer, die schwer beladene Körbe tragen. Der eine (beschriftet „der weiße Mann") trägt einen Korb mit Waren, Bibeln und Waffen. Im Korb des anderen (beschriftet „der kolonisierte Mann") liegen zerbrochene Kulturgüter, Fesseln und ein Totenschädel. Beide Männer bücken sich unter ihrer Last – aber nur einer lächelt, der andere blickt verzweifelt.',
            fragen: [
                { frage: 'Beschreibe den Inhalt beider Körbe. Was trägt jeder der beiden Männer?', hinweis: 'Gehe auf jedes Symbol in den Körben ein.' },
                { frage: 'Erkläre, wie die Karikatur die Ideologie des „zivilisatorischen Auftrags" kritisiert.', hinweis: 'Was behaupteten Europäer über ihre Mission in den Kolonien? Was war die Realität?' },
                { frage: 'Beurteile: Welche Folgen hatte der Kolonialismus für die kolonisierten Völker?', hinweis: 'Denke an kulturelle Zerstörung, wirtschaftliche Ausbeutung, Zwangsarbeit, Widerstand.' }
            ]
        }
    ],

    'erster-weltkrieg': [
        {
            id: 'wk1-kar-1',
            title: '„Der Domino-Effekt" – Bündnissysteme 1914',
            beschreibung: 'Dominosteine stehen in einer langen Reihe, beschriftet mit den Namen europäischer Staaten: Österreich-Ungarn, Deutschland, Russland, Frankreich, England. Ein Schuss fällt (beschriftet „Sarajevo") und kippt den ersten Stein, der alle anderen nacheinander umwirft. Im Hintergrund sitzt der Tod als Sensenmann und wartet lächelnd. Am Ende der Reihe liegt ein Berg aus Leichen.',
            fragen: [
                { frage: 'Beschreibe die Karikatur: Welches Bild verwendet der Zeichner, und welche Elemente sind zu sehen?', hinweis: 'Erkläre die Dominosteine, die Beschriftungen, den Schuss und den Sensenmann.' },
                { frage: 'Erkläre, was die Karikatur über die Ursachen des Ersten Weltkriegs aussagt.', hinweis: 'Was war Sarajevo? Wie hingen die Bündnissysteme zusammen? Warum eskalierte der Konflikt so schnell?' },
                { frage: 'Untersuche: Ist die Darstellung des „Domino-Effekts" eine vollständige Erklärung für den Kriegsausbruch 1914? Was fehlt?', hinweis: 'Denke an: Imperialismus, Nationalismus, Rüstungswettlauf, Kriegsbegeisterung.' }
            ]
        },
        {
            id: 'wk1-kar-2',
            title: '„Willkommen im Schützengraben" – Antikriegskarikatur (1916)',
            beschreibung: 'Ein junger Soldat in glänzender Uniform (frisch von der Rekrutierung) tritt jubelnd in eine Tür, über der „Front" steht. Auf der anderen Seite wartet kein Heldenkampf, sondern ein schlammiger Graben, erschöpfte Soldaten, Ratten, und am Horizont Explosionen. Rechts steht ein alter Soldat mit leerem Blick und zerrissenem Mantel, der dem Neuankömmling eine zerrissene Fahne überreicht mit der Aufschrift: „Dein Abenteuer."',
            fragen: [
                { frage: 'Beschreibe die zwei Welten in der Karikatur: Was erwartet der Soldat, und was erwartet ihn wirklich?', hinweis: 'Vergleiche die Darstellung des Soldaten vor und nach der Tür.' },
                { frage: 'Erkläre, wie Propaganda den Krieg am Anfang dargestellt hat, und wie die Realität des Stellungskriegs wirklich war.', hinweis: 'Kriegsbegeisterung 1914 vs. Materialschlacht, Grabenkrieg, Verluste.' },
                { frage: 'Beurteile: Welche Wirkung sollte diese Karikatur auf die Bevölkerung haben? Für wen war sie gedacht?', hinweis: 'War sie eine Propaganda- oder eine Antikriegskarikatur? Woran erkennst du das?' }
            ]
        }
    ],

    'weimarer-republik': [
        {
            id: 'wr-kar-1',
            title: '„Das Dolchstoß-Märchen" – Reaktion der Linken (1924)',
            beschreibung: 'Eine Karikatur zeigt einen deutschen Soldaten in Uniform, der tapfer vorwärts kämpft. Von hinten sticht ihm ein Zivilist einen Dolch in den Rücken – der Zivilist ist als Händler mit Geldsack dargestellt. Im Vordergrund lachen Militärgeneräle und zeigen auf die Szene. Unten steht: „Die Legende vom Dolchstoß – wer wirklich schuld ist." Die Botschaft ist eine Gegendarstellung zur rechten Dolchstoßlegende.',
            fragen: [
                { frage: 'Beschreibe die Figuren und ihre Handlungen in der Karikatur.', hinweis: 'Wer sticht, wer lacht, wer kämpft – und was trägt jede Figur?' },
                { frage: 'Erkläre, was die „Dolchstoßlegende" war und wie die Karikatur sie kritisiert.', hinweis: 'Wer verbreitete die Dolchstoßlegende? Gegen wen richtete sie sich? Was sagt diese Karikatur darüber?' },
                { frage: 'Beurteile: Welche Folgen hatte die Dolchstoßlegende für die Weimarer Republik?', hinweis: 'Wie schwächte sie die Demokratie? Wer profitierte politisch von dieser Lüge?' }
            ]
        },
        {
            id: 'wr-kar-2',
            title: '„Die schwankende Demokratie" (1932)',
            beschreibung: 'Eine Karikatur zeigt die Weimarer Republik als Gebäude auf einem schwankenden Fundament. Auf dem Dach stehen die demokratischen Parteien und streiten miteinander. An den Mauern nagen Ratten, beschriftet mit „Arbeitslosigkeit", „Inflation", „Radikalismus". Von links ziehen rote Fahnen (KPD), von rechts Hakenkreuzfahnen (NSDAP) – beide reißen an den Stützpfeilern. Das Gebäude neigt sich bedenklich.',
            fragen: [
                { frage: 'Beschreibe das Gebäude und alle Elemente, die es bedrohen.', hinweis: 'Nenne alle Beschriftungen und was sie symbolisieren.' },
                { frage: 'Erkläre, welche Krisen die Weimarer Republik zwischen 1929 und 1933 erschütterten.', hinweis: 'Weltwirtschaftskrise, Massenarbeitslosigkeit, politische Radikalisierung, Straßenkämpfe.' },
                { frage: 'Erörtre: War der Untergang der Weimarer Republik unvermeidlich, oder gab es Möglichkeiten sie zu retten?', hinweis: 'Denke an: Verfassungsschwächen, politische Fehler, wirtschaftliche Faktoren, historische Alternativen.' }
            ]
        }
    ],

    'revolution-1848': [
        {
            id: 'r48-kar-1',
            title: '„Der Frühling der Völker" (März 1848)',
            beschreibung: 'Eine strahlende Frühlingssonne mit menschlichem Gesicht geht über einer europäischen Stadtkulisse auf. Aus dem Boden wachsen Fahnen in den Farben verschiedener Nationen (Schwarz-Rot-Gold, Trikolore, etc.). Bürger in verschiedenen Trachten jubeln, Händchen haltend. Auf Bannern steht: „Freiheit!", „Einheit!", „Verfassung!". Im Hintergrund fliehen Monarchen mit Kronen davon, ihre Throne sind umgeworfen.',
            fragen: [
                { frage: 'Beschreibe die Symbolik der Karikatur: Welche Zeichen stehen für was?', hinweis: 'Sonne, Fahnen, Monarchen, Rufe – erkläre jedes Symbol.' },
                { frage: 'Erkläre, warum 1848 als „Frühling der Völker" bezeichnet wird. Welche Forderungen wurden in der Revolution erhoben?', hinweis: 'Nationale Einheit, Verfassung, Pressefreiheit, Volksbewaffnung, Ende der Adelsprivilegien.' },
                { frage: 'Beurteile: Warum scheiterte die Revolution von 1848 letztlich? Was blieb von ihr?', hinweis: 'Spaltung der Revolutionäre, Gegenschlag der Fürsten, fehlende Einigkeit, aber: erste gesamtdeutsche Nationalversammlung.' }
            ]
        },
        {
            id: 'r48-kar-2',
            title: '„Die Paulskirche – Parlament der Worte" (1848)',
            beschreibung: 'Die Frankfurter Paulskirche ist als riesige Windmühle dargestellt – die Reden der Abgeordneten sind der Wind, der die Flügel dreht, aber nichts antreibt. Abgeordnete reden endlos, Papierstapel mit Gesetzentwürfen häufen sich. Draußen warten hungrige Arbeiter und kämpfende Revolutionäre vergeblich. Ein Adliger schaut von einem Hügel zu und lächelt: „Sie reden – wir handeln."',
            fragen: [
                { frage: 'Beschreibe die Windmühlen-Metapher: Was kritisiert der Zeichner damit?', hinweis: 'Was produzieren Windmühlen? Was produziert das Parlament laut der Karikatur?' },
                { frage: 'Erkläre die Schwächen der Frankfurter Nationalversammlung. Warum wurde sie von Zeitgenossen kritisiert?', hinweis: 'Fehlende Machtmittel, endlose Debatten, kein eigenes Militär, Abhängigkeit von Fürsten.' },
                { frage: 'Nimm Stellung: War die Frankfurter Nationalversammlung trotz ihres Scheiterns historisch bedeutsam?', hinweis: 'Denke an die Grundrechtserklärung, das Verfassungsprojekt, die demokratische Tradition.' }
            ]
        }
    ],

    'nationalsozialismus': [
        {
            id: 'ns-kar-1',
            title: '„Der Weg ins Dritte Reich" – NS-Wahlplakat-Analyse (1932)',
            beschreibung: 'Ein NSDAP-Wahlplakat (keine echte Karikatur, sondern Propagandaanalyse): Zu sehen ist ein Meer aus erhobenen Händen, die alle in eine Richtung zeigen. Vorne steht eine heroische Figur mit Hakenkreuzfahne, die Massen anführt. Der Hintergrund ist tiefrot. Oben steht: „Hitler über Deutschland". Die Massen sind uniformiert, gleichförmig, gesichtslos.',
            fragen: [
                { frage: 'Beschreibe das Plakat: Welche Bildelemente, Farben und Texte sind zu sehen?', hinweis: 'Gehe auf Farben (Rot, Schwarz, Weiß), Figuren, Symbole und Komposition ein.' },
                { frage: 'Erkläre, welche Propagandatechniken die NSDAP in diesem Plakat einsetzt.', hinweis: 'Denke an: Führerkult, Massenbewegung, Emotionalisierung, Gleichschaltung, Gemeinschaft.' },
                { frage: 'Beurteile: Warum verfing diese Propaganda bei vielen Menschen in der Krise der frühen 1930er Jahre?', hinweis: 'Weltwirtschaftskrise, Massenarbeitslosigkeit, Vertrauenskrise in die Demokratie, Sehnsucht nach starker Führung.' }
            ]
        },
        {
            id: 'ns-kar-2',
            title: '„Der Hitlergruß" – Satirische Gegenkarikatur aus dem Exil (1933)',
            beschreibung: 'Ein Mann hebt enthusiastisch den rechten Arm zum Hitlergruß. Sein Arm ist jedoch mechanisch wie ein Automat – ein Uhrwerk im Körper dreht den Arm hoch und runter. Sein Gesicht ist leer, ausdruckslos, wie eine Puppe. Im Hintergrund stehen viele identische Männer, alle gleich, alle grüßen gleichzeitig. Oben steht: „Der neue deutsche Mensch."',
            fragen: [
                { frage: 'Beschreibe, welche Bildmittel der Zeichner verwendet, um seine Botschaft zu vermitteln.', hinweis: 'Uhrwerk, leeres Gesicht, Masse der identischen Figuren – was bedeutet das jeweils?' },
                { frage: 'Erkläre, welche Kritik an der nationalsozialistischen Gesellschaft in der Karikatur steckt.', hinweis: 'Was bedeutet Gleichschaltung? Wie versuchte der NS-Staat, die Menschen zu kontrollieren?' },
                { frage: 'Untersuche: Welche Risiken gingen Künstler und Karikaturisten ein, die den NS-Staat kritisierten?', hinweis: 'Denke an: Exil, KZ, Berufsverbot, Kurt Tucholsky, George Grosz.' }
            ]
        }
    ],

    'holocaust': [
        {
            id: 'hol-kar-1',
            title: '„Die Wannsee-Konferenz" – Historische Bildquelle (1942)',
            beschreibung: 'Kein humoristisches Bild, sondern eine ernste historische Bildquelle: Ein Zeitungsausschnitt aus dem „Völkischen Beobachter" von 1942 zeigt lächelnde NS-Funktionäre bei einer „Arbeitstagung" – gemeint ist die Wannseekonferenz. Die Bildunterschrift spricht von „Koordination". Was das Bild nicht zeigt: In diesem Raum wurde die systematische Vernichtung von Millionen Juden geplant.',
            fragen: [
                { frage: 'Beschreibe, was auf dem Zeitungsausschnitt zu sehen ist und welchen Eindruck er vermitteln soll.', hinweis: 'Wie werden die Männer dargestellt? Was suggeriert die Bildunterschrift?' },
                { frage: 'Erkläre, was die Wannseekonferenz wirklich war und was dort beschlossen wurde.', hinweis: 'Januar 1942, SS-Obergruppenführer Heydrich, Koordination der „Endlösung der Judenfrage".' },
                { frage: 'Beurteile: Was sagt uns die Diskrepanz zwischen dem NS-Bild und der historischen Realität über Propaganda aus?', hinweis: 'Wie verschleierten die Nazis die wahre Natur des Holocaust? Welche Sprache benutzten sie (Euphemismen)?' }
            ]
        },
        {
            id: 'hol-kar-2',
            title: '„Nie wieder!" – Nachkriegskarikatur zur Erinnerungskultur (1948)',
            beschreibung: 'Ein Skelett in KZ-Kleidung hält ein Schild mit der Aufschrift „Nie wieder!" und blickt auf eine Welt, in der Nationen beginnen, sich neu zu bewaffnen. Im Hintergrund Ruinen, aber auch neue Fabriken. Menschen gehen achtlos am Skelett vorbei. Unter dem Bild steht: „Wer erinnert sich noch?"',
            fragen: [
                { frage: 'Beschreibe die Symbolik: Was verkörpert das Skelett, und was zeigt der Hintergrund?', hinweis: 'Was bedeutet die KZ-Kleidung? Was bedeuten die Rüstungsfabriken? Was bedeuten die achtlosen Menschen?' },
                { frage: 'Erkläre, welche Warnung die Karikatur ausdrückt. An wen richtet sie sich?', hinweis: 'An welche Gefahr erinnert sie? Warum ist Erinnerungskultur wichtig?' },
                { frage: 'Nimm Stellung: Wie kann und muss heute an den Holocaust erinnert werden?', hinweis: 'Denke an: Schule, Gedenkstätten, Zeitzeugengespräche, Lehren für die Gegenwart.' }
            ]
        }
    ],

    'zweiter-weltkrieg': [
        {
            id: 'wk2-kar-1',
            title: '„Der Hitler-Stalin-Pakt" – Karikatur aus England (1939)',
            beschreibung: 'Zwei Figuren – Hitler im braunen Hemd mit Hakenkreuz, Stalin in grauer Uniform mit rotem Stern – verbeugen sich voreinander und reichen sich die Hand. Hinter ihrem Rücken halten beide je einen blutigen Dolch versteckt. Zwischen ihnen liegt eine zertrampelte polnische Fahne. Im Hintergrund ein Wegweiser: „Richtung Weltkrieg."',
            fragen: [
                { frage: 'Beschreibe, was die Karikatur zeigt – Figuren, Symbole und Hintergrund.', hinweis: 'Wer sind die Figuren? Was halten sie hinter dem Rücken? Was liegt zwischen ihnen?' },
                { frage: 'Erkläre, was der Hitler-Stalin-Pakt war und welche Folgen er hatte.', hinweis: 'August 1939, Nichtangriffspakt, geheimes Zusatzprotokoll, Teilung Polens, Beginn des Zweiten Weltkriegs.' },
                { frage: 'Beurteile: Warum schockierte der Pakt zwischen NS-Deutschland und der Sowjetunion die Welt?', hinweis: 'Ideologische Gegner schlossen Pakt – was sagte das über die Außenpolitik beider Diktatoren aus?' }
            ]
        },
        {
            id: 'wk2-kar-2',
            title: '„Der Atompilz" – Hiroshima, August 1945',
            beschreibung: 'Eine amerikanische Zeitungskarikatur nach Hiroshima: Ein riesiger Atompilz steigt über einer Stadt auf. Darunter steht in Großbuchstaben: „Frieden!" Ein Soldat sitzt auf einer Trümmergrenze, erschöpft, aber lächelnd. Im Schatten des Pilzes sieht man Tote. Der Kontrast zwischen dem triumphal klingenden „Frieden!" und den Toten darunter ist scharf.',
            fragen: [
                { frage: 'Beschreibe die Karikatur: Welche Elemente stehen im Widerspruch zueinander?', hinweis: 'Der Jubel über den Frieden vs. die sichtbaren Toten und der Atompilz.' },
                { frage: 'Erkläre, warum die USA die Atombombe auf Hiroshima und Nagasaki warfen und welche Folgen das hatte.', hinweis: 'Militärische Begründung (schnelles Kriegsende), humanitäre Katastrophe, Beginn des Atomzeitalters.' },
                { frage: 'Erörtre: War der Einsatz der Atombombe gerechtfertigt?', hinweis: 'Berücksichtige: Kriegsende ohne Invasion, Opferzahlen, Zivilbevölkerung, Alternative Szenarien, ethische Grundsätze.' }
            ]
        }
    ],

    'brd-ddr': [
        {
            id: 'bd-kar-1',
            title: '„Zwei Deutschland" – Vergleichskarikatur (1960)',
            beschreibung: 'Ein Bild zeigt zwei spiegelgleiche Deutsche an einem Tisch. Links sitzt der Westdeutsche, gut gekleidet, mit Coca-Cola und Volkswagen-Schlüssel. Rechts der Ostdeutsche, graue Kleidung, mit einem Trabant-Modell und einer Warteschlange-Nummer. Beide schauen misstrauisch auf den anderen. Über ihnen eine geteilte Deutschlandkarte. Der Tisch in der Mitte ist die Berliner Mauer.',
            fragen: [
                { frage: 'Beschreibe die Unterschiede zwischen den beiden Figuren und ihrer Ausstattung.', hinweis: 'Kleidung, Konsumgüter, Körpersprache, Symbole auf jeder Seite.' },
                { frage: 'Erkläre, welche Unterschiede zwischen BRD und DDR die Karikatur darstellt.', hinweis: 'Wirtschaftssystem, Lebensstandard, politisches System, Reisefreiheit, Konsumgesellschaft.' },
                { frage: 'Beurteile: War die Teilung Deutschlands für die Menschen damals ein Normalzustand oder ein Ausnahmezustand?', hinweis: 'Denke an: Mauerbau 1961, Fluchtversuche, innerdeutsche Beziehungen, Ostpolitik, Verwandte in beiden Teilen.' }
            ]
        },
        {
            id: 'bd-kar-2',
            title: '„Honecker am Volk vorbei" – DDR-Karikatur (1989, Samisdat)',
            beschreibung: 'Eine inoffizielle DDR-Karikatur (Samisdat-Blatt): Erich Honecker steht auf einem erhöhten Podium und spricht zu einem leeren Platz – alle Stühle sind verlassen. Hinter ihm ein Transparent: „40 Jahre DDR – Erfolge des Sozialismus!" Im Hintergrund ist eine Schlange von Menschen mit Koffern zu sehen, die in Richtung Ungarn/Westen zieht. Unterschrift: „Der Jubel ist unbeschreiblich."',
            fragen: [
                { frage: 'Erkläre die Ironie: Welchen Widerspruch stellt die Karikatur dar?', hinweis: 'Was feiert Honecker? Was passiert wirklich? Was bedeutet „unbeschreiblich" hier?' },
                { frage: 'Erkläre den historischen Kontext: Was geschah in der DDR im Herbst 1989?', hinweis: 'Massenausreise über Ungarn und Prag, Montagsdemonstrationen Leipzig, Mauerfall 9.11.1989.' },
                { frage: 'Untersuche: Welche Bedeutung hatte Samisdat-Kunst (inoffizielle Druckerzeugnisse) in der DDR?', hinweis: 'Wie äußerten sich DDR-Bürger, wenn öffentliche Kritik verboten war? Welche Risiken gingen sie ein?' }
            ]
        }
    ],

    'kalter-krieg': [
        {
            id: 'kk-kar-1',
            title: '„Der Nuklearer Abgrund" – Kubakrise 1962',
            beschreibung: 'Kennedy und Chruschtschow sitzen sich gegenüber auf riesigen Raketen, die über einem Abgrund schweben. Beide halten das andere Ende seiner Rakete fest. Darunter gähnt ein schwarzer Schlund mit der Aufschrift „Nuklearer Krieg". Beide Männer schwitzen, schauen sich in die Augen. Ein kleiner Engel flüstert zwischen ihnen: „Gebt nach – bitte."',
            fragen: [
                { frage: 'Beschreibe die Situation beider Männer: Was ist gefährlich an ihrer Position?', hinweis: 'Was symbolisieren die Raketen? Was passiert, wenn einer der Männer loslässt?' },
                { frage: 'Erkläre die Kubakrise 1962: Was waren Ursache, Verlauf und Lösung?', hinweis: 'Sowjetische Raketen auf Kuba, US-Seeblockade, 13 Tage am Rande des Atomkriegs, diplomatische Lösung.' },
                { frage: 'Beurteile: Wer hat in der Kubakrise nachgegeben – oder war es ein Kompromiss beider Seiten?', hinweis: 'UdSSR zog Raketen ab, USA versprach Kuba nicht anzugreifen und zog heimlich Türkei-Raketen ab.' }
            ]
        },
        {
            id: 'kk-kar-2',
            title: '„Der Eiserne Vorhang" – Winston Churchill (1946)',
            beschreibung: 'Ein schwerer Eisenvorhang teilt eine europäische Landkarte in zwei Hälften. Links (Westeuropa) helles Licht, Freiheitssymbole, eine Fahne mit Sternen (NATO). Rechts (Osteuropa) Dunkelheit, Stacheldraht, rote Fahnen. Churchill steht am Rand der westlichen Seite und zeigt auf den Vorhang. Darunter sein Zitat: „Von Stettin bis Triest ist ein Eiserner Vorhang niedergegangen."',
            fragen: [
                { frage: 'Beschreibe die Bildsprache: Welche Symbole werden für West und Ost verwendet?', hinweis: 'Licht/Dunkel, Freiheit/Stacheldraht, welche Wertungen stecken in dieser Bildsprache?' },
                { frage: 'Erkläre: Was meinte Churchill mit dem „Eisernen Vorhang"? Welche Bedeutung hatte seine Rede?', hinweis: 'Fulton-Rede 1946, Beginn des Kalten Krieges, Warnung vor sowjetischer Ausdehnung.' },
                { frage: 'Untersuche: Ist die Bildsprache der Karikatur fair? Welche Perspektive fehlt?', hinweis: 'Wie sah die UdSSR den Eisernen Vorhang? Was waren ihre Sicherheitsinteressen nach dem Zweiten Weltkrieg?' }
            ]
        }
    ],

    'wiedervereinigung': [
        {
            id: 'wv-kar-1',
            title: '„Mauerfall – Freude und Chaos" (November 1989)',
            beschreibung: 'Eine Karikatur vom 10. November 1989: Ost- und Westberliner umarmen sich auf der Berliner Mauer. Trabants fahren durch ein Loch in der Mauer. Westberliner reichen Sekt und Bananen. Im Hintergrund steht Helmut Kohl mit einem Megafon und ruft: „Wir sind ein Volk!" Oben tanzen Engel auf der Mauer. Rechts steht ein DDR-Wachsoldat, der seinen Hut lüftet und lächelt.',
            fragen: [
                { frage: 'Beschreibe die Szene: Was symbolisieren die einzelnen Elemente?', hinweis: 'Trabant, Bananen, Sekt, Kohl mit Megafon, der lächelnde Soldat.' },
                { frage: 'Erkläre, warum der Mauerfall am 9. November 1989 so überraschend kam.', hinweis: 'Reiseerleichterungen, Günter Schabowski, Pressekonferenz-Fehler, spontaner Ansturm auf die Grenzübergänge.' },
                { frage: 'Beurteile: War die Wiedervereinigung für alle Menschen in Ost und West gleich positiv?', hinweis: 'Freude über Einheit, aber: Treuhand, Arbeitslosigkeit im Osten, Abwertung der DDR-Biographien, „Ossis" und „Wessis".' }
            ]
        },
        {
            id: 'wv-kar-2',
            title: '„Der Einheitspreis" – Wirtschaftliche Folgen der Einheit (1991)',
            beschreibung: 'Eine Kassenszene: Ein Kassierer (beschriftet „Treuhand") kassiert von einem Ostdeutschen mit leeren Taschen. Auf dem Kassenbon steht: „Betriebe geschlossen: 5.000. Arbeitslose: 2 Mio. Heimatverlust: unbezahlbar." Der Ostdeutsche sieht erschöpft aus. Im Hintergrund ist das Brandenburger Tor mit Deutschlandfahne zu sehen.',
            fragen: [
                { frage: 'Erkläre die Metapher der Kassenszene: Was ist das „Bezahlen" hier, und wer zahlt?', hinweis: 'Was ist die Treuhand? Was haben die Ostdeutschen „bezahlt" für die Einheit?' },
                { frage: 'Erkläre die wirtschaftlichen Probleme der Einheit: Was war die Treuhand, und was bewirkte sie?', hinweis: 'Privatisierung DDR-Betriebe, Massenentlassungen, Deindustrialisierung Ostdeutschlands.' },
                { frage: 'Erörtre: Hätte die Wiedervereinigung wirtschaftlich fairer gestaltet werden können?', hinweis: 'Umtauschkurs 1:1, fehlende Anpassungszeit, westdeutscher Übernahme-Charakter vs. Vorteile der schnellen Integration.' }
            ]
        }
    ],

    'russland': [
        {
            id: 'rus-kar-1',
            title: '„Der Zar und sein Volk" – Karikatur vor 1917',
            beschreibung: 'Zar Nikolaus II. sitzt auf einem riesigen goldenen Thron – er ist winzig im Vergleich zum Thron. Um ihn herum riesige Wächter und Kosaken. Vor dem Palast steht eine frierend-hungrige Menschenmenge im Schnee. Sie halten Bittschriften hoch. Die Bittschriften wehen aus dem Palast ungelesen in den Schnee zurück. Im Hintergrund: Ein Verweis auf das Jahr 1905.',
            fragen: [
                { frage: 'Beschreibe die Komposition: Wie ist der Zar im Verhältnis zum Volk dargestellt?', hinweis: 'Größe, Position, Entfernung, was steht zwischen beiden?' },
                { frage: 'Erkläre, welche gesellschaftlichen Spannungen in Russland vor 1917 die Karikatur zeigt.', hinweis: 'Armut des Volkes, Autokratie, Revolution 1905, Petrograder Blutsonntag, soziale Ungleichheit.' },
                { frage: 'Beurteile: Warum war die Russische Revolution 1917 unvermeidlich, oder hätte sie verhindert werden können?', hinweis: 'Strukturelle Ursachen vs. Rolle des Ersten Weltkriegs, Reformen vs. Reformblockade, Lenin und Bolschewiki.' }
            ]
        },
        {
            id: 'rus-kar-2',
            title: '„Glasnost" – Gorbatschow öffnet Russland (1985)',
            beschreibung: 'Gorbatschow öffnet ein riesiges Fenster in einer dunklen, muffigen Sowjet-Amtsstube. Frische Luft und Licht strömen herein. Verstaubte Bürokrate fliehen entsetzt. Durch das Fenster sieht man eine bunte, freie Welt. Doch das Gebäude beginnt zu wackeln – die Wände reißen. Unten steht: „Glasnost – das Fenster, das die Mauer einriss."',
            fragen: [
                { frage: 'Beschreibe die Metapher des Fensters: Was symbolisiert Licht, was symbolisiert die wackelnde Wand?', hinweis: 'Glasnost = Transparenz/Offenheit. Was waren die ungewollten Konsequenzen?' },
                { frage: 'Erkläre, was Glasnost und Perestroika waren und welche Ziele Gorbatschow verfolgte.', hinweis: 'Transparenz und Umstrukturierung – Ziel: Reform des Sozialismus, nicht sein Ende.' },
                { frage: 'Beurteile: Hat Gorbatschow den Zusammenbruch der UdSSR gewollt, oder hat er ihn unbeabsichtigt ausgelöst?', hinweis: 'Reformziel vs. Kontrollverlust, Nationalitätenkonflikte, wirtschaftliche Probleme, Putschversuch 1991.' }
            ]
        }
    ],

    'china': [
        {
            id: 'cn-kar-1',
            title: '„Der schlafende Drache erwacht" – China um 1900',
            beschreibung: 'Ein großer chinesischer Drache (Symbol Chinas) liegt schlafend auf einem Hügel, umringt von kleinen europäischen Figuren, die ihm vorsichtig Stücke seines Landes abschneiden (Japan ist auch dabei). Jede Figur trägt eine Länderflagge: England, Frankreich, Deutschland, Russland, Japan. Der Drache beginnt, ein Auge zu öffnen. Unten steht: „Wie lange noch?"',
            fragen: [
                { frage: 'Beschreibe die Akteure: Wer ist der Drache, wer sind die kleinen Figuren, und was tun sie?', hinweis: 'Erkläre die Symbolik jeder Gruppe.' },
                { frage: 'Erkläre, welche historische Situation die Karikatur zeigt. Was war die „Halbkolonie" China um 1900?', hinweis: 'Opiumkriege, ungleiche Verträge, Kolonialgebiete, Konzessionen, Boxeraufstand.' },
                { frage: 'Untersuche: Warum bezeichnet man China um 1900 als „Halbkolonie"? Was unterschied es von einer vollständigen Kolonie?', hinweis: 'Formal unabhängig, aber wirtschaftlich und politisch von Großmächten abhängig und kontrolliert.' }
            ]
        },
        {
            id: 'cn-kar-2',
            title: '„Maos roter Stern" – Propagandakarikatur der Kulturrevolution (1966)',
            beschreibung: 'Mao steht riesig im Zentrum, von Strahlen umgeben wie eine Sonne. Kleine Figuren (Rote Garden) schwingen das „Rote Buch" und jubeln. Auf zerschmetterten Büchern, Bildern und Statuen stehen Beschriftungen: „Alte Ideen", „Alte Kultur", „Alte Sitten". Das Bild strahlt fanatische Energie aus – es ist ein authentisches Propagandaplakat.',
            fragen: [
                { frage: 'Beschreibe das Plakat: Welche Elemente fallen sofort auf? Welche Botschaft wird übermittelt?', hinweis: 'Mao als Sonne, Masse, zerstörte Bücher – erkläre jedes Element.' },
                { frage: 'Erkläre, was die Kulturrevolution war (1966–1976) und welche Ziele Mao verfolgte.', hinweis: 'Vernichtung der „vier Alten", Mobilisierung der Jugend, Machterhalt Maos, Verfolgung Intellektueller.' },
                { frage: 'Beurteile: Welche Folgen hatte die Kulturrevolution für die chinesische Gesellschaft?', hinweis: 'Millionen Tote/Lager, Zerstörung von Bildung und Kultur, wirtschaftlicher Schaden, generationelles Trauma.' }
            ]
        }
    ],

    'tuerkei': [
        {
            id: 'tu-kar-1',
            title: '„Der kranke Mann am Bosporus" – Osmanisches Reich im 19. Jh.',
            beschreibung: 'Das Osmanische Reich ist als gebrechlicher alter Mann in traditioneller Kleidung dargestellt, der auf einem Krankenbett liegt. An seinem Bett stehen europäische Mächte (England, Frankreich, Russland, Österreich) mit gierigen Blicken – jede versucht, ein Stück des Bettes abzureißen. Ein Arzt (beschriftet „Diplomatik") versucht den alten Mann zu stabilisieren, kann aber kaum etwas tun.',
            fragen: [
                { frage: 'Beschreibe die Karikatur: Welche Metapher verwendet der Zeichner für das Osmanische Reich?', hinweis: 'Was bedeutet „kranker Mann"? Was tun die europäischen Mächte?' },
                { frage: 'Erkläre, warum das Osmanische Reich im 19. Jahrhundert als „kranker Mann am Bosporus" bezeichnet wurde.', hinweis: 'Verlust der Balkan-Gebiete, wirtschaftliche Abhängigkeit, interne Konflikte, Reformversuche (Tanzimat).' },
                { frage: 'Beurteile: Ist die Metapher des „kranken Mannes" eine faire oder eine eurozentrische Sichtweise auf das Osmanische Reich?', hinweis: 'Welche Stärken und Erfolge hatte das Osmanische Reich noch? Wie sahen es die Osmanen selbst?' }
            ]
        },
        {
            id: 'tu-kar-2',
            title: '„Atatürk baut die neue Türkei" – Propagandabild (1930er)',
            beschreibung: 'Atatürk (in modernem Anzug) steht vor einer modernen Skyline mit Schulen und Fabriken. Er zeigt auf eine Karte der modernen Türkei. Hinter ihm liegt ein zerbrochener Halbmond und ein umgestürzter Sultanssitz. Kinder in Schuluniformen jubeln. Im Hintergrund Fahnen mit dem roten Halbmond – aber modernisiert. Arabische Schriftzeichen werden durch lateinische ersetzt (sichtbar im Bild).',
            fragen: [
                { frage: 'Beschreibe die Symbole des Wandels im Bild: Was wird abgelegt, was aufgebaut?', hinweis: 'Zerbrochener Sultanssitz, Schriftzeichen, Kleidung, Schulen – erkläre die Symbolik.' },
                { frage: 'Erkläre Atatürks Reformen: Was veränderte er in der Türkei, und was war sein Ziel?', hinweis: 'Republik 1923, Laizismus, Schriftsystem, Frauenrechte, Kleidungsreform, Modernisierung nach westlichem Vorbild.' },
                { frage: 'Erörtre: War Atatürks Modernisierung eine Befreiung oder eine neue Form der Unterdrückung?', hinweis: 'Fortschritt für viele, aber: autoritäre Methoden, Kurdenunterdrückung, erzwungene Assimilation, Religionsverbot.' }
            ]
        }
    ],

    'europaeische-union': [
        {
            id: 'eu-kar-1',
            title: '„Europa wächst zusammen" – Karikatur nach dem Maastricht-Vertrag (1993)',
            beschreibung: 'Europäische Staatsmänner bauen gemeinsam an einem Haus, beschriftet „EU". Jeder bringt einen Baustein aus seinem Land. Manche Steine passen perfekt, manche klemmen. Ein britischer Politiker steht seitlich und schaut skeptisch zu – er hält einen Stein mit der Aufschrift „Opt-out". Unten steht: „Das Haus Europa – Zimmer mit Aussicht, Baustelle unvollendet."',
            fragen: [
                { frage: 'Beschreibe die Szene: Was bauen die Männer, wer macht was, und wer macht nicht mit?', hinweis: 'Achte besonders auf den britischen Politiker – was symbolisiert sein „Opt-out"-Stein?' },
                { frage: 'Erkläre, was der Maastricht-Vertrag 1992 bedeutete und welche Opt-outs es gab.', hinweis: 'Gründung der EU, Euro, britische und dänische Sonderregelungen, Schritte zur politischen Union.' },
                { frage: 'Beurteile: Ist die EU trotz ihrer Unvollständigkeit ein Erfolgsmodell? Welche Stärken und Schwächen hat sie?', hinweis: 'Frieden, Binnenmarkt, Demokratieförderung vs. Demokratiedefizit, Brexit, Nationalismus, Krisen.' }
            ]
        },
        {
            id: 'eu-kar-2',
            title: '„Schumann und Monnet" – Väter Europas (rückblickende Karikatur, 1986)',
            beschreibung: 'Robert Schuman und Jean Monnet stehen nebeneinander, beide halten gemeinsam einen kleinen Globus, auf dem Europa leuchtet. Im Hintergrund: Trümmer des Zweiten Weltkriegs auf der einen Seite, das EU-Parlament auf der anderen. Schuman sagt: „Frieden durch Verflechtung." Monnet antwortet: „Wir einigen keine Staaten – wir vereinen Menschen." Darunter: 1950–1986: 35 Jahre ohne Krieg in Westeuropa.',
            fragen: [
                { frage: 'Beschreibe, was die Karikatur über die Entstehung der EU aussagt. Was steht im Vordergrund?', hinweis: 'Welchen Kontrast macht die Karikatur deutlich? Was ist der Kern der europäischen Idee laut den Zitaten?' },
                { frage: 'Erkläre: Welche Rolle spielten Schuman und Monnet für die europäische Integration?', hinweis: 'Schuman-Plan 1950, Montanunion, Monnet als Architekt der Verflechtungsstrategie (Neofunktionalismus).' },
                { frage: 'Beurteile: Ist die EU heute noch ein „Friedensprojekt", oder hat sie diesen Charakter verloren?', hinweis: 'Frieden in Europa seit 75 Jahren, aber: Ukraine-Krieg an den Grenzen, innere Spannungen, Nationalismus.' }
            ]
        }
    ]
};

// =============================================
// DATEN: HISTORIKERTEXTE
// =============================================
const HISTORIKERTEXTE_DATA = {
    'französische-revolution': [
        {
            id: 'fr-txt-1',
            title: 'Die Französische Revolution als bürgerliche Revolution',
            autor: 'Albert Soboul, „Die große Französische Revolution" (1983)',
            text: '„Die Französische Revolution war in erster Linie eine bürgerliche Revolution. Die Bourgeoisie, die wirtschaftlich bereits zur beherrschenden Klasse geworden war, errang nun auch die politische Macht. Das Ziel war die Beseitigung des feudalen Ständesystems und die Schaffung einer neuen Gesellschaftsordnung, die auf Gleichheit vor dem Gesetz und freier wirtschaftlicher Betätigung basierte. Der Zusammenschluss des Dritten Standes entstand aus dem gemeinsamen Interesse gegen die Privilegien des Adels."',
            fragen: [
                { frage: 'Arbeite Sobouls Hauptthese heraus: Was bezeichnet er als Ursache und Ziel der Revolution?', hinweis: 'Wer profitierte? Was wurde bekämpft? Welche Klasse steht im Mittelpunkt?' },
                { frage: 'Erkläre, was Soboul unter einer „bürgerlichen Revolution" versteht.', hinweis: 'Welche Klasse führte die Revolution? Was bedeutet „Bourgeoisie"? Was wollte sie?' },
                { frage: 'Beurteile: Ist Sobouls Interpretation überzeugend? Welche Aspekte lässt er außer Acht?', hinweis: 'Welche Rolle spielte das einfache Volk (Sansculotten, Bauern)? Ist eine rein marxistische Deutung ausreichend?' }
            ]
        },
        {
            id: 'fr-txt-2',
            title: 'Die Französische Revolution als globales Ereignis',
            autor: 'Lynn Hunt, „The French Revolution and Human Rights" (2016)',
            text: '„Die Erklärung der Menschenrechte von 1789 veränderte die politische Sprache der Welt. Zum ersten Mal wurden Rechte nicht als Privilegien bestimmter Gruppen, sondern als universelle, unveräußerliche Ansprüche aller Menschen formuliert. Diese Idee war revolutionär – und sie war gefährlich, denn sie stellte jede Ungleichheit unter Rechtfertigungsdruck. Die Revolution pflanzte eine Idee in die Welt, die nie wieder vollständig zurückgenommen werden konnte."',
            fragen: [
                { frage: 'Arbeite Hunts Kernaussage über die Bedeutung der Menschenrechtserklärung heraus.', hinweis: 'Was war neu an den Menschenrechten von 1789? Warum nennt sie sie „gefährlich"?' },
                { frage: 'Erkläre, was mit „universelle, unveräußerliche Rechte" gemeint ist. Was unterscheidet das von Privilegien?', hinweis: 'Privilegien gelten für bestimmte Gruppen – Menschenrechte für alle. Welche Folgen hat dieser Unterschied?' },
                { frage: 'Vergleiche Hunts und Sobouls Interpretation der Französischen Revolution: Welche Aspekte betonen sie jeweils?', hinweis: 'Soboul: soziale Klassen, Hunts: Ideen und Rechte. Welche Deutung findest du überzeugender und warum?' }
            ]
        }
    ],

    'industrialisierung': [
        {
            id: 'ind-txt-1',
            title: 'Die soziale Frage: Kritik am frühen Kapitalismus',
            autor: 'Friedrich Engels, „Die Lage der arbeitenden Klasse in England" (1845)',
            text: '„Ich habe die englischen Arbeiterviertel besucht und gesehen, was ich für das schlimmste halte, was der Kapitalismus erzeugt hat: Menschen, die nicht mehr als Menschen behandelt werden. Sie wohnen in Kellern und überfüllten Häusern, arbeiten 14 Stunden täglich für Hungerlöhne, und ihre Kinder wachsen in Fabriken auf statt in Schulen. Das Elend ist nicht zufällig – es ist System. Das Kapital braucht billige Arbeit, und billiger kann Arbeit nicht sein als die von Menschen, die nichts anderes haben als ihre Hände."',
            fragen: [
                { frage: 'Arbeite heraus, wie Engels die Lage der Arbeiter beschreibt. Was kritisiert er konkret?', hinweis: 'Wohnverhältnisse, Arbeitszeit, Löhne, Kinderarbeit – nenne alle genannten Probleme.' },
                { frage: 'Erkläre Engels\' These: Warum sieht er das Elend nicht als Zufall, sondern als „System"?', hinweis: 'Was meint er mit „Das Kapital braucht billige Arbeit"? Welche Logik steckt dahinter?' },
                { frage: 'Beurteile: Ist Engels\' Darstellung eine sachliche Analyse oder eine politisch motivierte Anklage? Begründe.', hinweis: 'Er war selbst politischer Aktivist und Sozialist – wie beeinflusst das seine Sichtweise? Was ist trotzdem wahr?' }
            ]
        },
        {
            id: 'ind-txt-2',
            title: 'Industrialisierung als Fortschritt: Eine andere Perspektive',
            autor: 'David Landes, „Der entfesselte Prometheus" (1973)',
            text: '„Wer die Industrialisierung nur durch die Brille des Elends betrachtet, verpasst die größte wirtschaftliche Transformation der Menschheitsgeschichte. Ja, es gab Armut und Ausbeutung – aber die gab es vor der Industrialisierung auch, oft schlimmer. Was die Industrialisierung brachte, war auf lange Sicht: mehr Nahrung, mehr Gesundheit, mehr Bildung, mehr Lebenserwartung. Die Frage ist nicht ob, sondern zu welchem Preis dieser Fortschritt kam – und ob dieser Preis gerecht verteilt war."',
            fragen: [
                { frage: 'Arbeite heraus, wie Landes die Industrialisierung grundsätzlich bewertet. Was ist seine Hauptthese?', hinweis: 'Welche positiven Aspekte betont er? Wie verhält er sich zur Kritik an der Industrialisierung?' },
                { frage: 'Erkläre den Unterschied zwischen Landes\' und Engels\' Perspektive. Worüber sind sie sich einig, worüber nicht?', hinweis: 'Beide erkennen das Elend an – aber bewerten es unterschiedlich. Wie und warum?' },
                { frage: 'Beurteile: Welche der beiden Positionen (Engels oder Landes) ist überzeugender? Begründe mit Beispielen.', hinweis: 'Berücksichtige: Kurzfristige vs. langfristige Folgen, soziale Gerechtigkeit, Kinderarbeit, Lebensstandard im Zeitverlauf.' }
            ]
        }
    ],

    'imperialismus': [
        {
            id: 'imp-txt-1',
            title: 'Imperialismus als wirtschaftliches System',
            autor: 'John A. Hobson, „Imperialism: A Study" (1902)',
            text: '„Der Imperialismus ist keine Naturgewalt, sondern eine wirtschaftliche Notwendigkeit des Kapitalismus. Wenn die Binnenmärkte gesättigt sind und die Überproduktion droht, sucht das Kapital nach neuen Absatzmärkten und billigen Rohstoffen. Die Kolonien sind diese neuen Märkte. Das Volk, im Namen dessen die Expansion betrieben wird, profitiert kaum – es sind die Investoren, die profitieren. Der Imperialismus ist daher die Außenpolitik einer kleinen, aber mächtigen wirtschaftlichen Klasse."',
            fragen: [
                { frage: 'Arbeite Hobsons These über die Ursachen des Imperialismus heraus.', hinweis: 'Was treibt den Imperialismus laut Hobson an? Wer profitiert, wer nicht?' },
                { frage: 'Erkläre: Was versteht Hobson unter „gesättigten Märkten" und warum führt das zu Expansion?', hinweis: 'Überproduktion → neue Märkte nötig → Kolonien. Welche wirtschaftliche Logik steckt dahinter?' },
                { frage: 'Beurteile: Erklärt Hobsons wirtschaftliche Deutung den Imperialismus vollständig, oder gibt es andere Ursachen?', hinweis: 'Welche Rolle spielten: Nationalismus, „Zivilisierungsauftrag", Strategisches Denken, Sozialdarwinismus?' }
            ]
        },
        {
            id: 'imp-txt-2',
            title: 'Der Imperialismus aus der Perspektive der Kolonisierten',
            autor: 'Frantz Fanon, „Die Verdammten dieser Erde" (1961)',
            text: '„Die Kolonisierung ist nicht nur ein wirtschaftliches System – sie ist eine psychologische Zerstörung. Der Kolonisierte lernt, sich selbst durch die Augen des Kolonisators zu sehen: als minderwertig, als unzivilisiert, als Kind, das Führung braucht. Diese innere Kolonisierung ist die dauerhafteste Wirkung des Imperialismus. Selbst nach der formalen Unabhängigkeit trägt der Kolonisierte die Narben in sich. Dekolonisierung bedeutet daher nicht nur politische Unabhängigkeit – sie bedeutet die Rückgewinnung des eigenen Selbstbildes."',
            fragen: [
                { frage: 'Arbeite Fanons Kernthese heraus: Was versteht er unter „psychologischer Zerstörung" durch den Kolonialismus?', hinweis: 'Was ist „innere Kolonisierung"? Wie beeinflusst sie das Selbstbild der Kolonisierten?' },
                { frage: 'Erkläre, was Fanon mit „Dekolonisierung" meint. Warum reicht politische Unabhängigkeit nicht aus?', hinweis: 'Welche Dimension der Befreiung fehlt nach formaler Unabhängigkeit? Welche Narben bleiben?' },
                { frage: 'Vergleiche Hobsons und Fanons Sichtweisen auf den Imperialismus: Was ist jeweils der Fokus? Was fehlt bei jedem?', hinweis: 'Hobson: wirtschaftliche Ursachen; Fanon: psychologische Folgen für die Kolonisierten. Ergänzen sie sich?' }
            ]
        }
    ],

    'erster-weltkrieg': [
        {
            id: 'wk1-txt-1',
            title: 'Die Kriegsschuldfrage: Die Fischer-Kontroverse',
            autor: 'Fritz Fischer, „Griff nach der Weltmacht" (1961)',
            text: '„Deutschland trägt die Hauptverantwortung für den Ausbruch des Ersten Weltkriegs. Die deutsche Führung gab Österreich-Ungarn den ‚Blankoscheck’ in vollem Bewusstsein, dass dies zum allgemeinen Krieg führen würde. Die Kriegsziele, die Deutschland ab September 1914 formulierte, zeigen: Es ging nicht nur um Verteidigung, sondern um Welthegemonie – Annexionen in West und Ost, Kontrolle des Kontinents. Der Krieg war nicht zufällig, sondern gewollt."',
            fragen: [
                { frage: 'Arbeite Fischers Hauptthese über die Kriegsverantwortung heraus.', hinweis: 'Wer trägt die Hauptverantwortung? Was ist der „Blankoscheck"? Was belegt Fischer mit den Kriegszielen?' },
                { frage: 'Erkläre, warum Fischers Buch 1961 in Deutschland einen Skandal auslöste.', hinweis: 'Was bedeutete seine These für das Selbstbild der Deutschen nach dem Krieg? Wer widersprach ihm und warum?' },
                { frage: 'Beurteile: Ist Fischers Interpretation heute noch überzeugend, oder ist das Bild der Kriegsschuld komplexer?', hinweis: 'Welche Rolle spielten Österreich-Ungarn, Russland, Frankreich? Ist „Alleinschuld" eine angemessene Kategorie?' }
            ]
        },
        {
            id: 'wk1-txt-2',
            title: 'Der Erste Weltkrieg als Urkatastrophe des 20. Jahrhunderts',
            autor: 'George F. Kennan, „Der Zerfall der Weltordnung" (1979)',
            text: '„Der Erste Weltkrieg war die Urkatastrophe des zwanzigsten Jahrhunderts. Ohne ihn hätte es keinen Lenin und keine bolschewistische Revolution gegeben, keinen Hitler und keinen Nationalsozialismus, keinen Zweiten Weltkrieg und keinen Holocaust. Alles, was das zwanzigste Jahrhundert zu dem gemacht hat, was es war, hat seine Wurzeln in diesem sinnlosen, vermeidbaren Krieg, den niemand wirklich wollte, den aber alle bereit waren zu riskieren."',
            fragen: [
                { frage: 'Arbeite Kennans Kernaussage heraus: Warum nennt er den Ersten Weltkrieg eine „Urkatastrophe"?', hinweis: 'Welche Folgekatastrophen führt er auf den Krieg zurück? Wie hängen sie zusammen?' },
                { frage: 'Erkläre den Begriff „Urkatastrophe": Was ist damit gemeint, und warum ist diese Metapher treffend?', hinweis: 'Eine Urkatastrophe ist die erste und größte Katastrophe, die alle weiteren verursacht. Belege das mit Geschichte.' },
                { frage: 'Beurteile: War der Erste Weltkrieg wirklich „vermeidbar", wie Kennan behauptet? Oder war er unvermeidlich?', hinweis: 'Welche Entscheidungen hätten den Krieg verhindert? Welche Strukturen machten ihn fast unvermeidlich?' }
            ]
        }
    ],

    'weimarer-republik': [
        {
            id: 'wr-txt-1',
            title: 'Warum scheiterte die Weimarer Republik?',
            autor: 'Detlev Peukert, „Die Weimarer Republik" (1987)',
            text: '„Die Weimarer Republik scheiterte nicht nur wegen der Nazis. Sie scheiterte auch an sich selbst: an einer Verfassung, die zu schwach war, um die Demokratie gegen ihre Feinde zu schützen, an politischen Parteien, die mehr an ihren Lagern als am Gesamtinteresse interessiert waren, und an einer Gesellschaft, die demokratische Werte nicht ausreichend verinnerlicht hatte. Die Nazis konnten nur siegen, weil die Republik schon geschwächt war."',
            fragen: [
                { frage: 'Arbeite die drei Hauptursachen des Scheiterns heraus, die Peukert nennt.', hinweis: 'Verfassung, Parteien, Gesellschaft – erkläre jede Ursache mit eigenen Worten.' },
                { frage: 'Erkläre, was Peukert mit „demokratische Werte nicht ausreichend verinnerlicht" meint.', hinweis: 'Was ist der Unterschied zwischen einer formalen Demokratie und einer gelebten demokratischen Kultur?' },
                { frage: 'Beurteile: Ist Peukerts Erklärung überzeugend? Oder lag das Scheitern hauptsächlich an äußeren Umständen wie der Weltwirtschaftskrise?', hinweis: 'Interne Schwächen vs. externe Schocks: Welche Faktoren waren entscheidender?' }
            ]
        },
        {
            id: 'wr-txt-2',
            title: 'Die Goldenen Zwanziger – Glanz und Elend',
            autor: 'Eric Weitz, „Weimar Germany: Promise and Tragedy" (2007)',
            text: '„Die Weimarer Republik war gleichzeitig die modernste und die zerbrechlichste Demokratie ihrer Zeit. In Berlin erlebte die Welt eine kulturelle Blüte wie nirgendwo sonst: Bauhaus, Expressionismus, Kino, Nachtleben, Frauenrechte. Doch dieser Glanz saß auf einem brüchigen Fundament: Millionen Menschen lebten in Armut, fühlten sich von der Moderne überrollt und sehnten sich nach Stabilität und Stärke. Der Kulturkampf zwischen Moderne und Reaktion war der eigentliche Kampf um die Weimarer Republik."',
            fragen: [
                { frage: 'Arbeite heraus, welchen Widerspruch Weitz in der Weimarer Republik sieht.', hinweis: 'Kulturelle Blüte vs. sozialer Elend und politische Fragilität – wie hängt das zusammen?' },
                { frage: 'Erkläre, was Weitz mit „Kulturkampf zwischen Moderne und Reaktion" meint.', hinweis: 'Wer waren die Anhänger der Moderne, wer die Reaktionäre? Was war ihr Konflikt?' },
                { frage: 'Beurteile: Kann man die Weimarer Republik als gescheiterte Demokratie oder als bedeutendes Experiment bewerten?', hinweis: 'Was war trotz des Scheiterns bleibend wichtig? Was können wir heute daraus lernen?' }
            ]
        }
    ],

    'revolution-1848': [
        {
            id: 'r48-txt-1',
            title: 'Die Revolution von 1848: Scheitern mit Folgen',
            autor: 'Wolfram Siemann, „Die deutsche Revolution 1848/49" (1985)',
            text: '„Die Revolution von 1848 scheiterte, aber sie veränderte Deutschland trotzdem. Sie scheiterte weil die liberale Bewegung gespalten war zwischen nationalen und sozialen Interessen, weil die Fürsten das Militär kontrollierten, und weil Europa sich gegen die Revolutionäre stellte. Aber das Scheitern war kein vollständiger Misserfolg: Die Grundrechte, die Frankfurt formulierte, lebten in der Erinnerung fort und wurden später – 1919 und 1949 – wieder aufgegriffen. Manchmal sind gescheiterte Revolutionen die wirkungsvolleren."',
            fragen: [
                { frage: 'Arbeite Siemanns Erklärung des Scheiterns heraus: Welche drei Ursachen nennt er?', hinweis: 'Spaltung der Liberalen, Militärmacht der Fürsten, feindliches europäisches Umfeld.' },
                { frage: 'Erkläre, was Siemann mit „gescheiterte Revolutionen können wirkungsvoller sein" meint.', hinweis: 'In welcher Form lebten die Ideen von 1848 fort? Wo tauchen sie wieder auf?' },
                { frage: 'Beurteile: War die Revolution von 1848 tatsächlich ein Misserfolg, oder hat sie langfristig gewirkt?', hinweis: 'Grundrechte 1848 → Weimarer Verfassung 1919 → Grundgesetz 1949. Wie stark ist diese Linie?' }
            ]
        },
        {
            id: 'r48-txt-2',
            title: 'Einheit oder Freiheit – das Dilemma von 1848',
            autor: 'Thomas Nipperdey, „Deutsche Geschichte 1800–1866" (1983)',
            text: '„Das zentrale Drama der deutschen Revolution war das Dilemma zwischen nationaler Einheit und liberaler Freiheit. Wer für die Einheit stimmte, musste oft Kompromisse bei der Freiheit machen – ein starkes Deutschland brauchte einen starken Staat. Wer für die Freiheit eintrat, riskierte die Einheit zu verhindern. Dieses Dilemma lösten die Liberalen von 1848 nicht. Es sollte die deutsche Geschichte noch lange begleiten – bis 1990."',
            fragen: [
                { frage: 'Erkläre das Dilemma zwischen Einheit und Freiheit in der Revolution von 1848 mit eigenen Worten.', hinweis: 'Warum schließen sich ein starker Nationalstaat und liberale Freiheiten manchmal aus?' },
                { frage: 'Arbeite heraus, wie Nipperdey dieses Dilemma mit der deutschen Geschichte bis 1990 verbindet.', hinweis: 'Kaiserreich, Weimarer Republik, Teilung – wann tauchte dieses Dilemma wieder auf?' },
                { frage: 'Nimm Stellung: Ist das Dilemma von Einheit und Freiheit mit der deutschen Wiedervereinigung 1990 endgültig gelöst worden?', hinweis: 'Ist die Bundesrepublik ein Beweis, dass beides geht? Oder gibt es noch offene Fragen?' }
            ]
        }
    ],

    'nationalsozialismus': [
        {
            id: 'ns-txt-1',
            title: 'Hitlers Machtergreifung: Aufstieg und Demontage der Demokratie',
            autor: 'Richard Evans, „Das Dritte Reich – Aufstieg" (2004)',
            text: '„Hitler kam legal an die Macht – das ist der erschreckende Kern. Er nutzte die Instrumente der Demokratie, um sie zu zerstören. Die Wahlurne öffnete die Tür. Die Notstandsgesetze weiteten sie auf. Der Ermächtigungsgesetz sprengte sie aus den Angeln. Am Ende war die Demokratie nicht gestürzt worden – sie hatte sich selbst abgeschafft, weil genug Menschen, aus Angst, Opportunismus oder Überzeugung, mitgemacht hatten."',
            fragen: [
                { frage: 'Arbeite Evans\' Kernthese heraus: Wie kam Hitler an die Macht, laut Evans?', hinweis: 'Legal, durch demokratische Instrumente, mit Hilfe vieler Menschen – erkläre jeden Schritt.' },
                { frage: 'Erkläre, was das Ermächtigungsgesetz (1933) war und warum es „die Demokratie aus den Angeln sprengte".', hinweis: 'Wer stimmte dafür? Was ermächtigte es Hitler zu tun? Welche Kontrollen wurden beseitigt?' },
                { frage: 'Beurteile: Welche Verantwortung tragen die deutschen Wähler, Politiker und Eliten für Hitlers Machtergreifung?', hinweis: 'Wer hätte ihn aufhalten können? Warum taten sie es nicht? Was waren ihre Motive?' }
            ]
        },
        {
            id: 'ns-txt-2',
            title: 'Warum folgten die Deutschen? Die Frage der Mittäterschaft',
            autor: 'Christopher Browning, „Ganz normale Männer" (1992)',
            text: '„Das Polizeibataillon 101 bestand aus gewöhnlichen Männern: Fabrikarbeitern, Handwerkern, Angestellten. Keine fanatischen Nazis. Sie hatten die Wahl, nicht zu töten – und töteten trotzdem. Nicht aus Zwang, sondern aus Konformität, Karrieregründen, Gehorsam, und dem Wunsch, die Kameraden nicht zu enttäuschen. Das ist das Erschreckende: Der Holocaust wurde nicht nur von Monstern begangen, sondern auch von ganz normalen Menschen."',
            fragen: [
                { frage: 'Arbeite Brownings Hauptbefund heraus: Was sagt er über die Täter des Holocaust?', hinweis: 'Wer waren sie? Was trieb sie an – was nicht? Was ist das Erschreckende daran?' },
                { frage: 'Erkläre, was „Konformität" und „Gehorsam" in diesem Kontext bedeuten. Welche psychologischen Mechanismen beschreibt Browning?', hinweis: 'Denke an Stanley Milgram, Gruppendynamik, Befehlsgehorsam, soziale Erwartungen.' },
                { frage: 'Beurteile: Was folgt aus Brownings Befund für unser heutiges Verständnis von Verantwortung und Gewissen?', hinweis: 'Sind wir alle potenzielle Täter? Was schützt uns vor solchem Verhalten? Welche Lehren ziehen wir daraus?' }
            ]
        }
    ],

    'holocaust': [
        {
            id: 'hol-txt-1',
            title: 'Der Holocaust: Absicht oder Struktur?',
            autor: 'Hans Mommsen, „Der Nationalsozialismus und die deutsche Gesellschaft" (1991)',
            text: '„Der Holocaust entstand nicht allein aus Hitlers Absicht, sondern als Ergebnis eines komplexen Zusammenspiels von Ideologie, Bürokratie und radikalisierenden Sachzwängen. Die Vernichtungspolitik eskalierte schrittweise – nicht nach einem von Anfang an feststehenden Plan. Die Bürokratie, die verschiedenen SS-Organe, Politiker und lokale Entscheidungsträger trieben den Radikalisierungsprozess gemeinsam voran. Hitler gab die Richtung vor, aber die Maschinerie funktionierte durch Millionen von Mitwirkenden."',
            fragen: [
                { frage: 'Erkläre den Unterschied zwischen der „Absicht"- und der „Struktur"-Interpretation des Holocaust.', hinweis: 'Intentionalisten: Hitler plante alles von Anfang an. Strukturalisten: Es entstand durch Bürokratie und Eskalation.' },
                { frage: 'Arbeite heraus, welche Position Mommsen vertritt. Welche Argumente nennt er?', hinweis: 'Schrittweise Eskalation, viele Beteiligte, keine Blaupause – erkläre seine Argumentation.' },
                { frage: 'Beurteile: Hat die Debatte zwischen Intentionalisten und Strukturalisten eine praktische Bedeutung, oder ist sie nur akademisch?', hinweis: 'Wer trägt Verantwortung? Wie verhindert man Genozide in Zukunft? Was sagt uns die Antwort über Täterschaft?' }
            ]
        },
        {
            id: 'hol-txt-2',
            title: 'Elie Wiesel: Zeugnis und Erinnerung',
            autor: 'Elie Wiesel, „Nacht" (1958, Vorwort zur Neuausgabe 2006)',
            text: '„Ich schrieb dieses Buch, weil ich nicht schweigen konnte. Was ich erlebt habe, übersteigt menschliches Verständnis – und doch muss es verstanden werden. Die Welt muss wissen, was in Auschwitz geschah. Nicht weil die Vergangenheit geändert werden kann, sondern weil die Zukunft geändert werden kann. Jede Generation muss neu entscheiden: Erinnere ich mich? Widerstehe ich? Bin ich bereit, für einen anderen Menschen das Risiko auf mich zu nehmen? Die Erinnerung ist keine Last – sie ist eine Pflicht."',
            fragen: [
                { frage: 'Arbeite heraus, warum Wiesel schreibt und was er vom Lesen erwartet.', hinweis: 'Nicht Vergangenheit ändern, sondern Zukunft. Was soll der Leser tun, denken, fühlen?' },
                { frage: 'Erkläre, was Wiesel mit „Erinnerung ist Pflicht" meint. Wem gegenüber besteht diese Pflicht?', hinweis: 'Gegenüber den Toten? Der Gesellschaft? Der eigenen Generation? Was folgt daraus konkret?' },
                { frage: 'Nimm Stellung: Wie kann und muss heute an den Holocaust erinnert werden, damit die Erinnerung lebendig bleibt?', hinweis: 'Zeitzeugen sterben aus – was tritt an ihre Stelle? Schulen, Gedenkstätten, Literatur, Digitalisierung.' }
            ]
        }
    ],

    'zweiter-weltkrieg': [
        {
            id: 'wk2-txt-1',
            title: 'Der Vernichtungskrieg im Osten',
            autor: 'Christian Gerlach, „Kalkulierte Morde" (1999)',
            text: '„Der Krieg gegen die Sowjetunion war von Anfang an kein normaler Krieg. Er war ein ideologischer Vernichtungskrieg, der auf die physische Zerstörung des Bolschewismus, die Versklavung der slawischen Bevölkerung und die Ausbeutung der Ressourcen abzielte. Die Hungerplanungen der Wehrmacht sahen den Tod von Millionen sowjetischer Zivilisten als kalkulierten Bestandteil der Kriegsführung vor. Der Holocaust und der Vernichtungskrieg im Osten waren zwei Seiten derselben Medaille."',
            fragen: [
                { frage: 'Arbeite heraus, was den Krieg im Osten laut Gerlach von einem „normalen" Krieg unterschied.', hinweis: 'Ideologie, Vernichtungsabsicht, Sklaverei, Ressourcenausbeutung, Hungerplanung.' },
                { frage: 'Erkläre, was mit „Hungerplanungen" gemeint ist. Was war das Ziel?', hinweis: 'Wehrmacht entzog der sowjetischen Zivilbevölkerung systematisch Nahrung – das war kein Kollateralschaden, sondern geplant.' },
                { frage: 'Beurteile: Welche Konsequenzen hat Gerlachs Befund für die Frage nach der Schuld der Wehrmacht (nicht nur der SS)?', hinweis: 'War die Wehrmacht ein normales Militär oder ein Akteur des Vernichtungskriegs? Denke an die Mythos der „sauberen Wehrmacht".' }
            ]
        },
        {
            id: 'wk2-txt-2',
            title: 'Die Stunde Null: Deutschland 1945',
            autor: 'Hannah Arendt, „Die Elemente und Ursprünge totaler Herrschaft" (1951)',
            text: '„Was Deutschland 1945 hinterließ, war nicht nur physischer Schutt – es war moralischer Schutt. Ein Volk, das zwölf Jahre lang gelogen, gehorcht und weggeschaut hatte, musste sich selbst neu erfinden. Aber Völker erfinden sich nicht einfach neu. Die Vergangenheit hört nicht auf, Gegenwart zu sein, nur weil man sie vergessen möchte. Die eigentliche Leistung der Deutschen nach 1945 war nicht der wirtschaftliche Wiederaufbau – das war bewundernswert. Die eigentliche Frage war: Wie geht man mit Schuld um?"',
            fragen: [
                { frage: 'Erkläre den Unterschied zwischen „physischem" und „moralischem" Schutt, den Arendt beschreibt.', hinweis: 'Gebäude lassen sich wiederherstellen – was ist mit moralischen Werten, Vertrauen, Verantwortung?' },
                { frage: 'Arbeite heraus, welche Aufgabe Arendt für Deutschland nach 1945 als die eigentlich schwierige sieht.', hinweis: 'Nicht Wirtschaft, sondern Schuld – was meint sie damit? Wie kann man mit Schuld umgehen?' },
                { frage: 'Beurteile: Wie hat Deutschland die Frage des Umgangs mit der NS-Vergangenheit beantwortet? War diese Antwort gut?', hinweis: 'Denke an: Nürnberger Prozesse, Entnazifizierung, Adenauers Verdrängung, 68er-Generation, Historikerstreit, heutige Erinnerungskultur.' }
            ]
        }
    ],

    'brd-ddr': [
        {
            id: 'bd-txt-1',
            title: 'Zwei Staaten – zwei Gesellschaften',
            autor: 'Christoph Kleßmann, „Zwei Staaten, eine Nation" (1988)',
            text: '„BRD und DDR waren politisch und wirtschaftlich grundverschieden – und doch blieben sie verbunden durch Sprache, Familie, Erinnerung. Die Deutschen lebten getrennt und zusammen. Diese Paradoxie der deutschen Teilung ist ihr eigentliches Wesen: Kein anderes geteiltes Land kannte die andere Seite so gut und war ihr doch so fremd. Das Fernsehen überwand die Mauer im Alltag, während Stacheldraht sie in der Realität befestigte."',
            fragen: [
                { frage: 'Arbeite Kleßmanns Paradoxie der deutschen Teilung heraus: Was meint er mit „getrennt und zusammen"?', hinweis: 'Was verband Deutsche ost und west? Was trennte sie? Wie passt das zusammen?' },
                { frage: 'Erkläre, welche Rolle das Fernsehen in der deutschen Teilung spielte.', hinweis: 'DDR-Bürger sahen Westfernsehen – welche Wirkung hatte das? Was wussten sie über die BRD?' },
                { frage: 'Beurteile: Ist die innere Einheit der Deutschen seit 1990 wirklich vollzogen, oder gibt es weiterhin eine „Mauer in den Köpfen"?', hinweis: 'Was sagen Umfragen? Wo unterscheiden sich Ost- und Westdeutsche heute noch? Wird die Kluft kleiner?' }
            ]
        },
        {
            id: 'bd-txt-2',
            title: 'Die DDR – Diktatur oder mehr?',
            autor: 'Lutz Niethammer, „Die volkseigene Erfahrung" (1991)',
            text: '„Wer die DDR nur als Diktatur beschreibt, hat recht – und versteht sie trotzdem nicht ganz. Millionen Menschen lebten dort ihr Leben: hatten Freunde, Arbeit, Urlaub, Träume. Die Diktatur war real, die Stasi war allgegenwärtig, die Unterdrückung war real. Aber daneben gab es auch eine Gesellschaft, die funktionierte und in der die meisten Menschen nicht primär als Opfer lebten, sondern als Menschen in einer bestimmten Zeit und einem bestimmten System. Diesen Alltag zu verstehen ist keine Verharmlosung – es ist Geschichtswissenschaft."',
            fragen: [
                { frage: 'Erkläre, welche zwei Ebenen der DDR-Geschichte Niethammer unterscheidet.', hinweis: 'Politisches System (Diktatur) und gelebter Alltag der Menschen – wie hängen sie zusammen?' },
                { frage: 'Arbeite heraus, warum Niethammer sagt, dass das Verstehen des Alltags keine „Verharmlosung" sei.', hinweis: 'Was ist der Unterschied zwischen Verstehen und Rechtfertigen? Welchen Erkenntniswert hat die Alltagsgeschichte?' },
                { frage: 'Beurteile: Ist es möglich, die DDR gleichzeitig als Diktatur zu verurteilen und die Erfahrungen ihrer Bürger ernst zu nehmen?', hinweis: 'Wie sehen DDR-Zeitzeugen ihre eigene Geschichte? Was sind „Ostalgiker" und wie ist das zu bewerten?' }
            ]
        }
    ],

    'kalter-krieg': [
        {
            id: 'kk-txt-1',
            title: 'Wer begann den Kalten Krieg?',
            autor: 'John Lewis Gaddis, „We Now Know: Rethinking Cold War History" (1997)',
            text: '„Nach dem Öffnen der Sowjetarchive ist klar: Stalin trägt die Hauptverantwortung für den Beginn des Kalten Krieges. Es war nicht amerikanische Provokation, sondern Stalins Paranoia, sein Expansionsdrang und seine Unfähigkeit, Sicherheit anders als durch Unterwerfung der Nachbarn zu denken. Die UdSSR bot dem Westen keine echte Partnerschaft an, weil Stalin keine echte Partnerschaft wollte. Die Truman-Doktrin war eine Reaktion, keine Aggression."',
            fragen: [
                { frage: 'Arbeite Gaddis\' These über den Beginn des Kalten Krieges heraus.', hinweis: 'Wer begann ihn? Mit welchen Argumenten? Worauf stützt er sich (Sowjetarchive)?' },
                { frage: 'Erkläre, welche Bedeutung die Öffnung der Sowjetarchive für die Kalter-Krieg-Forschung hatte.', hinweis: 'Welche Quellen standen vorher nicht zur Verfügung? Was hat sich durch neue Dokumente verändert?' },
                { frage: 'Beurteile: Ist Gaddis\' Zuweisung der Hauptverantwortung an Stalin überzeugend, oder ist die Frage komplexer?', hinweis: 'Welche Provokationen gab es auf amerikanischer Seite (Atombombe, Truman-Doktrin)? War Schuldzuweisung überhaupt möglich?' }
            ]
        },
        {
            id: 'kk-txt-2',
            title: 'Das Ende des Kalten Krieges: Wer hat gewonnen?',
            autor: 'Mary Elise Sarotte, „1989: The Struggle to Create Post-Cold War Europe" (2009)',
            text: '„Der Westen hat den Kalten Krieg nicht gewonnen – die UdSSR hat ihn verloren. Das ist kein Wortspiel: Es gibt einen wichtigen Unterschied. Der Zusammenbruch der Sowjetunion war kein Ergebnis westlicher Überlegenheit allein, sondern des inneren Zusammenbruchs eines Systems, das seine eigenen Versprechen nicht halten konnte. Der eigentliche Sieger war die Idee der Selbstbestimmung – verkörpert in den Bürgern Osteuropas, die auf die Straße gingen."',
            fragen: [
                { frage: 'Erkläre den Unterschied zwischen „der Westen hat gewonnen" und „die UdSSR hat verloren".', hinweis: 'Warum ist das mehr als ein Wortspiel? Welche unterschiedliche Kausalität steckt dahinter?' },
                { frage: 'Arbeite heraus, wer laut Sarotte der eigentliche Sieger des Kalten Krieges war.', hinweis: 'Nicht die USA, nicht NATO – sondern wer? Was meint sie mit „Idee der Selbstbestimmung"?' },
                { frage: 'Beurteile: Welche Lehren zieht die westliche Politik heute (zu Recht oder zu Unrecht) aus dem Ende des Kalten Krieges?', hinweis: 'Demokratisierungseuphorie, NATO-Osterweiterung, Unterschätzung Russlands – was hat der Westen richtig/falsch gemacht?' }
            ]
        }
    ],

    'wiedervereinigung': [
        {
            id: 'wv-txt-1',
            title: 'Die Wiedervereinigung: Anschluss oder Integration?',
            autor: 'Jürgen Habermas, „Die nachholende Revolution" (1990)',
            text: '„Was wir 1990 erlebt haben, war weniger eine Revolution als eine nachholende Angleichung. Die DDR-Bürger wollten nicht eine neue Gesellschaft erfinden – sie wollten das, was der Westen hatte: Freiheit, Wohlstand, Rechtsstaat. Das ist verständlich und menschlich. Aber die Folge war kein Dialog zwischen zwei deutschen Gesellschaften, sondern eine Übernahme. Die Bürgerrechtler, die 1989 wirklich revolutioniert hatten, wurden von der Einheitsdynamik überrollt."',
            fragen: [
                { frage: 'Erkläre den Unterschied, den Habermas zwischen „Revolution" und „nachholender Angleichung" macht.', hinweis: 'Was wäre eine echte Revolution? Was passierte 1989/90 stattdessen laut Habermas?' },
                { frage: 'Arbeite heraus, wen Habermas mit den „überrollten Bürgerrechtlern" meint und was ihre ursprünglichen Ziele waren.', hinweis: 'Neues Forum, demokratischer Sozialismus, dritter Weg – was wollten die Revolutionäre von 1989 wirklich?' },
                { frage: 'Beurteile: War die schnelle Wiedervereinigung unter westdeutschen Bedingungen richtig, oder hätte es bessere Alternativen gegeben?', hinweis: 'Habermas und andere kritisierten die Übernahme – was wäre die Alternative gewesen? Ist das realistisch?' }
            ]
        },
        {
            id: 'wv-txt-2',
            title: 'Was verblieb von der DDR?',
            autor: 'Timothy Garton Ash, „Im Namen Europas" (1993)',
            text: '„Die DDR ist verschwunden, aber die DDR-Erfahrung nicht. Millionen Menschen haben Jahrzehnte in einem anderen System gelebt, andere Werte gelernt, andere Erfahrungen gemacht. Wer das ignoriert, der versteht nicht, warum 30 Jahre nach der Einheit noch immer Unterschiede in Einstellungen, Wahlverhalten und Lebensentwürfen existieren. Die Einheit war der Anfang, nicht das Ende eines Prozesses. Innere Einheit lässt sich nicht per Staatsvertrag herbeiführen."',
            fragen: [
                { frage: 'Arbeite heraus, welche bleibenden Folgen Ash der DDR-Erfahrung zuschreibt.', hinweis: 'Was hinterließ die DDR in den Menschen? Welche Unterschiede nennt er konkret?' },
                { frage: 'Erkläre, was Ash mit „Einheit war der Anfang, nicht das Ende" meint.', hinweis: 'Wann ist ein Land wirklich vereint? Formale politische Einheit vs. innere gesellschaftliche Einheit.' },
                { frage: 'Beurteile: Ist die innere Einheit Deutschlands heute, 35 Jahre nach der Wiedervereinigung, vollzogen?', hinweis: 'Welche Unterschiede zwischen Ost und West gibt es noch? Wird die Kluft kleiner oder größer? Was sagen Wahlergebnisse?' }
            ]
        }
    ],

    'russland': [
        {
            id: 'rus-txt-1',
            title: 'War die Oktoberrevolution unvermeidlich?',
            autor: 'Orlando Figes, „Die Tragödie eines Volkes" (1996)',
            text: '„Die Russische Revolution war nicht das Ergebnis eines revolutionären Planes, sondern des Zusammenbruchs eines Staates unter dem Druck des Ersten Weltkriegs. Das Zarenreich war nicht zur Reform unfähig – es war dazu zu langsam. Als das System schließlich kollabierte, waren die Bolschewiki diejenigen, die am entschlossensten handelten. Lenins Genie war nicht die Theorie – es war die Entschlossenheit zu handeln, wenn alle anderen zögerten."',
            fragen: [
                { frage: 'Arbeite Figes\' Hauptthese über die Ursache der Revolution heraus.', hinweis: 'Nicht der Plan, sondern Staatsversagen + Erster Weltkrieg + Entschlossenheit der Bolschewiki.' },
                { frage: 'Erkläre, was Figes meint: Das Zarenreich war nicht zur Reform unfähig, aber zu langsam. Was ist der Unterschied?', hinweis: 'Welche Reformen gab es (Stolypin, Duma)? Warum reichten sie nicht, um den Zusammenbruch zu verhindern?' },
                { frage: 'Beurteile: Hätte die Russische Revolution verhindert werden können? Welche Entscheidung hätte was verändert?', hinweis: 'Kein Weltkrieg, schnellere Reformen, andere Führung – was war der entscheidende Faktor?' }
            ]
        },
        {
            id: 'rus-txt-2',
            title: 'Stalin: Modernisierer oder Tyrann?',
            autor: 'Robert Service, „Stalin: A Biography" (2004)',
            text: '„Stalin war beides, und das ist das Problem: Er industrialisierte die Sowjetunion in einer Geschwindigkeit, die jeden überraschte – und er ließ dabei Millionen Menschen sterben. Der Gulag, die Kollektivierung, der Terror: Diese Verbrechen sind nicht wegzudiskutieren. Aber ebenso wenig ist wegzudiskutieren, dass die Sowjetunion 1941 ohne diese brutale Modernisierung wahrscheinlich nicht in der Lage gewesen wäre, den deutschen Angriff zu überstehen. Geschichte ist manchmal unangenehm komplex."',
            fragen: [
                { frage: 'Erkläre, welche zwei Seiten Stalins Service nebeneinanderstellt. Welche Spannung entsteht dadurch?', hinweis: 'Modernisierung vs. Massenmord – wie können beide wahr sein?' },
                { frage: 'Arbeite heraus, welches Argument Service für die Frage des Zweiten Weltkriegs macht.', hinweis: 'Ohne Stalins Industrialisierung → keine Kriegswirtschaft → Niederlage gegen Deutschland? Ist dieses Argument überzeugend?' },
                { frage: 'Beurteile: Kann man Stalins Herrschaft aufgrund ihrer Ergebnisse (Industrialisierung, Kriegssieg) auch positiv bewerten? Wo liegt die Grenze?', hinweis: 'Bedeutet Erfolg Rechtfertigung? Welche ethischen Maßstäbe gelten für historische Urteile?' }
            ]
        }
    ],

    'china': [
        {
            id: 'cn-txt-1',
            title: 'Mao Zedong: Vater der Nation oder Massenmörder?',
            autor: 'Frank Dikötter, „Maos großer Hunger" (2010)',
            text: '„Der Große Sprung nach vorn (1958–1962) war eine der größten Hungersnöte der Menschheitsgeschichte – und sie war von Menschen gemacht. Nicht durch Dürre oder Naturkatastrophe, sondern durch ideologischen Fanatismus, schlechtes Management und politische Unterdrückung. Wer die Missernte meldete, riskierte Verhaftung. Wer Getreide hamsterte, wurde erschossen. Das Ergebnis: 30–45 Millionen Tote. Mao wusste es – und hörte nicht auf."',
            fragen: [
                { frage: 'Arbeite heraus, wie Dikötter die Hungersnot erklärt: Warum starben so viele Menschen?', hinweis: 'Nicht Naturkatastrophe, sondern: Ideologie, falsches Management, Unterdrückung von Wahrheit.' },
                { frage: 'Erkläre, was der „Große Sprung nach vorn" war und was Mao damit erreichen wollte.', hinweis: 'Industrialisierung des Landes in kürzester Zeit, Überholen des Westens, Stahl im Hinterhof – was lief schief?' },
                { frage: 'Beurteile: Wie kann man Mao historisch einordnen – als nationalen Befreier, als Modernisierer oder als Tyrannen?', hinweis: 'Er befreite China von Japan und Kolonialismus, einte das Land – und verursachte Millionentote. Wie gewichte man das?' }
            ]
        },
        {
            id: 'cn-txt-2',
            title: 'Chinas Öffnung nach 1978: Deng Xiaopings Revolution',
            autor: 'Ezra Vogel, „Deng Xiaoping and the Transformation of China" (2011)',
            text: '„Dengs Reform war in ihrer Art revolutionärer als Maos Revolution. Mao brach mit der Vergangenheit durch Zerstörung. Deng brach mit Mao durch pragmatische Anpassung. Sein Grundsatz: ‚Es spielt keine Rolle, ob die Katze schwarz oder weiß ist – Hauptsache, sie fängt Mäuse.’ Dieser Pragmatismus, so banal er klingt, veränderte China und damit die Welt. Die Öffnung führte zur größten Armutsreduktion der Menschheitsgeschichte – und zur Entstehung eines autoritären Kapitalismus."',
            fragen: [
                { frage: 'Erkläre Dengs Grundsatz mit der Katze. Was meinte er damit, und wie setzte er das politisch um?', hinweis: 'Schwarz/weiß = Kapitalismus/Sozialismus spielen keine Rolle – nur Ergebnisse zählen. Was bedeutete das in der Praxis?' },
                { frage: 'Arbeite heraus, welche Folgen Vogel für Dengs Öffnungspolitik nennt – positive und negative.', hinweis: 'Armutsreduktion auf der einen Seite, autoritärer Kapitalismus auf der anderen.' },
                { frage: 'Beurteile: Ist das chinesische Modell (Wirtschaftsöffnung ohne Demokratisierung) ein Erfolgsmodell oder ein Widerspruch in sich?', hinweis: 'Was sagt Tiananmen 1989? Was sagt der heutige Wohlstand? Kann Wohlstand Freiheit ersetzen?' }
            ]
        }
    ],

    'tuerkei': [
        {
            id: 'tu-txt-1',
            title: 'Der Völkermord an den Armeniern',
            autor: 'Taner Akçam, „A Shameful Act: The Armenian Genocide and the Question of Turkish Responsibility" (2006)',
            text: '„Der Völkermord an den Armeniern 1915 ist historisch zweifelsfrei belegt. Über eine Million Armenier wurden deportiert, erschossen und in den Tod getrieben. Die osmanische Führung – die jungtürkische CUP – plante und führte diese Vernichtung systematisch durch. Dass die Türkei dies bis heute nicht vollständig anerkennt, ist ein politisches, nicht ein historisches Problem. Die Historiker sind sich einig – die Politiker noch nicht."',
            fragen: [
                { frage: 'Arbeite Akçams Hauptthese heraus: Was ist historisch belegt, was ist politisch umstritten?', hinweis: 'Historischer Befund (Genozid) vs. politische Anerkennung – was ist der Unterschied?' },
                { frage: 'Erkläre, was der Völkermord an den Armeniern 1915 war: Wer waren die Täter, wer die Opfer, was waren die Umstände?', hinweis: 'Jungtürken/CUP, Erster Weltkrieg, Deportationen, Todesgefährten, Zahlen.' },
                { frage: 'Beurteile: Warum ist die Frage der Anerkennung des Völkermords bis heute politisch brisant – für die Türkei, für Deutschland, für die Welt?', hinweis: 'Nationalidentität, Bündnispolitik, rechtliche Folgen, historische Verantwortung, armenische Diaspora.' }
            ]
        },
        {
            id: 'tu-txt-2',
            title: 'Atatürk und die Modernisierung der Türkei',
            autor: 'Andrew Mango, „Atatürk: The Biography of the Founder of Modern Turkey" (1999)',
            text: '„Atatürk war ein Modernisierer, der keine Zeit für langsame Veränderungen hatte. Er sah die Türkei als ein Projekt, das er in einer Generation vollenden musste. Sein Autoritarismus war nicht Selbstzweck – er war Mittel zum Zweck der Modernisierung. Ob dieser Zweck den Mittel rechtfertigte, darüber lässt sich streiten. Was nicht bestritten werden kann: Er schuf einen modernen Staat, wo vorher Kaiserherrlichkeit war, und er gab der Türkei eine Perspektive auf die Zukunft."',
            fragen: [
                { frage: 'Arbeite Mangos Grundposition zu Atatürk heraus: Wie rechtfertigt er den Autoritarismus?', hinweis: 'Mittel zum Zweck der Modernisierung – nicht Selbstzweck. Was folgt daraus für die Bewertung?' },
                { frage: 'Erkläre: Was versteht Mango unter „Modernisierung" im türkischen Kontext? Was konkret veränderte Atatürk?', hinweis: 'Schrift, Frauenrechte, Laizismus, Kleidung, Kalender, Sprache – was bedeutete das für den Alltag?' },
                { frage: 'Beurteile: Kann autoritäre Modernisierung ein legitimes politisches Modell sein, oder widerspricht das grundlegenden Werten?', hinweis: 'Denke an: Menschenrechte, Selbstbestimmung, Demokratie. Rechtfertigt ein gutes Ziel autoritäre Mittel?' }
            ]
        }
    ],

    'europaeische-union': [
        {
            id: 'eu-txt-1',
            title: 'Die EU: Friedensprojekt oder bürokratisches Monster?',
            autor: 'Jan Zielonka, „Europe as Empire" (2006)',
            text: '„Die Europäische Union ist ein einzigartiges politisches Experiment – aber kein perfektes. Sie hat Frieden und Wohlstand gesichert, wie kein politisches Gebilde in der Geschichte zuvor. Gleichzeitig leidet sie an einem fundamentalen Demokratiedefizit: Die wichtigsten Entscheidungen werden von Kommissionen und Räten getroffen, die kaum jemand gewählt hat. Der Widerspruch zwischen dem Anspruch auf Demokratie und der Wirklichkeit europäischer Bürokratie ist das eigentliche Problem der EU."',
            fragen: [
                { frage: 'Erkläre den Widerspruch, den Zielonka im Kern der EU sieht.', hinweis: 'Erfolg bei Frieden und Wohlstand vs. Demokratiedefizit – was meint er mit Letzterem konkret?' },
                { frage: 'Arbeite heraus, was Zielonka als „fundamentales Demokratiedefizit" der EU bezeichnet. Wer entscheidet, wie?', hinweis: 'Kommission, Rat der EU, Europäischer Rat – wer ist gewählt, wer nicht? Wie kann das Parlament kontrollieren?' },
                { frage: 'Beurteile: Ist das Demokratiedefizit der EU ein unvermeidbares Merkmal supranationaler Institutionen, oder ein behebbares Problem?', hinweis: 'Welche Reformen könnte man vornehmen? Warum sind sie schwierig? Wäre mehr oder weniger EU die Lösung?' }
            ]
        },
        {
            id: 'eu-txt-2',
            title: 'Brexit: Die EU auf dem Prüfstand',
            autor: 'Timothy Garton Ash, „Auf Probe: Europa und die Frage des Überlebens" (2016)',
            text: '„Der Brexit ist eine Katastrophe für Großbritannien und ein Warnsignal für Europa. Er zeigt, dass die europäische Integration nicht unumkehrbar ist und dass Populismus und Nationalismus die EU real gefährden können. Aber er zeigt auch: Die restlichen 27 Mitglieder haben zusammengehalten. Die EU ist nicht zusammengebrochen. Der Brexit könnte paradoxerweise die verbleibende Union gestärkt haben – indem er zeigte, welchen Preis das Herausgehen kostet."',
            fragen: [
                { frage: 'Arbeite heraus, welche zwei Lehren Ash aus dem Brexit zieht – eine negative und eine positive.', hinweis: 'Negative: Integration nicht unumkehrbar, Populismus-Gefahr. Positive: EU hielt zusammen, Brexit-Preis abschreckend.' },
                { frage: 'Erkläre: Warum nennt Ash den Brexit eine „Katastrophe für Großbritannien"? Was hat das UK verloren?', hinweis: 'Binnenmarkt, EU-Bürgerrechte, Einfluss auf EU-Politik, Sicherheitskooperation, Nordirland-Problem.' },
                { frage: 'Beurteile: Hat der Brexit die EU geschwächt oder – wie Ash andeutet – am Ende gestärkt?', hinweis: 'Was sagen die Entwicklungen nach 2016? Wie hat die EU auf die Eurokrise, die Pandemie und den Ukraine-Krieg reagiert?' }
            ]
        }
    ]
};

// =============================================
// UI LOGIK
// =============================================

function switchQuellenarbeitType(type) {
    currentQuellenarbeitType = type;

    document.getElementById('qlBtnKarikatur').classList.toggle('active', type === 'karikatur');
    document.getElementById('qlBtnHistorikertext').classList.toggle('active', type === 'historikertext');
}

function openQuellenarbeit(topicId) {
    const data = currentQuellenarbeitType === 'karikatur'
        ? KARIKATUREN_DATA[topicId]
        : HISTORIKERTEXTE_DATA[topicId];

    if (!data || data.length === 0) {
        showToast('Für dieses Thema sind noch keine Quellen verfügbar.', 'info');
        return;
    }

    const topicNames = {
        'französische-revolution': 'Französische Revolution',
        'industrialisierung': 'Industrialisierung',
        'imperialismus': 'Imperialismus',
        'erster-weltkrieg': 'Erster Weltkrieg',
        'weimarer-republik': 'Weimarer Republik',
        'revolution-1848': 'Revolution 1848',
        'nationalsozialismus': 'Nationalsozialismus',
        'zweiter-weltkrieg': 'Zweiter Weltkrieg',
        'holocaust': 'Holocaust',
        'brd-ddr': 'BRD/DDR',
        'kalter-krieg': 'Kalter Krieg',
        'wiedervereinigung': 'Wiedervereinigung',
        'russland': 'Russland',
        'china': 'China',
        'tuerkei': 'Türkei/Osmanisches Reich',
        'europaeische-union': 'Europäische Union'
    };

    const typeLabel = currentQuellenarbeitType === 'karikatur' ? '🎨 Karikatur' : '📄 Historikertext';
    const topicName = topicNames[topicId] || topicId;

    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');

    content.innerHTML = `
        <div class="quellenarbeit-modal">
            <div class="quellenarbeit-header">
                <span class="ql-type-badge">${typeLabel}</span>
                <h2>${topicName}</h2>
                <p>${data.length} Quelle${data.length !== 1 ? 'n' : ''} verfügbar – wähle eine aus:</p>
            </div>
            <div class="ql-source-list">
                ${data.map((item, index) => `
                    <button class="ql-source-btn" onclick="openQuellenarbeitItem('${topicId}', ${index})">
                        <span class="ql-source-num">${index + 1}</span>
                        <div class="ql-source-info">
                            <strong>${item.title}</strong>
                            ${item.autor ? `<small>${item.autor}</small>` : ''}
                        </div>
                        <span class="ql-source-arrow">→</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function openQuellenarbeitItem(topicId, index) {
    const data = currentQuellenarbeitType === 'karikatur'
        ? KARIKATUREN_DATA[topicId]
        : HISTORIKERTEXTE_DATA[topicId];

    const item = data[index];
    if (!item) return;

    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');
    const isKarikatur = currentQuellenarbeitType === 'karikatur';

    content.innerHTML = `
        <div class="quellenarbeit-item">
            <button class="ql-back-btn" onclick="openQuellenarbeit('${topicId}')">← Zurück</button>

            <div class="ql-source-display">
                <h3>${item.title}</h3>
                ${item.autor ? `<p class="ql-autor">${item.autor}</p>` : ''}

                ${isKarikatur ? `
                    <div class="ql-karikatur-frame">
                        <div class="ql-karikatur-label">🎨 Historische Karikatur</div>
                        <div class="ql-karikatur-visual">
                            <div class="ql-karikatur-icon-large">🖼️</div>
                            <div class="ql-karikatur-desc-block">
                                <div class="ql-karikatur-desc-title">Bild-Recherche</div>
                                <p class="ql-karikatur-desc-text">Da diese Karikatur ohne Bild integriert ist, kannst du nach dem Namen <strong>"${item.title}"</strong> googeln, um dir das Bild anzuschauen.</p>
                            </div>
                        </div>
                        <div class="ql-karikatur-meta">
                            <span>📅 ${item.title.match(/\d{4}/) ? item.title.match(/\d{4}/)[0] : 'Historische Quelle'}</span>
                            <span>Quelle: Schulbuch-Karikatur</span>
                        </div>
                    </div>
                ` : `
                    <div class="ql-text-box">
                        <div class="ql-text-label">📄 Historikertext / Primärquelle</div>
                        <blockquote>${item.text}</blockquote>
                        ${item.quelle ? `<p class="ql-text-quelle">Quelle: ${item.quelle}</p>` : ''}
                    </div>
                `}
            </div>

            <div class="ql-fragen">
                <h4>Aufgaben</h4>
                ${item.fragen.map((frage, i) => `
                    <div class="ql-frage-block">
                        <div class="ql-frage-header">
                            <span class="ql-frage-num">Aufgabe ${i + 1}</span>
                        </div>
                        <p class="ql-frage-text">${frage.frage}</p>
                        <details class="ql-hinweis-details">
                            <summary>💡 Hilfestellung anzeigen</summary>
                            <p class="ql-hinweis-text">${frage.hinweis}</p>
                        </details>
                        <textarea class="ql-answer-field" placeholder="Schreibe hier deine Antwort..." rows="4"></textarea>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.classList.add('active');
}
