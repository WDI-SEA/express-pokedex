const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
require('dotenv').config();
const db = require('./')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', async (req, res) => {
  try {
    let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';
    // Use request to call the API
    const response = await axios.get(pokemonUrl)
    // console.log(response.data.results)
    res.render('index.ejs', {
      pokemon: response.data.results.slice(0, 151)
    })
  } catch (err) {
    console.log('🤔🤔🤔🤔🤔🤔🤔', err)
    res.status(500).send('api error 🤔🤔🤔')
  }
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(process.env.PORT, () => {
  console.log(`I'll be right by your side 'Til ${process.env.PORT}, hold up`)
});

