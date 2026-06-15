import tkinter as tk
from tkinter import scrolledtext, messagebox, simpledialog, font
from tkinter import ttk
import os
import openai
import random
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# OpenAI API-Key laden
openai.api_key = os.getenv("OPENAI_API_KEY")

# Modern color scheme
COLORS = {
    'bg_dark': '#1e1e1e',
    'bg_medium': '#2d2d2d', 
    'bg_light': '#3c3c3c',
    'accent': '#007acc',
    'accent_hover': '#005a9e',
    'text_primary': '#ffffff',
    'text_secondary': '#cccccc',
    'text_muted': '#999999',
    'success': '#4caf50',
    'warning': '#ff9800',
    'error': '#f44336',
    'quiz_correct': '#00e676',
    'quiz_incorrect': '#ff5722'
}

# Extended multilingual content with motivational messages
LANGUAGES = {
    'de': {
        'name': 'Deutsch',
        'flag': '🇩🇪',
        'ui': {
            'title': 'Geschichts-Tutor',
            'subtitle': 'Entdecke die faszinierende Welt der Geschichte',
            'welcome': 'Was möchtest du heute lernen? Wähle ein Zeitalter aus und beginne deine Reise durch die Geschichte!',
            'ai_chat': '🤖 KI-Tutor Chat',
            'random_quiz': '🎯 Zufälliges Quiz',
            'settings': '⚙️ Einstellungen',
            'language': '🌐 Sprache',
            'back': '← Zurück',
            'send': 'Senden',
            'check_answer': 'Antwort prüfen',
            'cancel': 'Abbrechen',
            'close': 'Schließen',
            'difficulty': 'Schwierigkeit',
            'topics_available': 'Themen verfügbar',
            'quiz_question': 'Quizfrage aus',
            'which_fact_correct': 'Welcher Fakt ist korrekt?',
            'select_answer_first': 'Bitte wähle eine Antwort aus!',
            'api_configured': 'OpenAI API Key: ✅ Konfiguriert',
            'api_not_configured': 'OpenAI API Key: ❌ Nicht konfiguriert',
            'api_info': 'Um den KI-Tutor zu nutzen, benötigst du einen OpenAI API Key.\nFüge ihn in die .env Datei ein:\nOPENAI_API_KEY=dein-key-hier',
            'chat_welcome': 'Hallo! Ich bin dein KI-Geschichts-Tutor. Stelle mir Fragen zu historischen Themen und ich helfe dir beim Lernen! 📚'
        },
        'quiz_feedback': {
            'correct': [
                'Perfekt! 🎉 Du hast ein echtes Geschichtstalent!',
                'Fantastisch! 🌟 Du kennst dich wirklich aus!',
                'Ausgezeichnet! 🎯 Das war eine schwierige Frage!',
                'Bravo! 👏 Du wirst immer besser!',
                'Richtig! ⭐ Du hast ein großartiges Gedächtnis!',
                'Wow! 🚀 Du bist ein echter Geschichtsexperte!',
                'Super! 💪 Weiter so!'
            ],
            'incorrect': [
                'Nicht ganz, aber du lernst! 💪 Probier es nochmal!',
                'Knapp daneben! 🎯 Beim nächsten Mal schaffst du es!',
                'Fast richtig! 🌟 Du bist auf dem richtigen Weg!',
                'Macht nichts! 😊 Auch Experten lernen jeden Tag dazu!',
                'Kein Problem! 🚀 Jeder Fehler bringt dich weiter!',
                'Bleib dran! 💡 Du wirst immer besser!',
                'Gut versucht! 🎪 Geschichte ist manchmal knifflig!'
            ]
        }
    },
    'fr': {
        'name': 'Français',
        'flag': '🇫🇷',
        'ui': {
            'title': 'Tuteur d\'Histoire',
            'subtitle': 'Découvrez le monde fascinant de l\'histoire',
            'welcome': 'Que voulez-vous apprendre aujourd\'hui? Choisissez une époque et commencez votre voyage à travers l\'histoire!',
            'ai_chat': '🤖 Chat IA-Tuteur',
            'random_quiz': '🎯 Quiz Aléatoire',
            'settings': '⚙️ Paramètres',
            'language': '🌐 Langue',
            'back': '← Retour',
            'send': 'Envoyer',
            'check_answer': 'Vérifier la réponse',
            'cancel': 'Annuler',
            'close': 'Fermer',
            'difficulty': 'Difficulté',
            'topics_available': 'sujets disponibles',
            'quiz_question': 'Question de quiz de',
            'which_fact_correct': 'Quel fait est correct?',
            'select_answer_first': 'Veuillez sélectionner une réponse!',
            'api_configured': 'Clé API OpenAI: ✅ Configurée',
            'api_not_configured': 'Clé API OpenAI: ❌ Non configurée',
            'api_info': 'Pour utiliser le tuteur IA, vous avez besoin d\'une clé API OpenAI.\nAjoutez-la dans le fichier .env:\nOPENAI_API_KEY=votre-clé-ici',
            'chat_welcome': 'Bonjour! Je suis votre tuteur d\'histoire IA. Posez-moi des questions sur les sujets historiques et je vous aiderai à apprendre! 📚'
        },
        'quiz_feedback': {
            'correct': [
                'Parfait! 🎉 Vous avez un vrai talent pour l\'histoire!',
                'Fantastique! 🌟 Vous vous y connaissez vraiment!',
                'Excellent! 🎯 C\'était une question difficile!',
                'Bravo! 👏 Vous vous améliorez!',
                'Correct! ⭐ Vous avez une excellente mémoire!',
                'Wow! 🚀 Vous êtes un vrai expert en histoire!',
                'Super! 💪 Continuez comme ça!'
            ],
            'incorrect': [
                'Pas tout à fait, mais vous apprenez! 💪 Essayez encore!',
                'Presque! 🎯 Vous y arriverez la prochaine fois!',
                'Presque correct! 🌟 Vous êtes sur la bonne voie!',
                'Ce n\'est pas grave! 😊 Même les experts apprennent chaque jour!',
                'Pas de problème! 🚀 Chaque erreur vous fait progresser!',
                'Persévérez! 💡 Vous vous améliorez!',
                'Bonne tentative! 🎪 L\'histoire est parfois complexe!'
            ]
        }
    },
    'no': {
        'name': 'Norsk',
        'flag': '🇳🇴',
        'ui': {
            'title': 'Historie-Tutor',
            'subtitle': 'Oppdag den fascinerende verden av historie',
            'welcome': 'Hva vil du lære i dag? Velg en tidsperiode og begynn din reise gjennom historien!',
            'ai_chat': '🤖 AI-Tutor Chat',
            'random_quiz': '🎯 Tilfeldig Quiz',
            'settings': '⚙️ Innstillinger',
            'language': '🌐 Språk',
            'back': '← Tilbake',
            'send': 'Send',
            'check_answer': 'Sjekk svar',
            'cancel': 'Avbryt',
            'close': 'Lukk',
            'difficulty': 'Vanskelighetsgrad',
            'topics_available': 'emner tilgjengelige',
            'quiz_question': 'Quiz spørsmål fra',
            'which_fact_correct': 'Hvilket faktum er riktig?',
            'select_answer_first': 'Vennligst velg et svar!',
            'api_configured': 'OpenAI API-nøkkel: ✅ Konfigurert',
            'api_not_configured': 'OpenAI API-nøkkel: ❌ Ikke konfigurert',
            'api_info': 'For å bruke AI-tutoren trenger du en OpenAI API-nøkkel.\nLegg den til i .env-filen:\nOPENAI_API_KEY=din-nøkkel-her',
            'chat_welcome': 'Hei! Jeg er din AI-historie tutor. Still meg spørsmål om historiske emner og jeg vil hjelpe deg å lære! 📚'
        },
        'quiz_feedback': {
            'correct': [
                'Perfekt! 🎉 Du har et ekte historietalent!',
                'Fantastisk! 🌟 Du kan virkelig dette!',
                'Utmerket! 🎯 Det var et vanskelig spørsmål!',
                'Bravo! 👏 Du blir bedre og bedre!',
                'Riktig! ⭐ Du har en flott hukommelse!',
                'Wow! 🚀 Du er en ekte historieekspert!',
                'Super! 💪 Fortsett sånn!'
            ],
            'incorrect': [
                'Ikke helt, men du lærer! 💪 Prøv igjen!',
                'Nesten! 🎯 Du klarer det neste gang!',
                'Nesten riktig! 🌟 Du er på rett spor!',
                'Ikke noe problem! 😊 Selv eksperter lærer hver dag!',
                'Ikke bekymre deg! 🚀 Hver feil får deg videre!',
                'Hold det gående! 💡 Du blir bedre og bedre!',
                'Godt forsøk! 🎪 Historie kan være vanskelig!'
            ]
        }
    },
    'sv': {
        'name': 'Svenska',
        'flag': '🇸🇪',
        'ui': {
            'title': 'Historietutor',
            'subtitle': 'Upptäck historiens fascinerande värld',
            'welcome': 'Vad vill du lära dig idag? Välj en tidsperiod och börja din resa genom historien!',
            'ai_chat': '🤖 AI-Tutor Chat',
            'random_quiz': '🎯 Slumpmässig Quiz',
            'settings': '⚙️ Inställningar',
            'language': '🌐 Språk',
            'back': '← Tillbaka',
            'send': 'Skicka',
            'check_answer': 'Kontrollera svar',
            'cancel': 'Avbryt',
            'close': 'Stäng',
            'difficulty': 'Svårighetsgrad',
            'topics_available': 'ämnen tillgängliga',
            'quiz_question': 'Quizfråga från',
            'which_fact_correct': 'Vilket faktum är korrekt?',
            'select_answer_first': 'Vänligen välj ett svar!',
            'api_configured': 'OpenAI API-nyckel: ✅ Konfigurerad',
            'api_not_configured': 'OpenAI API-nyckel: ❌ Inte konfigurerad',
            'api_info': 'För att använda AI-tutorn behöver du en OpenAI API-nyckel.\nLägg till den i .env-filen:\nOPENAI_API_KEY=din-nyckel-här',
            'chat_welcome': 'Hej! Jag är din AI-historietutor. Ställ frågor om historiska ämnen så hjälper jag dig att lära! 📚'
        },
        'quiz_feedback': {
            'correct': [
                'Perfekt! 🎉 Du har en verklig historietalang!',
                'Fantastisk! 🌟 Du kan verkligen detta!',
                'Utmärkt! 🎯 Det var en svår fråga!',
                'Bravo! 👏 Du blir bättre och bättre!',
                'Rätt! ⭐ Du har ett fantastiskt minne!',
                'Wow! 🚀 Du är en riktig historieexpert!',
                'Super! 💪 Fortsätt så!'
            ],
            'incorrect': [
                'Inte riktigt, men du lär dig! 💪 Försök igen!',
                'Nästan! 🎯 Du klarar det nästa gång!',
                'Nästan rätt! 🌟 Du är på rätt väg!',
                'Inget problem! 😊 Även experter lär sig varje dag!',
                'Oroa dig inte! 🚀 Varje misstag för dig framåt!',
                'Fortsätt! 💡 Du blir bättre och bättre!',
                'Bra försök! 🎪 Historia kan vara knepigt!'
            ]
        }
    },
    'it': {
        'name': 'Italiano',
        'flag': '🇮🇹',
        'ui': {
            'title': 'Tutor di Storia',
            'subtitle': 'Scopri il mondo affascinante della storia',
            'welcome': 'Cosa vuoi imparare oggi? Scegli un\'epoca e inizia il tuo viaggio attraverso la storia!',
            'ai_chat': '🤖 Chat AI-Tutor',
            'random_quiz': '🎯 Quiz Casuale',
            'settings': '⚙️ Impostazioni',
            'language': '🌐 Lingua',
            'back': '← Indietro',
            'send': 'Invia',
            'check_answer': 'Verifica risposta',
            'cancel': 'Annulla',
            'close': 'Chiudi',
            'difficulty': 'Difficoltà',
            'topics_available': 'argomenti disponibili',
            'quiz_question': 'Domanda quiz da',
            'which_fact_correct': 'Quale fatto è corretto?',
            'select_answer_first': 'Per favore seleziona una risposta!',
            'api_configured': 'Chiave API OpenAI: ✅ Configurata',
            'api_not_configured': 'Chiave API OpenAI: ❌ Non configurata',
            'api_info': 'Per usare il tutor AI hai bisogno di una chiave API OpenAI.\nAggiungila nel file .env:\nOPENAI_API_KEY=la-tua-chiave-qui',
            'chat_welcome': 'Ciao! Sono il tuo tutor di storia AI. Fammi domande su argomenti storici e ti aiuterò ad imparare! 📚'
        },
        'quiz_feedback': {
            'correct': [
                'Perfetto! 🎉 Hai un vero talento per la storia!',
                'Fantastico! 🌟 Te ne intendi davvero!',
                'Eccellente! 🎯 Era una domanda difficile!',
                'Bravo! 👏 Stai migliorando sempre di più!',
                'Giusto! ⭐ Hai una memoria eccellente!',
                'Wow! 🚀 Sei un vero esperto di storia!',
                'Super! 💪 Continua così!'
            ],
            'incorrect': [
                'Non proprio, ma stai imparando! 💪 Prova di nuovo!',
                'Quasi! 🎯 Ce la farai la prossima volta!',
                'Quasi giusto! 🌟 Sei sulla strada giusta!',
                'Non importa! 😊 Anche gli esperti imparano ogni giorno!',
                'Nessun problema! 🚀 Ogni errore ti fa progredire!',
                'Continua! 💡 Stai migliorando sempre di più!',
                'Bel tentativo! 🎪 La storia a volte è complicata!'
            ]
        }
    },
    'pl': {
        'name': 'Polski',
        'flag': '🇵🇱',
        'ui': {
            'title': 'Tutor Historii',
            'subtitle': 'Odkryj fascynujący świat historii',
            'welcome': 'Czego chcesz się nauczyć dzisiaj? Wybierz epokę i rozpocznij swoją podróż przez historię!',
            'ai_chat': '🤖 Chat AI-Tutor',
            'random_quiz': '🎯 Losowy Quiz',
            'settings': '⚙️ Ustawienia',
            'language': '🌐 Język',
            'back': '← Wstecz',
            'send': 'Wyślij',
            'check_answer': 'Sprawdź odpowiedź',
            'cancel': 'Anuluj',
            'close': 'Zamknij',
            'difficulty': 'Poziom trudności',
            'topics_available': 'tematy dostępne',
            'quiz_question': 'Pytanie quizowe z',
            'which_fact_correct': 'Który fakt jest poprawny?',
            'select_answer_first': 'Proszę wybierz odpowiedź!',
            'api_configured': 'Klucz API OpenAI: ✅ Skonfigurowany',
            'api_not_configured': 'Klucz API OpenAI: ❌ Nie skonfigurowany',
            'api_info': 'Aby używać tutora AI potrzebujesz klucza API OpenAI.\nDodaj go w pliku .env:\nOPENAI_API_KEY=twój-klucz-tutaj',
            'chat_welcome': 'Cześć! Jestem twoim tutorem historii AI. Zadawaj pytania o tematy historyczne, a pomogę ci się uczyć! 📚'
        },
        'quiz_feedback': {
            'correct': [
                'Perfekcyjnie! 🎉 Masz prawdziwy talent do historii!',
                'Fantastycznie! 🌟 Naprawdę się znasz!',
                'Świetnie! 🎯 To było trudne pytanie!',
                'Brawo! 👏 Stajesz się coraz lepszy!',
                'Prawidłowo! ⭐ Masz doskonałą pamięć!',
                'Wow! 🚀 Jesteś prawdziwym ekspertem historii!',
                'Super! 💪 Tak trzymaj!'
            ],
            'incorrect': [
                'Nie do końca, ale się uczysz! 💪 Spróbuj ponownie!',
                'Prawie! 🎯 Następnym razem ci się uda!',
                'Prawie dobrze! 🌟 Jesteś na dobrej drodze!',
                'Nic nie szkodzi! 😊 Nawet eksperci uczą się każdego dnia!',
                'Bez problemu! 🚀 Każdy błąd prowadzi cię do przodu!',
                'Nie poddawaj się! 💡 Stajesz się coraz lepszy!',
                'Dobra próba! 🎪 Historia czasami bywa trudna!'
            ]
        }
    }
}

# Significantly expanded historical content
THEMEN = {
    "ancient": {
        "icon": "🏛️",
        "de": {
            "name": "Antike",
            "description": "Entdecke die großen Zivilisationen des Altertums",
            "topics": {
                "Das Römische Reich": {
                    "difficulty": "Mittel",
                    "facts": [
                        "Gründung Roms: 753 v. Chr. der Legende nach",
                        "Ende des Weströmischen Reiches: 476 n. Chr.",
                        "Julius Caesar überquerte den Rubikon 49 v. Chr.",
                        "Augustus wurde erster römischer Kaiser 27 v. Chr.",
                        "Kolosseum wurde 80 n. Chr. unter Kaiser Titus eröffnet",
                        "Römische Legionen eroberten Gebiete von Schottland bis Ägypten",
                        "Lateinische Sprache prägte europäische Sprachen",
                        "Römisches Recht beeinflusst moderne Rechtssysteme",
                        "Aquädukte versorgten Städte mit frischem Wasser",
                        "Pompeii wurde 79 n. Chr. durch Vesuvausbruch zerstört"
                    ]
                },
                "Das antike Griechenland": {
                    "difficulty": "Mittel",
                    "facts": [
                        "Demokratie wurde in Athen um 508 v. Chr. entwickelt",
                        "Olympische Spiele begannen 776 v. Chr. in Olympia",
                        "Alexander der Große eroberte Persien bis nach Indien",
                        "Philosophen wie Sokrates, Platon und Aristoteles prägten das Denken",
                        "Sparta war für seine Kriegerkultur berühmt",
                        "Griechische Stadtstaaten (Polis) waren politische Zentren",
                        "Archimedes entdeckte wichtige mathematische Prinzipien",
                        "Perikles führte Athen in sein Goldenes Zeitalter",
                        "Schlacht bei Marathon 490 v. Chr. stoppte Perser",
                        "Theater und Tragödie entstanden in Griechenland"
                    ]
                },
                "Ägypten": {
                    "difficulty": "Leicht",
                    "facts": [
                        "Pyramiden von Gizeh wurden um 2580-2510 v. Chr. erbaut",
                        "Hieroglyphen waren ägyptische Bilderschrift",
                        "Nil war Lebensader des alten Ägyptens",
                        "Pharaonen galten als lebende Götter",
                        "Tutanchamun starb im Alter von etwa 18 Jahren",
                        "Mumifizierung bewahrte Körper für das Jenseits",
                        "Kleopatra VII war letzte Pharaonin Ägyptens",
                        "Rosetta-Stein half bei Entschlüsselung der Hieroglyphen",
                        "Cheops-Pyramide war über 3800 Jahre höchstes Bauwerk",
                        "Sphinx von Gizeh bewacht die Pyramiden"
                    ]
                },
                "Mesopotamien": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Mesopotamien gilt als 'Wiege der Zivilisation'",
                        "Keilschrift war erste bekannte Schrift (ca. 3200 v. Chr.)",
                        "Codex Hammurabi war erste schriftliche Gesetzessammlung",
                        "Hanging Gardens of Babylon waren Weltwunder",
                        "Gilgamesch-Epos ist älteste erhaltene Dichtung",
                        "Sumerer erfanden das Rad um 3500 v. Chr.",
                        "Babylon wurde unter Nebukadnezar II. zur Weltmacht",
                        "Ziggurat waren mehrstöckige Tempeltürme",
                        "Irrigation machte Wüste zu fruchtbarem Land",
                        "60er-System der Sumerer bestimmt heute noch Zeit und Winkel"
                    ]
                }
            }
        },
        "fr": {
            "name": "Antiquité",
            "description": "Découvrez les grandes civilisations de l'antiquité",
            "topics": {
                "Empire Romain": {
                    "difficulty": "Moyen",
                    "facts": [
                        "Fondation de Rome: 753 av. J.-C. selon la légende",
                        "Chute de l'Empire romain d'Occident: 476 ap. J.-C.",
                        "Jules César traversa le Rubicon en 49 av. J.-C.",
                        "Auguste devint premier empereur romain en 27 av. J.-C.",
                        "Le Colisée fut inauguré en 80 ap. J.-C. sous Titus",
                        "Les légions romaines conquirent de l'Écosse à l'Égypte",
                        "Le latin influença les langues européennes",
                        "Le droit romain influence les systèmes juridiques modernes",
                        "Les aqueducs approvisionnaient les villes en eau fraîche",
                        "Pompéi fut détruite par l'éruption du Vésuve en 79 ap. J.-C."
                    ]
                },
                "Grèce Antique": {
                    "difficulty": "Moyen",
                    "facts": [
                        "La démocratie fut développée à Athènes vers 508 av. J.-C.",
                        "Les Jeux olympiques commencèrent en 776 av. J.-C. à Olympie",
                        "Alexandre le Grand conquit la Perse jusqu'en Inde",
                        "Philosophes comme Socrate, Platon et Aristote marquèrent la pensée",
                        "Sparte était réputée pour sa culture guerrière",
                        "Les cités-États (polis) étaient des centres politiques",
                        "Archimède découvrit des principes mathématiques importants",
                        "Périclès mena Athènes vers son âge d'or",
                        "La bataille de Marathon en 490 av. J.-C. arrêta les Perses",
                        "Le théâtre et la tragédie naquirent en Grèce"
                    ]
                },
                "Égypte": {
                    "difficulty": "Facile",
                    "facts": [
                        "Les pyramides de Gizeh furent construites vers 2580-2510 av. J.-C.",
                        "Les hiéroglyphes étaient l'écriture égyptienne en images",
                        "Le Nil était l'artère vitale de l'Égypte ancienne",
                        "Les pharaons étaient considérés comme des dieux vivants",
                        "Toutânkhamon mourut vers l'âge de 18 ans",
                        "La momification préservait les corps pour l'au-delà",
                        "Cléopâtre VII fut la dernière pharaonne d'Égypte",
                        "La pierre de Rosette aida à déchiffrer les hiéroglyphes",
                        "La pyramide de Khéops fut le plus haut bâtiment pendant 3800 ans",
                        "Le sphinx de Gizeh garde les pyramides"
                    ]
                },
                "Mésopotamie": {
                    "difficulty": "Difficile",
                    "facts": [
                        "La Mésopotamie est considérée comme le 'berceau de la civilisation'",
                        "L'écriture cunéiforme fut la première écriture connue (vers 3200 av. J.-C.)",
                        "Le code d'Hammourabi fut le premier recueil de lois écrites",
                        "Les jardins suspendus de Babylone étaient une merveille du monde",
                        "L'épopée de Gilgamesh est le plus ancien poème conservé",
                        "Les Sumériens inventèrent la roue vers 3500 av. J.-C.",
                        "Babylone devint une puissance mondiale sous Nabuchodonosor II",
                        "Les ziggurats étaient des tours de temples à étages",
                        "L'irrigation rendit fertile la terre désertique",
                        "Le système de base 60 des Sumériens détermine encore le temps et les angles"
                    ]
                }
            }
        },
        "no": {
            "name": "Antikken",
            "description": "Oppdag de store sivilisasjonene i antikken",
            "topics": {
                "Romerriket": {
                    "difficulty": "Middels",
                    "facts": [
                        "Grunnleggelsen av Roma: 753 f.Kr. ifølge legenden",
                        "Fall av det Vestromerske riket: 476 e.Kr.",
                        "Julius Caesar krysset Rubicon i 49 f.Kr.",
                        "Augustus ble første romerske keiser i 27 f.Kr.",
                        "Kolosseum åpnet i 80 e.Kr. under keiser Titus",
                        "Romerske legioner erobret områder fra Skottland til Egypt",
                        "Latin påvirket europeiske språk",
                        "Romersk rett påvirker moderne rettssystemer",
                        "Akvedukter forsynte byer med ferskvann",
                        "Pompeii ble ødelagt av Vesuvs utbrudd i 79 e.Kr."
                    ]
                }
            }
        },
        "sv": {
            "name": "Antiken",
            "description": "Upptäck de stora civilisationerna i antiken",
            "topics": {
                "Romerska riket": {
                    "difficulty": "Medel",
                    "facts": [
                        "Roms grundläggning: 753 f.Kr. enligt legenden",
                        "Västromerska rikets fall: 476 e.Kr.",
                        "Julius Caesar korsade Rubicon 49 f.Kr.",
                        "Augustus blev första romerska kejsaren 27 f.Kr.",
                        "Colosseum invigdes 80 e.Kr. under kejsar Titus",
                        "Romerska legioner erövrade områden från Skottland till Egypten",
                        "Latin påverkade europeiska språk",
                        "Romersk lag påverkar moderna rättssystem",
                        "Akvedukter försörjde städer med färskvatten",
                        "Pompeii förstördes av Vesuvius utbrott 79 e.Kr."
                    ]
                }
            }
        },
        "it": {
            "name": "Antichità",
            "description": "Scopri le grandi civiltà dell'antichità",
            "topics": {
                "Impero Romano": {
                    "difficulty": "Medio",
                    "facts": [
                        "Fondazione di Roma: 753 a.C. secondo la leggenda",
                        "Caduta dell'Impero Romano d'Occidente: 476 d.C.",
                        "Giulio Cesare attraversò il Rubicone nel 49 a.C.",
                        "Augusto divenne primo imperatore romano nel 27 a.C.",
                        "Il Colosseo fu inaugurato nell'80 d.C. sotto Tito",
                        "Le legioni romane conquistarono territori dalla Scozia all'Egitto",
                        "Il latino influenzò le lingue europee",
                        "Il diritto romano influenza i sistemi giuridici moderni",
                        "Gli acquedotti rifornivano le città di acqua fresca",
                        "Pompei fu distrutta dall'eruzione del Vesuvio nel 79 d.C."
                    ]
                }
            }
        },
        "pl": {
            "name": "Starożytność",
            "description": "Odkryj wielkie cywilizacje starożytności",
            "topics": {
                "Cesarstwo Rzymskie": {
                    "difficulty": "Średni",
                    "facts": [
                        "Założenie Rzymu: 753 p.n.e. według legendy",
                        "Upadek Cesarstwa Zachodniorzymskiego: 476 n.e.",
                        "Juliusz Cezar przekroczył Rubikon w 49 p.n.e.",
                        "August został pierwszym cesarzem rzymskim w 27 p.n.e.",
                        "Koloseum zostało otwarte w 80 n.e. za Tytusa",
                        "Legiony rzymskie zdobyły tereny od Szkocji do Egiptu",
                        "Łacina wpłynęła na języki europejskie",
                        "Prawo rzymskie wpływa na współczesne systemy prawne",
                        "Akwedukty zaopatrywały miasta w świeżą wodę",
                        "Pompeje zostały zniszczone przez wybuch Wezuwiusza w 79 n.e."
                    ]
                }
            }
        }
    },
    "medieval": {
        "icon": "🏰",
        "de": {
            "name": "Mittelalter",
            "description": "Erlebe die Zeit der Ritter, Burgen und großen Reiche",
            "topics": {
                "Feudalismus": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Ständegesellschaft: Klerus, Adel, Bauern",
                        "Lehenswesen: Herr-Vasall-Beziehungen",
                        "Burgen dienten als Schutz und Machtsymbole",
                        "Leibeigenschaft band Bauern an das Land",
                        "Ritter folgten dem Ehrenkodex der Ritterlichkeit",
                        "Grundherrschaft prägte die Landwirtschaft",
                        "Zunftwesen organisierte Handwerk und Handel",
                        "Investiturstreit zwischen Kaiser und Papst",
                        "Minnegesang und höfische Kultur blühten",
                        "Turniere waren wichtige gesellschaftliche Ereignisse"
                    ]
                },
                "Kreuzzüge": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Erster Kreuzzug begann 1095 nach Aufruf Papst Urbans II",
                        "Eroberung Jerusalems 1099 durch Kreuzfahrer",
                        "Saladin eroberte Jerusalem 1187 zurück",
                        "Dritter Kreuzzug (1189-1192) mit Richard Löwenherz",
                        "Vierter Kreuzzug eroberte 1204 Konstantinopel",
                        "Kinderkreuzzug 1212 endete tragisch",
                        "Kultureller Austausch zwischen Ost und West",
                        "Ritterorden wie Templer und Johanniter entstanden",
                        "Kreuzzüge förderten Handel mit dem Orient",
                        "Reconquista vertrieb Muslime aus Spanien"
                    ]
                },
                "Wikinger": {
                    "difficulty": "Mittel",
                    "facts": [
                        "Wikingerzeit: ca. 793-1066 n. Chr.",
                        "Entdeckung Amerikas durch Leif Erikson um 1000",
                        "Drachenboote ermöglichten weite Seefahrten",
                        "Handelsrouten bis nach Konstantinopel und Bagdad",
                        "Thing: Volksversammlung der freien Männer",
                        "Runen: nordische Schriftzeichen",
                        "Ragnarök: Weltuntergang in der nordischen Mythologie",
                        "Wikingerreiche in England, Irland und Frankreich",
                        "Knut der Große beherrschte Nordseereich",
                        "Wikinger gründeten Kiew und Nowgorod"
                    ]
                },
                "Heiliges Römisches Reich": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Otto I. wurde 962 zum Kaiser gekrönt",
                        "Reich umfasste Deutschland, Italien und Burgund",
                        "Kurfürsten wählten den Kaiser",
                        "Goldene Bulle 1356 regelte Kaiserwahl",
                        "Kaiser und Papst rivalisierten um Macht",
                        "Canossa 1077: Heinrich IV. vor Papst Gregor VII.",
                        "Staufer-Dynastie prägte Hochmittelalter",
                        "Friedrich Barbarossa ertrank 1190 im Dritten Kreuzzug",
                        "Interregnum (1254-1273) schwächte Kaiserreich",
                        "Habsburg-Dynastie dominierte ab 1273"
                    ]
                }
            }
        },
        "fr": {
            "name": "Moyen Âge",
            "description": "Vivez l'époque des chevaliers, châteaux et grands empires",
            "topics": {
                "Féodalisme": {
                    "difficulty": "Difficile",
                    "facts": [
                        "Société d'ordres: clergé, noblesse, paysans",
                        "Système féodal: relations seigneur-vassal",
                        "Les châteaux servaient de protection et symboles de pouvoir",
                        "Le servage liait les paysans à la terre",
                        "Les chevaliers suivaient le code de chevalerie",
                        "La seigneurie dominait l'agriculture",
                        "Les corporations organisaient l'artisanat et le commerce",
                        "Querelle des Investitures entre empereur et pape",
                        "L'amour courtois et la culture courtoise fleurirent",
                        "Les tournois étaient d'importants événements sociaux"
                    ]
                }
            }
        },
        "no": {
            "name": "Middelalder",
            "description": "Opplev tiden med riddere, slott og store riker",
            "topics": {
                "Føydalisme": {
                    "difficulty": "Vanskelig",
                    "facts": [
                        "Standssamfunn: geistlighet, adel, bønder",
                        "Lensystem: herre-vasall-forhold",
                        "Slott tjente som beskyttelse og maktsymboler",
                        "Livegen dom bant bønder til landet",
                        "Riddere fulgte ridderlighetens æreskodeks",
                        "Godsherrskap preget landbruket",
                        "Laug organiserte håndverk og handel"
                    ]
                }
            }
        },
        "sv": {
            "name": "Medeltiden",
            "description": "Upplev tiden med riddare, slott och stora riken",
            "topics": {
                "Feodalism": {
                    "difficulty": "Svår",
                    "facts": [
                        "Ständersamhälle: prästerskap, adel, bönder",
                        "Länsystemet: herre-vasall-förhållanden",
                        "Slott tjänade som skydd och maktsymboler",
                        "Livegenskap band bönder till jorden",
                        "Riddare följde ridderlighetens ära kod",
                        "Godshärskarskap präglade jordbruket",
                        "Skråväsendet organiserade hantverk och handel"
                    ]
                }
            }
        },
        "it": {
            "name": "Medioevo",
            "description": "Vivi l'epoca dei cavalieri, castelli e grandi imperi",
            "topics": {
                "Feudalesimo": {
                    "difficulty": "Difficile",
                    "facts": [
                        "Società per ceti: clero, nobiltà, contadini",
                        "Sistema feudale: rapporti signore-vassallo",
                        "I castelli servivano come protezione e simboli di potere",
                        "La servitù legava i contadini alla terra",
                        "I cavalieri seguivano il codice cavalleresco",
                        "La signoria dominava l'agricoltura",
                        "Le corporazioni organizzavano artigianato e commercio"
                    ]
                }
            }
        },
        "pl": {
            "name": "Średniowiecze",
            "description": "Przeżyj epokę rycerzy, zamków i wielkich imperiów",
            "topics": {
                "Feudalizm": {
                    "difficulty": "Trudny",
                    "facts": [
                        "Społeczeństwo stanowe: duchowieństwo, szlachta, chłopi",
                        "System feudalny: relacje pan-wasal",
                        "Zamki służyły jako ochrona i symbole władzy",
                        "Poddaństwo wiązało chłopów z ziemią",
                        "Rycerze podążali za kodeksem rycerskim",
                        "Folwark dominował w rolnictwie",
                        "Cechy organizowały rzemiosło i handel"
                    ]
                }
            }
        }
    },
    "early_modern": {
        "icon": "⚙️",
        "de": {
            "name": "Frühe Neuzeit",
            "description": "Zeitalter der Entdeckungen, Renaissance und Reformation",
            "topics": {
                "Renaissance": {
                    "difficulty": "Mittel",
                    "facts": [
                        "Renaissance bedeutet 'Wiedergeburt' (14.-16. Jahrhundert)",
                        "Leonardo da Vinci: Universalgenie der Renaissance",
                        "Buchdruck von Gutenberg um 1450 revolutionierte Wissen",
                        "Humanismus stellte den Menschen in den Mittelpunkt",
                        "Michelangelo malte die Sixtinische Kapelle",
                        "Machiavelli schrieb 'Der Fürst' über Machtpolitik",
                        "Banken der Medici finanzierten Kunst und Politik",
                        "Perspektive revolutionierte die Malerei",
                        "Anatomische Studien verbesserten Medizin",
                        "Florenz und Venedig waren Zentren der Renaissance"
                    ]
                },
                "Entdeckungszeitalter": {
                    "difficulty": "Mittel",
                    "facts": [
                        "Kolumbus erreichte 1492 Amerika",
                        "Vasco da Gama fand Seeweg nach Indien (1498)",
                        "Magellan umrundete erstmals die Erde (1519-1522)",
                        "Conquistadores eroberten Azteken- und Inkareich",
                        "Gewürze und Gold trieben Entdeckungsfahrten an",
                        "Kartographie entwickelte sich durch neue Erkenntnisse",
                        "Kolonialismus prägte die Weltgeschichte",
                        "Portugiesen entdeckten Brasilien 1500",
                        "Karavellen ermöglichten Hochseefahrt",
                        "Neue Welt veränderte europäische Wirtschaft"
                    ]
                },
                "Reformation": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Luther veröffentlichte 1517 95 Thesen",
                        "Ablasshandel war Auslöser der Reformation",
                        "Calvin gründete reformierte Kirche in Genf",
                        "Augsburger Religionsfriede 1555 teilte Deutschland",
                        "Dreißigjähriger Krieg (1618-1648) verwüstete Europa",
                        "Gegenreformation stärkte katholische Kirche",
                        "Westfälischer Friede 1648 beendete Religionskriege",
                        "Bauernkrieg 1524-1526 scheiterte",
                        "Jesuitenorden bekämpfte Protestantismus",
                        "Konzil von Trient reformierte katholische Kirche"
                    ]
                },
                "Absolutismus": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Ludwig XIV. prägte den Absolutismus",
                        "Versailles symbolisierte königliche Macht",
                        "Ein König, ein Gesetz, eine Religion",
                        "Merkantilismus stärkte Staatswirtschaft",
                        "Stehende Heere sicherten Herrschaft",
                        "Hofzeremoniell unterwarf den Adel",
                        "Zentralisierung schwächte regionale Gewalten",
                        "Staatsräson rechtfertigte königliche Macht",
                        "Barock-Kultur diente der Repräsentation",
                        "Colbert organisierte französische Finanzen"
                    ]
                }
            }
        },
        # Weitere Sprachen für frühe Neuzeit...
        "fr": {
            "name": "Début de l'époque moderne",
            "description": "L'âge des découvertes, Renaissance et Réforme",
            "topics": {
                "Renaissance": {
                    "difficulty": "Moyen",
                    "facts": [
                        "Renaissance signifie 'renaissance' (14e-16e siècles)",
                        "Léonard de Vinci: génie universel de la Renaissance",
                        "L'imprimerie de Gutenberg vers 1450 révolutionna le savoir"
                    ]
                }
            }
        },
        "no": {"name": "Tidlig moderne tid", "description": "Oppdagelsenes tidsalder", "topics": {}},
        "sv": {"name": "Tidig modern tid", "description": "Upptäcktsernas tidsålder", "topics": {}},
        "it": {"name": "Prima età moderna", "description": "L'età delle scoperte", "topics": {}},
        "pl": {"name": "Wczesna epoka nowożytna", "description": "Epoka odkryć", "topics": {}}
    },
    "modern": {
        "icon": "🏭",
        "de": {
            "name": "Neuzeit",
            "description": "Industrialisierung, Revolutionen und moderne Gesellschaft",
            "topics": {
                "Industrialisierung": {
                    "difficulty": "Mittel",
                    "facts": [
                        "Dampfmaschine von James Watt 1769 revolutionierte Produktion",
                        "Erste Eisenbahn Liverpool-Manchester 1830",
                        "Fabriken ersetzten Heimarbeit und Manufakturen",
                        "Urbanisierung: Landflucht in die Industriestädte",
                        "Kinderarbeit war weit verbreitet bis zu Reformen",
                        "Entstehung der Arbeiterklasse und des Bürgertums",
                        "Soziale Frage führte zu Arbeiterbewegung",
                        "Eisenbahn veränderte Transport und Kommunikation",
                        "Kohle und Stahl prägten neue Industrien",
                        "Massenproduktion senkte Preise"
                    ]
                },
                "Französische Revolution": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Sturm auf die Bastille am 14. Juli 1789",
                        "Erklärung der Menschen- und Bürgerrechte 1789",
                        "Abschaffung der Monarchie 1792",
                        "Terrorherrschaft unter Robespierre (1793-1794)",
                        "Napoleon kam 1799 durch Staatsstreich an die Macht",
                        "Code Civil: Napoleons Gesetzbuch für Europa",
                        "Wiener Kongress 1815 ordnete Europa neu",
                        "Girondisten und Jakobiner rivalisierten",
                        "Assignaten führten zur Inflation",
                        "Levée en masse: erste allgemeine Wehrpflicht"
                    ]
                },
                "Aufklärung": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Kant: 'Sapere aude!' - Habe Mut, dich deines Verstandes zu bedienen",
                        "Voltaire kritisierte Kirche und Absolutismus",
                        "Montesquieu entwickelte Gewaltenteilung",
                        "Rousseau schrieb über Gesellschaftsvertrag",
                        "Enzyklopädie sammelte wissenschaftliches Wissen",
                        "Religionstoleranz wurde gefordert",
                        "Wissenschaftliche Revolution veränderte Weltbild",
                        "Salon-Kultur förderte geistigen Austausch",
                        "Deismus ersetzte traditionelle Religion",
                        "Fortschrittsglaube prägte das Denken"
                    ]
                },
                "Napoleonische Kriege": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Napoleon krönte sich 1804 selbst zum Kaiser",
                        "Kontinentalsperre sollte England schwächen",
                        "Schlacht bei Austerlitz 1805: Dreikaiserschlacht",
                        "Russlandfeldzug 1812 endete in Katastrophe",
                        "Völkerschlacht bei Leipzig 1813 besiegelte Ende",
                        "Waterloo 1815: Napoleons finale Niederlage",
                        "Code Civil beeinflusste europäisches Recht",
                        "Rheinbund löste Heiliges Römisches Reich ab",
                        "Nationalismus erwachte in besetzten Ländern",
                        "100 Tage: Napoleons Rückkehr von Elba"
                    ]
                }
            }
        },
        # Weitere Sprachen für Neuzeit...
        "fr": {"name": "Époque moderne", "description": "Industrialisation et société moderne", "topics": {}},
        "no": {"name": "Moderne tid", "description": "Industrialisering og moderne samfunn", "topics": {}},
        "sv": {"name": "Modern tid", "description": "Industrialisering och modernt samhälle", "topics": {}},
        "it": {"name": "Età moderna", "description": "Industrializzazione e società moderna", "topics": {}},
        "pl": {"name": "Epoka nowożytna", "description": "Industrializacja i nowoczesne społeczeństwo", "topics": {}}
    },
    "contemporary": {
        "icon": "🌍",
        "de": {
            "name": "Zeitgeschichte",
            "description": "Das 20. und 21. Jahrhundert - Weltkriege bis heute",
            "topics": {
                "Erster Weltkrieg": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Auslöser: Attentat auf Erzherzog Franz Ferdinand 1914",
                        "Stellungskrieg an der Westfront mit Millionen Toten",
                        "USA traten 1917 in den Krieg ein",
                        "Waffenstillstand am 11. November 1918",
                        "Versailler Vertrag 1919 belastete Deutschland",
                        "Spanische Grippe tötete mehr Menschen als der Krieg",
                        "Ende der europäischen Monarchien",
                        "Giftgas wurde erstmals massiv eingesetzt",
                        "Russische Revolution 1917 stürzte den Zaren",
                        "Kriegsschuldfrage prägte Nachkriegszeit"
                    ]
                },
                "Zweiter Weltkrieg": {
                    "difficulty": "Schwer",
                    "facts": [
                        "Überfall auf Polen am 1. September 1939",
                        "Holocaust: Systematische Ermordung von 6 Millionen Juden",
                        "Angriff auf Pearl Harbor brachte USA in den Krieg",
                        "Stalingrad war Wendepunkt an der Ostfront",
                        "D-Day: Landung der Alliierten in der Normandie 1944",
                        "Atombomben auf Hiroshima und Nagasaki",
                        "Kriegsende in Europa am 8. Mai 1945",
                        "Blitzkrieg-Taktik eroberte schnell Europa",
                        "Widerstand in besetzten Gebieten",
                        "Nürnberger Prozesse verurteilten Kriegsverbrecher"
                    ]
                },
                "Kalter Krieg": {
                    "difficulty": "Mittel",
                    "facts": [
                        "Teilung Deutschlands und Berlins nach 1945",
                        "NATO 1949 vs. Warschauer Pakt 1955",
                        "Kubakrise 1962 brachte Welt an Rand eines Atomkriegs",
                        "Berliner Mauer 1961-1989 teilte Deutschland",
                        "Wettrüsten zwischen USA und Sowjetunion",
                        "Fall der Berliner Mauer am 9. November 1989",
                        "Auflösung der Sowjetunion 1991",
                        "Koreakrieg 1950-1953 erster 'heißer' Konflikt",
                        "Sputnik 1957 begann Wettlauf ins All",
                        "Entspannungspolitik der 1970er Jahre"
                    ]
                },
                "Deutsche Wiedervereinigung": {
                    "difficulty": "Mittel",
                    "facts": [
                        "Friedliche Revolution 1989 in der DDR",
                        "Mauerfall am 9. November 1989",
                        "Wiedervereinigung am 3. Oktober 1990",
                        "Helmut Kohl wurde 'Kanzler der Einheit'",
                        "Währungsunion führte D-Mark in DDR ein",
                        "Treuhand privatisierte DDR-Betriebe",
                        "Aufbau Ost kostete Billionen D-Mark",
                        "Berlin wurde wieder deutsche Hauptstadt",
                        "Solidaritätszuschlag finanzierte Aufbau Ost",
                        "Zwei-plus-Vier-Vertrag regelte deutsche Souveränität"
                    ]
                }
            }
        },
        # Weitere Sprachen für Zeitgeschichte...
        "fr": {"name": "Histoire contemporaine", "description": "Les 20e et 21e siècles", "topics": {}},
        "no": {"name": "Samtidshistorie", "description": "Det 20. og 21. århundre", "topics": {}},
        "sv": {"name": "Samtidshistoria", "description": "1900- och 2000-talet", "topics": {}},
        "it": {"name": "Storia contemporanea", "description": "Il XX e XXI secolo", "topics": {}},
        "pl": {"name": "Historia współczesna", "description": "XX i XXI wiek", "topics": {}}
    }
}

class CustomRadioButton(tk.Frame):
    def __init__(self, parent, text, variable, value, **kwargs):
        super().__init__(parent, bg=COLORS['bg_medium'])
        
        self.variable = variable
        self.value = value
        self.selected = False
        
        # Create custom radio button appearance
        self.radio_frame = tk.Frame(self, bg=COLORS['bg_light'], width=20, height=20)
        self.radio_frame.pack(side='left', padx=(15, 10), pady=10)
        self.radio_frame.pack_propagate(False)
        
        self.radio_circle = tk.Label(
            self.radio_frame, 
            text='', 
            bg=COLORS['bg_light'], 
            fg=COLORS['accent'],
            font=('Segoe UI', 14, 'bold')
        )
        self.radio_circle.pack(expand=True)
        
        # Text label
        self.text_label = tk.Label(
            self, 
            text=text, 
            font=('Segoe UI', 12),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_medium'],
            anchor='w',
            justify='left',
            wraplength=450
        )
        self.text_label.pack(side='left', fill='x', expand=True, padx=(0, 15), pady=10)
        
        # Bind click events
        self.bind('<Button-1>', self._on_click)
        self.radio_frame.bind('<Button-1>', self._on_click)
        self.radio_circle.bind('<Button-1>', self._on_click)
        self.text_label.bind('<Button-1>', self._on_click)
        
        # Hover effects
        self.bind('<Enter>', self._on_enter)
        self.bind('<Leave>', self._on_leave)
        for child in [self.radio_frame, self.radio_circle, self.text_label]:
            child.bind('<Enter>', self._on_enter)
            child.bind('<Leave>', self._on_leave)
        
        # Update appearance
        self._update_appearance()
        
    def _on_click(self, event):
        self.variable.set(self.value)
        
    def _on_enter(self, event):
        if not self.selected:
            self.config(bg=COLORS['bg_light'])
            self.text_label.config(bg=COLORS['bg_light'])
        
    def _on_leave(self, event):
        if not self.selected:
            self.config(bg=COLORS['bg_medium'])
            self.text_label.config(bg=COLORS['bg_medium'])
            
    def _update_appearance(self):
        current_value = self.variable.get()
        self.selected = (current_value == self.value)
        
        if self.selected:
            self.radio_circle.config(text='●', fg=COLORS['accent'])
            self.config(bg=COLORS['accent_hover'])
            self.text_label.config(bg=COLORS['accent_hover'], fg='white')
        else:
            self.radio_circle.config(text='○', fg=COLORS['text_muted'])
            self.config(bg=COLORS['bg_medium'])
            self.text_label.config(bg=COLORS['bg_medium'], fg=COLORS['text_primary'])

class ModernButton(tk.Frame):
    def __init__(self, parent, text, command, bg_color=COLORS['accent'], text_color=COLORS['text_primary'], hover_color=COLORS['accent_hover'], width=200, height=40):
        super().__init__(parent, bg=parent.cget('bg') if hasattr(parent, 'cget') else COLORS['bg_dark'])
        
        self.command = command
        self.bg_color = bg_color
        self.hover_color = hover_color
        self.text_color = text_color
        
        self.configure(width=width, height=height)
        self.pack_propagate(False)
        
        self.button = tk.Label(
            self, 
            text=text, 
            bg=bg_color, 
            fg=text_color,
            font=('Segoe UI', 10, 'bold'),
            cursor='hand2'
        )
        self.button.pack(fill='both', expand=True, padx=2, pady=2)
        
        # Bind events
        self.button.bind('<Button-1>', self._on_click)
        self.button.bind('<Enter>', self._on_enter)
        self.button.bind('<Leave>', self._on_leave)
        
    def _on_click(self, event):
        if self.command:
            self.command()
    
    def _on_enter(self, event):
        self.button.config(bg=self.hover_color)
    
    def _on_leave(self, event):
        self.button.config(bg=self.bg_color)
    
    def update_text(self, new_text):
        self.button.config(text=new_text)

class TopicCard(tk.Frame):
    def __init__(self, parent, topic_key, topic_data, command, current_language='de'):
        super().__init__(parent, bg=COLORS['bg_medium'], relief='flat', bd=2)
        self.configure(width=320, height=180)
        self.pack_propagate(False)
        
        self.command = command
        self.topic_key = topic_key
        self.current_language = current_language
        
        # Create main content frame with padding
        content_frame = tk.Frame(self, bg=COLORS['bg_medium'])
        content_frame.pack(fill='both', expand=True, padx=15, pady=15)
        
        # Icon and title section
        header_frame = tk.Frame(content_frame, bg=COLORS['bg_medium'])
        header_frame.pack(fill='x', pady=(0, 10))
        
        icon_label = tk.Label(
            header_frame, 
            text=topic_data['icon'], 
            font=('Segoe UI', 28), 
            bg=COLORS['bg_medium'], 
            fg=COLORS['text_primary']
        )
        icon_label.pack(pady=(0, 5))
        
        self.title_label = tk.Label(
            header_frame, 
            text=topic_data[current_language]['name'], 
            font=('Segoe UI', 16, 'bold'), 
            bg=COLORS['bg_medium'], 
            fg=COLORS['text_primary']
        )
        self.title_label.pack()
        
        # Description with better text wrapping
        self.desc_label = tk.Label(
            content_frame, 
            text=topic_data[current_language]['description'], 
            font=('Segoe UI', 10), 
            bg=COLORS['bg_medium'], 
            fg=COLORS['text_secondary'],
            wraplength=290,
            justify='center'
        )
        self.desc_label.pack(pady=(0, 10))
        
        # Topics count with better formatting
        count_text = f"{len(topic_data[current_language]['topics'])} {LANGUAGES[current_language]['ui']['topics_available']}"
        self.count_label = tk.Label(
            content_frame,
            text=count_text,
            font=('Segoe UI', 9),
            bg=COLORS['bg_medium'],
            fg=COLORS['text_muted']
        )
        self.count_label.pack()
        
        # Hover effects
        self.bind('<Button-1>', self._on_click)
        self.bind('<Enter>', self._on_enter)
        self.bind('<Leave>', self._on_leave)
        
        # Bind all child widgets recursively
        self._bind_all_children(self)
            
    def _bind_all_children(self, widget):
        widget.bind('<Button-1>', self._on_click)
        widget.bind('<Enter>', self._on_enter)  
        widget.bind('<Leave>', self._on_leave)
        for child in widget.winfo_children():
            self._bind_all_children(child)
    
    def _on_click(self, event):
        if self.command:
            self.command()
    
    def _on_enter(self, event):
        self.config(bg=COLORS['bg_light'], relief='raised', bd=2)
        self._update_bg_recursive(self, COLORS['bg_light'])
        self.config(cursor='hand2')
    
    def _on_leave(self, event):
        self.config(bg=COLORS['bg_medium'], relief='flat', bd=2)
        self._update_bg_recursive(self, COLORS['bg_medium'])
    
    def _update_bg_recursive(self, widget, color):
        if isinstance(widget, (tk.Label, tk.Frame)):
            try:
                widget.config(bg=color)
            except:
                pass
        for child in widget.winfo_children():
            self._update_bg_recursive(child, color)

def draw_logo(canvas, x, y, size=60):
    """Draw a modern 'G' logo"""
    # Outer circle
    canvas.create_oval(
        x, y, x + size, y + size,
        fill=COLORS['accent'],
        outline=COLORS['accent'],
        width=2
    )
    
    # Inner 'G' shape
    canvas.create_arc(
        x + 8, y + 8, x + size - 8, y + size - 8,
        fill=COLORS['bg_dark'],
        outline=COLORS['bg_dark'],
        start=330, extent=240,
        width=6
    )
    
    # Horizontal line in the middle
    canvas.create_rectangle(
        x + size//2, y + size//2 - 3,
        x + size - 12, y + size//2 + 3,
        fill=COLORS['accent'],
        outline=COLORS['accent']
    )

def frage_chatbot(frage, language='de'):
    try:
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        # Language-specific system prompts
        system_prompts = {
            'de': "Du bist ein Tutor für Geschichte für Schüler der Klassen 8-10. Antworte nur zu historischen Themen, altersgerecht und korrekt auf Deutsch. Halte deine Antworten präzise und interessant.",
            'fr': "Tu es un tuteur d'histoire pour les élèves de 4ème-2nde. Réponds uniquement sur des sujets historiques, de manière appropriée à l'âge et correcte en français. Garde tes réponses précises et intéressantes.",
            'no': "Du er en historielærer for elever på 8.-10. trinn. Svar kun på historiske emner, alderspassende og korrekt på norsk. Hold svarene dine presise og interessante.",
            'sv': "Du är en historielärare för elever i årskurs 8-10. Svara endast på historiska ämnen, åldersanpassat och korrekt på svenska. Håll dina svar precisa och intressanta.",
            'it': "Sei un tutor di storia per studenti di scuola media. Rispondi solo su argomenti storici, in modo appropriato all'età e corretto in italiano. Mantieni le risposte precise e interessanti.",
            'pl': "Jesteś tutorem historii dla uczniów klas 8-10. Odpowiadaj tylko na tematy historyczne, odpowiednio do wieku i poprawnie po polsku. Utrzymuj swoje odpowiedzi precyzyjne i interesujące."
        }
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompts.get(language, system_prompts['de'])},
                {"role": "user", "content": frage}
            ],
            max_tokens=300
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        error_messages = {
            'de': f"(Fehler: {e})",
            'fr': f"(Erreur: {e})",
            'no': f"(Feil: {e})",
            'sv': f"(Fel: {e})",
            'it': f"(Errore: {e})",
            'pl': f"(Błąd: {e})"
        }
        return error_messages.get(language, f"(Fehler: {e})")

def quiz_erstellen(specific_topic=None, language='de'):
    if specific_topic:
        thema_key = specific_topic
        thema = THEMEN[thema_key]
    else:
        thema_key = random.choice(list(THEMEN.keys()))
        thema = THEMEN[thema_key]
    
    topic_data = thema[language]
    if not topic_data['topics']:  # Skip if no topics for this language
        return quiz_erstellen(None, language)  # Try another topic
        
    lektion_name = random.choice(list(topic_data['topics'].keys()))
    lektion = topic_data['topics'][lektion_name]
    fakt = random.choice(lektion['facts'])
    
    # Generate better wrong answers from other topics
    alle_fakten = []
    for t_key, t_data in THEMEN.items():
        if t_key != thema_key and t_data[language]['topics']:
            for l_data in t_data[language]['topics'].values():
                alle_fakten.extend(l_data['facts'])
    
    falsche = random.sample(alle_fakten, min(3, len(alle_fakten))) if alle_fakten else []
    if len(falsche) < 3:
        fallback_wrong = {
            'de': ["Falsche Information", "Unrichtige Aussage", "Erfundener Fakt"],
            'fr': ["Fausse information", "Déclaration incorrecte", "Fait inventé"],
            'no': ["Falsk informasjon", "Feil påstand", "Oppfunnet faktum"],
            'sv': ["Falsk information", "Felaktig påstående", "Påhittad fakta"],
            'it': ["Informazione falsa", "Dichiarazione scorretta", "Fatto inventato"],
            'pl': ["Fałszywa informacja", "Nieprawidłowe stwierdzenie", "Wymyślony fakt"]
        }
        needed = 3 - len(falsche)
        falsche.extend(fallback_wrong[language][:needed])
    
    optionen = [fakt] + falsche[:3]
    random.shuffle(optionen)
    
    ui = LANGUAGES[language]['ui']
    question_text = f"{ui['quiz_question']} {topic_data['name']} - {lektion_name}:\n{ui['which_fact_correct']}"
    
    return question_text, optionen, fakt, lektion['difficulty']

class HistoryTutorApp:
    def __init__(self):
        self.root = tk.Tk()
        self.current_language = 'de'  # Default language
        self.topic_cards = []  # Store references to topic cards for language updates
        
        self.root.title(LANGUAGES[self.current_language]['ui']['title'])
        self.root.geometry("1200x800")
        self.root.configure(bg=COLORS['bg_dark'])
        self.root.resizable(True, True)
        
        # Try to set window icon
        try:
            self.root.iconbitmap("icon.ico")
        except:
            pass
        
        # Configure style for ttk widgets
        style = ttk.Style()
        style.theme_use('clam')
        style.configure('Modern.TFrame', background=COLORS['bg_dark'])
        
        self.current_screen = None
        self.chat_history = []
        
        # Initialize screens
        self.create_start_screen()
        
    def clear_screen(self):
        """Clear the current screen"""
        for widget in self.root.winfo_children():
            widget.destroy()
        self.topic_cards = []
    
    def update_title(self):
        """Update window title based on current language"""
        self.root.title(LANGUAGES[self.current_language]['ui']['title'])
    
    def show_language_menu(self):
        """Show language selection menu"""
        lang_window = tk.Toplevel(self.root)
        ui = LANGUAGES[self.current_language]['ui']
        lang_window.title(ui['language'])
        lang_window.geometry("350x400")
        lang_window.configure(bg=COLORS['bg_dark'])
        lang_window.transient(self.root)
        lang_window.grab_set()
        
        # Center the window
        lang_window.geometry("+%d+%d" % (self.root.winfo_rootx() + 425, self.root.winfo_rooty() + 200))
        
        content_frame = tk.Frame(lang_window, bg=COLORS['bg_dark'])
        content_frame.pack(fill='both', expand=True, padx=20, pady=20)
        
        title_label = tk.Label(
            content_frame,
            text=ui['language'],
            font=('Segoe UI', 18, 'bold'),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_dark']
        )
        title_label.pack(pady=(0, 20))
        
        # Language buttons
        for lang_code, lang_data in LANGUAGES.items():
            btn_text = f"{lang_data['flag']} {lang_data['name']}"
            
            def make_lang_command(lang):
                return lambda: self.change_language(lang, lang_window)
            
            lang_btn = ModernButton(
                content_frame,
                btn_text,
                make_lang_command(lang_code),
                bg_color=COLORS['accent'] if lang_code == self.current_language else COLORS['bg_light'],
                width=250, height=45
            )
            lang_btn.pack(pady=8)
    
    def change_language(self, new_language, window=None):
        """Change the application language"""
        self.current_language = new_language
        self.update_title()
        if window:
            window.destroy()
        
        # Recreate current screen with new language
        if hasattr(self, 'current_screen_type'):
            if self.current_screen_type == 'start':
                self.create_start_screen()
            elif self.current_screen_type == 'topic':
                self.create_topic_screen(self.current_topic)
            elif self.current_screen_type == 'chat':
                self.create_chat_screen()
    
    def create_start_screen(self):
        """Create the modern start hub"""
        self.clear_screen()
        self.current_screen_type = 'start'
        
        # Create scrollable main frame
        main_canvas = tk.Canvas(self.root, bg=COLORS['bg_dark'], highlightthickness=0)
        scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=main_canvas.yview)
        scrollable_frame = tk.Frame(main_canvas, bg=COLORS['bg_dark'])
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: main_canvas.configure(scrollregion=main_canvas.bbox("all"))
        )
        
        main_canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        main_canvas.configure(yscrollcommand=scrollbar.set)
        
        main_canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # Main container with padding
        main_frame = tk.Frame(scrollable_frame, bg=COLORS['bg_dark'])
        main_frame.pack(fill='both', expand=True, padx=40, pady=20)
        
        # Header with logo and title
        header_frame = tk.Frame(main_frame, bg=COLORS['bg_dark'])
        header_frame.pack(fill='x', pady=(0, 30))
        
        # Logo
        logo_canvas = tk.Canvas(header_frame, width=80, height=80, bg=COLORS['bg_dark'], highlightthickness=0)
        logo_canvas.pack(side='left', padx=(0, 20))
        draw_logo(logo_canvas, 10, 10, 60)
        
        # Title section
        title_frame = tk.Frame(header_frame, bg=COLORS['bg_dark'])
        title_frame.pack(side='left', fill='x', expand=True)
        
        ui = LANGUAGES[self.current_language]['ui']
        
        title_label = tk.Label(
            title_frame,
            text=ui['title'],
            font=('Segoe UI', 32, 'bold'),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_dark']
        )
        title_label.pack(anchor='w')
        
        subtitle_label = tk.Label(
            title_frame,
            text=ui['subtitle'],
            font=('Segoe UI', 14),
            fg=COLORS['text_secondary'],
            bg=COLORS['bg_dark']
        )
        subtitle_label.pack(anchor='w', pady=(5, 0))
        
        # Language button in top right
        lang_btn = ModernButton(
            header_frame,
            f"{LANGUAGES[self.current_language]['flag']} {ui['language']}",
            self.show_language_menu,
            bg_color=COLORS['bg_light'],
            hover_color=COLORS['bg_medium'],
            width=150, height=35
        )
        lang_btn.pack(side='right')
        
        # Welcome message
        welcome_frame = tk.Frame(main_frame, bg=COLORS['bg_medium'], relief='flat', bd=2)
        welcome_frame.pack(fill='x', pady=(0, 30), padx=20, ipady=25)
        
        welcome_text = tk.Label(
            welcome_frame,
            text=ui['welcome'],
            font=('Segoe UI', 12),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_medium'],
            wraplength=1000,
            justify='center'
        )
        welcome_text.pack(pady=25, padx=20)
        
        # Topic cards container
        cards_frame = tk.Frame(main_frame, bg=COLORS['bg_dark'])
        cards_frame.pack(fill='both', expand=True, pady=(0, 30))
        
        # Cards grid - better layout with proper spacing
        cards_container = tk.Frame(cards_frame, bg=COLORS['bg_dark'])
        cards_container.pack(expand=True)
        
        # Configure grid weights for better centering
        for i in range(3):
            cards_container.grid_columnconfigure(i, weight=1)
        
        # Create topic cards
        row = 0
        col = 0
        for topic_key, topic_data in THEMEN.items():
            card = TopicCard(
                cards_container, 
                topic_key,
                topic_data, 
                lambda t=topic_key: self.create_topic_screen(t),
                self.current_language
            )
            card.grid(row=row, column=col, padx=20, pady=15, sticky='')
            self.topic_cards.append((card, topic_key))
            
            col += 1
            if col > 2:  # 3 cards per row
                col = 0
                row += 1
        
        # Bottom buttons with better spacing
        bottom_frame = tk.Frame(main_frame, bg=COLORS['bg_dark'])
        bottom_frame.pack(fill='x', pady=(30, 20))
        
        button_container = tk.Frame(bottom_frame, bg=COLORS['bg_dark'])
        button_container.pack()
        
        # AI Chat Button
        chat_btn = ModernButton(
            button_container, 
            ui['ai_chat'], 
            self.create_chat_screen,
            width=220, height=50
        )
        chat_btn.pack(side='left', padx=(0, 15))
        
        # Random Quiz Button
        quiz_btn = ModernButton(
            button_container, 
            ui['random_quiz'], 
            self.start_random_quiz,
            bg_color=COLORS['success'],
            hover_color='#45a049',
            width=220, height=50
        )
        quiz_btn.pack(side='left', padx=15)
        
        # Settings Button
        settings_btn = ModernButton(
            button_container, 
            ui['settings'], 
            self.show_settings,
            bg_color=COLORS['bg_light'],
            hover_color=COLORS['bg_medium'],
            width=220, height=50
        )
        settings_btn.pack(side='left', padx=(15, 0))
        
        # Bind mousewheel to canvas
        def _on_mousewheel(event):
            main_canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        main_canvas.bind_all("<MouseWheel>", _on_mousewheel)
    
    def create_topic_screen(self, topic_key):
        """Create detailed topic learning screen"""
        self.clear_screen()
        self.current_screen_type = 'topic'
        self.current_topic = topic_key
        
        topic_data = THEMEN[topic_key][self.current_language]
        ui = LANGUAGES[self.current_language]['ui']
        
        # Create scrollable main frame
        main_canvas = tk.Canvas(self.root, bg=COLORS['bg_dark'], highlightthickness=0)
        scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=main_canvas.yview)
        scrollable_frame = tk.Frame(main_canvas, bg=COLORS['bg_dark'])
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: main_canvas.configure(scrollregion=main_canvas.bbox("all"))
        )
        
        main_canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        main_canvas.configure(yscrollcommand=scrollbar.set)
        
        main_canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # Header
        header_frame = tk.Frame(scrollable_frame, bg=COLORS['bg_dark'])
        header_frame.pack(fill='x', padx=30, pady=30)
        
        # Back button
        back_btn = ModernButton(
            header_frame,
            ui['back'],
            self.create_start_screen,
            bg_color=COLORS['bg_light'],
            width=120, height=40
        )
        back_btn.pack(side='left')
        
        # Language button
        lang_btn = ModernButton(
            header_frame,
            f"{LANGUAGES[self.current_language]['flag']} {ui['language']}",
            self.show_language_menu,
            bg_color=COLORS['bg_light'],
            hover_color=COLORS['bg_medium'],
            width=150, height=40
        )
        lang_btn.pack(side='right')
        
        # Topic title
        title_frame = tk.Frame(header_frame, bg=COLORS['bg_dark'])
        title_frame.pack(side='left', fill='x', expand=True, padx=(30, 30))
        
        icon_title = tk.Label(
            title_frame,
            text=f"{THEMEN[topic_key]['icon']} {topic_data['name']}",
            font=('Segoe UI', 28, 'bold'),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_dark']
        )
        icon_title.pack(anchor='center')
        
        desc_label = tk.Label(
            title_frame,
            text=topic_data['description'],
            font=('Segoe UI', 14),
            fg=COLORS['text_secondary'],
            bg=COLORS['bg_dark']
        )
        desc_label.pack(anchor='center', pady=(5, 0))
        
        # Content area
        content_frame = tk.Frame(scrollable_frame, bg=COLORS['bg_dark'])
        content_frame.pack(fill='both', expand=True, padx=30, pady=(0, 30))
        
        # Subtopics with better layout
        for subtopic_name, subtopic_data in topic_data['topics'].items():
            self.create_subtopic_card(content_frame, topic_key, subtopic_name, subtopic_data)
        
        # Action buttons with better spacing
        action_frame = tk.Frame(content_frame, bg=COLORS['bg_dark'])
        action_frame.pack(fill='x', pady=30)
        
        button_container = tk.Frame(action_frame, bg=COLORS['bg_dark'])
        button_container.pack()
        
        chat_btn = ModernButton(
            button_container,
            f"💬 {topic_data['name']} Chat",
            lambda: self.create_topic_chat_screen(topic_key),
            width=280, height=45
        )
        chat_btn.pack(side='left', padx=(0, 20))
        
        quiz_btn = ModernButton(
            button_container,
            f"🎯 {topic_data['name']} Quiz",
            lambda: self.start_topic_quiz(topic_key),
            bg_color=COLORS['success'],
            hover_color='#45a049',
            width=280, height=45
        )
        quiz_btn.pack(side='left', padx=20)
        
        # Bind mousewheel
        def _on_mousewheel(event):
            main_canvas.yview_scroll(int(-1*(event.delta/120)), "units")
        main_canvas.bind_all("<MouseWheel>", _on_mousewheel)
    
    def create_subtopic_card(self, parent, topic_key, subtopic_name, subtopic_data):
        """Create a card for each subtopic with improved layout"""
        card_frame = tk.Frame(parent, bg=COLORS['bg_medium'], relief='flat', bd=2)
        card_frame.pack(fill='x', pady=15, padx=20, ipady=20)
        
        # Header with title and difficulty
        header = tk.Frame(card_frame, bg=COLORS['bg_medium'])
        header.pack(fill='x', padx=25, pady=(15, 10))
        
        title_label = tk.Label(
            header,
            text=subtopic_name,
            font=('Segoe UI', 18, 'bold'),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_medium']
        )
        title_label.pack(side='left')
        
        # Difficulty badge with language support
        difficulty_colors = {
            'Leicht': COLORS['success'], 'Facile': COLORS['success'], 'Lett': COLORS['success'], 
            'Lätt': COLORS['success'], 'Facile': COLORS['success'], 'Łatwy': COLORS['success'],
            'Mittel': COLORS['warning'], 'Moyen': COLORS['warning'], 'Middels': COLORS['warning'], 
            'Medel': COLORS['warning'], 'Medio': COLORS['warning'], 'Średni': COLORS['warning'],
            'Schwer': COLORS['error'], 'Difficile': COLORS['error'], 'Vanskelig': COLORS['error'], 
            'Svår': COLORS['error'], 'Difficile': COLORS['error'], 'Trudny': COLORS['error']
        }
        
        difficulty_bg = difficulty_colors.get(subtopic_data['difficulty'], COLORS['bg_light'])
        diff_label = tk.Label(
            header,
            text=subtopic_data['difficulty'],
            font=('Segoe UI', 11, 'bold'),
            fg='white',
            bg=difficulty_bg,
            padx=12, pady=4
        )
        diff_label.pack(side='right')
        
        # Facts list with better formatting
        facts_frame = tk.Frame(card_frame, bg=COLORS['bg_medium'])
        facts_frame.pack(fill='x', padx=25, pady=(0, 15))
        
        for i, fact in enumerate(subtopic_data['facts']):
            fact_frame = tk.Frame(facts_frame, bg=COLORS['bg_medium'])
            fact_frame.pack(fill='x', pady=3)
            
            bullet_label = tk.Label(
                fact_frame,
                text="•",
                font=('Segoe UI', 12, 'bold'),
                fg=COLORS['accent'],
                bg=COLORS['bg_medium'],
                width=2
            )
            bullet_label.pack(side='left', anchor='n')
            
            fact_label = tk.Label(
                fact_frame,
                text=fact,
                font=('Segoe UI', 11),
                fg=COLORS['text_secondary'],
                bg=COLORS['bg_medium'],
                anchor='w',
                justify='left',
                wraplength=1000
            )
            fact_label.pack(side='left', fill='x', expand=True)
    
    def create_chat_screen(self):
        """Create the AI chat interface"""
        self.clear_screen()
        self.current_screen_type = 'chat'
        
        ui = LANGUAGES[self.current_language]['ui']
        
        # Header
        header_frame = tk.Frame(self.root, bg=COLORS['bg_dark'])
        header_frame.pack(fill='x', padx=30, pady=30)
        
        back_btn = ModernButton(
            header_frame,
            ui['back'],
            self.create_start_screen,
            bg_color=COLORS['bg_light'],
            width=120, height=40
        )
        back_btn.pack(side='left')
        
        # Language button
        lang_btn = ModernButton(
            header_frame,
            f"{LANGUAGES[self.current_language]['flag']} {ui['language']}",
            self.show_language_menu,
            bg_color=COLORS['bg_light'],
            hover_color=COLORS['bg_medium'],
            width=150, height=40
        )
        lang_btn.pack(side='right')
        
        title_label = tk.Label(
            header_frame,
            text=ui['ai_chat'],
            font=('Segoe UI', 24, 'bold'),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_dark']
        )
        title_label.pack(side='left', padx=(30, 0))
        
        # Chat area
        chat_frame = tk.Frame(self.root, bg=COLORS['bg_dark'])
        chat_frame.pack(fill='both', expand=True, padx=30, pady=(0, 30))
        
        # Chat display with better styling
        self.chat_display = scrolledtext.ScrolledText(
            chat_frame,
            wrap=tk.WORD,
            state='disabled',
            bg=COLORS['bg_medium'],
            fg=COLORS['text_primary'],
            font=('Segoe UI', 12),
            insertbackground=COLORS['text_primary'],
            selectbackground=COLORS['accent'],
            relief='flat',
            bd=2,
            padx=15,
            pady=15
        )
        self.chat_display.pack(fill='both', expand=True, pady=(0, 20))
        
        # Input area with better layout
        input_frame = tk.Frame(chat_frame, bg=COLORS['bg_dark'])
        input_frame.pack(fill='x')
        
        self.chat_input = tk.Entry(
            input_frame,
            bg=COLORS['bg_light'],
            fg=COLORS['text_primary'],
            font=('Segoe UI', 12),
            insertbackground=COLORS['text_primary'],
            relief='flat',
            bd=2
        )
        self.chat_input.pack(side='left', fill='x', expand=True, ipady=12, padx=(0, 15))
        self.chat_input.bind('<Return>', self.send_message)
        
        send_btn = ModernButton(
            input_frame,
            ui['send'],
            self.send_message,
            width=120, height=45
        )
        send_btn.pack(side='right')
        
        # Welcome message
        self.add_chat_message("Tutor", ui['chat_welcome'])
        
        # Focus on input
        self.chat_input.focus_set()
    
    def create_topic_chat_screen(self, topic_key):
        """Create chat screen focused on specific topic"""
        self.create_chat_screen()
        topic_data = THEMEN[topic_key][self.current_language]
        ui = LANGUAGES[self.current_language]['ui']
        welcome_msg = f"Willkommen im {THEMEN[topic_key]['icon']} {topic_data['name']} Chat! {topic_data['description']}"
        if self.current_language == 'fr':
            welcome_msg = f"Bienvenue dans le chat {THEMEN[topic_key]['icon']} {topic_data['name']}! {topic_data['description']}"
        elif self.current_language == 'no':
            welcome_msg = f"Velkommen til {THEMEN[topic_key]['icon']} {topic_data['name']} chat! {topic_data['description']}"
        elif self.current_language == 'sv':
            welcome_msg = f"Välkommen till {THEMEN[topic_key]['icon']} {topic_data['name']} chat! {topic_data['description']}"
        elif self.current_language == 'it':
            welcome_msg = f"Benvenuto nella chat {THEMEN[topic_key]['icon']} {topic_data['name']}! {topic_data['description']}"
        elif self.current_language == 'pl':
            welcome_msg = f"Witaj w chacie {THEMEN[topic_key]['icon']} {topic_data['name']}! {topic_data['description']}"
        
        self.add_chat_message("Tutor", welcome_msg)
    
    def add_chat_message(self, sender, message):
        """Add a message to the chat display"""
        self.chat_display.config(state='normal')
        
        # Color code messages
        if sender in ["Du", "Vous", "Deg", "Du", "Tu", "Ty"]:
            color = COLORS['accent']
        else:
            color = COLORS['success']
        
        self.chat_display.insert(tk.END, f"\n{sender}: ", ('sender',))
        self.chat_display.insert(tk.END, f"{message}\n", ('message',))
        
        # Configure tags for styling
        self.chat_display.tag_config('sender', foreground=color, font=('Segoe UI', 12, 'bold'))
        self.chat_display.tag_config('message', foreground=COLORS['text_primary'])
        
        self.chat_display.config(state='disabled')
        self.chat_display.see(tk.END)
    
    def send_message(self, event=None):
        """Send message to AI tutor"""
        message = self.chat_input.get().strip()
        if not message:
            return
        
        # Language-specific "You" label
        you_labels = {'de': 'Du', 'fr': 'Vous', 'no': 'Deg', 'sv': 'Du', 'it': 'Tu', 'pl': 'Ty'}
        you_label = you_labels.get(self.current_language, 'Du')
        
        # Add user message
        self.add_chat_message(you_label, message)
        self.chat_input.delete(0, tk.END)
        
        # Get AI response
        response = frage_chatbot(message, self.current_language)
        self.add_chat_message("Tutor", response)
    
    def start_random_quiz(self):
        """Start a random quiz"""
        frage, optionen, korrekt, schwierigkeit = quiz_erstellen(None, self.current_language)
        self.show_quiz(frage, optionen, korrekt, schwierigkeit)
    
    def start_topic_quiz(self, topic_key):
        """Start a quiz for specific topic"""
        frage, optionen, korrekt, schwierigkeit = quiz_erstellen(topic_key, self.current_language)
        self.show_quiz(frage, optionen, korrekt, schwierigkeit)
    
    def show_quiz(self, frage, optionen, korrekt, schwierigkeit):
        """Show quiz in a modern dialog with enhanced feedback"""
        quiz_window = tk.Toplevel(self.root)
        ui = LANGUAGES[self.current_language]['ui']
        quiz_window.title("Quiz")
        quiz_window.geometry("650x600")
        quiz_window.configure(bg=COLORS['bg_dark'])
        quiz_window.transient(self.root)
        quiz_window.grab_set()
        
        # Center the window
        quiz_window.geometry("+%d+%d" % (self.root.winfo_rootx() + 275, self.root.winfo_rooty() + 100))
        
        # Quiz content
        content_frame = tk.Frame(quiz_window, bg=COLORS['bg_dark'])
        content_frame.pack(fill='both', expand=True, padx=30, pady=30)
        
        # Difficulty indicator
        diff_label = tk.Label(
            content_frame,
            text=f"{ui['difficulty']}: {schwierigkeit}",
            font=('Segoe UI', 12, 'bold'),
            fg=COLORS['warning'],
            bg=COLORS['bg_dark']
        )
        diff_label.pack(pady=(0, 20))
        
        # Question with better formatting
        question_label = tk.Label(
            content_frame,
            text=frage,
            font=('Segoe UI', 16, 'bold'),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_dark'],
            wraplength=590,
            justify='center'
        )
        question_label.pack(pady=(0, 25))
        
        # Options with better layout using custom radio buttons
        selected_option = tk.StringVar()
        
        options_frame = tk.Frame(content_frame, bg=COLORS['bg_dark'])
        options_frame.pack(fill='x', pady=(0, 25))
        
        radio_buttons = []
        for i, option in enumerate(optionen):
            radio_btn = CustomRadioButton(
                options_frame, 
                option, 
                selected_option, 
                option
            )
            radio_btn.pack(fill='x', pady=8, padx=10)
            radio_buttons.append(radio_btn)
            
            # Update appearance when selection changes
            def update_radios():
                for btn in radio_buttons:
                    btn._update_appearance()
            selected_option.trace('w', lambda *args: quiz_window.after(1, update_radios))
        
        # Buttons with better spacing
        button_frame = tk.Frame(content_frame, bg=COLORS['bg_dark'])
        button_frame.pack(fill='x')
        
        def check_answer():
            answer = selected_option.get()
            if not answer:
                messagebox.showwarning("Quiz", ui['select_answer_first'])
                return
            
            quiz_window.destroy()
            
            # Get motivational feedback
            feedback_list = LANGUAGES[self.current_language]['quiz_feedback']
            
            if answer == korrekt:
                feedback = random.choice(feedback_list['correct'])
                messagebox.showinfo("Quiz", f"{feedback}\n\n✅ {korrekt}", icon='info')
            else:
                feedback = random.choice(feedback_list['incorrect'])
                messagebox.showinfo("Quiz", f"{feedback}\n\n💡 {ui.get('correct_answer', 'Richtige Antwort')}:\n{korrekt}", icon='info')
        
        answer_btn = ModernButton(
            button_frame,
            ui['check_answer'],
            check_answer,
            bg_color=COLORS['success'],
            width=180, height=45
        )
        answer_btn.pack(side='right')
        
        cancel_btn = ModernButton(
            button_frame,
            ui['cancel'],
            quiz_window.destroy,
            bg_color=COLORS['bg_light'],
            width=180, height=45
        )
        cancel_btn.pack(side='right', padx=(0, 15))
    
    def show_settings(self):
        """Show settings dialog"""
        settings_window = tk.Toplevel(self.root)
        ui = LANGUAGES[self.current_language]['ui']
        settings_window.title(ui['settings'])
        settings_window.geometry("500x450")
        settings_window.configure(bg=COLORS['bg_dark'])
        settings_window.transient(self.root)
        settings_window.grab_set()
        
        # Center the window
        settings_window.geometry("+%d+%d" % (self.root.winfo_rootx() + 350, self.root.winfo_rooty() + 175))
        
        content_frame = tk.Frame(settings_window, bg=COLORS['bg_dark'])
        content_frame.pack(fill='both', expand=True, padx=30, pady=30)
        
        title_label = tk.Label(
            content_frame,
            text=ui['settings'],
            font=('Segoe UI', 18, 'bold'),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_dark']
        )
        title_label.pack(pady=(0, 25))
        
        # API Key status
        api_key = os.getenv("OPENAI_API_KEY")
        if api_key:
            status_text = ui['api_configured']
            status_color = COLORS['success']
        else:
            status_text = ui['api_not_configured']
            status_color = COLORS['error']
        
        api_status = tk.Label(
            content_frame,
            text=status_text,
            font=('Segoe UI', 12),
            fg=status_color,
            bg=COLORS['bg_dark']
        )
        api_status.pack(pady=15)
        
        # Info text
        info_text = tk.Label(
            content_frame,
            text=ui['api_info'],
            font=('Segoe UI', 11),
            fg=COLORS['text_secondary'],
            bg=COLORS['bg_dark'],
            justify='center',
            wraplength=400
        )
        info_text.pack(pady=25)
        
        # Language selection in settings
        lang_frame = tk.Frame(content_frame, bg=COLORS['bg_dark'])
        lang_frame.pack(pady=15)
        
        lang_label = tk.Label(
            lang_frame,
            text=ui['language'] + ":",
            font=('Segoe UI', 12, 'bold'),
            fg=COLORS['text_primary'],
            bg=COLORS['bg_dark']
        )
        lang_label.pack(pady=(0, 10))
        
        current_lang_btn = ModernButton(
            lang_frame,
            f"{LANGUAGES[self.current_language]['flag']} {LANGUAGES[self.current_language]['name']}",
            lambda: [settings_window.destroy(), self.show_language_menu()],
            bg_color=COLORS['accent'],
            width=200, height=40
        )
        current_lang_btn.pack()
        
        # Close button
        close_btn = ModernButton(
            content_frame,
            ui['close'],
            settings_window.destroy,
            width=150, height=40
        )
        close_btn.pack(pady=(25, 0))
    
    def run(self):
        """Start the application"""
        self.root.mainloop()

# Start the application
if __name__ == "__main__":
    app = HistoryTutorApp()
    app.run()