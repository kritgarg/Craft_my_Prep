import express from "express";
import * as ctrl from "./notes.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", requireAuth, ctrl.createNote);
router.get("/", requireAuth, ctrl.getNotes);
router.delete("/:id", requireAuth, ctrl.deleteNote);

export default router;
