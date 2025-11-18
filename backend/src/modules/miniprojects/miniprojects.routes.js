import express from "express";
import { generateMiniProjectController, getMiniProjects, markProjectComplete, deleteProject } from "./miniprojects.controller.js";
import { requireAuth as protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getMiniProjects);
router.post("/generate", generateMiniProjectController);
router.patch("/:id/mark-complete", markProjectComplete);
router.delete("/:id", deleteProject);

export default router;