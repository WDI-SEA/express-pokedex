var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req,res){
	db.pokemon.findAll().then(function(faves){
		res.render('favorites', {pokemon: faves});
	});
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req,res) {
db.pokemon.findOrCreate({
	where: {name: req.body.name},

}).spread(function(newFavorite, wasCreated) {
	var message = '';
	if(wasCreated){
		message = 'You already favorited' + req.body.name + '!!';
	} else {
		message = 'Done and done!';
	}
	res.render('success', {pokemon: req.body.name, message: message}); 
	});

});

//Export (instead of listen)
module.exports = router; 


