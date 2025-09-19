const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type:String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    imageUrl: String,
    productVariants: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant" }],
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;