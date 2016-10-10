var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db = require("./models")

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});

app.get('/pokemon', function(req, res) {
  db.pokemon.findAll({
    order: 'name ASC' })
  .then(function(pokemon) {
    res.render('favorites', { pokemon: pokemon });
  })
  .catch(function(err){
    console.log(err);
    res.send("Doh Pokedex Server Error.")
  });
});

app.post("/pokemon", function(req, res){
  db.pokemon.create({
    name: req.body.name
  }).then(function(data){
    //You can now access newly created data
    if(data){
      res.status(200).redirect("/pokemon");
    }
    else {
      res.status(500).send("Server error");
    }
  });
});

app.delete("/pokemon/delete/:id", function(req, res){
  console.log("inside delete route");
  db.pokemon.destroy({
    where: { id: req.params.id }
  }).then(function(){
    res.render("favorites", { pokemon: pokemon });
  }).catch(function(err){
    console.log(err);
    res.send("whhoooooops, server error.");
  });
});

app.use('/pokemon', require('./controllers/pokemon'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
