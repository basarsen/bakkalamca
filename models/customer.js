const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    hash: String,
    salt: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

customerSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

customerSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;