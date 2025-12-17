import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button, Input } from '../common';
import { useAuth } from '../../contexts/AuthContext';
import { useToastContext } from '../../contexts/ToastContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const toast = useToastContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Willkommen zurück!');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential') {
        toast.error('E-Mail oder Passwort falsch');
      } else if (error.code === 'auth/user-not-found') {
        toast.error('Benutzer nicht gefunden');
      } else {
        toast.error('Anmeldung fehlgeschlagen');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--color-secondary)]">
          Willkommen zurück!
        </h2>
        <p className="text-[var(--color-text-muted)] mt-2">
          Melde dich an, um weiterzulernen
        </p>
      </div>

      <Input
        label="E-Mail"
        type="email"
        placeholder="deine@email.de"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail className="w-5 h-5" />}
      />

      <Input
        label="Passwort"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
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

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
        leftIcon={<LogIn className="w-5 h-5" />}
      >
        Anmelden
      </Button>

      <p className="text-center text-[var(--color-text-muted)]">
        Noch kein Konto?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-[var(--color-secondary)] hover:underline font-medium"
        >
          Registrieren
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
