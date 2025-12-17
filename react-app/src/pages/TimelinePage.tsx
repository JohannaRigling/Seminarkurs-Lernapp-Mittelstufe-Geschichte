import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Clock, Filter } from 'lucide-react';
import { Card, CardContent, Modal } from '../components/common';
import { timelineEvents, eras } from '../data/timelineData';
import type { TimelineEvent } from '../types';

const TimelinePage: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const filteredEvents = selectedEra === 'all'
    ? timelineEvents
    : timelineEvents.filter((event) => event.era === selectedEra);

  const toggleEventExpand = (eventId: string) => {
    setExpandedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const getEraColor = (era: string): string => {
    const colors: Record<string, string> = {
      'Antike': 'bg-amber-600',
      'Mittelalter': 'bg-emerald-600',
      'Frühe Neuzeit': 'bg-blue-600',
      'Revolutionszeitalter': 'bg-red-600',
      '19. Jahrhundert': 'bg-purple-600',
      '20. Jahrhundert': 'bg-cyan-600',
    };
    return colors[era] || 'bg-gray-600';
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Clock className="w-8 h-8 text-[var(--color-secondary)]" />
          Historische Zeitleiste
        </h1>
        <p className="text-[var(--color-text-muted)] mt-2">
          Entdecke wichtige Ereignisse der Geschichte
        </p>
      </div>

      {/* Era Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-5 h-5 text-[var(--color-text-muted)]" />
          <span className="text-sm text-[var(--color-text-muted)]">Nach Epoche filtern:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200
                ${selectedEra === era.id
                  ? 'bg-[var(--color-secondary)] text-[var(--color-background)]'
                  : 'bg-[var(--color-surface)] border border-[var(--color-secondary)]/30 hover:border-[var(--color-secondary)]'
                }
              `}
            >
              {era.name}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-secondary)]/30" />

        {/* Events */}
        <div className="space-y-8">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`
                relative flex items-start gap-4
                ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
              `}
            >
              {/* Timeline Dot */}
              <div className={`
                absolute left-6 md:left-1/2 transform -translate-x-1/2
                w-4 h-4 rounded-full border-4 border-[var(--color-background)]
                ${getEraColor(event.era)}
                z-10
              `} />

              {/* Year Badge (Desktop) */}
              <div className={`
                hidden md:block w-20 text-center flex-shrink-0
                ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}
              `}>
                <span className="text-2xl font-bold text-[var(--color-secondary)]">
                  {event.year}
                </span>
              </div>

              {/* Event Card */}
              <div className={`
                flex-1 ml-12 md:ml-0 max-w-md
                ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}
              `}>
                <Card
                  hover
                  onClick={() => setSelectedEvent(event)}
                  className="group"
                >
                  <CardContent className="p-4">
                    {/* Year Badge (Mobile) */}
                    <span className="md:hidden text-lg font-bold text-[var(--color-secondary)] mb-2 block">
                      {event.year}
                    </span>

                    {/* Era Badge */}
                    <span className={`
                      inline-block px-2 py-1 rounded text-xs font-medium mb-2
                      ${getEraColor(event.era)} text-white
                    `}>
                      {event.era}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold group-hover:text-[var(--color-secondary)] transition-colors">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--color-text-muted)] mt-2">
                      {event.description}
                    </p>

                    {/* Expand Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEventExpand(event.id);
                      }}
                      className="flex items-center gap-1 mt-3 text-sm text-[var(--color-secondary)] hover:underline"
                    >
                      {expandedEvents.has(event.id) ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Weniger anzeigen
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Mehr erfahren
                        </>
                      )}
                    </button>

                    {/* Expanded Details */}
                    {expandedEvents.has(event.id) && event.details && (
                      <div className="mt-4 pt-4 border-t border-[var(--color-secondary)]/20">
                        <p className="text-sm">{event.details}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[var(--color-secondary)]">
                {selectedEvent.year}
              </span>
              <span className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${getEraColor(selectedEvent.era)} text-white
              `}>
                {selectedEvent.era}
              </span>
            </div>

            <p className="text-lg">{selectedEvent.description}</p>

            {selectedEvent.details && (
              <div className="p-4 bg-[var(--color-surface-light)] rounded-lg">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-secondary)]" />
                  Details
                </h4>
                <p className="text-[var(--color-text-muted)]">
                  {selectedEvent.details}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TimelinePage;
