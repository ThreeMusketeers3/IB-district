var newsControl = function() {}

newsControl.prototype.newsList = function( req,res,next ) {
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.newsList(ep);
	ep.on("success",function( data ) {
		res.json(data);
//		res.render("admin/adminList.html",{admins:data});
	});
	ep.fail(function( err ) {
		next(err);
	});
}

newsControl.prototype.newsAdd = function( req,res,next ) {
	var ep = new EventProxy();
	dataSource.getConn(ep);
	adminModule.adminAdd(ep,[req.body.aname,req.body.email,req.body.password]);
	ep.on("success",function( data ) {
		if( data.insertId ) {
			res.json(config.info.suc).end();
		} else {
			res.json(config.error.adminAddErr).end();
		}
	});
	ep.fail(function( err ) {
		next(err);
	});
}

newsControl.prototype.newsDel = function( req,res,next ) {
	var ep = new EventProxy();
	dataSource.getConn( ep );
	adminModule.newsDel( ep,[req.params.id] );
	ep.on("success",function( data ) {
		res.json(config.info.suc).end();
	});
	ep.fail(function( err ) {
		next(err);
	});
}

module.exports = function() {
    return new newsControl();
}