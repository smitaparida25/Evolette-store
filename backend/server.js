import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

dotenv.config();

const app = express();
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) =>{
    res.send("Backend running")
});

app.post("/signup", (req, res) =>{
    try{
    const{name, email, password} = req.body;
    const user = await convex.action(api.authActions.signupUser, {
          email,
          password,
          name,
        });
        res.json(user);
    }
    catch{
    res.status(400).json({
          error: error.message,
        });
    }
});

app.post("/login", (req,res) => {
    res.json({ message: "login route ready" });
})

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
