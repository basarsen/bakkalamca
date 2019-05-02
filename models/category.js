const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: String,
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;