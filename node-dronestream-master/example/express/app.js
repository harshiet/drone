var express = require('express')
  , routes = require('./routes')
  , app = express()
  , path = require('path')
  , server = require("http").createServer(app)
  ;

//console.log(app.configure);
//app.configure(function() {

var favicon = require('serve-favicon');
var logger = require('morgan');
var errorHandler = require('errorhandler');

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade', { pretty: true });
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
//    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
//});

//app.configure('development', function () {
    app.use(errorHandler());
    app.locals.pretty = true;
//});

app.get('/', routes.index);

/*
 * Important:
 *
 * pass in the server object to listen, not the express app
 * call 'listen' on the server, not the express app
 */
// should be require("dronestream").listen(server);
require("../../index").listen(server);
server.listen(3000);
