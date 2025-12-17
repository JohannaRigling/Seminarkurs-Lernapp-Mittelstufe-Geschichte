import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  MessageCircle,
  Lightbulb,
  ListChecks,
  Scale,
  HelpCircle,
  Clock,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button } from '../components/common';
import type { ChatMessage } from '../types';

type AIMode = 'tutor' | 'critic' | 'discussion';

const ChatPage: React.FC = () => {
  const { userData } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiMode, setAIMode] = useState<AIMode>('tutor');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const aiModes = [
    {
      id: 'tutor' as AIMode,
      name: 'Tutor',
      icon: BookOpen,
      description: 'Freundlich und geduldig',
      color: 'bg-green-500',
    },
    {
      id: 'critic' as AIMode,
      name: 'Kritiker',
      icon: Scale,
      description: 'Streng und fordernd',
      color: 'bg-red-500',
    },
    {
      id: 'discussion' as AIMode,
      name: 'Diskussionspartner',
      icon: MessageCircle,
      description: 'Verschiedene Perspektiven',
      color: 'bg-blue-500',
    },
  ];

  const quickPrompts = [
    { icon: Lightbulb, text: 'Erkläre mir eine Eselsbrücke für...', label: 'Eselsbrücke' },
    { icon: ListChecks, text: 'Fasse zusammen:', label: 'Zusammenfassung' },
    { icon: HelpCircle, text: 'Erstelle ein Quiz zu:', label: 'Quiz erstellen' },
    { icon: Sparkles, text: 'Erkläre einfach:', label: 'Einfach erklärt' },
    { icon: Clock, text: 'Ordne chronologisch:', label: 'Zeitleiste' },
    { icon: Scale, text: 'Vergleiche:', label: 'Vergleich' },
  ];

  const getModeSystemPrompt = () => {
    switch (aiMode) {
      case 'tutor':
        return 'Du bist ein freundlicher, geduldiger Geschichtslehrer. Erkläre Konzepte verständlich und ermutige den Schüler.';
      case 'critic':
        return 'Du bist ein strenger, aber fairer Geschichtsprofessor. Fordere präzise Antworten und korrigiere Fehler direkt.';
      case 'discussion':
        return 'Du bist ein Diskussionspartner, der verschiedene historische Perspektiven beleuchtet und zum kritischen Denken anregt.';
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call Cloudflare Pages Function for AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt: getModeSystemPrompt(),
          classLevel: userData?.classLevel || 8,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message || 'Entschuldigung, ich konnte keine Antwort generieren.',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      // Fallback response when API is not available
      const fallbackMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: getFallbackResponse(text),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const getFallbackResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('französische revolution')) {
      return 'Die Französische Revolution (1789-1799) war ein Wendepunkt der europäischen Geschichte. Sie begann mit dem Sturm auf die Bastille am 14. Juli 1789 und führte zum Ende der Monarchie in Frankreich. Die Ideale "Freiheit, Gleichheit, Brüderlichkeit" prägen bis heute demokratische Gesellschaften.\n\nMöchtest du mehr über ein bestimmtes Ereignis oder eine Person aus dieser Zeit erfahren?';
    }

    if (lowerQuestion.includes('mittelalter')) {
      return 'Das Mittelalter (ca. 500-1500 n.Chr.) war geprägt vom Lehnswesen, der Macht der Kirche und dem Rittertum. Die Gesellschaft war in drei Stände geteilt: Klerus, Adel und Bauern.\n\nWelchen Aspekt des Mittelalters möchtest du genauer erkunden?';
    }

    if (lowerQuestion.includes('erster weltkrieg') || lowerQuestion.includes('1. weltkrieg')) {
      return 'Der Erste Weltkrieg (1914-1918) wurde durch das Attentat von Sarajevo ausgelöst. Er war geprägt vom Stellungskrieg und forderte Millionen Opfer. Der Versailler Vertrag von 1919 hatte weitreichende Folgen für Europa.\n\nHast du Fragen zu bestimmten Schlachten, Personen oder den Folgen des Krieges?';
    }

    return `Das ist eine interessante Frage zu "${question}"!\n\nUm dir die beste Antwort zu geben, kann ich dir folgendes anbieten:\n\n1. **Erklärung**: Ich erkläre dir das Thema Schritt für Schritt\n2. **Zusammenfassung**: Die wichtigsten Punkte auf einen Blick\n3. **Quiz**: Teste dein Wissen mit Fragen\n4. **Eselsbrücke**: Merkhilfen zum Thema\n\nWas würde dir am meisten helfen?`;
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputValue(promptText);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold">KI-Chat</h1>
        <p className="text-[var(--color-text-muted)]">
          Dein persönlicher Geschichts-Tutor
        </p>
      </div>

      {/* AI Mode Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {aiModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setAIMode(mode.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              transition-all duration-200
              ${aiMode === mode.id
                ? `${mode.color} text-white`
                : 'bg-[var(--color-surface)] border border-[var(--color-secondary)]/30 hover:border-[var(--color-secondary)]'
              }
            `}
          >
            <mode.icon className="w-4 h-4" />
            <span className="font-medium">{mode.name}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Bot className="w-16 h-16 text-[var(--color-secondary)] mb-4" />
              <h2 className="text-xl font-bold mb-2">Willkommen beim KI-Tutor!</h2>
              <p className="text-[var(--color-text-muted)] max-w-md mb-6">
                Ich bin hier, um dir bei Geschichte zu helfen. Stelle mir Fragen
                oder nutze die Schnellaktionen unten!
              </p>

              {/* Quick Prompts */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    onClick={() => handleQuickPrompt(prompt.text)}
                    className="flex items-center gap-2 px-3 py-2 bg-[var(--color-surface-light)] rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    <prompt.icon className="w-4 h-4 text-[var(--color-secondary)]" />
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${message.role === 'user'
                      ? 'bg-[var(--color-secondary)]'
                      : 'bg-[var(--color-surface-light)]'
                    }
                  `}>
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-[var(--color-background)]" />
                    ) : (
                      <Bot className="w-5 h-5 text-[var(--color-secondary)]" />
                    )}
                  </div>
                  <div className={`
                    max-w-[80%] p-4 rounded-2xl
                    ${message.role === 'user'
                      ? 'bg-[var(--color-secondary)] text-[var(--color-background)]'
                      : 'bg-[var(--color-surface-light)]'
                    }
                  `}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-surface-light)] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[var(--color-secondary)]" />
                  </div>
                  <div className="bg-[var(--color-surface-light)] p-4 rounded-2xl">
                    <Loader2 className="w-5 h-5 animate-spin text-[var(--color-secondary)]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--color-secondary)]/20">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Stelle eine Frage zur Geschichte..."
              className="
                flex-1 px-4 py-3
                bg-[var(--color-surface-light)]
                border-2 border-[var(--color-secondary)]/30
                rounded-xl
                text-[var(--color-text)]
                placeholder:text-[var(--color-text-muted)]
                focus:outline-none focus:border-[var(--color-secondary)]
                transition-colors
              "
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ChatPage;
