import styles from "./signup.module.css";

export default function SignUp() {
  return (
    <form action="#" method="POST" className={styles.formContainer}>
      <div>
        <h1 className={styles.head}>Join MovieMetr</h1>
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
  );
}
