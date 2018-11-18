const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    databse: 'nodeshop'
})
module.exports = pool.promise()