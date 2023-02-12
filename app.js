const users = require("./src/routes/user.routes");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3500;
var corsOptions = {origin: "localhost"};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
	console.log("Someone visited the server");
	res.json({message: "Welcome to Inspection Report Generation"});
});
users(app);//users
app.get("*", (req, res) => res.json({ error: "page not found" }));
app.listen(PORT,()=> console.log(`Server now listening on port:${PORT}`));