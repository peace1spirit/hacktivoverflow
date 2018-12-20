var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')

var userRouter = require('./routes/userRouter');
var answerRouter = require('./routes/answerRouter');
var questionRouter = require('./routes/questionRouter');

var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const dbUrl = process.env.DB_URL;
//const dbUrl = 'mongodb://localhost:27017/hackoverflow2';
mongoose.connect(dbUrl, (err) => {
    if(!err) {console.log('Connected to Database');}
    else {throw new Error(err);}
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is On'
  })
})

app.use('/users', userRouter);
app.use('/answers', answerRouter);
app.use('/questions', questionRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
