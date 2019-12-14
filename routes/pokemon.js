let express = require('express');
let router = express.Router();
let db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(pokemon => {
    res.render('pokemon', {pokemon})
  })
  .catch(err => {
    console.log('Err', err)
    res.render('error')
})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body)
  .then(newPoke => {
    res.redirect('/pokemon')
  })
  .catch(err => {
    console.log('Err', err)
    res.send('error')
  })
})

module.exports = router;
