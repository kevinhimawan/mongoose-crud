const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    isbn:  {type: String},
    title: {type: String},
    author: {type: String},
    category: {type: String},
    stock: {type: Number},
});

const Books = mongoose.model('Books',bookSchema)

module.exports = Books