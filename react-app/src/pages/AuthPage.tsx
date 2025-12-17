import React, { useState } from 'react';
import { Castle } from 'lucide-react';
import { LoginForm, RegisterForm } from '../components/auth';
import { Card, CardContent } from '../components/common';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-secondary)] mb-4">
            <Castle className="w-10 h-10 text-[var(--color-secondary)]" />
          </div>
          <h1 className="text-4xl font-bold text-[var(--color-secondary)]">
            HistoLearn
          </h1>
          <p className="text-[var(--color-text-muted)] mt-2">
            Deine Reise durch die Geschichte beginnt hier
          </p>
        </div>

        {/* Auth Card */}
        <Card glow>
          <CardContent className="p-6">
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-[var(--color-text-muted)] text-sm mt-6">
          Lerne Geschichte spielerisch mit KI-Unterstützung
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
