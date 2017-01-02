var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var path = require('path'); // need to join the "public" folder for additional assets
var db = require("./models");

app.use(require('morgan')('dev')); // i don't get this
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, "public")));


// GET /
// view: views/index.ejs
app.get('/', function(req, res) {
  var pokemonURL = 'http://pokeapi.co/api/v2/pokemon?limit=151'; // URL to pokemon API that returns the first 151 pokemon

  request(pokemonURL, function(error, response, body) { // requesting API, it's in the form of a JSON
    // the first "level" of the JSON consists of "count", "previous", and "results".
    var pokemon = JSON.parse(body).results; // we want the contents of "results"
    // console.log(pokemon); // "results" contains an array of objects, each object containing "url" and "name"
    res.render('index', { pokemon: pokemon });
  });
});

app.use('/pokemon', require('./routes/pokemon'));
// /pokemon becomes its own sort of "pocket" site within the site with this
// so within ./routes/pokemon.js, GET "/" refers to /pokemon/
// probably if you had a GET "/detail", it'll refer to /pokemon/detail

var server = app.listen(process.env.PORT || 3000); // PORT I guess is a thing

module.exports = server; // I get this means, Do the thing?
