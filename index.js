const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const db = require('./models');
const { url } = require('inspector');

const app = express();
const port = process.env.PORT || 3000;

//View engine
app.set('view engine', 'ejs');
// method-override middleware
app.use(methodOverride('_method'))
//Body parser
app.use(express.urlencoded({ extended: false }));
//Sets layout
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {

    let pokemon = apiResponse.data.results;
    let urlArray = []

    pokemon.forEach((element, i) => {
      element.imageUrl = (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`)
    })

    res.render('index', { pokemon: pokemon.slice(0, 150)});
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});