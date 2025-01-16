const bcrypt = require("bcrypt");

// Хэшированный пароль из базы данных
const hashedPassword =
  "$2b$10$snUWjoHRTzE8huN.zoNOmueeTerMiQirTlcS3eUF1BaAHiFzdesV2";

// Пароль, который вы хотите проверить
const inputPassword = "test2"; // Замените на пароль, который вы вводите при авторизации

// Сравниваем пароли
bcrypt
  .compare(inputPassword, hashedPassword)
  .then((result) => {
    console.log("Password matches:", result); // Должно вывести true или false
  })
  .catch((error) => {
    console.error("Error comparing passwords:", error);
  });
