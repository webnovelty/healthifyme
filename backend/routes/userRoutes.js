const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
const DailyData = require("../models/DailyData");
const router = express.Router();
const path = require("path");
const upload = multer({ dest: "uploads/" });

// Middleware for token verification
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Getting information about the user
router.get("/user-info", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      avatar: user.avatar || "/default-avatar.png", 
      weight: user.weight || 0,
      height: user.height || 0,
      age: user.age || 0,
      water: user.water || 0,
      steps: user.steps || 0,
      calories: user.calories || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user data (including avatar)
router.put(
  "/update",
  authenticate,
  upload.single("avatar"),
  async (req, res) => {
    const { weight, height, age, water, steps, calories } = req.body; 
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined; 

    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the data if it is present in the request
      if (weight !== undefined) user.weight = parseFloat(weight);
      if (height !== undefined) user.height = parseFloat(height);
      if (age !== undefined) user.age = parseInt(age, 10);
      if (water !== undefined) user.water = parseInt(water, 10);
      if (steps !== undefined) user.steps = parseInt(steps, 10);
      if (calories !== undefined) user.calories = parseInt(calories, 10);
      if (avatar) user.avatar = avatar;

      await user.save(); 

      res.status(200).json({
        message: "User data updated successfully",
        avatar: user.avatar,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Update only the avatar
router.put(
  "/update-avatar",
  authenticate,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

      if (!avatar) {
        return res.status(400).json({ message: "No avatar uploaded" });
      }

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.avatar = avatar;
      await user.save();

      res
        .status(200)
        .json({ message: "Avatar updated successfully", avatar: user.avatar });
    } catch (error) {
      console.error("Error updating avatar:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Saving the day's data
router.post("/end-day", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyData = new DailyData({
      userId,
      date: today,
      water: user.water || 0,
      steps: user.steps || 0,
      calories: user.calories || 0,
    });

    await dailyData.save();

    // Reset the current user data
    user.water = 0;
    user.steps = 0;
    user.calories = 0;

    await user.save();

    res
      .status(200)
      .json({ message: "Daily data saved and reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all user data
router.get("/history", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const data = await DailyData.find({ userId }).sort({ date: 1 });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
