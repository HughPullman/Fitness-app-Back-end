import express from "express";

import { loginController } from "../controllers/login.controller.js";
import { loginValidation } from "../middleware/user.validation.js";

const router = express.Router();

router.route("/").post(loginValidation, loginController);

export { router as loginRouter };