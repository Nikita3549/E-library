const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nikita09022009',
    database: 'booksManagment'
})