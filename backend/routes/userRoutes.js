const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Модель пользователя
const DailyData = require("../models/DailyData");
const router = express.Router();
const path = require("path");
const upload = multer({ dest: "uploads/" });

// Middleware для проверки токена
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Добавляем userId в запрос
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Получение информации о пользователе
router.get("/user-info", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      avatar: user.avatar || "/default-avatar.png", // Добавляем путь к аватару
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

// Обновление данных пользователя (включая аватар)
router.put(
  "/update",
  authenticate,
  upload.single("avatar"),
  async (req, res) => {
    const { weight, height, age, water, steps, calories } = req.body; // Получаем данные из тела запроса
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined; // Обработка аватарки

    try {
      const user = await User.findById(req.userId); // Ищем пользователя в базе данных

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Обновляем данные, если они присутствуют в запросе
      if (weight !== undefined) user.weight = parseFloat(weight);
      if (height !== undefined) user.height = parseFloat(height);
      if (age !== undefined) user.age = parseInt(age, 10);
      if (water !== undefined) user.water = parseInt(water, 10);
      if (steps !== undefined) user.steps = parseInt(steps, 10);
      if (calories !== undefined) user.calories = parseInt(calories, 10);
      if (avatar) user.avatar = avatar;

      await user.save(); // Сохраняем изменения в базе данных

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

// Обновление только аватарки
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

// Сохранение данных дня
router.post("/end-day", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Сохраняем данные дня
    const dailyData = new DailyData({
      userId,
      date: today,
      water: user.water || 0,
      steps: user.steps || 0,
      calories: user.calories || 0,
    });

    await dailyData.save();

    // Сбрасываем текущие данные пользователя
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

// Получение всех данных пользователя
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
