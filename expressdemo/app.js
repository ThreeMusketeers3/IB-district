//引入第三方模块
var express = require("express");
var bodyParser = require('body-parser');

//创建服务器
var app = express();
//配置body解析
app.use(bodyParser.urlencoded({ extended: true }));//配置静态服务器
app.use(express.static('biye'));
//配置404错误 
app.use(function( req,res,next ){
	if( req.xhr ) {
		res.status(404).end();
	} else {
		res.status(404).redirect("/404.html");
	}
});

app.listen(90,function() {
  console.log('服务器开启成功!');
});