require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");

const db = require("./models");

const app = express();
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(ejsLayouts);
app.use(methodOverride("_method"));

let pokemonCount = 0;
let pokemonOffset = 0;
let pageNumber = 1;

// GET / - main index of site
app.get('/', function(req, res) {
  let pokemonName = "";
  let pokemonUrl = "http://pokeapi.co/api/v2/pokemon";

  if (req.query.name) {
    pokemonName = `/${req.query.name}/`;
    pokemonName = pokemonName.toLowerCase().replace(/\s/g,'');
    pokemonUrl += pokemonName;
  } else {
    pageNumber = req.query.pageNumber;

    if (pageNumber < 1 && pageNumber > 49) {
      pageNumber = 1;
    }

    pokemonOffset = (pageNumber - 1) * 20;
    pokemonUrl += `?offset=${pokemonOffset}&limit=20`;
  }
  console.log(pokemonUrl);
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {

    pokemonCount = apiResponse.data.count;

    var pokemon = apiResponse.data;

    if (pokemonName.length > 0) {
      pokemon = [pokemon];
    } else {
      pokemon = pokemon.results;
    }

    db.pokemon.findAll()
      .then(user_poke => {
        let mapped_pokemon = pokemon.map(api_poke => {
          return {
            ...api_poke,
            isFavorited: user_poke.find(poke => {
              return poke.name === api_poke.name;
            }) !== undefined,
          }
        });
        res.render('index', { 
          pokemon: mapped_pokemon, 
          pageNumber: pageNumber, 
          totalPages: Math.ceil(pokemonCount/20) });
      }).catch(err => {
        res.send(err);
      })
  }).catch(err => {
    res.send(err);
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
