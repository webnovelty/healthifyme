const bcrypt = require("bcrypt");

const hashedPassword =
  "$2b$10$snUWjoHRTzE8huN.zoNOmueeTerMiQirTlcS3eUF1BaAHiFzdesV2"; // Новый хэш из базы
const inputPassword = "test2"; // Пароль, который вы вводили

bcrypt
  .compare(inputPassword, hashedPassword)
  .then((result) => {
    console.log("Password matches:", result); // Ожидается true
  })
  .catch((error) => {
    console.error("Error:", error);
  });
 