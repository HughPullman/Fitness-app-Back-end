import { userService } from "../services/user.service.js";

export const getWorkoutsController = async (req, res) => {
    try {
        const workouts = await userService.getWorkouts(req.params.id);
        return res.status(200).json(workouts);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}