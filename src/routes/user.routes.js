const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const auth = require("../middleware/auth");
module.exports = (app) =>{
	router.get("/user/all", [auth.verifyToken,auth.isSuper],user.findAll);
	router.put("/user/update/:id", [auth.verifyToken,auth.isSuper],user.update);
	router.delete("/user/delete/:id", [auth.verifyToken,auth.isSuper],user.delete);
	router.post("/user/signup",user.signup);
	router.post("/user/signin",user.signin);
	app.use(router);
}