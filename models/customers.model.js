const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name : {type: String},
    memberId: {type: String},
    address: {type: String},
    zipcode: {type: String},
    phone: {type: String}
})

const Customers = mongoose.model('Customers', customerSchema)

module.exports = Customers