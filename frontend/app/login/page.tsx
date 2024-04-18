"use client"
import "./login.css";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { BrowserRouter as Router } from 'react-router-dom';
import React from "react";

export default function Login() {
  const [user, setUsername] = useState("");
  const [pass, setPassword] = useState("");

  const { token, username, password, confirmPassword, email, handleLogin, handleLogout, handleRegister } = useAuth();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page from reloading
    console.log("made it into handle submit");
    console.log("username: " +  username, "password: " + password);
    return handleLogin(user, pass);
    //if (value !== undefined && value.token !== undefined) {
  };

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
                value={pass} // Set value to password state
                onChange={handlePasswordChange} // Handle input change
                required
              />
            </div>
            <p className="forgot-password">
              <a href="https://www.fortnite.com/?lang=en-US">Forgot Password?</a>
            </p>
            <div className="login-bottom-buttons">
              <div className="remember-me-button">
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <p className="create-account-button">
                <a href="https://www.fortnite.com/?lang=en-US">Create Account</a>
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
}