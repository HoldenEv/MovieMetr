import styles from "./Login.module.css";
import Image from "next/image";
import closeIcon from "@/_assets/close.svg";

interface LoginProps {
  setOpenState: (state: boolean) => void;
}

export default function Login({ setOpenState }: LoginProps) {
  const handleClick = () => {
    setOpenState(false);
  };

  return (
    <div className={styles.formContainer}>
      <form action="#" method="POST" className={styles.loginForm}>
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
