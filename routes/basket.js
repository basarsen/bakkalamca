const express = require('express');
const router = express.Router();
const Basket = require('../models/basket');
const _ = require('lodash');

router

    .get('/', async (req, res) => {
        const basket = await Basket.findOne({ customer: req.customer._id }).populate('content');
        res.send(basket);
    })

    .post('/', async (req, res) => {
        try {
            const basket = await Basket.findOneAndUpdate({ customer: req.customer._id }, req.body);
        // Populate vardı.

        if (!basket) {
            const newBasket = new Basket({
                customer: req.customer._id
            });

            newBasket.content.push(req.body.productId);
            const newBasketResult = await newBasket.save();

            return res.send(newBasketResult);
        }

        const index = basket.content.indexOf(req.body.productId);
        if(req.body.remove && index !== -1){
            basket.content.splice(index, 1);
        }else 
        basket.content.push(req.body.productId);


        basket.save().then(async () => {
            const result = await Basket.findOneAndUpdate({ customer: req.customer._id }).populate('content');
            res.send(result);
        });
        } catch (error) {
            res.send(error);
        }
        


    });

    
module.exports = router;