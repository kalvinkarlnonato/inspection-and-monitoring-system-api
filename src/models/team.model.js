const sql = require("../utils/database");
const Team = function(team) {
	this.team_name = team.team_name;
	this.members = team.members;
	this.userid = team.userid;
}
Team.findAll = function(result) {
	sql.query("SELECT * FROM teams",null,(err,res) => {
		result(err? err : null,res);
	});
}
Team.create = (team,result) => {
	sql.query("INSERT INTO teams SET ?",team, (err,res) => {
		result(err? err: null,{id:res.insertId, ...team});
	});
}
Team.findbyId = (id,result) => {
	sql.query("SELECT * FROM teams WHERE id=?",id,(err,res)=>{
		result(err? err: !res.length? "NOT FOUND" : null,res[0]);
	});
}
Team.update = (id,team,result) => {
	sql.query("UPDATE teams SET ? WHERE id="+id,team,(err,res)=>{
		result(err? err: res.affectedRows==0? "NOT FOUND": null,{id:id,...team});
	});
}
Team.delete = (id,result) => {
	sql.query("DELETE FROM teams WHERE id=?",id,(err,res)=> {
		result(err? err: res.affectedRows == 0? "NOT FOUND" : null,res);
	});
}
module.exports = Team;