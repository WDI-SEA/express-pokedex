var express = require('express');
var router = express.Router();
let db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(favorite => {
    console.log(favorite[0].name)
    res.render('pokemon/index', {
      pokemon : favorite
    })
  }).catch(err => {
    console.log(err)
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // db.pokemon.create({
  //     name: req.body.name
  // }).then(name => {
  //     console.log('ooooof');
  //     res.redirect('/')
  // }).catch(err => {
  //   console.log(err)
  // })
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(([pokemon, created]) => {
        console.log(`${pokemon.name} was ${created ? 'created' : 'found'}!`)
        res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
});

module.exports = router;



