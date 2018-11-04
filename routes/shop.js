const express = require('express')
const path = require('path')
const rootDir = require('../util/path')
const adminData = require('./admin')
const router = express.Router()
router.get('/', (req, res, next) => {
    res.render('shop', { 
        hasProducts: adminData.products.length > 0 ,
        products: adminData.products, 
        pageTitle:'Shop',
        activeShop:true
    })
})
module.exports = router