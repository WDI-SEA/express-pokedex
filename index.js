require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Imports all routes from the pokemon routes file
app.use('/', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;