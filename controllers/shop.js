const Product = require('../models/product')
const Cart = require('../models/cart')
exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            products: rows,
            pageTitle: 'All Products',
            path: '/products',
            activeShop: true
        })
    })
    .catch(err => {
        console.log(err)
    })
}
exports.getProduct = (req, res, next) => {
    const productId = req.params.id
    Product.findById(productId) 
    .then(( [product] ) => {
        res.render('shop/product-details', {
            product: product[0],
            pageTitle: product[0].title,
            path: '/products'
        })
    })
    .catch(err => {
        console.log(err)
    })
}
exports.getIndex = (req, res, nex) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            products: rows,
            pageTitle: 'All Products',
            path: '/',
            activeShop: true
        })
    })
    .catch(err => {
        console.log(err)
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