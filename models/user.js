const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
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
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 12,(err, hashedPassword) => {
        if(!err){
            this.password = hashedPassword;
            next();
        }
        else {
            throw new Error('Error encrypting the password');
        }
    })
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
UserSchema.methods.removeFromCart = function (productId){
    const updatedCartItems = this.cart.items.filter( item => item.productId.toString() !== productId.toString())
    this.cart.items = updatedCartItems;
    return this.save();
}

UserSchema.methods.clearCart = function(){
    this.cart = { items: []};
    return this.save();
}
UserSchema.methods.verifyPassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}
module.exports = mongoose.model('User', UserSchema);