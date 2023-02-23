require("dotenv").config();
const users = require("./src/routes/user.routes");
const teams = require("./src/routes/teams.routes");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
var corsOptions = {origin: "localhost"};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
	console.log("Someone visited the server");
	res.json({message: "Welcome to Inspection Report Generation"});
});
users(app);//users
teams(app);//teams
app.get("*", (req, res) => res.json({ error: "page not found" }));
app.listen(PORT,()=> console.log(`Server now listening on port:${PORT}`));