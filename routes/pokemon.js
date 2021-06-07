const express = require('express');
const router = express.Router();
const db =require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((pokemon) => {
    res.render('./pokemon/index.ejs', { pokemon: pokemon})
  })
  .catch(err => {
    console.log(err)
  })
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name,
      img_url:req.body.img_url
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