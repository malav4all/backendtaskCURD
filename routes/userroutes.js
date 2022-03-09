const express = require("express")
const Routes = express.Router()
const userController = require("../controller/userController")
Routes.put("/:id",userController.updateUser)
Routes.post("/register",userController.register)
Routes.post("/login",userController.login)
Routes.delete("/:id",userController.deleteUser)
Routes.get("/allUser",userController.fetchAllUser)

module.exports = Routes