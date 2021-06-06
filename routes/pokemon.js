const express = require('express');
const axios = require('axios'); 
const db = require('../models');
const router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then((pokemons) => {
    // res.redirect('pokemon/index')
  // })
  // TODO: Get all records from the DB and render to view
  pokemons.forEach(poke => {
    console.log(poke.dataValues)
  })
  res.render('pokemon/index', {pokemons})
  })
  .catch((err) => {
    res.status(400)
  })
})

// GET /pokemon/:name - return more information about individual pokemon
router.get('/:name', (req, res) => {
  axios.get('http://pokeapi.co/api/v2/pokemon/'+ req.params.name)
  .then(apiResponse => {
    let pokeData = apiResponse.data
//     pokeData.types.forEach(type => {
// console.log(type.type.name)
//     })
    res.render('pokemon/show', { pokeData })
  })
  // // TODO: Get all records from the DB and render to view
  .catch((err) => {
    res.status(400)
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: (req.body.name)
  }).then(poke => {
    console.log('Created: ', poke.name)
  })
  res.redirect('/')
  console.log(req.body.name);
});

router.post('/:name', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.destroy({
    where: { name: req.body.name}
  }).then(poke => {
    console.log('Deleted: ', poke)
    res.redirect('/pokemon')
  })
  // res.send(req.body);
  // console.log(req.body.name);
});

module.exports = router;
