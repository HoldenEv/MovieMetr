import "./login.css"

export default function Login() {
  return (
    <div className="login" id="login">
      <div className="username">
        <p className="username-text">Username</p>
        <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
      </div>
      <div className="password">
      <p className="password-text">Password</p>
        <input
            type="text"
            id="password"
            name="password"
            placeholder="password"
            required
          />
      </div>
      <button className="login-button" type="submit">
        Forgot Password?
      </button>
      
      <div className="login-bottom-buttons">
        <div className="remember-me-button"> 
          <input type="radio" id="html" name="fav_language" value="HTML"/>
          <p>Remember Me</p>
        </div>
        <button className="create-account-button" type="submit">
          Create Account
        </button>
        <button className="login-button" type="submit">
          Login In 
        </button>
      </div>
    </div>
  )
}