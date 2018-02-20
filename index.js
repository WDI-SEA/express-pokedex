var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/pokemon'));




var server = app.listen(process.env.PORT || 3000);

module.exports = server;
