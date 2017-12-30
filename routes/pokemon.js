var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
     db.favorite.findAll().then(function(favorite){
       res.render('./pokemon/index', {favorite:favorite});
     });
});

router.get('/pokemon/:id', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151';

    request(pokemonUrl, function(error, response, body) {
        res.render('index', { descriptions: description });
    });
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    db.favorite.create(req.body).then(function(createArticle){
      res.redirect('/pokemon');
    });
});

router.delete('/:id', function(req, res){
  console.log('delete route. ID = ', req.params.id);
  db.favorite.destroy({
    where: { id: req.params.id}
  }).then(function(deleted){
    console.log('deleted = ', deleted);
    res.send('success');
  }).catch(function(err){
    console.log('error happened', err);
    res.send('fail');
  });
});

module.exports = router;
