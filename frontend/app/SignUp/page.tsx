import styles from "./SignUp.module.css";

export default function SignUp() {
    return (
        <div className={styles.login}>
          <div>
          <div className={styles.username}>
            <p className={styles.usernameText}>Username</p>
            <input
                type="text"
                id="username"
                name="username"
                // placeholder="Username"
                required
              />
          </div>
          <div className={styles.email}>
            <p className={styles.emailText}>Email</p>
            <input
            type = "text"
            id ="email"
            name = "email"
            required
            />
          </div>
          <div className={styles.password}>
          <p className={styles.passwordText}>Password</p>
            <input
                type="password"
                id="password"
                name="password"
                // placeholder="Password"
                required
              />
          </div>
            <p className={styles.forgotPassword}>
            <a href="https://www.fortnite.com/?lang=en-US">Forgot Password?</a>
            </p>
          {/* <button className="login-button" type="submit">
            Forgot Password?
          </button> */}
          <div className={styles.loginBottomButtons}>
            <div className={styles.rememberMeButton}>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <p className={styles.createAccountButton}>
              <a href="https://www.fortnite.com/?lang=en-US">Create Account</a>
              </p>
            {/* <button className="create-account-button" type="submit">
              Create Account
            </button> */}
          </div>
          </div>
        </div>
      )
}