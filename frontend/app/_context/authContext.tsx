import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  // How should I be defining a user here should I call the schema
  username: string;
}

interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/* 
  The reason we are using authContext is so that we can define our login state 
*/
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props; // Destructuring props to access children
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
