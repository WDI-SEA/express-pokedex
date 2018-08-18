var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
    db.pokemon.findAll().then(function (pokemon){  
        res.render('pokemon/index',{pokemon: pokemon});
    });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
    db.pokemon.create(req.body).then(function (createdPoke){
        res.redirect('/pokemon');
    });
});

router.get('/:id', function (req,res) {
    db.pokemon.findById(req.params.id).then(function (pokemon){
        request(pokemon.url,function (error, response, body){
            var poke = JSON.parse(body);
            res.render('pokemon/show', {pokemon: poke, id:req.params.id});
        });
    });
});
router.delete('/:id',function(req,res) {
    console.log('made it');
    db.pokemon.destroy({
        where: {id: req.params.id}
    }).then(function (){
        res.send('deleted!');
    });
});

module.exports = router;
