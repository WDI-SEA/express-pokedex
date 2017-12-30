var express = require('express');
var router = express.Router();
var db = require("../models");

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

// router.post('/', function(req, res){
//   db.article.create(req.body).then(function(createdArticle){
//     res.redirect('/articles/' + createdArticle.id);
//   }).catch(function(err){
//     res.send('uh oh!', err);
//   });
// });

module.exports = router;
