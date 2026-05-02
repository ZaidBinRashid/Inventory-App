import { body, validation} from "express-validator"

import { body } from "express-validator";

export const validateSignUp = [
  body("userName")
    .trim()
    .notEmpty().withMessage("userName is required")
    .isLength({ min: 2 }).withMessage("Minimum 4 characters")
    .isAlpha().withMessage("Only letters allowed"),
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Minimum 6 characters")
];