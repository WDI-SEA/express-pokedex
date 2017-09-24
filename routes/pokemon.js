//this is just like index.js, but for all the '/pokemon routes'
var express = require('express');
var router = express.Router();//this is just configures my routes

// // GET - return a page with favorited Pokemon
// router.get('/', function(req, res) {
//     // TODO: render favorites
//     res.send('Render a page of favorites here');
// });
//
// // POST - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//     // TODO: add to database
//     res.send(req.body);
// });

router.get('/', function(req, res) {
     db.pokemon.findAll().then(function(result) {
             res.render('favPokemon', { result: result });
         }).catch(function(error) {
             res.send('Error');
         });
 });

 router.get('/', function(req, res) {
     db.pokemon.findAll().then(function(pokemon) {
         res.render('index', { pokemon: pokemon });
     });
 });

//getting name and abilities
router.get('/:name', function(req, res) {
     var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/' + req.params.name;
     request(pokemonUrl, function(err, response, body) {
         var info = JSON.parse(body);
          info.typesCommaSeperated = info.types.map(function(type) {
              return type.type.name;
          }).join(", ");
          info.abilitiesCommaSeperated = info.abilities.map(function(ability) {
          return ability.ability.name;
          }).join(", ");
          res.render('pokemonInfo', { pokemon: info });
      });
  });

//posting pokemon to add to db
router.post('/', function(req, res) {
       db.pokemon.create({
           name: req.body.name
       }).then(function() {
           res.redirect('/pokemon');
       });
   });

//this is where i'm exporting my '/pokemon' routes to index.js
module.exports = router;
