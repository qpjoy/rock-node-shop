const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            productData: {
                type: Object,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            }
        }
    ],
    user: {
        email: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
});
orderSchema.set('timestamps', true);

module.exports = mongoose.model('Order', orderSchema);