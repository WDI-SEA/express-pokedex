const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon });
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./controllers/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});
