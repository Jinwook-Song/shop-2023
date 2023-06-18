import { AdminUser, login, logout, onUserStateChange } from 'api/firebase';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: AdminUser | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
