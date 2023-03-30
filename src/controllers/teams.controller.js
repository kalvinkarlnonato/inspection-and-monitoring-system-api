const teams = require("../models/team.model");
exports.findAll = (req,res) => {
	teams.findAll((err,result)=>{
		if(!err){
			res.status(200).send(result);
		}else{
			res.status(400).send({message:"Error"});
		}
	});
}
exports.findById = (req,res) => {
	teams.findbyId(req.params.id.trim(),(error,result)=>{
		if(error){
			res.status(400).send(error);
		}else{
			res.status(200).send({message:"Found a member by id.",...result});
		}
	});
}
exports.create = (req,res) => {
	// Validate request
	if (!Object.keys(req.body).length) {
		res.status(400).send({ error: "Content can not be empty!"});
	}else if(typeof req.body.userid !== "number"){
		res.status(403).send({ error: "Userid must be number"})
	}else{
		let team = new teams({
			team_name: req.body.team_name,
			members: req.body.members,
			userid: req.body.userid
		});
		teams.create(team,(error,result) => {
			if(error){
				res.status(400).send({error: "Error found",...error});
			}else{
				res.status(201).send({message:"Successfully added new record!",...result});
			}
		});
	}
}
exports.update = (req,res) => {
	// Validate request
	if (!Object.keys(req.body).length) {
		res.status(400).send({ error: "Content can not be empty!"});
	}else if(typeof req.body.userid !== "number"){
		res.status(403).send({ error: "Userid must be number"})
	}else{
		let id=req.params.id;
		let team = new teams(req.body);
		teams.update(id,team,(error,result) => {
			if(error){
				res.status(400).send(error);
			}else{
				res.status(200).send({message:"Successfully update record!",...result});
			}
		});
	}
}
exports.delete = (req,res) => {
	teams.delete(req.params.id,(error,result)=>{
		if(error){
			res.status(400).send(error);
		}else{
			res.status(200).send({message: "Successfully removed record!"});
		}
	});
}