import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loadingAfterLogin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("user")
  );
  const [loadingAfterLogin, setLoadingAfterLogin] = useState(false);

  const login = async (username: string, password: string) => {
    if (username === "admin" && password === "1234") {
      setLoadingAfterLogin(true);

      setTimeout(() => {
        localStorage.setItem("user", username);
        setUser(username);
        setLoadingAfterLogin(false);
      }, 5000);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loadingAfterLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
return ctx;
}
