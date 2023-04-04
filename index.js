const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models');
const Pokemon = db.pokemon;

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', (req, res) => {
  // TODO: use updated url http://pokeapi.co/api/v2/pokemon/?offset=0&limit=151
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



app.get('/:name', async (req, res) => {
  try {
    // Make a request to the PokeAPI to get information about the Pokemon
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`);

    const { abilities, sprites, stats, moves } = response.data;

    // Render the show page with information about the Pokemon
    res.render('pokemonpage', { pokemon: req.params.name, abilities, sprites, stats, moves });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// app.js
// app.js




