require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    console.log('apiResponse.data:', apiResponse.data);
    var pokemon = apiResponse.data.results.slice(0,151);
    console.log('pokemon = apiResponse.data.results:', pokemon);
    var pokePromises = [];
    pokemon.forEach(poke => {
      pokePromises.push(axios.get(poke['url']));
    });
    Promise.all(pokePromises).then(pokemonResults => {
      var pokessssss = [];
      pokemonResults.forEach(result => {
        pokessssss.push(result);
        console.log(result);
      });
      res.render('index', {pokemon: pokessssss});
    });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
