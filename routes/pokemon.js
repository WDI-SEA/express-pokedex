var express = require('express');
var router = express.Router();
var db = require('../models')
const axios = require('axios'); 
// GET /pokemon - return a page with favorited Pokemon
// TODO: Get all records from the DB and render to view
//call db.pokemon.findAll
//Get data and render it into ejs

router.get('/', function(req, res) {
  db.pokemon.findAll().then(function(pokemon){
  //  res.json(pokemon);
  res.render('pokemon', {pokemon});
  });
});
//});
    
    //res.send('Render a page of favorites here');
// POST /pokemon - receive the name of a pokemon and add it to the database
// TODO: Get form data and add a new record to DB
// call db.pokemon.create and pass in the data from the form
// When the promise returns, we need to redirect to /pokemon

router.post('/', function(req, res) {
  db.pokemon.findAll().then(function(data){
      let repeatCount = 0;
        data.forEach(function(pokemon){
          if (req.body.name === pokemon.name){
              repeatCount++;
        }
      })
    if (repeatCount === 0){
      db.pokemon.create({
        name: req.body.name
          }).then(function(data){
        })
      }
    res.redirect('pokemon')
  });
});
  //res.send(req.body);
//});

 

//get /pokemon/:id -- Gets one pokemon id from the database
//and uses it to look up detailes about that one pokemon
//look up pokemon in our db by it's ID (findByPk)
//use the pokemon name from the db to query thr api for details on that one pokemon
// Take data from the api and render a detail/show page for this one pokemon

router.get('/:id', function(req, res){
  db.pokemon.findByPk(req.params.id).then(function(pokemon){
    axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(function(response){
      res.render('show', {pokemon: response.data});
    });
  });
});



router.post('/:id', function(req, res){
  db.pokemon.destroy({
    where:{id: parseInt(req.params.id)}
  }).then (function(pokemon){
      res.render('pokemon', {pokemon})
        res.redirect('/pokemon');
  });
});
module.exports = router;
