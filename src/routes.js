import { authToken } from "./functions";

const express = require("express");
const router = express.Router();

const UsersController = require("./controllers/UsersController");

//#region GET
router.get("/users", authToken, UsersController.searchAll);
router.get("/users/login", authToken, UsersController.verifyLogin);
//#endregion GET

//#region POST
router.post("/users/register", authToken, UsersController.register);
//#endregion POST

//#region PATCH
router.patch("/users/changePassword", authToken, UsersController.changePassword);
router.patch("users/online", authToken, UsersController.setOnline);
//#endregion PATCH

//#region DELETE
router.delete("/users/delete/:id", authToken, UsersController.deleteUser);
//#endregion DELETE

module.exports = router;
