const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router

    .get('/', async (req, res) => {
        const result = await Category.find();
        res.send(result);
    })

    .post('/', async (req, res) => {
        const category = new Category(req.body);
        const result = await category.save();

        if (req.files && req.files.image) {
            const img = req.files.image;
            img.mv(`public/images/category/${category._id}.jpg`, err => {
                if (err) console.log(err);
            });
        }

        res.send(result);
    });

module.exports = router;