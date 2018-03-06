const express = require('express')
const router = express.Router()

const {createTransaction, readTransactions, deleteTransactions, updateTransactions} = require('../controllers/transactions.controller')

router.post('/create',createTransaction)
router.get('/read',readTransactions)
router.delete('/delete/:id',deleteTransactions)
router.put('/update/:id', updateTransactions)

module.exports = router