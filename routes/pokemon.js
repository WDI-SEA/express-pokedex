var express = require('express');
var router = express.Router();
var db = require('../models');
let request = require('request')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('favs/favorites', { pokemon })
  })
  .catch(err => {
    console.log(err)
    res.send('Oh no')
  })
});

router.get('/:id', (req, res) => {
  db.pokemon.findOne({
    where: { id: req.params.id },
  })
  .then(onePokemon => {
    let pokeSearch = 'https://pokeapi.co/api/v2/pokemon/' + onePokemon.name +'/'
    request(pokeSearch, (err, response, body) => {
      if (err) {
        console.log('Error:', err)
      }
      else {
        res.render('show', { pokemonChose : JSON.parse(body) })
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.send('Oh no')
  })
})



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create(req.body)
  .then(createdPokemon => {
    res.redirect('/favs/favorites')
  })
  .catch(err => {
    console.log(err)
    res.send('Oh no')
  })
});

module.exports = router;
