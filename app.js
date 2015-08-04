//加载express模块
var express = require('express');
//导入markdown模块
var markdown = require('markdown-js');
//引入path模块
var path = require('path');	
//设置端口
var port = process.env.PORT || 3000;
//启动一个web服务器
var app = express();
//var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var sta = require('static')
//var router = require('router')
//设置视图的根目录
//app.set('views', __dirname + '/views');
app.set('views', './views')

//设置视图的模块引擎
app.set('view engine', 'jade')

//
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' }));
app.use(bodyParser.json());                          // parse application/json
app.use(bodyParser.urlencoded({ extended: true }));  // parse application/x-www-form-urlencoded
app.use(multer());                                   // parse multipart/form-data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));  
//app.use(app.router);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());  

//监听这个端口
app.listen(port);

//打印端口信息
console.log("Express server listening on:" + port); 

//index page
//路由编写
app.get('/', function(req, res) {
    res.render('index', {
        title: '首页'
    })
})

//detail page
//路由编写
app.get('/detail', function(req, res) {
    res.render('detail', {
        title: '详情页'
    })
})

//admin page
//路由编写
app.get('/admin', function(req, res) {
    res.render('admin', {
        title: '后台录入页'
    })
})

//list page
//路由编写
app.get('/list', function(req, res) {
    res.render('list', {
        title: '列表页'
    })
})

//markdown测试代码
app.get('/markdown', function(req, res) {
    res.render('blogs/java_note.md', {layout: false});
})

/*<span style="white-space: normal; background-color: #ffffff;">var fs = require('fs');</span>  
// ...   
// Express 3.x 中不再提供register方法, 这个方式由 flovex 提供  */
var fs = require('fs');
app.engine('md', function(path, options, fn) {
    fs.readFile(path, 'utf8', function(err, str) {
        if (err) return fn(err);
        str = markdown.parse(str).toString();
        fn(null, str);
    });
});

//改变博客文章路径
app.get('/blogs/:title.html', function(req, res, next) {  
    var path = [  
        'blogs/',  
        req.params.title, '.md'  
    ].join('');  
      
    console.log(path)  
    res.render(path, {layout: false});  
})  

//添加对文件是否存在的判断
app.get('/blogs/:title.html', function(req, res, next) {  
      
    var urlPath = [  
        'blogs/',  
        req.params.title, '.md'  
    ].join('');  
      
    var filePath = path.normalize('./' + urlPath);  
    path.exists(filePath, function  (exists) {  
        if(!exists) {  
            next();  
        } else {  
            res.render(urlPath, {layout: false});  
        }  
    });  
  
})  

//添加404处理
app.get('*', function(req, res) {  
    console.log('404 handler..')  
    res.render('404', {  
        status: 404,  
        title: 'NodeBlog',  
    });  
})
