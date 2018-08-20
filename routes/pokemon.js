var express = require('express');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemonster.findAll().then(function(pokemon){ 
		// console.log('Books found:', books);
		res.render('views/index', {pokemonster: name});
	}).catch(function(err){
		console.log('ooops', err);
		// res.send('bad things happened. OOooooops');
		res.render('404');
	});
  //res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemonster.create(req.body).then(function(createdPoke){
		console.log('poke created looks like', createdPoke);
		res.redirect('/views');
	}).catch(function(err){
		console.log('error happened', err);
		res.render('404');
	});
  //res.send(req.body);
});

module.exports = router;
