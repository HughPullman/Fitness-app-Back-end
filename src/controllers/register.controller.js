import { userService } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(`Unable to login, please check details`);
    }
    try {
        const user = await userService.register(req.body);
        return res.status(201).json(user);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};