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
//maybe route by name?
router.get('/:name', function(req, res){
  var pokeStat = 'http://pokeapi.com/api/v2/pokemon/' + req.params.name;
    request(pokeStat, function(err, res, body) {
      var stats = JSON.parse(body);
      res.render('/poke/stats', {pokemon:pokemon});
    });
});

//route to get id
// router.get('/:id', function(req, res){
//   db.pokemon.findById(req.params.id).then(function(pokemon){
//     if(pokemon){
//       res.render('index/pokemon', {pokemon:pokemon});
//     } else {
//       res.status(404).send('nope404', err);
//     }
//   }).catch(function(err) {
//     res.status(500).send('nope505', err);
//   });
// });
//route to delete id or pokemon
router.delete('/:id', function(req, res) {
  console.log('delete Route ID = ', req.params.id);
  db.pokemon.destroy({
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
