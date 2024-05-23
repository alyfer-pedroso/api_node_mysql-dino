const express = require("express");
const router = express.Router();

const LoginController = require("./controllers/LoginController");
const UserController = require("./controllers/UserController");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const expectedToken = process.env.TOKEN;
  if (token !== expectedToken) return res.sendStatus(403);

  next();
};

//#region get
router.get("/users", authToken, LoginController.searchAll);
router.get("/users/login", authToken, LoginController.verifyLogin);
//#endregion get

//#region post
router.post("/users/register", authToken, LoginController.register);
//#endregion post

//#region patch
router.patch("/users/changePassord", authToken, UserController.changePassword);
//#endregion patch

//#region delete
router.delete("/users/delete/:id", authToken, LoginController.deleteUser);
//#endregion delete

module.exports = router;
