import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToastContext } from '../contexts/ToastContext';
import { Card, CardContent, CardHeader, Button, ProgressBar } from '../components/common';
import { quizTopics } from '../data/quizData';
import type { QuizTopic } from '../types';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';

const QuizPage: React.FC = () => {
  const { userData, currentUser, updateProgress, addCoins, addXP } = useAuth();
  const toast = useToastContext();

  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!userData) return null;

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null || !selectedTopic) return;

    const currentQuestion = selectedTopic.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = async () => {
    if (!selectedTopic) return;

    if (currentQuestionIndex < selectedTopic.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);

      // Calculate rewards
      const totalQuestions = selectedTopic.questions.length;
      const percentage = (correctAnswers / totalQuestions) * 100;
      let coinsEarned = Math.floor(percentage / 10); // 0-10 coins based on percentage
      const xpEarned = correctAnswers * 5;

      // Bonus for perfect score
      if (correctAnswers === totalQuestions) {
        coinsEarned += 5;
        toast.success('Perfekt! Bonus-Münzen erhalten!');
      }

      // Update progress
      await addCoins(coinsEarned);
      await addXP(xpEarned);

      await updateProgress({
        exercisesDone: userData.progress.exercisesDone + 1,
        quizCorrect: userData.progress.quizCorrect + correctAnswers,
        quizTotal: userData.progress.quizTotal + totalQuestions,
      });

      // Add activity
      if (currentUser) {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          activities: arrayUnion({
            id: crypto.randomUUID(),
            type: 'quiz',
            description: `Quiz "${selectedTopic.title}" abgeschlossen: ${correctAnswers}/${totalQuestions}`,
            timestamp: new Date().toISOString(),
            coins: coinsEarned,
            xp: xpEarned,
          }),
        });
      }
    }
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  // Quiz Results Screen
  if (quizCompleted && selectedTopic) {
    const totalQuestions = selectedTopic.questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const coinsEarned = Math.floor(percentage / 10) + (correctAnswers === totalQuestions ? 5 : 0);
    const xpEarned = correctAnswers * 5;

    return (
      <div className="max-w-2xl mx-auto animate-fadeIn">
        <Card glow>
          <CardContent className="text-center py-8">
            <div className="mb-6">
              {percentage >= 80 ? (
                <Trophy className="w-20 h-20 mx-auto text-yellow-500 animate-pulse-custom" />
              ) : percentage >= 50 ? (
                <Star className="w-20 h-20 mx-auto text-blue-500" />
              ) : (
                <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
              )}
            </div>

            <h2 className="text-3xl font-bold mb-2">Quiz abgeschlossen!</h2>
            <p className="text-[var(--color-text-muted)] mb-6">
              {selectedTopic.title}
            </p>

            <div className="text-5xl font-bold text-[var(--color-secondary)] mb-4">
              {correctAnswers} / {totalQuestions}
            </div>

            <ProgressBar
              value={correctAnswers}
              max={totalQuestions}
              showValue={false}
              size="lg"
              color={percentage >= 80 ? 'gold' : percentage >= 50 ? 'blue' : 'green'}
            />

            <p className="text-xl mt-4 mb-6">
              {percentage >= 80
                ? 'Ausgezeichnet! Du bist ein wahrer Geschichtsexperte!'
                : percentage >= 50
                ? 'Gut gemacht! Weiter so!'
                : 'Übung macht den Meister. Versuch es nochmal!'}
            </p>

            <div className="flex justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl">🐄</div>
                <div className="font-bold text-yellow-500">+{coinsEarned}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">✨</div>
                <div className="font-bold text-purple-400">+{xpEarned} XP</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onClick={handleBackToTopics}>
                Zur Themenauswahl
              </Button>
              <Button onClick={() => handleTopicSelect(selectedTopic)}>
                Nochmal spielen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz Question Screen
  if (selectedTopic) {
    const currentQuestion = selectedTopic.questions[currentQuestionIndex];
    const totalQuestions = selectedTopic.questions.length;

    return (
      <div className="max-w-2xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBackToTopics}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{selectedTopic.title}</h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              Frage {currentQuestionIndex + 1} von {totalQuestions}
            </p>
          </div>
          <div className="text-lg font-bold text-[var(--color-secondary)]">
            {correctAnswers} richtig
          </div>
        </div>

        {/* Progress */}
        <ProgressBar
          value={currentQuestionIndex + 1}
          max={totalQuestions}
          showValue={false}
          size="sm"
        />

        {/* Question Card */}
        <Card className="mt-6">
          <CardContent>
            <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let optionClass = 'border-[var(--color-secondary)]/30 hover:border-[var(--color-secondary)]';

                if (showResult) {
                  if (index === currentQuestion.correctAnswer) {
                    optionClass = 'border-green-500 bg-green-500/20';
                  } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                    optionClass = 'border-red-500 bg-red-500/20';
                  }
                } else if (selectedAnswer === index) {
                  optionClass = 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/20';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`
                      w-full p-4 rounded-lg border-2 text-left
                      transition-all duration-200
                      ${optionClass}
                      ${showResult ? 'cursor-default' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${showResult && index === currentQuestion.correctAnswer
                          ? 'bg-green-500 text-white'
                          : showResult && index === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-[var(--color-surface-light)]'
                        }
                      `}>
                        {showResult && index === currentQuestion.correctAnswer ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : showResult && index === selectedAnswer ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-green-500/20 border border-green-500/50'
                  : 'bg-red-500/20 border border-red-500/50'
              }`}>
                <p className="font-medium mb-2">
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? '✓ Richtig!'
                    : '✗ Leider falsch'}
                </p>
                <p className="text-[var(--color-text-muted)]">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end">
              {!showResult ? (
                <Button
                  onClick={handleConfirmAnswer}
                  disabled={selectedAnswer === null}
                >
                  Antwort bestätigen
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex < totalQuestions - 1
                    ? 'Nächste Frage'
                    : 'Ergebnis anzeigen'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Topic Selection Screen
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Quiz</h1>
        <p className="text-[var(--color-text-muted)] mt-2">
          Wähle ein Thema und teste dein Wissen!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizTopics.map((topic) => (
          <Card
            key={topic.id}
            hover
            onClick={() => handleTopicSelect(topic)}
            className="group"
          >
            <CardHeader className="flex items-center gap-4">
              <div className="text-4xl">{topic.icon}</div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-[var(--color-secondary)] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Klasse {topic.classLevel}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--color-text-muted)] mb-4">
                {topic.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span>{topic.questions.length} Fragen</span>
                <span className="text-[var(--color-secondary)]">
                  Bis zu {topic.questions.length + 5} 🐄
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
