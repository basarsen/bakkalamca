const express = require('express');
const router = express.Router();
const Basket = require('../models/basket');
const Order = require('../models/order');

router

    .post('/', async (req, res) => {
        if (req.body.creditCard.number !== '4242424242424242')
            return res.status(400).send('Ödeme alınamadı');

        const basket = await Basket.findOne({customer: req.customer._id});
        
        if(!basket || !basket.content.length) return res.status(404).send('Sepet bulunamadı.');

        const order = new Order({
            customer: req.customer._id,
            content: basket.content
        });

        const result = await order.save();
        basket.content = [];
        await basket.save();
        res.send(result);
    });

module.exports = router;