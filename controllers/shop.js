const Product = require('../models/product')
exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/product-list', {
            products: products,
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
    .then(product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    })
    .catch(err => {
        console.log(err)
    })

}
exports.getIndex = (req, res, nex) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/product-list', {
            products: products,
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
    req.user.getCart()
    .then(cartProducts => {
        console.log(cartProducts)
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts
        })

    })
    .catch(err => {
        console.log(err);
    })  
}
exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findById(productId)
    .then(product => {
        req.user.addToCart(product)
        res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
    })
    
}
exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.id;
    req.user.removeItemFromCart(productId)
    .then(result => {
        return res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
    })

}
// exports.getOrders = (req, res, next) => {
//     req.user.getOrders({ include: ['products'] })
//     .then(orders => {
//         console.log("orders: ",orders)
//         res.render('shop/orders', {
//             path: '/orders',
//             pageTitle: 'Your Orders',
//             orders
//         });
//     })
//     .catch(err => {
//         console.log(err)
//     })
    
// }
exports.postOrder = (req, res, next) => {
    req.user.addOrder()
    .then(result => {
        res.redirect('/orders')
    })
    .catch(err => {
        console.log(err)
    })
}
// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         path: '/checkout',
//         pageTitle: 'Checkout'
//     })
// }