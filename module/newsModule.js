var newsModule = function(){}

newsModule.prototype.newsList = function( ep ){
	
	ep.on("conn",function( conn ){
		var sql = "select n.nid,ntitle,pubdate,a.aname from news n left join admin a on n.author = a.aid";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
	
}

newsModule.prototype.newsAdd = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "insert into news values(default,?,?,now(),?)";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

newsModule.prototype.newsDel = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "delete from news where nid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

newsModule.prototype.previews = function ( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "select n.*,a.aname from news n,admin a where n.author = a.aid and nid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}

module.exports = function(){
	return new newsModule();
}
