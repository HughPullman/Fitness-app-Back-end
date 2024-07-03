import { userService } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const loginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(`Unable to login, please check details`);
    }
    try {
        const user = await userService.login(req.body);
        res.header("access-token", user.accessToken).status(200).json(user);
    } catch (e) {
        res.status(401).send({error: e.message});
    }
};