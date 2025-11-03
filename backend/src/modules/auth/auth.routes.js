import express from "express";
import * as ctrl from "./auth.controller.js";

const router = express.Router();

// prefix will be /api/auth when mounted
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);

// GitHub OAuth
import passport from "passport";
router.get("/github", passport.authenticate("github", { session: false }));

// callback returns token via query for frontend to capture (or you can redirect with a hash)
router.get("/github/callback", passport.authenticate("github", { session: false }), ctrl.githubCallback);

export default router;
