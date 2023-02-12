const jwt = require('jsonwebtoken');
const Users = require("../models/user.model");
const secret = "kalvin-karl-secret-key";
exports.verifyToken = (req, res, next) => {
	let authHeader = req.get('Authorization');
	if (!authHeader) {
		res.status(403).send({ message: "No token provided!" });
	}else{
		let token = authHeader.split(' ')[1];
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.status(401).send({ message: "Unauthorized!", err });
			}else{
				req.id = decoded.id;
				next();
			}
		});
	}
}