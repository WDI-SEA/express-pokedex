var express = require('express');
var router = express.Router();
var db = require('../models');
var axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(function(poke) {
    res.render('faves', {poke});
  })
  .catch(function(err) {
    console.log(err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).spread(function(poke, created) {
    if (created === false) {
      res.send('Already favourited')
    } else {
      console.log('Created: ', poke.name)
      res.redirect('/pokemon')
    }
  })
  .catch(function(err) {
    console.log(err)
  })
});

//GET /:id - return details about a specific pokemon
router.get('/:id', function(req,res) {
  db.pokemon.findByPk(req.params.id)
  .then(function(poke) {
    var url = `http://pokeapi.co/api/v2/pokemon/${poke.name}`
    axios.get(url)
    .then(function(response) {
      var results = response.data
      res.render('details', {results})
    })
    .catch(function(err) {
      console.log("error", err)
    })
  })
  .catch(function(err) {
      console.log("error", err)
    })
})

//delete to remove favourites
router.delete('/:id', function(req,res) {
  console.log("REQ", req.params.id)
  db.pokemon.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect('/pokemon')
  })
})

module.exports = router;
