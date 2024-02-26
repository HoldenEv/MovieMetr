import styles from "./signup.module.css";

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
          <div className = {styles.repassword}>
            <p className= {styles.emailText}>Re-Type Password</p>
            <input
              type="password"
              id = "password"
              name= "new-password"
            
            />

          </div>
            <p className={styles.forgotPassword}>
            <a href="https://www.fortnite.com/?lang=en-US">Forgot Password?</a>
            </p>
          {/* <button className="login-button" type="submit">
            Forgot Password?
          </button> */}
          <div className={styles.loginBottomButtons}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor={styles.rememberMe}>Remember Me</label>
           </div>
             <div> <p className={styles.createAccountButton}>
                      <a href="https://www.fortnite.com/?lang=en-US">Create Account</a>
                    </p>
              </div>
            {/* <button className="create-account-button" type="submit">
              Create Account
            </button> */}
          </div>
          </div>
        </div>
      )
}