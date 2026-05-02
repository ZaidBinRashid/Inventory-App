import pool from "../config/pool.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt'

export const signUp = (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }



    res.status(201).json({ message: "User created successfully" });
  } catch (error) {}
};
