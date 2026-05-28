import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import jwt from "jsonwebtoken";

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

app.post("/signup", async (req, res) =>{
    try{
    const{name, email, password} = req.body;
    const user = await convex.action(api.authActions.signupUser, {
          email,
          password,
          name,
        });
        res.json(user);
    }
    catch(error){
    res.status(400).json({
          error: error.message,
        });
    }
});

app.post("/login", async (req,res) => {
    try{
    const {email, password} = req.body;

    const user = await convex.action(api.authActions.loginUser,{
    email,
    password,
    });

    const token = jwt.sign(
    {
        userId: user._id,
        email: user.email,
    },
    process.env.JWT_SECRET,
    {
    expiresIn: "7d",
    }
    );

    res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
          message: "Login successful",
          user,
        });

    }
    catch(error){
        res.status(400).json({
              error: error.message,
            });
    }
})

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
