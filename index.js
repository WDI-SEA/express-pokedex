const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

// MAKE AN INSTANCE OF EXPRESS
const app = express();
const port = process.env.PORT || 3000;

//MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) }); // the slice method shows us we are working with an array.
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});