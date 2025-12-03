import { useState } from "react";
import { useAction } from "convex/react";
import '../App.css';
import { useNavigate } from "react-router-dom";


export default function Login() {
  const loginUser = useAction("authActions:loginUser");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      setMessage("Login Successful");
      setEmail("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify({ _id: user._id, email: user.email }));
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Login failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-title-row">
          <h2>Login</h2>

          <div className="auth-toggle-container">
            <label className="auth-switch" htmlFor="auth-checkbox">
              <input
                type="checkbox"
                id="auth-checkbox"
                onChange={() => navigate("/signup")}
              />
              <span className="auth-slider round"></span>
            </label>
          </div>
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
