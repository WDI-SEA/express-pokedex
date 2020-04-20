require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override')

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static('public'))
app.use(methodOverride('_method'))

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=807';
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    //console.log(axios.get(apiResponse.data))
    var pokemon = apiResponse.data.results;
    // console.log(pokemon)
    pokeData = pokemon.map(value => value.url);
    // console.log(pokeData)
    //pokeInfo = [];
    // pokeData.forEach((url) => {
    //   axios.get(url).then(response => {
    //     // do something with response
    //     console.log(response.data)
    //     pokeInfo.push(response.data);
    //   })
    // })
    // axios.get(pokeData)
    // .then((apiTwo) => {
    //   let data = apiTwo.data
      // console.log(data)
      res.render('index', { 
        pokemon: pokemon.slice(0, 151)
        
      });
    // })
  })
});

app.get('/gen2', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=807';
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    pokeData = pokemon.map(value => value.url);
      res.render('gen2', { 
        pokemon: pokemon.slice(151, 251)
      });
  })
});

app.get('/gen3', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=807';
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    pokeData = pokemon.map(value => value.url);
      res.render('gen3', { 
        pokemon: pokemon.slice(251, 386)
      });
  })
});

app.get('/gen4', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=807';
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    pokeData = pokemon.map(value => value.url);
      res.render('gen4', { 
        pokemon: pokemon.slice(386, 494)
      });
  })
});

app.get('/gen5', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=807';
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    pokeData = pokemon.map(value => value.url);
      res.render('gen5', { 
        pokemon: pokemon.slice(494, 649)
      });
  })
});

app.get('/gen6', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=807';
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    pokeData = pokemon.map(value => value.url);
      res.render('gen6', { 
        pokemon: pokemon.slice(649, 721)
      });
  })
});

app.get('/gen7', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=807';
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    pokeData = pokemon.map(value => value.url);
      res.render('gen7', { 
        pokemon: pokemon.slice(721, 809)
      });
  })
});



// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});


module.exports = server;