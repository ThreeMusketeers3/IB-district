var otControl = function (){}

otControl.prototype.ot = function( req,res,next ){
	//从数据库获取数据
	//找到模板   //渲染页面输出
	var ep = new EventProxy();
	dataSource.getConn( ep );
	otModule.list(ep);
	ep.on("success",function( data ){
//		res.json(data);
		res.render("ot.html",{admins:data});
	});
	ep.fail(function( err ){
		next(err);
	});
};




module.exports=function(){
	return new otControl();
}
