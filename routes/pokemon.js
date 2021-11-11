const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then(poke => {
    // console.log(poke)
    res.render('favorite.ejs', {results: poke})
  })
  .catch(error => {
    console.log(error);
  })
});



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // console.log(req.body)
    const formData = JSON.parse(JSON.stringify(req.body))
    db.pokemon.create({
      name: formData.name
    })
    .then(created => {
      console.log('this is created', created)
    })
    .catch(error => {
      console.log(error)
    })
});

router.get('/:name', (req, res)=>{
  const pokeName = req.params.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
  .then(apiRes => {
  
    const image = apiRes.data.sprites.other.dream_world.front_default
    const name = req.params.name
    res.render('show.ejs', {name:name, image:image})
  })

})

module.exports = router;
