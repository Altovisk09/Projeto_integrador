  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  var session = require('express-session')

  



  // routes
  const loginRouter = require('./routes/login');
  const cartRouter = require('./routes/cart');
  const homeRouter = require('./routes/home');
  const userRouter = require('./routes/user');
  const testeRouter = require('./routes/teste');


  //middlewares
  const estaLogado = require('./middlewares/SessionLog');
  const loadMenuData = require('./middlewares/subMenu');

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(session({
    secret: "senha",
    resave: false,
    saveUninitialized: false,
  }))
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  //middlewares
  app.use(estaLogado);
  app.use(loadMenuData);


  //rotas
  app.use('/login', loginRouter);
  app.use('/cart', cartRouter);
  app.use('/profile', userRouter);
  app.use('/', homeRouter);
  app.use('/teste', testeRouter)


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
