const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'Members' },
    days : {type: Number},
    out_date : {type: Date, default: Date.now},
    due_date: {type: Date, default: Date.now},
    in_date: {type: Date, default: null},
    fine: {type: Number,default: null},
    booklist: [{type: Schema.Types.ObjectId, ref: 'Books' }]
})

const Transactions = mongoose.model('Transactions', transactionSchema)

module.exports = Transactions