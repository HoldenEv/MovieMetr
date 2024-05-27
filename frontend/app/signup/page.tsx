"use client";

import styles from "../login/Auth.module.css";
import Link from "next/link";
import { useState } from "react";
import { signUpUser } from "@/_api/signup";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordValid, setPasswordValid] = useState({
    userLength: true,
    userSpecialChars: true,
    length: true,
    uppercase: true,
    number: true,
    matches: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordValidation = () => {
    const valid = {
      userLength:
        formData.username.length >= 3 && formData.username.length <= 50,
      userSpecialChars: /^[a-zA-Z0-9@./_-]*$/.test(formData.username),
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      number: /\d/.test(formData.password),
      matches: formData.password === formData.confirmPassword,
    };
    setPasswordValid(valid);
    return Object.values(valid).every((val) => val);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handlePasswordValidation()) {
      return;
    }

    let isSuccess = false;

    try {
      // Call the signUpUser function from signup.ts
      await signUpUser(
        formData.email,
        formData.username,
        formData.password,
        formData.confirmPassword
      );
      // Clear form data or perform any additional actions as needed
      setFormData({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      isSuccess = true;
    } catch (error: any) {
      if (error.message) {
        setError(error.message);
      } else {
        setError("An error occured. Please try again later.");
      }
      return;
    }
    if (isSuccess) {
      router.push("/login");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <h1 className={styles.head}>JOIN MOVIEMETER</h1>
          <hr className={styles.line}></hr>
          <div className={styles.formRow}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.passwordReq}>
            <p>Username must meet the following requirements:</p>
            <ul>
              <li
                style={{
                  color: passwordValid.userLength ? "inherit" : "#eb7673",
                }}
              >
                At least 3 characters and at most 50 characters
              </li>
              <li
                style={{
                  color: passwordValid.userSpecialChars ? "inherit" : "#eb7673",
                }}
              >
                Is composed of only letters and numbers, or special characters
                (@./_-)
              </li>
            </ul>
          </div>
          <div className={styles.formRow}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
            <div className={styles.passwordReq}>
              <p>Password must meet the following requirements:</p>
              <ul>
                <li
                  style={{
                    color: passwordValid.matches ? "inherit" : "#eb7673",
                  }}
                >
                  Passwords must match
                </li>
                <li
                  style={{
                    color: passwordValid.length ? "inherit" : "#eb7673",
                  }}
                >
                  At least 8 characters long
                </li>
                <li
                  style={{
                    color: passwordValid.uppercase ? "inherit" : "#eb7673",
                  }}
                >
                  Contain at least one uppercase letter
                </li>
                <li
                  style={{
                    color: passwordValid.number ? "inherit" : "#eb7673",
                  }}
                >
                  Contain at least one number
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.formRow}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>
          {error && (
            <p
              id="errorMessage"
              style={{ color: "#eb7673", fontSize: "0.85rem" }}
            >
              {error}
            </p>
          )}
          <div className={styles.loginBottomButtons}>
            <button className={styles.createAccountButton} type="submit">
              SIGN UP
            </button>
          </div>
          <p
            style={{
              fontWeight: "150",
              textAlign: "center",
              margin: "8px",
            }}
          >
            Already have an account?&nbsp;
            <Link className={styles.link} href="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
