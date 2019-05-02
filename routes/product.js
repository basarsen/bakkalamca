const express = require('express');
const router = express.Router();
const Product = require('../models/products');

router

    .get('/:categoryId', async (req, res) => {
        const result = await Product.find({ category: req.params.categoryId });
        res.send(result);
    })

    .post('/', async (req, res) => {
        const product = new Product(req.body);
        const result = await product.save();

        if (req.files && req.files.image) {
            const img = req.files.image;
            img.mv(`public/images/product/${product._id}.jpg`, err => {
                if (err) console.log(err);
            });
        }
        res.send(result);
    })

    .get('/search/:str', async (req, res) => {
        if(!req.params.str) return res.status(404).send('Not found');
        const result = await Product.find({ title: new RegExp(req.params.str, "i") }).limit(20);
        res.send(result);
    })

module.exports = router;