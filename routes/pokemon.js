var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');



// GET /pokemon - return a page with favorited Pokemon
router.get('/', function (req, res) {
  // TODO: Get all records from the DB and render to view
  // call db.pokemini.findAll
  // Get data and render into an ejs
  db.pokemon.findAll().then(function (pokemon) {
    res.render('favorites', { pokemon }); //need to use res.render
    console.log(pokemon);
  });

});




// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function (req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({

    name: req.body.name,

  }).then(function (data) {
    console.log(data)
    res.redirect('/');
    // res.render('/pokemon', { pokemon});
  })
  // call db.pokemon.create and pass in the data from the form
  // when the promise return,we need to redirect to /pokemon
  res.send(req.body);
});



// router.get('/:id', function (req, res) {
//   db.pokemon.findOne({
//     where: { id: parseInt(req.params.id) }
//   }).then(function (data) {
//     return axios.get('https://pokeapi.co/api/v2/pokemon/' + data.name + '/')
//   }).then(function (results) {
//     res.render('about', { pokemon: results.data });
//   })
// });


//// Get /pokemon/:id - get one pokemon id from the database
// and uses it to look up details about that one pokemon
router.get('/:id', function (req, res) {
  // Look up pokemon in our db by its ID (findByPk)
  // User the pokemon name from the db to query the api for the details on that one pokemon
  // take data from the api and render a detail/show page for this on
  db.pokemon.findOne({
    where: { id: parseInt(req.params.id) }
  }).then(function (data) {
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + data.name + '/')
  }).then(function (result) {
    res.render('about', { pokemon: result.data });
  })

})



//DELETE
router.delete('/:id', function(req, res){
  db.pokemon.destroy({
      where: {id: parseInt(req.params.id)}
     
  }).then (function(response){
    res.render('pokemon', {pokemon: response.data})
        res.redirect('/pokemon');  
  });
})







module.exports = router;
