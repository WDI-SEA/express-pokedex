var express = require('express');
var router = express.Router();
var db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // Get all records from the DB and render to view
  db.pokemon.findAll({
    name: req.body.name
  })
  .then((poke) => {
    res.render('pokemon/index', { poke } );
  })
  .catch((err) => {
    console.log('ERROR', err)
    res.render('error')
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  })
  .then(() => {
    res.redirect('/pokemon')
  })
  .catch((err) => {
    console.log('ERROR', err)
    res.render('error')
  })
});

router.get('/:id', (req, res) => {
  db.pokemon.findOne({
      where: { id: req.params.id },
    })
    .then((poke) => {
      res.render('pokemon/show', {poke})
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})



module.exports = router;
