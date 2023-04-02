const express = require("express");
const router = express.Router();
const inspection = require("../controllers/inspection.controller");
const auth = require("../middleware/auth");

module.exports = (app) =>{
	router.get("/inspection/all", [auth.verifyToken,auth.isUser],inspection.findAll);
	router.get("/inspection/:team",[auth.verifyToken,auth.isUser],inspection.findbyTeam);
	// router.get("/inspection/:id", [auth.verifyToken,auth.isUser],inspection.findById);
	router.post("/inspection/add",[auth.verifyToken,auth.isUser],inspection.create);
	router.put("/inspection/edit/:id",[auth.verifyToken,auth.isUser],inspection.update);
	// router.delete("/inspection/delete/all",[auth.verifyToken,auth.isUser],inspection.deleteAll);
	router.delete("/inspection/delete/:id",[auth.verifyToken,auth.isUser],inspection.delete);
	app.use(router);
}