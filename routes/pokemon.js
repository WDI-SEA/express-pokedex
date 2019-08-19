var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll({
    where: { favorite: true }
  }).then((pokemon)=>{
    res.render('pokemon/favorites', { pokemon });
  })
  .catch( err =>{
    console.log(err);
    res.render('404');
  });
});

router.delete('/:id', function(req, res){
  var name = req.body.name;
  db.pokemon.findOne({ 
    where: {name: name}
  }).then(function(pokemon){
    pokemon.update({
      favorite: false
    }).then(()=>{
      res.redirect('/pokemon');
    });
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  var name = req.body.name;
  db.pokemon.findOne({ 
    where: {name: name}
  }).then(function(pokemon){
    pokemon.update({
      favorite: true
    }).then(()=>{
      res.redirect('/pokemon');
    });
  });
});

module.exports = router;
