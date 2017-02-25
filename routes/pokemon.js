var express = require('express');
var router = express.Router();
var db = require('../models')

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
	res.render('favorites')
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
	console.log(req.body);
  db.favorite.create(req.body)
  	.then(function() {
  		res.redirect('./favorites');
  })
});

module.exports = router;
