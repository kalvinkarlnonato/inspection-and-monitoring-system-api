const logs = (req,res,next)=>{
	const start = Date.now();
	res.on('finish',()=>{
		const end=Date.now();
		const diffSeconds=(end-start)/1000;
		const status = res.statusCode;
		console.log(`${req.method} ${req.url} ${status==200?'complete':'error'}${status!=200?status:''} in ${diffSeconds} seconds`);
	});
	next();
}
module.exports = logs;