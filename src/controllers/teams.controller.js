const teams = require("../models/teams.model");
exports.findAll = (req,res) => {
	teams.findAll((err,result)=>{
		if(!err){
			res.send(result);
		}else{
			res.status(400).send({message:"Error"});
		}
	});
}

