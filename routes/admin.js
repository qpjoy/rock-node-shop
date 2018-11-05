const express = require('express')
const ProductController = require('../controllers/product')
const router = express.Router()

router.get('/add-product', ProductController.getAddProduct)
router.post('/add-product', ProductController.postAddProduct)
exports.router = router
exports.products = ProductController.products