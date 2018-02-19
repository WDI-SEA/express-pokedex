var express = require('express');
var router = express.Router();
var db = require('../models');
var sequelize = require('sequelize');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    db.pokemon.findAll().then(function(data){
    // res.send('Render a page of favorites here');
    console.log(data);
      // dataValues:
      //  { id: 35,
      //    name: 'caterpie',
      //    createdAt: 2018-02-18T20:42:49.581Z,
      //    updatedAt: 2018-02-18T20:42:49.581Z }
      res.render('pokemon/index', {pokemons:data});
    });
});

// GET /pokemon/:id
router.get('/details/:id', function(req,res){
  // TODO: render a list of details for pokemon/id
  console.log(req.params.id);
  db.pokemon.find({
    where: {id:req.params.id}
  }).then(function(data){
    console.log(data);
    res.render('pokemon/details', {pokemon:data});
  });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    // TODO: add to database
    db.pokemon.create({
      name:req.body.name
    }).then(function(data){
      // res.send(req.body);
      res.redirect('/pokemon');
    });
});

// PUT route

// DELETE route

module.exports = router;
