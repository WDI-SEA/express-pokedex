const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(pokes=>{
    // TODO: Get all records from the DB and render to view
    res.render('faves.ejs', {pokemon: pokes});
  })
});

router.get('/:name', (req, res) => {
  console.log(req.params)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}/`)
  .then((response) => {
    console.log(response)
    res.render('details.ejs', {pokeInfo: response})
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
        name: req.body.name
    }
}).then(([user, wasCreated]) => {
    console.log(user)
    console.log(wasCreated)
    res.redirect('pokemon');
})
});

module.exports = router;
