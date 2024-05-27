"use client";
import "./login.css";
import { useState, useEffect } from "react";
import { useAuth } from "../_context/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

const Login = () => {
  const [user, setUsername] = useState("");
  const [pass, setPassword] = useState("");

  const {
    token,
    username,
    password,
    confirmPassword,
    email,
    handleLogin,
    handleLogout,
    handleRegister,
  } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page from reloading
    // You can remove the return statement if handleLogin doesn't return anything
    setUsername(user);
    setPassword(pass);
    handleLogin(user, pass);
  };

  useEffect(() => {
    // This effect will run whenever `user` or `pass` changes
  }, [user, pass]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="login">
          <div>
            <div className="username">
              <p className="username-text">Username</p>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                value={user} // Set value to username state
                onChange={handleUsernameChange} // Handle input change
                required
              />
            </div>
            <div className="password">
              <p className="password-text">Password</p>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={pass} // Set value to password state
                onChange={handlePasswordChange} // Handle input change
                required
              />
            </div>
            <p className="forgot-password">
              <a href="https://www.fortnite.com/?lang=en-US">
                Forgot Password?
              </a>
            </p>
            <div className="login-bottom-buttons">
              <div className="remember-me-button">
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <p className="create-account-button">
                <a href="https://www.fortnite.com/?lang=en-US">
                  Create Account
                </a>
              </p>
              <button className="login-button" type="submit">
                Login In
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
