var otModule = function(){}

otModule.prototype.list = function( ep ){
	
	ep.on("conn",function( conn ){
		var sql = "select * from news where author=1";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
	
}


module.exports = function(){
	return new otModule();
}
