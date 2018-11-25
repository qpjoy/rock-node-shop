const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Product', ProductSchema)