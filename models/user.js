const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    require: true
                }
            }
        ]
    }
})
UserSchema.methods.addToCart = function(product){
    const productCartIndex = this.cart.items.findIndex( p => p.productId.toString() == product._id.toString());
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (productCartIndex >= 0){
        newQuantity = updatedCartItems[productCartIndex].quantity + 1;
        updatedCartItems[productCartIndex].quantity = newQuantity;
    }
    else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();

}
module.exports = mongoose.model('User', UserSchema);