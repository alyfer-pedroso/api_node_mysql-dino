const express = require("express");
const router = express.Router();

const UsersController = require("./controllers/UsersController");
const TagsController = require("./controllers/TagsController");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  const expectedToken = process.env.TOKEN;
  if (token !== expectedToken) return res.sendStatus(403);

  next();
};

//#region GET
router.get("/users", authToken, UsersController.searchAll);
router.get("/users/login", authToken, UsersController.verifyLogin);
router.get("/tags", authToken, TagsController.getAll);
//#endregion GET

//#region POST
router.post("/users/register", authToken, UsersController.register);
router.post("/tags/newTag", authToken, TagsController.newTag);
//#endregion POST

//#region PATCH
router.patch("/users/changePassword", authToken, UsersController.changePassword);
router.patch("/users/online", authToken, UsersController.setOnline);
//#endregion PATCH

//#region DELETE
router.delete("/users/delete/:id", authToken, UsersController.deleteUser);
//#endregion DELETE

module.exports = router;
