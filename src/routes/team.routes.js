const express = require("express");
const router = express.Router();
const team = require("../controllers/team.controller");
const auth = require("../middleware/auth");

module.exports = (app) =>{
	router.get("/team/all", [auth.verifyToken,auth.isSuperUser],team.findAll);
	router.post("/team/add",[auth.verifyToken,auth.isSuperUser],team.create);
	router.get("/team/:id",[auth.verifyToken,auth.isSuperUser],team.findById);
	router.put("/team/edit/:id",[auth.verifyToken,auth.isSuperUser],team.update);
	router.delete("/team/delete/:id",[auth.verifyToken,auth.isSuperUser],team.delete)
	app.use(router);
}