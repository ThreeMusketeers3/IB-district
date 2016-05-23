$(function(){
	var router = new Router({
	    container: '#container',
	    enterTimeout : 200,
	    leaveTimeout : 200
	});
	//显示管理员列表
	var adminList = {
		 url : "/adminList",
		 className : "adminList",
		 ajaxData : function(){
		 	var that = this;
		 	return $._ajax({
		 		url  : "/admin/admin",
		 		type : "get"
		 	}).done(function( data ){
		 		that.data = data;
		 	});
		 },
		 render : function(){
		 	return ejs.render($("#adminList").html(),{admins:this.data});
		 }
	}
	//添加管理员
	var adminAdd = {
		url : "/adminAdd",
		render : function(){
			return $("#adminAdd").html();
		},
		bind : function(){
			var t = $(this);
			$(this).find("#sub").click(function(){
				var aname = t.find("#aname").val();
				var email = t.find("#email").val();
				var password = t.find("#password").val();
				if( $.validate.isEmpty(aname) == false ){
					return t.find(".alert").alertMes({message:"用户名不能为空"});
				}
				if( $.validate.isEmpty(email) == false ){
					return t.find(".alert").alertMes({message:"邮箱不能为空"});
				}
				if( $.validate.isEmpty(password) == false ){
					return t.find(".alert").alertMes({message:"密码不能为空"});
				}
				if( $.validate.isEmail(email) == false ){
					return t.find(".alert").alertMes({type:"danger",message:"邮箱格式不正确"});
				}
				
				//提交ajax 
				$._ajax({
					url : "/admin/admin",
					data : {"aname":aname,"email":email,"password":password}
				}).done(function( obj ){
					if( obj.code ){
						//如果增加成功，返回管理员列表
						location.href = "/admin/index#/adminList";
					}else{
						$(this).find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
				
			});
		}
	}
	
	//删除管理员
	var adminDel = {
		url : "/adminDel/:id",
		ajaxData : function(){
		 	var t = this;    //this代表当前路由
		 	$._ajax({
		 		url  : "/admin/admin/" + t.params.id,
		 		type : "delete"
		 	}).done(function(){
		 		location.href = "/admin/index#/adminList";
		 	});
		 	
		 	return false;    //停止路由
		}
		
	}
	
	
	/* 商品分类路由 */
	var typeList = {
		url : "/typeList",
		ajaxData : function(){
		 	var that = this;
		 	return $._ajax({
		 		url  : "/admin/producttype",
		 		type : "get"
		 	}).done(function( data ){
		 		that.data = data;
		 	});
		 },
		 render : function(){
		 	return ejs.render($("#typeList").html(),{types:this.data});
		 }
	}

	var typeAdd = {
		url : "/typeAdd",
		render : function(){
			return ejs.render($("#typeAdd").html(),{types:this.data});
		},
		ajaxData : function(){
		 	var that = this;
		 	return $._ajax({
		 		url  : "/admin/producttype/0",
		 		type : "get"
		 	}).done(function( data ){
		 		that.data = data;
		 	});
		 },
		bind : function(){
			var t = $(this);
			$(this).find("#sub").click(function(){
				var typename = t.find("#typename").val();
				var typeinfo = t.find("#typeinfo").val();
				var pid = t.find("#pid").val();
				if( $.validate.isEmpty(typename) == false ){
					return t.find(".alert").alertMes({message:"分类名不能为空"});
				}
				if( $.validate.isEmpty(typeinfo) == false ){
					return t.find(".alert").alertMes({message:"分类描述不能为空"});
				}
				
				//提交ajax 
				$._ajax({
					url : "/admin/producttype",
					data : {"typename":typename,"typeinfo":typeinfo,"pid":pid}
				}).done(function( obj ){
					if( obj.code ){
						//如果增加成功，返回管理员列表
						location.href = "/admin/index#/typeList";
					}else{
						t.find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
				
			});
		}
	}
	
	var typeDel = {
		url : "/typeDel/:tid",
		ajaxData : function(){
		 	var t = this;    //this代表当前路由
		 	$._ajax({
		 		url  : "/admin/producttype/" + t.params.tid,
		 		type : "delete"
		 	}).done(function(){
		 		location.href = "/admin/index#/typeList";
		 	});
		 	
		 	return false;    //停止路由
		}
	}
	
	//商品管理路由
	var proList = {
		url : "/proList",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/product",
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#proList").html(),{products:this.data});
		}
	}
	
	var proAdd = {
		url : "/proAdd",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/producttype",
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#proAdd").html(),{types:this.data});
		},
		bind : function(){
			var t = $(this);
			t.find("#sub").click(function(){
				var pname = t.find("#pname").val();
				var price = t.find("#price").val();
				var strock = t.find("#strock").val();
				var imgpath = t.find("#imgpath").val();
				var type = t.find("#type").val();
				
				var data = new FormData();
				data.append("pname",pname);
				data.append("price",price);
				data.append("strock",strock);
				data.append("type",type);
				data.append("upfile",t.find("#imgpath").get(0).files[0]);
				
				$._ajax({
					url  : "/admin/product",
					data : data,
					cache: false,  
			        contentType: false,  
			        processData: false
				}).done(function( obj ){
					if( obj.code ){
						location.href = "/admin/index#/proList";
					}else{
						t.find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				})
			});
			
			t.find("#imgpath").change(function(){
				var file = this.files[0];
				if( file.type.indexOf("image") == -1 ){
					$(this).val("");
					t.find(".alert").alertMes({type:"danger",message:"只能上传图片格式"});
					return;
				}
				if( file.size >(1024*512) ){
					$(this).val("");
					t.find(".alert").alertMes({type:"danger",message:"只能上传小于512K的图片"});
					return;
				}
				
				var fr = new FileReader();
				fr.readAsDataURL(file); 
				fr.onload = function(){
					$("#showimg").attr("src",fr.result);
					$("#showimg").attr("style","height:150px");
				}
				
			});
		}
	}
	
	var proDel = {
		url : "/proDel/:pid",
		ajaxData : function(){
			var t = this;
			$._ajax({
				url  : "/admin/product/" + t.params.pid,
				type : "delete"
			}).done(function(){
				location.href = "/admin/index#/proList";
			});
			
			return false;
		}
	}
	
	
	//新闻管理
	var newsList = {
		url : "/newsList",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/news",
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#newsList").html(),{news:this.data});
		}
	}
	
	var newsAdd = {
		url : "/newsAdd",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/admin",
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#newsAdd").html(),{admins:this.data});
		},
		bind : function(){
			var t = $(this);
			t.find("#editor").wysiwyg();
			$(this).find("#sub").click(function(){
				var ntitle = t.find("#ntitle").val();
				var content = t.find("#editor").html();
				var author = t.find("#author").val();
				if( $.validate.isEmpty(ntitle) == false ){
					return t.find(".alert").alertMes({message:"新闻标题不能为空"});
				}
				
				//提交ajax 
				$._ajax({
					url : "/admin/news",
					data : {"ntitle":ntitle,"content":content,"author":author}
				}).done(function( obj ){
					if( obj.code ){
						//如果增加成功，返回管理员列表
						location.href = "/admin/index#/newsList";
					}else{
						$(this).find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
				
			});
		}
	}
	
	var newsDel = {
		url : "/newsDel/:nid",
		ajaxData : function(){
			var t = this;
			$._ajax({
				url  : "/admin/news/" + t.params.nid,
				type : "delete"
			}).done(function(){
				location.href = "/admin/index#/newsList";
			});
			
			return false;
		}
	}
	
	var previews = {
		url : "/previews/:nid",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/admin/news/" + that.params.nid,
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#newspreviews").html(),{n:this.data[0]});
		}
	}


	//默认页面
	var home = {
		url : "/",
		render : function(){
			return "<h1>后台</h1>"
		}
	}
	
	router.push(adminList)
		  .push(adminAdd)
		  .push(adminDel)
		  .push(typeList)
		  .push(typeAdd)
		  .push(typeDel)
		  .push(proList)
		  .push(proAdd)
		  .push(proDel)
		  .push(newsList)
		  .push(newsAdd)
		  .push(newsDel)
		  .push(previews)
		  .push(home)
		  .setDefault('/').init();
});
