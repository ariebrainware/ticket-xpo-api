const createError = require('http-errors');
const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const messageRouter = require('./api/message')
const indexRouter = require('./api/index')
const ticketsRouter = require('./api/ticket')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())

app.use('/', messageRouter)
app.use('/xpo/v1', indexRouter)
app.use('/tickets',ticketsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  res.status(500).send({message:'error'});
});

module.exports = app;
