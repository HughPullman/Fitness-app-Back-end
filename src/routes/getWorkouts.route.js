import express from "express";

import { getWorkoutsController } from "../controllers/getWorkouts.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/:id").get(authMiddleware, getWorkoutsController);

export {router as getWorkoutsRouter}