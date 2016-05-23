var adminrouter = express.Router();
															 
adminrouter.all("/index",adminIndexControl.index);
//restful接口规范
adminrouter.get("/admin",adminIndexControl.adminList);       //获取
adminrouter.post("/admin",adminIndexControl.adminAdd);       //增加
adminrouter.delete("/admin/:id",adminIndexControl.adminDel); //删除

//商品分类API
adminrouter.get("/producttype",productTypeControl.typeList); 
adminrouter.get("/producttype/:pid",productTypeControl.typeList);
adminrouter.post("/producttype",productTypeControl.typeAdd);       
adminrouter.delete("/producttype/:tid",productTypeControl.typeDel); 

//商品管理API
adminrouter.get("/product",productControl.proList);       
adminrouter.post("/product",upload.single('upfile'),productControl.proAdd);      
adminrouter.delete("/product/:pid",productControl.proDel);

//新闻管理API
adminrouter.get("/news",newsControl.newsList);
adminrouter.get("/news/:nid",newsControl.previews);
adminrouter.post("/news",newsControl.newsAdd);
adminrouter.delete("/news/:nid",newsControl.newsDel);

module.exports = adminrouter;