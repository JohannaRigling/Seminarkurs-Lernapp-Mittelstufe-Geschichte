import React, { useState } from 'react';
import { Lightbulb, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent, Modal } from '../components/common';
import { learningStrategies } from '../data/strategiesData';
import type { LearningStrategy } from '../types';

const StrategiesPage: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<LearningStrategy | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStrategies = learningStrategies.filter(
    (strategy) =>
      strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Lightbulb className="w-8 h-8 text-[var(--color-secondary)]" />
          Lernstrategien
        </h1>
        <p className="text-[var(--color-text-muted)] mt-2">
          Entdecke effektive Methoden zum Lernen von Geschichte
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Strategie suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full pl-10 pr-4 py-3
            bg-[var(--color-surface)]
            border-2 border-[var(--color-secondary)]/30
            rounded-lg
            text-[var(--color-text)]
            placeholder:text-[var(--color-text-muted)]
            focus:outline-none focus:border-[var(--color-secondary)]
            transition-colors
          "
        />
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStrategies.map((strategy) => (
          <Card
            key={strategy.id}
            hover
            onClick={() => setSelectedStrategy(strategy)}
            className="group"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-4xl mb-3">{strategy.icon}</div>
                  <h3 className="font-bold text-lg group-hover:text-[var(--color-secondary)] transition-colors">
                    {strategy.name}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm mt-2 line-clamp-2">
                    {strategy.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-secondary)] transition-colors flex-shrink-0 mt-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStrategies.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-muted)]">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Keine Strategien gefunden</p>
        </div>
      )}

      {/* Strategy Detail Modal */}
      {selectedStrategy && (
        <Modal
          isOpen={!!selectedStrategy}
          onClose={() => setSelectedStrategy(null)}
          title={selectedStrategy.name}
          size="xl"
        >
          <div className="space-y-6">
            {/* Icon & Description */}
            <div className="flex items-start gap-4">
              <div className="text-6xl">{selectedStrategy.icon}</div>
              <div>
                <p className="text-lg">{selectedStrategy.description}</p>
              </div>
            </div>

            {/* Steps */}
            <div className="p-4 bg-[var(--color-surface-light)] rounded-lg">
              <h4 className="font-bold text-[var(--color-secondary)] mb-3">
                So gehst du vor:
              </h4>
              <ol className="space-y-2">
                {selectedStrategy.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-secondary)] text-[var(--color-background)] flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="font-bold text-green-500 mb-3">
                Vorteile dieser Methode:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedStrategy.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* History Tips */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <h4 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Tipps für Geschichte:
              </h4>
              <ul className="space-y-2">
                {selectedStrategy.historyTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="text-center p-4 bg-[var(--color-surface-light)] rounded-lg">
              <p className="text-[var(--color-text-muted)]">
                Probiere diese Strategie beim nächsten Lernen aus!
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StrategiesPage;
