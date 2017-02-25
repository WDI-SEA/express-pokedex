// REQUIRE GLOBAL
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

// SET AND USE
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));

// EXTRENAL ROUTES
app.use("/favorites", require("./routes/pokemon"));
app.use("/info", require("./routes/info"));

// ROUTES
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    // res.send(pokemon)
    res.render('index', { pokemon: pokemon });
  });
});


// LISTEN
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
