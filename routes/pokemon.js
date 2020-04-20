var express = require('express');
var router = express.Router();
const axios = require('axios')

var db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  //TODO: Get all records from the DB and render to view
  db.favorite.findAll()
  .then((poke) => {
    res.render('pokemon/faves', { poke })  
    
  })
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.favorite.create(req.body) 
  .then(() => {
    res.redirect('/pokemon');
  })
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  db.favorite.findOne({
    where: { id: id },
  }) 
  .then((pokemon) => {
    var pokeUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemon.name + '/';
    console.log(pokeUrl)
      axios.get(pokeUrl)
        .then(function(apiResponse) {
          var pokemonAPI = apiResponse.data;
          console.log(pokemonAPI)
          console.log('pokemonAPI abilities', pokemonAPI.abilities[0].ability.name)
          console.log('image url', pokemonAPI.sprites.front_default)
          res.render('pokemon/show', { detail: pokemonAPI });
          })
        .catch((err) => {
          console.log('error', err)
          res.render('error')
          })
  })
  .catch((err) => {
    console.log('error', err)
    res.render('error')
    })
})

module.exports = router;
