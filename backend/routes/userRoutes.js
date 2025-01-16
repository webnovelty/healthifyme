const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Модель пользователя
const router = express.Router();

router.get("/user-info", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Расшифровываем токен
    const user = await User.findById(decoded.id); // Ищем пользователя в базе данных

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ name: user.name }); // Возвращаем только имя
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
