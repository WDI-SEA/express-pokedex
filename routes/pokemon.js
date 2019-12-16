var express = require('express');
var router = express.Router();
var db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // res.send('Render a page of favorites here');
  db.poke.findAll()
	.then( pokemon => {
		res.render('pokemon', { pokemon: pokemon })
	});

});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // res.send(req.body);
	console.log(req.body);
	db.poke.findOrCreate({
    where: {
      name: req.body.name
    },
    defaults: {
      url: req.body.url,
      img: req.body.img
    }
	})
	.then(([newPoke, created]) => {
    console.log('New poke favorited!!!');
    console.log('Name:', req.body.name);
    console.log('req.body:', req.body);
		res.redirect('/pokemon');
	})
	.catch(err => {
		console.log('Err', err); // Message on terminal
		res.send('Error') // But vague for user
	});
});

module.exports = router;
