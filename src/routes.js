const express = require("express");
const router = express.Router();

const LoginController = require("./controllers/LoginController");

router.get("/users", LoginController.searchAll);
router.post("/users/register", LoginController.register);
router.get("/users/login", LoginController.verifyLogin);
router.delete("/users/delete/:id", LoginController.deleteUser);

module.exports = router;
