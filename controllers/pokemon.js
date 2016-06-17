var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // Search with 1 variable
  db.pokemon.findAll()
  .then(function(pokemon) {
     console.log(pokemon);
     res.render('favorites.ejs', { pokemon: pokemon });
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    pokeName: req.body.name
  }). then(function(pokemon) {
    console.log(pokemon);
    res.redirect("/pokemon");
  });
});

router.post('/delete', function(req, res) {
  db.pokemon.destroy({
    where: { pokeName: req.body.name }
  }).then(function(pokemon) {
    console.log(pokemon);
    res.redirect("/pokemon");
  });
});

module.exports = router;
