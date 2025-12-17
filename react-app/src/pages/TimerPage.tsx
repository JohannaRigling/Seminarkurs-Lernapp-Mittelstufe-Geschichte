import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings, Coffee, BookOpen, Trophy, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToastContext } from '../contexts/ToastContext';
import { Card, CardContent, Button, Modal } from '../components/common';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';

type TimerMode = 'work' | 'break';

const TimerPage: React.FC = () => {
  const { userData, currentUser, updateProgress, addCoins, addXP } = useAuth();
  const toast = useToastContext();

  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const audioRef = useRef<AudioContext | null>(null);

  const totalTime = mode === 'work' ? workDuration * 60 : breakDuration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const playSound = useCallback(() => {
    if (!soundEnabled) return;

    try {
      if (!audioRef.current) {
        audioRef.current = new AudioContext();
      }

      const oscillator = audioRef.current.createOscillator();
      const gainNode = audioRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioRef.current.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioRef.current.currentTime + 0.5);

      oscillator.start(audioRef.current.currentTime);
      oscillator.stop(audioRef.current.currentTime + 0.5);
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }, [soundEnabled]);

  const completeSession = useCallback(async () => {
    if (!userData || !currentUser) return;

    const newSessionsCompleted = sessionsCompleted + 1;
    setSessionsCompleted(newSessionsCompleted);

    // Calculate rewards
    const coinsEarned = 10;
    const xpEarned = 15;
    const bonusCoins = newSessionsCompleted % 4 === 0 ? 20 : 0;

    await addCoins(coinsEarned + bonusCoins);
    await addXP(xpEarned);

    await updateProgress({
      pomodoroSessions: userData.progress.pomodoroSessions + 1,
      totalMinutes: userData.progress.totalMinutes + workDuration,
      todayMinutes: userData.progress.todayMinutes + workDuration,
    });

    // Add activity
    await updateDoc(doc(db, 'users', currentUser.uid), {
      activities: arrayUnion({
        id: crypto.randomUUID(),
        type: 'pomodoro',
        description: `Pomodoro-Session abgeschlossen (${workDuration} Min)`,
        timestamp: new Date().toISOString(),
        coins: coinsEarned + bonusCoins,
        xp: xpEarned,
      }),
    });

    if (bonusCoins > 0) {
      toast.success(`🎉 Bonus! 4 Sessions = +${bonusCoins} Münzen!`);
    } else {
      toast.success(`+${coinsEarned} Münzen, +${xpEarned} XP verdient!`);
    }
  }, [userData, currentUser, sessionsCompleted, workDuration, addCoins, addXP, updateProgress, toast]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound();

      if (mode === 'work') {
        completeSession();
        toast.info('Pause Zeit! Gönn dir eine kurze Erholung.');
        setMode('break');
        setTimeLeft(breakDuration * 60);
      } else {
        toast.info('Pause vorbei! Bereit für die nächste Session?');
        setMode('work');
        setTimeLeft(workDuration * 60);
      }
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, workDuration, breakDuration, playSound, completeSession, toast]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'work' ? workDuration * 60 : breakDuration * 60);
  };

  const handleSaveSettings = () => {
    setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
    setShowSettings(false);
    toast.success('Einstellungen gespeichert!');
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
        <p className="text-[var(--color-text-muted)] mt-2">
          Konzentriert lernen mit regelmäßigen Pausen
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="text-center p-4">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{sessionsCompleted}</p>
            <p className="text-sm text-[var(--color-text-muted)]">Heute</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{userData?.progress.pomodoroSessions || 0}</p>
            <p className="text-sm text-[var(--color-text-muted)]">Gesamt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center p-4">
            <Coffee className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold">{userData?.progress.totalMinutes || 0}</p>
            <p className="text-sm text-[var(--color-text-muted)]">Minuten</p>
          </CardContent>
        </Card>
      </div>

      {/* Timer Card */}
      <Card glow className="mb-6">
        <CardContent className="py-12">
          {/* Mode Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => switchMode('work')}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-full
                transition-all duration-200
                ${mode === 'work'
                  ? 'bg-green-500 text-white'
                  : 'bg-[var(--color-surface-light)] hover:bg-white/10'
                }
              `}
            >
              <BookOpen className="w-4 h-4" />
              Arbeiten
            </button>
            <button
              onClick={() => switchMode('break')}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-full
                transition-all duration-200
                ${mode === 'break'
                  ? 'bg-orange-500 text-white'
                  : 'bg-[var(--color-surface-light)] hover:bg-white/10'
                }
              `}
            >
              <Coffee className="w-4 h-4" />
              Pause
            </button>
          </div>

          {/* Timer Display */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="var(--color-surface-light)"
                strokeWidth="12"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke={mode === 'work' ? '#22c55e' : '#f97316'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                className="transition-all duration-1000"
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold font-mono">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[var(--color-text-muted)] mt-2">
                {mode === 'work' ? 'Konzentriere dich!' : 'Entspann dich!'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={resetTimer}
              className="p-4 rounded-full bg-[var(--color-surface-light)] hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            <button
              onClick={toggleTimer}
              className={`
                p-6 rounded-full transition-all duration-200
                ${isRunning
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
                }
              `}
            >
              {isRunning ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="p-4 rounded-full bg-[var(--color-surface-light)] hover:bg-white/10 transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Session Progress */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Session-Fortschritt</span>
            <span className="text-[var(--color-text-muted)]">
              {sessionsCompleted % 4} / 4 bis Bonus
            </span>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`
                  flex-1 h-3 rounded-full transition-colors
                  ${i < sessionsCompleted % 4
                    ? 'bg-[var(--color-secondary)]'
                    : 'bg-[var(--color-surface-light)]'
                  }
                `}
              />
            ))}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mt-2 text-center">
            {4 - (sessionsCompleted % 4)} Sessions bis +20 Bonus-Münzen!
          </p>
        </CardContent>
      </Card>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Timer-Einstellungen"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Arbeitszeit (Minuten)
            </label>
            <input
              type="range"
              min="5"
              max="60"
              value={workDuration}
              onChange={(e) => setWorkDuration(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
              <span>5</span>
              <span className="font-bold text-[var(--color-secondary)]">{workDuration} Min</span>
              <span>60</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Pausenzeit (Minuten)
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
              <span>1</span>
              <span className="font-bold text-[var(--color-secondary)]">{breakDuration} Min</span>
              <span>30</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>Sound-Benachrichtigung</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`
                p-2 rounded-lg transition-colors
                ${soundEnabled ? 'bg-green-500' : 'bg-[var(--color-surface-light)]'}
              `}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
          </div>

          <Button onClick={handleSaveSettings} className="w-full">
            Speichern
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TimerPage;
