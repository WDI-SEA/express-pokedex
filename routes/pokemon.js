const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../models');
const methodOverride = require('method-override');



router.use(methodOverride('_method'));

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('pokemon/index', {pokemon});
    console.log('favorites');
    console.log(pokemon)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then(pokemon => {
      console.log("my new fave", pokemon.dataValues)
      res.redirect('/')
  })
});

//show the id of a favorite pokemon
router.get('/:id', (req, res) => {
    db.pokemon.findOne({
      where: {
      id: req.params.id
      }
    }).then(pokemon => {
      let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      axios.get(pokemonUrl).then(apiResponse => {
        let pokemon = apiResponse.data;
        res.render('pokemon/show', {pokemon});
        // res.json(pokemon);
      })
    })
});



//get to make delete work
router.delete('/:id', (req, res) => {
  db.pokemon.destroy({
    where: {id:req.params.id}
  }).then((pokemon) => {
      console.log(pokemon)
      // console.log(req.params.id)
      res.redirect('/pokemon', pokemon)
    })
});


module.exports = router;
