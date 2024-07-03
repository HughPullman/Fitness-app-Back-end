import express from "express";

import { findExerciseController } from "../controllers/findExercises.controller.js";
import { findExercisesValidation } from "../middleware/exercise.validation.js";

const router = express.Router();

router.route("/").get(findExercisesValidation, findExerciseController);

export { router as findExercisesRouter };