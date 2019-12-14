const express = require('express');
const router = express.Router();
let db = require('../models')



// GET /pokemon - return a page with favorited Pokemon
router.get('/favorites', (req, res) => {
  db.pokemon.findAll()
  .then(pokemons => {
    res.render('../views/favorites', { pokemons })
  })
  .catch((err) => {
    console.log('Err', err)
    res.send('404')
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database

router.post('/favorites', (req, res) =>{
  db.pokemon.create(req.body)
  .then(newPokemon => {
    console.log('Created: ', req.body.name)
  })
  .then(res.redirect('/favorites'))
});


module.exports = router;

