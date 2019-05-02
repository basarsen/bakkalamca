const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');

router
    .post('/register', async (req, res) => {
        const customer = await Customer.findOne({ email: req.body.email });
        if (customer) return res.status(400).send(`${req.body.email} e-posta adresi kullanmda.`);

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            const customer = new Customer({
                email: req.body.email,
                password: hash
            });
            const result = await customer.save();
            res.send(result);
        });
    })

    .post('/token', async (req, res) => {
        try {
            const customer = await Customer.findOne({ email: req.body.email });
            if (!customer) return res.status(404).send('Kullanıcı bulunamadı.');

            const password = await bcrypt.compare(req.body.password, customer.password);
            if (!password) return res.status(401).send('Kullanıcı adı veya şifre yanlış.');

            const token = jwt.sign({ _id: customer._id }, 'somePrivateKey');
            res.send({ token });
        } catch (error) {
            res.send(error)
        }

    });

module.exports = router;