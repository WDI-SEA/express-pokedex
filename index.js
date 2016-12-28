var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var path = require('path');
var db = require("./models");

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', {
      pokemon: pokemon
    });
  });
});

app.use('/pokemon', require('./routes/pokemon'));
// add a new pokemon
app.get("/pokemon/new", function(req, res) {
  res.render("newPokemon.ejs");
});
// post a new pokemon
app.post("/pokemon/new", function(req, res) {
  // res.send("post route works");
  // console.log(req.body);
  db.pokemon.create(req.body).then(function(pokemon) {
    res.redirect("/pokemon/favorite");
  });
});
// shows all favorites
app.get("/pokemon/favorite", function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    console.log(pokemon);
    res.render("favorite.ejs", {
      pokemon: pokemon
    });
  });
});
// shows 1 favorite by id
app.get("/pokemon/favorite/:id", function(req, res) {
  db.pokemon.findById(req.params.id).then(function(pokemon) {
    res.render("onePokemon.ejs", {
      pokemon: pokemon
    });
  });
});
//deletes 1 pokemon from favorites
app.delete("/pokemon/favorite/:id", function(req, res) {
  db.pokemon.findById(req.params.id).then(function(pokemon) {
    pokemon.destroy();
    console.log(req.params.id);
    res.send({
      message: 'success destroying'
    });
  });
});

var server = app.listen(process.env.PORT || 3000);
module.exports = server;
