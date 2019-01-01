var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/:id', function(req, res) {
	var displayPoke = db.pokemon.findByPk(id: req.params.id).then(function(poke) {
		console.log("Returning Pokemon:",displayPoke)
		res.render('details', { pokemon: displayPoke })
	})
});

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(poke) {
        // console.log('Found: ', poke);
        var pokemon = poke.map(fav => fav.get({plain:true}));
        console.log(pokemon)
    res.render('favorites', { pokemon: pokemon });
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
        name: req.body.name
    }).then(function() {
        res.redirect('/pokemon');
  });
});

module.exports = router;
