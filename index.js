var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require("./models"); 
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static('public'))
app.use(express.static('files'))


// GET - show list of available Pokemon
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';

  request(pokemonUrl, function(error, response, body) {
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});

// GET - return a page with favorited Pokemon
app.get('/pokemon', function(req, res) {
	db.pokemon.findAll().then(function(pokemon) {
		res.render("./pokemon", {pokemon: pokemon});
	});
});

// POST - receive the name of a pokemon and add it to the database
app.post('/', function(req, res) {
	db.pokemon.create(req.body).then(function(pokemon) { 
		res.redirect("/pokemon"); 
	}); 
});

// DELETE - remove Pokemon from list of favorites
app.delete("/pokemon/:id", function(req,res){
	db.pokemon.findById(req.params.id).then(function(pokemon) {
		pokemon.destroy();
		res.send({message:"successfully deleted"});
	});
});


app.use('/pokemon', require('./routes/pokemon'));


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
