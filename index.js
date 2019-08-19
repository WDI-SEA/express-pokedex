require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const db = require('./models');
const app = express();
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(ejsLayouts);
app.use(methodOverride('_method'))

// GET / - main index of site
app.get('/', function(req, res) {
  db.pokemon.findAll({
    order: [
      ['id', 'ASC']
    ]
  }).then((pokemon)=>{
    res.render('index', { pokemon: pokemon });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
