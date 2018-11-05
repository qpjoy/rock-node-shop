const products = []
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        productCSS: true,
        formsCSS: true,
        path: '/admin/add-product',
        activeAddProduct: true
    })
}
exports.postAddProduct = (req, res, next) => {
    products.push({
        title: req.body.title
    })
    res.redirect('/')
}
exports.getProducts = (req, res, next) => {
    res.render('shop', {
        hasProducts: products.length > 0,
        products: products,
        pageTitle: 'Shop',
        path: '/',
        activeShop: true
    })
}
