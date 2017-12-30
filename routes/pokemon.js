var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(pokemon){
      res.render('./poke/favorite',{pokemon:pokemon});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
  db.pokemon.create(req.body).then(function(pokemon){
    res.redirect('/pokemon')
  }).catch(function(err){
    res.send('nope', err);
  });
    // res.send(req.body);
});
//route to get id
router.get('/:id', function(req, res){
  db.pokemon.findById(req.params.id).then(function(pokemon){
    if(pokemon){
      res.render('index/pokemon', {pokemon:pokemon});
    } else {
      res.status(404).send('nope404', err);
    }
  }).catch(function(err) {
    res.status(500).send('nope505', err);
  });
});
//route to delete id
router.delete('/', function(req, res) {
  console.log('delete Route ID = ', req.params.id);
  db.pokemon.distroy({
    where:{
      id: req.params.id}
    }).then(function(deleted) {
      console.log('deleted = ', deleted);
      res.send('deleted!!!');
    }).catch(function(err) {
      console.log('error happend', err);
      res.send('failed');
    });
  });
module.exports = router;
