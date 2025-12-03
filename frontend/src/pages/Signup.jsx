import { useState } from "react";
import { useAction } from "convex/react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Signup() {
  const signupUser = useAction("authActions:signupUser");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser({ email, password });
      setMessage("Signup Successful.");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-title-row">
          <h2>Signup</h2>

          <label className="auth-switch">
            <input
              type="checkbox"
              checked={true}
              onChange={() => navigate("/login")}
            />
            <span className="auth-slider round"></span>
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Submit</button>
        </form>

        {message && <p>{message}</p>}
      </div>

      <img className="auth-image" src="/images/image.png" alt="visual" />
    </div>
  );
}
