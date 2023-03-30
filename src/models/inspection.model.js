const sql = require("../utils/database");
const Inspection = function(inspection) {
	this.team_id = inspection.team_id;
	this.type_id = inspection.type_id;
	this.datetime = inspection.datetime;
	this.unit = inspection.unit;
	this.deployment_of_personel = inspection.deployment_of_personel;
	this.other_inspection_conducted = inspection.other_inspection_conducted;
	this.location = inspection.location;
	this.ts = inspection.ts;
	this.ap = inspection.ap;
	this.aa = inspection.aa;
	this.dispatched = inspection.dispatched;
	this.absent = inspection.absent;
}
Inspection.findAll = (result) => {
	sql.query("SELECT * FROM inspections",null,(err,res) => {
		result(err? err : null,res);
	});
}
Inspection.create = (inspection,result) => {
	sql.query("INSERT INTO inspections SET ?",inspection, (err,res) => {
		result(err? err: null,{id:res.insertId, ...inspection});
	});
}
Inspection.findbyTeam = (id,result) => {
	sql.query("SELECT * FROM inspections WHERE team_id=?",id,(err,res)=>{
		result(err? err: !res.length? "NOT FOUND" : null,res);
	});
}
Inspection.update = (id,inspection,result) => {
	sql.query("UPDATE inspections SET ? WHERE id="+id,inspection,(err,res)=>{
		result(err? err: res.affectedRows==0? "NOT FOUND": null,{id:id,...inspection});
	});
}
// Inspection.deleteAll = (result) => {
// 	sql.query("DELETE FROM inspections",(err,res)=> {
// 		if(err){
// 			result(err,null);
// 		}else{
// 			result(null,res);
// 		}
// 	});
// }
Inspection.delete = (id,result) => {
	sql.query("DELETE FROM inspections WHERE id=?",id,(err,res)=> {
		result(err? err: res.affectedRows == 0? "NOT FOUND" : null,res);
	});
}
module.exports = Inspection;