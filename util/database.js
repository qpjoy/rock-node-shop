const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodeshop', 'nodeuser','nodeuser',{
    dialect: 'mysql',
    host: 'localhost'
})
module.exports = sequelize;