const sql = require("../utils/database");
const Teams = function(teams){
	this.name = teams.name;
	this.members = teams.members;
	this.role = teams.role;
}
Teams.findAll = (result) => {
	sql.query("SELECT * FROM inspecting_team",null,(err,res) => {
		result(err? err : null,res);
	});
}

module.exports = Teams;