import express from "express";
import * as ctrl from "./daily-challenge.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/today", requireAuth, ctrl.getToday);
router.post("/generate", requireAuth, ctrl.generate);
router.post("/:id/mark-solved", requireAuth, ctrl.markSolved);
router.get("/history", requireAuth, ctrl.getHistory);

export default router;
