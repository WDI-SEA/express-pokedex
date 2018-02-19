var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");

// CREATE DB ENTRY
// db.pokemon.create({
//   name: 'Eevee'
// }).then(function(poke) {
//   // you can now access the newly created task via the variable data
//   console.log("created Eevee");
// });

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
  db.pokemon.findAll().then(function(pokemon) {
    // console.log(pokemon);
    res.render('pokemon/all', {results: pokemon});
    // users will be an array of all User instances
  });
  // res.send('Render a page of favorites here');
  // res.send(db.pokemon.findAll());
});

router.get('/:id', function(req, res) {
    // TODO: render favorites
    db.pokemon.findOne({
      where: {id: req.params.id}
  // db.pokemon.findById(id, function(err, pokemon){
  //   console.log(req.body);
}).then(function(pokemon) {
    // res.send(pokemon);
  // });
    var pokeUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokemon.name.toLowerCase();
    request(pokeUrl, function(error, response, body) {
      var pokeData = JSON.parse(body);
      res.render('pokemon/single', { result: pokeData });
    });
    // res.send(pokeUrl);
    // users will be an array of all User instances
  });
});

// FIND?
// db.user.find({
//   where: {id: 2}
// }).then(function(user) {
// });

router.delete('/:id', function(req, res){
  console.log('Delete route. Id = ', req.params.id);
  // res.send('Delete Route Workin');
  db.pokemon.destroy({
    where: { id: req.params.id }
  }).then(function(deleted){
    console.log('delete = ', deleted);
    res.send('successful');
  }).catch(function(err){
    console.log('Error occured', err);
    res.send('fail');
  })
});

router.get('/pokemon/index.ejs', function(req, res) {
    // TODO: render favorites
  res.send(db.pokemon);
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.pokemon.create(req.body).then(function(createPokemon){
      res.redirect('/pokemon/');
      // res.redirect('/pokemon/' + createPokemon.id);
    }).catch(function(err){
      res.send('NOPE', err);
    });
  });
//   res.send(req.body);
// });


module.exports = router;
