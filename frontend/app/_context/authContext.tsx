"use client"
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signUpUser } from "../_api/signup";
import { logInUser } from "../_api/login";
import { getProfileFromToken } from "../_api/profile";
import { ReactNode } from 'react';
const TOKEN_KEY = "JWT_AUTH_TOKEN";
const INVALID_TOKEN = "INVALID_TOKEN";
const EXPIRATION_KEY = 'expiration';

interface ExpiringData<T> {
  value: T;
  expiration: number;
}

// Store data with expiration time
function setWithExpiration<T>(key: string, value: T, expirationMinutes: number): void {
  const expiration = new Date().getTime() + expirationMinutes * 60000;
  const expiringData: ExpiringData<T> = { value, expiration };
  localStorage.setItem(key, JSON.stringify(expiringData));
}


// Retrieve data with expiration check
function getWithExpiration(key: string): any | null {
  const expiration = localStorage.getItem(EXPIRATION_KEY);
  if (!expiration) return null;
  if (Date.now() > parseInt(expiration)) {
    localStorage.removeItem(key);
    localStorage.removeItem(EXPIRATION_KEY);
    return null; // Data has expired
  }
  return JSON.parse(localStorage.getItem(key) || '');
}

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
  //const navigate = useNavigate();

  const [token, setToken] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleLogin = async (user : string, pass : string) => {

    console.log(user);
    console.log(pass);
    setUsername(user);
    setPassword(pass);
    const token = await logInUser(user, pass);    
    if (token) {
      setToken(token);
      //setTokenCookie(token);
      // this will locally store a token for 30 minutes
      setWithExpiration("token", token, 30);
      console.log(token);
      //console.log(getProfileFromToken(token));
      //router.refresh();
      //navigate("/userpage");
      router.push("/userpage");
      router.push("/");
    } else {
      // if token is not valid we want to put the user in the homepage and not login
      router.push("/")
      alert("invalid login");
    }
  };

  const handleLogout = () => {
    console.log("handleLogout");
    setToken(INVALID_TOKEN);
    router.push("/");
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