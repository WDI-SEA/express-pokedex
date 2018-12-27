var express = require('express');
var router = express.Router();
const request = require('request');

// DATABASE
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll({
    attributes: ['name'],
  })
  .then(favePokemon => {
    res.render('pokemon/index', { faves: favePokemon });
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    // ADD SOMETHING HERE
  })
});

// GET /pokemon/id - return a page with detailed info of one pokemon 
router.get('/:idx', function(req, res) {
  db.pokemon.findOne({
    attributes: ['name'],
    where: {id: req.params.idx}
  })
  .then(selectedPokemon => {
    if (!selectedPokemon) {
      throw 'No pokemon with that id';
    }

    request(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.name.toLowerCase()}/`, (error, response, body) => {
      if (error) {
        throw error;
      }
      const pokemon = JSON.parse(body);
      res.render('pokemon/show', { pokemon: pokemon });
    })
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    res.render('error');
    // ADD SOMETHING HERE
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name,
    },
  }).spread((fave, created) => {
    if (created) {
      console.log(`Added ${fave.name} to favorites`);
    }
    res.redirect('/pokemon');
  });


});

// GET /pokemon/edit/id - Edit/Delete form for fave pokemon
router.get('/edit/:idx', (req, res) => {
  db.pokemon.findOne({
    attributes: ['id', 'name'],
    where: {id: req.params.idx}
  })
  .then(selectedPokemon => {
    if (!selectedPokemon) {
      throw 'No pokemon with that id';
    }
    res.render('pokemon/edit', { pokemon: selectedPokemon });
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    res.render('error');
    // ADD SOMETHING HERE
  })
});


// POST/DELETE /pokemon/id - Remove pokemon from database
router.delete('/:idx', (req, res) => {
  db.pokemon.destroy({
    where: {id: req.params.idx},
  })
  .then(destroyedPokemon => {
    res.redirect('/pokemon');
  })
  .catch(err => {
    console.log(`Error: ${err}`);
    res.render('error');
    // ADD SOMETHING HERE
  })

})

// POST/PUT /pokemon/id - Update pokemon info in database
router.put('/:idx', (req, res) => {
  res.send(`Trying to update ${req.params.idx}`);
})



module.exports = router;
