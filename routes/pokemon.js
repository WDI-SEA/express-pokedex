
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function (req, res) {

  db.pokefav.findAll().then(pokemons => {
    res.render('pokemon/index.ejs', { pokemons: pokemons })
  })
})


router.post('/', function (req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokefav.findOrCreate({
    where: {
      name: req.body.name
    }
  })
    .then(() => {
      console.log(req.body.name)
      res.redirect('/pokemon')
    }
    ).catch((error) => {
      console.log(error)
    })
});

router.get('/:id', (req, res) => {
  db.pokefav.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(poke => {
      let pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${poke.name}`;
      axios.get(pokemonUrl).then(apiResponse => {
        let pokemon = apiResponse.data
        res.render('pokemon/show.ejs', { pokemon: pokemon })
      })
    })
})

module.exports = router;
