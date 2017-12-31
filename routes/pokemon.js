var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('../models');
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req,res){
    // TODO: render favorites
    db.pokemon.findAll().then(function(pokemon) {
    	res.render('./favorites/index', {pokemon: pokemon});
  	});
});

router.get('/:id', function(req,res){
	db.pokemon.findById(req.params.id).then(function(pokemon){
		if(pokemon){
			var pokeURL = 'http://pokeapi.co/api/v2/pokemon/'+pokemon.name+'/';
			console.log(pokeURL);
			request(pokeURL,function(error,response,body){
				var pokemon = JSON.parse(body);
				console.log(pokemon);
				res.render('favorites/show', { pokemon: pokemon });
			});
		}else{
			res.status(404).send('error in the if');
		}
	}).catch(function(err){
		res.status(500).send('error to do request');
		console.log(err);
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
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req,res){
    db.pokemon.create(req.body).then(function(pokemon){
    	res.redirect('/pokemon');
    	console.log(pokemon, 'this added');
    }).catch(function(err){
    	res.status(500);
    });
});

module.exports = router;
