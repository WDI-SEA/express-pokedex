//const db = require('./models');
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) }); //array from 0 to 151
  })
});


app.listen(port, () => {
  console.log('...listening on', port );
});