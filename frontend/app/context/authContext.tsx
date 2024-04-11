import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../_api/signup";
import { logInUser } from "../_api/login";
import { ReactNode } from 'react';

// Define the type for the context value
interface AuthContextType {
  token: string | null;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  onLogin: () => Promise<void>;
  onLogout: () => void;
  onRegister: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async () => {
    console.log("handleLogin enter  user: " + value.username);
    const token = await logInUser(value.username, value.password);

    console.log("handleLogin token: " + token);
    if (token) {
      setToken(token);
      // load the profile page of the user that has signed in
      navigate("/landing");
    } else {
      // if token is not valid we want to put the user in the homepage and not login
      navigate("/")
      alert("invalid login");
    }
  };

  const handleLogout = () => {
    console.log("handleLogout");
    setToken(null);
    navigate("/home");
  };

  const handleRegister = async () => {
    console.log("handleRegister enter  user: " + value.username);
    const token = await signUpUser(value.email, value.username, value.password, value.password);
    console.log("handleRegister token: " + token);
    if (token) {
      setToken(token);
      navigate("/landing");
    } else {
      alert("invalid login");
    }
  };

  const value: AuthContextType = {
    token,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth must be used within an AuthProvider");
  // }
  return context;
};
