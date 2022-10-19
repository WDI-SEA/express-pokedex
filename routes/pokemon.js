const { default: axios } = require('axios');
const express = require('express');
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {

  // TODO: Get all records from the DB and render to view



  try {
    constpallPokemon = await db.pokemon.findAll()
    res.render('pokemon/index.ejs',{allPokemon:allPokemon} ) 
  } catch(err) {
    res.render(err)
  }
// CONTROLLER LOGIC
  });

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  console.log('This is our request body! ', req.body)
  db.pokemon.findOrCreate({
    where: {
      //name: req.body.name
      name: req.body.name
    }
  }).then(pokemonData => {
    res.redirect('/pokemon') //our favorites pages
  }).catch(err => {
    res.send(err)
  })
  // res.send(req.body); can only send 1 response at a time
});


router.get('/:name', (req,res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  
  // // Use request to call the API
  // axios.get(pokemonUrl).then(apiResponse => {
  //   let pokemon = apiResponse.data.results;
  //   res.render('index', { pokemon: pokemon.slice(0, 151) });
  // })
   
  axios.get(pokemonUrl + req.params.name)
  
})
module.exports = router;
