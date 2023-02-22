const express = require("express");
const router = express.Router();
const Users = require("../controllers/user.controller");
const Auth = require("../middleware/auth");
module.exports = (app) =>{
	router.get("/", [Auth.verifyToken,Users.findAll]);
	router.post("/signup",Users.signup);
	router.post("/signin",Users.signin);
	app.use("/users",router);
}