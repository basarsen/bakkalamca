const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basketSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    content: [{ type: Schema.Types.ObjectId, ref: 'Product', }]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const Basket = mongoose.model('Basket', basketSchema);
module.exports = Basket;
