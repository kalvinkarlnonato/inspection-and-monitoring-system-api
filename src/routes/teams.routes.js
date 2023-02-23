const express = require("express");
const router = express.Router();
const teams = require("../controllers/teams.controller");
const Auth = require("../middleware/auth");
module.exports = (app) =>{
	router.get("/all", [Auth.verifyToken,Auth.isSuperUser],teams.findAll);
	router.post("/add",[Auth.verifyToken,Auth.isSuperUser],teams.create);
	router.get("/:id",[Auth.verifyToken,Auth.isSuperUser],teams.findById);
	router.put("/edit/:id",[Auth.verifyToken,Auth.isSuperUser],teams.update);
	router.delete("/delete/:id",[Auth.verifyToken,Auth.isSuperUser],teams.delete)
	app.use("/team",router);
}