import { authToken } from "./functions";

const express = require("express");
const router = express.Router();

const UsersController = require("./controllers/UsersController");

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
