const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    email: String,
    password: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;