var express = require('express');
var router = express.Router();
const axios = require('axios'); 
var db = require('../models');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  //call db.pokemon.findAll()
  db.pokemon.findAll().then(function(pokemon) {
    res.render('favorites', {pokemon});
    console.log(pokemon);
  })
  // GET data and render it into an ejs

  //res.send('Render a page of favorites here'); //-- don't need this line once the app is working
  //res.render();
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
    //height: req.body.height,
    //weight: req.body.weight
    }).then(function(data) {
      console.log(data);
      //res.send(req.body.data);
      res.redirect('/');
    })
  });
  //call db.pokemon.create and pass in the data from the form
  //when the promise returns, we need to redirect to /pokemon
  //res.send(req.body);


//GET /pokemon/:id -- renders show page: gets one pokemon id from the database 
//and uses it to look up details about that one pokemon
router.get('/show/:id', function(req, res) {
  //Look up pokemon in our db by its ID (findByPk)
  db.pokemon.findOne({//findByPk(parseInt(req.params.id)).then(//({
    where: {id: parseInt(req.params.id)}
  }).then(function(data){
    console.log(data.name);
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + data.name + '/')
  }).then(function(response) {
    //console.log(response.data.name);
    //var poke = response.data;
    //console.log(response.dataValues);
    console.log("I'm the response data: " + response.data);
    res.render('show', {pokemon: response.data});
  }).catch(function(error) {
    //if(error.response) {
      console.log(error);
  })
  //use the pokemon name from the db to query the api for details on that one pokemon
  //Take data from the api and render a detail/show page for this one pokemon
  //res.send("this is the route for showing one pokemon");
});



module.exports = router;