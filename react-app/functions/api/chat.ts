interface Env {
  OPENAI_API_KEY?: string;
}

interface ChatRequest {
  messages: Array<{ role: string; content: string }>;
  systemPrompt: string;
  classLevel: number;
}

// Fallback responses when no API key is configured
const fallbackResponses: Record<string, string> = {
  'französische revolution': `Die Französische Revolution (1789-1799) war ein Wendepunkt der europäischen Geschichte.

**Wichtige Fakten:**
- Beginn: 14. Juli 1789 (Sturm auf die Bastille)
- Ursachen: Finanzielle Krise, Hungersnöte, Ungerechtigkeit der Ständegesellschaft
- Leitspruch: "Liberté, Égalité, Fraternité" (Freiheit, Gleichheit, Brüderlichkeit)
- König Ludwig XVI. wurde 1793 hingerichtet
- Ende der absoluten Monarchie in Frankreich

**Folgen:**
- Erklärung der Menschen- und Bürgerrechte
- Ende des Feudalsystems
- Inspiration für Demokratiebewegungen weltweit

Möchtest du mehr über ein bestimmtes Ereignis oder eine Person erfahren?`,

  'mittelalter': `Das Mittelalter (ca. 500-1500 n.Chr.) war eine prägende Epoche der europäischen Geschichte.

**Gesellschaftsstruktur:**
- Drei Stände: Klerus, Adel, Bauern
- Lehnswesen: Gegenseitige Abhängigkeit zwischen Herren und Vasallen
- Die Kirche hatte große Macht

**Wichtige Merkmale:**
- Burgen als Wohn- und Verteidigungsanlagen
- Rittertum und Turniere
- Klöster als Zentren der Bildung
- Kreuzzüge ins Heilige Land

**Alltagsleben:**
- Die meisten Menschen waren Bauern
- Harte Arbeit auf den Feldern
- Wenig Bildung für das einfache Volk
- Religion prägte das tägliche Leben

Welchen Aspekt des Mittelalters möchtest du genauer erkunden?`,

  'erster weltkrieg': `Der Erste Weltkrieg (1914-1918) war der erste industriell geführte Massenkrieg.

**Auslöser:**
- Attentat von Sarajevo am 28. Juni 1914
- Erzherzog Franz Ferdinand wurde ermordet
- Bündnissysteme zogen alle Großmächte in den Krieg

**Beteiligte:**
- Mittelmächte: Deutschland, Österreich-Ungarn, Osmanisches Reich
- Entente: Frankreich, Großbritannien, Russland (später USA)

**Verlauf:**
- Stellungskrieg an der Westfront
- Millionen Soldaten kämpften in Schützengräben
- Neue Waffen: Giftgas, Panzer, Flugzeuge

**Folgen:**
- Etwa 17 Millionen Tote
- Ende des Kaiserreichs in Deutschland
- Versailler Vertrag 1919
- Grundstein für den Zweiten Weltkrieg

Hast du Fragen zu bestimmten Schlachten oder Personen?`,

  'weimarer republik': `Die Weimarer Republik (1919-1933) war Deutschlands erste Demokratie.

**Gründung:**
- Nach dem Ersten Weltkrieg
- Verfassung wurde in Weimar beschlossen
- Friedrich Ebert war erster Reichspräsident

**Herausforderungen:**
- Versailler Vertrag: Hohe Reparationszahlungen, Gebietsverluste
- Hyperinflation 1923: Ein Dollar = 4,2 Billionen Mark
- Politische Instabilität: Viele Regierungswechsel
- Putschversuche von links und rechts

**"Goldene Zwanziger" (1924-1929):**
- Wirtschaftliche Erholung
- Kulturelle Blüte: Jazz, Kunst, Kino
- Berlin als Weltmetropole

**Ende:**
- Weltwirtschaftskrise ab 1929
- Massenarbeitslosigkeit
- 30. Januar 1933: Hitler wird Reichskanzler

Was interessiert dich besonders an dieser Zeit?`,

  'industrialisierung': `Die Industrialisierung veränderte Wirtschaft und Gesellschaft grundlegend.

**Beginn:**
- Mitte 18. Jahrhundert in England
- In Deutschland ab ca. 1830

**Wichtige Erfindungen:**
- Dampfmaschine (James Watt)
- Spinnmaschine und mechanischer Webstuhl
- Eisenbahn und Dampfschiff
- Stahlproduktion

**Gesellschaftliche Veränderungen:**
- Urbanisierung: Menschen zogen in die Städte
- Entstehung der Arbeiterklasse
- Fabrikarbeit statt Handwerk
- Kinderarbeit und lange Arbeitszeiten

**Soziale Frage:**
- Armut der Arbeiter
- Schlechte Wohnverhältnisse
- Keine soziale Absicherung
- Beginn der Arbeiterbewegung

Möchtest du mehr über die technischen Entwicklungen oder die sozialen Folgen erfahren?`,
};

function getFallbackResponse(userMessage: string, classLevel: number): string {
  const lowerMessage = userMessage.toLowerCase();

  for (const [key, response] of Object.entries(fallbackResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return `Das ist eine interessante Frage!

Ich bin dein KI-Geschichtstutor und helfe dir gerne bei Themen wie:
- Französische Revolution
- Mittelalter
- Erster und Zweiter Weltkrieg
- Weimarer Republik
- Industrialisierung
- Und vieles mehr!

**Tipp für Klasse ${classLevel}:** Nutze auch die anderen Features der App:
- 📝 Quiz - Teste dein Wissen
- ⏰ Pomodoro - Lerne konzentriert
- 📜 Timeline - Entdecke historische Ereignisse
- 🧠 Operatoren - Verstehe Aufgabenstellungen

Stelle mir eine konkrete Frage zu einem Geschichtsthema, und ich helfe dir gerne weiter!`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.json() as ChatRequest;
    const { messages, systemPrompt, classLevel } = body;

    // Get the last user message
    const lastUserMessage = messages
      .filter(m => m.role === 'user')
      .pop()?.content || '';

    // If no OpenAI API key is configured, use fallback responses
    if (!env.OPENAI_API_KEY) {
      const fallbackMessage = getFallbackResponse(lastUserMessage, classLevel);

      return new Response(
        JSON.stringify({ message: fallbackMessage }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `${systemPrompt}

Du bist ein Geschichtstutor für Schüler der Klasse ${classLevel} in Deutschland.
Antworte auf Deutsch und passe deine Erklärungen dem Niveau der Klassenstufe an.
Sei ermutigend, aber auch fordernd. Nutze konkrete Beispiele und Eselsbrücken.
Bei Quiz-Anfragen: Erstelle Multiple-Choice-Fragen mit 4 Antwortmöglichkeiten.`,
          },
          ...messages.map(m => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await openaiResponse.json() as any;
    const assistantMessage = data.choices[0]?.message?.content || 'Entschuldigung, ich konnte keine Antwort generieren.';

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Chat API error:', error);

    return new Response(
      JSON.stringify({
        message: 'Es gab einen Fehler bei der Verarbeitung deiner Anfrage. Bitte versuche es erneut.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
