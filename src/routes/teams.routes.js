const express = require("express");
const router = express.Router();
const teams = require("../controllers/teams.controller");
const auth = require("../middleware/auth");

module.exports = (app) =>{
	router.get("/team/all", [auth.verifyToken,auth.isSuperUser],teams.findAll);
	router.post("/team/add",[auth.verifyToken,auth.isSuperUser],teams.create);
	router.get("/team/:id",[auth.verifyToken,auth.isSuperUser],teams.findById);
	router.put("/team/edit/:id",[auth.verifyToken,auth.isSuperUser],teams.update);
	router.delete("team/delete/:id",[auth.verifyToken,auth.isSuperUser],teams.delete)
	app.use(router);
}