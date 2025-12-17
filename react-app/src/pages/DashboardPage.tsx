import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  MessageSquare,
  Clock,
  History,
  Brain,
  Lightbulb,
  Castle,
  Trophy,
  Flame,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, ProgressBar } from '../components/common';

const DashboardPage: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();

  if (!userData) return null;

  const { progress } = userData;

  // Calculate XP progress to next level
  const xpLevels = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 10000];
  const currentLevelXP = xpLevels[progress.level - 1] || 0;
  const nextLevelXP = xpLevels[progress.level] || xpLevels[xpLevels.length - 1];
  const xpProgress = progress.xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;

  const quickActions = [
    { icon: BookOpen, label: 'Quiz starten', path: '/quiz', color: 'bg-blue-500' },
    { icon: MessageSquare, label: 'KI-Chat', path: '/chat', color: 'bg-purple-500' },
    { icon: Clock, label: 'Pomodoro', path: '/timer', color: 'bg-green-500' },
    { icon: History, label: 'Timeline', path: '/timeline', color: 'bg-orange-500' },
    { icon: Brain, label: 'Operatoren', path: '/operators', color: 'bg-pink-500' },
    { icon: Lightbulb, label: 'Strategien', path: '/strategies', color: 'bg-yellow-500' },
  ];

  const stats = [
    { icon: Trophy, label: 'Quizze', value: progress.exercisesDone, color: 'text-yellow-500' },
    { icon: Target, label: 'Richtig', value: `${progress.quizCorrect}/${progress.quizTotal}`, color: 'text-green-500' },
    { icon: Clock, label: 'Lernzeit', value: `${progress.totalMinutes} Min`, color: 'text-blue-500' },
    { icon: Flame, label: 'Streak', value: `${progress.streak} Tage`, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Hallo, <span className="text-[var(--color-secondary)]">{userData.username}</span>!
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Bereit, Geschichte zu entdecken?
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-secondary)]/30">
            <span className="text-2xl">🐄</span>
            <span className="font-bold text-lg">{progress.coins}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface)] rounded-lg border border-purple-500/30">
            <span className="text-2xl">✨</span>
            <span className="font-bold text-lg text-purple-400">{progress.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <Card glow>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar & Rank */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] flex items-center justify-center text-3xl font-bold text-[var(--color-background)]">
                {userData.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-secondary)]">
                  {progress.rank}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Level {progress.level}
                </p>
              </div>
            </div>

            {/* XP Progress */}
            <div className="flex-1 w-full">
              <ProgressBar
                value={xpProgress}
                max={xpNeeded}
                label="Fortschritt zum nächsten Level"
                color="gold"
              />
            </div>

            {/* Castle Button */}
            <button
              onClick={() => navigate('/castle')}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-light)] rounded-lg border border-[var(--color-secondary)]/30 hover:border-[var(--color-secondary)] transition-colors"
            >
              <Castle className="w-5 h-5 text-[var(--color-secondary)]" />
              <span>Meine Burg</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[var(--color-secondary)]" />
          Schnellstart
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.path}
              hover
              onClick={() => navigate(action.path)}
              className="group"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className={`p-3 rounded-xl ${action.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium">{action.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--color-secondary)]" />
            Letzte Aktivitäten
          </h2>
        </CardHeader>
        <CardContent>
          {userData.activities.length > 0 ? (
            <div className="space-y-3">
              {userData.activities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-[var(--color-surface-light)] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)]" />
                    <span>{activity.description}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {activity.coins && (
                      <span className="text-yellow-500">+{activity.coins} 🐄</span>
                    )}
                    {activity.xp && (
                      <span className="text-purple-400">+{activity.xp} XP</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--color-text-muted)] py-8">
              Noch keine Aktivitäten. Starte ein Quiz!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
