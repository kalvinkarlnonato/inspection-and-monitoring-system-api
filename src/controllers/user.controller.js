const users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const Create = ()=>{
	
		// Create a User
		let user = new users({
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 12),
			role: 0,
			confirm: 0
		});
		users.create(user,(error,result) => {
			if(error){
				res.status(500).send({ message:"Mysql error",...error });
			}else{
				res.status(200).send({ message : "ok!" , ...user });
			}
		});
}
const validateUser = (req) => {
	// Validate request
	if (!Object.keys(req.body).length) {
		return 500;
	}else{
		users.findByEmail(req.body.email,(error,user)=>{
			// User found, exist
			
			return 404;
		});
	}
}
exports.findAll = (req,res)=>{
	users.findAll((error,result)=>{
		if(!error){
			res.send(result);
		}else{
			res.status(500).send({message:"Error retrieving a user in database!", error});
		}
	});
}
exports.signup = (req,res) => {
	let code = validateUser(req);
	if(code===500){
		res.status(code).send({ error: "Content can not be empty!"});
	}else if(code === 404){
			res.status(code).send({error:"User already exist"});
	}
}