const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title, 
        price: price, 
        description: description, 
        imageUrl: imageUrl
    });
    product.save()
    .then(result => {
        console.log(result);
        return res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/')
    };
    const productId = req.params.id;
    Product.findById(productId)
    .then(product => {
        if(!product){
            return redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(err => {
        console.log(err);
    })
}
exports.postEditProduct = (req, res, next) => {
    const productId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImage, productId)
    product.save()
    .then(updatedProduct => {
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    })
    .catch(err => {
        console.log(err);
    })
}
exports.postDeleteProduct = (req, res, next) => {
    const productId = req.params.id
    Product.deleteById(productId)
    .then(result => {
        return res.redirect('/admin/products');
    })
    .catch(err => console.log(err))    
}
