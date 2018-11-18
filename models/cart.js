const fs = require('fs')
const path = require('path');
const rootDir = require('../util/path');

const cart_file = path.join(
    rootDir,
    'data',
    'cart.json'
);
module.exports = class Cart{
    static addProduct(productId, productPrice){
        let cart = {
            products: [],
            totalPrice: 0
        };
        fs.readFile(cart_file, (err, fileContent) => {
            if(!err){
                cart = JSON.parse(fileContent);
            }
            const productExistingIndex = cart.products.findIndex( p => p.id === productId);
            const existingProduct = cart.products[productExistingIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[productExistingIndex] = updatedProduct;
            }
            else {
                updatedProduct = {id:productId, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(cart_file, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }
    static deleteProduct(id, productPrice){
        fs.readFile(cart_file, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find( p => p.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter( pro => pro.id !== id );
            updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice;
            fs.writeFile(cart_file, JSON.stringify(updatedCart), err => {
                console.log(err)
            })
        })
    }
}