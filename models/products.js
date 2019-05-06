const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    quantity: Number,
    discount: Number,
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
