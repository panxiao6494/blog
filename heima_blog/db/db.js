const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql_001',
    // 开启执行多条Sql语句的功能
    multipleStatements: true
});

module.exports = conn;