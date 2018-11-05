const Product = require('../models/product')
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            hasProducts: products.length > 0,
            products: products,
            pageTitle: 'All Products',
            path: '/',
            activeShop: true
        })
    })
}
exports.getIndex = (req, res, nex) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            hasProducts: products.length > 0,
            products: products,
            pageTitle: 'Shop',
            path: '/',
            activeShop: true
        })
    })
}
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path : '/cart',
        pageTitle:'Your Cart'
    })
}
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    })
}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}