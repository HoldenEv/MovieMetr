"use client"
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signUpUser } from "../_services/signup";
import { logInUser } from "../_services/login";
import { ReactNode } from 'react';
import { setTokenCookie } from "../actions/cookieActions";
const TOKEN_KEY = "JWT_AUTH_TOKEN";
const INVALID_TOKEN = "INVALID_TOKEN";

const AuthContext = createContext({
  token: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  handleLogin: (user : string, pass : string) => {},
  handleLogout: (user : string, pass : string) => {},
  handleRegister: (user : string, pass : string, email : string) => {}
});

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleLogin = async (user : string, pass : string) => {
    console.log("made it into login")
    setUsername(user);
    setPassword(pass);

    console.log("handleLogin enter  user: " + username);
    const token = await logInUser(username, password);
    
    console.log("handleLogin token: " + token);
    if (token) {
      setToken(token);
      // load the profile page of the user that has signed in
      setTokenCookie(token);
      //localStorage.setItem(TOKEN_KEY, token);
      router.push("/userpage");
    } else {
      // if token is not valid we want to put the user in the homepage and not login
      router.push("/")
      alert("invalid login");
    }
  };

  const handleLogout = () => {
    console.log("handleLogout");
    setToken(INVALID_TOKEN);
    router.push("/home");
  };

  const handleRegister = async (user : string, pass : string, email : string) => {
    console.log("handleRegister enter  user: " + username);
    const token = await signUpUser(email, username, password, password);
    console.log("handleRegister token: " + token);
    if (token) {
      setToken(token);
      router.push("/login");
    } else {
      alert("invalid login");
    }
  };

  return (
    <AuthContext.Provider value={{ token, username, password, confirmPassword, email, handleLogin, handleLogout, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);