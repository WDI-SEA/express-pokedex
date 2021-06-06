const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')

const app = express();
const port = process.env.PORT || 3000;

app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'))
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemons = apiResponse.data.results;
    res.render('index', { pokemons: pokemons.slice(0, 151) });
    console.log(pokemons)
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});