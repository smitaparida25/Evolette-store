import { useState } from "react";
import { useAction } from "convex/react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Phone } from "lucide-react";
import "../App.css";

export default function Login() {
  const loginUser = useAction("authActions:loginUser");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        credentials: "include",
         body: JSON.stringify({
            email,
            password,
          }),
        });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();

    console.log(data);
    setMessage("Login Successful");
    navigate("/");
  };

  return (
    <div className="split-auth-page">
      <div className="split-auth-container">
      <div className="auth-image-side">
        <Link to="/" className="back-btn-pill">
          <ChevronLeft size={28} />
        </Link>
      </div>
      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          <div className="auth-header-split">
            <h1>Welcome Back !</h1>
            <p>We are Glad to see you again😊</p>
          </div>

          <div className="social-pill-auth">
            <button className="social-pill with-text" type="button">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              Log in with Google
            </button>
            <button className="social-pill with-text" type="button">
              <Phone size={20} strokeWidth={2.5} />
              Log in with Phone
            </button>
          </div>

          <div className="split-divider">or</div>

          <form onSubmit={handleSubmit} className="split-form">
            <div className="form-row-split">
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row-split">
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-pill">Log in</button>
            {message && <p className="auth-message-split">{message}</p>}
          </form>

          <p className="split-switch-auth">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
