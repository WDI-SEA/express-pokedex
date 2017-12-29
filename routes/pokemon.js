var express = require('express');
var db = require('../models');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req,res){
    // TODO: render favorites
    db.pokemon.findAll().then(function(pokemons) {
    	res.render('./favorites/index', {pokemons: pokemons});
  	});
});

router.get('/:id', function(req,res){
	db.pokemon.findById(req.params.id).then(function(pokemon){
		if(pokemon){
			res.render('favorites/show', {pokemon: pokemon});
		}else{
			res.status(404).render('error');
		}
	}).catch(function(err){
		res.status(500).render('error');
	});
});

router.delete('/:id', function(req,res){
	db.pokemon.findById(req.params.id).then(function(pokemon) {
    if (pokemon) {
      pokemon.destroy().then(function() {
        res.send({msg: 'success'});
      });
    } else {
      res.status(404).send({msg: 'error'});
    }
  }).catch(function(err) {
    res.status(500).send({msg: 'error'});
  });
	// db.pokemon.destroy({
	// 	where: {id: req.params.id}
	// }).then(function(deleted){
	// 	res.send('success');
	// }).catch(function(err){
	// 	res.send('error');
	// });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req,res){
    db.pokemon.create(req.body).then(function(pokemon){
    	res.redirect('/pokemon');
    	console.log(pokemon, 'this added');
    }).catch(function(err){
    	res.status(500).render('error');
    });
});

module.exports = router;
