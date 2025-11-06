import { useState } from "react";
import { useAction } from "convex/react";
import { Link } from "react-router-dom";

export default function Signup() {
  const signupUser = useAction("authActions:signupUser");
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
      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      console.error(error);
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Signup</h2>
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
      <p>
        Already a user? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
