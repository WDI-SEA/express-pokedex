require('dotenv').config();

const express = require('express');
const axios = require('axios'); 

const layouts = require('express-ejs-layouts');
const app = express();

const port = process.env.PORT || 3000;
const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

app.use('/', express.static('static'));
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: false
}));

app.use(layouts);

app.get('/', (req, res) => {
  // Use request to call the API
  axios.get(pokemonUrl)
  .then( (apiResponse) => {
    let pokemon = apiResponse.data.results;
    res.render('index', {
      pokemon: pokemon.slice(0, 151)
    });
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

let server = app.listen(port, () => {
  console.log('Express is listening on', port );
});

module.exports = server;
