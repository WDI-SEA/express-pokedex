const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const methodOverride = require('method-override')
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(pokes=>{
    // TODO: Get all records from the DB and render to view
    res.render('faves.ejs', {pokemon: pokes});
  })
});

router.get('/:name', (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}/`)
  .then((response) => {
    res.render('details.ejs', {pokeInfo: response})
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
        name: req.body.name,
        nickname: req.body.imageUrl
    }
}).then(([user, wasCreated]) => {
    res.redirect('pokemon');
})
});

router.delete('/delete/:name', (req, res) => {
  db.pokemon.destroy({
    where: { name: req.params.name }
  }).then((numRowsDeleted) => {
    res.redirect('/pokemon')
  })
})

module.exports = router;