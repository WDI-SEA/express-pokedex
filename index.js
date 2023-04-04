const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models')
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

const path = require('path')
app.set('views', path.join(__dirname, 'views'));

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

app.get('/pokemon', async (req, res) => {
  try {
    const allPokemon = await db.pokemon.findAll();
    console.log(__dirname)
    res.render('index.ejs', { pokemon: allPokemon });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/pokemon', async (req, res) => {
  const { name } = req.body;
  try {
    const newPokemon = await db.pokemon.create({ name });
    console.log('Created new Pokemon:', newPokemon.name);
    res.redirect('/pokemon');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});


// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./controllers/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});
