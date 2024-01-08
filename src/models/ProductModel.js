const { Schema, default: mongoose } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'product description/details is required']
    },
    rating: {
        type: Number,
        default: 1
    },
    images: { 
        type: [String], 
        required: [true, 'product image is required']
    },
    price: {
        type: Number,
        required: [true, 'product price is required'],
        min: [0, 'price cannot be less than $0']
    },
    quantity: {
        type: Number,
        required: [true, 'provide number of quantity available'],
        default: 1
    }
}, 
{
    timestamps: true
})

const product = mongoose.model('Product', productSchema);

module.exports = product