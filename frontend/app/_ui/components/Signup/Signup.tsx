import styles from "./signup.module.css";
import Image from "next/image";
import closeIcon from "@/_assets/close.svg";
import ReactModal from "react-modal";
import { useState } from "react";
import { signUpUser } from "@/_api/signup";

interface SignUpProps {
  isOpen: boolean;
  setOpenState: (state: boolean) => void;
}

export default function Signup({ isOpen, setOpenState }: SignUpProps) {
  const handleClick = () => {
    setOpenState(false);
  };
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return -1;
    }
    if (password.length < 8) {
      alert("Password should be longer than 8 characters");
      return -1;
    }
    if (!/\d/.test(password)) {
      alert("Password must have at least one number");
      return -1;
    }
    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one capital letter");
      return -1;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handlePassword(formData.password, formData.confirmPassword) == -1) {
      return;
    }

    try {
      // Call the signUpUser function from signup.ts
      const response = await signUpUser(
        formData.email,
        formData.username,
        formData.password,
        formData.confirmPassword
      );
      console.log("Sign up successful:", response);
      // Clear form data or perform any additional actions as needed
      setFormData({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      /* Close the modal */
      setOpenState(false);
      /* TODO: Set session logic */
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      // Handle error, show error message, etc.
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={styles.modalOverlay}
      className={styles.modalOverlay}
    >
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
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
          <h1 className={styles.head}>Join MovieMeter</h1>
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
                <li>At least 8 characters long</li>
                <li>Contain at least one uppercase letter</li>
                <li>Contain at least one number</li>
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
          <div className={styles.loginBottomButtons}>
            <button className={styles.createAccountButton} type="submit">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </ReactModal>
  );
}
