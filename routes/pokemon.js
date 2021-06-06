const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')

// DELETE /pokemon/:id - deletes pokemon from the database by their id
router.delete('/', (req, res) => {
  db.pokemon.destroy({
    where: {id: req.body.id}
  }).then(() => {
    res.redirect(req.originalUrl.split("?").shift())
  }).catch(err => {
    console.log(err)
  })
})

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
            .then(pokemons => {
              console.log(pokemons)
              res.render('pokemon/index.ejs', { pokemons: pokemons})
            })
            .catch(err => {
              console.log(err)
            })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then(poke => {
    console.log('Created: ', poke.name)
    res.redirect('pokemon/')
  }).catch(err => {
    console.log(err)
  })
});

// GET /pokemon/:name - renders the show page with information about the pokemon
router.get('/:name', (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
        .then(resFromAPI => {
          const pokemon = resFromAPI.data
          res.render('pokemon/show', { pokemon: pokemon })
        }).catch(err => {
          console.log(err)
        })
})

module.exports = router;
