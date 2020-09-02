var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');
var app = express();
var Server = requier('http').Server(app)

app.use(session({
  secret: 'gbbasel',
  resave: false,
  saveUninitialized: true,
}))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var streamRouter = require('./routes/stream')
var roomRouter = require('./routes/room');
const { Console } = require('console');

var categories = streamRouter.categories
console.log(categories)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/stream', streamRouter)

categories.forEach(element => {
  app.use(`/${element}/:rooomNum`, roomRouter)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get
app.get('/', (req, res) => {
  res.render('', { roomId: req.params.room })
})



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/logout', (req, res) => {
  req.session.regenerate();
})

module.exports = app;
