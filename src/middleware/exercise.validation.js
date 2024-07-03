import { check } from "express-validator";

export const findExercisesValidation = [
    check("searchValue").trim().exists().notEmpty(),
    check("type").trim().exists().notEmpty()
]