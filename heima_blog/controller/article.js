const moment = require('moment');
const conn = require('../db/db.js');
const marked = require('marked');

const articlePage = (req, res) => {
    if (!req.session.islogin) return res.redirect('/');//没有登录，据强制转到首页
    //将req.session这个对象结构赋值给data
    let { user, islogin } = req.session;
    let data = {
        user,
        islogin
    }
    res.render('./add.ejs', data);
}
const addArticle = (req, res) => {
    let body = req.body;
    body.ctime = moment().format('YYY-MM-DD HH:mm:ss');//添加发表时间
    const sql = 'insert into blog_article set?';
    conn.query(sql, body, (err, result) => {
        if (err) return res.send({ msg: '发布失败' })
        res.send({ msg: '发表成功', status: 200, insertId: result.insertId })
    })
}
const infoPage = (req, res) => {
    let id = req.params.id;
    const sql2 = 'select * from blog_article where id=?';
    conn.query(sql2, id, (err, result) => {
        if (err) return res.send({ msg: '查找失败' });
        if (result.length !== 1) return res.redirect('/');
        //利用marked将文本转换成html文件
        let html = marked(result[0].content);
        result[0].content = html;
        res.render('./info.ejs', { user: req.session.user, islogin: req.session.islogin, article: result[0] })
    })
}
const articleEdit = (req, res) => {
    let id = req.params.id;
    const sql3 = 'select * from blog_article where id=?';
    conn.query(sql3, id, (err, result) => {
        if (err) return res.send({ msg: '查询失败' })
        if (result.length !== 1) return res.redirect('/');
        res.render('./edit.ejs', { user: req.session.user, islogin: req.session.islogin, article: result[0] })
    })
}

const update = (req, res) => {

    const sql4 = 'update blog_article set? where id=?';
    conn.query(sql4, [req.body, req.body.id], (err, result) => {
        if (err) return res.send({ msg: '修改失败' });
        if (result.affectedRows !== 1) return res.send({ msg: '文章不存在' })
        res.send({ status: 200, msg: '修改成功' })
    })
}
module.exports = {
    articlePage,
    addArticle,
    infoPage,
    articleEdit,
    update
}
