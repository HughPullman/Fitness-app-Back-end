import { check } from "express-validator";

export const registerValidation = [
    check("email").trim().exists().isEmail().normalizeEmail(),
    check("password").trim().exists().isLength({ min: 8 })
];

export const loginValidation = [
    check("email").trim().exists().isEmail().normalizeEmail(),
    check("password").trim().exists().isLength({min: 8}),
]