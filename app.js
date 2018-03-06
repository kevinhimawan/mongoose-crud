const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var index = require('./routes/index');
const books = require('./routes/books.router');
const customers = require ('./routes/customers.router')
const transactions = require('./routes/transactions.router')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect Mongoose
mongoose.connect('mongodb://localhost/Mongoose_Crud',(err)=>{
  if(!err){
    console.log(`Connected to database`)
  }
});

app.use('/', index);
app.use('/books', books);
app.use('/customers',customers);
app.use('/transactions',transactions)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
