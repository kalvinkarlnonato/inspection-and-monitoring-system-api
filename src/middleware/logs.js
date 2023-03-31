const logs = (req,res,next)=>{
	const start = Date.now();
	res.on('finish',()=>{
		const end=Date.now();
		const diffSeconds=(end-start)/1000;
		const status = res.statusCode;
		console.log(`${req.method} ${req.url} complete status ${status} in ${diffSeconds} seconds`);
	});
	next();
}
module.exports = logs;