require("dotenv").config();
const users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
exports.findAll = (req,res)=>{
	users.findAll((error,result)=>{
		if(!error){
			res.status(200).send(result);
		}else{
			res.status(400).send({message:"Error retrieving a user in database!", ...error});
		}
	});
}
exports.signup = (req,res) => {
	// Validate request
	if (!Object.keys(req.body).length) {
		res.status(400).send({ error: "Content can not be empty!"});
	}else{
		if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.email)) {
			users.findByEmail(req.body.email,(error,user)=>{
				if(error && error !== "NOT FOUND"){
					res.status(400).send({message:"Error finding a user in database!", ...error});
				}else if(error === "NOT FOUND"){
					// Create a User
					let user = new users({
						email: req.body.email,
						password: bcrypt.hashSync(req.body.password, 12),
						role:  req.body.role,
						confirm: 0
					});
					users.create(user,(error,result) => {
						if(error){
							res.status(400).send({ message:"Error creating a new user", ...error });
						}else{
							res.status(201).send({ message : "Successfully registered a new user" , ...result });
						}
					});
				}else{
					// User found, exist
					res.status(409).send({error:"User already exist",...user});
				}
			});
		}else{
			res.status(401).send({ message: "Invalid email format" });
		}
	}
}
exports.signin = (req,res) => {
	// Validate Request
	if (!Object.keys(req.body).length) {
		res.status(400).send({ error: "Content can not be empty!"});
	}else{
		users.findByEmail(req.body.email,(error,user)=>{
			if(error && error !== "NOT FOUND"){
				res.status(400).send({message: "Error retrieving a user in database"});
			}else if(error === "NOT FOUND"){
				res.status(404).send({message: "User is not found in database"});
			}else{
				let passwordIsEqual = bcrypt.compareSync(req.body.password, user.password);
				if(passwordIsEqual){
					if(user.confirm){
						let token = jwt.sign({
							id: user.id,
							email: user.email
						},process.env.SECRET,{expiresIn: 86400});
						res.status(200).send({ ...user, token: token});
					}else{
						res.status(403).send({message: "Email hasn't been verified yet.", ...user.email});
					}
				}else{
					res.status(401).send({ message: "Incorrect password!" });
				}
			}
		});
	}
}
exports.update = (req,res) => {
	// Validate request
	if (!Object.keys(req.body).length) {
		res.status(400).send({ error: "Content can not be empty!"});
	}else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.email))){
		res.status(403).send({ error: "Invalid email format"})
	}else{
		let id = req.params.id;
		let user = new users({
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 12),
			role:  req.body.role,
			confirm: req.body.confirm
		});
		users.update(id,user,(error,result) => {
			if(error){
				res.status(400).send(error);
			}else{
				res.status(200).send({message:"Successfully update record!",...result});
			}
		});
	}
}
exports.delete = (req,res) => {
	users.delete(req.params.id,(error,result)=>{
		if(error){
			res.status(400).send(error);
		}else{
			res.status(200).send({message: "Successfully removed record!"});
		}
	});
}