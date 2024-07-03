import express from "express";

import { getExercisesController } from "../controllers/getExercises.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/:id").get(authMiddleware, getExercisesController);

export { router as getExercisesRouter };