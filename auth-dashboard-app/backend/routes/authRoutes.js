import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();


// EMAIL VALIDATION FUNCTION
const validateEmail = (email) => {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);

};


// REGISTER
router.post("/register", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // CHECK EMPTY FIELDS
    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    // EMAIL VALIDATION
    if (
      !validateEmail(email)
    ) {
      return res.status(400).json({
        message:
          "Invalid email format",
      });
    }

    // PASSWORD LENGTH
    if (
      password.length < 6
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,

        // FORCE NORMAL USER
        role: "user",
      });

    res.status(201).json({
      message:
        "Registration successful",
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        "Registration failed",
    });

  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    // CHECK EMPTY FIELDS
    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    // EMAIL VALIDATION
    if (
      !validateEmail(email)
    ) {
      return res.status(400).json({
        message:
          "Invalid email format",
      });
    }

    // FIND USER
    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        "Login failed",
    });

  }
});

export default router;