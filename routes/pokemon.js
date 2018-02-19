var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

// GET - return a page with favorited Pokemon
// router.get('/', function(req, res) {
//     // TODO: render favorites   //findAll function
//     res.send('Render a page of favorites here');
// });

//GET THE DATABASE OF FAVORITES, AND THEN RENDER THE FAVORITES PAGE
router.get('/', function(req, res) {
    db.pokemon.findAll().then(function(pokemon){  //grab all in my database
      res.render('favorites', {pokemon:pokemon} ); //render the page favorites with that database info
  });
});

//GRAB ALL THE DETAILS OF EACH POKEMON - ID, MORE DETAILS NEEDED FOR SHOW/DETAILS PAGE
router.get('/:id', function(req, res) {
  db.pokemon.findById(req.params.id).then(function(pokemon) {
    var thisPokemon = 'http://pokeapi.co/api/v2/pokemon/'+pokemon.name+'/'; //grab THIS pokemon at this URl
    request(thisPokemon, function(error, response, body){
      var pokemon = JSON.parse(body); //grab all the info from THIS pokemon's object array in that URL & parse
      res.render('./poke/show', {pokemon:pokemon}); //render it all to the show page (pokemon data for thisPokemon)
    }); //now we've  allowed all the info for THIS pokemon to be displayed on the show page
  }); //need to link up the action that will call this (when we click on a individual pokemon for details)
});


//grab a pokemon when a button is clicked on in index.ejs,
//the pokemon.name grabs info from the pokemon.js file (identifies WHICH pokemon is being grabbed
//we then grab all the info from that object here (req.body)
//and post it to the database pokemon with the db.pokemon.create call
 //then we redirect to the pokemon favorites page
//select that body, which is connected to the API,
//then post that object to the databse, then redirect to the pokeomon page

// ADD THAT POKEMON TO MY DATABASE OF FAVROTIES
router.post('/', function(req, res) {
  db.pokemon.create(req.body).then(function(pokemon){
    res.redirect('favorites');
  });
});

// base off cruddy board games project delete
//DELETE POKEMON FROM DATABASE, WHICH WILL THEN DELETE FROM FAVORITE PAGE (IT DISPLAYS THE DB CONTENTS)
router.delete('/:id', function(req, res) {
  db.pokemon.destroy({
    where: {id: req.params.id}
  }).then(function(data){
    res.redirect('favorites');
  });
});


module.exports = router;
