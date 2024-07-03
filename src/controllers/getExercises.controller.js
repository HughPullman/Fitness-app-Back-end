import { userService } from "../services/user.service.js";

export const getExercisesController = async (req, res) => {
    try {
        
        const exercises = await userService.getExercises(req.params.id);
        return res.status(200).json(exercises);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};