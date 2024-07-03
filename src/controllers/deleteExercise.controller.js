import { userService } from "../services/user.service.js";

export const deleteExerciseController = async (req, res) => {
    try {
        const exercise = await userService.deleteExercise(req.body);
        return res.status(200).json(exercise);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}