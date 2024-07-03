import express from "express";

import { deleteWorkoutController } from "../controllers/deleteWorkout.controller.js";
import { authPostMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(authPostMiddleware, deleteWorkoutController);

export { router as deleteWorkoutRouter };