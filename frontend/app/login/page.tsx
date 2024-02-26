import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div>
        <div className="username">
          <p className="username-text">Username</p>
          <input
            type="text"
            id="username"
            name="username"
            // placeholder="Username"
            required
          />
        </div>
        <div className="password">
          <p className="password-text">Password</p>
          <input
            type="password"
            id="password"
            name="password"
            // placeholder="Password"
            required
          />
        </div>
        <p className="forgot-password">
          <a href="https://www.fortnite.com/?lang=en-US">Forgot Password?</a>
        </p>
        {/* <button className="login-button" type="submit">
        Forgot Password?
      </button> */}
        <div className="login-bottom-buttons">
          <div className="remember-me-button">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <p className="create-account-button">
            <a href="https://www.fortnite.com/?lang=en-US">Create Account</a>
          </p>
          {/* <button className="create-account-button" type="submit">
          Create Account
        </button> */}
          <button className="login-button" type="submit">
            Login In
          </button>
        </div>
      </div>
    </div>
  );
}
