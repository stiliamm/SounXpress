import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import handleLoginToken from "../services/loginToken";

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const setAuthToken = (authToken) => {
    cookies.set("authToken", authToken, {
      path: "/",
      sameSite: "Lax",
    });
    navigate("/", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    handleLogin(username, password);
  };

  const handleLogin = async (username, password) => {
    if (!username || !password) {
      return;
    }

    try {
      console.log("Submitting login form");
      const token = await handleLoginToken(username, password);

      if (!token) {
        console.error("No token!");
        return;
      }

      setAuthToken(token);
      console.log(cookies.get("authToken"));
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="person-outline"></ion-icon>
            </span>
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="key-outline"></ion-icon>
            </span>
            <input type="password" name="password" required />
            <label>Password</label>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/settings">Forgot password?</a>
          </div>
          <button type="submit" className="btn">
            Sign in
          </button>
          <div className="login-register">
            <p>
              Don't have an account?
              <a href="/register" className="register-link">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
