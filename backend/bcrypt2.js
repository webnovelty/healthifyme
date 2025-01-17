const bcrypt = require("bcrypt");

const hashedPassword =
  "$2b$10$snUWjoHRTzE8huN.zoNOmueeTerMiQirTlcS3eUF1BaAHiFzdesV2";
const inputPassword = "test2";

bcrypt
  .compare(inputPassword, hashedPassword)
  .then((result) => {
    console.log("Password matches:", result); 
  })
  .catch((error) => {
    console.error("Error:", error);
  });
 