import { useState } from "react";
import { useAction } from "convex/react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Phone } from "lucide-react";
import "../App.css";

export default function Signup() {
  const signupUser = useAction("authActions:signupUser");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      await signupUser({ email, password });
      setMessage("Signup Successful.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage("Signup failed. Try again.");
    }
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
            <h1>Hello ! Welcome Aboard</h1>
            <p>We are Glad to see you😊</p>
          </div>

          <div className="social-pill-auth">
            <button className="social-pill with-text" type="button">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              Sign up with Google
            </button>
            <button className="social-pill with-text" type="button">
              <Phone size={20} strokeWidth={2.5} />
              Sign up with Phone
            </button>
          </div>

          <div className="split-divider">or</div>

          <form onSubmit={handleSubmit} className="split-form">
            <div className="form-row-split">
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree terms of service and privacy policy</label>
            </div>

            <button type="submit" className="submit-pill">Sign up</button>
            {message && <p className="auth-message-split">{message}</p>}
          </form>
          
          <p className="split-switch-auth">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
