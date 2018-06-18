
var express = require('express');
var router = express.Router();
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon) {
    console.log(pokemon);
    res.render('favorites/allFavorites', { pokemon: pokemon });
  })
});

// GET single Pokemon
router.get('/pokemon/:id', function(req, res) {
  var id = parseInt(req.params.id); 
})

// GET /articles/:index - gets a specific article
app.get('/articles/:index', function(req, res) {
  var index = parseInt(req.params.index);
  db.article.find({
    where: {id: req.params.index}
  }).then(function(data) {
    // console.log(data)
    if(data != null) {
      res.render('articles/show', {article: data });
    }else{
      res.render('articles/404')
    }
  })
  // res.send('Error');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function() {
    res.redirect('/');
  });
});

router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(data) {
      console.log(data)
      res.sendStatus(200);
  });
});



module.exports = router;
