const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'nodeuser',
    password: 'nodeuser',
    database: 'nodeshop'
})
module.exports = pool.promise()