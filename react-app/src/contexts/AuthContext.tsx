import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { User, UserProgress, UserPreferences } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string, classLevel: number) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<User>) => Promise<void>;
  updateProgress: (progress: Partial<UserProgress>) => Promise<void>;
  addCoins: (amount: number) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const defaultProgress: UserProgress = {
  coins: 100,
  totalCoins: 100,
  xp: 0,
  rank: 'Knappe',
  level: 1,
  topicsCompleted: 0,
  exercisesDone: 0,
  quizCorrect: 0,
  quizTotal: 0,
  totalMinutes: 0,
  todayMinutes: 0,
  lastActive: new Date().toISOString(),
  operatorsViewed: [],
  strategiesViewed: [],
  timelineViewed: false,
  castleLevel: 0,
  castleParts: {
    wallLeft: false,
    wallRight: false,
    towerLeft: false,
    towerRight: false,
    bergfried: false,
    flag: false,
  },
  pomodoroSessions: 0,
  streak: 0,
  lastStreakDate: '',
};

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  accentColor: '#D4AF37',
  aiMode: 'tutor',
  pomodoroWork: 25,
  pomodoroBreak: 5,
  soundEnabled: true,
  notificationsEnabled: true,
};

const ranks = [
  { name: 'Knappe', minXP: 0 },
  { name: 'Schildträger', minXP: 100 },
  { name: 'Ritter', minXP: 300 },
  { name: 'Burgherr', minXP: 600 },
  { name: 'Baron', minXP: 1000 },
  { name: 'Graf', minXP: 1500 },
  { name: 'Herzog', minXP: 2500 },
  { name: 'König', minXP: 4000 },
  { name: 'Kaiser', minXP: 6000 },
];

const calculateRank = (xp: number): { rank: string; level: number } => {
  let currentRank = ranks[0];
  let level = 1;

  for (let i = ranks.length - 1; i >= 0; i--) {
    if (xp >= ranks[i].minXP) {
      currentRank = ranks[i];
      level = i + 1;
      break;
    }
  }

  return { rank: currentRank.name, level };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as User);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string, username: string, classLevel: number) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    const newUser: User = {
      id: user.uid,
      email,
      username,
      classLevel,
      createdAt: new Date().toISOString(),
      progress: defaultProgress,
      preferences: defaultPreferences,
      achievements: [],
      activities: [{
        id: crypto.randomUUID(),
        type: 'achievement',
        description: 'Willkommen bei HistoLearn!',
        timestamp: new Date().toISOString(),
        coins: 100,
      }],
    };

    await setDoc(doc(db, 'users', user.uid), newUser);
    setUserData(newUser);
  };

  const login = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data() as User;

      // Check streak
      const today = new Date().toDateString();
      const lastActive = new Date(data.progress.lastActive).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      let newStreak = data.progress.streak;
      if (lastActive === yesterday) {
        newStreak += 1;
      } else if (lastActive !== today) {
        newStreak = 1;
      }

      const updatedProgress = {
        ...data.progress,
        lastActive: new Date().toISOString(),
        streak: newStreak,
        lastStreakDate: today,
        todayMinutes: lastActive !== today ? 0 : data.progress.todayMinutes,
      };

      await updateDoc(doc(db, 'users', user.uid), {
        progress: updatedProgress,
      });

      setUserData({ ...data, progress: updatedProgress });
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  const updateUserData = async (data: Partial<User>) => {
    if (!currentUser || !userData) return;

    const updatedData = { ...userData, ...data };
    await updateDoc(doc(db, 'users', currentUser.uid), data);
    setUserData(updatedData);
  };

  const updateProgress = async (progress: Partial<UserProgress>) => {
    if (!currentUser || !userData) return;

    const updatedProgress = { ...userData.progress, ...progress };
    await updateDoc(doc(db, 'users', currentUser.uid), {
      progress: updatedProgress,
    });
    setUserData({ ...userData, progress: updatedProgress });
  };

  const addCoins = async (amount: number) => {
    if (!currentUser || !userData) return;

    const newCoins = userData.progress.coins + amount;
    const newTotalCoins = userData.progress.totalCoins + (amount > 0 ? amount : 0);

    await updateProgress({
      coins: newCoins,
      totalCoins: newTotalCoins,
    });
  };

  const addXP = async (amount: number) => {
    if (!currentUser || !userData) return;

    const newXP = userData.progress.xp + amount;
    const { rank, level } = calculateRank(newXP);

    await updateProgress({
      xp: newXP,
      rank,
      level,
    });
  };

  const value = {
    currentUser,
    userData,
    loading,
    login,
    register,
    logout,
    updateUserData,
    updateProgress,
    addCoins,
    addXP,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
