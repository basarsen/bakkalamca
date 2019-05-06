const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router

    .get('/', async (req, res) => {
        const customer = await Customer.findById(req.customer._id);
        if (!customer) return res.status(404).send('Kullanıcı bulunamadı.');

        res.send(customer);
    })

    .put('/', async (req, res) => {
        try {
            const customer = await Customer.findOneAndUpdate({ _id: req.customer._id }, req.body);
            if (!customer) return res.status(404).send('Kullanıcı bulunamadı.');

            const existingCustomer = await Customer.findOne({ email: req.body.email });
            if (existingCustomer && (existingCustomer.email === req.body.email) && (existingCustomer.email !== req.customer.email)) {
                return res.status(400).send(`${req.customer.email} adresi kullanımda!`);
            }

            const result = await customer.save();
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    });

module.exports = router;