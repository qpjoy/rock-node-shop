const Product = require('../models/product')
const Cart = require('../models/cart')
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
exports.getProduct = (req, res, next) => {
    const productId = req.params.id
    Product.findById(productId, product => {
        res.render('shop/product-details', { product, 
            pageTitle: product.title,
            path: '/products'
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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for(product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if (cartProductData ){
                    cartProducts.push({
                        product: product,
                        qty: cartProductData.qty
                    })
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        })
    })
    
}
exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price)
    })
    res.redirect('/cart')
}
exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.id;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price)
        res.redirect('/cart')
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