const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const auth = require("../middleware/auth");
module.exports = (app) =>{
	router.get("/user/all", [auth.verifyToken,auth.isSuperUser],user.findAll);
	router.post("/user/signup",user.signup);
	router.post("/user/signin",user.signin);
	app.use(router);
}