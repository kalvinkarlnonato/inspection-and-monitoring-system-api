require("dotenv").config();
const jwt = require('jsonwebtoken');
const user = require("../models/user.model");
exports.verifyToken = (req, res, next) => {
	let authHeader = req.get('Authorization');
	if (!authHeader) {
		res.status(403).send({ message: "No token provided!" });
	}else{
		let token = authHeader.split(' ')[1];
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				res.status(401).send({ message: "Unauthorized!", err });
			}else{
				req.id = decoded.id;
				next();
			}
		});
	}
}
exports.isSuper = (req, res, next) => {
	user.findById(req.id, (err,user)=>{
		if(!err){
			if (user.role === "su") {
				next();
			}else{
				res.status(403).send({ message: "Requires a super user!", owner:"Contact Kalvin Karl C. Nonato", number: "+639984283333", facebook: "https://facebook.com/kalvinkarl28" });
			}
		}else if("NOT_FOUND"){
			res.status(404).send({ message: "User not found" });
		}else{
			res.status(500).send({ message: "Error retrieving user in database" });
		}
	})
};
exports.isUser = (req, res, next) => {
	user.findById(req.id, (err,user)=>{
		if(!err){
			if (user.role === "su" || user.role === "ad" || user.role === "ia") {
				next();
			}else{
				res.status(403).send({ message: "Requires a system User!", owner:"Contact Kalvin Karl C. Nonato", number: "+639984283333", facebook: "https://facebook.com/kalvinkarl28" });
			}
		}else if("NOT_FOUND"){
			res.status(404).send({ message: "User not found" });
		}else{
			res.status(500).send({ message: "Error retrieving user in database" });
		}
	})
};
// exports.isInvestigator = (req, res, next) => {
// 	user.findById(req.id, (err,user)=>{
// 		if(!err){
// 			if (user.role === "ia") {
// 				next();
// 			}else{
// 				res.status(403).send({ message: "Require Investigator Role!" });
// 			}
// 		}else if("NOT_FOUND"){
// 			res.status(404).send({ message: "User not found" });
// 		}else{
// 			res.status(500).send({ message: "Error retrieving user in database" });
// 		}
// 	})
// };