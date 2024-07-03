import { exerciseService } from "../services/exercise.service.js";


export const findExerciseController = async (req, res) => {
    try {
        const exercises = await exerciseService.findExercises(req.query);
        return res.status(200).json(exercises);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};