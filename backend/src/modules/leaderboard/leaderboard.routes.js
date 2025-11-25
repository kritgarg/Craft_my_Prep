import express from "express";
import * as ctrl from "./leaderboard.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", requireAuth, ctrl.getLeaderboard);

export default router;
