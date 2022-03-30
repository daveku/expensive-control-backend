const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    concept: {
      type: String,
      required: [true, "Concepto requerido"],
    },
    amount: {
      type: Number,
      required: [true, "Importe requerido"],
    },
    registerDate: {
      type: Date,
      required: [true, "Fecha de registro requerida"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
