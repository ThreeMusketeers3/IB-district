var productTypeControl = function(){}

//商品分类
productTypeControl.prototype.typeList = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	if( req.params.pid ){
		typeModule.typeList(ep,[ req.params.pid ]);
	}else{
		typeModule.typeList(ep);
	}
	
	ep.on("success",function( data ){
		res.json(data);
	});
	ep.fail(function( err ){
		next(err);
	});
}

productTypeControl.prototype.typeAdd = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	typeModule.typeAdd(ep,[ req.body.typename,req.body.typeinfo,req.body.pid ]);
	ep.on("success",function( data ){
		if( data.insertId ){
			res.json( config.info.suc ).end();
		}else{
			res.json(config.error.typeAdderr).end();
		}
	});
	ep.fail(function( err ){
		next(err);
	});
}

productTypeControl.prototype.typeDel = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	typeModule.typeDel(ep,[ req.params.tid ]);
	ep.on("success",function( data ){
		res.json( config.info.suc ).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

module.exports=function(){
	return new productTypeControl();
}