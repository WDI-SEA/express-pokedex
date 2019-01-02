var express = require('express');
var router = express.Router();
var db = require('../models');

// do I need this line?
var models = require('../models');
var favoriteArray = [];


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');
  	  console.log("favorites page loads?"); //nothing so far

	  res.render('pokemon/index');

});


router.post('/', function(req, res) {

	console.log("add a pokemon"); // fires when I press the "nevermind" button OR "add to favorites" button

	db.pdex.findAll().then(function(poke) {
		poke.forEach(function(poke) {
			console.log('found:', poke.name);
			favoriteArray.push(poke.name);
		});

	//console.log('favoriteArray 1: ', favoriteArray);
	});

	db.pdex.create(req.body).then(function(data) {
		favoriteArray.push(data.name);
		//console.log('favoriteArray 2: ', favoriteArray);
		console.log('JUST THE NAME:', favoriteArray);

		var faveObject = {};

		for (var i = 0; i < favoriteArray.length; i++) {
		  faveObject[i] = favoriteArray[i];
		};

		console.log(faveObject);

		res.redirect('/pokemon', faveObject);
	});


});





module.exports = router;


