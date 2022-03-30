const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nombre requerido"],
    },
    email: {
      type: String,
      required: [true, "Email requerido"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Contraseña requerida"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
