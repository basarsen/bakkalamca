const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');
const upload = require('express-fileupload');

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(upload());

app.use('/auth', require('./routes/auth'));
app.use('/product', auth, require('./routes/product'));
app.use('/category', auth, require('./routes/category'));
app.use('/customer', auth, require('./routes/customer'));
app.use('/basket', auth, require('./routes/basket'));
app.use('/order', auth, require('./routes/order'));

mongoose.connect(process.env.mongodbUri, { useNewUrlParser: true }, () => console.log('Connected to DB'));
app.listen(process.env.PORT, () => console.log('Server is running...'));
