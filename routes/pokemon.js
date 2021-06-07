const express = require('express');
const axios = require('axios'); 
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with all Pokemon in database
router.get('/', (req, res) => {
  // find all pokemon in db
  db.pokemon.findAll()
  .then((pokemons) => {
  // render and redirect to view /pokemon/index page
  res.render('pokemon/index', {pokemons})
  })
  .catch((err) => {
    res.status(400)
  })
})

// GET /pokemon/:name - return more information about individual pokemon in database
router.get('/:name', (req, res) => {
  // get info from api
  axios.get('http://pokeapi.co/api/v2/pokemon/'+ req.params.name)
  // render and redirect to /pokemon/show page
  .then(apiResponse => {
    let pokeData = apiResponse.data
    res.render('pokemon/show', { pokeData })
  })
  .catch((err) => {
    res.status(400)
  })
})

// POST /pokemon - get pokemon name from body and add it to the database
router.post('/', (req, res) => {
  db.pokemon.create({
    name: (req.body.name)
  })
  res.redirect('/')
});

// DELETE /:name - get pokemon name from body then destroy from database
router.delete('/:name', (req, res) => {
  db.pokemon.destroy({
    where: { id: req.body.id}
  }).then(poke => {
    res.redirect('/pokemon')
  })
});

module.exports = router;