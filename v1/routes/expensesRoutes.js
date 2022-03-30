const express = require("express");
const router = express.Router();
const controller = require("../controllers/expensesControllers");
const { protect } = require("../../middleware/protectMiddleware");

router
  .route("/")
  .get(protect, controller.getExpenses)
  .post(protect, controller.createExpense);

router.route("/:id").delete(protect, controller.deleteExpense);

module.exports = router;
