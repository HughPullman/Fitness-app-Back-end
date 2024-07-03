import express from "express";

import { createExerciseController } from "../controllers/createExercise.controller.js";
import { createExerciseValidation } from "../middleware/createExercise.validation.js";
import { authPostMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(createExerciseValidation, authPostMiddleware, createExerciseController);

export { router as createExerciseRouter };