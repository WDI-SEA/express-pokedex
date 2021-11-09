const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
    .then(favorite => {
      console.log(favorite)
      // TODO: Get all records from the DB and render to view
      res.render('favePokemon/index', {results: favorite})
    })
});

router.get('/:name', function (req, res) {
  let pokeDetail = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeDetail}`)
  .then(showPoke => {
    let name = showPoke.data.name
    let description = showPoke.data.description
    let color = showPoke.data.pokemon_color.name
    let habitat = showPoke.data.habitat



    res.render('show', {description: pokeDetail.characteristics.description, })
  })
  .catch(error => {
    console.error
  })
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  console.log('this is data', data)
  db.pokemon.create({
    name: data.name
  })
  // TODO: Get form data and add a new record to DB
  .then(createdFave =>{
    console.log('db instance created: \n', createdFave)
    res.redirect('/');
  })
  
});

module.exports = router;
