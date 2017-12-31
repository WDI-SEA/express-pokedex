var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-Layouts');
var request = require('request');
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(pokemon){
      res.render('./poke/favorite',{pokemon:pokemon});
  });
});
router.get('/:id', function(req,res){
  db.pokemon.findById(req.params.id).then(function(pokemon){
    if(pokemon){
      var pokeURL = 'http://pokeapi.co/api/v2/pokemon/'+pokemon.name+'/';
      request(pokeURL, function(error, response, body){
        var pokemon = JSON.parse(body);
        res.render('./poke/show', {pokemon:pokemon});
      });
    }else{
      res.status(404).send('error in the if');
    }
  }).catch(function(err){
    res.status(500).send('error to do request');
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
  db.pokemon.create(req.body).then(function(pokemon){
    res.redirect('/poke/favorite')
  }).catch(function(err){
    res.send('nope', err);
  });
    // res.send(req.body);
});
//maybe route by name?
// router.get('/:name', function(req, res){
//   var pokeStat = 'http://pokeapi.com/api/v2/pokemon/' + req.params.name
//     request(pokeStat, function(error, response, body) {
//       var pokemon = JSON.parse(body);
//       res.render('/poke/show', {pokemon:pokemon});
//     });
// });
//route to delete id or pokemon
router.delete('/:id', function(req, res) {
  // console.log('delete Route ID = ', req.params.id);
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
