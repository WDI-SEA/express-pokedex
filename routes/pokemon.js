// this is just like index.js but for all the '/pokemon routes'
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var db = require('..models');
var request = require('request');
var path = require('path');
var methodOverride = require('method-override');
var router = express.Router(); // this configures my routes
var app = express();

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

router.use(function(req, res, next) {
	if(req.query._method == 'DELETE') {
		req.method = 'DELETE';
		req.url = req.path;
	}
	next();
});
// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    res.send('Render a page of favorites here');
    db.pokemon.findAll().then(function(favoritePokemon){
    	res.render('favorites', { pokemon: favoritePokemon });
    }).catch(function(err){
    	res.send('oppsies, there was an error:' + err);
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    res.send(req.body);
    var pokemon = req.body.name;

    db.pokemon.create({
    	name: pokemon
    }).then(function() {
    	res.redirect('/pokemon');
    });

});
//list of pokes from index?
router.get('/:id', function(req, res) {
	var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.id;
	request(pokemonUrl, function(err, response, body) {
		if(err) {
			console.log(err);
		}
		var pokemon = JSON.parse(body);
		pokemon.typesCommaSeparated = pokemon.abilities.map(function(ability) {
			return ability.ability.name;
		}).join(", ");
		res.render('pokemon', pokemon);
	});
});
// this is where I'm exporting my '/pokemon' routes to index.js
module.exports = router;
