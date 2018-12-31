require('dotenv').config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const app = express();

// SET MIDDLEWARE
app.use(methodOverride('_method'))
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

// GET / - main index of site
app.get('/', function(req, res) {
  res.send('Home Page');
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));
app.use('/faves', require('./routes/faves'));
app.use('/caught', require('./routes/caught'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
