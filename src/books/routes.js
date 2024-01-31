const { Router } = require('express');
const dbConnection = require('../dbConnection')
const router = Router();
const books = require('./index.js');

router.post('/getBooks', (req, res) => {
    books.sendBooks.handle(req, res, dbConnection, req.body);
});
router.get('/books/:bookId', (req, res) => {
    new books.sendFullPageData(req, res, dbConnection).handle()
});

module.exports = router;