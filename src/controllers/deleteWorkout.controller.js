import { userService } from "../services/user.service.js";

export const deleteWorkoutController = async (req, res) => {
    try {
        const workout = await userService.deleteWorkout(req.body);
        return res.status(200).json(workout);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};