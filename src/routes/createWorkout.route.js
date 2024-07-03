import express from "express";

import { createWorkoutController } from "../controllers/createWorkout.controller.js";
import { authPostMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(authPostMiddleware, createWorkoutController);

export { router as createWorkoutRouter };