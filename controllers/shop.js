const Product = require('../models/product')
const Cart = require('../models/cart')
exports.getProducts = (req, res, next) => {
    Product.findAll()
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
    Product.findByPk(productId)
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
    Product.findAll()
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
    .then(cart => {
        return cart.getProducts();
    })  
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
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: productId}})
    })
    .then(products => {
        let product;
        if(products.length > 0){
            product = products[0]
        }
        if(product){
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(productId)
    })
    .then(product => {
        return fetchedCart.addProduct(product, {
            through: {
                quantity: newQuantity
            }
        })
    })
    .then(() => {
        res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
    })
}
exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.id;
    req.user.getCart()
    .then( cart => {
        return cart.getProducts({where : { id: productId }})
    })
    .then(products => {
        const product = products[0]
        return product.cartItem.destroy()
    })
    .then(result => {
        return res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
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