const moment = require('moment');
const conn = require('../db/db.js');
const showLogin = (req, res) => {
    res.render('../user/login.ejs', {});
};

const showRigister = (req, res) => {
    res.render('../user/register.ejs');
};
const rigister = (req, res) => {
    //检验合法性，是否重复，检验通过，则执行sql语句，返回数据
    if (req.body.username.length <= 0 || req.body.password.length <= 0 || req.body.nickname.length <= 0) {
        return res.send({ msg: '数据不能为空' })
    }
    const sql = 'select count(*) as count from blog_users where username=?';//判断如果数据库用户名数量不等于0，则阻止注册
    conn.query(sql, req.body.username, (err, result) => {
        if (err) return res.send({ msg: '数据库查询失败' })
        if (result[0].count !== 0) return res.send({ msg: '用户名重复' })
        const sql2 = 'insert into blog_users set?';//req.body是接受前端需要查询的数据
        req.body.ctime = moment().format('YYY-MM-DD HH:mm:ss');//添加注册时间
        conn.query(sql2, req.body, (err, result) => {
            if (err) return res.send({ msg: '失败！' });
            res.send({ msg: '注册成功', status: 200 })
        })
    })
};

const login = (req, res) => {

    const sql3 = "select * from blog_users where username=? and password=?";

    conn.query(sql3, [req.body.username, req.body.password], (err, result) => {//根据用户名和用户密码查询数据库，如果用户名并且密码都存在，则会返回数据

        if (err) return res.send({ msg: '登录失败' })
        if (result.length !== 1) {
            return res.send({ msg: '登录失败' });
        }
        //登录成功后，就把用户数据挂载在session中

        req.session.user = result[0];
        req.session.islogin = true;
        res.send({ msg: '登录成功', status: 200 })
    })
}

const loginout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
module.exports = {
    showLogin,
    showRigister,
    rigister,
    login,
    loginout
}