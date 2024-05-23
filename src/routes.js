const express = require("express");
const router = express.Router();

const UsersController = require("./controllers/UsersController");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const expectedToken = process.env.TOKEN;
  if (token !== expectedToken) return res.sendStatus(403);

  next();
};

//#region get
router.get("/users", authToken, UsersController.searchAll);
router.get("/users/login", authToken, UsersController.verifyLogin);
//#endregion get

//#region post
router.post("/users/register", authToken, UsersController.register);
//#endregion post

//#region patch
router.patch("/users/changePassword", authToken, UsersController.changePassword);
//#endregion patch

//#region delete
router.delete("/users/delete/:id", authToken, UsersController.deleteUser);
//#endregion delete

module.exports = router;
