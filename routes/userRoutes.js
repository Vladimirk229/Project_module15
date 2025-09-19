const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/auth");

const router = express.Router();

//=======================================================================

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = generateToken(newUser);
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json({ token, user: userWithoutPassword });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

//=======================================================================

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const token = generateToken(user);
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.json({ token, user: userWithoutPassword });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
