/* eslint-disable spaced-comment */
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://e-baron.github.io'],
};

const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const categorieRouter = require('./routes/categorie');
const subCategorieRouter = require('./routes/subCategory');
const authsRouter = require('./routes/auths');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/categories', categorieRouter);
app.use('/subCategories', subCategorieRouter);
app.use('/auths', authsRouter);

module.exports = app;
