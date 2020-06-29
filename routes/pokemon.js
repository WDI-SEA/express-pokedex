var express = require('express');
var router = express.Router();
var db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(pokemon => {
    res.render('pokemon/index', { pokemon: pokemon })
    //res.send('Render a page of favorites here');
  }).catch(err => {
    console.log(`🐑🐑🐑🐑🐑🐑`)
    console.log(err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
db.pokemon.findOrCreate({ 
  where: {
    name: req.body.name
  }
}).then(([pokemon, created]) => {
  res.redirect('/pokemon')
})
});


// GET /pokemon/:id - render a show page with info about the poke.
router.get('/:id', function(req, res) {
  db.pokemon.findOne({
    where: {
      id: req.params.id
    }
  }).then(pokemon => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then( function(apiResponse) {
      res.render('pokemon/show', { pokemon: apiResponse})  
    }).catch(err => {
      console.log(`🌸🌸🌸🌸🌸🌸🌸`)
      console.log(err)
    })
  }).catch(err => {
    console.log(`🌵🌵🌵🌵🌵🌵🌵`)
    console.log(err)
  })
})

module.exports = router
