var typeModule = function(){}

typeModule.prototype.typeList = function( ep,data ){
	
	ep.on("conn",function( conn ){
		
		if( data ){
			var sql = "select * from producttype where pid = ?";
			conn.query(sql,data,ep.done("success"));
		}else{
			var sql = "select p1.*,p2.typename as pname from producttype p1 left join producttype p2 on p1.pid = p2.tid order by p1.pid";
			conn.query(sql,ep.done("success"));
		}
		
		conn.release(); 
	});
	
}

typeModule.prototype.typeAdd = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "insert into producttype values(default,?,?,?)";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

typeModule.prototype.typeDel = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "delete from producttype where tid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

module.exports = function(){
	return new typeModule();
}
