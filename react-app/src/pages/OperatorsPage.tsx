import React, { useState } from 'react';
import { Brain, ChevronRight, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, Modal } from '../components/common';
import { operators, operatorLevels } from '../data/operatorsData';
import { Operator } from '../types';

const OperatorsPage: React.FC = () => {
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const filteredOperators = operators.filter((op) => {
    const matchesSearch =
      op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLevel = selectedLevel === null || op.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: number): string => {
    switch (level) {
      case 1:
        return 'bg-green-500';
      case 2:
        return 'bg-blue-500';
      case 3:
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Brain className="w-8 h-8 text-[var(--color-secondary)]" />
          Operatoren
        </h1>
        <p className="text-[var(--color-text-muted)] mt-2">
          Verstehe, was die Aufgabenstellungen von dir verlangen
        </p>
      </div>

      {/* Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {operatorLevels.map((level) => (
          <Card
            key={level.level}
            hover
            onClick={() =>
              setSelectedLevel(selectedLevel === level.level ? null : level.level)
            }
            className={`
              ${selectedLevel === level.level ? 'ring-2 ring-[var(--color-secondary)]' : ''}
            `}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-12 rounded-full ${level.color}`} />
                <div>
                  <h3 className="font-bold">{level.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {level.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Operator suchen..."
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

      {/* Operators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOperators.map((operator) => (
          <Card
            key={operator.id}
            hover
            onClick={() => setSelectedOperator(operator)}
            className="group"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`
                        px-2 py-0.5 rounded text-xs font-medium text-white
                        ${getLevelColor(operator.level)}
                      `}
                    >
                      AFB {operator.level}
                    </span>
                    <h3 className="font-bold text-lg group-hover:text-[var(--color-secondary)] transition-colors">
                      {operator.name}
                    </h3>
                  </div>
                  <p className="text-[var(--color-text-muted)]">
                    {operator.definition}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {operator.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 bg-[var(--color-surface-light)] rounded text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-secondary)] transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOperators.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-muted)]">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Keine Operatoren gefunden</p>
        </div>
      )}

      {/* Operator Detail Modal */}
      {selectedOperator && (
        <Modal
          isOpen={!!selectedOperator}
          onClose={() => setSelectedOperator(null)}
          title={selectedOperator.name}
          size="xl"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <span
                className={`
                  px-3 py-1 rounded-full text-sm font-medium text-white
                  ${getLevelColor(selectedOperator.level)}
                `}
              >
                {selectedOperator.levelName} (AFB {selectedOperator.level})
              </span>
            </div>

            {/* Definition */}
            <div className="p-4 bg-[var(--color-surface-light)] rounded-lg">
              <h4 className="font-bold text-[var(--color-secondary)] mb-2">
                Definition
              </h4>
              <p className="text-lg">{selectedOperator.definition}</p>
            </div>

            {/* Explanation */}
            <div>
              <h4 className="font-bold text-[var(--color-secondary)] mb-2">
                Erklärung
              </h4>
              <p>{selectedOperator.explanation}</p>
            </div>

            {/* Steps */}
            <div>
              <h4 className="font-bold text-[var(--color-secondary)] mb-2">
                Vorgehensweise
              </h4>
              <ol className="space-y-2">
                {selectedOperator.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-secondary)] text-[var(--color-background)] flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Examples */}
            <div>
              <h4 className="font-bold text-[var(--color-secondary)] mb-2">
                Beispielaufgaben
              </h4>
              <ul className="space-y-2">
                {selectedOperator.examples.map((example, index) => (
                  <li
                    key={index}
                    className="p-3 bg-[var(--color-surface-light)] rounded-lg italic"
                  >
                    "{example}"
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div>
              <h4 className="font-bold text-green-500 mb-2">Tipps</h4>
              <ul className="space-y-1">
                {selectedOperator.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div>
              <h4 className="font-bold text-red-500 mb-2">Häufige Fehler</h4>
              <ul className="space-y-1">
                {selectedOperator.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords */}
            <div>
              <h4 className="font-bold text-[var(--color-secondary)] mb-2">
                Ähnliche Operatoren
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedOperator.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-[var(--color-surface-light)] rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OperatorsPage;
