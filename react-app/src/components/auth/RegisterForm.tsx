import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, UserPlus } from 'lucide-react';
import { Button, Input } from '../common';
import { useAuth } from '../../contexts/AuthContext';
import { useToastContext } from '../../contexts/ToastContext';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [classLevel, setClassLevel] = useState(8);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const toast = useToastContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    if (username.length < 3) {
      toast.error('Benutzername muss mindestens 3 Zeichen lang sein');
      return;
    }

    if (password.length < 6) {
      toast.error('Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwörter stimmen nicht überein');
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, username, classLevel);
      toast.success('Willkommen bei HistoLearn!');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('E-Mail wird bereits verwendet');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Passwort ist zu schwach');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Ungültige E-Mail-Adresse');
      } else {
        toast.error('Registrierung fehlgeschlagen');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-secondary)]">
          Konto erstellen
        </h2>
        <p className="text-[var(--color-text-muted)] mt-2">
          Beginne deine Reise durch die Geschichte
        </p>
      </div>

      <Input
        label="Benutzername"
        type="text"
        placeholder="Dein Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        leftIcon={<User className="w-5 h-5" />}
      />

      <Input
        label="E-Mail"
        type="email"
        placeholder="deine@email.de"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail className="w-5 h-5" />}
      />

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1.5">
          Klassenstufe
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(Number(e.target.value))}
            className="
              w-full pl-10 pr-4 py-2.5
              bg-[var(--color-surface-light)]
              border-2 border-[var(--color-secondary)]/30
              rounded-lg
              text-[var(--color-text)]
              focus:outline-none focus:border-[var(--color-secondary)]
              transition-colors duration-200
              cursor-pointer
            "
          >
            <option value={7}>Klasse 7</option>
            <option value={8}>Klasse 8</option>
            <option value={9}>Klasse 9</option>
            <option value={10}>Klasse 10</option>
          </select>
        </div>
      </div>

      <Input
        label="Passwort"
        type={showPassword ? 'text' : 'password'}
        placeholder="Mindestens 6 Zeichen"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock className="w-5 h-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:text-[var(--color-secondary)] transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        }
      />

      <Input
        label="Passwort bestätigen"
        type={showPassword ? 'text' : 'password'}
        placeholder="Passwort wiederholen"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        leftIcon={<Lock className="w-5 h-5" />}
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
        leftIcon={<UserPlus className="w-5 h-5" />}
      >
        Registrieren
      </Button>

      <p className="text-center text-[var(--color-text-muted)]">
        Bereits ein Konto?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[var(--color-secondary)] hover:underline font-medium"
        >
          Anmelden
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
