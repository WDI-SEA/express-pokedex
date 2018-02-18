var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
    // TODO: render favorites
    console.log(req.params.name);
    db.pokemon.findAll().then(function(data){
    // res.send('Render a page of favorites here');
    res.render('/index', {pokemon:data});
    });
});

router.get('/index', function(req,res){
    console.log('in GET INDEX path');

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

module.exports = router;
