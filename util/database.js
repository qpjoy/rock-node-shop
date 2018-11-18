const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodeshop', 'nodeuser','nodeuser',{
    dialect: 'mysql',
    host: 'localhost',
    logging: console.log
})
module.exports = sequelize;