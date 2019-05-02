const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router

    .post('/', async (req, res) => {
        const customer = new Customer(req.body);
        const result = await customer.save();
        res.send(result);
    })

module.exports = router;