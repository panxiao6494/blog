const conn = require('../db/db.js');
const showIndex = (req, res) => {

    const pagesize = (req.query.pagesize) || 3;
    const nowpage = Number(req.query.page) || 1;
    const sql = `select blog_article.id, blog_article.title, blog_article.ctime, blog_users.nickname 
    from blog_article 
    LEFT JOIN blog_users 
    ON blog_article.authorId=blog_users.id
    ORDER BY blog_article.id desc limit ${nowpage}, ${pagesize};
    select count(*) as count from blog_article`;
    conn.query(sql, (err, result) => {
        if (err) {
            return res.render('index.ejs', {
                user: req.session.user,
                islogin: req.session.islogin,
                articles: []
            })

        }
        const totalpage = Math.ceil(result[1][0].count / pagesize);
        res.render('index.ejs', {
            user: req.session.user,
            islogin: req.session.islogin,
            articles: result[0],
            totalpage: totalpage,
            nowpage: nowpage
        })
    })

}

module.exports = {
    showIndex,
}

