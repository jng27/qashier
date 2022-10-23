require('dotenv').config({path : '../env'})
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('server:server');
var http = require('http');
var index = require('./routes/index');
var user = require('./routes/users');
var carpark = require('./routes/carpark');
var app = express();
app.set('trust proxy', 1) // Express will have knowledge that it's sitting behind a proxy and that the X-Forwarded-* header fields may be trusted
app.use(function(req, res, next) {
    var frontendUrl = "http://localhost:3000"
    if (frontendUrl.slice(-1) == "/") {
        frontendUrl = frontendUrl.slice(0, -1); 
    }
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append("Access-Control-Allow-Origin", [frontendUrl]);
    res.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-PINGOTHER, Content-Type, Accept, Authorization");
    next();
});
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
* Get port from environment and store in Express.
*/
var port = normalizePort(process.env.PORT || '4001');
app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(index);
app.use(user);
app.use(carpark);

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


var server = http.createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));
// server.on('error', onError);
// server.on('listening', onListening);

module.exports = app;
