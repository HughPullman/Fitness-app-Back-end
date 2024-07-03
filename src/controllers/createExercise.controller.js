import { userService } from "../services/user.service.js";

export const createExerciseController = async (req, res) => {
    try {
        const exercise = await userService.createExercise(req.body);
        return res.status(201).json(exercise);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};