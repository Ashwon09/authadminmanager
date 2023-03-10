const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      default: "staff",
     },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserScheme);