const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersControllers");
const { protect } = require("../../middleware/protectMiddleware");

router.route("/").post(controller.createUser).get(controller.readUser);

router
  .route("/:id")
  .put(protect, controller.updateUser)
  .delete(protect, controller.deleteUser);

router.post("/login", controller.login);

module.exports = router;
