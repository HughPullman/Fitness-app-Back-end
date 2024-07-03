import { userService } from "../services/user.service.js";

export const createWorkoutController = async (req, res) => {
    try {
        const workout = await userService.createWorkout(req.body);
        return res.status(201).json(workout);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};