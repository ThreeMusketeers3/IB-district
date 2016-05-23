var productModule = function(){}

productModule.prototype.proList = function( ep ){
	ep.on("conn",function( conn ){
		var sql = "select p.*,t.typename from product p left join producttype t on p.type = t.tid";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
}

productModule.prototype.proAdd = function( ep,conn,data ){
	//ep.on("conn",function( conn ){
		var sql = "insert into product values(default,?,?,?,?,?)";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	//});
}

productModule.prototype.proDel = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "delete from product where pid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

module.exports = function(){
	return new productModule();
}