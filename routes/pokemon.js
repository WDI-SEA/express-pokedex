var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
  //finds all db entries, then runs next function
  db.pokemon.findAll().then(function(results){
    // renders pokemon.ejs, passes through favorites from database
    res.render('pokemon.ejs', {favorites: results});
  });
});


// POST - receive the name of a pokemon and add it to the database
router.post('/:id', function(req, res) {
  db.pokemon.create(req.body).then(function(newFav){
    //redirect to /pokemon
    res.redirect('/pokemon');
    // TODO: add to database
    // res.send(req.body);
  });
});

//DELETE
router.delete('/:id', function(req, res){
  console.log('delete info is: ', req.params.id);
  db.pokemon.destroy({
    where: {
      name: req.params.id
    }
  }).then(function(deleted){
    console.log('deleted:', deleted);
    res.send('success');
  }).catch(function(err){
    console.log('error:', err);
    res.send('error');
  });
});


module.exports = router;
