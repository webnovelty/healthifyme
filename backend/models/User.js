const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  weight: { type: Number, default: 0 }, 
  height: { type: Number, default: 0 }, 
  age: { type: Number, default: 0 }, 
  water: { type: Number, default: 0 },
  steps: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
