const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(pokemons =>{
    res.render('pokemon/index.ejs',{pokemons: pokemons});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .then(()=>{
    res.redirect('/pokemon')
  })
  .catch( error => console.log(error))
});

router.get('/:id', (req, res)=> {
  db.pokemon.findOne({
    where:{
      id: req.params.id
    }
  })
  .then(poke =>{
    let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${poke.name}`;
    axios.get(pokemonUrl).then(apiResponse =>{
      let pokemon = apiResponse.data
      // converter in json file
      // res.json(pokemon)
      res.render('pokemon/show.ejs',{pokemon: pokemon})
    })
  })
})

module.exports = router;
