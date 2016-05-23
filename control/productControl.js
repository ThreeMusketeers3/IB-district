var productControl = function (){}

//商品管理
productControl.prototype.proList = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	productModule.proList(ep);
	ep.on("success",function( data ){
		res.json(data);
	});
	ep.fail(function( err ){
		next(err);
	});
}

productControl.prototype.proAdd = function( req,res,next ){
	var ep = new EventProxy();
	
	ep.all("fileup","conn",function( filename,conn ){
		var url = "/upfile/" + filename;
		productModule.proAdd(ep,conn,[ req.body.pname,req.body.price,req.body.strock,url,req.body.type ]);
	})
	util.upfile(ep,req.file);   //上传文件
	dataSource.getConn( ep );   //获取连接
	
	ep.on("success",function( data ){
		if( data.insertId ){
			res.json( config.info.suc ).end();
		}else{
			res.json(config.error.proAdderr).end();
		}
	});
	ep.fail(function( err ){
		next(err);
	});
}

productControl.prototype.proDel = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	productModule.proDel(ep,[ req.params.pid ]);
	ep.on("success",function( data ){
		res.json( config.info.suc ).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}

module.exports = function (){
	return new productControl();
}
