const Order = require('../models/order');
const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
    Product.find()
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
    Product.find()
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
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        console.log(user.cart.items)
        const products = user.cart.items;
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products
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
    req.user.removeFromCart(productId)
    .then(result => {
        return res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
    })

}
exports.getOrders = (req, res, next) => {
    Order.find({ "user.userId" : req.user._id })
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders
        });
    })
    .catch(err => {
        console.log(err)
    })
    
}
exports.postOrder = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map( i => {
            return {
                quantity: i.quantity,
                productData: { ...i.productId._doc}
            }
        });
        const order = new Order({
            user: {
                userId: req.user,
                email: req.user.email,
            },
            products
        })
        return order.save();
    })
    .then(result => {
        return req.user.clearCart();
    })
    .then(() => {
        res.redirect('/orders');
    })
    .catch(err => {
        console.log(err);
    });
}
// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         path: '/checkout',
//         pageTitle: 'Checkout'
//     })
// }