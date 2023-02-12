const sql = require("../utils/database");

const User = function(user){
	this.email = user.email;
	this.password = user.password;
	this.role = user.role;
	this.confirm = user.confirm;
}
User.findAll = (result)=>{
	sql.query("SELECT * FROM users",null,(err,res)=>{
		err? result(err) : result(null,res);
	});
}
User.findByEmail = (email,result) => {
	sql.query("SELECT * FROM users WHERE email=?",email,(err,res)=>{
		err? result(err) : !res.length? result("NOT FOUND") : result(null,res[0]);
	});
}
User.create = (user,result) => {
	sql.query("INSERT INTO users SET ?", user, (err,res)=>{
		err? result(err): result(null,{id:res.insertId, ...user});
	});
}
module.exports = User;