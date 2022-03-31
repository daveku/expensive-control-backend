const express = require("express");
const router = express.Router();
const controller = require("../controllers/expensesControllers");
const { protect } = require("../../middleware/protectMiddleware");

router
  .route("/")
  .post(protect, controller.createExpense)
  .get(protect, controller.readExpenses);

router.route("/:id").delete(protect, controller.deleteExpense);

module.exports = router;
