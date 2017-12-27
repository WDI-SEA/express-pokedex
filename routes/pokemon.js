var express = require('express');
var router = express.Router();
var db = require ('../models');
var request = require('request');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites

    res.render('/favorites');
    // db.pokemon.findAll().then(function(result){
    	  // res.render('favorites', {result: result});
    // });
});


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.pokemon.create({
    	name: req.body.name
    }).then(function(){
    	res.redirect('/pokemon');
    });
});

module.exports = router;
