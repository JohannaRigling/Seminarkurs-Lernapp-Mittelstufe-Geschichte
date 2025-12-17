import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
  glow = false,
}) => {
  return (
    <div
      className={`
        bg-[var(--color-surface)] rounded-xl
        border-2 border-[var(--color-secondary)]/30
        ${hover ? 'cursor-pointer hover:border-[var(--color-secondary)] hover:scale-[1.02] transition-all duration-200' : ''}
        ${glow ? 'glow-gold' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`px-4 py-3 border-b border-[var(--color-secondary)]/20 ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`px-4 py-3 border-t border-[var(--color-secondary)]/20 ${className}`}>
    {children}
  </div>
);

export default Card;
