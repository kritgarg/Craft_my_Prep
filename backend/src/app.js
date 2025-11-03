import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js"; 

import authRoutes from "./modules/auth/auth.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize()); 


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ status: "CraftMyPrep Backend Running 🚀", time: new Date().toISOString() });
});
