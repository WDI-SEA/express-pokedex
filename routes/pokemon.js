var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request'); // make HTTP/HTTPS calls follows by redirects
var methodOverride = require('method-override'); // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

router.use(methodOverride('_method'));

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemonFound) {
    res.render('favorites', {pokemon: pokemonFound })
  }).catch(function(error){
    res.render('something went wrong in get')
    console.error(error)
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.findOrCreate({
    where:{name: req.body.name}
  })
  .spread(function(poke, wasCreated) {
    res.redirect('/pokemon')
  }).catch(function(error){
    res.render('something went wrong in post')
    console.error(error)
  });
});

router.get('/:name',function(req,res){
  if(req.params && req.params.name){
    request('https://pokeapi.co/api/v2/pokemon/' + req.params.name, function(error, response, body){
      if(error || response.statusCode != 200){
        //console.error(error);
        res.render('error');
      }
      else {
        var pokedata = JSON.parse(body); // parse from a string to a JS object
        res.render('show', { pokedata: pokedata }); // render in show.ejs the JS object
      }
    });
  }
  else {
    res.render('error');
  }
});

// TODO: Delete from favorite list
router.delete('/', (req, res) => {
  db.pokemon.destroy( {
      where: req.body
  })
  .then((deletedPoke) => {
      console.log(deletedPoke.name, 'has been deleted.')
      res.redirect('/pokemon')
      alert(deletedPoke.name + 'has been deleted')
  });
});
module.exports = router;
