const express = require("express");
const router = express.Router();

const LoginController = require("./controllers/LoginController");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const expectedToken = process.env.TOKEN;
  if (token !== expectedToken) return res.sendStatus(403);

  next();
};

router.get("/users", authToken, LoginController.searchAll);
router.post("/users/register", authToken, LoginController.register);
router.get("/users/login", authToken, LoginController.verifyLogin);
router.delete("/users/delete/:id", authToken, LoginController.deleteUser);

module.exports = router;
