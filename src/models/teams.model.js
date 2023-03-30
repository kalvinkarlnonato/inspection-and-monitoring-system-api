const sql = require("../utils/database");
const Teams = (teams) => {
	this.team_name = teams.team_name;
	this.members = teams.members;
	this.userid = teams.userid;
}
Teams.findAll = function(result) {
	sql.query("SELECT * FROM teams",null,(err,res) => {
		result(err? err : null,res);
	});
}
Teams.create = (team,result) => {
	sql.query("INSERT INTO teams SET ?",team, (err,res) => {
		result(err? err: null,{id:res.insertId, ...team});
	});
}
Teams.findbyId = (id,result) => {
	sql.query("SELECT * FROM teams WHERE id=?",id,(err,res)=>{
		result(err? err: !res.length? "NOT FOUND" : null,res[0]);
	});
}
Teams.update = (id,team,result) => {
	sql.query("UPDATE teams SET team_name=? , members=? , userid=? WHERE id=?",[team.team_name,team.members,team.userid,id],(err,res)=>{
		result(err? err: res.affectedRows==0? "NOT FOUND": null,{id:id,...team});
	});
}
Teams.delete = (id,result) => {
	sql.query("DELETE FROM teams WHERE id=?",id,(err,res)=> {
		result(err? err: res.affectedRows == 0? "NOT FOUND" : null,res);
	});
}
module.exports = Teams;