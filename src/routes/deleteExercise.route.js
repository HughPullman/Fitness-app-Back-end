import express from "express";

import { deleteExerciseController } from "../controllers/deleteExercise.controller.js";
import { authPostMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(authPostMiddleware, deleteExerciseController);

export { router as deleteExerciseRouter };