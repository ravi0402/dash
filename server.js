var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(__dirname +  '/'));

var appRoutes = require('./app_api/routes/api');

app.set('view engine', 'jade');

app.use('/api', appRoutes);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const hostname = 'localhost';
const port = 3000;

const server = app.listen(port, hostname, function() {
  console.log("Server running at http://" + hostname +":" + port);
});


//app.use(express.static(__dirname + '/public'));


module.exports = app;

