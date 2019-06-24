var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  // call db.pokemon.findAll
  // get data and render it into an ejs
  // change res.send to res.render
  //res.send('Render a page of favorites here');
 	 db.pokemon.findAll().then(function(pokemon) {
  		res.render('pokemon', {pokemon})
 		})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // call db.pokemon.create and pass in the data from the form
  // when the promise returns, we need to redirect to /pokemon
    db.pokemon.create( {
    name: req.body.name
    }).then(function() {
    res.redirect('pokemon');
    })
}); 

// get / pokemon/:id - gets one pokemon id from the database
// and uses it to look up details about that one pokemon
router.get('/:id', function(req, res) {
  //look up pokemon in our db by its ID (findByPk)
  // use the pokemon name from the db to query the api for details on that one pokemon
  // take data from the api and render a details / show page for this one pokemon
  db.pokemon.findByPk(req.params.id).then(function(pokemon) { 
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemon.name + '/';
    axios.get(pokemonUrl).then(function(apiResponse) {
    var pokemon = apiResponse.data;
    res.render('show', {pokemon, id: parseInt(req.params.id) });
   });
  });
});

router.delete('/:id', function(req, res) {
  db.pokemon.destroy( {
    where: {id: parseInt(req.params.id)}
  }).then(function(pokemon) { 
    res.redirect('/');
  });
});

  




module.exports = router;
