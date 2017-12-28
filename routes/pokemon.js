var express = require('express');
var router = express.Router();
// var db = require('../modeles');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(favPoke){
      res.send('Render a page of favorites here');
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
  db.pocket_monster.create(req.body).then(function(addPoke){
    // res.redirect('/pokemon/' -)
  })
    res.send(req.body);
});

module.exports = router;
