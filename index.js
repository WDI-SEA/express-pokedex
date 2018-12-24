require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var pug = require('pug');
var app = express();
var methodOverride = require('method-override');

// Middlewares

app.use(require('morgan')('dev'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Serve static files

app.use(express.static('public'));

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  request(pokemonUrl, function(error, response, body) {
    res.render('index', { pokemons: parsePokemonAPIRoot(body) });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

function parsePokemonAPIRoot(body) {
  var pokemonsLong = JSON.parse(body).results;
  var pokemons = pokemonsLong.filter((pokemon, i) => i < 151);
  var pokemonsWithImgs = pokemons.map(pokemon => {
    var imgStringShort = pokemon.url.split('/')[6].toString();
    var imgString =
      imgStringShort.length === 1
        ? '00' + imgStringShort
        : imgStringShort.length === 2
        ? '0' + imgStringShort
        : imgStringShort;

    return {
      name: pokemon.name,
      url: pokemon.url,
      number: imgStringShort,
      image: `/img/${imgString}-${pokemon.name}.svg`,
    };
  });
  return pokemonsWithImgs;
  // console.log(pokemonImgs);
}
