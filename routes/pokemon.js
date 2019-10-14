var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios'); 
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(faves) {
	res.render('faves', { pokemon: faves })
	})
});


router.get('/:id', function(req,res){
  db.pokemon.findByPk(req.params.id)
  .then(function(result){
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + result.name + '/';
    axios.get(pokemonUrl).then( function(response) {
    res.render('show', {pokemon: response.data})
  })
})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
	  where: { name: req.body.name }
	}).then(function(fave) {
		res.redirect('pokemon')
	})
});

router.delete('/:id', function(req,res) {
	db.pokemon.destroy({
		where: {
      name: req.params.id
    }
	})
	.then(function(pokemon) {
		res.redirect('/pokemon')
	})
})

module.exports = router;
