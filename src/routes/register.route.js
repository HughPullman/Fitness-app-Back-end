import express from "express";

import { registerController } from "../controllers/register.controller.js";
import { registerValidation } from "../middleware/user.validation.js";

const router = express.Router();

router.route("/").post(registerValidation, registerController);

export { router as registerRouter };