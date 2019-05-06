const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    content: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: { createdAt: 'createdAt' } });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;