var express = require('express');
var router = express.Router();

const { createBooks, readBooks, updateBooks,deleteBooks,updateStock } = require('../controllers/books.controller')

/* GET users listing. */
router.post('/create', createBooks)
router.get('/read', readBooks)
router.put('/update/:id',updateBooks)
router.delete('/delete/:id',deleteBooks)

router.get('/updateBook', updateStock)

module.exports = router;
