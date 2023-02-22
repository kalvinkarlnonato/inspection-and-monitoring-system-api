const express = require("express");
const router = express.Router();
const teams = require("../controllers/teams.controller");
const Auth = require("../middleware/auth");
module.exports = (app) =>{
	router.get("/", [Auth.verifyToken,teams.findAll]);
	// router.post("/add",);
	// router.put("/edit",);
	// router.delete("/delete",)
	app.use("/teams",router);
}