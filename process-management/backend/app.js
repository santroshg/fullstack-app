const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const passport = require('passport');
const goolgeAuthCredentials = require('./config/googleAuthCredentials');
const url = require('./config/config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const boardsRouter = require('./routes/boardsRouter');
const membersRouter = require('./routes/membersRouter');
const pulseRouter = require('./routes/pulseRouter');
const progressHeaderRouter = require('./routes/progressHeaderRouter');
const labelsRouter = require('./routes/labelsRouter');
const acceptRouter = require('./routes/acceptRouter');
const verifyUser = require('./auth/user-verify');
require('./models/googleUser');

require('./auth/auth');


const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [goolgeAuthCredentials.web.cookiesKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

require('./db/dbConnect');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS issue, allowed methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', url.frontendHost);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }
  next();
});

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// API ROUTES
app.use('/api/boards', verifyUser.isLoggedin, boardsRouter);
app.use('/api/members', verifyUser.isLoggedin, membersRouter);
app.use('/api/pulse', pulseRouter);
app.use('/api/headers', progressHeaderRouter);
app.use('/api/labels', labelsRouter);

app.use('/api/accept', acceptRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

module.exports = app;
