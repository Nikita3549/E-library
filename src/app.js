const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');
const { router } = require('./routes.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(router);

module.exports = { app };