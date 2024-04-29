import styles from "../Auth.module.css";
import Image from "next/image";
import closeIcon from "@/_assets/close.svg";
import { useState } from "react";
import ReactModal from "react-modal";
import { logInUser } from "@/_api/login";

interface LoginProps {
  isOpen: boolean;
  setOpenState: (state: boolean) => void;
}

export default function Login({ isOpen, setOpenState }: LoginProps) {
  const handleClick = () => {
    setOpenState(false);
  };

  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
                alt="Close login dropdown"
                className={styles.closeIcon}
              ></Image>
            </button>
          </div>
          <h1 className={styles.head}>LOGIN</h1>
          <hr className={styles.line}></hr>
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
          </div>
          {error && (
            <p style={{ color: "#eb7673", fontSize: "0.85rem" }}>{error}</p>
          )}
          <div className={styles.loginBottomButtons}>
            <button className={styles.createAccountButton} type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </ReactModal>
  );
}
