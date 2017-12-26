var express = require('express');
var router = express.Router();
var db = require("../models");

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
	db.pokemon.findAll().then(function(pokemon) {
    	res.render('./pokemon/index', {pokemon:pokemon});
	})
});

router.use('/', express.static('public'));



// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
db.pokemon.create(req.body).then(function(pokemon){
	res.redirect('/pokemon')
	console.log("created: ",req.body.name)
	  }).catch(function(err) {
    res.status(500).render('error');
})
});

// router.get('/:id', function(req,res){
// 	db.pokemon.findById(req.params.id).then(function(pokemon) {
// 		if (pokemon) {
// 			res.render('/pokemon/show/:id', {pokemon: pokemon});
// 		} else {
// 			res.status(404).render('error');
// 		}
// 	}).catch(function(err) {
// 		res.status(500).render('error');
// 	});
// });

router.delete('/', function(req,res){
		db.pokemon.destroy(req.body).then(function(pokemon) {
		if (pokemon) {
			res.render('/pokemon', {pokemon: pokemon});
		} else {
			res.status(404).render('error');
		}
	}).catch(function(err) {
		res.status(500).render('error');
	});
})
module.exports = router;