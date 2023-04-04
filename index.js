const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models')
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static('public'))

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
    res.render('./pokemon/index.ejs', { pokemon: allPokemon });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/pokemon', async (req, res) => {
  const { name } = req.body;
  try {
    const newPokemon = await db.pokemon.findOrCreate({ where: {name} });
    console.log('Created new Pokemon:', newPokemon.name);
    res.redirect('/pokemon');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/pokemon/:name', async (req, res) => {
  const { name } = req.params
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon = response.data;
    res.render('pokemon/show', { pokemon })
  } catch(err) {
    console.log(err)
    res.status(404).send('Pokemon not found')
  }
})


// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./controllers/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});
