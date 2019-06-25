var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(data) {
    res.render('favorites', {data});
    //res.send('Render a page of favorites here');
  });
});
  // call db.pokemon.findAll
  // Get data and render it into ejs

// });

router.get('/:id', function(req, res) {
    db.pokemon.findByPk(parseInt(req.params.id)).then(function(pokemon) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then(function(response){
        res.render('show', {pokemon: response.data})
      })
    });
  })
// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create({
    name: req.body.name
  }).then(function(data){
      res.redirect('/pokemon');
  });
  // TODO: Get form data and add a new record to DB
  //call db.pokemon.create and pass in the data from the form
  //When the promise returns, we need to redirect to /pokemon\
});

router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {id: parseInt(req.params.id)}
  }).then(function(data) {
    res.redirect('/pokemon');
  })  
})
// GET /pokemon/:id - Gets one pokemon id from the database (favorites) 
// and uses it to look up details about that one pokemon
router.get('/:id', function(req, res) {
  //Look up pokemon in out DB by its id (findByPk) <sequelize function to look up id
  //Use the pokemon name from the db to query the api for details on that one pokemon
  //take data from the api and render a detail/show page for this one pokemon
  res.send("this is the route for showing one pokemon");

})

module.exports = router;
