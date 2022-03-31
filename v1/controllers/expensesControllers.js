const asyncHandler = require("express-async-handler");
const expenses = require("../models/expensesModels");

const createExpense = asyncHandler(async (req, res) => {
  if (!req.body.concept) {
    res.status(400);
    throw new Error("Necesito un concepto.");
  }

  if (!req.body.amount) {
    res.status(400);
    throw new Error("Necesito un importe.");
  }

  if (req.body.amount === 0) {
    res.status(400);
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

const readExpenses = asyncHandler(async (req, res) => {
  const userExpenses = await expenses.find({ user: req.user.id });
  res.status(200).json(userExpenses);
});

const deleteExpense = asyncHandler(async (req, res) => {
  const searchExpense = await expenses.findById(req.params.id);

  if (!searchExpense) {
    res.status(400);
    throw new Error("No encontre la tarea solicitada");
  }

  if (searchExpense.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Acceso no autorizado");
  }

  searchExpense.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  createExpense,
  readExpenses,
  deleteExpense,
};
