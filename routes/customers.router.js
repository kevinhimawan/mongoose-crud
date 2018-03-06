var express = require('express');
var router = express.Router();

const { createCustomers,readCustomers, updateCustomers } = require('../controllers/customers.controller')

router.post('/create',createCustomers)
router.get('/read',readCustomers)
router.put('/update/:id', updateCustomers)

module.exports = router