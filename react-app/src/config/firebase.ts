import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHj_VL2czvZDW3AOVV_BVyS5OqrolZP04",
  authDomain: "lernapp-geschichte.firebaseapp.com",
  projectId: "lernapp-geschichte",
  storageBucket: "lernapp-geschichte.firebasestorage.app",
  messagingSenderId: "134464713414",
  appId: "1:134464713414:web:b403ea917b72af9a655dc7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
