import express from "express";
import * as ctrl from "./resources.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", requireAuth, ctrl.getResources);
router.post("/seed", ctrl.seedResources);

export default router;
