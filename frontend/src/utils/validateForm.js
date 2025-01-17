export const validateForm = (name, email, password) => {
  if (!name || !email || !password) {
    return "All fields are required.";
  }
  if (!email.includes("@")) {
    return "Invalid email address.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return null; // Нет ошибок
};
