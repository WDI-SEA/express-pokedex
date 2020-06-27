var express = require('express');
const db = require('../models');
const { default: Axios } = require('axios');
var router = express.Router();

router.get('/', function(req, res) {
  db.pokemon.findAll().then((pokemonAll) => {
    res.render('show', {
      pokemon: pokemonAll
    });
  }) 
  
});

// GET /pokemon - return a page with favorited Pokemon
// router.get('/:id', function(req, res) {
//   // TODO: Get all records from the DB and render to view
//   axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
//   db.pokemon.findOne({
//     where: { id: req.params.id }
//   }).then((pokemonOne) => {
//     res.render('show2', {
//       pokemon: pokemonOne
//     });
//   }) 
// });



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .then(([pokemon, created]) => {
    res.redirect('/')
  }).catch(error => {
    console.log(error)
  })
  
});

module.exports = router;
