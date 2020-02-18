require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const db = require('./models');


app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(methodOverride('_method'));
app.use(express.static('static'));

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    db.pokemon.findAll({
      attributes: ['name'],
      raw: true
    }).then(function(pokemons) {
      faves = pokemons.map(function(pokemon) {
        return pokemon.name;
      })
      res.render('index', { pokemon: pokemon.slice(0, 151), faves});
    });
  }).catch(err => {
    res.send("error occured");
    console.log(err);
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
