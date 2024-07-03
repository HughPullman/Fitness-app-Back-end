import { userService } from "../services/user.service.js";

export const editWorkoutController = async (req, res) => {
    try {
        const workout = await userService.editWorkout(req.body);
        return res.status(201).json(workout);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}