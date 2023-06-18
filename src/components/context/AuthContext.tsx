import { AdminUser, login, logout, onUserStateChange } from 'api/firebase';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: AdminUser | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
type Props = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
