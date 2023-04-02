require("dotenv").config();
const logs = require("./src/middleware/logs");
const user = require("./src/routes/user.routes");
const team = require("./src/routes/team.routes");
const inspection = require("./src/routes/inspection.routes");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const STATUS = process.env.STATUS;
var corsOptions = { origin: process.env.ORIGIN };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logs);
app.get("/", (req, res) =>{
	if(STATUS==200) res.status(200).send({ success: "connected to Inspection Report Generation API"});
	if(STATUS==503) res.status(503).send({ message: "the server is down for maintenance"});
});
user(app); //user routes
team(app); //team routes
inspection(app); //inspection routes
app.get("*", (req, res) => res.status(500).send("PAGE NOT FOUND"));
app.listen(PORT, () => console.log(`Server now listening on port:${PORT}`));
