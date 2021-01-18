const { response } = require('express');
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const path = require('path');
const db = require('./models')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  }) 
});

// tried to put img on each list
// app.get('/', function(req, res) {
//   let i;
//   for (i = 1; i <= 3; i++) {
//     axios.get(`http://pokeapi.co/api/v2/pokemon/${i}`)
//     .then(foundMonster => {
//       res.render('index', { pokemon: foundMonster.data })
//       console.log(foundMonster.data)
//     })
//   }
// });

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000, () => console.log("server is working"));
