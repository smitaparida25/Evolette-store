import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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
    res.json({ message: "signup route ready" });
})

app.post("/login", (req,res) => {
    res.json({ message: "login route ready" });
})

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
