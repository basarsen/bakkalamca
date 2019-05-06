const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');

router
    .post('/register', async (req, res) => {
        try {
            const customer = await Customer.findOne({ email: req.body.email });
            if (customer) return res.status(400).send(`${req.body.email} e-posta adresi kullanmda.`);

            const newCustomer = new Customer();
            newCustomer.email = req.body.email;
            newCustomer.setPassword(req.body.password);
            const result = await newCustomer.save();
            res.send(result);
        } catch (error) {
            res.send(err);
        }
    })

    .post('/token', async (req, res) => {
        try {
            const customer = await Customer.findOne({ email: req.body.email });
            if (!customer) return res.status(404).send('Kullanıcı bulunamadı.');

            if (customer.validPassword(req.body.password)) {
                const payload = { _id: customer._id, email: customer.email };
                const token = jwt.sign(payload, process.env.jwtKey);
                res.send({ token });
            }
            else
                return res.status(400).send({ message: "Wrong Password" });

        } catch (error) {
            res.send(error)
        }
    });

module.exports = router;
