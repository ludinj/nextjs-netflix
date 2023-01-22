import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';

import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase';

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  error: unknown | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [error, setError] = useState<unknown | null>(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          // Logged in...
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          setLoading(true);
          void router.push('/login');
        }

        setInitialLoading(false);
      }),
    []
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const useCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(useCredential.user);
      void router.push('/');
      setLoading(false);
    } catch (error) {
      setError(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const useCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(useCredential.user);
      await router.push('/');
      setLoading(false);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, logOut, loading, error }),
    [user, loading]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
