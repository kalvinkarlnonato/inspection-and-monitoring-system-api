const logs = (req,res,next)=>{
	const start = Date.now();
	res.on('finish',()=>{
		const end=Date.now();
		const diffSeconds=(end-start)/1000;
		console.log(`${req.method} ${req.url} completed in ${diffSeconds} seconds`);
	});
	next();
}
module.exports = logs;