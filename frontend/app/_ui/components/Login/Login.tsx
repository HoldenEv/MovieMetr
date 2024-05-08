import styles from "./Login.module.css";
import Image from "next/image";
import closeIcon from "@/_assets/close.svg";
import { useState } from "react";
import { format } from "path";
import { logInUser } from "@/_services/login";

interface LoginProps {
  setOpenState: (state: boolean) => void;
}

export default function Login({ setOpenState }: LoginProps) {
  const handleClick = () => {
    setOpenState(false);
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Call the signUpUser function from signup.ts
      const response = await logInUser(formData.username, formData.password);
      const token = response;
      console.log("Sign up successful:", response);

      // Clear form data or perform any additional actions as needed
      setFormData({
        username: "",
        password: "",
      });
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      // Handle error, show error message, etc.
    }
  };  

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formItems}>
          <div className={styles.closeButtonContainer}>
            <button onClick={handleClick} className={styles.closeButton}>
              <Image
                priority
                src={closeIcon}
                width={30}
                alt="Close login dropdown"
                className={styles.closeIcon}
              ></Image>
            </button>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="username" className={styles.inputText}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              // placeholder="Username"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.inputText}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              // placeholder="Password"
              required
            />
            <p className={styles.forgotPassword}>
              <a href="https://www.fortnite.com/?lang=en-US">
                Forgot Password?
              </a>
            </p>
          </div>
          <div className={styles.loginBottomButtons}>
            <div className={styles.rememberMeButton}>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button className={styles.loginButton} type="submit">
              Login In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
