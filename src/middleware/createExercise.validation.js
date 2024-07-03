import { check } from "express-validator";

export const createExerciseValidation = [
    check("name").trim().exists().notEmpty(),
    check("instructions").trim().exists().notEmpty()
];