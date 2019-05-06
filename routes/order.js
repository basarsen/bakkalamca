const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Basket = require('../models/basket');
const Order = require('../models/order');

router

  .get('/', async (req, res) => {
    const basket = await Order.find({ customer: req.customer._id }).populate('content');
    if (!basket) return res.status(404).send('Sipariş bulunamadı.');
    res.send(basket);
  })

  .post('/', async (req, res) => {

    try {
      const basket = await Basket.findOne({ customer: req.customer._id });
      if (!basket || !basket.content.length) return res.status(404).send('Sepet bulunamadı.');

      const order = new Order({
        customer: req.customer._id,
        content: basket.content
      });

      const result = await order.save();
      basket.content = [];
      await basket.save();
      res.send(result);

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.emailuser,
          pass: process.env.emailpass
        }
      });

      var mailOptions = {
        from: process.env.emailuser,
        to: req.customer.email,
        subject: 'Siparişiniz alındı!',
        text: `${req.body.total} TL tutarındaki siparişiniz elimize ulaştı!`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;