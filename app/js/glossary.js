// ===== GLOSSAR-SYSTEM =====

let currentGlossaryFilter = 'alle';

// Glossar-Daten nach Klassenstufen
const GLOSSARY_DATA = {
    klasse8: [
        {
            begriff: 'Absolutismus',
            definition: 'Regierungsform, bei der der Herrscher (meist ein König) uneingeschränkte Macht besitzt. Keine Gewaltenteilung, keine Verfassung.',
            beispiel: 'Ludwig XIV. von Frankreich: "Der Staat bin ich!"',
            thema: 'Französische Revolution'
        },
        {
            begriff: 'Aufklärung',
            definition: 'Geistige Bewegung des 17./18. Jahrhunderts, die Vernunft und Wissenschaft betonte. Kritik an Kirche und absolutistischer Herrschaft.',
            beispiel: 'Philosophen: Voltaire, Rousseau, Montesquieu',
            thema: 'Französische Revolution'
        },
        {
            begriff: 'Bürgertum',
            definition: 'Soziale Schicht zwischen Adel und Arbeiterschaft. Meist gebildet und wirtschaftlich erfolgreich (Kaufleute, Unternehmer, Ärzte, Anwälte).',
            beispiel: 'Im 19. Jahrhundert forderte das Bürgertum politische Mitbestimmung.',
            thema: 'Nationalstaat'
        },
        {
            begriff: 'Deutscher Bund',
            definition: 'Loser Staatenbund von 1815-1866, gegründet nach dem Wiener Kongress. Ersatz für das Heilige Römische Reich.',
            beispiel: 'Österreich und Preußen waren die mächtigsten Mitglieder.',
            thema: 'Wiener Kongress'
        },
        {
            begriff: 'Imperialismus',
            definition: 'Bestreben von Großmächten, ihre Herrschaft auf andere Gebiete auszudehnen (Kolonien). Höhepunkt: 1880-1914.',
            beispiel: 'Wettlauf um Afrika: Europäische Mächte teilten den Kontinent unter sich auf.',
            thema: 'Imperialismus'
        },
        {
            begriff: 'Industrialisierung',
            definition: 'Übergang von der Agrar- zur Industriegesellschaft. Maschinelle Produktion ersetzt Handarbeit. Begann in England Ende 18. Jahrhundert.',
            beispiel: 'Dampfmaschine, Eisenbahn, Textilfabriken',
            thema: 'Industrialisierung'
        },
        {
            begriff: 'Kapitalismus',
            definition: 'Wirtschaftsordnung, in der Produktionsmittel Privatbesitz sind. Ziel: Gewinnmaximierung durch freien Markt.',
            beispiel: 'Unternehmer investieren Kapital, um Profit zu erzielen.',
            thema: 'Industrialisierung'
        },
        {
            begriff: 'Kolonialismus',
            definition: 'Herrschaft eines Staates über fremde Gebiete und Völker. Ausbeutung von Rohstoffen und Arbeitskräften.',
            beispiel: 'Deutsche Kolonien: Namibia, Tansania, Kamerun, Togo',
            thema: 'Imperialismus'
        },
        {
            begriff: 'Liberalismus',
            definition: 'Politische Bewegung, die individuelle Freiheit, Rechtsstaatlichkeit und Verfassung fordert. Gegen Absolutismus.',
            beispiel: 'Forderungen: Pressefreiheit, Versammlungsfreiheit, Gewaltenteilung',
            thema: 'Revolution 1848'
        },
        {
            begriff: 'Nationalismus',
            definition: 'Übersteigertes Nationalgefühl. Betonung der eigenen Nation als überlegen gegenüber anderen.',
            beispiel: 'Führte im 19./20. Jahrhundert zu Konflikten und Kriegen.',
            thema: 'Erster Weltkrieg'
        },
        {
            begriff: 'Nationalstaat',
            definition: 'Staat, dessen Grenzen sich mit einem Volk und seiner Kultur decken. Einheitliche Sprache, Gesetze, Verwaltung.',
            beispiel: 'Deutschland wurde 1871 zum Nationalstaat unter Bismarck.',
            thema: 'Nationalstaat'
        },
        {
            begriff: 'Paulskirchenverfassung',
            definition: 'Erste demokratische Verfassung für Deutschland, 1849 von der Frankfurter Nationalversammlung erarbeitet. Scheiterte.',
            beispiel: 'Enthielt Grundrechte wie Meinungs- und Pressefreiheit.',
            thema: 'Revolution 1848'
        },
        {
            begriff: 'Proletariat',
            definition: 'Arbeiterklasse in der Industriegesellschaft. Besitzt keine Produktionsmittel, nur ihre Arbeitskraft.',
            beispiel: 'Arbeitete unter schlechten Bedingungen in Fabriken.',
            thema: 'Industrialisierung'
        },
        {
            begriff: 'Restauration',
            definition: 'Wiederherstellung der alten Ordnung nach der Französischen Revolution und Napoleon. Ziel: Zurück zu Monarchien.',
            beispiel: 'Wiener Kongress 1815: Europäische Fürsten stellten alte Grenzen wieder her.',
            thema: 'Wiener Kongress'
        },
        {
            begriff: 'Revolution',
            definition: 'Grundlegender Umsturz der politischen, wirtschaftlichen oder sozialen Verhältnisse, meist mit Gewalt.',
            beispiel: 'Französische Revolution 1789, Revolution 1848',
            thema: 'Französische Revolution'
        },
        {
            begriff: 'Sozialismus',
            definition: 'Gesellschaftsordnung, die soziale Gerechtigkeit anstrebt. Produktionsmittel sollen der Gemeinschaft gehören, nicht Privatpersonen.',
            beispiel: 'Karl Marx entwickelte die Theorie des wissenschaftlichen Sozialismus.',
            thema: 'Industrialisierung'
        },
        {
            begriff: 'Ständegesellschaft',
            definition: 'Gesellschaftsordnung im Absolutismus mit drei Ständen: Klerus (Geistliche), Adel, Dritter Stand (Bürger, Bauern).',
            beispiel: 'Vor 1789 in Frankreich: Nur der dritte Stand zahlte Steuern.',
            thema: 'Französische Revolution'
        },
        {
            begriff: 'Verfassung',
            definition: 'Grundlegendes Gesetz eines Staates, das die Staatsform, Rechte der Bürger und Organisation der Staatsgewalt regelt.',
            beispiel: 'Grundgesetz der Bundesrepublik Deutschland (seit 1949)',
            thema: 'Nationalstaat'
        }
    ],

    klasse9: [
        {
            begriff: 'Antisemitismus',
            definition: 'Feindschaft und Hass gegen Juden. Grundlage der NS-Ideologie.',
            beispiel: 'Im Nationalsozialismus: Nürnberger Gesetze, Reichspogromnacht, Holocaust',
            thema: 'Nationalsozialismus'
        },
        {
            begriff: 'BRD (Bundesrepublik Deutschland)',
            definition: 'Demokratischer deutscher Staat, gegründet am 23. Mai 1949 in den westlichen Besatzungszonen.',
            beispiel: 'Hauptstadt: Bonn (bis 1990), dann Berlin',
            thema: 'BRD und DDR'
        },
        {
            begriff: 'DDR (Deutsche Demokratische Republik)',
            definition: 'Sozialistischer deutscher Staat, gegründet am 7. Oktober 1949 in der sowjetischen Besatzungszone.',
            beispiel: 'Hauptstadt: Ost-Berlin. Regiert von der SED.',
            thema: 'BRD und DDR'
        },
        {
            begriff: 'Diktatur',
            definition: 'Herrschaftsform, in der eine Person oder Partei unbeschränkte Macht ausübt. Keine Gewaltenteilung, keine Grundrechte.',
            beispiel: 'NS-Diktatur (Hitler), DDR (SED)',
            thema: 'Nationalsozialismus'
        },
        {
            begriff: 'Ermächtigungsgesetz',
            definition: 'Gesetz vom 24. März 1933, das Hitler erlaubte, ohne Reichstag zu regieren. Ende der Weimarer Demokratie.',
            beispiel: 'Nur die SPD stimmte dagegen.',
            thema: 'Nationalsozialismus'
        },
        {
            begriff: 'Führerprinzip',
            definition: 'NS-Ideologie: Unbedingter Gehorsam gegenüber dem "Führer" Adolf Hitler.',
            beispiel: '"Ein Volk, ein Reich, ein Führer" - NS-Propaganda',
            thema: 'Nationalsozialismus'
        },
        {
            begriff: 'Gleichschaltung',
            definition: 'Auflösung aller selbstständigen Organisationen und ihre Unterstellung unter NS-Kontrolle (1933).',
            beispiel: 'Gewerkschaften, Parteien, Vereine wurden verboten oder gleichgeschaltet.',
            thema: 'Nationalsozialismus'
        },
        {
            begriff: 'Holocaust / Shoah',
            definition: 'Systematische Ermordung von etwa 6 Millionen europäischen Juden durch das NS-Regime (1941-1945).',
            beispiel: 'Vernichtungslager: Auschwitz, Treblinka, Sobibor',
            thema: 'Holocaust'
        },
        {
            begriff: 'Kalter Krieg',
            definition: 'Systemkonflikt zwischen USA (Kapitalismus) und Sowjetunion (Kommunismus) von 1947-1991. Kein direkter Krieg.',
            beispiel: 'Berlin-Blockade, Kubakrise, Wettrüsten',
            thema: 'Kalter Krieg'
        },
        {
            begriff: 'Konzentrationslager (KZ)',
            definition: 'Lager zur Verfolgung und Ermordung von politischen Gegnern, Juden und anderen Verfolgten im NS-Regime.',
            beispiel: 'Dachau (erstes KZ, 1933), Buchenwald, Auschwitz',
            thema: 'Holocaust'
        },
        {
            begriff: 'Marshallplan',
            definition: 'US-Wirtschaftshilfe für Europa nach dem Zweiten Weltkrieg (1948-1952). Ziel: Wiederaufbau und Eindämmung des Kommunismus.',
            beispiel: 'Westdeutschland erhielt etwa 1,4 Milliarden Dollar.',
            thema: 'BRD und DDR'
        },
        {
            begriff: 'Planwirtschaft',
            definition: 'Wirtschaftsordnung, in der der Staat alle wirtschaftlichen Entscheidungen zentral plant und lenkt.',
            beispiel: 'DDR: Fünfjahrespläne bestimmten Produktion und Preise.',
            thema: 'BRD und DDR'
        },
        {
            begriff: 'Reichspogromnacht',
            definition: 'Organisierte Gewalt gegen Juden in der Nacht vom 9. auf 10. November 1938. Synagogen wurden angezündet, Geschäfte zerstört.',
            beispiel: 'Über 1.000 Synagogen zerstört, etwa 30.000 Juden verhaftet.',
            thema: 'Holocaust'
        },
        {
            begriff: 'SED (Sozialistische Einheitspartei Deutschlands)',
            definition: 'Herrschende Partei in der DDR (1946-1989). Entstand aus Zwangsvereinigung von SPD und KPD.',
            beispiel: 'Führte die DDR als Einheitspartei in einer Diktatur.',
            thema: 'BRD und DDR'
        },
        {
            begriff: 'Soziale Marktwirtschaft',
            definition: 'Wirtschaftsordnung der BRD: Freier Markt kombiniert mit sozialem Ausgleich durch den Staat.',
            beispiel: 'Ludwig Erhard führte sie 1948 ein. Wirtschaftswunder folgte.',
            thema: 'BRD und DDR'
        },
        {
            begriff: 'Stasi (Ministerium für Staatssicherheit)',
            definition: 'Geheimdienst der DDR. Überwachte und unterdrückte die Bevölkerung.',
            beispiel: '91.000 hauptamtliche und ca. 180.000 inoffizielle Mitarbeiter (IM)',
            thema: 'BRD und DDR'
        },
        {
            begriff: 'Totalitarismus',
            definition: 'Herrschaftsform mit totaler Kontrolle über alle Lebensbereiche. Keine Freiheit, ständige Überwachung.',
            beispiel: 'NS-Diktatur, DDR, Sowjetunion unter Stalin',
            thema: 'Nationalsozialismus'
        },
        {
            begriff: 'Versailler Vertrag',
            definition: 'Friedensvertrag nach dem Ersten Weltkrieg (1919). Deutschland musste Gebiete abtreten, Reparationen zahlen, Kriegsschuld anerkennen.',
            beispiel: 'Wurde als "Diktatfrieden" empfunden und belastete die Weimarer Republik.',
            thema: 'Weimarer Republik'
        },
        {
            begriff: 'Volksgemeinschaft',
            definition: 'NS-Ideologie einer Gemeinschaft aller "arischen" Deutschen. Ausschluss von "Volksschädlingen" (Juden, politische Gegner).',
            beispiel: 'Propaganda: "Du bist nichts, dein Volk ist alles!"',
            thema: 'Nationalsozialismus'
        },
        {
            begriff: 'Währungsreform',
            definition: 'Einführung der D-Mark am 20. Juni 1948 in den Westzonen. Beendete Inflation und Schwarzmarkt.',
            beispiel: 'Start des Wirtschaftswunders in der späteren BRD.',
            thema: 'BRD und DDR'
        }
    ],

    klasse10: [
        {
            begriff: 'Bolschewiki',
            definition: 'Radikale russische Kommunisten unter Lenin. Übernahmen 1917 die Macht in Russland.',
            beispiel: 'Oktoberrevolution 1917: "Alle Macht den Sowjets!"',
            thema: 'Russland'
        },
        {
            begriff: 'Europäische Integration',
            definition: 'Prozess der wirtschaftlichen und politischen Zusammenarbeit europäischer Staaten seit 1945.',
            beispiel: 'Von Montanunion (1951) über EWG zur EU (1993)',
            thema: 'Europäische Union'
        },
        {
            begriff: 'Föderalismus',
            definition: 'Staatsform, bei der mehrere Gliedstaaten (Länder) einen Bundesstaat bilden. Aufteilung der Macht.',
            beispiel: 'Deutschland: Bund und 16 Bundesländer',
            thema: 'BRD'
        },
        {
            begriff: 'Glasnost',
            definition: 'Russisch: "Offenheit". Politik Gorbatschows in der Sowjetunion (ab 1985): Mehr Meinungsfreiheit, Transparenz.',
            beispiel: 'Kritik am System wurde erlaubt, Presse freier.',
            thema: 'Russland'
        },
        {
            begriff: 'Globalisierung',
            definition: 'Weltweite Verflechtung von Wirtschaft, Politik, Kultur und Kommunikation seit Ende des 20. Jahrhunderts.',
            beispiel: 'Internet, multinationale Konzerne, Welthandel',
            thema: 'Moderne'
        },
        {
            begriff: 'Gulag',
            definition: 'System sowjetischer Arbeitslager. Millionen Gefangene unter Stalin (1930er-1950er Jahre).',
            beispiel: 'Politische Gegner, "Kulaken", ethnische Minderheiten wurden deportiert.',
            thema: 'Russland'
        },
        {
            begriff: 'Imperialismus',
            definition: 'Machtpolitik von Großstaaten zur Errichtung von Herrschaft über andere Gebiete.',
            beispiel: 'Russisches Reich, Osmanisches Reich, China im 19. Jahrhundert',
            thema: 'Imperien'
        },
        {
            begriff: 'Integration',
            definition: 'Einbeziehung und Zusammenführung verschiedener Gruppen zu einem Ganzen.',
            beispiel: 'Europäische Integration, Integration von Migranten',
            thema: 'Europäische Union'
        },
        {
            begriff: 'Intervention',
            definition: 'Einmischung oder militärisches Eingreifen eines Staates in die Angelegenheiten eines anderen.',
            beispiel: 'NATO-Intervention in Jugoslawien (1999)',
            thema: 'Imperien'
        },
        {
            begriff: 'Kulturrevolution',
            definition: 'Radikale politische Kampagne in China (1966-1976) unter Mao Zedong. Rote Garden verfolgten "Klassenfeinde".',
            beispiel: 'Intellektuelle, Lehrer und "Bourgeoisie" wurden verfolgt.',
            thema: 'China'
        },
        {
            begriff: 'Laizismus',
            definition: 'Strikte Trennung von Staat und Religion. Religion ist Privatsache.',
            beispiel: 'Atatürk führte Laizismus in der Türkei ein (1920er Jahre).',
            thema: 'Osmanisches Reich & Türkei'
        },
        {
            begriff: 'Marxismus',
            definition: 'Politische und wirtschaftliche Theorie von Karl Marx: Klassenkampf führt zur kommunistischen Gesellschaft.',
            beispiel: 'Grundlage für Kommunismus in Sowjetunion, China, DDR',
            thema: 'Russland'
        },
        {
            begriff: 'Montanunion (EGKS)',
            definition: 'Europäische Gemeinschaft für Kohle und Stahl (1951). Erste Stufe der europäischen Integration.',
            beispiel: 'Gründungsmitglieder: Deutschland, Frankreich, Italien, Benelux',
            thema: 'Europäische Union'
        },
        {
            begriff: 'Perestroika',
            definition: 'Russisch: "Umgestaltung". Wirtschaftsreformen Gorbatschows in der Sowjetunion (ab 1985).',
            beispiel: 'Mehr Eigenverantwortung für Betriebe, weniger Planwirtschaft',
            thema: 'Russland'
        },
        {
            begriff: 'Säkularisierung',
            definition: 'Zurückdrängung religiöser Einflüsse in Staat und Gesellschaft. Verweltlichung.',
            beispiel: 'Aufklärung, Französische Revolution, Trennung von Kirche und Staat',
            thema: 'Moderne'
        },
        {
            begriff: 'Stalinismus',
            definition: 'Totalitäres Herrschaftssystem unter Stalin in der Sowjetunion (1924-1953). Terror, Zwangskollektivierung, Personenkult.',
            beispiel: 'Große Säuberungen: Millionen Tote in Gulags',
            thema: 'Russland'
        },
        {
            begriff: 'Völkermord (Genozid)',
            definition: 'Systematische Vernichtung einer ethnischen, religiösen oder nationalen Gruppe.',
            beispiel: 'Holocaust (Juden), Völkermord an Armeniern (1915), Ruanda (1994)',
            thema: 'Osmanisches Reich'
        },
        {
            begriff: 'Zar',
            definition: 'Titel der russischen Kaiser (1547-1917). Herrschte absolutistisch.',
            beispiel: 'Letzter Zar: Nikolaus II., wurde 1917 gestürzt.',
            thema: 'Russland'
        }
    ]
};

// Glossar initialisieren
function initGlossary() {
    loadGlossaryContent();
    setupGlossaryFilters();
}

// Glossar-Inhalt laden
function loadGlossaryContent(filter = 'alle') {
    const container = document.getElementById('glossaryList');
    if (!container) return;

    let allTerms = [];

    // Je nach Filter Begriffe sammeln
    if (filter === 'alle') {
        allTerms = [
            ...GLOSSARY_DATA.klasse8.map(t => ({ ...t, klasse: 8 })),
            ...GLOSSARY_DATA.klasse9.map(t => ({ ...t, klasse: 9 })),
            ...GLOSSARY_DATA.klasse10.map(t => ({ ...t, klasse: 10 }))
        ];
    } else if (filter === 'klasse8') {
        allTerms = GLOSSARY_DATA.klasse8.map(t => ({ ...t, klasse: 8 }));
    } else if (filter === 'klasse9') {
        allTerms = GLOSSARY_DATA.klasse9.map(t => ({ ...t, klasse: 9 }));
    } else if (filter === 'klasse10') {
        allTerms = GLOSSARY_DATA.klasse10.map(t => ({ ...t, klasse: 10 }));
    }

    // Alphabetisch sortieren
    allTerms.sort((a, b) => a.begriff.localeCompare(b.begriff));

    // Nach Buchstabe gruppieren
    const grouped = {};
    allTerms.forEach(term => {
        const letter = term.begriff[0].toUpperCase();
        if (!grouped[letter]) grouped[letter] = [];
        grouped[letter].push(term);
    });

    const presentLetters = Object.keys(grouped).sort();

    // Gruppierten Inhalt rendern
    container.innerHTML = presentLetters.map(letter => `
        <div id="glossary-letter-${letter}" class="glossary-letter-group">
            <div class="glossary-letter-header">${letter}</div>
            ${grouped[letter].map(term => {
                const safe = (term.begriff || '').replace(/'/g, "\\'");
                return `
                <div class="glossary-item" data-klasse="${term.klasse}">
                    <div class="glossary-term">
                        <span class="term-name">${term.begriff}</span>
                        <span class="term-class">Klasse ${term.klasse}</span>
                    </div>
                    <div class="glossary-definition">${term.definition}</div>
                    ${term.beispiel ? `<div class="glossary-example"><strong>Beispiel:</strong> ${term.beispiel}</div>` : ''}
                    <div class="glossary-theme"><strong>Thema:</strong> ${term.thema}</div>
                    <button class="glossary-ai-btn" onclick="askTutorAboutTerm('${safe}')">
                        <span>🤖</span> Frag den KI-Tutor zu „${term.begriff}"
                    </button>
                </div>
            `;}).join('')}
        </div>
    `).join('');

    // Alphabet-Bar aktualisieren
    const alphabetBar = document.getElementById('glossaryAlphabetBar');
    if (alphabetBar) {
        const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        alphabetBar.innerHTML = allLetters.map(letter => `
            <span
                class="alphabet-letter ${presentLetters.includes(letter) ? 'active' : 'inactive'}"
                onclick="${presentLetters.includes(letter) ? `document.getElementById('glossary-letter-${letter}').scrollIntoView({behavior:'smooth'})` : ''}"
            >${letter}</span>
        `).join('');
    }
}

// Filter einrichten
function setupGlossaryFilters() {
    const filterButtons = document.querySelectorAll('.glossary-filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktiven Button markieren
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter anwenden
            const filter = btn.dataset.filter;
            currentGlossaryFilter = filter;
            loadGlossaryContent(filter);
        });
    });
}

// Glossar-Suche
function searchGlossary(searchTerm) {
    const items = document.querySelectorAll('.glossary-item');
    const lowerSearch = searchTerm.toLowerCase();

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(lowerSearch)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Begriff im Glossar nachschlagen
function lookupTerm(term) {
    const allTerms = [
        ...GLOSSARY_DATA.klasse8,
        ...GLOSSARY_DATA.klasse9,
        ...GLOSSARY_DATA.klasse10
    ];

    const found = allTerms.find(t => t.begriff.toLowerCase() === term.toLowerCase());
    return found;
}

// KI-Tutor-Optionen für einen Glossar-Begriff anzeigen
function askTutorAboutTerm(begriff) {
    // Lese den Begriff aus dem Glossar
    const term = lookupTerm(begriff);
    if (!term) {
        if (typeof window.showToast === 'function') window.showToast('Begriff nicht gefunden.', 'warning');
        return;
    }

    // Frage-Optionen für den Tutor
    const prompts = [
        { label: '📖 Besser erklären (einfacher)',  text: `Erkläre mir den Begriff „${term.begriff}" noch einmal so einfach wie möglich, am besten mit einem Beispiel aus dem Alltag.` },
        { label: '🧭 Kontext einordnen',            text: `Ordne den Begriff „${term.begriff}" historisch ein: Wann kommt er vor, in welchem Zusammenhang steht er, und wie hängt er mit dem Thema „${term.thema}" zusammen?` },
        { label: '⚖️ Warum ist das wichtig?',       text: `Warum ist der Begriff „${term.begriff}" historisch und für mich heute wichtig? Welche Bedeutung hat er für das Verständnis von „${term.thema}"?` },
        { label: '🎯 Prüfungs-Tipp',                text: `Wie könnte eine typische Klausur-Aufgabe zu „${term.begriff}" aussehen — und was wäre eine gute Musterantwort?` }
    ];

    // Bestehendes Modal verwenden, falls vorhanden, sonst eigenes
    const existing = document.getElementById('tutorTermModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'tutorTermModal';
    modal.className = 'modal tutor-term-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content tutor-term-content" onclick="event.stopPropagation()">
            <button class="modal-close" onclick="document.getElementById('tutorTermModal').remove()">&times;</button>
            <h2 class="tutor-term-title">🤖 KI-Tutor zu „${term.begriff}"</h2>
            <p class="tutor-term-sub">Was soll der Tutor für dich tun?</p>
            <div class="tutor-term-options">
                ${prompts.map((p, i) => `
                    <button class="tutor-term-option" data-idx="${i}">
                        <span class="tutor-term-option-label">${p.label}</span>
                        <span class="tutor-term-option-text">${p.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);

    // Click-Handler — Tutor öffnen und Prompt einsetzen
    modal.querySelectorAll('.tutor-term-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx, 10);
            const promptText = prompts[idx].text;
            modal.remove();
            sendTutorPrompt(promptText);
        });
    });
}

// Hilfsfunktion: Tutor öffnen + Prompt vorbefüllen und absenden
function sendTutorPrompt(text) {
    if (typeof window.showSection === 'function') window.showSection('chat');
    // Input setzen
    setTimeout(() => {
        const input = document.getElementById('chatInput') || document.querySelector('textarea[id*="chat"]') || document.querySelector('input[id*="chat"]');
        if (input) {
            input.value = text;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        // Auto-Send über die echte Chat-Funktion
        if (typeof window.sendChatMessage === 'function') {
            try { window.sendChatMessage(); } catch (e) { /* still */ }
        } else if (typeof sendChatMessage === 'function') {
            try { sendChatMessage(); } catch (e) { /* still */ }
        }
    }, 120);
}

window.askTutorAboutTerm = askTutorAboutTerm;
window.sendTutorPrompt = sendTutorPrompt;
