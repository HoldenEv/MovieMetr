import styles from "../Auth.module.css";
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

  const [error, setError] = useState<string>("");

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
      /* Close the modal */
      setOpenState(false);
    } catch (error: any) {
      if (error.message) {
        setError(error.message);
        return;
      } else {
        setError("An error occured. Please try again later.");
      }
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
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
                alt="Close create account modal"
                className={styles.closeIcon}
              ></Image>
            </button>
          </div>
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
            <p style={{ color: "#eb7673", fontSize: "0.85rem" }}>{error}</p>
          )}
          <div className={styles.loginBottomButtons}>
            <button className={styles.createAccountButton} type="submit">
              SIGN UP
            </button>
          </div>
        </div>
      </form>
    </ReactModal>
  );
}
