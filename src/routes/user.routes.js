const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
module.exports = (app) =>{
	router.get("/", user.findAll);
	router.post("/signup",user.signup);
	app.use("/users",router);
}
