import React, { useState } from 'react';
import { Settings, User, Bell, Palette, Clock, Save, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToastContext } from '../contexts/ToastContext';
import { Card, CardContent, CardHeader, Button } from '../components/common';

const SettingsPage: React.FC = () => {
  const { userData, updateUserData, logout } = useAuth();
  const toast = useToastContext();

  const [username, setUsername] = useState(userData?.username || '');
  const [classLevel, setClassLevel] = useState(userData?.classLevel || 8);
  const [pomodoroWork, setPomodoroWork] = useState(userData?.preferences.pomodoroWork || 25);
  const [pomodoroBreak, setPomodoroBreak] = useState(userData?.preferences.pomodoroBreak || 5);
  const [soundEnabled, setSoundEnabled] = useState(userData?.preferences.soundEnabled ?? true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserData({
        username,
        classLevel,
        preferences: {
          ...userData!.preferences,
          pomodoroWork,
          pomodoroBreak,
          soundEnabled,
        },
      });
      toast.success('Einstellungen gespeichert!');
    } catch (error) {
      toast.error('Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="w-8 h-8 text-[var(--color-secondary)]" />
          Einstellungen
        </h1>
        <p className="text-[var(--color-text-muted)] mt-2">
          Passe die App an deine Bedürfnisse an
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="mb-6">
        <CardHeader className="flex items-center gap-3">
          <User className="w-5 h-5 text-[var(--color-secondary)]" />
          <h2 className="text-lg font-bold">Profil</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Benutzername</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full px-4 py-2.5
                bg-[var(--color-surface-light)]
                border-2 border-[var(--color-secondary)]/30
                rounded-lg
                text-[var(--color-text)]
                focus:outline-none focus:border-[var(--color-secondary)]
                transition-colors
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Klassenstufe</label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(Number(e.target.value))}
              className="
                w-full px-4 py-2.5
                bg-[var(--color-surface-light)]
                border-2 border-[var(--color-secondary)]/30
                rounded-lg
                text-[var(--color-text)]
                focus:outline-none focus:border-[var(--color-secondary)]
                transition-colors
                cursor-pointer
              "
            >
              <option value={7}>Klasse 7</option>
              <option value={8}>Klasse 8</option>
              <option value={9}>Klasse 9</option>
              <option value={10}>Klasse 10</option>
            </select>
          </div>

          <div className="pt-2 text-sm text-[var(--color-text-muted)]">
            <p>E-Mail: {userData.email}</p>
            <p>Mitglied seit: {new Date(userData.createdAt).toLocaleDateString('de-DE')}</p>
          </div>
        </CardContent>
      </Card>

      {/* Timer Settings */}
      <Card className="mb-6">
        <CardHeader className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[var(--color-secondary)]" />
          <h2 className="text-lg font-bold">Pomodoro-Timer</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Arbeitszeit: {pomodoroWork} Minuten
            </label>
            <input
              type="range"
              min="5"
              max="60"
              value={pomodoroWork}
              onChange={(e) => setPomodoroWork(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
              <span>5 Min</span>
              <span>60 Min</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Pausenzeit: {pomodoroBreak} Minuten
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={pomodoroBreak}
              onChange={(e) => setPomodoroBreak(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
              <span>1 Min</span>
              <span>30 Min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="mb-6">
        <CardHeader className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-[var(--color-secondary)]" />
          <h2 className="text-lg font-bold">Benachrichtigungen</h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sound-Effekte</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Ton bei Timer-Ende abspielen
              </p>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`
                relative w-14 h-7 rounded-full transition-colors
                ${soundEnabled ? 'bg-green-500' : 'bg-[var(--color-surface-light)]'}
              `}
            >
              <span
                className={`
                  absolute top-1 w-5 h-5 rounded-full bg-white transition-all
                  ${soundEnabled ? 'left-8' : 'left-1'}
                `}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="mb-6">
        <CardHeader className="flex items-center gap-3">
          <Palette className="w-5 h-5 text-[var(--color-secondary)]" />
          <h2 className="text-lg font-bold">Statistiken</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-[var(--color-surface-light)] rounded-lg text-center">
              <p className="text-2xl font-bold text-[var(--color-secondary)]">
                {userData.progress.totalCoins}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Gesamte Münzen</p>
            </div>
            <div className="p-3 bg-[var(--color-surface-light)] rounded-lg text-center">
              <p className="text-2xl font-bold text-purple-400">
                {userData.progress.xp}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Erfahrungspunkte</p>
            </div>
            <div className="p-3 bg-[var(--color-surface-light)] rounded-lg text-center">
              <p className="text-2xl font-bold text-green-500">
                {userData.progress.quizCorrect}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Richtige Antworten</p>
            </div>
            <div className="p-3 bg-[var(--color-surface-light)] rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-500">
                {userData.progress.totalMinutes}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Lernminuten</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        isLoading={isSaving}
        className="w-full mb-4"
        leftIcon={<Save className="w-5 h-5" />}
      >
        Einstellungen speichern
      </Button>

      {/* Logout Button */}
      <Button
        onClick={logout}
        variant="danger"
        className="w-full"
        leftIcon={<LogOut className="w-5 h-5" />}
      >
        Abmelden
      </Button>
    </div>
  );
};

export default SettingsPage;
