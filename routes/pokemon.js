var express = require('express');
var router = express.Router();//router reference
const db = require('../models');
const axios = require('axios');


//main CRUD
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  //call db.pokemon.findAll
  //GEt data and render it into an ejs
  //GET ALL

  db.pokemon.findAll().then(function(pokemon) {
     res.render('favorites',{pokemon});//need to use res.render
    console.log(pokemon);
    });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  //call db.pokemon.create and pass in the data from the form
  //when promise returns, redirect to /pokemon
  db.pokemon.create({
    name: req.body.name,
    
}).then(function(data) {
    console.log(data);

    res.redirect('/');

})
});

//GET /pokemon/:id- gets ONE pokemon id from the database and gets details (like movies)
// router.get('/:id', function(req,res) {
//   //look up pokemon in our db by  its ID (findByPk)
//   //User the pokemon name from the db to query the api for details on that one pokemon
//   // take data from the api and render a detail/show page for this one pokemon
//   db.pokemon.findOne({
//     where: {id: parseInt(req.params.id)}
  
//   }).then(function(data) {
//     axios.get('https://pokeapi.co/api/v2/pokemon/' + req.params.id + '/')
// }).then(function(response) {
//   //  console.log(response.dataValues);
//     res.render('details', {pokemon: response.dataValues});
//   });
  
//   //res.render("this is the route for showing one pokemon");
// });
router.get('/:id', function(req, res) {
  db.pokemon.findOne({
    where: {id: parseInt(req.params.id)}
  }).then( function(data) {
    console.log(data.name);
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + data.name + '/')
  }).then(function(response) {
    console.log("HERE I AM", response.data);
    res.render('details', {pokemon: response.data});
  }).catch(function(error) {
    //if(error.response) {
      console.log(error);
  })
});



module.exports = router;


//only route functions communicate with database(api)
//the routes need to go into main server 
//models go into routes 