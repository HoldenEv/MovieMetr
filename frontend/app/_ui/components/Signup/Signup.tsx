import styles from "./signup.module.css";
import Image from "next/image";
import closeIcon from "@/_assets/close.svg";
import ReactModal from "react-modal";

interface SignUpProps {
  isOpen: boolean;
  setOpenState: (state: boolean) => void;
}

export default function Signup({ isOpen, setOpenState }: SignUpProps) {
  const handleClick = () => {
    setOpenState(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={styles.modalOverlay}
      className={styles.modalOverlay}
    >
      <form action="#" method="POST" className={styles.formContainer}>
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
              type="text"
              id="email"
              name="email"
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
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
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
