var router = require('express').Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
    db.pokemon.findAll()
    .then(pokemons => {
        res.render('pokemon/index', { pokemons })
    })
    .catch(err => {
        console.log('Oops', err)
        res.send('Something has happened, again')
    })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
});

module.exports = router;
