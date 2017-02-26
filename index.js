var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var db = require('./models')

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';

  request(pokemonUrl, function(error, response, body) {
  	// res.send(body)
    var pokemon = JSON.parse(body).results;
    res.render('index', { pokemon: pokemon });
  });
});

app.get('/favorites', function(req, res){
	db.pokemon.findAll().then(function(pokemons){
		// res.send(pokemons)
	res.render('favorites', {pokemons: pokemons})	
	})
	.catch(function(error){
		res.status(404).send('ERROR');
	})
})

app.post('/', function(req, res){
	// res.send(req.body);
	db.pokemon.create(req.body).then(function(){
		res.redirect('/favorites');
	});
});

app.get('/favorites/delete/:name', function (req, res){
	db.pokemon.destroy({
		where: {name: req.params.name}
	}).then(function(){
		res.redirect('/favorites')
	})
})



// app.use('/pokemon', require('./routes/pokemon'));

// app.use('/favorites', require('./routes/favorites'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
