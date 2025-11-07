import express from "express";
import * as ctrl from "./company-questions.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", requireAuth, ctrl.getQuestions);
router.get("/:id", requireAuth, ctrl.getQuestionById);
router.post("/:id/mark-solved", requireAuth, ctrl.markSolved);

export default router;
