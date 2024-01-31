const { Router } = require('express');
const dbConnection = require('../dbConnection')
const router = Router();
const books = require('./sendBooks');

router.post('/getBooks', (req, res) => {
    books.sendBooks(req, res, dbConnection, req.body);
});

module.exports = router;