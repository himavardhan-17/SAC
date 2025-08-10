import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { auth, db } from '@/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface Staff {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface StaffAuthContextType {
  staff: Staff | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const StaffAuthContext = createContext<StaffAuthContextType | undefined>(undefined);

// ✅ Custom Hook
export const useStaffAuth = () => {
  const context = useContext(StaffAuthContext);
  if (!context) {
    throw new Error('useStaffAuth must be used within a StaffAuthProvider');
  }
  return context;
};

// ✅ Provider Component
export const StaffAuthProvider = ({ children }: { children: ReactNode }) => {
  const [staff, setStaff] = useState<Staff | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const staffDoc = await getDoc(doc(db, 'staff', user.uid));
        if (staffDoc.exists()) {
          const data = staffDoc.data();
          setStaff({
            id: user.uid,
            email: user.email || '',
            full_name: data.full_name,
            role: data.role,
          });
        } else {
          setStaff(null);
        }
      } else {
        setStaff(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const staffDoc = await getDoc(doc(db, 'staff', user.uid));
      if (!staffDoc.exists()) {
        return { success: false, error: 'Staff not found in database' };
      }

      const data = staffDoc.data();
      const staffMember: Staff = {
        id: user.uid,
        email: user.email || '',
        full_name: data.full_name,
        role: data.role,
      };

      setStaff(staffMember);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setStaff(null);
  };

  return (
    <StaffAuthContext.Provider value={{ staff, login, logout, isLoading }}>
      {children}
    </StaffAuthContext.Provider>
  );
};
