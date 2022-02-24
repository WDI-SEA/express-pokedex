const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;
const db = require("./models")

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', async (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
  try {
    const apiResponse = await axios.get(pokemonUrl)
    const pokemon = apiResponse.data.results
    res.render("index", {pokemon: pokemon.slice(0, 151)})
  } catch(error){
    console.log(error)
  }
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});