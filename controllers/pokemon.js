var express = require('express');
var router = express.Router();
var db = require('../models');


router.get('/', function(req, res) {
  db.pokemon.findAll({ 
		limit: 20})
	.then(function(pokemon) {
		res.render('./index', { pokemon: pokemon });
	})
});

router.post('/', function(req, res) {
	query = {
    name: req.body.name
  };
	db.pokemon.create(query)
	.then(function(data) {
		if(data) {
			res.status(200).redirect('./pokemon');
		}
		else {
			res.status(500).send('Oops');
		}
	});
});



module.exports = router;
