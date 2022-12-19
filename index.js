const express = require('express');
const axios = require('axios'); 
const db = require('./models');
const ejsLayouts = require('express-ejs-layouts');


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static('public'))

// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl)
    .then(apiResponse => {
    let pokemon = apiResponse.data.results;
    //console.log("app.get pokemon results", pokemon)
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
})

app.use("/pokemon", require("./routes/pokemon.js"))

app.listen(port, () => {
  console.log('...listening on', port );
})

