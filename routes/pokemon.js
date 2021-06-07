const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require ('axios')

router.get('/', (req, res) => {
  db.pokemon.findAll()
  .then((pokemon) => {
    res.render("pokemon/index.ejs", {pokemon: pokemon})
  })
  .catch(err => {
    console.log(err)
  })
});

router.post('/', (req, res) => {
  db.pokemon.create({
    name: req.body.name
  })
  .then(pokemon => {
    res.redirect("/pokemon")
  })
  .catch(error => {
    console.log(error)
  })
});

router.get("/:name", (req, res) => {
  axios.get(`http://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    .then(resPokemon => {
      const details= resPokemon.data
      res.render("pokemon/show.ejs", {details})
    })
    .catch(error => {
      console.log(error)
    })
})







module.exports = router;
