import pool from "../config/pool.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userExits = await pool.query(
      ` SELECT * FROM users WHERE email = $1
        `,
      [email],
    );

    if (userExits.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (userName, email, password)
         VALUES ($1, $2, $3)
         RETURNING id userName, email`,
      [userName, email, hashedPassword],
    );

    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
