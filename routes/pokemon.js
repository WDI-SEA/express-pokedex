var express = require('express');
var router = express.Router();
var db = require('../models')
// GET /pokemon - return a page with favorited Pokemon
// router.get('/', function(req, res) {
//   // TODO: Get all records from the DB and render to view
//   res.send('Render a page of favorites here');
// });
router.get('/', function(req, res){
    db.pokemon.findAll().then(function(data){
      res.render('pokemon',{pokemon: data})
    })
})


router.post('/', function(req, res){
  db.pokemon.create({
    name: req.body.name
  }).then(function(data){
    res.redirect('pokemon')
  })
})


router.get('/:index', function(req, res){
  var index = parseInt(req.params.index);
  db.pokemon.find({
  where: {id: index}}).then(function(data){
  var pokeName = data.name;
  var urlPokemon = 'http://pokeapi.co/api/v2/pokemon/'+pokeName;
  request({urlPokemon}, function(error, response, body){

    var objData = JSON.parse(body);
    console.log(objData);


  })
  })
})

// POST /pokemon - receive the name of a pokemon and add it to the database
// router.post('/', function(req, res) {
//   // TODO: Get form data and add a new record to DB
//   res.send(req.body);
// });

module.exports = router;
