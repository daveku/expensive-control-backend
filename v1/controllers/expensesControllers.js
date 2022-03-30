const asyncHandler = require("express-async-handler");
const expenses = require("../models/expensesModels");

const getExpenses = asyncHandler(async (req, res) => {
  const userExpenses = await expenses.find({ user: req.user.id });
  res.status(200).json(userExpenses);
});

const createExpense = asyncHandler(async (req, res) => {
  if (!req.body.concept) {
    res.status(400);
    throw new Error("Necesito un concepto.");
  }

  if (!req.body.amount) {
    req.status(400);
    throw new Error("Necesito un importe.");
  }

  if (req.body.amount === 0) {
    req.status(400);
    throw new Error("El importe no puede ser 0.");
  }

  const newExpenses = await expenses.create({
    concept: req.body.concept,
    amount: req.body.amount,
    user: req.user.id,
    registerDate: req.body.registerDate,
  });

  res.status(200).json(newExpenses);
});

const deleteExpense = asyncHandler(async (req, res) => {
  // TODO funcionar para eliminar registro.
});

module.exports = {
  getExpenses,
  createExpense,
};
