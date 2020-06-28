var express = require('express');
const db = require('../models');
// var async = require('async');
const { render } = require('ejs');
var router = express.Router();
var axios = require('axios');


router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then((pokemonAll) => {
    res.render('favorite', {pokemon: pokemonAll}
    )
  });
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
db.pokemon.create ({
  name: req.body.name
})
.then((pokemon) => {
    res.redirect('/pokemon')
  });
  // res.send(req.body);
}) 


// remove all the selected pokemon
router.get('/delete', function(req, res) {
  console.log('test');
  db.pokemon.destroy({truncate:true})
  .then((pokemon) => {
    res.redirect('/pokemon')
  });
})


// GET /pokemon - return a page with favorited Pokemon
router.get('/:name', function(req, res) {
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}/`;
    // Use request to call the API
    axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data;
    console.log(pokemon.types[0].type)
    res.render('show', {pokemon});
  })
});

 
// remove the selected pokemon
router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: { id: req.params.id }
  }).then((pokemon) => {
    res.redirect('/pokemon')
  });
})





module.exports = router;


