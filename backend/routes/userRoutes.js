const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Модель пользователя
const DailyData = require("../models/DailyData");
const router = express.Router();

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
      water: user.water || 0,
      steps: user.steps || 0,
      calories: user.calories || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Обновление данных пользователя
router.put("/update", authenticate, async (req, res) => {
  const { water, steps, calories } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Обновляем данные
    if (water !== undefined) user.water = water;
    if (steps !== undefined) user.steps = steps;
    if (calories !== undefined) user.calories = calories;

    await user.save();

    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

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
