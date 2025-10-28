import {useState} from "react";
import {useAction} from "convex/react";

export default function Login(){
    const loginUser = useAction("authActions:loginUser");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await loginUser({email, password});
            setMessage("Login Successful");
            setEmail("");
            setPassword("");
        } catch (error){
            console.error(error);
            setMessage("Login failed.");
        }
    };
    return (
        <div style={{ maxWidth: "400px", margin: "50px auto" }}>
            <h2> Login </h2>
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

    );
}