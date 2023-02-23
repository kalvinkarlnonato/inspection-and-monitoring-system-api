const sql = require("../utils/database");
const Teams = function(teams){
	this.team_name = teams.team_name;
	this.members = teams.members;
	this.userid = teams.userid;
}
Teams.findAll = (result) => {
	sql.query("SELECT * FROM inspecting_team",null,(err,res) => {
		result(err? err : null,res);
	});
}
Teams.create = (team,result) => {
	sql.query("INSERT INTO inspecting_team SET ?",team, (err,res) => {
		result(err? err: null,{id:res.insertId, ...team});
	});
}
Teams.findbyId = (id,result) => {
	sql.query("SELECT * FROM inspecting_team WHERE id=?",id,(err,res)=>{
		result(err? err: !res.length? "NOT FOUND" : null,res[0]);
	});
}
Teams.update = (id,team,result) => {
	sql.query("UPDATE inspecting_team SET team_name=? , members=? , userid=? WHERE id=?",[team.team_name,team.members,team.userid,id],(err,res)=>{
		result(err? err: res.affectedRows==0? "NOT FOUND": null,{id:id,...team});
	});
}
Teams.delete = (id,result) => {
	sql.query("DELETE FROM inspecting_team WHERE id=?",id,(err,res)=> {
		result(err? err: res.affectedRows == 0? "NOT FOUND" : null,res);
	});
}
module.exports = Teams;