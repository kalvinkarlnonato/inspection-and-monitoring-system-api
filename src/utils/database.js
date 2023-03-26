require("dotenv").config();
const mysql = require("mysql2");
// Create a connection to the database
console.log(process.env.DBHOST);
const connection = mysql.createConnection({
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	database: process.env.DBNAME,
	port: process.env.DBPORT,
});
// Open the MySQL connection
connection.connect(error => {
	if (error) throw error;
	console.log("Database is connected on:"+process.env.DBNAME);
});
module.exports = connection;