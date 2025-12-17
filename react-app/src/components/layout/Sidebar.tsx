import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  BookOpen,
  Clock,
  History,
  Brain,
  Lightbulb,
  Castle,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { logout, userData } = useAuth();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'KI-Chat', path: '/chat' },
    { icon: BookOpen, label: 'Quiz', path: '/quiz' },
    { icon: Clock, label: 'Pomodoro', path: '/timer' },
    { icon: History, label: 'Timeline', path: '/timeline' },
    { icon: Brain, label: 'Operatoren', path: '/operators' },
    { icon: Lightbulb, label: 'Lernstrategien', path: '/strategies' },
    { icon: Castle, label: 'Meine Burg', path: '/castle' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-secondary)]/30"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full
          w-64 bg-[var(--color-surface)]
          border-r-2 border-[var(--color-secondary)]/30
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-[var(--color-secondary)]/30">
          <h1 className="text-2xl font-bold text-[var(--color-secondary)] flex items-center gap-2">
            <Castle className="w-8 h-8" />
            HistoLearn
          </h1>
          {userData && (
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Klasse {userData.classLevel}
            </p>
          )}
        </div>

        {/* User Info */}
        {userData && (
          <div className="p-4 border-b border-[var(--color-secondary)]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-background)] font-bold">
                {userData.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{userData.username}</p>
                <p className="text-xs text-[var(--color-secondary)]">
                  {userData.progress.rank}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1">
                <span className="text-yellow-500">🐄</span>
                {userData.progress.coins}
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                ✨ {userData.progress.xp} XP
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-2 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && onToggle()}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                transition-all duration-200
                ${isActive
                  ? 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] border-l-4 border-[var(--color-secondary)]'
                  : 'text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text)]'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-2 border-t border-[var(--color-secondary)]/30">
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg mb-1
              transition-all duration-200
              ${isActive
                ? 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]'
                : 'text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text)]'
              }
            `}
          >
            <Settings className="w-5 h-5" />
            Einstellungen
          </NavLink>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Abmelden
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
