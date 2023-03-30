const inspection = require("../models/inspection.model");
exports.findAll = (req,res) => {
	inspection.findAll((err,result)=>{
		if(!err){
			res.status(200).send(result);
		}else{
			res.status(400).send({message:"Error"});
		}
	});
}
exports.findbyTeam = (req,res) => {
	inspection.findbyTeam(req.params.team.trim(),(error,result)=>{ 
		res.status(200).send(result);
		// if(error){
		// 	res.status(400).send(error);
		// }else{
		// 	res.status(200).send({message:"Found a inspection by id.",...result});
		// }
	});
}
exports.create = (req,res) => {
	// Validate request
	if (!Object.keys(req.body).length) {
		res.status(400).send({ error: "Content can not be empty!"});
	}else if(typeof req.body.team_id !== "number"){
		res.status(403).send({ error: "team id must be number"})
	}else if(typeof req.body.type_id !== "number"){
		res.status(403).send({ error: "type id must be number"})
	}else{
		let newInspection = new inspection(req.body);
		inspection.create(newInspection,(error,result) => {
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
	}else if(typeof req.body.team_id !== "number"){
		res.status(403).send({ error: "team id must be number"})
	}else if(typeof req.body.type_id !== "number"){
		res.status(403).send({ error: "type id must be number"})
	}else{
		let id=req.params.id;
		let inspections = new inspection(req.body);
		inspection.update(id,inspections,(error,result) => {
			if(error){
				res.status(400).send(error);
			}else{
				res.status(200).send({message:"Successfully update record!",...result});
			}
		});
	}
}
// exports.deleteAll = (req,res) => {
// 	inspection.deleteAll(req.params.id,(error,result)=>{
// 		if(error){
// 			res.status(400).send(error);
// 		}else{
// 			res.status(200).send({message: "Successfully removed records!"});
// 		}
// 	});
// }
exports.delete = (req,res) => {
	inspection.delete(req.params.id,(error,result)=>{
		if(error){
			res.status(400).send(error);
		}else{
			res.status(200).send({message: "Successfully removed record!"});
		}
	});
}