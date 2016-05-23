var newsControl = function (){}


newsControl.prototype.newsList = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	
	newsModule.newsList(ep);
	ep.on("success",function( data ){
		setTimeout(function() {
			if( req.query.callback ){
				res.jsonp(data).end();
			}else{
				res.json(data).end();
			}
		},1000);
		
		
	});
	ep.fail(function( err ){
		next(err);
	});
	
}

newsControl.prototype.newsAdd = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	newsModule.newsAdd(ep,[ req.body.ntitle,req.body.content,req.body.author ]);
	ep.on("success",function( data ){
		if( data.insertId ){
			res.json( config.info.suc ).end();
		}else{
			res.json(config.error.newsAdderr).end();
		}
	});
	ep.fail(function( err ){
		next(err);
	});
}

newsControl.prototype.newsDel = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	newsModule.newsDel(ep,[ req.params.nid ]);
	ep.on("success",function( data ){
			res.json( config.info.suc ).end();
		
	});
	ep.fail(function( err ){
		next(err);
	});
}

newsControl.prototype.previews = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	
	newsModule.previews(ep,[req.params.nid]);
	ep.on("success",function( data ){
		// if( req.query.callback ){
		// 	res.jsonp(data).end();
		// }else{
			res.json(data).end();
		// }
		
	});
	ep.fail(function( err ){
		next(err);
	});
}


module.exports=function(){
	return new newsControl();
}
