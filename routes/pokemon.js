var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require("../models");
var router = express.Router();
// router.use('/', express.static('public'));
// router.use(express.static(__dirname + '/public'))

// u are here: /pokemon/favorite
// GET - return a page with favorited Pokemon
router.get('/', function(req, res){
	db.article.findAll().then(function(pokemon) {
		console.log(pokemon); // array of pokemon objects
    	res.render('pokemon/favorite', {'pokemon': pokemon});
	})
});


// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res){
    // TODO: add to database
db.article.create(req.body).then(function(createpokemon){
	res.redirect('/pokemon/favorite');
	// console.log("created: ",req.body.name)
	  }).catch(function(err) {
    res.status(500).send('Un uh');
    //if error... send need to find error code
	})
});

//BONUS add show pokemon on another page when clicked route

//BONUS add delete route

module.exports = router;