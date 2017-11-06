var express = require('express');
var db = require('../models')
var router = express.Router();

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(result) {
    	res.render('favorites', {result: result})
    })
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    res.send(req.body);
});

module.exports = router;
