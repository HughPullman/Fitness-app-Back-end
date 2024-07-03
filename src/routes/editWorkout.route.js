import express from "express";

import { editWorkoutController } from "../controllers/editWorkout.controller.js";
import { authPostMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").put(authPostMiddleware, editWorkoutController);

export { router as editWorkoutRouter };