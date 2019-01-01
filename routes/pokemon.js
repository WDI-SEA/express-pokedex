var express = require('express');
var router = express.Router();
var db = require('../models');

// do I need this line?
var models = require('../models');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');
  	  console.log("what does this do?");

	  res.render('pokemon/index');

});


router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');

  console.log("hello out there?");
  models.pdex.findAll().then(function(poke) {
	  // res.render('pokemon/index') {
	  // 	name: name
	  // });
  })

});



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  console.log("NEVERMIND"); // fires when I press the "nevermind" button OR "add to favorites" button
  res.send(req.body);
});

module.exports = router;


