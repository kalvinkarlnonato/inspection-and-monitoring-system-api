const sql = require("../utils/database");

const User = function (user){
	this.email = user.email;
	this.password = user.password;
	this.role = user.role;
	this.confirm = user.confirm;
}
User.findAll = (result)=>{
	sql.query("SELECT * FROM users",null,(err,res)=>{
		result(err? err : null,res);
	});
}
User.findById = (id, result) => {
	sql.query("SELECT * FROM users WHERE id = ?", id , (err, res) => {
		result(err? err: !res.length? "NOT FOUND": null,res[0]);
	});
}
User.findByEmail = (email,result) => {
	sql.query("SELECT * FROM users WHERE email=?",email,(err,res)=>{
		result(err? err: !res.length? "NOT FOUND" : null,res[0]);
	});
}
User.create = (user,result) => {
	sql.query("INSERT INTO users SET ?", user, (err,res)=>{
		result(err? err: null,{id:res.insertId, ...user});
	});
}
User.update = (id,user,result) => {
	sql.query("UPDATE users SET ? WHERE id="+id,user,(err,res)=>{
		result(err? err: res.affectedRows==0? "NOT FOUND": null,{id:id,...user});
	});
}
User.delete = (id,result) => {
	sql.query("DELETE FROM users WHERE id=?",id,(err,res)=> {
		result(err? err: res.affectedRows == 0? "NOT FOUND" : null,res);
	});
}
module.exports = User;