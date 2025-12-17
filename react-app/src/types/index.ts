// User Types
export interface UserProgress {
  coins: number;
  totalCoins: number;
  xp: number;
  rank: string;
  level: number;
  topicsCompleted: number;
  exercisesDone: number;
  quizCorrect: number;
  quizTotal: number;
  totalMinutes: number;
  todayMinutes: number;
  lastActive: string;
  operatorsViewed: string[];
  strategiesViewed: string[];
  timelineViewed: boolean;
  castleLevel: number;
  castleParts: CastleParts;
  pomodoroSessions: number;
  streak: number;
  lastStreakDate: string;
}

export interface CastleParts {
  wallLeft: boolean;
  wallRight: boolean;
  towerLeft: boolean;
  towerRight: boolean;
  bergfried: boolean;
  flag: boolean;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  accentColor: string;
  aiMode: 'tutor' | 'critic' | 'discussion';
  pomodoroWork: number;
  pomodoroBreak: number;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Activity {
  id: string;
  type: 'quiz' | 'chat' | 'pomodoro' | 'achievement' | 'purchase';
  description: string;
  timestamp: string;
  coins?: number;
  xp?: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  classLevel: number;
  createdAt: string;
  progress: UserProgress;
  preferences: UserPreferences;
  achievements: Achievement[];
  activities: Activity[];
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  classLevel: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  topicId: string;
  score: number;
  total: number;
  timestamp: string;
  coinsEarned: number;
  xpEarned: number;
}

// Operator Types
export interface Operator {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  levelName: string;
  definition: string;
  explanation: string;
  steps: string[];
  examples: string[];
  tips: string[];
  commonMistakes: string[];
  keywords: string[];
}

// Learning Strategy Types
export interface LearningStrategy {
  id: string;
  name: string;
  description: string;
  steps: string[];
  benefits: string[];
  historyTips: string[];
  icon: string;
}

// Timeline Types
export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  era: string;
  details?: string;
  image?: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// Castle Upgrade Types
export interface CastleUpgrade {
  id: keyof CastleParts;
  name: string;
  cost: number;
  description: string;
  image: string;
}
