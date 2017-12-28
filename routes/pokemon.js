var express = require('express');
var router = express.Router();
var db = require("../models");

router.use('/', express.static('public'));


// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
	db.pokemon.findAll().then(function(pokemon) {
    	res.render('./pokemon/index', {pokemon:pokemon});
	})
});



// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
db.pokemon.create(req.body).then(function(pokemon){
	res.redirect('/pokemon')
	console.log("created: ",req.body.name)
	  }).catch(function(err) {
    res.status(500).send('error');
})
});

router.get('/:id', function(req,res){
	db.pokemon.findById(req.params.name).then(function(pokemon) {
		if (pokemon) {
			res.render('./pokemon/show', {pokemon: pokemon});
		} else {
			res.status(404).send('error');
		}
	}).catch(function(err) {
		res.status(500).send('error');
	});
});


router.delete('/:id', function(req,res){
	console.log('Delete route. ID= ', req.params.id);
	db.pokemon.destroy({
		where: { id: id}
	}).then(function(deleted){
		console.log('deleted = ', deleted);
		res.send('success');
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('fail');
	})
});
module.exports = router;