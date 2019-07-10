const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
//导入session中间件，固定用法
const session = require('_express-session@1.16.2@express-session');
app.use(
    session({
        secret: '这是加密的密钥',
        resave: false,
        saveUninitialized: false
    })
)

app.set('view engine', 'ejs');//固定用法

app.set('views', path.join(__dirname, './views'));

app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules'), { root: __dirname }));
//MVC 分层架构 
//module: 数据库模型，数据库操作模块
//view:视图层，发送异步请求，渲染页面
//controller:业务逻辑处理层，包括入口文件，路由模块

//遍历路由模块的文件夹，app可以使用所有路由
fs.readdir(path.join(__dirname, './router'), (err, filename) => {
    filename.forEach(fname => {

        let router = require('./router/' + fname);
        app.use(router)
    })
})

app.listen(80, () => {
    console.log('running at http://127.0.0.1');

})