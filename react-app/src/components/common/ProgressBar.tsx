import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'gold' | 'green' | 'blue' | 'red';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showValue = true,
  size = 'md',
  color = 'gold',
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorClasses = {
    gold: 'bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]',
    green: 'bg-gradient-to-r from-green-500 to-emerald-400',
    blue: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    red: 'bg-gradient-to-r from-red-500 to-orange-400',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-[var(--color-secondary)]">
              {value} / {max}
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-[var(--color-surface-light)] rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
